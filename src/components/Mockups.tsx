import type { CSSProperties } from "react";
import { CheckIcon } from "./icons";
import Counter from "./motion/Counter";
import SlotsChart from "./motion/SlotsChart";
import { Chip, Window } from "./ui";

/**
 * Product mock-ups drawn in code. Every one is wrapped in <Window>, which
 * labels it as sample data; names, times and numbers are placeholders.
 */

/** Static waveform: deterministic bar heights, decorative only. */
export function Wave({ bars = 30, className = "" }: { bars?: number; className?: string }) {
  const heights = Array.from({ length: bars }, (_, i) => 6 + Math.round(Math.abs(Math.sin(i * 1.7) * 24 + Math.cos(i * 0.55) * 8)));
  return (
    <svg viewBox={`0 0 ${bars * 6} 40`} preserveAspectRatio="none" aria-hidden="true" focusable="false" className={className}>
      {heights.map((h, i) => (
        <rect key={i} x={i * 6} y={20 - h / 2} width="3" height={h} rx="1.5" fill="currentColor" />
      ))}
    </svg>
  );
}

const transcript = [
  ["Assistant", "Riverside Clinic, how can I help?"],
  ["Patient", "I need to see someone about a recurring headache, ideally Friday morning."],
  ["Assistant", "Dr. Example has 9:30 on Friday. Shall I book it?"],
  ["Patient", "Yes please."],
] as const;

