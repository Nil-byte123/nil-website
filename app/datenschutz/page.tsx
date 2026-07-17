import Link from "next/link";
import type { Metadata } from "next";
import { NilLogo } from "../components/NilLogo";

export const metadata: Metadata = {
  title: "Datenschutz",
  description: "Datenschutzerklärung der NIL gemäß DSGVO.",
  robots: { index: false, follow: false },
};

export default function Datenschutz() {
  return (
    <main style={{
      background: "var(--bg)", color: "var(--fg)", minHeight: "100vh",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0, background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "0 24px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        zIndex: 100,
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <NilLogo size={24} />
        </Link>
        <Link href="/" style={{
          textDecoration: "none", color: "#FAFAFA", fontSize: "14px", fontWeight: 500,
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          ← Zurück zur Startseite
        </Link>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "60px 24px 100px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: 700, letterSpacing: "-0.04em", marginBottom: "8px" }}>Datenschutzerklärung</h1>
        <p style={{ color: "#6B6B6B", fontSize: "14px", marginBottom: "48px" }}>Stand: Mai 2025 | Gemäß DSGVO, BDSG und TMG</p>

        <section style={sectionStyle}>
          <h2 style={h2Style}>1. Verantwortlicher</h2>
          <p style={pStyle}>
            Verantwortlicher im Sinne der DSGVO ist:<br /><br />
            Nil Elian Quezada Capa<br />
            NIL – Streetwear<br />
            Aschauerstraße 17<br />
            82445 Schwaigen<br />
            E-Mail: <a href="mailto:info@nilogik.de" style={linkStyle}>info@nilogik.de</a>
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>2. Welche Daten wir erheben</h2>
          <h3 style={h3Style}>Beim Besuch unserer Website</h3>
          <p style={pStyle}>
            Beim Aufrufen unserer Website werden durch den Browser automatisch folgende Informationen an unseren Server übermittelt:
          </p>
          <ul style={{ ...pStyle, paddingLeft: "20px", marginTop: "10px" }}>
            <li>IP-Adresse des anfragenden Rechners</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Name und URL der abgerufenen Datei</li>
            <li>Browsertyp und Betriebssystem</li>
          </ul>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).
          </p>

          <h3 style={{ ...h3Style, marginTop: "24px" }}>Kontaktformular</h3>
          <p style={pStyle}>
            Wenn Sie unser Kontaktformular nutzen, werden folgende Daten erhoben: Name, E-Mail-Adresse und Ihre Nachricht. Diese werden ausschließlich zur Bearbeitung Ihrer Anfrage genutzt und nicht an Dritte weitergegeben. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
          </p>

          <h3 style={{ ...h3Style, marginTop: "24px" }}>Warteliste / Newsletter</h3>
          <p style={pStyle}>
            Wenn Sie sich auf unsere Warteliste eintragen, wird Ihre E-Mail-Adresse gespeichert, um Sie über den Start unseres Shops zu informieren. Die Verarbeitung erfolgt über den Dienstleister Mailchimp (The Rocket Science Group LLC, USA). Sie können sich jederzeit über den Abmeldelink in jeder E-Mail oder per Nachricht an info@nilogik.de austragen. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>3. Hosting & Infrastruktur</h2>
          <p style={pStyle}>
            Diese Website wird gehostet von <strong>Vercel Inc.</strong>, 340 Pine Street Suite 701, San Francisco, CA 94104, USA. Vercel verarbeitet Verbindungsdaten gemäß seiner eigenen Datenschutzrichtlinie (<a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" style={linkStyle}>vercel.com/legal/privacy-policy</a>). Es besteht ein Auftragsverarbeitungsvertrag. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>4. Cookies</h2>
          <p style={pStyle}>
            Unsere Website setzt keine eigenen Tracking-Cookies ein. Es werden lediglich technisch notwendige Cookies gesetzt, soweit dies für den Betrieb der Website erforderlich ist. Sie können Cookies in Ihrem Browser jederzeit löschen oder deaktivieren.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>5. Ihre Rechte</h2>
          <p style={pStyle}>Sie haben gemäß DSGVO folgende Rechte:</p>
          <ul style={{ ...pStyle, paddingLeft: "20px", marginTop: "10px" }}>
            <li><strong>Auskunft</strong> (Art. 15 DSGVO) über die zu Ihrer Person gespeicherten Daten</li>
            <li><strong>Berichtigung</strong> (Art. 16 DSGVO) unrichtiger Daten</li>
            <li><strong>Löschung</strong> (Art. 17 DSGVO) Ihrer gespeicherten Daten</li>
            <li><strong>Einschränkung</strong> (Art. 18 DSGVO) der Verarbeitung</li>
            <li><strong>Datenübertragbarkeit</strong> (Art. 20 DSGVO)</li>
            <li><strong>Widerspruch</strong> (Art. 21 DSGVO) gegen die Verarbeitung</li>
          </ul>
          <p style={{ ...pStyle, marginTop: "12px" }}>
            Zur Ausübung Ihrer Rechte wenden Sie sich an: <a href="mailto:info@nilogik.de" style={linkStyle}>info@nilogik.de</a><br /><br />
            Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren.
          </p>
        </section>

        <section style={sectionStyle}>
          <h2 style={h2Style}>6. Datensicherheit</h2>
          <p style={pStyle}>
            Diese Website nutzt eine SSL/TLS-Verschlüsselung (erkennbar am „https://" in der Browserzeile). Damit sind Daten, die Sie uns übermitteln, für Dritte nicht lesbar.
          </p>
        </section>

        <section style={{ marginBottom: "40px" }}>
          <h2 style={h2Style}>7. Aktualität</h2>
          <p style={pStyle}>
            Wir behalten uns vor, diese Datenschutzerklärung anzupassen, um sie stets den aktuellen rechtlichen Anforderungen zu entsprechen.
          </p>
        </section>

        <div style={{ paddingTop: "32px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <Link href="/impressum" style={{ color: "#FAFAFA", fontSize: "14px", textDecoration: "none", fontWeight: 500 }}>
            Zum Impressum →
          </Link>
        </div>
      </div>
    </main>
  );
}

const sectionStyle: React.CSSProperties = {
  marginBottom: "40px",
  paddingBottom: "40px",
  borderBottom: "1px solid rgba(255,255,255,0.1)",
};

const h2Style: React.CSSProperties = {
  fontSize: "18px", fontWeight: 600, color: "#FAFAFA",
  marginBottom: "12px", letterSpacing: "-0.02em",
};

const h3Style: React.CSSProperties = {
  fontSize: "15px", fontWeight: 600, color: "#D4D4D4", marginBottom: "8px",
};

const pStyle: React.CSSProperties = {
  color: "#A3A3A3", fontSize: "15px", lineHeight: 1.75,
};

const linkStyle: React.CSSProperties = {
  color: "#FAFAFA", textDecoration: "none",
};
