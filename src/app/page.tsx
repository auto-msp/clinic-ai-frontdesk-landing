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
    </>
  );
}
