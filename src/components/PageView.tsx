import type { Metadata } from "next";
import type { ReactNode } from "react";
import ContactForm from "./ContactForm";
import { CheckIcon } from "./icons";
import { Block, PageData, defaultClosing, pages } from "@/content/pages";
import { CoverageDiagram, DataPathDiagram, GanttDiagram, HubDiagram, IntakeFormDiagram, LayersDiagram, QuoteDiagram } from "./Illustrations";
import { FrontDeskMock } from "./Mockups";
import Accordion from "./motion/Accordion";
import { Layout, StepKind, layouts } from "./pageLayouts";
import { Dashboard, NoShow, Receptionist, Scheduling, WaitlistCalling } from "./Sections";
import { ButtonLink, Checks, Container, Editorial, H2, Label, Lead, LinkRows, Row, Section, Steps, TwoCol, Window } from "./ui";

export function pageMetadata(slug: string): Metadata {
  const p = pages[slug];
  return { title: p.title, description: p.description };
}

const slugify = (s: string) => s.toLowerCase().replace(/\W+/g, "-").replace(/^-|-$/g, "");
const num = (i: number) => String(i + 1).padStart(2, "0");

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
type FeatureBlock = Extract<Block, { kind: "features" }>;
type StepsBlock = Extract<Block, { kind: "steps" }>;

/* ---------- features ---------- */

function FeaturesList({ b, tone }: { b: FeatureBlock; tone: Tone }) {
  return (
    <Section tone={tone} space="lg">
      <Editorial head={<SectionHead label={b.label} title={b.title} intro={b.intro} />}>
        <ol className="border-t border-line-strong">
          {b.items.map((it, i) => (
            <li key={it.title} className="grid gap-x-10 gap-y-2 border-b border-line py-7 md:grid-cols-[2.5rem_minmax(0,0.9fr)_minmax(0,1.2fr)]">
              <span className="t-num text-sm text-accent md:pt-1.5">{num(i)}</span>
              <h3 className="t-h3">{it.title}</h3>
              <p className="text-body">{it.body}</p>
            </li>
          ))}
        </ol>
      </Editorial>
    </Section>
  );
}

