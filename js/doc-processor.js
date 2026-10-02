/**
 * DocumentProcessor — Client-side DOCX & PDF handler
 *
 * DOCX strategy (format-preserving):
 *   A .docx is a ZIP containing word/document.xml.
 *   We only touch text inside <w:t> elements, leaving all
 *   formatting XML (w:rPr, w:pPr, margins, fonts, spacing) intact.
 *
 * PDF strategy:
 *   PDF is a print format — round-trip with full layout preservation
 *   is not achievable client-side. We extract text via PDF.js,
 *   then export the humanized result as a .docx with a note.
 *
 * Dependencies (loaded via CDN in index.html):
 *   - JSZip  (https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js)
 *   - PDF.js (https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.min.mjs — ES module)
 */

class DocumentProcessor {
    constructor() {
        this.sourceType = null;   // 'docx' | 'pdf'
        this.sourceFile = null;   // original File object
        this.sourceZip  = null;   // JSZip instance (DOCX only)
        this.sourceXml  = null;   // raw document.xml string (DOCX only)
        this.segments   = [];     // [{id, original, humanized}]
    }

    // ──────────────────────────────────────────────
    // Public: load a File, return extracted plain text
    // ──────────────────────────────────────────────
    async load(file) {
        this.sourceFile = file;
        this.segments   = [];
        const ext = file.name.split('.').pop().toLowerCase();

        if (ext === 'docx') {
            this.sourceType = 'docx';
            return await this._loadDocx(file);
        } else if (ext === 'pdf') {
            this.sourceType = 'pdf';
            return await this._loadPdf(file);
        } else {
            throw new Error('Format tidak didukung. Gunakan .docx atau .pdf.');
        }
    }

    // ──────────────────────────────────────────────
    // Public: after humanization, apply results & download
    // ──────────────────────────────────────────────
    async download(humanizedText) {
        if (this.sourceType === 'docx') {
            await this._downloadDocx(humanizedText);
        } else {
            this._downloadDocxFromText(humanizedText, this.sourceFile.name);
        }
    }

    // ──────────────────────────────────────────────
    // DOCX: load, parse w:t nodes, build segments
    // ──────────────────────────────────────────────
    async _loadDocx(file) {
        if (typeof JSZip === 'undefined') {
            throw new Error('Perpustakaan JSZip belum dimuat. Periksa koneksi internet.');
        }

        const arrayBuffer = await file.arrayBuffer();
        this.sourceZip  = await JSZip.loadAsync(arrayBuffer);

        const xmlEntry = this.sourceZip.file('word/document.xml');
        if (!xmlEntry) throw new Error('File .docx tidak valid: word/document.xml tidak ditemukan.');

        this.sourceXml = await xmlEntry.async('string');

        // Extract all <w:t> text content, preserving run boundaries
        // We collect continuous run text within each paragraph as one "segment"
        return this._extractDocxText();
    }

    _extractDocxText() {
        let text = '';
        this.segments = [];

        // Match each paragraph element
        const paragraphRegex = /<w:p(?:\s[^>]*)?>[\s\S]*?<\/w:p>/g;
        let paraIdx = 0;

        let match;
        while ((match = paragraphRegex.exec(this.sourceXml)) !== null) {
            const paraXml = match[0];

            // Collect all w:t text within this paragraph
            const tRegex = /<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g;
            let paraText = '';
            let tMatch;
            while ((tMatch = tRegex.exec(paraXml)) !== null) {
                // Decode XML entities
                paraText += this._decodeXmlEntities(tMatch[1]);
            }

            // Preserve empty paragraphs (blank lines, spacing)
            this.segments.push({
                id:       paraIdx,
                original: paraText,
                humanized: paraText  // default = unchanged
            });

            if (paraText.trim()) {
                text += paraText + '\n';
            } else {
                text += '\n';
            }
            paraIdx++;
        }

        return text.trim();
    }

    // ──────────────────────────────────────────────
    // DOCX: apply humanized text back to XML, download
    // ──────────────────────────────────────────────
    async _downloadDocx(humanizedText) {
        // Split humanized text back into paragraph lines
        const humanizedLines = humanizedText.split('\n');

        // Map each segment to its humanized counterpart
        let lineIdx = 0;
        const nonEmptySegments = this.segments.filter(s => s.original.trim());
        nonEmptySegments.forEach(seg => {
            // Find next non-empty line from humanized output
            while (lineIdx < humanizedLines.length && !humanizedLines[lineIdx].trim()) {
                lineIdx++;
            }
            if (lineIdx < humanizedLines.length) {
                seg.humanized = humanizedLines[lineIdx];
                lineIdx++;
            }
        });

        // Build modified XML by replacing w:t content paragraph by paragraph
        let modifiedXml = this.sourceXml;
        let paraIdx = 0;

        modifiedXml = modifiedXml.replace(/<w:p(?:\s[^>]*)?>[\s\S]*?<\/w:p>/g, (paraXml) => {
            const seg = this.segments[paraIdx];
            paraIdx++;

            if (!seg || !seg.original.trim()) return paraXml; // preserve empty paragraphs as-is

            const newText = seg.humanized || seg.original;

            // Strategy: replace all w:t content with humanized text in the FIRST run,
            // remove text from subsequent runs within the same paragraph.
            // This preserves run formatting (bold, italic, font size) from the first run.
            let firstRunDone = false;
            return paraXml.replace(/<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g, (fullMatch, oldText, offset, str) => {
                if (!firstRunDone) {
                    firstRunDone = true;
                    // Preserve xml:space="preserve" attribute if present
                    const hasSpace = fullMatch.includes('xml:space');
                    const escapedText = this._encodeXmlEntities(newText);
                    return hasSpace
                        ? `<w:t xml:space="preserve">${escapedText}</w:t>`
                        : `<w:t>${escapedText}</w:t>`;
                } else {
                    // Empty out subsequent w:t in same paragraph
                    const hasSpace = fullMatch.includes('xml:space');
                    return hasSpace ? `<w:t xml:space="preserve"></w:t>` : `<w:t></w:t>`;
                }
            });
        });

        // Write modified XML back into the ZIP
        this.sourceZip.file('word/document.xml', modifiedXml);

        // Generate and download
        const blob = await this.sourceZip.generateAsync({ type: 'blob', compression: 'DEFLATE' });
        const baseName = this.sourceFile.name.replace(/\.docx$/i, '');
        this._triggerDownload(blob, `${baseName}_humanized.docx`);
    }

