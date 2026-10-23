export type NavChild = { href: string; title: string; desc: string };
export type NavItem =
  | { label: string; href: string }
  | { label: string; children: NavChild[] };

/** Single source of truth for the header, mobile menu and footer. */
export const nav: NavItem[] = [
  { label: "Product", href: "/product" },
  {
    label: "Solutions",
    children: [
      { href: "/solutions", title: "Solutions overview", desc: "Every clinic type we design for" },
      { href: "/solutions/waitlist-automation", title: "Waitlist automation", desc: "Refill cancelled slots by phone" },
      { href: "/solutions/medical-intake", title: "Medical intake", desc: "Clinical details gathered on the call" },
      { href: "/solutions/insurance-intake", title: "Insurance intake", desc: "Coverage captured and checked" },
    ],
  },
  { label: "Security", href: "/security" },
  { label: "Pricing", href: "/pricing" },
  {
    label: "About",
    children: [
      { href: "/about", title: "About us", desc: "Our mission and approach" },
      { href: "/faq", title: "FAQs", desc: "Answers before you get started" },
      { href: "/support", title: "Support", desc: "Implementation and ongoing help" },
      { href: "/contact", title: "Contact", desc: "Start a conversation" },
      { href: "/implementation", title: "Implementation", desc: "How a rollout works" },
      { href: "/integrations", title: "Integrations", desc: "Calendars, records and phone systems" },
    ],
  },
];

export const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];
