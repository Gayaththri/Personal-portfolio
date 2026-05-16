import roseBody from "./content/rose-body.html?raw";
import { EmbeddedCaseStudy } from "./EmbeddedCaseStudy";
import "./styles/rose.css";
import "./styles/rose-audit.css";

export function RoseCaseStudy() {
  return <EmbeddedCaseStudy bodyHtml={roseBody} studyClass="case-study--rose" />;
}
