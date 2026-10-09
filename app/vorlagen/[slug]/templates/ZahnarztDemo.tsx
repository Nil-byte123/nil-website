/* Demo-Vorlage: Zahnarztpraxis — ruhig, Weiß + Teal/Mint, vertrauensvoll. */

const TEAL = "#0B3A3A";
const MINT = "#4FD1C5";
const HELL = "#F2F8F7";
const sans = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

const leistungen = [
  { titel: "Prophylaxe", text: "Professionelle Zahnreinigung und Vorsorge für ein gesundes Lächeln." },
  { titel: "Ästhetik", text: "Bleaching, Veneers und unsichtbare Zahnkorrekturen." },
  { titel: "Implantologie", text: "Hochwertiger, langlebiger Zahnersatz, schonend eingesetzt." },
  { titel: "Kinderzahnheilkunde", text: "Einfühlsame Behandlung, damit der Zahnarztbesuch Spaß macht." },
];

export function ZahnarztDemo() {
  return (
    <div style={{ background: "#fff", color: TEAL, fontFamily: sans }}>
      {/* Hero */}
      <section style={{ background: HELL, padding: "90px 24px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", alignItems: "center" }}>
          <div>
            <p style={{ color: MINT, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", fontSize: "12px", marginBottom: "18px", filter: "brightness(0.8)" }}>
              Zahnarztpraxis · München
            </p>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "20px" }}>
              Ihr Lächeln in<br />besten Händen.
            </h1>
            <p style={{ fontSize: "17px", lineHeight: 1.7, color: "#3E5C5C", marginBottom: "32px" }}>
              Moderne Zahnmedizin in angenehmer Atmosphäre. Sanft, ehrlich und auf Sie persönlich abgestimmt.
            </p>
            <a href="#termin" style={{ background: TEAL, color: "#fff", textDecoration: "none", padding: "16px 36px", fontWeight: 700, borderRadius: "8px" }}>
              Termin vereinbaren
            </a>
          </div>
          <div style={{ aspectRatio: "4 / 3", background: `linear-gradient(135deg, ${MINT} 0%, ${TEAL} 100%)`, borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "80px" }}>
            🦷
          </div>
        </div>
      </section>

      {/* Leistungen */}
      <section style={{ maxWidth: "1000px", margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, textAlign: "center", marginBottom: "48px" }}>
          Unsere Leistungen
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "20px" }}>
          {leistungen.map((l) => (
            <div key={l.titel} style={{ background: HELL, borderRadius: "14px", padding: "30px 26px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: MINT, marginBottom: "18px" }} />
              <h3 style={{ fontSize: "19px", fontWeight: 800, marginBottom: "10px" }}>{l.titel}</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "#3E5C5C" }}>{l.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Termin CTA */}
      <section id="termin" style={{ background: TEAL, color: "#fff", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, marginBottom: "16px" }}>
          Einfach online einen Termin buchen
        </h2>
        <p style={{ fontSize: "17px", opacity: 0.85, maxWidth: "500px", margin: "0 auto 32px", lineHeight: 1.7 }}>
          Wählen Sie Ihren Wunschtermin bequem rund um die Uhr. Auch kurzfristige Termine möglich.
        </p>
        <a href="#" style={{ background: MINT, color: TEAL, textDecoration: "none", padding: "18px 44px", fontWeight: 800, borderRadius: "8px" }}>
          Online-Termin buchen
        </a>
      </section>

      <footer style={{ background: "#07292A", color: "#8FB3B2", padding: "32px 24px", textAlign: "center", fontSize: "14px" }}>
        Dental Carré · Sendlinger Str. 10, 80331 München · 089 334455
      </footer>
    </div>
  );
}
