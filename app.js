/* =========================================================================
   Optes Perimeter Intelligence — NULL SIGNAL
   Tiny vanilla-JS progressive enhancement. Zero dependencies.

   Responsibilities (all optional, all guarded):
     1. Toggle a glass fill on the top bar once the page has scrolled.
     2. Reveal sections as they enter the viewport (hairline draw + fade-up).

   Discipline:
     - A complete no-op under prefers-reduced-motion (CSS already renders the
       settled resting state; we simply mark everything visible and stop).
     - Never throws if an element is absent.
     - No external requests, no globals leaked.
   ========================================================================= */
(function () {
  "use strict";

  // Bail safely if the document is somehow unavailable.
  if (typeof document === "undefined") return;

  var prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ----------------------------------------------------------------------
     1. Top bar — gain a quiet glass fill only after scrolling away from top.
     This is harmless under reduced motion (it's a state, not an animation),
     so we run it regardless, but it is fully optional.
     ---------------------------------------------------------------------- */
  function initTopbar() {
    var topbar = document.querySelector("[data-topbar]");
    if (!topbar) return;

    var threshold = 24;
    var ticking = false;

    function update() {
      ticking = false;
      var y = window.pageYOffset || document.documentElement.scrollTop || 0;
      if (y > threshold) {
        topbar.classList.add("is-scrolled");
      } else {
        topbar.classList.remove("is-scrolled");
      }
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
  }

  /* ----------------------------------------------------------------------
     2. Reveal-on-scroll. Under reduced motion we mark everything visible
     immediately and never observe anything.
     ---------------------------------------------------------------------- */
  function initReveal() {
    var nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes || nodes.length === 0) return;

    var i;

    // Reduced motion, or no IntersectionObserver support: reveal all, no work.
    if (prefersReducedMotion || typeof window.IntersectionObserver !== "function") {
      for (i = 0; i < nodes.length; i++) {
        nodes[i].classList.add("is-visible");
      }
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        for (var j = 0; j < entries.length; j++) {
          var entry = entries[j];
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { root: null, rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    for (i = 0; i < nodes.length; i++) {
      observer.observe(nodes[i]);
    }
  }

  function init() {
    try {
      initTopbar();
      initReveal();
    } catch (err) {
      // Fail open: never let an enhancement break the page. Make sure any
      // reveal targets are visible so no content is left hidden.
      try {
        var nodes = document.querySelectorAll("[data-reveal]");
        for (var k = 0; k < nodes.length; k++) {
          nodes[k].classList.add("is-visible");
        }
      } catch (ignored) {}
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
