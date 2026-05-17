import { siteConfig } from "../config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <p className="footer__left">
          <span className="footer__left-full">
            © {year} {siteConfig.name}. All rights reserved.
          </span>
          <span className="footer__left-compact">@{year}</span>
        </p>
        <p className="footer__right">React · Vite</p>
      </div>
      <style>{`
        .footer {
          flex-shrink: 0;
          padding-block: clamp(0.875rem, 2.2vw, 1.125rem);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
          border-top: 1px solid var(--border);
          background: var(--bg-elevated);
        }
        .footer__inner {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem 1.5rem;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8125rem;
          font-weight: 500;
          color: var(--text-muted);
        }
        .footer__left {
          margin: 0;
          flex: 1 1 auto;
          min-width: min(100%, 280px);
        }
        .footer__left-compact {
          display: none;
        }
        .footer__left-full {
          display: inline;
        }
        .footer__right {
          margin: 0;
          flex: 0 0 auto;
          color: var(--text-muted);
          font-weight: 500;
        }
        @media (max-width: 640px) {
          .footer {
            padding-block: clamp(0.65rem, 2vw, 0.9rem);
          }
          .footer__inner {
            flex-direction: row;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;
            font-size: 0.75rem;
          }
          .footer__left {
            flex: 0 1 auto;
            min-width: 0;
          }
          .footer__left-full {
            display: none;
          }
          .footer__left-compact {
            display: inline;
          }
          .footer__right {
            flex: 0 0 auto;
            text-align: right;
          }
        }
      `}</style>
    </footer>
  );
}
