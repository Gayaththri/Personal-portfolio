import { useEffect, useRef } from "react";
import { injectCaseStudyIcons } from "./pickme-icons";

/** Scroll-reveal for `.reveal` / `.r` nodes inside embedded case study markup. */
export function useCaseStudyEffects() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (
      root.classList.contains("case-study--pickme") ||
      root.classList.contains("case-study--rose")
    ) {
      injectCaseStudyIcons(root);
    }

    const revealEls = root.querySelectorAll(".reveal, .r");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07 },
    );

    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return rootRef;
}
