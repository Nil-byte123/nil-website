/* Demo-Vorlage: Fitnessstudio — dunkel + Neon-Lime, energiegeladen.
   Navigation, Glow-Hero, Stat-Row, Hover-Karten, Scroll-Reveals.   */

const DUNKEL = "#0C0F10";
const LIME = "#C6FF2E";
const KARTE = "#161B1D";
const sans = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

const stats = [
  { zahl: "1.200+", label: "Mitglieder" },
  { zahl: "35", label: "Kurse / Woche" },
  { zahl: "12", label: "Trainer:innen" },
  { zahl: "24/7", label: "Geöffnet" },
];

const kurse = [
  { zeit: "Mo 18:00", name: "HIIT Burn", trainer: "mit Jana" },
  { zeit: "Di 19:30", name: "Power Lifting", trainer: "mit Deniz" },
  { zeit: "Mi 18:30", name: "Functional Flow", trainer: "mit Mara" },
  { zeit: "Fr 17:00", name: "Boxing Cardio", trainer: "mit Leon" },
];

const tarife = [
  { name: "Flex", preis: "29", text: "Monatlich kündbar, voller Zugang zum Gym.", top: false },
  { name: "Pro", preis: "39", text: "Gym + alle Kurse + App-Trainingsplan.", top: true },
  { name: "Elite", preis: "59", text: "Alles aus Pro + Personal-Training & Sauna.", top: false },
];

export function FitnessDemo() {
  return (
    <div style={{ background: DUNKEL, color: "#fff", fontFamily: sans }}>
      {/* Navigation */}
      <nav style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(12,15,16,0.85)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid #ffffff12", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 28px" }}>
        <span style={{ fontWeight: 900, fontSize: "22px", textTransform: "uppercase", letterSpacing: "-0.02em" }}>PULSE<span style={{ color: LIME }}>·</span>Gym</span>
        <a href="#tarife" className="d-btn" style={{ background: LIME, color: DUNKEL, textDecoration: "none", padding: "9px 20px", fontWeight: 900, textTransform: "uppercase", fontSize: "12px" }}>Jetzt starten</a>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", minHeight: "88vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 24px", overflow: "hidden" }}>
        <div className="d-ken" aria-hidden="true" style={{ position: "absolute", top: "-20%", right: "-15%", width: "70vw", height: "70vw", background: `radial-gradient(circle, ${LIME}22 0%, transparent 60%)`, zIndex: 0, filter: "blur(20px)" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1100px", margin: "0 auto", width: "100%" }}>
          <p className="d-in" style={{ color: LIME, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", fontSize: "13px", marginBottom: "22px", animationDelay: "0.05s" }}>
            PULSE Gym · Augsburg
          </p>
          <h1 className="d-in" style={{ fontSize: "clamp(48px, 11vw, 130px)", fontWeight: 900, lineHeight: 0.9, letterSpacing: "-0.03em", textTransform: "uppercase", animationDelay: "0.15s" }}>
            Werde die<br />beste<br /><span style={{ color: LIME }}>Version.</span>
          </h1>
          <p className="d-in" style={{ fontSize: "clamp(16px, 2.2vw, 20px)", maxWidth: "500px", lineHeight: 1.6, marginTop: "30px", color: "#A8B0B2", animationDelay: "0.3s" }}>
            Modernste Geräte, starke Kurse, echte Community. Dein Training, dein Tempo, dein Erfolg.
          </p>
          <a href="#tarife" className="d-in d-btn" style={{ display: "inline-block", marginTop: "36px", background: LIME, color: DUNKEL, textDecoration: "none", padding: "19px 46px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", boxShadow: "0 14px 40px rgba(198,255,46,0.3)", animationDelay: "0.45s" }}>
            Kostenloses Probetraining
          </a>
        </div>
      </section>

      {/* Stat-Row */}
      <section style={{ borderTop: "1px solid #ffffff12", borderBottom: "1px solid #ffffff12", padding: "40px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "24px", textAlign: "center" }}>
          {stats.map((s) => (
            <div key={s.label} className="d-reveal">
              <div style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, color: LIME, lineHeight: 1 }}>{s.zahl}</div>
              <div style={{ fontSize: "13px", color: "#8A9294", marginTop: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Kursplan */}
      <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "90px 24px" }}>
        <h2 className="d-reveal" style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 900, textTransform: "uppercase", marginBottom: "48px", letterSpacing: "-0.02em" }}>
          Kurs<span style={{ color: LIME }}>plan</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
          {kurse.map((k) => (
            <div key={k.name} className="d-reveal d-card" style={{ background: KARTE, padding: "30px 26px", borderLeft: `3px solid ${LIME}` }}>
              <div style={{ color: LIME, fontWeight: 800, fontSize: "14px", marginBottom: "10px" }}>{k.zeit}</div>
              <div style={{ fontSize: "21px", fontWeight: 800, textTransform: "uppercase", marginBottom: "4px" }}>{k.name}</div>
              <div style={{ color: "#8A9294", fontSize: "14px" }}>{k.trainer}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Tarife */}
      <section id="tarife" style={{ maxWidth: "1100px", margin: "0 auto", padding: "40px 24px 100px" }}>
        <h2 className="d-reveal" style={{ fontSize: "clamp(28px, 5vw, 46px)", fontWeight: 900, textTransform: "uppercase", textAlign: "center", marginBottom: "56px", letterSpacing: "-0.02em" }}>
          Mitglied<span style={{ color: LIME }}>schaften</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", alignItems: "stretch" }}>
          {tarife.map((t) => (
            <div key={t.name} className="d-reveal d-card" style={{ background: t.top ? LIME : KARTE, color: t.top ? DUNKEL : "#fff", padding: "40px 30px", display: "flex", flexDirection: "column", transform: t.top ? "scale(1.03)" : undefined, boxShadow: t.top ? "0 20px 50px rgba(198,255,46,0.25)" : undefined }}>
              {t.top && <div style={{ fontWeight: 900, fontSize: "11px", letterSpacing: "0.2em", marginBottom: "14px" }}>★ BELIEBT</div>}
              <div style={{ fontSize: "22px", fontWeight: 900, textTransform: "uppercase", marginBottom: "12px" }}>{t.name}</div>
              <div style={{ fontSize: "52px", fontWeight: 900, lineHeight: 1 }}>{t.preis}€<span style={{ fontSize: "16px", fontWeight: 700 }}>/Mon.</span></div>
              <p style={{ marginTop: "18px", fontSize: "14px", lineHeight: 1.6, flex: 1, opacity: 0.85 }}>{t.text}</p>
              <a href="#" className="d-btn" style={{ marginTop: "26px", textAlign: "center", background: t.top ? DUNKEL : LIME, color: t.top ? LIME : DUNKEL, textDecoration: "none", padding: "15px", fontWeight: 900, textTransform: "uppercase" }}>
                Auswählen
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #ffffff12", padding: "36px 24px", textAlign: "center", fontSize: "14px", color: "#8A9294" }}>
        PULSE Gym · Gögginger Str. 100, 86199 Augsburg · Täglich 6–23 Uhr
      </footer>
    </div>
  );
}
