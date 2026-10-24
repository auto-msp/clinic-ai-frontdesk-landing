# AutoMSP AI Front Desk — final integrated design

UI UX Pro Max was read and its design-system and Next.js searches were run. The initial branch proposed a green minimal SaaS direction. On resuming, main had received UI passes 2–4 with individual page layouts, illustrations, mockups, keyboard-navigation improvements, and an Ink & Clay design system. The integration preserves those newer decisions rather than overwriting them.

## Final design
Keep main’s Calistoga / Inter / JetBrains Mono type system, cream surfaces, navy ink and clay accent. Keep all page-specific layouts and product mockups. Add the supplied light-theme logo (without domain suffix), a readable AutoMSP AI Front Desk wordmark and an A favicon. Preserve dedicated routes and responsive menus.

## Booking and truthful states
All primary demo actions use one validated HTTPS NEXT_PUBLIC_BOOKING_URL. Without it, they lead to /book-demo with a clear booking-pending state. No fake form success or placeholder email/phone details. Example results remain labelled; security requirements and pending legal content are explicit.

## Validation and launch
Lint and production build must pass on the integrated tree. Verify navigation, focus, mobile layout, routes and booking in the preview. Supply the real booking URL, confirm operational claims/integrations, and finalize legal content before production. Keep indexing disabled during review.
