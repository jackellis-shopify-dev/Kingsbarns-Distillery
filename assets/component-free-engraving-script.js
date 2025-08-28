(() => {
  const TARGET_SELECTOR = ".product-personalizer";
  const FROM_TEXT = "Engrave for £10";
  const TO_TEXT = "Free Engraving";
  const PROP_TEXT = "Engraving (Free)"
  const TIMEOUT_MS = 30000;      // give up after 30s
  const POLL_INTERVAL_MS = 250;  // check _CP readiness

  let done = false;
  let pollId = null;
  let timeoutId = null;
  let observer = null;

  function updateEngravingFields() {
    const container = document.querySelector('.cstmfy_personalize_text');
    if (!container) return;

    const label = container.querySelector('label');
    if (label) {
      label.textContent = 'Engraving (Free)';
    }

    const input = container.querySelector('input[name^="properties[Engraving"]');
    if (input) {
      input.setAttribute('name', 'properties[Engraving (Free)]');
    }
  }

  function tryUpdate() {
    if (done) return true;

    const el = document.querySelector(TARGET_SELECTOR);
    const cpReady = typeof window._CP !== "undefined";

    if (!el || !cpReady) return false;

    const current = window._CP[14];

    if (typeof current === "string") {
      if (current.includes(FROM_TEXT)) {
        window._CP[14] = current.replace(FROM_TEXT, TO_TEXT);
        document.querySelector('button[onclick="cstmfy_personalize_text(this,event)"]').innerHTML = window._CP[14];
        console.info("[personalizer] _CP[14] updated:", window._CP[14]);
        const btn = document.querySelector('button[onclick="cstmfy_personalize_text(this,event)"]');
        if (btn) {
          btn.addEventListener('click', updateEngravingFields);
        }
      } else {
        // If you want to force the value even when FROM_TEXT isn't present, uncomment:
        // window._CP[14] = TO_TEXT;
        console.info("[personalizer] _CP[14] present but no match to replace:", current);
      }
      cleanup(true);
      return true;
    }

    // If _CP[14] not a string yet, keep waiting.
    return false;
  }

  function startPolling() {
    pollId = setInterval(tryUpdate, POLL_INTERVAL_MS);
  }

  function startObserving() {
    if (!document.body) return; // should exist after DOMContentLoaded, but just in case
    observer = new MutationObserver(() => tryUpdate() && cleanup(true));
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function cleanup(success) {
    if (done) return;
    done = true;
    if (observer) observer.disconnect();
    if (pollId) clearInterval(pollId);
    if (timeoutId) clearTimeout(timeoutId);
    if (!success) console.warn("[personalizer] Timed out waiting for conditions.");
  }

  function init() {
    // Try immediately
    if (tryUpdate()) return;

    // Watch DOM for the element and poll for _CP becoming ready
    startObserving();
    startPolling();

    // Safety timeout
    timeoutId = setTimeout(() => cleanup(false), TIMEOUT_MS);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


