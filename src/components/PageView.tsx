import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { CheckIcon, ChevronDownIcon } from "./icons";
import { Block, defaultClosing, pages } from "@/content/pages";
import { Dashboard, NoShow, Receptionist, Scheduling, WaitlistCalling } from "./Sections";
import { ButtonLink, Checks, Container, Editorial, H2, Label, Lead, LinkRows, Row, Section, Steps, TwoCol, Window } from "./ui";

export function pageMetadata(slug: string): Metadata {
  const p = pages[slug];
  return { title: p.title, description: p.description };
}

const slugify = (s: string) => s.toLowerCase().replace(/\W+/g, "-").replace(/^-|-$/g, "");

/** Heading block shared by the stacked layouts. */
function SectionHead({ label, title, intro }: { label?: string; title: string; intro?: string }) {
  return (
    <div className="mb-14 max-w-[44rem]">
      {label && <Label>{label}</Label>}
      <H2>{title}</H2>
      {intro && <Lead>{intro}</Lead>}
    </div>
  );
}

type Tone = "plain" | "tint";

/**
 * `ctx.feature` counts feature blocks seen so far on the page, so consecutive
 * feature sections alternate between a ruled list and an indexed grid instead
 * of repeating one layout.
 */
function renderBlock(b: Block, tone: Tone, key: number, ctx: { feature: number; split: number }) {
  switch (b.kind) {
    case "features": {
      const n = ctx.feature++;
      const indexed = b.cols === 3 || n % 2 === 1;
      if (!indexed) {
        return (
          <Section key={key} tone={tone} space="lg">
            <Editorial head={<SectionHead label={b.label} title={b.title} intro={b.intro} />}>
              <ol className="border-t border-line-strong">
                {b.items.map((it, i) => (
                  <li key={it.title} className="grid gap-x-10 gap-y-2 border-b border-line py-7 md:grid-cols-[2.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)]">
                    <span className="t-num text-sm text-accent md:pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="t-h3">{it.title}</h3>
                    <p className="text-body">{it.body}</p>
                  </li>
                ))}
              </ol>
            </Editorial>
          </Section>
        );
      }
      return (
        <Section key={key} tone={tone}>
          <Container>
            <SectionHead label={b.label} title={b.title} intro={b.intro} />
            <ol className={`grid gap-x-10 gap-y-12 ${b.cols === 3 ? "md:grid-cols-3" : "sm:grid-cols-2"}`}>
              {b.items.map((it, i) => (
                <li key={it.title}>
                  <span aria-hidden="true" className="t-num block text-5xl text-ghost">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="t-h3 mb-2 mt-4 border-t-2 border-ink pt-4">{it.title}</h3>
                  <p className="text-body">{it.body}</p>
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      );
    }

    case "split": {
      const n = ctx.split++;
      return (
        <Section key={key} tone={tone}>
          <TwoCol flip={b.flip} ratio={n % 2 === 0 ? "text" : "visual"}>
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
    }

    case "steps":
      return (
        <Section key={key} tone={tone} space="sm">
          <Container>
            <SectionHead label={b.label} title={b.title} intro={b.intro} />
            <Steps steps={b.steps} />
          </Container>
        </Section>
      );

    case "metrics":
      return (
        <Section key={key} tone={tone} space="lg">
          <Container>
            <SectionHead label={b.label} title={b.title} intro={b.intro} />
            <dl className="grid border-y border-line-strong sm:grid-cols-2 lg:grid-cols-4">
              {b.items.map((m, i) => (
                <div
                  key={m.label}
                  className={`px-0 py-8 sm:px-6 sm:first:pl-0 ${i > 0 ? "border-t border-line sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-line" : ""} ${i >= 2 ? "sm:border-t sm:border-line lg:border-t-0" : ""} ${i > 0 ? "lg:border-l lg:border-line" : ""}`}
                >
                  <dd className="t-num text-[clamp(2.75rem,2rem+3vw,4.5rem)] leading-none text-ink">{m.value}</dd>
                  <dt className="mt-3 text-base text-body">{m.label}</dt>
                </div>
              ))}
            </dl>
            {b.note && <p className="mt-6 text-sm text-subtle">{b.note}</p>}
          </Container>
        </Section>
      );

    case "faq":
      return (
        <Section key={key} tone={tone} space="lg">
          <Editorial
            head={
              <div>
                <p className="t-num text-[clamp(4rem,3rem+4vw,6.5rem)] leading-none text-ghost" aria-hidden="true">
                  {String(b.items.length).padStart(2, "0")}
                </p>
                <p className="t-eyebrow mt-3 text-accent">{b.title ?? "Questions"}</p>
              </div>
            }
          >
            <div className="border-t border-line-strong">
              {b.items.map((f) => (
                <details key={f.q} className="group border-b border-line">
                  <summary className="flex min-h-16 list-none items-center justify-between gap-6 py-4 font-display text-xl font-semibold leading-snug text-ink [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <ChevronDownIcon className="size-6 shrink-0 text-subtle transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <p className="max-w-[60ch] pb-6 text-body">{f.a}</p>
                </details>
              ))}
            </div>
          </Editorial>
        </Section>
      );

    case "links":
      return (
        <Section key={key} tone={tone}>
          <Editorial head={<SectionHead label={b.label} title={b.title} intro={b.intro} />}>
            <LinkRows items={b.items} />
          </Editorial>
        </Section>
      );

    case "prose":
      return (
        <Section key={key} tone={tone} space="lg">
          <Editorial
            head={
              <nav aria-label="On this page">
                <p className="t-eyebrow mb-3 text-subtle">On this page</p>
                <ol>
                  {b.sections.map((s) => (
                    <li key={s.h}>
                      <a href={`#${slugify(s.h)}`} className="flex min-h-11 items-center text-base text-body hover:text-accent">
                        {s.h}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            }
          >
            <div className="max-w-[44rem]">
              {b.sections.map((s) => (
                <div key={s.h} id={slugify(s.h)} className="mb-12 border-t border-line pt-6 last:mb-0">
                  <h2 className="t-h3 mb-3 text-2xl">{s.h}</h2>
                  {s.p.map((t) => (
                    <p key={t} className="text-body">
                      {t}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </Editorial>
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
          <Container className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <Label>Schedule a consultation</Label>
              <H2>Tell us about your clinic</H2>
              <Lead>
                A few details are enough to start. We&apos;ll follow up with questions only if we need them.
              </Lead>
              <dl className="mt-10 divide-y divide-line border-y border-line text-base">
                <div className="flex flex-wrap justify-between gap-x-6 py-4">
                  <dt className="font-semibold text-ink">Email</dt>
                  <dd className="text-body">hello@yourbrand.example</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-x-6 py-4">
                  <dt className="font-semibold text-ink">Phone</dt>
                  <dd className="tnum text-body">+1 555 0100</dd>
                </div>
                <div className="flex flex-wrap justify-between gap-x-6 py-4">
                  <dt className="font-semibold text-ink">Hours</dt>
                  <dd className="text-body">Monday to Friday, 9:00 AM to 6:00 PM</dd>
                </div>
              </dl>
              <p className="mt-6 flex items-start gap-2 text-sm text-subtle">
                <CheckIcon className="mt-0.5 size-4 shrink-0" />
                Placeholder contact details. Replace them before launch.
              </p>
            </div>
            <div className="rounded-xl border border-line bg-surface p-6 shadow-window sm:p-8">
              <h2 className="t-h3">Request information</h2>
              <ContactForm />
            </div>
          </Container>
        </Section>
      );
  }
}

export default function PageView({ slug }: { slug: string }) {
  const page = pages[slug];
  const closing = "closing" in page ? page.closing : defaultClosing;
  const ctx = { feature: 0, split: 0 };

  return (
    <>
      <section className="border-b border-line pb-16 pt-14 md:pb-24 md:pt-24">
        <Container>
          <p className="t-eyebrow mb-7 text-accent">{page.label}</p>
          <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <h1 className="t-title">{page.h1}</h1>
            <p className="t-lead max-w-[36ch] text-body lg:border-l lg:border-line-strong lg:pl-8">{page.lead}</p>
          </div>
          {page.notice && (
            <p role="note" className="mt-10 max-w-[62ch] border-l-2 border-amber bg-amber-soft px-4 py-3 text-sm text-ink">
              <strong className="font-semibold">Template note: </strong>
              {page.notice}
            </p>
          )}
        </Container>
      </section>

      {page.blocks.map((b, i) => renderBlock(b, i % 2 === 0 ? "plain" : "tint", i, ctx))}

      {closing && (
        <Section tone="ink" space="lg">
          <Container className="grid items-end gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div>
              <h2 className="t-h2 mb-5 max-w-[18ch] !text-white">{closing.title}</h2>
              <p className="t-lead max-w-[46ch] text-white/85">{closing.body}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <ButtonLink href={closing.primary.href} arrow>
                {closing.primary.label}
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
