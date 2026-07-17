import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { ContactForm } from "../components/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Fragen zu NIL, zum Launch oder zu Kooperationen? Schreib uns – wir melden uns schnellstmöglich zurück.",
};

export default function Kontakt() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ maxWidth: "640px", margin: "0 auto", padding: "80px 24px 100px" }}>
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
          Kontakt
        </p>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
          Schreib uns
        </h1>
        <p style={{ color: "var(--fg-muted)", fontSize: "15px", lineHeight: 1.7, marginTop: "16px", marginBottom: "48px" }}>
          Fragen zur Marke, zum Launch oder Interesse an einer Kooperation?
          Schick uns eine Nachricht – wir antworten so schnell wie möglich.
        </p>

        <ContactForm />

        <div style={{ marginTop: "48px", borderTop: "1px solid var(--line)", paddingTop: "32px" }}>
          <p style={{ color: "var(--fg-faint)", fontSize: "13px", lineHeight: 1.8 }}>
            Oder direkt per Mail:{" "}
            <a href="mailto:info@nilogik.de" style={{ color: "var(--fg)", fontWeight: 600 }}>
              info@nilogik.de
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
