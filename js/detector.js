/**
 * Writing Quality Evaluator (formerly AIDetector)
 * Provides transparent, heuristic-based writing quality analysis:
 * - Sentence Cadence & Variety (Burstiness / Standard Deviation)
 * - Lexical Diversity (Type-Token Ratio - TTR)
 * - Readability & Flow (Flesch / Average Sentence Length)
 * - Formulaic AI Cliché & Padding Detection
 * - Structural & Factual Integrity Check
 *
 * NOTE: This module provides transparent editorial heuristics. It does not
 * claim to predict proprietary black-box classifiers (Turnitin, GPTZero, etc.).
 */

class AIDetector {
    constructor() {
        this.formulaicPatterns = [
            // English Clichés
            'furthermore', 'moreover', 'in conclusion', 'delve into', 'delving into', 'testament to',
            'pivotal role', 'beacon of', 'rich tapestry', 'holistic approach', 'synergy', 'paramount importance',
            'multifaceted nature', 'vital role in', 'seamlessly integrated', 'foster an environment',
            'in today\'s fast-paced world', 'in the modern era', 'game-changer', 'serves as a reminder',
            'paves the way for', 'sheds light on', 'at the forefront of', 'serves as a cornerstone',
            'in today\'s rapidly evolving', 'it is imperative to note', 'delves into the multifaceted',
            'plays a pivotal role in shaping', 'undeniably highlights the significance',
            'it is crucial to recognize that', 'by leveraging these insights', 'navigating the complexities of',

            // Indonesian Formulaic Phrases & Padding
            'tidak dapat dipungkiri bahwa', 'perlu diketahui bahwa', 'perlu dicatat bahwa',
            'merupakan hal yang sangat krusial', 'memainkan peranan yang sangat penting',
            'memainkan peran penting dalam', 'adalah merupakan', 'sangat penting untuk diperhatikan',
            'dalam rangka mencapai tujuan', 'dalam rangka untuk', 'memberikan kontribusi yang signifikan',
            'memberikan implikasi yang signifikan', 'dalam era modern ini', 'dalam era transformasi digital',
            'pada hakikatnya dapat dipahami', 'secara garis besar dapat disimpulkan',
            'patut dicatat bahwa', 'memegang peranan krusial', 'menjadi bukti nyata dari',
            'merupakan salah satu aspek kunci', 'dalam konteks ini dapat dikatakan',
            'langkah strategis yang harus diambil', 'menyelami dunia digital', 'komprehensif dan holistik',
            'sinergi antara', 'pola pikir yang inovatif', 'menandai babak baru', 'menuju masa depan yang lebih cerah'
        ];
    }

    /**
     * Splits text into sentences accurately, protecting abbreviations and numbers.
     */
    getSentences(text) {
        if (!text || !text.trim()) return [];
        const protectedText = text
            .replace(/\b(Yth|Dr|Ir|Prof|No|e\.g|i\.e|dsb|dll|dst)\./gi, '$1__DOT__')
            .replace(/(\d+)\.(\d+)/g, '$1__NUMDOT__$2')
            .replace(/^(\s*\d+)\.\s+/gm, '$1__LISTDOT__ ');

        const raw = protectedText.match(/[^.!?\n]+[.!?]+(?:\s+|$)|[^.!?\n]+(?:\n+|$)/g);
        if (!raw) return [];

        return raw
            .map(s => s.replace(/__DOT__/g, '.').replace(/__NUMDOT__/g, '.').replace(/__LISTDOT__/g, '. ').trim())
            .filter(s => s.length > 0);
    }

    /**
     * Calculates sentence length variation (Sentence Cadence / Variety).
     */
    calculateSentenceVariety(sentences) {
        const bodySentences = sentences.filter(s => {
            const words = s.split(/\s+/).filter(Boolean);
            return words.length >= 4 && !/^(assalamu|yth|selamat|halo|dear)/i.test(s);
        });

        if (bodySentences.length <= 1) {
            return { score: 65, sd: 4.5, label: 'Seragam (Teks Pendek)', category: 'moderate' };
        }

        const wordCounts = bodySentences.map(s => s.split(/\s+/).filter(Boolean).length);
        const mean = wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length;
        const variance = wordCounts.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / wordCounts.length;
        const sd = Math.sqrt(variance);

        // Natural human writing typically exhibits SD between 5.0 and 11.0 words
        let varietyScore = Math.min(100, Math.max(20, Math.round((sd / 8.0) * 85)));
        let label = 'Seimbang';
        let category = 'balanced';

        if (sd >= 7.0) {
            label = `Tinggi & Dinamis (SD: ${sd.toFixed(1)})`;
            category = 'high';
        } else if (sd >= 4.0) {
            label = `Seimbang Alami (SD: ${sd.toFixed(1)})`;
            category = 'balanced';
        } else {
            label = `Cenderung Monoton (SD: ${sd.toFixed(1)})`;
            category = 'monotonous';
        }

        return { score: varietyScore, sd: Math.round(sd * 10) / 10, label, category };
    }

