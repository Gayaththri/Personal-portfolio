import pickmeBody from "./content/pickme-body.html?raw";
import { EmbeddedCaseStudy } from "./EmbeddedCaseStudy";
import "./styles/pickme.css";
import "./styles/pickme-audit.css";

export function PickMeCaseStudy() {
  return <EmbeddedCaseStudy bodyHtml={pickmeBody} studyClass="case-study--pickme" />;
}
