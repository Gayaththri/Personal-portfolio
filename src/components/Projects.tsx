import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { showcaseProjects } from "../data/showcase-projects";

type WorkRow = {
  id: string;
  number: string;
  title: string;
  tags: string[];
  description: string;
  accent: string;
  flipped: boolean;
};

const WORK_ROWS: WorkRow[] = [
  {
    id: "rose-by-basicare",
    number: "01",
    title: "Rose by Basicare",
    tags: ["Beauty eCommerce", "K-beauty", "Mobile-first"],
    description:
      "End-to-end UX and brand system design for a mobile-first K-beauty eCommerce platform.",
    accent: "#c96b5c",
    flipped: true,
  },
  {
    id: "prose-meet",
    number: "02",
    title: "PROSE–MEET",
    tags: ["AI & governance", "Final-year capstone"],
    description:
      "AI-assisted meeting workflow tool designed to help teams capture decisions and move faster.",
    accent: "#4f46e5",
    flipped: false,
  },
];

function getProjectVisual(id: string): CSSProperties {
  const project = showcaseProjects.find((p) => p.id === id);
  if (!project) return { background: "var(--bg-elevated)" };
  if (project.coverImage) {
    return {
      backgroundImage: `url(${project.coverImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  return { background: project.coverGradient };
}

function WorkRowItem({ row, index }: { row: WorkRow; index: number }) {
  const reduce = useReducedMotion();
  const visualStyle = getProjectVisual(row.id);
  const caseHref = `/case/${row.id}`;

  return (
    <motion.div
      className="works-row-wrap"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6%" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 * index }}
    >
      <Link
        to={caseHref}
        className={`works-row${row.flipped ? " works-row--flip" : ""}`}
        style={{ "--row-accent": row.accent } as CSSProperties}
        aria-label={`View case study: ${row.title}`}
      >
        <div className="works-row__text">
          <p className="works-row__num" aria-hidden>
          {row.number}
        </p>
        <h3 className="works-row__title">{row.title}</h3>
        <ul className="works-row__tags" aria-label="Categories">
          {row.tags.map((tag) => (
            <li key={tag}>
              <span className="works-row__tag">{tag}</span>
            </li>
          ))}
        </ul>
        <p className="works-row__desc">{row.description}</p>
        <span className="works-row__cta">View case study →</span>
      </div>

      <div className="works-row__media">
        <div className="works-row__media-frame">
          <div className="works-row__media-inner" style={visualStyle} aria-hidden />
        </div>
      </div>
      </Link>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="works">
      <div className="works__inner wrap">
        <header className="works__head section-head">
          <p className="section-head__eyebrow">Selected works</p>
          <h2 className="section-head__title section-head__title--sans works__title">
            Case studies &amp; product work
          </h2>
        </header>

        <div className="works__stack">
          {WORK_ROWS.map((row, i) => (
            <WorkRowItem key={row.id} row={row} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        .works {
          background: var(--bg);
          color: var(--text);
          padding-top: clamp(1rem, 2.5vw, 1.75rem);
          padding-bottom: var(--section-pad-y);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
        }
        .works__inner {
          max-width: var(--max);
          margin: 0 auto;
          width: 100%;
        }
        .works__head.section-head {
          margin-bottom: var(--section-head-gap);
          max-width: 100%;
        }
        .works__title.section-head__title {
          font-size: clamp(1.35rem, 2.8vw + 0.35rem, 2rem);
          white-space: nowrap;
          max-width: 100%;
        }
        @media (max-width: 520px) {
          .works__title.section-head__title {
            white-space: normal;
          }
        }
        .works__stack {
          display: flex;
          flex-direction: column;
          width: 100%;
        }
        .works-row-wrap + .works-row-wrap {
          border-top: 1px solid var(--border);
        }
        .works-row {
          position: relative;
          isolation: isolate;
          display: grid;
          grid-template-columns: minmax(0, 55%) minmax(0, 45%);
          gap: clamp(1.15rem, 3vw, 2rem);
          align-items: center;
          padding: clamp(0.9rem, 2.25vw, 1.35rem) clamp(0.5rem, 2vw, 1rem);
          margin: 0;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          border-radius: 12px;
        }
        .works-row::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: var(--bg-elevated);
          opacity: 0;
          transition: opacity 0.2s ease;
          z-index: -1;
        }
        .works-row:hover::before {
          opacity: 1;
        }
        .works-row:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .works-row__text,
        .works-row__media {
          position: relative;
          z-index: 1;
        }
        .works-row--flip {
          grid-template-columns: minmax(0, 45%) minmax(0, 55%);
        }
        .works-row--flip .works-row__text {
          order: 2;
        }
        .works-row--flip .works-row__media {
          order: 1;
        }
        .works-row__text {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
        }
        .works-row__num {
          margin: 0 0 0.75rem;
          font-family: var(--font-sans);
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--text-muted);
          transition: color 0.35s ease;
        }
        .works-row:hover .works-row__num {
          color: var(--row-accent);
        }
        .works-row__title {
          margin: 0 0 0.75rem;
          font-family: var(--font-sans);
          font-size: clamp(1.75rem, 2.8vw, 2rem);
          font-weight: 800;
          letter-spacing: -0.03em;
          line-height: 1.12;
          color: var(--text);
        }
        .works-row__tags {
          list-style: none;
          margin: 0 0 1rem;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
        }
        .works-row__tag {
          display: inline-block;
          padding: 0.3rem 0.65rem;
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          line-height: 1.3;
          color: var(--text-muted);
          background: var(--bg-elevated);
          border: 1px solid var(--border);
          border-radius: 999px;
        }
        .works-row__desc {
          margin: 0 0 1.25rem;
          max-width: 34rem;
          font-family: var(--font-sans);
          font-size: clamp(0.9375rem, 1.6vw, 1rem);
          font-weight: 400;
          line-height: 1.55;
          color: var(--text-muted);
        }
        .works-row__cta {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          font-weight: 600;
          line-height: 1.4;
          color: #0f172a;
          text-decoration: underline;
          text-decoration-color: transparent;
          text-underline-offset: 3px;
          transition: text-decoration-color 0.2s ease, color 0.2s ease;
        }
        .works-row:hover .works-row__cta {
          text-decoration-color: currentColor;
        }
        .works-row__media {
          min-width: 0;
        }
        .works-row__media-frame {
          position: relative;
          border-radius: 12px;
          border: 1px solid var(--border);
          overflow: hidden;
          background: var(--bg-elevated);
          aspect-ratio: 4 / 3;
          contain: layout paint;
        }
        .works-row__media-inner {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          will-change: transform;
          transform: scale(1);
          transform-origin: center center;
          transition: transform 0.35s ease;
        }
        .works-row:hover .works-row__media-inner {
          transform: scale(1.03);
        }
        @media (prefers-reduced-motion: reduce) {
          .works-row__media-inner {
            transition: none;
          }
          .works-row:hover .works-row__media-inner {
            transform: none;
          }
          .works-row__num {
            transition: none;
          }
        }
        @media (max-width: 768px) {
          .works-row,
          .works-row--flip {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .works-row--flip .works-row__text,
          .works-row--flip .works-row__media {
            order: unset;
          }
          .works-row__media-frame {
            aspect-ratio: 16 / 10;
          }
        }
      `}</style>
    </section>
  );
}
