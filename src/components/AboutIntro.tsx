import { motion, useReducedMotion } from "framer-motion";
import { AboutPortraitOrbit } from "./AboutPortraitOrbit";
import { siteConfig } from "../config";

/** Long-form intro used on the dedicated About page. */
export function AboutIntro() {
  const reduce = useReducedMotion();

  return (
    <section id="about-intro" className="about-intro section" aria-labelledby="about-intro-heading">
      <div className="about-intro__inner wrap">
        <div className="about-intro__layout">
          <div id="about-portrait" className="about-intro__portrait">
            <AboutPortraitOrbit />
          </div>
          <motion.div
            className="about-intro__copy"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={reduce ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <header className="about-intro__head">
              <p className="section-head__eyebrow">About</p>
              <h1 id="about-intro-heading" className="section__title about-intro__title">
                Hey, I&apos;m <strong>{siteConfig.name.split(" ")[0]}</strong>.
              </h1>
            </header>
            <div className="about-intro__body">
              <p>
                I&apos;m a Computer Science graduate interested in UI/UX, Product Thinking, and
                Business Analysis, which gives me a broader perspective on how digital products are
                designed, structured, and experienced.
              </p>
              <p>
                I&apos;m especially drawn to the systems behind the interface - the workflows,
                logic, and user interactions that shape how a product actually functions.
              </p>
              <blockquote className="about-intro__pullquote">
                I enjoy creating systems that feel simple, thoughtful, and reliable.
              </blockquote>
              <p>
                A big part of my work involves understanding messy problems and turning them into
                clear workflows, intuitive experiences, and practical solutions. Whether it&apos;s
                through research, user flows, requirement analysis, or interface design.
              </p>
              <p>
                At the center of how I work is curiosity - understanding how things work, why users
                behave the way they do, and how technology can make experiences more meaningful and
                intuitive.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .about-intro.section {
          padding-top: calc(var(--topnav-stack) + max(1rem, var(--section-pad-y) * 0.45));
          padding-bottom: var(--section-pad-y);
        }
        .about-intro {
          background: var(--bg-elevated);
        }
        .about-intro__inner {
          max-width: var(--max);
          margin: 0 auto;
          width: 100%;
          min-width: 0;
        }
        .about-intro__layout {
          display: grid;
          gap: clamp(1.75rem, 4vw, 2.75rem);
          align-items: start;
        }
        @media (min-width: 900px) {
          .about-intro__layout {
            grid-template-columns: minmax(240px, 0.4fr) minmax(0, 1fr);
            column-gap: clamp(1.5rem, 4vw, 3rem);
          }
        }
        .about-intro__portrait {
          width: 100%;
          max-width: min(360px, 100%);
          margin-inline: auto;
          justify-self: center;
        }
        @media (min-width: 900px) {
          .about-intro__portrait {
            margin-inline: 0;
            justify-self: start;
            position: sticky;
            top: calc(env(safe-area-inset-top, 0px) + var(--topnav-stack) + 0.75rem);
          }
        }
        .about-intro__portrait .about-ed__visual {
          min-height: min(380px, 52vh);
        }
        @media (min-width: 900px) {
          .about-intro__portrait .about-ed__visual {
            min-height: min(440px, 58vh);
          }
        }
        .about-intro__copy {
          text-align: left;
          min-width: 0;
        }
        .about-intro__title {
          font-weight: 800;
          line-height: 1.12;
          letter-spacing: -0.03em;
          font-size: clamp(1.35rem, 4.5vw + 0.35rem, 2.35rem);
          white-space: normal;
          overflow-wrap: break-word;
          max-width: 100%;
        }
        .about-intro__title strong {
          font-weight: 800;
          color: inherit;
        }
        .about-intro__body p {
          margin: 0;
          font-size: clamp(0.875rem, 1.55vw, 0.97rem);
          line-height: 1.65;
          color: var(--text-muted);
        }
        .about-intro__body p + p,
        .about-intro__body p + .about-intro__pullquote,
        .about-intro__body .about-intro__pullquote + p {
          margin-top: 1rem;
        }
        .about-intro__pullquote {
          margin: 0;
          padding: 0 0 0 1rem;
          border: none;
          border-left: 3px solid var(--text);
          font-family: var(--font-sans);
          font-size: clamp(1.25rem, 2.2vw, 1.375rem);
          font-weight: 700;
          line-height: 1.45;
          color: var(--text);
        }
        .about-intro__body strong {
          color: var(--text);
          font-weight: 600;
        }
      `}</style>
    </section>
  );
}
