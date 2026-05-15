import { useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function getNavigationType(): string | undefined {
  const entry = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  return entry?.type;
}

/** Scroll window on route/hash changes; honor hash targets (e.g. /#contact). Runs before paint. */
export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const isReload = getNavigationType() === "reload";

    // Full reload on home: stay at hero. URL often still has #projects after using "Works" in nav.
    if (pathname === "/" && isReload) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      if (hash === "#projects") {
        navigate("/", { replace: true });
        return;
      }
      if (!hash) {
        return;
      }
      // e.g. /#contact on reload — fall through to scroll to that section
    }

    if (hash) {
      const id = hash.replace(/^#/, "");
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash, navigate]);

  return null;
}
