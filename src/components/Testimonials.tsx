import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CARD_BG = "var(--bg)";

const CARDS = [
  {
    id: "viraj",
    initials: "VA",
    name: "Viraj Adhihetty",
    title: "CEO & CPO",
    company: "Meridian Creative Solutions",
    pullQuote:
      "She's got that rare mix of curiosity, grit, and creative instinct — I have no doubt she'll go far.",
    paragraphs: [
      "I had the absolute pleasure of working with Gayathri during her time at Meridian. She first joined us as an intern UI designer, and in what felt like no time at all, she grew into a confident designer who could hold her own in any project we threw her way.",
      "From day one, she stood out for how fast she learned and how eager she was to take on new challenges. Whether it was picking up new tools, experimenting with different styles, or jumping into complex client projects, she never once backed down. By the end of her time with us, she was handling clients independently, thinking strategically beyond just UI, and contributing to projects with a level of ownership well beyond her role. Watching that kind of growth in real time was genuinely rewarding.",
      "She's got that rare mix of curiosity, grit, and creative instinct - and I have no doubt she'll go far in whatever she sets her mind to.",
    ],
    tiltDeg: -1.5,
    yNudge: 0,
  },
  {
    id: "yashodara",
    initials: "YK",
    name: "Yashodara Kaluarachchi",
    title: "Design Lead",
    company: "Meridian Creative Solutions",
    pullQuote:
      "She grew into someone who could be trusted to take ownership from concept to execution, with minimal guidance.",
    paragraphs: [
      "I had the pleasure of working closely with Gayathri at Meridian Creative Solutions. She's a thoughtful designer with a strong eye for detail, quick to learn, and always up for a challenge. She consistently brought both creativity and reliability to the team.",
      "Over time, she grew into someone who could be trusted to take ownership; from concept to execution, with minimal guidance. She handled feedback with maturity and adapted easily to different projects.",
      "I would confidently recommend her to any team looking for a designer who brings both skill and spirit to their work.",
    ],
    tiltDeg: 1.5,
    yNudge: -4,
  },
] as const;

type Card = (typeof CARDS)[number];

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="tsay__avatar" aria-hidden>
      <span>{initials}</span>
    </div>
  );
}

const MAX_TILT_Y = 4;
const MAX_TILT_X = 2;
const HOVER_LIFT_PX = 5;