    /**
     * Calculates lexical diversity using Type-Token Ratio (TTR).
     */
    calculateLexicalDiversity(text) {
        const words = text.toLowerCase().match(/\b[a-zA-Zà-ž0-9_-]+\b/g) || [];
        if (words.length === 0) return { score: 50, ttr: 0.5, label: 'N/A' };

        const uniqueWords = new Set(words);
        const ttr = uniqueWords.size / words.length;

        // Realistic TTR: 0.40 - 0.75 is normal for rich texts
        let diversityScore = Math.min(100, Math.max(20, Math.round(ttr * 125)));
        let label = 'Cukup Beragam';

        if (ttr >= 0.60) {
            label = `Kaya & Unik (TTR: ${ttr.toFixed(2)})`;
        } else if (ttr >= 0.42) {
            label = `Seimbang (TTR: ${ttr.toFixed(2)})`;
        } else {
            label = `Banyak Pengulangan (TTR: ${ttr.toFixed(2)})`;
        }

        return { score: diversityScore, ttr: Math.round(ttr * 100) / 100, label };
    }

    /**
     * Checks sentence against known formulaic clichés and rhythmic markers.
     */
    analyzeSentence(sentence) {
        const lower = sentence.toLowerCase().trim();
        const matches = [];

        this.formulaicPatterns.forEach(pattern => {
            if (lower.includes(pattern.toLowerCase())) {
                matches.push(pattern);
            }
        });

        const words = sentence.split(/\s+/).filter(Boolean);
        const wordCount = words.length;

        const isGreeting = /^(assalamu|yth|selamat\s+(pagi|siang|sore|malam|sejahtera)|halo|hai|dear|with\s+regards)/i.test(lower);
        if (isGreeting) {
            return {
                text: sentence,
                wordCount,
                matches: [],
                qualityScore: 92,
                label: 'human'
            };
        }

        // Quality estimation for individual sentence
        let qualityScore = 85;
        if (matches.length > 0) {
            qualityScore -= (matches.length * 20);
        }
        if (wordCount > 35) {
            qualityScore -= 10; // overly bloated
        }

        qualityScore = Math.min(98, Math.max(25, qualityScore));

        let label = 'human';
        if (qualityScore < 55) {
            label = 'ai'; // formulaic / needs improvement
        } else if (qualityScore < 75) {
            label = 'mixed';
        }

        return {
            text: sentence,
            wordCount,
            matches,
            qualityScore,
            humanScore: qualityScore,
            aiScore: 100 - qualityScore,
            label
        };
    }

    /**
     * Comprehensive writing quality evaluation.
     */
    analyze(text, referenceOriginalText = null) {
        if (!text || !text.trim()) {
            return {
                qualityScore: 100,
                humanScore: 100,
                aiScore: 0,
                burstiness: { score: 100, sd: 0, label: 'N/A' },
                perplexity: { score: 100, ttr: 1, label: 'N/A' },
                lexicalDiversity: { score: 100, ttr: 1, label: 'N/A' },
                readability: 'N/A',
                clicheCount: 0,
                detectedCliches: [],
                sentences: [],
                wordCount: 0,
                charCount: 0
            };
        }

        const sentences = this.getSentences(text);
        const words = text.match(/\b\S+\b/g) || [];
        const variety = this.calculateSentenceVariety(sentences);
        const diversity = this.calculateLexicalDiversity(text);
        const analyzedSentences = sentences.map(s => this.analyzeSentence(s));

        // Aggregate formulaic clichés
        const detectedCliches = [];
        analyzedSentences.forEach(s => {
            s.matches.forEach(m => {
                if (!detectedCliches.includes(m)) detectedCliches.push(m);
            });
        });

        // Readability estimate based on average sentence length
        const avgSentenceLength = words.length / (sentences.length || 1);
        let readability = 'Mengalir Alami';
        if (avgSentenceLength < 12) readability = 'Sangat Mudah Dipahami';
        else if (avgSentenceLength < 20) readability = 'Mengalir Alami';
        else if (avgSentenceLength < 28) readability = 'Akademik & Berbobot';
        else readability = 'Padat & Kompleks';

        // Honest composite Natural Quality Score (0-100)
        let composite = 82;

        // Reward sentence variety
        if (variety.category === 'high') composite += 6;
        else if (variety.category === 'monotonous') composite -= 8;

        // Reward lexical diversity
        if (diversity.ttr >= 0.55) composite += 6;
        else if (diversity.ttr < 0.35) composite -= 8;

        // Penalize formulaic clichés
        if (detectedCliches.length === 0) {
            composite += 6;
        } else {
            composite -= Math.min(25, detectedCliches.length * 7);
        }

        // Bounded honestly between 30 and 96
        const finalQuality = Math.min(96, Math.max(30, Math.round(composite)));

        return {
            qualityScore: finalQuality,
            humanScore: finalQuality,
            aiScore: 100 - finalQuality,
            // Keep backwards-compatible property names for existing UI widgets
            burstiness: {
                score: variety.score,
                sd: variety.sd,
                label: variety.label
            },
            perplexity: {
                score: diversity.score,
                ttr: diversity.ttr,
                label: diversity.label
            },
            lexicalDiversity: diversity,
            readability,
            clicheCount: detectedCliches.length,
            detectedCliches,
            sentences: analyzedSentences,
            wordCount: words.length,
            charCount: text.length,
            readingTimeMin: Math.max(1, Math.ceil(words.length / 200))
        };
    }
}

if (typeof window !== 'undefined') {
    window.AIDetector = AIDetector;
    window.WritingQualityEvaluator = AIDetector;
}
