import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { getShowcaseProject } from "../data/showcase-projects";
import { getCaseStudyComponent, hasEmbeddedCaseStudy } from "../case-studies";
import { siteConfig } from "../config";

function useReadingProgress(active: boolean) {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active) return;

    const update = () => {
      const fill = fillRef.current;
      if (!fill) return;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      const pct = Math.min(100, Math.max(0, ratio * 100));
      fill.style.width = `${pct}%`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(document.documentElement);
    }

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      resizeObserver?.disconnect();
    };
  }, [active]);

  return fillRef;
}

export function CaseStudyPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const reduce = useReducedMotion();
  const project = projectId ? getShowcaseProject(projectId) : undefined;
  const EmbeddedStudy =
    projectId && hasEmbeddedCaseStudy(projectId)
      ? getCaseStudyComponent(projectId)
      : undefined;
  const progressFillRef = useReadingProgress(Boolean(EmbeddedStudy));

  useEffect(() => {
    if (!project) return;
    document.title = `${project.title} · ${siteConfig.name}`;
    return () => {
      document.title = siteConfig.name;
    };
  }, [project]);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  if (EmbeddedStudy) {
    return (
      <main id="case-study" className="case-page case-page--embed">
        <div
          className="case-page__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-hidden
        >
          <div ref={progressFillRef} className="case-page__progress-fill" />
        </div>
        <div className="case-page__embed-bar">
          <div className="case-page__embed-bar-inner wrap">
            <Link to="/#projects" className="case-page__embed-back">
              ← Works
            </Link>
            <span className="case-page__embed-crumb" aria-current="page">
              {project.title}
            </span>
          </div>
        </div>
        <EmbeddedStudy />

        <style>{`
          .case-page__progress {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            z-index: 200;
            pointer-events: none;
            background: transparent;
          }
          .case-page__progress-fill {
            display: block;
            height: 100%;
            width: 0;
            background: var(--accent);
          }
          .case-page--embed {
            box-sizing: border-box;
            display: block;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            overflow-x: clip;
            padding: 0;
            background: var(--bg);
            color: var(--text);
          }
          .case-page__embed-bar {
            position: sticky;
            top: var(--topnav-stack);
            z-index: 50;
            padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
            border-bottom: 1px solid var(--border);
            background: color-mix(in srgb, var(--bg-elevated) 82%, transparent);
            -webkit-backdrop-filter: blur(12px);
            backdrop-filter: blur(12px);
          }
          .case-page__embed-bar-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            height: 44px;
            max-height: 44px;
            min-width: 0;
          }
          .case-page__embed-back {
            flex-shrink: 0;
            font-family: var(--font-sans);
            font-size: 0.8125rem;
            font-weight: 600;
            line-height: 1;
            color: var(--text-muted);
            text-decoration: none;
            white-space: nowrap;
            transition: color 0.2s ease;
          }
          .case-page__embed-back:hover {
            color: var(--text);
          }
          .case-page__embed-back:focus-visible {
            outline: 2px solid var(--accent);
            outline-offset: 2px;
            border-radius: 4px;
          }
          .case-page__embed-crumb {
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-family: var(--font-sans);
            font-size: 0.75rem;
            font-weight: 500;
            line-height: 1;
            color: var(--text-soft);
            text-align: right;
          }
          .case-study-content section {
            scroll-margin-top: calc(var(--topnav-stack) + 3rem);
          }
          @media (max-width: 640px) {
            .case-page__embed-bar-inner {
              height: auto;
              min-height: 44px;
              max-height: none;
              padding-block: 0.35rem;
              flex-wrap: wrap;
            }
            .case-page__embed-crumb {
              white-space: normal;
              text-align: left;
              font-size: 0.7rem;
            }
          }
        `}</style>
      </main>
    );
  }

  const screenStyle = project.coverImage
    ? ({
        backgroundImage: `url(${project.coverImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      } as const)
    : ({ background: project.coverGradient } as const);

  return (
    <main id="case-study" className="case-page">
      <div className="case-page__inner wrap">
        <nav className="case-page__crumb" aria-label="Breadcrumb">
          <Link to="/#projects" className="case-page__back">
            ← Back to projects
          </Link>
        </nav>

        <motion.header
          className="case-page__head section-head"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-head__eyebrow">Case study</p>
          <h1 className="section-head__title">{project.title}</h1>
          <p className="case-page__meta">{project.metaLine}</p>
          <p className="section-head__lead case-page__lead">
            {project.description}
          </p>
        </motion.header>

        <motion.div
          className="case-page__hero-visual"
          style={screenStyle}
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
          aria-hidden
        />

        <motion.article
          className="case-page__body"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {project.caseSections.map((section) => (
            <section key={section.heading} className="case-page__section">
              <h2 className="case-page__section-title">{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={`${section.heading}-${i}`} className="case-page__p">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </motion.article>

        {project.externalUrl ? (
          <p className="case-page__external">
            <a
              className="case-page__external-link"
              href={project.externalUrl}
              target="_blank"
              rel="noreferrer"
            >
              View repository / live link ↗
            </a>
          </p>
        ) : null}

        <p className="case-page__footer-link">
          <Link to="/#projects">Return to all projects</Link>
        </p>
      </div>

      <style>{`
        .case-page {
          min-height: 100vh;
          background: var(--bg-elevated);
          color: var(--text);
          padding-block: calc(var(--topnav-stack) + 0.65rem) var(--section-pad-y);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
        }
        .case-page__inner {
          max-width: min(var(--max), 100%);
          margin: 0 auto;
          min-width: 0;
        }
        .case-page__crumb {
          margin-bottom: 1.25rem;
        }
        .case-page__back {
          font-family: var(--font-sans);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .case-page__back:hover {
          color: var(--accent);
        }
        .case-page__head.section-head {
          margin-bottom: var(--section-head-gap);
        }
        .case-page__meta {
          margin: 0 0 0.75rem;
          font-family: var(--font-sans);
          font-size: clamp(0.875rem, 1.8vw, 0.97rem);
          font-weight: 600;
          color: var(--accent-light);
          line-height: 1.4;
        }
        .case-page__lead {
          max-width: 48rem;
        }
        .case-page__hero-visual {
          width: 100%;
          max-width: 100%;
          min-height: clamp(200px, 32vw, 320px);
          border-radius: clamp(16px, 3vw, 24px);
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
          margin-bottom: clamp(1.15rem, 2.5vw, 1.65rem);
        }
        .case-page__body {
          max-width: 48rem;
        }
        .case-page__section + .case-page__section {
          margin-top: clamp(1.15rem, 2.5vw, 1.65rem);
        }
        .case-page__section-title {
          margin: 0 0 0.65rem;
          font-family: var(--font-sans);
          font-size: clamp(1.05rem, 2.2vw, 1.2rem);
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text);
        }
        .case-page__p {
          margin: 0 0 0.85rem;
          font-family: var(--font-sans);
          font-size: clamp(0.9375rem, 1.8vw, 1.02rem);
          line-height: 1.65;
          color: var(--text-muted);
        }
        .case-page__p:last-child {
          margin-bottom: 0;
        }
        .case-page__external {
          margin: clamp(1.75rem, 3vw, 2.25rem) 0 0;
        }
        .case-page__external-link {
          font-family: var(--font-sans);
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 0.2em;
        }
        .case-page__external-link:hover {
          color: var(--text);
        }
        .case-page__footer-link {
          margin: 2rem 0 0;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 600;
        }
        .case-page__footer-link a {
          color: var(--text-muted);
          text-decoration: underline;
          text-underline-offset: 0.18em;
        }
        .case-page__footer-link a:hover {
          color: var(--accent);
        }
      `}</style>
    </main>
  );
}
