import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Instagram Grid Planner",
  description: "Plan and preview your Instagram grid layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
