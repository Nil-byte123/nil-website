/* Demo-Vorlage: Handwerksbetrieb — seriös, hochwertig, vertrauenswürdig.
   Navigation, bewegter Hero, Stat-Counter, Hover-Karten, Scroll-Reveals. */

const BLAU = "#0F2A5C";
const ORANGE = "#FF7A00";
const sans = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

const leistungen = [
  { icon: "🚿", titel: "Sanitär", text: "Installation, Reparatur und Wartung von Bädern, Leitungen und Armaturen." },
  { icon: "🔥", titel: "Heizung", text: "Moderne Heizungsanlagen, Wärmepumpen und schneller Notdienst." },
  { icon: "🛁", titel: "Bad-Sanierung", text: "Komplette Badsanierung aus einer Hand, von der Planung bis zur Übergabe." },
];

const stats = [
  { zahl: "25+", label: "Jahre Erfahrung" },
  { zahl: "4.900", label: "Projekte erledigt" },
  { zahl: "24h", label: "Notdienst" },
  { zahl: "4,9★", label: "Google-Bewertung" },
];

export function HandwerkDemo() {
  return (
    <div style={{ background: "#FFFFFF", color: BLAU, fontFamily: sans }}>
      {/* Top-Bar */}
      <div style={{ background: "#0A1F45", color: "#fff", fontSize: "13px", padding: "8px 24px", textAlign: "center", letterSpacing: "0.02em" }}>
        ☎ 24h-Notdienst: <strong style={{ color: ORANGE }}>0821 98765</strong> · Mo–Fr 7:00–18:00 Uhr
      </div>

      {/* Navigation */}
      <nav style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.95)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px" }}>
        <span style={{ fontWeight: 900, fontSize: "20px", letterSpacing: "-0.02em" }}>Meister <span style={{ color: ORANGE }}>Vogt</span></span>
        <div style={{ display: "flex", gap: "24px", fontSize: "14px", fontWeight: 600 }}>
          <a href="#leistungen" className="d-underline" style={{ color: BLAU, textDecoration: "none" }}>Leistungen</a>
          <a href="#warum" className="d-underline" style={{ color: BLAU, textDecoration: "none" }}>Warum wir</a>
          <a href="#angebot" className="d-underline" style={{ color: BLAU, textDecoration: "none" }}>Angebot</a>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", color: "#fff", padding: "110px 24px", textAlign: "center", overflow: "hidden" }}>
        <div className="d-ken" aria-hidden="true" style={{ position: "absolute", inset: "-5%", background: `radial-gradient(ellipse at 30% 20%, #1C4A94 0%, ${BLAU} 55%, #081F47 100%)`, zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "820px", margin: "0 auto" }}>
          <p className="d-in" style={{ color: ORANGE, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", fontSize: "13px", marginBottom: "20px", animationDelay: "0.05s" }}>
            Meisterbetrieb · Sanitär & Heizung
          </p>
          <h1 className="d-in" style={{ fontSize: "clamp(34px, 6vw, 64px)", fontWeight: 900, lineHeight: 1.08, marginBottom: "22px", letterSpacing: "-0.02em", animationDelay: "0.15s" }}>
            Ihr Handwerksbetrieb<br />aus der Region.
          </h1>
          <p className="d-in" style={{ fontSize: "clamp(16px, 2.2vw, 20px)", maxWidth: "560px", margin: "0 auto", lineHeight: 1.6, opacity: 0.9, animationDelay: "0.3s" }}>
            Zuverlässig, pünktlich und zum fairen Festpreis. Vom tropfenden Hahn bis zur kompletten Bad-Sanierung.
          </p>
          <div className="d-in" style={{ marginTop: "38px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap", animationDelay: "0.45s" }}>
            <a href="#angebot" className="d-btn" style={{ background: ORANGE, color: "#fff", textDecoration: "none", padding: "17px 38px", fontWeight: 800, borderRadius: "8px", boxShadow: "0 14px 34px rgba(255,122,0,0.35)" }}>
              Kostenloses Angebot
            </a>
            <a href="#leistungen" className="d-btn" style={{ border: "2px solid #ffffff44", color: "#fff", textDecoration: "none", padding: "15px 34px", fontWeight: 700, borderRadius: "8px" }}>
              Leistungen ansehen
            </a>
          </div>
        </div>
      </section>

      {/* Stat-Counter */}
      <section id="warum" style={{ background: "#F4F7FC", padding: "48px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "24px", textAlign: "center" }}>
          {stats.map((s) => (
            <div key={s.label} className="d-reveal">
              <div style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 900, color: ORANGE, lineHeight: 1 }}>{s.zahl}</div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "#44506A", marginTop: "8px" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Leistungen */}
      <section id="leistungen" style={{ maxWidth: "1000px", margin: "0 auto", padding: "90px 24px" }}>
        <h2 className="d-reveal" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 900, textAlign: "center", marginBottom: "12px", letterSpacing: "-0.02em" }}>
          Unsere Leistungen
        </h2>
        <p className="d-reveal" style={{ textAlign: "center", color: "#7B8794", marginBottom: "56px" }}>Alles aus einer Hand, vom Meisterbetrieb</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", gap: "24px" }}>
          {leistungen.map((l) => (
            <div key={l.titel} className="d-reveal d-card" style={{ borderRadius: "14px", padding: "36px 30px", background: "#fff", boxShadow: "0 12px 34px rgba(15,42,92,0.08)", borderTop: `4px solid ${ORANGE}` }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>{l.icon}</div>
              <h3 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "12px" }}>{l.titel}</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#44506A" }}>{l.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Angebot CTA */}
      <section id="angebot" style={{ position: "relative", color: "#fff", padding: "90px 24px", textAlign: "center", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: `linear-gradient(120deg, ${BLAU}, #16397A)`, zIndex: 0 }} />
        <div className="d-reveal" style={{ position: "relative", zIndex: 1 }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, marginBottom: "16px" }}>
            Jetzt kostenloses Angebot anfordern
          </h2>
          <p style={{ fontSize: "17px", opacity: 0.9, maxWidth: "520px", margin: "0 auto 32px", lineHeight: 1.6 }}>
            Schildern Sie uns Ihr Anliegen, wir melden uns innerhalb von 24 Stunden mit einem fairen Festpreis.
          </p>
          <a href="#" className="d-btn" style={{ display: "inline-block", background: ORANGE, color: "#fff", textDecoration: "none", padding: "18px 46px", fontWeight: 800, borderRadius: "8px", fontSize: "17px", boxShadow: "0 14px 34px rgba(255,122,0,0.4)" }}>
            Angebot anfordern
          </a>
        </div>
      </section>

      <footer style={{ background: "#0A1F45", color: "#9FB0CC", padding: "36px 24px", textAlign: "center", fontSize: "14px" }}>
        Meister Vogt GmbH · Industriestraße 8, 86159 Augsburg · info@meister-vogt.de
      </footer>
    </div>
  );
}
