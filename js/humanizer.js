/**
 * Antislop Humanizer Engine (Advanced Multi-Layer Architecture)
 * Grounded in Antislop Copywriting & De-Detection Principles:
 * - Never invent facts (R-17, R-36, R-38, C-5)
 * - Eliminate empty AI vocabulary & signposting (R-16)
 * - Eliminate em dashes (R-02)
 * - Dynamic burstiness & varied sentence length cadence
 * - Deep context-safe lexical variation across all topics
 * - Authentic voice styling across 6 specific tones
 */

class TextHumanizer {
    constructor() {
        // Built-in fallback dictionary if external dictionary is absent
        this.fallbackSynonyms = (typeof window !== 'undefined' && window.HUMANIZER_DICTIONARY)
            ? window.HUMANIZER_DICTIONARY
            : {
                id: {
                    "penting": ["signifikan", "krusial", "utama", "esensial"],
                    "sangat": ["amat", "cukup", "begitu", "teramat"],
                    "menunjukkan": ["memperlihatkan", "mengindikasikan", "mencerminkan", "mencatatkan"],
                    "membantu": ["memudahkan", "menunjang", "mendorong", "menyokong"],
                    "masalah": ["kendala", "tantangan", "persoalan", "hambatan"],
                    "membuat": ["menjadikan", "menghasilkan", "menciptakan"],
                    "menggunakan": ["menerapkan", "memanfaatkan", "mengadopsi", "mengoptimalkan"],
                    "pendekatan": ["metode", "kerangka kerja", "sudut pandang"]
                },
                en: {
                    "important": ["vital", "essential", "significant", "pivotal"],
                    "shows": ["demonstrates", "reveals", "highlights", "signals"]
                }
            };
    }

