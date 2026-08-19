/* ==========================================================================
   Öz Değerlendirme Raporu Şeması / Self-Assessment Report schema
   --------------------------------------------------------------------------
   Yapı: sekme (tab) → adım (step) → alan (field)
   Tüm etiketler {tr, en} çiftidir. Ölçüt sekmeleri elle yazılmaz; ölçüt
   veri kümesinden (assets/data/sar-criteria.js) üretilir. Yeni bir alt
   ölçüt eklemek için veri dosyasına bir kayıt yazmak yeterlidir.
   ========================================================================== */

window.SCHEMA = (function () {
  "use strict";

  var SAR = window.SAR;

  /* ======================================================================
     1. YETERLİLİK FORMU — seçenek listeleri
     Kaynak: Türkiye Yeterlilikler Çerçevesi yeterlilik formu alanları.
     ====================================================================== */

  var ORIENTATION = [
    {
      value: "genel",
      label: { tr: "Genel", en: "General" },
      desc: {
        tr: "Belirli bir mesleğe veya akademik alana yönelmeyen genel eğitim yeterliliği.",
        en: "A general education qualification not directed at a specific profession or academic field.",
      },
    },
    {
      value: "akademik",
      label: { tr: "Akademik", en: "Academic" },
      desc: {
        tr: "Akademik bilgi ve araştırma yetkinliği kazandırmaya yönelen yeterlilik.",
        en: "A qualification directed at academic knowledge and research competence.",
      },
    },
    {
      value: "mesleki",
      label: { tr: "Mesleki", en: "Vocational" },
      desc: {
        tr: "Belirli bir meslek veya meslek grubunun icrasına yönelen yeterlilik.",
        en: "A qualification directed at practising a specific profession or occupational group.",
      },
    },
  ];

  var CATEGORY = [
    {
      value: "ana",
      label: { tr: "Ana", en: "Main" },
      desc: {
        tr: "Kendi başına tam bir yeterlilik oluşturan, bağımsız olarak verilen yeterlilik.",
        en: "A qualification that constitutes a complete qualification in itself and is awarded independently.",
      },
    },
    {
      value: "destekleyici",
      label: { tr: "Destekleyici", en: "Supplementary" },
      desc: {
        tr: "Ana yeterliliği tamamlayan, tek başına tam yeterlilik sayılmayan yeterlilik.",
        en: "A qualification complementing a main qualification, not a complete qualification on its own.",
      },
    },
    {
      value: "birim",
      label: { tr: "Birim", en: "Unit" },
      desc: {
        tr: "Bir yeterliliğin biriktirilebilir ve tanınabilir bir bileşeni.",
        en: "An accumulable and recognisable component of a qualification.",
      },
    },
    {
      value: "ozel",
      label: { tr: "Özel Amaçlı", en: "Special purpose" },
      desc: {
        tr: "Belirli ve sınırlı bir amaç için tasarlanmış yeterlilik.",
        en: "A qualification designed for a specific and limited purpose.",
      },
    },
  ];

  /* TYÇ ve AYÇ yükseköğretim düzeyleri — ikisi de 8 düzeylidir ve
     yükseköğretim 5–8 aralığında yer alır. */
  var FRAMEWORK_LEVELS = [
    { value: "5", label: { tr: "5 — Ön lisans", en: "5 — Short cycle (associate)" } },
    { value: "6", label: { tr: "6 — Lisans", en: "6 — First cycle (bachelor's)" } },
    { value: "7", label: { tr: "7 — Yüksek lisans", en: "7 — Second cycle (master's)" } },
    { value: "8", label: { tr: "8 — Doktora", en: "8 — Third cycle (doctorate)" } },
  ];

  /* ======================================================================
     2. ALT ÖLÇÜT ADIMI — ölçüt veri kümesinden üretilir
     Her alt ölçüt için: ölçüt metni + indikatörler → mevcut durum →
     öz değerlendirme → (gerekirse gerekçe / iyileştirme) → kanıtlar.
     ====================================================================== */

  /** "Alt ölçüt 3/6" — alt ölçütün ana ölçüt içindeki sırası. */
  function t18(sub, lang) {
    var i = sub.main.subs.indexOf(sub) + 1;
    var n = sub.main.subs.length;
    return lang === "tr"
      ? "Alt ölçüt " + i + "/" + n
      : "Sub-criterion " + i + "/" + n;
  }

  function subStep(sub) {
    var key = "sar." + sub.code;
    var fields = [
      { type: "sar-criterion", sub: sub.code },
      {
        type: "textarea",
        id: key + ".narrative",
        large: true,
        required: true,
        requiredUnless: { field: key + ".compliance", equals: "na" },
        showIf: { field: key + ".compliance", notEquals: "na" },
        minLength: 200,
        maxLength: 6000,
        labelKey: "criterion.narrative",
        hintKey: "criterion.narrativeHint",
      },
      {
        type: "compliance",
        id: key + ".compliance",
        sub: sub.code,
        required: true,
        labelKey: "criterion.selfAssessment",
        hintKey: "criterion.selfAssessmentHint",
      },
    ];

    /* "Uygulanamaz" yalnızca koşullu alt ölçütlerde seçilebildiğinden
       gerekçe alanı da yalnızca onlarda tanımlanır. */
    if (sub.optional) {
      fields.push({
        type: "textarea",
        id: key + ".naReason",
        required: true,
        minLength: 60,
        maxLength: 1500,
        showIf: { field: key + ".compliance", equals: "na" },
        labelKey: "criterion.naReason",
        hintKey: "criterion.naReasonHint",
      });
    }

    fields.push({
      /* İyileştirme yalnızca tam uyum sağlanmayan alt ölçütlerde istenir;
         alan her zaman görünür, zorunluluğu değerlendirmeye bağlıdır. */
      type: "textarea",
      id: key + ".improvement",
      requiredIf: { field: key + ".compliance", in: ["partial", "non"] },
      minLength: 80,
      maxLength: 3000,
      showIf: { field: key + ".compliance", notEquals: "na" },
      labelKey: "criterion.improvement",
      hintKey: "criterion.improvementHint",
    });

    fields.push({
      /* Kanıtlar merkezî koleksiyondan gelir; burada yalnızca bu alt
         ölçüte bağlanır. Bağ iki yönlüdür: Belgeler bölümünde etiketlenen
         kanıt burada da görünür. */
      type: "evidence-picker",
      id: key + ".evidenceLink",
      sub: sub.code,
      required: true,
      requiredUnless: { field: key + ".compliance", equals: "na" },
      minItems: 1,
      showIf: { field: key + ".compliance", notEquals: "na" },
      labelKey: "criterion.evidence",
      hintKey: "criterion.evidenceHint",
      suggestions: sub.suggestions,
    });

    return {
      id: "sub" + sub.code.replace(".", "_"),
      title: {
        tr: sub.code + ". " + sub.text.tr,
        en: sub.code + ". " + sub.text.en,
      },
      short: { tr: sub.code, en: sub.code },
      /* Üst başlıkta ana ölçüt adı sekmeden zaten okunuyor; burada alt
         ölçütün ölçüt içindeki sırası gösterilir. */
      eyebrow: {
        tr: t18(sub, "tr"),
        en: t18(sub, "en"),
      },
      fields: fields,
    };
  }

  /** Bir ana ölçütün sekmesi: her alt ölçüt bir adımdır. */
  function criterionTab(main) {
    return {
      id: "c" + main.code,
      label: { tr: main.code + ". " + main.title.tr, en: main.code + ". " + main.title.en },
      sublabel: {
        tr: main.subs.length + " alt ölçüt",
        en: main.subs.length + " sub-criteria",
      },
      steps: main.subs.map(subStep),
    };
  }

  /* ======================================================================
     3. BEYANLAR — Sonuç sekmesinde onaylanır
     ====================================================================== */

  var DECLARATIONS = [
    {
      value: "accurate",
      label: {
        tr: "Raporda sunulan bilgilerin doğru, güncel ve programın mevcut durumunu yansıttığını beyan ederim.",
        en: "I declare that the information presented in the report is accurate, current and reflects the actual state of the programme.",
      },
    },
    {
      value: "evidence",
      label: {
        tr: "Rapora eklenen kanıtların erişilebilir olduğunu ve ilgili alt ölçütleri gerçekten desteklediğini beyan ederim.",
        en: "I declare that the evidence attached to the report is accessible and genuinely supports the relevant sub-criteria.",
      },
    },
    {
      value: "stakeholders",
      label: {
        tr: "Öz değerlendirme sürecine öğretim elemanları, öğrenciler ve ilgili paydaşların katıldığını beyan ederim.",
        en: "I declare that teaching staff, students and relevant stakeholders participated in the self-assessment process.",
      },
    },
    {
      value: "approval",
      label: {
        tr: "Raporun kurumun yetkili akademik kurulunca görüşüldüğünü ve sunulmasının uygun bulunduğunu beyan ederim.",
        en: "I declare that the report has been considered by the institution's authorised academic board and approved for submission.",
      },
    },
    {
      value: "personalData",
      label: {
        tr: "Raporda ve kanıtlarda kişisel verilerin korunmasına ilişkin mevzuata uyulduğunu beyan ederim.",
        en: "I declare that the legislation on the protection of personal data has been complied with in the report and the evidence.",
      },
    },
    {
      value: "cooperation",
      label: {
        tr: "Dış değerlendirme sürecinde istenecek ek bilgi ve belgeleri sunmayı taahhüt ederim.",
        en: "I undertake to provide the additional information and documents that may be requested during the external evaluation process.",
      },
    },
  ];

  /* ======================================================================
     4. SEKMELER
     ====================================================================== */

  var tabs = [];

  /* ---------------------------------------------------------------- */
  /* 4.1 Program Tanımı                                               */
  /* ---------------------------------------------------------------- */
  tabs.push({
    id: "programme",
    label: { tr: "Program Tanımı", en: "Programme Definition" },
    sublabel: { tr: "Kurum · Yeterlilik formu", en: "Institution · Qualification form" },
    steps: [
      {
        id: "institution",
        title: { tr: "Kurum ve Akademik Birim", en: "Institution and Academic Unit" },
        short: { tr: "Kurum", en: "Institution" },
        intro: {
          tr: "Öz değerlendirme raporunun hangi kurum ve birimin hangi programı için hazırlandığını tanımlayınız.",
          en: "Define for which programme, of which institution and unit, this self-assessment report is prepared.",
        },
        fields: [
          {
            type: "text", id: "institution.name", required: true, half: true,
            label: { tr: "Yükseköğretim kurumu", en: "Higher education institution" },
            placeholder: { tr: "ör. Boğaziçi Üniversitesi", en: "e.g. Boğaziçi University" },
          },
          {
            type: "select", id: "institution.type", required: true, half: true,
            label: { tr: "Kurum türü", en: "Type of institution" },
            options: [
              { value: "devlet", label: { tr: "Devlet üniversitesi", en: "State university" } },
              { value: "vakif", label: { tr: "Vakıf üniversitesi", en: "Foundation university" } },
              { value: "vakif-myo", label: { tr: "Vakıf meslek yüksekokulu", en: "Foundation vocational school" } },
              { value: "kktc", label: { tr: "KKTC / yurt dışı", en: "TRNC / abroad" } },
            ],
          },
          {
            type: "text", id: "institution.faculty", required: true, half: true,
            label: { tr: "Fakülte / Yüksekokul / MYO / Enstitü", en: "Faculty / School / Vocational School / Institute" },
            placeholder: { tr: "ör. Mühendislik Fakültesi", en: "e.g. Faculty of Engineering" },
          },
          {
            type: "text", id: "institution.department", required: true, half: true,
            label: { tr: "Bölüm", en: "Department" },
            placeholder: { tr: "ör. Makine Mühendisliği Bölümü", en: "e.g. Department of Mechanical Engineering" },
          },
          {
            type: "text", id: "institution.city", half: true,
            label: { tr: "İl", en: "City" },
            placeholder: { tr: "ör. İstanbul", en: "e.g. İstanbul" },
          },
          {
            type: "url", id: "institution.web", half: true,
            label: { tr: "Program web adresi", en: "Programme web address" },
            placeholder: { tr: "https://…", en: "https://…" },
          },
          {
            type: "text", id: "report.period", required: true, half: true,
            label: { tr: "Değerlendirme dönemi", en: "Assessment period" },
            placeholder: { tr: "ör. 2025–2026", en: "e.g. 2025–2026" },
            hint: {
              tr: "Raporun kapsadığı akademik yıl veya dönem aralığı.",
              en: "The academic year or period range covered by the report.",
            },
          },
          {
            type: "date", id: "report.date", required: true, half: true,
            label: { tr: "Rapor tarihi", en: "Report date" },
          },
        ],
      },
      {
        id: "selector",
        title: { tr: "Program Seçimi", en: "Programme Selection" },
        short: { tr: "Program", en: "Programme" },
        intro: {
          tr: "Raporun konusu olan programı ISCED-F 2013 alan sınıflamasına göre seçiniz. Öz değerlendirme raporu tek bir program içindir.",
          en: "Select the programme covered by this report according to the ISCED-F 2013 field classification. A self-assessment report covers a single programme.",
        },
        fields: [
          {
            type: "programme-picker",
            id: "programme.selected",
            required: true,
            maxItems: 1,
            label: { tr: "Program", en: "Programme" },
            hint: {
              tr: "Öğretim düzeyini seçip listeden programınızı işaretleyiniz. Aynı anda yalnızca bir program seçilebilir.",
              en: "Choose the level of study and mark your programme in the list. Only one programme can be selected at a time.",
            },
          },
        ],
      },
      {
        id: "qualification",
        title: { tr: "Yeterlilik Formu — Zorunlu Alanlar", en: "Qualification Form — Mandatory Fields" },
        short: { tr: "Yeterlilik", en: "Qualification" },
        intro: {
          tr: "Türkiye Yeterlilikler Çerçevesi yeterlilik formunun zorunlu bilgi alanları. Bu bilgiler raporun program tanıtımı bölümünü oluşturur.",
          en: "The mandatory information fields of the Turkish Qualifications Framework qualification form. This information forms the programme description section of the report.",
        },
        fields: [
          {
            type: "text", id: "qualification.name", required: true, refreshesLabels: true,
            label: { tr: "Yeterlilik adı", en: "Qualification name" },
            placeholder: { tr: "ör. Makine Mühendisliği Lisans Diploması", en: "e.g. Bachelor's Degree in Mechanical Engineering" },
            hint: {
              tr: "Programın mezuna kazandırdığı yeterliliğin resmî adı. Bu ad, yardım metinlerinde programın yerine kullanılır.",
              en: "The official name of the qualification the programme awards to graduates. This name is used in place of the programme in help texts.",
            },
          },
          {
            type: "text", id: "qualification.body", required: true,
            label: { tr: "Sorumlu kurum", en: "Responsible body" },
            placeholder: { tr: "ör. Boğaziçi Üniversitesi Mühendislik Fakültesi", en: "e.g. Boğaziçi University Faculty of Engineering" },
            hint: {
              tr: "Yeterliliği veren, tanıyan ve kalitesinden sorumlu olan kurum.",
              en: "The body that awards and recognises the qualification and is responsible for its quality.",
            },
          },
          {
            type: "textarea", id: "qualification.purpose", required: true,
            minLength: 100, maxLength: 3000,
            label: { tr: "Amaç", en: "Purpose" },
            hint: {
              tr: "Yeterliliğin hangi ihtiyaca cevap verdiğini, kime hitap ettiğini ve mezunun hangi rolü üstleneceğini açıklayınız.",
              en: "Explain which need the qualification responds to, whom it addresses and which role the graduate will undertake.",
            },
          },
          {
            type: "radio", id: "qualification.orientation", required: true,
            label: { tr: "Yönelim", en: "Orientation" },
            options: ORIENTATION,
          },
          {
            type: "select", id: "qualification.tyc", required: true, half: true,
            label: { tr: "TYÇ seviyesi", en: "TQF level" },
            hint: { tr: "Türkiye Yeterlilikler Çerçevesi düzeyi.", en: "Turkish Qualifications Framework level." },
            options: FRAMEWORK_LEVELS,
          },
          {
            type: "select", id: "qualification.ayc", required: true, half: true,
            label: { tr: "AYÇ seviyesi", en: "EQF level" },
            hint: { tr: "Avrupa Yeterlilikler Çerçevesi düzeyi.", en: "European Qualifications Framework level." },
            options: FRAMEWORK_LEVELS,
          },
          {
            type: "text", id: "qualification.isco", required: true, half: true,
            label: { tr: "ISCO kodu", en: "ISCO code" },
            placeholder: { tr: "ör. 2144", en: "e.g. 2144" },
            pattern: "^[0-9]{1,4}(\\s*,\\s*[0-9]{1,4})*$",
            patternMessage: {
              tr: "ISCO kodu 1–4 haneli sayıdır; birden çok kod virgülle ayrılır.",
              en: "An ISCO code is a 1–4 digit number; separate multiple codes with commas.",
            },
            hint: {
              tr: "Uluslararası Standart Meslek Sınıflaması kodu. Mesleğe yönelmeyen yeterliliklerde ilgili genel kod yazılır.",
              en: "International Standard Classification of Occupations code. For qualifications not directed at an occupation, enter the relevant general code.",
            },
          },
          {
            type: "text", id: "qualification.isced", required: true, half: true,
            label: { tr: "ISCED (2013) kodu", en: "ISCED (2013) code" },
            placeholder: { tr: "ör. 0715", en: "e.g. 0715" },
            pattern: "^[0-9]{2,4}$",
            patternMessage: {
              tr: "ISCED-F 2013 kodu 2 haneli (geniş alan) veya 4 haneli (ayrıntılı alan) olmalıdır.",
              en: "An ISCED-F 2013 code must be 2 digits (broad field) or 4 digits (detailed field).",
            },
            hint: {
              tr: "ISCED-F 2013 ayrıntılı alan kodu. Program seçildiğinde önerilen kod alanın altında gösterilir.",
              en: "ISCED-F 2013 detailed field code. Once a programme is selected the suggested code is shown under the field.",
            },
            suggestFrom: "programme.selected",
          },
          {
            type: "radio", id: "qualification.category", required: true,
            label: { tr: "Kategori", en: "Category" },
            options: CATEGORY,
          },
          {
            type: "textarea", id: "qualification.learningOutcomes", required: true, large: true,
            minLength: 200, maxLength: 8000,
            label: { tr: "Öğrenme kazanımları", en: "Learning outcomes" },
            hint: {
              tr: "Mezunun kazanması beklenen bilgi, beceri ve yetkinlikleri ölçülebilir ifadelerle, maddeler hâlinde yazınız.",
              en: "Write the knowledge, skills and competences the graduate is expected to acquire as measurable statements, in list form.",
            },
          },
          {
            type: "textarea", id: "qualification.keyCompetences", required: true,
            minLength: 100, maxLength: 4000,
            label: { tr: "Anahtar yetkinlikler", en: "Key competences" },
            hint: {
              tr: "Yaşam boyu öğrenme anahtar yetkinliklerinden yeterliliğin kapsadıklarını (ör. dijital yetkinlik, iletişim, girişimcilik) belirtiniz.",
              en: "State which lifelong learning key competences the qualification covers (e.g. digital competence, communication, entrepreneurship).",
            },
          },
          {
            type: "textarea", id: "qualification.assessment", required: true,
            minLength: 100, maxLength: 4000,
            label: { tr: "Ölçme ve değerlendirme yöntemleri", en: "Assessment methods" },
            hint: {
              tr: "Öğrenme kazanımlarının hangi yöntemlerle ölçüldüğünü ve başarı ölçütlerini açıklayınız.",
              en: "Explain by which methods the learning outcomes are measured and the achievement criteria applied.",
            },
          },
          {
            type: "textarea", id: "qualification.entry", required: true,
            minLength: 60, maxLength: 3000,
            label: { tr: "Giriş şartları", en: "Entry requirements" },
            hint: {
              tr: "Programa kabul için aranan önkoşullar, sınav ve belge şartları.",
              en: "The prerequisites, examination and documentation requirements for admission to the programme.",
            },
          },
          {
            type: "textarea", id: "qualification.completion", required: true,
            minLength: 60, maxLength: 3000,
            label: { tr: "Başarma şartları", en: "Achievement requirements" },
            hint: {
              tr: "Yeterliliğin kazanılması için tamamlanması gereken kredi, ders, staj ve diğer yükümlülükler.",
              en: "The credits, courses, internships and other obligations that must be completed to obtain the qualification.",
            },
          },
          {
            type: "textarea", id: "qualification.progression", required: true,
            minLength: 60, maxLength: 3000,
            label: { tr: "İlerleme yolları", en: "Progression routes" },
            hint: {
              tr: "Mezunun devam edebileceği üst öğrenim düzeyleri ve mesleki ilerleme olanakları.",
              en: "The higher levels of study the graduate may proceed to and the professional progression opportunities available.",
            },
          },
          {
            type: "textarea", id: "qualification.legalBasis", required: true,
            minLength: 40, maxLength: 3000,
            label: { tr: "Yasal dayanağı", en: "Legal basis" },
            hint: {
              tr: "Yeterliliğin dayandığı kanun, yönetmelik, yönerge ve kurul kararlarını belirtiniz.",
              en: "State the laws, regulations, directives and board decisions on which the qualification is based.",
            },
          },
        ],
      },
      {
        id: "qualification-optional",
        title: { tr: "Yeterlilik Formu — Seçmeli Alanlar", en: "Qualification Form — Optional Fields" },
        short: { tr: "Seçmeli alanlar", en: "Optional fields" },
        intro: {
          tr: "Yeterlilik formunun seçmeli bilgi alanları. Boş bırakılabilir; doldurulduğunda rapor önizlemesinde yer alır.",
          en: "The optional information fields of the qualification form. They may be left blank; when filled they appear in the report preview.",
        },
        fields: [
          {
            type: "text", id: "qualification.credit", half: true,
            label: { tr: "Kredi değeri", en: "Credit value" },
            placeholder: { tr: "ör. 240 AKTS", en: "e.g. 240 ECTS" },
          },
          {
            type: "text", id: "qualification.validity", half: true,
            label: { tr: "Geçerlilik süresi (varsa)", en: "Validity period (if any)" },
            placeholder: { tr: "ör. Süresiz", en: "e.g. Unlimited" },
          },
          {
            type: "textarea", id: "qualification.learningEnvironments", maxLength: 3000,
            label: { tr: "Öğrenme ortamları", en: "Learning environments" },
            hint: {
              tr: "Yeterliliğin kazanıldığı örgün, uzaktan, işbaşı ve uygulamalı öğrenme ortamları.",
              en: "The formal, distance, work-based and practice-based learning environments in which the qualification is acquired.",
            },
          },
          {
            type: "textarea", id: "qualification.qualityAssurance", maxLength: 3000,
            label: { tr: "Kalite güvencesi", en: "Quality assurance" },
            hint: {
              tr: "Yeterliliğin kalitesini güvence altına alan iç ve dış mekanizmalar.",
              en: "The internal and external mechanisms that assure the quality of the qualification.",
            },
          },
          {
            type: "textarea", id: "qualification.other", maxLength: 3000,
            label: { tr: "Diğer bilgiler", en: "Other information" },
          },
          {
            type: "url", id: "qualification.url",
            label: { tr: "Yeterliliğe erişim için internet adresi", en: "Internet address for access to the qualification" },
            placeholder: { tr: "https://…", en: "https://…" },
          },
        ],
      },
      {
        id: "documents",
        title: { tr: "Program Belgeleri", en: "Programme Documents" },
        short: { tr: "Belgeler", en: "Documents" },
        intro: {
          tr: "Programın tanıtım ve müfredat belgeleri ile varsa önceki dış değerlendirme belgeleri. Bu belgeler alt ölçüt tasnifine girmez; Belgeler bölümündeki dizinde kendi klasörleriyle listelenir ve burada düzenlenir.",
          en: "The programme's information and curriculum documents and, if any, previous external evaluation documents. These documents are not classified by sub-criterion; they are listed in the Documents directory under their own folders and edited here.",
        },
        fields: [
          {
            type: "repeater",
            id: "programme.documents",
            required: true,
            minItems: 1,
            label: { tr: "Program tanıtım ve müfredat belgeleri", en: "Programme information and curriculum documents" },
            hint: {
              tr: "Ders bilgi paketi, müfredat, program tanıtım dosyası, öğrenci el kitabı gibi programı bütün olarak tanıtan belgeleri ekleyiniz. Her satırda dosya veya bağlantıdan en az biri bulunmalıdır.",
              en: "Add the documents that describe the programme as a whole, such as the course information package, curriculum, programme information file or student handbook. Each row must carry at least a file or a link.",
            },
            addLabel: { tr: "Belge ekle", en: "Add document" },
            itemFields: [
              {
                type: "text", id: "name", required: true,
                label: { tr: "Belge adı", en: "Document name" },
                placeholder: { tr: "ör. 2025–2026 Ders Bilgi Paketi", en: "e.g. 2025–2026 Course Information Package" },
              },
              {
                type: "text", id: "kind",
                label: { tr: "Belge türü", en: "Document type" },
                placeholder: { tr: "ör. Müfredat", en: "e.g. Curriculum" },
              },
              {
                type: "file", id: "file",
                label: { tr: "Belge dosyası", en: "Document file" },
              },
              {
                type: "url", id: "url",
                label: { tr: "Bağlantı (URL)", en: "Link (URL)" },
                placeholder: { tr: "https://…", en: "https://…" },
              },
            ],
            rowRequireOneOf: ["file", "url"],
          },
          {
            type: "radio",
            id: "programme.hasPriorReview",
            required: true,
            label: {
              tr: "Program daha önce dış değerlendirmeden geçti mi?",
              en: "Has the programme undergone external evaluation before?",
            },
            hint: {
              tr: "Kurumsal veya program düzeyinde akreditasyon, izleme ya da ara değerlendirme. Yanıt 9. ölçütteki koşullu alt ölçütü de ilgilendirir.",
              en: "Accreditation, monitoring or interim evaluation at institutional or programme level. The answer also bears on the conditional sub-criterion under criterion 9.",
            },
            options: [
              {
                value: "evet",
                label: { tr: "Evet", en: "Yes" },
                desc: {
                  tr: "Rapor, karar ve izleme belgelerini aşağıya ekleyiniz.",
                  en: "Add the report, decision and monitoring documents below.",
                },
              },
              {
                value: "hayir",
                label: { tr: "Hayır", en: "No" },
                desc: {
                  tr: "Program ilk defa dış değerlendirmeye girmektedir.",
                  en: "The programme is undergoing external evaluation for the first time.",
                },
              },
            ],
          },
          {
            type: "repeater",
            id: "programme.priorReviews",
            required: true,
            minItems: 1,
            showIf: { field: "programme.hasPriorReview", equals: "evet" },
            label: { tr: "Önceki dış değerlendirme belgeleri", en: "Previous external evaluation documents" },
            hint: {
              tr: "Dış değerlendirme raporu, akreditasyon kararı, izleme raporu ve iyileştirme eylem planlarını ekleyiniz.",
              en: "Add the external evaluation report, accreditation decision, monitoring report and improvement action plans.",
            },
            addLabel: { tr: "Belge ekle", en: "Add document" },
            itemFields: [
              {
                type: "text", id: "name", required: true,
                label: { tr: "Belge adı", en: "Document name" },
                placeholder: { tr: "ör. 2022 Program Akreditasyon Raporu", en: "e.g. 2022 Programme Accreditation Report" },
              },
              {
                type: "text", id: "agency", required: true,
                label: { tr: "Değerlendirici kuruluş", en: "Evaluating body" },
                placeholder: { tr: "ör. MÜDEK", en: "e.g. MÜDEK" },
              },
              {
                type: "number", id: "year", min: 1900, max: 2100,
                label: { tr: "Yıl", en: "Year" },
              },
              {
                type: "file", id: "file",
                label: { tr: "Belge dosyası", en: "Document file" },
              },
              {
                type: "url", id: "url",
                label: { tr: "Bağlantı (URL)", en: "Link (URL)" },
                placeholder: { tr: "https://…", en: "https://…" },
              },
            ],
            rowRequireOneOf: ["file", "url"],
          },
        ],
      },
      {
        id: "team",
        title: { tr: "Hazırlık Ekibi ve İletişim", en: "Preparation Team and Contact" },
        short: { tr: "Ekip", en: "Team" },
        intro: {
          tr: "Raporu hazırlayan ekip ve iletişim kurulacak kişi. Öz değerlendirmeye öğrenci ve dış paydaş katılımı beklenir.",
          en: "The team that prepared the report and the contact person. Student and external stakeholder participation in the self-assessment is expected.",
        },
        fields: [
          {
            type: "text", id: "contact.name", required: true, half: true,
            label: { tr: "İletişim kişisi", en: "Contact person" },
          },
          {
            type: "text", id: "contact.title", required: true, half: true,
            label: { tr: "Unvan / görev", en: "Title / role" },
            placeholder: { tr: "ör. Bölüm Başkanı", en: "e.g. Head of Department" },
          },
          {
            type: "email", id: "contact.email", required: true, half: true,
            label: { tr: "E-posta", en: "E-mail" },
          },
          {
            type: "tel", id: "contact.phone", half: true,
            label: { tr: "Telefon", en: "Telephone" },
          },
          {
            type: "repeater",
            id: "team.members",
            required: true,
            minItems: 1,
            label: { tr: "Öz değerlendirme ekibi", en: "Self-assessment team" },
            hint: {
              tr: "Raporun hazırlanmasında görev alan öğretim elemanı, öğrenci temsilcisi, idari personel ve dış paydaşları ekleyiniz.",
              en: "Add the teaching staff, student representatives, administrative staff and external stakeholders who took part in preparing the report.",
            },
            addLabel: { tr: "Üye ekle", en: "Add member" },
            itemFields: [
              {
                type: "text", id: "name", required: true,
                label: { tr: "Ad soyad", en: "Name" },
              },
              {
                type: "text", id: "role", required: true,
                label: { tr: "Görev / sıfat", en: "Role" },
                placeholder: { tr: "ör. Öğrenci temsilcisi", en: "e.g. Student representative" },
              },
              {
                type: "text", id: "unit",
                label: { tr: "Birim / kurum", en: "Unit / organisation" },
              },
            ],
          },
          {
            type: "textarea", id: "report.process", required: true,
            minLength: 200, maxLength: 5000,
            label: { tr: "Raporun hazırlanma süreci", en: "The process of preparing the report" },
            hint: {
              tr: "Öz değerlendirmenin nasıl planlandığını, kimlerin hangi aşamalarda katıldığını, verilerin nasıl toplandığını ve raporun hangi kurullarda görüşüldüğünü açıklayınız.",
              en: "Explain how the self-assessment was planned, who participated at which stages, how the data were collected and in which boards the report was discussed.",
            },
          },
        ],
      },
    ],
  });

  /* ---------------------------------------------------------------- */
  /* 4.2 Belgeler — kanıt koleksiyonu                                 */
  /* ---------------------------------------------------------------- */
  tabs.push({
    id: "evidence",
    label: { tr: "Belgeler", en: "Documents" },
    sublabel: { tr: "Kanıt koleksiyonu", en: "Evidence library" },
    steps: [
      {
        id: "library",
        title: { tr: "Kanıt Koleksiyonu", en: "Evidence Library" },
        short: { tr: "Koleksiyon", en: "Library" },
        intro: {
          tr: "Rapordaki tüm kanıtlar burada tek bir koleksiyonda tutulur. Her kanıt bir bağlantı, yüklenmiş bir dosya ya da her ikisi olabilir ve bir veya birden çok alt ölçüte etiketlenir. Alt ölçüt adımları kendi kanıt listelerini tutmaz; koleksiyondan etikete göre okurlar.",
          en: "All evidence in the report is kept here in a single library. Each item may be a link, an uploaded file or both, and is tagged to one or more sub-criteria. Sub-criterion steps do not keep their own evidence lists; they read from the library by tag.",
        },
        fields: [
          {
            type: "evidence-library",
            id: "evidence.library",
            required: true,
            minItems: 1,
            label: { tr: "Kanıtlar", en: "Evidence" },
            hint: {
              tr: "Kanıt adı ve en az bir erişim yolu (bağlantı veya dosya) zorunludur. Hiçbir alt ölçüte bağlanmayan kanıtlar Tasnif dışı klasöründe toplanır.",
              en: "An evidence name and at least one access path (link or file) are required. Evidence not linked to any sub-criterion is collected in the Unclassified folder.",
            },
          },
        ],
      },
    ],
  });

  /* ---------------------------------------------------------------- */
  /* 4.3 Ölçüt sekmeleri — veri kümesinden üretilir                   */
  /* ---------------------------------------------------------------- */
  SAR.criteria.forEach(function (main) {
    tabs.push(criterionTab(main));
  });

  /* ---------------------------------------------------------------- */
  /* 4.4 Sonuç — genel değerlendirme, beyanlar, önizleme              */
  /* ---------------------------------------------------------------- */
  tabs.push({
    id: "result",
    label: { tr: "Sonuç", en: "Conclusion" },
    sublabel: { tr: "Beyanlar · Önizleme", en: "Declarations · Preview" },
    steps: [
      {
        id: "overview",
        title: { tr: "Genel Değerlendirme", en: "Overall Assessment" },
        short: { tr: "Genel değerlendirme", en: "Overall" },
        intro: {
          tr: "Alt ölçüt bazındaki değerlendirmelerinizin bütününe bakarak programın genel durumunu özetleyiniz.",
          en: "Summarise the overall state of the programme by looking at your sub-criterion level assessments as a whole.",
        },
        fields: [
          { type: "compliance-summary", id: "result.summary" },
          {
            type: "textarea", id: "result.strengths", required: true, large: true,
            minLength: 200, maxLength: 6000,
            label: { tr: "Programın güçlü yönleri", en: "Strengths of the programme" },
            hint: {
              tr: "Uygun değerlendirilen alt ölçütlerden hareketle programın öne çıkan uygulamalarını yazınız.",
              en: "Drawing on the sub-criteria assessed as compatible, describe the programme's outstanding practices.",
            },
          },
          {
            type: "textarea", id: "result.improvements", required: true, large: true,
            minLength: 200, maxLength: 6000,
            label: { tr: "Gelişmeye açık yönler", en: "Areas open to improvement" },
            hint: {
              tr: "Kısmen uygun ve uygun değil değerlendirilen alt ölçütlerden hareketle önceliklendirilmiş gelişim alanlarını yazınız.",
              en: "Drawing on the sub-criteria assessed as partially compatible or non-compatible, describe the prioritised areas for development.",
            },
          },
          {
            type: "textarea", id: "result.actionPlan", maxLength: 6000,
            label: { tr: "Öncelikli eylem planı", en: "Priority action plan" },
            hint: {
              tr: "Gelişim alanları için planlanan eylemleri, sorumluları ve takvimi özetleyiniz.",
              en: "Summarise the planned actions, responsible parties and timetable for the areas of development.",
            },
          },
        ],
      },
      {
        id: "declarations",
        title: { tr: "Beyan ve Taahhüt", en: "Declaration and Commitment" },
        short: { tr: "Beyanlar", en: "Declarations" },
        intro: {
          tr: "Raporu sunmadan önce aşağıdaki beyanların tamamını onaylayınız.",
          en: "Confirm all of the declarations below before submitting the report.",
        },
        fields: [
          {
            type: "checkboxes",
            id: "declarations.confirmed",
            required: true,
            minItems: DECLARATIONS.length,
            label: { tr: "Beyanlar", en: "Declarations" },
            hint: {
              tr: "Raporun tamamlanabilmesi için beyanların tamamı onaylanmalıdır.",
              en: "All declarations must be confirmed before the report can be completed.",
            },
            options: DECLARATIONS,
          },
          {
            type: "text", id: "declarations.signatory", required: true, half: true,
            label: { tr: "Beyanı veren", en: "Declared by" },
            /* Yanındaki alanla aynı hizada kalsın diye ipucu yerine
               placeholder: sürekli duran ipucu satırı alanı aşağı kaydırır. */
            placeholder: { tr: "Ad soyad", en: "Full name" },
          },
          {
            type: "text", id: "declarations.signatoryTitle", required: true, half: true,
            label: { tr: "Unvan / görev", en: "Title / role" },
            placeholder: { tr: "ör. Bölüm Başkanı", en: "e.g. Head of Department" },
          },
          {
            type: "date", id: "declarations.date", required: true, half: true,
            label: { tr: "Beyan tarihi", en: "Date of declaration" },
          },
          {
            /* Kurumların çoğu beyanı ıslak imzalı olarak da saklar; alan
               isteğe bağlıdır, zorunlu tamamlanma toplamına girmez. */
            type: "file-upload",
            id: "declarations.signedPage",
            accept: ".pdf,image/*",
            label: { tr: "İmzalı beyan sayfası (varsa)", en: "Signed declaration page (if any)" },
            hint: {
              tr: "Yetkili tarafından imzalanmış beyan sayfasını PDF veya görüntü olarak ekleyebilirsiniz.",
              en: "You may attach the declaration page signed by the authorised person as a PDF or image.",
            },
          },
        ],
      },
      {
        id: "preview",
        title: { tr: "Önizleme ve Gönderim", en: "Preview and Submission" },
        short: { tr: "Önizleme", en: "Preview" },
        intro: {
          tr: "Raporun tamamını gözden geçiriniz. Eksik alan varsa ilgili adıma dönebilirsiniz.",
          en: "Review the report in full. If any field is missing you can return to the relevant step.",
        },
        review: true,
        fields: [],
      },
    ],
  });

  return {
    tabs: tabs,
    declarations: DECLARATIONS,
    orientations: ORIENTATION,
    categories: CATEGORY,
    frameworkLevels: FRAMEWORK_LEVELS,
  };
})();
