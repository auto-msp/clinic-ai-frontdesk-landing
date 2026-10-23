import { ButtonLink, Container, Eyebrow, FlowDiagram } from "./ui";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-surface to-white pb-16 pt-16 md:pb-[72px] md:pt-[88px]">
      <Container className="grid items-center gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Eyebrow>AI front desk for clinics</Eyebrow>
          <h1 className="text-[clamp(2.1rem,5vw,3.5rem)] font-extrabold leading-[1.15] tracking-tight text-primary">
            An AI front desk that books visits and refills cancelled slots
          </h1>
          <p className="mb-3 mt-[18px] text-[1.15rem] font-semibold text-primary">
            Stop watching good appointment slots go to waste.
          </p>
          <p className="max-w-[640px] text-[1.1rem] text-body">
            Your assistant picks up every call, books the visit, gathers medical and insurance
            details, and rings the next person on your waitlist the moment a patient cancels.
          </p>
          <ul className="mb-7 mt-5">
            {["No manual call-backs", "No idle appointment slots", "No swamped reception desk"].map((t) => (
              <li key={t} className="relative my-1 pl-[26px] font-medium text-body">
                <span aria-hidden className="absolute left-0 font-bold text-accent">
                  ✕
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#demo">Request a Demo</ButtonLink>
            <ButtonLink href="#how" variant="outline">
              See How It Works
            </ButtonLink>
          </div>
        </div>

        {/* Placeholder: replace with your own photo or product shot. */}
        <div
          role="img"
          aria-label="Placeholder for hero image"
          className="reveal grid aspect-[4/3] place-items-center rounded-2xl bg-gradient-to-br from-primary via-[#1d5a8a] to-accent p-6 text-center font-semibold text-white shadow-card"
        >
          Hero image placeholder
          <br />
          (replace with your own photo)
        </div>
      </Container>

      <Container className="mt-10 scroll-mt-24" >
        <div id="how">
          <FlowDiagram
            label="How a cancelled slot gets refilled"
            steps={[
              { title: "Cancel", sub: "Patient cancels" },
              { title: "Match", sub: "Waitlist checked" },
              { title: "Call", sub: "AI phones patient" },
              { title: "Accept", sub: "Patient confirms" },
              { title: "Filled", sub: "Slot recovered" },
            ]}
          />
        </div>
      </Container>
    </section>
  );
}
