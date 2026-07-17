import Link from "next/link";
import { NilLogo } from "./NilLogo";

export function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "#050505" }}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "56px 24px 32px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            justifyContent: "space-between",
            marginBottom: "48px",
          }}
        >
          <div style={{ maxWidth: "280px" }}>
            <NilLogo size={30} />
            <p style={{ color: "var(--fg-faint)", fontSize: "13px", lineHeight: 1.7, marginTop: "16px" }}>
              Streetwear aus Deutschland. Klare Formen, keine Kompromisse. Bald verfügbar.
            </p>
          </div>

          <div style={{ display: "flex", gap: "56px", flexWrap: "wrap" }}>
            <div>
              <p style={footHead}>Marke</p>
              <FootLink href="/shop">Shop</FootLink>
              <FootLink href="/ueber-uns">Über uns</FootLink>
              <FootLink href="/faq">FAQ</FootLink>
            </div>
            <div>
              <p style={footHead}>Kontakt</p>
              <FootLink href="/kontakt">Kontaktformular</FootLink>
              <FootLink href="mailto:info@nilogik.de">info@nilogik.de</FootLink>
            </div>
            <div>
              <p style={footHead}>Rechtliches</p>
              <FootLink href="/impressum">Impressum</FootLink>
              <FootLink href="/datenschutz">Datenschutz</FootLink>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid var(--line)",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p style={{ color: "var(--fg-faint)", fontSize: "12px" }}>
            © {new Date().getFullYear()} NIL. Alle Rechte vorbehalten.
          </p>
          <p style={{ color: "var(--fg-faint)", fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Coming Soon
          </p>
        </div>
      </div>
    </footer>
  );
}

const footHead: React.CSSProperties = {
  color: "var(--fg)",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: "14px",
};

function FootLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: "block",
        textDecoration: "none",
        color: "var(--fg-muted)",
        fontSize: "13px",
        marginBottom: "10px",
      }}
    >
      {children}
    </Link>
  );
}
