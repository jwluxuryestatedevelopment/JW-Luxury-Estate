import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Geist,
  Geist_Mono,
} from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-jw-sans",
  subsets: ["latin"],
  display: "swap",
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
      "JW Luxury Estate | Premium Corporate Housing Beyond Hotels",
    template: "%s | JW Luxury Estate",
  },
  description:
    "JW Luxury Estate delivers premium furnished housing for companies, project teams, and professionals who need more space, privacy, and support than hotels provide.",
  applicationName: "JW Luxury Estate",
  keywords: [
    "JW Luxury Estate",
    "corporate housing",
    "mid-term rental stays",
    "premium furnished housing",
    "team housing",
    "furnished stays",
    "hotel alternative for corporate teams",
    "professionally managed housing",
  ],
  authors: [{ name: "JW Luxury Estate" }],
  creator: "JW Luxury Estate",
  publisher: "JW Luxury Estate",
  category: "Real Estate",
  openGraph: {
    title: "JW Luxury Estate",
    description:
      "Premium furnished housing for corporate teams, long-stay professionals, and project-based workforce needs.",
    siteName: "JW Luxury Estate",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JW Luxury Estate",
    description:
      "Premium corporate housing beyond hotels.",
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
      className={`${geist.variable} ${geistMono.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
