import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { showcaseProjects, type ShowcaseProject } from "../data/showcase-projects";

function ProjectCard({ project, index }: { project: ShowcaseProject; index: number }) {
  const reduce = useReducedMotion();
  const coverStyle = project.coverImage
    ? ({
        backgroundImage: `url(${project.coverImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } as const)
    : ({ background: project.coverGradient } as const);

  return (
    <Link to={`/case/${project.id}`} className="work-card">
      <motion.article
        className="work-card__inner"
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 * index }}
      >
        <motion.div
          className="work-card__cover"
          style={coverStyle}
          aria-hidden
          whileHover={reduce ? undefined : { scale: 1.01 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div className="work-card__body">
          <h3 className="work-card__title">{project.title}</h3>
          <p className="work-card__meta">{project.metaLine}</p>
        </motion.div>
      </motion.article>
    </Link>
  );
}

export function Projects() {
  return (
    <section id="projects" className="works">
      <motion.div
        className="works__inner wrap"
        initial={false}
      >
        <header className="works__head section-head">
          <p className="section-head__eyebrow">Selected Works</p>
          <h2 className="section-head__title section-head__title--sans">
            Case studies &amp; product work
          </h2>
        </header>

        <div className="works__list">
          {showcaseProjects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </motion.div>

      <style>{`
        .works {
          background: var(--bg);
          color: var(--text);
          padding-block: var(--section-pad-y);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
        }
        .works__inner {
          max-width: var(--max);
          margin: 0 auto;
        }
        .works__head.section-head {
          margin-bottom: clamp(1.25rem, 3vw, 1.75rem);
          max-width: 32rem;
        }
        .works__list {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          max-width: 36rem;
        }
        .work-card {
          display: block;
          text-decoration: none;
          color: inherit;
        }
        .work-card:focus-visible {
          outline: none;
        }
        .work-card:focus-visible .work-card__cover {
          outline: 2px solid var(--accent);
          outline-offset: 4px;
        }
        .work-card__inner {
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
        }
        .work-card__cover {
          width: 100%;
          height: clamp(7.5rem, 22vw, 9.5rem);
          border-radius: 10px;
          border: 1px solid var(--border);
          background-color: var(--bg-elevated);
          overflow: hidden;
          transform-origin: center;
        }
        .work-card__body {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 0;
        }
        .work-card__title {
          margin: 0;
          font-family: var(--font-sans);
          font-size: clamp(0.9375rem, 1.8vw, 1.0625rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 1.3;
          color: var(--text);
        }
        .work-card__meta {
          margin: 0;
          font-family: var(--font-sans);
          font-size: clamp(0.75rem, 1.4vw, 0.8125rem);
          font-weight: 500;
          line-height: 1.4;
          color: var(--text-muted);
        }
        @media (min-width: 640px) {
          .works__list {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-width: 52rem;
            gap: 1.25rem 1.5rem;
          }
          .work-card__cover {
            height: clamp(7rem, 14vw, 8.5rem);
          }
        }
      `}</style>
    </section>
  );
}
