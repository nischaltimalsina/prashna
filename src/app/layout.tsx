import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PledgePoint - Civic Platform for Democratic Accountability",
  description:
    "PledgePoint empowers Nepali citizens to rate, review, and engage with their elected officials for a more transparent democracy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClientBody>
            <div className="flex flex-col min-h-screen">
              <SiteHeader />
              <main className="max-w-screen-xl w-full mx-auto flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
          </ClientBody>
          <Toaster/>
        </ThemeProvider>
      </body>
    </html>
  );
}
