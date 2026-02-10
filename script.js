/* Global Insights - El Salvador
   - Fade up when entering viewport
   - Fade slightly up when leaving viewport
   - Back-to-top: reliable scrolling (window.scrollTo)
*/

(function () {
    "use strict";

    const sections = Array.from(document.querySelectorAll(".reveal"));
    const backToTopBtn = document.getElementById("backToTop");

    // ===== Reveal (fade) =====
    const observer = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                const el = entry.target;

                if (entry.isIntersecting) {
                    el.classList.add("is-in");
                    el.classList.remove("is-out");
                } else {
                    // only fade out after being visible once
                    if (el.classList.contains("is-in")) {
                        el.classList.add("is-out");
                        el.classList.remove("is-in");
                    }
                }
            }
        },
        { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    );

    sections.forEach((s) => observer.observe(s));

    // ===== Back to top (works for FAB + end button + any #top links) =====
    const scrollToTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    };

    // Floating button
    if (backToTopBtn) {
        const onScroll = () => {
            const y = window.scrollY || document.documentElement.scrollTop;
            if (y > 520) backToTopBtn.classList.add("is-visible");
            else backToTopBtn.classList.remove("is-visible");
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();

        backToTopBtn.addEventListener("click", scrollToTop);
        backToTopBtn.addEventListener("focus", () => backToTopBtn.classList.add("is-visible"));
    }

    // Any link that points to #top should scroll to 0 reliably
    document.addEventListener("click", (e) => {
        const a = e.target.closest('a[href="#top"]');
        if (!a) return;

        e.preventDefault();
        scrollToTop();
    });
})();