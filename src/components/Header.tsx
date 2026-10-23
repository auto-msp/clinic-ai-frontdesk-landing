"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { home, nav, type NavItem } from "@/content/nav";
import { ChevronDownIcon, CloseIcon, MenuIcon } from "./icons";
import { ButtonLink } from "./ui";

function Wordmark({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="flex min-h-11 shrink-0 items-center gap-2.5 font-display text-xl font-semibold tracking-tight text-ink"
    >
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden="true" focusable="false">
        <rect width="28" height="28" rx="6" fill="#121b2e"/><path d="M8.5 8 14 15.5 19.5 8" fill="none" stroke="#f6f1e8" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 15.5V21" fill="none" stroke="#f6f1e8" stroke-width="2.6" stroke-linecap="round"/><circle cx="21.5" cy="21" r="2.4" fill="#e0743f"/>
      </svg>
      YourBrand
    </Link>
  );
}

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));
const groupActive = (pathname: string, item: NavItem) => "children" in item && item.children.some((c) => c.href === pathname);
const slug = (s: string) => s.toLowerCase().replace(/\W+/g, "-");

const focusables = (root: ParentNode | null) =>
  root ? [...root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter((el) => el.offsetParent !== null) : [];

/**
 * Open state is stored with the pathname it was opened on, so a route change
 * (link click, back button) closes every menu without an effect.
 */
type Open<T> = { value: T; path: string };

export default function Header() {
  const pathname = usePathname();
  const [menuState, setMenuState] = useState<Open<string | null>>({ value: null, path: pathname });
  const [mobileState, setMobileState] = useState<Open<boolean>>({ value: false, path: pathname });
  const [group, setGroup] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const menu = menuState.path === pathname ? menuState.value : null;
  const mobileOpen = mobileState.path === pathname && mobileState.value;

  const setMenu = (v: string | null) => setMenuState({ value: v, path: pathname });
  const setMobile = (v: boolean) => {
    setMobileState({ value: v, path: pathname });
    // Open the section the visitor is already in.
    if (v) setGroup(nav.find((n) => groupActive(pathname, n))?.label ?? null);
  };
  const closeAll = () => {
    setMenu(null);
    setMobile(false);
  };

  // Desktop dropdowns: Escape closes and returns focus to the trigger; a press outside closes.
  useEffect(() => {
    if (!menu) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      navRef.current?.querySelector<HTMLElement>(`[data-trigger="${menu}"]`)?.focus();
      setMenuState({ value: null, path: pathname });
    };
    const onDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenuState({ value: null, path: pathname });
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [menu, pathname]);

  // Mobile menu: lock page scroll, close on Escape, close when the viewport grows to the desktop bar.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMobileState({ value: false, path: pathname });
      headerRef.current?.querySelector<HTMLElement>("[data-mobile-toggle]")?.focus();
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setMobileState({ value: false, path: pathname });
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [mobileOpen, pathname]);

  // Keep Tab inside the header while the mobile menu is open.
  const trapTab = (e: KeyboardEvent<HTMLElement>) => {
    if (!mobileOpen || e.key !== "Tab") return;
    const els = focusables(headerRef.current);
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last?.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first?.focus();
    }
  };

  // Arrow-key support inside an open dropdown (disclosure pattern, plus the keys people expect).
  const moveInMenu = (e: KeyboardEvent<HTMLUListElement>, label: string) => {
    const links = focusables(e.currentTarget);
    const i = links.indexOf(document.activeElement as HTMLElement);
    const go = (n: number) => {
      e.preventDefault();
      links[(n + links.length) % links.length]?.focus();
    };
    if (e.key === "ArrowDown") go(i + 1);
    else if (e.key === "ArrowUp") go(i - 1);
    else if (e.key === "Home") go(0);
    else if (e.key === "End") go(links.length - 1);
    else if (e.key === "Tab") {
      // Leaving the panel by Tab closes it.
      const leaving = e.shiftKey ? i === 0 : i === links.length - 1;
      if (leaving && !e.shiftKey) setMenu(null);
      else if (leaving) {
        e.preventDefault();
        navRef.current?.querySelector<HTMLElement>(`[data-trigger="${label}"]`)?.focus();
        setMenu(null);
      }
    }
  };

  const openFromKey = (e: KeyboardEvent<HTMLButtonElement>, label: string) => {
    if (e.key !== "ArrowDown") return;
    e.preventDefault();
    setMenu(label);
    requestAnimationFrame(() => document.getElementById(`menu-${slug(label)}`)?.querySelector<HTMLElement>("a")?.focus());
  };

  const itemCls = (active: boolean) =>
    `relative inline-flex min-h-11 items-center gap-1 rounded-md px-3 text-[0.95rem] font-medium transition-colors hover:text-ink ${active ? "text-ink after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:bg-accent" : "text-body"}`;

  return (
    <header ref={headerRef} onKeyDown={trapTab} className="sticky top-0 z-50 border-b border-line bg-paper">
      <div className="relative mx-auto flex h-[68px] w-full max-w-[1360px] items-center justify-between gap-4 px-5 sm:px-8">
        <Wordmark onClick={closeAll} />

        <nav ref={navRef} aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {nav.map((item) =>
              "children" in item ? (
                <li key={item.label} className="relative">
                  <button
                    type="button"
                    data-trigger={item.label}
                    aria-expanded={menu === item.label}
                    aria-controls={`menu-${slug(item.label)}`}
                    onClick={() => setMenu(menu === item.label ? null : item.label)}
                    onKeyDown={(e) => openFromKey(e, item.label)}
                    className={itemCls(groupActive(pathname, item))}
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`size-4 transition-transform duration-150 ${menu === item.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {menu === item.label && (
                    <ul
                      id={`menu-${slug(item.label)}`}
                      onKeyDown={(e) => moveInMenu(e, item.label)}
                      className="absolute left-0 top-full mt-1 w-[21rem] rounded-md border border-ink bg-surface p-2 shadow-window"
                    >
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={closeAll}
                            aria-current={pathname === c.href ? "page" : undefined}
                            className="block rounded px-3 py-2.5 hover:bg-paper aria-[current=page]:bg-accent-soft"
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

        <div className="hidden shrink-0 lg:block">
          <ButtonLink href="/contact">Join Waitlist</ButtonLink>
        </div>

        <button
          type="button"
          data-mobile-toggle
          className="-mr-2 grid size-11 place-items-center rounded-md text-ink lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobile(!mobileOpen)}
        >
          {mobileOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
        </button>

        {mobileOpen && (
          <nav
            id="mobile-menu"
            aria-label="Mobile"
            className="fixed inset-x-0 top-[68px] h-[calc(100dvh-68px)] overflow-y-auto overscroll-contain border-t border-line bg-paper px-5 pb-10 pt-4 sm:px-8 lg:hidden"
          >
            <Link
              href="/contact"
              onClick={closeAll}
              className="flex min-h-12 items-center justify-center rounded-md bg-accent text-base font-semibold text-white hover:bg-accent-hover"
            >
              Join Waitlist
            </Link>
            <ul className="mt-2 text-lg font-medium text-ink">
              <li className="border-b border-line">
                <Link
                  href={home.href}
                  onClick={closeAll}
                  aria-current={pathname === "/" ? "page" : undefined}
                  className="flex min-h-14 items-center aria-[current=page]:text-accent"
                >
                  {home.label}
                </Link>
              </li>
              {nav.map((item) =>
                "children" in item ? (
                  <li key={item.label} className="border-b border-line">
                    <button
                      type="button"
                      aria-expanded={group === item.label}
                      aria-controls={`m-${slug(item.label)}`}
                      onClick={() => setGroup(group === item.label ? null : item.label)}
                      className="flex min-h-14 w-full items-center justify-between text-left"
                    >
                      <span className={groupActive(pathname, item) ? "text-accent" : undefined}>{item.label}</span>
                      <ChevronDownIcon
                        className={`size-5 text-subtle transition-transform duration-150 ${group === item.label ? "rotate-180" : ""}`}
                      />
                    </button>
                    {group === item.label && (
                      <ul id={`m-${slug(item.label)}`} className="pb-3">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={closeAll}
                              aria-current={pathname === c.href ? "page" : undefined}
                              className="flex min-h-12 flex-col justify-center rounded px-3 text-base hover:bg-surface aria-[current=page]:bg-accent-soft"
                            >
                              <span className="font-semibold text-ink">{c.title}</span>
                              <span className="text-sm font-normal text-subtle">{c.desc}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      className="flex min-h-14 items-center aria-[current=page]:text-accent"
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
