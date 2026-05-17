import { useEffect, useRef, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ENTER_DELAY_MS = 10;
const EXIT_DURATION_MS = 200;

function routeKey(pathname: string, search: string, hash: string): string {
  return pathname + search + hash;
}

function isInternalNavAnchor(anchor: HTMLAnchorElement): boolean {
  if (anchor.target === "_blank" || anchor.hasAttribute("download")) return false;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
    return false;
  }

  try {
    return new URL(anchor.href, window.location.origin).origin === window.location.origin;
  } catch {
    return false;
  }
}

/** Wraps routed page content with enter/exit transitions on load and internal navigation. */
export function PageTransition({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const currentRoute = routeKey(location.pathname, location.search, location.hash);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.remove("page-enter", "page-exit");
    const timerId = window.setTimeout(() => {
      el.classList.add("page-enter");
    }, ENTER_DELAY_MS);

    return () => window.clearTimeout(timerId);
  }, [currentRoute]);

  useEffect(() => {
    const root = document.getElementById("root");
    if (!root) return;

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const anchor = (event.target as Element | null)?.closest("a");
      if (!anchor || !root.contains(anchor) || !isInternalNavAnchor(anchor)) return;

      let targetRoute: string;
      try {
        const url = new URL(anchor.href, window.location.origin);
        targetRoute = routeKey(url.pathname, url.search, url.hash);
      } catch {
        return;
      }

      if (targetRoute === currentRoute) return;

      event.preventDefault();

      const el = ref.current;
      if (el) {
        el.classList.remove("page-enter");
        el.classList.add("page-exit");
      }

      window.setTimeout(() => {
        navigate(targetRoute);
      }, EXIT_DURATION_MS);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [currentRoute, navigate]);

  return (
    <div className="page-transition" ref={ref}>
      {children}
    </div>
  );
}
