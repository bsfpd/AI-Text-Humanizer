/**
 * Advanced Humanizer Engine (Precision & Grammar-Safe Architecture)
 * Produces natural, fluent, unambiguous human text that effortlessly
 * bypasses Turnitin, GPTZero, ZeroGPT, and Copyleaks without grammatical flaws.
 */

class TextHumanizer {
    constructor() {
        // High-precision context-safe synonym dictionaries
        this.synonyms = {
            id: {
                "penting": ["signifikan", "krusial", "utama", "esensial"],
                "sangat": ["amat", "cukup", "begitu", "teramat"],
                "menunjukkan": ["memperlihatkan", "mengindikasikan", "mencerminkan", "mencatatkan"],
                "membantu": ["memudahkan", "menunjang", "mendorong", "menyokong"],
                "masalah": ["kendala", "tantangan", "persoalan", "hambatan"],
                "membuat": ["menjadikan", "menghasilkan", "menciptakan"],
                "menggunakan": ["menerapkan", "memanfaatkan", "mengadopsi", "mengoptimalkan"],
                "memilih": ["memprioritaskan", "condong pada", "menentukan opsi pada"],
                "pendekatan": ["metode", "kerangka kerja", "sudut pandang"],
                "alasan": ["pertimbangan", "dasar pemikiran", "argumen"],
                "asumsi": ["anggapan dasar", "landasan berpikir", "premis"],
                "ketat": ["kaku", "restriktif", "terbatas"],
                "dipengaruhi": ["ditentukan", "didikte", "dikendalikan"],
                "kondisi": ["situasi", "keadaan"],
                "stagnan": ["mendatar", "statis", "cenderung datar"],
                "pergerakan": ["dinamika", "pergeseran", "fluktuasi"],
                "fluktuatif": ["dinamis", "variatif", "berubah-ubah"],
                "membuktikan": ["mempertegas", "menegaskan", "mengonfirmasi"],
                "relevan": ["kontekstual", "aplikatif", "tepat guna"],
                "mengikat": ["membatasi", "mengunci", "mematok"],
                "berbeda": ["kontras", "berlainan", "bervariasi"],
                "berkembang": ["tumbuh pesat", "maju dinamis", "berevolusi"],
                "efektif": ["optimal", "berdaya guna", "tepat sasaran"],
                "hasil": ["temuan", "capaian", "luaran"],
                "tujuan": ["sasaran", "orientasi", "fokus utama"],
                "banyak": ["sejumlah", "beragam", "berbagai"],
                "dampak": ["pengaruh", "konsekuensi", "implikasi"],
                "proses": ["tahapan", "alur", "mekanisme"],
                "mengetahui": ["mencermati", "menyadari", "memahami"],
                "menjelaskan": ["memaparkan", "menguraikan", "menjabarkan"],
                "analisis": ["kajian", "penelaahan", "penelaahan mendalam"],
                "meneliti": ["mengkaji", "menganalisis", "mengevaluasi"],
                "faktor": ["variabel", "parameter", "elemen"],
                "karena": ["lantaran", "mengingat", "disebabkan"],
                "tetapi": ["namun", "akan tetapi", "hanya saja"]
            },
            en: {
                "important": ["vital", "essential", "significant", "key", "pivotal"],
                "shows": ["demonstrates", "reveals", "highlights", "signals", "reflects"],
                "helps": ["assists", "enables", "fosters", "supports", "empowers"],
                "problem": ["hurdle", "challenge", "obstacle", "bottleneck"],
                "use": ["leverage", "utilize", "apply", "adopt"],
                "make": ["generate", "produce", "craft", "shape"],
                "effective": ["impactful", "productive", "optimal", "fruitful"],
                "approach": ["methodology", "framework", "perspective"],
                "result": ["outcome", "finding", "impact"]
            }
        };

        // Grammatically safe adverbial openers (NEVER ending with "bahwa" or verbs)
        this.academicConnectors = {
            id: [
                "Secara konseptual,",
                "Ditinjau lebih mendalam,",
                "Secara empiris,",
                "Dalam konteks ini,",
                "Dari sudut pandang teoritis,"
            ],
            en: [
                "From a theoretical perspective,",
                "Empirically speaking,",
                "Conceptually,",
                "In this context,"
            ]
        };

        this.casualConnectors = {
            id: ["Sebenarnya,", "Menariknya,", "Kalau dilihat lagi,", "Yang menarik,"],
            en: ["Honestly,", "Interestingly,", "Turns out,", "What stands out is"]
        };
    }

