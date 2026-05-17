import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FunFactDoodle, type FunFactDoodleId } from "./FunFactDoodles";

const FACTS: { doodle: FunFactDoodleId; text: string }[] = [
  { doodle: "books", text: "probably lost in a book again" },
  { doodle: "pin", text: "pinterest is basically my second home" },
  { doodle: "plane", text: "always planning the next trip somewhere new" },
  { doodle: "headphones", text: "there's always music in the background" },
  {
    doodle: "stethoscope",
    text: "thought I'd become a doctor - ended up in UX instead",
  },
  { doodle: "sparkles", text: "I reorganize Figma files when I'm procrastinating" },
];

const CARD_ROTATIONS = ["0deg", "0deg", "0deg", "0deg", "0deg", "0deg"] as const;
const CARD_BACKGROUNDS = [
  "var(--bg-elevated)",
  "var(--bg-elevated)",
  "var(--bg-elevated)",
  "var(--bg-elevated)",
  "var(--bg-elevated)",
  "var(--bg-elevated)",
] as const;

export function FunFacts() {
  const reduce = useReducedMotion();

  return (
    <section id="fun-facts" className="funfacts" aria-labelledby="funfacts-heading">
      <div className="funfacts__inner wrap">
        <header className="funfacts__head section-head">
          <p className="section-head__eyebrow">Personality</p>
          <h2 id="funfacts-heading" className="section-head__title section-head__title--sans">
            Fun Facts
          </h2>
        </header>

        <ul className="funfacts__grid">
          {FACTS.map((fact, i) => (
            <motion.li
              key={fact.text}
              className="funfacts__card"
              style={
                {
                  "--card-rotate": CARD_ROTATIONS[i],
                  "--card-bg": CARD_BACKGROUNDS[i],
                } as CSSProperties
              }
              initial={reduce ? false : { opacity: 0 }}
              whileInView={reduce ? undefined : { opacity: 1 }}
              viewport={{ once: true, margin: "-6%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.04 * i }}
            >
              <FunFactDoodle id={fact.doodle} className="funfacts__doodle" />
              <p className="funfacts__text">{fact.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>

      <style>{`
        .funfacts {
          padding-block: var(--section-pad-y);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
          border-top: 1px solid var(--border);
        }
        .funfacts__inner {
          max-width: var(--max);
          margin: 0 auto;
          width: 100%;
          min-width: 0;
        }
        .funfacts__head.section-head {
          margin-bottom: var(--section-head-gap);
        }
        .funfacts__head .section-head__title {
          font-size: clamp(1.5rem, 3.5vw, 2rem);
          font-weight: 700;
        }
        .funfacts__grid {
          list-style: none;
          margin: 0;
          padding: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.65rem;
        }
        @media (min-width: 640px) {
          .funfacts__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (min-width: 900px) {
          .funfacts__grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 0.85rem;
          }
        }
        .funfacts__card {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 1.15rem 1.25rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          background: var(--card-bg);
          box-shadow: none;
          transform: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .funfacts__card:hover {
          border-color: color-mix(in srgb, var(--accent) 35%, var(--border));
          box-shadow: var(--shadow-sm);
        }
        .funfacts__doodle {
          display: block;
          width: 36px;
          height: 36px;
          flex-shrink: 0;
          color: #1e293b;
        }
        .funfacts__text {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 15px;
          font-weight: 500;
          line-height: 1.55;
          color: #0f172a;
        }
      `}</style>
    </section>
  );
}
