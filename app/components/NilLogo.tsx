import Image from "next/image";

/* ─── NIL Wortmarke ──────────────────────────────────────────────
   Finale Logo-Dateien (liegen in /public):
   - nil-logo-weiss.png   → weiß, transparent (für dunkle Flächen)
   - nil-logo-schwarz.png → schwarz, transparent (für helle Flächen)
   Seitenverhältnis: 792 × 408 (≈ 1.94 : 1)                        */

const RATIO = 792 / 408;

export function NilLogo({
  size = 28,
  variant = "weiss",
}: {
  size?: number;
  variant?: "weiss" | "schwarz";
}) {
  const height = size;
  const width = Math.round(size * RATIO);
  return (
    <Image
      src={variant === "weiss" ? "/nil-logo-weiss.png" : "/nil-logo-schwarz.png"}
      alt="NIL"
      width={width}
      height={height}
      priority
      style={{ display: "block", width: `${width}px`, height: `${height}px` }}
    />
  );
}

/* Große Hero-Variante */
export function NilLogoBox({
  size = 96,
}: {
  size?: number;
}) {
  return <NilLogo size={size} variant="weiss" />;
}
