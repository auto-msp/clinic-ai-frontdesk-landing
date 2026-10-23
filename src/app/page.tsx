import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import {
  Audience,
  Dashboard,
  Demo,
  Impact,
  InsuranceIntake,
  MedicalIntake,
  NoShow,
  Problem,
  Receptionist,
  Scheduling,
  Security,
  WaitlistCalling,
} from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Problem />
        <WaitlistCalling />
        <Receptionist />
        <MedicalIntake />
        <InsuranceIntake />
        <Scheduling />
        <NoShow />
        <Dashboard />
        <Security />
        <Audience />
        <Impact />
        <Demo />
      </main>
      <Footer />
    </>
  );
}
