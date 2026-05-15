/** Featured case studies — text above a large pastel “well” with screen preview. */
export type CaseStudyWell = "mint" | "sky";

export type CaseStudySection = {
  heading: string;
  paragraphs: string[];
};

export type ShowcaseProject = {
  id: string;
  title: string;
  /** Coral subline, e.g. "Enterprise design • Presentation" */
  metaLine: string;
  /** Short paragraph under the meta line */
  description: string;
  coverImage?: string;
  /** Fills the inner “screen” when no photo */
  coverGradient: string;
  /** Pastel background + pattern for the visual block */
  accentWell?: CaseStudyWell;
  /** Full HTML case study from /public (iframe mode on CaseStudyPage) */
  embeddedHtmlPath?: string;
  /** Long-form sections for the in-app case study page */
  caseSections: CaseStudySection[];
  /** Shown on the case page only (e.g. GitHub) */
  externalUrl?: string;
};

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: "rose-by-basicare",
    title: "Rose by Basicare",
    metaLine: "Beauty eCommerce • K-beauty · Mobile-first UX & brand system",
    description:
      "A complete eCommerce experience for a new K-beauty sub-brand—mobile-first UX, visual identity, AR try-on planning, and a scalable brand system. From brief toward launch in 3–4 months.",
    coverGradient:
      "linear-gradient(160deg, #fceef0 0%, #f9e8ea 45%, #f4dde0 100%, #e8c4cb 100%)",
    accentWell: "mint",
    embeddedHtmlPath: "/case-studies/rose-by-basicare.html",
    caseSections: [],
  },
  {
    id: "prose-meet",
    title: "PROSE-MEET",
    metaLine: "AI & governance • Final-year capstone",
    description:
      "An AI-assisted workflow for meeting summaries and lightweight governance—built to help teams capture decisions clearly and move faster with less manual overhead.",
    coverGradient:
      "linear-gradient(135deg, #0f172a 0%, #1e3a5f 42%, #312e81 88%, #1e1b4b 100%)",
    accentWell: "sky",
    externalUrl: "https://github.com/srigayaththri",
    caseSections: [
      {
        heading: "Context",
        paragraphs: [
          "PROSE-MEET started as a capstone problem: teams lose nuance in meeting notes, and governance asks for traceability without adding heavy process. The goal was a lightweight flow that nudges structure instead of forcing templates.",
          "I focused on how summaries are produced, reviewed, and shared—so the product could stay opinionated about clarity while remaining flexible for different team sizes.",
        ],
      },
      {
        heading: "What I explored",
        paragraphs: [
          "Workflows for capture → draft summary → quick human edit → publish, with simple roles so accountability stays visible.",
          "UX patterns that reduce fear of “AI replacing notes”: transparent sourcing, diff-friendly output, and defaults that favor short, scannable updates.",
        ],
      },
      {
        heading: "Outcome",
        paragraphs: [
          "A coherent narrative for the experience and a prototype direction teams could react to—prioritizing trust, speed, and low ceremony over feature sprawl.",
        ],
      },
    ],
  },
];

export function getShowcaseProject(id: string): ShowcaseProject | undefined {
  return showcaseProjects.find((p) => p.id === id);
}
