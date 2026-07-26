import Link from "next/link";
import { NilLogo } from "./components/NilLogo";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <div className="fade-up">
        <NilLogo size={40} />

        <div
          style={{
            fontSize: "clamp(72px, 15vw, 120px)",
            fontWeight: 900,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            marginTop: "40px",
            marginBottom: "16px",
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "clamp(18px, 3vw, 24px)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: "12px",
          }}
        >
          Seite nicht gefunden
        </h1>

        <p
          style={{
            fontSize: "15px",
            color: "var(--fg-muted)",
            lineHeight: 1.7,
            maxWidth: "380px",
            margin: "0 auto 40px",
          }}
        >
          Diese Seite existiert nicht oder wurde verschoben.
        </p>

        <Link
          href="/"
          style={{
            display: "inline-block",
            background: "#FAFAFA",
            color: "#0A0A0A",
            padding: "14px 32px",
            fontWeight: 800,
            fontSize: "13px",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
