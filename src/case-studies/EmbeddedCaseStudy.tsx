import { useCaseStudyEffects } from "./useCaseStudyEffects";
import "./case-theme.css";

type EmbeddedCaseStudyProps = {
  bodyHtml: string;
  studyClass: string;
};

export function EmbeddedCaseStudy({ bodyHtml, studyClass }: EmbeddedCaseStudyProps) {
  const rootRef = useCaseStudyEffects();

  return (
    <div
      ref={rootRef}
      className={`case-study-content ${studyClass}`}
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  );
}
