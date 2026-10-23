"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up to `to` once it scrolls into view. Shows the final value without JS or with reduced motion. */
export default function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [value, setValue] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    setValue(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const step = Math.max(1, Math.ceil(to / 30));
        const tick = () => {
          setValue((v) => {
            const next = Math.min(to, v + step);
            if (next < to) raf = requestAnimationFrame(tick);
            return next;
          });
        };
        tick();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to]);

  return (
    <b ref={ref} className="block text-2xl text-primary">
      {value}
      {suffix}
    </b>
  );
}
