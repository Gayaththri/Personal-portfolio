import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  showcaseProjects,
  type CaseStudyWell,
  type ShowcaseProject,
} from "../data/showcase-projects";

const SECTION_BG = "var(--bg)";
const INK = "var(--text)";
const SUB = "var(--text-muted)";
const CORAL = "#c96b5c";

function wellClass(well: CaseStudyWell | undefined, index: number): string {
  const w = well ?? (index % 2 === 0 ? "mint" : "sky");
  return `proj-case__visual--${w}`;
}

function CaseStudyCard({ project, index }: { project: ShowcaseProject; index: number }) {
  const reduce = useReducedMotion();
  const screenStyle = project.coverImage
    ? ({
        backgroundImage: `url(${project.coverImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } as const)
    : ({ background: project.coverGradient } as const);

  return (
    <Link to={`/case/${project.id}`} className="proj-case">
      <motion.div
        className="proj-case__motion"
        initial={reduce ? false : { opacity: 0, y: 28 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-6%" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.06 * index }}
        whileHover={reduce ? undefined : { y: -4 }}
        whileTap={reduce ? undefined : { scale: 0.997 }}
      >
        <div className="proj-case__text">
          <h3 className="proj-case__title">{project.title}</h3>
          <p className="proj-case__meta">{project.metaLine}</p>
          <p className="proj-case__desc">{project.description}</p>
        </div>

        <div className={`proj-case__visual ${wellClass(project.accentWell, index)}`}>
          <div className="proj-case__screen-wrap">
            <div className="proj-case__screen" style={screenStyle} aria-hidden />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function Projects() {
  return (
    <section id="projects" className="proj-feature">
      <div className="proj-feature__inner wrap">
        <header className="proj-feature__head">
          <div className="proj-feature__intro">
            <p className="section__label proj-feature__label">[ Project ]</p>
            <h2 className="section__title proj-feature__heading">Projects</h2>
            <p className="section__lead proj-feature__lead">
              Thoughtful design backed by research and systems thinking
            </p>
          </div>
        </header>

        <div className="proj-feature__grid">
          {showcaseProjects.map((p, i) => (
            <CaseStudyCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .proj-feature {
          background: ${SECTION_BG};
          color: ${INK};
          padding-block: var(--section-pad-y);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
        }
        .proj-feature__inner {
          max-width: var(--max);
          margin: 0 auto;
        }
        .proj-feature__head {
          margin-bottom: var(--section-head-gap);
        }
        .proj-feature .section__label.proj-feature__label {
          margin: 0 0 0.5rem;
          font-family: var(--font-display);
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: none;
          color: ${SUB};
        }
        .proj-feature .section__label.proj-feature__label::before {
          background: ${SUB};
          opacity: 0.35;
        }
        .proj-feature .section__title.proj-feature__heading {
          margin: 0 0 0.5rem;
          font-family: var(--font-display);
          font-size: clamp(2.5rem, 6vw, 3.5rem);
          font-weight: 700;
          letter-spacing: -0.04em;
          line-height: 1;
          color: ${INK};
        }
        .proj-feature .section__lead.proj-feature__lead {
          margin: 0;
          max-width: 36rem;
          font-family: var(--font-sans);
          font-size: clamp(0.95rem, 1.9vw, 1.05rem);
          font-style: italic;
          font-weight: 400;
          line-height: 1.5;
          color: ${SUB};
        }
        .proj-feature__grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--section-grid-gap);
          align-items: start;
        }
        @media (max-width: 720px) {
          .proj-feature__grid {
            grid-template-columns: 1fr;
            gap: var(--section-grid-gap);
          }
        }

        .proj-case {
          display: block;
          text-decoration: none;
          color: inherit;
          border-radius: 0;
          text-align: left;
        }
        .proj-case__motion {
          display: flex;
          flex-direction: column;
          gap: clamp(1.25rem, 2.5vw, 1.75rem);
        }
        .proj-case:focus-visible {
          outline: none;
        }
        .proj-case:focus-visible .proj-case__visual {
          box-shadow:
            0 0 0 3px var(--bg-elevated),
            0 0 0 6px var(--accent);
        }

        .proj-case__text {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 0 0.15rem;
          max-width: 38rem;
          min-width: 0;
        }
        .proj-case__title {
          margin: 0;
          font-family: var(--font-serif);
          font-size: clamp(1.65rem, 3.2vw, 2.15rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.15;
          color: ${INK};
          overflow-wrap: break-word;
        }
        .proj-case__meta {
          margin: 0;
          font-family: var(--font-sans);
          font-size: clamp(0.8125rem, 1.5vw, 0.9375rem);
          font-weight: 600;
          line-height: 1.4;
          color: ${CORAL};
        }
        .proj-case__desc {
          margin: 0.35rem 0 0;
          font-family: var(--font-sans);
          font-size: clamp(0.9rem, 1.65vw, 1rem);
          font-weight: 400;
          line-height: 1.6;
          color: ${SUB};
        }

        .proj-case__visual {
          position: relative;
          border-radius: clamp(22px, 3.5vw, 36px);
          min-height: clamp(220px, 28vw, 320px);
          padding: clamp(1.35rem, 3vw, 2.25rem);
          overflow: hidden;
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.85) inset,
            0 2px 6px rgba(15, 23, 42, 0.04),
            0 20px 50px -28px rgba(15, 23, 42, 0.18);
          transition: box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        @media (prefers-reduced-motion: no-preference) {
          .proj-case:hover .proj-case__visual {
            box-shadow:
              0 1px 0 rgba(255, 255, 255, 0.9) inset,
              0 8px 24px rgba(15, 23, 42, 0.06),
              0 28px 60px -24px rgba(15, 23, 42, 0.22);
          }
        }

        .proj-case__visual--mint {
          background: var(--bg-elevated);
        }
        .proj-case__visual--sky {
          background: var(--bg-elevated);
        }

        .proj-case__screen-wrap {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          min-height: clamp(168px, 22vw, 248px);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .proj-case__screen {
          position: relative;
          isolation: isolate;
          width: min(94%, 520px);
          aspect-ratio: 16 / 10;
          max-height: min(42vw, 280px);
          border-radius: clamp(10px, 1.5vw, 14px);
          overflow: hidden;
          border: 3px solid rgba(255, 255, 255, 0.75);
          box-shadow:
            0 2px 4px rgba(15, 23, 42, 0.05),
            0 14px 36px -18px rgba(15, 23, 42, 0.14);
          transform: translateZ(0);
          filter: brightness(1);
          transition:
            transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.3s ease;
        }
        .proj-case__screen::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: rgb(15 23 42 / 0.15);
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
          z-index: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .proj-case__screen::after {
            transition: none;
          }
        }
        @media (prefers-reduced-motion: no-preference) {
          .proj-case:hover .proj-case__screen,
          .proj-case:focus-visible .proj-case__screen {
            transform: scale(1.02);
            box-shadow:
              0 2px 4px rgba(15, 23, 42, 0.04),
              0 12px 32px -16px rgba(15, 23, 42, 0.1);
          }
        }
        .proj-case:hover .proj-case__screen::after,
        .proj-case:focus-visible .proj-case__screen::after {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
