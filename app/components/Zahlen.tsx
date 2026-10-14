"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

/* ─── Zahlen, die hochzählen ─────────────────────────────────────
   Zählen von 0 auf ihren Wert, sobald sie ins Bild scrollen.     */

function Zaehler({ wert, einheit }: { wert: number; einheit: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const sichtbar = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !sichtbar) return;
    if (reduce) {
      el.textContent = `${wert}${einheit}`;
      return;
    }
    const steuerung = animate(0, wert, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}${einheit}`;
      },
    });
    return () => steuerung.stop();
  }, [sichtbar, reduce, wert, einheit]);

  // Server-Rendering zeigt gleich den Endwert (gut für Suchmaschinen)
  return <span ref={ref}>{`${wert}${einheit}`}</span>;
}

export function Zahlen({ punkte }: { punkte: { wert: number; einheit: string; label: string }[] }) {
  return (
    <div className="glass zahlen">
      {punkte.map((p) => (
        <div key={p.label} className="zahl">
          <span className="zahl-wert grad-text">
            <Zaehler wert={p.wert} einheit={p.einheit} />
          </span>
          <span className="zahl-label">{p.label}</span>
        </div>
      ))}
    </div>
  );
}
