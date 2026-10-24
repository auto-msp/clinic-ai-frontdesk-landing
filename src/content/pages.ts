/**
 * Copy for every inner page. All wording is original template text for the
 * AutoMSP AI Front Desk demonstration. Confirm deployment capabilities before launch.
 * Anything resembling a result, customer or certification is illustrative.
 */

export type Item = { title: string; body: string };
export type Step = { title: string; sub: string };

export type Block =
  | { kind: "features"; label?: string; title: string; intro?: string; items: Item[]; cols?: 2 | 3 }
  | {
      kind: "split";
      label?: string;
      title: string;
      body: string;
      checks?: string[];
      panelTitle: string;
      panelTag?: string;
      rows: [string, string][];
      flip?: boolean;
    }
  | { kind: "steps"; label?: string; title: string; intro?: string; steps: Step[] }
  | { kind: "metrics"; label?: string; title: string; intro?: string; items: { value: string; label: string }[]; note?: string }
  | { kind: "faq"; title?: string; items: { q: string; a: string }[] }
  | { kind: "links"; label?: string; title: string; intro?: string; items: { href: string; title: string; body: string }[] }
  | { kind: "prose"; sections: { h: string; p: string[] }[] }
  | { kind: "contact" }
  | { kind: "component"; name: "WaitlistCalling" | "Receptionist" | "Scheduling" | "NoShow" | "Dashboard" };

export type PageData = {
  title: string;
  description: string;
  label: string;
  h1: string;
  lead: string;
  notice?: string;
  blocks: Block[];
  closing?: { title: string; body: string; primary: { href: string; label: string }; secondary?: { href: string; label: string } };
};

const defaultClosing: NonNullable<PageData["closing"]> = {
  title: "See it with your own call volume",
  body: "Tell us about your clinic and we'll walk through how the front desk would run with an assistant on the phones.",
  primary: { href: "/contact", label: "Book a demo" },
  secondary: { href: "/product", label: "Explore the product" },
};

