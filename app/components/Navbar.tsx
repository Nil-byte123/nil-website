"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { NilLogo } from "./NilLogo";
import { TEXTE, type Sprache } from "../i18n/texte";

export function Navbar({ sprache = "de" }: { sprache?: Sprache }) {
  const [open, setOpen] = useState(false);
  const t = TEXTE[sprache].nav;
  const LINKS = t.links;

  /* EINE wandernde Unterstrich-Linie: gleitet beim Hover
     von Link zu Link, statt pro Link neu zu erscheinen. */
  const leisteRef = useRef<HTMLDivElement | null>(null);
  const [linie, setLinie] = useState({ x: 0, breite: 0, an: false });

  function bewegeLinie(e: React.MouseEvent<HTMLElement>) {
    const ziel = e.currentTarget;
    const leiste = leisteRef.current;
    if (!leiste) return;
    const zr = ziel.getBoundingClientRect();
    const lr = leiste.getBoundingClientRect();
    setLinie({ x: zr.left - lr.left, breite: zr.width, an: true });
  }

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      {/* Ansage-Leiste: Augenfänger ganz oben */}
      <Link
        href="/#warteliste"
        onClick={() => setOpen(false)}
        style={{
          display: "block",
          textDecoration: "none",
          background: "#FAFAFA",
          color: "#0A0A0A",
          textAlign: "center",
          padding: "8px 16px",
          fontSize: "11px",
          fontWeight: 800,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {t.ansage} →
      </Link>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          onClick={() => setOpen(false)}
          style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
        >
          <NilLogo size={26} />
        </Link>

        {/* Desktop-Links */}
        <div
          ref={leisteRef}
          className="nav-desktop"
          onMouseLeave={() => setLinie((l) => ({ ...l, an: false }))}
          style={{
            display: "flex",
            gap: "32px",
            alignItems: "center",
            position: "relative",
            height: "100%",
          }}
        >
          {/* Die eine wandernde Linie */}
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "16px",
              left: 0,
              height: "1px",
              width: `${linie.breite}px`,
              transform: `translateX(${linie.x}px)`,
              background: "var(--fg)",
              opacity: linie.an ? 1 : 0,
              transition:
                "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
              pointerEvents: "none",
            }}
          />
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link"
              onMouseEnter={bewegeLinie}
              style={{
                textDecoration: "none",
                color: "var(--fg-muted)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#warteliste"
            className="btn-solid btn-puls"
            style={{
              textDecoration: "none",
              background: "#FAFAFA",
              color: "#0A0A0A",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "10px 18px",
            }}
          >
            {t.warteliste}
          </Link>
        </div>

        {/* Mobile-Burger */}
        <button
          className="nav-burger"
          aria-label={open ? t.menueZu : t.menueAuf}
          onClick={() => setOpen(!open)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            color: "var(--fg)",
            fontSize: "24px",
            cursor: "pointer",
            padding: "8px",
          }}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile-Menü */}
      {open && (
        <div
          className="nav-mobile"
          style={{
            borderTop: "1px solid var(--line)",
            padding: "16px 24px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            background: "rgba(10,10,10,0.97)",
          }}
        >
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{
                textDecoration: "none",
                color: "var(--fg)",
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                padding: "12px 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/#warteliste"
            onClick={() => setOpen(false)}
            style={{
              textDecoration: "none",
              background: "#FAFAFA",
              color: "#0A0A0A",
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "14px 18px",
              textAlign: "center",
              marginTop: "16px",
            }}
          >
            {t.warteliste}
          </Link>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-burger { display: block !important; }
        }
        @media (min-width: 769px) {
          .nav-mobile { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
