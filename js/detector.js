/**
 * AI Text Detector Simulator (Turnitin & GPTZero Heuristic Engine)
 * Analyzes Perplexity, Burstiness, Repetitive n-grams, and AI markers.
 */

class AIDetector {
    constructor() {
        this.aiWordList = [
            'furthermore', 'moreover', 'in conclusion', 'delve', 'delving', 'testament',
            'pivotal', 'beacon', 'tapestry', 'holistic', 'synergy', 'paramount', 'underscores',
            'multifaceted', 'crucial role', 'vital role', 'seamlessly', 'foster', 'realm',
            'vibrant', 'intertwined', 'embarks', 'cornerstone', 'krusial', 'menyelami',
            'tidak dapat dipungkiri', 'kesimpulannya', 'landasan utama', 'memegang peranan',
            'memainkan peran', 'komprehensif', 'holistik', 'era digital', 'bukti nyata',
            'secara keseluruhan', 'oleh karena itu, sangat', 'berdasarkan ilustrasi',
            'sebagai seorang', 'alasan utamanya adalah', 'memiliki asumsi dasar',
            'asumsi dasar yang sangat ketat', 'yakni menganggap bahwa', 'hanya dipengaruhi oleh',
            'satu faktor risiko sistematis tunggal', 'sedang beraksi', 'di sinilah',
            'tidak mengikat investor', 'hal ini membuktikan bahwa', 'hal ini menunjukkan bahwa',
            'merupakan salah satu', 'dapat disimpulkan bahwa', 'dalam era modern'
        ];
    }

    /**
     * Splits text into individual sentences accurately across punctuations,
     * protecting abbreviations (Yth., Dr., dsb., etc.) from causing false splits.
     */
    getSentences(text) {
        if (!text || !text.trim()) return [];
        // Protect common abbreviations by temporarily replacing their periods
        const protectedText = text
            .replace(/\b(Yth|Dr|Ir|Prof|No|e\.g|i\.e|dsb|dll|dst)\./gi, '$1__DOT__');

        const raw = protectedText.match(/[^.!?\n]+[.!?]+(?:\s+|$)|[^.!?\n]+$/g);
        if (!raw) return [];

        return raw
            .map(s => s.replace(/__DOT__/g, '.').trim())
            .filter(s => s.length > 0);
    }

    /**
     * Calculates sentence length variation (Burstiness).
     * Filter out short greetings or single-word titles to avoid skewing.
     */
    calculateBurstiness(sentences) {
        const bodySentences = sentences.filter(s => {
            const words = s.split(/\s+/).filter(Boolean);
            return words.length >= 4 && !/^(assalamu|yth|selamat|halo|dear)/i.test(s);
        });

        if (bodySentences.length <= 1) return { score: 60, sd: 5 };

        const wordCounts = bodySentences.map(s => s.split(/\s+/).filter(Boolean).length);
        const mean = wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length;
        const variance = wordCounts.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / wordCounts.length;
        const sd = Math.sqrt(variance);

        // Standard deviation > 8 indicates high burstiness (very human)
        // SD < 4 indicates mechanical, robotic consistency (AI)
        let burstinessScore = Math.min(100, Math.max(10, Math.round((sd / 8.5) * 100)));
        return { score: burstinessScore, sd: Math.round(sd * 10) / 10 };
    }

    /**
     * Calculates vocabulary diversity (Type-Token Ratio / Perplexity proxy).
     */
    calculatePerplexity(text) {
        const words = text.toLowerCase().match(/\b[a-zA-Zà-ž0-9_-]+\b/g) || [];
        if (words.length === 0) return { score: 50, ttr: 0.5 };

        const uniqueWords = new Set(words);
        const ttr = uniqueWords.size / words.length;

        let perplexityScore = Math.min(100, Math.max(15, Math.round(ttr * 110)));
        return { score: perplexityScore, ttr: Math.round(ttr * 100) / 100 };
    }

