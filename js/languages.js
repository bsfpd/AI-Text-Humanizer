/**
 * Language support, dictionaries, and AI cliché detection patterns
 */

const LANGUAGES = {
    id: {
        name: "Bahasa Indonesia",
        flag: "🇮🇩",
        cliches: [
            // Argumentative & Case Study Patterns (Common in ChatGPT / AI Academic Output)
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
            { pattern: /\btidak mengikat investor pada satu faktor saja\b/gi, replacement: "memberikan fleksibilitas bagi investor agar tidak terkunci pada parameter tunggal" },
            { pattern: /\bhal ini dikarenakan\b/gi, replacement: "hal tersebut terjadi lantaran" },
            { pattern: /\bdalam hal ini,?\s*/gi, replacement: "pada konteks ini, " },
            { pattern: /\bdapat dikatakan bahwa\b/gi, replacement: "dapat dicermati bahwa" },
            { pattern: /\bperlu dicermati bahwa\b/gi, replacement: "catatan pentingnya yakni" },
            { pattern: /\bsebagai contoh,?\s*/gi, replacement: "misalkan saja, " },

            // High-Frequency AI Academic Clichés
            { pattern: /\bmerupakan hal yang sangat krusial\b/gi, replacement: "sangat menentukan" },
            { pattern: /\bsangat krusial\b/gi, replacement: "sangat penting" },
            { pattern: /\bmerupakan inovasi teknologi yang sangat krusial\b/gi, replacement: "menjadi salah satu lompatan teknologi paling berpengaruh" },
            { pattern: /\bmerupakan aspek yang sangat penting\b/gi, replacement: "berperan besar" },
            { pattern: /\bdalam era digital saat ini\b/gi, replacement: "di era serba digital ini" },
            { pattern: /\bdalam era modern (ini|sekarang)\b/gi, replacement: "di zaman sekarang" },
            { pattern: /\btidak dapat dipungkiri bahwa\b/gi, replacement: "jelas terlihat bahwa" },
            { pattern: /\btidak dapat dipungkiri\b/gi, replacement: "faktanya" },
            { pattern: /\bperlu diingat bahwa,?\s*/gi, replacement: "perlu dicatat, " },
            { pattern: /\bmenyelami lebih dalam\b/gi, replacement: "mengkaji lebih jauh" },
            { pattern: /\bmenyelami dunia\b/gi, replacement: "mempelajari ranah" },
            { pattern: /\bsebagai kesimpulan,?\s*/gi, replacement: "pada akhirnya, " },
            { pattern: /\bkesimpulannya,?\s*/gi, replacement: "singkatnya, " },
            { pattern: /\bsecara keseluruhan,?\s*/gi, replacement: "intinya, " },
            { pattern: /\boleh karena itu, sangat penting untuk\b/gi, replacement: "maka kita perlu" },
            { pattern: /\bmemegang peranan penting dalam\b/gi, replacement: "turut menentukan" },
            { pattern: /\bmemainkan peran penting dalam\b/gi, replacement: "berdampak signifikan terhadap" },
            { pattern: /\bmemainkan peran penting\b/gi, replacement: "berpengaruh besar" },
            { pattern: /\bberfungsi sebagai bukti nyata\b/gi, replacement: "menunjukkan bahwa" },
            { pattern: /\bsebuah bukti nyata dari\b/gi, replacement: "cerminan dari" },
            { pattern: /\bberbagai macam\b/gi, replacement: "beragam" },
            { pattern: /\bdapat disimpulkan bahwa\b/gi, replacement: "bisa kita lihat bahwa" },
            { pattern: /\bharmoni yang indah\b/gi, replacement: "keseimbangan yang pas" },
            { pattern: /\bmenjadi landasan utama\b/gi, replacement: "menjadi pondasi dasar" },
            { pattern: /\bdi tengah pesatnya perkembangan\b/gi, replacement: "seiring cepatnya laju" },
            { pattern: /\bdengan demikian, dapat dikatakan\b/gi, replacement: "artinya," },
            { pattern: /\bmemberikan kontribusi signifikan\b/gi, replacement: "berdampak nyata" },
            { pattern: /\bmerangkul perubahan\b/gi, replacement: "beradaptasi" },
            { pattern: /\bmerajut masa depan\b/gi, replacement: "menyiapkan masa depan" },
            { pattern: /\bmenatap masa depan\b/gi, replacement: "melihat ke depan" },
            { pattern: /\bkomprehensif dan holistik\b/gi, replacement: "menyeluruh dan terpadu" },
            { pattern: /\bhal tersebut disebabkan oleh\b/gi, replacement: "kondisi ini berakar dari" },
            { pattern: /\bdapat dipahami bahwa\b/gi, replacement: "bisa kita cermati bahwa" },
            { pattern: /\bperlu ditekankan bahwa\b/gi, replacement: "catatan pentingnya yakni" },
            { pattern: /\bmemberikan dampak positif\b/gi, replacement: "mendatangkan nilai tambah nyata" },
            { pattern: /\bmemberikan dampak negatif\b/gi, replacement: "menimbulkan konsekuensi tersendiri" },
            { pattern: /\bdalam rangka untuk\b/gi, replacement: "sebagai upaya guna" },
            { pattern: /\bsehubungan dengan hal tersebut\b/gi, replacement: "merespons hal tersebut" }
        ],
        transitions: {
            academic: [
                "Secara konseptual,",
                "Ditinjau lebih mendalam,",
                "Secara empiris,",
                "Dalam konteks ini,",
                "Dari sudut pandang teoritis,"
            ],
            formal: [
                "Terkait hal tersebut,",
                "Secara praktis,",
                "Lebih lanjut,",
                "Dalam pelaksanaannya,",
                "Sebagai tindak lanjut,"
            ],
            casual: [
                "Sebenarnya,",
                "Menariknya,",
                "Bisa dibilang,",
                "Kalau diperhatikan,",
                "Yang menarik,"
            ],
            journalistic: [
                "Di sisi lain,",
                "Kenyataannya,",
                "Fakta di lapangan menunjukkan,",
                "Catatan pentingnya,"
            ],
            creative: [
                "Perlahan tapi pasti,",
                "Di balik semua itu,",
                "Menariknya,"
            ],
            simple: [
                "Artinya,",
                "Faktanya,",
                "Selain itu,",
                "Hasilnya,"
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
            { pattern: /\bdelve into\b/gi, replacement: "explore" },
            { pattern: /\bdelving into\b/gi, replacement: "looking closely at" },
            { pattern: /\ba testament to\b/gi, replacement: "clear proof of" },
            { pattern: /\bplays a crucial role in\b/gi, replacement: "is vital for" },
            { pattern: /\bplays a pivotal role in\b/gi, replacement: "shapes" },
            { pattern: /\bin today's digital age\b/gi, replacement: "nowadays" },
            { pattern: /\bin today's fast-paced world\b/gi, replacement: "these days" },
            { pattern: /\bfoster a sense of\b/gi, replacement: "encourage" },
            { pattern: /\brich tapestry of\b/gi, replacement: "wide mix of" },
            { pattern: /\bseamlessly integrated?\b/gi, replacement: "smoothly linked" },
            { pattern: /\bit is important to remember that\b/gi, replacement: "worth noting:" },
            { pattern: /\bit is worth noting that\b/gi, replacement: "notably," },
            { pattern: /\bin conclusion,?\s*/gi, replacement: "ultimately, " },
            { pattern: /\bfurthermore,?\s*/gi, replacement: "on top of that, " },
            { pattern: /\bmoreover,?\s*/gi, replacement: "also, " },
            { pattern: /\bnot only .* but also\b/gi, replacement: "both ... and" },
            { pattern: /\bbeacon of hope\b/gi, replacement: "promising sign" },
            { pattern: /\bparamount importance\b/gi, replacement: "key priority" },
            { pattern: /\bundeniably\b/gi, replacement: "clearly" },
            { pattern: /\bcomprehensive overview\b/gi, replacement: "clear breakdown" }
        ],
        transitions: {
            academic: ["From a theoretical perspective,", "Empirically speaking,", "Upon closer examination,", "In practical terms,"],
            formal: ["In this regard,", "Operationally speaking,", "Moving forward,", "From a practical standpoint,"],
            casual: ["Honestly,", "Interestingly,", "Turns out,", "At the end of the day,"],
            journalistic: ["Reports indicate,", "Crucially,", "Behind the scenes,", "Meanwhile,"],
            creative: ["Slowly but surely,", "Beneath the surface,", "Curiously enough,"],
            simple: ["In short,", "Simply put,", "Because of this,", "Consequently,"]
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
            { pattern: /\ben conclusion,?\b/gi, replacement: "en définitive," },
            { pattern: /\bil est crucial de noter que\b/gi, replacement: "soulignons que" },
            { pattern: /\bjoue un rôle primordial\b/gi, replacement: "pèse lourdement" },
            { pattern: /\bdans le monde d'aujourd'hui\b/gi, replacement: "de nos jours" }
        ],
        transitions: {
            academic: ["D'un point de vue analytique,", "Les observations suggèrent que", "De fait,"],
            formal: ["Dans cette optique,", "Sur le plan opérationnel,", "Par conséquent,"],
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

const COMMON_AI_PATTERNS = [
    /\b(furthermore|moreover|in conclusion|delve|testament|pivotal|beacon|tapestry|holistic|synergy|paramount|underscores)\b/gi,
    /\b(merupakan hal yang|sangat krusial|tidak dapat dipungkiri|kesimpulannya|menyelami|memegang peranan penting|komprehensif)\b/gi
];

if (typeof window !== 'undefined') {
    window.LANGUAGES = LANGUAGES;
    window.COMMON_AI_PATTERNS = COMMON_AI_PATTERNS;
}
