import type { ReactNode } from "react";

export type FunFactDoodleId =
  | "books"
  | "pin"
  | "plane"
  | "headphones"
  | "stethoscope"
  | "sparkles";

type FunFactDoodleProps = {
  id: FunFactDoodleId;
  className?: string;
};

/** Hand-drawn style icons — clear silhouettes matched to each fun fact */
const DOODLE_PATHS: Record<FunFactDoodleId, ReactNode> = {
  books: (
    <>
      <path
        d="M16 6.5C13 8.5 9.5 9.5 7 9.5V22.5C9.5 21 13 19.5 16 18.5V6.5Z"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path d="M16 6.5C19 8.5 22.5 9.5 25 9.5V22.5C22.5 21 19 19.5 16 18.5V6.5Z" />
      <path d="M16 6.5V18.5" />
      <path d="M10 12H13M19 12H22" />
    </>
  ),
  pin: (
    <>
      <path
        d="M16 27.5C16 27.5 9.5 20.5 9.5 14a6.5 6.5 0 1 1 13 0c0 6.5-6.5 13.5-6.5 13.5Z"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path d="M16 27.5C16 27.5 9.5 20.5 9.5 14a6.5 6.5 0 1 1 13 0c0 6.5-6.5 13.5-6.5 13.5Z" />
      <circle cx="16" cy="14" r="2.25" />
    </>
  ),
  plane: (
    <>
      <path
        d="M16 5L5 14.5H12.5L11 24.5L16 20.5L21 24.5L19.5 14.5H27L16 5Z"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path d="M16 5L5 14.5H12.5L11 24.5L16 20.5L21 24.5L19.5 14.5H27L16 5Z" />
      <path d="M13 17.5L16 15.5L19 17.5" />
    </>
  ),
  headphones: (
    <>
      <path d="M8 18.5V13a8 8 0 0 1 16 0v5.5" />
      <path
        d="M6 18.5H9.5C10.6 18.5 11.5 19.5 11.5 20.5V24c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-3.5c0-1 1-1.5 2-1.5Z"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path d="M6 18.5H9.5C10.6 18.5 11.5 19.5 11.5 20.5V24c0 1.1-.9 2-2 2H8c-1.1 0-2-.9-2-2v-3.5c0-1 1-1.5 2-1.5Z" />
      <path
        d="M26 18.5H22.5C21.4 18.5 20.5 19.5 20.5 20.5V24c0 1.1.9 2 2 2h1.5c1.1 0 2-.9 2-2v-3.5c0-1-1-1.5-2-1.5Z"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <path d="M26 18.5H22.5C21.4 18.5 20.5 19.5 20.5 20.5V24c0 1.1.9 2 2 2h1.5c1.1 0 2-.9 2-2v-3.5c0-1-1-1.5-2-1.5Z" />
    </>
  ),
  stethoscope: (
    <>
      <path d="M10.5 8.5h2.5a2.5 2.5 0 0 1 0 5h-1" />
      <path d="M21.5 8.5h-2.5a2.5 2.5 0 0 0 0 5h1" />
      <path d="M12 13.5v2.5a4 4 0 0 0 8 0v-2" />
      <path d="M16 19.5v2" />
      <circle
        cx="16"
        cy="25"
        r="3"
        fill="currentColor"
        fillOpacity="0.08"
      />
      <circle cx="16" cy="25" r="3" />
    </>
  ),
  sparkles: (
    <>
      <path
        d="M16 4l1.2 3.6L21 8.8l-3.8 1.2L16 14l-1.2-3.8L11 8.8l3.8-1.2L16 4z"
        fill="currentColor"
        fillOpacity="0.1"
      />
      <path d="M16 4l1.2 3.6L21 8.8l-3.8 1.2L16 14l-1.2-3.8L11 8.8l3.8-1.2L16 4z" />
      <path d="M7 17l.8 2.2L10 20l-2.2.7L7 23l-.8-2.3L4 20l2.2-.8L7 17z" />
      <path d="M24 16l.5 1.5L26 18l-1.5.5L24 20l-.5-1.5L22 18l1.5-.5L24 16z" />
    </>
  ),
};

export function FunFactDoodle({ id, className }: FunFactDoodleProps) {
  return (
    <svg
      className={className}
      width="36"
      height="36"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <g
        stroke="currentColor"
        strokeWidth="1.65"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {DOODLE_PATHS[id]}
      </g>
    </svg>
  );
}
