"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

/**
 * Section reveal: opacity and a 10px rise, once, in 240ms. Transform and opacity
 * only, so nothing around it moves. The `data-reveal` hook lets globals.css and a
 * noscript rule force the final state for reduced motion and for no-JS visitors.
 */
export default function Reveal({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = m[as];
  return (
    <Tag
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </Tag>
  );
}
