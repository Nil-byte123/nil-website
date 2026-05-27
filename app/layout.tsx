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
    default: "NIL – Automatisierung mit Verstand | nilogik.de",
    template: "%s | NIL",
  },
  description:
    "Intelligente KI-Agenten und maßgeschneiderte Softwarelösungen für Entwickler, Salons und Gastronomie. 24/7 verfügbar, ohne Personalaufwand.",
  keywords: [
    "KI-Automatisierung", "Künstliche Intelligenz", "KI-Agenten", "Chatbot",
    "Softwareentwicklung", "Salon Software", "Gastronomie Automatisierung",
    "nilogik", "NIL", "Bayern", "Automatisierung",
  ],
  authors: [{ name: "NIL", url: "https://www.nilogik.de" }],
  creator: "NIL",
  metadataBase: new URL("https://www.nilogik.de"),
  alternates: { canonical: "https://www.nilogik.de" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://www.nilogik.de",
    siteName: "NIL – Automatisierung mit Verstand",
    title: "NIL – Automatisierung mit Verstand",
    description:
      "Intelligente KI-Agenten und maßgeschneiderte Softwarelösungen. Wir machen die Abläufe für Entwickler, Salons und Gastronomie spürbar effizienter.",
    images: [{ url: "/icon.png", width: 612, height: 628, alt: "NIL Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "NIL – Automatisierung mit Verstand",
    description:
      "Intelligente KI-Agenten und maßgeschneiderte Softwarelösungen für Entwickler, Salons und Gastronomie.",
    images: ["/icon.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  manifest: "/manifest.webmanifest",
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
