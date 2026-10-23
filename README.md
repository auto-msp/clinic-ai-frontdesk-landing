# Clinic AI Front Desk: landing page template

A single-page marketing site for an AI front-desk product aimed at clinics (call answering, scheduling, intake, and automatic waitlist refills).

Built with Next.js 16 (App Router, Cache Components), React 19 and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm run start
```

Requires Node 20.9 or newer.

## Structure

| Path | What it holds |
| --- | --- |
| `src/app/layout.tsx` | Fonts (Figtree + Noto Sans), metadata, skip link, header and footer |
| `src/app/page.tsx` | Page composition, section order |
| `src/app/globals.css` | Design tokens (paper, ink, one teal accent), focus ring, motion |
| `src/app/icon.svg` | Favicon |
| `src/components/Sections.tsx` | Home page sections after the hero |
| `src/content/nav.ts` | Header, mobile menu and footer navigation (single source) |
| `src/content/pages.ts` | Copy and structure for every inner page |
| `src/components/PageView.tsx` | Renders an inner page from `pages.ts` |
| `src/app/<route>/page.tsx` | One tiny file per route (19 inner pages) |
| `src/components/ui.tsx` | Section, Steps, Window (mock-up frame), Chip, buttons |
| `src/components/icons.tsx` | Inline SVG icon set |
| `src/components/Header.tsx` | Sticky nav with mobile menu (client component) |
| `src/components/WaitlistForm.tsx` | Waitlist email form (client component) |
| `legacy-static/` | The original plain HTML/CSS/JS version, kept for reference |

## Design notes

The UI follows the UI/UX Pro Max skill (kept in `.claude/skills/ui-ux-pro-max`): calm, minimal, one accent colour, hairline rules instead of boxed cards, no gradients or emoji. Every colour pair meets WCAG AA, controls are at least 44px tall, every input has a visible label, and motion respects `prefers-reduced-motion`. Product mock-ups are always labelled as sample data.

## Before launch

- Replace the `YourBrand` wordmark, favicon (`src/app/icon.svg`) and all copy with your own.
- `WaitlistForm` is front-end only. Wire `onSubmit` to your CRM or a server action.
- The Security section is generic. Only claim certifications you hold.
- `robots` is set to `noindex` in `layout.tsx`. Remove it when the page carries real branding.
- Add real Privacy, Terms and Contact links to `Footer.tsx`.
- Rewrite `src/content/pages.ts`: every inner page is template copy. Case study numbers are placeholders, and the Security, Integrations and legal pages must reflect reality (have a lawyer review Privacy and Terms).
- Do not reuse any other company's name, logo, imagery or marketing text.

## AutoMSP redesign

The design decisions and UI UX Pro Max application are documented in `design-system/automsp-ai-front-desk/MASTER.md`. Set `NEXT_PUBLIC_BOOKING_URL` to your HTTPS scheduling URL in Vercel and rebuild. All demo CTAs share this value; absent or invalid URLs show an honest pending page, with no fake form submissions. This remains a marketing demo, not a live patient-management system. Review product claims, integration availability and legal pages before production.
