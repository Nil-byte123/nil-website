import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { NilLogo } from "../components/NilLogo";

export const metadata: Metadata = {
  title: "Shop – Vorschau",
  description:
    "Der erste NIL Drop: Hoodies, T-Shirts und Caps in Schwarz/Weiß. Bald verfügbar – trag dich auf die Warteliste ein.",
};

/* Platzhalter-Produkte — werden nach dem Launch durch echte
   Printify-Produkte mit Fotos und Preisen ersetzt. */
const PRODUCTS = [
  { name: "NIL Block Hoodie", type: "Hoodie", color: "Schwarz" },
  { name: "NIL Block Hoodie", type: "Hoodie", color: "Weiß" },
  { name: "NIL Oversized Tee", type: "T-Shirt", color: "Schwarz" },
  { name: "NIL Oversized Tee", type: "T-Shirt", color: "Weiß" },
  { name: "NIL Cap", type: "Cap", color: "Schwarz" },
  { name: "NIL Crewneck", type: "Sweater", color: "Schwarz" },
];

export default function Shop() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px 100px" }}>
        <p
          style={{
            color: "var(--fg-faint)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Vorschau
        </p>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
          Der erste Drop
        </h1>
        <p style={{ color: "var(--fg-muted)", fontSize: "15px", lineHeight: 1.7, marginTop: "16px", maxWidth: "560px" }}>
          Das ist die Vorschau auf den ersten NIL Drop. Kaufen ist noch nicht
          möglich – trag dich auf die{" "}
          <Link href="/#warteliste" style={{ color: "var(--fg)", fontWeight: 600 }}>
            Warteliste
          </Link>{" "}
          ein, dann bekommst du Bescheid, sobald es losgeht.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "20px",
            marginTop: "56px",
          }}
        >
          {PRODUCTS.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>

        <div
          style={{
            marginTop: "64px",
            border: "1px solid var(--line)",
            background: "var(--bg-soft)",
            padding: "40px 32px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>
            Nichts verpassen
          </h2>
          <p style={{ color: "var(--fg-muted)", fontSize: "14px", marginTop: "10px", marginBottom: "24px" }}>
            Preise, Fotos und Launch-Datum kommen zuerst an die Warteliste.
          </p>
          <Link
            href="/#warteliste"
            style={{
              display: "inline-block",
              textDecoration: "none",
              background: "#FAFAFA",
              color: "#0A0A0A",
              padding: "14px 32px",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Zur Warteliste
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ProductCard({ name, type, color }: { name: string; type: string; color: string }) {
  const dark = color === "Schwarz";
  return (
    <div style={{ border: "1px solid var(--line)", background: "var(--bg-soft)" }}>
      {/* Platzhalter-Bild: schwarze/weiße Fläche mit NIL Schriftzug */}
      <div
        style={{
          aspectRatio: "1 / 1",
          background: dark ? "#000000" : "#F5F5F5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <NilLogo size={64} variant={dark ? "weiss" : "schwarz"} />
      </div>
      <div style={{ padding: "18px 20px" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--fg-faint)",
            border: "1px solid var(--line)",
            padding: "3px 8px",
            marginBottom: "12px",
          }}
        >
          Bald verfügbar
        </div>
        <p style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em" }}>{name}</p>
        <p style={{ color: "var(--fg-faint)", fontSize: "12px", marginTop: "4px" }}>
          {type} · {color}
        </p>
      </div>
    </div>
  );
}
