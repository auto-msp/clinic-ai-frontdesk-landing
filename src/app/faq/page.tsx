import PageView, { pageMetadata } from "@/components/PageView";

export const metadata = pageMetadata("faq");

export default function Page() {
  return <PageView slug="faq" />;
}
