import Counter from "./Counter";
import WaitlistForm from "./WaitlistForm";
import {
  Band,
  Body,
  ButtonLink,
  Checks,
  Container,
  Eyebrow,
  FlowDiagram,
  H2,
  MockCard,
  Pill,
  Row,
  TwoCol,
} from "./ui";

export function Problem() {
  return (
    <Band tone="alt">
      <TwoCol>
        <div className="reveal">
          <Eyebrow>The problem</Eyebrow>
          <H2>Cancellations quietly drain revenue</H2>
          <p className="max-w-[640px] text-[1.1rem] text-body">
            The slot isn&apos;t lost because patients don&apos;t want care. It&apos;s lost because winning it
            back takes phone tag, voicemails and manual calendar edits.
          </p>
        </div>
        <div className="reveal space-y-5">
          <Body>
            While staff work through the waitlist, the phones keep ringing, insurance cards need
            checking and forms need chasing. By the time someone says yes, the window has often closed.
          </Body>
          <Body>
            Hiring more people doesn&apos;t fix this. A workflow built specifically for clinic front
            desks does.
          </Body>
        </div>
      </TwoCol>
    </Band>
  );
}

export function WaitlistCalling() {
  return (
    <Band id="waitlist" tone="dark">
      <TwoCol>
        <div className="reveal">
          <Eyebrow>Signature feature</Eyebrow>
          <H2>Automatic waitlist calling</H2>
          <Body dark>
            Typical scheduling tools store a waitlist and stop there. This one acts on it: it spots a
            cancellation, calls the best-fit patient, confirms the booking and updates the calendar,
            usually within a couple of minutes.
          </Body>
          <p className="my-5 rounded-r-lg border-l-4 border-accent bg-white/10 px-[18px] py-3.5 font-semibold text-white">
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
        <div className="reveal">
          <FlowDiagram
            steps={[{ title: "Slot opens" }, { title: "Best match" }, { title: "Auto call" }, { title: "Secured" }]}
          />
        </div>
      </TwoCol>
    </Band>
  );
}

export function Receptionist() {
  return (
    <Band id="receptionist">
      <TwoCol flip>
        <div className="reveal">
          <div className="mx-auto max-w-[290px] overflow-hidden rounded-[34px] border-8 border-[#111b2b] bg-white text-ink shadow-card">
            <div className="flex justify-between bg-primary p-3.5 text-[0.78rem] text-white">
              <span>9:41</span>
              <span>YourBrand AI</span>
            </div>
            <p className="m-3.5 rounded-xl bg-muted p-3 text-[0.82rem]">
              “Hi, this is YourBrand calling for Riverside Clinic. A Thursday 2 pm opening just came up.
              Would you like it?”
            </p>
            <div className="mx-3.5 mb-3.5 flex gap-2 text-[0.8rem] text-white">
              <b className="flex-1 rounded-lg bg-accent p-2.5 text-center">Accept</b>
              <b className="flex-1 rounded-lg bg-[#9aa6b4] p-2.5 text-center">Decline</b>
            </div>
            <p className="mx-3.5 mb-[18px] rounded-xl bg-ok-bg p-3 text-[0.82rem] font-semibold text-ok">
              ✓ Appointment confirmed
              <br />
              Thu · 2:00 PM · Intake form sent
            </p>
          </div>
        </div>
        <div className="reveal">
          <Eyebrow>Always on</Eyebrow>
          <H2>A phone receptionist that never clocks out</H2>
          <Body>
            Every inbound call is answered in natural language, at any hour, and appointments land
            straight in your calendar.
          </Body>
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
    </Band>
  );
}

export function MedicalIntake() {
  return (
    <Band id="intake" tone="alt">
      <TwoCol>
        <div className="reveal">
          <Eyebrow>Medical intake</Eyebrow>
          <H2>Intake gathered while the patient is still on the line</H2>
          <Body>
            Questions are tailored to the appointment type and answers are stored in structured form,
            so charts are ready before the visit starts rather than chased the morning of.
          </Body>
          <Checks
            items={[
              "Reason for visit and symptoms",
              "Medications and allergies",
              "Preferred provider and time",
              "Custom questions per visit type",
              "Delivered to your records system automatically",
            ]}
          />
          <a href="#demo" className="mt-5 inline-block font-semibold text-accent hover:underline">
            Learn about medical intake →
          </a>
        </div>
        <MockCard title="PATIENT INTAKE" badge={<span>Sample</span>} className="reveal">
          <div className="p-[18px]">
            <Row k="Reason for visit" v="Annual checkup" />
            <Row k="Symptoms" v="Fatigue, mild headache" />
            <Row k="Preferred provider" v="Dr. Example" />
            <Row k="Preferred time" v="Morning" />
          </div>
        </MockCard>
      </TwoCol>
    </Band>
  );
}

