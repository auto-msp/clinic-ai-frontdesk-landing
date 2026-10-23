import Link from "next/link";
import Hero from "@/components/Hero";
import { ButtonLink, Container } from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";
import { demoHref } from "@/content/site";
const workflows = [
  { n: "01", title: "Keep the conversation going.", text: "Give callers a clear next step, even when your reception team is busy helping someone in person.", href: "/product", link: "AI call handling", icon: "call" },
  { n: "02", title: "Give open slots another chance.", text: "Connect cancellations to a waitlist workflow that helps the next suitable patient find a time.", href: "/solutions/waitlist-automation", link: "Waitlist automation", icon: "calendar" },
  { n: "03", title: "Start the visit better prepared.", text: "Gather the details your team needs before the appointment, with clear handoffs for review.", href: "/solutions/medical-intake", link: "Patient intake", icon: "intake" },
];
export default function Home() {
  return <><Hero />
    <section className="workflow-section"><Container>
      <div className="section-intro"><div><p className="eyebrow">LESS ADMIN. MORE ATTENTION.</p><h2>Support for the work<br />between every visit.</h2></div><p>Build a front desk that feels connected.<br />Explore each workflow in detail.</p></div>
      <div className="workflow-grid">{workflows.map(w=><Link href={w.href} className="workflow-card" key={w.n}><div className="card-number"><span>{w.n}</span><ArrowRightIcon className="size-5" /></div><h3>{w.title}</h3><p>{w.text}</p><span className="card-link">{w.link}</span></Link>)}</div>
    </Container></section>
    <section className="human-section"><Container className="human-grid"><div><p className="eyebrow">AUTOMATION WITH BOUNDARIES</p><h2>Your team stays<br />at the center.</h2><p>Good automation knows when to hand over. Shape the experience around your scheduling rules, your staff and the systems you already use.</p><ButtonLink href="/implementation" variant="secondary">How implementation works</ButtonLink></div><ol className="principle-list"><li><span>01</span><div><h3>Your rules, first.</h3><p>Agree on visit types, availability and escalation paths before a rollout.</p></div></li><li><span>02</span><div><h3>A clear path to a person.</h3><p>Define handoffs for clinical questions and requests that need staff attention.</p></div></li><li><span>03</span><div><h3>Start focused. Review together.</h3><p>Test one workflow, review the outcomes and decide what comes next.</p></div></li></ol></Container></section>
    <section className="closing-section"><Container><div className="closing-panel"><div><p className="eyebrow">LET’S TALK ABOUT YOUR PRACTICE</p><h2>See what a calmer<br />front desk could look like.</h2><p>A focused walkthrough, built around your workflow.</p></div><ButtonLink href={demoHref} arrow>Book a demo</ButtonLink></div></Container></section>
  </>;
}
