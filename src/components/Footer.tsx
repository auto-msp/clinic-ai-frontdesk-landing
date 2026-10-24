import Link from "next/link";
import Image from "next/image";
import { demoHref } from "@/content/site";
import { cacheLife } from "next/cache";
import { legal, nav } from "@/content/nav";
import { Container } from "./ui";

// One column per dropdown group, so the footer can never drift from the header.
const groups = nav.flatMap((n) =>
  "children" in n ? [{ title: n.label, links: n.children.map((c) => ({ href: c.href, label: c.title })) }] : [],
);
const productGroup = groups.find((g) => g.title === "Product");
if (productGroup) productGroup.links.push({ href: "/pricing", label: "Pricing" });

const linkCls =
  "-mx-2 inline-flex min-h-11 items-center rounded-md px-2 text-[0.95rem] text-body transition-colors hover:text-ink";

export default async function Footer() {
  // Cache Components forbids reading the clock during prerender unless the
  // result is cached. Refresh once a day so the year rolls over on its own.
  "use cache";
  cacheLife("days");

  return (
    <footer className="border-t border-line bg-surface pb-8 pt-16 text-sm text-subtle">
      <Container>
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div className="sm:col-span-2 lg:col-span-1">
            <Image src="/brand/automsp-light.png" alt="AutoMSP — AI Automation Services" width={156} height={156} className="mb-4 rounded-full" />
            <p className="font-display text-xl text-ink">AutoMSP AI Front Desk</p>
            <p className="mt-4 max-w-[30ch] text-base text-body">
              An AI front desk that answers calls, books visits and refills cancelled slots.
            </p>
            <Link
              href={demoHref}
              className="mt-5 inline-flex min-h-11 items-center rounded-md border border-ink px-4 text-[0.95rem] font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Book a demo
            </Link>
          </div>
          {groups.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.08em] text-subtle">{col.title}</p>
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
        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-line pt-6">
          <p>© {new Date().getFullYear()} AutoMSP. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-6">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex min-h-11 items-center hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="w-full">AI automation for a more connected front desk.</p>
        </div>
      </Container>
    </footer>
  );
}
