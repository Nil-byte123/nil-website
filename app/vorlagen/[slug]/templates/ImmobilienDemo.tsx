/* Demo-Vorlage: Immobilienmakler — hochwertig, Weiß + Navy + Gold.
   Navigation, bewegter Hero, Objekt-Karten mit Hover-Zoom, Reveals. */

import { IconHome, IconBuilding, IconWaves } from "./icons";

const NAVY = "#0E1C2B";
const GOLD = "#B38B4D";
const serif = "Georgia, 'Times New Roman', serif";
const sans = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

const objekte = [
  { ort: "München · Bogenhausen", typ: "Villa", zimmer: "6 Zi · 240 m²", preis: "2.450.000 €", bg: "linear-gradient(135deg,#1B3148,#2E4A68)", Icon: IconHome },
  { ort: "Augsburg · Innenstadt", typ: "Altbau-Wohnung", zimmer: "3 Zi · 98 m²", preis: "495.000 €", bg: "linear-gradient(135deg,#2E4A68,#44648A)", Icon: IconBuilding },
  { ort: "Starnberg · Seenähe", typ: "Neubau-Haus", zimmer: "5 Zi · 180 m²", preis: "1.290.000 €", bg: "linear-gradient(135deg,#44648A,#1B3148)", Icon: IconWaves },
];

const schritte = [
  { nr: "01", titel: "Bewertung", text: "Kostenlose, realistische Markteinschätzung Ihrer Immobilie." },
  { nr: "02", titel: "Vermarktung", text: "Hochwertige Fotos, Exposé und gezielte Ansprache passender Käufer." },
  { nr: "03", titel: "Verkauf", text: "Begleitung bis zum Notartermin und zur Schlüsselübergabe." },
];

