import { TechStackIconsRow } from "./TechStack";

const SKILL_GROUPS = [
  {
    id: "analysis",
    label: "ANALYSIS",
    items: [
      "Requirement gathering",
      "User stories",
      "Workflow documentation",
      "Business process analysis",
      "Stakeholder communication",
    ],
  },
  {
    id: "design",
    label: "DESIGN",
    items: ["Figma", "Photoshop", "User flows", "Interface design", "Prototyping", "UX Research"],
  },
  {
    id: "delivery",
    label: "DELIVERY",
    items: ["Agile (Scrum)", "Jira & Confluence", "Cross-functional collaboration"],
  },
  {
    id: "data-dev",
    label: "DATA & DEV",
    items: ["SQL & Excel", "Power BI", "React", "Python & Node.js"],
  },
] as const;

export function AboutSkillsScrapbook() {
  return (
      <div id="skills" className="about-scrap">
      <div className="about-scrap__inner">
        <header className="about-scrap__head section-head">
          <p className="section-head__eyebrow">Skills</p>
          <h2 className="section-head__title">Skills</h2>
          <p className="section-head__lead">
            Grouped by analysis, design, delivery, and technical work.
          </p>
        </header>

        <div className="about-scrap__rows">
          {SKILL_GROUPS.map((group) => (
            <div key={group.id} className="about-scrap__row">
              <span className="about-scrap__cat">{group.label}</span>
              <ul className="about-scrap__pills">
                {group.items.map((item) => (
                  <li key={item}>
                    <span className="about-scrap__pill">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="about-scrap__tools-strip">
          <TechStackIconsRow />
        </div>
      </div>

      <style>{`
        .about-scrap {
          max-width: var(--max);
          margin: 0 auto;
          width: 100%;
        }
        .about-scrap__inner {
          max-width: 100%;
        }
        .about-scrap__rows {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
        }
        .about-scrap__row {
          display: grid;
          grid-template-columns: minmax(5.5rem, 7.5rem) minmax(0, 1fr);
          column-gap: 1.25rem;
          row-gap: 0.5rem;
          align-items: start;
        }
        .about-scrap__cat {
          grid-column: 1;
          padding-top: 0.35rem;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-muted);
          line-height: 1.2;
        }
        .about-scrap__pills {
          grid-column: 2;
          min-width: 0;
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem 0.5rem;
        }
        .about-scrap__pills li {
          margin: 0;
          flex-shrink: 0;
        }
        .about-scrap__pill {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 999px;
          border: 1px solid var(--border);
          background: var(--bg-elevated);
          font-size: 0.875rem;
          line-height: 1.35;
          font-weight: 500;
          color: var(--text);
          white-space: nowrap;
        }
        .about-scrap__tools-strip {
          width: 100%;
          min-width: 0;
          margin-top: clamp(1.15rem, 2.5vw, 1.5rem);
          padding-top: clamp(0.5rem, 1.5vw, 0.75rem);
          padding-bottom: clamp(0.35rem, 1vw, 0.5rem);
        }
        .about-scrap__tools-strip .tech-stack__viewport {
          padding-top: 0.35rem;
          padding-bottom: 0.5rem;
        }
        @media (max-width: 520px) {
          .about-scrap__row {
            grid-template-columns: 1fr;
            row-gap: 0.5rem;
          }
          .about-scrap__cat {
            grid-column: 1;
            padding-top: 0;
          }
          .about-scrap__pills {
            grid-column: 1;
          }
        }
      `}</style>
    </div>
  );
}
