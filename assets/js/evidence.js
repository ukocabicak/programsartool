/* ==========================================================================
   Evidence — merkezî kanıt koleksiyonu / central evidence library

   Rapordaki tüm kanıtlar tek bir listede tutulur (`evidence.library`).
   Her kanıt bir veya birden çok ALT ÖLÇÜTE etiketlenebilir; alt ölçüt
   adımları kendi kanıt listelerini tutmaz, koleksiyondan etikete göre
   okurlar. Bağ bu yüzden iki yönlü çalışır:

     • Belgeler bölümünde bir kanıta alt ölçüt etiketi eklemek, o kanıtı
       ilgili alt ölçüt adımında anında görünür kılar.
     • Alt ölçüt adımında kanıt eklemek, kanıtı koleksiyona yazar ve o
       adımın etiketini otomatik olarak iliştirir.

   Kanıt kaydı:
     { id, name, url, file: {name,size,data}, note, tags: ["3.5", …] }

   `tags` içindeki OTHER değeri "tasnif dışı" anlamına gelir: kanıt
   koleksiyonda durur ama hiçbir alt ölçüte bağlanmaz.
   ========================================================================== */

window.Evidence = (function () {
  "use strict";

  var KEY = "evidence.library";
  var OTHER = "other";

  function S() {
    return window.Store;
  }

  /** Koleksiyonun tamamı. Her zaman dizi döner. */
  function all() {
    var v = S().get(KEY);
    return Array.isArray(v) ? v : [];
  }

  function save(list) {
    S().set(KEY, list);
  }

  /** Çakışmayan kimlik üretir; mevcut kayıtların en büyüğünden devam eder. */
  function nextId(list) {
    var max = 0;
    list.forEach(function (it) {
      var m = /^EV-(\d+)$/.exec(it.id || "");
      if (m) max = Math.max(max, parseInt(m[1], 10));
    });
    return "EV-" + (max + 1);
  }

  function find(id) {
    var list = all();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  /** Bir alt ölçüte etiketlenmiş kanıtlar. */
  function bySub(code) {
    return all().filter(function (it) {
      return (it.tags || []).indexOf(code) !== -1;
    });
  }

  /** Hiçbir alt ölçüte bağlanmamış kanıtlar (tasnif dışı ya da etiketsiz). */
  function unclassified() {
    return all().filter(function (it) {
      var tags = (it.tags || []).filter(function (t) {
        return t !== OTHER;
      });
      return tags.length === 0;
    });
  }

  /** Kanıt ekler ve üretilen kimliği döner. */
  function add(item) {
    var list = all().slice();
    var rec = {
      id: nextId(list),
      name: item.name || "",
      url: item.url || "",
      file: item.file || null,
      note: item.note || "",
      tags: (item.tags || []).slice(),
    };
    list.push(rec);
    save(list);
    return rec.id;
  }

  /** Var olan kanıtın alanlarını günceller. */
  function update(id, patch) {
    var list = all().slice();
    for (var i = 0; i < list.length; i++) {
      if (list[i].id !== id) continue;
      var next = {};
      Object.keys(list[i]).forEach(function (k) {
        next[k] = list[i][k];
      });
      Object.keys(patch).forEach(function (k) {
        next[k] = patch[k];
      });
      list[i] = next;
      save(list);
      return true;
    }
    return false;
  }

  function remove(id) {
    save(
      all().filter(function (it) {
        return it.id !== id;
      })
    );
  }

  /** Alt ölçütü kanıta ekler / kanıttan çıkarır. */
  function tag(id, code) {
    var it = find(id);
    if (!it) return false;
    var tags = (it.tags || []).slice();
    if (tags.indexOf(code) === -1) tags.push(code);
    // Bir alt ölçüte bağlanan kanıt artık tasnif dışı değildir.
    if (code !== OTHER) {
      tags = tags.filter(function (t) {
        return t !== OTHER;
      });
    }
    return update(id, { tags: tags });
  }

  function untag(id, code) {
    var it = find(id);
    if (!it) return false;
    return update(id, {
      tags: (it.tags || []).filter(function (t) {
        return t !== code;
      }),
    });
  }

  /* ------------------------------------------------------------------
     Dış kaynaklar / external sources

     Formun bazı adımları kendi belge alanlarını taşır: program tanıtım
     ve müfredat belgeleri ile önceki dış değerlendirme belgeleri. Bunlar
     alt ölçüt tasnifine girmediğinden koleksiyona kopyalanmaz —
     koleksiyonda kendi klasörleriyle *türetilerek* listelenir. Kayıt tek
     yerde durduğu için eşitleme sorunu doğmaz; kanıt hangi adımda
     giriliyorsa orada düzenlenir.
     ------------------------------------------------------------------ */
  var SOURCES = [
    {
      tag: "src.programmeDocs",
      label: {
        tr: "Program Tanıtım ve Müfredat Belgeleri",
        en: "Programme Information and Curriculum Documents",
      },
      step: { tab: "programme", step: "documents" },
      read: function (store) {
        return rowsOf(store, "programme.documents", function (r, i) {
          return {
            id: "SRC-programmeDocs-" + i,
            name: r.name || "",
            url: r.url || "",
            file: r.file || null,
            note: r.kind || "",
          };
        });
      },
    },
    {
      tag: "src.priorReview",
      label: {
        tr: "Önceki Dış Değerlendirme Belgeleri",
        en: "Previous External Evaluation Documents",
      },
      step: { tab: "programme", step: "documents" },
      when: hasPriorReview,
      read: function (store) {
        return rowsOf(store, "programme.priorReviews", function (r, i) {
          return {
            id: "SRC-priorReview-" + i,
            name: r.name || "",
            url: r.url || "",
            file: r.file || null,
            note: [r.agency, r.year].filter(Boolean).join(" · "),
          };
        });
      },
    },
  ];

  function rowsOf(store, path, map) {
    var v = store.get(path);
    return Array.isArray(v) ? v.map(map) : [];
  }

  /* "Hayır" yanıtından sonra alanlar gizlenir ama daha önce girilmiş
     değerler mağazada kalabilir; gizli adımın belgeleri listelenmemeli. */
  function hasPriorReview(store) {
    return store.get("programme.hasPriorReview") === "evet";
  }

  /** Dış kaynak klasörleri; her biri `items` ile birlikte döner. */
  function sources() {
    var store = S();
    return SOURCES.map(function (src) {
      var items = src.when && !src.when(store) ? [] : src.read(store);
      return {
        tag: src.tag,
        label: src.label,
        step: src.step,
        items: items.filter(isUsable).map(function (it) {
          it.external = src.tag;
          it.tags = [src.tag];
          return it;
        }),
      };
    });
  }

  /** Dış kaynaklardan türeyen tüm kanıtlar, tek listede. */
  function externals() {
    var out = [];
    sources().forEach(function (s) {
      out = out.concat(s.items);
    });
    return out;
  }

  function sourceLabel(tag) {
    for (var i = 0; i < SOURCES.length; i++) {
      if (SOURCES[i].tag === tag) return SOURCES[i].label;
    }
    return null;
  }

  /** Kanıt en az bir erişim yolu taşımalı: bağlantı veya dosya. */
  function isUsable(it) {
    if (!it) return false;
    if (!it.name || !String(it.name).trim()) return false;
    return !!(String(it.url || "").trim() || (it.file && it.file.name));
  }

  /**
   * Etiket okunabilir hâle getirilir. Alt ölçüt kodları olduğu gibi,
   * türetilmiş klasörler kendi adlarıyla gösterilir.
   */
  function tagLabel(code) {
    if (code === OTHER) return window.I18N.t("evidence.other");
    var src = sourceLabel(code);
    if (src) return window.I18N.pick(src);
    return code;
  }

  return {
    OTHER: OTHER,
    all: all,
    find: find,
    bySub: bySub,
    unclassified: unclassified,
    sources: sources,
    externals: externals,
    sourceLabel: sourceLabel,
    tagLabel: tagLabel,
    add: add,
    update: update,
    remove: remove,
    tag: tag,
    untag: untag,
    isUsable: isUsable,
  };
})();
