import { Link } from "react-router-dom";
import { siteConfig } from "../config";

function LinkedInIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

export function TopNav() {
  const brandAria =
    siteConfig.navBrand?.trim() || siteConfig.name.split(" ")[0] || siteConfig.name;
  const blogHref = siteConfig.blogUrl?.trim();
  const thirdIsBlog = Boolean(blogHref);
  const thirdLabel = thirdIsBlog ? "Blogs" : "Contact";
  const xHref = siteConfig.xUrl?.trim();
  const cvHref = siteConfig.cvUrl.trim();
  const cvIsFile =
    cvHref.endsWith(".pdf") || cvHref.includes("/cv") || cvHref.includes("drive.google");

  return (
    <header className="topnav" role="banner">
      <div className="topnav__wrap">
        <div className="topnav__bar">
          <Link className="topnav__brand" to="/" aria-label={`${brandAria}, back to top`}>
            <span className="topnav__brand-inner">
              <span className="topnav__brand-letter" aria-hidden="true">
                G
              </span>
            </span>
          </Link>

          <nav className="topnav__nav" aria-label="Primary">
            <Link className="topnav__link" to="/#projects">
              Works
            </Link>
            <Link className="topnav__link" to="/about">
              About
            </Link>
            {thirdIsBlog ? (
              <a className="topnav__link" href={blogHref}>
                {thirdLabel}
              </a>
            ) : (
              <Link className="topnav__link" to="/#contact">
                {thirdLabel}
              </Link>
            )}
          </nav>

          <div className="topnav__tools">
            <a
              className="topnav__icon"
              href={siteConfig.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${siteConfig.name} on LinkedIn`}
            >
              <LinkedInIcon />
            </a>
            {xHref ? (
              <a
                className="topnav__icon"
                href={xHref}
                target="_blank"
                rel="noreferrer"
                aria-label={`${siteConfig.name} on X`}
              >
                <XIcon />
              </a>
            ) : null}
            {cvHref ? (
              <a
                className="topnav__resume"
                href={cvHref}
                {...(cvIsFile ? { download: true } : { target: "_blank", rel: "noreferrer" })}
              >
                Resume
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <style>{`
        .topnav {
          position: fixed;
          top: max(0.65rem, env(safe-area-inset-top, 0px));
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          padding: 0 var(--section-pad-inline-end) 0 var(--section-pad-inline-start);
          pointer-events: none;
        }
        .topnav__wrap {
          pointer-events: auto;
          width: max-content;
          max-width: min(var(--max), calc(100vw - var(--section-pad-inline-start) - var(--section-pad-inline-end)));
        }
        .topnav__bar {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          gap: 0.75rem 1.1rem;
          min-height: 44px;
          padding: 8px 18px 8px 18px;
          background: color-mix(in srgb, #ffffff 92%, var(--bg));
          color: var(--text);
          border-radius: 9999px;
          border: 1px solid rgba(15, 23, 42, 0.1);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.9) inset,
            0 4px 24px -12px rgba(15, 23, 42, 0.12),
            0 12px 36px -20px rgba(15, 23, 42, 0.08);
        }
        .topnav__brand {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 2.25rem;
          min-height: 2.25rem;
          margin: -2px 0;
          text-decoration: none;
          flex-shrink: 0;
          border-radius: 12px;
          transition: transform 0.2s ease;
        }
        .topnav__brand:hover {
          transform: scale(1.04);
        }
        .topnav__brand:hover .topnav__brand-letter {
          color: var(--text-muted);
        }
        .topnav__brand-inner {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* Same type treatment as hero “Portfolio” (.hero-canvas__title) */
        .topnav__brand-letter {
          display: block;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.42rem;
          line-height: 1;
          letter-spacing: -0.045em;
          color: var(--text);
          transition: color 0.2s ease;
        }
        .topnav__nav {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          gap: 0.7rem;
          flex: 0 0 auto;
          min-width: 0;
        }
        .topnav__link {
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text-muted);
          text-decoration: none;
          white-space: nowrap;
        }
        .topnav__link:hover {
          color: var(--text);
        }
        .topnav__link:focus-visible {
          outline: 2px solid #4f46e5;
          outline-offset: 3px;
          border-radius: 4px;
        }
        .topnav__tools {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: flex-start;
          gap: 0.35rem 0.5rem;
          flex-shrink: 0;
          margin-left: 0.15rem;
        }
        .topnav__icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 9px;
          color: var(--text-muted);
          text-decoration: none;
        }
        .topnav__icon:hover {
          color: var(--text);
          background: rgba(15, 23, 42, 0.06);
        }
        .topnav__icon:focus-visible {
          outline: 2px solid #4f46e5;
          outline-offset: 2px;
        }
        .topnav__resume {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 6px 14px;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: #fff;
          background: #0f172a;
          border-radius: 9999px;
          text-decoration: none;
          border: 1px solid rgba(15, 23, 42, 0.15);
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }
        .topnav__resume:hover {
          transform: translateY(-1px);
          background: #1e293b;
          box-shadow: 0 6px 18px -8px rgba(15, 23, 42, 0.35);
        }
        .topnav__resume:focus-visible {
          outline: 2px solid #4f46e5;
          outline-offset: 3px;
        }
        .topnav__brand:focus-visible {
          outline: 2px solid #4f46e5;
          outline-offset: 3px;
          border-radius: 12px;
        }
        @media (max-width: 420px) {
          .topnav__link {
            font-size: 0.75rem;
          }
          .topnav__brand-letter {
            font-size: 1.28rem;
          }
        }
        @media (max-width: 720px) {
          .topnav__wrap {
            width: 100%;
            max-width: 100%;
          }
          .topnav__bar {
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            gap: 0.35rem 0.5rem;
            padding: 6px 10px 6px 12px;
            min-height: 42px;
          }
          .topnav__brand {
            min-width: 2rem;
            min-height: 2rem;
          }
          .topnav__brand-letter {
            font-size: 1.2rem;
          }
          .topnav__nav {
            flex: 1 1 auto;
            flex-wrap: nowrap;
            justify-content: center;
            gap: clamp(0.35rem, 2.5vw, 0.65rem);
            min-width: 0;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .topnav__nav::-webkit-scrollbar {
            display: none;
          }
          .topnav__link {
            font-size: clamp(0.625rem, 2.8vw, 0.75rem);
            flex-shrink: 0;
          }
          .topnav__tools {
            flex-wrap: nowrap;
            flex-shrink: 0;
            margin-left: 0;
            gap: 0.2rem;
          }
          .topnav__icon {
            width: 28px;
            height: 28px;
          }
          .topnav__resume {
            padding: 5px 10px;
            font-size: clamp(0.625rem, 2.6vw, 0.7rem);
          }
        }
      `}</style>
    </header>
  );
}
