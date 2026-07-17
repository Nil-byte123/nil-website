import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Häufige Fragen zu NIL: Launch, Warteliste, Produkte, Versand und mehr.",
};

const FAQS = [
  {
    q: "Wann geht NIL an den Start?",
    a: "Wir arbeiten gerade am ersten Drop. Ein genaues Datum gibt es noch nicht – aber die Warteliste erfährt es zuerst. Trag dich ein, dann verpasst du nichts.",
  },
  {
    q: "Warum kann ich noch nichts kaufen?",
    a: "Wir bereiten den Launch gründlich vor: Designs, Qualität, Produktion und alles Rechtliche. Sobald alles steht, wird der Shop freigeschaltet.",
  },
  {
    q: "Was kommt im ersten Drop?",
    a: "Hoodies, Oversized T-Shirts und Caps – alles in Schwarz und Weiß mit dem NIL Blockprint. Eine Vorschau findest du im Shop.",
  },
  {
    q: "Wie wird produziert?",
    a: "On demand: Jedes Teil wird erst produziert, wenn es bestellt wird. Das heißt keine Überproduktion, keine Lagerbestände, die weggeworfen werden.",
  },
  {
    q: "Was kostet die Warteliste?",
    a: "Nichts. Du gibst nur deine E-Mail-Adresse an und bekommst eine Nachricht, wenn der Drop live geht. Kein Spam, versprochen.",
  },
  {
    q: "Wohin wird später versendet?",
    a: "Zum Start konzentrieren wir uns auf Deutschland. Weitere Länder folgen, wenn alles rund läuft.",
  },
  {
    q: "Ich habe eine andere Frage.",
    a: "Schreib uns einfach über das Kontaktformular oder direkt an info@nilogik.de – wir antworten so schnell wie möglich.",
  },
];

export default function FAQ() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

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
          FAQ
        </p>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "48px" }}>
          Häufige Fragen
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
            Frage nicht dabei?
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
            Kontakt aufnehmen
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
