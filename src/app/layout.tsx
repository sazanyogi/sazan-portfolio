import type { Metadata } from "next";
import { Syne, Space_Mono, DM_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";
import ThemeProvider from "@/components/ThemeProvider";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "700", "800"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Sajan Yogi — Portfolio",
  description: "Creative technologist, data analyst, and photographer based in Stoney Creek, Ontario. Building brands through AI, data, and digital products.",
  authors: [{ name: "Sajan Yogi" }],
  openGraph: {
    title: "Sajan Yogi — Portfolio",
    description: "Creative technologist, data analyst, and photographer.",
    url: "https://sazan.com.np",
    type: "website",
    images: [{ url: "https://sazan.com.np/Images/Favourite/2J9A5623.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sajan Yogi — Portfolio",
    description: "Creative technologist, data analyst, and photographer based in Ontario.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable} ${dmSans.variable} ${bricolage.variable}`}>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <Cursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
