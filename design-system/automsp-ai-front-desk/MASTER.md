# AutoMSP AI Front Desk — design system

Applied UI UX Pro Max from https://github.com/nextlevelbuilder/ui-ux-pro-max-skill.

## Research and selection
Ran `healthcare SaaS professional minimal --design-system`; rejected the wellness/neumorphism direction as a poor product fit. Narrowed to `B2B SaaS minimal --design-system`, which returned Hero + Features + CTA and a professional SaaS hierarchy. Also ran `navigation links image --stack nextjs` against the detected Next.js 16.4.2 stack. Read the skill and professional review checklist.

## Deliberate adaptations
Use the recommended concise hero/features/CTA structure and Next Link/Image guidance. Retain the existing Figtree/Noto Sans pairing to avoid unnecessary font churn. Use solid surfaces instead of glass effects for legibility. Adopt a muted green accent inspired by the supplied logo, rather than the generic blue/orange palette. No fabricated testimonials, certification badges or outcomes.

## Tokens and hierarchy
Paper #f7faf8, white surfaces, ink #142d28, body #465a54, muted #5c6c65, accent #176344, hover #104a32. Hero illustration uses clearly labelled sample data. Full unmodified light logo appears in header/footer, paired with a readable product wordmark. Desktop content width 1120px; 20/32px gutters. 44px minimum main controls. Focus rings and reduced motion supported.

## Navigation
Product, Solutions, Security, Pricing, About. Nested content retains independent routes. Demo actions resolve to a single validated HTTPS booking URL or the honest booking-pending page. Skip link is the only intended hash link in global navigation.

## Launch requirements
Set NEXT_PUBLIC_BOOKING_URL to the actual HTTPS booking URL in Vercel, then rebuild. Confirm product capabilities, supported integrations, privacy policy and service terms before production. Keep demo indexing disabled until review is complete.
