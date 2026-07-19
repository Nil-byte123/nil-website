import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { NilLogoBox } from "../components/NilLogo";
import { Reveal } from "../components/Reveal";
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
    <main style={{ minHeight: "100vh", position: "relative" }}>
      <div className="page-grid" aria-hidden="true" />
      <Navbar sprache={sprache} />

      <section style={{ maxWidth: "820px", margin: "0 auto", padding: "80px 24px 100px" }}>
        <Reveal>
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
          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
            }}
          >
            {t.titel}
          </h1>
        </Reveal>

        <Reveal direction="scale">
          <div style={{ display: "flex", justifyContent: "center", margin: "64px 0 72px" }}>
            <NilLogoBox size={80} />
          </div>
        </Reveal>

        {/* Nummerierte Editorial-Blöcke */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {t.bloecke.map((b, i) => (
            <Reveal key={b.titel} delay={i * 0.08}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "28px",
                  padding: "36px 0",
                  borderTop: "1px solid var(--line)",
                  borderBottom: i === t.bloecke.length - 1 ? "1px solid var(--line)" : "none",
                }}
              >
                <span
                  style={{
                    fontSize: "clamp(28px, 4vw, 40px)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "var(--fg-faint)",
                    lineHeight: 1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2
                    style={{
                      fontSize: "21px",
                      fontWeight: 800,
                      letterSpacing: "-0.02em",
                      marginBottom: "12px",
                    }}
                  >
                    {b.titel}
                  </h2>
                  <p style={{ color: "var(--fg-muted)", fontSize: "15px", lineHeight: 1.85 }}>
                    {b.text}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div style={{ marginTop: "64px", textAlign: "center" }}>
            <Link
              href="/#warteliste"
              className="btn-solid btn-puls"
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
        </Reveal>
      </section>

      <Footer sprache={sprache} />
    </main>
  );
}
