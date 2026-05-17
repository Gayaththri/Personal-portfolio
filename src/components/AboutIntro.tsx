import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../config";
import { AboutPhotoStack } from "./AboutPhotoStack";

const STAT_CHIPS = ["CS Graduate", "Based in Sri Lanka", "Open to opportunities"] as const;

/** Long-form intro used on the dedicated About page. */
export function AboutIntro() {
  const reduce = useReducedMotion();
  const firstName = siteConfig.name.split(" ")[0] ?? siteConfig.name;

  return (
    <section id="about-intro" className="about-intro" aria-labelledby="about-intro-heading">
      <motion.div
        className="about-intro__inner wrap"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <header className="about-intro__head">
          <p className="about-intro__status" role="status">
            <span className="about-intro__status-dot" aria-hidden />
            Available for work
          </p>
          <h1 id="about-intro-heading" className="about-intro__title">
            Hey, I&apos;m {firstName}.
          </h1>
        </header>

        <motion.div
          className="about-intro__layout"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
        >
          <motion.div className="about-intro__stack">
            <AboutPhotoStack />
          </motion.div>

          <motion.div
            className="about-intro__copy"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <motion.div className="about-intro__body">
              <p>
                I&apos;m a Computer Science graduate working across UI/UX and business analysis. Most
                of my projects start with research and workflows — who uses the product, what
                breaks, and what to fix first.
              </p>
              <p>
                Recent work includes Rose by Basicare (K-beauty ecommerce, mobile-first) and a
                concept study on PickMe ride tracking. I&apos;m comfortable in Figma, documenting
                requirements, and working with developers through handoff.
              </p>
              <p>
                Based in Sri Lanka. Open to full-time UI/UX roles and freelance projects.
              </p>
              <ul className="about-intro__chips" aria-label="Quick facts">
                {STAT_CHIPS.map((chip) => (
                  <li key={chip}>
                    <span className="about-intro__chip">{chip}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <style>{`
        .about-intro {
          padding-top: calc(var(--topnav-stack) + clamp(1.75rem, 4vw, 2.5rem));
          padding-bottom: clamp(1.5rem, 4vw, 2.5rem);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
        }
        .about-intro__inner {
          max-width: var(--max);
          margin: 0 auto;
          width: 100%;
          min-width: 0;
        }
        .about-intro__head {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          margin-bottom: var(--section-head-gap);
        }
        .about-intro__status {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          margin: 0;
          padding: 0.4rem 0.85rem;
          border-radius: 999px;
          border: 1px solid #86efac;
          background: #f0fdf4;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          line-height: 1.2;
          color: #15803d;
        }
        .about-intro__status-dot {
          flex-shrink: 0;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
        }
        .about-intro__title {
          margin: 0;
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 2.75rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }
        .about-intro__layout {
          display: grid;
          gap: clamp(1.25rem, 3.5vw, 2rem);
          align-items: start;
        }
        @media (min-width: 768px) {
          .about-intro__layout {
            grid-template-columns: minmax(220px, 280px) minmax(0, 1fr);
            width: 100%;
            column-gap: clamp(1.75rem, 4vw, 3rem);
          }
        }
        .about-intro__stack {
          display: flex;
          justify-content: center;
        }
        @media (min-width: 768px) {
          .about-intro__stack {
            justify-content: flex-start;
            padding-top: 0.15rem;
          }
        }
        .about-intro__copy {
          min-width: 0;
          width: 100%;
        }
        @media (min-width: 768px) {
          .about-intro__copy {
            justify-self: stretch;
            max-width: none;
          }
        }
        .about-intro__body {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .about-intro__body p {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          line-height: 1.7;
          color: var(--text-muted);
          text-align: left;
          text-wrap: pretty;
        }
        .about-intro__chips {
          list-style: none;
          margin: 0.5rem 0 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .about-intro__chip {
          display: inline-flex;
          align-items: center;
          font-family: var(--font-sans);
          font-size: 0.75rem;
          font-weight: 500;
          line-height: 1.3;
          padding: 0.4rem 0.75rem;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
