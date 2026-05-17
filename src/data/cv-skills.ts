/** Pulled from CV (Technical & Tools + Business Analysis). */

export const cvToolIds = ["figma", "photoshop", "react", "jira", "powerbi", "sql"] as const;

export type CvToolId = (typeof cvToolIds)[number];

export const cvSkillPrinciples: [string, string] = [
  "Requirement gathering, workflow analysis, and documentation that turn fuzzy stakeholder needs into clear user stories and implementable scope.",
  "User flows, interface design, and prototyping in Figma-validated with QA/UAT and delivered in Agile, cross-functional teams.",
];

/** BA / process */
export const cvSkillsColumnA: string[] = [
  "Requirement gathering",
  "Business process analysis",
  "Workflow documentation",
  "User stories",
  "Stakeholder communication",
  "UAT & QA",
];

/** Tools & delivery */
export const cvSkillsColumnB: string[] = [
  "Agile (Scrum)",
  "SQL & Excel",
  "Power BI",
  "Jira & Confluence",
  "Figma & Photoshop",
  "React, Python & Node.js",
];
