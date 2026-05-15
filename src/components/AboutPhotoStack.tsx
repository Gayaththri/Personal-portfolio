import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../config";
import aboutLife1 from "../assets/about-life-1.png";
import aboutLife2 from "../assets/about-life-2.png";
import aboutLife3 from "../assets/about-life-3.png";
import aboutPortrait from "../assets/about-portrait.png";

export type AboutStackPhoto = {
  src: string;
  alt: string;
  objectPosition?: string;
};

export const ABOUT_STACK_PHOTOS: AboutStackPhoto[] = [
  { src: aboutPortrait, alt: siteConfig.name, objectPosition: "center 12%" },
  { src: aboutLife1, alt: `${siteConfig.name} outdoors`, objectPosition: "center 22%" },
  { src: aboutLife2, alt: `${siteConfig.name} relaxing in a garden`, objectPosition: "center 35%" },
  { src: aboutLife3, alt: `${siteConfig.name} at a floating market`, objectPosition: "center 28%" },
];

const STACK_LAYOUT = [
  { x: 0, y: 0, rotate: -2.5, scale: 1 },
  { x: 10, y: 8, rotate: 2.2, scale: 0.98 },
  { x: 20, y: 14, rotate: -1.5, scale: 0.96 },
  { x: 28, y: 20, rotate: 3, scale: 0.94 },
] as const;

type AboutPhotoStackProps = {
  photos?: AboutStackPhoto[];
};

export function AboutPhotoStack({ photos = ABOUT_STACK_PHOTOS }: AboutPhotoStackProps) {
  const reduce = useReducedMotion();
  const [order, setOrder] = useState(() => photos.map((_, i) => i));
  const [exitingId, setExitingId] = useState<number | null>(null);

  const cycle = useCallback(() => {
    if (exitingId !== null) return;

    if (reduce) {
      setOrder((prev) => {
        const [, ...rest] = prev;
        return [...rest, prev[0]!];
      });
      return;
    }

    setExitingId(order[0]!);
  }, [exitingId, order, reduce]);

  const onExitComplete = useCallback(() => {
    setOrder((prev) => {
      const [, ...rest] = prev;
      return [...rest, prev[0]!];
    });
    setExitingId(null);
  }, []);

  const layoutOrder =
    exitingId !== null ? order.filter((id) => id !== exitingId) : order;
  const stackIndex = (photoId: number) => layoutOrder.indexOf(photoId);
  const topId = layoutOrder[0];

  return (
    <div className="about-photo-stack">
      <motion.button
        type="button"
        className="about-photo-stack__deck"
        onClick={cycle}
        aria-label="Show next photo"
        whileTap={reduce ? undefined : { scale: 0.995 }}
        initial={reduce ? false : { opacity: 0, y: 10 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {photos.map((photo, photoId) => {
          if (photoId === exitingId) {
            const topLayout = STACK_LAYOUT[0];
            return (
              <motion.div
                key={`exit-${photoId}`}
                className="about-photo-stack__card about-photo-stack__card--top"
                style={{ zIndex: photos.length + 1 }}
                initial={{
                  x: topLayout.x,
                  y: topLayout.y,
                  rotate: topLayout.rotate,
                  scale: topLayout.scale,
                }}
                animate={{
                  x: topLayout.x - 72,
                  y: topLayout.y + 28,
                  rotate: topLayout.rotate - 14,
                  scale: topLayout.scale * 0.92,
                  opacity: 0,
                }}
                transition={{ duration: 0.42, ease: [0.4, 0, 0.2, 1] }}
                onAnimationComplete={onExitComplete}
                aria-hidden
              >
                <img
                  src={photo.src}
                  alt=""
                  className="about-photo-stack__img"
                  style={{ objectPosition: photo.objectPosition }}
                  draggable={false}
                />
              </motion.div>
            );
          }

          const pos = stackIndex(photoId);
          if (pos < 0) return null;
          const layout = STACK_LAYOUT[pos] ?? STACK_LAYOUT[STACK_LAYOUT.length - 1]!;
          const isTop = photoId === topId;

          return (
            <motion.div
              key={photoId}
              className={`about-photo-stack__card${isTop ? " about-photo-stack__card--top" : ""}`}
              initial={false}
              animate={{
                x: layout.x,
                y: layout.y,
                rotate: layout.rotate,
                scale: layout.scale,
                zIndex: photos.length - pos,
                opacity: 1,
              }}
              transition={{
                type: "spring",
                stiffness: 320,
                damping: 28,
                mass: 0.85,
              }}
              style={{ zIndex: photos.length - pos }}
            >
              <img
                src={photo.src}
                alt={isTop ? photo.alt : ""}
                className="about-photo-stack__img"
                style={{ objectPosition: photo.objectPosition }}
                loading={isTop ? "eager" : "lazy"}
                decoding="async"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </motion.button>

      <p className="about-photo-stack__hint" aria-hidden>
        Tap to shuffle
      </p>

      <style>{`
        .about-photo-stack {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
        }
        @media (min-width: 768px) {
          .about-photo-stack {
            align-items: flex-start;
          }
        }
        .about-photo-stack__deck {
          position: relative;
          width: min(260px, 78vw);
          height: clamp(260px, 46vw, 300px);
          margin: 0;
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .about-photo-stack__deck:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 6px;
          border-radius: 14px;
        }
        .about-photo-stack__card {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          overflow: hidden;
          box-shadow:
            0 1px 2px rgba(15, 23, 42, 0.06),
            0 12px 32px -8px rgba(15, 23, 42, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.85);
          background: var(--bg-elevated);
          transform-origin: center center;
          will-change: transform;
        }
        .about-photo-stack__card--top {
          box-shadow:
            0 2px 4px rgba(15, 23, 42, 0.08),
            0 20px 48px -12px rgba(15, 23, 42, 0.22);
        }
        .about-photo-stack__img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
          pointer-events: none;
        }
        .about-photo-stack__hint {
          margin: 0;
          font-family: var(--font-sans);
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--text-soft);
        }
      `}</style>
    </div>
  );
}
