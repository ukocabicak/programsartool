/* ==========================================================================
   i18n — Türkçe / English
   Uygulama arayüz metinleri. İçerik metinleri (ölçütler, indikatörler,
   program adları, form etiketleri) kendi veri dosyalarında {tr, en} olarak
   tutulur; burada yalnızca arayüzün kendi dili bulunur.
   ========================================================================== */

window.I18N = (function () {
  "use strict";

  var STRINGS = {
    tr: {
      "app.title": "Program Öz Değerlendirme Raporu Sistemi",
      "app.subtitle": "Program Öz Değerlendirme Sistemi",

      "header.report": "Rapor",
      "header.noProgramme": "Program tanımlanmadı",
      "header.lang": "Dil",
      "header.themeLight": "Açık tema",
      "header.themeDark": "Koyu tema",
      "header.save": "Kaydet",
      "header.export": "Dışa aktar",
      "header.import": "İçe aktar",
      "header.reset": "Sıfırla",

      "save.saving": "Kaydediliyor…",
      "save.never": "Henüz kaydedilmedi",
      "save.at": "Son kayıt",

      "nav.steps": "Adımlar",
      "nav.sections": "Bölümler",
      "nav.progress": "Tamamlanma",
      "nav.next": "Sonraki adım",
      "nav.prev": "Önceki adım",
      "nav.submit": "Raporu Tamamla",

      "summary.title": "Rapor Özeti",
      "summary.programme": "Program",
      "summary.institution": "Kurum",
      "summary.level": "Düzey",
      "summary.completed": "Tamamlanan",
      "summary.evidence": "Kanıt",
      "summary.evidenceLoose": "{n} tasnif dışı",
      "summary.evidenceLooseHint":
        "Hiçbir alt ölçüte bağlanmamış kanıtlar. Koleksiyonda dururlar ama alt ölçüt adımlarına girmezler.",
      "summary.missing": "Eksik",
      "summary.compliance": "Uyum",

      "field.required": "zorunlu",
      "field.optional": "isteğe bağlı",
      "field.selectPlaceholder": "Seçiniz…",
      "field.chars": "karakter",
      "field.words": "kelime",
      "field.min": "en az",
      "field.max": "en fazla",

      "validate.required": "Bu alan zorunludur.",
      "validate.email": "Geçerli bir e-posta adresi giriniz.",
      "validate.url": "Geçerli bir adres giriniz (https:// ile başlamalı).",
      "validate.minLength": "En az {n} karakter giriniz.",
      "validate.maxLength": "En fazla {n} karakter girebilirsiniz.",
      "validate.minWords": "En az {n} kelime yazınız.",
      "validate.maxWords": "En fazla {n} kelime yazabilirsiniz.",
      "validate.pattern": "Girdiğiniz değer beklenen biçimde değil.",
      "validate.minItems": "En az {n} kayıt eklemelisiniz.",
      "validate.number": "Geçerli bir sayı giriniz.",
      "validate.year": "Geçerli bir yıl giriniz (1900–2100).",
      "validate.summary": "{n} alan düzeltilmeli",
      "validate.requireOneOf": "Dosya veya bağlantıdan en az birini sağlayınız.",
      "validate.declarationRequired": "Beyanların tamamı onaylanmalıdır.",

      "repeater.add": "Ekle",
      "repeater.remove": "Kaldır",
      "repeater.empty": "Henüz kayıt eklenmedi.",
      "repeater.item": "Kayıt",

      "programme.search": "Program ara…",
      "programme.allLevels": "Tümü",
      "programme.selected": "seçili program",
      "programme.selectAll": "Tümünü seç",
      "programme.clearAll": "Temizle",
      "programme.none": "Bu alanda eşleşen program yok.",
      "programme.levelEmpty":
        "Bu öğretim düzeyi için program listesi henüz tanımlanmamıştır.",
      "programme.areaCount": "program",
      "programme.pickOne":
        "Öz değerlendirme raporu tek bir program içindir; listeden yalnızca bir program seçiniz.",

      /* -------- Ölçüt adımı / criterion step -------- */
      "criterion.indicators": "İndikatörler",
      "criterion.indicatorsHint":
        "Alt ölçütün karşılandığını gösteren beklenen durumlar. Anlatımınızda her birine değinmeniz beklenir.",
      "criterion.expectedEvidence": "Beklenen kanıt örnekleri",
      "criterion.rubric": "YÖKAK Rubrik ilişkisi",
      "criterion.rubricHint":
        "Bu alt ölçütün YÖKAK Kurumsal Akreditasyon Programı Dereceli Değerlendirme Anahtarı'ndaki karşılıkları.",
      "criterion.optionalBadge": "Koşullu alt ölçüt",
      "criterion.narrative": "{Program:in} mevcut durumu",
      "criterion.narrativeHint":
        "Alt ölçütün gereklerini nasıl karşıladığınızı; ilgili süreç, uygulama ve sonuçlarınızı somut biçimde açıklayınız. İndikatörlerin her birine değinmeniz beklenir.",
      "criterion.selfAssessment": "Öz değerlendirme",
      "criterion.selfAssessmentHint":
        "Bu alt ölçüte ilişkin kendi uyum değerlendirmenizi seçiniz.",
      "criterion.naReason": "Uygulanamaz gerekçesi",
      "criterion.naReasonHint":
        "Alt ölçütün program için neden uygulanabilir olmadığını açıklayınız.",
      "criterion.improvement": "Gelişmeye açık yönler ve planlanan iyileştirmeler",
      "criterion.improvementHint":
        "Tam uyum sağlanmayan noktalar için planladığınız iyileştirmeleri, sorumluları ve takvimi yazınız.",
      "criterion.evidence": "Kanıtlar",
      "criterion.evidenceHint":
        "Bu alt ölçütü destekleyen kanıtları Belgeler bölümündeki koleksiyondan seçiniz veya buradan ekleyiniz; eklediğiniz kanıt koleksiyona da yazılır.",

      /* -------- Uyum özeti / compliance summary -------- */
      "compliance.title": "Uyum Özeti",
      "compliance.notAssessed": "Değerlendirilmedi",
      "compliance.rate": "Uyum oranı",
      "compliance.rateHint":
        "Uygun = 1, Kısmen Uygun = 0,5, Uygun Değil = 0 sayılarak hesaplanır. Uygulanamaz işaretlenen alt ölçütler hesaba katılmaz.",
      "compliance.byCriterion": "Ölçüt bazında",

      /* -------- Kanıt koleksiyonu / evidence library -------- */
      "evidence.accessHint":
        "Kanıta erişilebilmesi için bağlantı veya dosyadan en az biri verilmelidir; ikisi birden de eklenebilir.",
      "evidence.accessRequired": "Bağlantı veya dosyadan en az birini sağlayınız.",
      "evidence.add": "Kanıt ekle",
      "evidence.addFile": "Dosya ekle",
      "evidence.addNew": "Yeni kanıt ekle",
      "evidence.addNewNote":
        "Buradan eklediğiniz kanıt koleksiyona yazılır ve bu alt ölçüte bağlanır.",
      "evidence.cancel": "Vazgeç",
      "evidence.clearFile": "Dosyayı kaldır",
      "evidence.createAndAttach": "Ekle ve bağla",
      "evidence.deleteAll": "Kanıtı tamamen sil",
      "evidence.deleteLeadLinked":
        "Bu kanıt {code} dışında şu tasniflerde de yer alıyor: {list}. Tasniften çıkarmak yalnızca {code} bağını kaldırır; silmek kanıtı hepsinden düşürür.",
      "evidence.deleteLeadLoose":
        "Bu kanıt hiçbir alt ölçüte bağlı değil. Silmek kanıtı koleksiyondan tamamen kaldırır.",
      "evidence.deleteLeadSingle":
        "Bu kanıt yalnızca {code} tasnifinde yer alıyor. Tasniften çıkarırsanız kanıt koleksiyonda Tasnif dışı olarak kalır.",
      "evidence.deleteTitle": "Kanıtı kaldır",
      "evidence.detach": "Bağı kaldır",
      "evidence.detachOnly": "Yalnızca {code} tasnifinden çıkar",
      "evidence.edit": "Düzenle",
      "evidence.editTitle": "Kanıtı düzenle",
      "evidence.empty": "Koleksiyonda henüz kanıt yok.",
      "evidence.file": "Dosya",
      "evidence.goToSource": "Girildiği adıma git",
      "evidence.itemsSuffix": "kanıt",
      "evidence.link": "Bağlantı",
      "evidence.linkedTo": "Ayrıca şu tasniflerde",
      "evidence.name": "Kanıt adı",
      "evidence.namePlaceholder": "ör. 2026 Program Danışma Kurulu Toplantı Tutanağı",
      "evidence.nameRequired": "Kanıt adı zorunludur.",
      "evidence.newTitle": "Yeni kanıt",
      "evidence.noAccess": "Erişim yolu yok",
      "evidence.noneForSub": "Bu alt ölçüte bağlı kanıt yok.",
      "evidence.note": "Açıklama / belge referansı",
      "evidence.notePlaceholder": "ör. Karar no, sayfa aralığı, erişim tarihi",
      "evidence.other": "Tasnif dışı",
      "evidence.otherFolder": "Tasnif dışı",
      "evidence.otherGroup": "Diğer",
      "evidence.pickFromLibrary": "Koleksiyondan seç",
      "evidence.remove": "Kaldır",
      "evidence.replaceFile": "Dosyayı değiştir",
      "evidence.save": "Kaydet",
      "evidence.sourceBadge": "Form adımından",
      "evidence.sourceNote":
        "Bu klasör bir form adımının kendi belge alanından türetilmiştir; kayıt orada düzenlenir.",
      "evidence.suggestedHint":
        "Bu alt ölçüt için beklenen kanıt örnekleri. Bir öneriye tıklayarak adı doldurulmuş yeni bir kanıt açabilirsiniz.",
      "evidence.suggestedTitle": "Beklenen kanıt örnekleri",
      "evidence.tagsHint":
        "Kanıtın hangi alt ölçütleri desteklediğini işaretleyiniz. Bir kanıt birden çok alt ölçüte bağlanabilir.",
      "evidence.tagsLabel": "Bağlı alt ölçütler",
      "evidence.unnamed": "Adsız kanıt",
      "evidence.untagged": "Tasnif dışı",
      "evidence.url": "Bağlantı (URL)",

      /* -------- Beyanlar / declarations -------- */

      /* -------- Önizleme / review -------- */
      "review.empty": "—",
      "review.print": "Yazdır / PDF",
      "review.download": "JSON olarak indir",
      "review.narrative": "Mevcut durum",
      "review.improvement": "Gelişmeye açık yönler",
      "review.evidenceCount": "{n} kanıt",

      /* -------- Tamamlama / completion -------- */
      "done.title": "Öz değerlendirme raporu tamamlandı",
      "done.lead":
        "Raporunuz tamamlandı. Rapor numarasını saklayınız; raporun JSON örneğini indirerek kurumunuzun kayıtlarına ekleyebilirsiniz.",
      "done.reportNo": "Rapor numarası",
      "done.copy": "Numarayı kopyala",
      "done.copied": "Kopyalandı",
      "done.export": "Raporu indir",
      "done.exported": "Rapor indirildi",
      "done.print": "Yazdır / PDF",
      "done.close": "Kapat",
      "done.keepNote":
        "Numara bir kez üretilir ve raporla birlikte saklanır; bu ekranı yeniden açsanız da değişmez.",

      /* -------- Onay penceresi / confirm -------- */
      "confirm.confirm": "Onayla",
      "confirm.cancel": "Vazgeç",
      "confirm.resetTitle": "Raporu sıfırla",
      "confirm.resetBody":
        "Girilen tüm veriler ve kanıtlar silinecek. Bu işlem geri alınamaz. Devam etmek istiyor musunuz?",

      /* -------- Bildirimler / toasts -------- */
      "toast.saved": "Kaydedildi.",
      "toast.exported": "Rapor dışa aktarıldı.",
      "toast.exportFailed": "Rapor kaydedilemedi.",
      "toast.exportTooLarge":
        "Rapor kaydedilemeyecek kadar büyük. Büyük kanıt dosyalarını dosya yerine bağlantı olarak veriniz.",
      "toast.imported": "Rapor içe aktarıldı.",
      "toast.importError": "Dosya okunamadı. Geçerli bir rapor dosyası seçiniz.",
      "toast.reset": "Rapor sıfırlandı.",
      "toast.stepBlocked": "Devam etmeden önce bu adımdaki eksikleri tamamlayınız.",

      /* -------- Erişilebilirlik / a11y -------- */
      "a11y.tabs": "Rapor bölümleri",
      "a11y.steps": "Bölüm adımları",
      "a11y.skip": "Ana içeriğe geç",
      "a11y.remove": "Kaldır",
    },

    en: {
      "app.title": "Programme Self-Assessment Report System",
      "app.subtitle": "Programme Self-Assessment System",

      "header.report": "Report",
      "header.noProgramme": "No programme defined",
      "header.lang": "Language",
      "header.themeLight": "Light theme",
      "header.themeDark": "Dark theme",
      "header.save": "Save",
      "header.export": "Export",
      "header.import": "Import",
      "header.reset": "Reset",

      "save.saving": "Saving…",
      "save.never": "Not saved yet",
      "save.at": "Last saved",

      "nav.steps": "Steps",
      "nav.sections": "Sections",
      "nav.progress": "Completion",
      "nav.next": "Next step",
      "nav.prev": "Previous step",
      "nav.submit": "Complete Report",

      "summary.title": "Report Summary",
      "summary.programme": "Programme",
      "summary.institution": "Institution",
      "summary.level": "Level",
      "summary.completed": "Completed",
      "summary.evidence": "Evidence",
      "summary.evidenceLoose": "{n} unclassified",
      "summary.evidenceLooseHint":
        "Evidence not linked to any sub-criterion. It stays in the library but does not reach the sub-criterion steps.",
      "summary.missing": "Missing",
      "summary.compliance": "Compliance",

      "field.required": "required",
      "field.optional": "optional",
      "field.selectPlaceholder": "Select…",
      "field.chars": "characters",
      "field.words": "words",
      "field.min": "min",
      "field.max": "max",

      "validate.required": "This field is required.",
      "validate.email": "Enter a valid e-mail address.",
      "validate.url": "Enter a valid address (must start with https://).",
      "validate.minLength": "Enter at least {n} characters.",
      "validate.maxLength": "You may enter at most {n} characters.",
      "validate.minWords": "Write at least {n} words.",
      "validate.maxWords": "You may write at most {n} words.",
      "validate.pattern": "The value you entered is not in the expected format.",
      "validate.minItems": "You must add at least {n} record(s).",
      "validate.number": "Enter a valid number.",
      "validate.year": "Enter a valid year (1900–2100).",
      "validate.summary": "{n} field(s) to fix",
      "validate.requireOneOf": "Provide at least one of file or link.",
      "validate.declarationRequired": "All declarations must be confirmed.",

      "repeater.add": "Add",
      "repeater.remove": "Remove",
      "repeater.empty": "No records added yet.",
      "repeater.item": "Record",

      "programme.search": "Search programme…",
      "programme.allLevels": "All",
      "programme.selected": "programme selected",
      "programme.selectAll": "Select all",
      "programme.clearAll": "Clear",
      "programme.none": "No matching programme in this field.",
      "programme.levelEmpty":
        "The programme list for this level of study has not been defined yet.",
      "programme.areaCount": "programmes",
      "programme.pickOne":
        "A self-assessment report covers a single programme; select only one programme from the list.",

      "criterion.indicators": "Indicators",
      "criterion.indicatorsHint":
        "The expected conditions showing that the sub-criterion is met. You are expected to address each of them in your narrative.",
      "criterion.expectedEvidence": "Examples of expected evidence",
      "criterion.rubric": "YÖKAK Rubric mapping",
      "criterion.rubricHint":
        "The counterparts of this sub-criterion in the YÖKAK Institutional Accreditation Programme rubric.",
      "criterion.optionalBadge": "Conditional sub-criterion",
      "criterion.narrative": "Current state of {the programme}",
      "criterion.narrativeHint":
        "Describe concretely how you meet the requirements of the sub-criterion, referring to your processes, practices and results. You are expected to address each of the indicators.",
      "criterion.selfAssessment": "Self-assessment",
      "criterion.selfAssessmentHint":
        "Select your own compliance assessment against this sub-criterion.",
      "criterion.naReason": "Justification for not applicable",
      "criterion.naReasonHint":
        "Explain why the sub-criterion is not applicable to the programme.",
      "criterion.improvement": "Areas open to improvement and planned actions",
      "criterion.improvementHint":
        "For points where full compliance is not achieved, write the improvements you plan, the responsible parties and the timetable.",
      "criterion.evidence": "Evidence",
      "criterion.evidenceHint":
        "Select the evidence supporting this sub-criterion from the library in the Documents section, or add it here; anything you add is also written to the library.",

      "compliance.title": "Compliance Summary",
      "compliance.notAssessed": "Not assessed",
      "compliance.rate": "Compliance rate",
      "compliance.rateHint":
        "Calculated by counting Compatible = 1, Partially Compatible = 0.5, Non-Compatible = 0. Sub-criteria marked Not Applicable are excluded.",
      "compliance.byCriterion": "By criterion",

      "evidence.accessHint":
        "For the evidence to be accessible, at least one of link or file must be provided; both may be added.",
      "evidence.accessRequired": "Provide at least one of link or file.",
      "evidence.add": "Add evidence",
      "evidence.addFile": "Add file",
      "evidence.addNew": "Add new evidence",
      "evidence.addNewNote":
        "Evidence you add here is written to the library and linked to this sub-criterion.",
      "evidence.cancel": "Cancel",
      "evidence.clearFile": "Remove file",
      "evidence.createAndAttach": "Add and link",
      "evidence.deleteAll": "Delete evidence entirely",
      "evidence.deleteLeadLinked":
        "Besides {code}, this evidence also appears under: {list}. Detaching removes only the {code} link; deleting drops it from all of them.",
      "evidence.deleteLeadLoose":
        "This evidence is not linked to any sub-criterion. Deleting removes it from the library entirely.",
      "evidence.deleteLeadSingle":
        "This evidence appears only under {code}. If you detach it, the evidence stays in the library as Unclassified.",
      "evidence.deleteTitle": "Remove evidence",
      "evidence.detach": "Remove link",
      "evidence.detachOnly": "Detach from {code} only",
      "evidence.edit": "Edit",
      "evidence.editTitle": "Edit evidence",
      "evidence.empty": "No evidence in the library yet.",
      "evidence.file": "File",
      "evidence.goToSource": "Go to the step where it was entered",
      "evidence.itemsSuffix": "evidence",
      "evidence.link": "Link",
      "evidence.linkedTo": "Also under",
      "evidence.name": "Evidence name",
      "evidence.namePlaceholder": "e.g. 2026 Programme Advisory Board Meeting Minutes",
      "evidence.nameRequired": "The evidence name is required.",
      "evidence.newTitle": "New evidence",
      "evidence.noAccess": "No access path",
      "evidence.noneForSub": "No evidence linked to this sub-criterion.",
      "evidence.note": "Note / document reference",
      "evidence.notePlaceholder": "e.g. Decision no, page range, access date",
      "evidence.other": "Unclassified",
      "evidence.otherFolder": "Unclassified",
      "evidence.otherGroup": "Other",
      "evidence.pickFromLibrary": "Select from library",
      "evidence.remove": "Remove",
      "evidence.replaceFile": "Replace file",
      "evidence.save": "Save",
      "evidence.sourceBadge": "From a form step",
      "evidence.sourceNote":
        "This folder is derived from a form step's own document field; the record is edited there.",
      "evidence.suggestedHint":
        "Examples of evidence expected for this sub-criterion. Click a suggestion to open a new evidence record with the name filled in.",
      "evidence.suggestedTitle": "Examples of expected evidence",
      "evidence.tagsHint":
        "Mark which sub-criteria the evidence supports. One item of evidence may be linked to several sub-criteria.",
      "evidence.tagsLabel": "Linked sub-criteria",
      "evidence.unnamed": "Unnamed evidence",
      "evidence.untagged": "Unclassified",
      "evidence.url": "Link (URL)",


      "review.empty": "—",
      "review.print": "Print / PDF",
      "review.download": "Download as JSON",
      "review.narrative": "Current state",
      "review.improvement": "Areas open to improvement",
      "review.evidenceCount": "{n} evidence",

      "done.title": "Self-assessment report completed",
      "done.lead":
        "Your report is complete. Keep the report number; you may download the JSON copy of the report for your institution's records.",
      "done.reportNo": "Report number",
      "done.copy": "Copy number",
      "done.copied": "Copied",
      "done.export": "Download report",
      "done.exported": "Report downloaded",
      "done.print": "Print / PDF",
      "done.close": "Close",
      "done.keepNote":
        "The number is generated once and stored with the report; it does not change even if you reopen this screen.",

      "confirm.confirm": "Confirm",
      "confirm.cancel": "Cancel",
      "confirm.resetTitle": "Reset report",
      "confirm.resetBody":
        "All entered data and evidence will be deleted. This cannot be undone. Do you want to continue?",

      "toast.saved": "Saved.",
      "toast.exported": "Report exported.",
      "toast.exportFailed": "The report could not be saved.",
      "toast.exportTooLarge":
        "The report is too large to save. Provide large evidence files as links rather than uploads.",
      "toast.imported": "Report imported.",
      "toast.importError": "The file could not be read. Select a valid report file.",
      "toast.reset": "Report reset.",
      "toast.stepBlocked": "Complete the missing items in this step before continuing.",

      "a11y.tabs": "Report sections",
      "a11y.steps": "Section steps",
      "a11y.skip": "Skip to main content",
      "a11y.remove": "Remove",
    },
  };

  var current = "tr";
  var listeners = [];

  /* ==================================================================
     Program adıyla kişiselleşen metinler / programme-aware texts

     Yardım metinlerinde raporun konusu olan programdan söz edilen
     yerler, program adı girildiğinde o adla anılır:
       "Programın mevcut durumu" → "Makine Mühendisliği'nin mevcut durumu"

     Metinde {program} / {Program} imi kullanılır; Türkçe ekler adın son
     ünlüsüne göre üretilir — :in tamlayan, :e yönelme, :i belirtme,
     :de bulunma, :den ayrılma. İngilizcede {the programme} / {programme:s}.

     İm YALNIZCA raporun konusu olan programı anlatan cümlelere konur;
     ölçüt ve indikatör metinleri resmî metindir, imsizdir.
     ================================================================== */

  var TR_UNLU = "aeıioöuü";
  var TR_SERT = "pçtkfhsş";
  /* son ünlüye göre dar (ı i u ü) ve geniş (a e) ek ünlüsü */
  var DAR = { a: "ı", "ı": "ı", e: "i", i: "i", o: "u", u: "u", "ö": "ü", "ü": "ü" };
  var GENIS = { a: "a", "ı": "a", o: "a", u: "a", e: "e", i: "e", "ö": "e", "ü": "e" };

  var TR_KARSILIK = {
    "": "program", in: "programın", e: "programa", i: "programı",
    de: "programda", den: "programdan",
  };
  var EN_KARSILIK = { "": "the programme", s: "the programme's" };

  function trKucuk(s) {
    return s.replace(/I/g, "ı").replace(/İ/g, "i").toLowerCase();
  }

  function sonUnlu(s) {
    var k = trKucuk(s);
    for (var i = k.length - 1; i >= 0; i--) {
      if (TR_UNLU.indexOf(k.charAt(i)) !== -1) return k.charAt(i);
    }
    return "a"; // ünlüsüz ad — kalın sayılır
  }

  function trEk(ad, hal) {
    if (!hal) return "";
    var k = trKucuk(ad);
    var son = k.charAt(k.length - 1);
    var unluBitisi = TR_UNLU.indexOf(son) !== -1;
    var u = sonUnlu(ad);
    var d = TR_SERT.indexOf(son) !== -1 ? "t" : "d";
    if (hal === "in") return "'" + (unluBitisi ? "n" : "") + DAR[u] + "n";
    if (hal === "e") return "'" + (unluBitisi ? "y" : "") + GENIS[u];
    if (hal === "i") return "'" + (unluBitisi ? "y" : "") + DAR[u];
    if (hal === "de") return "'" + (unluBitisi ? "d" : d) + GENIS[u];
    if (hal === "den") return "'" + (unluBitisi ? "d" : d) + GENIS[u] + "n";
    return "";
  }

  /**
   * Raporun konusu olan programın adı. Önce serbest metin alanı, yoksa
   * program seçicide işaretlenen programın resmî adı kullanılır.
   */
  function programAdi() {
    var S = window.Store;
    if (!S || typeof S.get !== "function") return "";
    var v = S.get("qualification.name", "");
    if (typeof v === "string" && v.trim()) return v.trim();
    var sel = S.get("programme.selected", []);
    if (Array.isArray(sel) && sel.length === 1 && window.PROGRAM_DATA) {
      var rec = window.PROGRAM_DATA.find(sel[0]);
      if (rec && rec.name) {
        /* pick() burada çağrılamaz — kendisi bu işlevi çağırıyor. */
        var ad = rec.name[current] || rec.name.tr || rec.name.en || "";
        if (ad) return String(ad).trim();
      }
    }
    return "";
  }

  function programImleri(metin) {
    return metin.replace(
      /\{(program|Program|the programme|The programme|programme|Programme)(?::([a-z]+))?\}/g,
      function (tam, im, hal) {
        var ad = programAdi();
        var ingilizce = im.toLowerCase().indexOf("programme") !== -1;
        hal = hal || "";
        if (ad) {
          return ingilizce ? ad + (hal === "s" ? "'s" : "") : ad + trEk(ad, hal);
        }
        var karsilik = ingilizce ? EN_KARSILIK[hal] : TR_KARSILIK[hal];
        if (karsilik === undefined) return tam; // tanınmayan hâl: ime dokunma
        return im.charAt(0) === im.charAt(0).toUpperCase()
          ? karsilik.charAt(0).toLocaleUpperCase("tr") + karsilik.slice(1)
          : karsilik;
      }
    );
  }

  return {
    get lang() {
      return current;
    },

    /** Dili ayarla / set language */
    set: function (lang) {
      if (lang !== "tr" && lang !== "en") return;
      current = lang;
      document.documentElement.lang = lang;
      listeners.forEach(function (fn) {
        fn(lang);
      });
    },

    /** Dil değişimini dinle / subscribe to language change */
    onChange: function (fn) {
      listeners.push(fn);
    },

    /** Anahtar çevir / translate a key. t('validate.minLength', {n: 50}) */
    t: function (key, params) {
      var table = STRINGS[current] || STRINGS.tr;
      var s = table[key];
      if (s === undefined) s = STRINGS.tr[key] !== undefined ? STRINGS.tr[key] : key;
      if (params) {
        Object.keys(params).forEach(function (k) {
          s = s.replace(new RegExp("\\{" + k + "\\}", "g"), params[k]);
        });
      }
      return s.indexOf("{") === -1 ? s : programImleri(s);
    },

    /**
     * {tr, en} nesnesinden geçerli dildeki değeri döndürür.
     * Düz string verilirse olduğu gibi döner.
     * Metindeki {program}/{programme} imleri program adıyla değişir.
     */
    pick: function (value) {
      if (value === null || value === undefined) return "";
      var s =
        typeof value === "string"
          ? value
          : value[current] !== undefined
          ? value[current]
          : value.tr || value.en || "";
      return s.indexOf("{") === -1 ? s : programImleri(s);
    },

    /** Test ve doğrulama için: imleri tek başına çözer. */
    programme: programImleri,
  };
})();
