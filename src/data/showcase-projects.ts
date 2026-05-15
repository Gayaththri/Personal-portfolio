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
    id: "pickme",
    title: "PickMe",
    metaLine: "Mobility · Ride tracking · UX case study",
    description:
      "A workflow-focused UX redesign of PickMe's ride tracking experience—reducing rider anxiety, improving transparency, and rebuilding trust during the most emotionally charged moments of a ride.",
    coverGradient:
      "linear-gradient(145deg, #fff4ed 0%, #ffe8d9 42%, #ffd4bc 100%)",
    accentWell: "sky",
    embeddedHtmlPath: "/case-studies/pickme.html",
    caseSections: [],
  },
];

export function getShowcaseProject(id: string): ShowcaseProject | undefined {
  return showcaseProjects.find((p) => p.id === id);
}
