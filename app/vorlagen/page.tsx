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
          <p className="kicker">
            {v.overline}
          </p>
          <h1 className="h-section">
            {v.titel}
          </h1>
          <p className="lead" style={{ maxWidth: "620px" }}>
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
                className="glass glass-hover"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                {/* Farb-Vorschau */}
                <div style={{ display: "flex", height: "120px" }}>
                  {d.farben.map((c) => (
                    <div key={c} style={{ flex: 1, background: c }} />
                  ))}
                </div>
                <div style={{ padding: "24px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span className="tag" style={{ alignSelf: "flex-start", marginBottom: "16px" }}>
                    {d.branche}
                  </span>
                  <h3 className="h-karte" style={{ fontSize: "22px", marginBottom: "10px" }}>
                    {d.name}
                  </h3>
                  <p className="text-karte" style={{ flex: 1 }}>
                    {d.beschreibung}
                  </p>
                  <span className="link-pfeil" style={{ marginTop: "18px" }}>
                    {v.ansehen} →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div
          className="glass"
          style={{
            marginTop: "64px",
            padding: "40px 32px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.02em" }}>{v.boxTitel}</h2>
          <p style={{ color: "var(--fg-muted)", fontSize: "14px", marginTop: "10px", marginBottom: "24px" }}>
            {v.boxText}
          </p>
          <Link href="/kontakt" className="btn btn-primary">
            {v.boxCta}
          </Link>
        </div>
      </section>

      <Footer sprache={sprache} />
    </main>
  );
}