    /**
     * Checks sentence against AI buzzwords and rhythmic markers.
     */
    analyzeSentence(sentence) {
        const lower = sentence.toLowerCase().trim();
        let matches = [];

        this.aiWordList.forEach(word => {
            if (lower.includes(word.toLowerCase())) {
                matches.push(word);
            }
        });

        const words = sentence.split(/\s+/).filter(Boolean);
        const wordCount = words.length;

        // Greetings and salutations are naturally human
        const isGreeting = /^(assalamu|yth|selamat\s+(pagi|siang|sore|malam|sejahtera)|halo|hai|dear|with\s+regards)/i.test(lower);
        if (isGreeting) {
            return {
                text: sentence,
                wordCount,
                matches: [],
                aiScore: 5,
                humanScore: 95,
                label: 'human'
            };
        }

        // Robotic rhythm check: AI sentences tend to sit between 16 and 32 words with heavy clauses
        const isRoboticLength = wordCount >= 16 && wordCount <= 32;

        // Base AI probability: typical neutral prose sits at 20-30%
        let aiProb = 25;

        if (matches.length > 0) {
            aiProb = 60 + (matches.length * 20);
        }

        if (isRoboticLength && matches.length > 0) {
            aiProb += 15;
        }

        // Check for ChatGPT explanatory transitions
        if (/^(berdasarkan|alasan utamanya|ketika kondisi|dalam era|sebagai kesimpulan|kesimpulannya|dengan demikian|oleh karena itu|tidak dapat dipungkiri)/i.test(lower)) {
            aiProb += 15;
        }

        aiProb = Math.min(99, Math.max(3, aiProb));
        const humanProb = 100 - aiProb;

        let label = 'human';
        if (aiProb >= 60) {
            label = 'ai';
        } else if (aiProb >= 35) {
            label = 'mixed';
        }

        return {
            text: sentence,
            wordCount,
            matches,
            aiScore: aiProb,
            humanScore: humanProb,
            label
        };
    }

    /**
     * Comprehensive text analysis returning complete detector verdict.
     */
    analyze(text) {
        if (!text || !text.trim()) {
            return {
                aiScore: 0,
                humanScore: 100,
                burstiness: { score: 100, sd: 0, label: 'Normal' },
                perplexity: { score: 100, ttr: 1, label: 'Normal' },
                readability: 'N/A',
                sentences: [],
                wordCount: 0,
                charCount: 0
            };
        }

        const sentences = this.getSentences(text);
        const words = text.match(/\b\S+\b/g) || [];
        const burstiness = this.calculateBurstiness(sentences);
        const perplexity = this.calculatePerplexity(text);

        const analyzedSentences = sentences.map(s => this.analyzeSentence(s));

        // Aggregate AI probability
        let totalAi = 0;
        let aiClicheCount = 0;

        analyzedSentences.forEach(s => {
            totalAi += s.aiScore;
            aiClicheCount += s.matches.length;
        });

        let avgAiScore = sentences.length > 0 ? Math.round(totalAi / sentences.length) : 25;

        // If strong AI clichés were detected, reinforce high AI probability (ZeroGPT mimic)
        if (aiClicheCount >= 3) {
            avgAiScore = Math.max(88, avgAiScore);
        } else if (aiClicheCount >= 1) {
            avgAiScore = Math.max(72, avgAiScore);
        } else {
            // No AI cliches present: Reward burstiness and perplexity
            if (burstiness.score > 65) avgAiScore -= 15;
            if (perplexity.score > 65) avgAiScore -= 12;
        }

        // Bound to realistic percentages
        let finalAiScore = Math.min(98, Math.max(2, Math.round(avgAiScore)));
        let finalHumanScore = 100 - finalAiScore;

        // Readability estimate (Flesch Reading Ease approximation)
        const avgSentenceLength = words.length / (sentences.length || 1);
        let readability = 'Sedang';
        if (avgSentenceLength < 12) readability = 'Sangat Mudah';
        else if (avgSentenceLength < 18) readability = 'Mudah & Mengalir';
        else if (avgSentenceLength < 25) readability = 'Menengah (Akademik)';
        else readability = 'Kompleks / Padat';

        return {
            aiScore: finalAiScore,
            humanScore: finalHumanScore,
            burstiness: {
                score: burstiness.score,
                sd: burstiness.sd,
                label: burstiness.score >= 65 ? 'Tinggi (Alami)' : burstiness.score >= 40 ? 'Sedang' : 'Rendah (Robotik)'
            },
            perplexity: {
                score: perplexity.score,
                ttr: perplexity.ttr,
                label: perplexity.score >= 65 ? 'Kaya & Unik' : perplexity.score >= 40 ? 'Cukup Beragam' : 'Monoton'
            },
            readability,
            sentences: analyzedSentences,
            wordCount: words.length,
            charCount: text.length,
            readingTimeMin: Math.ceil(words.length / 200)
        };
    }
}

if (typeof window !== 'undefined') {
    window.AIDetector = AIDetector;
}
