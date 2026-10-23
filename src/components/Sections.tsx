import Link from "next/link";
import { ArrowRightIcon } from "./icons";
import { CallMock, DashboardMock, ScheduleMock } from "./Mockups";
import WaitlistForm from "./WaitlistForm";
import { Body, Checks, Container, Editorial, H2, Label, Lead, LinkRows, Section, Steps, TwoCol } from "./ui";

export function Problem() {
  return (
    <Section space="lg">
      <Editorial
        head={
          <div className="rise">
            <Label n="01">The problem</Label>
            <H2>Cancellations quietly drain revenue</H2>
          </div>
        }
      >
        <div className="rise">
          <p className="font-display text-[clamp(1.4rem,1.1rem+1.2vw,2rem)] font-medium leading-[1.3] tracking-tight text-ink">
            The slot isn&apos;t lost because patients don&apos;t want care. It&apos;s lost because winning it back
            takes phone tag, voicemails and manual calendar edits.
          </p>
          <div className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-2 md:gap-12">
            <Body>
              While staff work through the waitlist, the phones keep ringing, insurance cards need checking and
              forms need chasing. By the time someone says yes, the window has often closed.
            </Body>
            <Body>
              Hiring more people doesn&apos;t fix this. A workflow built specifically for clinic front desks does.
            </Body>
          </div>
        </div>
      </Editorial>
    </Section>
  );
}

export function WaitlistCalling() {
  return (
    <Section id="waitlist" tone="ink" space="lg">
      <TwoCol ratio="text">
        <div className="rise">
          <Label dark>Signature feature</Label>
          <H2 dark>Automatic waitlist calling</H2>
          <Lead dark>
            Typical scheduling tools store a waitlist and stop there. This one acts on it: it spots a
            cancellation, calls the best-fit patient, confirms the booking and updates the calendar, usually
            within a couple of minutes.
          </Lead>
          <p className="mt-8 border-l-2 border-accent-bright pl-5 font-display text-2xl font-semibold leading-snug text-white">
            It doesn&apos;t send staff a task. It completes the task.
          </p>
          <Checks
            dark
            items={[
              "Detects cancellations as they happen",
              "Ranks the waitlist by distance, urgency and fit",
              "Places the call right away",
              "Handles confirmation, rescheduling and intake",
              "Writes back to your records system",
            ]}
          />
        </div>
        <div className="rise lg:pl-10">
          <Steps
            dark
            layout="column"
            label="What happens when a slot opens"
            steps={[
              { title: "Slot opens", sub: "A cancellation is detected" },
              { title: "Best match", sub: "Waitlist ranked by fit" },
              { title: "Automatic call", sub: "The assistant phones the patient" },
              { title: "Secured", sub: "Calendar and records updated" },
            ]}
          />
        </div>
      </TwoCol>
    </Section>
  );
}

export function Receptionist({ tone = "plain" }: { tone?: "plain" | "tint" }) {
  return (
    <Section tone={tone}>
      <TwoCol flip ratio="visual">
        <CallMock className="rise" />
        <div className="rise">
          <Label>Always on</Label>
          <H2>A phone receptionist that never clocks out</H2>
          <Lead>
            Every inbound call is answered in natural language, at any hour, and appointments land straight in
            your calendar.
          </Lead>
          <Checks
            items={[
              "No voicemail boxes, no hold music",
              "New bookings and reschedules",
              "Appointment confirmations on request",
              "Absorbs overflow at peak times",
              "Hands clinical questions to on-call staff",
              "Every call logged in your dashboard",
            ]}
          />
        </div>
      </TwoCol>
    </Section>
  );
}

export function Scheduling({ tone = "tint" }: { tone?: "plain" | "tint" }) {
  return (
    <Section tone={tone}>
      <TwoCol ratio="text">
        <div className="rise">
          <Label>Scheduling intelligence</Label>
          <H2>Smart scheduling that avoids double booking</H2>
          <Lead>
            It reads your live calendar on every call and respects provider preferences, visit lengths, buffers
            and room availability, whether you have one clinician or a dozen.
          </Lead>
        </div>
        <ScheduleMock className="rise" />
      </TwoCol>
    </Section>
  );
}

