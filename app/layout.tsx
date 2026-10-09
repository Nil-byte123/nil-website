import "./globals.css";
import { Geist } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers";
import GoogleAnalytics from "./components/GoogleAnalytics";
import CookieBanner from "./components/CookieBanner";
import { ermittleSprache } from "./i18n/sprache";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:  "NIL – Maßgeschneiderte KI- & Software-Lösungen",
    template: "%s | NIL",
  },
  description:
    "Beschreib uns dein Problem, wir bauen die passende KI- oder Software-Lösung. Individuell statt von der Stange, projektbasiert, entwickelt in Deutschland.",
  keywords: [
    "KI-Lösungen", "Custom AI", "Softwareentwicklung", "Automatisierung",
    "individuelle Software", "KI-Assistent", "Kiosk-App", "Prozessautomatisierung",
    "nilogik", "NIL", "Made in Germany", "DSGVO",
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
    title:       "NIL – Maßgeschneiderte KI- & Software-Lösungen",
    description: "Beschreib uns dein Problem, wir bauen die passende Lösung. Individuell, projektbasiert, entwickelt in Deutschland.",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "NIL – Maßgeschneiderte KI- & Software-Lösungen",
    description: "Beschreib uns dein Problem, wir bauen die passende Lösung. Individuell, projektbasiert, entwickelt in Deutschland.",
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
  "alternateName": "NIL – KI- & Software-Lösungen",
  "url":      "https://www.nilogik.de",
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Read the per-request nonce injected by middleware.
  // Server Components receive it via the x-nonce request header.
  const nonce = (await headers()).get("x-nonce") ?? "";
  const sprache = await ermittleSprache();

  return (
    <html lang={sprache}>
      <head>
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="apple-mobile-web-app-capable"        content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" content="#080B14" />
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
        <CookieBanner sprache={sprache} />
      </body>
    </html>
  );
}
