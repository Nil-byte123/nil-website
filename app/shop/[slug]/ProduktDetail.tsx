"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Farbe, Produkt } from "../produkte";

/* ─── Produkt-Ansicht (Platzhalter, bis echte Fotos da sind) ────
   front  = kleines Logo links auf der Brust (bzw. mittig bei Cap)
   detail = Logo-Nahaufnahme
   back   = Rückseite, bewusst leer                              */

type Ansicht = { label: string; art: "front" | "detail" | "back" };

export function ProduktBild({
  farbe,
  art,
  istCap,
  slug,
}: {
  farbe: Farbe;
  art: "front" | "detail" | "back";
  istCap: boolean;
  slug: string;
}) {
  const dunkel = farbe === "Schwarz";
  const logo = dunkel ? "/nil-logo-weiss.png" : "/nil-logo-schwarz.png";
  /* Echte Printful-Mockups liegen in /public/produkte/ */
  const foto = `/produkte/${slug}-${dunkel ? "schwarz" : "weiss"}.webp`;

  /* Vorderseite = echtes Produktfoto von Printful */
  if (art === "front") {
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          background: "#EDEDED",
        }}
      >
        <Image
          src={foto}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: dunkel ? "#000000" : "#F5F5F5",
      }}
    >
      {art === "detail" && (
        <Image
          src={logo}
          alt=""
          width={792}
          height={408}
          priority
          style={{
            position: "absolute",
            width: "46%",
            height: "auto",
            left: "27%",
            top: "38%",
          }}
        />
      )}
      {art === "back" && (
        <span
          style={{
            position: "absolute",
            bottom: "10%",
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: dunkel ? "rgba(255,255,255,0.25)" : "rgba(0,0,0,0.25)",
          }}
        >
          Rückseite – bewusst leer
        </span>
      )}
    </div>
  );
}

/* ─── Detailseite ───────────────────────────────────────────── */

