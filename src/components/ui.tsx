import type { ReactNode } from "react";
import { ArrowRightIcon, CheckIcon } from "./icons";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1120px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Numbered section label: gives the page an editorial index without boxes. */
export function Label({ n, children, dark = false }: { n: string; children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`mb-5 flex items-center gap-3 text-sm font-semibold ${dark ? "text-accent-bright" : "text-accent"}`}
    >
      <span className="tnum">{n}</span>
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function H2({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <h2
      className={`mb-5 max-w-[22ch] text-[clamp(1.75rem,3.6vw,2.6rem)] font-semibold leading-[1.12] tracking-tight ${dark ? "!text-white" : ""}`}
    >
      {children}
    </h2>
  );
}

export function Lead({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`max-w-[58ch] text-lg leading-relaxed ${dark ? "text-white/80" : "text-body"}`}>{children}</p>
  );
}

export function Body({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={`max-w-[58ch] ${dark ? "text-white/80" : "text-body"}`}>{children}</p>;
}

/** Page section with generous, consistent vertical rhythm. */
export function Section({
  id,
  tone = "plain",
  children,
}: {
  id?: string;
  tone?: "plain" | "tint" | "ink";
  children: ReactNode;
}) {
  const tones = {
    plain: "bg-paper",
    tint: "bg-surface border-y border-line",
    ink: "bg-ink text-white",
  } as const;
  return (
    <section id={id} className={`py-20 md:py-28 ${tones[tone]}`}>
      {children}
    </section>
  );
}

/** Two-column row; `flip` puts the visual first on desktop. */
export function TwoCol({ children, flip = false }: { children: ReactNode; flip?: boolean }) {
  return (
    <Container
      className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}
    >
      {children}
    </Container>
  );
}

export function Checks({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-6 space-y-2.5">
      {items.map((t) => (
        <li key={t} className={`flex items-start gap-3 ${dark ? "text-white" : "text-ink"}`}>
          <CheckIcon
            className={`mt-[3px] size-5 shrink-0 ${dark ? "text-accent-bright" : "text-accent"}`}
          />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

export type Step = { title: string; sub?: string };

/**
 * Numbered process. `row` is a horizontal rule-topped sequence (stacks on
 * small screens); `column` is a vertical timeline.
 */
export function Steps({
  steps,
  label,
  dark = false,
  layout = "row",
}: {
  steps: Step[];
  label?: string;
  dark?: boolean;
  layout?: "row" | "column";
}) {
  const num = dark ? "text-accent-bright" : "text-accent";
  const title = dark ? "text-white" : "text-ink";
  const sub = dark ? "text-white/70" : "text-subtle";

  return (
    <div>
      {label && (
        <p className={`mb-5 text-sm font-semibold ${dark ? "text-white/70" : "text-subtle"}`}>{label}</p>
      )}
      {layout === "row" ? (
        <ol
          style={{ "--n": steps.length } as React.CSSProperties}
          className="grid gap-x-8 gap-y-6 sm:grid-cols-2 md:grid-cols-[repeat(var(--n),minmax(0,1fr))]"
        >
          {steps.map((s, i) => (
            <li key={s.title} className={`border-t-2 pt-4 ${dark ? "border-white/25" : "border-line-strong"}`}>
              <span className={`tnum text-sm font-semibold ${num}`}>{String(i + 1).padStart(2, "0")}</span>
              <p className={`mt-1 font-display text-lg font-semibold ${title}`}>{s.title}</p>
              {s.sub && <p className={`text-sm ${sub}`}>{s.sub}</p>}
            </li>
          ))}
        </ol>
      ) : (
        <ol>
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`relative pb-8 pl-14 last:pb-0 before:absolute before:left-[1.1875rem] before:top-10 before:bottom-1 before:w-px last:before:hidden ${dark ? "before:bg-white/20" : "before:bg-line-strong"}`}
            >
              <span
                className={`tnum absolute left-0 top-0 grid size-10 place-items-center rounded-full border text-sm font-semibold ${dark ? "border-white/30 text-accent-bright" : "border-line-strong text-accent"}`}
              >
                {i + 1}
              </span>
              <p className={`pt-1.5 font-display text-lg font-semibold ${title}`}>{s.title}</p>
              {s.sub && <p className={`text-sm ${sub}`}>{s.sub}</p>}
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

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
    <figure
      className={`overflow-hidden rounded-xl border border-line bg-surface text-ink shadow-window ${className}`}
    >
      <figcaption className="flex items-center justify-between gap-4 border-b border-line bg-paper px-5 py-3.5 text-sm">
        <span className="font-semibold text-ink">{title}</span>
        <span className="text-xs font-medium text-subtle">{tag}</span>
      </figcaption>
      {children}
    </figure>
  );
}

export function Row({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-line py-3.5 text-[0.95rem] last:border-0">
      <dt className="text-subtle">{k}</dt>
      <dd className="text-right font-medium text-ink">{v}</dd>
    </div>
  );
}

const chipTones = {
  ok: "bg-ok-soft text-ok",
  amber: "bg-amber-soft text-amber",
  neutral: "bg-paper text-subtle ring-1 ring-inset ring-line",
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
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ${chipTones[tone]}`}
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
      : "border border-line-strong bg-surface text-ink hover:border-ink";
  return (
    <a
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-lg px-6 text-base font-semibold transition-colors duration-150 ${v}`}
    >
      {children}
      {arrow && <ArrowRightIcon className="size-4" />}
    </a>
  );
}

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="mt-8 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-current"
    >
      {children}
      <ArrowRightIcon className="size-4" />
    </a>
  );
}
