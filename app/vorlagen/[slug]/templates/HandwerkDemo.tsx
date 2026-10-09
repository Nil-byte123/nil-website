/* Demo-Vorlage: Handwerksbetrieb — seriös, kräftig, vertrauenswürdig.
   Blau + Orange, klare Struktur.                                    */

const BLAU = "#0F2A5C";
const ORANGE = "#FF7A00";
const sans = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

const leistungen = [
  { titel: "Sanitär", text: "Installation, Reparatur und Wartung von Bädern, Leitungen und Armaturen." },
  { titel: "Heizung", text: "Moderne Heizungsanlagen, Wärmepumpen und schnelle Notdienst-Hilfe." },
  { titel: "Bad-Sanierung", text: "Komplette Badsanierung aus einer Hand, von der Planung bis zur Übergabe." },
];

const vorteile = ["Meisterbetrieb", "Über 25 Jahre Erfahrung", "24h-Notdienst", "Festpreis-Garantie"];

export function HandwerkDemo() {
  return (
    <div style={{ background: "#FFFFFF", color: BLAU, fontFamily: sans }}>
      {/* Top-Bar */}
      <div style={{ background: BLAU, color: "#fff", fontSize: "14px", padding: "8px 24px", textAlign: "center" }}>
        ☎ 24h-Notdienst: <strong>0821 98765</strong> · Mo–Fr 7:00–18:00 Uhr
      </div>

      {/* Hero */}
      <section
        style={{
          background: `linear-gradient(120deg, ${BLAU} 0%, #16397A 100%)`,
          color: "#fff",
          padding: "90px 24px",
          textAlign: "center",
        }}
      >
        <p style={{ color: ORANGE, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "13px", marginBottom: "18px" }}>
          Meister Vogt · Sanitär & Heizung
        </p>
        <h1 style={{ fontSize: "clamp(32px, 6vw, 60px)", fontWeight: 800, lineHeight: 1.1, maxWidth: "760px", margin: "0 auto 20px" }}>
          Ihr Handwerksbetrieb aus der Region.
        </h1>
        <p style={{ fontSize: "clamp(16px, 2.2vw, 20px)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.6, opacity: 0.9 }}>
          Zuverlässig, pünktlich und zum fairen Festpreis. Vom tropfenden Hahn bis zur kompletten Bad-Sanierung.
        </p>
        <div style={{ marginTop: "36px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#angebot" style={{ background: ORANGE, color: "#fff", textDecoration: "none", padding: "16px 36px", fontWeight: 800, borderRadius: "6px" }}>
            Kostenloses Angebot
          </a>
          <a href="#leistungen" style={{ border: "2px solid #ffffff55", color: "#fff", textDecoration: "none", padding: "14px 32px", fontWeight: 700, borderRadius: "6px" }}>
            Leistungen ansehen
          </a>
        </div>
      </section>

      {/* Vorteile-Leiste */}
      <div style={{ background: "#F4F7FC", padding: "22px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "16px 40px", justifyContent: "center" }}>
          {vorteile.map((v) => (
            <span key={v} style={{ fontWeight: 700, fontSize: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: ORANGE, fontWeight: 900 }}>✓</span> {v}
            </span>
          ))}
        </div>
      </div>

      {/* Leistungen */}
      <section id="leistungen" style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>
          Unsere Leistungen
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px" }}>
          {leistungen.map((l) => (
            <div key={l.titel} style={{ border: "1px solid #E2E8F0", borderRadius: "10px", padding: "32px 28px", borderTop: `4px solid ${ORANGE}` }}>
              <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "12px" }}>{l.titel}</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#44506A" }}>{l.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Angebot CTA */}
      <section id="angebot" style={{ background: BLAU, color: "#fff", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, marginBottom: "16px" }}>
          Jetzt kostenloses Angebot anfordern
        </h2>
        <p style={{ fontSize: "17px", opacity: 0.9, maxWidth: "520px", margin: "0 auto 32px", lineHeight: 1.6 }}>
          Schildern Sie uns Ihr Anliegen, wir melden uns innerhalb von 24 Stunden mit einem fairen Festpreis.
        </p>
        <a href="#" style={{ background: ORANGE, color: "#fff", textDecoration: "none", padding: "18px 44px", fontWeight: 800, borderRadius: "6px", fontSize: "17px" }}>
          Angebot anfordern
        </a>
      </section>

      <footer style={{ background: "#0A1F45", color: "#9FB0CC", padding: "32px 24px", textAlign: "center", fontSize: "14px" }}>
        Meister Vogt GmbH · Industriestraße 8, 86159 Augsburg · info@meister-vogt.de
      </footer>
    </div>
  );
}