export function ImmobilienDemo() {
  return (
    <div style={{ background: "#FFFFFF", color: NAVY, fontFamily: sans }}>
      {/* Navigation */}
      <nav style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(14,28,43,0.92)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", color: "#F4F1EC", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px" }}>
        <span style={{ fontFamily: serif, fontSize: "21px", letterSpacing: "0.04em" }}>Vonberg <span style={{ color: GOLD }}>Immobilien</span></span>
        <div style={{ display: "flex", gap: "24px", alignItems: "center", fontSize: "14px" }}>
          <a href="#objekte" className="d-underline" style={{ color: "#F4F1EC", textDecoration: "none" }}>Objekte</a>
          <a href="#ablauf" className="d-underline" style={{ color: "#F4F1EC", textDecoration: "none" }}>Ablauf</a>
          <a href="#bewertung" className="d-btn" style={{ background: GOLD, color: NAVY, textDecoration: "none", padding: "9px 18px", fontWeight: 700 }}>Bewertung</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", color: "#F4F1EC", padding: "120px 24px", textAlign: "center", overflow: "hidden" }}>
        <div className="d-ken" aria-hidden="true" style={{ position: "absolute", inset: "-5%", background: `radial-gradient(ellipse at 50% 15%, #1D3B5C 0%, ${NAVY} 60%, #081522 100%)`, zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "840px", margin: "0 auto" }}>
          <p className="d-in" style={{ color: GOLD, letterSpacing: "0.3em", textTransform: "uppercase", fontSize: "12px", marginBottom: "22px", animationDelay: "0.05s" }}>
            Vonberg Immobilien · seit 1998
          </p>
          <h1 className="d-in" style={{ fontFamily: serif, fontSize: "clamp(38px, 6vw, 72px)", fontWeight: 400, lineHeight: 1.08, marginBottom: "22px", animationDelay: "0.15s" }}>
            Ihr Zuhause verdient<br />den richtigen Partner.
          </h1>
          <p className="d-in" style={{ fontSize: "clamp(16px, 2.2vw, 19px)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7, opacity: 0.88, animationDelay: "0.3s" }}>
            Diskreter Verkauf, faire Bewertung und persönliche Betreuung, von der ersten Besichtigung bis zur Schlüsselübergabe.
          </p>
          <div className="d-in" style={{ marginTop: "40px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", animationDelay: "0.45s" }}>
            <a href="#bewertung" className="d-btn" style={{ background: GOLD, color: NAVY, textDecoration: "none", padding: "17px 38px", fontWeight: 700, boxShadow: "0 14px 34px rgba(179,139,77,0.3)" }}>
              Kostenlose Bewertung
            </a>
            <a href="#objekte" className="d-btn" style={{ border: "1px solid #ffffff44", color: "#F4F1EC", textDecoration: "none", padding: "16px 34px" }}>
              Objekte ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Objekte */}
      <section id="objekte" style={{ maxWidth: "1100px", margin: "0 auto", padding: "100px 24px" }}>
        <h2 className="d-reveal" style={{ fontFamily: serif, fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 400, textAlign: "center", marginBottom: "10px" }}>
          Ausgewählte Objekte
        </h2>
        <p className="d-reveal" style={{ textAlign: "center", color: GOLD, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "13px", marginBottom: "56px" }}>Eine Auswahl unseres Portfolios</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "28px" }}>
          {objekte.map((o) => (
            <div key={o.ort} className="d-reveal d-card" style={{ border: "1px solid #E5E0D8", borderRadius: "14px", overflow: "hidden", background: "#fff", boxShadow: "0 14px 40px rgba(14,28,43,0.08)" }}>
              <div className="d-zoom" style={{ height: "200px", position: "relative" }}>
                <div className="d-zoom-inner" style={{ background: o.bg, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.55)" }}>
                  <o.Icon size={72} stroke={1.2} />
                </div>
                <span style={{ position: "absolute", top: "14px", left: "14px", background: GOLD, color: NAVY, fontSize: "12px", fontWeight: 700, padding: "5px 12px", borderRadius: "999px" }}>{o.typ}</span>
              </div>
              <div style={{ padding: "26px" }}>
                <div style={{ fontSize: "13px", color: "#7B8794", marginBottom: "6px", letterSpacing: "0.03em" }}>{o.ort}</div>
                <div style={{ fontSize: "16px", marginBottom: "16px" }}>{o.zimmer}</div>
                <div style={{ fontFamily: serif, fontSize: "26px", color: GOLD }}>{o.preis}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ablauf */}
      <section id="ablauf" style={{ background: "#F4F1EC", padding: "100px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 className="d-reveal" style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 400, textAlign: "center", marginBottom: "60px" }}>
            So verkaufen Sie mit uns
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "28px" }}>
            {schritte.map((s) => (
              <div key={s.nr} className="d-reveal" style={{ textAlign: "center" }}>
                <div style={{ fontFamily: serif, fontSize: "46px", color: GOLD, marginBottom: "14px" }}>{s.nr}</div>
                <h3 style={{ fontSize: "21px", fontWeight: 700, marginBottom: "10px" }}>{s.titel}</h3>
                <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#52606D" }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bewertung CTA */}
      <section id="bewertung" style={{ position: "relative", color: "#F4F1EC", padding: "100px 24px", textAlign: "center", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, ${NAVY}, #1B3148)`, zIndex: 0 }} />
        <div className="d-reveal" style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, marginBottom: "16px" }}>
            Was ist Ihre Immobilie wert?
          </h2>
          <p style={{ fontSize: "17px", opacity: 0.85, maxWidth: "520px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            Erhalten Sie eine kostenlose, unverbindliche Markteinschätzung, innerhalb von 48 Stunden.
          </p>
          <a href="#" className="d-btn" style={{ display: "inline-block", background: GOLD, color: NAVY, textDecoration: "none", padding: "18px 46px", fontWeight: 700, boxShadow: "0 14px 34px rgba(179,139,77,0.35)" }}>
            Jetzt bewerten lassen
          </a>
        </div>
      </section>

      <footer style={{ background: NAVY, color: "#9FB0CC", padding: "36px 24px", textAlign: "center", fontSize: "14px" }}>
        Vonberg Immobilien GmbH · Maximilianstraße 20, 80539 München · 089 220044
      </footer>
    </div>
  );
}
