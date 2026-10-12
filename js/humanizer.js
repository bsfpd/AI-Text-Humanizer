/**
 * Antislop Humanizer Engine (Advanced Multi-Layer Architecture)
 * Grounded in Meaning-Aware Rewriting & Antislop Copywriting Principles:
 * - Strict semantic & factual fidelity: never invent, mutate, or omit facts (R-17, R-36, R-38)
 * - Eliminate empty AI vocabulary, robotic transitions, and filler signposting (R-16)
 * - Eliminate em dashes (R-02)
 * - Preserve authentic sentence cadence and natural Indonesian syntax
 * - Context-safe lexical refinement without reckless thesaurus-bot swapping
 * - Authentic voice styling across 7 specific tones
 */

class TextHumanizer {
    constructor() {
        // Built-in fallback dictionary if external dictionary is absent
        this.fallbackSynonyms = (typeof window !== 'undefined' && window.HUMANIZER_DICTIONARY)
            ? window.HUMANIZER_DICTIONARY
            : {
                id: {
                    "penting": ["krusial", "utama", "esensial"],
                    "sangat": ["amat", "cukup", "teramat"],
                    "menunjukkan": ["memperlihatkan", "mengindikasikan", "mencerminkan"],
                    "membantu": ["memudahkan", "menunjang", "menyokong"],
                    "masalah": ["kendala", "tantangan", "persoalan"],
                    "membuat": ["menjadikan", "menghasilkan", "menciptakan"],
                    "menggunakan": ["menerapkan", "memanfaatkan", "mengadopsi"],
                    "pendekatan": ["metode", "kerangka kerja", "sudut pandang"]
                },
                en: {
                    "important": ["vital", "essential", "significant"],
                    "shows": ["demonstrates", "reveals", "highlights"]
                }
            };
    }

    /**
     * LAYER 1: Token Protection Guard
     * Extracts and safeguards elements that MUST NEVER be mutated:
     * - Islamic religious greetings & closings (Assalamu'alaikum, etc.)
     * - Addressed entities and salutations with specific titles/names
     * - Legal articles & statutory references (e.g. Pasal 27 ayat (2), UU No. 13 Tahun 2003)
     * - Scientific formulas, equations, and dosages (e.g. fc' = 32,4 MPa, 500 mg, 1,5°C)
     * - Academic citations (e.g. Sugiyono (2018:137), (Smith, 2020))
     * - Technical capitalized acronyms (e.g. APT, CAPM, IHSG, AI, ROE, DNA, EKMA4315, etc.)
     * - Numerical values, statistics, percentages, and currencies (e.g. 10%, Rp 50.000, 2024, 3.5)
     * - Text inside quotes and parentheses
     */
    protectTokens(text) {
        const tokens = [];
        let placeholderIndex = 0;

        function addIslamicToken(match) {
            const key = `__ANTISLOP_ISLAMIC_TOKEN_${placeholderIndex++}__`;
            tokens.push({ key, value: match });
            return key;
        }

        function addToken(match) {
            const key = `__ANTISLOP_TOKEN_${placeholderIndex++}__`;
            tokens.push({ key, value: match });
            return key;
        }

        let protectedText = text;

        // 1. Strictly Protect Islamic religious greetings & closings (100% intact across all tones)
        protectedText = protectedText.replace(/\b(?:assalamu\s*['’`]?\s*alaikum(?:\s+warahmatullahi\s+wabarakatuh|\s+wr\.?\s*wb\.?)?|wa\s*['’`]?\s*alaikum\s*salam(?:\s+warahmatullahi\s+wabarakatuh|\s+wr\.?\s*wb\.?)?|wassalamu\s*['’`]?\s*alaikum(?:\s+warahmatullahi\s+wabarakatuh|\s+wr\.?\s*wb\.?)?)(?:[,\.]|(?=[!\?\r\n]|$))/gi, (match) => {
            return addIslamicToken(match.trim());
        });

        // 2. Protect addressed entities (Yth. ...) with specific titles, organizations, or names
        protectedText = protectedText.replace(/\b(?:Yth\.?|Yang\s+Terhormat)\s+(?:Bapak|Ibu|Sdr|Sdri|Dr|Ir|Prof|Direktur|Dekan|Rektor|Pimpinan|Ketua|Manager|Kepala|Tutor|Dosen|Civitas|Rekan|PT|CV|Instansi|Kepala|Bupati|Gubernur|Walikota)[^\n,]+/gi, (match) => {
            return addToken(match.trim());
        });

        // 3. Protect specific citations (e.g. Sugiyono (2018:137), (2018:137), (Smith, 2020))
        protectedText = protectedText.replace(/\b[A-Z][a-zA-Z\s]{1,30}\s*\(\d{4}(?::\d+)?\)/g, (match) => {
            return addToken(match);
        });

        // 4. Protect legal references (Pasal ... ayat ..., UU No. ... Tahun ...)
        protectedText = protectedText.replace(/\b(?:Pasal\s+\d+(?:\s+ayat\s+\(\d+\))?|UU(?:D)?(?:\s+(?:No\.?\s*)?\d+)?(?:\s+Tahun\s+\d+)?(?:\s+tentang\s+[A-Za-z\s]+)?)\b/gi, (match) => {
            return addToken(match);
        });

        // 5. Protect formulas, equations, scientific measurements
        protectedText = protectedText.replace(/\b[a-zA-Z]+'?(?:\s*=\s*[\d.,]+(?:\s*[A-Za-z]+)?)\b/g, (match) => {
            return addToken(match);
        });
        protectedText = protectedText.replace(/\b\d+(?:[.,]\d+)?\s*(?:mg|kg|g|ml|l|cm|m|km|MPa|ms|RPS|°C)\b/gi, (match) => {
            return addToken(match);
        });

