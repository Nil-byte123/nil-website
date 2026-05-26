import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum – NIL | nilogik.de",
  description: "Impressum und rechtliche Angaben der NIL – Automatisierung mit Verstand.",
  robots: { index: false, follow: false },
};

export default function Impressum() {
  return (
    <main style={{
      background: "#F8FAFC", color: "#0F172A", minHeight: "100vh",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, background: "rgba(248,250,252,0.92)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(15,23,42,0.07)",
        padding: "0 24px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        zIndex: 100,
      }}>
        <Link href="/" style={{ textDecoration: "none", color: "#0F172A", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.04em" }}>
          NIL
        </Link>
        <Link href="/" style={{
          textDecoration: "none", color: "#0EA5E9", fontSize: "14px", fontWeight: 500,
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          ← Zurück zur Startseite
        </Link>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 100px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.04em", marginBottom: "8px" }}>Impressum</h1>
        <p style={{ color: "#64748B", fontSize: "14px", marginBottom: "48px" }}>Angaben gemäß § 5 TMG</p>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Anbieter</h2>
          <p style={pStyle}>
            <strong>Nil Elian Quezada Capa</strong><br />
            NIL – Automatisierung mit Verstand<br />
            Aschauerstraße 17<br />
            82445 Schwaigen<br />
            Deutschland
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Kontakt</h2>
          <p style={pStyle}>
            E-Mail: <a href="mailto:info@nilogik.de" style={linkStyle}>info@nilogik.de</a><br />
            Telefon: <a href="tel:+4915129436338" style={linkStyle}>0151 29436338</a>
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Umsatzsteuer-ID</h2>
          <p style={pStyle}>
            {/* ⚠️ Falls vorhanden – sonst diese Sektion entfernen */}
            Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
            [UST-ID oder „nicht vorhanden"]
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Verantwortlich für den Inhalt</h2>
          <p style={pStyle}>
            Nil Elian Quezada Capa<br />
            Aschauerstraße 17<br />
            82445 Schwaigen
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>Haftungsausschluss</h2>
          <h3 style={h3Style}>Haftung für Inhalte</h3>
          <p style={pStyle}>
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          </p>
          <h3 style={{ ...h3Style, marginTop: "20px" }}>Haftung für Links</h3>
          <p style={pStyle}>
            Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
          </p>
          <h3 style={{ ...h3Style, marginTop: "20px" }}>Urheberrecht</h3>
          <p style={pStyle}>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
          </p>
        </section>

        <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid rgba(15,23,42,0.08)" }}>
          <Link href="/datenschutz" style={{ color: "#0EA5E9", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
            Zur Datenschutzerklärung →
          </Link>
        </div>
      </div>
    </main>
  );
}

const sectionStyle: React.CSSProperties = {
  marginBottom: "40px",
  paddingBottom: "40px",
  borderBottom: "1px solid rgba(15,23,42,0.07)",
};

const h2Style: React.CSSProperties = {
  fontSize: "18px", fontWeight: 600, color: "#0F172A",
  marginBottom: "12px", letterSpacing: "-0.02em",
};

const h3Style: React.CSSProperties = {
  fontSize: "15px", fontWeight: 600, color: "#334155", marginBottom: "8px",
};

const pStyle: React.CSSProperties = {
  color: "#475569", fontSize: "15px", lineHeight: 1.75,
};

const linkStyle: React.CSSProperties = {
  color: "#0EA5E9", textDecoration: "none",
};
