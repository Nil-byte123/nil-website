"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { NilLogo } from "./NilLogo";

/* ─── Punkte-Navigation ──────────────────────────────────────────
   Rechts am Rand: ein Punkt pro Abschnitt. Das NIL-Logo wandert
   beim Scrollen zum aktuellen Abschnitt mit, ein Klick auf einen
   Punkt springt dorthin. Oben läuft ein Fortschrittsbalken mit.
   Auf kleineren Bildschirmen gibt's stattdessen unten eine Glas-
   Leiste mit dem aktuellen Abschnitt und Pfeilen hoch/runter.     */

const ABSTAND = 34; // px zwischen zwei Punkten

export function PunkteNav({
  abschnitte,
  label,
  zurueck,
  weiter,
}: {
  abschnitte: { id: string; label: string }[];
  label: string;
  zurueck: string;
  weiter: string;
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

      {/* Handy & Tablet: Abschnitts-Leiste unten */}
      <AnimatePresence>
        {aktiv > 0 && (
          <motion.div
            className="punkte-mobil"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          >
            <button type="button" className="punkte-mobil-knopf" onClick={() => springe(abschnitte[aktiv - 1].id)} aria-label={zurueck}>
              <PfeilIcon hoch />
            </button>
            <span className="punkte-mobil-text">
              <span className="punkte-mobil-zahl">{aktiv + 1}/{abschnitte.length}</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={aktiv}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                >
                  {abschnitte[aktiv].label}
                </motion.span>
              </AnimatePresence>
            </span>
            <button
              type="button"
              className="punkte-mobil-knopf"
              onClick={() => springe(abschnitte[Math.min(aktiv + 1, abschnitte.length - 1)].id)}
              disabled={aktiv === abschnitte.length - 1}
              aria-label={weiter}
            >
              <PfeilIcon />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function PfeilIcon({ hoch = false }: { hoch?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: hoch ? "rotate(180deg)" : undefined }}>
      <path d="M12 5v14m-6-6 6 6 6-6" />
    </svg>
  );
}
