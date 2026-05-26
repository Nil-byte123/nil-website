import "./globals.css";
import { Geist } from "next/font/google";
import type { Metadata } from "next";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NIL – Automatisierung mit Verstand",
  description: "Intelligente KI-Agenten und maßgeschneiderte Softwarelösungen für Entwickler, Salons und Gastronomie.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={geist.className}>
        {children}
      </body>
    </html>
  );
}