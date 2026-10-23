import Link from "next/link";
import Image from "next/image";
import { cacheLife } from "next/cache";
import { legal, nav } from "@/content/nav";
import { Container } from "./ui";

const solutions = nav.find((n) => n.label === "Solutions");
const about = nav.find((n) => n.label === "About");

const linkCls = "inline-flex min-h-9 items-center text-[0.95rem] text-body transition-colors hover:text-ink";

export default async function Footer() {
  // Cache Components forbids reading the clock during prerender unless the
  // result is cached. Refresh once a day so the year rolls over on its own.
  "use cache";
  cacheLife("days");

  const columns = [
    {
      title: "Product",
      links: [
        { href: "/product", label: "Product" },
        { href: "/security", label: "Security" },
        { href: "/technology", label: "Technology" },
        { href: "/pricing", label: "Pricing" },
      ],
    },
    {
      title: "Solutions",
      links: solutions && "children" in solutions ? solutions.children.map((c) => ({ href: c.href, label: c.title })) : [],
    },
    {
      title: "Company",
      links: [
        ...(about && "children" in about ? about.children.map((c) => ({ href: c.href, label: c.title })) : []),
        { href: "/case-studies", label: "Case Studies" },
        { href: "/contact", label: "Contact" },
      ],
    },
    {
      title: "Help",
      links: [
        { href: "/faq", label: "FAQ" },
        { href: "/support", label: "Support" },
        ...legal.map((l) => ({ href: l.href, label: l.label })),
      ],
    },
  ];

  return (
    <footer className="border-t border-line bg-paper py-14 text-sm text-subtle">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Image src="/brand/automsp-light.png" alt="AutoMSP — AI Automation Services" width={156} height={156} className="mb-4 rounded-full" /><p className="font-display text-lg font-semibold text-ink">AutoMSP AI Front Desk</p>
            <p className="mt-2 max-w-[28ch] text-[0.95rem] text-body">
              An AI front desk that answers calls, books visits and refills cancelled slots.
            </p>
          </div>
          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-subtle">{col.title}</p>
              <ul>
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className={linkCls}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <span>© {new Date().getFullYear()} AutoMSP. All rights reserved.</span>
          <span>AI automation. A more human front desk.</span>
        </div>
      </Container>
    </footer>
  );
}
