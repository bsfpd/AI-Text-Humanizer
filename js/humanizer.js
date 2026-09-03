/**
 * Advanced Humanizer Engine
 * Re-engineers AI-generated text to maximize Perplexity and Burstiness,
 * eliminating predictable n-gram patterns and AI marker cliches.
 */

class TextHumanizer {
    constructor() {
        this.synonyms = {
            id: {
                "penting": ["krusial", "vital", "esensial", "menentukan", "berarti", "signifikan"],
                "sangat": ["begitu", "cukup", "teramat", "amat", "benar-benar"],
                "menunjukkan": ["memperlihatkan", "menegaskan", "membuktikan", "mencerminkan", "mengindikasikan"],
                "membantu": ["mendorong", "memudahkan", "menunjang", "menyokong", "memfasilitasi"],
                "masalah": ["kendala", "tantangan", "persoalan", "hambatan", "isu"],
                "membuat": ["menghasilkan", "menciptakan", "membentuk", "membangun", "merancang"],
                "menggunakan": ["memanfaatkan", "menerapkan", "mengoptimalkan", "mendayagunakan"],
                "banyak": ["beragam", "sejumlah", "berbagai", "berlimpah"],
                "berbeda": ["kontras", "berlainan", "unik", "bervariasi"],
                "berkembang": ["tumbuh pesat", "maju", "meluas", "bergerak dinamis"],
                "mengetahui": ["memahami", "menyadari", "melihat", "mencermati"],
                "tujuan": ["sasaran", "arah kebijakan", "fokus utama", "target"],
                "efektif": ["berdaya guna", "tepat sasaran", "optimal", "mujarab"],
                "metode": ["pendekatan", "langkah terstruktur", "tata cara", "strategi"],
                "hasil": ["temuan", "capaian", "luaran", "dampak nyata"]
            },
            en: {
                "important": ["vital", "essential", "significant", "meaningful", "pivotal", "key"],
                "shows": ["demonstrates", "reveals", "illustrates", "highlights", "signals"],
                "helps": ["assists", "enables", "empowers", "fosters", "supports"],
                "problem": ["hurdle", "challenge", "obstacle", "dilemma", "bottleneck"],
                "make": ["produce", "create", "shape", "craft", "develop"],
                "use": ["leverage", "utilize", "harness", "adopt", "apply"],
                "many": ["numerous", "a range of", "diverse", "multiple", "countless"],
                "develop": ["expand", "advance", "evolve", "progress", "strengthen"],
                "different": ["varied", "distinct", "alternative", "divergent"],
                "effective": ["impactful", "productive", "fruitful", "successful"],
                "method": ["approach", "strategy", "technique", "system"]
            }
        };

        this.academicConnectors = {
            id: [
                "Berdasarkan telaah tersebut,",
                "Jika diamati secara empiris,",
                "Secara konseptual,",
                "Hal ini sekaligus membuktikan bahwa",
                "Dalam konteks yang lebih luas,",
                "Implikasinya tampak jelas bahwa",
                "Temuan ini menegaskan bahwa"
            ],
            en: [
                "Empirically observed,",
                "Within this analytical framework,",
                "This observation underscores that",
                "In a broader context,",
                "Consequently,",
                "Evidence reveals that"
            ]
        };

        this.casualConnectors = {
            id: [
                "Sebenarnya,",
                "Menariknya lagi,",
                "Kalau dipikir-pikir,",
                "Intinya sederhana:",
                "Bukan rahasia lagi kalau",
                "Yang menarik,",
                "Di sisi lain,"
            ],
            en: [
                "Honestly speaking,",
                "Here's the interesting part:",
                "Turns out,",
                "At the end of the day,",
                "What's striking is that",
                "On top of that,"
            ]
        };
    }

    /**
     * Splits text into paragraphs while preserving double line breaks.
     */
    splitParagraphs(text) {
        return text.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    }

    /**
     * Splits paragraph into sentences.
     */
    splitSentences(paragraph) {
        const matches = paragraph.match(/[^.!?\n]+[.!?]+(?:\s+|$)|[^.!?\n]+$/g);
        return matches ? matches.map(s => s.trim()).filter(s => s.length > 0) : [paragraph];
    }

    /**
     * Replaces clichés and robotic AI markers.
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
     * Injects synonym variations to enhance vocabulary entropy (Perplexity).
     */
    injectPerplexity(sentence, lang, intensity) {
        const dict = this.synonyms[lang] || this.synonyms['en'];
        if (!dict) return sentence;

        let words = sentence.split(/(\s+|[.,!?;:])/);
        const changeProbability = intensity === 'ultra' ? 0.38 : intensity === 'balanced' ? 0.25 : 0.15;

        for (let i = 0; i < words.length; i++) {
            const rawWord = words[i].toLowerCase().trim();
            if (dict[rawWord] && Math.random() < changeProbability) {
                const candidates = dict[rawWord];
                const replacement = candidates[Math.floor(Math.random() * candidates.length)];
                
                // Match original capitalization
                if (words[i][0] === words[i][0].toUpperCase() && words[i].length > 1) {
                    words[i] = replacement.charAt(0).toUpperCase() + replacement.slice(1);
                } else {
                    words[i] = replacement;
                }
            }
        }

        return words.join('');
    }

