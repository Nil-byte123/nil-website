"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { NilLogo } from "./NilLogo";

/* ─── Punkte-Navigation ──────────────────────────────────────────
   Rechts am Rand: ein Punkt pro Abschnitt. Das NIL-Logo wandert
   beim Scrollen zum aktuellen Abschnitt mit, ein Klick auf einen
   Punkt springt dorthin. Oben läuft ein Fortschrittsbalken mit.   */

const ABSTAND = 34; // px zwischen zwei Punkten

export function PunkteNav({
  abschnitte,
  label,
}: {
  abschnitte: { id: string; label: string }[];
  label: string;
}) {
  const [aktiv, setAktiv] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const fortschritt = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });

  useEffect(() => {
    let frame = 0;
    function messen() {
      frame = 0;
      const grenze = window.innerHeight * 0.4;
      let index = 0;
      abschnitte.forEach((a, i) => {
        const el = document.getElementById(a.id);
        if (el && el.getBoundingClientRect().top <= grenze) index = i;
      });
      // Ganz unten angekommen → letzter Abschnitt
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        index = abschnitte.length - 1;
      }
      setAktiv(index);
    }
    function beimScrollen() {
      if (!frame) frame = requestAnimationFrame(messen);
    }
    messen();
    window.addEventListener("scroll", beimScrollen, { passive: true });
    window.addEventListener("resize", beimScrollen);
    return () => {
      window.removeEventListener("scroll", beimScrollen);
      window.removeEventListener("resize", beimScrollen);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [abschnitte]);

  function springe(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }

  return (
    <>
      {/* Fortschrittsbalken oben */}
      <motion.div className="scroll-fortschritt" style={{ scaleX: fortschritt }} aria-hidden="true" />

      <nav className="punkte-nav" aria-label={label}>
        <span className="punkte-spur" style={{ height: `${(abschnitte.length - 1) * ABSTAND}px` }} aria-hidden="true" />
        <motion.span
          className="punkte-spur-voll"
          aria-hidden="true"
          animate={{ height: aktiv * ABSTAND }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        />

        {/* Das wandernde NIL-Logo */}
        <motion.span
          className="punkte-logo"
          aria-hidden="true"
          animate={{ y: aktiv * ABSTAND }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 24 }}
        >
          <NilLogo size={11} />
        </motion.span>

        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          {abschnitte.map((a, i) => (
            <li key={a.id} style={{ height: `${ABSTAND}px` }}>
              <button
                type="button"
                className={`punkt${i === aktiv ? " ist-aktiv" : ""}`}
                onClick={() => springe(a.id)}
                aria-label={a.label}
                aria-current={i === aktiv ? "true" : undefined}
              >
                <span className="punkt-label">{a.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
