"use client";

import * as m from "motion/react-m";

const weekly = [6, 8, 7, 10, 9, 12];
const target = 10;
const EASE = [0.2, 0.7, 0.2, 1] as const;

/**
 * Bar chart in custom SVG: values labelled directly, target line labelled, summary as text.
 * Bars grow from the baseline with scaleY (transform only, 40ms stagger, 240ms each) once
 * the chart is in view; the final frame is the static chart. `data-reveal` lets globals.css
 * show it directly for reduced motion. The target label sits at the left end of its line:
 * on the right it was hidden behind the tallest bar.
 */
export default function SlotsChart() {
  const w = 340;
  const h = 150;
  const base = 120;
  const max = 14;
  const bar = 34;
  const step = 52;
  const y = (v: number) => base - (v / max) * 100;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={`Bar chart, sample data: slots filled per week over six weeks were ${weekly.join(", ")}, against a target of ${target}.`}
      className="h-auto w-full"
    >
      <line x1="0" x2={w} y1={base} y2={base} stroke="#c3b6a0" strokeWidth="1" />
      <line x1="0" x2={w} y1={y(target)} y2={y(target)} stroke="#121b2e" strokeWidth="1" strokeDasharray="4 4" />
      <text x="0" y={y(target) - 5} textAnchor="start" fontSize="12" fill="#121b2e" fontWeight="600">
        Target {target}
      </text>
      {weekly.map((v, i) => {
        const x = 8 + i * step;
        const last = i === weekly.length - 1;
        const t = { duration: 0.24, ease: EASE, delay: i * 0.04 };
        return (
          <g key={i}>
            <m.rect
              data-reveal=""
              x={x}
              y={y(v)}
              width={bar}
              height={base - y(v)}
              rx="2"
              fill={last ? "#a93b12" : "#121b2e"}
              style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={t}
            />
            <m.text
              data-reveal=""
              x={x + bar / 2}
              y={y(v) - 5}
              textAnchor="middle"
              fontSize="13"
              fontWeight="600"
              fill="#121b2e"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -8% 0px" }}
              transition={t}
            >
              {v}
            </m.text>
            <text x={x + bar / 2} y={base + 18} textAnchor="middle" fontSize="12" fill="#596070">
              Wk {i + 1}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
