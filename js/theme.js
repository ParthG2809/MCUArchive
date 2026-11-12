/* Site theme: "archive" (the printed-comic design) or "programme" (the dark cinema-programme design).
   Loaded synchronously in <head> so the saved theme is applied before the page is drawn (no flash).
   First visit: follows the device's light/dark setting until the visitor picks a theme. */
(function () {
  const KEY = "marvel-archive:theme";
  const THEMES = ["archive", "programme"];
  const PROGRAMME_FONTS = "https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Public+Sans:wght@400;500;600;700&display=swap";
  const darkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  function savedTheme() {
    try {
      const value = localStorage.getItem(KEY);
      return THEMES.includes(value) ? value : null;
    } catch { return null; }
  }

  // The Programme fonts are only downloaded once that theme is actually used.
  function loadProgrammeFonts() {
    if (document.getElementById("programme-fonts")) return;
    const link = document.createElement("link");
    link.id = "programme-fonts";
    link.rel = "stylesheet";
    link.href = PROGRAMME_FONTS;
    document.head.appendChild(link);
  }

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    if (theme === "programme") loadProgrammeFonts();
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

  applyTheme(savedTheme() || (darkScheme.matches ? "programme" : "archive"));
  darkScheme.addEventListener?.("change", (e) => {
    if (!savedTheme()) applyTheme(e.matches ? "programme" : "archive");
  });
})();