    /**
     * Varies sentence lengths to dramatically boost Burstiness (the #1 Turnitin/GPTZero metric).
     */
    modulateBurstiness(sentences, tone, lang, intensity) {
        if (sentences.length <= 1) return sentences;

        const result = [];
        let i = 0;

        while (i < sentences.length) {
            const current = sentences[i];
            const next = sentences[i + 1];

            const currentWords = current.split(/\s+/).filter(Boolean);

            // Case A: Current sentence is very long (> 24 words) -> Split for rhythm variation
            if (currentWords.length > 22 && intensity !== 'standard' && current.includes(',')) {
                const parts = current.split(/,\s+/);
                if (parts.length >= 2) {
                    const firstPart = parts[0].trim();
                    const secondPart = parts.slice(1).join(', ').trim();

                    // Make first part an independent clause if possible
                    if (firstPart.split(/\s+/).length >= 6 && secondPart.split(/\s+/).length >= 6) {
                        const capitalizedSecond = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);
                        result.push(firstPart + '.');
                        result.push(capitalizedSecond);
                        i++;
                        continue;
                    }
                }
            }

            // Case B: Two consecutive short sentences (< 10 words each) -> Merge occasionally
            if (next && currentWords.length < 10) {
                const nextWords = next.split(/\s+/).filter(Boolean);
                if (nextWords.length < 10 && Math.random() > 0.45) {
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

            // Case C: Single sentence pass-through with occasional punchy opening
            result.push(current);
            i++;
        }

        return result;
    }

    /**
     * Applies specific tone voice to sentences.
     */
    applyToneStyling(sentences, tone, lang, intensity) {
        return sentences.map((sentence, idx) => {
            let processed = sentence.trim();

            // First sentence or strategic midpoint: inject style transitions
            if (idx === 0 || (idx % 3 === 0 && Math.random() > 0.6)) {
                // Avoid double transition words
                if (!/^(namun|tetapi|karena|sebab|moreover|however|furthermore|artinya|sebenarnya|secara)/i.test(processed)) {
                    if (tone === 'academic') {
                        const pool = this.academicConnectors[lang] || this.academicConnectors['id'];
                        const connector = pool[Math.floor(Math.random() * pool.length)];
                        if (intensity === 'ultra') {
                            processed = connector + " " + processed.charAt(0).toLowerCase() + processed.slice(1);
                        }
                    } else if (tone === 'casual') {
                        const pool = this.casualConnectors[lang] || this.casualConnectors['id'];
                        const connector = pool[Math.floor(Math.random() * pool.length)];
                        if (intensity !== 'standard' && Math.random() > 0.5) {
                            processed = connector + " " + processed.charAt(0).toLowerCase() + processed.slice(1);
                        }
                    } else if (tone === 'simple') {
                        // Strip filler words
                        processed = processed
                            .replace(/\b(dapat dikatakan bahwa|pada dasarnya|sebagaimana kita ketahui|tentu saja)\b/gi, '')
                            .replace(/\b(it goes without saying that|as a matter of fact|needless to say)\b/gi, '')
                            .trim();
                        // Clean double spaces
                        processed = processed.replace(/\s{2,}/g, ' ');
                    }
                }
            }

            // Academic Tone adjustments: Enhance precision
            if (tone === 'academic') {
                processed = processed
                    .replace(/\bsangat bagus\b/gi, "berkualitas tinggi")
                    .replace(/\bmenguntungkan\b/gi, "memberikan nilai strategis")
                    .replace(/\bvery good\b/gi, "notably effective")
                    .replace(/\bgood result\b/gi, "substantial outcome");
            }

            // Formal Tone adjustments: Enhance business etiquette
            if (tone === 'formal') {
                processed = processed
                    .replace(/\bkita harus\b/gi, "perlu dilakukan upaya untuk")
                    .replace(/\bbisa dibilang\b/gi, "secara praktis dapat dinyatakan")
                    .replace(/\bwe must\b/gi, "it is advisable to");
            }

            // Casual Tone adjustments: Natural conversational flow
            if (tone === 'casual') {
                processed = processed
                    .replace(/\bmerupakan\b/gi, "adalah")
                    .replace(/\bnamun demikian\b/gi, "tapi nyatanya")
                    .replace(/\bdiperlukan\b/gi, "butuh")
                    .replace(/\bmemperoleh\b/gi, "dapat");
            }

            // Journalistic Tone adjustments: Engaging and active
            if (tone === 'journalistic') {
                processed = processed
                    .replace(/\btelah dilakukan\b/gi, "terbukti nyata")
                    .replace(/\bhal ini terjadi karena\b/gi, "pemicunya yakni");
            }

            // Creative Tone adjustments: Evocative and flowing
            if (tone === 'creative') {
                processed = processed
                    .replace(/\bsangat cepat\b/gi, "secepat kilat")
                    .replace(/\bsangat besar\b/gi, "begitu masif");
            }

            // Ensure proper capitalization at beginning of sentence
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

            // Step 3: Burstiness modulation (sentence length variance)
            sentences = this.modulateBurstiness(sentences, tone, lang, intensity);

            // Step 4: Perplexity injection (vocabulary diversification)
            sentences = sentences.map(s => this.injectPerplexity(s, lang, intensity));

            // Step 5: Tone modulation (Academic, Formal, Casual, etc.)
            sentences = this.applyToneStyling(sentences, tone, lang, intensity);

            transformedParagraphs.push(sentences.join(' '));
        }

        return transformedParagraphs.join('\n\n');
    }
}

if (typeof window !== 'undefined') {
    window.TextHumanizer = TextHumanizer;
}
