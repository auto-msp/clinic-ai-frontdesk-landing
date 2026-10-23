import { cacheLife } from "next/cache";
import { Container } from "./ui";

export default async function Footer() {
  // Cache Components forbids reading the clock during prerender unless the
  // result is cached. Refresh once a day so the year rolls over on its own.
  "use cache";
  cacheLife("days");

  return (
    <footer className="bg-[#0a2140] py-9 text-[0.85rem] text-[#9fb3cc]">
      <Container className="flex flex-wrap justify-between gap-3">
        <span>© {new Date().getFullYear()} YourBrand. Template, not an official site.</span>
        <span>Privacy · Terms · Contact</span>
      </Container>
    </footer>
  );
}
