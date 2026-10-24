# Motion and 21st.dev pass

Presentation only. Routes, `src/content/pages.ts`, the placeholder brand, noindex, `vercel.json` and the
footer cache are unchanged.

## What changed

| Where | Change | Built with |
|---|---|---|
| All section content | Reveal on scroll: opacity plus a 10px rise, once, 240ms (`motion/Reveal.tsx`). Replaces the CSS `animation-timeline: view()` rule, which only worked in Chromium. | `motion`, hand-built |
| Step strips (home hero, product, waitlist, no-show) | Dots scale in and connectors draw in order, 60ms stagger, each piece 240ms or less (`motion/Steps.tsx`). | `motion`, hand-built |
| FAQ | Native `<details>` replaced by an animated accordion, 200ms (`motion/Accordion.tsx`). | `motion`, adapted from 21st.dev |
| Dashboard mock | Bars grow from the baseline, stat figures count up in 280ms (`motion/SlotsChart.tsx`, `motion/Counter.tsx`). The "Target 10" label moved to the left end of its line; on the right it was hidden behind the tallest bar. | `motion`, Counter adapted from 21st.dev |

`motion` loads through `LazyMotion` with `domAnimation` as an async chunk (`motion/MotionRoot.tsx`), so it stays off
the critical path. `prefers-reduced-motion: reduce` and no-JS both show the final state through the
`[data-reveal]` rule in `globals.css` and a `<noscript>` rule in `layout.tsx`. Nothing animates layout properties
on load: reveals and charts use transform and opacity only, and the counters reserve their final width.

## 21st.dev components

Both were fetched through the 21st.dev Magic MCP server (`get_component`, free tier, 2 of 2 daily retrievals) on
2026-10-24. Neither was pasted in: each was read, then rewritten to this site's tokens and constraints. No API key is
stored in the repo or in these files.

### Accordion
- Source: https://21st.dev/@ddoemonn/components/accordion (component id 23530), author ddoemonn.
- Licence: MIT, as stated on the component page ("License: MIT"). The retrieved source carried no licence header.
- Kept: header button with `aria-expanded` and `aria-controls`, panels as labelled regions, `inert` while closed,
  Arrow/Home/End roving focus.
- Changed: ruled rows in the site's ink and line tokens instead of a rounded, shadowed card; 200ms tween instead of
  springs; height animated to `auto` instead of a ResizeObserver measuring hook; no scroll box in panels; several
  panels may be open, as before; no dark-mode classes.
- Ours: `src/components/motion/Accordion.tsx`.

### Count Up
- Source: https://21st.dev/@unlumen/components/count-up (component id 20068), author unlumen.
- Licence: MIT, as stated on the component page ("License: MIT"). The retrieved source carried no licence header.
- Kept: start once on entering the viewport, write the value directly to the text node, tabular figures.
- Changed: 280ms cubic ease-out in a plain `requestAnimationFrame` loop instead of a 2s spring (using motion's
  `animate` added about 5 KB to the home page and pushed the Lighthouse median to 94); dropped the odometer, blur and fade digit effects, the
  `react-use-measure` dependency and the `cn` helper; the final value is always in the markup and an invisible copy
  reserves its width.
- Ours: `src/components/motion/Counter.tsx`.

The MIT text requires its copyright and permission notice to travel with copies or substantial portions of the
software. The pages show no copyright line to copy, so this note and the header comment in each file record the
author and source instead. Re-check the licence on the component page before reusing either file outside this site.

## Checks

- `npm run lint` and `npm run build` pass on every commit.
- Lighthouse mobile on `/`, median of 3 runs against a `main` build measured back to back on the same machine:
  see the pull request for the numbers.
- Verified in Chromium at 1440px and 390px: no layout shift from the animations (document height identical before
  and after), no console errors, final state correct with reduced motion on.
