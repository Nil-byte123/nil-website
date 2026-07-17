import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { NilLogoBox } from "../components/NilLogo";

export const metadata: Metadata = {
  title: "Über uns",
  description:
    "Die Geschichte hinter NIL – Streetwear aus Deutschland. Schwarz, weiß, reduziert. Gegründet mit einer klaren Vision.",
};

export default function UeberUns() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      <section style={{ maxWidth: "760px", margin: "0 auto", padding: "80px 24px 100px" }}>
        <p
          style={{
            color: "var(--fg-faint)",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            marginBottom: "12px",
          }}
        >
          Über uns
        </p>
        <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: "40px" }}>
          Die Geschichte hinter NIL
        </h1>

        <div style={{ textAlign: "center", margin: "48px 0" }}>
          <NilLogoBox size={72} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          <Block title="Der Anfang">
            NIL ist in Deutschland entstanden – aus der Idee, dass gute Klamotten
            nicht laut sein müssen. Keine riesigen Grafiken, keine zehn Farben,
            kein unnötiger Schnickschnack. Nur klare Formen, gute Stoffe und
            ein Logo, das für sich steht.
          </Block>

          <Block title="Der Name">
            NIL bedeutet „nichts&quot; – und genau das ist der Punkt. Wir starten
            bei null und lassen alles weg, was nicht nötig ist. Was übrig
            bleibt, ist das Wesentliche: Schwarz, Weiß und ein sauberer Schnitt.
          </Block>

          <Block title="Die Vision">
            Wir bauen NIL Schritt für Schritt auf – ehrlich und ohne
            Abkürzungen. Der erste Drop ist in Arbeit: Hoodies, T-Shirts und
            Caps, produziert on demand, damit nichts auf Halde landet und
            nichts verschwendet wird.
          </Block>

          <Block title="Warum Warteliste?">
            Wir wollen es richtig machen statt schnell. Bis zum Launch kannst
            du dich auf die Warteliste setzen – dann gehörst du zu den Ersten,
            die den Drop sehen, bevor er offiziell live geht.
          </Block>
        </div>

        <div
          style={{
            marginTop: "64px",
            borderTop: "1px solid var(--line)",
            paddingTop: "40px",
            textAlign: "center",
          }}
        >
          <Link
            href="/#warteliste"
            className="btn-solid"
            style={{
              display: "inline-block",
              textDecoration: "none",
              background: "#FAFAFA",
              color: "#0A0A0A",
              padding: "14px 32px",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Auf die Warteliste
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderLeft: "2px solid var(--line-strong)", paddingLeft: "24px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "10px" }}>
        {title}
      </h2>
      <p style={{ color: "var(--fg-muted)", fontSize: "15px", lineHeight: 1.8 }}>{children}</p>
    </div>
  );
}
