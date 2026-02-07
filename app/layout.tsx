import React from "react";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Great_Vibes, Noto_Naskh_Arabic } from "next/font/google";
import { AuthProvider } from "@/contexts/auth-context";

import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
});

const notoArabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic",
});

export const metadata: Metadata = {
  title: "Mystical Beach | Luxury Beachfront Weddings & Retreats",
  description:
    "An ultra-premium, ethereal beach destination for unforgettable weddings, retreats, and transformative experiences. Where the ocean meets the soul.",
};

export const viewport: Viewport = {
  themeColor: "#2a6a6e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${greatVibes.variable} ${notoArabic.variable} scroll-smooth`}>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
