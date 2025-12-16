import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ScrollProgress } from "@/components/animated/scroll-progress";
import { SmoothScroll } from "@/components/animated/smooth-scroll";
import { ScrollToTop } from "@/components/scroll-to-top";
import { Navbar } from "@/components/navigation/navbar";
import { Footer } from "@/components/navigation/footer";
import { UserProvider } from "@/contexts/user-context";
import { ExitIntentPopup } from "@/components/exit-intent-popup";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SMBShield - AI Security Intelligence for European SMBs",
  description: "Weekly security briefings, OWASP vulnerabilities, GenAI threats, and EU compliance updates in plain language.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
