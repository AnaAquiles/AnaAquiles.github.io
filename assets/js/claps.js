/* ==========================================================
   Clap reactions — Medium-style, capped per reader per post
   Reuses the same Firebase project configured for highlighting.
   ========================================================== */

(function () {
  if (!window.FIREBASE_CONFIG || !window.FIREBASE_CONFIG.apiKey || window.FIREBASE_CONFIG.apiKey === "REPLACE_ME") {
    console.warn("Claps disabled: Firebase config not set in _config.yml");
    return;
  }

  if (!firebase.apps.length) firebase.initializeApp(window.FIREBASE_CONFIG);
  const db = firebase.firestore();

  const btn = document.getElementById("clap-button");
  const countEl = document.getElementById("clap-count");
  if (!btn || !countEl) return;

  const postId = window.location.pathname;
  const docId = postId.replace(/\//g, "_") || "home"; // Firestore doc IDs can't contain raw slashes
  const docRef = db.collection("claps").doc(docId);
  const SESSION_KEY = "claps_" + postId;
  const MAX_PER_SESSION = 20;

  let sessionClaps = parseInt(localStorage.getItem(SESSION_KEY) || "0", 10);

  function refreshMaxedState() {
    if (sessionClaps >= MAX_PER_SESSION) {
      btn.classList.add("is-maxed");
      btn.setAttribute("aria-label", "You've clapped the max for this post");
    }
  }

  docRef.get().then((doc) => {
    countEl.textContent = doc.exists ? (doc.data().count || 0) : 0;
  }).catch((err) => console.error("Could not load claps:", err));

  btn.addEventListener("click", () => {
    if (sessionClaps >= MAX_PER_SESSION) return;

    sessionClaps++;
    localStorage.setItem(SESSION_KEY, sessionClaps);

    btn.classList.add("is-clapped");
    setTimeout(() => btn.classList.remove("is-clapped"), 220);

    db.runTransaction(async (t) => {
      const doc = await t.get(docRef);
      const newCount = (doc.exists ? doc.data().count || 0 : 0) + 1;
      t.set(docRef, { count: newCount }, { merge: true });
      countEl.textContent = newCount;
    }).catch((err) => console.error("Could not save clap:", err));

    refreshMaxedState();
  });

  refreshMaxedState();
})();