export function InsuranceIntake() {
  return (
    <Band>
      <TwoCol flip>
        <MockCard title="INSURANCE DETAILS" badge={<Pill>Sample</Pill>} className="reveal">
          <div className="p-[18px]">
            <Row k="Provider" v="Sample Health Plan" />
            <Row k="Member ID" v="XXX••••7823" />
            <Row k="Group" v="GRP-0000" />
            <Row k="Policy holder" v="Self" />
            <Row k="Copay" v="$25" />
            <Row k="Status" v={<Pill>Verified · Active</Pill>} />
          </div>
        </MockCard>
        <div className="reveal">
          <Eyebrow>Insurance intake</Eyebrow>
          <H2>Coverage details captured and checked at booking</H2>
          <Body>
            Missing or stale insurance data is a top cause of billing delays. Details are collected
            during the call and eligibility is checked before the visit is confirmed, so billing starts
            clean.
          </Body>
          <Checks
            items={[
              "Plan and member ID collected on the call",
              "Group, policy holder and copay captured",
              "Real-time eligibility check",
              "Secondary coverage when relevant",
              "Prompts to refresh expired coverage",
            ]}
          />
          <a href="#demo" className="mt-5 inline-block font-semibold text-accent hover:underline">
            Learn about insurance intake →
          </a>
        </div>
      </TwoCol>
    </Band>
  );
}

type Slot = { label: string; kind: "booked" | "filled" | "open" };
const slots: Slot[] = [
  { label: "9:00 · Patient A", kind: "booked" },
  { label: "9:30 · Patient B", kind: "booked" },
  { label: "10:00 · Patient C ✓", kind: "filled" },
  { label: "10:30 · Open", kind: "open" },
  { label: "11:00 · Patient D", kind: "booked" },
  { label: "2:00 · Patient E ✓", kind: "filled" },
  { label: "2:30 · Patient F", kind: "booked" },
  { label: "3:00 · Open", kind: "open" },
];
const slotStyle: Record<Slot["kind"], string> = {
  booked: "border-line bg-muted",
  filled: "border-ok-line bg-ok-bg font-semibold text-ok",
  open: "border-dashed border-line font-semibold text-accent",
};

export function Scheduling() {
  return (
    <Band tone="alt">
      <TwoCol>
        <div className="reveal">
          <Eyebrow>Scheduling intelligence</Eyebrow>
          <H2>Smart scheduling that avoids double booking</H2>
          <Body>
            It reads your live calendar on every call and respects provider preferences, visit lengths,
            buffers and room availability, whether you have one clinician or a dozen.
          </Body>
        </div>
        <MockCard title="SCHEDULE VIEW" badge={<span>Sample</span>} className="reveal">
          <ul className="grid grid-cols-2 gap-2 p-4">
            {slots.map((s) => (
              <li key={s.label} className={`rounded-lg border px-3 py-2.5 text-[0.82rem] ${slotStyle[s.kind]}`}>
                {s.label}
              </li>
            ))}
          </ul>
          <div className="flex gap-4 px-4 pb-3.5 text-xs text-body">
            <span>▢ Booked</span>
            <span className="text-ok">▣ Auto-filled</span>
            <span className="text-accent">┄ Open</span>
          </div>
        </MockCard>
      </TwoCol>
    </Band>
  );
}

export function NoShow() {
  return (
    <Band>
      <TwoCol flip>
        <div className="reveal">
          <FlowDiagram
            label="No-show recovery sequence"
            steps={[
              { title: "Reminder", sub: "48 hrs before" },
              { title: "Confirm", sub: "Patient replies" },
              { title: "Release", sub: "Waitlist triggered" },
              { title: "Recover", sub: "New patient booked" },
            ]}
          />
        </div>
        <div className="reveal">
          <Eyebrow>No-show prevention</Eyebrow>
          <H2>Fewer empty chairs, less lost revenue</H2>
          <Body>
            A staged reminder flow confirms attendance, makes cancelling easy, and instantly refills a
            slot if someone drops out.
          </Body>
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
    </Band>
  );
}

