import Link from "next/link";
import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WaitlistForm } from "./components/WaitlistForm";
import { NilLogoBox } from "./components/NilLogo";
import { Reveal, RevealStagger } from "./components/Reveal";

const MARQUEE_TEXT = "COMING SOON — NIL — STREETWEAR — ERSTER DROP — ";

export default function Home() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />

      {/* ─── Hero ─────────────────────────────────────── */}
      <section
        style={{
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "80px 24px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="hero-glow" aria-hidden="true" />
        <div className="scanline" aria-hidden="true" />

        <p
          className="fade-up"
          style={{
            color: "var(--fg-muted)",
            fontSize: "13px",
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            marginBottom: "32px",
          }}
        >
          Bald verfügbar
        </p>

        <div className="fade-up" style={{ animationDelay: "0.1s" }}>
          <div className="logo-float">
            <NilLogoBox size={100} />
          </div>
        </div>

        <h1
          className="fade-up"
          style={{
            animationDelay: "0.2s",
            fontSize: "clamp(24px, 4vw, 40px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginTop: "48px",
            maxWidth: "640px",
            lineHeight: 1.2,
          }}
        >
          Streetwear. Reduziert auf das, was zählt.
        </h1>

        <p
          className="fade-up"
          style={{
            animationDelay: "0.3s",
            color: "var(--fg-muted)",
            fontSize: "16px",
            lineHeight: 1.7,
            maxWidth: "480px",
            marginTop: "20px",
          }}
        >
          Der erste NIL Drop ist in Arbeit. Hoodies, T-Shirts und Caps –
          reduziert auf das Wesentliche.
        </p>

        <Reveal delay={0.4}>
          <Link
            href="/shop"
            className="btn-outline"
            style={{
              display: "inline-block",
              marginTop: "40px",
              textDecoration: "none",
              border: "1px solid var(--line-strong)",
              color: "var(--fg)",
              padding: "14px 32px",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Zur Vorschau
          </Link>
        </Reveal>
      </section>

      {/* ─── Doppelte Marquee (gegenläufig) ───────────── */}
      <div
        aria-hidden="true"
        style={{
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "14px 0", overflow: "hidden" }}>
          <div className="marquee-track">
            {[0, 1].map((i) => (
              <span
                key={i}
                style={{
                  fontSize: "14px",
                  fontWeight: 800,
                  letterSpacing: "0.25em",
                  color: "var(--fg-faint)",
                  whiteSpace: "nowrap",
                }}
              >
                {MARQUEE_TEXT.repeat(4)}
              </span>
            ))}
          </div>
        </div>
        <div
          style={{
            padding: "14px 0",
            overflow: "hidden",
            borderTop: "1px solid var(--line)",
          }}
        >
          <div className="marquee-track-reverse">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="outline-text"
                style={{
                  fontSize: "14px",
                  letterSpacing: "0.25em",
                  whiteSpace: "nowrap",
                  WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                }}
              >
                {MARQUEE_TEXT.repeat(4)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Teaser: Was kommt ─────────────────────────── */}
      <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 24px" }}>
        <Reveal>
          <p style={overline}>Der erste Drop</p>
          <h2 style={h2}>Was dich erwartet</h2>
        </Reveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gridAutoRows: "1fr",
            gap: "20px",
            marginTop: "48px",
            alignItems: "stretch",
          }}
        >
          <RevealStagger>
            <TeaserCard
              title="Hoodies"
              text="Schwerer Stoff, klarer Schnitt, NIL Blockprint. Keine überladenen Grafiken – das Logo spricht für sich."
            />
            <TeaserCard
              title="T-Shirts"
              text="Oversized Fit, dickes Baumwoll-Jersey. Minimalistisch vorne, Statement hinten."
            />
            <TeaserCard
              title="Caps & mehr"
              text="Accessoires im gleichen Look: schwarz, weiß, kompromisslos. Details folgen beim Launch."
            />
          </RevealStagger>
        </div>

        <div style={{ textAlign: "center", marginTop: "48px" }}>
          <Reveal delay={0.15}>
            <Link
              href="/shop"
              className="btn-outline"
              style={{
                display: "inline-block",
                textDecoration: "none",
                border: "1px solid var(--line-strong)",
                color: "var(--fg)",
                padding: "14px 32px",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Zur Vorschau →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── Riesiges Logo als Wasserzeichen ──────────── */}
      <section
        aria-hidden="true"
        style={{
          overflow: "hidden",
          padding: "40px 24px 60px",
          textAlign: "center",
        }}
      >
        <Reveal direction="scale">
          <Image
            src="/nil-logo-weiss.png"
            alt=""
            width={792}
            height={408}
            style={{
              width: "min(80vw, 760px)",
              height: "auto",
              opacity: 0.09,
              display: "block",
              margin: "0 auto",
              userSelect: "none",
              pointerEvents: "none",
            }}
          />
        </Reveal>
      </section>

      {/* ─── Brand Statement ──────────────────────────── */}
      <section
        style={{
          borderTop: "1px solid var(--line)",
          padding: "100px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <p style={overline}>Die Marke</p>
            <h2 style={{ ...h2, marginBottom: "24px" }}>
              Weniger Lärm. Mehr Haltung.
            </h2>
            <p style={{ color: "var(--fg-muted)", fontSize: "16px", lineHeight: 1.8 }}>
              NIL steht für Reduktion: schwarz, weiß, harte Kanten, ehrliche
              Basics. Gegründet in Deutschland, gedacht für alle, die keine
              Logos-Überall-Optik brauchen, um aufzufallen.
            </p>
            <Link
              href="/ueber-uns"
              style={{
                display: "inline-block",
                marginTop: "32px",
                textDecoration: "none",
                color: "var(--fg)",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                borderBottom: "1px solid var(--fg)",
                paddingBottom: "4px",
              }}
            >
              Mehr über NIL
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── Newsletter: Die Warteliste ───────────────── */}
      <section
        style={{
          borderTop: "1px solid var(--line)",
          borderBottom: "1px solid var(--line)",
          background: "var(--bg-soft)",
          padding: "80px 24px",
        }}
        id="warteliste"
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Reveal>
            <p style={overline}>Der erste Drop</p>
            <h2 style={{ ...h2, marginBottom: "16px" }}>
              Trag dich auf die Warteliste
            </h2>
            <p style={{ color: "var(--fg-muted)", fontSize: "15px", lineHeight: 1.8, marginBottom: "40px" }}>
              Erfahre als Erste:r, wenn der erste NIL Drop live geht. Kein Spam – nur Bescheid sagen, wenn es ernst wird.
            </p>
          </Reveal>

          <div style={{ maxWidth: "420px", margin: "0 auto" }}>
            <WaitlistForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

const overline: React.CSSProperties = {
  color: "var(--fg-faint)",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  marginBottom: "12px",
};

const h2: React.CSSProperties = {
  fontSize: "clamp(26px, 3.5vw, 36px)",
  fontWeight: 800,
  letterSpacing: "-0.03em",
};

function TeaserCard({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="card-hover"
      style={{
        border: "1px solid var(--line)",
        background: "var(--bg-soft)",
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        minHeight: "220px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--fg-faint)",
          border: "1px solid var(--line)",
          padding: "4px 10px",
          marginBottom: "20px",
        }}
      >
        Bald verfügbar
      </div>
      <h3 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "12px" }}>
        {title}
      </h3>
      <p style={{ color: "var(--fg-muted)", fontSize: "14px", lineHeight: 1.7, flex: 1 }}>{text}</p>
    </div>
  );
}
