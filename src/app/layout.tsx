import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const title = "YourBrand | AI Front Desk for Clinics";
const description =
  "Template landing page: an AI front desk that answers calls, books visits, gathers intake and refills cancelled slots from a waitlist.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
  // Template page: keep it out of search indexes until it carries real branding.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0f2e52",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
