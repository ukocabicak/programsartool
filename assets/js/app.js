/* ==========================================================================
   App — sekme/adım gezinmesi, ilerleme, önizleme, kalıcılık
   Navigation, progress, review, persistence
   ========================================================================== */

(function () {
  "use strict";

  var S = window.Store;
  var V = window.Validate;
  var F = window.Fields;
  var el = F.el;
  var icon = F.icon;
  var pick = function (v) {
    return window.I18N.pick(v);
  };
  var t = function (k, p) {
    return window.I18N.t(k, p);
  };

  var tabs = window.SCHEMA.tabs;
  var state = { tab: 0, step: 0 };

  /* ==================================================================
     Başlangıç / bootstrap
     ================================================================== */
  function init() {
    S.load();

    var prefs = S.getPrefs();

    // Dil: kayıtlı tercih → Türkçe (varsayılan)
    window.I18N.set(prefs.lang === "en" ? "en" : "tr");

    /* Tema: kayıtlı tercih → sayfayı saran ortamın kökte duran tercihi →
       sistem tercihi. Ortadaki adım, uygulama bir belge iskeletini
       dışarıdan alan yere gömüldüğünde (tek dosyalık gövde paketi)
       çevresindeki temaya uymasını sağlar; kullanıcının kendi seçimi
       yine de her ikisini de geçer. */
    var stamped = document.documentElement.getAttribute("data-theme");
    var theme =
      prefs.theme ||
      (stamped === "dark" || stamped === "light" ? stamped : null) ||
      (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light");
    document.documentElement.setAttribute("data-theme", theme);

    // Kaldığı yerden devam / resume where the author left off
    if (prefs.position && typeof prefs.position.tab === "number") {
      state.tab = Math.min(prefs.position.tab, tabs.length - 1);
      state.step = Math.min(prefs.position.step || 0, tabs[state.tab].steps.length - 1);
    }

    F.onDirty(function (field, tazele) {
      // Bir alan başka alanların görünürlüğünü (showIf) denetliyorsa —
      // ör. uyum düzeyi seçimi gerekçe ve kanıt alanlarını açıp kapar —
      // adımı yeniden çiz.
      if (controlsVisibility(field)) return render();
      // Metinlerde {program} imiyle geçen alan (yeterlilik adı) değiştiğinde
      // adımın yazıları da değişir; odağı ve kaydırma konumunu bozmadan tazele.
      if (tazele) return odakKorunarakCiz();
      clearSatisfiedErrors();
      refreshChrome();
    });

    buildHeader();
    render();
    bindKeys();

    S.onChange(function () {
      updateSaveState();
    });
  }

  /* ==================================================================
     Üst bar / header
     ================================================================== */
  function buildHeader() {
    // Sabit başlık metinlerini de dile uydur
    document.getElementById("brand-sub").textContent = t("app.subtitle");
    var skip = document.querySelector(".skip-link");
    if (skip) skip.textContent = t("a11y.skip");
    document.getElementById("ctx-institution").textContent = institutionLabel();
    document.getElementById("ctx-programme").textContent = programmeLabel();
    document.title = "YÖKAK · " + t("app.title");

    var host = document.getElementById("header-actions");
    host.innerHTML = "";

    // Kayıt durumu
    var save = el("div", { class: "save-state", id: "save-state" }, [
      el("span", { class: "save-state__dot" }),
      el("span", { id: "save-state-text" }),
    ]);
    host.appendChild(save);

    // Dil değiştirici
    var langBox = el("div", { class: "segmented", role: "group", "aria-label": t("header.lang") });
    ["tr", "en"].forEach(function (code) {
      var b = el("button", {
        type: "button",
        class: "segmented__btn",
        "aria-pressed": window.I18N.lang === code ? "true" : "false",
        text: code.toUpperCase(),
      });
      b.addEventListener("click", function () {
        window.I18N.set(code);
        S.setPref("lang", code);
        buildHeader();
        render();
      });
      langBox.appendChild(b);
    });
    host.appendChild(langBox);

    // Tema
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    var themeBtn = el("button", {
      type: "button",
      class: "btn btn--ghost btn--icon",
      title: isDark ? t("header.themeLight") : t("header.themeDark"),
      "aria-label": isDark ? t("header.themeLight") : t("header.themeDark"),
    }, [icon(isDark ? "sun" : "moon", "btn__icon")]);
    themeBtn.addEventListener("click", function () {
      var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      S.setPref("theme", next);
      buildHeader();
    });
    host.appendChild(themeBtn);

    // Dışa aktar
    var exportBtn = el("button", { type: "button", class: "btn btn--secondary btn--sm", title: t("header.export") }, [
      icon("download", "btn__icon"),
      el("span", { class: "btn-label", text: t("header.export") }),
    ]);
    exportBtn.addEventListener("click", function () {
      afterDownload(S.download(), "toast.exported");
    });
    host.appendChild(exportBtn);

    // İçe aktar
    var fileInput = el("input", { type: "file", accept: ".json,application/json", class: "sr-only", id: "import-file" });
    fileInput.addEventListener("change", function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          S.importJSON(String(reader.result));
          toast(t("toast.imported"), "success");
          render();
        } catch (e) {
          toast(t("toast.importError"), "danger");
        }
      };
      reader.readAsText(file);
      fileInput.value = "";
    });
    var importBtn = el("button", { type: "button", class: "btn btn--secondary btn--sm", title: t("header.import") }, [
      icon("upload", "btn__icon"),
      el("span", { class: "btn-label", text: t("header.import") }),
    ]);
    importBtn.addEventListener("click", function () {
      fileInput.click();
    });
    host.appendChild(importBtn);
    host.appendChild(fileInput);

    // Sıfırla
    var resetBtn = el("button", { type: "button", class: "btn btn--ghost btn--icon", title: t("header.reset"), "aria-label": t("header.reset") }, [
      icon("reset", "btn__icon"),
    ]);
    resetBtn.addEventListener("click", confirmReset);
    host.appendChild(resetBtn);

    updateSaveState();
  }

  /**
   * Dışa aktarmanın sonucunu bildirir. Kullanıcının vazgeçmesi hata
   * değildir, sessizce geçilir; kaydetme yapılamadıysa nedeni söylenir.
   */
  function afterDownload(promise, okKey) {
    return promise.then(
      function () {
        toast(t(okKey), "success");
      },
      function (err) {
        if (err && err.code === "declined") return;
        toast(t(err && err.code === "too_large" ? "toast.exportTooLarge" : "toast.exportFailed"), "danger");
      }
    );
  }

  /** Üst bardaki bağlam: raporun konusu olan kurum. */
  function institutionLabel() {
    var name = S.get("institution.name", "");
    return name && String(name).trim() ? String(name).trim() : t("header.noInstitution");
  }

  /** Üst bardaki bağlam: raporun konusu olan program. */
  function programmeLabel() {
    var name = S.get("qualification.name", "");
    if (name && String(name).trim()) return String(name).trim();
    var sel = S.get("programme.selected", []);
    if (Array.isArray(sel) && sel.length === 1) {
      var rec = window.PROGRAM_DATA.find(sel[0]);
      if (rec) return pick(rec.name);
    }
    return t("header.noProgramme");
  }

  function updateSaveState() {
    var text = document.getElementById("save-state-text");
    if (!text) return;
    /* Store kaydı geciktirdiği sürece kökte data-saving durur; kullanıcı
       yazarken göstergenin "son kayıt" demesi yanıltıcı olurdu. */
    if (document.documentElement.hasAttribute("data-saving")) {
      text.textContent = t("save.saving");
      return;
    }
    var d = S.lastSaved();
    text.textContent = d
      ? t("save.at") + " " + d.toLocaleTimeString(window.I18N.lang === "tr" ? "tr-TR" : "en-GB", { hour: "2-digit", minute: "2-digit" })
      : t("save.never");
  }

  /** Kenar çubuğundaki ağaçta kullanıcının açık bıraktığı sekmeler
   *  (tab.id → boolean). Belirtilmeyen sekmeler varsayılan olarak yalnızca
   *  etkinken açılır. */
  var treeOpen = {};

  /* ==================================================================
     Kenar çubuğu / sidebar (adımlar + özet)
     ================================================================== */
  function buildSidebar() {
    var host = document.getElementById("sidebar");
    host.innerHTML = "";

    /* -- bölüm ağacı -- */
    /* Tabbar'daki tüm sekmeler burada bir ağaç olarak tekrarlanır: her
       sekme bir dal, altındaki adımlar yapraklardır. Böylece kullanıcı
       sekme çubuğuna gitmeden raporun tamamında gezinebilir. */
    var treeSection = el("section", { class: "sidebar-section" }, [
      el("h2", { class: "sidebar-section__title", text: t("nav.sections") }),
    ]);
    var tree = el("nav", { class: "tree", "aria-label": t("a11y.tabs") });

    tabs.forEach(function (grp, ti) {
      var prog = V.tabProgress(grp, S);
      var complete = prog.total > 0 && prog.done === prog.total;

      var badge = el("span", { class: "tab__index" });
      if (complete) badge.appendChild(icon("check"));
      else badge.textContent = String(ti + 1);

      var summary = el(
        "summary",
        { class: "tree-group__head" + (complete ? " tab--complete" : ""), title: pick(grp.label) },
        [icon("chevronRight", "tree-group__chevron"), badge, el("span", { class: "tree-group__label", text: pick(grp.short || grp.label) })]
      );

      var stepper = el("nav", { class: "stepper tree-group__steps", "aria-label": pick(grp.label) + " · " + t("nav.steps") });
      var shown = 0;
      grp.steps.forEach(function (step, i) {
        if (!V.isVisible(step, S)) return; // koşulu sağlanmayan adım listelenmez
        shown++;
        var st = V.stepState(step, S);
        var errs = V.stepErrorCount(step, S);
        var cls = "step-item";
        if (st === "complete") cls += " step-item--complete";
        else if (st === "partial") cls += " step-item--error";

        var marker = el("span", { class: "step-item__marker" });
        if (st === "complete") marker.appendChild(icon("check"));
        else marker.textContent = String(shown);

        var item = el("button", {
          type: "button",
          class: cls,
          "aria-current": ti === state.tab && i === state.step ? "step" : null,
        }, [
          marker,
          el("span", { class: "step-item__body" }, [
            el("span", { class: "step-item__title", text: pick(step.short || step.title) }),
            errs > 0 && st !== "empty"
              ? el("span", { class: "step-item__meta", text: t("validate.summary", { n: errs }) })
              : null,
          ]),
        ]);
        item.addEventListener("click", function () {
          go(ti, i);
        });
        stepper.appendChild(item);
      });

      /* Etkin sekme her zaman açık görünür; öteki sekmelerde kullanıcının
         daha önce bıraktığı açık/kapalı tercih korunur. */
      var manual = treeOpen[grp.id];
      var open = manual === undefined ? ti === state.tab : manual;

      var details = el(
        "details",
        { class: "tree-group" + (ti === state.tab ? " tree-group--active" : ""), open: open },
        [summary, stepper]
      );
      /* "toggle" olayı yerine tıklama dinlenir: bazı tarayıcılarda başlangıçta
         açık kurulan bir <details>, hiç tıklanmadan bir kere "toggle" olayı
         yayar; bu, dalı kullanıcı hiç dokunmamışken kalıcı olarak açık
         işaretlerdi. Tıklama anında durum henüz tersine dönmemiştir. */
      summary.addEventListener("click", function () {
        treeOpen[grp.id] = !details.open;
      });

      tree.appendChild(details);
    });

    treeSection.appendChild(tree);
    host.appendChild(treeSection);

    /* -- genel ilerleme -- */
    var p = V.progress(tabs, S);
    var summary = el("section", { class: "sidebar-section" }, [
      el("h2", { class: "sidebar-section__title", text: t("summary.title") }),
      el("div", { class: "sidebar-summary glass" }, [
        el("div", { class: "progress" }, [
          el("div", { class: "progress__meta" }, [
            el("span", { text: t("nav.progress") }),
            el("strong", { class: "count-roll", text: p.percent + "%" }),
          ]),
          el("div", {
            class: "progress__track",
            role: "progressbar",
            "aria-valuenow": String(p.percent),
            "aria-valuemin": "0",
            "aria-valuemax": "100",
            "aria-label": t("nav.progress"),
          }, [el("div", { class: "progress__fill", style: "width:" + p.percent + "%" })]),
        ]),
        row(t("summary.programme"), programmeLabel()),
        row(t("summary.institution"), S.get("institution.name") || "—"),
        row(t("summary.level"), levelLabel()),
        complianceRow(),
        evidenceRow(),
        row(t("summary.completed"), p.done + " / " + p.total),
        row(t("summary.missing"), String(p.missing)),
      ]),
    ]);
    host.appendChild(summary);
  }

  function row(label, value) {
    return el("div", { class: "sidebar-summary__row" }, [
      el("span", { class: "sidebar-summary__label", text: label }),
      el("span", { class: "sidebar-summary__value", text: value || "—" }),
    ]);
  }

  /**
   * Koleksiyondaki kanıt sayısı. Yalnızca erişilebilir kanıtlar sayılır —
   * bir alt ölçüt adımının tamamlanmış sayılması için de aynı ölçüt
   * geçerlidir. Hiçbir alt ölçüte bağlanmamış kanıtlar sayıya girer ama
   * alt ölçüt adımlarına ulaşmadıkları için ayrıca belirtilir.
   */
  function evidenceRow() {
    var EV = window.Evidence;
    // Dizinde listelenen her şey sayılır: koleksiyon + form adımlarının
    // kendi belge alanlarından türeyen kanıtlar.
    var usable = EV.all().filter(EV.isUsable).concat(EV.externals());
    var loose = usable.filter(function (it) {
      return !(it.tags || []).some(function (c) {
        return c !== EV.OTHER;
      });
    }).length;

    var r = row(t("summary.evidence"), String(usable.length));
    if (loose) {
      r.querySelector(".sidebar-summary__value").appendChild(
        el("span", {
          class: "sidebar-summary__note",
          text: t("summary.evidenceLoose", { n: loose }),
          title: t("summary.evidenceLooseHint"),
        })
      );
    }
    return r;
  }

  /** Seçilen programın öğretim düzeyi; yoksa TYÇ seviyesinden okunur. */
  function levelLabel() {
    var sel = S.get("programme.selected", []);
    if (Array.isArray(sel) && sel.length === 1) {
      var rec = window.PROGRAM_DATA.find(sel[0]);
      if (rec) return pick(window.PROGRAM_DATA.levelName(window.PROGRAM_DATA.levelOf(rec)));
    }
    var tyc = S.get("qualification.tyc", "");
    if (!tyc) return "—";
    var opt = window.SCHEMA.frameworkLevels.filter(function (o) {
      return o.value === tyc;
    })[0];
    return opt ? pick(opt.label) : tyc;
  }

  /**
   * 57 alt ölçütün uyum oranı ve kaçının değerlendirildiği. Oran, uyum
   * ölçeğinin puanlarından hesaplanır; "Uygulanamaz" işaretlenenler paya
   * da paydaya da girmez.
   */
  function complianceRow() {
    var c = V.compliance(S);
    var r = row(t("summary.compliance"), c.scored ? c.percent + "%" : "—");
    r.querySelector(".sidebar-summary__value").appendChild(
      el("span", {
        class: "sidebar-summary__note",
        text: c.assessed + " / " + c.total,
        title: t("compliance.rateHint"),
      })
    );
    return r;
  }

  /* ==================================================================
     Adım görünümü / step view
     ================================================================== */
  /**
   * Adımı çizer. secenekler.kaydirma === false verilirse sayfa başa
   * sarılmaz — yerinde tazeleme için.
   */
  function render(secenekler) {
    var tab = tabs[state.tab];
    var step = tab.steps[state.step];
    var main = document.getElementById("stepview");

    main.innerHTML = "";
    var view = el("div", { class: "step-view" });

    /* Başlık */
    var head = el("header", { class: "step-head" });
    var eyebrow = step.eyebrow || tab.intro;
    head.appendChild(
      el("p", { class: "step-head__eyebrow" }, [
        el("span", { text: pick(tab.label) }),
        el("span", { text: "·" }),
        el("span", { text: eyebrow ? pick(eyebrow) : t("nav.steps") + " " + (visibleStepIndexes(tab).indexOf(state.step) + 1) + "/" + visibleStepIndexes(tab).length }),
      ])
    );
    head.appendChild(el("h1", { class: "step-head__title", text: pick(step.title) }));
    if (step.desc) head.appendChild(el("p", { class: "step-head__desc", text: pick(step.desc) }));
    view.appendChild(head);

    /* Adımın giriş açıklaması */
    if (step.intro) {
      view.appendChild(
        el("div", { class: "alert alert--info", style: "margin-bottom:var(--space-8)" }, [
          icon("info", "alert__icon"),
          el("div", { text: pick(step.intro) }),
        ])
      );
    }

    /* Alanlar */
    if (step.review) {
      view.appendChild(renderReview());
    } else {
      var grid = el("div", { class: "field-grid stagger" });
      step.fields.forEach(function (f) {
        var node = F.render(f);
        if (node) grid.appendChild(node);
      });
      view.appendChild(grid);
    }

    /* Gezinme */
    view.appendChild(buildActions());
    main.appendChild(view);

    refreshChrome();
    persistPosition();
    if (!secenekler || secenekler.kaydirma !== false) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  /**
   * Odağı ve kaydırma konumunu koruyarak yeniden çizer.
   * change olayı, tıklanan ya da sekmeyle geçilen yeni alan odağı almadan
   * önce gelir; bu yüzden çizimi bir sonraki döngüye bırakıp o an odakta
   * olan alanı çizimden sonra geri buluyoruz.
   */
  function odakKorunarakCiz() {
    setTimeout(function () {
      var etkin = document.activeElement;
      var kutu = etkin && etkin.closest ? etkin.closest("[data-field]") : null;
      var kimlik = kutu ? kutu.getAttribute("data-field") : null;
      render({ kaydirma: false });
      if (!kimlik) return;
      var sec = '[data-field="' + kimlik + '"] ';
      var yeni = document.querySelector(sec + "input, " + sec + "textarea, " + sec + "select");
      if (yeni) yeni.focus();
    }, 0);
  }

  function refreshChrome() {
    var ctxInstitution = document.getElementById("ctx-institution");
    if (ctxInstitution) ctxInstitution.textContent = institutionLabel();
    var ctxProgramme = document.getElementById("ctx-programme");
    if (ctxProgramme) ctxProgramme.textContent = programmeLabel();
    buildSidebar();
  }

  /**
   * Görünen hataları tazele — artık geçerli olanları gizle.
   * Bir alanın doldurulması başka bir alanın hatasını giderebilir
   * (ör. requireOneOf: dosya ya da bağlantı). Yeni hata göstermez;
   * hata eklemek adım geçişine ve alandan çıkışa bırakılır.
   */
  function clearSatisfiedErrors() {
    var step = tabs[state.tab].steps[state.step];
    step.fields.forEach(function (f) {
      if (!f.id) return;
      var node = document.getElementById("err_" + F.safeId(f.id));
      if (!node || node.hidden) return;
      if (!V.field(f, S)) F.showError(f.id, null);
    });
  }

  /* Bu alanın değeri başka alanların görünürlüğünü denetliyor mu? */
  var CONTROLLERS = (function () {
    var set = {};
    function note(cond) {
      if (!cond) return;
      if (cond.all) return cond.all.forEach(note);
      if (cond.any) return cond.any.forEach(note);
      if (cond.field) set[cond.field] = true;
    }
    tabs.forEach(function (tab) {
      tab.steps.forEach(function (step) {
        note(step.showIf);
        step.fields.forEach(function (f) {
          note(f.showIf);
          note(f.requiredIf);
          note(f.requiredUnless);
        });
      });
    });
    return set;
  })();

  function controlsVisibility(field) {
    if (!field || !field.id || !CONTROLLERS[field.id]) return false;
    // Yalnızca ayrık seçim alanlarında yeniden çiz — metin girerken
    // yeniden çizim odağı bozar.
    return ["radio", "select", "checkboxes", "compliance"].indexOf(field.type) !== -1;
  }

  function buildActions() {
    var box = el("div", { class: "step-actions" });
    var vis = visibleStepIndexes(tabs[state.tab]);
    var isFirst = state.tab === 0 && state.step === (vis.length ? vis[0] : 0);
    var isLast = state.tab === tabs.length - 1 && state.step === (vis.length ? vis[vis.length - 1] : 0);

    if (!isFirst) {
      var prev = el("button", { type: "button", class: "btn btn--secondary" }, [
        icon("arrowLeft", "btn__icon"),
        document.createTextNode(t("nav.prev")),
      ]);
      prev.addEventListener("click", goPrev);
      box.appendChild(prev);
    }

    box.appendChild(el("div", { class: "step-actions__spacer" }));

    var saveBtn = el("button", { type: "button", class: "btn btn--ghost" }, [
      icon("save", "btn__icon"),
      document.createTextNode(t("header.save")),
    ]);
    saveBtn.addEventListener("click", function () {
      S.save();
      toast(t("toast.saved"), "success");
    });
    box.appendChild(saveBtn);

    if (!isLast) {
      var next = el("button", { type: "button", class: "btn btn--primary" }, [
        document.createTextNode(t("nav.next")),
        icon("arrowRight", "btn__icon"),
      ]);
      next.addEventListener("click", goNext);
      box.appendChild(next);
    } else {
      var submit = el("button", { type: "button", class: "btn btn--accent btn--lg" }, [
        icon("send", "btn__icon"),
        document.createTextNode(t("nav.submit")),
      ]);
      submit.addEventListener("click", submitReport);
      box.appendChild(submit);
    }

    return box;
  }

  /* ==================================================================
     Önizleme / review
     ================================================================== */
  function renderReview() {
    var host = el("div", {});

    var p = V.progress(tabs, S);
    host.appendChild(
      el("div", { class: "alert alert--" + (p.missing === 0 ? "success" : "warning"), style: "margin-bottom:var(--space-6)" }, [
        icon(p.missing === 0 ? "check" : "info", "alert__icon"),
        el("div", {}, [
          el("div", { class: "alert__title", text: t("nav.progress") + ": " + p.percent + "%" }),
          el("div", { text: p.missing === 0 ? t("toast.saved") : t("validate.summary", { n: p.missing }) }),
        ]),
      ])
    );

    /* Uyum özeti önizlemenin başında durur: raporun tamamına bakan okur
       önce dağılımı görür. */
    host.appendChild(F.render({ type: "compliance-summary", id: "review.summary" }));

    /* Önizleme adımının kendisi ve beyan adımı geri okunacak içerik
       değildir; beyanlar imzalanır, önizleme zaten buradadır. */
    var ATLANAN_ADIM = { preview: true, declarations: true };

    tabs.forEach(function (tab) {
      /* Ölçüt sekmeleri kendi biçiminde çizilir: her alt ölçüt için
         ölçüt metni, uyum düzeyi rozeti, anlatım ve kanıt sayısı. */
      if (tab.id.charAt(0) === "c" && /^c\d+$/.test(tab.id)) {
        host.appendChild(reviewCriterion(tab));
        return;
      }

      var group = el("section", { class: "review-group" });
      group.appendChild(
        el("h2", { class: "review-group__title" }, [
          el("span", { text: pick(tab.label) }),
          tab.sublabel ? el("span", { class: "badge badge--neutral", text: pick(tab.sublabel) }) : null,
        ])
      );

      var list = el("div", { class: "review-list" });
      tab.steps.forEach(function (step) {
        if (ATLANAN_ADIM[step.id]) return;
        if (!V.isVisible(step, S)) return; // koşulu sağlanmayan adım önizlemeye girmez
        step.fields.forEach(function (f) {
          if (!f.id || f.type === "sar-criterion" || f.type === "compliance-summary") return;
          if (!V.isVisible(f, S)) return;
          var value = formatValue(f);
          var empty = value === "";
          list.appendChild(
            el("div", { class: "review-row" }, [
              el("span", { class: "review-row__label", text: reviewLabel(f) }),
              el("span", {
                class: "review-row__value" + (empty ? " review-row__value--empty" : ""),
                text: empty ? t("review.empty") : value,
              }),
            ])
          );
        });
      });
      if (!list.childNodes.length) return; // gösterilecek alanı kalmayan sekme
      group.appendChild(list);
      host.appendChild(group);
    });

    var actions = el("div", { class: "step-actions no-print" });
    var dl = el("button", { type: "button", class: "btn btn--secondary" }, [
      icon("download", "btn__icon"),
      document.createTextNode(t("review.download")),
    ]);
    dl.addEventListener("click", function () {
      afterDownload(S.download(), "toast.exported");
    });
    var pr = el("button", { type: "button", class: "btn btn--secondary" }, [
      icon("print", "btn__icon"),
      document.createTextNode(t("review.print")),
    ]);
    pr.addEventListener("click", function () {
      window.print();
    });
    actions.appendChild(dl);
    actions.appendChild(pr);
    host.appendChild(actions);

    return host;
  }

  /** Önizlemede alan başlığı; şema anahtar verdiyse sözlükten okunur. */
  function reviewLabel(field) {
    if (field.labelKey) return t(field.labelKey);
    return pick(field.label || { tr: field.id, en: field.id });
  }

  /**
   * Bir ana ölçütün önizlemesi. Alt ölçütler ölçüt metni, uyum rozeti,
   * anlatım, iyileştirme ve kanıt sayısıyla art arda listelenir; rapor
   * yazdırıldığında okunabilir bir bölüm oluşturur.
   */
  function reviewCriterion(tab) {
    var main = window.SAR.byMainCode(tab.id.slice(1));
    var group = el("section", { class: "review-group" });
    var st = V.complianceOf(main, S);

    group.appendChild(
      el("h2", { class: "review-group__title" }, [
        el("span", { text: pick(tab.label) }),
        el("span", {
          class: "badge badge--neutral",
          text: st.scored ? st.percent + "%" : t("compliance.notAssessed"),
        }),
      ])
    );

    main.subs.forEach(function (sub) {
      var key = "sar." + sub.code;
      var value = S.get(key + ".compliance", "");
      var rec = window.SAR.compliance(value);
      var evidence = window.Evidence.bySub(sub.code).filter(window.Evidence.isUsable);

      var head = el("div", { class: "review-sub__head" }, [
        el("span", { class: "review-sub__code", text: sub.code }),
        el("span", { class: "review-sub__text", text: pick(sub.text) }),
        el("span", {
          class: "compliance-badge compliance-badge--" + (rec ? rec.tone : "empty"),
          text: rec ? pick(rec.label) : t("compliance.notAssessed"),
        }),
      ]);

      var body = el("div", { class: "review-sub__body" });

      function block(labelText, text) {
        if (!text) return;
        body.appendChild(
          el("div", { class: "review-sub__block" }, [
            el("span", { class: "review-sub__block-label", text: labelText }),
            el("p", { class: "review-sub__block-text", text: text }),
          ])
        );
      }

      if (value === "na") {
        block(t("criterion.naReason"), S.get(key + ".naReason", ""));
      } else {
        block(t("review.narrative"), S.get(key + ".narrative", ""));
        block(t("review.improvement"), S.get(key + ".improvement", ""));
        if (evidence.length) {
          body.appendChild(
            el("div", { class: "review-sub__block" }, [
              el("span", {
                class: "review-sub__block-label",
                text: t("review.evidenceCount", { n: evidence.length }),
              }),
              el("p", {
                class: "review-sub__block-text",
                text: evidence
                  .map(function (it) {
                    return it.name;
                  })
                  .join(" · "),
              }),
            ])
          );
        }
      }

      group.appendChild(el("article", { class: "review-sub" }, [head, body]));
    });

    return group;
  }

  function formatValue(field) {
    var v = S.get(field.id);

    /* Kanıt alanları değerlerini kendi kimliklerinde değil merkezî
       koleksiyonda tutar; boşluk kontrolünden önce ele alınmalıdır. */
    if (field.type === "evidence-library") {
      return window.Evidence.all()
        .filter(window.Evidence.isUsable)
        .map(function (it) {
          var tags = (it.tags || []).filter(function (c) {
            return c !== window.Evidence.OTHER;
          });
          return it.name + (tags.length ? " [" + tags.sort().join(", ") + "]" : "");
        })
        .join(" · ");
    }

    if (field.type === "evidence-picker") {
      return window.Evidence.bySub(field.sub)
        .map(function (it) {
          return it.name || t("evidence.unnamed");
        })
        .join(" · ");
    }

    if (V.isEmpty(v)) return "";

    if (field.type === "programme-picker") {
      var PD = window.PROGRAM_DATA;
      return (v || [])
        .map(function (c) {
          var p = PD.find(c);
          // Öğretim düzeyi özet listesinde de ayırt edilebilmelidir.
          return p ? pick(p.name) + " (" + pick(PD.levelName(PD.levelOf(p))) + ")" : c;
        })
        .join(" · ");
    }
    if (field.type === "repeater") {
      return (v || [])
        .map(function (row, i) {
          return (
            i + 1 + ". " +
            field.itemFields
              .map(function (sf) {
                if (!row[sf.id]) return null;
                var shown = row[sf.id];
                // Yüklenen dosya bir nesnedir; özette adıyla anılır
                if (sf.type === "file") {
                  return pick(sf.label) + ": " + (shown.name || "");
                }
                // Seçim alanlarında ham değer yerine etiketi göster
                if (sf.options) {
                  var opt = sf.options.filter(function (o) {
                    return o.value === row[sf.id];
                  })[0];
                  if (opt) shown = pick(opt.label);
                }
                return pick(sf.label) + ": " + shown;
              })
              .filter(Boolean)
              .join(" | ")
          );
        })
        .join("\n");
    }
    if (field.type === "checkboxes") {
      return (v || [])
        .map(function (val) {
          var o = (field.options || []).filter(function (x) {
            return x.value === val;
          })[0];
          return o ? pick(o.label) : val;
        })
        .join("\n");
    }
    if (field.type === "radio" || field.type === "select") {
      var opt = (field.options || []).filter(function (o) {
        return o.value === v;
      })[0];
      return opt ? pick(opt.label) : String(v);
    }
    if (field.type === "compliance") {
      var rec = window.SAR.compliance(v);
      return rec ? pick(rec.label) : String(v);
    }
    if (typeof v === "object") return JSON.stringify(v);
    return String(v);
  }

  /* ==================================================================
     Gezinme / navigation
     ================================================================== */
  /**
   * Bir sekmedeki görünür adımların indeksleri.
   * Adımlar showIf ile koşullu olabilir (ör. yalnızca yetkilendirme
   * başvurularında görünen Mali Beyanlar). state.step tam diziye göre
   * indekslenmeye devam eder; yalnızca gezinme görünürleri izler.
   */
  function visibleStepIndexes(tab) {
    var out = [];
    tab.steps.forEach(function (step, i) {
      if (V.isVisible(step, S)) out.push(i);
    });
    return out;
  }

  function go(tabIndex, stepIndex) {
    state.tab = Math.max(0, Math.min(tabIndex, tabs.length - 1));
    var vis = visibleStepIndexes(tabs[state.tab]);
    var want = Math.max(0, Math.min(stepIndex, tabs[state.tab].steps.length - 1));
    if (vis.length && vis.indexOf(want) === -1) {
      // Gizli adım hedeflendiyse sonraki görünüre, yoksa son görünüre kay.
      var after = vis.filter(function (i) {
        return i > want;
      });
      want = after.length ? after[0] : vis[vis.length - 1];
    }
    state.step = want;
    // Gidilen sekme ağaçta her zaman görünür açılır, daha önce kapatılmış olsa bile.
    treeOpen[tabs[state.tab].id] = true;
    render();
  }

  function goNext() {
    var tab = tabs[state.tab];
    var errs = V.step(tab.steps[state.step], S);
    var keys = Object.keys(errs);
    if (keys.length) {
      keys.forEach(function (id) {
        F.showError(id, errs[id]);
      });
      var first = document.querySelector('[data-field="' + keys[0] + '"]');
      if (first) first.scrollIntoView({ behavior: "smooth", block: "center" });
      toast(t("toast.stepBlocked"), "danger");
      refreshChrome();
      return;
    }
    var vis = visibleStepIndexes(tab);
    var pos = vis.indexOf(state.step);
    if (pos !== -1 && pos < vis.length - 1) go(state.tab, vis[pos + 1]);
    else if (state.tab < tabs.length - 1) go(state.tab + 1, 0);
  }

  function goPrev() {
    var vis = visibleStepIndexes(tabs[state.tab]);
    var pos = vis.indexOf(state.step);
    if (pos > 0) return go(state.tab, vis[pos - 1]);
    if (state.tab > 0) {
      var prevVis = visibleStepIndexes(tabs[state.tab - 1]);
      go(state.tab - 1, prevVis.length ? prevVis[prevVis.length - 1] : 0);
    }
  }

  function persistPosition() {
    S.setPref("position", { tab: state.tab, step: state.step });
  }

  function bindKeys() {
    document.addEventListener("keydown", function (e) {
      if (e.target.matches("input, textarea, select")) return;
      if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      }
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    });
  }

  /* ==================================================================
     Bildirim ve onay / toast & confirm
     ================================================================== */
  function toast(message, kind) {
    var region = document.getElementById("toasts");
    var node = el("div", { class: "toast toast--" + (kind || "info"), role: "status" }, [
      icon(kind === "danger" ? "alert" : "check"),
      el("span", { text: message }),
    ]);
    region.appendChild(node);
    setTimeout(function () {
      node.style.opacity = "0";
      node.style.transform = "translateY(6px)";
      setTimeout(function () {
        node.remove();
      }, 220);
    }, 3200);
  }

  /* ==================================================================
     Başvurunun tamamlanması / application submission
     ================================================================== */

  /**
   * Rapor numarası: SAR-<yıl>-<6 karakter>.
   * Karışmaya açık harfler (I, O) ve rakam 0/1 alfabede yer almaz.
   * Üretim crypto.getRandomValues ile yapılır; desteklenmiyorsa
   * Math.random'a düşülür.
   */
  function makeReportNo() {
    var ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    var n = 6;
    var out = "";
    var buf = null;
    if (window.crypto && window.crypto.getRandomValues) {
      buf = new Uint32Array(n);
      window.crypto.getRandomValues(buf);
    }
    for (var i = 0; i < n; i++) {
      var r = buf ? buf[i] : Math.floor(Math.random() * 0xffffffff);
      out += ALPHABET.charAt(r % ALPHABET.length);
    }
    return "SAR-" + new Date().getFullYear() + "-" + out;
  }

  /** Raporu tamamla: doğrula, numara üret, tamamlama ekranını aç. */
  function submitReport() {
    var p = V.progress(tabs, S);
    var missing = p.total - p.done;
    if (missing > 0) {
      toast(t("validate.summary", { n: missing }), "danger");
      // İlk eksik alanın bulunduğu adıma götür.
      for (var ti = 0; ti < tabs.length; ti++) {
        for (var si = 0; si < tabs[ti].steps.length; si++) {
          var step = tabs[ti].steps[si];
          if (!V.isVisible(step, S)) continue;
          if (V.stepErrorCount(step, S) > 0) return go(ti, si);
        }
      }
      return;
    }

    // Numara bir kez üretilir; aynı rapor yeniden tamamlanırsa korunur.
    var no = S.get("submission.reportNo");
    if (!no) {
      no = makeReportNo();
      S.set("submission.reportNo", no);
      S.set("submission.completedAt", new Date().toISOString());
    }
    S.save();
    showCompletion(no);
  }

  /** Tamamlandı ekranı: rapor numarası, dışa aktarma ve yazdırma. */
  function showCompletion(no) {
    var dlg = document.getElementById("confirm-dialog");

    function actionButton(labelKey, iconName, variant, handler) {
      var b = el("button", { type: "button", class: "btn " + variant }, [
        icon(iconName, "btn__icon"),
        document.createTextNode(t(labelKey)),
      ]);
      b.addEventListener("click", handler);
      return b;
    }

    dlg.innerHTML = "";
    dlg.appendChild(
      el("div", { class: "completion" }, [
        el("div", { class: "completion__mark", "aria-hidden": "true" }, [icon("check")]),
        el("h2", { class: "completion__title", text: t("done.title") }),
        el("p", { class: "completion__lead", text: t("done.lead") }),

        el("div", { class: "completion__no" }, [
          el("span", { class: "completion__no-label", text: t("done.reportNo") }),
          el("code", { class: "completion__no-value", text: no }),
          (function () {
            var b = el("button", {
              type: "button",
              class: "completion__copy",
              title: t("done.copy"),
              "aria-label": t("done.copy"),
            }, [icon("copy")]);
            b.addEventListener("click", function () {
              if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(no).then(function () {
                  toast(t("done.copied"), "success");
                });
              }
            });
            return b;
          })(),
        ]),

        el("p", { class: "completion__note", text: t("done.keepNote") }),

        el("div", { class: "completion__actions" }, [
          actionButton("done.export", "download", "btn--primary", function () {
            afterDownload(S.download("yokak-odr-" + no + ".json"), "done.exported");
          }),
          actionButton("done.print", "print", "btn--secondary", function () {
            dlg.close();
            window.print();
          }),
        ]),

        el("div", { class: "modal__footer" }, [
          (function () {
            var b = el("button", { type: "button", class: "btn btn--ghost", text: t("done.close") });
            b.addEventListener("click", function () {
              dlg.close();
            });
            return b;
          })(),
        ]),
      ])
    );
    dlg.showModal();
  }

  function confirmReset() {
    var dlg = document.getElementById("confirm-dialog");
    dlg.innerHTML = "";
    dlg.appendChild(
      el("div", {}, [
        el("div", { class: "modal__header" }, [el("h2", { class: "modal__title", text: t("confirm.resetTitle") })]),
        el("div", { class: "modal__body" }, [el("p", { text: t("confirm.resetBody") })]),
        el("div", { class: "modal__footer" }, [
          (function () {
            var b = el("button", { type: "button", class: "btn btn--secondary", text: t("confirm.cancel") });
            b.addEventListener("click", function () {
              dlg.close();
            });
            return b;
          })(),
          (function () {
            var b = el("button", { type: "button", class: "btn btn--danger", text: t("confirm.confirm") });
            b.addEventListener("click", function () {
              S.reset();
              dlg.close();
              state.tab = 0;
              state.step = 0;
              toast(t("toast.reset"), "success");
              render();
            });
            return b;
          })(),
        ]),
      ])
    );
    dlg.showModal();
  }

  /* ==================================================================
     Cam yüzeyler için imleç takibi / pointer tracking for glass
     ================================================================== */
  document.addEventListener("pointermove", function (e) {
    var target = e.target.closest ? e.target.closest(".glass") : null;
    if (!target) return;
    var r = target.getBoundingClientRect();
    target.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
    target.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
  }, { passive: true });

  /* Buton dalgası / button ripple */
  document.addEventListener("pointerdown", function (e) {
    var btn = e.target.closest ? e.target.closest(".btn") : null;
    if (!btn) return;
    var r = btn.getBoundingClientRect();
    var size = Math.max(r.width, r.height);
    var ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = e.clientX - r.left - size / 2 + "px";
    ripple.style.top = e.clientY - r.top - size / 2 + "px";
    btn.appendChild(ripple);
    setTimeout(function () {
      ripple.remove();
    }, 400);
  }, { passive: true });

  /* Ayrılmadan önce kaydet / save before unload */
  window.addEventListener("beforeunload", function () {
    S.save();
  });

  /**
   * Dışarıdan gezinme — kimlikle sekme/adım hedefler. Kanıt dizini,
   * dış kaynaktan gelen bir belgenin girildiği adıma götürmek için
   * kullanır.
   */
  window.App = {
    goTo: function (where) {
      if (!where) return false;
      var ti = -1;
      for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].id === where.tab) ti = i;
      }
      if (ti < 0) return false;
      var si = 0;
      (tabs[ti].steps || []).forEach(function (s, k) {
        if (s.id === where.step) si = k;
      });
      go(ti, si);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return true;
    },
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
