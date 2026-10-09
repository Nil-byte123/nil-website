/* Demo-Vorlage: Restaurant / Café — warm, elegant, Serifen.
   Eigenständige Optik (nicht das NIL-Design).                 */

const GRUEN = "#1B3A2F";
const TERRA = "#C8622D";
const CREME = "#F3ECE1";
const serif = "Georgia, 'Times New Roman', serif";

const gerichte = [
  { name: "Antipasti della Casa", preis: "9,50 €", text: "Hausgemachte Vorspeisenauswahl mit Oliven, Bruschetta und Büffelmozzarella." },
  { name: "Tagliatelle al Tartufo", preis: "16,90 €", text: "Frische Bandnudeln in cremiger Trüffelsauce mit Parmesan." },
  { name: "Pizza Margherita DOP", preis: "11,50 €", text: "San-Marzano-Tomaten, Büffelmozzarella, frisches Basilikum." },
  { name: "Tiramisù della Nonna", preis: "6,90 €", text: "Nach original Familienrezept, täglich frisch zubereitet." },
];

export function RestaurantDemo() {
  return (
    <div style={{ background: CREME, color: GRUEN, fontFamily: serif }}>
      {/* Hero */}
      <section
        style={{
          minHeight: "78vh",
          background: GRUEN,
          color: CREME,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px",
        }}
      >
        <p style={{ color: TERRA, letterSpacing: "0.3em", textTransform: "uppercase", fontSize: "13px", fontFamily: "system-ui", marginBottom: "20px" }}>
          Seit 1987
        </p>
        <h1 style={{ fontSize: "clamp(40px, 8vw, 86px)", fontWeight: 400, lineHeight: 1.05, marginBottom: "20px" }}>
          Trattoria Bella
        </h1>
        <p style={{ fontSize: "clamp(16px, 2.5vw, 22px)", maxWidth: "540px", lineHeight: 1.6, opacity: 0.9 }}>
          Italienische Küche aus Leidenschaft. Frische Zutaten, traditionelle Rezepte, ein Zuhause für Genießer.
        </p>
        <a
          href="#reservierung"
          style={{
            marginTop: "40px",
            background: TERRA,
            color: CREME,
            textDecoration: "none",
            padding: "16px 40px",
            borderRadius: "999px",
            fontFamily: "system-ui",
            fontWeight: 700,
            letterSpacing: "0.04em",
          }}
        >
          Tisch reservieren
        </a>
      </section>

      {/* Speisekarte */}
      <section style={{ maxWidth: "860px", margin: "0 auto", padding: "90px 24px" }}>
        <h2 style={{ fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 400, textAlign: "center", marginBottom: "12px" }}>
          Unsere Spezialitäten
        </h2>
        <p style={{ textAlign: "center", fontFamily: "system-ui", color: TERRA, marginBottom: "56px" }}>
          Eine kleine Auswahl aus unserer Karte
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {gerichte.map((g) => (
            <div key={g.name} style={{ display: "flex", justifyContent: "space-between", gap: "24px", borderBottom: `1px solid ${GRUEN}22`, paddingBottom: "24px" }}>
              <div>
                <h3 style={{ fontSize: "22px", fontWeight: 400, marginBottom: "6px" }}>{g.name}</h3>
                <p style={{ fontFamily: "system-ui", fontSize: "15px", lineHeight: 1.6, opacity: 0.8 }}>{g.text}</p>
              </div>
              <span style={{ color: TERRA, fontWeight: 700, whiteSpace: "nowrap", fontSize: "20px" }}>{g.preis}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Öffnungszeiten + Reservierung */}
      <section id="reservierung" style={{ background: GRUEN, color: CREME, padding: "90px 24px" }}>
        <div style={{ maxWidth: "860px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "48px" }}>
          <div>
            <h2 style={{ fontSize: "32px", fontWeight: 400, marginBottom: "24px" }}>Öffnungszeiten</h2>
            <table style={{ fontFamily: "system-ui", fontSize: "15px", lineHeight: 2, opacity: 0.9 }}>
              <tbody>
                <tr><td style={{ paddingRight: "32px" }}>Mo – Do</td><td>17:00 – 23:00</td></tr>
                <tr><td>Fr – Sa</td><td>12:00 – 24:00</td></tr>
                <tr><td>Sonntag</td><td>12:00 – 22:00</td></tr>
              </tbody>
            </table>
          </div>
          <div>
            <h2 style={{ fontSize: "32px", fontWeight: 400, marginBottom: "24px" }}>Reservierung</h2>
            <p style={{ fontFamily: "system-ui", fontSize: "15px", lineHeight: 1.7, opacity: 0.9, marginBottom: "24px" }}>
              Reservieren Sie Ihren Tisch telefonisch oder direkt online. Wir freuen uns auf Ihren Besuch.
            </p>
            <a href="#" style={{ display: "inline-block", background: TERRA, color: CREME, textDecoration: "none", padding: "14px 32px", borderRadius: "999px", fontFamily: "system-ui", fontWeight: 700 }}>
              Online reservieren
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: "#132A21", color: CREME, padding: "40px 24px", textAlign: "center", fontFamily: "system-ui", fontSize: "14px", opacity: 0.85 }}>
        Trattoria Bella · Hauptstraße 12, 86150 Augsburg · Tel. 0821 123456
      </footer>
    </div>
  );
}
