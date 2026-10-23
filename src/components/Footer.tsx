import { cacheLife } from "next/cache";
import { Container } from "./ui";

export default async function Footer() {
  // Cache Components forbids reading the clock during prerender unless the
  // result is cached. Refresh once a day so the year rolls over on its own.
  "use cache";
  cacheLife("days");

  return (
    <footer className="border-t border-line bg-paper py-10 text-sm text-subtle">
      <Container className="flex flex-wrap items-center justify-between gap-3">
        <span>© {new Date().getFullYear()} YourBrand. Template, not an official site.</span>
        <span>Add your Privacy, Terms and Contact links before launch.</span>
      </Container>
    </footer>
  );
}
