import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type Ref,
} from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { siteConfig } from "../config";

const TITLE_WORD = "Portfolio";

const SCRAMBLE_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@%&*?!";

function pickScrambleChar(): string {
  return SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)]!;
}

const SCRAMBLE_TOTAL_MS = 1500;

function ScrambleTitleWord({ word, reduce }: { word: string; reduce: boolean }) {
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const chars = useMemo(() => Array.from(word), [word]);
  const initialScramble = useMemo(() => chars.map(() => pickScrambleChar()), [chars]);

  useLayoutEffect(() => {
    const els = charRefs.current;
    const n = chars.length;
    if (n === 0) return;

    if (reduce) {
      for (let i = 0; i < n; i++) {
        const el = els[i];
        if (el) el.textContent = chars[i];
      }
      return;
    }

    for (let i = 0; i < n; i++) {
      const el = els[i];
      if (el) el.textContent = initialScramble[i] ?? pickScrambleChar();
    }

    const start = performance.now();
    /** Letter i locks strictly after i−1 (left → right). Last letter at SCRAMBLE_TOTAL_MS. */
    const lockAt = (i: number) => ((i + 1) / n) * SCRAMBLE_TOTAL_MS;

    const rafRef = { id: 0 };

    const tick = (now: number) => {
      const elapsed = now - start;
      for (let i = 0; i < n; i++) {
        const el = els[i];
        if (!el) continue;
        if (elapsed >= lockAt(i)) {
          el.textContent = chars[i];
        } else {
          el.textContent = pickScrambleChar();
        }
      }
      if (elapsed < SCRAMBLE_TOTAL_MS + 48) {
        rafRef.id = requestAnimationFrame(tick);
      } else {
        for (let i = 0; i < n; i++) {
          const el = els[i];
          if (el) el.textContent = chars[i];
        }
      }
    };

    rafRef.id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.id);
  }, [chars, initialScramble, reduce]);

  return (
    <span className="hero-canvas__title-main">
      {chars.map((finalCh, i) => (
        <span className="hero-canvas__title-char-clip" key={`${i}-${finalCh}`}>
          <span
            className="hero-canvas__title-char"
            ref={(el) => {
              charRefs.current[i] = el;
            }}
          >
            {reduce ? finalCh : (initialScramble[i] ?? finalCh)}
          </span>
        </span>
      ))}
    </span>
  );
}

const REPEL_RADIUS = 100;
const REPEL_STRENGTH = 36;
const SPRING_PHYSICS = { stiffness: 320, damping: 28, mass: 0.48 };

