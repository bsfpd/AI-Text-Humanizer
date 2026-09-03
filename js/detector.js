/**
 * AI Text Detector Simulator (Turnitin & GPTZero Heuristic Engine)
 * Analyzes Perplexity, Burstiness, Repetitive n-grams, and AI markers.
 */

class AIDetector {
    constructor() {
        this.aiWordList = [
            'furthermore', 'moreover', 'in conclusion', 'delve', 'delving', 'testament',
            'pivotal', 'beacon', 'tapestry', 'holistic', 'synergy', 'paramount', 'underscores',
            'paramount', 'multifaceted', 'crucial role', 'vital role', 'seamlessly',
            'foster', 'realm', 'vibrant', 'intertwined', 'embarks', 'cornerstone',
            'krusial', 'menyelami', 'tidak dapat dipungkiri', 'kesimpulannya', 'landasan utama',
            'memegang peranan', 'memainkan peran', 'komprehensif', 'holistik', 'era digital',
            'bukti nyata', 'secara keseluruhan', 'oleh karena itu, sangat'
        ];
    }

    /**
     * Splits text into individual sentences accurately across punctuations.
     */
    getSentences(text) {
        if (!text || !text.trim()) return [];
        // Matches sentences ending with . ! ? followed by space or newline
        const raw = text.match(/[^.!?\n]+[.!?]+(?:\s+|$)|[^.!?\n]+$/g);
        return raw ? raw.map(s => s.trim()).filter(s => s.length > 0) : [];
    }

    /**
     * Calculates sentence length variation (Burstiness).
     * Humans have high standard deviation of sentence lengths.
     * AI models have low standard deviation (monotonous pacing).
     */
    calculateBurstiness(sentences) {
        if (sentences.length <= 1) return { score: 50, sd: 0 };

        const wordCounts = sentences.map(s => s.split(/\s+/).filter(Boolean).length);
        const mean = wordCounts.reduce((a, b) => a + b, 0) / wordCounts.length;
        const variance = wordCounts.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / wordCounts.length;
        const sd = Math.sqrt(variance);

        // Standard deviation > 8 indicates high burstiness (very human)
        // SD < 3 indicates mechanical, robotic consistency (AI)
        let burstinessScore = Math.min(100, Math.max(10, Math.round((sd / 9) * 100)));
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

        // Higher unique ratio indicates richer, more unpredictable human vocabulary
        let perplexityScore = Math.min(100, Math.max(15, Math.round(ttr * 115)));
        return { score: perplexityScore, ttr: Math.round(ttr * 100) / 100 };
    }

    /**
     * Checks sentence against AI buzzwords and rhythmic markers.
     */
    analyzeSentence(sentence) {
        const lower = sentence.toLowerCase();
        let matches = [];

        this.aiWordList.forEach(word => {
            if (lower.includes(word)) {
                matches.push(word);
            }
        });

        const words = sentence.split(/\s+/).filter(Boolean);
        const wordCount = words.length;

        // Robotic rhythm check: AI sentences tend to sit between 16 and 24 words
        const isRoboticLength = wordCount >= 16 && wordCount <= 25;

        // Base AI probability
        let aiProb = 15;

        if (matches.length > 0) {
            aiProb += matches.length * 30;
        }

        if (isRoboticLength) {
            aiProb += 15;
        }

        // Penalty for formal transition starters common in AI (Furthermore, In conclusion, etc.)
        if (/^(furthermore|moreover|in conclusion|additionally|kesimpulannya|dengan demikian|oleh karena itu)/i.test(sentence.trim())) {
            aiProb += 25;
        }

        aiProb = Math.min(99, Math.max(2, aiProb));
        const humanProb = 100 - aiProb;

        let label = 'human';
        if (aiProb >= 65) {
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

        let avgAiScore = sentences.length > 0 ? Math.round(totalAi / sentences.length) : 10;

        // Penalize / reward based on burstiness & perplexity
        if (burstiness.score > 70) avgAiScore -= 18;
        if (burstiness.score < 30) avgAiScore += 20;
        if (perplexity.score > 70) avgAiScore -= 15;
        if (perplexity.score < 40) avgAiScore += 18;

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
