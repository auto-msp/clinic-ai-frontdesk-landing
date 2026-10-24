export type NavChild = { href: string; title: string; desc: string };
export type NavItem =
  | { label: string; href: string }
  | { label: string; children: NavChild[] };

export const home = { label: "Home", href: "/" } as const;

/**
 * Single source of truth for the header, mobile menu and footer. Every page
 * on the site is reachable from here; the secondary pages live in groups so
 * the desktop bar stays short enough to be readable from 1024px up.
 */
export const nav: NavItem[] = [
  {
    label: "Product",
    children: [
      { href: "/product", title: "Product overview", desc: "Calls, scheduling, intake and the dashboard" },
      { href: "/technology", title: "Technology", desc: "How the assistant works under the hood" },
      { href: "/integrations", title: "Integrations", desc: "Calendars, records and phone systems" },
      { href: "/security", title: "Security", desc: "How patient information is protected" },
    ],
  },
  {
    label: "Solutions",
    children: [
      { href: "/solutions", title: "Solutions overview", desc: "Every clinic type we design for" },
      { href: "/solutions/waitlist-automation", title: "Waitlist automation", desc: "Refill cancelled slots by phone" },
      { href: "/solutions/medical-intake", title: "Medical intake", desc: "Clinical details gathered on the call" },
      { href: "/solutions/insurance-intake", title: "Insurance intake", desc: "Coverage captured and checked" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Resources",
    children: [
      { href: "/case-studies", title: "Case studies", desc: "What recovering revenue looks like" },
      { href: "/implementation", title: "Implementation", desc: "How a rollout works" },
      { href: "/faq", title: "FAQ", desc: "Straight answers to common questions" },
      { href: "/support", title: "Support", desc: "Help for your team and your patients" },
    ],
  },
  {
    label: "Company",
    children: [
      { href: "/about", title: "About us", desc: "Our mission and approach" },
      { href: "/leadership", title: "Leadership", desc: "The people behind it" },
      { href: "/contact", title: "Contact", desc: "Start the conversation" },
    ],
  },
];

export const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];
