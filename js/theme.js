/* The site has one design (the "deck" theme, owner decision 2026-11-19). This runs in <head> before the page is
   drawn and sets <html data-theme="deck">, which every stylesheet is scoped to. The Archive and Programme themes
   and the theme switch were removed, so old saved theme choices are cleared. */
(function () {
  document.documentElement.dataset.theme = "deck";
  try {
    localStorage.removeItem("marvel-archive:theme");
    localStorage.removeItem("marvel-archive:theme-v2");
  } catch { /* storage unavailable */ }
})();
