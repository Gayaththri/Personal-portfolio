import { useEffect } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../config";

export function NotFoundPage() {
  useEffect(() => {
    const prev = document.title;
    document.title = `404 - ${siteConfig.name}`;
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <main className="not-found-page" aria-labelledby="not-found-heading">
      <div className="not-found-page__inner wrap">
        <p className="not-found-page__code" aria-hidden="true">
          404
        </p>
        <h2 id="not-found-heading" className="not-found-page__title section-head__title">
          Page not found
        </h2>
        <p className="not-found-page__lead">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="btn btn--primary not-found-page__cta">
          ← Back to home
        </Link>
      </div>
      <style>{`
        .not-found-page {
          flex: 1 1 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          padding-block: var(--section-pad-y);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
          padding-top: max(var(--section-pad-y), var(--topnav-stack));
          min-height: min(72vh, calc(100dvh - var(--topnav-stack) - 10rem));
        }
        .not-found-page__inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          width: 100%;
        }
        .not-found-page__code {
          margin: 0 0 0.5rem;
          font-family: var(--font-display);
          font-size: 8rem;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--text-muted);
        }
        .not-found-page__title {
          margin: 0 0 0.75rem;
        }
        .not-found-page__lead {
          margin: 0 0 var(--section-head-gap);
          max-width: 36ch;
          font-family: var(--font-sans);
          font-size: clamp(0.9375rem, 2.2vw, 1.0625rem);
          line-height: 1.5;
          color: var(--text-muted);
        }
        .not-found-page__cta {
          margin-top: 0.25rem;
        }
      `}</style>
    </main>
  );
}