export function NoShow({ tone = "plain" }: { tone?: "plain" | "tint" }) {
  return (
    <Section tone={tone}>
      <TwoCol flip>
        <div className="rise">
          <Steps
            layout="column"
            label="No-show recovery sequence"
            steps={[
              { title: "Reminder", sub: "48 hours before" },
              { title: "Confirm", sub: "Patient replies" },
              { title: "Release", sub: "Waitlist triggered" },
              { title: "Recover", sub: "New patient booked" },
            ]}
          />
        </div>
        <div className="rise">
          <Label>No-show prevention</Label>
          <H2>Fewer empty chairs, less lost revenue</H2>
          <Lead>
            A staged reminder flow confirms attendance, makes cancelling easy, and instantly refills a slot if
            someone drops out.
          </Lead>
          <Checks
            items={[
              "Reminder two days before",
              "Confirmation request the day before",
              "Extra same-day nudge for higher-risk patients",
              "One-touch cancel that triggers the waitlist",
              "Revenue impact reporting",
            ]}
          />
        </div>
      </TwoCol>
    </Section>
  );
}

export function Dashboard({ tone = "tint" }: { tone?: "plain" | "tint" }) {
  return (
    <Section tone={tone}>
      <TwoCol ratio="visual" flip>
        <DashboardMock className="rise" />
        <div className="rise">
          <Label>Command center</Label>
          <H2>One dashboard for everything the assistant does</H2>
          <Lead>Every action is visible and auditable in a single view.</Lead>
          <Checks
            items={[
              "Live schedule with slot status",
              "Waitlist queue and call log",
              "Intake completion rates",
              "Insurance verification status",
              "No-show trends and revenue recovered",
              "Call recordings and transcripts",
            ]}
          />
        </div>
      </TwoCol>
    </Section>
  );
}

/** Home: the product, shown. Three drawn screens, each paired with copy that already lives in the page components. */
export function Tour() {
  const rows = [
    {
      label: "Always on",
      title: "A phone receptionist that never clocks out",
      body: "Every inbound call is answered in natural language, at any hour, and appointments land straight in your calendar.",
      href: "/product",
      cta: "See the product",
      visual: <CallMock />,
    },
    {
      label: "Scheduling intelligence",
      title: "Smart scheduling that avoids double booking",
      body: "It reads your live calendar on every call and respects provider preferences, visit lengths, buffers and room availability.",
      href: "/solutions/waitlist-automation",
      cta: "How waitlist calling works",
      visual: <ScheduleMock />,
    },
    {
      label: "Command center",
      title: "One dashboard for everything the assistant does",
      body: "Every action is visible and auditable in a single view.",
      href: "/case-studies",
      cta: "See case studies",
      visual: <DashboardMock />,
    },
  ];
  const grids = [
    "lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)]",
    "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]",
    "lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]",
  ];
  return (
    <Section tone="tint" space="lg">
      <Container className="space-y-24 lg:space-y-32">
        {rows.map((r, i) => (
          <div key={r.title} className={`rise grid items-center gap-10 lg:gap-16 ${grids[i]}`}>
            <div className={i === 1 ? "lg:order-2" : ""}>
              <Label>{r.label}</Label>
              <h2 className="t-h2 mb-5 max-w-[18ch]">{r.title}</h2>
              <p className="t-lead max-w-[40ch] text-body">{r.body}</p>
              <Link
                href={r.href}
                className="mt-6 inline-flex min-h-11 items-center gap-2 font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:text-accent-hover hover:decoration-current"
              >
                {r.cta}
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <div className={i === 1 ? "lg:order-1" : ""}>{r.visual}</div>
          </div>
        ))}
      </Container>
    </Section>
  );
}

