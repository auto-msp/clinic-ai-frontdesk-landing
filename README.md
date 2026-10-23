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
| `src/app/layout.tsx` | Fonts, metadata, Open Graph tags |
| `src/app/page.tsx` | Page composition, section order |
| `src/app/globals.css` | Tailwind theme tokens (navy, teal, sky), scroll reveal |
| `src/components/Sections.tsx` | All content sections after the hero |
| `src/components/ui.tsx` | Shared layout and mock-up pieces |
| `src/components/Header.tsx` | Sticky nav with mobile menu (client component) |
| `src/components/Counter.tsx` | Dashboard count-up (client component) |
| `src/components/WaitlistForm.tsx` | Waitlist email form (client component) |
| `legacy-static/` | The original plain HTML/CSS/JS version, kept for reference |

## Before launch

- Replace the `YourBrand` wordmark, hero placeholder and all copy with your own.
- `WaitlistForm` is front-end only. Wire `onSubmit` to your CRM or a server action.
- The Security section is generic. Only claim certifications you hold.
- `robots` is set to `noindex` in `layout.tsx`. Remove it when the page carries real branding.
- Do not reuse any other company's name, logo, imagery or marketing text.
