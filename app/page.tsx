import Link from "next/link";
import Image from "next/image";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { WaitlistForm } from "./components/WaitlistForm";
import { NilLogoBox } from "./components/NilLogo";
import { Reveal, RevealStagger } from "./components/Reveal";
import { ermittleSprache } from "./i18n/sprache";
import { TEXTE } from "./i18n/texte";
import { PRODUKTE } from "./shop/produkte";

export default async function Home() {
  const sprache = await ermittleSprache();
  const t = TEXTE[sprache];
  const MARQUEE_TEXT = t.hero.marquee;
  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      {/* Seitenweites, wanderndes Raster (blendet nach unten aus) */}
      <div className="page-grid" aria-hidden="true" />

      <Navbar sprache={sprache} />

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

        {/* Kleine Marken-Formen im Hintergrund */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <span className="deko-kreuz" style={{ top: "16%", left: "11%" }} />
          <span className="deko-kreuz" style={{ top: "34%", right: "13%" }} />
          <span className="deko-kreuz" style={{ bottom: "24%", left: "20%" }} />
          <span className="deko-kreuz" style={{ bottom: "14%", right: "9%" }} />
          <span className="deko-quadrat" style={{ top: "20%", right: "22%" }} />
          <span className="deko-quadrat" style={{ bottom: "26%", left: "7%" }} />
        </div>

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
          {t.hero.badge}
        </p>

        <div
          className="fade-up"
          style={{
            animationDelay: "0.1s",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <NilLogoBox size={100} />
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
          {t.hero.titel}
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
          {t.hero.text}
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
            {t.hero.cta}
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
          <p style={overline}>{t.teaser.overline}</p>
          <h2 style={h2}>{t.teaser.titel}</h2>
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
            {t.teaser.karten.map((k, i) => (
              <TeaserCard
                key={k.titel}
                title={k.titel}
                text={k.text}
                badge={t.teaser.badge}
                slug={PRODUKTE[i].slug}
                preis={PRODUKTE[i].preis}
              />
            ))}
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
              {t.teaser.cta}
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
            <p style={overline}>{t.marke.overline}</p>
            <h2 style={{ ...h2, marginBottom: "24px" }}>
              {t.marke.titel}
            </h2>
            <p style={{ color: "var(--fg-muted)", fontSize: "16px", lineHeight: 1.8 }}>
              {t.marke.text}
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
              {t.marke.cta}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ─── Newsletter: Die Warteliste ───────────────── */}
      <section
        style={{
          background:
            "linear-gradient(180deg, var(--bg) 0%, var(--bg-soft) 30%, var(--bg-soft) 70%, var(--bg) 100%)",
          padding: "100px 24px",
        }}
        id="warteliste"
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Reveal>
            <p style={overline}>{t.warteliste.overline}</p>
            <h2 style={{ ...h2, marginBottom: "16px" }}>
              {t.warteliste.titel}
            </h2>
            <p style={{ color: "var(--fg-muted)", fontSize: "15px", lineHeight: 1.8, marginBottom: "40px" }}>
              {t.warteliste.text}
            </p>
          </Reveal>

          <div style={{ maxWidth: "420px", margin: "0 auto" }}>
            <WaitlistForm sprache={sprache} />
          </div>
        </div>
      </section>

      <Footer sprache={sprache} />
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

function TeaserCard({
  title,
  text,
  badge,
  slug,
  preis,
}: {
  title: string;
  text: string;
  badge: string;
  slug: string;
  preis: string;
}) {
  return (
    <Link
      href={`/shop/${slug}`}
      className="card-hover"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        textDecoration: "none",
        color: "inherit",
        border: "1px solid var(--line)",
        background: "var(--bg-soft)",
      }}
    >
      {/* Echtes Produktfoto als Augenfänger */}
      <div
        className="img-zoom"
        style={{
          aspectRatio: "1 / 1",
          borderBottom: "1px solid var(--line)",
          overflow: "hidden",
          position: "relative",
          background: "#EDEDED",
        }}
      >
        <Image
          src={`/produkte/${slug}-schwarz.webp`}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          priority
          style={{ objectFit: "contain" }}
        />
      </div>
      <div style={{ padding: "24px 26px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            alignSelf: "flex-start",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--fg-faint)",
            border: "1px solid var(--line)",
            padding: "4px 10px",
            marginBottom: "16px",
          }}
        >
          {badge}
        </div>
        <h3 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "10px" }}>
          {title}
        </h3>
        <p style={{ color: "var(--fg-muted)", fontSize: "14px", lineHeight: 1.7, flex: 1 }}>{text}</p>
        <p style={{ fontSize: "15px", fontWeight: 800, marginTop: "14px" }}>{preis}</p>
      </div>
    </Link>
  );
}
