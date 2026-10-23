# UI pass 4: layouts and imagery

Two complaints drove this pass: too many pages felt generic (one template with a different heading), and the
imagery (generic table-in-a-card mockups) was weak.

## Imagery
Every image is drawn in code, labelled "Sample data" or "Illustration", and built from the page's own
content so labels cannot drift from the copy. No stock photos.

| Where | Illustration |
|---|---|
| Home, product, waitlist | Front-desk screen with a call in progress, ranked waitlist and activity |
| Product, home | Live call console (waveform, bubbles, what the assistant understood) |
| Product, home | Week calendar as a real table; each slot state spelled out in text |
| Product, home | Dashboard with an SVG bar chart, values labelled, target line, text summary |
| Security | Data path with a lock tag on each hop and an audit strip |
| Technology | System layers diagram |
| Integrations | Hub diagram of the four connection types |
| Implementation | Rollout timeline across the weeks |
| Pricing | Scope inputs, marked "not a calculator, no prices" |
| Medical intake / insurance intake | Patient intake form; coverage card with verification steps |

## Layout recipes (src/components/pageLayouts.ts)
- Heroes: visual (headline + illustration), statement (oversized headline), compact (lookup pages), split.
- Features: ruled list, numbered columns, bordered spec matrix, oversized statement stack.
- Steps: horizontal timeline, zig-zag spine, architecture layers, priority lanes.

## Not done
Copy in `src/content/pages.ts` is unchanged, so every page still follows its content's shape (for example,
legal pages remain text documents). No photography, dark mode or restyled 404.