function TestimonialTiltCard({
  c,
  index,
  reduce,
  openCard,
  setOpenCard,
}: {
  c: Card;
  index: number;
  reduce: boolean;
  openCard: Card | null;
  setOpenCard: (card: Card | null) => void;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const baseZ = reduce ? 0 : c.tiltDeg;

  const setFlatTransform = useCallback(() => {
    const el = articleRef.current;
    if (!el) return;
    if (reduce) {
      el.style.transform = "";
      return;
    }
    el.style.transform = `rotateZ(${baseZ}deg) rotateX(0deg) rotateY(0deg) translateY(0)`;
  }, [baseZ, reduce]);

  useLayoutEffect(() => {
    setFlatTransform();
  }, [setFlatTransform]);

  const paintTilt = useCallback(
    (clientX: number, clientY: number) => {
      const el = articleRef.current;
      if (!el || reduce) return;
      const rect = el.getBoundingClientRect();
      const px = (clientX - rect.left) / Math.max(rect.width, 1);
      const py = (clientY - rect.top) / Math.max(rect.height, 1);
      const nx = (px - 0.5) * 2;
      const ny = (py - 0.5) * 2;
      const ry = nx * MAX_TILT_Y;
      const rx = -ny * MAX_TILT_X;
      el.style.transition = "none";
      el.style.transform = `rotateZ(${baseZ}deg) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-${HOVER_LIFT_PX}px)`;
    },
    [baseZ, reduce],
  );

  const onMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    articleRef.current?.classList.add("tsay__card--float");
    paintTilt(e.clientX, e.clientY);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      paintTilt(e.clientX, e.clientY);
      rafRef.current = 0;
    });
  };

  const onMouseLeave = () => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
    const el = articleRef.current;
    if (!el) return;
    el.classList.remove("tsay__card--float");
    if (reduce) return;
    el.style.transition = "transform 0.4s ease";
    setFlatTransform();
  };

  return (
    <div className="tsay__card-scope">
      <motion.div
        className="tsay__card-anim"
        initial={reduce ? { opacity: 1, y: c.yNudge } : { opacity: 0, y: 22 }}
        whileInView={reduce ? { opacity: 1, y: c.yNudge } : { opacity: 1, y: c.yNudge }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.06 * index }}
      >
        <article
          ref={articleRef}
          className={`tsay__card tsay__card--${c.id}`}
          onMouseEnter={onMouseEnter}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <blockquote className="tsay__quote">
            <p className="tsay__quote-pull">&ldquo;{c.pullQuote}&rdquo;</p>
          </blockquote>
          <div className="tsay__card-foot">
            <Avatar initials={c.initials} />
            <div className="tsay__who tsay__who--muted">
              <p className="tsay__meta-name">{c.name}</p>
              <p className="tsay__meta-title tsay__meta-title--single-line">
                {c.title} - {c.company}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="tsay__read-full"
            onClick={() => setOpenCard(c)}
            aria-haspopup="dialog"
            aria-expanded={openCard?.id === c.id}
          >
            Read full recommendation →
          </button>
        </article>
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const reduce = useReducedMotion();
  const [openCard, setOpenCard] = useState<Card | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const modalTitleId = useId();

  const closeModal = useCallback(() => setOpenCard(null), []);

  useEffect(() => {
    if (!openCard) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [openCard, closeModal]);

  return (
    <section id="testimonials" className="tsay" aria-labelledby="tsay-heading">
      <div className="tsay__inner wrap">
        <header className="tsay__head section-head">
          <p className="section-head__eyebrow">Testimonials</p>
          <h2 id="tsay-heading" className="section-head__title">
            What others say!
          </h2>
          <p className="section-head__lead">Kind words from people I&apos;ve worked with.</p>
        </header>

        <div className="tsay__grid">
          {CARDS.map((c, index) => (
            <TestimonialTiltCard
              key={c.id}
              c={c}
              index={index}
              reduce={Boolean(reduce)}
              openCard={openCard}
              setOpenCard={setOpenCard}
            />
          ))}
        </div>
      </div>

      {openCard ? (
        <div
          className="tsay__modal-root"
          role="presentation"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            className="tsay__modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={modalTitleId}
          >
            <div className="tsay__modal-head">
              <h3 id={modalTitleId} className="tsay__modal-title">
                Full recommendation
              </h3>
              <button ref={closeBtnRef} type="button" className="tsay__modal-close" onClick={closeModal} aria-label="Close">
                ×
              </button>
            </div>
            <p className="tsay__modal-by">
              {openCard.name}
              <span className="tsay__modal-by-sep"> · </span>
              {openCard.title}, {openCard.company}
            </p>
            <div className="tsay__modal-body">
              {openCard.paragraphs.map((p, i) => (
                <p key={i} className="tsay__modal-p">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <style>{`
        .tsay {
          --tsay-bg: var(--bg-elevated);
          --tsay-card: ${CARD_BG};
          background: var(--tsay-bg);
          color: var(--text);
          padding-block: var(--section-pad-y);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
          border-top: 1px solid var(--border);
        }
        .tsay__inner {
          max-width: var(--max);
          margin: 0 auto;
          min-width: 0;
          width: 100%;
        }
        .tsay__head {
          text-align: left;
        }
        .tsay__grid {
          display: grid;
          gap: var(--section-grid-gap);
          align-items: start;
          justify-items: center;
        }
        @media (min-width: 768px) {
          .tsay__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: var(--section-grid-gap);
            justify-items: stretch;
          }
        }
        .tsay__card-scope {
          width: 100%;
          max-width: 460px;
          justify-self: center;
          perspective: 800px;
          perspective-origin: 50% 50%;
        }
        @media (min-width: 768px) {
          .tsay__card-scope {
            justify-self: stretch;
          }
        }
        .tsay__card-anim {
          width: 100%;
        }
        .tsay__card {
          position: relative;
          width: 100%;
          padding: clamp(1rem, 3.5vw, 1.35rem) clamp(1rem, 3.5vw, 1.35rem) clamp(0.95rem, 3vw, 1.15rem);
          background: var(--tsay-card);
          border-radius: 18px;
          border: 1px solid rgba(15, 23, 42, 0.06);
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.9) inset,
            0 18px 40px -22px rgba(15, 23, 42, 0.18),
            0 4px 14px -6px rgba(15, 23, 42, 0.08);
          transform-origin: center center;
          transform-style: preserve-3d;
          will-change: transform;
          transition: box-shadow 0.22s ease;
        }
        .tsay__card--float {
          box-shadow:
            0 1px 0 rgba(255, 255, 255, 0.95) inset,
            0 28px 56px -18px rgba(15, 23, 42, 0.28),
            0 14px 32px -8px rgba(15, 23, 42, 0.14);
        }
        .tsay__quote {
          margin: 0 0 1rem;
          padding: 0;
          border: none;
        }
        .tsay__quote-pull {
          margin: 0;
          font-family: var(--font-sans);
          font-size: clamp(0.9375rem, 1.55vw, 1.0625rem);
          font-style: italic;
          font-weight: 500;
          line-height: 1.45;
          color: var(--text);
        }
        .tsay__card-foot {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 0.85rem;
        }
        .tsay__avatar {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: grid;
          place-items: center;
          background: linear-gradient(
            145deg,
            color-mix(in srgb, var(--text-soft) 22%, var(--bg-elevated)) 0%,
            color-mix(in srgb, var(--text-soft) 38%, var(--bg-elevated)) 100%
          );
          border: 1px solid rgba(15, 23, 42, 0.08);
          font-family: var(--font-display), var(--font-sans);
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: var(--text-muted);
        }
        .tsay__who {
          min-width: 0;
        }
        .tsay__who--muted .tsay__meta-name,
        .tsay__who--muted .tsay__meta-title {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 500;
          line-height: 1.45;
          color: var(--text-muted);
        }
        .tsay__who--muted .tsay__meta-name {
          font-weight: 600;
          color: var(--text-soft);
          margin-bottom: 0.15rem;
        }
        .tsay__who--muted .tsay__meta-title--single-line {
          margin-bottom: 0;
          white-space: nowrap;
          font-size: clamp(0.65rem, 2.35vw, 0.78rem);
          letter-spacing: -0.01em;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        @media (max-width: 520px) {
          .tsay__who--muted .tsay__meta-title--single-line {
            white-space: normal;
          }
        }
        .tsay__read-full {
          display: inline;
          margin: 0;
          padding: 0;
          border: none;
          background: none;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--text-soft);
          cursor: pointer;
          text-align: left;
          text-decoration: underline;
          text-underline-offset: 0.18em;
        }
        .tsay__read-full:hover {
          color: var(--text);
        }
        .tsay__read-full:focus-visible {
          outline: 2px solid var(--text-soft);
          outline-offset: 3px;
          border-radius: 2px;
        }
        .tsay__modal-root {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: grid;
          place-items: center;
          padding: max(1rem, env(safe-area-inset-top, 0px)) max(1rem, env(safe-area-inset-right, 0px))
            max(1rem, env(safe-area-inset-bottom, 0px)) max(1rem, env(safe-area-inset-left, 0px));
          background: color-mix(in srgb, var(--text) 45%, transparent);
          backdrop-filter: blur(4px);
        }
        .tsay__modal {
          width: min(100%, 520px);
          max-height: min(85dvh, 640px);
          overflow: auto;
          padding: 1.15rem 1.25rem 1.25rem;
          overflow-wrap: break-word;
          background: var(--tsay-card);
          border-radius: 16px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          box-shadow: 0 24px 60px -20px rgba(15, 23, 42, 0.35);
        }
        .tsay__modal-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 0.75rem;
          margin-bottom: 0.35rem;
        }
        .tsay__modal-title {
          margin: 0;
          font-family: var(--font-display), var(--font-sans);
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          color: var(--text);
        }
        .tsay__modal-close {
          flex-shrink: 0;
          width: 2rem;
          height: 2rem;
          margin: -0.25rem -0.25rem 0 0;
          border: none;
          border-radius: 8px;
          background: transparent;
          font-size: 1.35rem;
          line-height: 1;
          color: var(--text-muted);
          cursor: pointer;
        }
        .tsay__modal-close:hover {
          background: color-mix(in srgb, var(--text) 6%, transparent);
          color: var(--text);
        }
        .tsay__modal-close:focus-visible {
          outline: 2px solid var(--text-soft);
          outline-offset: 2px;
        }
        .tsay__modal-by {
          margin: 0 0 1rem;
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 500;
          color: var(--text-muted);
        }
        .tsay__modal-by-sep {
          opacity: 0.7;
        }
        .tsay__modal-body {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }
        .tsay__modal-p {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          font-weight: 400;
          line-height: 1.6;
          color: var(--text-muted);
        }
      `}</style>
    </section>
  );
}
