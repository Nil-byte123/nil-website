/* ─── NIL Wortmarke ──────────────────────────────────────────────
   Platzhalter im Stil des finalen Logos: weiße Blockschrift,
   Buchstaben eng/verschmolzen, leicht schräg gestellt.
   Wird später durch die finalen PNG/SVG-Dateien ersetzt.        */

export function NilLogo({
  size = 28,
  color = "#FAFAFA",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <span
      aria-label="NIL"
      style={{
        display: "inline-block",
        fontSize: `${size}px`,
        fontWeight: 900,
        letterSpacing: "-0.12em",
        lineHeight: 1,
        color,
        transform: "skewX(-8deg)",
        textTransform: "uppercase",
        userSelect: "none",
      }}
    >
      NIL
    </span>
  );
}

/* Große Hero-Variante mit Rahmen-Box wie auf dem Logo-PNG */
export function NilLogoBox({
  size = 96,
}: {
  size?: number;
}) {
  return (
    <span
      aria-label="NIL"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000000",
        border: "1px solid rgba(255,255,255,0.14)",
        padding: `${size * 0.35}px ${size * 0.5}px`,
      }}
    >
      <span
        style={{
          fontSize: `${size}px`,
          fontWeight: 900,
          letterSpacing: "-0.12em",
          lineHeight: 1,
          color: "#FFFFFF",
          transform: "skewX(-8deg)",
          textTransform: "uppercase",
          userSelect: "none",
        }}
      >
        NIL
      </span>
    </span>
  );
}
