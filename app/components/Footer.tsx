import Link from "next/link";
import { NilLogo } from "./NilLogo";
import { TEXTE, type Sprache } from "../i18n/texte";

export function Footer({ sprache = "de" }: { sprache?: Sprache }) {
  const t = TEXTE[sprache].footer;
  const nachOben = sprache === "de" ? "Nach oben" : "Back to top";
  const standort = sprache === "de" ? "Made in Germany · Bayern" : "Made in Germany · Bavaria";
  return (
    <footer style={{ background: "linear-gradient(180deg, var(--bg) 0%, #050810 180px)" }}>
      <div className="foot-accent" aria-hidden="true" />
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "64px 24px 32px" }}>
        <div className="foot-grid" style={{ marginBottom: "56px" }}>
          {/* Marke */}
          <div style={{ maxWidth: "300px" }}>
            <NilLogo size={32} />
            <p style={{ color: "var(--fg-faint)", fontSize: "13.5px", lineHeight: 1.75, margin: "18px 0 22px" }}>
              {t.beschreibung}
            </p>
            <a href="mailto:info@nilogik.de" className="foot-mail">
              <MailIcon />
              info@nilogik.de
            </a>
            <p style={{ color: "var(--fg-faint)", fontSize: "12px", marginTop: "18px", letterSpacing: "0.04em" }}>
              {standort}
            </p>
          </div>

          {/* Marke-Links */}
          <nav>
            <p style={footHead}>{t.marke}</p>
            <ul style={footList}>
              <li><Link href="/#leistungen" className="foot-link">{t.markeLinks.shop}</Link></li>
              <li><Link href="/ueber-uns" className="foot-link">{t.markeLinks.ueberUns}</Link></li>
              <li><Link href="/vorlagen" className="foot-link">{sprache === "de" ? "Vorlagen" : "Templates"}</Link></li>
              <li><Link href="/faq" className="foot-link">{t.markeLinks.faq}</Link></li>
            </ul>
          </nav>

          {/* Kontakt */}
          <nav>
            <p style={footHead}>{t.kontakt}</p>
            <ul style={footList}>
              <li><Link href="/kontakt" className="foot-link">{t.kontaktformular}</Link></li>
              <li><Link href="/#demo" className="foot-link">Demo</Link></li>
              <li><a href="mailto:info@nilogik.de" className="foot-link">info@nilogik.de</a></li>
            </ul>
          </nav>

          {/* Rechtliches */}
          <nav>
            <p style={footHead}>{t.rechtliches}</p>
            <ul style={footList}>
              <li><Link href="/impressum" className="foot-link">{t.impressum}</Link></li>
              <li><Link href="/datenschutz" className="foot-link">{t.datenschutz}</Link></li>
            </ul>
          </nav>
        </div>

        {/* Abschluss-Leiste */}
        <div
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: "22px",
            display: "flex",
            flexWrap: "wrap",
            gap: "14px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ color: "var(--fg-faint)", fontSize: "12px" }}>
            © {new Date().getFullYear()} NIL. {t.rechte}
          </p>
          <a href="#" className="foot-top" aria-label={nachOben}>
            {nachOben}
            <span aria-hidden="true" style={{ fontSize: "14px" }}>↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

const footHead: React.CSSProperties = {
  color: "var(--accent-2)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  marginBottom: "18px",
};

const footList: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "13px",
  fontSize: "13.5px",
};

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}
