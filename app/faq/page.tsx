import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Reveal } from "../components/Reveal";
import { ermittleSprache } from "../i18n/sprache";
import { TEXTE } from "../i18n/texte";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Häufige Fragen zu NIL: Leistungen, Ablauf, Preise, Datenschutz und mehr.",
};


export default async function FAQ() {
  const sprache = await ermittleSprache();
  const t = TEXTE[sprache];
  const FAQS = t.faq.fragen;
  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      <div className="page-grid" aria-hidden="true" />
      <Navbar sprache={sprache} />

      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 24px 100px" }}>
        <Reveal>
          <p className="kicker">
            {t.faq.overline}
          </p>
          <h1 className="h-section" style={{ marginBottom: "48px" }}>
            {t.faq.titel}
          </h1>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {FAQS.map((f, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <details className="faq-item">
                <summary>
                  {f.q}
                  <span className="faq-zeichen" aria-hidden="true" />
                </summary>
                <p className="faq-antwort">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div style={{ marginTop: "56px", textAlign: "center" }}>
            <p style={{ color: "var(--fg-muted)", fontSize: "14px", marginBottom: "20px" }}>
              {t.faq.frageNicht}
            </p>
            <Link href="/kontakt" className="btn btn-glass">
              {t.faq.kontaktCta}
            </Link>
          </div>
        </Reveal>
      </section>

      <Footer sprache={sprache} />
    </main>
  );
}
