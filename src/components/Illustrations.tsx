import type { ReactNode } from "react";
import { CheckIcon, LockIcon } from "./icons";
import { Chip, Window } from "./ui";

/**
 * Topic illustrations, drawn in code from each page's own content so the labels
 * can never drift from the copy. All of them sit in <Window>, which labels them
 * as illustrations or sample data. Connectors are decorative (aria-hidden); the
 * meaning is always in real text.
 */

type Item = { title: string; body: string };
type Step = { title: string; sub: string };

const find = (items: Item[], title: string) => items.find((i) => i.title === title)?.title;

function Down({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 28" aria-hidden="true" focusable="false" className={`h-7 w-3 ${className}`}>
      <path d="M6 0v24M1.5 19 6 25l4.5-6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Technology: the layers a call passes through, top to bottom. */
export function LayersDiagram({ steps }: { steps: Step[] }) {
  return (
    <Window title="System layers" tag="Illustration">
      <div className="flex flex-col items-center px-5 py-6 text-ink">
        <p className="t-eyebrow rounded-sm border border-ink px-3 py-1.5 text-[0.6875rem]">Caller</p>
        {steps.map((s, i) => (
          <div key={s.title} className="flex w-full flex-col items-center">
            <Down className="my-1 text-subtle" />
            <div className={`flex w-full items-center gap-4 rounded-md border border-ink px-4 py-3.5 ${i === steps.length - 1 ? "bg-ink text-white" : "bg-surface"}`}>
              <span className={`t-num text-2xl ${i === steps.length - 1 ? "text-accent-bright" : "text-accent"}`}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="font-display text-lg leading-tight">{s.title}</p>
                <p className={`text-sm ${i === steps.length - 1 ? "text-white/80" : "text-subtle"}`}>{s.sub}</p>
              </div>
            </div>
          </div>
        ))}
        <Down className="my-1 text-subtle" />
        <p className="t-eyebrow rounded-sm border border-ink px-3 py-1.5 text-[0.6875rem]">Your calendar and records</p>
      </div>
    </Window>
  );
}

/** Security: where patient data travels and what protects each hop. */
export function DataPathDiagram({ items }: { items: Item[] }) {
  const hops = [
    { from: "Caller", via: find(items, "Encrypted communication") },
    { from: "Assistant", via: find(items, "Protected data storage") },
    { from: "Stored data", via: find(items, "Access control") },
  ];
  const audit = find(items, "Audit visibility");
  return (
    <Window title="Data path" tag="Illustration">
      <div className="px-5 py-6">
        <ol>
          {hops.map((h, i) => (
            <li key={h.from} className="relative pb-6 pl-10 last:pb-0">
              {i < hops.length - 1 && <span aria-hidden="true" className="absolute bottom-0 left-[0.9rem] top-9 w-px bg-ink" />}
              <span aria-hidden="true" className="absolute left-0 top-0 grid size-8 place-items-center rounded-sm border border-ink bg-surface text-ink">
                <span className="t-num text-sm">{i + 1}</span>
              </span>
              <p className="font-display text-lg leading-8 text-ink">{h.from}</p>
              {h.via && (
                <p className="t-eyebrow mt-1 inline-flex items-center gap-1.5 rounded-sm bg-ok-soft px-2 py-1 text-[0.6875rem] text-ok">
                  <LockIcon className="size-3.5" strokeWidth={2.25} />
                  {h.via}
                </p>
              )}
            </li>
          ))}
        </ol>
        {audit && (
          <p className="mt-5 flex items-center justify-between gap-3 border-t border-ink pt-4 text-sm">
            <span className="font-semibold text-ink">{audit}</span>
            <span className="t-eyebrow text-[0.6875rem] text-subtle">Every step logged</span>
          </p>
        )}
      </div>
    </Window>
  );
}

/** Integrations: the assistant in the middle, each connection type around it. */
export function HubDiagram({ items }: { items: Item[] }) {
  const pos = ["left-[25%] top-[17%]", "left-[75%] top-[17%]", "left-[25%] top-[83%]", "left-[75%] top-[83%]"];
  return (
    <Window title="Connections" tag="Illustration">
      <div className="relative h-[24rem] sm:h-[26rem]">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false" className="absolute inset-0 size-full text-ink">
          {[
            [25, 17],
            [75, 17],
            [25, 83],
            [75, 83],
          ].map(([x, y]) => (
            <line key={`${x}-${y}`} x1="50" y1="50" x2={x} y2={y} stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-center font-display text-lg leading-tight text-white">
          Front
          <br />
          desk
        </div>
        {items.slice(0, 4).map((it, i) => (
          <p
            key={it.title}
            className={`absolute w-[44%] -translate-x-1/2 -translate-y-1/2 rounded-md border border-ink bg-surface px-3 py-2.5 text-center text-sm font-semibold leading-snug text-ink ${pos[i]}`}
          >
            {it.title}
          </p>
        ))}
      </div>
    </Window>
  );
}

function parseWeeks(label: string): [number, number] {
  const n = label.match(/\d+/g)?.map(Number) ?? [1];
  return [n[0], n[n.length - 1]];
}

/** Implementation: phases laid out across the weeks they run. */
export function GanttDiagram({ rows }: { rows: [string, string][] }) {
  const parsed = rows.map(([name, when]) => ({ name, when, span: parseWeeks(when) }));
  const weeks = Math.max(...parsed.map((r) => r.span[1]));
  const cols = `minmax(5.5rem,7rem) repeat(${weeks}, minmax(0,1fr))`;
  return (
    <Window title="Rollout timeline" tag="Sample">
      <div className="px-5 py-5">
        <div className="grid items-center gap-y-3" style={{ gridTemplateColumns: cols }}>
          <span />
          {Array.from({ length: weeks }, (_, i) => (
            <span key={i} className="t-eyebrow border-l border-line pl-2 text-[0.6875rem] text-subtle">
              Wk {i + 1}
            </span>
          ))}
          {parsed.map((r, i) => (
            <div key={r.name} className="contents">
              <span className="pr-3 text-sm font-semibold text-ink" style={{ gridColumn: 1, gridRow: i + 2 }}>
                {r.name}
              </span>
              <span
                className={`t-eyebrow flex h-9 items-center rounded-sm px-2.5 text-[0.6875rem] ${i === parsed.length - 1 ? "bg-accent text-white" : "bg-ink text-white"}`}
                style={{ gridColumn: `${r.span[0] + 1} / ${r.span[1] + 2}`, gridRow: i + 2 }}
              >
                <span className="sr-only">{r.when}</span>
                <span aria-hidden="true" className="hidden whitespace-nowrap sm:inline">
                  {r.when}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}

function QuoteRow({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <div className="border-b border-line px-5 py-4 last:border-0">
      <p className="t-eyebrow mb-2.5 text-[0.6875rem] text-subtle">{label}</p>
      {children}
    </div>
  );
}

/** Pricing: the four things scoped together, drawn as the inputs they would be. Not a calculator. */
export function QuoteDiagram({ items }: { items: Item[] }) {
  const [providers, volume, integrations, support] = items;
  return (
    <Window title="Scope your rollout" tag="Illustration">
      {providers && (
        <QuoteRow label={providers.title}>
          <div className="flex items-center gap-3 text-ink">
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-sm border border-ink text-lg">
              −
            </span>
            <span className="t-num text-2xl">5</span>
            <span className="text-sm text-subtle">providers</span>
            <span aria-hidden="true" className="grid size-9 place-items-center rounded-sm border border-ink text-lg">
              +
            </span>
            <span className="ml-auto text-sm text-subtle">2 locations</span>
          </div>
        </QuoteRow>
      )}
      {volume && (
        <QuoteRow label={volume.title}>
          <div aria-hidden="true" className="relative h-2 rounded-full bg-paper-2">
            <span className="absolute inset-y-0 left-0 w-3/5 rounded-full bg-ink" />
            <span className="absolute left-[60%] top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-surface" />
          </div>
          <div className="mt-2 flex justify-between text-sm text-subtle">
            <span>Inbound</span>
            <span>Outbound</span>
          </div>
        </QuoteRow>
      )}
      {integrations && (
        <QuoteRow label={integrations.title}>
          <div className="flex flex-wrap gap-2">
            {["Calendar", "Records", "Phone"].map((c) => (
              <span key={c} className="inline-flex items-center gap-1.5 rounded-sm border border-ink bg-accent-soft px-3 py-1.5 text-sm font-semibold text-ink">
                <CheckIcon className="size-4 text-accent" strokeWidth={2.5} />
                {c}
              </span>
            ))}
          </div>
        </QuoteRow>
      )}
      {support && (
        <QuoteRow label={support.title}>
          <div className="grid grid-cols-3 overflow-hidden rounded-sm border border-ink text-center text-sm font-semibold">
            {["Self-serve", "Guided", "Hands-on"].map((l, i) => (
              <span key={l} className={`px-2 py-2 ${i === 1 ? "bg-ink text-white" : "bg-surface text-ink"} ${i > 0 ? "border-l border-ink" : ""}`}>
                {l}
              </span>
            ))}
          </div>
        </QuoteRow>
      )}
      <p className="bg-paper px-5 py-3 text-sm text-subtle">Illustration of the inputs we scope together. Not a calculator, no prices.</p>
    </Window>
  );
}

/** Medical intake: the question set as the patient-facing form it fills. */
export function IntakeFormDiagram({ rows }: { rows: [string, string][] }) {
  const sample: Record<string, string> = {
    "Reason for visit": "Recurring headache, mostly mornings",
    "Current medications": "None reported",
    Allergies: "None known",
    "Preferred provider": "Dr. Example",
  };
  return (
    <Window title="New patient intake" tag="Sample data">
      <div className="space-y-4 px-5 py-5">
        {rows.map(([label, kind]) => (
          <div key={label}>
            <p className="mb-1.5 flex items-center justify-between gap-3 text-sm font-semibold text-ink">
              {label}
              <Chip tone={kind === "Required" ? "amber" : "neutral"}>{kind}</Chip>
            </p>
            <p className="rounded-sm border border-subtle bg-paper px-3 py-2.5 text-base text-ink">{sample[label] ?? "—"}</p>
          </div>
        ))}
      </div>
      <p className="flex items-center gap-3 border-t border-line bg-ok-soft px-5 py-3.5 text-base font-medium text-ok">
        <CheckIcon className="size-5 shrink-0" strokeWidth={2.25} />
        Answers delivered to your records system
      </p>
    </Window>
  );
}

/** Insurance intake: a coverage card and the steps it passes through. */
export function CoverageDiagram({ steps }: { steps: Step[] }) {
  return (
    <Window title="Coverage check" tag="Sample data">
      <div className="px-5 py-5">
        <div className="rounded-md border border-ink bg-paper-2 p-4">
          <p className="t-eyebrow text-[0.6875rem] text-subtle">Sample health plan</p>
          <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {[
              ["Member ID", "XXXX 0000"],
              ["Group", "000000"],
              ["Policy holder", "Patient A"],
              ["Copay", "$00"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-subtle">{k}</dt>
                <dd className="tnum font-semibold text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <ol className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="rounded-sm border border-line-strong bg-surface px-2.5 py-2">
              <span className="t-eyebrow flex items-center gap-1 text-[0.6875rem] text-ok">
                <CheckIcon className="size-3.5" strokeWidth={2.5} />
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="mt-0.5 block text-sm font-semibold text-ink">{s.title}</span>
            </li>
          ))}
        </ol>
      </div>
      <p className="flex items-center justify-between gap-3 border-t border-line bg-paper px-5 py-3.5 text-sm">
        <span className="text-subtle">Eligibility</span>
        <Chip tone="ok" check>
          Verified
        </Chip>
      </p>
    </Window>
  );
}

