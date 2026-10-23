import Hero from "@/components/Hero";
import { Audience, Demo, Explore, Impact, Problem } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem />
      <Explore />
      <Audience />
      <Impact />
      <Demo />
    </>
  );
}
