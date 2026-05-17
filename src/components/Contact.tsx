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
              <p className="section-head__eyebrow">Contact</p>
              <h2
                id="contact-heading"
                className="section-head__title section-head__title--sans contact-touch__title"
              >
                Email me about roles or projects.
              </h2>
              <p className="section-head__lead contact-touch__subtitle">
                Open to full-time UI/UX roles and freelance work in Sri Lanka and remote.
              </p>
              <a className="contact-touch__email" href={`mailto:${siteConfig.email}`}>
                <span>{siteConfig.email}</span>
                <IconArrowOut />
              </a>
            </header>
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
          padding-block: clamp(32px, 4vw, 52px);
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
          gap: clamp(1rem, 2.5vw, 1.5rem);
          align-items: start;
          min-width: 0;
          width: 100%;
        }
        @media (min-width: 640px) {
          .contact-touch__inner {
            grid-template-columns: minmax(0, 1fr) auto;
            gap: clamp(1.25rem, 3.5vw, 2rem);
            align-items: end;
          }
        }
        .contact-touch__primary {
          position: relative;
          min-width: 0;
          max-width: 100%;
        }
        .contact-touch__head.section-head {
          margin: 0;
        }
        .contact-touch__title.section-head__title {
          font-size: var(--type-h2);
          font-weight: 700;
          letter-spacing: -0.03em;
          line-height: 1.08;
        }
        .contact-touch__subtitle.section-head__lead {
          margin: 0 0 0.85rem;
          max-width: 38rem;
          font-size: var(--type-lead);
        }
        .contact-touch__email {
          display: inline-flex;
          margin-top: 0.15rem;
          align-items: center;
          gap: 0.55rem;
          max-width: 100%;
          font-family: var(--font-sans);
          font-size: var(--type-body-sm);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.35;
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
          padding-top: 0;
        }
        @media (min-width: 640px) {
          .contact-touch__aside {
            justify-self: end;
            align-self: end;
            min-width: 10rem;
            padding-bottom: 0.2rem;
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
          font-size: var(--type-body-sm);
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
