import { bookingUrl } from "@/content/site";
import { ButtonLink, Container } from "@/components/ui";
export const metadata = { title: "Book a demo" };
export default function BookDemo() {
 return <section className="booking-page"><Container><p className="eyebrow">AUTOMSP AI FRONT DESK</p><h1>Let’s make room<br />for better patient experiences.</h1><p className="booking-lead">Explore call handling, scheduling and intake with a walkthrough tailored to your practice.</p><div className="booking-panel"><div><h2>Your workflow. Your questions.</h2><ul><li>Review your current front-desk process</li><li>Explore the workflows that fit your team</li><li>Discuss integrations and next steps</li></ul></div><div>{bookingUrl ? <><h2>Choose a time that works.</h2><p>Continue to our booking calendar to see available appointments.</p><ButtonLink href={bookingUrl} arrow>Open booking calendar</ButtonLink></> : <><h2>Booking opens soon.</h2><p>Online appointment booking is not available yet. In the meantime, explore how the platform could support your practice.</p><ButtonLink href="/product" arrow>Explore the platform</ButtonLink></>}</div></div></Container></section>;
}
