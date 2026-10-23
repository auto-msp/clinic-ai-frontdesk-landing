import PageView, { pageMetadata } from "@/components/PageView";

export const metadata = pageMetadata("case-studies");

export default function Page() {
  return <PageView slug="case-studies" />;
}
