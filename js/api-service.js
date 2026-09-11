/**
 * Optional Live AI API Service (BYOK - Bring Your Own Key)
 * Supports Google Gemini, OpenAI, Groq, and OpenRouter
 * Implements specialized Anti-Detection Master Prompts for maximum bypass.
 */

class ApiService {
    constructor() {
        this.config = this.loadConfig();
    }

    loadConfig() {
        try {
            const saved = localStorage.getItem('humanize_api_config');
            return saved ? JSON.parse(saved) : {
                provider: 'offline', // 'offline', 'gemini', 'openai', 'groq', 'openrouter'
                apiKey: '',
                model: 'gemini-1.5-flash'
            };
        } catch (e) {
            return { provider: 'offline', apiKey: '', model: 'gemini-1.5-flash' };
        }
    }

    saveConfig(config) {
        this.config = { ...this.config, ...config };
        try {
            localStorage.setItem('humanize_api_config', JSON.stringify(this.config));
        } catch (e) {
            console.error("Could not save API config", e);
        }
    }

    /**
     * Builds the Master Anti-Detection Humanizer System Prompt
     */
    buildPrompt(text, tone, lang, intensity) {
        const toneGuides = {
            academic: "Akademik & Ilmiah: Gunakan kosakata presisi, nalar kritis, transisi yang kaya nuansa, dan struktur argumentatif yang solid tanpa terdengar kaku atau robotik.",
            formal: "Formal & Bisnis: Berwibawa, sopan, lugas, profesional, efisien, cocok untuk eksekutif dan komunikasi resmi.",
            casual: "Santai & Percakapan: Mengalir alami seperti ditulis oleh manusia asli yang santai, komunikatif, bersahabat, tanpa jargon berat.",
            journalistic: "Jurnalistik: Kalimat aktif, hook memikat, ringkas, faktual, ritme cepat dan dinamis.",
            creative: "Kreatif & Naratif: Imajinatif, pemilihan kata ekspresif, ritme kalimat yang hidup dan berjiwa.",
            simple: "Ringkas & Jelas: Bebas dari kata mubazir, langsung ke inti kalimat dengan kejelasan maksimal."
        };

        const intensityGuides = {
            standard: "Variasikan panjang kalimat secara wajar dan gantikan frasa klise AI.",
            balanced: "Tingkatkan variasi panjang kalimat (burstiness) dan perkayaan diksi tidak terduga (perplexity).",
            ultra: "RESTRUKTURISASI MAKSIMAL: Acak ritme kalimat secara ekstrem. Padukan kalimat sangat pendek (3-6 kata) dengan kalimat majemuk panjang. Gunakan idiom manusiawi agar 100% lolos deteksi Turnitin & GPTZero."
        };

        const targetLangName = (window.LANGUAGES && window.LANGUAGES[lang]) ? window.LANGUAGES[lang].name : lang;

        return `Anda adalah pakar linguistik manusia dan editor profesional tingkat dunia yang menguasai prinsip Antislop Copywriting. Tugas utama Anda adalah menulis ulang (humanize) teks yang dihasilkan oleh AI agar terdeteksi 100% sebagai tulisan manusia asli dan lolos dari semua pendeteksi AI (seperti Turnitin, GPTZero, ZeroGPT, Copyleaks).

ATURAN WAJIB ANTISLOP COPYWRITING:
1. TINGKATKAN BURSTINESS (RITME & PANJANG KALIMAT BERVARIASI):
   - Pendeteksi AI mencari keseragaman panjang kalimat (15-25 kata berulang-ulang).
   - Buat variasi panjang kalimat secara dinamis: selingi kalimat pendek tegas (4-8 kata) dengan kalimat majemuk yang mengalir luwes (18-28 kata).
2. ELIMINASI KATA KLISE & EMPTY AI VOCABULARY (R-16, R-36):
   - JANGAN PERNAH gunakan frasa klise AI seperti: "delve into", "testament to", "pivotal role", "beacon", "furthermore", "moreover", "in conclusion", "merupakan hal yang sangat krusial", "tidak dapat dipungkiri bahwa", "dalam era modern ini", "menyelami dunia", "memegang peranan penting", "sebagai kesimpulan", "menandai babak baru", "komprehensif dan holistik", "bukti nyata".
   - Hapus kata pengisi tak berguna seperti "dalam rangka untuk", "perlu dicatat bahwa", "dapat dikatakan bahwa".
3. DILARANG EM DASH & PARALELISME NEGATIF (R-02, R-36):
   - Dilarang menggunakan tanda hubung em dash (—) atau ganda (--). Gunakan koma, titik, atau restrukturisasi klausa.
   - Hindari pola negatif klise seperti "Bukan hanya X, tapi juga Y" atau "Tidak hanya sekadar... melainkan juga...". Gantikan dengan susunan alami ("X dan Y berjalan beriringan" atau "Di samping X, Y turut...").
4. PRESERVASI KONTEKS & FAKTA 100% (R-17, R-36, R-38 - NEVER INVENT FACTS):
   - JANGAN PERNAH mengarang data, angka, nama, tahun, atau fakta baru yang tidak ada pada teks asli.
   - Pertahankan seluruh istilah teknis, nama model, rumus, dan akronim (seperti APT, CAPM, IHSG, Beta, AI, ROE, dsb.) secara presisi tanpa salah tafsir.
5. TATA BAHASA MANUSIAWI & AMAN DARI AMBIGUITAS:
   - JANGAN PERNAH menambahkan kata transisi di depan salam pembuka atau sapaan formal (seperti Assalamualaikum, Selamat pagi/siang/malam, Yth, Kepada Yth, dsb.). Biarkan salam tetap alami, sopan, dan utuh.
   - Gunakan kalimat aktif berorientasi pada pelaku, bukan pasif kaku tanpa subjek.
6. GAYA BAHASA: ${toneGuides[tone] || toneGuides.academic}
7. TINGKAT HUMANISASI: ${intensityGuides[intensity] || intensityGuides.balanced}
8. BAHASA TARGET: ${targetLangName}

OUTPUT:
Berikan HANYA teks hasil penulisan ulang manusiawi tersebut. Jangan tambahkan kata pengantar, penutup, atau tanda petik di luar teks.

TEKS YANG HARUS DIHUMANIZE:
${text}`;
    }