function FeaturesIndex({ b, tone }: { b: FeatureBlock; tone: Tone }) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHead label={b.label} title={b.title} intro={b.intro} />
        <ol className={`grid gap-x-10 gap-y-12 ${b.cols === 3 ? "md:grid-cols-3" : "sm:grid-cols-2"}`}>
          {b.items.map((it, i) => (
            <li key={it.title}>
              <span aria-hidden="true" className="t-num block text-5xl text-ghost">
                {num(i)}
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

/** Spec-sheet matrix: shared ink hairlines, every cell the same size. Reads as reference, not as marketing. */
function FeaturesMatrix({ b, tone }: { b: FeatureBlock; tone: Tone }) {
  const wide = b.items.length >= 8;
  return (
    <Section tone={tone} space="lg">
      <Container>
        <SectionHead label={b.label} title={b.title} intro={b.intro} />
        <ol className={`grid gap-px border border-ink bg-ink ${wide ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2"}`}>
          {b.items.map((it, i) => (
            <li key={it.title} className="flex flex-col bg-surface p-6">
              <span className="t-eyebrow mb-8 text-accent">{num(i)}</span>
              <h3 className="t-h3 mb-2 text-[1.125rem]">{it.title}</h3>
              <p className="text-[0.9375rem] text-body">{it.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

/** Oversized statements: the page is a few things said plainly, at a size you cannot skim past. */
function FeaturesStack({ b, tone }: { b: FeatureBlock; tone: Tone }) {
  return (
    <Section tone={tone} space="lg">
      <Container>
        <SectionHead label={b.label} title={b.title} intro={b.intro} />
        <ol>
          {b.items.map((it, i) => (
            <li key={it.title} className="grid gap-x-12 gap-y-3 border-t border-ink py-9 md:grid-cols-[4rem_minmax(0,1.15fr)_minmax(0,1fr)]">
              <span className="t-eyebrow text-accent md:pt-3">{num(i)}</span>
              <h3 className="font-display text-[clamp(1.75rem,1.2rem+1.9vw,2.75rem)] leading-[1.08] tracking-[-0.015em] text-ink">{it.title}</h3>
              <p className="text-body md:pt-2">{it.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

const featureViews = { list: FeaturesList, index: FeaturesIndex, matrix: FeaturesMatrix, stack: FeaturesStack } as const;

/* ---------- steps ---------- */

/** Zig-zag flow along a spine: one step at a time, alternating sides on wide screens. */
function StepsSpine({ b, tone }: { b: StepsBlock; tone: Tone }) {
  return (
    <Section tone={tone} space="lg">
      <Container>
        <SectionHead label={b.label} title={b.title} intro={b.intro} />
        <ol className="relative mx-auto max-w-[54rem]">
          <span aria-hidden="true" className="absolute bottom-3 left-4 top-3 w-px bg-ink md:left-1/2" />
          {b.steps.map((s, i) => (
            <li key={s.title} className="relative pb-12 pl-14 last:pb-0 md:grid md:grid-cols-2 md:gap-x-20 md:pl-0">
              <span
                aria-hidden="true"
                className="t-num absolute left-0 top-0 grid size-8 place-items-center rounded-sm border border-ink bg-surface text-sm text-ink md:left-1/2 md:-translate-x-1/2"
              >
                {i + 1}
              </span>
              <div className={i % 2 === 0 ? "md:col-start-1 md:text-right" : "md:col-start-2"}>
                <p className="t-h3 leading-8">{s.title}</p>
                <p className="mt-1 text-body">{s.sub}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

function StepsLayers({ b, tone }: { b: StepsBlock; tone: Tone }) {
  return (
    <Section tone={tone} space="lg">
      <TwoCol ratio="text">
        <SectionHead label={b.label} title={b.title} intro={b.intro} />
        <LayersDiagram steps={b.steps} />
      </TwoCol>
    </Section>
  );
}

const laneTone = ["bg-accent text-white", "bg-amber-soft text-amber", "bg-paper-2 text-subtle ring-1 ring-inset ring-line-strong"];

function StepsLanes({ b, tone }: { b: StepsBlock; tone: Tone }) {
  return (
    <Section tone={tone} space="md">
      <Editorial head={<SectionHead label={b.label} title={b.title} intro={b.intro} />}>
        <ol className="border-t border-ink">
          {b.steps.map((s, i) => (
            <li key={s.title} className="grid items-center gap-x-8 gap-y-2 border-b border-line py-6 md:grid-cols-[9rem_minmax(0,1fr)]">
              <span className={`t-eyebrow inline-flex w-fit rounded-sm px-3 py-1.5 text-xs ${laneTone[i] ?? laneTone[2]}`}>{s.title}</span>
              <p className="text-lg text-ink">{s.sub}</p>
            </li>
          ))}
        </ol>
      </Editorial>
    </Section>
  );
}

/* ---------- block dispatch ---------- */

type Ctx = { layout: Layout; feature: number; split: number };

function renderBlock(b: Block, tone: Tone, key: number, ctx: Ctx) {
  switch (b.kind) {
    case "features": {
      const n = ctx.feature++;
      const kind = ctx.layout.features?.[n] ?? (b.cols === 3 || n % 2 === 1 ? "index" : "list");
      const View = featureViews[kind];
      return <View key={key} b={b} tone={tone} />;
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

    case "steps": {
      const kind: StepKind = ctx.layout.steps ?? "timeline";
      if (kind === "spine") return <StepsSpine key={key} b={b} tone={tone} />;
      if (kind === "layers") return <StepsLayers key={key} b={b} tone={tone} />;
      if (kind === "lanes") return <StepsLanes key={key} b={b} tone={tone} />;
      return (
        <Section key={key} tone={tone} space="sm">
          <Container>
            <SectionHead label={b.label} title={b.title} intro={b.intro} />
            <Steps steps={b.steps} />
          </Container>
        </Section>
      );
    }

    case "metrics":
      return (
        <Section key={key} tone={tone} space="lg">
          <Container>
            <SectionHead label={b.label} title={b.title} intro={b.intro} />
            <dl className="grid border-y border-ink sm:grid-cols-2 lg:grid-cols-4">
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
                  {num(b.items.length - 1)}
                </p>
                <p className="t-eyebrow mt-3 text-accent">{b.title ?? "Questions"}</p>
              </div>
            }
          >
            <Accordion items={b.items.map((f, i) => ({ id: String(i), title: f.q, content: f.a }))} />
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
              <Lead>A few details are enough to start. We&apos;ll follow up with questions only if we need them.</Lead>
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
            <div className="rounded-md border border-ink bg-surface p-6 shadow-window sm:p-8">
              <h2 className="t-h3">Request information</h2>
              <ContactForm />
            </div>
          </Container>
        </Section>
      );
  }
}

/* ---------- hero ---------- */

const firstOf = <K extends Block["kind"]>(page: PageData, kind: K) => page.blocks.find((b): b is Extract<Block, { kind: K }> => b.kind === kind);

/** The illustration for a page's hero, built from that page's own content. Null if the data it needs is missing. */
function visualFor(layout: Layout, page: PageData): ReactNode {
  const features = firstOf(page, "features");
  const steps = firstOf(page, "steps");
  const split = firstOf(page, "split");
  switch (layout.visual) {
    case "frontdesk":
      return <FrontDeskMock />;
    case "intake":
      return split ? <IntakeFormDiagram rows={split.rows} /> : null;
    case "coverage":
      return steps ? <CoverageDiagram steps={steps.steps} /> : null;
    case "datapath":
      return features ? <DataPathDiagram items={features.items} /> : null;
    case "hub":
      return features ? <HubDiagram items={features.items} /> : null;
    case "gantt": {
      const timeline = page.blocks.find((b): b is Extract<Block, { kind: "split" }> => b.kind === "split" && b.rows.some(([, v]) => /week/i.test(v)));
      return timeline ? <GanttDiagram rows={timeline.rows} /> : null;
    }
    case "quote":
      return features ? <QuoteDiagram items={features.items} /> : null;
    default:
      return null;
  }
}

function Notice({ text }: { text: string }) {
  return (
    <p role="note" className="mt-8 max-w-[62ch] border-l-2 border-amber bg-amber-soft px-4 py-3 text-sm text-ink">
      <strong className="font-semibold">Template note: </strong>
      {text}
    </p>
  );
}

function PageHero({ page, layout }: { page: PageData; layout: Layout }) {
  const visual = layout.hero === "visual" ? visualFor(layout, page) : null;

  if (visual) {
    return (
      <section className="overflow-x-clip border-b border-line pb-16 pt-12 md:pb-24 md:pt-20">
        <Container className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
          <div>
            <p className="t-eyebrow mb-7 text-accent">{page.label}</p>
            <h1 className="t-title">{page.h1}</h1>
            <p className="t-lead mt-7 max-w-[42ch] text-body">{page.lead}</p>
            {page.notice && <Notice text={page.notice} />}
          </div>
          <div className="lg:-mr-8 xl:-mr-16">{visual}</div>
        </Container>
      </section>
    );
  }

  if (layout.hero === "statement") {
    return (
      <section className="border-b border-line pb-16 pt-12 md:pb-24 md:pt-16">
        <Container>
          <div className="border-t-2 border-ink pt-6">
            <p className="t-eyebrow text-accent">{page.label}</p>
            <h1 className="t-display mt-8 max-w-[17ch]">{page.h1}</h1>
          </div>
          <div className="mt-12 grid items-start gap-x-16 gap-y-6 lg:grid-cols-2">
            <p className="t-lead max-w-[40ch] text-body">{page.lead}</p>
            {page.notice && <Notice text={page.notice} />}
          </div>
        </Container>
      </section>
    );
  }

  if (layout.hero === "compact") {
    return (
      <section className="border-b border-line pb-10 pt-12 md:pb-14 md:pt-16">
        <Container>
          <div className="grid items-end gap-x-16 gap-y-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div>
              <p className="t-eyebrow mb-5 text-accent">{page.label}</p>
              <h1 className="t-title-sm">{page.h1}</h1>
            </div>
            <p className="t-lead max-w-[38ch] text-body">{page.lead}</p>
          </div>
          {page.notice && <Notice text={page.notice} />}
        </Container>
      </section>
    );
  }

  return (
    <section className="border-b border-line pb-16 pt-14 md:pb-24 md:pt-24">
      <Container>
        <p className="t-eyebrow mb-7 text-accent">{page.label}</p>
        <div className="grid items-end gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <h1 className="t-title">{page.h1}</h1>
          <p className="t-lead max-w-[36ch] text-body lg:border-l lg:border-line-strong lg:pl-8">{page.lead}</p>
        </div>
        {page.notice && <Notice text={page.notice} />}
      </Container>
    </section>
  );
}

export default function PageView({ slug }: { slug: string }) {
  const page = pages[slug];
  const layout = layouts[slug] ?? { hero: "split" as const };
  const closing = "closing" in page ? page.closing : defaultClosing;
  const ctx: Ctx = { layout, feature: 0, split: 0 };

  return (
    <>
      <PageHero page={page} layout={layout} />

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
