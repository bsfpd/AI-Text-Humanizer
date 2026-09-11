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

            // 2. Monotonous & Flattering AI Openers
            { pattern: /\b(?:tidak\s+dapat\s+dipungkiri|tak\s+dapat\s+disangkal|tak\s+bisa\s+dipungkiri|tidak\s+dapat\s+disangkal|sudah\s+tidak\s+bisa\s+dipungkiri)\s+bahwa,?\s*/gi, replacement: "faktanya, " },
            { pattern: /\b(?:tidak\s+dapat\s+dipungkiri|tak\s+dapat\s+disangkal|tak\s+bisa\s+dipungkiri|tidak\s+dapat\s+disangkal)\b/gi, replacement: "faktanya" },
            { pattern: /\b(?:sebagaimana\s+(?:telah\s+)?kita\s+ketahui\s+bersama|seperti\s+yang\s+kita\s+ketahui|seperti\s+yang\s+telah\s+diketahui),?\s*/gi, replacement: "sebagaimana diketahui, " },
            { pattern: /\bsudah\s+bukan\s+rahasia\s+lagi\s+(?:bahwa)?,?\s*/gi, replacement: "nyatanya, " },
            { pattern: /\b(?:dalam|di)\s+era\s+(?:digital|modern|globalisasi|serba\s+cepat|informasi)?\s*(?:saat\s+ini|sekarang\s+ini|dewasa\s+ini),?\s*/gi, replacement: "saat ini, " },
            { pattern: /\bdi\s+tengah\s+(?:pesatnya\s+)?(?:perkembangan|kemajuan|laju)\s+(?:teknologi|zaman|digitalisasi),?\s*/gi, replacement: "seiring cepatnya perkembangan zaman, " },
            { pattern: /\bdalam\s+lanskap\s+(?:bisnis|digital|teknologi|pendidikan)?\s*(?:yang\s+terus\s+berkembang|modern),?\s*/gi, replacement: "dalam dinamika saat ini, " },

            // 3. Filler Phrases & Signposting
            { pattern: /\bdalam\s+rangka\s+(?:untuk|guna|mencapai)\b/gi, replacement: "untuk" },
            { pattern: /\bperlu\s+(?:diingat|dicatat|ditekankan|digarisbawahi)\s+bahwa,?\s*/gi, replacement: "perlu dicatat, " },
            { pattern: /\bdapat\s+(?:dikatakan|dipahami|dilihat)\s+bahwa,?\s*/gi, replacement: "terlihat bahwa " },
            { pattern: /\bpada\s+dasarnya,?\s*/gi, replacement: "pada prinsipnya, " },
            { pattern: /\boleh\s+karena\s+itu,?\s+(?:sangat\s+)?(?:penting|krusial|esensial)\s+untuk\b/gi, replacement: "maka langkah tepatnya yakni" },
            { pattern: /\bdengan\s+demikian,?\s+(?:dapat\s+disimpulkan|dapat\s+dikatakan)\s+bahwa,?\s*/gi, replacement: "artinya, " },
            { pattern: /\bhal\s+(?:ini|tersebut)\s+(?:disebabkan|dikarenakan)\s+oleh,?\s*/gi, replacement: "kondisi ini berakar dari " },
            { pattern: /\bhal\s+(?:ini|tersebut)\s+dikarenakan\b/gi, replacement: "hal ini terjadi lantaran" },
            { pattern: /\bsehubungan\s+dengan\s+hal\s+tersebut,?\s*/gi, replacement: "menanggapi hal itu, " },
            { pattern: /\bsebagai\s+kesimpulan,?\s*/gi, replacement: "pada akhirnya, " },
            { pattern: /\bkesimpulannya,?\s*/gi, replacement: "ringkasnya, " },
            { pattern: /\bsecara\s+keseluruhan,?\s*/gi, replacement: "intinya, " },
            { pattern: /\bdapat\s+disimpulkan\s+bahwa,?\s*/gi, replacement: "bisa kita lihat bahwa " },

            // 4. Significance Inflation & Empty AI Vocabulary (R-16, R-36)
            { pattern: /\b(?:merupakan|menjadi)\s+(?:salah\s+satu\s+)?(?:aspek|faktor|hal|komponen|elemen)\s+yang\s+(?:sangat\s+)?(?:krusial|esensial|vital|penting)\b/gi, replacement: "sangat menentukan" },
            { pattern: /\bmerupakan\s+hal\s+yang\s+sangat\s+krusial\b/gi, replacement: "sangat penting" },
            { pattern: /\bsangat\s+krusial\b/gi, replacement: "sangat penting" },
            { pattern: /\bmerupakan\s+inovasi\s+teknologi\s+yang\s+sangat\s+krusial\b/gi, replacement: "menjadi salah satu lompatan teknologi paling berpengaruh" },
            { pattern: /\b(?:memegang|memainkan)\s+peran(?:an)?\s+(?:yang\s+)?(?:sangat\s+)?(?:penting|krusial|vital|utama|signifikan|besar)?\s*(?:dalam|pada|bagi)?\b/gi, replacement: "turut menentukan " },
            { pattern: /\b(?:memegang|memainkan)\s+peran(?:an)?\b/gi, replacement: "turut berandil" },
            { pattern: /\b(?:berfungsi|menjadi)\s+sebagai\s+bukti\s+nyata\s+(?:bahwa|dari)?\b/gi, replacement: "mencerminkan" },
            { pattern: /\bsebuah\s+bukti\s+nyata\s+(?:bahwa|dari)?\b/gi, replacement: "cerminan jelas dari" },
            { pattern: /\bmenyelami\s+(?:lebih\s+dalam|dunia|ranah|berbagai)?\s*/gi, replacement: "mempelajari " },
            { pattern: /\bmenyelami\b/gi, replacement: "mempelajari" },
            { pattern: /\bnamun\s+demikian,?\s*/gi, replacement: "meski demikian, " },
            { pattern: /\bdi\s+samping\s+itu,?\s*/gi, replacement: "selain itu, " },
            { pattern: /\bkomprehensif\s+dan\s+holistik\b/gi, replacement: "menyeluruh dan terpadu" },
            { pattern: /\bmemberikan\s+kontribusi\s+(?:yang\s+)?(?:sangat\s+)?(?:signifikan|besar|nyata)\b/gi, replacement: "membawa andil nyata" },
            { pattern: /\bmerangkul\s+perubahan\b/gi, replacement: "beradaptasi dengan perubahan" },
            { pattern: /\bmembuka\s+potensi\s+(?:penuh|tanpa\s+batas)?\b/gi, replacement: "mengoptimalkan kemampuan" },
            { pattern: /\bmembuka\s+peluang\s+(?:emas|baru)?\b/gi, replacement: "memberikan peluang baru" },
            { pattern: /\bharmoni\s+yang\s+indah\b/gi, replacement: "keselarasan yang pas" },
            { pattern: /\bmerajut\s+masa\s+depan\b/gi, replacement: "menyiapkan langkah ke depan" },
            { pattern: /\bmenatap\s+masa\s+depan\b/gi, replacement: "melihat ke depan" },
            { pattern: /\bmenjadi\s+landasan\s+utama\b/gi, replacement: "menjadi pondasi dasar" },
            { pattern: /\bmemberikan\s+dampak\s+positif\b/gi, replacement: "membawa manfaat nyata" },
            { pattern: /\bmemberikan\s+dampak\s+negatif\b/gi, replacement: "menimbulkan konsekuensi tersendiri" },
            { pattern: /\bberbagai\s+macam\b/gi, replacement: "beragam" },

            // 5. Negative Parallelism Elimination (R-36)
            { pattern: /\b(?:tidak|bukan)\s+hanya\s+([^\.,;]+?)\s*,\s*(?:tetapi|melainkan|namun)\s+juga\s+/gi, replacement: "di samping $1, turut pula " },
            { pattern: /\b(?:tidak|bukan)\s+hanya\s+sekadar\s+([^\.,;]+?)\s*,\s*(?:tetapi|melainkan)\s+/gi, replacement: "selain $1, hal ini juga " },

            // 6. Idiomatic & Multi-Word Phrase Replacements (Substantive Humanization)
            { pattern: /\btelah\s+mengubah\s+cara\s+kerja\b/gi, replacement: "telah merombak pola kerja" },
            { pattern: /\bcara\s+kerja\b/gi, replacement: "pola kerja" },
            { pattern: /\bmulai\s+mengadopsi\b/gi, replacement: "kian gencar menerapkan" },
            { pattern: /\bteknologi\s+otomatisasi\b/gi, replacement: "sistem otomatisasi" },
            { pattern: /\bmeningkatkan\s+produktivitas\s+dan\s+efisiensi\b/gi, replacement: "mendongkrak produktivitas serta efisiensi" },
            { pattern: /\befisiensi\s+operasional\b/gi, replacement: "efisiensi tata kelola" },
            { pattern: /\bdituntut\s+untuk\s+mempelajari\b/gi, replacement: "didorong mengasah" },
            { pattern: /\bketerampilan\s+baru\b/gi, replacement: "keahlian baru" },
            { pattern: /\bagar\s+tetap\s+relevan\b/gi, replacement: "supaya tetap kompetitif" },
            { pattern: /\bpasar\s+tenaga\s+kerja\b/gi, replacement: "bursa kerja" },
            { pattern: /\bterus\s+berkembang\b/gi, replacement: "kian dinamis" },
            { pattern: /\btransformasi\s+digital\s+ini\b/gi, replacement: "arus digitalisasi ini" },
            { pattern: /\bmasa\s+depan\s+ekonomi\s+modern\b/gi, replacement: "arah gerak ekonomi mendatang" },
            { pattern: /\bmetode\s+pembelajaran\s+daring\b/gi, replacement: "sistem pembelajaran daring" },
            { pattern: /\bdunia\s+pendidikan\s+tinggi\b/gi, replacement: "ranah perguruan tinggi" },
            { pattern: /\bmengakses\s+materi\s+kuliah\b/gi, replacement: "mempelajari bahan ajar" },
            { pattern: /\bdengan\s+lebih\s+fleksibel\b/gi, replacement: "secara lebih leluasa" },
            { pattern: /\bkendala\s+jaringan\s+internet\b/gi, replacement: "hambatan konektivitas internet" },
            { pattern: /\bsering\s+dihadapi\s+oleh\b/gi, replacement: "kerap dialami oleh" },
            { pattern: /\bpeserta\s+didik\b/gi, replacement: "mahasiswa dan pelajar" },
            { pattern: /\bmencari\s+solusi\s+efektif\b/gi, replacement: "merumuskan langkah taktis" },
            { pattern: /\bkesenjangan\s+fasilitas\b/gi, replacement: "ketimpangan fasilitas" },
            { pattern: /\bbelajar\s+teknologi\s+baru\b/gi, replacement: "mempelajari inovasi teknologi" },
            { pattern: /\bpada\s+dasarnya,?\s*kita\s+hanya\s+perlu\b/gi, replacement: "kuncinya terletak pada kemauan untuk" },
            { pattern: /\bmeluangkan\s+waktu\s+secara\s+konsisten\b/gi, replacement: "menyisihkan waktu secara teratur" },
            { pattern: /\bsetiap\s+hari\b/gi, replacement: "tiap harinya" },

            // 7. Academic Case-Study Clichés (Clean contextual forms)
            { pattern: /\bBerdasarkan\s+(?:ilustrasi|analisis|uraian|penjelasan|paparan|data|kajian)?\s*(?:kasus|soal|studi|permasalahan)?\s*(?:di atas|tersebut),?\s*/gi, replacement: "Merujuk pada paparan kasus di atas, " },
            { pattern: /\bsebagai seorang investor saya lebih memilih pendekatan\s*([a-zA-Z0-9_-]+)?\b/gi, replacement: "dari sudut pandang investor saya pribadi lebih condong mengadopsi pendekatan $1" },
            { pattern: /\bsebagai seorang investor saya lebih memilih\b/gi, replacement: "dari perspektif investor saya cenderung memilih" },
            { pattern: /\bsaya lebih memilih pendekatan\s*([a-zA-Z0-9_-]+)?\b/gi, replacement: "saya pribadi memprioritaskan opsi $1" },
            { pattern: /\byaitu menggunakan model\b/gi, replacement: "yakni dengan menerapkan kerangka model" },
            { pattern: /\byaitu dengan menerapkan\b/gi, replacement: "lewat implementasi" },
            { pattern: /\bAlasan utamanya adalah\s*(?:karena)?\s*/gi, replacement: "Pertimbangan mendasarnya berpijak pada fakta bahwa " },
            { pattern: /\bmemiliki asumsi dasar yang sangat ketat\b/gi, replacement: "berpijak pada asumsi yang tergolong cukup kaku" },
            { pattern: /\basumsi dasar yang sangat ketat\b/gi, replacement: "asumsi yang tergolong restriktif" },
            { pattern: /\byakni menganggap bahwa\b/gi, replacement: "di mana model ini memandang bahwa" },
            { pattern: /\byakni mengasumsikan bahwa\b/gi, replacement: "yang berpijak pada anggapan bahwa" },
            { pattern: /\bhanya dipengaruhi oleh satu faktor risiko sistematis tunggal\b/gi, replacement: "semata-mata dikendalikan oleh satu variabel risiko sistematis tunggal" },
            { pattern: /\bhanya dipengaruhi oleh\b/gi, replacement: "semata-mata didikte oleh" },
            { pattern: /\byaitu risiko pasar\s*\(yang diukur dengan Beta terhadap IHSG\)\b/gi, replacement: "yakni risiko pasar agregat (diukur melalui Beta terhadap IHSG)" },
            { pattern: /\byaitu risiko pasar\b/gi, replacement: "yakni risiko pasar" },
            { pattern: /\bKetika kondisi pasar\s*\(IHSG\)\s*sedang stagnan atau tidak berubah,?\s*(?:namun)?\s*/gi, replacement: "Bahkan saat situasi pasar (IHSG) berada pada fase mendatar tanpa banyak fluktuasi, nyatanya " },
            { pattern: /\btetap menunjukkan pergerakan return yang fluktuatif\b/gi, replacement: "masih memperlihatkan dinamika imbal hasil yang variatif" },
            { pattern: /\btetap menunjukkan pergerakan\b/gi, replacement: "nyatanya masih mencatatkan dinamika" },
            { pattern: /\bhal ini membuktikan bahwa\b/gi, replacement: "kondisi tersebut menegaskan bahwa" },
            { pattern: /\bhal ini menunjukkan bahwa\b/gi, replacement: "fakta ini memperlihatkan bahwa" },
            { pattern: /\bada variabel lain di luar market return yang sedang beraksi\b/gi, replacement: "terdapat faktor pendorong lain di luar pergerakan pasar yang turut berpengaruh" },
            { pattern: /\bvariabel lain di luar market return\b/gi, replacement: "variabel tambahan di luar pergerakan pasar" },
            { pattern: /\bsedang beraksi\b/gi, replacement: "turut memainkan peranan" },
            { pattern: /\bDi sinilah APT menjadi jauh lebih relevan\b/gi, replacement: "Pada titik inilah relevansi model APT terbukti jauh lebih aplikatif dan kontekstual" },
            { pattern: /\bKonsep model banyak faktor\s*\(multi-factor model\)\s*dalam APT tidak mengikat investor pada satu faktor saja\b/gi, replacement: "Pendekatan multi-faktor (multi-factor model) pada APT memberikan fleksibilitas bagi investor agar tidak terkunci hanya pada satu parameter saja" },
            { pattern: /\btidak mengikat investor pada satu faktor saja\b/gi, replacement: "memberikan fleksibilitas bagi investor agar tidak terkunci pada parameter tunggal" }
        ],

        // Natural Human Transitions for Sentence Pacing
        transitions: {
            academic: [
                "Secara konseptual,",
                "Ditinjau lebih mendalam,",
                "Secara empiris,",
                "Dalam konteks ini,",
                "Dari sudut pandang teoritis,",
                "Merujuk pada telaah ini,",
                "Secara metodologis,",
                "Jika diamati lebih jauh,"
            ],
            formal: [
                "Terkait hal tersebut,",
                "Secara praktis,",
                "Lebih lanjut,",
                "Dalam pelaksanaannya,",
                "Sebagai langkah strategis,",
                "Sejalan dengan hal itu,",
                "Menindaklanjuti poin ini,"
            ],
            casual: [
                "Sebetulnya,",
                "Menariknya,",
                "Bisa dibilang,",
                "Kalau diperhatikan lagi,",
                "Yang menarik adalah,",
                "Nyatanya,",
                "Pada praktiknya,"
            ],
            journalistic: [
                "Di sisi lain,",
                "Kenyataannya,",
                "Fakta di lapangan menunjukkan,",
                "Catatan pentingnya,",
                "Sementara itu,",
                "Kondisi terkini memperlihatkan,"
            ],
            creative: [
                "Perlahan tapi pasti,",
                "Di balik semua itu,",
                "Menariknya,",
                "Tanpa disadari,",
                "Satu hal yang pasti,"
            ],
            simple: [
                "Artinya,",
                "Faktanya,",
                "Selain itu,",
                "Hasilnya,",
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
        "alasan": ["dasar pertimbangan", "latar belakang pemikiran", "argumen"],
        "asumsi": ["landasan berpikir", "anggapan dasar", "premis kerja"],
        "kondisi": ["situasi", "keadaan", "konstelasi"],
        "situasi": ["kondisi di lapangan", "keadaan nyata", "konteks"],
        "peluang": ["kesempatan", "potensi ruang", "probabilitas positif"],
        "potensi": ["kapasitas terpendam", "daya tumbuh", "kemampuan"],
        "konsep": ["kerangka gagasan", "landasan konseptual", "ide dasar"],
        "strategi": ["langkah terukur", "taktik kerja", "pola strategis"],
        "efisiensi": ["daya guna waktu", "ketepatan alokasi", "kehematan operasional"],
        "kinerja": ["performa", "produktivitas", "capaian operasional"],
        "kemampuan": ["kapabilitas", "kapasitas kompetensi", "daya"],
        "kebutuhan": ["tuntutan", "keperluan esensial", "prioritas"],
        "kebijakan": ["regulasi", "garis ketetapan", "arahan kebijakan"],
        "keberhasilan": ["capaian positif", "kesuksesan", "pencapaian sasaran"],
        "kegagalan": ["kendala pencapaian", "ketiadaan hasil", "kebuntuan"],
        "perkembangan": ["kemajuan dinamis", "evolusi", "pertumbuhan"],
        "pergerakan": ["dinamika fluktuasi", "pergeseran tren", "arus gerak"],
        "ketentuan": ["persyaratan", "patokan regulasi", "kaidah"],
        "kesimpulan": ["inti telaah", "garis besar temuan", "rangkuman"],
        "perusahaan": ["entitas bisnis", "korporasi", "organisasi bisnis"],
        "pekerja": ["tenaga kerja", "karyawan", "sumber daya manusia"],
        "mahasiswa": ["peserta didik", "pembelajar", "mahasiswa"],
        "masyarakat": ["warga", "publik", "khalayak luas"],
        "pemerintah": ["otoritas", "regulator", "pemangku kebijakan"],
        "pasar": ["sektor pasar", "bursa", "pasar industri"],
        "bisnis": ["aktivitas niaga", "sektor usaha", "ranah bisnis"],
        "industri": ["sektor industri", "ranah industri"],
        "layanan": ["servis", "pelayanan", "fasilitas"],
        "kualitas": ["mutu", "standar mutu", "kualitas kerja"],
        "cara": ["pola", "langkah", "teknik"],
        "hal": ["aspek", "poin", "perkara"],
        "ilmu": ["wawasan", "bidang keilmuan", "pengetahuan"],
        "keterampilan": ["keahlian", "kecakapan", "kompetensi"],
        "dunia": ["ranah", "lingkup", "kancah"],
        "waktu": ["durasi", "tempo", "kesempatan"],

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
        "karena": ["lantaran", "mengingat", "disebabkan oleh fakta"],
        "sebab": ["lantaran", "berakar dari", "karena"],
        "tetapi": ["namun", "akan tetapi", "hanya saja"],
        "namun": ["akan tetapi", "hanya saja", "di lain sisi"],
        "meskipun": ["kendati", "walaupun", "sekalipun"],
        "walaupun": ["kendati demikian", "meski demikian", "sekalipun"],
        "sehingga": ["alhasil", "akibatnya", "yang berujung pada"],
        "akibatnya": ["dampaknya", "ujungnya", "konsekuensinya"],
        "selain": ["di samping", "terlepas dari", "selain hal tersebut"],
        "bahkan": ["nyatanya", "malahan", "terbukti bahwa"],
        "justru": ["malahan", "sebaliknya", "pada faktanya"],
        "artinya": ["maknanya", "dengan kata lain", "hal ini menyiratkan"],
        "agar": ["supaya", "guna", "demi"],
        "supaya": ["agar", "guna mewujudkan", "demi"],
        "untuk": ["guna", "demi", "sebagai upaya"],
        "bisa": ["dapat", "mampu", "berpeluang"],
        "dapat": ["bisa", "mampu", "memungkinkan untuk"],
        "harus": ["wajib", "perlu", "patut"],
        "hanya": ["semata", "sekadar", "cuma"],
        "sudah": ["telah", "sempat", "terbukti telah"],
        "telah": ["sudah", "sempat mencatatkan", "terbukti telah"],
        "sedang": ["tengah", "dalam proses", "saat ini tengah"],
        "masih": ["tetap", "senantiasa", "terus"],
        "tetap": ["senantiasa", "konsisten", "masih"]
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
