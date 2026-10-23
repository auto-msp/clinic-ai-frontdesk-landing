import PageView, { pageMetadata } from "@/components/PageView";

export const metadata = pageMetadata("pricing");

export default function Page() {
  return <PageView slug="pricing" />;
}
