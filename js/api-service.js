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
    buildPrompt(text, toneOrOptions = 'academic', lang = 'id', intensity = 'ultra') {
        let tone = 'academic';
        let effectiveLang = 'id';
        let effectiveIntensity = 'ultra';

        if (typeof toneOrOptions === 'object' && toneOrOptions !== null) {
            tone = toneOrOptions.tone || 'academic';
            effectiveLang = toneOrOptions.lang || 'id';
            effectiveIntensity = toneOrOptions.intensity || 'ultra';
        } else {
            tone = toneOrOptions || 'academic';
            effectiveLang = lang || 'id';
            effectiveIntensity = intensity || 'ultra';
        }

        const toneGuides = {
            academic: "Akademik & Ilmiah: Gunakan kosakata presisi, nalar kritis, transisi yang kaya nuansa, dan struktur argumentatif yang solid tanpa terdengar kaku atau robotik.",
            tuton: "Diskusi Forum Tuton UT (Akademik Lugas, Santai & Terarah): Dirancang khusus untuk forum diskusi e-learning Tutorial Online Universitas Terbuka. Berbobot akademik dengan landasan materi BMP/Modul dan studi kasus, namun bernada luwes, bersahabat, lugas, dan santai (tidak kaku seperti skripsi, tidak birokratis berlebihan). Mempertahankan salam pembuka forum mahasiswa, argumen berbasis nalar sehat, dan terbebas dari deteksi Turnitin serta Drillbit.",
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

        const targetLangName = (window.LANGUAGES && window.LANGUAGES[effectiveLang]) ? window.LANGUAGES[effectiveLang].name : effectiveLang;

        return `Anda adalah pakar linguistik manusia dan editor profesional tingkat dunia yang menguasai prinsip Antislop Copywriting. Tugas utama Anda adalah menulis ulang (humanize) teks yang dihasilkan oleh AI agar terdeteksi 100% sebagai tulisan manusia asli dan lolos dari semua pendeteksi AI model terbaru (Turnitin AI Writing Detection, Drillbit Anti-Plagiarism, GPTZero Model 4.10b, Copyleaks, ZeroGPT, QuillBot AI Detector, serta Sapling & CrossPlag).

ATURAN WAJIB ANTISLOP COPYWRITING & DE-DETECTION (UPDATE SEPTEMBER 2026):
1. OPTIMALISASI MULTI-DETEKTOR TERBARU (Turnitin 2026, Drillbit, GPTZero Model 4.10b, Copyleaks, ZeroGPT, QuillBot):
   - Turnitin & Drillbit: Hilangkan formula klise akademik ("adalah merupakan", "sangat penting untuk diperhatikan", "sebagaimana telah dijelaskan", "dalam rangka mencapai tujuan", "memberikan kontribusi signifikan"). Hindari struktur kalimat pasif beruntun.
   - GPTZero 4.10b & Sapling: Hancurkan keteraturan n-gram dan variasi panjang kalimat seragam melalui injeksi syntactic burstiness (selingan kalimat pendek 4-7 kata dengan kalimat majemuk luwes 16-24 kata).
   - Copyleaks & QuillBot: JANGAN sekadar menukar kata dengan sinonim kamus pada struktur yang sama. Rombak urutan klausa dan bangun kalimat baru yang mengalir alami.
2. PROTEKSI MUTLAK SALAM ISLAMI (INVIOLABLE RELIGIOUS GREETINGS RULE):
   - Jika teks sumber mengandung salam pembuka/penutup Islami seperti "Assalamualaikum" (termasuk Assalamu'alaikum wr. wb., dsb.), "Waalaikumussalam", atau "Wassalamu'alaikum wr. wb.", Anda WAJIB mempertahankan salam tersebut secara 100% UTUH tanpa diubah atau digantikan menjadi salam sekuler apapun!
3. HARMONISASI SALAM PEMBUKA & PENUTUP UMUM (SEKULER) SESUAI GAYA BAHASA (TONE):
   - Untuk salam pembuka umum (selain salam Islami, seperti "Halo", "Selamat pagi/siang/malam", "Dear all", "Yth.", "Dengan hormat", dsb.) dan kalimat penutup umum (seperti "Terima kasih", "Demikian disampaikan", dsb.), SESUAIKAN secara luwes dan alami dengan Gaya Bahasa (Tone) yang aktif:
     * Akademik: Buka "Salam sejahtera bagi rekan-rekan civitas akademika," atau "Dengan hormat,"; Tutup dengan penegasan kontribusi wacana ilmiah keilmuan.
     * Diskusi Tuton UT: Buka "Selamat pagi/siang Tutor dan rekan-rekan mahasiswa sekalian,"; Tutup "Demikian tanggapan dari saya, mohon masukan dan koreksi dari Tutor serta rekan-rekan mahasiswa sekalian. Terima kasih."
     * Formal & Bisnis: Buka "Yth. Bapak/Ibu dan rekan-rekan sekalian," atau "Dengan hormat,"; Tutup dengan apresiasi profesional dan tindak lanjut korporat.
     * Santai (Casual): Buka "Halo teman-teman," atau "Hai semuanya,"; Tutup "Sekian dulu dari aku ya, semoga bermanfaat buat teman-teman! Gimana menurut kalian? Yuk diskusi!"
     * Jurnalistik: Langsung masuk ke pokok permasalahan (lead berita) atau buka "Salam redaksi,"; Tutup dengan penegasan rangkuman informasi terkini dari lapangan.
     * Kreatif: Buka dengan salam hangat reflektif; Tutup dengan renungan akhir yang berkesan.
     * Ringkas & Jelas: Buka "Halo," atau "Selamat pagi,"; Tutup "Sekian dan terima kasih."
   - JIKA teks sumber tidak memiliki salam pembuka atau penutup sama sekali (misalnya esai atau laporan teknis murni), JANGAN mengarang atau menambahkan salam buatan.
4. TINGKATKAN BURSTINESS SECARA ORGANIK:
   - Pecah kalimat majemuk panjang (>18 kata) menjadi kalimat-kalimat mandiri yang bernas.
   - Selingi kalimat pendek tegas (4-8 kata) dengan kalimat sedang/panjang yang mengalir luwes (16-26 kata).
   - JANGAN PERNAH menyisipkan kalimat asing acak yang keluar dari konteks pembahasan.
5. ELIMINASI KATA KLISE & EMPTY AI VOCABULARY (R-16, R-36, DETEKTOR 2026):
   - JANGAN PERNAH gunakan frasa klise AI: "delve into", "testament to", "pivotal role", "beacon", "furthermore", "moreover", "in conclusion", "merupakan hal yang sangat krusial", "tidak dapat dipungkiri bahwa", "dalam era modern ini", "menyelami dunia", "memegang peranan penting", "sebagai kesimpulan", "menandai babak baru", "komprehensif dan holistik", "bukti nyata", "adalah merupakan", "dalam era transformasi digital", "perlu digarisbawahi bahwa", "pada hakikatnya", "memiliki peran yang tak terelakkan", "merupakan instrumen fundamental".
   - Hapus kata pengisi tak berguna seperti "dalam rangka untuk", "perlu dicatat bahwa", "dapat dikatakan bahwa", "secara garis besar dapat disimpulkan".
6. DILARANG EM DASH & PARALELISME NEGATIF (R-02, R-36):
   - Dilarang keras menggunakan tanda hubung em dash (—) atau ganda (--). Gunakan tanda koma, titik, atau restrukturisasi klausa.
   - Hindari formula negatif klise seperti "Bukan hanya X, tapi juga Y" atau "Tidak hanya sekadar... melainkan juga...". Gantikan dengan susunan wajar.
7. PRESERVASI KONTEKS, FAKTA & DATA 100% (NEVER INVENT FACTS - R-17, R-36, R-38):
   - JANGAN PERNAH mengarang data, angka, nama, tahun, atau fakta baru.
   - Pertahankan seluruh istilah teknis, nama model, rumus, dan akronim (seperti APT, CAPM, IHSG, PC, Rp 75.000.000, dll.) secara presisi tanpa salah tafsir.
8. TATA BAHASA MANUSIAWI & AMAN DARI AMBIGUITAS:
   - JANGAN PERNAH menambahkan kata transisi sambung di depan salam pembuka atau sapaan formal. Biarkan salam tetap alami, sopan, dan utuh.
   - Hindari pengulangan kata yang sama dalam satu alinea.
9. STRUKTUR PARAGRAF, BARIS, & SPASI (PRESERVASI 1:1):
   - PERTAHANKAN susunan baris, spasi, enter tunggal (line break), pemisahan antar-paragraf (enter ganda), dan format penomoran (list 1, 2, 3 atau bullet) PERSIS seperti teks sumber.
   - JANGAN PERNAH menggabungkan paragraf atau baris yang terpisah menjadi satu alinea panjang.
10. GAYA BAHASA (TONE): ${toneGuides[tone] || toneGuides.academic}
11. TINGKAT HUMANISASI: ${intensityGuides[intensity] || intensityGuides.balanced}
12. BAHASA TARGET: ${targetLangName}

OUTPUT:
Berikan HANYA teks hasil penulisan ulang manusiawi tersebut. Jangan tambahkan kata pengantar, penutup, atau tanda kutip di luar teks.

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
