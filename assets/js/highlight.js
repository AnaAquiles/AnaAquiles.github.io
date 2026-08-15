/* ==========================================================
   Highlight & heatmap engine
   - Readers select text inside .post-content and click "Highlight"
   - Selections are saved to Firestore, keyed by post slug
   - On load, all highlights for the post are fetched and merged
     into a heatmap: the more people who highlighted a passage,
     the darker/more visible the mark.
   ========================================================== */

(function () {
  if (!window.FIREBASE_CONFIG || !window.FIREBASE_CONFIG.apiKey || window.FIREBASE_CONFIG.apiKey === "REPLACE_ME") {
    console.warn("Highlighting disabled: Firebase config not set in _config.yml");
    return;
  }

  firebase.initializeApp(window.FIREBASE_CONFIG);
  const db = firebase.firestore();

  const container = document.querySelector(".post-content");
  if (!container) return;

  const postId = window.location.pathname;

  /* ---------- helpers: text offset <-> DOM range ---------- */

  function getTextOffset(root, targetNode, targetOffset) {
    let offset = 0;
    let found = false;
    function walk(node) {
      if (found) return;
      if (node.nodeType === Node.TEXT_NODE) {
        if (node === targetNode) {
          offset += targetOffset;
          found = true;
          return;
        }
        offset += node.textContent.length;
      } else {
        for (const child of node.childNodes) {
          walk(child);
          if (found) return;
        }
      }
    }
    walk(root);
    return offset;
  }

  function getSelectionOffsets() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || sel.rangeCount === 0) return null;
    const range = sel.getRangeAt(0);
    if (!container.contains(range.commonAncestorContainer)) return null;

    const start = getTextOffset(container, range.startContainer, range.startOffset);
    const end = getTextOffset(container, range.endContainer, range.endOffset);
    if (start === end) return null;
    return { start: Math.min(start, end), end: Math.max(start, end) };
  }

  /* ---------- floating "Highlight" button ---------- */

  const popover = document.createElement("button");
  popover.className = "highlight-popover";
  popover.textContent = "Highlight";
  popover.style.display = "none";
  document.body.appendChild(popover);

  let pendingOffsets = null;

  container.addEventListener("mouseup", () => {
    const offsets = getSelectionOffsets();
    if (!offsets) {
      popover.style.display = "none";
      return;
    }
    pendingOffsets = offsets;
    const sel = window.getSelection();
    const rect = sel.getRangeAt(0).getBoundingClientRect();
    popover.style.top = `${window.scrollY + rect.top - 40}px`;
    popover.style.left = `${window.scrollX + rect.left + rect.width / 2}px`;
    popover.style.display = "block";
  });

  document.addEventListener("mousedown", (e) => {
    if (e.target !== popover) popover.style.display = "none";
  });

  popover.addEventListener("mousedown", (e) => e.preventDefault()); // keep selection alive

  popover.addEventListener("click", async () => {
    if (!pendingOffsets) return;
    popover.textContent = "Saving…";
    try {
      await db.collection("highlights").add({
        postId,
        start: pendingOffsets.start,
        end: pendingOffsets.end,
        ts: firebase.firestore.FieldValue.serverTimestamp()
      });
      applyHeatmap([...cachedHighlights, pendingOffsets]);
    } catch (err) {
      console.error("Could not save highlight:", err);
    } finally {
      popover.style.display = "none";
      popover.textContent = "Highlight";
      window.getSelection().removeAllRanges();
    }
  });

  /* ---------- render heatmap from all saved highlights ---------- */

  let cachedHighlights = [];

  function applyHeatmap(highlights) {
    const text = container.textContent;
    const counts = new Array(text.length).fill(0);
    highlights.forEach(({ start, end }) => {
      for (let i = start; i < end && i < counts.length; i++) counts[i]++;
    });
    const maxCount = Math.max(1, ...counts);

    let globalOffset = 0;

    function processNode(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        const t = node.textContent;
        const start = globalOffset;
        const frags = [];
        let i = 0;
        while (i < t.length) {
          const c = counts[start + i] || 0;
          let j = i;
          while (j < t.length && (counts[start + j] || 0) === c) j++;
          frags.push({ text: t.slice(i, j), count: c });
          i = j;
        }
        globalOffset += t.length;

        if (frags.length > 1 || frags[0].count > 0) {
          const frag = document.createDocumentFragment();
          frags.forEach((f) => {
            if (f.count > 0) {
              const mark = document.createElement("mark");
              mark.className = "heat-mark";
              const intensity = 0.15 + 0.45 * (f.count / maxCount);
              mark.style.backgroundColor = `rgba(62, 92, 75, ${intensity.toFixed(2)})`;
              mark.title = `Highlighted by ${f.count} reader${f.count > 1 ? "s" : ""}`;
              mark.textContent = f.text;
              frag.appendChild(mark);
            } else {
              frag.appendChild(document.createTextNode(f.text));
            }
          });
          node.replaceWith(frag);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(processNode);
      }
    }

    Array.from(container.childNodes).forEach(processNode);
  }

  db.collection("highlights")
    .where("postId", "==", postId)
    .get()
    .then((snapshot) => {
      cachedHighlights = snapshot.docs.map((d) => d.data());
      if (cachedHighlights.length) applyHeatmap(cachedHighlights);
    })
    .catch((err) => console.error("Could not load highlights:", err));
})();
