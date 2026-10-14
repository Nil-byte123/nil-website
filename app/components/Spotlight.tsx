"use client";

import { useEffect } from "react";

/* ─── Lichtschein auf Glas-Karten ────────────────────────────────
   Setzt die Mausposition als CSS-Variablen (--mx/--my) auf die
   Glas-Karte unter dem Zeiger. Das eigentliche Licht malt das CSS
   (.glass::before). Nur für Geräte mit Maus.                      */

export function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let frame = 0;
    let letztes: PointerEvent | null = null;

    function setzen() {
      frame = 0;
      const e = letztes;
      if (!e) return;
      const ziel = (e.target as Element | null)?.closest?.(".glass") as HTMLElement | null;
      if (!ziel) return;
      const r = ziel.getBoundingClientRect();
      ziel.style.setProperty("--mx", `${e.clientX - r.left}px`);
      ziel.style.setProperty("--my", `${e.clientY - r.top}px`);
    }
    function bewegen(e: PointerEvent) {
      letztes = e;
      if (!frame) frame = requestAnimationFrame(setzen);
    }

    document.addEventListener("pointermove", bewegen, { passive: true });
    return () => {
      document.removeEventListener("pointermove", bewegen);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
