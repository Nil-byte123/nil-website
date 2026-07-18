import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { NilLogoBox } from "../components/NilLogo";
import { ermittleSprache } from "../i18n/sprache";
import { TEXTE } from "../i18n/texte";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Die Geschichte hinter NIL – Streetwear aus Deutschland. Schwarz, weiß, reduziert. Gegründet mit einer klaren Vision.",
};

export default async function UeberUns() {
  const sprache = await ermittleSprache();
  const t = TEXTE[sprache].ueberUns;
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar sprache={sprache} />

      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 24px 100px" }}>
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
          {t.overline}
        </p>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "40px" }}>
          {t.titel}
        </h1>

        <div style={{ textAlign: "center", margin: "48px 0" }}>
          <NilLogoBox size={72} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {t.bloecke.map((b) => (
            <Block key={b.titel} title={b.titel}>
              {b.text}
            </Block>
          ))}
        </div>

        <div
          style={{
            marginTop: "64px",
            borderTop: "1px solid var(--line)",
            paddingTop: "40px",
            textAlign: "center",
          }}
        >
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
            {t.cta}
          </Link>
        </div>
      </section>

      <Footer sprache={sprache} />
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: "2px solid var(--line-strong)", paddingLeft: "24px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "10px" }}>
        {title}
      </h2>
      <p style={{ color: "var(--fg-muted)", fontSize: "15px", lineHeight: 1.8 }}>{children}</p>
    </div>
  );
}