    /**
     * Executes Humanization via configured provider
     */
    async humanizeWithAI(text, options) {
        const { tone = 'academic', lang = 'id', intensity = 'balanced' } = options;
        const prompt = this.buildPrompt(text, tone, lang, intensity);

        if (!this.config.apiKey) {
            throw new Error("API Key belum diisi. Silakan masukkan API Key di menu Pengaturan API.");
        }

        switch (this.config.provider) {
            case 'gemini':
                return await this.callGemini(prompt);
            case 'openai':
                return await this.callOpenAI(prompt);
            case 'groq':
                return await this.callGroq(prompt);
            case 'openrouter':
                return await this.callOpenRouter(prompt);
            default:
                throw new Error("Provider API tidak dikenal.");
        }
    }

    async callGemini(prompt) {
        const model = this.config.model || 'gemini-1.5-flash';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.config.apiKey}`;

        const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.85,
                    topP: 0.95
                }
            })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error?.message || `Gemini API Error: ${res.status}`);
        }

        const data = await res.json();
        const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!candidate) throw new Error("Tidak ada respon dari Gemini.");
        return candidate.trim();
    }

    async callOpenAI(prompt) {
        const model = this.config.model || 'gpt-4o-mini';
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.88
            })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error?.message || `OpenAI API Error: ${res.status}`);
        }

        const data = await res.json();
        return data.choices?.[0]?.message?.content?.trim() || "";
    }

    async callGroq(prompt) {
        const model = this.config.model || 'llama-3.3-70b-versatile';
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: prompt }],
                temperature: 0.85
            })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error?.message || `Groq API Error: ${res.status}`);
        }

        const data = await res.json();
        return data.choices?.[0]?.message?.content?.trim() || "";
    }

    async callOpenRouter(prompt) {
        const model = this.config.model || 'meta-llama/llama-3.3-70b-instruct:free';
        const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.config.apiKey}`
            },
            body: JSON.stringify({
                model: model,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({}));
            throw new Error(err.error?.message || `OpenRouter API Error: ${res.status}`);
        }

        const data = await res.json();
        return data.choices?.[0]?.message?.content?.trim() || "";
    }
}

if (typeof window !== 'undefined') {
    window.ApiService = ApiService;
}