/** A live call: waveform, speech bubbles, what the assistant understood, and the result. */
export function CallMock({ className = "" }: { className?: string }) {
  return (
    <Window title="Live call · 7:48 PM" tag="Sample transcript" className={className}>
      <div className="flex items-center gap-4 border-b border-line bg-paper px-5 py-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-ink">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-accent" />
          On call
        </span>
        <Wave className="h-8 flex-1 text-accent" />
        <span className="tnum text-sm text-subtle">00:42</span>
      </div>
      <ul className="space-y-3 px-5 py-5">
        {transcript.map(([who, text]) => {
          const bot = who === "Assistant";
          return (
            <li key={text} className={`flex ${bot ? "justify-start" : "justify-end"}`}>
              <p className={`max-w-[88%] rounded-md px-4 py-2.5 text-base ${bot ? "bg-ink text-white" : "bg-paper-2 text-ink"}`}>
                <span className="t-eyebrow mb-1 block text-[0.6875rem] opacity-80">{who}</span>
                {text}
              </p>
            </li>
          );
        })}
      </ul>
      <dl className="grid grid-cols-3 border-y border-line bg-paper text-sm">
        {[
          ["Intent", "Book a visit"],
          ["Wants", "Friday morning"],
          ["Provider", "Dr. Example"],
        ].map(([k, v], i) => (
          <div key={k} className={`px-4 py-3 ${i > 0 ? "border-l border-line" : ""}`}>
            <dt className="t-eyebrow text-[0.6875rem] text-subtle">{k}</dt>
            <dd className="font-medium text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <p className="flex items-start gap-3 bg-ok-soft px-5 py-4 text-base font-medium text-ok">
        <CheckIcon className="mt-0.5 size-5 shrink-0" strokeWidth={2.25} />
        <span>Booked: Fri 9:30 AM with Dr. Example. Confirmation text and intake link sent.</span>
      </p>
    </Window>
  );
}

type Cell = "booked" | "filled" | "open" | "hot";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const grid: { time: string; cells: Cell[] }[] = [
  { time: "9:00", cells: ["booked", "booked", "open", "booked", "booked"] },
  { time: "10:00", cells: ["booked", "filled", "booked", "booked", "open"] },
  { time: "11:00", cells: ["open", "booked", "booked", "booked", "filled"] },
  { time: "2:00", cells: ["booked", "booked", "filled", "hot", "booked"] },
  { time: "3:00", cells: ["filled", "open", "booked", "open", "booked"] },
];
const cellStyle: Record<Cell, string> = {
  booked: "bg-paper-2 text-subtle",
  filled: "bg-ok-soft text-ok",
  open: "border border-dashed border-amber bg-transparent text-amber",
  hot: "bg-accent text-white",
};
const cellLabel: Record<Cell, string> = { booked: "Booked", filled: "Auto-filled", open: "Open", hot: "Refilled" };

/** Week view: every slot is one of four states, and the state is always spelled out in text. */
export function ScheduleMock({ className = "" }: { className?: string }) {
  return (
    <Window title="Week view · Dr. Example" tag="Sample data" className={className}>
      <div className="p-4 sm:p-5">
        <table className="w-full table-fixed border-separate border-spacing-1 text-center">
          <caption className="sr-only">Sample week schedule showing booked, auto-filled, open and refilled slots</caption>
          <thead>
            <tr>
              <th className="w-12" />
              {days.map((d, i) => (
                <th key={d} className={`t-eyebrow pb-1 text-[0.6875rem] text-subtle ${i < 2 ? "hidden sm:table-cell" : ""}`} scope="col">
                  {d}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((r) => (
              <tr key={r.time}>
                <th scope="row" className="tnum pr-1 text-right text-xs font-medium text-subtle">
                  {r.time}
                </th>
                {r.cells.map((c, i) => (
                  <td
                    key={i}
                    className={`t-eyebrow h-11 rounded-sm px-0.5 align-middle text-[0.625rem] leading-tight tracking-[0.04em] ${cellStyle[c]} ${i < 2 ? "hidden sm:table-cell" : ""}`}
                  >
                    {cellLabel[c]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-line bg-paper px-5 py-3 text-sm text-subtle">
        <span className="font-semibold text-ink">Thu 2:00</span> was a cancellation. The waitlist call refilled it in two minutes.
      </p>
    </Window>
  );
}

const stats = [
  ["12", "Slots filled"],
  ["28", "Calls made"],
  ["94%", "Intake done"],
  ["1", "No-shows"],
] as const;

const activity = [
  ["Waitlist call: patient accepted Thu 2 pm", "Confirmed"],
  ["Insurance verified: active coverage", "Verified"],
  ["Intake completed before visit", "Complete"],
  ["No-show slot refilled automatically", "Filled"],
] as const;

export function DashboardMock({ className = "" }: { className?: string }) {
  return (
    <Window title="Today" tag="Sample data" className={className}>
      <dl className="grid grid-cols-2 border-b border-line sm:grid-cols-4">
        {stats.map(([v, k], i) => (
          <div
            key={k}
            className={`px-5 py-5 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 0 ? "sm:border-l sm:border-line" : ""} ${i >= 2 ? "border-t border-line sm:border-t-0" : ""}`}
          >
            <dd className="t-num text-3xl text-ink">
              <Counter value={v} />
            </dd>
            <dt className="text-sm text-subtle">{k}</dt>
          </div>
        ))}
      </dl>
      <div className="border-b border-line px-5 pb-3 pt-4">
        <p className="t-eyebrow mb-2 text-subtle">Slots filled per week</p>
        <SlotsChart />
      </div>
      <ul>
        {activity.map(([text, status]) => (
          <li key={text} className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 text-base last:border-0">
            <span className="text-ink">{text}</span>
            <Chip tone="ok">{status}</Chip>
          </li>
        ))}
      </ul>
    </Window>
  );
}

const queue = [
  { name: "Patient C", meta: "1.4 mi · follow-up due", tone: "ok", status: "Accepted" },
  { name: "Patient F", meta: "3.1 mi", tone: "neutral", status: "Queued" },
  { name: "Patient B", meta: "5.8 mi", tone: "neutral", status: "Queued" },
] as const;

const log: { t: string; text: string; chip?: { tone: "amber" | "ok"; label: string } }[] = [
  { t: "10:02", text: "Patient cancels Thu 2:00 PM with Dr. Example", chip: { tone: "amber", label: "Slot open" } },
  { t: "10:02", text: "Waitlist checked: 3 patients ranked by distance and urgency" },
  { t: "10:03", text: "Assistant calls the best match" },
  { t: "10:04", text: "Patient accepts, calendar updated", chip: { tone: "ok", label: "Filled" } },
  { t: "10:04", text: "Intake link and reminder sent" },
];

/** The hero screen: one slot, a call in progress, its ranked waitlist and the activity that filled it. */
export function FrontDeskMock({ className = "" }: { className?: string }) {
  return (
    <Window title="Front desk · Thursday" tag="Sample data" className={className}>
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <p className="t-eyebrow text-[0.6875rem] text-subtle">Appointment</p>
          <p className="font-display text-xl">Thu 2:00 PM · Dr. Example</p>
        </div>
        <Chip tone="ok" check>
          Filled
        </Chip>
      </div>

      <div className="flex items-center gap-4 bg-ink px-5 py-3 text-white">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <span aria-hidden="true" className="size-2.5 rounded-full bg-accent-bright" />
          Calling Patient C
        </span>
        <Wave className="h-7 flex-1 text-accent-bright" />
        <span className="tnum text-sm text-white/80">00:12</span>
      </div>

      <p className="t-eyebrow px-5 pb-1 pt-4 text-subtle">Waitlist, ranked</p>
      <ol className="px-5 pb-2">
        {queue.map((q, i) => (
          <li key={q.name} className="grid grid-cols-[1.5rem_1fr_auto] items-center gap-3 border-b border-line py-2.5 last:border-0">
            <span className="tnum text-sm font-semibold text-subtle">{i + 1}</span>
            <span className="text-base text-ink">
              {q.name}
              <span className="ml-2 text-sm text-subtle">{q.meta}</span>
            </span>
            <Chip tone={q.tone} check={q.tone === "ok"}>
              {q.status}
            </Chip>
          </li>
        ))}
      </ol>

      <p className="t-eyebrow border-t border-line bg-paper px-5 pb-1 pt-4 text-subtle">Activity</p>
      <ol className="divide-y divide-line bg-paper">
        {log.map((r, i) => (
          <li key={r.text} className="log-row flex items-start gap-4 px-5 py-3 text-base" style={{ "--i": i } as CSSProperties}>
            <span className="tnum w-11 shrink-0 pt-px text-subtle">{r.t}</span>
            <span className="flex-1 text-ink">{r.text}</span>
            {r.chip && (
              <Chip tone={r.chip.tone} check={r.chip.tone === "ok"}>
                {r.chip.label}
              </Chip>
            )}
          </li>
        ))}
      </ol>
      <p className="border-t border-line bg-surface px-5 py-3.5 text-sm text-subtle">
        Cancellation to confirmed booking: <span className="tnum font-semibold text-ink">2 minutes</span>
      </p>
    </Window>
  );
}
