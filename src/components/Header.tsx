"use client";

import { useState } from "react";
import { ButtonLink, Container } from "./ui";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#waitlist", label: "Waitlist calling" },
  { href: "#receptionist", label: "Receptionist" },
  { href: "#intake", label: "Intake" },
  { href: "#dashboard", label: "Dashboard" },
  { href: "#security", label: "Security" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <Container className="relative flex h-[68px] items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 text-xl font-extrabold text-primary">
          <span
            aria-hidden
            className="grid size-[30px] place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-sm text-white"
          >
            Y
          </span>
          YourBrand
        </a>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-7 text-sm font-medium text-body">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-primary">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden md:block">
          <ButtonLink href="#demo">Request a Demo</ButtonLink>
        </div>

        <button
          type="button"
          className="text-2xl text-primary md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>

        {open && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="absolute left-0 right-0 top-[68px] border-b border-line bg-white px-5 py-4 md:hidden"
          >
            <ul className="flex flex-col gap-3.5 text-sm font-medium text-body">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-1">
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#demo"
                  onClick={() => setOpen(false)}
                  className="mt-1 inline-block rounded-lg bg-accent px-5 py-2.5 font-semibold text-white"
                >
                  Request a Demo
                </a>
              </li>
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
}
