/* Demo-Vorlage: Restaurant / Café — warm, elegant, hochwertig.
   Mit Navigation, bewegtem Verlauf-Hero, Hover-Karten, Scroll-Reveals. */

const GRUEN = "#16352B";
const TERRA = "#C8622D";
const CREME = "#F5EFE4";
const serif = "Georgia, 'Times New Roman', serif";
const sans = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

const gerichte = [
  { name: "Antipasti della Casa", preis: "9,50 €", text: "Hausgemachte Vorspeisenauswahl mit Oliven, Bruschetta und Büffelmozzarella.", tag: "Vorspeise" },
  { name: "Tagliatelle al Tartufo", preis: "16,90 €", text: "Frische Bandnudeln in cremiger Trüffelsauce mit gehobeltem Parmesan.", tag: "Beliebt" },
  { name: "Pizza Margherita DOP", preis: "11,50 €", text: "San-Marzano-Tomaten, Büffelmozzarella, frisches Basilikum, Steinofen.", tag: "Klassiker" },
  { name: "Tiramisù della Nonna", preis: "6,90 €", text: "Nach original Familienrezept, täglich frisch zubereitet.", tag: "Dessert" },
];

const galerie = [
  "linear-gradient(135deg,#1F4536,#2E5E49)",
  "linear-gradient(135deg,#C8622D,#9B4A1E)",
  "linear-gradient(135deg,#2E5E49,#16352B)",
  "linear-gradient(135deg,#D98A4E,#C8622D)",
];