export const pages: Record<string, PageData> = {
  product: {
    title: "Product",
    description: "Everything the AI front desk does: calls, scheduling, intake, reminders and one operations dashboard.",
    label: "Product",
    h1: "The AI front desk platform",
    lead: "One assistant that answers the phone, runs the schedule, collects intake and keeps your team informed, so the people in your clinic can look after patients.",
    blocks: [
      {
        kind: "features",
        label: "What it does",
        title: "Eight jobs your front desk no longer has to do by hand",
        cols: 2,
        items: [
          { title: "Answers every call", body: "Natural-language call handling at any hour, with no hold music and no voicemail box filling up overnight." },
          { title: "Calls the waitlist", body: "When a slot opens, the assistant rings the best-fit patient, confirms, and updates the calendar." },
          { title: "Schedules without clashes", body: "Reads the live calendar and respects provider preferences, visit lengths, buffers and rooms." },
          { title: "Gathers medical intake", body: "Asks the right questions for the visit type and stores answers in structured form." },
          { title: "Captures insurance", body: "Collects plan and member details on the call and checks eligibility before confirming." },
          { title: "Flags urgent calls", body: "Calls that sound clinical or time-sensitive are routed to on-call staff instead of being handled by the assistant." },
          { title: "Sends reminders", body: "Staged reminders and confirmations, with one-touch cancel that feeds straight back into the waitlist." },
          { title: "Reports in one place", body: "A single dashboard shows the schedule, the call log, intake status and revenue recovered." },
        ],
      },
      {
        kind: "steps",
        label: "Life of a call",
        title: "From ring to record in four steps",
        steps: [
          { title: "Answer", sub: "Picks up on the first ring" },
          { title: "Understand", sub: "Works out what the caller needs" },
          { title: "Act", sub: "Books, moves, confirms or escalates" },
          { title: "Record", sub: "Writes the result to your systems" },
        ],
      },
      { kind: "component", name: "Receptionist" },
      { kind: "component", name: "Scheduling" },
      { kind: "component", name: "Dashboard" },
    ],
  },

  solutions: {
    title: "Solutions",
    description: "How the AI front desk fits small clinics, multi-provider practices, specialty clinics and growing groups.",
    label: "Solutions",
    h1: "Built for clinics that want fewer missed calls and fewer empty slots",
    lead: "The same assistant, set up differently for the way your practice actually runs.",
    blocks: [
      {
        kind: "features",
        label: "By practice type",
        title: "Where it helps most",
        cols: 2,
        items: [
          { title: "Small and mid-sized clinics", body: "Take pressure off a lean front desk. Calls get answered while staff handle the patient in front of them." },
          { title: "Multi-provider practices", body: "Keep every clinician's schedule, visit types and preferences straight, without double booking." },
          { title: "High-demand specialty clinics", body: "Turn each cancellation into an immediate rebooking instead of a lost appointment." },
          { title: "Growing groups", body: "Run the same front-desk process across locations so patients get a consistent experience." },
        ],
      },
      {
        kind: "links",
        label: "Go deeper",
        title: "Three capabilities, one page each",
        items: [
          { href: "/solutions/waitlist-automation", title: "Waitlist automation", body: "How cancelled slots get refilled by phone, usually within minutes." },
          { href: "/solutions/medical-intake", title: "Medical intake", body: "Clinical details collected before the visit, in a structured form." },
          { href: "/solutions/insurance-intake", title: "Insurance intake", body: "Coverage captured on the call and checked before booking." },
        ],
      },
    ],
  },

  "solutions/waitlist-automation": {
    title: "Waitlist automation",
    description: "Automatic waitlist calling that refills cancelled appointment slots without staff phone tag.",
    label: "Solutions / Waitlist automation",
    h1: "Cancelled slots get refilled while your team stays with patients",
    lead: "Most scheduling tools keep a waitlist and stop there. This one picks up the phone and works it.",
    blocks: [
      {
        kind: "steps",
        label: "How it works",
        title: "From cancellation to confirmed booking",
        steps: [
          { title: "Detect", sub: "A cancellation is spotted as it happens" },
          { title: "Rank", sub: "Waitlist ordered by fit, urgency and distance" },
          { title: "Call", sub: "The assistant rings the best match" },
          { title: "Confirm", sub: "Booking and intake link sent" },
          { title: "Update", sub: "Calendar and records written back" },
        ],
      },
      {
        kind: "split",
        label: "You stay in control",
        title: "Rules your clinic sets, not the software",
        body: "Decide who can be offered a slot, how far ahead the assistant may call, and when a human should step in instead.",
        checks: [
          "Limit by visit type, provider and notice period",
          "Set quiet hours for outbound calls",
          "Escalate to staff when a patient asks for a person",
          "Every call is logged and reviewable",
        ],
        panelTitle: "Waitlist rules",
        panelTag: "Sample settings",
        rows: [
          ["Offer window", "Up to 7 days ahead"],
          ["Call hours", "9:00 AM to 6:00 PM"],
          ["Order", "Urgency, then distance"],
          ["Fallback", "Hand to front desk"],
        ],
      },
      { kind: "component", name: "WaitlistCalling" },
      { kind: "component", name: "NoShow" },
    ],
  },

  "solutions/medical-intake": {
    title: "Medical intake",
    description: "Digital medical intake collected during the call and delivered to your records system before the visit.",
    label: "Solutions / Medical intake",
    h1: "Charts that are ready before the patient walks in",
    lead: "Intake questions are asked while the patient is already on the line, tailored to the visit, and stored in a structured form.",
    blocks: [
      {
        kind: "features",
        label: "What gets collected",
        title: "The questions your clinicians would ask anyway",
        cols: 2,
        items: [
          { title: "Reason for visit", body: "In the patient's own words, with follow-ups where a detail is missing." },
          { title: "Symptoms", body: "Captured as structured answers, not a voicemail transcript to be re-typed." },
          { title: "Medications and allergies", body: "Collected consistently so nothing depends on who answered the phone." },
          { title: "Preferences", body: "Preferred provider, time of day and how the patient likes to be contacted." },
        ],
      },
      {
        kind: "split",
        label: "Configurable",
        title: "Different questions for different visits",
        body: "A new-patient consultation and a follow-up should not ask the same things. Set question sets per visit type and change them whenever your process does.",
        checks: ["Custom questions per visit type", "Clear hand-off for clinical questions", "Delivered to your records system automatically"],
        panelTitle: "Question set: new patient",
        panelTag: "Sample",
        rows: [
          ["Reason for visit", "Required"],
          ["Current medications", "Required"],
          ["Allergies", "Required"],
          ["Preferred provider", "Optional"],
        ],
        flip: true,
      },
    ],
  },

  "solutions/insurance-intake": {
    title: "Insurance intake",
    description: "Insurance details captured during the call, with eligibility checked before the visit is confirmed.",
    label: "Solutions / Insurance intake",
    h1: "Coverage captured and checked before the visit is booked",
    lead: "Missing or out-of-date insurance data is a common cause of billing delays. Collect it early and check it while the patient is still on the line.",
    blocks: [
      {
        kind: "steps",
        label: "How it works",
        title: "Insurance handled in the same call",
        steps: [
          { title: "Collect", sub: "Plan, member ID and group number" },
          { title: "Capture", sub: "Policy holder and copay details" },
          { title: "Check", sub: "Eligibility verified where supported" },
          { title: "Flag", sub: "Problems routed to billing early" },
        ],
      },
      {
        kind: "features",
        label: "Why it matters",
        title: "Billing starts clean",
        cols: 3,
        items: [
          { title: "Fewer surprises at check-in", body: "Patients are told early if coverage needs attention." },
          { title: "Less chasing", body: "Billing staff stop calling patients back for card photos and member numbers." },
          { title: "Secondary coverage", body: "Asked about whenever it's relevant to the visit." },
        ],
      },
    ],
  },

  security: {
    title: "Security",
    description: "Security considerations to review before deploying a clinic front-desk workflow.",
    label: "Security",
    h1: "Plan for patient information protection",
    lead: "Healthcare data deserves defaults that are strict from the start, not settings someone has to remember to turn on.",
    notice:
      "Security requirements are assessed for each deployment. This demo does not establish certification, regulatory compliance or approval to process patient information.",
    blocks: [
      {
        kind: "features",
        label: "Safeguards",
        title: "Security requirements to review",
        cols: 2,
        items: [
          { title: "Encrypted communication", body: "Review encryption across the selected telephony, application and integration providers." },
          { title: "Secure cloud infrastructure", body: "Assess hosting, network isolation and provider responsibilities before deployment." },
          { title: "Protected data storage", body: "Confirm encryption at rest, retention periods and deletion procedures for each data store." },
          { title: "Access control", body: "Define staff permissions, authentication and account removal procedures." },
          { title: "Controlled production", body: "Changes reach production through a reviewed, repeatable process." },
          { title: "Audit visibility", body: "Agree on audit records, access to logs and monitoring responsibilities." },
          { title: "Safe scheduling design", body: "The assistant collects only what a visit needs and hands clinical questions to staff." },
          { title: "Data minimization", body: "Less data collected means less data to protect." },
        ],
      },
    ],
  },

  technology: {
    title: "Technology",
    description: "The architecture behind the AI front desk: call processing, scheduling engine, storage and infrastructure.",
    label: "Technology",
    h1: "The architecture behind the front desk",
    lead: "A look at the layers that turn a phone call into a booked, recorded appointment.",
    blocks: [
      {
        kind: "steps",
        label: "System architecture",
        title: "Four layers, each with one job",
        steps: [
          { title: "Call processing", sub: "Speech in, speech out" },
          { title: "Scheduling engine", sub: "Slots, rules and the waitlist" },
          { title: "Data layer", sub: "Encrypted storage and audit trail" },
          { title: "Infrastructure", sub: "Monitored, redundant hosting" },
        ],
      },
      {
        kind: "features",
        label: "In detail",
        title: "Built as healthcare infrastructure",
        cols: 2,
        items: [
          { title: "AI call processing", body: "Turns what a caller says into a structured request, then turns the result back into a natural reply." },
          { title: "Scheduling and waitlist engine", body: "Applies your rules to the live calendar so every offer is valid before it is made." },
          { title: "Secure data storage", body: "Separates patient data from application logic and encrypts it at rest." },
          { title: "Designed for reliability", body: "Health checks, retries and a clear path to a human when something goes wrong." },
        ],
      },
    ],
  },

  "case-studies": {
    title: "Case studies",
    description: "An illustrative example of how a clinic could recover revenue from cancellations.",
    label: "Case studies",
    h1: "Recovering revenue from cancellations",
    lead: "A walk-through of how one kind of clinic could measure the effect of an AI front desk.",
    notice:
      "Illustrative workflow, not a customer testimonial or measured performance result.",
    blocks: [
      {
        kind: "split",
        label: "The clinic",
        title: "A five-provider family practice",
        body: "Busy phones, a paper waitlist and a front desk that spent much of the day calling patients back. When a patient cancelled, the slot was usually gone by the time anyone reached the next person.",
        panelTitle: "Clinic profile",
        panelTag: "Example",
        rows: [
          ["Providers", "5"],
          ["Setting", "Family practice"],
          ["Waitlist", "Paper and spreadsheet"],
          ["Main problem", "Late cancellations"],
        ],
      },
      {
        kind: "steps",
        label: "Rollout",
        title: "What changed",
        steps: [
          { title: "Assess", sub: "Map the current workflow" },
          { title: "Configure", sub: "Rules, visit types, call hours" },
          { title: "Test", sub: "Rehearse with staff first" },
          { title: "Go live", sub: "Waitlist calling switched on" },
        ],
      },
      {
        kind: "metrics",
        label: "Pilot measurement plan",
        title: "The kind of numbers to track",
        intro: "Agree on these measures before a pilot. Results depend on call volume, patient availability and implementation.",
        items: [
          { value: "Fill rate", label: "Cancelled slots refilled" },
          { value: "Time", label: "Median time to refill" },
          { value: "Hours", label: "Front-desk call time saved per week" },
          { value: "Revenue", label: "Revenue recovered per month" },
        ],
        note: "Establish a baseline before the pilot and review measured outcomes with your team.",
      },
    ],
  },

  pricing: {
    title: "Pricing",
    description: "How pricing works for the AI front desk: scoped to your clinic, with no surprise fees.",
    label: "Pricing",
    h1: "Pricing scoped to your clinic",
    lead: "Every practice runs differently, so pricing starts with a short conversation about how yours does.",
    notice: "Your proposal will define scope, integrations and pricing before work begins.",
    blocks: [
      {
        kind: "features",
        label: "What shapes the price",
        title: "Four things we look at",
        cols: 2,
        items: [
          { title: "Providers and locations", body: "How many clinicians and sites the assistant needs to schedule for." },
          { title: "Call volume", body: "Inbound and outbound calls in a typical month." },
          { title: "Integrations", body: "Which calendar, records and phone systems we connect to." },
          { title: "Support level", body: "How hands-on you want onboarding and ongoing tuning to be." },
        ],
      },
      {
        kind: "steps",
        label: "How it works",
        title: "From first call to a clear proposal",
        steps: [
          { title: "Intro call", sub: "Understand your workflow" },
          { title: "Proposal", sub: "Scope and price in writing" },
          { title: "Pilot", sub: "Prove it on real calls" },
          { title: "Rollout", sub: "Expand with confidence" },
        ],
      },
    ],
    closing: {
      title: "Get a quote for your clinic",
      body: "Share a few details and we'll come back with a scoped proposal.",
      primary: { href: "/contact", label: "Contact us" },
      secondary: { href: "/implementation", label: "See how rollout works" },
    },
  },

  faq: {
    title: "FAQ",
    description: "Answers to common questions about the AI front desk.",
    label: "FAQ",
    h1: "Frequently asked questions",
    lead: "Straight answers to what clinics ask us most.",
    blocks: [
      {
        kind: "faq",
        items: [
          { q: "Does it replace my front desk team?", a: "No. It handles the repetitive calls and call-backs so your team can focus on patients in the building, and it hands anything sensitive to a person." },
          { q: "How does automatic waitlist calling work?", a: "When a slot opens, the assistant ranks the waitlist, calls the best-fit patient, confirms the booking and updates the calendar." },
          { q: "Can we control which patients get called?", a: "Yes. You set rules by visit type, provider, notice period and call hours, and can exclude any patient or group." },
          { q: "Is medical intake customizable?", a: "Yes. Question sets are defined per visit type and can be changed whenever your process changes." },
          { q: "Is insurance eligibility checked automatically?", a: "Where your payer connections support it, eligibility is checked during booking and problems are flagged to billing." },
          { q: "What happens if a patient needs a person?", a: "The assistant transfers the call or takes a message for staff, based on the escalation rules you choose." },
          { q: "Can it work for multiple providers or locations?", a: "Yes. Schedules, visit types and rules are set per provider and per location." },
          { q: "Is patient information secure?", a: "Data is encrypted in transit and at rest, access is role-based, and system actions are logged. See the Security page for details." },
        ],
      },
    ],
    closing: {
      title: "Still have a question?",
      body: "Ask us directly and we'll reply with specifics for your clinic.",
      primary: { href: "/contact", label: "Contact us" },
      secondary: { href: "/support", label: "Support" },
    },
  },

  support: {
    title: "Support",
    description: "Operational assistance for active clinics: how support works and what to expect.",
    label: "Support",
    h1: "Operational assistance for active clinics",
    lead: "Once the assistant is answering your calls, we stay close to make sure it keeps working the way your clinic needs.",
    blocks: [
      {
        kind: "features",
        label: "Types of support",
        title: "Help where it counts",
        cols: 3,
        items: [
          { title: "Operational questions", body: "Something looks off on the dashboard or a call went differently than expected." },
          { title: "Configuration changes", body: "New visit types, new providers, updated call hours or rules." },
          { title: "Incident response", body: "Fast attention when something affects live patient calls." },
        ],
      },
      {
        kind: "steps",
        label: "Response structure",
        title: "How we prioritize",
        steps: [
          { title: "Urgent", sub: "Live calls affected" },
          { title: "High", sub: "Workflow degraded" },
          { title: "Normal", sub: "Questions and changes" },
        ],
      },
      {
        kind: "split",
        label: "Ongoing optimization",
        title: "Reviewed, then tuned",
        body: "Regular reviews of call outcomes help refine scripts, rules and escalation so the assistant keeps improving.",
        checks: ["Monthly outcome review", "Script and rule tuning", "New-workflow rollouts"],
        panelTitle: "Review agenda",
        panelTag: "Sample",
        rows: [
          ["Call outcomes", "Booked, moved, escalated"],
          ["Slots refilled", "Trend vs last month"],
          ["Escalations", "Reasons and fixes"],
        ],
        flip: true,
      },
    ],
  },

  about: {
    title: "About",
    description: "Our mission and the approach behind the AI front desk.",
    label: "About",
    h1: "Operational stability for healthcare practices",
    lead: "We build software that takes repetitive phone work off clinic staff, carefully and with patient trust in mind.",
    notice: "AutoMSP AI Front Desk is part of AutoMSP AI Automation Services.",
    blocks: [
      {
        kind: "split",
        label: "Our mission",
        title: "Give clinics their time back",
        body: "Front desks are asked to answer phones, check people in, chase paperwork and fix the schedule, all at once. We exist to take the routine part of that off their plate.",
        checks: ["Fewer missed calls", "Fewer empty appointment slots", "Less after-hours admin"],
        panelTitle: "At a glance",
        panelTag: "AutoMSP",
        rows: [
          ["Focus", "Clinic front desks"],
          ["Approach", "Structured, staged rollouts"],
          ["Priority", "Patient information protection"],
        ],
      },
      {
        kind: "features",
        label: "How we work",
        title: "Principles we hold to",
        cols: 3,
        items: [
          { title: "Built for healthcare", body: "Designed around clinic workflows, not adapted from a generic call bot." },
          { title: "Operational discipline", body: "Careful testing and controlled changes, because live patient calls are not a place to experiment." },
          { title: "Infrastructure and security", body: "Strict defaults and clear accountability for how data is handled." },
        ],
      },
    ],
  },

  leadership: {
    title: "Leadership",
    description: "The team and values behind the AI front desk.",
    label: "Leadership",
    h1: "A structured vision for healthcare operations",
    lead: "The people responsible for the product, and what they've committed to.",
    notice: "Meet the people responsible for your implementation during your consultation.",
    blocks: [
      {
        kind: "features",
        label: "What guides us",
        title: "Vision, focus and commitment",
        cols: 3,
        items: [
          { title: "Founding vision", body: "Clinics should be able to run a smooth front desk without hiring ahead of every busy season." },
          { title: "Operational focus", body: "We measure ourselves by calls handled well and slots recovered, not by feature count." },
          { title: "Commitment", body: "Careful handling of patient information and honest communication when something goes wrong." },
        ],
      },
    ],
  },

  implementation: {
    title: "Implementation",
    description: "How a rollout works: workflow assessment, configuration, testing and go-live.",
    label: "Implementation",
    h1: "Structured deployment without disruption",
    lead: "Rolling out a new phone workflow should not mean a risky switch-over. We stage it so your team is ready at every step.",
    blocks: [
      {
        kind: "steps",
        label: "Controlled rollout",
        title: "Four phases",
        steps: [
          { title: "Workflow assessment", sub: "Map how calls, scheduling and intake run today" },
          { title: "System configuration", sub: "Set rules, visit types and integrations" },
          { title: "Testing phase", sub: "Rehearse with your staff before patients" },
          { title: "Go live", sub: "Switch on with close monitoring" },
        ],
      },
      {
        kind: "split",
        label: "Typical timeline",
        title: "Weeks, not months",
        body: "Timing depends on how many systems we connect to and how many providers are in scope.",
        panelTitle: "Example timeline",
        panelTag: "Sample",
        rows: [
          ["Assessment", "Week 1"],
          ["Configuration", "Weeks 1 to 2"],
          ["Testing", "Week 3"],
          ["Go live", "Week 4"],
        ],
        flip: true,
      },
    ],
    closing: {
      title: "Ready to begin?",
      body: "Start with a short conversation and we'll scope your rollout.",
      primary: { href: "/contact", label: "Contact us" },
      secondary: { href: "/integrations", label: "See integrations" },
    },
  },

  integrations: {
    title: "Integrations",
    description: "How the AI front desk connects to calendars, records systems and phone providers.",
    label: "Integrations",
    h1: "Designed to work within your existing systems",
    lead: "The assistant plugs into the tools your clinic already uses, rather than asking you to replace them.",
    notice: "Compatibility is confirmed during discovery. No specific vendor integration is guaranteed by this demo.",
    blocks: [
      {
        kind: "features",
        label: "Connection types",
        title: "Where it connects",
        cols: 2,
        items: [
          { title: "Calendar systems", body: "Reads availability and writes bookings so the schedule is always the source of truth." },
          { title: "Records systems", body: "Sends structured intake and appointment details into the patient record." },
          { title: "Communication providers", body: "Works with your phone numbers and messaging so patients see a familiar caller." },
          { title: "API availability", body: "Assess API availability and permissions for custom workflows and reporting." },
        ],
      },
    ],
    closing: {
      title: "Discuss your integration needs",
      body: "Tell us what you run today and we'll confirm what we can connect to.",
      primary: { href: "/contact", label: "Contact us" },
      secondary: { href: "/implementation", label: "How rollout works" },
    },
  },

  contact: {
    title: "Contact",
    description: "Start the conversation: schedule a consultation or request information.",
    label: "Contact",
    h1: "Start the conversation",
    lead: "Tell us a little about your clinic. We'll reply with next steps and a time to talk.",
    blocks: [
      { kind: "contact" },
      {
        kind: "steps",
        label: "What to expect",
        title: "After you reach out",
        steps: [
          { title: "We reply", sub: "Usually within a business day" },
          { title: "Short call", sub: "Understand your workflow" },
          { title: "Walkthrough", sub: "See it on your use case" },
        ],
      },
    ],
    closing: undefined,
  },

  "privacy-policy": {
    title: "Privacy information", description: "Privacy information for the AutoMSP demonstration website.",
    label: "Privacy", h1: "Privacy information", lead: "This website demonstrates front-desk workflows using illustrative data.",
    notice: "A complete privacy policy must be published before production launch or collection of personal information.",
    blocks: [{ kind: "prose", sections: [
      { h: "Demonstration data", p: ["The schedule, call activity and patient examples shown on this website are illustrative. Do not submit patient or medical information through this demo."] },
      { h: "External booking", p: ["When booking becomes available, it will open an external scheduling provider. Review that provider’s privacy information before submitting your details."] },
      { h: "Production deployment", p: ["Data handling, hosting, retention and the relevant agreements must be established for each clinic before a production deployment."] }
    ] }], closing: undefined,
  },
  "terms-of-service": {
    title: "Demo information", description: "Scope of the AutoMSP AI Front Desk demonstration.",
    label: "Demo information", h1: "About this demonstration", lead: "Explore the proposed experience before discussing a deployment for your practice.",
    notice: "Production service terms are pending. This demo does not create a service agreement.",
    blocks: [{ kind: "prose", sections: [
      { h: "Scope", p: ["This website is a product demonstration. Its example schedules and workflows do not perform live patient calls, clinical triage or appointment booking in a clinic system."] },
      { h: "Implementation", p: ["Availability, integrations, support arrangements and commercial terms are confirmed in a separate proposal and agreement."] }
    ] }], closing: undefined,
  },
};

export { defaultClosing };
