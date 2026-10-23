"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import { ButtonLink, Container } from "./ui";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#waitlist", label: "Waitlist calling" },
  { href: "#receptionist", label: "Receptionist" },
  { href: "#intake", label: "Intake" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#security", label: "Security" },
];

function Wordmark() {
  return (
    <a href="#top" className="flex min-h-11 items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-ink">
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true" focusable="false">
        <rect width="28" height="28" rx="7" fill="#0b7a75" />
        <path d="M9 8.5 14 15l5-6.5M14 15v5.5" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      YourBrand
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  // Escape closes the mobile menu, matching the expectation set by aria-expanded.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <Container className="relative flex h-[68px] items-center justify-between gap-6">
        <Wordmark />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1 text-[0.95rem] font-medium text-body">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="inline-flex min-h-11 items-center rounded-md px-3 transition-colors hover:text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href="#demo">Request a demo</ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-md text-ink lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>

        {open && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="absolute inset-x-0 top-[68px] border-b border-line bg-paper px-5 pb-6 pt-2 shadow-window sm:px-8 lg:hidden"
          >
            <ul className="flex flex-col text-base font-medium text-ink">
              {links.map((l) => (
                <li key={l.href} className="border-b border-line">
                  <a href={l.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center">
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="pt-5">
                <a
                  href="#demo"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-center rounded-lg bg-accent font-semibold text-white"
                >
                  Request a demo
                </a>
              </li>
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
