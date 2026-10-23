import Hero from "@/components/Hero";
import { Audience, Demo, Explore, Impact, Problem, Tour } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Tour />
      <Explore />
      <Audience />
      <Impact />
      <Demo />
    </>
  );
}
