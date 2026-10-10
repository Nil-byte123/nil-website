/* Demo-Vorlage: Friseur / Beauty — elegant, dunkel + Gold, hochwertig.
   Navigation, bewegter Hero, Hover-Karten, Scroll-Reveals.          */

const DUNKEL = "#15121C";
const GOLD = "#C9A24B";
const CREME = "#EDE6DC";
const sans = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

const services = [
  { titel: "Schnitt & Styling", preis: "ab 39 €", text: "Beratung, Waschen, Schnitt und Föhnen, abgestimmt auf deinen Typ." },
  { titel: "Coloration & Balayage", preis: "ab 89 €", text: "Von natürlichen Nuancen bis zum modernen Balayage-Verlauf." },
  { titel: "Pflege & Treatments", preis: "ab 29 €", text: "Intensivpflege, Keratin und Kopfhaut-Treatments für gesundes Haar." },
];

const team = [
  { name: "Lena", rolle: "Inhaberin & Stylistin", bg: "linear-gradient(135deg,#C9A24B,#8A6B2A)" },
  { name: "Marco", rolle: "Color-Spezialist", bg: "linear-gradient(135deg,#8A6B2A,#C9A24B)" },
  { name: "Aylin", rolle: "Stylistin", bg: "linear-gradient(135deg,#D9B86A,#A9863B)" },
];

export function SalonDemo() {
  return (
    <div style={{ background: DUNKEL, color: CREME, fontFamily: sans }}>
      {/* Navigation */}
      <nav style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(21,18,28,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid #ffffff14", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 28px" }}>
        <span style={{ fontSize: "20px", fontWeight: 300, letterSpacing: "0.22em", textTransform: "uppercase" }}>Salon Nova</span>
        <a href="#termin" className="d-btn" style={{ border: `1px solid ${GOLD}`, color: GOLD, textDecoration: "none", padding: "9px 20px", fontSize: "12px", letterSpacing: "0.12em", textTransform: "uppercase" }}>Termin</a>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", minHeight: "84vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 24px", overflow: "hidden" }}>
        <div className="d-ken" aria-hidden="true" style={{ position: "absolute", inset: "-5%", background: `radial-gradient(ellipse at 50% 30%, #2A2338 0%, ${DUNKEL} 62%, #0C0A12 100%)`, zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <p className="d-in" style={{ color: GOLD, letterSpacing: "0.38em", textTransform: "uppercase", fontSize: "12px", marginBottom: "26px", animationDelay: "0.05s" }}>
            Friseur · Beauty · München
          </p>
          <h1 className="d-in" style={{ fontSize: "clamp(48px, 10vw, 110px)", fontWeight: 300, letterSpacing: "0.04em", lineHeight: 0.98, marginBottom: "26px", animationDelay: "0.15s" }}>
            Salon Nova
          </h1>
          <p className="d-in" style={{ fontSize: "clamp(15px, 2.2vw, 19px)", maxWidth: "480px", margin: "0 auto", lineHeight: 1.7, color: "#C7BFB2", animationDelay: "0.3s" }}>
            Dein Look, perfekt in Szene gesetzt. Moderne Schnitte, feinste Coloration und ein Ort zum Wohlfühlen.
          </p>
          <a href="#termin" className="d-in d-btn" style={{ display: "inline-block", marginTop: "42px", background: GOLD, color: DUNKEL, textDecoration: "none", padding: "17px 48px", letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "13px", fontWeight: 700, boxShadow: "0 14px 34px rgba(201,162,75,0.3)", animationDelay: "0.45s" }}>
            Termin buchen
          </a>
        </div>
      </section>

      {/* Services */}
      <section style={{ maxWidth: "980px", margin: "0 auto", padding: "100px 24px" }}>
        <h2 className="d-reveal" style={{ textAlign: "center", fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 300, letterSpacing: "0.04em", marginBottom: "60px" }}>
          Unsere <span style={{ color: GOLD }}>Services</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {services.map((s) => (
            <div key={s.titel} className="d-reveal d-card" style={{ background: "#1C1826", border: "1px solid #ffffff12", padding: "40px 32px" }}>
              <div style={{ color: GOLD, fontSize: "14px", letterSpacing: "0.1em", marginBottom: "16px" }}>{s.preis}</div>
              <h3 style={{ fontSize: "23px", fontWeight: 400, marginBottom: "12px" }}>{s.titel}</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "#A69E90" }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "#1C1826", padding: "100px 24px" }}>
        <div style={{ maxWidth: "980px", margin: "0 auto" }}>
          <h2 className="d-reveal" style={{ textAlign: "center", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 300, letterSpacing: "0.04em", marginBottom: "60px" }}>
            Dein <span style={{ color: GOLD }}>Team</span>
          </h2>
          <div style={{ display: "flex", gap: "48px", justifyContent: "center", flexWrap: "wrap" }}>
            {team.map((m) => (
              <div key={m.name} className="d-reveal d-card" style={{ textAlign: "center", padding: "12px" }}>
                <div style={{ width: "128px", height: "128px", borderRadius: "50%", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "46px", fontWeight: 300, color: DUNKEL, margin: "0 auto 18px", boxShadow: "0 14px 40px rgba(201,162,75,0.2)" }}>
                  {m.name[0]}
                </div>
                <div style={{ fontSize: "19px", marginBottom: "4px" }}>{m.name}</div>
                <div style={{ fontSize: "13px", color: GOLD, letterSpacing: "0.06em" }}>{m.rolle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Termin CTA */}
      <section id="termin" style={{ position: "relative", padding: "110px 24px", textAlign: "center", overflow: "hidden" }}>
        <div className="d-ken" aria-hidden="true" style={{ position: "absolute", inset: "-5%", background: `radial-gradient(ellipse at 50% 60%, #2A2338 0%, ${DUNKEL} 70%)`, zIndex: 0 }} />
        <div className="d-reveal" style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, letterSpacing: "0.04em", marginBottom: "16px" }}>
            Bereit für deinen neuen Look?
          </h2>
          <p style={{ color: "#A69E90", maxWidth: "440px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            Buche deinen Termin online, rund um die Uhr. Wir freuen uns auf dich.
          </p>
          <a href="#" className="d-btn" style={{ display: "inline-block", background: GOLD, color: DUNKEL, textDecoration: "none", padding: "18px 50px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: "13px", boxShadow: "0 14px 34px rgba(201,162,75,0.3)" }}>
            Online Termin buchen
          </a>
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #ffffff14", padding: "36px 24px", textAlign: "center", fontSize: "13px", color: "#A69E90" }}>
        Salon Nova · Leopoldstraße 44, 80802 München · 089 555123
      </footer>
    </div>
  );
}
