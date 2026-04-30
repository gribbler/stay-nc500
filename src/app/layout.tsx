import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Stay NC500 — Accommodation & Travel Guide",
  description:
    "Find hotels, B&Bs, self-catering, and camping along the North Coast 500 route in the Scottish Highlands. Explore towns, events, and plan your perfect NC500 trip.",
  keywords: ["NC500", "North Coast 500", "Scotland accommodation", "Highland hotels", "Scottish Highlands travel"],
  openGraph: {
    title: "Stay NC500 — Accommodation & Travel Guide",
    description:
      "Find accommodation and plan your journey along Scotland's legendary North Coast 500 route.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-highland font-sans text-cream">
        <Navigation />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
