import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { ermittleSprache } from "../i18n/sprache";
import { TEXTE } from "../i18n/texte";
import { DEMOS } from "./demos";

export const metadata: Metadata = {
  title: "Website-Vorlagen",
  description:
    "Beispiel-Websites, die NIL für verschiedene Branchen baut: Restaurant, Handwerk, Friseur und mehr. Zum Anschauen und Ausprobieren.",
};

export default async function Vorlagen() {
  const sprache = await ermittleSprache();
  const t = TEXTE[sprache];
  const v = t.vorlagen;

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      <div className="page-grid" aria-hidden="true" />
      <Navbar sprache={sprache} />

      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "80px 24px 100px" }}>
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
            {v.overline}
          </p>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            {v.titel}
          </h1>
          <p style={{ color: "var(--fg-muted)", fontSize: "16px", lineHeight: 1.7, marginTop: "16px", maxWidth: "620px" }}>
            {v.text}
          </p>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gridAutoRows: "1fr",
            gap: "24px",
            marginTop: "56px",
          }}
        >
          {DEMOS.map((d, i) => (
            <Reveal key={d.slug} delay={i * 0.1} fill>
              <Link
                href={`/vorlagen/${d.slug}`}
                className="card-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  textDecoration: "none",
                  color: "inherit",
                  border: "1px solid var(--line)",
                  background: "var(--bg-soft)",
                  overflow: "hidden",
                }}
              >
                {/* Farb-Vorschau */}
                <div style={{ display: "flex", height: "120px" }}>
                  {d.farben.map((c) => (
                    <div key={c} style={{ flex: 1, background: c }} />
                  ))}
                </div>
                <div style={{ padding: "24px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span
                    style={{
                      alignSelf: "flex-start",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--accent-2)",
                      border: "1px solid var(--line)",
                      padding: "4px 10px",
                      marginBottom: "16px",
                    }}
                  >
                    {d.branche}
                  </span>
                  <h3 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "10px" }}>
                    {d.name}
                  </h3>
                  <p style={{ color: "var(--fg-muted)", fontSize: "14px", lineHeight: 1.7, flex: 1 }}>
                    {d.beschreibung}
                  </p>
                  <span style={{ marginTop: "18px", color: "var(--accent-2)", fontSize: "13px", fontWeight: 700, letterSpacing: "0.04em" }}>
                    {v.ansehen} →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: "64px",
            border: "1px solid var(--line)",
            background: "var(--bg-soft)",
            padding: "40px 32px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>{v.boxTitel}</h2>
          <p style={{ color: "var(--fg-muted)", fontSize: "14px", marginTop: "10px", marginBottom: "24px" }}>
            {v.boxText}
          </p>
          <Link
            href="/kontakt"
            className="btn-solid btn-puls"
            style={{
              display: "inline-block",
              textDecoration: "none",
              background: "var(--accent)",
              color: "var(--accent-fg)",
              padding: "14px 32px",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {v.boxCta}
          </Link>
        </div>
      </section>

      <Footer sprache={sprache} />
    </main>
  );
}
