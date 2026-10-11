# HumanizeAI Pro — AI Text Humanizer & Editorial Engine

> Platform penyunting teks komprehensif untuk mentransformasi tulisan yang kaku, formulaik, dan berulang menjadi naskah yang mengalir alami, kontekstual, dan berbobot tanpa mengorbankan integritas fakta atau makna.

- **Production URL**: [https://ai-text-humanizer-ten.vercel.app/](https://ai-text-humanizer-ten.vercel.app/)
- **Repository**: [https://github.com/bsfpd/AI-Text-Humanizer](https://github.com/bsfpd/AI-Text-Humanizer)

---

## 1. Arsitektur Sistem

Aplikasi dibangun sebagai **client-side pure JavaScript application** tanpa build step atau bundler, siap dideploy langsung ke hosting statis (Vercel, GitHub Pages, Cloudflare Pages).

```
index.html                  # Antarmuka web responsif (Tailwind CSS CDN + Lucide Icons)
├── css/style.css           # Styling kustom (tema gelap/terang, gauge, diff highlighter)
└── js/
    ├── languages.js        # Konfigurasi linguistik, kamus kolokasi, dan filter klise
    ├── detector.js         # WritingQualityEvaluator (analisis heuristik variasi, TTR, dan keterbacaan)
    ├── humanizer.js        # TextHumanizer (engine penyuntingan lokal heuristik multi-lapisan)
    ├── api-service.js      # ApiService (integrasi BYOK LLM: Gemini, Groq, OpenAI, OpenRouter)
    ├── doc-processor.js    # DocumentProcessor (pemrosesan DOCX format-preserving & ekstraksi PDF)
    └── app.js              # State controller, DOM event wiring, dan alur konversi
```

---

## 2. Pilihan Mode Engine

Platform ini membedakan secara tegas dan transparan antara pemrosesan di perangkat (offline) dan pemrosesan komputasi awan (cloud LLM):

### A. Editor Lokal Heuristik (Offline & Di Perangkat)
- **Karakteristik**: 100% gratis, berjalan sepenuhnya di browser pengguna tanpa memerlukan API key atau kuota internet.
- **Mekanisme**:
  1. *Token Protection*: Mengunci salam keagamaan (Islami), sapaan bertarget, entitas hukum (Pasal, UU), formula ilmiah, sitasi akademik, dan angka/persentase.
  2. *De-Slop & Cliché Stripping*: Membersihkan pembuka klise AI (*"Perlu diketahui bahwa"*, *"Tidak dapat dipungkiri bahwa"*), pleonasme (*"adalah merupakan"*, *"agar supaya"*), dan tanda hubung em dash (`—`).
  3. *Cadence Refinement*: Memperbaiki keterpaduan klausa tanpa memecah kalimat secara acak.
  4. *Collocation Smoothing*: Menyelaraskan frasa kaku menjadi ungkapan alami bahasa Indonesia.

### B. Neural AI (Cloud LLM — BYOK)
- **Karakteristik**: Memanfaatkan model bahasa besar (LLM) melalui konsep *Bring Your Own Key* (BYOK).
- **Provider yang Didukung**:
  - **Google Gemini API** (`gemini-1.5-flash`, `gemini-2.0-flash` — disarankan / free tier ready)
  - **Groq Cloud** (`llama-3.3-70b-versatile` — latensi sangat rendah)
  - **OpenAI** (`gpt-4o-mini`, `gpt-4o`)
  - **OpenRouter AI** (`meta-llama/llama-3.3-70b-instruct:free`)
- **Pemisahan Instruksi Asli**: Instruksi sistem (*system instructions*) dipisahkan secara ketat dari naskah masukan pengguna menggunakan pembatas dokumen untuk mencegah *prompt injection*.
- **Audit Kualitas 2-Pass (Opsional)**:
  - *Pass A*: Penulisan ulang alami sesuai gaya dan intensitas yang dipilih.
  - *Pass B (Fact-Check & Consistency)*: Membandingkan hasil revisi terhadap naskah asli untuk memastikan integritas angka, data, istilah teknis, dan sitasi 100% terlindungi.

---

## 3. Gaya Bahasa (Tone) yang Didukung

1. **Akademik**: Kosakata presisi, penalaran berbasis bukti, bebas dari bahasa bertele-tele.
2. **Diskusi Tuton UT**: Disesuaikan khusus untuk etika forum diskusi e-learning Tutorial Online Universitas Terbuka (merujuk BMP/Modul dan studi kasus, lugas, santun, tanpa mengarang cerita fiktif).
3. **Formal & Bisnis**: Profesional, efisien, sopan, cocok untuk korespondensi korporat dan laporan eksekutif.
4. **Santai (Casual)**: Luwes, bersahabat, mengalir alami tanpa bahasa gaul yang berlebihan.
5. **Jurnalistik**: Kalimat aktif, mendahulukan informasi penting (*inverted pyramid*), faktual dan dinamis.
6. **Kreatif**: Pilihan kata bernyawa, ritme ekspresif, menjaga maksud penceritaan asli.
7. **Ringkas & Jelas**: Langsung ke inti permasalahan dengan kalimat ringkas dan padat.

---

## 4. Tingkat Intensitas Revisi

- **Ringan (Light)**: Memperbaiki kesalahan tata bahasa, membuang klise AI, dan mempertahankan struktur kalimat asli.
- **Seimbang (Balanced)**: Menyelaraskan alur paragraf, memperkaya diksi, dan memvariasikan ritme kalimat secara wajar.
- **Mendalam (Deep)**: Melakukan restrukturisasi editorial menyeluruh untuk keterbacaan optimal tanpa mengubah fakta atau data.

---

## 5. Fitur Profil Gaya Penulis (Voice Profile)

Pengguna dapat menyertakan preferensi gaya personal di menu Pengaturan:
- Sasaran pembaca spesifik.
- Frasa yang disukai atau dihindari.
- 1-2 contoh cuplikan tulisan sendiri agar engine dapat mempelajari ritme penulisan tanpa menduplikasi fakta yang tidak relevan.

---

## 6. Analisis Kualitas Tulisan (Writing Quality Analysis)

Platform tidak menampilkan persentase fiktif atau mengklaim kepastian lolos detektor pihak ketiga. Sebagai gantinya, disediakan panel analisis heuristik transparan:
- **Variasi Ritme Kalimat**: Standar deviasi panjang kalimat (SD) untuk mengukur variasi irama bacaan.
- **Keberagaman Diksi (TTR)**: *Type-Token Ratio* untuk mengukur kekayaan kosakata.
- **Tingkat Keterbacaan**: Estimasi kemudahan baca (*readability*).
- **Deteksi Klise & Formulaik**: Pemindaian frasa klise khas AI.

---

## 7. Keamanan & Privasi API Key

- Kunci API pengguna disimpan **hanya di Local Storage peramban lokal**.
- Kunci API tidak pernah dikirimkan ke server pengembang dan hanya dikomunikasikan langsung ke endpoint resmi penyedia API terkait.
- Pengguna dapat menghapus seluruh kunci API kapan saja melalui tombol **Hapus Kunci API** di menu Pengaturan.

---

## 8. Panduan Pengujian & Evaluasi

Tersedia rangkaian pengujian regresi berisi 30 kasus uji nyata yang mencakup ragam topik (akademik, Tuton UT, akuntansi, hukum, kesehatan, teknik, dan bahasa Inggris):

```bash
# Menjalankan evaluasi 30 kasus uji
node scratch/test_comparison_suite.js
```

### Hasil Verifikasi Regresi
- **Preservasi Token Terlindungi**: 102/102 (100.0%)
- **Preservasi Salam & Entitas Spesifik**: 100% (termasuk nama instansi, direksi, dan salam keagamaan)
- **Waktu Pemrosesan Rata-Rata**: ~2.9 ms per naskah (pada Editor Lokal)

---

## 9. Lisensi & Pengembang

Aplikasi ini dikembangkan oleh **Binar Surya Fajar** ([@bsfpd_](https://www.threads.com/@bsfpd_)).
Lisensi: MIT.
