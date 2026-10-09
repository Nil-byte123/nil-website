/* Demo-Vorlage: Immobilienmakler — hochwertig, Weiß + Navy + Gold. */

const NAVY = "#0E1C2B";
const GOLD = "#B38B4D";
const serif = "Georgia, 'Times New Roman', serif";
const sans = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

const objekte = [
  { ort: "München · Bogenhausen", typ: "Villa", zimmer: "6 Zi · 240 m²", preis: "2.450.000 €", farbe: "#243B53" },
  { ort: "Augsburg · Innenstadt", typ: "Altbau-Wohnung", zimmer: "3 Zi · 98 m²", preis: "495.000 €", farbe: "#334E68" },
  { ort: "Starnberg · Seenähe", typ: "Neubau-Haus", zimmer: "5 Zi · 180 m²", preis: "1.290.000 €", farbe: "#486581" },
];

export function ImmobilienDemo() {
  return (
    <div style={{ background: "#FFFFFF", color: NAVY, fontFamily: sans }}>
      {/* Hero */}
      <section style={{ background: NAVY, color: "#F4F1EC", padding: "90px 24px", textAlign: "center" }}>
        <p style={{ color: GOLD, letterSpacing: "0.3em", textTransform: "uppercase", fontSize: "12px", marginBottom: "20px" }}>
          Vonberg Immobilien · seit 1998
        </p>
        <h1 style={{ fontFamily: serif, fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 400, lineHeight: 1.1, maxWidth: "820px", margin: "0 auto 20px" }}>
          Ihr Zuhause verdient den richtigen Partner.
        </h1>
        <p style={{ fontSize: "clamp(16px, 2.2vw, 19px)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7, opacity: 0.85 }}>
          Diskreter Verkauf, faire Bewertung und persönliche Betreuung, von der ersten Besichtigung bis zur Schlüsselübergabe.
        </p>
        <div style={{ marginTop: "36px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#bewertung" style={{ background: GOLD, color: NAVY, textDecoration: "none", padding: "16px 36px", fontWeight: 700 }}>
            Kostenlose Bewertung
          </a>
          <a href="#objekte" style={{ border: "1px solid #ffffff44", color: "#F4F1EC", textDecoration: "none", padding: "15px 32px" }}>
            Objekte ansehen
          </a>
        </div>
      </section>

      {/* Objekte */}
      <section id="objekte" style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, textAlign: "center", marginBottom: "12px" }}>
          Ausgewählte Objekte
        </h2>
        <p style={{ textAlign: "center", color: GOLD, letterSpacing: "0.1em", marginBottom: "48px" }}>Eine Auswahl unseres Portfolios</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {objekte.map((o) => (
            <div key={o.ort} style={{ border: "1px solid #E5E0D8", overflow: "hidden" }}>
              <div style={{ height: "180px", background: o.farbe, display: "flex", alignItems: "flex-end", padding: "16px", color: "#fff" }}>
                <span style={{ background: GOLD, color: NAVY, fontSize: "12px", fontWeight: 700, padding: "4px 10px" }}>{o.typ}</span>
              </div>
              <div style={{ padding: "24px" }}>
                <div style={{ fontSize: "13px", color: "#7B8794", marginBottom: "6px" }}>{o.ort}</div>
                <div style={{ fontSize: "15px", marginBottom: "14px" }}>{o.zimmer}</div>
                <div style={{ fontFamily: serif, fontSize: "24px", color: GOLD }}>{o.preis}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bewertung CTA */}
      <section id="bewertung" style={{ background: "#F4F1EC", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontFamily: serif, fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 400, marginBottom: "16px" }}>
          Was ist Ihre Immobilie wert?
        </h2>
        <p style={{ fontSize: "17px", color: "#52606D", maxWidth: "520px", margin: "0 auto 32px", lineHeight: 1.7 }}>
          Erhalten Sie eine kostenlose, unverbindliche Markteinschätzung von unseren Experten, innerhalb von 48 Stunden.
        </p>
        <a href="#" style={{ background: NAVY, color: "#F4F1EC", textDecoration: "none", padding: "18px 44px", fontWeight: 700 }}>
          Jetzt bewerten lassen
        </a>
      </section>

      <footer style={{ background: NAVY, color: "#9FB0CC", padding: "32px 24px", textAlign: "center", fontSize: "14px" }}>
        Vonberg Immobilien GmbH · Maximilianstraße 20, 80539 München · 089 220044
      </footer>
    </div>
  );
}
