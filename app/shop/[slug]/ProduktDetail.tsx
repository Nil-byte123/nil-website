"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Farbe, Produkt } from "../produkte";
import { TEXTE, type Sprache } from "../../i18n/texte";

/* ─── Produktfoto (echtes Printful-Mockup) ──────────────────── */

export function ProduktBild({
  farbe,
  slug,
  src,
}: {
  farbe: Farbe;
  slug: string;
  /* Optional: eigenes Bild statt des Standard-Mockups (z.B. Seitenansicht) */
  src?: string;
}) {
  const foto = src ?? `/produkte/${slug}-${farbe === "Schwarz" ? "schwarz" : "weiss"}.webp`;
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

/* ─── Statement-Kachel: Verkaufs-Sätze statt leerer Fläche ──── */

function StatementBild({
  titel,
  text,
  klein = false,
}: {
  titel: string;
  text: string;
  klein?: boolean;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#0A0A0A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: klein ? "8%" : "12%",
        gap: klein ? "0" : "18px",
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          color: "#FAFAFA",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.01em",
          lineHeight: 1.15,
          fontSize: klein ? "9px" : "clamp(22px, 3vw, 34px)",
          margin: 0,
        }}
      >
        {titel}
      </p>
      {!klein && (
        <p
          style={{
            color: "var(--fg-muted)",
            fontSize: "14px",
            lineHeight: 1.7,
            maxWidth: "340px",
            margin: 0,
          }}
        >
          {text}
        </p>
      )}
    </div>
  );
}

/* ─── Detailseite ───────────────────────────────────────────── */

export function ProduktDetail({ produkt, sprache = "de" }: { produkt: Produkt; sprache?: Sprache }) {
  const t = TEXTE[sprache].produkt;
  /* Galerie: Mockup-Foto + Extra-Ansichten (z.B. Seite/Rückseite) + Statement-Kacheln */
  type Ansicht =
    | { label: string; art: "foto" }
    | { label: string; art: "extra"; index: number }
    | { label: string; art: "statement"; index: number };

  const ansichten: Ansicht[] = [
    { label: t.fotoLabel, art: "foto" },
    ...(produkt.extraAnsichten ?? []).map((e, i) => ({
      label: e.label[sprache],
      art: "extra" as const,
      index: i,
    })),
    ...produkt.statements.map((s, i) => ({
      label: s.titel[sprache],
      art: "statement" as const,
      index: i,
    })),
  ];

  const [farbe, setFarbe] = useState<Farbe>(produkt.farben[0]);
  const [groesse, setGroesse] = useState<string | null>(
    produkt.groessen.length === 1 ? produkt.groessen[0] : null
  );
  const [ansicht, setAnsicht] = useState(0);

  const aktiv = ansichten[ansicht];

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
        {t.zurueck}
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
            {aktiv.art === "foto" && <ProduktBild farbe={farbe} slug={produkt.slug} />}
            {aktiv.art === "extra" && (
              <ProduktBild
                farbe={farbe}
                slug={produkt.slug}
                src={produkt.extraAnsichten![aktiv.index].bilder[farbe]}
              />
            )}
            {aktiv.art === "statement" && (
              <StatementBild
                titel={produkt.statements[aktiv.index].titel[sprache]}
                text={produkt.statements[aktiv.index].text[sprache]}
              />
            )}
          </div>

          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            {ansichten.map((a, i) => (
              <button
                key={a.label}
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
                {a.art === "foto" && <ProduktBild farbe={farbe} slug={produkt.slug} />}
                {a.art === "extra" && (
                  <ProduktBild
                    farbe={farbe}
                    slug={produkt.slug}
                    src={produkt.extraAnsichten![a.index].bilder[farbe]}
                  />
                )}
                {a.art === "statement" && (
                  <StatementBild
                    titel={produkt.statements[a.index].titel[sprache]}
                    text=""
                    klein
                  />
                )}
              </button>
            ))}
          </div>
          <p style={{ color: "var(--fg-faint)", fontSize: "12px", marginTop: "12px" }}>
            {t.fotoHinweis}
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
            <span
              style={{
                fontSize: "12px",
                fontWeight: 400,
                color: "var(--fg-faint)",
                marginLeft: "10px",
              }}
            >
              {t.zzglVersand}
            </span>
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
            {t.badge}
          </div>

          {/* Farbe */}
          <div style={{ marginTop: "32px" }}>
            <p style={auswahlLabel}>{t.farbe}: {t.farbNamen[farbe]}</p>
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
            <p style={auswahlLabel}>{t.groesse}{groesse ? `: ${groesse}` : ""}</p>
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
              {t.cta}
            </Link>
            <p style={{ color: "var(--fg-faint)", fontSize: "12px", marginTop: "10px", textAlign: "center" }}>
              {t.ctaHinweis}
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
            {produkt.beschreibung[sprache]}
          </p>

          {/* Warum so reduziert? */}
          <div style={{ marginTop: "28px", borderTop: "1px solid var(--line)", paddingTop: "24px" }}>
            <p style={auswahlLabel}>{t.warum}</p>
            <p style={{ color: "var(--fg-muted)", fontSize: "14px", lineHeight: 1.8 }}>
              {produkt.philosophie[sprache]}
            </p>
          </div>

          {/* Details */}
          <div style={{ marginTop: "28px", borderTop: "1px solid var(--line)", paddingTop: "24px" }}>
            <p style={auswahlLabel}>{t.details}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {produkt.details.map((d) => (
                <li
                  key={d.de}
                  style={{
                    color: "var(--fg-muted)",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    padding: "6px 0",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  {d[sprache]}
                </li>
              ))}
            </ul>
          </div>

          {/* Größentabelle */}
          {produkt.masse && (
            <div style={{ marginTop: "28px", borderTop: "1px solid var(--line)", paddingTop: "24px" }}>
              <p style={auswahlLabel}>{t.masseTitel}</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr>
                      <th style={masseKopf}>{t.masseGroesse}</th>
                      {produkt.masse.spalten.map((sp) => (
                        <th key={sp.de} style={masseKopf}>
                          {sp[sprache]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {produkt.masse.zeilen.map((z) => (
                      <tr key={z.groesse}>
                        <td style={{ ...masseZelle, fontWeight: 700 }}>{z.groesse}</td>
                        {z.werte.map((w, i) => (
                          <td key={i} style={masseZelle}>
                            {w}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p style={{ color: "var(--fg-faint)", fontSize: "12px", marginTop: "10px" }}>
                {t.masseHinweis}
              </p>
            </div>
          )}

          {/* So läuft die Bestellung */}
          <div
            style={{
              marginTop: "28px",
              border: "1px solid var(--line)",
              background: "var(--bg-soft)",
              padding: "24px",
            }}
          >
            <p style={auswahlLabel}>{t.bestellung}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {t.bestellPunkte.map((punkt) =>
                punkt.replace("{herstellung}", produkt.herstellung[sprache])
              ).map((z) => (
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

const masseKopf: React.CSSProperties = {
  textAlign: "left",
  padding: "8px 12px",
  color: "var(--fg-faint)",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  borderBottom: "1px solid var(--line-strong)",
};

const masseZelle: React.CSSProperties = {
  padding: "8px 12px",
  color: "var(--fg-muted)",
  borderBottom: "1px solid var(--line)",
};
