import PageView, { pageMetadata } from "@/components/PageView";

export const metadata = pageMetadata("terms-of-service");

export default function Page() {
  return <PageView slug="terms-of-service" />;
}
