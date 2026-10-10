/* Demo-Vorlage: Zahnarztpraxis — ruhig, Weiß + Teal/Mint, vertrauensvoll.
   Navigation, Split-Hero, Trust-Badges, Hover-Karten, Scroll-Reveals. */

const TEAL = "#0B3A3A";
const MINT = "#4FD1C5";
const HELL = "#F2F8F7";
const sans = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

const leistungen = [
  { icon: "✨", titel: "Prophylaxe", text: "Professionelle Zahnreinigung und Vorsorge für ein gesundes Lächeln." },
  { icon: "😁", titel: "Ästhetik", text: "Bleaching, Veneers und unsichtbare Zahnkorrekturen." },
  { icon: "🦷", titel: "Implantologie", text: "Hochwertiger, langlebiger Zahnersatz, schonend eingesetzt." },
  { icon: "🧸", titel: "Kinderzahnheilkunde", text: "Einfühlsame Behandlung, damit der Zahnarztbesuch Spaß macht." },
];

const badges = ["★ 4,9 bei Google", "Über 20 Jahre Erfahrung", "Angstpatienten willkommen", "Alle Kassen & privat"];

export function ZahnarztDemo() {
  return (
    <div style={{ background: "#fff", color: TEAL, fontFamily: sans }}>
      {/* Navigation */}
      <nav style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: "1px solid #E2EEEC", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px" }}>
        <span style={{ fontWeight: 800, fontSize: "20px", letterSpacing: "-0.01em" }}>Dental <span style={{ color: MINT, filter: "brightness(0.85)" }}>Carré</span></span>
        <a href="#termin" className="d-btn" style={{ background: TEAL, color: "#fff", textDecoration: "none", padding: "10px 20px", fontWeight: 700, borderRadius: "8px", fontSize: "14px" }}>Termin</a>
      </nav>

      {/* Hero */}
      <section style={{ background: HELL, padding: "90px 24px", overflow: "hidden" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "48px", alignItems: "center" }}>
          <div>
            <p className="d-in" style={{ color: TEAL, opacity: 0.6, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "12px", marginBottom: "18px", animationDelay: "0.05s" }}>
              Zahnarztpraxis · München
            </p>
            <h1 className="d-in" style={{ fontSize: "clamp(34px, 5vw, 58px)", fontWeight: 800, lineHeight: 1.08, marginBottom: "20px", animationDelay: "0.15s" }}>
              Ihr Lächeln in<br /><span style={{ color: MINT, filter: "brightness(0.8)" }}>besten Händen.</span>
            </h1>
            <p className="d-in" style={{ fontSize: "17px", lineHeight: 1.75, color: "#3E5C5C", marginBottom: "32px", animationDelay: "0.3s" }}>
              Moderne Zahnmedizin in angenehmer Atmosphäre. Sanft, ehrlich und auf Sie persönlich abgestimmt.
            </p>
            <a href="#termin" className="d-in d-btn" style={{ display: "inline-block", background: TEAL, color: "#fff", textDecoration: "none", padding: "17px 38px", fontWeight: 700, borderRadius: "10px", boxShadow: "0 14px 34px rgba(11,58,58,0.22)", animationDelay: "0.45s" }}>
              Termin vereinbaren
            </a>
          </div>
          <div className="d-in" style={{ position: "relative", animationDelay: "0.3s" }}>
            <div className="d-ken" style={{ aspectRatio: "4 / 3", background: `linear-gradient(135deg, ${MINT} 0%, ${TEAL} 100%)`, borderRadius: "20px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "100px", boxShadow: "0 30px 70px rgba(11,58,58,0.25)" }}>
              🦷
            </div>
            <div style={{ position: "absolute", bottom: "-18px", left: "-18px", background: "#fff", borderRadius: "14px", padding: "16px 20px", boxShadow: "0 16px 40px rgba(11,58,58,0.18)" }}>
              <div style={{ fontSize: "22px", fontWeight: 800, color: MINT, filter: "brightness(0.8)" }}>★ 4,9</div>
              <div style={{ fontSize: "12px", color: "#3E5C5C" }}>bei Google</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust-Badges */}
      <section style={{ borderBottom: "1px solid #E2EEEC", padding: "24px" }}>
        <div style={{ maxWidth: "1040px", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "14px 36px", justifyContent: "center" }}>
          {badges.map((b) => (
            <span key={b} className="d-reveal" style={{ fontWeight: 600, fontSize: "15px", color: "#2C5050" }}>{b}</span>
          ))}
        </div>
      </section>

      {/* Leistungen */}
      <section style={{ maxWidth: "1040px", margin: "0 auto", padding: "90px 24px" }}>
        <h2 className="d-reveal" style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, textAlign: "center", marginBottom: "12px" }}>
          Unsere Leistungen
        </h2>
        <p className="d-reveal" style={{ textAlign: "center", color: "#6B8E8E", marginBottom: "56px" }}>Alles für Ihre Zahngesundheit</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "22px" }}>
          {leistungen.map((l) => (
            <div key={l.titel} className="d-reveal d-card" style={{ background: HELL, borderRadius: "16px", padding: "32px 28px" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", marginBottom: "18px", boxShadow: "0 8px 22px rgba(11,58,58,0.1)" }}>{l.icon}</div>
              <h3 style={{ fontSize: "19px", fontWeight: 800, marginBottom: "10px" }}>{l.titel}</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#3E5C5C" }}>{l.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Termin CTA */}
      <section id="termin" style={{ position: "relative", color: "#fff", padding: "90px 24px", textAlign: "center", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, ${TEAL}, #135050)`, zIndex: 0 }} />
        <div className="d-reveal" style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 38px)", fontWeight: 800, marginBottom: "16px" }}>
            Einfach online einen Termin buchen
          </h2>
          <p style={{ fontSize: "17px", opacity: 0.88, maxWidth: "500px", margin: "0 auto 36px", lineHeight: 1.7 }}>
            Wählen Sie Ihren Wunschtermin bequem rund um die Uhr. Auch kurzfristige Termine möglich.
          </p>
          <a href="#" className="d-btn" style={{ display: "inline-block", background: MINT, color: TEAL, textDecoration: "none", padding: "18px 46px", fontWeight: 800, borderRadius: "10px", boxShadow: "0 14px 34px rgba(79,209,197,0.3)" }}>
            Online-Termin buchen
          </a>
        </div>
      </section>

      <footer style={{ background: "#07292A", color: "#8FB3B2", padding: "36px 24px", textAlign: "center", fontSize: "14px" }}>
        Dental Carré · Sendlinger Str. 10, 80331 München · 089 334455
      </footer>
    </div>
  );
}
