import type { Metadata, Viewport } from "next";
import { Figtree, Noto_Sans } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

// Pairing from the UI/UX Pro Max "Medical Clean" typography entry: Figtree for
// headings, Noto Sans for body. Both are self-hosted by next/font (no layout shift).
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const noto = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
  display: "swap",
});

const title = "AutoMSP AI Front Desk | AI Front Desk for Clinics";
const description =
  "Explore AI-powered call handling, appointment scheduling and waitlist workflows for your clinic.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | AutoMSP AI Front Desk" },
  description,
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
  // Template page: keep it out of search indexes until it carries real branding.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f7faf8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${figtree.variable} ${noto.variable} antialiased`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-ink focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