const activity = [
  ["Waitlist call: patient accepted Thu 2 pm", "Confirmed"],
  ["Insurance verified: active coverage", "Verified"],
  ["Intake completed before visit", "Complete"],
  ["Reminder sent for Fri 10 am", "Sent"],
  ["No-show slot refilled automatically", "Filled"],
] as const;

export function Dashboard() {
  return (
    <Band id="dashboard" tone="alt">
      <TwoCol>
        <div className="reveal">
          <Eyebrow>Command center</Eyebrow>
          <H2>One dashboard for everything the assistant does</H2>
          <Body>Every action is visible and auditable in a single view.</Body>
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
        <MockCard title="DASHBOARD" badge={<Pill>● Live</Pill>} className="reveal">
          <div className="grid grid-cols-2 gap-2.5 p-4 sm:grid-cols-4">
            {[
              { to: 12, label: "Slots filled" },
              { to: 28, label: "Calls made" },
              { to: 94, label: "Intake done", suffix: "%" },
              { to: 1, label: "No-shows" },
            ].map((s) => (
              <div key={s.label} className="rounded-[10px] bg-muted p-3 text-center">
                <Counter to={s.to} suffix={s.suffix} />
                <span className="text-[0.7rem] text-body">{s.label}</span>
              </div>
            ))}
          </div>
          {activity.map(([text, badge]) => (
            <div key={text} className="flex justify-between gap-2.5 border-t border-line px-4 py-2.5 text-[0.8rem]">
              <span>{text}</span>
              <span className="whitespace-nowrap text-[0.7rem] font-bold text-accent">{badge}</span>
            </div>
          ))}
        </MockCard>
      </TwoCol>
    </Band>
  );
}

export function Security() {
  return (
    <Band id="security" tone="dark">
      <TwoCol>
        <div className="reveal">
          <Eyebrow>Healthcare security</Eyebrow>
          <H2>Designed for regulated environments</H2>
          <Body dark>
            Replace this block with your real compliance posture. Only claim certifications you actually
            hold.
          </Body>
          <Checks
            dark
            items={[
              "Encryption in transit and at rest",
              "Role-based access controls",
              "Audit logs for system actions",
              "Data minimization",
            ]}
          />
        </div>
        <ul className="reveal flex flex-wrap gap-2.5">
          {["Secure cloud", "Encrypted", "Role-based access", "Audit logging"].map((b) => (
            <li key={b} className="rounded-full border border-white/25 px-4 py-2 text-[0.82rem] font-semibold">
              {b}
            </li>
          ))}
        </ul>
      </TwoCol>
    </Band>
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
    <Band>
      <Container>
        <Eyebrow>Who it&apos;s for</Eyebrow>
        <H2>Built for practices of every size</H2>
        <ul className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {audience.map(([t, d]) => (
            <li
              key={t}
              className="reveal rounded-[14px] border border-line bg-white p-6 transition hover:-translate-y-1 hover:shadow-card"
            >
              <h3 className="mb-2 text-[1.15rem] font-semibold text-primary">{t}</h3>
              <p className="text-sm text-body">{d}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Band>
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
    <Band tone="alt">
      <Container>
        <Eyebrow>The impact</Eyebrow>
        <H2>What changes once the front desk is automated</H2>
        <ol className="mt-9 grid gap-x-10 md:grid-cols-2">
          {impact.map((t, i) => (
            <li key={t} className="reveal flex items-start gap-4 border-b border-line py-3.5">
              <b className="min-w-7 text-[1.1rem] text-accent">{String(i + 1).padStart(2, "0")}</b>
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ol>
      </Container>
    </Band>
  );
}

export function Demo() {
  return (
    <Band id="demo">
      <Container className="text-center">
        <H2>See it in action</H2>
        <p className="mx-auto mb-7 max-w-[640px] text-[1.1rem] text-body">
          Book a live walkthrough: watch a call get answered, a waitlist slot refilled and intake
          collected in real time.
        </p>
        <ButtonLink href="#waitlist-form">Request Your Demo</ButtonLink>
        <h3 id="waitlist-form" className="mt-14 scroll-mt-24 text-[1.15rem] font-semibold text-primary">
          Or join the early-access waitlist
        </h3>
        <WaitlistForm />
      </Container>
    </Band>
  );
}
