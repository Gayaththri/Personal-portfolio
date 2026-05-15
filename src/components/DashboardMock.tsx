import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function DashboardMock() {
  const reduce = useReducedMotion();
  const raw = useId();
  const uid = raw.replace(/:/g, "");
  const fillId = `chartFill-${uid}`;
  const strokeId = `chartStroke-${uid}`;

  return (
    <motion.div
      className="dash"
      initial={reduce ? false : { opacity: 0, scale: 0.97 }}
      animate={reduce ? undefined : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
    >
      <div className="dash__chrome">
        <span className="dash__dot" />
        <span className="dash__dot" />
        <span className="dash__dot" />
        <span className="dash__title">Product health</span>
      </div>
      <div className="dash__body">
        <div className="dash__kpis">
          <div className="dash__kpi">
            <span className="dash__kpi-label">Funnel conv.</span>
            <span className="dash__kpi-value">24.8%</span>
            <span className="dash__kpi-delta dash__kpi-delta--up">+3.1%</span>
          </div>
          <div className="dash__kpi">
            <span className="dash__kpi-label">Time-to-value</span>
            <span className="dash__kpi-value">1.2d</span>
            <span className="dash__kpi-delta dash__kpi-delta--down">−0.3d</span>
          </div>
          <div className="dash__kpi">
            <span className="dash__kpi-label">Ticket backlog</span>
            <span className="dash__kpi-value">128</span>
            <span className="dash__kpi-delta dash__kpi-delta--flat">stable</span>
          </div>
        </div>
        <div className="dash__chart">
          <svg viewBox="0 0 320 120" className="dash__svg" aria-hidden>
            <defs>
              <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(79,70,229,0.35)" />
                <stop offset="100%" stopColor="rgba(79,70,229,0)" />
              </linearGradient>
              <linearGradient id={strokeId} x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#4f46e5" />
                <stop offset="1" stopColor="#7c3aed" />
              </linearGradient>
            </defs>
            <path
              d="M0,90 C40,88 60,40 100,55 C140,70 160,20 200,35 C240,50 280,25 320,30 L320,120 L0,120 Z"
              fill={`url(#${fillId})`}
            />
            <path
              d="M0,90 C40,88 60,40 100,55 C140,70 160,20 200,35 C240,50 280,25 320,30"
              fill="none"
              stroke={`url(#${strokeId})`}
              strokeWidth="2.5"
            />
          </svg>
          <div className="dash__legend">
            <span>Workflow completion</span>
            <span className="dash__pill">Last 30 days</span>
          </div>
        </div>
      </div>
      <style>{`
        .dash {
          border-radius: 18px;
          border: 1px solid var(--glass-border);
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          max-width: 100%;
        }
        .dash__chrome {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 10px 14px;
          border-bottom: 1px solid var(--border);
          background: rgba(255, 255, 255, 0.5);
        }
        .dash__dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e2e8f0;
        }
        .dash__dot:nth-child(1) {
          background: #fecaca;
        }
        .dash__dot:nth-child(2) {
          background: #fde68a;
        }
        .dash__dot:nth-child(3) {
          background: #bbf7d0;
        }
        .dash__title {
          margin-left: auto;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-soft);
        }
        .dash__body {
          padding: 14px 14px 16px;
          display: grid;
          gap: 12px;
        }
        .dash__kpis {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 8px;
        }
        .dash__kpi {
          padding: 8px 10px;
          border-radius: 12px;
          background: rgba(15, 23, 42, 0.03);
          border: 1px solid var(--border);
        }
        .dash__kpi-label {
          display: block;
          font-size: 10px;
          font-weight: 600;
          color: var(--text-soft);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .dash__kpi-value {
          display: block;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1.1rem;
          margin-top: 2px;
        }
        .dash__kpi-delta {
          font-size: 10px;
          font-weight: 600;
        }
        .dash__kpi-delta--up {
          color: #059669;
        }
        .dash__kpi-delta--down {
          color: #4f46e5;
        }
        .dash__kpi-delta--flat {
          color: var(--text-soft);
        }
        .dash__chart {
          border-radius: 14px;
          border: 1px solid var(--border);
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.6));
          padding: 10px 10px 8px;
        }
        .dash__svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .dash__legend {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          font-weight: 600;
          color: var(--text-soft);
          padding: 4px 2px 0;
        }
        .dash__pill {
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 999px;
          background: rgba(79, 70, 229, 0.08);
          color: #4338ca;
        }
      `}</style>
    </motion.div>
  );
}