const explore = [
  { href: "/product", title: "Product", body: "Everything the assistant does, from the phones to the dashboard." },
  { href: "/solutions/waitlist-automation", title: "Waitlist automation", body: "How cancelled slots get refilled by phone, usually in minutes." },
  { href: "/solutions/medical-intake", title: "Medical intake", body: "Clinical details gathered on the call, ready before the visit." },
  { href: "/solutions/insurance-intake", title: "Insurance intake", body: "Coverage captured and checked before the booking is confirmed." },
  { href: "/security", title: "Security", body: "How patient information is protected." },
  { href: "/case-studies", title: "Case studies", body: "What recovering revenue from cancellations looks like." },
];

export function Explore() {
  return (
    <Section space="lg">
      <Editorial
        head={
          <div className="rise">
            <Label n="02">Explore</Label>
            <H2>Everything the front desk does, one page each</H2>
          </div>
        }
      >
        <div className="rise">
          <LinkRows items={explore} />
        </div>
      </Editorial>
    </Section>
  );
}

const audience = [
  ["Small clinics", "Solo providers and small groups who want automation without enterprise overhead."],
  ["Multi-provider practices", "Teams juggling several clinicians, rooms and visit types."],
  ["Growing groups", "Organizations adding locations who need consistent front-desk operations."],
  ["Cancellation-heavy clinics", "Anyone losing revenue to unfilled slots and manual waitlist calls."],
] as const;

export function Audience() {
  return (
    <Section tone="tint">
      <Container>
        <div className="rise max-w-[40rem]">
          <Label n="03">Who it&apos;s for</Label>
          <H2>Built for practices of every size</H2>
        </div>
        <ol className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {audience.map(([t, d], i) => (
            <li key={t} className={`rise ${i % 2 === 1 ? "lg:mt-14" : ""}`}>
              <span className="t-num block text-5xl text-ghost" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="t-h3 mb-2 mt-4 border-t-2 border-ink pt-4">{t}</h3>
              <p className="text-base text-body">{d}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

const impact = [
  "Cancelled slots refilled in minutes, not hours",
  "Less staff time on outbound calls and hold queues",
  "Patients arrive with intake already complete",
  "Billing sees verified insurance before check-in",
  "No-show rate falls with automatic reminders",
  "More revenue captured from fewer open slots",
  "Higher call volume without extra headcount",
  "Staff focus on in-person patient care",
];

export function Impact() {
  const lead = impact.slice(0, 2);
  const rest = impact.slice(2);
  return (
    <Section tone="ink" space="lg">
      <Container>
        <div className="rise">
          <Label dark n="04">
            The impact
          </Label>
          <H2 dark>What changes once the front desk is automated</H2>
        </div>
        <ol className="mt-14 grid gap-x-14 gap-y-8 md:grid-cols-2">
          {lead.map((t, i) => (
            <li key={t} className="rise border-t border-white/30 pt-5">
              <span className="t-num text-sm text-accent-bright">{String(i + 1).padStart(2, "0")}</span>
              <p className="mt-2 font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.25rem)] font-semibold leading-[1.15] tracking-tight text-white">
                {t}
              </p>
            </li>
          ))}
        </ol>
        <ol className="mt-12 grid gap-x-14 md:grid-cols-2">
          {rest.map((t, i) => (
            <li key={t} className="rise flex items-baseline gap-5 border-t border-white/20 py-4">
              <span className="t-num w-7 shrink-0 text-sm text-accent-bright">{String(i + 3).padStart(2, "0")}</span>
              <span className="text-white/90">{t}</span>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export function Demo() {
  return (
    <Section id="demo" space="lg">
      <TwoCol ratio="text">
        <div className="rise">
          <Label n="05">Get started</Label>
          <H2>See it in action</H2>
          <Lead>
            Book a live walkthrough: watch a call get answered, a waitlist slot refilled and intake collected
            in real time.
          </Lead>
        </div>
        <div className="rise rounded-md border border-ink bg-surface p-6 shadow-window sm:p-8">
          <h3 className="t-h3">Request a demo or join the waitlist</h3>
          <WaitlistForm />
        </div>
      </TwoCol>
    </Section>
  );
}
