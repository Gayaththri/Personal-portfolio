import { AboutSkillsScrapbook } from "./AboutSkillsScrapbook";
import { WorkExperience } from "./WorkExperience";

export function About() {
  return (
    <>
      <section id="about" className="about-work" aria-label="Work experience">
        <WorkExperience />
      </section>
      <div className="about-skillstack">
        <AboutSkillsScrapbook />
      </div>
      <style>{`
        .about-work {
          background: var(--bg-elevated);
          border-top: 1px solid var(--border);
        }
        .about-skillstack {
          background: var(--bg);
          border-top: 1px solid var(--border);
          padding-block: var(--section-pad-y);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
          display: flex;
          flex-direction: column;
          gap: clamp(1.25rem, 3vw, 2rem);
        }
      `}</style>
    </>
  );
}
