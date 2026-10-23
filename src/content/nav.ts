export type NavChild = { href: string; title: string; desc: string };
export type NavItem =
  | { label: string; href: string }
  | { label: string; children: NavChild[] };

/** Single source of truth for the header, mobile menu and footer. */
export const nav: NavItem[] = [
  { label: "Home", href: "/" },
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
  { label: "Technology", href: "/technology" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Support", href: "/support" },
  {
    label: "About",
    children: [
      { href: "/about", title: "About us", desc: "Our mission and approach" },
      { href: "/leadership", title: "Leadership", desc: "The people behind it" },
      { href: "/implementation", title: "Implementation", desc: "How a rollout works" },
      { href: "/integrations", title: "Integrations", desc: "Calendars, records and phone systems" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export const legal = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-service", label: "Terms of Service" },
];
