import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "UPayLess Auto Repair | Trusted Auto Repair in Simi Valley",
  description:
    "Need a mechanic in Simi Valley? UPayLess Auto Repair provides expert auto repair, brakes, suspension, and oil changes with fair prices and fast, reliable service.",
  openGraph: {
    title: "UPayLess Auto Repair | Trusted Auto Repair in Simi Valley",
    description:
      "Expert auto repair, brakes, suspension, and oil changes with fair prices and fast, reliable service in Simi Valley.",
    url: "https://upaylessauto.com",
    siteName: "UPayLess Auto Repair",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
