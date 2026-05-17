export type WorkExperienceEntry = {
  id: string;
  /** Shown top-left on the card (e.g. year span) */
  range: string;
  title: string;
  company: string;
  /** Single paragraph, or a short bullet list (each item one line). */
  description: string | readonly string[];
};

export const workExperienceEntries: WorkExperienceEntry[] = [
  {
    id: "meridian-junior",
    range: "Jan 2025 – Nov 2025",
    title: "Junior UI/UX Designer",
    company: "Meridian Creative Solutions",
    description: [
      "Owned end-to-end interface work on client projects-discovery workshops, user flows, and polished Figma handoffs.",
      "Partnered with developers on responsive layouts, component consistency, and accessibility-minded specs.",
      "Shipped iterations quickly while keeping documentation clear for stakeholders.",
    ],
  },
  {
    id: "meridian-intern",
    range: "Jul 2024 – Dec 2024",
    title: "UI/UX Intern",
    company: "Meridian Creative Solutions",
    description:
      "Supported senior designers with wireframes, visual polish, and design QA across marketing and product surfaces. Contributed to research notes, mood boards, and prototype reviews-building a strong baseline in agile rituals, critique, and translating feedback into concrete UI updates.",
  },
];
