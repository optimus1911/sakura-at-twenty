import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Caveat } from "next/font/google";
import "./globals.css";

const serifFont = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const scriptFont = Caveat({
  variable: "--font-handwriting",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sakura at Twenty — A Birthday Dreamscape",
  description: "An interactive Japanese-inspired birthday dreamscape dedicated to a friend turning 20 on 17 October 2026.",
  keywords: ["Sakura at Twenty", "Birthday Dreamscape", "Three.js", "NEET Aspirant", "Interactive 3D"],
};

export const viewport: Viewport = {
  themeColor: "#30263F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} ${scriptFont.variable} h-full antialiased selection:bg-rose-200 selection:text-plum-950`}
    >
      <body className="min-h-full bg-[#30263F] text-[#FFF8F1] overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
