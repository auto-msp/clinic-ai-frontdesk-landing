"use client";

import { LazyMotion } from "motion/react";
import type { ReactNode } from "react";

// The animation features load after hydration, so motion stays off the critical path.
const loadFeatures = () => import("./features").then((mod) => mod.default);

export default function MotionRoot({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
