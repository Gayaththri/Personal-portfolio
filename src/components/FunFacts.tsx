import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../config";
import aboutPortrait from "../assets/about-portrait.png";

const STROKE = "var(--accent-2)";

const FACTS: { icon: "book" | "pin" | "game" | "music" | "scope" | "phone" | "sparkle"; text: string }[] = [
  { icon: "book", text: "📚 probably lost in a book again" },
  { icon: "pin", text: "📌 pinterest is basically my second home" },
  { icon: "game", text: "🎮 I play games… very competitively" },
  { icon: "music", text: "🎧 there’s always music in the background" },
  { icon: "scope", text: "🩺 thought I’d become a doctor. now I diagnose UX problems" },
  { icon: "phone", text: "📱 I redesign apps in my head for fun" },
  { icon: "sparkle", text: "✨ turning chaos into organized systems is oddly satisfying" },
];

function DoodleIcon({ name }: { name: (typeof FACTS)[number]["icon"] }) {
  const stroke = STROKE;
  const common = {
    fill: "none" as const,
    stroke,
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "book":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
          <path {...common} d="M12 8h16v24H12z M20 8v24 M14 12h5 M21 16h5" />
        </svg>
      );
    case "pin":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
          <path {...common} d="M20 6c-4 0-7 3-7 7 0 5 7 15 7 15s7-10 7-15c0-4-3-7-7-7z M20 13v3" />
        </svg>
      );
    case "game":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
          <path
            {...common}
            d="M10 18h20a6 6 0 016 6v2a4 4 0 01-4 4H8a4 4 0 01-4-4v-2a6 6 0 016-6z M14 22h4 M16 20v4 M24 21h2 M27 24h2"
          />
        </svg>
      );
    case "music":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
          <path {...common} d="M14 26V10l14-3v16 M14 26a3 3 0 003 3 3 3 0 003-3 M24 23a3 3 0 003 3 3 3 0 003-3" />
        </svg>
      );
    case "scope":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
          <path {...common} d="M8 28c4-8 12-14 22-16 M26 12l6-6 M10 30l4-4 M18 22a5 5 0 105 5" />
        </svg>
      );
    case "phone":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
          <path {...common} d="M14 6h12a3 3 0 013 3v22a3 3 0 01-3 3H14a3 3 0 01-3-3V9a3 3 0 013-3z M20 30h.01" />
        </svg>
      );
    case "sparkle":
      return (
        <svg width="40" height="40" viewBox="0 0 40 40" aria-hidden>
          <path
            {...common}
            d="M20 4l1.5 7 7 1.5-7 1.5L20 22l-1.5-7-7-1.5 7-1.5L20 4z M28 24l1 4 4 1-4 1-1 4-1-4-4-1 4-1 1-4z"
          />
        </svg>
      );
    default:
      return null;
  }
}

