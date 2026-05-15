import { Reveal } from "./Reveal";
import { siteConfig } from "../config";

function IconArrowOut() {
  return (
    <svg
      className="contact-touch__arrow"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M7 17L17 7M17 7H9M17 7v8" />
    </svg>
  );
}

export function Contact() {
  const cvHref = siteConfig.cvUrl.trim();
  const cvIsFile =
    cvHref.endsWith(".pdf") || cvHref.includes("/cv") || cvHref.includes("drive.google");
  const behanceHref = siteConfig.behanceUrl?.trim();

  const sideLinks: {
    label: string;
    href: string;
    download?: boolean;
    blank?: boolean;
  }[] = [];
  if (cvHref) {
    sideLinks.push({
      label: "Resume",
      href: cvHref,
      download: cvIsFile,
      blank: !cvIsFile,
    });
  }
  sideLinks.push({
    label: "LinkedIn",
    href: siteConfig.linkedin,
    blank: true,
  });
  if (behanceHref) {
    sideLinks.push({ label: "Behance", href: behanceHref, blank: true });
  } else {
    sideLinks.push({ label: "GitHub", href: siteConfig.github, blank: true });
  }

  return (
    <section id="contact" className="contact-touch" aria-labelledby="contact-heading">
      <Reveal className="contact-touch__reveal">
        <div className="wrap contact-touch__inner">
          <div className="contact-touch__primary">
            <header className="section-head contact-touch__head">
              <p className="section-head__eyebrow">Get in touch</p>
              <h2
                id="contact-heading"
                className="section-head__title section-head__title--sans contact-touch__title"
              >
                Let&apos;s work together.
              </h2>
              <p className="section-head__lead contact-touch__subtitle">
                Open to UI/UX Design and Business Analyst roles — available for full-time and
                freelance.
              </p>
            </header>
            <a className="contact-touch__email" href={`mailto:${siteConfig.email}`}>
              <span>{siteConfig.email}</span>
              <IconArrowOut />
            </a>
          </div>

          <nav className="contact-touch__aside" aria-label="Links">
            <ul className="contact-touch__links">
              {sideLinks.map((item) => (
                <li key={item.label}>
                  <a
                    className="contact-touch__link"
                    href={item.href}
                    {...(item.download ? { download: true } : {})}
                    {...(item.blank ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    <span>{item.label}</span>
                    <IconArrowOut />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </Reveal>

      <style>{`
        .contact-touch {
          background: var(--bg);
          color: var(--text);
          padding-block: clamp(40px, 5.5vw, 72px);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
          border-top: 1px solid var(--border);
        }
        .contact-touch__reveal {
          width: 100%;
        }
        .contact-touch__inner {
          max-width: var(--max);
          margin: 0 auto;
          display: grid;
          gap: clamp(1.25rem, 3vw, 2rem);
          align-items: start;
          min-width: 0;
          width: 100%;
        }
        @media (min-width: 640px) {
          .contact-touch__inner {
            grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.55fr);
            gap: clamp(1.25rem, 3vw, 2rem);
          }
        }
        .contact-touch__primary {
          position: relative;
          min-width: 0;
          max-width: 100%;
        }
        .contact-touch__head.section-head {
          margin: 0 0 clamp(1rem, 2.5vw, 1.35rem);
        }
        .contact-touch__title.section-head__title {
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.1;
          font-size: clamp(1.75rem, 4.5vw + 0.25rem, 2.75rem);
        }
        .contact-touch__subtitle.section-head__lead {
          margin: 0;
          max-width: 38rem;
        }
        .contact-touch__email {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          max-width: 100%;
          font-family: var(--font-sans);
          font-size: clamp(1.35rem, 3.5vw + 0.2rem, 2.25rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.15;
          color: var(--text);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .contact-touch__email span {
          min-width: 0;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        .contact-touch__email:hover {
          color: var(--text-muted);
        }
        .contact-touch__email:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
          border-radius: 4px;
        }
        .contact-touch__arrow {
          flex-shrink: 0;
          opacity: 0.55;
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .contact-touch__email:hover .contact-touch__arrow {
          opacity: 0.9;
          transform: translate(1px, -1px);
        }
        .contact-touch__aside {
          padding-top: 0.15rem;
        }
        @media (min-width: 640px) {
          .contact-touch__aside {
            justify-self: end;
            min-width: 10rem;
          }
        }
        .contact-touch__links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .contact-touch__link {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          width: 100%;
          max-width: min(14rem, 100%);
          font-family: var(--font-sans);
          font-size: clamp(0.9375rem, 2vw, 1rem);
          font-weight: 500;
          color: var(--text);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .contact-touch__link:hover {
          color: var(--text-muted);
        }
        .contact-touch__link:hover .contact-touch__arrow {
          opacity: 0.85;
          transform: translate(1px, -1px);
        }
        .contact-touch__link:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
          border-radius: 4px;
        }
        .contact-touch__link .contact-touch__arrow {
          opacity: 0.45;
        }
      `}</style>
    </section>
  );
}
