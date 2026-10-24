import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon, CheckIcon } from "./icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Small uppercase section label with an optional index number. */
export function Label({ n, children, dark = false }: { n?: string; children: ReactNode; dark?: boolean }) {
  return (
    <p className={`t-eyebrow mb-5 flex items-center gap-3 ${dark ? "text-accent-bright" : "text-accent"}`}>
      {n && <span className="tnum">{n}</span>}
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function H2({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <h2 className={`t-h2 mb-6 max-w-[20ch] ${dark ? "!text-white" : ""}`}>{children}</h2>;
}

export function Lead({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`t-lead max-w-[56ch] ${dark ? "text-white/85" : "text-body"}`}>{children}</p>;
}

export function Body({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`max-w-[58ch] ${dark ? "text-white/85" : "text-body"}`}>{children}</p>;
}

/**
 * Page section. `space` varies the vertical rhythm on purpose: dense sections
 * (process strips, link lists) sit closer than showpiece sections.
 */
export function Section({
  id,
  tone = "plain",
  space = "md",
  children,
}: {
  id?: string;
  tone?: "plain" | "tint" | "ink";
  space?: "sm" | "md" | "lg";
  children: ReactNode;
}) {
  const tones = {
    plain: "bg-paper",
    tint: "bg-paper-2",
    ink: "on-ink bg-ink text-white",
  } as const;
  const spaces = {
    sm: "py-14 md:py-20",
    md: "py-20 md:py-28",
    lg: "py-24 md:py-36",
  } as const;
  return (
    <section id={id} className={`${spaces[space]} ${tones[tone]}`}>
      {children}
    </section>
  );
}

/** Two-column row; `flip` puts the visual first on desktop. `ratio` skews the columns. */
export function TwoCol({
  children,
  flip = false,
  ratio = "even",
}: {
  children: ReactNode;
  flip?: boolean;
  ratio?: "even" | "text" | "visual";
}) {
  const cols = {
    even: "lg:grid-cols-2",
    text: "lg:grid-cols-[1fr_1.1fr]",
    visual: "lg:grid-cols-[0.9fr_1.2fr]",
  } as const;
  return (
    <Container
      className={`grid items-center gap-12 lg:gap-20 ${cols[ratio]} ${flip ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      {children}
    </Container>
  );
}

/** Editorial row: a sticky heading column on the left, the content on the right. */
export function Editorial({ head, children }: { head: ReactNode; children: ReactNode }) {
  return (
    <Container className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]">
      <div className="lg:sticky lg:top-28 lg:self-start">{head}</div>
      <div>{children}</div>
    </Container>
  );
}

export function Checks({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-8 space-y-3">
      {items.map((t) => (
        <li key={t} className={`flex items-start gap-3 ${dark ? "text-white" : "text-ink"}`}>
          <CheckIcon className={`mt-[3px] size-5 shrink-0 ${dark ? "text-accent-bright" : "text-accent"}`} />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export { default as Steps, type Step } from "./motion/Steps";

/** Product mock-up frame. Always labelled so nobody mistakes it for real data. */
export function Window({
  title,
  tag = "Sample data",
  children,
  className = "",
}: {
  title: string;
  tag?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-md border border-ink bg-surface text-ink shadow-window ${className}`}>
      <figcaption className="flex items-center justify-between gap-4 bg-ink px-5 py-3 text-sm">
        <span className="font-semibold text-white">{title}</span>
        <span className="t-eyebrow rounded-sm border border-white/35 px-2 py-0.5 text-[0.6875rem] text-white/85">{tag}</span>
      </figcaption>
      {children}
    </figure>
  );
}

export function Row({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line py-4 text-base last:border-0">
      <dt className="text-subtle">{k}</dt>
      <dd className="text-right font-medium text-ink">{v}</dd>
    </div>
  );
}

const chipTones = {
  ok: "bg-ok-soft text-ok",
  amber: "bg-amber-soft text-amber",
  neutral: "bg-paper-2 text-subtle ring-1 ring-inset ring-line-strong",
} as const;

/** Status chip. Always carries a text label, so colour is never the only signal. */
export function Chip({
  tone = "neutral",
  children,
  check = false,
}: {
  tone?: keyof typeof chipTones;
  children: ReactNode;
  check?: boolean;
}) {
  return (
    <span
      className={`t-eyebrow inline-flex items-center gap-1 whitespace-nowrap rounded-sm px-2 py-0.5 text-[0.6875rem] tracking-[0.06em] ${chipTones[tone]}`}
    >
      {check && <CheckIcon className="size-3.5" strokeWidth={2.5} />}
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  arrow = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  arrow?: boolean;
}) {
  const v =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-hover"
      : "border border-ink bg-transparent text-ink hover:bg-ink hover:text-white";
  const Cmp = href.startsWith("/") ? Link : "a";
  return (
    <Cmp
      href={href}
      className={`group inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-6 text-base font-semibold transition-colors duration-150 active:translate-y-px ${v}`}
    >
      {children}
      {arrow && <ArrowRightIcon className="size-4 transition-transform duration-150 group-hover:translate-x-0.5" />}
    </Cmp>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  const Cmp = href.startsWith("/") ? Link : "a";
  return (
    <Cmp
      href={href}
      className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-current"
    >
      {children}
      <ArrowRightIcon className="size-4" />
    </Cmp>
  );
}

/** One full-width linked row per destination: title, description, arrow. */
export function LinkRows({ items }: { items: readonly { href: string; title: string; body: string }[] }) {
  return (
    <ul className="border-t border-line-strong">
      {items.map(({ href, title, body }) => (
        <li key={href} className="border-b border-line">
          <Link
            href={href}
            className="group grid min-h-24 grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 py-5 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_auto]"
          >
            <span className="t-h3 transition-colors group-hover:text-accent">{title}</span>
            <span className="order-3 col-span-2 text-base text-body md:order-none md:col-span-1">{body}</span>
            <span
              aria-hidden="true"
              className="row-start-1 grid size-11 place-items-center rounded-full border border-line-strong text-ink transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-white md:row-start-auto"
            >
              <ArrowRightIcon className="size-4" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
