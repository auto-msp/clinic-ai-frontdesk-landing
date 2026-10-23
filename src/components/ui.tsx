import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1160px] px-5 ${className}`}>{children}</div>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3.5 inline-block text-xs font-bold uppercase tracking-[0.14em] text-accent">
      {children}
    </span>
  );
}

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-4 text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold leading-[1.15] tracking-tight text-inherit">
      {children}
    </h2>
  );
}

/** Full-width band with consistent vertical rhythm. */
export function Band({
  id,
  tone = "plain",
  children,
}: {
  id?: string;
  tone?: "plain" | "alt" | "dark";
  children: ReactNode;
}) {
  const tones = {
    plain: "bg-white text-primary",
    alt: "bg-surface text-primary",
    dark: "bg-primary text-white",
  } as const;
  return (
    <section id={id} className={`py-16 md:py-[84px] ${tones[tone]}`}>
      {children}
    </section>
  );
}

/** Two-column row; `flip` puts the visual first on desktop. */
export function TwoCol({ children, flip = false }: { children: ReactNode; flip?: boolean }) {
  return (
    <Container className={`grid items-center gap-8 md:grid-cols-2 md:gap-14 ${flip ? "md:[&>*:first-child]:order-2" : ""}`}>
      {children}
    </Container>
  );
}

export function Checks({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <ul className="mt-4">
      {items.map((t) => (
        <li
          key={t}
          className={`relative py-1.5 pl-8 ${dark ? "text-[#e8eef6]" : "text-ink"}`}
        >
          <span
            aria-hidden
            className={`absolute left-0 top-2 grid size-5 place-items-center rounded-full text-[0.7rem] font-extrabold text-accent ${dark ? "bg-accent/20" : "bg-sky"}`}
          >
            ✓
          </span>
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Body({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <p className={dark ? "text-[#c7d4e4]" : "text-body"}>{children}</p>;
}

export type Step = { title: string; sub?: string };

export function FlowDiagram({ steps, label }: { steps: Step[]; label?: string }) {
  return (
    <div>
      {label && (
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-body">{label}</p>
      )}
      <ol className="flex flex-wrap gap-y-2">
        {steps.map((s, i) => (
          <li
            key={s.title}
            className="relative m-1.5 min-w-[130px] flex-1 rounded-lg border border-line bg-white px-3.5 py-4 text-center"
          >
            <b className="block text-sm text-primary">{s.title}</b>
            {s.sub && <span className="text-xs text-body">{s.sub}</span>}
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className="absolute -right-[18px] top-1/2 z-10 hidden -translate-y-1/2 font-extrabold text-accent md:block"
              >
                →
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Window-style card used for the product mock-ups. */
export function MockCard({
  title,
  badge,
  children,
  className = "",
}: {
  title: string;
  badge?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-[14px] border border-line bg-white text-ink shadow-card ${className}`}>
      <div className="flex justify-between bg-primary px-[18px] py-3 text-[0.8rem] font-semibold tracking-wider text-white">
        <span>{title}</span>
        {badge}
      </div>
      {children}
    </div>
  );
}

export function Row({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="flex justify-between border-b border-dashed border-line py-2.5 text-sm last:border-0">
      <span className="text-body">{k}</span>
      <span className="font-semibold text-primary">{v}</span>
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-ok-bg px-2.5 py-0.5 text-xs font-bold text-ok">
      {children}
    </span>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
}) {
  const v =
    variant === "primary"
      ? "bg-accent text-white hover:brightness-90"
      : "border-primary text-primary hover:bg-primary hover:text-white";
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-lg border-[1.5px] border-transparent px-6 py-3 text-[0.95rem] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${v}`}
    >
      {children}
    </a>
  );
}
