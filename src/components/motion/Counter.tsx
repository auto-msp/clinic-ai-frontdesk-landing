"use client";

import { useInView } from "motion/react";
import { useEffect, useLayoutEffect, useRef } from "react";

/*
 * Adapted from the 21st.dev "Count Up" by unlumen (see docs/motion-21st/NOTES.md).
 * Kept from it: start once when the number enters the viewport, write the value
 * straight to the text node so React does not re-render per frame, tabular figures.
 * Changed: a 280ms cubic ease-out in a plain rAF loop (this keeps motion's `animate`
 * runtime out of the home page bundle) instead of a 2s spring, no per-digit effects or
 * measuring dependency, and the final value is always in the markup: no-JS, screen
 * readers, and an invisible copy that reserves the final width so nothing shifts.
 */

const DURATION = 280;

export default function Counter({ value }: { value: string }) {
  const match = value.match(/^(\d+)(.*)$/);
  const to = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const still = () => !match || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Show the start value before first paint so the final number never flashes first.
  useLayoutEffect(() => {
    if (!still() && ref.current) ref.current.textContent = `0${suffix}`;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!inView || still()) return;
    const start = performance.now();
    let frame = requestAnimationFrame(function tick(now) {
      const t = Math.min((now - start) / DURATION, 1);
      if (ref.current) ref.current.textContent = `${Math.round(to * (1 - (1 - t) ** 3))}${suffix}`;
      if (t < 1) frame = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  return (
    <span className="inline-grid tabular-nums">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span ref={ref} aria-hidden="true" className="col-start-1 row-start-1">
        {value}
      </span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
