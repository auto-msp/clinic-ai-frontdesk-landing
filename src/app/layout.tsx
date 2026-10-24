import type { Metadata, Viewport } from "next";
import { Calistoga, Inter, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MotionRoot from "@/components/motion/MotionRoot";
import "./globals.css";

// Pairing from the UI/UX Pro Max typography search ("SaaS Boutique": editorial,
// human warmth, B2B): Calistoga for display, Inter for body and UI, JetBrains
// Mono for small labels. All self-hosted by next/font (no layout shift).
const calistoga = Calistoga({
  variable: "--font-calistoga",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  weight: "500",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const title = "YourBrand | AI Front Desk for Clinics";
const description =
  "Template landing page: an AI front desk that answers calls, books visits, gathers intake and refills cancelled slots from a waitlist.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | YourBrand" },
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
  // Template page: keep it out of search indexes until it carries real branding.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f6f1e8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${calistoga.variable} ${inter.variable} ${jetbrains.variable} antialiased`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <noscript>
          <style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <MotionRoot>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </MotionRoot>
      </body>
    </html>
  );
}
