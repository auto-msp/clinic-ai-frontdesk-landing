import type { CSSProperties } from "react";
import { CheckIcon } from "./icons";
import { Chip, Window } from "./ui";

/**
 * Product mock-ups drawn in code. Every one is wrapped in <Window>, which
 * labels it as sample data; names, times and numbers are placeholders.
 */

const transcript = [
  ["Assistant", "Riverside Clinic, how can I help?"],
  ["Patient", "I need to see someone about a recurring headache, ideally Friday morning."],
  ["Assistant", "Dr. Example has 9:30 on Friday. Shall I book it?"],
  ["Patient", "Yes please."],
] as const;

export function CallMock({ className = "" }: { className?: string }) {
  return (
    <Window title="Inbound call · 7:48 PM" tag="Sample transcript" className={className}>
      <ul className="px-5">
        {transcript.map(([who, text]) => (
          <li key={text} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-4 text-base last:border-0">
            <span className={`text-sm font-semibold ${who === "Assistant" ? "text-accent" : "text-subtle"}`}>{who}</span>
            <span className="text-ink">{text}</span>
          </li>
        ))}
      </ul>
      <p className="flex items-start gap-3 border-t border-line bg-ok-soft px-5 py-4 text-base font-medium text-ok">
        <CheckIcon className="mt-0.5 size-5 shrink-0" strokeWidth={2.25} />
        <span>Booked: Fri 9:30 AM with Dr. Example. Confirmation text and intake link sent.</span>
      </p>
    </Window>
  );
}

type Slot = { time: string; who: string; kind: "booked" | "filled" | "open" };
const slots: Slot[] = [
  { time: "9:00", who: "Patient A", kind: "booked" },
  { time: "9:30", who: "Patient B", kind: "booked" },
  { time: "10:00", who: "Patient C", kind: "filled" },
  { time: "10:30", who: "Open", kind: "open" },
  { time: "11:00", who: "Patient D", kind: "booked" },
  { time: "2:00", who: "Patient E", kind: "filled" },
  { time: "2:30", who: "Patient F", kind: "booked" },
  { time: "3:00", who: "Open", kind: "open" },
];

export function ScheduleMock({ className = "" }: { className?: string }) {
  return (
    <Window title="Schedule view" className={className}>
      <ul>
        {slots.map((s) => (
          <li key={s.time} className="flex items-center gap-4 border-b border-line px-5 py-3 text-base last:border-0">
            <span className="tnum w-12 shrink-0 text-subtle">{s.time}</span>
            <span className={`flex-1 ${s.kind === "open" ? "text-subtle" : "text-ink"}`}>{s.who}</span>
            {s.kind === "booked" && <Chip>Booked</Chip>}
            {s.kind === "filled" && (
              <Chip tone="ok" check>
                Auto-filled
              </Chip>
            )}
            {s.kind === "open" && <Chip tone="amber">Open</Chip>}
          </li>
        ))}
      </ul>
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
  ["Reminder sent for Fri 10 am", "Sent"],
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
            <dd className="t-num text-3xl text-ink">{v}</dd>
            <dt className="text-sm text-subtle">{k}</dt>
          </div>
        ))}
      </dl>
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

/** The hero screen: one slot, its ranked waitlist and the activity that filled it. */
export function FrontDeskMock({ className = "" }: { className?: string }) {
  return (
    <Window title="Front desk · Thursday" tag="Sample data" className={className}>
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
        <div>
          <p className="text-xs font-medium text-subtle">Appointment</p>
          <p className="font-display text-xl font-semibold">Thu 2:00 PM · Dr. Example</p>
        </div>
        <Chip tone="ok" check>
          Filled
        </Chip>
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
          <li
            key={r.text}
            className="log-row flex items-start gap-4 px-5 py-3 text-base"
            style={{ "--i": i } as CSSProperties}
          >
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
