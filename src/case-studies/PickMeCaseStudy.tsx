import pickmeBody from "./content/pickme-body.html?raw";
import { EmbeddedCaseStudy } from "./EmbeddedCaseStudy";
import "./styles/pickme.css";

export function PickMeCaseStudy() {
  return <EmbeddedCaseStudy bodyHtml={pickmeBody} studyClass="case-study--pickme" />;
}
