import Link from "next/link";
import { demoHref } from "@/content/site";
import { ButtonLink, Container } from "./ui";
import { CheckIcon, ArrowRightIcon } from "./icons";

export default function Hero() {
  return <section className="home-hero">
    <Container className="hero-grid">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> MEET YOUR NEW FRONT DESK</p>
        <h1>More time for patients.<br /><em>Less time on<br className="hidden lg:block" /> the phone.</em></h1>
        <p className="hero-description">A calmer front desk starts here. Bring calls, appointments and patient intake into one connected workflow—with your team in control.</p>
        <div className="flex flex-wrap gap-3 mt-8"><ButtonLink href={demoHref} arrow>Book a demo</ButtonLink><ButtonLink href="/product" variant="secondary">Explore the platform</ButtonLink></div>
        <div className="hero-assurances"><span><CheckIcon />Built around your clinic</span><span><CheckIcon />Human handoff</span></div>
      </div>
      <div className="demo-scene" aria-label="Illustrative front desk workflow">
        <div className="scene-label"><span>THE FRONT DESK, CONNECTED</span><span>PRODUCT PREVIEW</span></div>
        <div className="desk-window">
          <div className="desk-top"><span className="mini-mark">A</span><strong>Front desk overview</strong><span className="sample-pill">Sample data</span></div>
          <div className="desk-body">
            <div className="flex justify-between items-center gap-3"><div><p className="text-xs text-subtle">THURSDAY · OCTOBER 22</p><h2 className="text-2xl font-semibold mt-1">A little more breathing room.</h2></div><span className="calendar-icon" aria-hidden="true">22</span></div>
            <div className="desk-metrics"><div><strong>08</strong><span>Calls handled</span></div><div><strong>03</strong><span>Visits booked</span></div><div><strong>02</strong><span>Slots recovered</span></div></div>
            <div className="schedule-heading"><span>Afternoon schedule</span><span>PROVIDER 01</span></div>
            <div className="schedule-row"><time>1:30 PM</time><div><strong>Follow-up visit</strong><span>Intake complete</span></div><span className="slot-state">Confirmed</span></div>
            <div className="schedule-row recovered"><time>2:00 PM</time><div><strong>Waitlist appointment</strong><span>Previously cancelled slot</span></div><span className="slot-state">Recovered</span></div>
            <div className="schedule-row"><time>2:30 PM</time><div><strong>New patient visit</strong><span>Reminder sent</span></div><span className="slot-state">Confirmed</span></div>
            <Link href="/solutions/waitlist-automation" className="workflow-link">Explore the waitlist workflow <ArrowRightIcon className="size-4" /></Link>
          </div>
        </div>
        <div className="call-card"><span className="call-symbol" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-5-2-2 2a14 14 0 0 1-7-7l2-2-2-5Z" /></svg></span><div><strong>From a call to a confirmed visit.</strong><span>One workflow. Fewer handoffs.</span></div><span className="audio-bars" aria-hidden="true"><i /><i /><i /><i /><i /></span></div>
        <p className="scene-caption">Illustrative workflow · capabilities depend on your integrations</p>
      </div>
    </Container>
    <Container><div className="capability-strip"><span>ONE CONNECTED WORKFLOW</span><p>Answer calls</p><b aria-hidden="true">/</b><p>Book visits</p><b aria-hidden="true">/</b><p>Collect intake</p><b aria-hidden="true">/</b><p>Recover openings</p></div></Container>
  </section>;
}
