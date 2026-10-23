import PageView, { pageMetadata } from "@/components/PageView";

export const metadata = pageMetadata("contact");

export default function Page() {
  return <PageView slug="contact" />;
}
