import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { demoHref } from "@/content/site";
import { ArrowRightIcon, ChevronDownIcon } from "./icons";
import { Block, defaultClosing, pages } from "@/content/pages";
import { Dashboard, NoShow, Receptionist, Scheduling, WaitlistCalling } from "./Sections";
import { ButtonLink, Checks, Container, H2, Label, Lead, Row, Section, Steps, TwoCol, Window } from "./ui";

export function pageMetadata(slug: string): Metadata {
  const p = pages[slug];
  return { title: p.title, description: p.description };
}

function SectionHead({ label, title, intro }: { label?: string; title: string; intro?: string }) {
  return (
    <div className="mb-12">
      {label && <Label>{label}</Label>}
      <H2>{title}</H2>
      {intro && <Lead>{intro}</Lead>}
    </div>
  );
}

function renderBlock(b: Block, tone: "plain" | "tint", key: number) {
  switch (b.kind) {
    case "features":
      return (
        <Section key={key} tone={tone}>
          <Container>
            <SectionHead label={b.label} title={b.title} intro={b.intro} />
            <ul
              className={`grid gap-x-12 gap-y-10 ${b.cols === 3 ? "md:grid-cols-3" : "sm:grid-cols-2"}`}
            >
              {b.items.map((it) => (
                <li key={it.title} className="border-t-2 border-line-strong pt-5">
                  <h3 className="mb-2 text-lg font-semibold">{it.title}</h3>
                  <p className="text-[0.95rem] text-body">{it.body}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      );

    case "split":
      return (
        <Section key={key} tone={tone}>
          <TwoCol flip={b.flip}>
            <div>
              {b.label && <Label>{b.label}</Label>}
              <H2>{b.title}</H2>
              <Lead>{b.body}</Lead>
              {b.checks && <Checks items={b.checks} />}
            </div>
            <Window title={b.panelTitle} tag={b.panelTag ?? "Sample data"}>
              <dl className="px-5 py-2">
                {b.rows.map(([k, v]) => (
                  <Row key={k} k={k} v={v} />
                ))}
              </dl>
            </Window>
          </TwoCol>
        </Section>
      );

    case "steps":
      return (
        <Section key={key} tone={tone}>
          <Container>
            <SectionHead label={b.label} title={b.title} intro={b.intro} />
            <Steps steps={b.steps} />
          </Container>
        </Section>
      );

    case "metrics":
      return (
        <Section key={key} tone={tone}>
          <Container>
            <SectionHead label={b.label} title={b.title} intro={b.intro} />
            <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {b.items.map((m) => (
                <div key={m.label} className="border-t-2 border-line-strong pt-5">
                  <dd className="tnum font-display text-4xl font-semibold text-ink">{m.value}</dd>
                  <dt className="mt-1 text-[0.95rem] text-body">{m.label}</dt>
                </div>
              ))}
            </dl>
            {b.note && <p className="mt-8 text-sm text-subtle">{b.note}</p>}
          </Container>
        </Section>
      );

    case "faq":
      return (
        <Section key={key} tone={tone}>
          <Container className="max-w-[860px]">
            {b.title && <H2>{b.title}</H2>}
            <div className="border-t border-line">
              {b.items.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex min-h-14 list-none items-center justify-between gap-6 py-3 font-display text-lg font-semibold text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDownIcon className="size-5 shrink-0 text-subtle transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="max-w-[62ch] pb-5 text-body">{f.a}</p>
                </details>
              ))}
            </div>
          </Container>
        </Section>
      );

    case "links":
      return (
        <Section key={key} tone={tone}>
          <Container>
            <SectionHead label={b.label} title={b.title} intro={b.intro} />
            <ul className="grid gap-x-10 gap-y-8 md:grid-cols-3">
              {b.items.map((l) => (
                <li key={l.href} className="border-t-2 border-line-strong">
                  <Link href={l.href} className="group block py-5">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold group-hover:text-accent">
                      {l.title}
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                    </h3>
                    <p className="text-[0.95rem] text-body">{l.body}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      );

    case "prose":
      return (
        <Section key={key} tone={tone}>
          <Container className="max-w-[760px]">
            {b.sections.map((s) => (
              <div key={s.h} className="mb-10 last:mb-0">
                <h2 className="mb-3 text-2xl font-semibold">{s.h}</h2>
                {s.p.map((t) => (
                  <p key={t} className="text-body">
                    {t}
                  </p>
                ))}
              </div>
            ))}
          </Container>
        </Section>
      );

    case "component": {
      if (b.name === "WaitlistCalling") return <WaitlistCalling key={key} />;
      const C = { Receptionist, Scheduling, NoShow, Dashboard }[b.name];
      return <C key={key} tone={tone} />;
    }

    case "contact":
      return (
        <Section key={key} tone={tone}>
          <TwoCol>
            <div>
              <Label>Schedule a consultation</Label>
              <H2>Tell us about your clinic</H2>
              <Lead>
                A few details are enough to start. We&apos;ll follow up with questions only if we need them.
              </Lead>

            </div>
            <div className="rounded-xl border border-line bg-surface p-6 shadow-window sm:p-8">
              <h2 className="font-display text-xl font-semibold">Request information</h2>
              <ContactForm />
            </div>
          </TwoCol>
        </Section>
      );
  }
}

export default function PageView({ slug }: { slug: string }) {
  const page = pages[slug];
  const closing = "closing" in page ? page.closing : defaultClosing;

  return (
    <>
      <section className="inner-hero border-b border-line pb-16 pt-14 md:pb-20 md:pt-20">
        <Container>
          <Link href="/" className="breadcrumb">Home / AutoMSP AI Front Desk</Link>
          <p className="mb-6 text-sm font-semibold text-accent">{page.label}</p>
          <h1 className="max-w-[24ch] text-[clamp(2.1rem,4.8vw,3.4rem)] font-semibold leading-[1.08] tracking-tight">
            {page.h1}
          </h1>
          <div className="mt-6">
            <Lead>{page.lead}</Lead>
          </div>
          {page.notice && (
            <p
              role="note"
              className="mt-8 max-w-[62ch] border-l-2 border-amber bg-amber-soft px-4 py-3 text-sm text-ink"
            >
              <strong className="font-semibold">Please note: </strong>
              {page.notice}
            </p>
          )}
        </Container>
      </section>

      {page.blocks.map((b, i) => renderBlock(b, i % 2 === 0 ? "plain" : "tint", i))}

      {closing && (
        <Section tone="ink">
          <Container>
            <h2 className="mb-4 max-w-[26ch] font-display text-[clamp(1.75rem,3.6vw,2.6rem)] font-semibold leading-[1.12] tracking-tight !text-white">
              {closing.title}
            </h2>
            <p className="mb-8 max-w-[58ch] text-lg text-white/80">{closing.body}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={closing.primary.href === "/contact" ? demoHref : closing.primary.href} arrow>
                {closing.primary.href === "/contact" ? "Book a demo" : closing.primary.label}
              </ButtonLink>
              {closing.secondary && (
                <ButtonLink href={closing.secondary.href} variant="secondary">
                  {closing.secondary.label}
                </ButtonLink>
              )}
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