function PhoneSketch() {
  const handle = "srigayaththri";
  const first = siteConfig.name.split(" ")[0] ?? siteConfig.name;
  return (
    <div className="funfacts__phone">
      <svg className="funfacts__phone-outline" viewBox="0 0 220 420" aria-hidden>
        <path
          fill="none"
          stroke={STROKE}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M36 52c-2-8 4-18 14-20l132-6c12-1 22 6 24 18l10 260c2 14-6 28-20 30l-120 8c-14 1-26-8-28-22L34 72c-1-6 0-14 2-20z"
        />
      </svg>
      <div className="funfacts__phone-inner">
        <header className="funfacts__phone-head">
          <span className="funfacts__handle">@{handle}</span>
          <span className="funfacts__emoji" aria-hidden>
            🙂
          </span>
        </header>
        <p className="funfacts__role">{siteConfig.title}</p>
        <p className="funfacts__bio">
          {first} — <abbr title="Bachelor of Science">BSc</abbr> CS, books in one hand and user flows in the other.
        </p>
        <div className="funfacts__grid" aria-hidden>
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className={`funfacts__cell funfacts__cell--${i}`}>
              {i === 4 ? (
                <img src={aboutPortrait} alt="" className="funfacts__cell-photo" width={120} height={120} loading="lazy" />
              ) : null}
            </div>
          ))}
        </div>
        <div className="funfacts__phone-footer">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="none"
              stroke={STROKE}
              strokeWidth="1.6"
              strokeLinecap="round"
              d="M7 7h10v10H7z M9 9h6v6H9z M12 17v3 M11 21h2"
            />
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="none"
              stroke={STROKE}
              strokeWidth="1.6"
              strokeLinecap="round"
              d="M8 16V8l8-2v10 M8 16a2 2 0 004 0 M14 14a2 2 0 004 0"
            />
          </svg>
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
            <path
              fill="none"
              stroke={STROKE}
              strokeWidth="1.6"
              strokeLinejoin="round"
              d="M12 3l1.8 5.5L19 10l-4.5 2.5L12 18l-2.5-5.5L5 10l5.2-1.5L12 3z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export function FunFacts() {
  const reduce = useReducedMotion();

  return (
    <section id="fun-facts" className="funfacts section" aria-labelledby="funfacts-heading">
      <div className="wrap">
        <header className="funfacts__head">
          <p className="section__label">Personality</p>
          <h2 id="funfacts-heading" className="section__title">
            Fun Facts
          </h2>
        </header>

        <div className="funfacts__layout">
          <motion.div
            className="funfacts__col funfacts__col--phone"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <PhoneSketch />
            <p className="funfacts__arrow-note">
              <span className="funfacts__arrow" aria-hidden>
                ↖
              </span>
              that&apos;s me in the middle grid :)
            </p>
          </motion.div>

          <div className="funfacts__col funfacts__col--facts">
            {FACTS.map((f, i) => (
              <motion.div
                key={f.text}
                className={`funfacts__fact funfacts__fact--i${i}`}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.04 * i }}
              >
                <div className="funfacts__fact-icon" aria-hidden>
                  <DoodleIcon name={f.icon} />
                </div>
                <p className="funfacts__fact-text">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .funfacts {
          background: var(--bg);
          border-top: 1px solid var(--border);
        }
        .funfacts__head {
          margin-bottom: var(--section-head-gap);
        }
        .funfacts__layout {
          display: grid;
          gap: var(--section-grid-gap);
          align-items: start;
        }
        @media (min-width: 880px) {
          .funfacts__layout {
            grid-template-columns: minmax(260px, 0.95fr) minmax(0, 1.15fr);
            gap: var(--section-grid-gap);
          }
        }
        .funfacts__col--phone {
          position: relative;
          justify-self: center;
          max-width: 280px;
        }
        .funfacts__phone {
          position: relative;
          width: 100%;
          max-width: 260px;
          margin: 0 auto;
        }
        .funfacts__phone-outline {
          position: absolute;
          inset: -3% -5% -4% -5%;
          width: 110%;
          height: 104%;
          pointer-events: none;
          opacity: 0.92;
        }
        .funfacts__phone-inner {
          position: relative;
          z-index: 1;
          padding: 1.35rem 1.1rem 1rem;
          border-radius: 22px;
          background: linear-gradient(
            165deg,
            var(--bg-elevated) 0%,
            color-mix(in srgb, var(--bg) 55%, var(--bg-elevated)) 100%
          );
          border: 1px solid var(--border);
          box-shadow: var(--shadow-md);
        }
        .funfacts__phone-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          margin-bottom: 0.35rem;
        }
        .funfacts__handle {
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          color: var(--accent-2);
        }
        .funfacts__emoji {
          font-size: 1rem;
          opacity: 0.9;
        }
        .funfacts__role {
          margin: 0 0 0.5rem;
          font-size: 0.72rem;
          line-height: 1.35;
          font-weight: 500;
          color: var(--text-muted);
        }
        .funfacts__bio {
          margin: 0 0 0.85rem;
          font-size: 0.72rem;
          line-height: 1.5;
          color: var(--text-soft);
        }
        .funfacts__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 5px;
          margin-bottom: 0.85rem;
        }
        .funfacts__cell {
          aspect-ratio: 1;
          border-radius: 6px;
          overflow: hidden;
          background: color-mix(in srgb, var(--text) 8%, var(--bg));
        }
        .funfacts__cell--0,
        .funfacts__cell--2,
        .funfacts__cell--6,
        .funfacts__cell--8 {
          background: color-mix(in srgb, var(--text) 11%, var(--bg));
          opacity: 0.85;
        }
        .funfacts__cell--1,
        .funfacts__cell--7 {
          background: color-mix(in srgb, var(--text) 9%, var(--bg));
        }
        .funfacts__cell--3,
        .funfacts__cell--5 {
          background: color-mix(in srgb, var(--text) 10%, var(--bg));
        }
        .funfacts__cell--4 {
          padding: 0;
          background: color-mix(in srgb, var(--text) 14%, var(--bg));
        }
        .funfacts__cell-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 15%;
          filter: grayscale(0.35) contrast(1.05);
        }
        .funfacts__phone-footer {
          display: flex;
          justify-content: center;
          gap: 1.25rem;
          padding-top: 0.15rem;
          opacity: 0.9;
        }
        .funfacts__arrow-note {
          margin: 1rem 0 0;
          font-size: clamp(1.1rem, 2.5vw, 1.35rem);
          font-weight: 600;
          color: var(--accent-2);
          text-align: center;
          line-height: 1.25;
          max-width: 14rem;
          transform: rotate(-2deg);
        }
        .funfacts__arrow {
          margin-right: 0.15em;
        }
        .funfacts__col--facts {
          display: flex;
          flex-direction: column;
          gap: 0.85rem 1rem;
        }
        @media (min-width: 640px) {
          .funfacts__col--facts {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem 1.25rem;
          }
          .funfacts__fact--i0 {
            grid-column: 1;
            transform: rotate(-1.5deg);
          }
          .funfacts__fact--i1 {
            grid-column: 2;
            margin-top: 0.5rem;
            transform: rotate(1deg);
          }
          .funfacts__fact--i2 {
            grid-column: 1;
            margin-left: 0.25rem;
            transform: rotate(0.5deg);
          }
          .funfacts__fact--i3 {
            grid-column: 2;
            margin-top: -0.35rem;
            transform: rotate(-1deg);
          }
          .funfacts__fact--i4 {
            grid-column: 1 / -1;
            max-width: 95%;
            transform: rotate(0.3deg);
          }
          .funfacts__fact--i5 {
            grid-column: 1;
            transform: rotate(-0.8deg);
          }
          .funfacts__fact--i6 {
            grid-column: 2;
            margin-top: 0.25rem;
            transform: rotate(1.2deg);
          }
        }
        .funfacts__fact {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.65rem 0.75rem;
          border-radius: 14px;
          background: color-mix(in srgb, var(--bg-elevated) 88%, var(--bg));
          border: 1px solid var(--border);
        }
        .funfacts__fact-icon {
          flex-shrink: 0;
          opacity: 0.95;
        }
        .funfacts__fact-text {
          margin: 0;
          font-size: clamp(0.88rem, 1.8vw, 0.95rem);
          line-height: 1.5;
          font-weight: 500;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