        // 6. Protect parenthetical technical definitions or acronym references (e.g. "(APT)", "(multi-factor model)")
        protectedText = protectedText.replace(/\([^\(\)\n]{1,60}\)/g, (match) => {
            return addToken(match);
        });

        // 7. Protect currency, percentages, numbers with units, and multi-digit values
        protectedText = protectedText.replace(/(?:Rp\s*[\d\.,]+|\b\d+(?:[\.,]\d+)?\s*%|\b\d+(?:[\.,]\d+)*(?:\s+(?:persen|tahun|ribu|juta|miliar|triliun|km|kg|cm|m|USD|EUR|IDR))\b|\b\d{1,3}(?:\.\d{3})+(?:,\d+)?\b|\b\d{4,}\b)/g, (match) => {
            return addToken(match);
        });

        // 8. Protect uppercase acronyms (2 to 10 characters, including course codes e.g. APT, CAPM, IHSG, EKMA4315, ADPU4230)
        protectedText = protectedText.replace(/\b[A-Z]{2,10}(?:[0-9]+)?(?:-[A-Z0-9]+)?\b/g, (match) => {
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
        return /^(?:assalamu|wa\s*['’‘`]?\s*alaikum|wassalamu|salam|yth\.?|kepada\s+(?:yth|yang\s+terhormat)|yang\s+terhormat|selamat\s+(?:pagi|siang|sore|malam|sejahtera|datang)|halo|hai|dengan\s+hormat|dear|hello|hi|good\s+(?:morning|afternoon|evening|day)|to\s+whom|greetings)/i.test(s);
    }

    /**
     * Checks if a sentence is a closing remark, sign-off, or gratitude expression.
     */
    isClosing(sentence) {
        if (!sentence) return false;
        const s = sentence.trim().toLowerCase();
        return /^(?:demikian|sekian|terima\s+kasih|hormat\s+(?:kami|saya)|salam\s+(?:hangat|sukses)|best\s+regards|warm\s+regards|sincerely|thank\s+you|thanks)/i.test(s) || /(?:terima\s+kasih|thank\s+you)\.?$/i.test(s);
    }

    /**
     * Checks if a sentence already starts with an introductory preposition, adverb, or conjunction.
     */
    hasIntroductoryPhrase(sentence) {
        if (!sentence) return false;
        const s = sentence.trim().toLowerCase();
        return /^(?:berdasarkan|menurut|dalam\s+|sehubungan|terkait|merujuk|mengacu|ditinjau|melihat|sebagai\s+|ketika|saat|jika|apabila|karena|sebab|meskipun|walaupun|adapun|oleh\s+karena\s+itu|dengan\s+demikian|selain\s+itu|namun|tetapi|artinya|faktanya|secara\s+|pada\s+dasarnya|konsep\s+|alasan\s+|di\s+sinilah|izin\s+|based\s+on|according\s+to|regarding|when|if|because|although|however|therefore|moreover|notably)/i.test(s);
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
     * LAYER 2: De-Slop & Cliché Stripping
     * Cleans up empty AI filler openers, formulaic tropes, and pleonasms.
     * Preserves sentence structure and repairs capitalization.
     */
    replaceCliches(sentence, lang, tone) {
        let modified = sentence;

        if (lang === 'id') {
            modified = modified
                // Signposting openers with zero informational value
                .replace(/^(?:perlu diketahui bahwa|perlu dicatat bahwa|perlu dipahami bahwa|patut diketahui bahwa|sudah seharusnya kita sadari bahwa|tidak bisa dipungkiri bahwa),?\s*/i, '')
                .replace(/^(?:pada hakikatnya|pada intinya|pada umumnya|secara umum dapat dikatakan bahwa|sejatinya adalah bahwa),?\s*/i, '')
                .replace(/^(?:dengan kata lain,?\s*dapat dikatakan bahwa|artinya dapat kita simpulkan bahwa),?\s*/i, '')
                // Emoji decoration at line start
                .replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}]+\s*/u, '')
                // Bold-every-term inline-header list
                .replace(/^\*\*([^*:]{1,40}):\*\*\s*/g, '')
                // Actorless passive openers — "Dapat dilihat bahwa", "Dapat dikatakan bahwa"
                .replace(/^(?:dapat dilihat bahwa|dapat dikatakan bahwa|dapat dipahami bahwa|dapat disimpulkan bahwa),?\s*/i, '')
                // Stacked hedging — "Bisa dikatakan mungkin bahwa"
                .replace(/\b(?:mungkin saja bisa|kiranya dapat|bisa jadi mungkin)\b/gi, 'bisa');
        } else if (lang === 'en') {
            modified = modified
                .replace(/^(?:It is widely acknowledged that|It is commonly understood that|Needless to say,|It goes without saying that|It is worth noting that|It is important to note that|It should be noted that),?\s*/i, '')
                .replace(/^(?:Let me explain|Allow me to elaborate|In this section[,.]?|Here's what you need to know[.:]),?\s*/i, '')
                .replace(/^(?:Without further ado,|Let's dive in[.:]),?\s*/i, '')
                .replace(/^[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FEFF}]+\s*/u, '')
                .replace(/^\*\*([^*:]{1,40}):\*\*\s*/g, '')
                .replace(/\b(?:could potentially possibly|may perhaps|might possibly)\b/gi, 'may');
        }

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
                .replace(/\bamat\s+sangat\b/gi, "amat")
                .replace(/\bhanya\s+sekadar\b/gi, "sekadar")
                .replace(/\bhanya\s+cuma\b/gi, "cuma")
                .replace(/\bdemi\s+untuk\b/gi, "demi")
                .replace(/\bsaling\s+berinteraksi\s+satu\s+sama\s+lain\b/gi, "saling berinteraksi")
                .replace(/\bnaik\s+meningkat\b/gi, "meningkat")
                .replace(/\bturun\s+menurun\b/gi, "menurun")
                .replace(/\bmasuk\s+ke\s+dalam\b/gi, "masuk ke")
                .replace(/\bkeluar\s+dari\s+dalam\b/gi, "keluar dari");
        } else if (lang === 'en') {
            modified = modified
                .replace(/\beach\s+and\s+every\b/gi, "every")
                .replace(/\bfirst\s+and\s+foremost\b/gi, "first")
                .replace(/\bnull\s+and\s+void\b/gi, "void")
                .replace(/\bright\s+and\s+proper\b/gi, "proper");
        }

        // Fix capitalization after filler strip left an uncapitalized start
        if (modified.length > 0 && modified[0] !== modified[0].toUpperCase()) {
            modified = modified.charAt(0).toUpperCase() + modified.slice(1);
        }

        return modified;
    }

    /**
     * LAYER 3: Sentence Flow & Cadence Refinement
     * Treats long sentences with respect: Indonesian formal & academic writing
     * naturally contains well-formed complex sentences (20-30 words).
     * Only splits genuine run-on sentences (>32 words) with stacked clauses,
     * using semantically faithful connectors without inventing canned rhetorical commentary.
     */
    modulateBurstiness(sentences, tone, lang, intensity) {
        if (!sentences || sentences.length === 0) return [];

        const result = [];
        let i = 0;

        while (i < sentences.length) {
            let current = sentences[i];
            const next = sentences[i + 1];

            // Protect greetings, salutations, and closings
            if (this.isSalutationOrOpening(current) || this.isClosing(current)) {
                result.push(current);
                i++;
                continue;
            }

            const currentWords = current.split(/\s+/).filter(Boolean);

            // Safe sentence split: Only applied to genuinely excessive run-ons (>32 words)
            // or when intensity is 'ultra' on sentences >26 words with heavy stacked coordinate clauses.
            const splitThreshold = intensity === 'ultra' ? 26 : 34;
            const isSubordinateStart = /^(?:ketika|saat|apabila|jika|meskipun|walaupun|kendati|sebelum|setelah|sewaktu|tatkala|when|while|if|although|despite|even though)\b/i.test(current.trim());

            if (!isSubordinateStart && currentWords.length > splitThreshold) {
                const splitRegex = lang === 'id'
                    ? /(,\s*(?:dan\s+hal\s+ini|yang\s+mana\s+hal\s+ini|sehingga\s+pada\s+akhirnya)\s+)/i
                    : /(,\s*(?:which\s+consequently\s+means\s+that|and\s+this\s+subsequently\s+leads\s+to)\s+)/i;

                const match = current.match(splitRegex);
                if (match && match.index > 30 && (current.length - match.index) > 25) {
                    const firstPart = current.slice(0, match.index).trim() + '.';
                    let secondPart = current.slice(match.index + match[0].length).trim();

                    if (secondPart.length > 0) {
                        const opener = (tone === 'academic' || tone === 'formal') ? 'Dampaknya,' : 'Hal ini membuat';
                        secondPart = `${opener} ${secondPart.charAt(0).toLowerCase() + secondPart.slice(1)}`;
                        result.push(firstPart);
                        result.push(secondPart);
                        i++;
                        continue;
                    }
                }
            }

            result.push(current);
            i++;
        }

        return result;
    }

    /**
     * LAYER 3.5: Multi-Word Semantic Phrase Collocations ("Similar Means")
     * Replaces formulaic, verbose, or bureaucratic phrases with concise, natural human equivalents.
     */
    applySimilarMeans(sentence, lang, intensity) {
        if (this.isSalutationOrOpening(sentence) || this.isClosing(sentence)) return sentence;

        const similarMeansList = (typeof window !== 'undefined' && window.SIMILAR_MEANS_DICTIONARY && window.SIMILAR_MEANS_DICTIONARY[lang])
            ? window.SIMILAR_MEANS_DICTIONARY[lang]
            : null;

        if (!similarMeansList || similarMeansList.length === 0) return sentence;

        let modified = sentence;

        for (const rule of similarMeansList) {
            if (rule.pattern.test(modified)) {
                modified = modified.replace(rule.pattern, (match) => {
                    if (match.includes('__ANTISLOP_')) return match;
                    if (rule.replacements && rule.replacements.length > 0) {
                        // Pick first natural replacement deterministically or pseudo-randomly
                        const rep = rule.replacements[0];
                        if (match[0] === match[0].toUpperCase() && match.length > 1) {
                            return rep.charAt(0).toUpperCase() + rep.slice(1);
                        }
                        return rep;
                    }
                    return match;
                });
            }
        }

        return modified;
    }

    /**
     * LAYER 4: Context-Safe Lexical Refinement
     * Never performs indiscriminate thesaurus substitution.
     * In 'standard' intensity: 0% substitution (keeps original diction).
     * In 'balanced' intensity: Replaces only known bureaucratic/stiff words with cleaner equivalents.
     * In 'ultra' intensity: Carefully polishes general descriptors while strictly preserving domain nouns.
     */
    injectPerplexity(sentence, lang, intensity, isNeural = false) {
        if (this.isSalutationOrOpening(sentence) || this.isClosing(sentence)) return sentence;
        if (intensity === 'standard') return sentence; // Clean & faithful: no word swapping

        const dictSource = (typeof window !== 'undefined' && window.HUMANIZER_DICTIONARY && window.HUMANIZER_DICTIONARY[lang])
            ? window.HUMANIZER_DICTIONARY[lang]
            : (this.fallbackSynonyms[lang] || this.fallbackSynonyms['id']);

        if (!dictSource) return sentence;

        // Controlled, conservative probability: 0% for standard, 15% for balanced, 25% for ultra
        const changeProbability = intensity === 'ultra' ? 0.25 : 0.15;

        // Strict domain terms that must NEVER be mutated
        const DOMAIN_LOCK_ID = new Set([
            'laba', 'rugi', 'biaya', 'ongkos', 'harga', 'anggaran', 'kas', 'utang', 'piutang', 'saham', 'obligasi',
            'dividen', 'modal', 'pasar', 'risiko', 'bunga', 'pajak', 'inflasi', 'ekuitas', 'aktiva', 'pasiva',
            'metode', 'teori', 'model', 'data', 'sampel', 'populasi', 'variabel', 'regresi', 'korelasi', 'uji',
            'dosis', 'pasien', 'obat', 'darah', 'ginjal', 'tekanan', 'sel', 'gen', 'virus', 'bakteri',
            'pasal', 'undang-undang', 'hukum', 'aturan', 'kebijakan', 'birokrasi', 'pemerintah', 'daerah',
            'modul', 'materi', 'tutor', 'dosen', 'mahasiswa', 'kampus', 'universitas', 'sekolah', 'guru',
            'sistem', 'aplikasi', 'jaringan', 'server', 'program', 'kode', 'latensi', 'basis', 'arsitektur'
        ]);

        return sentence.replace(/\b([a-zA-Zà-ž]+)\b/g, (match, word, offset, fullStr) => {
            if (match.startsWith('__ANTISLOP_TOKEN')) return match;
            if (match === match.toUpperCase() && match.length > 1) return match; // Acronyms

            const lower = match.toLowerCase();
            if (DOMAIN_LOCK_ID.has(lower)) return match; // Domain lock

            // Function & stop words guard
            const STOP_WORDS_ID = new Set(['yang','dan','di','ke','dari','ini','itu','dengan','untuk','pada','oleh','adalah','ada','saja','pun','juga','serta','atau','karena','sebab','jika','bila','meski','agar','atas','bagi','demi','sejak','setelah','sebelum','saat','ketika','hampir','telah','sudah','akan','sedang','bisa','dapat','harus','perlu','boleh','mau','masih','lagi','ya','tidak','tak','jangan','lebih','paling','sangat','amat','begitu','cukup','terlalu','semua','setiap','beberapa','banyak','sedikit','lain','lainnya','satu','dua','pertama','kedua']);
            if (STOP_WORDS_ID.has(lower)) return match;

            // Proper nouns check (preceded by capital word or corporate prefix)
            const before = fullStr.slice(0, offset);
            if (match[0] === match[0].toUpperCase() && /\b[A-Z][a-zA-Z0-9_-]+\s+$/.test(before)) return match;
            if (/\b(?:pt|cv|ud|tb|bank|univ|universitas|fakultas|jurusan|yayasan|rs|rumah\s+sakit)\s+(?:[A-Za-z0-9_-]+\s+)?$/i.test(before)) return match;

            if (dictSource[lower] && Math.random() < changeProbability) {
                const candidates = dictSource[lower];
                const alternateCandidates = candidates.filter(c => c.toLowerCase() !== lower);
                if (alternateCandidates.length > 0) {
                    const replacement = alternateCandidates[0]; // Take safest primary synonym
                    if (match[0] === match[0].toUpperCase() && match.length > 1) {
                        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
                    }
                    return replacement;
                }
            }

            return match;
        });
    }

    /**
     * LAYER 5: Tone Voice Modulation
     * Applies tone-specific stylistic refinements cleanly.
     */
    applyToneStyling(sentences, tone, lang, intensity) {
        const langPack = (typeof window !== 'undefined' && window.LANGUAGES && window.LANGUAGES[lang])
            ? window.LANGUAGES[lang]
            : null;
        const toneRules = (langPack && langPack.toneReplacements && langPack.toneReplacements[tone])
            ? langPack.toneReplacements[tone]
            : [];

        return sentences.map((sentence) => {
            let processed = sentence.trim();

            if (this.isSalutationOrOpening(processed) || this.isClosing(processed)) {
                return processed;
            }

            // 1. Apply tone-specific rules from language pack
            toneRules.forEach(rule => {
                processed = processed.replace(rule.pattern, rule.replacement);
            });

            // 2. Rhetorical and syntactic shaping across tones
            if (tone === 'academic') {
                processed = processed
                    .replace(/\bsangat\s+bagus\b/gi, "berkualitas tinggi")
                    .replace(/\bmenguntungkan\b/gi, "memberi nilai tambah nyata")
                    .replace(/\bbikin\b/gi, "menghasilkan")
                    .replace(/\bnggak\b/gi, "tidak")
                    .replace(/\bcuma\b/gi, "hanya")
                    .replace(/\bbanget\b/gi, "sangat");
            } else if (tone === 'tuton') {
                processed = processed
                    .replace(/\bsebagai\s+seorang\s+mahasiswa\s*(?:saya\s+memandang\s+bahwa)?/gi, "menurut pemahaman saya,")
                    .replace(/\bdalam\s+hal\s+ini\s+penulis\s+berpendapat\s+bahwa\b/gi, "dari sudut pandang saya,")
                    .replace(/\boleh\s+karena\s+itu\s+sangat\s+disarankan\s+untuk\b/gi, "karena itu, langkah realistisnya adalah")
                    .replace(/\bnggak\b/gi, "tidak")
                    .replace(/\bbikin\b/gi, "membuat")
                    .replace(/\bcuma\b/gi, "hanya")
                    .replace(/\bbanget\b/gi, "sangat")
                    .replace(/\bintinya\b/gi, "poin utamanya,");
            } else if (tone === 'formal') {
                processed = processed
                    .replace(/\bkita\s+harus\b/gi, "manajemen perlu")
                    .replace(/\bngomong-ngomong\b/gi, "sebagai informasi tambahan")
                    .replace(/\bkasih\s+tahu\b/gi, "menginformasikan")
                    .replace(/\bcek\s+lagi\b/gi, "meninjau ulang")
                    .replace(/\bcepat-cepat\b/gi, "segera");
            } else if (tone === 'casual') {
                processed = processed
                    .replace(/\bnamun\s+demikian,?\b/gi, "tapi nyatanya,")
                    .replace(/\boleh\s+karena\s+itu,?\b/gi, "makanya,")
                    .replace(/\bdiperlukan\b/gi, "butuh")
                    .replace(/\bsebenarnya\b/gi, "sebetulnya")
                    .replace(/\btetapi\b/gi, "tapi");
            } else if (tone === 'simple') {
                processed = processed
                    .replace(/\b(?:dapat\s+dikatakan\s+bahwa|pada\s+dasarnya|dalam\s+hal\s+ini|sebagaimana\s+diketahui)\b/gi, '')
                    .replace(/\bdalam\s+rangka\s+untuk\b/gi, "untuk")
                    .replace(/\bpada\s+saat\s+ini\b/gi, "kini")
                    .replace(/\bmemiliki\s+kemampuan\s+untuk\b/gi, "bisa")
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
     * LAYER 5B: Author Voice Profile Processing (Offline / On-Device)
     * Analyzes writing sample and modulates formality, audience, preferred, and avoided expressions.
     */
    analyzeVoiceSample(sampleText) {
        if (!sampleText || typeof sampleText !== 'string' || sampleText.trim().length < 20) {
            return null;
        }

        const sentences = this.splitSentences(sampleText.trim()).filter(s => s.trim().length > 0);
        if (sentences.length === 0) return null;

        let totalWords = 0;
        const connectorCounts = {};
        const commonConnectors = [
            'namun', 'tetapi', 'karena itu', 'oleh karena itu', 'sehingga',
            'selain itu', 'dengan demikian', 'adapun', 'bahkan', 'padahal',
            'sementara itu', 'di sisi lain', 'terkait dengan', 'dalam hal ini'
        ];

        let informalCount = 0;
        let formalCount = 0;
        const informalRegex = /\b(?:nggak|enggak|banget|bikin|gimana|kayak|udah|aja|kan|makanya|dong)\b/i;
        const formalRegex = /\b(?:berdasarkan|sebagaimana|sehubungan|menurut|dikemukakan|substansial|komprehensif|berkenaan|selaras)\b/i;

        sentences.forEach(s => {
            const words = s.trim().split(/\s+/).filter(Boolean);
            totalWords += words.length;

            const lower = s.toLowerCase();
            commonConnectors.forEach(conn => {
                if (lower.includes(conn)) {
                    connectorCounts[conn] = (connectorCounts[conn] || 0) + 1;
                }
            });

            if (informalRegex.test(lower)) informalCount++;
            if (formalRegex.test(lower)) formalCount++;
        });

        const avgSentenceLength = Math.max(1, Math.round(totalWords / sentences.length));
        let formalityTendency = 'balanced';
        if (informalCount > formalCount && informalCount > 0) {
            formalityTendency = 'casual';
        } else if (formalCount > informalCount && formalCount > 0) {
            formalityTendency = 'formal';
        }

        return {
            avgSentenceLength,
            connectorCounts,
            formalityTendency
        };
    }

    applyFormality(sentence, formality, lang) {
        if (lang !== 'id') return sentence;
        let processed = sentence;

        if (formality === 'very_casual') {
            processed = processed
                .replace(/\boleh\s+karena\s+itu,?\b/gi, "karena itu,")
                .replace(/\bmeskipun\s+demikian,?\b/gi, "walaupun begitu,")
                .replace(/\bsehubungan\s+dengan\s+hal\s+tersebut,?\b/gi, "mengenai hal itu,")
                .replace(/\bmengindikasikan\s+bahwa\b/gi, "menunjukkan bahwa")
                .replace(/\bmerupakan\s+instrumen\s+fundamental\b/gi, "menjadi bagian penting")
                .replace(/\bterdapat\s+kebutuhan\s+mendesak\b/gi, "kita perlu segera");
        } else if (formality === 'casual') {
            processed = processed
                .replace(/\bsebagaimana\s+diketahui\s+bahwa,?\b/gi, "seperti yang kita tahu,")
                .replace(/\boleh\s+sebab\s+itu,?\b/gi, "karena itu,")
                .replace(/\bdalam\s+rangka\b/gi, "untuk")
                .replace(/\bmemperlihatkan\s+bahwa\b/gi, "menunjukkan bahwa");
        } else if (formality === 'formal') {
            processed = processed
                .replace(/\bkarena\s+itu,?\b/gi, "oleh karena itu,")
                .replace(/\bmasalah\s+ini\b/gi, "persoalan ini")
                .replace(/\bbisa\b/gi, "dapat")
                .replace(/\bsangat\s+penting\b/gi, "memiliki urgensi tinggi");
        } else if (formality === 'very_formal') {
            processed = processed
                .replace(/\b(?:oleh\s+karena\s+itu|karena\s+itu),?\s*/gi, "dengan demikian, berdasarkan pertimbangan tersebut, ")
                .replace(/\bsejalan\s+dengan\s+itu,?\s*/gi, "selaras dengan ketentuan yang berlaku, ")
                .replace(/\bharus\s+dilakukan\b/gi, "perlu ditindaklanjuti secara saksama")
                .replace(/\bmenjelaskan\s+bahwa\b/gi, "menguraikan bahwasanya");
        }

        return processed;
    }

    applyAudience(sentence, audience, lang) {
        if (lang !== 'id' || !audience) return sentence;
        const audLower = audience.toLowerCase();
        let processed = sentence;

        if (/dosen|tutor|kampus|universitas|akademik/.test(audLower)) {
            processed = processed
                .replace(/\bjelas\s+bahwa\b/gi, "berdasarkan kajian yang ada,")
                .replace(/\bpokoknya\b/gi, "poin intinya,")
                .replace(/\bmenurut\s+saya,?\b/gi, "menurut pemahaman saya,")
                .replace(/\bseperti\s+yang\s+kita\s+tahu,?\b/gi, "sebagaimana dibahas dalam materi,");
        } else if (/rekan|kerja|tim|kantor|kolaborator/.test(audLower)) {
            processed = processed
                .replace(/\bdiharapkan\s+agar\s+segera\b/gi, "mari kita prioritaskan")
                .replace(/\bperlu\s+dipahami\s+bersama\s+bahwa\b/gi, "sebagai catatan bersama,");
        } else if (/pimpinan|direktur|atasan|manajemen|kepala/.test(audLower)) {
            processed = processed
                .replace(/\bkami\s+meminta\b/gi, "kami memohon pertimbangan dan arahan")
                .replace(/\bkami\s+laporkan\b/gi, "berikut kami sampaikan ringkasan laporan")
                .replace(/\bkita\s+harus\b/gi, "kami menyarankan manajemen untuk");
        } else if (/umum|publik|masyarakat|pembaca\s+umum/.test(audLower)) {
            processed = processed
                .replace(/\bsignifikansi\b/gi, "arti penting")
                .replace(/\bimplementasi\b/gi, "penerapan")
                .replace(/\bkomprehensif\b/gi, "menyeluruh")
                .replace(/\binstrumen\b/gi, "sarana");
        }

        return processed;
    }

    applyAvoidedPhrases(sentence, avoidPhrases, lang) {
        if (!avoidPhrases || typeof avoidPhrases !== 'string') return sentence;
        const avoidList = avoidPhrases
            .split(',')
            .map(p => p.trim())
            .filter(p => p.length >= 2);

        if (avoidList.length === 0) return sentence;

        const knownReplacements = {
            'krusial': 'penting',
            'holistik': 'menyeluruh',
            'secara mendalam': 'secara saksama',
            'perlu digarisbawahi': 'perlu dicatat',
            'paradigma': 'kerangka berpikir',
            'instrumen fundamental': 'fondasi utama',
            'dalam era digital': 'saat ini',
            'tidak dapat dipungkiri': 'nyatanya',
            'menyelami': 'mempelajari',
            'signifikan': 'berarti',
            'testament': 'bukti nyata',
            'delve into': 'examine',
            'crucial': 'important',
            'comprehensive': 'detailed'
        };

        let processed = sentence;

        avoidList.forEach(phrase => {
            const phraseLower = phrase.toLowerCase();
            const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escaped}\\b`, 'gi');

            if (regex.test(processed)) {
                let repl = knownReplacements[phraseLower];
                if (!repl) {
                    // Try dictionary lookup
                    const dict = (typeof window !== 'undefined' && window.HUMANIZER_DICTIONARY && window.HUMANIZER_DICTIONARY[lang])
                        ? window.HUMANIZER_DICTIONARY[lang]
                        : this.fallbackSynonyms[lang];
                    if (dict && dict[phraseLower] && dict[phraseLower].length > 0) {
                        repl = dict[phraseLower][0];
                    }
                }

                if (repl) {
                    processed = processed.replace(regex, (match) => {
                        if (match[0] === match[0].toUpperCase()) {
                            return repl.charAt(0).toUpperCase() + repl.slice(1);
                        }
                        return repl;
                    });
                }
            }
        });

        return processed;
    }

    applyPreferredPhrases(sentence, preferredPhrases) {
        if (!preferredPhrases || typeof preferredPhrases !== 'string') return sentence;
        const prefList = preferredPhrases
            .split(',')
            .map(p => p.trim())
            .filter(p => p.length >= 2);

        if (prefList.length === 0) return sentence;

        let processed = sentence;

        prefList.forEach(pref => {
            const prefLower = pref.toLowerCase();

            // Match contextual opportunities without spraying randomly
            if (/menurut\s+(?:pemahaman|pandangan|hemat)\s+saya/.test(prefLower)) {
                processed = processed.replace(/\b(?:menurut\s+saya|dalam\s+pandangan\s+saya|hemat\s+saya|berdasarkan\s+telaah\s+kritis|menurut\s+hemat\s+penulis),?\s*/gi, `${pref}, `);
            } else if (/sejalan\s+dengan/.test(prefLower)) {
                processed = processed.replace(/\b(?:sesuai\s+dengan\s+itu|berkaitan\s+dengan\s+itu),?\s*/gi, `${pref}, `);
            } else if (/terbukti\s+bahwa/.test(prefLower) || prefLower === 'terbukti') {
                processed = processed.replace(/\b(?:terlihat\s+jelas\s+bahwa|tampak\s+bahwa)\b/gi, 'terbukti bahwa');
            } else if (prefLower === 'oleh karena itu') {
                processed = processed.replace(/\b(?:karena\s+itu|maka\s+dari\s+itu),?\s*/gi, 'oleh karena itu, ');
            } else if (prefLower === 'karena itu') {
                processed = processed.replace(/\b(?:oleh\s+karena\s+itu|maka\s+dari\s+itu),?\s*/gi, 'karena itu, ');
            }
        });

        return processed;
    }

    applyVoiceProfile(sentences, voiceProfile, lang) {
        if (!voiceProfile || !voiceProfile.enabled) {
            return sentences;
        }

        const sampleAnalysis = voiceProfile.sampleText ? this.analyzeVoiceSample(voiceProfile.sampleText) : null;
        const effectiveFormality = voiceProfile.formality && voiceProfile.formality !== 'balanced'
            ? voiceProfile.formality
            : (sampleAnalysis ? sampleAnalysis.formalityTendency : 'balanced');

        return sentences.map(sentence => {
            let processed = sentence.trim();

            if (this.isSalutationOrOpening(processed) || this.isClosing(processed)) {
                return processed;
            }

            // 1. Avoided Phrases Reduction
            if (voiceProfile.avoidPhrases) {
                processed = this.applyAvoidedPhrases(processed, voiceProfile.avoidPhrases, lang);
            }

            // 2. Preferred Phrases Alignment
            if (voiceProfile.preferredPhrases) {
                processed = this.applyPreferredPhrases(processed, voiceProfile.preferredPhrases);
            }

            // 3. Formality Shaping
            if (effectiveFormality && effectiveFormality !== 'balanced') {
                processed = this.applyFormality(processed, effectiveFormality, lang);
            }

            // 4. Target Audience Tuning
            if (voiceProfile.audience) {
                processed = this.applyAudience(processed, voiceProfile.audience, lang);
            }

            // Ensure proper capitalization if not a token
            if (processed.length > 0 && !processed.startsWith('__ANTISLOP_TOKEN')) {
                processed = processed.charAt(0).toUpperCase() + processed.slice(1);
            }

            return processed;
        });
    }

    /**
     * Adapts general opening salutations and closing sign-offs according to the active Tone,
     * while strictly protecting Islamic greetings and preserving addressed entities/names.
     */
    harmonizeSalutationsAndClosings(lines, tone, lang) {
        if (!lines || lines.length === 0) return lines;
        const langPack = (typeof window !== 'undefined' && window.LANGUAGES && window.LANGUAGES[lang]) ? window.LANGUAGES[lang] : null;
        if (!langPack || !langPack.openings || !langPack.closings) return lines;

        const targetOpening = langPack.openings[tone];
        const targetClosing = langPack.closings[tone];

        // Specific recipient title check: If greeting addresses a specific person, company, or institution, NEVER overwrite it!
        const hasSpecificRecipient = (str) => {
            return /\b(?:Direktur|Dekan|Rektor|Pimpinan|Ketua|Manager|Kepala|Tutor|Dosen|Bapak|Ibu|Sdr|Dr|Ir|Prof|PT|CV|Instansi|Dinas|Menteri|Bupati|Gubernur|Walikota)\b/i.test(str);
        };

        const bareGreetingRegex = /^(?:selamat\s+(?:pagi|siang|sore|malam|sejahtera|datang)|salam\s+(?:sejahtera|hangat|redaksi)|halo|hai|dear\s+all|good\s+(?:morning|afternoon|evening|day)|hello|hi|greetings)[,\.!:;]?$/i;

        // 1. Detect and harmonize opening greeting (within first 5 non-empty lines)
        let nonEmptiesFound = 0;
        for (let i = 0; i < lines.length && nonEmptiesFound < 5; i++) {
            const rawLine = lines[i];
            const trimmed = rawLine.trim();
            if (!trimmed) continue;
            nonEmptiesFound++;

            // If line contains an Islamic greeting token, keep 100% intact
            if (/__ANTISLOP_ISLAMIC_TOKEN_\d+__/.test(trimmed)) {
                continue;
            }

            // If line contains a protected entity token (e.g. Yth. Bapak Direktur PT ...)
            if (/__ANTISLOP_TOKEN_\d+__/.test(trimmed)) {
                continue;
            }

            // If line addresses a specific entity or recipient, preserve it!
            if (hasSpecificRecipient(trimmed)) {
                continue;
            }

            // Only adapt bare generic greeting formulas without a specific recipient
            if (bareGreetingRegex.test(trimmed) && targetOpening) {
                const leadingWhitespace = (rawLine.match(/^[ \t]*/) || [""])[0];
                lines[i] = leadingWhitespace + targetOpening;
                break;
            }

            // If line is substantive body content (> 60 chars) and does not look like an opening, stop searching
            if (trimmed.length > 60 && !/^(?:salam|yth|selamat|halo|hai|dear|dengan)/i.test(trimmed)) {
                break;
            }
        }

        // 2. Detect and harmonize closing remark (within last 5 non-empty lines)
        const bareClosingRegex = /^(?:demikian(?:\s+terima\s+kasih)?|sekian(?:\s+dan\s+terima\s+kasih)?|terima\s+kasih|hormat\s+(?:kami|saya)|salam\s+hangat|best\s+regards|warm\s+regards|sincerely|thanks|thank\s+you)\.?$/i;

        for (let i = lines.length - 1; i >= Math.max(0, lines.length - 5); i--) {
            const rawLine = lines[i];
            const trimmed = rawLine.trim();
            if (!trimmed) continue;

            if (/__ANTISLOP_ISLAMIC_TOKEN_\d+__/.test(trimmed)) continue;
            if (/__ANTISLOP_TOKEN_\d+__/.test(trimmed)) continue;

            // Only adapt bare generic closing sign-offs if target closing is defined
            if (bareClosingRegex.test(trimmed) && targetClosing) {
                const leadingWhitespace = (rawLine.match(/^[ \t]*/) || [""])[0];
                lines[i] = leadingWhitespace + targetClosing;
                break;
            }
        }

        return lines;
    }

    /**
     * MAIN REWRITING PIPELINE
     * Transforms input text into natural, fluent human prose across all topics.
     */
    humanize(text, optionsOrTone = {}, intensityArg, langArg, voiceProfileArg) {
        let tone = 'academic';
        let lang = 'id';
        let intensity = 'balanced';
        let isNeural = false;
        let voiceProfile = null;

        if (typeof optionsOrTone === 'object' && optionsOrTone !== null) {
            tone = optionsOrTone.tone || 'academic';
            lang = optionsOrTone.lang || 'id';
            intensity = optionsOrTone.intensity || 'balanced';
            isNeural = !!optionsOrTone.isNeural;
            voiceProfile = optionsOrTone.voiceProfile || null;
        } else if (typeof optionsOrTone === 'string') {
            tone = optionsOrTone;
            intensity = intensityArg || 'balanced';
            lang = langArg || 'id';
            voiceProfile = voiceProfileArg || null;
        }

        if (!text || !text.trim()) return "";

        // LAYER 1: Token Protection Guard (Islamic greetings, acronyms, numbers, legal references, citations)
        const { text: guardedText, tokens } = this.protectTokens(text);

        // Split text by lines to preserve 100% of enters, newlines, and paragraph structures
        let lines = guardedText.split(/\r?\n/);

        // Harmonize bare greetings and closings according to active Tone
        lines = this.harmonizeSalutationsAndClosings(lines, tone, lang);
        lines = lines.join('\n').split(/\r?\n/);

        const transformedLines = [];

        for (const line of lines) {
            // Preserve empty lines
            if (line.trim().length === 0) {
                transformedLines.push(line);
                continue;
            }

            // Preserve leading whitespace
            const leadingWhitespaceMatch = line.match(/^[ \t]*/);
            const leadingWhitespace = leadingWhitespaceMatch ? leadingWhitespaceMatch[0] : "";
            const trimmedLine = line.slice(leadingWhitespace.length);

            // Preserve list prefixes
            const listPrefixMatch = trimmedLine.match(/^(\d+[\.\)]\s*|[-*•]\s*|[a-zA-Z][\.\)]\s*)/);
            let listPrefix = "";
            let contentToProcess = trimmedLine;

            if (listPrefixMatch) {
                listPrefix = listPrefixMatch[0];
                contentToProcess = trimmedLine.slice(listPrefix.length);
            }

            // Preserve headers verbatim
            const isHeaderOrLabel = /^#{1,6}\s+/.test(contentToProcess) || /^[A-Za-z0-9\s]{1,35}:$/.test(contentToProcess.trim());
            if (isHeaderOrLabel) {
                transformedLines.push(leadingWhitespace + listPrefix + contentToProcess);
                continue;
            }

            // Step 1: Split into individual sentences
            let sentences = this.splitSentences(contentToProcess);

            // Step 2: Semantic Collocations ("Similar Means")
            sentences = sentences.map(s => this.applySimilarMeans(s, lang, intensity));

            // Step 3: Cliché & Pleonasm Removal
            sentences = sentences.map(s => this.replaceCliches(s, lang, tone));

            // Step 4: Sentence Cadence Refinement
            sentences = this.modulateBurstiness(sentences, tone, lang, intensity);

            // Step 5: Diction & Clarity Refinement
            sentences = sentences.map(s => this.injectPerplexity(s, lang, intensity, isNeural));

            // Step 6: Tone Voice Modulation
            sentences = this.applyToneStyling(sentences, tone, lang, intensity);

            // Step 7: Author Voice Profile Modulation (Offline / On-Device)
            if (voiceProfile && voiceProfile.enabled) {
                sentences = this.applyVoiceProfile(sentences, voiceProfile, lang);
            }

            // Reassemble line
            const processedContent = sentences.join(' ');
            transformedLines.push(leadingWhitespace + listPrefix + processedContent);
        }

        let result = transformedLines.join('\n');

        // LAYER 7: Token Restoration & Post-Processing
        result = this.restoreTokens(result, tokens);

        result = result
            .replace(/,\s*,+/g, ',')
            .replace(/\.\s*\.+/g, '.')
            .replace(/,\s*\./g, '.')
            .replace(/\bsecara\s+secara\b/gi, 'secara')
            .replace(/\bdalam\s+dalam\b/gi, 'dalam')
            .replace(/\byang\s+yang\b/gi, 'yang')
            .replace(/\b([a-zA-Z\u00C0-\u024F]{3,})\s+\1\b/gi, '$1')
            .replace(/\b([a-zA-Z\u00C0-\u024F]+)\s+(?:serta|dan)\s+\1\b/gi, '$1')
            .replace(/[ \t]+([,\.!\?;:])/g, '$1')
            .replace(/([,\.!\?;:])([a-zA-Zà-ž])/g, '$1 $2')
            .replace(/[ \t]{2,}/g, ' ')
            .replace(/[ \t]+$/gm, '')
            .trim();

        return result;
    }
}

if (typeof window !== 'undefined') {
    window.TextHumanizer = TextHumanizer;
}
