"use client";

import type { Variants } from "motion/react";
import * as m from "motion/react-m";

export type Step = { title: string; sub?: string };

const EASE = [0.2, 0.7, 0.2, 1] as const;

// The list staggers its steps 60ms apart; each step's own motion is at most 240ms.
const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.24, ease: EASE } },
};
const dotIn: Variants = {
  hidden: { scale: 0 },
  show: { scale: 1, transition: { duration: 0.18, ease: EASE } },
};
// The connector draws toward the next step: along x in the row layout, along y when vertical.
const lineIn: Variants = {
  hidden: { scaleX: 0, scaleY: 0 },
  show: { scaleX: 1, scaleY: 1, transition: { duration: 0.24, ease: EASE } },
};

/**
 * Process timeline. `row` runs left to right from md up (vertical on phones);
 * `column` is always a vertical timeline. Both end on a node, not a line.
 * Steps appear in order once, as the list scrolls into view. `data-reveal` lets
 * globals.css show the final state for reduced motion.
 */
export default function Steps({
  steps,
  label,
  dark = false,
  layout = "row",
}: {
  steps: Step[];
  label?: string;
  dark?: boolean;
  layout?: "row" | "column";
}) {
  const num = dark ? "text-accent-bright" : "text-accent";
  const title = dark ? "text-white" : "text-ink";
  const sub = dark ? "text-white/75" : "text-subtle";
  const line = dark ? "bg-white/25" : "bg-line-strong";
  const dot = dark ? "bg-accent-bright" : "bg-accent";
  const row = layout === "row";

  return (
    <div>
      {label && <p className={`t-eyebrow mb-6 ${dark ? "text-white/75" : "text-subtle"}`}>{label}</p>}
      <m.ol
        variants={list}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        className={row ? "md:grid md:grid-cols-[repeat(var(--n),minmax(0,1fr))]" : ""}
        style={{ "--n": steps.length } as React.CSSProperties}
      >
        {steps.map((s, i) => (
          <m.li
            key={s.title}
            variants={item}
            data-reveal=""
            className={`relative pb-8 pl-9 last:pb-0 ${row ? "md:pb-0 md:pl-0 md:pr-6 md:pt-9" : ""}`}
          >
            {i < steps.length - 1 && (
              <m.span
                aria-hidden="true"
                variants={lineIn}
                data-reveal=""
                className={`absolute left-[0.4375rem] top-4 bottom-[-0.25rem] w-px origin-top-left ${line} ${
                  row ? "md:left-4 md:right-0 md:top-[0.4375rem] md:bottom-auto md:h-px md:w-auto" : ""
                }`}
              />
            )}
            <m.span
              aria-hidden="true"
              variants={dotIn}
              data-reveal=""
              className={`absolute left-0 top-1.5 size-3.5 rounded-full ${dot} ${row ? "md:top-0" : ""}`}
            />
            <span className={`t-num text-sm ${num}`}>{String(i + 1).padStart(2, "0")}</span>
            <p className={`t-h3 mt-1 ${title}`}>{s.title}</p>
            {s.sub && <p className={`mt-1 text-[0.9375rem] ${sub}`}>{s.sub}</p>}
          </m.li>
        ))}
      </m.ol>
    </div>
  );
}
