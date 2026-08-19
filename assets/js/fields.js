/* ==========================================================================
   Fields — alan render motoru / field rendering engine
   Şemadaki her alan türü için DOM üretir ve Store ile iki yönlü bağlar.
   ========================================================================== */

window.Fields = (function () {
  "use strict";

  var S = window.Store;
  var V = window.Validate;
  var pick = function (v) {
    return window.I18N.pick(v);
  };
  /**
   * Aramada taranacak metin: çok dilli bir ad verilirse tüm dillerdeki
   * karşılıkları birleştirir. Böylece İngilizce arayüzdeki bir başvuran
   * Türkçe program adıyla da (veya tersi) arama yapabilir.
   */
  var searchText = function (v) {
    if (!v) return "";
    if (typeof v === "string") return v.toLocaleLowerCase("tr");
    return Object.keys(v)
      .map(function (k) {
        return v[k];
      })
      .join(" ")
      .toLocaleLowerCase("tr");
  };
  var t = function (k, p) {
    return window.I18N.t(k, p);
  };

  /* ------------------------------------------------------------------
     DOM yardımcıları / DOM helpers
     ------------------------------------------------------------------ */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "html") node.innerHTML = v;
        else if (k === "text") node.textContent = v;
        else if (k.slice(0, 2) === "on") node.addEventListener(k.slice(2).toLowerCase(), v);
        else node.setAttribute(k, v === true ? "" : v);
      });
    }
    (children || []).forEach(function (c) {
      if (c === null || c === undefined) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  var ICONS = {
    check: '<path d="M20 6 9 17l-5-5"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    flag: '<path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>',
    search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    save: '<path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><path d="M17 21v-8H7v8M7 3v5h8"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>',
    upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>',
    reset: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/>',
    arrowRight: '<path d="M5 12h14M12 5l7 7-7 7"/>',
    arrowLeft: '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    print: '<path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 14h12v8H6z"/>',
    send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
    file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  };

  function icon(name, cls) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    if (cls) svg.setAttribute("class", cls);
    svg.innerHTML = ICONS[name] || "";
    return svg;
  }

  /* ------------------------------------------------------------------
     Ortak alan sarmalayıcı / shared field wrapper
     ------------------------------------------------------------------ */
  /**
   * Alan etiketi. Şema doğrudan {tr, en} verebilir ya da `labelKey` ile
   * arayüz sözlüğünden bir anahtar gösterebilir; ölçüt adımlarındaki
   * etiketler program adıyla kişiselleştiği için sözlükten gelir.
   */
  function fieldLabel(field) {
    if (field.labelKey) return t(field.labelKey);
    return field.label ? pick(field.label) : "";
  }

  function fieldHint(field) {
    if (field.hintKey) return t(field.hintKey);
    return field.hint ? pick(field.hint) : "";
  }

  function wrap(field, control, opts) {
    opts = opts || {};
    var cls = "field" + (field.half ? "" : " field--full");
    var box = el("div", { class: cls, "data-field": field.id });

    if ((field.label || field.labelKey) && !opts.noLabel) {
      var label = el("label", {
        class: "field__label",
        for: opts.labelFor || "f_" + safeId(field.id),
      });
      label.appendChild(document.createTextNode(fieldLabel(field)));
      if (V.isRequired(field, S)) {
        label.appendChild(el("span", { class: "field__required", text: "*", "aria-hidden": "true" }));
        label.appendChild(el("span", { class: "sr-only", text: " (" + t("field.required") + ")" }));
      } else {
        label.appendChild(el("span", { class: "field__optional", text: t("field.optional") }));
      }
      box.appendChild(label);
    }

    if (field.hint || field.hintKey) {
      box.appendChild(el("p", { class: "field__hint", text: fieldHint(field) }));
    }
    box.appendChild(control);

    var err = el("p", { class: "field__error", hidden: true, id: "err_" + safeId(field.id), role: "alert" });
    err.appendChild(icon("alert"));
    err.appendChild(el("span", {}));
    box.appendChild(err);

    return box;
  }

  function safeId(id) {
    return String(id).replace(/[^a-zA-Z0-9_-]/g, "_");
  }

  function showError(fieldId, message) {
    var err = document.getElementById("err_" + safeId(fieldId));
    if (!err) return;
    if (message) {
      err.querySelector("span").textContent = message;
      err.hidden = false;
    } else {
      err.hidden = true;
    }
    var box = document.querySelector('[data-field="' + fieldId + '"]');
    if (box) {
      var input = box.querySelector(".input, .textarea, .select");
      if (input) input.setAttribute("aria-invalid", message ? "true" : "false");
    }
  }

  /* Alan değişince doğrula + üst katmana haber ver.
     `quiet` verildiğinde hata basılmaz; yazma sırasında kural
     uygulamamak için kullanılır. */
  var onDirty = function () {};
  function commit(field, value, quiet) {
    S.set(field.id, value);
    if (!quiet) showError(field.id, V.field(field, S));
    onDirty(field);
  }

  /* ------------------------------------------------------------------
     Basit girdiler / simple inputs
     ------------------------------------------------------------------ */
  function textInput(field) {
    var typeMap = { text: "text", email: "email", url: "url", tel: "tel", number: "number", date: "date" };
    var input = el("input", {
      class: "input",
      type: typeMap[field.type] || "text",
      id: "f_" + safeId(field.id),
      value: S.get(field.id, "") || "",
      placeholder: field.placeholder ? pick(field.placeholder) : null,
      min: field.min,
      max: field.max,
      maxlength: field.maxLength,
      inputmode: field.inputmode,
      "aria-describedby": "err_" + safeId(field.id),
    });
    /* Yarım yazılmış bir değer henüz hata değildir: biçim kuralları
       (16 hane, e-posta, adres) alandan çıkılınca uygulanır. Hata bir
       kez görüldükten sonra düzeltildiği anda kalkar. */
    var touched = false;
    input.addEventListener("input", function () {
      commit(field, input.value, !touched);
    });
    input.addEventListener("blur", function () {
      touched = true;
      showError(field.id, V.field(field, S));
    });
    /* Değeri başka metinlerde geçen alanlar (kısaltma → {ajans} imi)
       alandan çıkılınca adımın tazelenmesini ister. change olayı yalnızca
       değer gerçekten değiştiğinde gelir, her tuşta değil. */
    if (field.refreshesLabels) {
      input.addEventListener("change", function () {
        onDirty(field, true);
      });
    }

    /* Başka bir alandan türeyebilen değerler için öneri satırı. ISCED-F
       kodu seçilen programın ayrıntılı alanından okunur; kullanıcı yine de
       kendi kodunu yazabilir, öneri yalnızca bir kısayoldur. */
    if (field.suggestFrom) {
      var hintRow = suggestionRow(field, input);
      if (hintRow) return wrap(field, el("div", {}, [input, hintRow]));
    }

    return wrap(field, input);
  }

  /**
   * Seçilen programın ISCED-F 2013 ayrıntılı alan kodunu öneren satır.
   * Değer alandakinden farklıysa tek tıkla yazılır.
   */
  function suggestionRow(field, input) {
    var sel = S.get(field.suggestFrom, []);
    if (!Array.isArray(sel) || sel.length !== 1) return null;
    var prog = window.PROGRAM_DATA.find(sel[0]);
    if (!prog || !prog.field) return null;
    if (String(input.value).trim() === prog.field) return null;

    var name = pick(window.PROGRAM_DATA.fieldName(prog.field));
    var btn = el("button", { type: "button", class: "field__suggest" }, [
      icon("info", "field__suggest-icon"),
      el("span", { class: "field__suggest-text" }, [
        el("strong", { text: prog.field }),
        document.createTextNode(" · " + name),
      ]),
    ]);
    btn.addEventListener("click", function () {
      input.value = prog.field;
      commit(field, prog.field);
      btn.remove();
    });
    return btn;
  }

  function textarea(field) {
    var ta = el("textarea", {
      class: "textarea" + (field.large ? " textarea--lg" : ""),
      id: "f_" + safeId(field.id),
      placeholder: field.placeholder ? pick(field.placeholder) : null,
      "aria-describedby": "err_" + safeId(field.id),
    });
    ta.value = S.get(field.id, "") || "";

    var counter = null;
    if (field.minLength || field.maxLength || field.minWords || field.maxWords) {
      counter = el("div", { class: "field__counter" });
    }

    /* Sınır kelime üzerinden konulmuşsa sayaç da kelimeyi ölçer; aksi
       hâlde karakter sayısına bakar. İkisi bir arada kullanılmaz. */
    function updateCounter() {
      if (!counter) return;
      var len = ta.value.trim().length;
      var words = ta.value.trim() ? ta.value.trim().split(/\s+/).length : 0;
      var kelimeSiniri = field.minWords || field.maxWords;
      var parts = [words + " " + t("field.words"), len + " " + t("field.chars")];
      var alt = kelimeSiniri ? field.minWords : field.minLength;
      var ust = kelimeSiniri ? field.maxWords : field.maxLength;
      var birim = kelimeSiniri ? t("field.words") : t("field.chars");
      var olculen = kelimeSiniri ? words : len;
      if (alt) parts.push(t("field.min") + " " + alt + " " + birim);
      if (ust) parts.push(t("field.max") + " " + ust + " " + birim);
      counter.textContent = parts.join(" · ");
      counter.className =
        "field__counter" +
        (ust && olculen > ust
          ? " field__counter--over"
          : alt && olculen > 0 && olculen < alt
          ? " field__counter--warn"
          : "");
    }

    ta.addEventListener("input", function () {
      updateCounter();
      commit(field, ta.value);
    });
    ta.addEventListener("blur", function () {
      showError(field.id, V.field(field, S));
    });
    updateCounter();

    var holder = el("div", {}, [ta, counter]);
    return wrap(field, holder, { labelFor: "f_" + safeId(field.id) });
  }

  function select(field) {
    var sel = el("select", { class: "select", id: "f_" + safeId(field.id) });
    sel.appendChild(el("option", { value: "", text: t("field.selectPlaceholder") }));
    (field.options || []).forEach(function (o) {
      sel.appendChild(el("option", { value: o.value, text: pick(o.label) }));
    });
    sel.value = S.get(field.id, "") || "";
    sel.addEventListener("change", function () {
      commit(field, sel.value);
    });
    return wrap(field, sel);
  }

  function radio(field) {
    var group = el("div", { class: "choice-group", role: "radiogroup", "aria-label": fieldLabel(field) });
    var current = S.get(field.id, "");
    (field.options || []).forEach(function (o, i) {
      var input = el("input", {
        type: "radio",
        name: "r_" + safeId(field.id),
        value: o.value,
        id: "f_" + safeId(field.id) + "_" + i,
      });
      if (current === o.value) input.checked = true;
      input.addEventListener("change", function () {
        if (input.checked) commit(field, o.value);
      });
      var body = el("span", { class: "choice__body" }, [
        el("span", { class: "choice__label", text: pick(o.label) }),
        o.desc ? el("span", { class: "choice__desc", text: pick(o.desc) }) : null,
      ]);
      group.appendChild(el("label", { class: "choice" }, [input, body]));
    });
    return wrap(field, group, { noLabelFor: true });
  }

  function checkboxes(field) {
    var group = el("div", { class: "choice-group" });
    var current = S.get(field.id, []) || [];
    (field.options || []).forEach(function (o, i) {
      var input = el("input", { type: "checkbox", value: o.value, id: "f_" + safeId(field.id) + "_" + i });
      if (current.indexOf(o.value) !== -1) input.checked = true;
      input.addEventListener("change", function () {
        var list = (S.get(field.id, []) || []).slice();
        var idx = list.indexOf(o.value);
        if (input.checked && idx === -1) list.push(o.value);
        if (!input.checked && idx !== -1) list.splice(idx, 1);
        commit(field, list);
      });
      var body = el("span", { class: "choice__body" }, [
        el("span", { class: "choice__label", text: pick(o.label) }),
        o.desc ? el("span", { class: "choice__desc", text: pick(o.desc) }) : null,
      ]);
      group.appendChild(el("label", { class: "choice" }, [input, body]));
    });
    return wrap(field, group);
  }

  /* ------------------------------------------------------------------
     Tekrarlayıcı / repeater
     ------------------------------------------------------------------ */

  /* Satır içi alanların HTML girdi türü; eşleşmeyen her tür metindir. */
  var REPEATER_INPUT = { number: "number", url: "url", date: "date", email: "email", tel: "tel" };

  /**
   * Satır içi dosya alanı. Dosya, kanıt koleksiyonundaki ile aynı biçimde
   * ({name, size, type, data}) satırın kendi verisine gömülür; böylece
   * dışa aktarılan başvuru dosyası kendi kendine yeterli kalır.
   */
  function repeaterFile(sub, subId, current, onChange) {
    var box = el("div", { class: "rep-file" });
    var input = el("input", { type: "file", id: subId, class: "sr-only", accept: sub.accept });
    var err = el("p", { class: "rep-file__error", hidden: "" });

    function draw() {
      box.innerHTML = "";
      box.appendChild(input);
      if (current && current.name) {
        box.appendChild(el("span", { class: "rep-file__have" }, [
          icon("file", "rep-file__icon"),
          el("span", { class: "rep-file__name", text: current.name }),
          el("span", { class: "rep-file__size", text: fmtBytes(current.size) }),
        ]));
      }
      var pickBtn = el("button", { type: "button", class: "btn btn--secondary btn--sm" }, [
        icon("upload", "btn__icon"),
        document.createTextNode(
          current && current.name ? t("evidence.replaceFile") : t("evidence.addFile")
        ),
      ]);
      pickBtn.addEventListener("click", function () { input.click(); });
      box.appendChild(pickBtn);

      if (current && current.name) {
        var clear = el("button", { type: "button", class: "btn btn--ghost btn--sm" }, [
          icon("x", "btn__icon"), document.createTextNode(t("evidence.clearFile")),
        ]);
        clear.addEventListener("click", function () { onChange(null); });
        box.appendChild(clear);
      }
      box.appendChild(err);
    }

    input.addEventListener("change", function () {
      var f = input.files && input.files[0];
      if (!f) return;
      readEvidenceFile(f, function (rec) {
        err.hidden = true;
        onChange(rec);
      }, function (msg) {
        err.textContent = msg;
        err.hidden = false;
      });
    });

    draw();
    return box;
  }

  function repeater(field) {
    var list = el("div", { class: "repeater" });
    var holder = el("div", {}, [list]);

    function rows() {
      var v = S.get(field.id, []);
      return Array.isArray(v) ? v : [];
    }

    function persist(next) {
      S.set(field.id, next);
      showError(field.id, V.field(field, S));
      onDirty(field);
    }

    function render() {
      list.innerHTML = "";
      var data = rows();
      if (data.length === 0) {
        list.appendChild(el("div", { class: "repeater__empty", text: t("repeater.empty") }));
      }
      data.forEach(function (row, idx) {
        var item = el("div", { class: "repeater__item" });

        /* Başlık satırı: sıra numarası + kaldır düğmesi.
           Akış içinde durur, alan etiketleriyle çakışmaz. */
        var del = el("button", {
          type: "button",
          class: "btn btn--ghost btn--icon repeater__remove",
          "aria-label": t("a11y.remove"),
          title: t("repeater.remove"),
        }, [icon("trash", "btn__icon")]);

        item.appendChild(
          el("div", { class: "repeater__item-head" }, [
            el("span", { class: "repeater__item-index", text: t("repeater.item") + " " + (idx + 1) }),
            del,
          ])
        );

        field.itemFields.forEach(function (sub) {
          var subId = "f_" + safeId(field.id) + "_" + idx + "_" + sub.id;
          var control;
          if (sub.type === "textarea") {
            control = el("textarea", { class: "textarea", id: subId, rows: "3" });
            control.value = row[sub.id] || "";
          } else if (sub.type === "select") {
            control = el("select", { class: "select", id: subId });
            control.appendChild(el("option", { value: "", text: t("field.selectPlaceholder") }));
            (sub.options || []).forEach(function (o) {
              control.appendChild(el("option", { value: o.value, text: pick(o.label) }));
            });
            control.value = row[sub.id] || "";
          } else if (sub.type === "file") {
            control = repeaterFile(sub, subId, row[sub.id], function (val) {
              var next = rows().slice();
              next[idx] = Object.assign({}, next[idx]);
              next[idx][sub.id] = val;
              persist(next);
              render();
            });
          } else {
            control = el("input", {
              class: "input",
              type: REPEATER_INPUT[sub.type] || "text",
              id: subId,
              value: row[sub.id] || "",
              placeholder: sub.placeholder ? pick(sub.placeholder) : null,
              min: sub.min,
              max: sub.max,
            });
          }
          if (sub.type !== "file") {
            control.addEventListener("input", function () {
              var next = rows().slice();
              next[idx] = Object.assign({}, next[idx]);
              next[idx][sub.id] = control.value;
              persist(next);
            });
          }

          var lbl = el("label", { class: "field__label", for: subId }, [
            document.createTextNode(pick(sub.label)),
            sub.required ? el("span", { class: "field__required", text: "*" }) : null,
          ]);
          item.appendChild(el("div", { class: "field field--inline" }, [lbl, control]));
        });

        del.addEventListener("click", function () {
          item.classList.add("repeater__item--leaving");
          setTimeout(function () {
            var next = rows().slice();
            next.splice(idx, 1);
            persist(next);
            render();
          }, 180);
        });
        list.appendChild(item);
      });
    }

    var add = el("button", { type: "button", class: "btn btn--secondary btn--sm" }, [
      icon("plus", "btn__icon"),
      document.createTextNode(pick(field.addLabel) || t("repeater.add")),
    ]);
    add.addEventListener("click", function () {
      var next = rows().slice();
      next.push({});
      persist(next);
      render();
      var items = list.querySelectorAll(".repeater__item");
      if (items.length) {
        var input = items[items.length - 1].querySelector("input, textarea");
        if (input) input.focus();
      }
    });

    /* ---- Önerilen kanıtlar / suggested evidence ---------------------
       Yalnızca bilgilendirme amaçlı okunur liste. */
    var suggestBox = null;
    if (field.suggestions && field.suggestions.length) {
      var suggestList = el("ul", { class: "suggest__list" });
      field.suggestions.forEach(function (s) {
        suggestList.appendChild(el("li", { class: "suggest__item", text: pick(s) }));
      });

      suggestBox = el("details", { class: "suggest glass" }, [
        el("summary", { class: "suggest__head" }, [
          icon("info", "suggest__icon"),
          el("span", { class: "suggest__title", text: t("evidence.suggestedTitle") }),
          el("span", { class: "badge badge--neutral", text: String(field.suggestions.length) }),
        ]),
        el("div", { class: "suggest__body" }, [
          el("p", { class: "suggest__hint", text: t("evidence.suggestedHint") }),
          suggestList,
        ]),
      ]);
    }

    render();
    if (suggestBox) holder.appendChild(suggestBox);
    holder.appendChild(el("div", { style: "margin-top:var(--space-3)" }, [add]));
    return wrap(field, holder);
  }

  /* ------------------------------------------------------------------
     Kanıt koleksiyonu / evidence library

     Tüm kanıtlar tek listede (window.Evidence) tutulur. Belgeler
     bölümündeki `evidence-library` alanı koleksiyonu yönetir; ESG
     adımlarındaki `evidence-picker` alanı aynı koleksiyonu standart
     etiketi üzerinden okur ve yazar.
     ------------------------------------------------------------------ */

  var EV_MAX_MB = 4;

  /** Etiketlenebilir alt ölçütler, ana ölçüt başlıkları altında gruplanır. */
  function evidenceSubGroups() {
    return window.SAR.criteria.map(function (main) {
      return {
        label: {
          tr: main.code + ". " + main.title.tr,
          en: main.code + ". " + main.title.en,
        },
        items: main.subs,
      };
    });
  }

  /**
   * Alt ölçüt kodlarını sayısal olarak sıralar. Düz metin sıralaması
   * "10.1" kodunu "9.4"ün önüne koyardı; klasör düzeni ölçüt sırasını
   * izlemelidir.
   */
  function compareTags(a, b) {
    var pa = String(a).split(".");
    var pb = String(b).split(".");
    for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
      var na = parseInt(pa[i], 10);
      var nb = parseInt(pb[i], 10);
      if (isNaN(na) || isNaN(nb)) return String(a).localeCompare(String(b));
      if (na !== nb) return na - nb;
    }
    return 0;
  }

  function fmtBytes(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(0) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  }

  /** Kanıt kaydına dosya okur; kota dolarsa yalnızca üstveriyi saklar. */
  function readEvidenceFile(file, onDone, onError) {
    if (file.size > EV_MAX_MB * 1048576) {
      onError(
        window.I18N.lang === "tr"
          ? "Dosya çok büyük (" + fmtBytes(file.size) + "). En fazla " + EV_MAX_MB +
            " MB yükleyebilirsiniz; daha büyük dosyalar için bağlantı alanını kullanınız."
          : "File too large (" + fmtBytes(file.size) + "). Maximum is " + EV_MAX_MB +
            " MB; use the link field for larger files."
      );
      return;
    }
    var reader = new FileReader();
    reader.onload = function () {
      onDone({
        name: file.name,
        size: file.size,
        type: file.type,
        data: String(reader.result),
        uploadedAt: new Date().toISOString(),
      });
    };
    reader.readAsDataURL(file);
  }

  /** Kanıtın taşıdığı standart etiketlerini rozet olarak gösterir. */
  function evidenceTagChips(item) {
    var EV = window.Evidence;
    var box = el("span", { class: "ev-tags" });
    var tags = (item.tags || []).filter(function (c) {
      return c !== EV.OTHER;
    });
    if (!tags.length) {
      box.appendChild(el("span", { class: "ev-tag ev-tag--none", text: t("evidence.untagged") }));
      return box;
    }
    tags.sort(compareTags).forEach(function (code) {
      box.appendChild(el("span", { class: "ev-tag", text: code }));
    });
    return box;
  }

  /** Kanıtın erişim yolunu (bağlantı ve/veya dosya) özetler. */
  function evidenceAccess(item) {
    var box = el("span", { class: "ev-access" });
    if (item.url) {
      box.appendChild(el("a", {
        class: "ev-access__link", href: item.url, target: "_blank",
        rel: "noopener noreferrer", text: t("evidence.link"),
      }));
    }
    if (item.file && item.file.name) {
      box.appendChild(el("span", {
        class: "ev-access__file",
        text: item.file.name + (item.file.size ? " · " + fmtBytes(item.file.size) : ""),
      }));
    }
    if (!item.url && !(item.file && item.file.name)) {
      box.appendChild(el("span", { class: "ev-access__missing", text: t("evidence.noAccess") }));
    }
    return box;
  }

  /** Kanıt düzenleme penceresi. Kaydedilmeden koleksiyona hiçbir şey yazılmaz. */
  function evidenceEditor(item, onSave) {
    var EV = window.Evidence;
    /* Öneriden açılan pencere kimliksiz bir taslakla gelir; bu da yeni
       kayıttır — yalnızca adı ve etiketi önceden doldurulmuştur. */
    var isNew = !item || !item.id;
    var draft = {
      name: item ? item.name || "" : "",
      url: item ? item.url || "" : "",
      file: item ? item.file || null : null,
      note: item ? item.note || "" : "",
      tags: item ? (item.tags || []).slice() : [],
    };

    var dlg = el("dialog", { class: "modal ev-editor" });
    var err = el("p", { class: "ev-editor__error", hidden: true, role: "alert" });

    function field(labelKey, control) {
      return el("label", { class: "ev-field" }, [
        el("span", { class: "ev-field__label", text: t(labelKey) }), control,
      ]);
    }

    var name = el("input", { class: "input", type: "text", value: draft.name, placeholder: t("evidence.namePlaceholder") });
    name.addEventListener("input", function () {
      draft.name = name.value;
    });

    var url = el("input", { class: "input", type: "url", value: draft.url, placeholder: "https://…" });
    url.addEventListener("input", function () {
      draft.url = url.value;
    });

    var note = el("input", { class: "input", type: "text", value: draft.note, placeholder: t("evidence.notePlaceholder") });
    note.addEventListener("input", function () {
      draft.note = note.value;
    });

    /* Dosya — seçim yalnızca taslakta tutulur, kaydedilince yazılır. */
    var fileInput = el("input", { type: "file", class: "sr-only" });
    var fileName = el("span", { class: "ev-newfile__name", text: draft.file ? draft.file.name : "" });
    var pickBtn = el("button", { type: "button", class: "btn btn--secondary btn--sm" }, [
      icon("upload", "btn__icon"), document.createTextNode(t("evidence.addFile")),
    ]);
    pickBtn.addEventListener("click", function () {
      fileInput.click();
    });
    var clearBtn = el("button", { type: "button", class: "btn btn--ghost btn--sm", text: t("evidence.clearFile") });
    clearBtn.addEventListener("click", function () {
      draft.file = null;
      fileName.textContent = "";
      clearBtn.hidden = true;
    });
    clearBtn.hidden = !draft.file;
    fileInput.addEventListener("change", function () {
      var f = fileInput.files && fileInput.files[0];
      if (!f) return;
      err.hidden = true;
      readEvidenceFile(f, function (payload) {
        draft.file = payload;
        fileName.textContent = payload.name + " · " + fmtBytes(payload.size);
        clearBtn.hidden = false;
      }, function (msg) {
        err.textContent = msg;
        err.hidden = false;
      });
    });

    /* Etiketler */
    var tagBox = el("div", { class: "ev-tagpicker" });
    tagBox.appendChild(el("p", { class: "ev-field__label", text: t("evidence.tagsLabel") }));
    tagBox.appendChild(el("p", { class: "ev-tagpicker__hint", text: t("evidence.tagsHint") }));

    function chip(code, label) {
      var b = el("button", { type: "button", class: "ev-chip", "aria-pressed": "false" },
        [document.createTextNode(label)]);
      function sync() {
        var on = draft.tags.indexOf(code) !== -1;
        b.className = "ev-chip" + (on ? " ev-chip--on" : "") + (code === EV.OTHER ? " ev-chip--other" : "");
        b.setAttribute("aria-pressed", on ? "true" : "false");
      }
      b.addEventListener("click", function () {
        var i = draft.tags.indexOf(code);
        if (i === -1) {
          draft.tags.push(code);
          // Bir standarda bağlanan kanıt artık tasnif dışı sayılmaz.
          if (code !== EV.OTHER) {
            draft.tags = draft.tags.filter(function (c) {
              return c !== EV.OTHER;
            });
          }
        } else {
          draft.tags.splice(i, 1);
        }
        tagBox.querySelectorAll(".ev-chip").forEach(function (el2) {
          if (el2.__sync) el2.__sync();
        });
      });
      b.__sync = sync;
      sync();
      return b;
    }

    evidenceSubGroups().forEach(function (grp) {
      var chips = el("div", { class: "ev-tagpicker__chips" });
      grp.items.forEach(function (sub) {
        chips.appendChild(chip(sub.code, sub.code));
      });
      var group = el("details", { class: "ev-tagpicker__group" });
      group.appendChild(
        el("summary", { class: "ev-tagpicker__group-label" }, [
          document.createTextNode(pick(grp.label)),
          el("span", { class: "ev-tagpicker__group-count", text: String(grp.items.length) }),
        ])
      );
      group.appendChild(chips);
      /* Kanıtın hâlihazırda bağlı olduğu ölçüt açık gelsin. */
      if (grp.items.some(function (sub) { return draft.tags.indexOf(sub.code) !== -1; })) {
        group.setAttribute("open", "");
      }
      tagBox.appendChild(group);
    });
    tagBox.appendChild(
      el("details", { class: "ev-tagpicker__group", open: "" }, [
        el("summary", { class: "ev-tagpicker__group-label", text: t("evidence.otherGroup") }),
        el("div", { class: "ev-tagpicker__chips" }, [chip(EV.OTHER, t("evidence.other"))]),
      ])
    );

    var cancel = el("button", { type: "button", class: "btn btn--secondary", text: t("evidence.cancel") });
    cancel.addEventListener("click", function () {
      dlg.close();
    });

    var save = el("button", { type: "button", class: "btn btn--primary" }, [
      icon("save", "btn__icon"), document.createTextNode(t("evidence.save")),
    ]);
    save.addEventListener("click", function () {
      if (!draft.name.trim()) {
        err.textContent = t("evidence.nameRequired");
        err.hidden = false;
        name.focus();
        return;
      }
      if (!draft.url.trim() && !(draft.file && draft.file.name)) {
        err.textContent = t("evidence.accessRequired");
        err.hidden = false;
        return;
      }
      var payload = {
        name: draft.name.trim(),
        url: draft.url.trim(),
        file: draft.file,
        note: draft.note.trim(),
        tags: draft.tags,
      };
      try {
        if (isNew) EV.add(payload);
        else EV.update(item.id, payload);
      } catch (e) {
        // Depolama kotası dolduysa dosya içeriği olmadan kaydet
        if (payload.file) delete payload.file.data;
        if (isNew) EV.add(payload);
        else EV.update(item.id, payload);
      }
      dlg.close();
      onSave();
    });

    dlg.appendChild(el("div", {}, [
      el("div", { class: "modal__header" }, [
        el("h2", { class: "modal__title", text: isNew ? t("evidence.newTitle") : t("evidence.editTitle") }),
      ]),
      el("div", { class: "modal__body ev-editor__body" }, [
        field("evidence.name", name),
        field("evidence.url", url),
        el("div", { class: "ev-field" }, [
          el("span", { class: "ev-field__label", text: t("evidence.file") }),
          el("div", { class: "ev-newfile" }, [pickBtn, fileName, clearBtn, fileInput]),
        ]),
        el("p", { class: "ev-editor__note", text: t("evidence.accessHint") }),
        tagBox,
        field("evidence.note", note),
        err,
      ]),
      el("div", { class: "modal__footer" }, [cancel, save]),
    ]));

    document.body.appendChild(dlg);
    dlg.addEventListener("close", function () {
      dlg.remove();
    });
    dlg.showModal();
    name.focus();
  }

  /**
   * Silme onayı. Kanıt birden çok tasnifte görünebildiğinden iki ayrı
   * eylem sunulur: yalnızca bulunulan tasniften çıkarmak (etiketi kaldırır,
   * kanıt koleksiyonda kalır) veya kanıtı tamamen silmek. Tasnif dışı
   * klasöründe çıkarılacak bir etiket olmadığından yalnızca silme sunulur.
   */
  function evidenceDeleteConfirm(item, folder, onDone) {
    var EV = window.Evidence;
    var dlg = el("dialog", { class: "modal ev-confirm" });
    var others = (item.tags || []).filter(function (c) {
      return c !== EV.OTHER && c !== folder;
    }).sort(compareTags);

    function close() {
      dlg.close();
    }

    var actions = [];

    if (folder) {
      var untag = el("button", { type: "button", class: "btn btn--secondary" }, [
        icon("x", "btn__icon"),
        document.createTextNode(t("evidence.detachOnly", { code: EV.tagLabel(folder) })),
      ]);
      untag.addEventListener("click", function () {
        EV.untag(item.id, folder);
        close();
        onDone();
      });
      actions.push(untag);
    }

    var wipe = el("button", { type: "button", class: "btn btn--danger" }, [
      icon("trash", "btn__icon"), document.createTextNode(t("evidence.deleteAll")),
    ]);
    wipe.addEventListener("click", function () {
      EV.remove(item.id);
      close();
      onDone();
    });
    actions.push(wipe);

    var cancel = el("button", { type: "button", class: "btn btn--ghost", text: t("evidence.cancel") });
    cancel.addEventListener("click", close);

    dlg.appendChild(el("div", {}, [
      el("div", { class: "modal__header" }, [
        el("h2", { class: "modal__title", text: t("evidence.deleteTitle") }),
      ]),
      el("div", { class: "modal__body ev-confirm__body" }, [
        el("p", { class: "ev-confirm__name", text: item.name || t("evidence.unnamed") }),
        el("p", {
          class: "ev-confirm__lead",
          text: folder
            ? (others.length
                ? t("evidence.deleteLeadLinked", {
                    code: EV.tagLabel(folder),
                    list: others.map(EV.tagLabel).join(", "),
                  })
                : t("evidence.deleteLeadSingle", { code: EV.tagLabel(folder) }))
            : t("evidence.deleteLeadLoose"),
        }),
        el("div", { class: "ev-confirm__actions" }, actions),
      ]),
      el("div", { class: "modal__footer" }, [cancel]),
    ]));

    document.body.appendChild(dlg);
    dlg.addEventListener("close", function () {
      dlg.remove();
    });
    dlg.showModal();
  }

  /* ------------------------------------------------------------------
     Belgeler bölümü — kanıt dizini
     Kanıtlar bir dosya sistemi gibi klasörler altında listelenir;
     ekleme, güncelleme ve silme dizinden yapılır.
     ------------------------------------------------------------------ */
  function evidenceLibrary(field) {
    var EV = window.Evidence;
    var holder = el("div", { class: "ev-library" });
    var dirBox = el("div", { class: "ev-dir" });
    var countLabel = el("span", { class: "ev-dir__count" });

    function refresh() {
      showError(field.id, V.field(field, S));
      onDirty(field);
      renderDir();
    }

    /**
     * Dizindeki bir satır. Kanıt birden çok standarda bağlıysa her
     * klasörde ayrı satır olarak görünür; `folder` satırın hangi klasörde
     * çizildiğini söyler, zincir rozeti diğer klasörleri listeler.
     */
    function fileRow(item, folder) {
      var row = el("div", { class: "ev-file-row" + (EV.isUsable(item) ? "" : " ev-file-row--incomplete") });

      row.appendChild(el("span", { class: "ev-file-row__icon", "aria-hidden": "true" }, [icon("save")]));

      var main = el("span", { class: "ev-file-row__main" }, [
        el("span", { class: "ev-file-row__name", text: item.name || t("evidence.unnamed") }),
        item.note ? el("span", { class: "ev-file-row__note", text: item.note }) : null,
      ]);
      row.appendChild(main);

      row.appendChild(evidenceAccess(item));

      // Aynı kanıt başka klasörlerde de duruyorsa zincir rozetiyle belirtilir.
      var others = (item.tags || []).filter(function (c) {
        return c !== EV.OTHER && c !== folder;
      }).sort(compareTags);
      if (others.length) {
        var linkedText =
          t("evidence.linkedTo") + ": " + others.map(EV.tagLabel).join(", ");
        var chain = el("span", {
          class: "ev-file-row__linked",
          title: linkedText,
          "aria-label": linkedText,
        }, [icon("link"), el("span", { class: "ev-file-row__linked-n", text: String(others.length) })]);
        row.appendChild(chain);
      }

      /* Dış kaynaktan türeyen satırlar salt okunurdur: kayıt kendi
         adımında durur, koleksiyona kopyalanmaz. Düzenleme için o adıma
         götüren bir bağlantı verilir. */
      if (item.external) {
        var go = el("button", {
          type: "button", class: "btn btn--ghost btn--sm",
          title: t("evidence.goToSource"),
        }, [document.createTextNode(t("evidence.goToSource"))]);
        go.addEventListener("click", function () {
          var src = EV.sources().filter(function (s) {
            return s.tag === item.external;
          })[0];
          if (src && window.App && window.App.goTo) window.App.goTo(src.step);
        });
        row.appendChild(el("span", { class: "ev-file-row__actions" }, [go]));
        return row;
      }

      var edit = el("button", {
        type: "button", class: "btn btn--ghost btn--sm",
        title: t("evidence.edit"),
      }, [document.createTextNode(t("evidence.edit"))]);
      edit.addEventListener("click", function () {
        evidenceEditor(item, refresh);
      });

      // Kapsam seçimi onay penceresine bırakılır: tasniften çıkarma mı,
      // tamamen silme mi.
      var del = el("button", {
        type: "button", class: "btn btn--ghost btn--sm ev-file-row__delete",
        title: t("evidence.remove"), "aria-label": t("evidence.remove"),
      }, [icon("trash", "btn__icon")]);
      del.addEventListener("click", function () {
        evidenceDeleteConfirm(item, folder, refresh);
      });

      row.appendChild(el("span", { class: "ev-file-row__actions" }, [edit, del]));
      return row;
    }

    function folderBlock(label, items, folder, open, external) {
      var det = el("details", {
        class: "ev-folder" + (external ? " ev-folder--external" : ""),
        open: open ? "" : null,
      });
      det.appendChild(el("summary", { class: "ev-folder__head" }, [
        el("span", { class: "ev-folder__name", text: label }),
        external ? el("span", { class: "badge badge--neutral", text: t("evidence.sourceBadge") }) : null,
        el("span", { class: "ev-folder__count", text: items.length + " " + t("evidence.itemsSuffix") }),
      ]));
      var body = el("div", { class: "ev-folder__body" });
      if (external) {
        body.appendChild(el("p", { class: "ev-folder__note", text: t("evidence.sourceNote") }));
      }
      items.forEach(function (it) {
        body.appendChild(fileRow(it, folder));
      });
      det.appendChild(body);
      return det;
    }

    function renderDir() {
      dirBox.innerHTML = "";
      var items = EV.all();
      // Formun kendi belge alanlarından türeyen klasörler de dizine girer.
      var srcFolders = EV.sources().filter(function (s) {
        return s.items.length;
      });
      var srcCount = srcFolders.reduce(function (n, s) {
        return n + s.items.length;
      }, 0);
      countLabel.textContent = (items.length + srcCount) + " " + t("evidence.itemsSuffix");

      if (!items.length && !srcCount) {
        dirBox.appendChild(el("p", { class: "repeater__empty", text: t("evidence.empty") }));
        return;
      }

      /* Klasörler alt ölçüt kodlarıdır. Bir kanıt kaç alt ölçüte bağlıysa
         o kadar klasörde görünür; kayıt tektir, yalnızca satır tekrarlanır. */
      var byFolder = {};
      var loose = [];
      items.forEach(function (it) {
        var tags = (it.tags || []).filter(function (c) {
          return c !== EV.OTHER;
        });
        if (!tags.length) {
          loose.push(it);
          return;
        }
        tags.forEach(function (code) {
          (byFolder[code] = byFolder[code] || []).push(it);
        });
      });

      Object.keys(byFolder).sort(compareTags).forEach(function (code) {
        var sub = window.SAR.bySubCode(code);
        var label = code + (sub ? " · " + pick(sub.text) : "");
        dirBox.appendChild(folderBlock(label, byFolder[code], code, true));
      });
      srcFolders.forEach(function (s) {
        dirBox.appendChild(folderBlock(pick(s.label), s.items, s.tag, true, true));
      });
      if (loose.length) {
        dirBox.appendChild(folderBlock(t("evidence.otherFolder"), loose, null, true));
      }
    }

    var add = el("button", { type: "button", class: "btn btn--primary" }, [
      icon("plus", "btn__icon"), document.createTextNode(t("evidence.add")),
    ]);
    add.addEventListener("click", function () {
      evidenceEditor(null, refresh);
    });

    holder.appendChild(el("div", { class: "ev-dir__bar" }, [add, countLabel]));
    holder.appendChild(dirBox);
    renderDir();
    return wrap(field, holder);
  }

  /* ------------------------------------------------------------------
     Alt ölçüt adımları — koleksiyondan alt ölçüte kanıt bağlama
     ------------------------------------------------------------------ */
  function evidencePicker(field) {
    var EV = window.Evidence;
    var code = field.sub;
    var holder = el("div", { class: "ev-picker" });
    var attachedBox = el("div", { class: "ev-picker__attached" });
    var libraryBox = el("div", { class: "ev-picker__library" });

    function refresh() {
      showError(field.id, V.field(field, S));
      onDirty(field);
      renderAll();
    }

    function renderAttached() {
      attachedBox.innerHTML = "";
      var items = EV.bySub(code);
      if (!items.length) {
        attachedBox.appendChild(el("p", { class: "repeater__empty", text: t("evidence.noneForSub") }));
        return;
      }
      items.forEach(function (it) {
        var row = el("div", { class: "ev-row" + (EV.isUsable(it) ? "" : " ev-row--incomplete") }, [
          el("span", { class: "ev-row__name", text: it.name || t("evidence.unnamed") }),
          evidenceAccess(it),
        ]);
        var off = el("button", {
          type: "button", class: "ev-row__remove", "aria-label": t("evidence.detach"),
          title: t("evidence.detach"),
        }, [icon("x")]);
        off.addEventListener("click", function () {
          EV.untag(it.id, code);
          refresh();
        });
        row.appendChild(off);
        attachedBox.appendChild(row);
      });
    }

    /** Koleksiyondaki, bu standarda henüz bağlanmamış kanıtlar. */
    function renderLibrary() {
      libraryBox.innerHTML = "";
      var rest = EV.all().filter(function (it) {
        return (it.tags || []).indexOf(code) === -1;
      });
      if (!rest.length) return;

      var details = el("details", { class: "ev-picker__pool" });
      details.appendChild(el("summary", { class: "ev-picker__pool-head" }, [
        el("span", { text: t("evidence.pickFromLibrary") }),
        el("span", { class: "badge badge--neutral", text: String(rest.length) }),
      ]));
      var grid = el("div", { class: "ev-picker__pool-body" });
      rest.forEach(function (it) {
        var b = el("button", { type: "button", class: "ev-pool-item" }, [
          el("span", { class: "ev-pool-item__name", text: it.name || t("evidence.unnamed") }),
          evidenceTagChips(it),
        ]);
        b.addEventListener("click", function () {
          EV.tag(it.id, code);
          refresh();
        });
        grid.appendChild(b);
      });
      details.appendChild(grid);
      libraryBox.appendChild(details);
    }

    /**
     * Beklenen kanıt örnekleri. Ölçüt veri kümesinden gelir; bir öneriye
     * tıklamak adı doldurulmuş yeni kanıt penceresini açar ve kaydedilen
     * kanıt bu alt ölçüte bağlanır. Zaten koleksiyonda aynı adla bir kanıt
     * varsa öneri "eklendi" olarak işaretlenir.
     */
    var suggestBox = el("div", { class: "ev-suggest" });

    function renderSuggestions() {
      suggestBox.innerHTML = "";
      var list = field.suggestions ? pick(field.suggestions) : [];
      if (!list || !list.length) return;
      var have = {};
      EV.all().forEach(function (it) {
        have[String(it.name || "").trim().toLocaleLowerCase("tr")] = true;
      });
      var chips = el("div", { class: "ev-suggest__chips" });
      list.forEach(function (name) {
        var used = have[name.trim().toLocaleLowerCase("tr")];
        var b = el("button", {
          type: "button",
          class: "ev-suggest__chip" + (used ? " ev-suggest__chip--used" : ""),
        }, [
          used ? icon("check", "ev-suggest__tick") : icon("plus", "ev-suggest__tick"),
          el("span", { text: name }),
        ]);
        b.addEventListener("click", function () {
          evidenceEditor({ name: name, tags: [code] }, refresh);
        });
        chips.appendChild(b);
      });
      suggestBox.appendChild(
        el("details", { class: "ev-suggest__wrap" }, [
          el("summary", { class: "ev-suggest__head" }, [
            el("span", { text: t("evidence.suggestedTitle") }),
            el("span", { class: "badge badge--neutral", text: String(list.length) }),
          ]),
          el("div", { class: "ev-suggest__body" }, [
            el("p", { class: "ev-suggest__hint", text: t("evidence.suggestedHint") }),
            chips,
          ]),
        ])
      );
    }

    /* Yeni kanıt — koleksiyona yazılır ve bu alt ölçüte bağlanır. */
    var newName = el("input", { class: "input", type: "text", placeholder: t("evidence.namePlaceholder"), "aria-label": t("evidence.name") });
    var newUrl = el("input", { class: "input", type: "url", placeholder: "https://…", "aria-label": t("evidence.url") });
    var newFile = el("input", { type: "file", class: "sr-only" });
    var pendingFile = null;
    var fileLabel = el("span", { class: "ev-newfile__name", text: "" });
    var fileErr = el("p", { class: "ev-file__error", hidden: true });

    var pickFile = el("button", { type: "button", class: "btn btn--secondary btn--sm" }, [
      icon("upload", "btn__icon"), document.createTextNode(t("evidence.addFile")),
    ]);
    pickFile.addEventListener("click", function () {
      newFile.click();
    });
    newFile.addEventListener("change", function () {
      var f = newFile.files && newFile.files[0];
      if (!f) return;
      fileErr.hidden = true;
      readEvidenceFile(f, function (payload) {
        pendingFile = payload;
        fileLabel.textContent = payload.name + " · " + fmtBytes(payload.size);
      }, function (msg) {
        fileErr.textContent = msg;
        fileErr.hidden = false;
      });
    });

    var createBtn = el("button", { type: "button", class: "btn btn--primary btn--sm" }, [
      icon("plus", "btn__icon"), document.createTextNode(t("evidence.createAndAttach")),
    ]);
    createBtn.addEventListener("click", function () {
      if (!newName.value.trim()) {
        fileErr.textContent = t("evidence.nameRequired");
        fileErr.hidden = false;
        return;
      }
      EV.add({
        name: newName.value.trim(),
        url: newUrl.value.trim(),
        file: pendingFile,
        tags: [code],
      });
      newName.value = "";
      newUrl.value = "";
      pendingFile = null;
      fileLabel.textContent = "";
      fileErr.hidden = true;
      refresh();
    });

    var creator = el("details", { class: "ev-picker__new" }, [
      el("summary", { class: "ev-picker__new-head", text: t("evidence.addNew") }),
      el("div", { class: "ev-picker__new-body" }, [
        el("label", { class: "ev-field" }, [
          el("span", { class: "ev-field__label", text: t("evidence.name") }), newName,
        ]),
        el("label", { class: "ev-field" }, [
          el("span", { class: "ev-field__label", text: t("evidence.url") }), newUrl,
        ]),
        el("div", { class: "ev-newfile" }, [pickFile, fileLabel, newFile]),
        fileErr,
        el("p", { class: "ev-picker__new-note", text: t("evidence.addNewNote") }),
        createBtn,
      ]),
    ]);

    function renderAll() {
      renderAttached();
      renderLibrary();
      renderSuggestions();
    }

    holder.appendChild(attachedBox);
    holder.appendChild(libraryBox);
    holder.appendChild(suggestBox);
    holder.appendChild(creator);
    renderAll();
    return wrap(field, holder);
  }

  /* ------------------------------------------------------------------
     Program seçici / programme picker
     ------------------------------------------------------------------ */
  function programmePicker(field) {
    var PD = window.PROGRAM_DATA;
    var holder = el("div", { class: "picker" });

    function selected() {
      var v = S.get(field.id, []);
      return Array.isArray(v) ? v : [];
    }

    function persist(next) {
      S.set(field.id, next);
      showError(field.id, V.field(field, S));
      onDirty(field);
    }

    /* Seçilenler şeridi */
    var chips = el("div", { class: "picker__chips" });
    var countBadge = el("span", { class: "badge badge--accent" });

    function renderChips() {
      chips.innerHTML = "";
      var sel = selected();
      countBadge.textContent =
        field.maxItems === 1
          ? sel.length
            ? t("programme.selected")
            : t("programme.pickOne")
          : sel.length + " " + t("programme.selected");
      countBadge.classList.remove("badge--pulse");
      void countBadge.offsetWidth;
      countBadge.classList.add("badge--pulse");
      sel.forEach(function (code) {
        var p = PD.find(code);
        if (!p) return;
        var chip = el("span", { class: "chip" }, [
          document.createTextNode(pick(p.name)),
          levelTag(p),
        ]);
        var x = el("button", { type: "button", class: "chip__remove", "aria-label": t("repeater.remove") }, [icon("x")]);
        x.addEventListener("click", function () {
          persist(selected().filter(function (c) {
            return c !== code;
          }));
          renderAll();
        });
        chip.appendChild(x);
        chips.appendChild(chip);
      });
    }

    /** Tek bir program seçeneği. onToggle, ait olduğu grubun rozetini tazeler. */
    function programmeChoice(p, onToggle) {
      var input = el("input", { type: "checkbox", value: p.code });
      if (selected().indexOf(p.code) !== -1) input.checked = true;
      input.addEventListener("change", function () {
        /* Öz değerlendirme raporu tek bir program içindir. maxItems 1
           verildiğinde seçim eklenmez, DEĞİŞTİRİLİR: yeni seçim öncekinin
           yerini alır ve liste yeniden çizilerek eski kutu boşalır. */
        if (field.maxItems === 1) {
          if (!input.checked) {
            persist([]);
          } else {
            persist([p.code]);
          }
          renderAll();
          return;
        }
        var next = selected().slice();
        var i = next.indexOf(p.code);
        if (input.checked && i === -1) next.push(p.code);
        if (!input.checked && i !== -1) next.splice(i, 1);
        persist(next);
        renderChips();
        renderLevels(); // düzey sekmesindeki seçim sayacı tazelensin
        if (onToggle) onToggle();
      });
      return el("label", { class: "choice" }, [
        input,
        el("span", { class: "choice__body" }, [
          el("span", { class: "choice__label" }, [
            document.createTextNode(pick(p.name)),
            levelTag(p),
          ]),
          p.count
            ? el("span", {
                class: "choice__desc",
                text:
                  p.count +
                  " " +
                  (window.I18N.lang === "tr" ? "kurumda yürütülüyor" : "institutions offer this"),
              })
            : null,
        ]),
      ]);
    }

    /**
     * Programın öğretim düzeyi etiketi. Seçili programlar tek listede
     * toplandığından, hangisinin hangi düzeye ait olduğu her göründüğü
     * yerde okunabilir olmalıdır.
     */
    function levelTag(p) {
      var code = PD.levelOf(p);
      return el("span", {
        class: "level-tag level-tag--" + code,
        text: pick(PD.levelName(code)),
      });
    }

    /* Öğretim düzeyi filtresi.
       Seçim tüm düzeylerde ortak listede tutulur; filtre yalnızca hangi
       programların listeleneceğini daraltır. "Tümü" varsayılandır, böylece
       düzeyler arası fark listede doğrudan görülür. */
    var level = "hepsi";
    var levelBar = el("div", { class: "picker__levels", role: "tablist" });

    function renderLevels() {
      levelBar.innerHTML = "";
      var sel = selected();

      function tab(code, label, total, empty) {
        var chosen = sel.filter(function (c) {
          var p = PD.find(c);
          return p && (code === "hepsi" || PD.levelOf(p) === code);
        }).length;
        var b = el("button", {
          type: "button",
          role: "tab",
          class: "picker__level" + (code === level ? " picker__level--active" : "") +
            (empty ? " picker__level--empty" : ""),
          "aria-selected": code === level ? "true" : "false",
        }, [
          el("span", { text: label }),
          el("span", {
            class: "picker__level-count",
            text: chosen > 0 ? chosen + " / " + total : String(total),
          }),
        ]);
        b.addEventListener("click", function () {
          level = code;
          renderAll();
        });
        levelBar.appendChild(b);
      }

      var all = PD.levels.reduce(function (n, lv) {
        return n + PD.byLevel(lv.code).length;
      }, 0);
      tab("hepsi", t("programme.allLevels"), all, false);

      PD.levels.forEach(function (lv) {
        var n = PD.byLevel(lv.code).length;
        // Listesi henüz tanımlanmamış düzeyler de seçilebilir; içerik
        // yerine neden boş oldukları açıklanır.
        tab(lv.code, pick(lv.name), n, n === 0);
      });
    }

    /* Arama */
    var search = el("input", { class: "input", type: "search", placeholder: t("programme.search") });
    var areasBox = el("div", { class: "picker__areas" });

    /** Etkin filtreye göre uygun listeyi çizer. */
    function renderGroups() {
      areasBox.innerHTML = "";
      if (level === "hepsi") {
        // Her düzey kendi başlığı altında listelenir; gruplama ikisinde de
        // ISCED-F geniş alan → ayrıntılı alan biçimindedir.
        renderLevelSection("onlisans", function () {
          renderAreas("onlisans");
        });
        renderLevelSection("lisans", function () {
          renderAreas("lisans");
        });
        if (!areasBox.children.length) {
          areasBox.appendChild(el("p", { class: "repeater__empty", text: t("programme.none") }));
        }
        return;
      }
      if (level === "lisans" || level === "onlisans") {
        renderAreas(level);
        return fallbackIfEmpty();
      }
      areasBox.appendChild(el("p", { class: "repeater__empty", text: t("programme.levelEmpty") }));
    }

    function fallbackIfEmpty() {
      if (!areasBox.children.length) {
        areasBox.appendChild(el("p", { class: "repeater__empty", text: t("programme.none") }));
      }
    }

    /** "Tümü" görünümünde bir düzeyin bölümünü başlığıyla birlikte çizer. */
    function renderLevelSection(code, renderer) {
      var before = areasBox.children.length;
      var head = el("h3", { class: "picker__level-head" }, [
        el("span", { class: "level-tag level-tag--" + code, text: pick(PD.levelName(code)) }),
        el("span", {
          class: "picker__level-head-count",
          text: PD.byLevel(code).length + " " + t("programme.areaCount"),
        }),
      ]);
      areasBox.appendChild(head);
      renderer();
      // Arama sonucu bu düzeyde eşleşme bırakmadıysa başlığı da kaldır.
      if (areasBox.children.length === before + 1) areasBox.removeChild(head);
    }

    /**
     * ISCED-F geniş alan → ayrıntılı alan gruplaması.
     * levelCode verilirse yalnızca o düzeyin programları listelenir.
     */
    function renderAreas(levelCode) {
      // Kutuyu renderGroups temizler; burada yalnızca ekleme yapılır.
      var q = search.value.trim().toLocaleLowerCase("tr");
      var sel = selected();

      PD.areas.forEach(function (area) {
        var progs = PD.byArea(area.code, levelCode)
          .filter(function (p) {
            if (!q) return true;
            return (
              searchText(p.name).indexOf(q) !== -1 ||
              searchText(area.name).indexOf(q) !== -1 ||
              searchText(PD.fieldName(p.field)).indexOf(q) !== -1
            );
          })
          // Liste, gösterilen dile göre alfabetik kalsın.
          .sort(function (a, b) {
            return pick(a.name).localeCompare(pick(b.name), window.I18N.lang);
          });
        if (progs.length === 0) return;

        var chosenHere = progs.filter(function (p) {
          return sel.indexOf(p.code) !== -1;
        }).length;

        /* Programlar ISCED-F ayrıntılı alanlarına göre alt gruplanır */
        var body = el("div", {});
        var grouped = {};
        progs.forEach(function (p) {
          (grouped[p.field] = grouped[p.field] || []).push(p);
        });

        PD.fieldsOfArea(area.code).forEach(function (f) {
          var list = grouped[f.code];
          if (!list || !list.length) return;
          body.appendChild(
            el("h4", { class: "picker__field" }, [
              el("span", { class: "picker__field-code", text: f.code }),
              el("span", { class: "picker__field-name", text: pick(f.name) }),
            ])
          );
          var grid = el("div", { class: "picker__grid" });
          list.forEach(function (p) {
            grid.appendChild(programmeChoice(p, function () {
              updateAreaBadge();
            }));
          });
          body.appendChild(grid);
        });

        var areaBadge = el("span", { class: "badge badge--neutral" });
        function updateAreaBadge() {
          var s = selected();
          var n = progs.filter(function (p) {
            return s.indexOf(p.code) !== -1;
          }).length;
          areaBadge.textContent = n + " / " + progs.length;
          areaBadge.className = "badge " + (n > 0 ? "badge--success" : "badge--neutral");
        }
        updateAreaBadge();

        var toggleAll = el("button", { type: "button", class: "btn btn--ghost btn--sm" }, [
          document.createTextNode(chosenHere === progs.length ? t("programme.clearAll") : t("programme.selectAll")),
        ]);
        toggleAll.addEventListener("click", function (e) {
          e.preventDefault();
          var next = selected().slice();
          var allIn = progs.every(function (p) {
            return next.indexOf(p.code) !== -1;
          });
          progs.forEach(function (p) {
            var i = next.indexOf(p.code);
            if (allIn && i !== -1) next.splice(i, 1);
            if (!allIn && i === -1) next.push(p.code);
          });
          persist(next);
          renderAll();
        });

        var details = el("details", { class: "picker__area glass", open: !!q || chosenHere > 0 });
        var summary = el("summary", { class: "picker__area-head" }, [
          el("span", { class: "picker__area-name", text: pick(area.name) }),
          areaBadge,
        ]);
        details.appendChild(summary);
        details.appendChild(
          el("div", { class: "picker__area-body" }, [
            el("div", { class: "picker__area-actions" }, [
              field.maxItems === 1 ? null : toggleAll,
            ]),
            body,
          ])
        );
        areasBox.appendChild(details);
      });
    }

    function renderAll() {
      renderChips();
      renderLevels();
      renderGroups();
    }

    search.addEventListener("input", renderGroups);

    holder.appendChild(levelBar);
    holder.appendChild(el("div", { class: "picker__bar" }, [search, countBadge]));
    holder.appendChild(chips);
    holder.appendChild(areasBox);
    renderAll();
    return wrap(field, holder);
  }

  /* ------------------------------------------------------------------
     Programa özel ölçütler / programme-specific criteria
     ------------------------------------------------------------------ */
  function fileUpload(field) {
    var maxMB = field.maxSizeMB || 4;
    var holder = el("div", {});
    var input = el("input", {
      type: "file",
      class: "sr-only",
      id: "f_" + safeId(field.id),
      accept: field.accept || "",
    });

    function current() {
      var v = S.get(field.id);
      return v && typeof v === "object" ? v : null;
    }

    function fmtSize(bytes) {
      if (bytes < 1024) return bytes + " B";
      if (bytes < 1048576) return (bytes / 1024).toFixed(0) + " KB";
      return (bytes / 1048576).toFixed(1) + " MB";
    }

    var zone = el("div", { class: "dropzone", tabindex: "0", role: "button" });

    function render() {
      zone.innerHTML = "";
      var f = current();

      if (f) {
        zone.classList.add("dropzone--filled");
        zone.appendChild(
          el("div", { class: "dropzone__file" }, [
            el("span", { class: "dropzone__file-icon" }, [icon("check")]),
            el("span", { class: "dropzone__file-meta" }, [
              el("strong", { class: "dropzone__file-name", text: f.name }),
              el("span", { class: "dropzone__file-size", text: fmtSize(f.size) + (f.data ? "" : " · " + (window.I18N.lang === "tr" ? "yalnızca bilgi" : "metadata only")) }),
            ]),
            (function () {
              var rm = el("button", {
                type: "button",
                class: "btn btn--ghost btn--icon",
                "aria-label": t("repeater.remove"),
                title: t("repeater.remove"),
              }, [icon("trash", "btn__icon")]);
              rm.addEventListener("click", function (e) {
                e.stopPropagation();
                S.set(field.id, null);
                showError(field.id, V.field(field, S));
                onDirty(field);
                render();
              });
              return rm;
            })(),
          ])
        );
      } else {
        zone.classList.remove("dropzone--filled");
        zone.appendChild(el("span", { class: "dropzone__icon" }, [icon("upload")]));
        zone.appendChild(
          el("span", {
            class: "dropzone__title",
            text: window.I18N.lang === "tr" ? "Dosyayı sürükleyip bırakın veya seçmek için tıklayın" : "Drag and drop the file, or click to choose",
          })
        );
        zone.appendChild(
          el("span", {
            class: "dropzone__hint",
            text: (field.accept || "PDF, DOC, DOCX") + " · " + (window.I18N.lang === "tr" ? "en fazla" : "max") + " " + maxMB + " MB",
          })
        );
      }
    }

    function accept(file) {
      if (!file) return;
      if (file.size > maxMB * 1048576) {
        showError(
          field.id,
          window.I18N.lang === "tr"
            ? "Dosya çok büyük (" + fmtSize(file.size) + "). En fazla " + maxMB + " MB yükleyebilirsiniz; daha büyük dosyalar için bağlantı alanını kullanınız."
            : "File too large (" + fmtSize(file.size) + "). Maximum is " + maxMB + " MB; use the link field for larger files."
        );
        return;
      }
      var reader = new FileReader();
      reader.onload = function () {
        var payload = {
          name: file.name,
          size: file.size,
          type: file.type,
          data: String(reader.result),
          uploadedAt: new Date().toISOString(),
        };
        try {
          S.set(field.id, payload);
        } catch (e) {
          // Depolama kotası dolduysa yalnızca üstveriyi sakla
          delete payload.data;
          S.set(field.id, payload);
        }
        showError(field.id, V.field(field, S));
        onDirty(field);
        render();
      };
      reader.readAsDataURL(file);
    }

    input.addEventListener("change", function () {
      accept(input.files && input.files[0]);
      input.value = "";
    });

    zone.addEventListener("click", function () {
      input.click();
    });
    zone.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        input.click();
      }
    });
    ["dragenter", "dragover"].forEach(function (evt) {
      zone.addEventListener(evt, function (e) {
        e.preventDefault();
        zone.classList.add("dropzone--over");
      });
    });
    ["dragleave", "drop"].forEach(function (evt) {
      zone.addEventListener(evt, function (e) {
        e.preventDefault();
        zone.classList.remove("dropzone--over");
      });
    });
    zone.addEventListener("drop", function (e) {
      accept(e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]);
    });

    render();
    holder.appendChild(zone);
    holder.appendChild(input);
    return wrap(field, holder);
  }

  /* ------------------------------------------------------------------
     Dağıtıcı / dispatcher
     ------------------------------------------------------------------ */
  /* ------------------------------------------------------------------
     Alt ölçüt kartı / sub-criterion card

     Adımın başında duran, salt okunur ölçüt metni: ana ölçüt, alt ölçüt
     ifadesi, koşulluluk notu, indikatörler, beklenen kanıt örnekleri ve
     YÖKAK rubrik karşılıkları. İkinci dildeki resmî metin de referans
     olarak gösterilir — ölçütün kendisi resmî metindir, çeviriyle
     birlikte okunabilmelidir.
     ------------------------------------------------------------------ */
  function sarCriterion(field) {
    var sub = window.SAR.bySubCode(field.sub);
    if (!sub) return el("div");

    var other = window.I18N.lang === "tr" ? "en" : "tr";
    var box = el("div", { class: "criterion glass" });

    box.appendChild(
      el("div", { class: "criterion__head" }, [
        el("span", { class: "criterion__eyebrow", text: sub.main.code + ". " + pick(sub.main.title) }),
        el("span", { class: "criterion__code", text: sub.code }),
        sub.optional
          ? el("span", { class: "badge badge--warning", text: t("criterion.optionalBadge") })
          : null,
      ])
    );

    box.appendChild(el("blockquote", { class: "criterion__text", text: pick(sub.text) }));
    box.appendChild(el("p", { class: "criterion__text-alt", text: sub.text[other] }));

    if (sub.scopeNote) {
      box.appendChild(
        el("p", { class: "criterion__scope" }, [
          icon("info", "criterion__scope-icon"),
          el("span", { text: pick(sub.scopeNote) }),
        ])
      );
    }

    if (sub.indicators && sub.indicators.length) {
      var ind = el("div", { class: "criterion__block" });
      ind.appendChild(el("p", { class: "criterion__block-title", text: t("criterion.indicators") }));
      ind.appendChild(el("p", { class: "criterion__block-hint", text: t("criterion.indicatorsHint") }));
      var ol = el("ol", { class: "criterion__indicators" });
      sub.indicators.forEach(function (i) {
        ol.appendChild(el("li", { text: pick(i) }));
      });
      ind.appendChild(ol);
      box.appendChild(ind);
    }

    var meta = el("div", { class: "criterion__meta" });

    var ev = el("details", { class: "criterion__fold" });
    ev.appendChild(el("summary", { class: "criterion__fold-head", text: t("criterion.expectedEvidence") }));
    ev.appendChild(el("p", { class: "criterion__fold-body", text: pick(sub.evidence) }));
    meta.appendChild(ev);

    if (sub.rubrics && sub.rubrics.length) {
      var rb = el("details", { class: "criterion__fold" });
      rb.appendChild(el("summary", { class: "criterion__fold-head", text: t("criterion.rubric") }));
      var rbody = el("div", { class: "criterion__fold-body" });
      rbody.appendChild(el("p", { class: "criterion__block-hint", text: t("criterion.rubricHint") }));
      var codes = el("div", { class: "criterion__rubrics" });
      sub.rubrics.forEach(function (c) {
        codes.appendChild(
          el("span", {
            class: "ev-tag" + (c === sub.rubric ? " ev-tag--primary" : ""),
            text: c,
          })
        );
      });
      rbody.appendChild(codes);
      rb.appendChild(rbody);
      meta.appendChild(rb);
    }

    box.appendChild(meta);
    return box;
  }

  /* ------------------------------------------------------------------
     Uyum düzeyi seçimi / compliance selector

     Üç düzeyli ölçek; "Uygulanamaz" yalnızca koşullu alt ölçütlerde
     listelenir. Seçim adımdaki gerekçe, iyileştirme ve kanıt alanlarının
     görünürlüğünü değiştirdiğinden adım yerinde tazelenir.
     ------------------------------------------------------------------ */
  function compliance(field) {
    var sub = window.SAR.bySubCode(field.sub);
    var scale = window.SAR.scaleFor(sub);
    var group = el("div", {
      class: "compliance",
      role: "radiogroup",
      "aria-label": fieldLabel(field),
    });
    var current = S.get(field.id, "");

    scale.forEach(function (c, i) {
      var input = el("input", {
        type: "radio",
        name: "r_" + safeId(field.id),
        value: c.value,
        id: "f_" + safeId(field.id) + "_" + i,
        class: "sr-only",
      });
      if (current === c.value) input.checked = true;

      var card = el("label", { class: "compliance__option compliance__option--" + c.tone }, [
        input,
        el("span", { class: "compliance__mark", "aria-hidden": "true" }),
        el("span", { class: "compliance__body" }, [
          el("span", { class: "compliance__label", text: pick(c.label) }),
          el("span", { class: "compliance__desc", text: pick(c.desc) }),
        ]),
      ]);
      input.addEventListener("change", function () {
        if (!input.checked) return;
        /* commit zaten onDirty'yi çağırır; uyum düzeyi koşullu alanları
           açıp kapadığı için adımın yeniden çizilmesini app.js üstlenir. */
        commit(field, c.value);
      });
      group.appendChild(card);
    });

    return wrap(field, group);
  }

  /* ------------------------------------------------------------------
     Uyum özeti / compliance summary

     Sonuç sekmesinde, 57 alt ölçütün değerlendirme dağılımını ve ana
     ölçüt bazında uyum oranını gösterir. Salt okunurdur; veri alt ölçüt
     adımlarındaki seçimlerden gelir.
     ------------------------------------------------------------------ */
  function complianceSummary(field) {
    var SAR = window.SAR;
    var overall = V.compliance(S);
    var box = el("div", { class: "csum glass" });

    box.appendChild(
      el("div", { class: "csum__head" }, [
        el("h3", { class: "csum__title", text: t("compliance.title") }),
        el("span", { class: "csum__rate", title: t("compliance.rateHint") }, [
          el("strong", { class: "count-roll", text: overall.percent + "%" }),
          el("span", { class: "csum__rate-label", text: t("compliance.rate") }),
        ]),
      ])
    );

    /* Genel dağılım — her uyum düzeyi kendi tonuyla. */
    var legend = el("div", { class: "csum__legend" });
    SAR.complianceScale.forEach(function (c) {
      var n = overall.counts[c.value] || 0;
      legend.appendChild(
        el("span", { class: "csum__chip csum__chip--" + c.tone }, [
          el("strong", { text: String(n) }),
          el("span", { text: pick(c.label) }),
        ])
      );
    });
    legend.appendChild(
      el("span", { class: "csum__chip csum__chip--empty" }, [
        el("strong", { text: String(overall.counts.empty) }),
        el("span", { text: t("compliance.notAssessed") }),
      ])
    );
    box.appendChild(legend);

    /* Ana ölçüt bazında yığılmış çubuk. */
    var table = el("div", { class: "csum__rows" });
    table.appendChild(el("p", { class: "csum__rows-title", text: t("compliance.byCriterion") }));

    SAR.criteria.forEach(function (main) {
      var st = V.complianceOf(main, S);
      var bar = el("span", { class: "csum__bar" });
      ["compatible", "partial", "non", "na", "empty"].forEach(function (key) {
        var n = st.counts[key] || 0;
        if (!n) return;
        var rec = SAR.compliance(key);
        bar.appendChild(
          el("span", {
            class: "csum__seg csum__seg--" + (rec ? rec.tone : "empty"),
            style: "flex:" + n,
            title: (rec ? pick(rec.label) : t("compliance.notAssessed")) + ": " + n,
          })
        );
      });

      var row = el("button", { type: "button", class: "csum__row" }, [
        el("span", { class: "csum__row-code", text: main.code }),
        el("span", { class: "csum__row-name", text: pick(main.title), title: pick(main.title) }),
        bar,
        el("span", {
          class: "csum__row-pct",
          text: st.scored ? st.percent + "%" : "—",
        }),
      ]);
      row.addEventListener("click", function () {
        if (window.App && window.App.goTo) window.App.goTo({ tab: "c" + main.code, step: 0 });
      });
      table.appendChild(row);
    });

    box.appendChild(table);
    return box;
  }

  function render(field) {
    if (!V.isVisible(field, S)) return null;
    switch (field.type) {
      case "text":
      case "email":
      case "url":
      case "tel":
      case "number":
      case "date":
        return textInput(field);
      case "textarea":
        return textarea(field);
      case "select":
        return select(field);
      case "radio":
        return radio(field);
      case "checkboxes":
        return checkboxes(field);
      case "repeater":
        return repeater(field);
      case "programme-picker":
        return programmePicker(field);
      case "sar-criterion":
        return sarCriterion(field);
      case "compliance":
        return compliance(field);
      case "compliance-summary":
        return complianceSummary(field);
      case "file-upload":
        return fileUpload(field);
      case "evidence-library":
        return evidenceLibrary(field);
      case "evidence-picker":
        return evidencePicker(field);
      default:
        return null;
    }
  }

  return {
    el: el,
    icon: icon,
    render: render,
    showError: showError,
    safeId: safeId,
    onDirty: function (fn) {
      onDirty = fn;
    },
  };
})();
