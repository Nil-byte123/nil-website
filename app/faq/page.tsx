import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ermittleSprache } from "../i18n/sprache";
import { TEXTE } from "../i18n/texte";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Häufige Fragen zu NIL: Launch, Warteliste, Produkte, Versand und mehr.",
};


export default async function FAQ() {
  const sprache = await ermittleSprache();
  const t = TEXTE[sprache];
  const FAQS = t.faq.fragen;
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
          {t.faq.overline}
        </p>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "48px" }}>
          {t.faq.titel}
        </h1>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {FAQS.map((f, i) => (
            <details
              key={i}
              style={{
                borderTop: "1px solid var(--line)",
                borderBottom: i === FAQS.length - 1 ? "1px solid var(--line)" : "none",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  padding: "22px 8px",
                  fontSize: "16px",
                  fontWeight: 700,
                  letterSpacing: "-0.01em",
                  listStyle: "none",
                }}
              >
                {f.q}
              </summary>
              <p
                style={{
                  color: "var(--fg-muted)",
                  fontSize: "15px",
                  lineHeight: 1.8,
                  padding: "0 8px 24px",
                }}
              >
                {f.a}
              </p>
            </details>
          ))}
        </div>

        <div style={{ marginTop: "56px", textAlign: "center" }}>
          <p style={{ color: "var(--fg-muted)", fontSize: "14px", marginBottom: "20px" }}>
            {t.faq.frageNicht}
          </p>
          <Link
            href="/kontakt"
            className="btn-outline"
            style={{
              display: "inline-block",
              textDecoration: "none",
              border: "1px solid var(--line-strong)",
              color: "var(--fg)",
              padding: "14px 32px",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {t.faq.kontaktCta}
          </Link>
        </div>
      </section>

      <Footer sprache={sprache} />
    </main>
  );
}
