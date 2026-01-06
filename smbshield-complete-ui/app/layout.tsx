import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ScrollProgress } from "@/components/animated/scroll-progress";
import { SmoothScroll } from "@/components/animated/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { UserProvider } from "@/contexts/user-context";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { JsonLd } from "@/components/seo/json-ld";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "SMBShield | AI Security Intelligence for European SMBs",
    template: "%s | SMBShield",
  },
  description: "Weekly threat briefings on OWASP LLM vulnerabilities + AI security advisor. Built for SMBs using ChatGPT, Claude & AI agents. Free tier available.",
  keywords: [
    "AI security for SMB",
    "OWASP LLM top 10",
    "GenAI security",
    "EU AI Act compliance",
    "prompt injection protection",
    "AI threat intelligence",
    "SMB cybersecurity",
    "LLM vulnerabilities",
    "AI safety",
    "European SMB security",
  ],
  authors: [{ name: "SMBShield" }],
  creator: "SMBShield",
  publisher: "SMBShield",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://smbshield.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://smbshield.com",
    siteName: "SMBShield",
    title: "SMBShield | AI Security Intelligence for European SMBs",
    description: "Weekly threat briefings on OWASP LLM vulnerabilities + AI security advisor. Built for SMBs using ChatGPT, Claude & AI agents. Free tier available.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SMBShield - AI Security Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SMBShield | AI Security Intelligence for European SMBs",
    description: "Weekly threat briefings on OWASP LLM vulnerabilities + AI security advisor. Free tier available.",
    images: ["/og-image.png"],
    creator: "@smbshield",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes when ready
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* JSON-LD Structured Data */}
        <JsonLd />
      </head>
      <body className={inter.className}>
        <SmoothScroll>
          <UserProvider>
            <ScrollProgress />
            <ScrollToTop />
            <ExitIntentPopup />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </UserProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
