import PageView, { pageMetadata } from "@/components/PageView";

export const metadata = pageMetadata("product");

export default function Page() {
  return <PageView slug="product" />;
}
