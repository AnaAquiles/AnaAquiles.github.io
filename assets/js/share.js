/* ==========================================================
   Share widget — native share sheet where supported,
   otherwise direct links + copy-to-clipboard fallback.
   ========================================================== */

(function () {
  const mount = document.getElementById("share-buttons");
  if (!mount) return;

  const url = window.location.href;
  const title = document.title;

  // Prefer the native OS share sheet when available (mobile browsers, some desktop)
  if (navigator.share) {
    const btn = document.createElement("button");
    btn.className = "share-btn share-btn--native";
    btn.textContent = "Share";
    btn.addEventListener("click", () => {
      navigator.share({ title, url }).catch(() => {}); // ignore user-cancelled shares
    });
    mount.appendChild(btn);
    return;
  }

  // Fallback: direct share links + copy link
  const links = [
    { label: "X", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` },
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` },
    { label: "Email", href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}` }
  ];

  links.forEach(({ label, href }) => {
    const a = document.createElement("a");
    a.className = "share-btn";
    a.href = href;
    a.target = "_blank";
    a.rel = "noopener";
    a.textContent = label;
    mount.appendChild(a);
  });

  const copyBtn = document.createElement("button");
  copyBtn.className = "share-btn";
  copyBtn.textContent = "Copy link";
  copyBtn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(url);
      const original = copyBtn.textContent;
      copyBtn.textContent = "Copied ✓";
      setTimeout(() => (copyBtn.textContent = original), 1500);
    } catch (err) {
      console.error("Could not copy link:", err);
    }
  });
  mount.appendChild(copyBtn);
})();
