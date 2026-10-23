import { CheckIcon } from "./icons";
import { ButtonLink, Chip, Container, Steps, Window } from "./ui";

const log: { t: string; text: string; chip?: { tone: "amber" | "ok"; label: string } }[] = [
  { t: "10:02", text: "Patient cancels Thu 2:00 PM with Dr. Example", chip: { tone: "amber", label: "Slot open" } },
  { t: "10:02", text: "Waitlist checked: 3 patients ranked by distance and urgency" },
  { t: "10:03", text: "Assistant calls the best match" },
  { t: "10:04", text: "Patient accepts, calendar updated", chip: { tone: "ok", label: "Filled" } },
  { t: "10:04", text: "Intake link and reminder sent" },
];

export default function Hero() {
  return (
    <>
      <section id="top" className="pb-20 pt-14 md:pb-28 md:pt-24">
        <Container className="grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <p className="mb-6 text-sm font-semibold text-accent">AI front desk for clinics</p>
            <h1 className="text-[clamp(2.4rem,5.4vw,4rem)] font-semibold leading-[1.04] tracking-tight">
              Books visits and refills cancelled slots, on its own.
            </h1>
            <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-body sm:text-xl">
              Your assistant picks up every call, books the visit, gathers medical and insurance details,
              and rings the next person on your waitlist the moment a patient cancels.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href="#demo" arrow>
                Request a demo
              </ButtonLink>
              <ButtonLink href="#how" variant="secondary">
                See how it works
              </ButtonLink>
            </div>
            <ul className="mt-10 space-y-2 text-[0.95rem] text-body">
              {["No manual call-backs", "No idle appointment slots", "No swamped reception desk"].map((t) => (
                <li key={t} className="flex items-center gap-2.5">
                  <CheckIcon className="size-5 shrink-0 text-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <Window title="Front desk activity" tag="Sample data">
            <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
              <div>
                <p className="text-xs font-medium text-subtle">Appointment</p>
                <p className="font-display text-lg font-semibold">Thu 2:00 PM · Dr. Example</p>
              </div>
              <Chip tone="ok" check>
                Filled
              </Chip>
            </div>
            <ol className="divide-y divide-line">
              {log.map((r, i) => (
                <li
                  key={r.text}
                  className="log-row flex items-start gap-4 px-5 py-3.5 text-[0.95rem]"
                  style={{ "--i": i } as React.CSSProperties}
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
            <p className="border-t border-line bg-paper px-5 py-3 text-sm text-subtle">
              Cancellation to confirmed booking: <span className="tnum font-semibold text-ink">2 minutes</span>
            </p>
          </Window>
        </Container>
      </section>

      <section id="how" className="border-y border-line bg-surface py-16 md:py-20">
        <Container>
          <Steps
            label="How a cancelled slot gets refilled"
            steps={[
              { title: "Cancel", sub: "Patient cancels" },
              { title: "Match", sub: "Waitlist checked" },
              { title: "Call", sub: "Assistant phones the patient" },
              { title: "Accept", sub: "Patient confirms" },
              { title: "Filled", sub: "Slot recovered" },
            ]}
          />
        </Container>
      </section>
    </>
  );
}