    /**
     * Identifies whether a sentence is a salutation, greeting, or formal address.
     * Prevents absurd prefixes (e.g. "Jika diamati secara empiris, assalamualaikum...").
     */
    isSalutationOrOpening(sentence) {
        if (!sentence) return false;
        const s = sentence.trim().toLowerCase();
        return /^(assalamu\s*['’`]?\s*alaikum|wa\s*['’`]?\s*alaikum|salam|yth\.?|kepada\s+yth|selamat\s+(pagi|siang|sore|malam|sejahtera|datang)|halo|hai|mohon\s+izin|dengan\s+hormat|terima\s+kasih|dear|hello|hi|good\s+(morning|afternoon|evening)|to\s+whom)/i.test(s);
    }

    /**
     * Checks if a sentence already starts with an introductory preposition, adverb, or conjunction.
     * Prevents stacked transitions (e.g. "Dalam konteks ini, berdasarkan ilustrasi...").
     */
    hasIntroductoryPhrase(sentence) {
        if (!sentence) return false;
        const s = sentence.trim().toLowerCase();
        return /^(berdasarkan|menurut|dalam\s+|sehubungan|terkait|merujuk|ditinjau|melihat|sebagai\s+|ketika|saat|jika|apabila|karena|sebab|meskipun|walaupun|adapun|oleh\s+karena\s+itu|dengan\s+demikian|selain\s+itu|namun|tetapi|artinya|faktanya|secara\s+|pada\s+dasarnya|konsep\s+|alasan\s+|di\s+sinilah|based\s+on|according\s+to|regarding|when|if|because|although|however|therefore|moreover)/i.test(s);
    }

    /**
     * Splits text into distinct paragraphs while preserving structural spacing.
     */
    splitParagraphs(text) {
        return text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    }

    /**
     * Splits paragraph into complete sentences.
     */
    splitSentences(paragraph) {
        const matches = paragraph.match(/[^.!?\n]+[.!?]+(?:\s+|$)|[^.!?\n]+$/g);
        return matches ? matches.map(s => s.trim()).filter(s => s.length > 0) : [paragraph];
    }

    /**
     * Replaces artificial AI clichés with authentic, natural human expressions.
     */
    replaceCliches(sentence, lang) {
        let modified = sentence;
        const langPack = (window.LANGUAGES && window.LANGUAGES[lang]) ? window.LANGUAGES[lang] : null;

        if (langPack && langPack.cliches) {
            langPack.cliches.forEach(rule => {
                modified = modified.replace(rule.pattern, rule.replacement);
            });
        }
        return modified;
    }

    /**
     * Context-aware synonym injection (preserves acronyms, parentheses, and technical terms).
     */
    injectPerplexity(sentence, lang, intensity) {
        // Never touch greetings or salutations
        if (this.isSalutationOrOpening(sentence)) return sentence;

        const dict = this.synonyms[lang] || this.synonyms['en'];
        if (!dict) return sentence;

        // Controlled probability to prevent unnatural collocations while breaking predictable AI n-grams
        const changeProbability = intensity === 'ultra' ? 0.65 : intensity === 'balanced' ? 0.45 : 0.30;

        return sentence.replace(/\b([a-zA-Zà-ž]+)\b/g, (match, word, offset, fullStr) => {
            // 1. Preserve capitalized acronyms (e.g. APT, CAPM, IHSG, Beta, AI)
            if (match === match.toUpperCase() && match.length > 1) return match;

            // 2. Preserve text inside parentheses
            const before = fullStr.slice(0, offset);
            const openParens = (before.match(/\(/g) || []).length;
            const closeParens = (before.match(/\)/g) || []).length;
            if (openParens > closeParens) return match; // inside parentheses

            // 3. Do not alter fixed compound terms / financial collocations
            const lower = match.toLowerCase();
            if (lower === 'hasil' && /\bimbal\s+$/i.test(before)) return match;
            if (lower === 'daya' && /\bsumber\s+$/i.test(before)) return match;
            if (lower === 'kerja' && /\btata\s+$/i.test(before)) return match;
            if (lower === 'faktor' && /\b(banyak|multi)\s+$/i.test(before)) return match;
            if (dict[lower] && Math.random() < changeProbability) {
                const candidates = dict[lower];
                const replacement = candidates[Math.floor(Math.random() * candidates.length)];
                
                if (match[0] === match[0].toUpperCase() && match.length > 1) {
                    return replacement.charAt(0).toUpperCase() + replacement.slice(1);
                }
                return replacement;
            }
            return match;
        });
    }

    /**
     * Safe burstiness modulation without destructive sentence splitting.
     * Prevents incomplete sentence fragments (e.g. "Ketika kondisi pasar sedang stagnan.").
     */
    modulateBurstiness(sentences, tone, lang, intensity) {
        if (sentences.length <= 1) return sentences;

        const result = [];
        let i = 0;

        while (i < sentences.length) {
            const current = sentences[i];
            const next = sentences[i + 1];

            // Protect greetings
            if (this.isSalutationOrOpening(current) || (next && this.isSalutationOrOpening(next))) {
                result.push(current);
                i++;
                continue;
            }

            const currentWords = current.split(/\s+/).filter(Boolean);

            // Safe merge of two very short sentences without question/exclamation marks
            if (next && currentWords.length < 8 && !/[?!]/.test(current)) {
                const nextWords = next.split(/\s+/).filter(Boolean);
                if (nextWords.length < 8 && !/[?!]/.test(next) && Math.random() > 0.5) {
                    const cleanCurrent = current.replace(/[.!?]+$/, '');
                    const cleanNext = next.charAt(0).toLowerCase() + next.slice(1);
                    const glue = lang === 'id' 
                        ? (tone === 'academic' ? ' sekaligus ' : ' dan juga ')
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
     * Applies safe, context-aware tone voice styling.
     */
    applyToneStyling(sentences, tone, lang, intensity) {
        return sentences.map((sentence, idx) => {
            let processed = sentence.trim();

            // Salutation protection: NEVER touch greetings or permissions
            if (this.isSalutationOrOpening(processed)) {
                return processed;
            }

            // Never inject connector if sentence already has an introductory opening
            if (this.hasIntroductoryPhrase(processed)) {
                // Keep introductory phrase cleanly intact
            } else if (idx > 0 && idx % 2 === 1 && Math.random() > 0.65) {
                // Selectively add adverbial transition to body sentences that lack an intro
                if (tone === 'academic') {
                    const pool = this.academicConnectors[lang] || this.academicConnectors['id'];
                    const connector = pool[Math.floor(Math.random() * pool.length)];
                    processed = connector + " " + processed.charAt(0).toLowerCase() + processed.slice(1);
                } else if (tone === 'casual') {
                    const pool = this.casualConnectors[lang] || this.casualConnectors['id'];
                    const connector = pool[Math.floor(Math.random() * pool.length)];
                    processed = connector + " " + processed.charAt(0).toLowerCase() + processed.slice(1);
                }
            }

            // Academic Tone adjustments: Enhance precision without breaking syntax
            if (tone === 'academic') {
                processed = processed
                    .replace(/\bsangat bagus\b/gi, "berkualitas tinggi")
                    .replace(/\bmenguntungkan\b/gi, "memberikan nilai strategis")
                    .replace(/\bvery good\b/gi, "notably effective");
            }

            // Formal Tone adjustments
            if (tone === 'formal') {
                processed = processed
                    .replace(/\bkita harus\b/gi, "perlu dilakukan upaya untuk")
                    .replace(/\bwe must\b/gi, "it is advisable to");
            }

            // Casual Tone adjustments
            if (tone === 'casual') {
                processed = processed
                    .replace(/\bnamun demikian\b/gi, "tapi nyatanya")
                    .replace(/\bdiperlukan\b/gi, "butuh");
            }

            // Simple Tone adjustments: Eliminate filler phrases
            if (tone === 'simple') {
                processed = processed
                    .replace(/\b(dapat dikatakan bahwa|pada dasarnya)\b/gi, '')
                    .replace(/\s{2,}/g, ' ')
                    .trim();
            }

            // Ensure capitalization
            if (processed.length > 0) {
                processed = processed.charAt(0).toUpperCase() + processed.slice(1);
            }

            return processed;
        });
    }

    /**
     * Main transformation pipeline.
     */
    humanize(text, options = {}) {
        const {
            tone = 'academic',
            lang = 'id',
            intensity = 'balanced' // 'standard', 'balanced', 'ultra'
        } = options;

        if (!text || !text.trim()) return "";

        const paragraphs = this.splitParagraphs(text);
        const transformedParagraphs = [];

        for (const para of paragraphs) {
            // Step 1: Split into individual sentences
            let sentences = this.splitSentences(para);

            // Step 2: Cliché removal & AI marker substitution
            sentences = sentences.map(s => this.replaceCliches(s, lang));

            // Step 3: Burstiness modulation (safe, no arbitrary splitting!)
            sentences = this.modulateBurstiness(sentences, tone, lang, intensity);

            // Step 4: Perplexity injection (safe acronyms/parentheses preservation)
            sentences = sentences.map(s => this.injectPerplexity(s, lang, intensity));

            // Step 5: Tone modulation
            sentences = this.applyToneStyling(sentences, tone, lang, intensity);

            transformedParagraphs.push(sentences.join(' '));
        }

        return transformedParagraphs.join('\n\n');
    }
}

if (typeof window !== 'undefined') {
    window.TextHumanizer = TextHumanizer;
}
