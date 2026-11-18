/* Site theme: "deck" (Command Deck, the default), "archive" (printed comic) or "programme" (dark cinema programme).
   Loaded synchronously in <head> so the saved theme is applied before the page is drawn (no flash).
   Everyone starts on Command Deck until they pick a theme; that choice is then kept.
   The storage key is versioned: choices saved before Deck became the default (owner decision 2026-11-19)
   used the old key, which is ignored and cleared, so every returning visitor sees Deck once. */
(function () {
  const KEY = "marvel-archive:theme-v2";
  try { localStorage.removeItem("marvel-archive:theme"); } catch { /* storage unavailable */ }
  const THEMES = ["deck", "archive", "programme"];
  const DEFAULT_THEME = "deck";
  // Each theme's extra fonts are only downloaded once that theme is actually used.
  const THEME_FONTS = {
    deck: "https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700;800&family=Big+Shoulders+Display:wght@300;500;800;900&display=swap",
    programme: "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Public+Sans:wght@400;500;600;700&display=swap",
  };

  function savedTheme() {
    try {
      const value = localStorage.getItem(KEY);
      return THEMES.includes(value) ? value : null;
    } catch { return null; }
  }

  function loadThemeFonts(theme) {
    if (!THEME_FONTS[theme] || document.getElementById(`${theme}-fonts`)) return;
    const link = document.createElement("link");
    link.id = `${theme}-fonts`;
    link.rel = "stylesheet";
    link.href = THEME_FONTS[theme];
    document.head.appendChild(link);
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    loadThemeFonts(theme);
    document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  }

  window.siteTheme = {
    get: () => document.documentElement.dataset.theme,
    set(theme) {
      if (!THEMES.includes(theme)) return;
      try { localStorage.setItem(KEY, theme); } catch { /* storage unavailable: theme lasts for this page only */ }
      applyTheme(theme);
    },
  };

  applyTheme(savedTheme() || DEFAULT_THEME);
})();
