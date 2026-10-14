import Link from "next/link";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Reveal, RevealStagger } from "./components/Reveal";
import { ChatDemo } from "./components/ChatDemo";
import { Icon } from "./components/Icons";
import { PunkteNav } from "./components/PunkteNav";
import { FaltKarte } from "./components/FaltKarte";
import { HeroTitel } from "./components/HeroTitel";
import { AblaufSchritte } from "./components/AblaufSchritte";
import { Zahlen } from "./components/Zahlen";
import { Laufband } from "./components/Laufband";
import { ermittleSprache } from "./i18n/sprache";
import { TEXTE } from "./i18n/texte";
import { DEMOS } from "./vorlagen/demos";

const CALENDLY = "https://calendly.com/nilogik";
const WERTE_ICONS = ["schild", "ort", "paket"];

export default async function Home() {
  const sprache = await ermittleSprache();
  const t = TEXTE[sprache];
  const sek = t.sektionen;
  const ABSCHNITTE = [
    { id: "start", label: sek.start },
    { id: "leistungen", label: sek.leistungen },
    { id: "ablauf", label: sek.ablauf },
    { id: "demo", label: sek.demo },
    { id: "warum", label: sek.warum },
    { id: "vorlagen", label: sek.vorlagen },
    { id: "faq", label: sek.faq },
    { id: "termin", label: sek.termin },
  ];

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      <div className="page-grid" aria-hidden="true" />

      <Navbar sprache={sprache} />
      <PunkteNav abschnitte={ABSCHNITTE} label={sek.navLabel} zurueck={sek.zurueck} weiter={sek.weiter} />

      {/* ─── Hero ─────────────────────────────────────── */}
      <section id="start" className="hero">
        <div className="hero-orb" aria-hidden="true" />

        <p className="pill fade-up">
          <span className="live-dot" aria-hidden="true" />
          {t.hero.badge}
        </p>

        <h1 className="h-display" style={{ marginTop: "28px", maxWidth: "900px" }}>
          <HeroTitel titel={t.hero.titel} akzent={t.hero.titelAkzent} />
        </h1>

        <p className="lead fade-up" style={{ animationDelay: "0.55s", maxWidth: "580px", marginTop: "24px" }}>
          {t.hero.text}
        </p>

        <div className="hero-buttons fade-up" style={{ animationDelay: "0.7s" }}>
          <Link href="/#termin" className="btn btn-primary">
            {t.hero.cta}
            <Icon name="pfeil" size={18} strich={2} />
          </Link>
          <Link href="/#demo" className="btn btn-glass">
            {t.hero.cta2}
          </Link>
        </div>

        <div className="vertrauen fade-up" style={{ animationDelay: "0.85s", marginTop: "48px" }}>
          {t.hero.vertrauen.map((p) => (
            <span key={p}>
              <Icon name="check" size={16} strich={2.2} />
              {p}
            </span>
          ))}
        </div>
      </section>

      {/* ─── Branchen-Laufband ────────────────────────── */}
      <Laufband titel={t.branchen.titel} liste={t.branchen.liste} />

      {/* ─── Leistungen ───────────────────────────────── */}
      <section id="leistungen" className="section">
        <div className="container">
          <Reveal>
            <div className="section-kopf">
              <p className="kicker">{t.leistungen.overline}</p>
              <h2 className="h-section">{t.leistungen.titel}</h2>
              <p className="lead">{t.leistungen.text}</p>
            </div>
          </Reveal>

          <div className="raster-3">
            {t.leistungen.karten.map((k, i) => (
              <FaltKarte
                key={k.titel}
                index={i}
                icon={k.icon}
                tag={k.tag}
                titel={k.titel}
                text={k.text}
                details={k.details}
                vorschau={t.leistungen.vorschau[k.icon as keyof typeof t.leistungen.vorschau]}
                mehr={t.leistungen.mehr}
                weniger={t.leistungen.weniger}
              />
            ))}
          </div>

          <Reveal delay={0.1}>
            <div style={{ marginTop: "40px", textAlign: "center" }}>
              <Link href="/kontakt" className="btn btn-glass">
                {t.leistungen.cta}
                <Icon name="pfeil" size={18} strich={2} />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── Ablauf ───────────────────────────────────── */}
      <section id="ablauf" className="section">
        <div className="container">
          <Reveal>
            <div className="section-kopf mittig">
              <p className="kicker">{t.ablauf.overline}</p>
              <h2 className="h-section">{t.ablauf.titel}</h2>
            </div>
          </Reveal>

          <AblaufSchritte schritte={t.ablauf.schritte} />
          <Reveal delay={0.1}>
            <Zahlen punkte={t.zahlen} />
          </Reveal>
        </div>
      </section>

      {/* ─── Live-Demo: Branchen-Chatbot ───────────────── */}
      <section id="demo" className="section">
        <div className="container-schmal" style={{ textAlign: "center" }}>
          <Reveal>
            <div className="section-kopf mittig">
              <p className="kicker">{t.demo.overline}</p>
              <h2 className="h-section">{t.demo.titel}</h2>
              <p className="lead">{t.demo.text}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ChatDemo />
          </Reveal>
        </div>
      </section>

      {/* ─── Warum NIL ────────────────────────────────── */}
      <section id="warum" className="section">
        <div className="container werte-split">
          <Reveal>
            <div>
              <p className="kicker">{t.werte.overline}</p>
              <h2 className="h-section">{t.werte.titel}</h2>
              <p className="lead">{t.werte.text}</p>
              <Link href="/ueber-uns" className="link-pfeil" style={{ marginTop: "28px" }}>
                {t.werte.cta}
                <Icon name="pfeil" size={16} strich={2} />
              </Link>
            </div>
          </Reveal>

          <div className="werte-liste">
            {t.werte.punkte.map((w, i) => (
              <Reveal key={w.titel} delay={i * 0.1} direction="right">
                <div className="glass glass-hover werte-punkt">
                  <span className="icon-badge">
                    <Icon name={WERTE_ICONS[i]} />
                  </span>
                  <div>
                    <h3 className="h-karte" style={{ marginBottom: "6px" }}>{w.titel}</h3>
                    <p className="text-karte">{w.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Vorlagen-Vorschau ────────────────────────── */}
      <section id="vorlagen" className="section">
        <div className="container">
          <Reveal>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "20px", marginBottom: "48px" }}>
              <div style={{ maxWidth: "640px" }}>
                <p className="kicker">{t.vorlagen.overline}</p>
                <h2 className="h-section">{t.vorlagen.titel}</h2>
              </div>
              <Link href="/vorlagen" className="link-pfeil">
                {t.vorlagen.alle}
                <Icon name="pfeil" size={16} strich={2} />
              </Link>
            </div>
          </Reveal>

          <div className="raster-3">
            <RevealStagger>
              {DEMOS.slice(0, 3).map((d) => (
                <Link
                  key={d.slug}
                  href={`/vorlagen/${d.slug}`}
                  className="glass glass-hover"
                  style={{ display: "flex", flexDirection: "column", height: "100%", textDecoration: "none", color: "inherit" }}
                >
                  <div className="vorlage-farben">
                    {d.farben.map((c) => (
                      <div key={c} style={{ background: c }} />
                    ))}
                  </div>
                  <div style={{ padding: "22px 24px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <span className="tag" style={{ alignSelf: "flex-start", marginBottom: "14px" }}>{d.branche}</span>
                    <h3 className="h-karte" style={{ marginBottom: "8px" }}>{d.name}</h3>
                    <p className="text-karte" style={{ flex: 1 }}>{d.beschreibung}</p>
                    <span className="link-pfeil" style={{ marginTop: "16px" }}>
                      {t.vorlagen.ansehen}
                      <Icon name="pfeil" size={16} strich={2} />
                    </span>
                  </div>
                </Link>
              ))}
            </RevealStagger>
          </div>
        </div>
      </section>

      {/* ─── Kurz-FAQ ─────────────────────────────────── */}
      <section id="faq" className="section">
        <div className="container-schmal">
          <Reveal>
            <div className="section-kopf mittig">
              <p className="kicker">{t.faq.overline}</p>
              <h2 className="h-section">{t.faq.titel}</h2>
            </div>
          </Reveal>
          {t.faq.fragen.slice(0, 4).map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <details className="faq-item">
                <summary>
                  {f.q}
                  <span className="faq-zeichen" aria-hidden="true" />
                </summary>
                <p className="faq-antwort">{f.a}</p>
              </details>
            </Reveal>
          ))}
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link href="/faq" className="link-pfeil">
              {t.faq.alle}
              <Icon name="pfeil" size={16} strich={2} />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Kostenloses Erstgespräch ─────────────────── */}
      <section id="termin" className="section">
        <div className="container">
          <Reveal>
            <div className="cta-card">
              <p className="kicker">{t.erstgespraech.overline}</p>
              <h2 className="h-section" style={{ marginBottom: "16px" }}>{t.erstgespraech.titel}</h2>
              <p className="lead" style={{ maxWidth: "500px", margin: "0 auto 36px" }}>
                {t.erstgespraech.text}
              </p>
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <a href={CALENDLY} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <Icon name="kalender" size={18} strich={2} />
                  {t.erstgespraech.cta}
                </a>
                <Link href="/kontakt" className="btn btn-glass">
                  {t.erstgespraech.oder}
                </Link>
              </div>
              <div className="cta-points">
                {t.erstgespraech.punkte.map((p) => (
                  <span key={p} className="cta-point">
                    <Icon name="check" size={16} strich={2.2} />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer sprache={sprache} />
    </main>
  );
}
