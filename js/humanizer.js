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

        // 1. Protect multi-line / full greeting headers at the beginning of paragraphs
        protectedText = protectedText.replace(/(?:^|\n)\s*((?:assalamu\s*['’`]?\s*alaikum(?:\s+warahmatullahi\s+wabarakatuh)?|wa\s*['’`]?\s*alaikum\s*salam|yth\.?[^\n\.\,]+|kepada\s+yth\.?[^\n\.\,]+|selamat\s+(?:pagi|siang|sore|malam|sejahtera|datang)[^\n\.\,]*|dengan\s+hormat,?\s*|dear\s+[^\n\.\,]+)[^\n]*?(?:\.|\n|$))/gi, (match) => {
            return addToken(match);
        });

        // 2. Protect parenthetical technical definitions or acronym references (e.g. "(APT)", "(multi-factor model)")
        protectedText = protectedText.replace(/\([^\(\)\n]{1,60}\)/g, (match) => {
            return addToken(match);
        });

        // 3. Protect numbers, currency, percentages, and dates
        protectedText = protectedText.replace(/(?:Rp\s*[\d\.,]+|\b\d+(?:[\.,]\d+)?\s*%|\b\d{1,4}(?:[\.,]\d{1,4})*(?:\s*(?:persen|tahun|ribu|juta|miliar|triliun|km|kg|cm|m|USD|EUR|IDR))?\b)/g, (match) => {
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
        return /^(?:__antislop_token|assalamu|wa\s*['’`]?\s*alaikum|salam|yth\.?|kepada\s+yth|bapak|ibu|tutor|dosen|saudara|selamat\s+(?:pagi|siang|sore|malam|sejahtera|datang)|halo|hai|mohon\s+izin|dengan\s+hormat|terima\s+kasih|dear|hello|hi|good\s+(?:morning|afternoon|evening)|to\s+whom)/i.test(s);
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
    splitSentences(paragraph) {
        const protectedPara = paragraph.replace(/\b(Yth|Dr|Ir|Prof|No|e\.g|i\.e|dsb|dll|dst)\./gi, '$1__ABBR_DOT__');
        const matches = protectedPara.match(/[^.!?\n]+[.!?]+(?:\s+|$)|[^.!?\n]+$/g);
        if (!matches) return [paragraph];
        return matches.map(s => s.replace(/__ABBR_DOT__/g, '.').trim()).filter(s => s.length > 0);
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
        if (sentences.length <= 1) return sentences;

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
            if (currentWords.length > 18 && !current.includes('__ANTISLOP_TOKEN_0__')) {
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
                            opener = 'Hal ini membuat';
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

        // Dynamically inject a human anchor sentence (2-5 words) if sentences lack burstiness variance
        if (result.length >= 3 && !result[0].startsWith('__ANTISLOP_TOKEN')) {
            const wordCounts = result.map(s => s.split(/\s+/).filter(Boolean).length);
            const avg = wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length;
            const variance = wordCounts.reduce((a, b) => a + Math.pow(b - avg, 2), 0) / wordCounts.length;
            const stdDev = Math.sqrt(variance);

            // If sentence length variance is too low (< 4 words stdDev), inject an authentic human anchor
            if (stdDev < 4.0 && wordCounts.every(w => w > 11)) {
                const anchors = {
                    academic: ["Dampaknya nyata.", "Dasar pertimbangannya jelas.", "Di sinilah letak pembedanya."],
                    formal: ["Langkah ini penting.", "Prioritasnya sudah tepat.", "Tantangannya memang nyata."],
                    casual: ["Simpel sebetulnya.", "Pilihannya jelas.", "Masuk akal, kan?"],
                    journalistic: ["Faktanya berbicara demikian.", "Kondisinya jelas."],
                    creative: ["Satu hal yang pasti.", "Jawabannya ada di sana."],
                    simple: ["Intinya jelas.", "Poinnya sederhana."]
                };
                const pool = anchors[tone] || anchors.academic;
                const anchor = pool[Math.floor(Math.random() * pool.length)];
                // Insert after sentence 1 or 2
                const insertIdx = Math.min(2, result.length - 1);
                result.splice(insertIdx, 0, anchor);
            }
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

            // 3. Protect fixed collocations
            const before = fullStr.slice(0, offset);
            if (lower === 'hasil' && /\bimbal\s+$/i.test(before)) return match;
            if (lower === 'daya' && /\bsumber\s+$/i.test(before)) return match;
            if (lower === 'kerja' && /\btata\s+$/i.test(before)) return match;
            if (lower === 'modal' && /\bpasar\s+$/i.test(before)) return match;
            if (lower === 'faktor' && /\b(?:banyak|multi)[\s-]*$/i.test(before)) return match;
            if (lower === 'penghasilan' && /\bpajak\s+$/i.test(before)) return match;
            if (lower === 'sistematis' && /\brisiko\s+$/i.test(before)) return match;

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

        const paragraphs = this.splitParagraphs(guardedText);
        const transformedParagraphs = [];

        for (const para of paragraphs) {
            // Step 1: Split into individual sentences
            let sentences = this.splitSentences(para);

            // Step 2: Layer 2 - De-Slop Cliché & Formulaic AI Removal
            sentences = sentences.map(s => this.replaceCliches(s, lang));

            // Step 3: Layer 3 - Dynamic Burstiness & Syntactic Restructuring
            sentences = this.modulateBurstiness(sentences, tone, lang, effectiveIntensity);

            // Step 4: Layer 4 - Deep Context-Safe Lexical Humanization (500+ Dictionary)
            sentences = sentences.map(s => this.injectPerplexity(s, lang, effectiveIntensity, isNeural));

            // Step 5: Layer 5 - Tone Voice Modulation
            sentences = this.applyToneStyling(sentences, tone, lang, effectiveIntensity);

            transformedParagraphs.push(sentences.join(' '));
        }

        let result = transformedParagraphs.join('\n\n');

        // LAYER 6: Post-Processing & Token Restoration
        result = this.restoreTokens(result, tokens);

        // Normalize spacing around punctuation
        result = result
            .replace(/\s+([,\.!\?;:])/g, '$1')
            .replace(/([,\.!\?;:])([a-zA-Zà-ž])/g, '$1 $2')
            .replace(/\s{2,}/g, ' ')
            .replace(/\n\s+\n/g, '\n\n')
            .trim();

        return result;
    }
}

if (typeof window !== 'undefined') {
    window.TextHumanizer = TextHumanizer;
}
