/* Demo-Vorlage: Friseur / Beauty — elegant, dunkel + Gold, modern. */

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
  { name: "Lena", rolle: "Inhaberin & Stylistin" },
  { name: "Marco", rolle: "Color-Spezialist" },
  { name: "Aylin", rolle: "Stylistin" },
];

export function SalonDemo() {
  return (
    <div style={{ background: DUNKEL, color: CREME, fontFamily: sans }}>
      {/* Hero */}
      <section
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px",
          background: `radial-gradient(ellipse at 50% 30%, #241E30 0%, ${DUNKEL} 70%)`,
        }}
      >
        <p style={{ color: GOLD, letterSpacing: "0.35em", textTransform: "uppercase", fontSize: "12px", marginBottom: "24px" }}>
          Friseur · Beauty · München
        </p>
        <h1 style={{ fontSize: "clamp(44px, 9vw, 96px)", fontWeight: 300, letterSpacing: "0.04em", lineHeight: 1, marginBottom: "24px" }}>
          Salon Nova
        </h1>
        <p style={{ fontSize: "clamp(15px, 2.2vw, 19px)", maxWidth: "480px", lineHeight: 1.7, color: "#C7BFB2" }}>
          Dein Look, perfekt in Szene gesetzt. Moderne Schnitte, feinste Coloration und ein Ort zum Wohlfühlen.
        </p>
        <a
          href="#termin"
          style={{
            marginTop: "40px",
            border: `1px solid ${GOLD}`,
            color: GOLD,
            textDecoration: "none",
            padding: "16px 44px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontSize: "13px",
          }}
        >
          Termin buchen
        </a>
      </section>

      {/* Services */}
      <section style={{ maxWidth: "960px", margin: "0 auto", padding: "90px 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, letterSpacing: "0.04em", marginBottom: "56px" }}>
          Unsere <span style={{ color: GOLD }}>Services</span>
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1px", background: "#ffffff14" }}>
          {services.map((s) => (
            <div key={s.titel} style={{ background: DUNKEL, padding: "40px 32px" }}>
              <div style={{ color: GOLD, fontSize: "14px", letterSpacing: "0.1em", marginBottom: "16px" }}>{s.preis}</div>
              <h3 style={{ fontSize: "22px", fontWeight: 400, marginBottom: "12px" }}>{s.titel}</h3>
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "#A69E90" }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "#1C1824", padding: "80px 24px" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 300, letterSpacing: "0.04em", marginBottom: "48px" }}>
            Dein <span style={{ color: GOLD }}>Team</span>
          </h2>
          <div style={{ display: "flex", gap: "40px", justifyContent: "center", flexWrap: "wrap" }}>
            {team.map((m) => (
              <div key={m.name} style={{ textAlign: "center" }}>
                <div style={{ width: "110px", height: "110px", borderRadius: "50%", border: `1px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "38px", fontWeight: 300, color: GOLD, margin: "0 auto 16px" }}>
                  {m.name[0]}
                </div>
                <div style={{ fontSize: "18px", marginBottom: "4px" }}>{m.name}</div>
                <div style={{ fontSize: "13px", color: "#A69E90", letterSpacing: "0.05em" }}>{m.rolle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Termin CTA */}
      <section id="termin" style={{ padding: "90px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 300, letterSpacing: "0.04em", marginBottom: "16px" }}>
          Bereit für deinen neuen Look?
        </h2>
        <p style={{ color: "#A69E90", maxWidth: "440px", margin: "0 auto 32px", lineHeight: 1.7 }}>
          Buche deinen Termin online, rund um die Uhr. Wir freuen uns auf dich.
        </p>
        <a href="#" style={{ background: GOLD, color: DUNKEL, textDecoration: "none", padding: "18px 48px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", fontSize: "13px" }}>
          Online Termin buchen
        </a>
      </section>

      <footer style={{ borderTop: "1px solid #ffffff14", padding: "32px 24px", textAlign: "center", fontSize: "13px", color: "#A69E90" }}>
        Salon Nova · Leopoldstraße 44, 80802 München · 089 555123
      </footer>
    </div>
  );
}
