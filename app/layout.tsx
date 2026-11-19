import type { Metadata, Viewport } from "next";
import "./globals.css";
import { WhopPixelScript } from "@/components/WhopPixelScript";
import { roofingConfig } from "@/config/roofing.config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: `${roofingConfig.company.name} | Certified US Roofing & Restoration`,
  description: `${roofingConfig.company.tagline}. High-ticket residential shingle systems, commercial flat roofing, and certified storm restorations in ${roofingConfig.serviceArea.primaryCounty}.`,
  keywords: [
    "roofing company",
    "roof repair",
    "roof replacement",
    "drone roof inspection",
    "Whop Websites",
    "Whop Elements",
    "GAF Master Elite",
    "storm damage repair",
  ],
  authors: [{ name: roofingConfig.company.name }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <WhopPixelScript />
      </head>
      <body className="antialiased bg-slate-950 text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
