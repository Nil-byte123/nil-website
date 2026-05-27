import "./globals.css";
import { Geist } from "next/font/google";
import type { Metadata } from "next";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieBanner from "./components/CookieBanner";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "NIL – Smarte Automatisierung für jedes Unternehmen",
    template: "%s | NIL",
  },
  description:
    "Smarte Softwarelösungen und digitale Automatisierung für Unternehmen jeder Branche. Mehr Zeit, mehr Umsatz – automatisch. 24/7 verfügbar, ohne Personalaufwand.",
  keywords: [
    "Automatisierung", "Softwarelösung", "Digitalisierung", "Terminbuchung",
    "Softwareentwicklung", "Unternehmensautomatisierung", "Gastronomie Automatisierung",
    "nilogik", "NIL", "Bayern", "digitaler Assistent",
  ],
  authors: [{ name: "NIL", url: "https://nilogik.de" }],
  creator: "NIL",
  metadataBase: new URL("https://nilogik.de"),
  alternates: { canonical: "https://nilogik.de" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://nilogik.de",
    siteName: "NIL",
    title: "NIL – Smarte Automatisierung für jedes Unternehmen",
    description:
      "Smarte Softwarelösungen und digitale Automatisierung für Unternehmen jeder Branche. Mehr Zeit, mehr Umsatz – automatisch.",
    images: [{ url: "/icon.png", width: 612, height: 628, alt: "NIL Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIL – Smarte Automatisierung für jedes Unternehmen",
    description:
      "Smarte Softwarelösungen und digitale Automatisierung für Unternehmen jeder Branche. Mehr Zeit, mehr Umsatz – automatisch.",
    images: ["/icon.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  manifest: "/manifest.webmanifest",
  verification: { google: "tdilSSP9AOFmptpA" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#0F172A" />
      </head>
      <body className={geist.className}>
        <GoogleAnalytics />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
