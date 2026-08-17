/* ==========================================================
   Journal language filter — client-side, no page reload.
   Posts are tagged via front matter: lang: en  or  lang: es
   Defaults to whichever button has class="is-active" in the HTML.
   ========================================================== */

(function () {
  const buttons = document.querySelectorAll(".lang-filter button");
  const items = document.querySelectorAll(".index-list__item");
  if (!buttons.length || !items.length) return;

  function applyFilter(lang) {
    items.forEach((item) => {
      const show = lang === "all" || item.dataset.lang === lang;
      item.style.display = show ? "" : "none";
    });
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      applyFilter(btn.dataset.lang);
    });
  });

  // Apply whichever filter is marked active by default on page load
  const initialBtn = document.querySelector(".lang-filter button.is-active") || buttons[0];
  applyFilter(initialBtn.dataset.lang);
})();
