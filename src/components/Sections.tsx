import { CheckIcon } from "./icons";
import WaitlistForm from "./WaitlistForm";
import {
  Body,
  Checks,
  Chip,
  Container,
  H2,
  Label,
  Lead,
  Row,
  Section,
  Steps,
  TextLink,
  TwoCol,
  Window,
} from "./ui";

export function Problem() {
  return (
    <Section>
      <TwoCol>
        <div className="rise">
          <Label n="01">The problem</Label>
          <H2>Cancellations quietly drain revenue</H2>
        </div>
        <div className="rise space-y-5">
          <Lead>
            The slot isn&apos;t lost because patients don&apos;t want care. It&apos;s lost because winning it back
            takes phone tag, voicemails and manual calendar edits.
          </Lead>
          <Body>
            While staff work through the waitlist, the phones keep ringing, insurance cards need checking and
            forms need chasing. By the time someone says yes, the window has often closed.
          </Body>
          <Body>
            Hiring more people doesn&apos;t fix this. A workflow built specifically for clinic front desks does.
          </Body>
        </div>
      </TwoCol>
    </Section>
  );
}

export function WaitlistCalling() {
  return (
    <Section id="waitlist" tone="ink">
      <TwoCol>
        <div className="rise">
          <Label n="02" dark>
            Signature feature
          </Label>
          <H2 dark>Automatic waitlist calling</H2>
          <Lead dark>
            Typical scheduling tools store a waitlist and stop there. This one acts on it: it spots a
            cancellation, calls the best-fit patient, confirms the booking and updates the calendar, usually
            within a couple of minutes.
          </Lead>
          <p className="mt-7 border-l-2 border-accent-bright pl-5 font-display text-xl font-semibold text-white">
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
        <div className="rise md:pl-10">
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

const transcript = [
  ["Assistant", "Riverside Clinic, how can I help?"],
  ["Patient", "I need to see someone about a recurring headache, ideally Friday morning."],
  ["Assistant", "Dr. Example has 9:30 on Friday. Shall I book it?"],
  ["Patient", "Yes please."],
] as const;

export function Receptionist() {
  return (
    <Section id="receptionist">
      <TwoCol flip>
        <div className="rise">
          <Window title="Inbound call · 7:48 PM" tag="Sample transcript">
            <ul className="px-5">
              {transcript.map(([who, text]) => (
                <li
                  key={text}
                  className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-line py-3.5 text-[0.95rem] last:border-0"
                >
                  <span
                    className={`text-sm font-semibold ${who === "Assistant" ? "text-accent" : "text-subtle"}`}
                  >
                    {who}
                  </span>
                  <span className="text-ink">{text}</span>
                </li>
              ))}
            </ul>
            <p className="flex items-start gap-3 border-t border-line bg-ok-soft px-5 py-4 text-[0.95rem] font-medium text-ok">
              <CheckIcon className="mt-0.5 size-5 shrink-0" strokeWidth={2.25} />
              <span>
                Booked: Fri 9:30 AM with Dr. Example. Confirmation text and intake link sent.
              </span>
            </p>
          </Window>
        </div>
        <div className="rise">
          <Label n="03">Always on</Label>
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

export function MedicalIntake() {
  return (
    <Section id="intake" tone="tint">
      <TwoCol>
        <div className="rise">
          <Label n="04">Medical intake</Label>
          <H2>Intake gathered while the patient is still on the line</H2>
          <Lead>
            Questions are tailored to the appointment type and answers are stored in structured form, so charts
            are ready before the visit starts rather than chased the morning of.
          </Lead>
          <Checks
            items={[
              "Reason for visit and symptoms",
              "Medications and allergies",
              "Preferred provider and time",
              "Custom questions per visit type",
              "Delivered to your records system automatically",
            ]}
          />
          <TextLink href="#demo">Learn about medical intake</TextLink>
        </div>
        <Window title="Patient intake" className="rise">
          <dl className="px-5 py-2">
            <Row k="Reason for visit" v="Annual checkup" />
            <Row k="Symptoms" v="Fatigue, mild headache" />
            <Row k="Preferred provider" v="Dr. Example" />
            <Row k="Preferred time" v="Morning" />
          </dl>
        </Window>
      </TwoCol>
    </Section>
  );
}

export function InsuranceIntake() {
  return (
    <Section>
      <TwoCol flip>
        <Window title="Insurance details" className="rise">
          <dl className="px-5 py-2">
            <Row k="Provider" v="Sample Health Plan" />
            <Row k="Member ID" v={<span className="tnum">XXX••••7823</span>} />
            <Row k="Group" v={<span className="tnum">GRP-0000</span>} />
            <Row k="Policy holder" v="Self" />
            <Row k="Copay" v={<span className="tnum">$25</span>} />
            <Row
              k="Status"
              v={
                <Chip tone="ok" check>
                  Verified · Active
                </Chip>
              }
            />
          </dl>
        </Window>
        <div className="rise">
          <Label n="05">Insurance intake</Label>
          <H2>Coverage details captured and checked at booking</H2>
          <Lead>
            Missing or stale insurance data is a top cause of billing delays. Details are collected during the
            call and eligibility is checked before the visit is confirmed, so billing starts clean.
          </Lead>
          <Checks
            items={[
              "Plan and member ID collected on the call",
              "Group, policy holder and copay captured",
              "Real-time eligibility check",
              "Secondary coverage when relevant",
              "Prompts to refresh expired coverage",
            ]}
          />
          <TextLink href="#demo">Learn about insurance intake</TextLink>
        </div>
      </TwoCol>
    </Section>
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

export function Scheduling() {
  return (
    <Section tone="tint">
      <TwoCol>
        <div className="rise">
          <Label n="06">Scheduling intelligence</Label>
          <H2>Smart scheduling that avoids double booking</H2>
          <Lead>
            It reads your live calendar on every call and respects provider preferences, visit lengths, buffers
            and room availability, whether you have one clinician or a dozen.
          </Lead>
        </div>
        <Window title="Schedule view" className="rise">
          <ul>
            {slots.map((s) => (
              <li
                key={s.time}
                className="flex items-center gap-4 border-b border-line px-5 py-3 text-[0.95rem] last:border-0"
              >
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
      </TwoCol>
    </Section>
  );
}

export function NoShow() {
  return (
    <Section>
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
          <Label n="07">No-show prevention</Label>
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

export function Dashboard() {
  return (
    <Section id="dashboard" tone="tint">
      <TwoCol>
        <div className="rise">
          <Label n="08">Command center</Label>
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
        <Window title="Today" tag="Sample data" className="rise">
          <dl className="grid grid-cols-2 border-b border-line sm:grid-cols-4">
            {stats.map(([v, k], i) => (
              <div
                key={k}
                className={`px-5 py-5 ${i % 2 === 1 ? "border-l border-line" : ""} ${i > 0 ? "sm:border-l sm:border-line" : ""} ${i >= 2 ? "border-t border-line sm:border-t-0" : ""}`}
              >
                <dd className="tnum font-display text-3xl font-semibold text-ink">{v}</dd>
                <dt className="text-sm text-subtle">{k}</dt>
              </div>
            ))}
          </dl>
          <ul>
            {activity.map(([text, status]) => (
              <li
                key={text}
                className="flex items-center justify-between gap-4 border-b border-line px-5 py-3 text-[0.95rem] last:border-0"
              >
                <span className="text-ink">{text}</span>
                <Chip tone="ok">{status}</Chip>
              </li>
            ))}
          </ul>
        </Window>
      </TwoCol>
    </Section>
  );
}

const safeguards = [
  ["Encryption", "In transit and at rest"],
  ["Access", "Role-based controls"],
  ["Audit", "Logs for system actions"],
  ["Data", "Minimization by default"],
] as const;

export function Security() {
  return (
    <Section id="security" tone="ink">
      <TwoCol>
        <div className="rise">
          <Label n="09" dark>
            Healthcare security
          </Label>
          <H2 dark>Designed for regulated environments</H2>
          <Lead dark>
            Template copy: replace this block with your real compliance posture. Only claim certifications you
            actually hold.
          </Lead>
        </div>
        <dl className="rise grid gap-x-8 sm:grid-cols-2">
          {safeguards.map(([k, v]) => (
            <div key={k} className="border-t border-white/20 py-5">
              <dt className="font-display text-lg font-semibold text-white">{k}</dt>
              <dd className="text-white/75">{v}</dd>
            </div>
          ))}
        </dl>
      </TwoCol>
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
    <Section>
      <Container>
        <div className="rise">
          <Label n="10">Who it&apos;s for</Label>
          <H2>Built for practices of every size</H2>
        </div>
        <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {audience.map(([t, d]) => (
            <li key={t} className="rise border-t-2 border-line-strong pt-5">
              <h3 className="mb-2 text-lg font-semibold">{t}</h3>
              <p className="text-[0.95rem] text-body">{d}</p>
            </li>
          ))}
        </ul>
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
  return (
    <Section tone="tint">
      <Container>
        <div className="rise">
          <Label n="11">The impact</Label>
          <H2>What changes once the front desk is automated</H2>
        </div>
        <ol className="mt-10 grid gap-x-12 md:grid-cols-2">
          {impact.map((t, i) => (
            <li key={t} className="flex items-baseline gap-5 border-b border-line py-4">
              <span className="tnum w-7 shrink-0 text-sm font-semibold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}

export function Demo() {
  return (
    <Section id="demo">
      <TwoCol>
        <div className="rise">
          <Label n="12">Get started</Label>
          <H2>See it in action</H2>
          <Lead>
            Book a live walkthrough: watch a call get answered, a waitlist slot refilled and intake collected
            in real time.
          </Lead>
        </div>
        <div className="rise rounded-xl border border-line bg-surface p-6 shadow-window sm:p-8">
          <h3 className="font-display text-xl font-semibold">Request a demo or join the waitlist</h3>
          <WaitlistForm />
        </div>
      </TwoCol>
    </Section>
  );
}
