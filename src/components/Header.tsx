"use client";

import Link from "next/link";
import Brand from "./Brand";
import { demoHref } from "@/content/site";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, type NavItem } from "@/content/nav";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "./icons";
import { ButtonLink } from "./ui";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
const groupActive = (pathname: string, item: NavItem) => "children" in item && item.children.some((c) => isActive(pathname, c.href));

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Dropdowns: Escape closes (and returns focus to the trigger); a click outside closes.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      document.querySelector<HTMLElement>(`[data-trigger="${menu}"]`)?.focus();
      setMenu(null);
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [menu]);

  // Mobile menu: Escape closes.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const closeAll = () => {
    setMenu(null);
    setMobileOpen(false);
  };

  const itemCls = (active: boolean) =>
    `relative inline-flex min-h-11 items-center gap-1 rounded-md px-2.5 text-[0.9rem] font-medium transition-colors hover:text-ink ${active ? "text-ink after:absolute after:inset-x-2.5 after:bottom-1 after:h-0.5 after:bg-accent" : "text-body"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="relative mx-auto flex h-[84px] w-full max-w-[1360px] items-center justify-between gap-4 px-5 sm:px-8">
        <Brand onClick={closeAll} />

        <nav ref={navRef} aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center">
            {nav.map((item) =>
              "children" in item ? (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    data-trigger={item.label}
                    aria-expanded={menu === item.label}
                    aria-controls={`menu-${item.label}`}
                    onClick={() => setMenu((m) => (m === item.label ? null : item.label))}
                    className={itemCls(groupActive(pathname, item))}
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`size-4 transition-transform duration-150 ${menu === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {menu === item.label && (
                    <ul
                      id={`menu-${item.label}`}
                      className="absolute left-0 top-full mt-1 w-72 rounded-xl border border-line bg-surface p-2 shadow-window"
                    >
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={closeAll}
                            aria-current={pathname === c.href ? "page" : undefined}
                            className="block rounded-lg px-3 py-2.5 hover:bg-paper"
                          >
                            <span className="block font-semibold text-ink">{c.title}</span>
                            <span className="block text-sm text-subtle">{c.desc}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeAll}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={itemCls(isActive(pathname, item.href))}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden shrink-0 xl:block">
          <ButtonLink href={demoHref}>Book a demo</ButtonLink>
        </div>

        <button
          type="button"
          className="-mr-2 grid size-11 place-items-center rounded-md text-ink xl:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>

        {mobileOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="absolute inset-x-0 top-[84px] max-h-[calc(100dvh-84px)] overflow-y-auto border-b border-line bg-paper px-5 pb-6 pt-2 shadow-window sm:px-8 xl:hidden"
          >
            <ul className="flex flex-col text-base font-medium text-ink">
              {nav.map((item) =>
                "children" in item ? (
                  <li key={item.label} className="border-b border-line pb-2">
                    <p className="pt-4 text-xs font-semibold uppercase tracking-wide text-subtle">{item.label}</p>
                    <ul>
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={closeAll}
                            aria-current={pathname === c.href ? "page" : undefined}
                            className="flex min-h-12 items-center pl-3"
                          >
                            {c.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="flex min-h-12 items-center"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
              <li className="pt-5">
                <Link
                  href={demoHref}
                  onClick={closeAll}
                  className="flex min-h-12 items-center justify-center rounded-lg bg-accent font-semibold text-white"
                >
                  Book a demo
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
