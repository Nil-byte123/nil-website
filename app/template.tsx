/* ─── Seitenwechsel ──────────────────────────────────────────────
   Next.js rendert das Template bei jedem Seitenwechsel neu, dadurch
   startet die Einblend-Animation (.seite-ein) jedes Mal von vorn.
   Bewusst nur Deckkraft, damit fixierte Elemente (Punkte-Leiste,
   Cookie-Banner) nicht an einen verschobenen Container gebunden werden. */

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="seite-ein">{children}</div>;
}
