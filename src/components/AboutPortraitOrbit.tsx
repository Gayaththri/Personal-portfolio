import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../config";
import aboutPortrait from "../assets/about-portrait.png";

const ACCENT = "#7dd3fc";
const ORBIT_RING = "rgba(125, 211, 252, 0.75)";

function Sparkle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <path
        fill={ACCENT}
        d="M12 2.5l1.2 5.1 5.3 1.2-5.3 1.2L12 15.2l-1.2-5.2-5.3-1.2 5.3-1.2L12 2.5zm0 12.3l.7 2.9 2.9.7-2.9.7-.7 2.9-.7-2.9-2.9-.7 2.9-.7.7-2.9z"
      />
    </svg>
  );
}

type AboutPortraitOrbitProps = {
  /** When true, wraps in a section with top padding for the fixed nav (use on /about). */
  lead?: boolean;
};

/** Oval portrait, orbital rings, sparkles, and keyword labels — shared by home About and /about. */
export function AboutPortraitOrbit({ lead = false }: AboutPortraitOrbitProps) {
  const reduce = useReducedMotion();
  const [photoOk, setPhotoOk] = useState(true);
  const initials = siteConfig.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const visual = (
    <motion.div
      className="about-ed__visual"
      initial={reduce ? false : { opacity: 0, x: -20 }}
      whileInView={reduce ? undefined : { opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="about-ed__orbit-wrap" aria-hidden>
        <motion.div
          className="about-ed__orbit about-ed__orbit--a"
          animate={reduce ? undefined : { rotate: [0, 3, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="about-ed__orbit about-ed__orbit--b"
          animate={reduce ? undefined : { rotate: [0, -4, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="about-ed__orbit about-ed__orbit--c"
          animate={reduce ? undefined : { rotate: [0, 2, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <span className="about-ed__kw about-ed__kw--1">analytical</span>
      <Sparkle className="about-ed__sparkle about-ed__sparkle--1" />
      <span className="about-ed__kw about-ed__kw--2">workflow-oriented</span>
      <span className="about-ed__kw about-ed__kw--3">user-focused</span>
      <Sparkle className="about-ed__sparkle about-ed__sparkle--2" />
      <span className="about-ed__kw about-ed__kw--4">collaborative</span>
      <span className="about-ed__kw about-ed__kw--5">technical</span>
      <Sparkle className="about-ed__sparkle about-ed__sparkle--3" />
      <span className="about-ed__kw about-ed__kw--6">strategic</span>

      <div
        className="about-ed__capsule"
        role={!photoOk ? "img" : undefined}
        aria-label={!photoOk ? siteConfig.name : undefined}
      >
        {photoOk ? (
          <img
            src={aboutPortrait}
            alt={siteConfig.name}
            width={280}
            height={380}
            onError={() => setPhotoOk(false)}
            className="about-ed__photo"
            loading="eager"
            decoding="async"
          />
        ) : null}
        {!photoOk ? (
          <div className="about-ed__photo-fallback" aria-hidden>
            <span>{initials}</span>
          </div>
        ) : null}
      </div>
    </motion.div>
  );

  return (
    <>
      {lead ? (
        <section
          id="about-portrait"
          className="about-orbit-lead"
          aria-label={`${siteConfig.name}, portrait`}
        >
          <div className="about-orbit-lead__inner wrap">{visual}</div>
        </section>
      ) : (
        visual
      )}

      <style>{`
        .about-orbit-lead {
          background: var(--bg);
          padding-top: calc(var(--topnav-stack) + 0.5rem);
          padding-bottom: var(--section-pad-y);
          padding-inline: var(--section-pad-inline-start) var(--section-pad-inline-end);
          border-bottom: 1px solid var(--border);
        }
        .about-orbit-lead__inner {
          display: flex;
          justify-content: center;
        }
        .about-ed__visual {
          position: relative;
          min-height: min(520px, 70vh);
          display: flex;
          align-items: center;
          justify-content: center;
          isolation: isolate;
        }
        .about-ed__orbit-wrap {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          z-index: 0;
        }
        .about-ed__orbit {
          position: absolute;
          border: 2px solid ${ORBIT_RING};
          border-radius: 50%;
        }
        .about-ed__orbit--a {
          width: min(88%, 340px);
          height: min(105%, 440px);
          transform: rotate(-18deg);
        }
        .about-ed__orbit--b {
          width: min(95%, 380px);
          height: min(78%, 320px);
          transform: rotate(12deg);
          border-style: solid;
          opacity: 0.88;
        }
        .about-ed__orbit--c {
          width: min(72%, 280px);
          height: min(88%, 360px);
          transform: rotate(-6deg);
          opacity: 0.65;
        }
        .about-ed__kw {
          position: absolute;
          font-family: var(--font-display);
          font-size: clamp(1.15rem, 2.8vw, 1.65rem);
          font-weight: 600;
          color: color-mix(in srgb, ${ACCENT} 88%, #0ea5e9);
          z-index: 1;
          line-height: 1;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.8);
        }
        .about-ed__kw--1 {
          top: 8%;
          left: 4%;
          transform: rotate(-8deg);
        }
        .about-ed__kw--2 {
          top: 22%;
          right: 0;
          transform: rotate(6deg);
        }
        .about-ed__kw--3 {
          top: 42%;
          left: -2%;
          transform: rotate(-4deg);
        }
        .about-ed__kw--4 {
          top: 44%;
          right: -4%;
          left: auto;
          bottom: auto;
          transform: rotate(8deg);
        }
        .about-ed__kw--5 {
          bottom: 11%;
          right: 2%;
          top: auto;
          left: auto;
          transform: rotate(-5deg);
        }
        .about-ed__kw--6 {
          bottom: 11%;
          left: 4%;
          right: auto;
          top: auto;
          transform: rotate(4deg);
        }
        .about-ed__sparkle {
          position: absolute;
          z-index: 1;
          opacity: 0.9;
        }
        .about-ed__sparkle--1 {
          top: 6%;
          left: 28%;
        }
        .about-ed__sparkle--2 {
          top: 38%;
          right: 12%;
        }
        .about-ed__sparkle--3 {
          bottom: 20%;
          right: 22%;
        }
        .about-ed__capsule {
          position: relative;
          z-index: 5;
          width: min(240px, 72vw);
          aspect-ratio: 3 / 4.1;
          border-radius: 999px;
          overflow: hidden;
          border: 4px solid #fff;
          box-shadow:
            0 0 0 2px rgba(125, 211, 252, 0.55),
            0 22px 50px -18px rgba(56, 189, 248, 0.38);
          background-color: #bae6fd;
          background-image: linear-gradient(180deg, #e0f2fe 0%, #bae6fd 50%, #7dd3fc 100%);
          isolation: isolate;
          contain: layout paint;
        }
        .about-ed__photo {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          min-height: 100%;
          object-fit: cover;
          object-position: center 10%;
          display: block;
          transform: translateZ(0) scale(1.14);
          transform-origin: center 16%;
        }
        .about-ed__photo-fallback {
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          background: linear-gradient(180deg, #e0f2fe 0%, #7dd3fc 55%, #38bdf8 100%);
          font-family: var(--font-display);
          font-weight: 800;
          font-size: clamp(2.5rem, 8vw, 3.25rem);
          color: rgba(255, 255, 255, 0.95);
          letter-spacing: -0.04em;
        }
        @media (max-width: 899px) {
          .about-ed__kw--6 {
            right: 0;
          }
          .about-ed__visual {
            min-height: 460px;
          }
        }
      `}</style>
    </>
  );
}
