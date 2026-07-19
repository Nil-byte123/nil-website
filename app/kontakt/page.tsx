import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ContactForm } from "../components/ContactForm";
import { Reveal } from "../components/Reveal";
import { ermittleSprache } from "../i18n/sprache";
import { TEXTE } from "../i18n/texte";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Fragen zu NIL, zum Launch oder zu Kooperationen? Schreib uns – wir melden uns schnellstmöglich zurück.",
};

export default async function Kontakt() {
  const sprache = await ermittleSprache();
  const t = TEXTE[sprache].kontakt;
  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      <div className="page-grid" aria-hidden="true" />
      <Navbar sprache={sprache} />

      <section style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 24px 100px" }}>
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
          <p style={{ color: "var(--fg-muted)", fontSize: "15px", lineHeight: 1.7, marginTop: "16px", marginBottom: "48px" }}>
            {t.text}
          </p>
        </Reveal>

        <ContactForm sprache={sprache} />

        <div style={{ marginTop: "48px", borderTop: "1px solid var(--line)", paddingTop: "32px" }}>
          <p style={{ color: "var(--fg-faint)", fontSize: "13px", lineHeight: 1.8 }}>
            {t.direkt}{" "}
            <a href="mailto:info@nilogik.de" style={{ color: "var(--fg)", fontWeight: 600 }}>
              info@nilogik.de
            </a>
          </p>
        </div>
      </section>

      <Footer sprache={sprache} />
    </main>
  );
}