export function ProduktDetail({ produkt }: { produkt: Produkt }) {
  const istCap = produkt.typ === "Cap";
  const ansichten: Ansicht[] = istCap
    ? [
        { label: "Vorne", art: "front" },
        { label: "Logo-Detail", art: "detail" },
      ]
    : [
        { label: "Vorderseite", art: "front" },
        { label: "Logo-Detail", art: "detail" },
        { label: "Rückseite", art: "back" },
      ];

  const [farbe, setFarbe] = useState<Farbe>(produkt.farben[0]);
  const [groesse, setGroesse] = useState<string | null>(
    produkt.groessen.length === 1 ? produkt.groessen[0] : null
  );
  const [ansicht, setAnsicht] = useState(0);

  return (
    <section style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px 100px" }}>
      <Link
        href="/shop"
        style={{
          display: "inline-block",
          marginBottom: "32px",
          textDecoration: "none",
          color: "var(--fg-muted)",
          fontSize: "13px",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        ← Zurück zum Shop
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "48px",
          alignItems: "start",
        }}
      >
        {/* ─── Galerie ─────────────────────────────── */}
        <div>
          <div
            style={{
              aspectRatio: "1 / 1",
              border: "1px solid var(--line)",
              overflow: "hidden",
            }}
          >
            <ProduktBild farbe={farbe} art={ansichten[ansicht].art} istCap={istCap} slug={produkt.slug} />
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            {ansichten.map((a, i) => (
              <button
                key={a.art}
                onClick={() => setAnsicht(i)}
                aria-label={a.label}
                style={{
                  width: "72px",
                  height: "72px",
                  padding: 0,
                  border:
                    i === ansicht
                      ? "1px solid var(--fg)"
                      : "1px solid var(--line)",
                  background: "transparent",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
              >
                <ProduktBild farbe={farbe} art={a.art} istCap={istCap} slug={produkt.slug} />
              </button>
            ))}
          </div>
          <p style={{ color: "var(--fg-faint)", fontSize: "12px", marginTop: "12px" }}>
            Produktfoto: Vorschau unseres Print-Partners. Eigene Fotos folgen zum Launch.
          </p>
        </div>

        {/* ─── Infos ───────────────────────────────── */}
        <div>
          <p
            style={{
              color: "var(--fg-faint)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            {produkt.typ}
          </p>
          <h1
            style={{
              fontSize: "clamp(26px, 3.5vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            {produkt.name}
          </h1>
          <p style={{ fontSize: "20px", fontWeight: 800, marginTop: "12px" }}>
            {produkt.preis}
          </p>

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
              marginTop: "16px",
            }}
          >
            Bald verfügbar
          </div>

          {/* Farbe */}
          <div style={{ marginTop: "32px" }}>
            <p style={auswahlLabel}>Farbe: {farbe}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {produkt.farben.map((f) => (
                <button
                  key={f}
                  onClick={() => setFarbe(f)}
                  aria-label={f}
                  style={{
                    width: "36px",
                    height: "36px",
                    background: f === "Schwarz" ? "#000000" : "#F5F5F5",
                    border:
                      f === farbe
                        ? "2px solid var(--fg)"
                        : "1px solid var(--line-strong)",
                    cursor: "pointer",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Größe */}
          <div style={{ marginTop: "28px" }}>
            <p style={auswahlLabel}>Größe{groesse ? `: ${groesse}` : ""}</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {produkt.groessen.map((g) => (
                <button
                  key={g}
                  onClick={() => setGroesse(g)}
                  style={{
                    padding: "10px 16px",
                    fontSize: "13px",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    background: g === groesse ? "#FAFAFA" : "transparent",
                    color: g === groesse ? "#0A0A0A" : "var(--fg)",
                    border:
                      g === groesse
                        ? "1px solid #FAFAFA"
                        : "1px solid var(--line-strong)",
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div style={{ marginTop: "36px" }}>
            <Link
              href="/#warteliste"
              className="btn-solid"
              style={{
                display: "block",
                textAlign: "center",
                textDecoration: "none",
                background: "#FAFAFA",
                color: "#0A0A0A",
                padding: "16px 32px",
                fontSize: "13px",
                fontWeight: 800,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Auf die Warteliste
            </Link>
            <p style={{ color: "var(--fg-faint)", fontSize: "12px", marginTop: "10px", textAlign: "center" }}>
              Kaufen geht noch nicht – der Verkauf startet mit dem ersten Drop.
            </p>
          </div>

          {/* Beschreibung */}
          <p
            style={{
              color: "var(--fg-muted)",
              fontSize: "15px",
              lineHeight: 1.8,
              marginTop: "40px",
            }}
          >
            {produkt.beschreibung}
          </p>

          {/* Details */}
          <div style={{ marginTop: "28px", borderTop: "1px solid var(--line)", paddingTop: "24px" }}>
            <p style={auswahlLabel}>Details</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {produkt.details.map((d) => (
                <li
                  key={d}
                  style={{
                    color: "var(--fg-muted)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    padding: "6px 0",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>

          {/* So läuft die Bestellung */}
          <div
            style={{
              marginTop: "28px",
              border: "1px solid var(--line)",
              background: "var(--bg-soft)",
              padding: "24px",
            }}
          >
            <p style={auswahlLabel}>So läuft die Bestellung später</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                "Jedes Teil wird erst nach deiner Bestellung produziert (on demand) – keine Überproduktion.",
                `Produziert bei unserem Print-Partner in Europa (${produkt.herstellung}).`,
                "Produktion ca. 2–5 Werktage, danach Versand nach Deutschland.",
                "Der Verkauf startet mit dem ersten Drop – die Warteliste erfährt es zuerst.",
              ].map((z) => (
                <li
                  key={z}
                  style={{
                    color: "var(--fg-muted)",
                    fontSize: "13px",
                    lineHeight: 1.7,
                    padding: "5px 0",
                  }}
                >
                  – {z}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

const auswahlLabel: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--fg-muted)",
  marginBottom: "12px",
};
