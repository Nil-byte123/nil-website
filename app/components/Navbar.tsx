"use client";

import Link from "next/link";
import { useState } from "react";
import { NilLogo } from "./NilLogo";

const LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/ueber-uns", label: "Über uns" },
  { href: "/faq", label: "FAQ" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

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
        <div className="nav-desktop" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
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
            Warteliste
          </Link>
        </div>

        {/* Mobile-Burger */}
        <button
          className="nav-burger"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
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
            Warteliste
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