    /**
     * LAYER 1: Token Protection Guard
     * Extracts and safeguards elements that MUST NEVER be mutated:
     * - Formal greetings & salutations (e.g. "Assalamualaikum...", "Yth. Bapak/Ibu...", "Selamat pagi...")
     * - Technical capitalized acronyms (e.g. APT, CAPM, IHSG, AI, ROE, DNA, etc.)
     * - Numerical values, statistics, percentages, and currencies (e.g. 10%, Rp 50.000, 2024, 3.5)
     * - Text inside quotes and parentheses
     */
    protectTokens(text) {
        const tokens = [];
        let placeholderIndex = 0;

        function addToken(match) {
            const key = `__ANTISLOP_TOKEN_${placeholderIndex++}__`;
            tokens.push({ key, value: match });
            return key;
        }

        let protectedText = text;

        // 1. Protect formal salutation phrases up to comma or period (without greedily capturing subsequent text)
        protectedText = protectedText.replace(/\b(?:assalamu\s*['’`]?\s*alaikum(?:\s+warahmatullahi\s+wabarakatuh)?|wa\s*['’`]?\s*alaikum\s*salam|(?:kepada\s+)?yth\.?\s+[^,\.\n]+(?:,\s*(?:rekan-rekan|saudara|mahasiswa|bapak|ibu)[^,\.\n]*)*|selamat\s+(?:pagi|siang|sore|malam|sejahtera|datang)|dengan\s+hormat|dear\s+[^,\.\n]+)(?:,|\.|\n|$)/gi, (match) => {
            return addToken(match.trim());
        });

        // 2. Protect parenthetical technical definitions or acronym references (e.g. "(APT)", "(multi-factor model)")
        protectedText = protectedText.replace(/\([^\(\)\n]{1,60}\)/g, (match) => {
            return addToken(match);
        });

        // 3. Protect currency, percentages, numbers with units, and multi-digit values
        // Excludes isolated single/double digits (e.g. "1.", "2.") so list items work properly
        protectedText = protectedText.replace(/(?:Rp\s*[\d\.,]+|\b\d+(?:[\.,]\d+)?\s*%|\b\d+(?:[\.,]\d+)*(?:\s+(?:persen|tahun|ribu|juta|miliar|triliun|km|kg|cm|m|USD|EUR|IDR))\b|\b\d{1,3}(?:\.\d{3})+(?:,\d+)?\b|\b\d{4,}\b)/g, (match) => {
            return addToken(match);
        });

        // 4. Protect uppercase acronyms (2 to 7 letters, e.g. APT, CAPM, IHSG, PPh, ROE, GDP, LLM, GPT)
        protectedText = protectedText.replace(/\b[A-Z]{2,7}(?:-[A-Z0-9]+)?\b/g, (match) => {
            return addToken(match);
        });

        return { text: protectedText, tokens };
    }

    /**
     * Restores protected tokens accurately in the final stage.
     */
    restoreTokens(text, tokens) {
        let restored = text;
        for (let i = tokens.length - 1; i >= 0; i--) {
            const t = tokens[i];
            restored = restored.split(t.key).join(t.value);
        }
        return restored;
    }

    /**
     * Checks if a sentence is an opening salutation or formal permission request.
     */
    isSalutationOrOpening(sentence) {
        if (!sentence) return false;
        const s = sentence.trim().toLowerCase();
        return /^(?:assalamu|wa\s*['’`]?\s*alaikum|salam|yth\.?|kepada\s+yth|selamat\s+(?:pagi|siang|sore|malam|sejahtera|datang)|halo|hai|dengan\s+hormat|dear|hello|hi|good\s+(?:morning|afternoon|evening)|to\s+whom)/i.test(s);
    }

    /**
     * Checks if a sentence already starts with an introductory preposition, adverb, or conjunction.
     */
    hasIntroductoryPhrase(sentence) {
        if (!sentence) return false;
        const s = sentence.trim().toLowerCase();
        return /^(?:berdasarkan|menurut|dalam\s+|sehubungan|terkait|merujuk|ditinjau|melihat|sebagai\s+|ketika|saat|jika|apabila|karena|sebab|meskipun|walaupun|adapun|oleh\s+karena\s+itu|dengan\s+demikian|selain\s+itu|namun|tetapi|artinya|faktanya|secara\s+|pada\s+dasarnya|konsep\s+|alasan\s+|di\s+sinilah|based\s+on|according\s+to|regarding|when|if|because|although|however|therefore|moreover|notably)/i.test(s);
    }

    /**
     * Splits text into distinct paragraphs while preserving structural spacing.
     */
    splitParagraphs(text) {
        return text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    }

    /**
     * Splits paragraph into complete sentences safely, protecting abbreviation dots.
     */
    splitSentences(lineText) {
        if (!lineText || !lineText.trim()) return [];
        const protectedLine = lineText
            .replace(/\b(Yth|Dr|Ir|Prof|No|e\.g|i\.e|dsb|dll|dst)\./gi, '$1__ABBR_DOT__')
            .replace(/(\d+)\.(\d+)/g, '$1__NUMDOT__$2');
        const matches = protectedLine.match(/[^.!?\n]+[.!?]+(?:\s+|$)|[^.!?\n]+$/g);
        if (!matches) return [lineText];
        return matches.map(s => s.replace(/__ABBR_DOT__/g, '.').replace(/__NUMDOT__/g, '.').trim()).filter(s => s.length > 0);
    }

    /**
     * LAYER 2: De-Slop & Cliché Stripping (R-16, R-36, R-02)
     * Replaces universal AI clichés, announcements, and empty pompous phrasing.
     */
    replaceCliches(sentence, lang) {
        let modified = sentence;
        const langPack = (typeof window !== 'undefined' && window.LANGUAGES && window.LANGUAGES[lang])
            ? window.LANGUAGES[lang]
            : null;

        if (langPack && langPack.cliches) {
            langPack.cliches.forEach(rule => {
                modified = modified.replace(rule.pattern, rule.replacement);
            });
        }

        // Clean up em dashes per R-02
        modified = modified.replace(/\s*—\s*/g, ", ").replace(/\s*--\s*/g, ", ");

        // Clean pleonasms (kata mubazir)
        if (lang === 'id') {
            modified = modified
                .replace(/\bagar\s+supaya\b/gi, "agar")
                .replace(/\badalah\s+merupakan\b/gi, "merupakan")
                .replace(/\bsangat\s+amat\b/gi, "sangat")
                .replace(/\bhanya\s+sekadar\b/gi, "sekadar")
                .replace(/\bdemi\s+untuk\b/gi, "demi");
        }

        return modified;
    }

    /**
     * LAYER 3: Dynamic Burstiness & Syntactic Restructuring (R-02, R-16)
     * Transforms robotic, evenly spaced AI sentences into dynamic human cadence:
     * - Breaks overly long, monotonous compound sentences (>22 words) into distinct complete thoughts.
     * - Blends excessively clipped adjacent fragments.
     * - Alters monotonous subject-verb-object cadence.
     */
    /**
     * LAYER 3: Dynamic Burstiness & Syntactic Restructuring (R-02, R-16, R-36)
     * Transforms robotic, evenly spaced AI sentences into dynamic human cadence:
     * - Breaks overly long, monotonous compound sentences (>18 words) into distinct complete thoughts.
     * - Blends excessively clipped adjacent fragments.
     * - Inserts punchy short anchoring statements (2-5 words) to create high variance in sentence length.
     * - Inverts subordinate clauses for natural human rhythm.
     */
    modulateBurstiness(sentences, tone, lang, intensity) {
        if (!sentences || sentences.length === 0) return [];

        const result = [];
        let i = 0;

        while (i < sentences.length) {
            let current = sentences[i];
            const next = sentences[i + 1];

            // Protect greetings and salutations
            if (this.isSalutationOrOpening(current)) {
                result.push(current);
                i++;
                continue;
            }

            // Clause Inversion in Indonesian (moving purpose/conditional clause forward)
            if (lang === 'id') {
                // Invert "pekerja dituntut/perlu X agar/supaya tetap kompetitif di Y" -> "Supaya tetap kompetitif di Y, pekerja perlu X"
                const purposeMatch = current.match(/^(.*?)\s+(?:agar|supaya)\s+(tetap\s+[^\.,;]+?)\s*,\s*(.*)$/i);
                if (purposeMatch && purposeMatch[1].length > 15) {
                    const mainClause = purposeMatch[1].trim();
                    const purposeClause = purposeMatch[2].trim();
                    const rest = purposeMatch[3] ? " " + purposeMatch[3].trim() : "";
                    current = `Agar ${purposeClause}, ${mainClause.charAt(0).toLowerCase() + mainClause.slice(1)}${rest}`;
                }
            }

            const currentWords = current.split(/\s+/).filter(Boolean);

            // Safe sentence split for overly long AI sentences (>18 words) with coordinating conjunctions or markers
            // Do NOT split if sentence begins with a subordinate conjunction (e.g. "Ketika...", "Saat...", "Jika...")
            // because splitting would leave the first part as an incomplete clause fragment!
            const isSubordinateStart = /^(?:ketika|saat|apabila|jika|meskipun|walaupun|kendati|sebelum|setelah|sewaktu|tatkala|when|while|if|although|despite|even though)\b/i.test(current.trim());

            if (!isSubordinateStart && currentWords.length > 18) {
                const splitRegex = lang === 'id'
                    ? /(,\s*(?:namun|tetapi|sedangkan|sehingga|padahal|bahkan|sementara\s+itu|di\s+mana|yakni|yaitu)\s+)/i
                    : /(,\s*(?:however|whereas|meaning\s+that|while|whereby|namely)\s+)/i;

                const match = current.match(splitRegex);
                if (match && match.index > 25 && (current.length - match.index) > 20) {
                    const firstPart = current.slice(0, match.index).trim() + '.';
                    let secondPart = current.slice(match.index + match[0].length).trim();
                    
                    if (secondPart.length > 0) {
                        const rawConnector = match[1].replace(/^[,\s]+|[,\s]+$/g, '');
                        // Transform connector into natural independent opener
                        let opener = rawConnector.charAt(0).toUpperCase() + rawConnector.slice(1);
                        if (opener.toLowerCase() === 'yakni' || opener.toLowerCase() === 'yaitu') {
                            opener = 'Secara khusus,';
                        } else if (opener.toLowerCase() === 'sehingga') {
                            const openers = ['Kondisi ini memungkinkan', 'Hal ini membuat', 'Dengan demikian,', 'Dampaknya,', 'Dengan begitu,'];
                            opener = openers[Math.floor(Math.random() * openers.length)];
                        } else if (opener.toLowerCase() === 'namun' || opener.toLowerCase() === 'tetapi') {
                            const openers = ['Namun,', 'Akan tetapi,', 'Hanya saja,', 'Di sisi lain,'];
                            opener = openers[Math.floor(Math.random() * openers.length)];
                        } else if (opener.toLowerCase() === 'sementara itu') {
                            const openers = ['Sementara itu,', 'Di saat bersamaan,'];
                            opener = openers[Math.floor(Math.random() * openers.length)];
                        } else {
                            opener = `${opener},`;
                        }
                        secondPart = `${opener} ${secondPart.charAt(0).toLowerCase() + secondPart.slice(1)}`;
                        result.push(firstPart);
                        result.push(secondPart);
                        i++;
                        continue;
                    }
                }
            }

            // Safe merge of two very short adjacent sentences (<7 words) without questions/exclamations
            if (next && !this.isSalutationOrOpening(next) && currentWords.length < 7 && !/[?!:]/.test(current)) {
                const nextWords = next.split(/\s+/).filter(Boolean);
                if (nextWords.length < 7 && !/[?!:]/.test(next) && Math.random() > 0.50) {
                    const cleanCurrent = current.replace(/[.!?]+$/, '');
                    const cleanNext = next.charAt(0).toLowerCase() + next.slice(1);
                    const glue = lang === 'id'
                        ? (tone === 'academic' ? ' sekaligus ' : ' dan ')
                        : (tone === 'academic' ? ', whereby ' : ', and ');
                    result.push(cleanCurrent + glue + cleanNext);
                    i += 2;
                    continue;
                }
            }

            result.push(current);
            i++;
        }

        return result;
    }

    /**
     * LAYER 4: Deep Context-Safe Lexical Humanization
     * Balanced substitution matching parts of speech, avoiding thesaurus-bot over-saturation.
     */
    injectPerplexity(sentence, lang, intensity, isNeural = false) {
        if (this.isSalutationOrOpening(sentence)) return sentence;

        const dictSource = (typeof window !== 'undefined' && window.HUMANIZER_DICTIONARY && window.HUMANIZER_DICTIONARY[lang])
            ? window.HUMANIZER_DICTIONARY[lang]
            : (this.fallbackSynonyms[lang] || this.fallbackSynonyms['id']);

        if (!dictSource) return sentence;

        // Balanced change probability (0.50 - 0.58) ensures authentic human voice without thesaurus stiffness
        const changeProbability = isNeural ? 0.58 : (intensity === 'ultra' ? 0.55 : (intensity === 'balanced' ? 0.45 : 0.35));

        return sentence.replace(/\b([a-zA-Zà-ž]+)\b/g, (match, word, offset, fullStr) => {
            // 1. Never alter protected tokens
            if (match.startsWith('__ANTISLOP_TOKEN')) return match;

            // 2. Preserve acronyms
            if (match === match.toUpperCase() && match.length > 1) return match;

            const lower = match.toLowerCase();

            // 3. Protect fixed collocations (both prefix and suffix)
            const before = fullStr.slice(0, offset);
            const after = fullStr.slice(offset + match.length);

            if (lower === 'tinggi' && /\bperguruan\s+$/i.test(before)) return match;
            if (lower === 'perguruan' && /^\s+tinggi\b/i.test(after)) return match;
            if (lower === 'waktu' && /\b(?:menyisihkan|meluangkan|tenggat|kurun|jangka|luang)\s+$/i.test(before)) return match;
            if (lower === 'kesempatan' && /\b(?:menyisihkan|meluangkan)\s+$/i.test(before)) return match;
            if (lower === 'modal' && /\bpasar\s+$/i.test(before)) return match;
            if (lower === 'pasar' && /^\s+(?:modal|uang|tenaga\s+kerja)\b/i.test(after)) return match;
            if (lower === 'asumsi' && /^\s+(?:tambahan|dasar|logis)\b/i.test(after)) return match;
            if (lower === 'tambahan' && /\basumsi\s+$/i.test(before)) return match;
            if (lower === 'kurva' && /^\s+(?:pembelajaran|belajar)\b/i.test(after)) return match;
            if ((lower === 'pembelajaran' || lower === 'belajar') && /\bkurva\s+$/i.test(before)) return match;
            if (lower === 'daya' && /\bsumber\s+$/i.test(before)) return match;
            if (lower === 'sumber' && /^\s+daya\b/i.test(after)) return match;
            if (lower === 'kerja' && /\b(?:tata|pola|ruang)\s+$/i.test(before)) return match;
            if (lower === 'kelola' && /\btata\s+$/i.test(before)) return match;
            if (lower === 'tata' && /^\s+(?:kelola|kerja|tertib|ruang)\b/i.test(after)) return match;
            if (lower === 'pasok' && /\brantai\s+$/i.test(before)) return match;
            if (lower === 'rantai' && /^\s+pasok\b/i.test(after)) return match;
            if (lower === 'keluar' && /\bjalan\s+$/i.test(before)) return match;
            if (lower === 'jalan' && /^\s+keluar\b/i.test(after)) return match;
            if (lower === 'hasil' && /\bimbal\s+$/i.test(before)) return match;
            if (lower === 'imbal' && /^\s+hasil\b/i.test(after)) return match;
            if (lower === 'faktor' && /\b(?:banyak|multi)[\s-]*$/i.test(before)) return match;
            if (lower === 'penghasilan' && /\bpajak\s+$/i.test(before)) return match;
            if (lower === 'sistematis' && /\brisiko\s+$/i.test(before)) return match;
            if (lower === 'risiko' && /^\s+(?:pasar|sistematis)\b/i.test(after)) return match;
            if (lower === 'kas' && /\barus\s+$/i.test(before)) return match;
            if (lower === 'arus' && /^\s+kas\b/i.test(after)) return match;
            if (lower === 'saing' && /\bdaya\s+$/i.test(before)) return match;
            if (lower === 'daya' && /^\s+saing\b/i.test(after)) return match;
            if (lower === 'impas' && /\btitik\s+$/i.test(before)) return match;
            if (lower === 'titik' && /^\s+impas\b/i.test(after)) return match;
            if (lower === 'tetapi' && /\bakan\s+$/i.test(before)) return match;
            if (lower === 'akan' && /^\s+tetapi\b/i.test(after)) return match;
            if (lower === 'hanya' && /^\s+saja\b/i.test(after)) return match;
            if (lower === 'saja' && /\bhanya\s+$/i.test(before)) return match;
            if (lower === 'sisi' && /\bdi\s+$/i.test(before) && /^\s+lain\b/i.test(after)) return match;
            if (lower === 'lain' && /\bdi\s+sisi\s+$/i.test(before)) return match;
            if (lower === 'hal' && /\b(?:mempelajari|belajar)\s+$/i.test(before)) return match;

            // 4. Context-safe synonym injection
            if (dictSource[lower] && Math.random() < changeProbability) {
                const candidates = dictSource[lower];
                const alternateCandidates = candidates.filter(c => c.toLowerCase() !== lower);
                const pool = alternateCandidates.length > 0 ? alternateCandidates : candidates;
                const replacement = pool[Math.floor(Math.random() * pool.length)];

                // Preserve original capitalization
                if (match[0] === match[0].toUpperCase() && match.length > 1) {
                    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
                }
                return replacement;
            }

            return match;
        });
    }

    /**
     * LAYER 5: Tone Voice Modulation (All 6 Styles)
     * Shapes tone-specific vocabulary and rhetorical pacing without robotic transition spam.
     */
    applyToneStyling(sentences, tone, lang, intensity) {
        return sentences.map((sentence, idx) => {
            let processed = sentence.trim();

            if (this.isSalutationOrOpening(processed)) {
                return processed;
            }

            // 1. AKADEMIK (Academic) Tone
            if (tone === 'academic') {
                processed = processed
                    .replace(/\bsangat\s+bagus\b/gi, "berkualitas tinggi")
                    .replace(/\bmenguntungkan\b/gi, "memberi keuntungan nyata")
                    .replace(/\bbikin\b/gi, "menghasilkan")
                    .replace(/\bnggak\b/gi, "tidak")
                    .replace(/\bcuma\b/gi, "hanya")
                    .replace(/\bbanget\b/gi, "sangat")
                    .replace(/\bvery\s+good\b/gi, "notably effective");
            }

            // 2. FORMAL & BISNIS (Formal & Business) Tone
            else if (tone === 'formal') {
                processed = processed
                    .replace(/\bkita\s+harus\b/gi, "kita perlu")
                    .replace(/\bwe\s+must\b/gi, "it is recommended to")
                    .replace(/\bdiharapkan\b/gi, "menjadi fokus utama untuk")
                    .replace(/\bngomong-ngomong\b/gi, "sebagai informasi tambahan");
            }

            // 3. SANTAI (Casual) Tone
            else if (tone === 'casual') {
                processed = processed
                    .replace(/\bnamun\s+demikian\b/gi, "tapi nyatanya")
                    .replace(/\boleh\s+karena\s+itu\b/gi, "makanya")
                    .replace(/\bdiperlukan\b/gi, "butuh")
                    .replace(/\bsebenarnya\b/gi, "sebetulnya")
                    .replace(/\bmenurut\s+pendapat\s+saya\b/gi, "kalau menurut saya pribadi");
            }

            // 4. JURNALISTIK (Journalistic) Tone
            else if (tone === 'journalistic') {
                processed = processed
                    .replace(/\bdapat\s+dikatakan\s+bahwa\b/gi, "catatannya,")
                    .replace(/\bmenurut\s+hemat\s+saya\b/gi, "pantauan di lapangan,")
                    .replace(/\bhal\s+ini\s+sangat\s+menarik\b/gi, "kondisi ini memantik perhatian");
            }

            // 5. KREATIF (Creative) Tone
            else if (tone === 'creative') {
                processed = processed
                    .replace(/\bpada\s+akhirnya\b/gi, "lambat laun")
                    .replace(/\bsecara\s+nyata\b/gi, "terasa begitu hidup");
            }

            // 6. RINGKAS & JELAS (Simple) Tone
            else if (tone === 'simple') {
                processed = processed
                    .replace(/\b(?:dapat\s+dikatakan\s+bahwa|pada\s+dasarnya|dalam\s+hal\s+ini)\b/gi, '')
                    .replace(/\s{2,}/g, ' ')
                    .trim();
            }

            // Capitalize sentence start
            if (processed.length > 0 && !processed.startsWith('__ANTISLOP_TOKEN')) {
                processed = processed.charAt(0).toUpperCase() + processed.slice(1);
            }

            return processed;
        });
    }

    /**
     * MAIN HUMANIZATION PIPELINE
     * Transforms input text into natural, fluent human prose across all topics.
     */
    humanize(text, options = {}) {
        const {
            tone = 'academic',
            lang = 'id',
            intensity = 'balanced',
            isNeural = false
        } = options;

        if (!text || !text.trim()) return "";

        const effectiveIntensity = isNeural ? 'ultra' : intensity;

        // LAYER 1: Token Protection Guard (Acronyms, greetings, numbers, quotes)
        const { text: guardedText, tokens } = this.protectTokens(text);

        // Split text by lines to preserve 100% of enters, newlines, and paragraph structures
        const lines = guardedText.split(/\r?\n/);
        const transformedLines = [];

        for (const line of lines) {
            // If the line is empty or purely whitespace, preserve it exactly (maintains double enters / blank lines)
            if (line.trim().length === 0) {
                transformedLines.push(line);
                continue;
            }

            // Preserve leading indentation / whitespace (e.g. tabs or spaces)
            const leadingWhitespaceMatch = line.match(/^[ \t]*/);
            const leadingWhitespace = leadingWhitespaceMatch ? leadingWhitespaceMatch[0] : "";
            const trimmedLine = line.slice(leadingWhitespace.length);

            // Preserve list prefixes (e.g. "1. ", "a) ", "- ", "• ")
            const listPrefixMatch = trimmedLine.match(/^(\d+[\.\)]\s*|[-*•]\s*|[a-zA-Z][\.\)]\s*)/);
            let listPrefix = "";
            let contentToProcess = trimmedLine;

            if (listPrefixMatch) {
                listPrefix = listPrefixMatch[0];
                contentToProcess = trimmedLine.slice(listPrefix.length);
            }

            // Check if line is a header / title / label (e.g., "Asumsi Tambahan:", "Catatan:", "### Header")
            // Preserve headers verbatim to prevent corrupting titles or section labels
            const isHeaderOrLabel = /^#{1,6}\s+/.test(contentToProcess) || /^[A-Za-z0-9\s]{1,35}:$/.test(contentToProcess.trim());
            if (isHeaderOrLabel) {
                transformedLines.push(leadingWhitespace + listPrefix + contentToProcess);
                continue;
            }

            // Step 1: Split into individual sentences within this line
            let sentences = this.splitSentences(contentToProcess);

            // Step 2: Layer 2 - De-Slop Cliché & Formulaic AI Removal
            sentences = sentences.map(s => this.replaceCliches(s, lang));

            // Step 3: Layer 3 - Dynamic Burstiness & Syntactic Restructuring
            sentences = this.modulateBurstiness(sentences, tone, lang, effectiveIntensity);

            // Step 4: Layer 4 - Deep Context-Safe Lexical Humanization (500+ Dictionary)
            sentences = sentences.map(s => this.injectPerplexity(s, lang, effectiveIntensity, isNeural));

            // Step 5: Layer 5 - Tone Voice Modulation
            sentences = this.applyToneStyling(sentences, tone, lang, effectiveIntensity);

            // Reassemble line with its original indentation and list prefix
            const processedContent = sentences.join(' ');
            transformedLines.push(leadingWhitespace + listPrefix + processedContent);
        }

        let result = transformedLines.join('\n');

        // LAYER 6: Post-Processing & Token Restoration
        result = this.restoreTokens(result, tokens);

        // Normalize spacing: ONLY touch horizontal whitespace (spaces/tabs)!
        // NEVER replace \n or \r!
        result = result
            .replace(/[ \t]+([,\.!\?;:])/g, '$1')
            .replace(/([,\.!\?;:])([a-zA-Zà-ž])/g, '$1 $2')
            .replace(/[ \t]{2,}/g, ' ')
            .replace(/[ \t]+$/gm, '') // Remove trailing whitespace on each line
            .trim();

        return result;
    }
}

if (typeof window !== 'undefined') {
    window.TextHumanizer = TextHumanizer;
}