    // ──────────────────────────────────────────────
    // PDF: extract text via PDF.js
    // ──────────────────────────────────────────────
    async _loadPdf(file) {
        if (typeof pdfjsLib === 'undefined') {
            throw new Error('Perpustakaan PDF.js belum dimuat. Periksa koneksi internet.');
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();

            let pageText = '';
            let lastY = null;
            content.items.forEach(item => {
                if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
                    pageText += '\n';
                }
                pageText += item.str;
                lastY = item.transform[5];
            });
            fullText += pageText + '\n\n';
        }

        return fullText.trim();
    }

    // PDF → Download as DOCX (plain text, since PDF layout can't be reconstructed client-side)
    _downloadDocxFromText(text, originalName) {
        // Build a minimal valid DOCX from scratch using just XML strings
        // This creates a simple but properly formatted Word document
        const paragraphs = text.split('\n').map(line => {
            const escaped = this._encodeXmlEntities(line);
            if (!line.trim()) {
                return `<w:p><w:pPr><w:spacing w:after="0"/></w:pPr></w:p>`;
            }
            return `<w:p>
  <w:pPr>
    <w:spacing w:after="160" w:line="276" w:lineRule="auto"/>
  </w:pPr>
  <w:r>
    <w:rPr>
      <w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/>
      <w:sz w:val="24"/>
      <w:szCs w:val="24"/>
    </w:rPr>
    <w:t xml:space="preserve">${escaped}</w:t>
  </w:r>
</w:p>`;
        }).join('\n');

        const docXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:wpc="http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas"
  xmlns:cx="http://schemas.microsoft.com/office/drawing/2014/chartex"
  xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
  xmlns:aink="http://schemas.microsoft.com/office/drawing/2016/ink"
  xmlns:am3d="http://schemas.microsoft.com/office/drawing/2017/model3d"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  xmlns:oel="http://schemas.microsoft.com/office/2019/extlst"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"
  xmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:wp14="http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing"
  xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"
  xmlns:w10="urn:schemas-microsoft-com:office:word"
  xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"
  xmlns:w14="http://schemas.microsoft.com/office/word/2010/wordml"
  xmlns:w15="http://schemas.microsoft.com/office/word/2012/wordml"
  xmlns:w16cex="http://schemas.microsoft.com/office/word/2018/wordml/cex"
  xmlns:w16cid="http://schemas.microsoft.com/office/word/2016/wordml/cid"
  xmlns:w16="http://schemas.microsoft.com/office/word/2018/wordml"
  xmlns:w16sdtdh="http://schemas.microsoft.com/office/word/2020/wordml/sdtdatahash"
  xmlns:w16se="http://schemas.microsoft.com/office/word/2015/wordml/symex"
  xmlns:wpg="http://schemas.microsoft.com/office/word/2010/wordprocessingGroup"
  xmlns:wpi="http://schemas.microsoft.com/office/word/2010/wordprocessingInk"
  xmlns:wne="http://schemas.microsoft.com/office/word/2006/wordml"
  xmlns:wps="http://schemas.microsoft.com/office/word/2010/wordprocessingShape"
  mc:Ignorable="w14 w15 w16se w16cid w16 w16cex w16sdtdh wp14">
  <w:body>
    ${paragraphs}
    <w:sectPr>
      <w:pgSz w:w="12240" w:h="15840"/>
      <w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1800" w:header="720" w:footer="720" w:gutter="0"/>
    </w:sectPr>
  </w:body>
</w:document>`;

        // Build minimal DOCX zip structure
        if (typeof JSZip === 'undefined') {
            // Fallback: download as plain text
            const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
            const baseName = originalName.replace(/\.pdf$/i, '');
            this._triggerDownload(blob, `${baseName}_humanized.txt`);
            return;
        }

        const zip = new JSZip();

        zip.file('[Content_Types].xml', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`);

        zip.file('_rels/.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`);

        zip.file('word/_rels/document.xml.rels', `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`);

        zip.file('word/document.xml', docXml);

        zip.generateAsync({ type: 'blob', compression: 'DEFLATE' }).then(blob => {
            const baseName = originalName.replace(/\.pdf$/i, '');
            this._triggerDownload(blob, `${baseName}_humanized.docx`);
        });
    }

    // ──────────────────────────────────────────────
    // Helpers
    // ──────────────────────────────────────────────
    _triggerDownload(blob, filename) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(() => URL.revokeObjectURL(url), 5000);
    }

    _decodeXmlEntities(str) {
        return str
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&apos;/g, "'");
    }

    _encodeXmlEntities(str) {
        return (str || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }
}

if (typeof window !== 'undefined') {
    window.DocumentProcessor = DocumentProcessor;
}
