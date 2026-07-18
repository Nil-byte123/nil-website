import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { PRODUKTE } from "./produkte";
import { ermittleSprache } from "../i18n/sprache";
import { TEXTE } from "../i18n/texte";
import { ProduktBild } from "./[slug]/ProduktDetail";

export const metadata: Metadata = {
  title: "Shop – Vorschau",
  description:
    "Der erste NIL Drop: Hoodies, T-Shirts und Caps in Schwarz/Weiß. Bald verfügbar – trag dich auf die Warteliste ein.",
};

export default async function Shop() {
  const sprache = await ermittleSprache();
  const t = TEXTE[sprache];
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar sprache={sprache} />

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
          {t.shop.overline}
        </p>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
          {t.shop.titel}
        </h1>
        <p style={{ color: "var(--fg-muted)", fontSize: "15px", lineHeight: 1.7, marginTop: "16px", maxWidth: "560px" }}>
          {t.shop.introVor}
          <Link href="/#warteliste" style={{ color: "var(--fg)", fontWeight: 600 }}>
            {t.shop.introLink}
          </Link>
          {t.shop.introNach}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gridAutoRows: "1fr",
            gap: "20px",
            marginTop: "56px",
            alignItems: "stretch",
          }}
        >
          {PRODUKTE.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} fill>
              <Link
                href={`/shop/${p.slug}`}
                className="card-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid var(--line)",
                  background: "var(--bg-soft)",
                }}
              >
                <div
                  className="img-zoom"
                  style={{
                    aspectRatio: "1 / 1",
                    borderBottom: "1px solid var(--line)",
                    overflow: "hidden",
                  }}
                >
                  <ProduktBild farbe="Schwarz" slug={p.slug} />
                </div>
                <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      alignSelf: "flex-start",
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
                    {t.shop.badge}
                  </div>
                  <p style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em" }}>{p.name}</p>
                  <p style={{ color: "var(--fg-faint)", fontSize: "12px", marginTop: "4px", flex: 1 }}>
                    {p.typ} · {p.farben.map((f) => t.produkt.farbNamen[f]).join(" / ")}
                  </p>
                  <p style={{ fontSize: "14px", fontWeight: 700, marginTop: "10px" }}>{p.preis}</p>
                </div>
              </Link>
            </Reveal>
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
            {t.shop.boxTitel}
          </h2>
          <p style={{ color: "var(--fg-muted)", fontSize: "14px", marginTop: "10px", marginBottom: "24px" }}>
            {t.shop.boxText}
          </p>
          <Link
            href="/#warteliste"
            className="btn-solid"
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
            {t.shop.boxCta}
          </Link>
        </div>
      </section>

      <Footer sprache={sprache} />
    </main>
  );
}