function MagneticHeroFrame({
  label,
  className,
  delay,
  targetX,
  targetY,
  frameRef,
}: {
  label: string;
  className: string;
  delay: number;
  targetX: MotionValue<number>;
  targetY: MotionValue<number>;
  frameRef: Ref<HTMLDivElement>;
}) {
  const reduce = useReducedMotion();
  const x = useSpring(targetX, SPRING_PHYSICS);
  const y = useSpring(targetY, SPRING_PHYSICS);

  return (
    <div ref={frameRef} className={className}>
      <motion.div
        className="figma-frame"
        style={{ x, y }}
        initial={reduce ? false : { opacity: 0, scale: 0.98 }}
        animate={reduce ? undefined : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <span
          className="figma-frame__handle figma-frame__handle--nw"
          aria-hidden
        />
        <span
          className="figma-frame__handle figma-frame__handle--ne"
          aria-hidden
        />
        <span
          className="figma-frame__handle figma-frame__handle--sw"
          aria-hidden
        />
        <span
          className="figma-frame__handle figma-frame__handle--se"
          aria-hidden
        />
        <span className="figma-frame__label">{label}</span>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const baFrameRef = useRef<HTMLDivElement>(null);
  const uxFrameRef = useRef<HTMLDivElement>(null);
  const figFrameRef = useRef<HTMLDivElement>(null);
  const wireFrameRef = useRef<HTMLDivElement>(null);
  const resFrameRef = useRef<HTMLDivElement>(null);
  const [finePointer, setFinePointer] = useState(true);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const baTargetX = useMotionValue(0);
  const baTargetY = useMotionValue(0);
  const uxTargetX = useMotionValue(0);
  const uxTargetY = useMotionValue(0);
  const figTargetX = useMotionValue(0);
  const figTargetY = useMotionValue(0);
  const wireTargetX = useMotionValue(0);
  const wireTargetY = useMotionValue(0);
  const resTargetX = useMotionValue(0);
  const resTargetY = useMotionValue(0);

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const updateFine = () => setFinePointer(mqFine.matches);
    updateFine();
    mqFine.addEventListener("change", updateFine);
    return () => mqFine.removeEventListener("change", updateFine);
  }, []);

  useEffect(() => {
    const el = stageRef.current;
    if (!el || !finePointer) return;

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set(e.clientX - r.left);
      my.set(e.clientY - r.top);
    };

    el.addEventListener("mousemove", onMove);
    return () => {
      el.removeEventListener("mousemove", onMove);
    };
  }, [finePointer, mx, my]);

  useLayoutEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(r.width * 0.48);
    my.set(r.height * 0.44);
  }, [mx, my]);

  useEffect(() => {
    if (reduce) {
      baTargetX.set(0);
      baTargetY.set(0);
      uxTargetX.set(0);
      uxTargetY.set(0);
      figTargetX.set(0);
      figTargetY.set(0);
      wireTargetX.set(0);
      wireTargetY.set(0);
      resTargetX.set(0);
      resTargetY.set(0);
      return;
    }

    const rafRef = { id: 0 };

    const repelOffset = (frameCx: number, frameCy: number, cursorX: number, cursorY: number) => {
      const vx = frameCx - cursorX;
      const vy = frameCy - cursorY;
      const d = Math.hypot(vx, vy);
      if (d >= REPEL_RADIUS || d < 1e-4) return { x: 0, y: 0 };
      const inv = -1 / d;
      const nx = vx * inv;
      const ny = vy * inv;
      const falloff = (REPEL_RADIUS - d) / REPEL_RADIUS;
      const s = REPEL_STRENGTH * falloff * falloff;
      return { x: nx * s, y: ny * s };
    };

    const frames = [
      { ref: baFrameRef, tx: baTargetX, ty: baTargetY, k: 0 },
      { ref: uxFrameRef, tx: uxTargetX, ty: uxTargetY, k: 1 },
      { ref: figFrameRef, tx: figTargetX, ty: figTargetY, k: 2 },
      { ref: wireFrameRef, tx: wireTargetX, ty: wireTargetY, k: 3 },
      { ref: resFrameRef, tx: resTargetX, ty: resTargetY, k: 4 },
    ] as const;

    const tick = () => {
      const stage = stageRef.current;
      const cx = mx.get();
      const cy = my.get();
      const tMs = performance.now();

      for (const f of frames) {
        const { ref, tx, ty, k } = f;
        const ampY = 2.1 + (k % 4) * 0.38;
        const periodY = 0.00062 + k * 0.000055;
        const idleY = Math.sin(tMs * periodY + k * 1.35) * ampY;
        const idleX = Math.cos(tMs * (0.00048 + k * 0.00007) + k * 0.85) * 1.15;

        const el = ref.current;
        if (stage && el) {
          const sr = stage.getBoundingClientRect();
          const rect = el.getBoundingClientRect();
          const fx = rect.left + rect.width / 2 - sr.left;
          const fy = rect.top + rect.height / 2 - sr.top;
          const r = finePointer ? repelOffset(fx, fy, cx, cy) : { x: 0, y: 0 };
          tx.set(idleX + r.x);
          ty.set(idleY + r.y);
        } else {
          tx.set(idleX);
          ty.set(idleY);
        }
      }

      rafRef.id = requestAnimationFrame(tick);
    };

    rafRef.id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.id);
  }, [
    reduce,
    finePointer,
    mx,
    my,
    baTargetX,
    baTargetY,
    uxTargetX,
    uxTargetY,
    figTargetX,
    figTargetY,
    wireTargetX,
    wireTargetY,
    resTargetX,
    resTargetY,
  ]);

  const displayName = siteConfig.name.split(" ")[0] ?? siteConfig.name;

  return (
    <section id="top" className="hero-canvas">
      <div className="hero-canvas__stage" ref={stageRef}>
        <div className="hero-canvas__grid" aria-hidden />

        <div className="hero-canvas__title-cluster">
          <div className="hero-canvas__intro-wrap">
            <motion.div
              className="hero-canvas__intro-pill"
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduce ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <span className="hero-canvas__intro-text">
                Hi, I&apos;m {displayName}
              </span>
            </motion.div>
          </div>
          <h1 className="hero-canvas__title">
            <ScrambleTitleWord word={TITLE_WORD} reduce={!!reduce} />
            <motion.span
              className="hero-canvas__title-year"
              aria-hidden
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: 0.55,
                      delay: SCRAMBLE_TOTAL_MS / 1000 + 0.08,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              &rsquo;26
            </motion.span>
            <span className="visually-hidden">
              {" "}
              — {siteConfig.name}, {siteConfig.title}, 2026
            </span>
          </h1>

          <div className="hero-canvas__below-title">
            <p className="hero-canvas__subtitle">
              UI/UX Designer - focused on research, systems, and clear outcomes.
            </p>
            <div className="hero-canvas__tags-row" aria-hidden>
              <span className="hero-canvas__tag-pill">Figma</span>
              <span className="hero-canvas__tag-pill">UI UX</span>
              <span className="hero-canvas__tag-pill">User flows</span>
              <span className="hero-canvas__tag-pill">Research</span>
              <span className="hero-canvas__tag-pill">Wireframing</span>
            </div>
          </div>

          <MagneticHeroFrame
            label="User flows"
            className="hero-canvas__frame hero-canvas__frame--flows"
            delay={0.2}
            targetX={baTargetX}
            targetY={baTargetY}
            frameRef={baFrameRef}
          />
          <MagneticHeroFrame
            label="UI UX"
            className="hero-canvas__frame hero-canvas__frame--ux"
            delay={0.35}
            targetX={uxTargetX}
            targetY={uxTargetY}
            frameRef={uxFrameRef}
          />
          <MagneticHeroFrame
            label="Figma"
            className="hero-canvas__frame hero-canvas__frame--fig-tl"
            delay={0.18}
            targetX={figTargetX}
            targetY={figTargetY}
            frameRef={figFrameRef}
          />
          <MagneticHeroFrame
            label="Research"
            className="hero-canvas__frame hero-canvas__frame--res-tr"
            delay={0.28}
            targetX={resTargetX}
            targetY={resTargetY}
            frameRef={resFrameRef}
          />
          <MagneticHeroFrame
            label="Wireframing"
            className="hero-canvas__frame hero-canvas__frame--wire-br"
            delay={0.38}
            targetX={wireTargetX}
            targetY={wireTargetY}
            frameRef={wireFrameRef}
          />
        </div>

      </div>
      <style>{`
        .hero-canvas {
          position: relative;
          background-color: var(--bg);
          background-image: radial-gradient(rgba(15, 23, 42, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          color: var(--text);
        }
        .hero-canvas__stage {
          position: relative;
          min-height: min(100dvh, 880px);
          min-height: min(100vh, 880px);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-sizing: border-box;
          padding-left: var(--section-pad-inline-start);
          padding-right: var(--section-pad-inline-end);
          padding-top: max(0.5rem, calc(env(safe-area-inset-top, 0px) + var(--topnav-stack) + 0.25rem));
          padding-bottom: max(clamp(1.25rem, 3.5vw, 2rem), env(safe-area-inset-bottom, 0px));
        }
        .hero-canvas__grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-color: var(--bg);
          background-image: radial-gradient(rgba(15, 23, 42, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          mask-image: radial-gradient(ellipse 70% 65% at 50% 45%, #000 20%, transparent 100%);
          opacity: 0.88;
        }
        .hero-canvas__title-cluster {
          position: relative;
          z-index: 2;
          display: inline-block;
          max-width: min(100%, 96vw);
          text-align: center;
          /* Room so frames sit like the reference: top-right + bottom-left around the word */
          padding: clamp(0.75rem, 2.5vw, 1.35rem) clamp(1rem, 3.5vw, 2.5rem)
            clamp(0.85rem, 2.5vw, 1.5rem) clamp(1rem, 3.5vw, 2.5rem);
          box-sizing: border-box;
        }
        .hero-canvas__intro-wrap {
          display: flex;
          justify-content: center;
          margin: 0 0 clamp(0.5rem, 1.35vw, 0.75rem);
        }
        .hero-canvas__intro-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: clamp(0.5rem, 1.5vw, 0.75rem);
          padding: 0.5rem 1.15rem;
          border-radius: 999px;
          border: 1.5px dashed rgba(15, 23, 42, 0.22);
          background: color-mix(in srgb, var(--bg) 88%, #ffffff);
          box-shadow: 0 1px 0 rgba(15, 23, 42, 0.04);
        }
        .hero-canvas__intro-text {
          font-family: var(--font-sans);
          font-size: clamp(0.92rem, 1.9vw, 1.08rem);
          font-weight: 700;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--text);
        }
        .hero-canvas__title {
          position: relative;
          z-index: 2;
          margin: 0;
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2.75rem, 14.5vw, 9.25rem);
          line-height: 0.95;
          letter-spacing: -0.045em;
          color: var(--text);
          text-align: center;
          user-select: none;
          max-width: 100%;
        }
        .hero-canvas__title-main {
          display: inline-flex;
          flex-wrap: nowrap;
          align-items: flex-end;
        }
        .hero-canvas__title-char-clip {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          line-height: inherit;
        }
        .hero-canvas__title-char {
          display: inline-block;
          will-change: transform, opacity;
        }
        .hero-canvas__title-year {
          display: inline-block;
          margin-left: 0.06em;
          font-weight: 600;
          font-size: 0.5em;
          color: var(--text-muted);
          letter-spacing: -0.02em;
          vertical-align: super;
        }
        .hero-canvas__below-title {
          position: relative;
          z-index: 5;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: clamp(0.65rem, 2vw, 1rem);
          max-width: min(36rem, 92vw);
          margin-left: auto;
          margin-right: auto;
        }
        .hero-canvas__subtitle {
          margin: 0;
          font-family: var(--font-sans);
          font-size: clamp(1rem, 2.2vw, 1.125rem);
          font-weight: 400;
          line-height: 1.5;
          color: var(--text-muted);
          text-align: center;
        }
        .hero-canvas__tags-row {
          display: none;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 0.45rem;
          margin-top: clamp(0.75rem, 2.5vw, 1.1rem);
          padding: 0 0.25rem;
          max-width: min(22rem, 100%);
          margin-left: auto;
          margin-right: auto;
        }
        .hero-canvas__tag-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1.2;
          padding: 0.35rem 0.6rem;
          border-radius: 7px;
          border: 1px solid rgba(24, 160, 251, 0.42);
          background: rgba(255, 255, 255, 0.72);
          color: var(--text-muted);
        }
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .hero-canvas__frame {
          position: absolute;
          z-index: 3;
          pointer-events: none;
        }
        .figma-frame {
          position: relative;
          display: inline-block;
          padding: 0.45rem 0.85rem;
          border: 1px solid rgba(24, 160, 251, 0.55);
          background: rgba(255, 255, 255, 0.45);
          box-shadow: 0 1px 0 rgba(24, 160, 251, 0.08);
          white-space: nowrap;
          will-change: transform;
        }
        .hero-canvas__frame--flows {
          top: 0;
          right: 0;
          left: auto;
          bottom: auto;
          transform: translate(
            calc(-1 * clamp(0.2rem, 1.4vw, 0.7rem)),
            clamp(0.2rem, 1vw, 0.55rem)
          );
        }
        .hero-canvas__frame--ux {
          bottom: 0;
          left: 0;
          top: auto;
          right: auto;
          transform: translate(
            clamp(0.25rem, 2vw, 0.95rem),
            calc(-1 * clamp(0.15rem, 1.2vw, 0.55rem))
          );
        }
        /* Staggered around the title (not two vertical columns); transforms stack with inner motion x/y */
        .hero-canvas__frame--fig-tl {
          top: 26%;
          left: 0;
          right: auto;
          bottom: auto;
          transform: translate(
            calc(-1 * clamp(0.05rem, 0.9vw, 0.45rem)),
            -50%
          );
        }
        .hero-canvas__frame--res-tr {
          top: 54%;
          right: 0;
          left: auto;
          bottom: auto;
          transform: translate(
            clamp(0.15rem, 1.2vw, 0.55rem),
            -50%
          );
        }
        .hero-canvas__frame--wire-br {
          bottom: 14%;
          right: 0;
          top: auto;
          left: auto;
          transform: translate(
            clamp(0.35rem, 2.2vw, 1.1rem),
            calc(-1 * clamp(0.25rem, 1.5vw, 0.75rem))
          );
        }
        @media (max-width: 720px) {
          .hero-canvas__stage {
            padding-top: max(0.5rem, calc(env(safe-area-inset-top, 0px) + var(--topnav-stack) + 0.35rem));
            padding-bottom: max(1.5rem, env(safe-area-inset-bottom, 0px));
          }
          .hero-canvas__title-cluster {
            padding: 0.75rem 0.5rem 0.85rem;
            max-width: 100%;
          }
          .hero-canvas__title {
            font-size: clamp(2rem, 10.5vw + 0.35rem, 2.85rem);
            line-height: 1.05;
            letter-spacing: -0.04em;
          }
          .hero-canvas__title-main {
            flex-wrap: wrap;
            justify-content: center;
            row-gap: 0.08em;
            column-gap: 0.02em;
          }
          .hero-canvas__title-year {
            margin-left: 0.12em;
            font-size: 0.48em;
          }
          .hero-canvas__below-title {
            max-width: min(100%, 22rem);
            margin-top: clamp(0.5rem, 2vw, 0.75rem);
          }
          .hero-canvas__subtitle {
            font-size: clamp(0.9rem, 3.8vw, 1.02rem);
            line-height: 1.45;
            padding: 0 0.15rem;
          }
          .hero-canvas__tags-row {
            display: flex;
          }
          .hero-canvas__frame {
            display: none !important;
          }
          .hero-canvas__intro-pill {
            padding: 0.42rem 0.85rem;
          }
          .hero-canvas__intro-text {
            font-size: clamp(0.82rem, 3.5vw, 0.95rem);
          }
        }
        .figma-frame__label {
          font-family: var(--font-sans);
          font-size: clamp(0.75rem, 2vw, 0.9rem);
          font-weight: 600;
          color: var(--text-muted);
          letter-spacing: -0.02em;
        }
        .figma-frame__handle {
          position: absolute;
          width: 6px;
          height: 6px;
          background: #fff;
          border: 1px solid rgba(24, 160, 251, 0.65);
          box-sizing: border-box;
        }
        .figma-frame__handle--nw {
          top: -3px;
          left: -3px;
        }
        .figma-frame__handle--ne {
          top: -3px;
          right: -3px;
        }
        .figma-frame__handle--sw {
          bottom: -3px;
          left: -3px;
        }
        .figma-frame__handle--se {
          bottom: -3px;
          right: -3px;
        }
      `}</style>
    </section>
  );
}
