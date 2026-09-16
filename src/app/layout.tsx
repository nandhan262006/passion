import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Passion Photography | Wedding & Newborn Studio in Kurnool",
    template: "%s | Passion Photography",
  },
  description:
    "Passion Photography — Kurnool's trusted wedding & newborn studio (5.0 ★, 104 Google reviews). Weddings, newborns, maternity, portraits and events in Kurnool, Andhra Pradesh.",
  applicationName: "Passion Photography",
  icons: {
    icon: [{ url: "/logo.png", sizes: "any" }],
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Passion Photography",
    title: "Passion Photography | Wedding & Newborn Studio in Kurnool",
    description:
      "Weddings, newborns, maternity, portraits and event photography in Kurnool, Andhra Pradesh. Rated 5.0 on Google by 104 happy clients.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Passion Photography | Wedding & Newborn Studio in Kurnool",
    description:
      "Weddings, newborns, maternity, portraits and event photography in Kurnool, Andhra Pradesh.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}