import { useId } from "react";
import { useReducedMotion } from "framer-motion";
import { techStackItemIds, techStackMeta, type TechStackItemId } from "../data/tech-stack";

const VB = "0 0 40 40" as const;

function StackIcon({ id, instance }: { id: TechStackItemId; instance: string }) {
  const s = { width: 40, height: 40, viewBox: VB, "aria-hidden": true as const };
  const lg = `lottie-${instance}-${id}`;
  switch (id) {
    case "figma":
      return (
        <svg {...s}>
          <rect x="4" y="9" width="9" height="22" rx="2" fill="#1abcfe" />
          <rect x="14" y="9" width="9" height="22" rx="2" fill="#a259ff" />
          <rect x="24" y="9" width="9" height="22" rx="2" fill="#0acf83" />
        </svg>
      );
    case "photoshop":
      return (
        <svg {...s}>
          <rect x="5" y="5" width="30" height="30" rx="5" fill="#001d26" />
          <text
            x="20"
            y="25"
            textAnchor="middle"
            fill="#31a8ff"
            fontSize="12"
            fontWeight="700"
            fontFamily='"Plus Jakarta Sans", system-ui, sans-serif'
          >
            Ps
          </text>
        </svg>
      );
    case "react":
      return (
        <svg {...s}>
          <circle cx="20" cy="20" r="2.2" fill="#61dafb" />
          <ellipse
            cx="20"
            cy="20"
            rx="14"
            ry="5.5"
            fill="none"
            stroke="#61dafb"
            strokeWidth="1.2"
          />
          <ellipse
            cx="20"
            cy="20"
            rx="14"
            ry="5.5"
            fill="none"
            stroke="#61dafb"
            strokeWidth="1.2"
            transform="rotate(60 20 20)"
          />
          <ellipse
            cx="20"
            cy="20"
            rx="14"
            ry="5.5"
            fill="none"
            stroke="#61dafb"
            strokeWidth="1.2"
            transform="rotate(-60 20 20)"
          />
        </svg>
      );
    case "jira":
      return (
        <svg {...s}>
          <path d="M20 5l14 11-14 11L6 16 20 5z" fill="#2684ff" />
          <path d="M20 12l8 6-8 6-8-6 8-6z" fill="#1d2b4a" opacity="0.4" />
        </svg>
      );
    case "powerbi":
      return (
        <svg {...s}>
          <rect x="6" y="22" width="6" height="12" rx="1.2" fill="#f2c811" />
          <rect x="15" y="16" width="6" height="18" rx="1.2" fill="#f2c811" opacity="0.88" />
          <rect x="24" y="10" width="6" height="24" rx="1.2" fill="#f2c811" opacity="0.72" />
        </svg>
      );
    case "sql":
      return (
        <svg {...s}>
          <ellipse
            cx="20"
            cy="11"
            rx="12"
            ry="4.2"
            fill="none"
            stroke="#336791"
            strokeWidth="1.4"
          />
          <path
            d="M8 11v9c0 2.2 5.4 4 12 4s12-1.8 12-4v-9"
            fill="none"
            stroke="#336791"
            strokeWidth="1.4"
          />
          <ellipse
            cx="20"
            cy="24"
            rx="12"
            ry="4.2"
            fill="none"
            stroke="#336791"
            strokeWidth="1.4"
          />
        </svg>
      );
    case "notion":
      return (
        <svg {...s}>
          <rect x="8" y="8" width="22" height="22" rx="3" fill="#fff" stroke="#1a1a1a" strokeWidth="1.5" />
          <path
            d="M14 14h10M14 19h10M14 24h6"
            stroke="#1a1a1a"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      );
    case "framer":
      return (
        <svg {...s}>
          <rect x="6" y="6" width="28" height="28" rx="7" fill="#0055ff" />
          <path
            d="M14 26V14h6c3.3 0 6 2.2 6 5s-2.7 5-6 5h-6"
            fill="none"
            stroke="#fff"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "vscode":
      return (
        <svg {...s}>
          <path d="M26 6l8 5v18l-8 5-12-9-8 5V10l8 5 12-9z" fill="#007acc" />
          <path d="M26 6L14 15v10l12 9" fill="none" stroke="#1a8ad6" strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case "lottiefiles":
      return (
        <svg {...s}>
          <defs>
            <linearGradient id={lg} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
          </defs>
          <path
            d="M20 6c8 0 14 6 14 14s-6 14-14 14S6 28 6 20 12 6 20 6z"
            fill={`url(#${lg})`}
          />
          <path
            d="M14 22c2-4 6-6 10-4s6 6 4 10"
            fill="none"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.9"
          />
        </svg>
      );
    case "premiere":
      return (
        <svg {...s}>
          <rect x="5" y="5" width="30" height="30" rx="5" fill="#00005b" />
          <text
            x="20"
            y="25"
            textAnchor="middle"
            fill="#99f"
            fontSize="11"
            fontWeight="800"
            fontFamily='"Plus Jakarta Sans", system-ui, sans-serif'
          >
            Pr
          </text>
        </svg>
      );
    default:
      return null;
  }
}

function TechCell({ id, instance }: { id: TechStackItemId; instance: string }) {
  const tipId = useId();
  const { name, description } = techStackMeta[id];

  return (
    <div className="tech-stack__cell">
      <div className="tech-stack__tip" id={tipId} role="tooltip">
        <strong className="tech-stack__tip-name">{name}</strong>
        <span className="tech-stack__tip-desc">{description}</span>
      </div>
      <button
        type="button"
        className="tech-stack__btn"
        aria-label={`${name}. ${description}`}
        aria-describedby={tipId}
      >
        <StackIcon id={id} instance={instance} />
      </button>
    </div>
  );
}

function IconGroup({ instance }: { instance: string }) {
  return (
    <div className="tech-stack__group">
      {techStackItemIds.map((id) => (
        <TechCell key={`${instance}-${id}`} id={id} instance={instance} />
      ))}
    </div>
  );
}

/** Marquee row of tool icons (used inside Skills; no standalone section). */
export function TechStackIconsRow() {
  const reduce = useReducedMotion();

  return (
    <div
      className="tech-stack-icons-row"
      role="region"
      aria-label="Tools and platforms"
    >
      <div
        className={`tech-stack__viewport${reduce ? " tech-stack__viewport--static" : ""}`}
      >
        <div className="tech-stack__fade tech-stack__fade--left" aria-hidden />
        <div className="tech-stack__fade tech-stack__fade--right" aria-hidden />

        <div className="tech-stack__rail">
          <div className={`tech-stack__track${reduce ? " tech-stack__track--static" : ""}`}>
            <IconGroup instance="a" />
            <div className="tech-stack__group" aria-hidden="true">
              {techStackItemIds.map((id) => (
                <div key={`dup-${id}`} className="tech-stack__cell">
                  <div className="tech-stack__tip" role="presentation">
                    <strong className="tech-stack__tip-name">{techStackMeta[id].name}</strong>
                    <span className="tech-stack__tip-desc">{techStackMeta[id].description}</span>
                  </div>
                  <div className="tech-stack__btn tech-stack__btn--phantom" tabIndex={-1}>
                    <StackIcon id={id} instance="b" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .tech-stack-icons-row {
          --tech-bg: var(--bg);
          width: 100%;
          min-width: 0;
        }
        .tech-stack__viewport {
          position: relative;
          overflow: hidden;
          padding: 0.25rem 0 0.35rem;
        }
        .tech-stack__viewport--static {
          overflow: visible;
        }
        .tech-stack__fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: clamp(2rem, 6vw, 4rem);
          z-index: 2;
          pointer-events: none;
        }
        .tech-stack__fade--left {
          left: 0;
          background: linear-gradient(90deg, var(--tech-bg) 0%, transparent 100%);
        }
        .tech-stack__fade--right {
          right: 0;
          background: linear-gradient(270deg, var(--tech-bg) 0%, transparent 100%);
        }
        .tech-stack__viewport--static .tech-stack__fade {
          display: none;
        }
        .tech-stack__rail {
          padding-top: 0;
          margin-top: 0;
        }
        .tech-stack__track {
          display: flex;
          flex-direction: row;
          width: max-content;
          gap: 0;
          animation: tech-stack-marquee 70s linear infinite;
        }
        .tech-stack__track:hover {
          animation-play-state: paused;
        }
        .tech-stack__track--static {
          animation: none;
          width: 100%;
          flex-wrap: wrap;
          justify-content: flex-start;
          gap: 0.75rem 1.25rem;
          row-gap: 1.25rem;
        }
        .tech-stack__track--static .tech-stack__group {
          display: contents;
        }
        .tech-stack__track--static .tech-stack__group[aria-hidden="true"] {
          display: none;
        }
        @keyframes tech-stack-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-stack__track {
            animation: none !important;
            width: 100%;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 0.75rem 1.25rem;
            row-gap: 1.25rem;
          }
          .tech-stack__track .tech-stack__group[aria-hidden="true"] {
            display: none;
          }
          .tech-stack__fade {
            display: none;
          }
          .tech-stack__viewport {
            overflow: visible;
          }
        }
        .tech-stack__group {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: clamp(1rem, 2.5vw, 1.75rem);
          flex-shrink: 0;
          padding-inline: clamp(0.75rem, 2vw, 1.25rem);
        }
        .tech-stack__cell {
          position: relative;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .tech-stack__btn {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          border: none;
          background: transparent;
          display: grid;
          place-items: center;
          cursor: help;
          box-shadow: none;
          transition:
            transform 0.15s ease,
            background 0.15s ease;
        }
        .tech-stack__btn:hover {
          transform: scale(1.06);
          background: color-mix(in srgb, var(--text) 6%, transparent);
        }
        .tech-stack__btn:focus-visible {
          transform: scale(1.06);
          background: color-mix(in srgb, var(--text) 6%, transparent);
          outline: 2px solid var(--accent);
          outline-offset: 2px;
        }
        .tech-stack__btn--phantom {
          pointer-events: none;
        }
        .tech-stack__tip {
          position: absolute;
          bottom: calc(100% + 10px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 200px;
          max-width: min(280px, 70vw);
          padding: 0.55rem 0.7rem 0.6rem;
          border-radius: 10px;
          background: var(--text);
          color: var(--bg-elevated);
          font-family: var(--font-sans);
          font-size: 0.75rem;
          line-height: 1.35;
          text-align: left;
          box-shadow: 0 10px 28px -10px rgba(0, 0, 0, 0.45);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
          transition:
            opacity 0.14s ease,
            visibility 0.14s ease;
          z-index: 5;
        }
        .tech-stack__tip::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border: 7px solid transparent;
          border-top-color: var(--text);
        }
        .tech-stack__tip-name {
          display: block;
          font-weight: 700;
          font-size: 0.8125rem;
          margin-bottom: 0.2rem;
          color: var(--bg-elevated);
        }
        .tech-stack__tip-desc {
          display: block;
          font-weight: 400;
          color: color-mix(in srgb, var(--bg-elevated) 88%, transparent);
          font-size: 0.72rem;
          line-height: 1.4;
        }
        .tech-stack__cell:hover .tech-stack__tip,
        .tech-stack__cell:focus-within .tech-stack__tip {
          opacity: 1;
          visibility: visible;
        }
      `}</style>
    </div>
  );
}
