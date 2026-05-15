import { useId, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../config";
import { workExperienceEntries } from "../data/experience";

const PANEL_EASE = [0.22, 1, 0.36, 1] as const;

const BG = "var(--bg-elevated)";
const INK = "var(--text)";
const MUTED = "var(--text-muted)";
const DATE = "var(--text-muted)";

function IconDoc() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M14 2v6h6M9 15h6M9 11h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ToggleIcon({ open, reduce }: { open: boolean; reduce: boolean }) {
  return (
    <motion.span
      className="wxp-card__icon"
      aria-hidden
      animate={reduce ? undefined : { rotate: open ? 45 : 0 }}
      transition={{ duration: 0.32, ease: PANEL_EASE }}
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
        <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    </motion.span>
  );
}

export function WorkExperience() {
  const baseId = useId();
  const reduce = useReducedMotion();
  const [openId, setOpenId] = useState<string>(workExperienceEntries[0]?.id ?? "");

  const cv = siteConfig.cvUrl.trim();

  return (
    <div id="experience" className="wxp" role="region" aria-labelledby="wxp-heading">
      <div className="wxp__inner wrap">
        <header className="wxp__intro section-head">
          <p className="section-head__eyebrow">Work experiences</p>
          <h2 id="wxp-heading" className="section-head__title section-head__title--sans">
            Places I&apos;ve grown
          </h2>
          <p className="section-head__lead">
            Highlights from teams I&apos;ve joined and how I contributed.
          </p>
        </header>

        <div className="wxp__col">
          <div className="wxp__stack" role="region" aria-label="Work history">
            {workExperienceEntries.map((job) => {
              const isOpen = openId === job.id;
              const panelId = `${baseId}-${job.id}-panel`;
              const btnId = `${baseId}-${job.id}-btn`;
              return (
                <div key={job.id} className={`wxp-card${isOpen ? " wxp-card--open" : ""}`}>
                  <button
                    id={btnId}
                    type="button"
                    className="wxp-card__toggle"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? "" : job.id)}
                  >
                    <span className="wxp-card__meta">
                      <span className="wxp-card__date">{job.range}</span>
                      <span className="wxp-card__headline">
                        <span className="wxp-card__title">{job.title}</span>
                        <span className="wxp-card__dot" aria-hidden>
                          {" "}
                          &middot;{" "}
                        </span>
                        <span className="wxp-card__company">{job.company}</span>
                      </span>
                    </span>
                    <ToggleIcon open={isOpen} reduce={!!reduce} />
                  </button>
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="wxp-card__panel"
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={
                      reduce
                        ? { duration: 0 }
                        : {
                            height: { duration: 0.42, ease: PANEL_EASE },
                            opacity: { duration: 0.28, ease: "easeOut" },
                          }
                    }
                    style={{ overflow: "hidden" }}
                    aria-hidden={!isOpen}
                  >
                    <motion.div
                      className="wxp-card__panel-inner"
                      initial={false}
                      animate={
                        reduce
                          ? undefined
                          : { y: isOpen ? 0 : -6, opacity: isOpen ? 1 : 0 }
                      }
                      transition={
                        reduce
                          ? { duration: 0 }
                          : {
                              duration: 0.32,
                              ease: PANEL_EASE,
                              delay: isOpen ? 0.06 : 0,
                            }
                      }
                    >
                      {Array.isArray(job.description) ? (
                        <ul className="wxp-card__body wxp-card__body--bullets">
                          {job.description.map((item, i) => (
                            <li key={`${job.id}-${i}`}>{item}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="wxp-card__body">{job.description}</p>
                      )}
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          <div className="wxp__actions">
            {cv ? (
              <a className="wxp-btn wxp-btn--solid" href={cv} download>
                <IconDoc />
                My Resume
              </a>
            ) : null}
            <a className="wxp-btn wxp-btn--ghost" href={`mailto:${siteConfig.email}`}>
              Email Me
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .wxp {
          background: ${BG};
          padding-block: var(--section-pad-y);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
        }
        .wxp__inner {
          max-width: var(--max);
          margin: 0 auto;
          display: grid;
          gap: var(--section-grid-gap);
          align-items: start;
          min-width: 0;
          width: 100%;
        }
        @media (min-width: 900px) {
          .wxp__inner {
            grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.35fr);
            gap: var(--section-grid-gap);
            align-items: start;
          }
        }
        .wxp__intro {
          max-width: 28rem;
        }
        .wxp__stack {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .wxp-card {
          border-radius: 18px;
          background: var(--bg);
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow: 0 10px 40px -28px rgba(15, 23, 42, 0.35);
          overflow: hidden;
          transition: box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .wxp-card--open {
          box-shadow: 0 16px 48px -24px rgba(15, 23, 42, 0.28);
        }
        .wxp-card__toggle {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.75rem;
          padding: clamp(0.95rem, 3vw, 1.25rem) clamp(0.9rem, 3vw, 1.25rem) clamp(0.9rem, 3vw, 1.15rem);
          margin: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: left;
          font: inherit;
          color: inherit;
          transition: background 0.15s ease;
        }
        .wxp-card__toggle:hover {
          background: color-mix(in srgb, var(--text) 4%, transparent);
        }
        .wxp-card__toggle:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: -2px;
        }
        .wxp-card__meta {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
          min-width: 0;
        }
        .wxp-card__date {
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 500;
          color: ${DATE};
          letter-spacing: 0.02em;
        }
        .wxp-card__headline {
          font-family: var(--font-sans);
          font-size: clamp(0.95rem, 2vw, 1.05rem);
          font-weight: 700;
          color: ${INK};
          line-height: 1.35;
          overflow-wrap: break-word;
          min-width: 0;
        }
        .wxp-card__title {
          font-weight: 700;
        }
        .wxp-card__company {
          font-weight: 600;
          color: var(--text-muted);
        }
        .wxp-card__dot {
          font-weight: 400;
          color: var(--text-muted);
        }
        .wxp-card__icon {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          border: 1px solid rgba(15, 23, 42, 0.14);
          color: rgba(71, 85, 105, 0.85);
          background: transparent;
        }
        .wxp-card--open .wxp-card__icon {
          background: transparent;
          border-color: rgba(15, 23, 42, 0.18);
          color: rgba(71, 85, 105, 0.95);
        }
        .wxp-card__panel {
          padding: 0;
        }
        .wxp-card__panel-inner {
          padding: 0 clamp(0.9rem, 3vw, 1.25rem) clamp(0.95rem, 3vw, 1.2rem);
        }
        .wxp-card__body {
          margin: 0;
          padding-top: 0.15rem;
          max-width: 52ch;
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          line-height: 1.65;
          color: ${MUTED};
        }
        .wxp-card__body--bullets {
          list-style: disc;
          padding-left: 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .wxp-card__body--bullets li {
          padding-left: 0.2rem;
        }
        .wxp__actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 0.85rem 1.5rem;
          margin-top: 1.75rem;
        }
        .wxp-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          font-weight: 600;
          text-decoration: none;
          border-radius: 12px;
          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            background 0.18s ease,
            color 0.18s ease;
        }
        .wxp-btn--solid {
          padding: 0.72rem 1.35rem;
          background: var(--text);
          color: var(--bg-elevated);
          border: 1px solid var(--text);
          box-shadow: 0 8px 24px -12px rgba(0, 0, 0, 0.45);
        }
        .wxp-btn--solid:hover {
          transform: translateY(-1px);
          box-shadow: 0 12px 28px -10px rgba(0, 0, 0, 0.4);
        }
        .wxp-btn--ghost {
          padding: 0.5rem 0.25rem;
          background: transparent;
          color: ${INK};
          border: none;
          font-weight: 600;
        }
        .wxp-btn--ghost:hover {
          color: var(--accent);
        }
        .wxp-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }
      `}</style>
    </div>
  );
}
