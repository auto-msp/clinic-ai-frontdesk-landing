# UI pass 3: how the UI/UX Pro Max skill was applied

The first two passes used the skill's rule checklist but skipped most of its search
workflow, and kept a teal palette. This pass ran the searches and let the results decide.

| Search (all via `.claude/skills/ui-ux-pro-max/scripts/search.py`) | What it returned | Decision |
|---|---|---|
| `--design-system` "healthcare clinic receptionist software editorial trustworthy human" `--variance 8 --motion 3 --density 3` | Calm cyan palette, Atkinson Hyperlegible, Brutalism-leaning style notes (sharp corners, visible borders), subtle scroll reveal | Rejected the cyan palette (it is the default clinic-software look). Kept the sharp-corner, visible-border and subtle-motion guidance. |
| `--domain color` "healthcare warm editorial calm", "medical practice appointment booking" | Every healthcare entry is cyan, teal or sky blue | Do not use the healthcare family. |
| `--domain color` across warm, editorial, legal, luxury and wellness queries | Warm ink + amber on cream (Notes & Writing); navy + warm metal (Legal Services); terracotta (Recipe) | Took the warm-ink-on-cream and navy-plus-warm-metal families: warm paper, blue-black ink, one clay accent. |
| `--domain typography` "editorial serif display humanist sans warm trustworthy" | "SaaS Boutique": Calistoga + Inter + JetBrains Mono, tagged "editorial, human warmth, B2B" | Adopted it: Calistoga display, Inter body, JetBrains Mono labels. |
| `--domain style` "editorial typographic asymmetric warm minimal" | Minimalism and Swiss (what passes 1 and 2 used) | Kept the grid discipline; the personality comes from palette, type and shape instead. |
| `--domain landing` "product demo walkthrough b2b service" | Product Demo + Features: hero, product mockup, per-feature sections, CTA | Matches the existing structure (drawn product screens, sample-data labels). |
| `--domain ux` "visual hierarchy primary action contrast hero" | Dark text on light, hover feedback | Already met; one primary CTA per view. |
| `--domain icons` | Phosphor outline set for calendar, phone, clipboard, shield | Icons stay minimal and in one outline family; none used decoratively. |
| `--stack nextjs` "font optimization images layout shift" | `next/font`, no external font links | All three fonts load through `next/font/google`; the mono font is not preloaded. |

## Palette ("Ink & Clay"), WCAG AA computed

| Token | Value | Use | Contrast |
|---|---|---|---|
| paper | `#f6f1e8` | page background | ink 15.3:1, body 9.1:1, subtle 5.6:1 |
| paper-2 | `#ede5d6` | alternating sections | ink 13.7:1, subtle 5.0:1 |
| ink | `#121b2e` | text, dark sections, borders | |
| accent (clay) | `#a93b12` | CTAs, links, highlights | on paper 5.6:1, white on accent 6.3:1 |
| accent-bright | `#f3a883` | accent on ink | 8.8:1 |
| ok / amber | `#2b6a3c` / `#765000` | status chips | 5.4:1 / 5.7:1 on their tints |

Form field borders use `subtle` (5.6:1), which meets the 3:1 non-text rule that the old hairline border did not.

## Not done

- Layout structure is unchanged from pass 2 (same templates and section order). This pass changes identity (colour, type, shape), not information architecture.
- No dark mode, no photography, default Next.js 404 page not restyled.
