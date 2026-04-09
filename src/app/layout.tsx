import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Geist_Mono,
  Manrope,
} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-jw-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-jw-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default:
      "JW Luxury Estate | Premium Housing Solutions With Business-Level Execution",
    template: "%s | JW Luxury Estate",
  },
  description:
    "JW Luxury Estate delivers furnished stays, corporate housing, and rental management with the professionalism, structure, and care that modern property partners expect.",
  applicationName: "JW Luxury Estate",
  keywords: [
    "JW Luxury Estate",
    "premium housing solutions",
    "corporate housing",
    "short-term rental management",
    "mid-term rental stays",
    "property partnership opportunities",
    "furnished stays",
    "property operations",
    "professionally managed living experiences",
  ],
  authors: [{ name: "JW Luxury Estate" }],
  creator: "JW Luxury Estate",
  publisher: "JW Luxury Estate",
  category: "Real Estate",
  openGraph: {
    title: "JW Luxury Estate",
    description:
      "Premium housing and property solutions for corporate stays, short-term rentals, and professionally managed living experiences.",
    siteName: "JW Luxury Estate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JW Luxury Estate",
    description:
      "Premium housing solutions with business-level execution.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
