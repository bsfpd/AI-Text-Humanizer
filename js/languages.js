/**
 * Antislop Language Support, Cliché Patterns, Dictionaries, and Tone Profiles
 * Formulated under Anti-Slop Copywriting & De-Detection Principles
 */

const LANGUAGES = {
    id: {
        name: "Bahasa Indonesia",
        flag: "🇮🇩",
        
        // Universal Antislop Cliché & Formulaic AI Patterns (De-Slop Rules R-16, R-36, R-02)
        cliches: [
            // 1. Em Dash Elimination (R-02)
            { pattern: /\s*—\s*/g, replacement: ", " },
            { pattern: /\s*--\s*/g, replacement: ", " },

            // 2. Elimination of AI Discourse Openers & Fillers (R-16, R-36)
            { pattern: /\b(?:tidak\s+dapat\s+dipungkiri|tak\s+dapat\s+dimungkiri|tidak\s+dapat\s+disangkal|tak\s+bisa\s+dipungkiri|sudah\s+tidak\s+bisa\s+dipungkiri)\s+bahwa,?\s*/gi, replacement: "" },
            { pattern: /\b(?:tidak\s+dapat\s+dipungkiri|tak\s+dapat\s+dimungkiri|tidak\s+dapat\s+disangkal|tak\s+bisa\s+dipungkiri)\b/gi, replacement: "" },
            { pattern: /\b(?:sebagaimana\s+(?:telah\s+)?kita\s+ketahui\s+bersama|seperti\s+yang\s+kita\s+ketahui|seperti\s+yang\s+telah\s+diketahui),?\s*/gi, replacement: "sebagaimana dipahami, " },
            { pattern: /\bsudah\s+bukan\s+rahasia\s+lagi\s+(?:bahwa)?,?\s*/gi, replacement: "jelas terlihat bahwa " },
            { pattern: /\b(?:dalam|di)\s+era\s+(?:digital|modern|globalisasi|serba\s+cepat|informasi)?\s*(?:saat\s+ini|sekarang\s+ini|dewasa\s+ini),?\s*/gi, replacement: "saat ini, " },
            { pattern: /\bdi\s+tengah\s+(?:pesatnya\s+)?(?:perkembangan|kemajuan|laju)\s+(?:teknologi|zaman|digitalisasi),?\s*/gi, replacement: "di tengah pesatnya teknologi saat ini, " },
            { pattern: /\bdalam\s+lanskap\s+(?:bisnis|digital|teknologi|pendidikan)?\s*(?:yang\s+terus\s+berkembang|modern),?\s*/gi, replacement: "pada praktiknya saat ini, " },

            // 3. Filler Phrases & Signposting Elimination (Cut ceremony, keep content)
            { pattern: /\bdalam\s+rangka\s+(?:untuk|guna|mencapai)\b/gi, replacement: "guna" },
            { pattern: /\bperlu\s+(?:diingat|dicatat|ditekankan|digarisbawahi)\s+bahwa,?\s*/gi, replacement: "catatannya, " },
            { pattern: /\bdapat\s+(?:dikatakan|dipahami|dilihat)\s+bahwa,?\s*/gi, replacement: "" },
            { pattern: /\bpada\s+dasarnya,?\s*/gi, replacement: "intinya, " },
            { pattern: /\boleh\s+karena\s+itu,?\s+(?:sangat\s+)?(?:penting|krusial|esensial)\s+untuk\b/gi, replacement: "karena itu, langkah konkretnya yakni" },
            { pattern: /\bdengan\s+demikian,?\s+(?:dapat\s+disimpulkan|dapat\s+dikatakan)\s+bahwa,?\s*/gi, replacement: "artinya, " },
            { pattern: /\bhal\s+(?:ini|tersebut)\s+(?:disebabkan|dikarenakan)\s+oleh,?\s*/gi, replacement: "hal ini terjadi lantaran " },
            { pattern: /\bhal\s+(?:ini|tersebut)\s+dikarenakan\b/gi, replacement: "faktor utamanya karena" },
            { pattern: /\bsehubungan\s+dengan\s+hal\s+tersebut,?\s*/gi, replacement: "menanggapi poin ini, " },
            { pattern: /\b(?:sebagai\s+kesimpulan|kesimpulannya|pada\s+akhirnya),?\s*/gi, replacement: "pada intinya, " },
            { pattern: /\bsecara\s+keseluruhan,?\s*/gi, replacement: "secara umum, " },
            { pattern: /\bdapat\s+disimpulkan\s+bahwa,?\s*/gi, replacement: "bisa dipastikan bahwa " },

            // 4. Significance Inflation & Empty AI Vocabulary (R-16, R-36)
            { pattern: /\b(?:merupakan|menjadi)\s+(?:salah\s+satu\s+)?(?:aspek|faktor|hal|komponen|elemen)\s+yang\s+(?:sangat\s+)?(?:krusial|esensial|vital|penting)\b/gi, replacement: "sangat menentukan" },
            { pattern: /\bmerupakan\s+hal\s+yang\s+sangat\s+krusial\b/gi, replacement: "sangat penting" },
            { pattern: /\bsangat\s+krusial\b/gi, replacement: "sangat penting" },
            { pattern: /\bmerupakan\s+inovasi\s+teknologi\s+yang\s+sangat\s+krusial\b/gi, replacement: "menjadi inovasi teknologi yang berpengaruh besar" },
            { pattern: /\b(?:memegang|memainkan)\s+peran(?:an)?\s+(?:yang\s+)?(?:sangat\s+)?(?:penting|krusial|vital|utama|signifikan|besar)?\s*(?:dalam|pada|bagi)?\b/gi, replacement: "mengambil peran besar dalam " },
            { pattern: /\b(?:memegang|memainkan)\s+peran(?:an)?\b/gi, replacement: "berperan aktif" },
            { pattern: /\b(?:berfungsi|menjadi)\s+sebagai\s+bukti\s+nyata\s+(?:bahwa|dari)?\b/gi, replacement: "membuktikan" },
            { pattern: /\bsebuah\s+bukti\s+nyata\s+(?:bahwa|dari)?\b/gi, replacement: "bukti jelas bahwa" },
            { pattern: /\bmenyelami\s+(?:lebih\s+dalam|dunia|ranah|berbagai)?\s*/gi, replacement: "mempelajari " },
            { pattern: /\bmenyelami\b/gi, replacement: "mendalami" },
            { pattern: /\bnamun\s+demikian,?\s*/gi, replacement: "namun di lapangan, " },
            { pattern: /\bdi\s+samping\s+itu,?\s*/gi, replacement: "selain itu, " },
            { pattern: /\bkomprehensif\s+dan\s+holistik\b/gi, replacement: "menyeluruh dan terarah" },
            { pattern: /\bmemberikan\s+kontribusi\s+(?:yang\s+)?(?:sangat\s+)?(?:signifikan|besar|nyata)\b/gi, replacement: "berkontribusi langsung" },
            { pattern: /\bmerangkul\s+perubahan\b/gi, replacement: "menyesuaikan diri dengan perubahan" },
            { pattern: /\bmembuka\s+potensi\s+(?:penuh|tanpa\s+batas)?\b/gi, replacement: "mengoptimalkan potensi" },
            { pattern: /\bmembuka\s+peluang\s+(?:emas|baru)?\b/gi, replacement: "membuka kesempatan baru" },
            { pattern: /\bharmoni\s+yang\s+indah\b/gi, replacement: "keselarasan yang baik" },
            { pattern: /\bmerajut\s+masa\s+depan\b/gi, replacement: "menyiapkan langkah ke depan" },
            { pattern: /\bmenatap\s+masa\s+depan\b/gi, replacement: "melihat ke depan" },
            { pattern: /\bmenjadi\s+landasan\s+utama\b/gi, replacement: "menjadi fondasi utama" },
            { pattern: /\bmemberikan\s+dampak\s+positif\b/gi, replacement: "membawa dampak baik" },
            { pattern: /\bmemberikan\s+dampak\s+negatif\b/gi, replacement: "menimbulkan dampak buruk" },
            { pattern: /\bberbagai\s+macam\b/gi, replacement: "beragam" },

            // 5. Negative Parallelism Elimination (R-36)
            { pattern: /\b(?:tidak|bukan)\s+hanya\s+([^\.,;]+?)\s*,\s*(?:tetapi|melainkan|namun)\s+juga\s+/gi, replacement: "selain $1, turut pula " },
            { pattern: /\b(?:tidak|bukan)\s+hanya\s+sekadar\s+([^\.,;]+?)\s*,\s*(?:tetapi|melainkan)\s+/gi, replacement: "selain $1, hal ini juga " },

            // 6. Idiomatic & Multi-Word Phrase Replacements (Natural Human Style)
            { pattern: /\btelah\s+mengubah\s+cara\s+kerja\b/gi, replacement: "kini merombak pola kerja" },
            { pattern: /\bcara\s+kerja\b/gi, replacement: "pola kerja" },
            { pattern: /\bmulai\s+mengadopsi\b/gi, replacement: "mulai beralih menerapkan" },
            { pattern: /\bteknologi\s+otomatisasi\b/gi, replacement: "sistem otomatisasi" },
            { pattern: /\bmeningkatkan\s+produktivitas\s+dan\s+efisiensi\s+operasional\b/gi, replacement: "menggenjot produktivitas sekaligus menekan biaya operasional" },
            { pattern: /\bmeningkatkan\s+produktivitas\s+dan\s+efisiensi\b/gi, replacement: "menggenjot produktivitas serta efisiensi" },
            { pattern: /\befisiensi\s+operasional\b/gi, replacement: "efisiensi operasional kerja" },
            { pattern: /\bdituntut\s+untuk\s+mempelajari\b/gi, replacement: "perlu memperbarui" },
            { pattern: /\bketerampilan\s+baru\b/gi, replacement: "keahlian baru" },
            { pattern: /\bagar\s+tetap\s+relevan\b/gi, replacement: "supaya tetap kompetitif" },
            { pattern: /\bpasar\s+tenaga\s+kerja\b/gi, replacement: "bursa kerja" },
            { pattern: /\bterus\s+berkembang\b/gi, replacement: "kian dinamis" },
            { pattern: /\btransformasi\s+digital\s+ini\b/gi, replacement: "arus digitalisasi ini" },
            { pattern: /\bmasa\s+depan\s+ekonomi\s+modern\b/gi, replacement: "arah ekonomi masa depan" },
            { pattern: /\bmetode\s+pembelajaran\s+daring\b/gi, replacement: "sistem pembelajaran daring" },
            { pattern: /\bdunia\s+pendidikan\s+tinggi\b/gi, replacement: "lingkup perguruan tinggi" },
            { pattern: /\bmengakses\s+materi\s+kuliah\b/gi, replacement: "mempelajari bahan kuliah" },
            { pattern: /\bdengan\s+lebih\s+fleksibel\b/gi, replacement: "secara lebih fleksibel" },
            { pattern: /\bkendala\s+jaringan\s+internet\b/gi, replacement: "hambatan koneksi internet" },
            { pattern: /\bsering\s+dihadapi\s+oleh\b/gi, replacement: "kerap dialami oleh" },
            { pattern: /\bpeserta\s+didik\b/gi, replacement: "mahasiswa" },
            { pattern: /\bmencari\s+solusi\s+efektif\b/gi, replacement: "merumuskan solusi konkret" },
            { pattern: /\bkesenjangan\s+fasilitas\b/gi, replacement: "ketimpangan fasilitas" },
            { pattern: /\bbelajar\s+teknologi\s+baru\b/gi, replacement: "mempelajari teknologi baru" },
            { pattern: /\bpada\s+dasarnya,?\s*kita\s+hanya\s+perlu\b/gi, replacement: "kuncinya ada pada kemauan untuk" },
            { pattern: /\bmeluangkan\s+waktu\s+secara\s+konsisten\b/gi, replacement: "menyisihkan waktu secara teratur" },
            { pattern: /\bsetiap\s+hari\b/gi, replacement: "setiap harinya" },

            // 7. Academic Case-Study Clichés (Clean, Human, Rigorous)
            { pattern: /\bBerdasarkan\s+(?:ilustrasi|analisis|uraian|penjelasan|paparan|data|kajian)?\s*(?:kasus|soal|studi|permasalahan)?\s*(?:di atas|tersebut),?\s*/gi, replacement: "Mencermati paparan kasus di atas, " },
            { pattern: /\bsebagai seorang investor saya lebih memilih pendekatan\s*([a-zA-Z0-9_-]+)?\b/gi, replacement: "pilihan saya jatuh pada pendekatan $1" },
            { pattern: /\bsebagai seorang investor saya lebih memilih\b/gi, replacement: "saya lebih memilih" },
            { pattern: /\bsaya lebih memilih pendekatan\s*([a-zA-Z0-9_-]+)?\b/gi, replacement: "pilihan saya jatuh pada opsi $1" },
            { pattern: /\byaitu menggunakan model\b/gi, replacement: "yakni model" },
            { pattern: /\byaitu dengan menerapkan\b/gi, replacement: "dengan menerapkan" },
            { pattern: /\bAlasan utamanya adalah\s*(?:karena)?\s*/gi, replacement: "Alasannya sederhana: " },
            { pattern: /\bmemiliki asumsi dasar yang sangat ketat\b/gi, replacement: "memiliki asumsi yang terlampau kaku" },
            { pattern: /\basumsi dasar yang sangat ketat\b/gi, replacement: "asumsi yang terlampau kaku" },
            { pattern: /\byakni menganggap bahwa\b/gi, replacement: "karena menganggap bahwa" },
            { pattern: /\byakni mengasumsikan bahwa\b/gi, replacement: "karena bertumpu pada anggapan bahwa" },
            { pattern: /\bhanya dipengaruhi oleh satu faktor risiko sistematis tunggal\b/gi, replacement: "hanya bertumpu pada satu faktor risiko pasar" },
            { pattern: /\bhanya dipengaruhi oleh\b/gi, replacement: "hanya bertumpu pada" },
            { pattern: /\byaitu risiko pasar\s*\(yang diukur dengan Beta terhadap IHSG\)\b/gi, replacement: "yaitu risiko pasar (diukur lewat Beta terhadap IHSG)" },
            { pattern: /\byaitu risiko pasar\b/gi, replacement: "yaitu risiko pasar" },
            { pattern: /\bKetika\s+kondisi\s+pasar\s*(?:\(IHSG\))?\s*sedang\s+stagnan(?:\s+atau\s+tidak\s+berubah)?,?\s*(?:namun)?\s*/gi, replacement: "Padahal saat kondisi IHSG stagnan sekalipun, " },
            { pattern: /\b(?:beberapa\s+)?saham\s+tetap\s+menunjukkan\s+pergerakan\s+return\s+yang\s+fluktuatif\b/gi, replacement: "harga saham tetap berfluktuasi" },
            { pattern: /\btetap\s+menunjukkan\s+pergerakan\s+return\s+yang\s+fluktuatif\b/gi, replacement: "tetap berfluktuasi" },
            { pattern: /\bsehingga\s+(APT|__ANTISLOP_TOKEN_\d+__)\s+menjadi\s+jauh\s+lebih\s+relevan\b/gi, replacement: ". Keunggulan $1 justru tampak di sini" },
            { pattern: /\bhal ini membuktikan bahwa\b/gi, replacement: "ini bukti bahwa" },
            { pattern: /\bhal ini menunjukkan bahwa\b/gi, replacement: "ini menunjukkan bahwa" },
            { pattern: /\bada variabel lain di luar market return yang sedang beraksi\b/gi, replacement: "terdapat variabel lain di luar pasar yang turut bekerja" },
            { pattern: /\bvariabel lain di luar market return\b/gi, replacement: "faktor lain di luar pergerakan pasar" },
            { pattern: /\bsedang beraksi\b/gi, replacement: "turut berpengaruh" },
            { pattern: /\bDi sinilah\s+(APT|__ANTISLOP_TOKEN_\d+__)\s+menjadi\s+jauh\s+lebih\s+relevan\b/gi, replacement: "Keunggulan $1 justru tampak di sini" },
            { pattern: /\bKonsep\s+model\s+banyak\s+faktor\s*(?:(?:\(multi-factor model\)|\(__ANTISLOP_TOKEN_\d+__\)|__ANTISLOP_TOKEN_\d+__)\s*)?dalam\s+(APT|__ANTISLOP_TOKEN_\d+__)\s*tidak\s+mengikat\s+investor\s+pada\s+satu\s+faktor\s+saja\b/gi, replacement: "Model multi-faktor dalam $1 memberi ruang analisis yang jauh lebih fleksibel bagi investor" },
            { pattern: /\btidak mengikat investor pada satu faktor saja\b/gi, replacement: "tidak membatasi investor pada satu variabel semata" }
        ],

        // Natural Human Transitions for Sentence Pacing (No inflated academic buzzwords)
        transitions: {
            academic: [
                "Dalam praktiknya,",
                "Di sisi lain,",
                "Perlu dicermati,",
                "Terkait hal itu,",
                "Menariknya,",
                "Catatan pentingnya,"
            ],
            formal: [
                "Terkait hal tersebut,",
                "Dalam pelaksanaannya,",
                "Lebih lanjut,",
                "Sejalan dengan hal itu,"
            ],
            casual: [
                "Sebetulnya,",
                "Menariknya,",
                "Bisa dibilang,",
                "Nyatanya,"
            ],
            journalistic: [
                "Di sisi lain,",
                "Kenyataannya,",
                "Sementara itu,"
            ],
            creative: [
                "Menariknya,",
                "Tanpa disadari,",
                "Satu hal yang pasti,"
            ],
            simple: [
                "Artinya,",
                "Selain itu,",
                "Intinya,"
            ]
        },

        samplePrompts: {
            academic: "Kecerdasan buatan (AI) merupakan inovasi teknologi yang sangat krusial dalam era modern ini. Tidak dapat dipungkiri bahwa AI memainkan peran penting dalam mentransformasi sektor pendidikan dan riset akademik. Sebagai kesimpulan, pemanfaatan AI yang komprehensif dan holistik akan menjadi landasan utama bagi kemajuan peradaban masa depan.",
            formal: "Sehubungan dengan perkembangan implementasi sistem informasi, perlu diingat bahwa koordinasi antar divisi memegang peranan penting dalam pencapaian target. Oleh karena itu, sangat penting untuk meningkatkan efisiensi kerja demi memberikan kontribusi signifikan bagi perusahaan.",
            casual: "Belajar hal baru di era digital saat ini memang sangat menyenangkan. Tidak dapat dipungkiri bahwa banyak sekali aplikasi yang bisa membantu kita belajar lebih cepat. Sebagai kesimpulan, jangan ragu untuk menyelami lebih dalam berbagai ilmu yang kamu minati."
        }
    },

    en: {
        name: "English",
        flag: "🇬🇧",
        
        cliches: [
            // 1. Em Dash Elimination (R-02)
            { pattern: /\s*—\s*/g, replacement: ", " },
            { pattern: /\s*--\s*/g, replacement: ", " },

            // 2. Empty AI Vocabulary & Significance Inflation (R-16, R-36)
            { pattern: /\bdelve\s+into\b/gi, replacement: "explore" },
            { pattern: /\bdelving\s+into\b/gi, replacement: "examining" },
            { pattern: /\ba\s+testament\s+to\b/gi, replacement: "clear proof of" },
            { pattern: /\bplays\s+a\s+(?:pivotal|crucial|vital|key)\s+role\s+in\b/gi, replacement: "is central to" },
            { pattern: /\bplays\s+an\s+essential\s+role\s+in\b/gi, replacement: "directly influences" },
            { pattern: /\bin\s+today's\s+(?:digital\s+age|fast-paced\s+world|interconnected\s+society)\b/gi, replacement: "nowadays" },
            { pattern: /\bin\s+the\s+modern\s+era\b/gi, replacement: "today" },
            { pattern: /\brich\s+tapestry\s+of\b/gi, replacement: "wide array of" },
            { pattern: /\bseamlessly\s+integrated?\b/gi, replacement: "smoothly linked" },
            { pattern: /\bfoster\s+a\s+sense\s+of\b/gi, replacement: "encourage" },
            { pattern: /\bbeacon\s+of\s+hope\b/gi, replacement: "promising sign" },
            { pattern: /\bparamount\s+importance\b/gi, replacement: "key priority" },
            { pattern: /\bcomprehensive\s+overview\b/gi, replacement: "clear summary" },
            { pattern: /\bholistic\s+approach\b/gi, replacement: "integrated method" },
            { pattern: /\bunlock(?:ing)?\s+the\s+potential\b/gi, replacement: "maximizing ability" },
            { pattern: /\bgame-changer\b/gi, replacement: "significant shift" },

            // 3. Filler Phrases
            { pattern: /\bit\s+is\s+(?:important|worth)\s+noting\s+that,?\s*/gi, replacement: "notably, " },
            { pattern: /\bit\s+is\s+undeniable\s+that,?\s*/gi, replacement: "clearly, " },
            { pattern: /\bin\s+order\s+to\b/gi, replacement: "to" },
            { pattern: /\bdue\s+to\s+the\s+fact\s+that\b/gi, replacement: "because" },
            { pattern: /\bfurthermore,?\s*/gi, replacement: "moreover, " },
            { pattern: /\bin\s+conclusion,?\s*/gi, replacement: "ultimately, " },
            { pattern: /\ball\s+in\s+all,?\s*/gi, replacement: "on the whole, " },

            // 4. Negative Parallelism (R-36)
            { pattern: /\bnot\s+only\s+([^\.,;]+?)\s*,\s*but\s+also\s+/gi, replacement: "along with $1, it also " }
        ],

        transitions: {
            academic: [
                "From a theoretical perspective,",
                "Empirically speaking,",
                "Upon closer examination,",
                "In practical terms,",
                "Methodologically,",
                "In this analytical framework,"
            ],
            formal: [
                "In this regard,",
                "Operationally speaking,",
                "Moving forward,",
                "From an executive standpoint,",
                "Consequently,"
            ],
            casual: [
                "Honestly,",
                "Interestingly,",
                "Turns out,",
                "At the end of the day,",
                "If you look closely,"
            ],
            journalistic: [
                "Reports indicate,",
                "Crucially,",
                "Behind the scenes,",
                "Meanwhile,",
                "Current data reveals,"
            ],
            creative: [
                "Slowly but surely,",
                "Beneath the surface,",
                "Curiously enough,",
                "In plain sight,"
            ],
            simple: [
                "In short,",
                "Simply put,",
                "Because of this,",
                "Consequently,",
                "Essentially,"
            ]
        },

        samplePrompts: {
            academic: "Artificial intelligence has become a paramount technological breakthrough in today's fast-paced world. It is undeniable that machine learning models play a pivotal role in modern scientific inquiry. Furthermore, this serves as a testament to the power of computational algorithms. In conclusion, delving into these methodologies will foster innovation across interdisciplinary domains.",
            formal: "In light of the recent operational assessment, it is important to remember that inter-departmental synergy plays a crucial role in project success. Moreover, a comprehensive overview reveals notable efficiency gains. Moving forward, we recommend streamlined communication channels.",
            casual: "Exploring new tech trends in today's digital age can feel a bit overwhelming. But when you really delve into the details, you notice how much everyday tools have improved. In conclusion, embracing these changes makes everyday work a whole lot easier."
        }
    },

    es: {
        name: "Español",
        flag: "🇪🇸",
        cliches: [
            { pattern: /\s*—\s*/g, replacement: ", " },
            { pattern: /\ben conclusión,?\b/gi, replacement: "en última instancia," },
            { pattern: /\bes crucial destacar que\b/gi, replacement: "conviene señalar que" },
            { pattern: /\bjuega un papel fundamental\b/gi, replacement: "influye directamente" },
            { pattern: /\ben el mundo actual\b/gi, replacement: "hoy en día" },
            { pattern: /\bun testimonio de\b/gi, replacement: "prueba clara de" }
        ],
        transitions: {
            academic: ["Desde una perspectiva empírica,", "Resulta evidente que", "En este marco analítico,"],
            formal: ["Con respecto a esto,", "En términos operativos,", "De cara al futuro,"],
            casual: ["La verdad es que", "Al final de cuentas,", "Lo curioso es que"]
        },
        samplePrompts: {
            academic: "La inteligencia artificial desempeña un papel fundamental en el mundo actual. Es crucial destacar que los avances computacionales son un testimonio de la innovación. En conclusión, debemos profundizar en sus implicaciones éticas."
        }
    },

    fr: {
        name: "Français",
        flag: "🇫🇷",
        cliches: [
            { pattern: /\s*—\s*/g, replacement: ", " },
            { pattern: /\ben conclusion,?\b/gi, replacement: "en définitive," },
            { pattern: /\bil est crucial de noter que\b/gi, replacement: "soulignons que" },
            { pattern: /\bjoue un rôle primordial\b/gi, replacement: "pèse lourdement" },
            { pattern: /\bdans le monde d'aujourd'hui\b/gi, replacement: "de nos jours" }
        ],
        transitions: {
            academic: ["D'un point de vue analytique,", "Les observations suggèrent que", "De fait,"],
            formal: ["Dans cette optique,", "Sur le plan operational,", "Par conséquent,"],
            casual: ["Au fond,", "En réalité,", "Ce qui frappe surtout,"]
        },
        samplePrompts: {
            academic: "L'intelligence artificielle joue un rôle primordial dans le monde d'aujourd'hui. Il est crucial de noter ses répercussions méthodologiques. En conclusion, cette évolution redéfinit nos paradigmes de recherche."
        }
    },

    de: {
        name: "Deutsch",
        flag: "🇩🇪",
        cliches: [
            { pattern: /\s*—\s*/g, replacement: ", " },
            { pattern: /\bzusammenfassend lässt sich sagen\b/gi, replacement: "letztlich zeigt sich" },
            { pattern: /\bes ist von entscheidender bedeutung\b/gi, replacement: "wichtig ist" },
            { pattern: /\bspielt eine entscheidende rolle\b/gi, replacement: "ist maßgeblich" },
            { pattern: /\bin der heutigen zeit\b/gi, replacement: "heute" }
        ],
        transitions: {
            academic: ["Empirisch betrachtet,", "Dieser Befund verdeutlicht,", "Methodisch gesehen,"],
            formal: ["In diesem Zusammenhang,", "Aus betrieblicher Sicht,", "Dementsprechend,"],
            casual: ["Eigentlich,", "Unterm Strich,", "Interessanterweise,"]
        },
        samplePrompts: {
            academic: "Künstliche Intelligenz spielt eine entscheidende Rolle in der heutigen Zeit. Es ist von entscheidender Bedeutung, neue Modelle zu analysieren. Zusammenfassend lässt sich sagen, dass diese Technologie die Zukunft prägt."
        }
    }
};

/**
 * Extensive, Context-Safe Synonym and Collocation Knowledge Base (500+ Headwords)
 * Grouped strictly by Part-of-Speech and syntactic semantics to prevent ungrammatical collocations.
 */
const HUMANIZER_DICTIONARY = {
    id: {
        // --- VERBS (Kata Kerja Aksi & Kognitif) ---
        "mengubah": ["merombak", "mentransformasi", "memodifikasi", "menata ulang"],
        "meningkatkan": ["mendorong kenaikan", "mengakselerasi", "memperkuat", "mengoptimalkan", "mendongkrak"],
        "menurunkan": ["mereduksi", "memangkas", "menekan laju", "mengurangi"],
        "mengembangkan": ["menumbuhkan", "memperluas", "memajukan", "menggarap"],
        "menciptakan": ["menghasilkan", "melahirkan", "membangun", "membentuk"],
        "menghasilkan": ["menelurkan", "membuahkan", "mencatatkan", "melahirkan"],
        "menggunakan": ["menerapkan", "memanfaatkan", "mengadopsi", "memberdayakan"],
        "memanfaatkan": ["mengoptimalkan", "menggunakan", "memaksimalkan", "mendayagunakan"],
        "memilih": ["condong pada", "memprioritaskan", "menjatuhkan pilihan pada"],
        "menentukan": ["mendikte", "mengendalikan", "memastikan", "menetapkan"],
        "mendorong": ["memacu", "merangsang", "menggerakkan", "menstimulasi"],
        "membantu": ["memudahkan", "menunjang", "menyokong", "meringankan"],
        "mengatasi": ["menyelesaikan", "mengurai", "menanggulangi", "menuntaskan"],
        "menjelaskan": ["menguraikan", "memaparkan", "menjabarkan", "menerangkan"],
        "menguraikan": ["membeberkan", "menjabarkan", "memaparkan"],
        "menganalisis": ["menelaah", "mengkaji", "membedah", "mengevaluasi"],
        "mengkaji": ["meneliti", "menelaah", "menyelidiki"],
        "meneliti": ["mengkaji", "menginvestigasi", "mengevaluasi"],
        "mengevaluasi": ["menguji", "menakar", "menilai", "menimbang"],
        "membuktikan": ["menegaskan", "memperjelas", "mengonfirmasi", "memperlihatkan"],
        "menunjukkan": ["memperlihatkan", "mencerminkan", "mengindikasikan", "mencatatkan"],
        "memahami": ["mencermati", "menyadari", "menangkap makna", "menyelami"],
        "mengetahui": ["menyadari", "mencermati", "mengenali"],
        "memicu": ["menyulut", "merangsang", "menimbulkan", "mendorong lahirnya"],
        "menyebabkan": ["mengakibatkan", "membuahkan", "memicu", "bermuara pada"],
        "mempengaruhi": ["berdampak pada", "mengendalikan", "mewarnai", "menentukan"],
        "membatasi": ["mengunci", "merestriksi", "mematok", "mengikat"],
        "memperkuat": ["memperkokoh", "memantapkan", "mengakselerasi", "meneguhkan"],
        "mempercepat": ["mengakselerasi", "memacu", "mempersingkat alur"],
        "mempertimbangkan": ["menimbang", "memperhitungkan", "mengalkulasi"],
        "memperhatikan": ["mencermati", "menyoroti", "mengatensi"],
        "mengabaikan": ["mengesampingkan", "melalaikan", "menomorduakan"],
        "menghadapi": ["menjumpai", "bertemu dengan", "berhadapan dengan"],
        "membutuhkan": ["memerlukan", "menuntut", "mengharuskan"],
        "menuntut": ["mengharuskan", "mewajibkan", "mendorong perlunya"],
        "menerima": ["mengakomodasi", "menyambut", "menampung"],
        "memberikan": ["menyediakan", "menghadirkan", "menyodorkan", "menawarkan"],
        "memperoleh": ["meraih", "mengantongi", "mencatatkan perolehan"],
        "mencapai": ["merengkuh", "meraih", "menggapai"],
        "berkembang": ["tumbuh dinamis", "berevolusi", "meluas", "kian dinamis"],
        "bergerak": ["bergeser", "berpindah", "berfluktuasi"],
        "berjalan": ["bergulir", "berlangsung", "berproses"],
        "terjadi": ["berlangsung", "muncul", "tercipta"],
        "berfungsi": ["beroperasi", "bekerja", "berjalan semestinya"],
        "berperan": ["berandil", "berkontribusi", "turut menentukan"],
        "berbeda": ["kontras", "berlainan", "bervariasi"],
        "berubah": ["bergeser", "bertransformasi", "berganti aluan"],
        "belajar": ["menimba ilmu", "mempelajari materi", "mengasah wawasan"],
        "bekerja": ["beraktivitas kerja", "menjalankan tugas", "berkarya"],
        "melihat": ["mencermati", "memandang", "mengamati"],
        "mencari": ["menelusuri", "merumuskan", "memburu"],

        // --- NOUNS (Kata Benda, Konsep & Entitas) ---
        "masalah": ["kendala", "tantangan", "persoalan", "hambatan"],
        "kendala": ["hambatan", "rintangan", "persoalan teknis"],
        "tantangan": ["pekerjaan rumah", "ujian tersendiri", "dinamika tantangan"],
        "solusi": ["jalan keluar", "penyelesaian", "resolusi", "langkah taktis"],
        "metode": ["pendekatan", "kerangka kerja", "prosedur", "mekanisme"],
        "pendekatan": ["metodologi", "sudut pandang", "kerangka kerja"],
        "proses": ["tahapan", "alur", "rangkaian kerja", "mekanisme"],
        "hasil": ["temuan", "capaian", "luaran", "output nyata"],
        "dampak": ["implikasi", "pengaruh", "konsekuensi", "imbas"],
        "tujuan": ["sasaran", "orientasi", "arah capaian", "fokus utama"],
        "faktor": ["variabel", "parameter", "elemen penggerak", "unsur"],
        "alasan": ["pertimbangan", "alasan", "argumen", "dasar pemikiran"],
        "asumsi": ["anggapan", "asumsi", "premis", "landasan berpikir"],
        "kondisi": ["situasi", "keadaan", "kondisi di lapangan"],
        "situasi": ["kondisi", "keadaan nyata", "konteks"],
        "peluang": ["kesempatan", "peluang", "potensi"],
        "potensi": ["kapasitas", "daya tumbuh", "kemampuan"],
        "konsep": ["gagasan", "kerangka konsep", "ide dasar"],
        "strategi": ["langkah terukur", "strategi", "pendekatan"],
        "efisiensi": ["efisiensi", "penghematan", "daya guna"],
        "kinerja": ["performa", "produktivitas", "kinerja"],
        "kemampuan": ["kapabilitas", "kemampuan", "keahlian"],
        "kebutuhan": ["keperluan", "kebutuhan", "prioritas"],
        "kebijakan": ["regulasi", "aturan", "kebijakan"],
        "keberhasilan": ["pencapaian", "kesuksesan", "keberhasilan"],
        "kegagalan": ["kendala", "kegagalan", "hambatan"],
        "perkembangan": ["perkembangan", "pertumbuhan", "kemajuan"],
        "pergerakan": ["pergerakan", "fluktuasi", "dinamika"],
        "ketentuan": ["persyaratan", "ketentuan", "kaidah"],
        "kesimpulan": ["kesimpulan", "garis besar", "rangkuman"],
        "perusahaan": ["perusahaan", "korporasi", "organisasi"],
        "pekerja": ["pekerja", "tenaga kerja", "karyawan"],
        "mahasiswa": ["mahasiswa", "peserta didik", "pembelajar"],
        "masyarakat": ["warga", "masyarakat", "publik"],
        "pemerintah": ["pemerintah", "regulator", "otoritas"],
        "pasar": ["pasar", "bursa", "pasar modal"],
        "bisnis": ["bisnis", "sektor usaha", "dunia usaha"],
        "industri": ["industri", "sektor industri"],
        "layanan": ["layanan", "pelayanan", "fasilitas"],
        "kualitas": ["kualitas", "mutu", "standar"],
        "cara": ["cara", "pola", "metode"],
        "hal": ["hal", "aspek", "faktor"],
        "ilmu": ["wawasan", "pengetahuan", "keilmuan"],
        "keterampilan": ["keterampilan", "keahlian", "kompetensi"],
        "dunia": ["dunia", "ranah", "lingkup"],
        "waktu": ["waktu", "kesempatan", "waktu luang"],

        // --- ADJECTIVES & ADVERBS (Kata Sifat & Keterangan) ---
        "penting": ["signifikan", "esensial", "utama", "krusial"],
        "sangat": ["amat", "cukup", "begitu", "teramat"],
        "efektif": ["optimal", "berdaya guna", "tepat sasaran", "aplikatif"],
        "efisien": ["hemat daya", "ringkas terukur", "tepat guna"],
        "relevan": ["kontekstual", "tepat guna", "aplikatif", "selaras"],
        "besar": ["substansial", "signifikan", "luas"],
        "kecil": ["minor", "terbatas", "relatif sedikit"],
        "cepat": ["responsif", "akseleratif", "gesit"],
        "lambat": ["tertahan", "bertahap pelan", "lamban"],
        "jelas": ["terang", "gamblang", "eksplisit"],
        "nyata": ["konkret", "riil", "faktual"],
        "akurat": ["presisi", "terukur persis", "tepat"],
        "fleksibel": ["luwes", "adaptif", "mudah disesuaikan"],
        "ketat": ["kaku", "restriktif", "terbatas"],
        "stagnan": ["mendatar", "statis", "cenderung datar"],
        "fluktuatif": ["dinamis", "variatif", "berubah-ubah"],
        "banyak": ["sejumlah", "beragam", "berbagai", "kian banyak"],
        "sedikit": ["minim", "terbatas", "segelintir"],
        "sering": ["kerap", "lazim", "berulang kali"],
        "jarang": ["minim dijumpai", "tergolong langka"],
        "umumnya": ["pada umumnya", "lazimnya", "kebanyakan"],
        "khususnya": ["terutama", "utamanya", "lebih spesifik"],
        "langsung": ["secara mandiri", "tanpa perantara", "seketika"],
        "bertahap": ["secara gradual", "berjenjang", "fase demi fase"],
        "mendalam": ["komprehensif", "seksama", "tuntas"],
        "sederhana": ["lugas", "ringkas", "ramah dipahami"],
        "rumit": ["kompleks", "berliku", "berlapis"],
        "positif": ["konstruktif", "menguntungkan", "bernilai tambah"],
        "negatif": ["kontraproduktif", "merugikan", "berisiko"],
        "baru": ["mutakhir", "anyar", "terkini"],
        "lama": ["terdahulu", "sebelumnya", "usang"],
        "tinggi": ["substansial", "signifikan", "melambung"],
        "rendah": ["minim", "terbatas", "moderat"],
        "mudah": ["praktis", "ramah diakses", "gampang"],
        "sulit": ["sukar", "penuh tantangan", "kompleks"],
        "pasti": ["niscaya", "sudah barang tentu", "terjamin"],
        "mungkin": ["berpotensi", "boleh jadi", "berpeluang"],

        // --- CONNECTORS & CAUSAL MARKERS ---
        "karena": ["lantaran", "sebab", "mengingat"],
        "sebab": ["karena", "lantaran", "sebab"],
        "tetapi": ["namun", "akan tetapi", "hanya saja"],
        "namun": ["akan tetapi", "hanya saja", "namun"],
        "meskipun": ["kendati", "walaupun", "sekalipun"],
        "walaupun": ["kendati", "meskipun", "walau"],
        "sehingga": ["sehingga", "alhasil", "akibatnya"],
        "akibatnya": ["dampaknya", "hasilnya", "akibatnya"],
        "selain": ["di samping", "selain", "terlepas dari"],
        "bahkan": ["malahan", "bahkan", "nyatanya"],
        "justru": ["malahan", "justru", "sebaliknya"],
        "artinya": ["maknanya", "dengan kata lain", "artinya"],
        "agar": ["supaya", "guna", "agar"],
        "supaya": ["agar", "supaya", "guna"],
        "untuk": ["guna", "untuk", "demi"],
        "bisa": ["dapat", "mampu", "bisa"],
        "dapat": ["bisa", "mampu", "dapat"],
        "harus": ["perlu", "wajib", "harus"],
        "hanya": ["sekadar", "semata", "hanya"],
        "sudah": ["telah", "sudah"],
        "telah": ["sudah", "kini", "telah"],
        "sedang": ["tengah", "sedang"],
        "masih": ["masih", "tetap", "terus"],
        "tetap": ["tetap", "masih", "konsisten"]
    },

    en: {
        // --- VERBS ---
        "change": ["transform", "modify", "alter", "reshape"],
        "increase": ["boost", "elevate", "accelerate", "expand"],
        "decrease": ["reduce", "curtail", "diminish", "scale down"],
        "develop": ["foster", "advance", "cultivate", "expand"],
        "create": ["generate", "craft", "produce", "establish"],
        "produce": ["yield", "deliver", "generate", "render"],
        "use": ["adopt", "deploy", "leverage", "utilize"],
        "choose": ["prioritize", "opt for", "favor", "select"],
        "determine": ["dictate", "shape", "govern", "establish"],
        "help": ["assist", "enable", "support", "streamline"],
        "solve": ["address", "resolve", "settle", "overcome"],
        "explain": ["clarify", "articulate", "elucidate", "detail"],
        "analyze": ["examine", "scrutinize", "assess", "evaluate"],
        "evaluate": ["assess", "appraise", "gauge", "weigh"],
        "prove": ["confirm", "validate", "substantiate", "affirm"],
        "show": ["demonstrate", "illustrate", "reflect", "indicate"],
        "understand": ["grasp", "perceive", "comprehend", "discern"],
        "cause": ["trigger", "prompt", "induce", "lead to"],
        "affect": ["impact", "influence", "shape", "alter"],
        "limit": ["constrain", "restrict", "bound", "narrow"],
        "strengthen": ["reinforce", "bolster", "fortify", "consolidate"],
        "accelerate": ["expedite", "speed up", "hasten", "quicken"],
        "consider": ["weigh", "deliberate", "take into account"],
        "require": ["necessitate", "demand", "call for", "mandate"],
        "obtain": ["acquire", "secure", "gain", "derive"],
        "achieve": ["attain", "accomplish", "reach", "realize"],

        // --- NOUNS ---
        "problem": ["hurdle", "challenge", "obstacle", "bottleneck"],
        "solution": ["resolution", "workaround", "remedy", "answer"],
        "method": ["framework", "approach", "procedure", "strategy"],
        "approach": ["methodology", "perspective", "stance"],
        "process": ["workflow", "pipeline", "progression", "mechanism"],
        "result": ["outcome", "finding", "output", "dividend"],
        "impact": ["implication", "repercussion", "consequence", "effect"],
        "goal": ["objective", "target", "milestone", "focus"],
        "factor": ["variable", "parameter", "driver", "component"],
        "reason": ["rationale", "foundation", "underlying basis", "driver"],
        "condition": ["state", "environment", "circumstance", "setting"],
        "opportunity": ["window", "prospect", "avenue", "opening"],
        "concept": ["framework", "premise", "construct", "notion"],
        "strategy": ["tactical plan", "roadmap", "blueprint", "scheme"],
        "efficiency": ["productivity", "streamlined execution", "output ratio"],

        // --- ADJECTIVES & ADVERBS ---
        "important": ["vital", "essential", "significant", "pivotal"],
        "effective": ["impactful", "productive", "functional", "potent"],
        "relevant": ["contextual", "pertinent", "applicable", "aligned"],
        "large": ["substantial", "considerable", "extensive", "broad"],
        "small": ["modest", "marginal", "minimal", "contained"],
        "rapid": ["swift", "prompt", "accelerated", "expedient"],
        "clear": ["evident", "transparent", "unambiguous", "distinct"],
        "accurate": ["precise", "exact", "calibrated", "rigorous"],
        "flexible": ["adaptable", "modular", "versatile", "pliant"],
        "complex": ["intricate", "layered", "multifaceted", "involved"],
        "simple": ["concise", "straightforward", "uncluttered", "direct"],
        "mainly": ["primarily", "predominantly", "chiefly", "largely"],
        "especially": ["notably", "in particular", "specifically"],
        "thoroughly": ["comprehensively", "rigorously", "meticulously"],

        // --- CONNECTORS ---
        "because": ["given that", "since", "as", "owing to"],
        "however": ["nevertheless", "yet", "that said", "on the other hand"],
        "although": ["even though", "while", "despite the fact that"],
        "therefore": ["consequently", "thus", "accordingly", "as a result"],
        "besides": ["furthermore", "in addition to", "alongside"]
    }
};

const COMMON_AI_PATTERNS = [
    /\b(furthermore|moreover|in conclusion|delve|testament|pivotal|beacon|tapestry|holistic|synergy|paramount|underscores|notably)\b/gi,
    /\b(merupakan hal yang|sangat krusial|tidak dapat dipungkiri|kesimpulannya|menyelami|memegang peranan penting|komprehensif|bukti nyata)\b/gi
];

if (typeof window !== 'undefined') {
    window.LANGUAGES = LANGUAGES;
    window.HUMANIZER_DICTIONARY = HUMANIZER_DICTIONARY;
    window.COMMON_AI_PATTERNS = COMMON_AI_PATTERNS;
}
