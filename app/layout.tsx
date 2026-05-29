import "./globals.css";
import { Geist } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieBanner from "./components/CookieBanner";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:  "NIL – Smarte Automatisierung für jedes Unternehmen",
    template: "%s | NIL",
  },
  description:
    "KI-Assistent für Handwerk, Gastronomie und Dienstleister in Bayern. Kundenanfragen automatisch beantworten – rund um die Uhr.",
  keywords: [
    "KI Assistent Bayern", "KI Automatisierung Bayern", "Automatisierung", "Softwarelösung",
    "Digitalisierung", "Terminbuchung", "Softwareentwicklung", "Unternehmensautomatisierung",
    "Gastronomie Automatisierung", "Handwerk Automatisierung", "nilogik", "NIL",
    "München", "Augsburg", "digitaler Assistent",
  ],
  authors:     [{ name: "NIL", url: "https://www.nilogik.de" }],
  creator:     "NIL",
  metadataBase: new URL("https://www.nilogik.de"),
  alternates:  { canonical: "https://www.nilogik.de" },
  openGraph: {
    type:        "website",
    locale:      "de_DE",
    url:         "https://www.nilogik.de",
    siteName:    "NIL",
    title:       "NIL – Smarte Automatisierung für jedes Unternehmen",
    description: "Smarte Softwarelösungen und digitale Automatisierung für Unternehmen jeder Branche. Mehr Zeit, mehr Umsatz – automatisch.",
    images:      [{ url: "/icon.png", width: 612, height: 628, alt: "NIL Logo" }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "NIL – Smarte Automatisierung für jedes Unternehmen",
    description: "Smarte Softwarelösungen und digitale Automatisierung für Unternehmen jeder Branche. Mehr Zeit, mehr Umsatz – automatisch.",
    images:      ["/icon.png"],
  },
  robots:   { index: true, follow: true, googleBot: { index: true, follow: true } },
  manifest: "/manifest.webmanifest",
  verification: { google: "tdilSSP9AOFmptpA" },
};

/** Structured data — constant, never built from user input */
const STRUCTURED_DATA = JSON.stringify({
  "@context": "https://schema.org",
  "@type":    "WebSite",
  "name":     "NIL",
  "alternateName": "NIL – Smarte Automatisierung",
  "url":      "https://www.nilogik.de",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read the per-request nonce injected by middleware.
  // Server Components receive it via the x-nonce request header.
  const nonce = (await headers()).get("x-nonce") ?? "";

  return (
    <html lang="de">
      <head>
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="apple-mobile-web-app-capable"        content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#0F172A" />
        {/*
          JSON-LD is type="application/ld+json" — browsers never execute it as JS.
          We still supply the nonce so strict CSP policies don't flag the tag.
        */}
        <script
          nonce={nonce}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: STRUCTURED_DATA }}
        />
      </head>
      <body className={geist.className}>
        {/* Pass nonce to Client Component so next/script can apply it */}
        <GoogleAnalytics nonce={nonce} />
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
