/* Demo-Vorlage: Fitnessstudio — dunkel + Neon-Lime, energiegeladen. */

const DUNKEL = "#0C0F10";
const LIME = "#C6FF2E";
const KARTE = "#161B1D";
const sans = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

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
      {/* Hero */}
      <section
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 24px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        <p style={{ color: LIME, fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase", fontSize: "13px", marginBottom: "20px" }}>
          PULSE Gym · Augsburg
        </p>
        <h1 style={{ fontSize: "clamp(44px, 10vw, 120px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.03em", textTransform: "uppercase" }}>
          Werde die<br />beste<br /><span style={{ color: LIME }}>Version.</span>
        </h1>
        <p style={{ fontSize: "clamp(16px, 2.2vw, 20px)", maxWidth: "500px", lineHeight: 1.6, marginTop: "28px", color: "#A8B0B2" }}>
          Modernste Geräte, starke Kurse, echte Community. Dein Training, dein Tempo, dein Erfolg.
        </p>
        <a href="#tarife" style={{ alignSelf: "flex-start", marginTop: "36px", background: LIME, color: DUNKEL, textDecoration: "none", padding: "18px 44px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          Kostenloses Probetraining
        </a>
      </section>

      {/* Kursplan */}
      <section style={{ background: KARTE, padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, textTransform: "uppercase", marginBottom: "40px" }}>
            Kursplan
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {kurse.map((k) => (
              <div key={k.name} style={{ background: DUNKEL, padding: "28px 24px", borderLeft: `3px solid ${LIME}` }}>
                <div style={{ color: LIME, fontWeight: 800, fontSize: "14px", marginBottom: "8px" }}>{k.zeit}</div>
                <div style={{ fontSize: "20px", fontWeight: 800, textTransform: "uppercase", marginBottom: "4px" }}>{k.name}</div>
                <div style={{ color: "#8A9294", fontSize: "14px" }}>{k.trainer}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarife */}
      <section id="tarife" style={{ maxWidth: "1100px", margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 900, textTransform: "uppercase", textAlign: "center", marginBottom: "48px" }}>
          Mitgliedschaften
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px", alignItems: "stretch" }}>
          {tarife.map((t) => (
            <div key={t.name} style={{ background: t.top ? LIME : KARTE, color: t.top ? DUNKEL : "#fff", padding: "36px 28px", display: "flex", flexDirection: "column" }}>
              {t.top && <div style={{ fontWeight: 900, fontSize: "11px", letterSpacing: "0.2em", marginBottom: "12px" }}>BELIEBT</div>}
              <div style={{ fontSize: "20px", fontWeight: 900, textTransform: "uppercase", marginBottom: "10px" }}>{t.name}</div>
              <div style={{ fontSize: "48px", fontWeight: 900, lineHeight: 1 }}>{t.preis}€<span style={{ fontSize: "16px", fontWeight: 700 }}>/Mon.</span></div>
              <p style={{ marginTop: "16px", fontSize: "14px", lineHeight: 1.6, flex: 1, opacity: 0.85 }}>{t.text}</p>
              <a href="#" style={{ marginTop: "24px", textAlign: "center", background: t.top ? DUNKEL : LIME, color: t.top ? LIME : DUNKEL, textDecoration: "none", padding: "14px", fontWeight: 900, textTransform: "uppercase" }}>
                Auswählen
              </a>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #ffffff14", padding: "32px 24px", textAlign: "center", fontSize: "14px", color: "#8A9294" }}>
        PULSE Gym · Gögginger Str. 100, 86199 Augsburg · Täglich 6–23 Uhr
      </footer>
    </div>
  );
}
