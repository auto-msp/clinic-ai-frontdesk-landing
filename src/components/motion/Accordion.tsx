"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDownIcon } from "../icons";

/*
 * Adapted from the 21st.dev "Accordion" by ddoemonn (see docs/motion-21st/NOTES.md).
 * Kept from it: header buttons with aria-expanded and aria-controls, panels as
 * labelled regions that are inert while closed, and Arrow/Home/End roving focus.
 * Changed: ruled rows in this site's tokens instead of a bordered card, a 200ms
 * tween instead of springs, height animated to "auto" (no measuring hook), no
 * panel scroll box, and multiple panels may stay open, as the old <details> did.
 */

const EASE = [0.2, 0.7, 0.2, 1] as const;

export type AccordionItem = { id: string; title: string; content: string };

export default function Accordion({ items, headingLevel = 2 }: { items: AccordionItem[]; headingLevel?: 2 | 3 | 4 }) {
  const base = useId();
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<string[]>([]);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const Heading = `h${headingLevel}` as const;

  const toggle = (id: string) => setOpen((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  const onKeyDown = (e: KeyboardEvent, i: number) => {
    const last = items.length - 1;
    const next = e.key === "ArrowDown" ? (i === last ? 0 : i + 1) : e.key === "ArrowUp" ? (i === 0 ? last : i - 1) : e.key === "Home" ? 0 : e.key === "End" ? last : null;
    if (next === null) return;
    e.preventDefault();
    buttons.current[next]?.focus();
  };

  return (
    <div className="border-t border-ink">
      {items.map((item, i) => {
        const isOpen = open.includes(item.id);
        const headerId = `${base}-h-${item.id}`;
        const panelId = `${base}-p-${item.id}`;
        return (
          <div key={item.id} className="border-b border-line">
            <Heading>
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={headerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left font-display text-xl leading-snug text-ink"
              >
                {item.title}
                <m.span
                  aria-hidden="true"
                  initial={false}
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
                  className="shrink-0 text-subtle"
                >
                  <ChevronDownIcon className="size-6" />
                </m.span>
              </button>
            </Heading>
            <m.div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              inert={!isOpen}
              initial={false}
              animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
              style={{ overflow: "hidden" }}
            >
              <p className="max-w-[60ch] pb-6 text-body">{item.content}</p>
            </m.div>
          </div>
        );
      })}
    </div>
  );
}
