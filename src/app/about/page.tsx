import PageView, { pageMetadata } from "@/components/PageView";

export const metadata = pageMetadata("about");

export default function Page() {
  return <PageView slug="about" />;
}
