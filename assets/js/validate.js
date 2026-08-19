/* ==========================================================================
   Validate — alan doğrulama ve tamamlanma hesabı
   Field validation and completion accounting
   ========================================================================== */

window.Validate = (function () {
  "use strict";

  var t = function (k, p) {
    return window.I18N.t(k, p);
  };

  /* ------------------------------------------------------------------
     Koşullu görünürlük / conditional visibility
     showIf: { field: "sar.1.6.compliance", equals: "na" }
     showIf: { field: "sar.1.6.compliance", in: ["partial", "non"] }
     showIf: { field: "sar.1.6.compliance", notEquals: "na" }
     ------------------------------------------------------------------ */
  function matches(c, store) {
    var v = store.get(c.field);
    if (c.equals !== undefined) return v === c.equals;
    /* notEquals seçilmemiş değeri de kapsar: equals ile birlikte
       kullanıldığında ikisinden tam olarak biri görünür, alan hiçbir
       durumda kaybolmaz. */
    if (c.notEquals !== undefined) return v !== c.notEquals;
    if (c.in !== undefined) return c.in.indexOf(v) !== -1;
    if (c.truthy !== undefined) return !!v === !!c.truthy;
    return true;
  }

  /** all: koşulların tamamı · any: en az biri · yoksa tek koşul */
  function test(c, store) {
    if (!c) return false;
    if (c.all) {
      return c.all.every(function (x) {
        return matches(x, store);
      });
    }
    if (c.any) {
      return c.any.some(function (x) {
        return matches(x, store);
      });
    }
    return matches(c, store);
  }

  function isVisible(field, store) {
    if (!field.showIf) return true;
    return test(field.showIf, store);
  }

  /**
   * Alan zorunlu mu?
   *
   * Sabit `required` yanında iki koşullu biçim vardır:
   *   requiredIf     — koşul sağlanınca zorunlu olur (ör. tam uyum yoksa
   *                    iyileştirme anlatımı istenir)
   *   requiredUnless — koşul sağlanınca zorunluluk kalkar (ör. uygulanamaz
   *                    işaretlenen alt ölçütte anlatım ve kanıt istenmez)
   *
   * Tamamlanma yüzdesi de bu işlevi kullanır; böylece bir alt ölçüt
   * "uygulanamaz" işaretlendiğinde toplam kendiliğinden küçülür.
   */
  function isRequired(field, store) {
    if (field.requiredUnless && test(field.requiredUnless, store)) return false;
    if (field.requiredIf) return test(field.requiredIf, store);
    return !!field.required;
  }

  function isEmpty(v) {
    if (v === undefined || v === null) return true;
    if (typeof v === "string") return v.trim() === "";
    if (Array.isArray(v)) return v.length === 0;
    if (typeof v === "object") return Object.keys(v).length === 0;
    return false;
  }

  /* ------------------------------------------------------------------
     Tek alan doğrulama / validate a single field
     Dönüş: null (geçerli) veya hata mesajı
     ------------------------------------------------------------------ */
  function validateField(field, store) {
    if (!isVisible(field, store)) return null;
    if (!field.id) return null;

    var v = store.get(field.id);
    var required = isRequired(field, store);

    /* --- "en az biri" kuralı ---------------------------------------
       requireOneOf: listelenen alanlardan en az biri dolu olmalıdır.
       Örn. kanıt ya dosya olarak ya da bağlantı olarak verilebilir. */
    if (field.requireOneOf) {
      var satisfied = field.requireOneOf.some(function (id) {
        return !isEmpty(store.get(id));
      });
      if (!satisfied) return t("validate.requireOneOf");
      if (isEmpty(v)) return null; // kural başka alandan karşılandı
    }

    /* --- bileşik alanlar --- */
    if (field.type === "repeater") {
      var rows = Array.isArray(v) ? v : [];
      var min = field.minItems || (required ? 1 : 0);
      if (rows.length < min) return t("validate.minItems", { n: min });
      for (var r = 0; r < rows.length; r++) {
        for (var f = 0; f < field.itemFields.length; f++) {
          var sub = field.itemFields[f];
          if (sub.required && isEmpty(rows[r][sub.id])) {
            return t("validate.required");
          }
          if (
            sub.minLength &&
            rows[r][sub.id] &&
            String(rows[r][sub.id]).trim().length < sub.minLength
          ) {
            return t("validate.minLength", { n: sub.minLength });
          }
        }
        /* Satır düzeyinde "en az biri" kuralı — ör. her doküman ya
           dosya olarak ya da bağlantı olarak verilmelidir. */
        if (field.rowRequireOneOf) {
          var row = rows[r];
          var got = field.rowRequireOneOf.some(function (id) {
            return !isEmpty(row[id]);
          });
          if (!got) return t("validate.requireOneOf");
        }
      }
      return null;
    }

    if (field.type === "programme-picker") {
      var sel = Array.isArray(v) ? v : [];
      var m = field.minItems || (required ? 1 : 0);
      if (sel.length < m) return t("validate.minItems", { n: m });
      return null;
    }

    if (field.type === "checkboxes") {
      var chosen = Array.isArray(v) ? v : [];
      var need = field.minItems || (required ? 1 : 0);
      if (chosen.length < need) {
        /* Beyanlar bütün hâlinde onaylanır; "n kayıt ekleyiniz" yerine
           kendi iletisini verir. */
        return field.minItems && field.options && field.minItems === field.options.length
          ? t("validate.declarationRequired")
          : t("validate.minItems", { n: need });
      }
      return null;
    }

    if (field.type === "file-upload") {
      if (!required) return null;
      if (!v || !v.name) return t("validate.required");
      return null;
    }

    /* Kanıt koleksiyonu — Belgeler bölümü.
       Kullanılabilir kanıt: adı olan ve bağlantı ya da dosya taşıyan. */
    if (field.type === "evidence-library") {
      if (!required) return null;
      var lib = window.Evidence.all().filter(window.Evidence.isUsable);
      var needLib = field.minItems || 1;
      if (lib.length < needLib) return t("validate.minItems", { n: needLib });
      return null;
    }

    /* Bir alt ölçüte bağlanmış kanıtlar; kaynak yine koleksiyondur. */
    if (field.type === "evidence-picker") {
      if (!required) return null;
      var attached = window.Evidence.bySub(field.sub).filter(window.Evidence.isUsable);
      var needAtt = field.minItems || 1;
      if (attached.length < needAtt) return t("validate.minItems", { n: needAtt });
      return null;
    }

    /* Uyum düzeyi seçimi; radyo düğmesiyle aynı kurala tabidir. */
    if (field.type === "compliance") {
      if (required && isEmpty(v)) return t("validate.required");
      return null;
    }

    /* Yalnızca gösterim yapan alanların doğrulaması yoktur. */
    if (field.type === "sar-criterion" || field.type === "compliance-summary") {
      return null;
    }

    /* --- basit alanlar --- */
    if (required && isEmpty(v)) return t("validate.required");
    if (isEmpty(v)) return null; // zorunlu değilse boş geçilebilir

    var s = String(v).trim();

    if (field.minLength && s.length < field.minLength) {
      return t("validate.minLength", { n: field.minLength });
    }
    if (field.maxLength && s.length > field.maxLength) {
      return t("validate.maxLength", { n: field.maxLength });
    }
    /* Kelime sınırı — uzun anlatım alanlarında karakter yerine kelime
       üzerinden sınır konur. */
    if (field.minWords || field.maxWords) {
      var wc = s ? s.split(/\s+/).length : 0;
      if (field.minWords && wc < field.minWords) {
        return t("validate.minWords", { n: field.minWords });
      }
      if (field.maxWords && wc > field.maxWords) {
        return t("validate.maxWords", { n: field.maxWords });
      }
    }
    /* Biçim kalıbı — ISCO ve ISCED kodları gibi sabit desenli alanlar için.
       Hata iletisi alanın kendi diline sahip olduğundan şemadan gelir. */
    if (field.pattern && !new RegExp(field.pattern).test(s)) {
      return field.patternMessage
        ? window.I18N.pick(field.patternMessage)
        : t("validate.pattern");
    }
    if (field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s)) {
      return t("validate.email");
    }
    if (field.type === "url" && !/^https?:\/\/[^\s.]+\.[^\s]{2,}$/.test(s)) {
      return t("validate.url");
    }
    if (field.type === "number") {
      var n = Number(s);
      if (isNaN(n)) return t("validate.number");
      if (field.min !== undefined && n < field.min) return t("validate.year");
      if (field.max !== undefined && n > field.max) return t("validate.year");
    }
    return null;
  }

  /* ------------------------------------------------------------------
     Adım / sekme doğrulama
     ------------------------------------------------------------------ */
  function validateStep(step, store) {
    var errors = {};
    step.fields.forEach(function (f) {
      var e = validateField(f, store);
      if (e) errors[f.id] = e;
    });
    return errors;
  }

  function stepErrorCount(step, store) {
    return Object.keys(validateStep(step, store)).length;
  }

  /**
   * Adım durumu:
   *  "empty"    — hiç veri girilmemiş
   *  "partial"  — kısmen dolu, hâlâ hata var
   *  "complete" — tüm zorunlu alanlar geçerli
   */
  function stepState(step, store) {
    var required = 0;
    var touched = 0;
    step.fields.forEach(function (f) {
      if (!f.id || !isVisible(f, store)) return;
      if (isRequired(f, store)) required++;
      if (!isEmpty(store.get(f.id))) touched++;
    });
    var errs = stepErrorCount(step, store);
    if (errs === 0 && required > 0) return "complete";
    if (errs === 0 && required === 0 && touched > 0) return "complete";
    if (errs === 0 && required === 0) return "complete";
    if (touched === 0) return "empty";
    return "partial";
  }

  /* ------------------------------------------------------------------
     Genel tamamlanma yüzdesi
     Zorunlu ve görünür alanların kaçının geçerli olduğunu ölçer.
     ------------------------------------------------------------------ */
  function progress(tabs, store) {
    var total = 0;
    var done = 0;
    tabs.forEach(function (tab) {
      tab.steps.forEach(function (step) {
        if (!isVisible(step, store)) return; // koşulu sağlanmayan adım toplama girmez
        step.fields.forEach(function (f) {
          if (!f.id || !isVisible(f, store) || !isRequired(f, store)) return;
          total++;
          if (!validateField(f, store)) done++;
        });
      });
    });
    return {
      total: total,
      done: done,
      percent: total === 0 ? 0 : Math.round((done / total) * 100),
      missing: total - done,
    };
  }

  function tabProgress(tab, store) {
    var total = 0;
    var done = 0;
    tab.steps.forEach(function (step) {
      if (!isVisible(step, store)) return;
      step.fields.forEach(function (f) {
        if (!f.id || !isVisible(f, store) || !isRequired(f, store)) return;
        total++;
        if (!validateField(f, store)) done++;
      });
    });
    return {
      total: total,
      done: done,
      percent: total === 0 ? 100 : Math.round((done / total) * 100),
    };
  }

  /* ------------------------------------------------------------------
     Uyum özeti / compliance accounting

     Uygun = 1, Kısmen Uygun = 0,5, Uygun Değil = 0 sayılır. "Uygulanamaz"
     işaretlenen alt ölçütler paydaya girmez — programın niteliği gereği
     istenmeyen bir gerek, karşılanmamış sayılmamalıdır.
     ------------------------------------------------------------------ */
  function compliance(store) {
    var SAR = window.SAR;
    var counts = { compatible: 0, partial: 0, non: 0, na: 0, empty: 0 };
    var score = 0;
    var scored = 0;

    SAR.subs.forEach(function (sub) {
      var v = store.get("sar." + sub.code + ".compliance", "");
      if (!v) {
        counts.empty++;
        return;
      }
      if (counts[v] === undefined) counts[v] = 0;
      counts[v]++;
      var rec = SAR.compliance(v);
      if (rec && rec.score !== null && rec.score !== undefined) {
        score += rec.score;
        scored++;
      }
    });

    return {
      counts: counts,
      total: SAR.subs.length,
      assessed: SAR.subs.length - counts.empty,
      scored: scored,
      percent: scored === 0 ? 0 : Math.round((score / scored) * 100),
    };
  }

  /** Tek bir ana ölçütün uyum dağılımı. */
  function complianceOf(main, store) {
    var SAR = window.SAR;
    var counts = { compatible: 0, partial: 0, non: 0, na: 0, empty: 0 };
    var score = 0;
    var scored = 0;
    main.subs.forEach(function (sub) {
      var v = store.get("sar." + sub.code + ".compliance", "");
      if (!v) {
        counts.empty++;
        return;
      }
      if (counts[v] === undefined) counts[v] = 0;
      counts[v]++;
      var rec = SAR.compliance(v);
      if (rec && rec.score !== null && rec.score !== undefined) {
        score += rec.score;
        scored++;
      }
    });
    return {
      counts: counts,
      total: main.subs.length,
      scored: scored,
      percent: scored === 0 ? 0 : Math.round((score / scored) * 100),
    };
  }

  return {
    isVisible: isVisible,
    isRequired: isRequired,
    isEmpty: isEmpty,
    field: validateField,
    step: validateStep,
    stepErrorCount: stepErrorCount,
    stepState: stepState,
    progress: progress,
    tabProgress: tabProgress,
    compliance: compliance,
    complianceOf: complianceOf,
  };
})();
