import type { ComponentType } from "react";
import { PickMeCaseStudy } from "./PickMeCaseStudy";
import { RoseCaseStudy } from "./RoseCaseStudy";

const caseStudyComponents: Record<string, ComponentType> = {
  "rose-by-basicare": RoseCaseStudy,
  pickme: PickMeCaseStudy,
};

export function getCaseStudyComponent(
  projectId: string,
): ComponentType | undefined {
  return caseStudyComponents[projectId];
}

export function hasEmbeddedCaseStudy(projectId: string): boolean {
  return projectId in caseStudyComponents;
}
