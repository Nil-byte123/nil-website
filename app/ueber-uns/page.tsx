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
    "Die Idee hinter NIL: maßgeschneiderte Software-Lösungen aus Deutschland.",
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
          <p className="kicker">
            {t.overline}
          </p>
          <h1 className="h-section">
            {t.titel}
          </h1>
        </Reveal>

        <Reveal direction="scale">
          <div style={{ display: "flex", justifyContent: "center", margin: "64px 0 72px" }}>
            <NilLogoBox size={80} />
          </div>
        </Reveal>

        {/* Nummerierte Editorial-Blöcke */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {t.bloecke.map((b, i) => (
            <Reveal key={b.titel} delay={i * 0.08}>
              <div
                className="glass glass-hover"
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  gap: "28px",
                  padding: "32px 30px",
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
            <Link href="/#termin" className="btn btn-primary">
              {t.cta}
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer sprache={sprache} />
    </main>
  );
}
