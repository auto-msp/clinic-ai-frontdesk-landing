import { CheckIcon } from "./icons";
import { FrontDeskMock } from "./Mockups";
import { ButtonLink, Container, Steps } from "./ui";

export default function Hero() {
  return (
    <section id="top" className="overflow-x-clip border-b border-line">
      <Container className="grid items-center gap-14 pb-16 pt-14 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-28">
        <div>
          <p className="t-eyebrow mb-7 text-accent">AI front desk for clinics</p>
          <h1 className="t-display">Books visits and refills cancelled slots, on its own.</h1>
          <p className="t-lead mt-8 max-w-[44ch] text-body">
            Your assistant picks up every call, books the visit, gathers medical and insurance details, and
            rings the next person on your waitlist the moment a patient cancels.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <ButtonLink href="#demo" arrow>
              Request a demo
            </ButtonLink>
            <ButtonLink href="#how" variant="secondary">
              See how it works
            </ButtonLink>
          </div>
          <ul className="mt-12 flex flex-wrap gap-x-7 gap-y-2 border-t border-line pt-6 text-base text-ink">
            {["No manual call-backs", "No idle appointment slots", "No swamped reception desk"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <CheckIcon className="size-5 shrink-0 text-accent" />
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:-mr-12 xl:-mr-24">
          <FrontDeskMock />
        </div>
      </Container>

      <div id="how" className="border-t border-line bg-surface py-14 md:py-16">
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
      </div>
    </section>
  );
}
