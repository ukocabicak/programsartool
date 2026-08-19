/* ==========================================================================
   Store — veri saklama, otomatik kayıt, içe/dışa aktarma
   State, autosave, import/export
   ========================================================================== */

window.Store = (function () {
  "use strict";

  var KEY = "yokak.programme.sar.v1";
  var PREFS = "yokak.programme.sar.prefs.v1";
  var data = {};
  var listeners = [];
  var saveTimer = null;
  var lastSaved = null;

  /* ------------------------------------------------------------------
     Noktalı yol yardımcıları / dotted-path helpers
     "sar.3.5.narrative" gibi yolları güvenle okur ve yazar.
     ------------------------------------------------------------------ */
  function get(path, fallback) {
    var parts = String(path).split(".");
    var node = data;
    for (var i = 0; i < parts.length; i++) {
      if (node === null || typeof node !== "object") return fallback;
      node = node[parts[i]];
      if (node === undefined) return fallback;
    }
    return node === undefined ? fallback : node;
  }

  function set(path, value) {
    var parts = String(path).split(".");
    var node = data;
    for (var i = 0; i < parts.length - 1; i++) {
      var k = parts[i];
      if (node[k] === null || typeof node[k] !== "object") node[k] = {};
      node = node[k];
    }
    node[parts[parts.length - 1]] = value;
    scheduleSave();
    emit(path, value);
  }

  function emit(path, value) {
    listeners.forEach(function (fn) {
      try {
        fn(path, value);
      } catch (e) {
        /* dinleyici hatası akışı durdurmasın */
      }
    });
  }

  /* ------------------------------------------------------------------
     Kalıcılık / persistence
     ------------------------------------------------------------------ */
  function scheduleSave() {
    if (saveTimer) clearTimeout(saveTimer);
    document.documentElement.setAttribute("data-saving", "true");
    saveTimer = setTimeout(save, 600);
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
      lastSaved = new Date();
    } catch (e) {
      /* kota dolu veya gizli mod — sessizce geç */
    }
    document.documentElement.removeAttribute("data-saving");
    emit("__saved", lastSaved);
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (raw) {
        data = JSON.parse(raw) || {};
        lastSaved = new Date();
      }
    } catch (e) {
      data = {};
    }
    return data;
  }

  /* ------------------------------------------------------------------
     Tercihler (dil, tema) — form verisinden ayrı tutulur
     ------------------------------------------------------------------ */
  function getPrefs() {
    try {
      return JSON.parse(localStorage.getItem(PREFS)) || {};
    } catch (e) {
      return {};
    }
  }

  function setPref(key, value) {
    var p = getPrefs();
    p[key] = value;
    try {
      localStorage.setItem(PREFS, JSON.stringify(p));
    } catch (e) {
      /* yoksay */
    }
  }

  /* ------------------------------------------------------------------
     Dışa / içe aktarma
     ------------------------------------------------------------------ */
  function exportJSON() {
    return JSON.stringify(
      {
        _meta: {
          format: "YOKAK-Programme-SAR",
          version: 1,
          // Sistem yalnızca program öz değerlendirmesini kapsar.
          scope: "programme-self-assessment",
          criteria: window.SAR ? window.SAR.version : null,
          exportedAt: new Date().toISOString(),
        },
        data: data,
      },
      null,
      2
    );
  }

  function download(filename) {
    var blob = new Blob([exportJSON()], { type: "application/json;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename || defaultFilename();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 1000);
  }

  function defaultFilename() {
    var ad =
      get("qualification.name", "") ||
      get("institution.department", "") ||
      "odr";
    var slug = String(ad)
      .toLowerCase()
      .replace(/[çğıöşü]/g, function (c) {
        return { "ç": "c", "ğ": "g", "ı": "i", "ö": "o", "ş": "s", "ü": "u" }[c];
      })
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);
    var d = new Date().toISOString().slice(0, 10);
    return "yokak-odr-" + (slug || "rapor") + "-" + d + ".json";
  }

  function importJSON(text) {
    var parsed = JSON.parse(text);
    // Hem sarmalanmış {_meta, data} hem de düz nesne kabul edilir
    var incoming =
      parsed && typeof parsed === "object" && parsed.data && parsed._meta
        ? parsed.data
        : parsed;
    if (!incoming || typeof incoming !== "object" || Array.isArray(incoming)) {
      throw new Error("Invalid report file");
    }
    data = incoming;
    save();
    emit("__replaced", data);
    return data;
  }

  function reset() {
    data = {};
    try {
      localStorage.removeItem(KEY);
    } catch (e) {
      /* yoksay */
    }
    lastSaved = null;
    emit("__replaced", data);
  }

  return {
    load: load,
    save: save,
    get: get,
    set: set,
    all: function () {
      return data;
    },
    onChange: function (fn) {
      listeners.push(fn);
    },
    lastSaved: function () {
      return lastSaved;
    },
    exportJSON: exportJSON,
    importJSON: importJSON,
    download: download,
    reset: reset,
    getPrefs: getPrefs,
    setPref: setPref,
  };
})();
