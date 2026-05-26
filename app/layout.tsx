import "./globals.css";
import { Geist } from "next/font/google";
import type { Metadata } from "next";
import GoogleAnalytics from "./components/GoogleAnalytics";

const geist = Geist({
  subsets: ["latin"],
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
    "Softwareentwicklung", "Salon Software", "Gastronomie Automatisierung", "nilogik", "NIL",
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
    card: "summary",
    title: "NIL – Automatisierung mit Verstand",
    description: "Intelligente KI-Agenten und maßgeschneiderte Softwarelösungen für Entwickler, Salons und Gastronomie.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={geist.className}>
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