export function RestaurantDemo() {
  return (
    <div style={{ background: CREME, color: GRUEN, fontFamily: sans }}>
      {/* Navigation */}
      <nav style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(22,53,43,0.92)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", color: CREME, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px" }}>
        <span style={{ fontFamily: serif, fontSize: "22px", letterSpacing: "0.02em" }}>Trattoria Bella</span>
        <div style={{ display: "flex", gap: "26px", fontSize: "14px", letterSpacing: "0.03em" }}>
          <a href="#karte" className="d-underline" style={{ color: CREME, textDecoration: "none" }}>Karte</a>
          <a href="#galerie" className="d-underline" style={{ color: CREME, textDecoration: "none" }}>Galerie</a>
          <a href="#reservierung" className="d-underline" style={{ color: CREME, textDecoration: "none" }}>Reservierung</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", minHeight: "86vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "90px 24px", overflow: "hidden", color: CREME }}>
        <div className="d-ken" aria-hidden="true" style={{ position: "absolute", inset: "-5%", background: `radial-gradient(ellipse at 50% 20%, #2E5E49 0%, ${GRUEN} 55%, #0E241C 100%)`, zIndex: 0 }} />
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 1, background: "radial-gradient(circle at 50% 40%, transparent 40%, rgba(0,0,0,0.35) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <p className="d-in" style={{ color: TERRA, letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "13px", marginBottom: "22px", animationDelay: "0.05s" }}>
            Seit 1987 · Italienische Küche
          </p>
          <h1 className="d-in" style={{ fontFamily: serif, fontSize: "clamp(44px, 9vw, 104px)", fontWeight: 400, lineHeight: 0.98, marginBottom: "24px", animationDelay: "0.15s" }}>
            Trattoria Bella
          </h1>
          <p className="d-in" style={{ fontSize: "clamp(16px, 2.5vw, 21px)", maxWidth: "540px", margin: "0 auto", lineHeight: 1.6, opacity: 0.92, animationDelay: "0.3s" }}>
            Frische Zutaten, traditionelle Rezepte, ein Zuhause für Genießer. Herzlich, echt, italienisch.
          </p>
          <a href="#reservierung" className="d-in d-btn" style={{ display: "inline-block", marginTop: "40px", background: TERRA, color: CREME, textDecoration: "none", padding: "17px 44px", borderRadius: "999px", fontWeight: 700, letterSpacing: "0.03em", boxShadow: "0 12px 30px rgba(200,98,45,0.35)", animationDelay: "0.45s" }}>
            Tisch reservieren
          </a>
        </div>
      </section>

      {/* Speisekarte */}
      <section id="karte" style={{ maxWidth: "920px", margin: "0 auto", padding: "100px 24px" }}>
        <h2 className="d-reveal" style={{ fontFamily: serif, fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 400, textAlign: "center", marginBottom: "10px" }}>
          Unsere Spezialitäten
        </h2>
        <p className="d-reveal" style={{ textAlign: "center", color: TERRA, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "13px", marginBottom: "60px" }}>
          Eine Auswahl aus der Karte
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: "20px" }}>
          {gerichte.map((g) => (
            <div key={g.name} className="d-reveal d-card" style={{ background: "#fff", borderRadius: "14px", padding: "28px 30px", boxShadow: "0 10px 30px rgba(22,53,43,0.07)", border: "1px solid rgba(22,53,43,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "16px", marginBottom: "10px" }}>
                <h3 style={{ fontFamily: serif, fontSize: "22px", fontWeight: 400 }}>{g.name}</h3>
                <span style={{ color: TERRA, fontWeight: 700, whiteSpace: "nowrap", fontSize: "19px" }}>{g.preis}</span>
              </div>
              <p style={{ fontSize: "15px", lineHeight: 1.65, color: "#5A6B62", marginBottom: "14px" }}>{g.text}</p>
              <span style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: TERRA, border: `1px solid ${TERRA}55`, padding: "4px 10px", borderRadius: "999px" }}>{g.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Galerie */}
      <section id="galerie" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px" }}>
          {galerie.map((g, i) => (
            <div key={i} className="d-reveal d-zoom" style={{ aspectRatio: "1 / 1", borderRadius: "12px", boxShadow: "0 12px 30px rgba(22,53,43,0.12)" }}>
              <div className="d-zoom-inner" style={{ background: g, display: "flex", alignItems: "flex-end", padding: "16px" }}>
                <span style={{ color: CREME, fontFamily: serif, fontSize: "15px", opacity: 0.85 }}>Buon appetito</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Öffnungszeiten + Reservierung */}
      <section id="reservierung" style={{ background: GRUEN, color: CREME, padding: "100px 24px" }}>
        <div style={{ maxWidth: "920px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "56px" }}>
          <div className="d-reveal">
            <h2 style={{ fontFamily: serif, fontSize: "34px", fontWeight: 400, marginBottom: "24px" }}>Öffnungszeiten</h2>
            <table style={{ fontSize: "16px", lineHeight: 2.1, opacity: 0.92 }}>
              <tbody>
                <tr><td style={{ paddingRight: "40px" }}>Mo – Do</td><td>17:00 – 23:00</td></tr>
                <tr><td>Fr – Sa</td><td>12:00 – 24:00</td></tr>
                <tr><td>Sonntag</td><td>12:00 – 22:00</td></tr>
              </tbody>
            </table>
          </div>
          <div className="d-reveal">
            <h2 style={{ fontFamily: serif, fontSize: "34px", fontWeight: 400, marginBottom: "24px" }}>Reservierung</h2>
            <p style={{ fontSize: "16px", lineHeight: 1.75, opacity: 0.9, marginBottom: "28px" }}>
              Reservieren Sie Ihren Tisch telefonisch oder bequem online. Wir freuen uns auf Ihren Besuch.
            </p>
            <a href="#" className="d-btn" style={{ display: "inline-block", background: TERRA, color: CREME, textDecoration: "none", padding: "16px 38px", borderRadius: "999px", fontWeight: 700, boxShadow: "0 12px 30px rgba(200,98,45,0.3)" }}>
              Online reservieren
            </a>
          </div>
        </div>
      </section>

      <footer style={{ background: "#102820", color: CREME, padding: "44px 24px", textAlign: "center", fontSize: "14px", opacity: 0.85 }}>
        Trattoria Bella · Hauptstraße 12, 86150 Augsburg · Tel. 0821 123456
      </footer>
    </div>
  );
}
