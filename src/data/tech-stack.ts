/** IDs map to icons in `TechStack.tsx`. Edit names / blurbs anytime. */
export const techStackItemIds = [
  "notion",
  "framer",
  "figma",
  "midjourney",
  "vscode",
  "claude",
  "lottiefiles",
  "premiere",
  "gemini",
  "chatgpt",
  "react",
  "jira",
  "powerbi",
  "sql",
  "photoshop",
] as const;

export type TechStackItemId = (typeof techStackItemIds)[number];

export const techStackMeta: Record<
  TechStackItemId,
  { name: string; description: string }
> = {
  notion: {
    name: "Notion",
    description: "Docs, wikis & project hubs in one connected workspace.",
  },
  framer: {
    name: "Framer",
    description: "Interactive sites, motion, and publish-ready prototypes.",
  },
  figma: {
    name: "Figma",
    description: "UI systems, prototyping, and dev-ready handoff.",
  },
  midjourney: {
    name: "Midjourney",
    description: "AI imagery for mood boards and visual exploration.",
  },
  vscode: {
    name: "Visual Studio Code",
    description: "Fast editing, extensions, and debugging in one editor.",
  },
  claude: {
    name: "Claude",
    description: "Long-context AI for drafting, analysis, and research.",
  },
  lottiefiles: {
    name: "LottieFiles",
    description: "Lightweight motion assets for web and product polish.",
  },
  premiere: {
    name: "Adobe Premiere Pro",
    description: "Timeline editing for reels, cuts, and story pacing.",
  },
  gemini: {
    name: "Google Gemini",
    description: "Multimodal AI for summaries, ideas, and quick research.",
  },
  chatgpt: {
    name: "ChatGPT",
    description: "Brainstorming, copy iteration, and structured Q&A.",
  },
  react: {
    name: "React",
    description: "Component-based UI for scalable product interfaces.",
  },
  jira: {
    name: "Jira",
    description: "Backlogs, sprints, and traceability across delivery.",
  },
  powerbi: {
    name: "Power BI",
    description: "Dashboards and self-serve analytics for stakeholders.",
  },
  sql: {
    name: "SQL",
    description: "Querying, joins, and checks on structured business data.",
  },
  photoshop: {
    name: "Adobe Photoshop",
    description: "Raster editing, comps, and asset prep for screens.",
  },
};
