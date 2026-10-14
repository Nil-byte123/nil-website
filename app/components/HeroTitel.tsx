"use client";

import { motion, useReducedMotion } from "framer-motion";

/* ─── Hero-Titel ─────────────────────────────────────────────────
   Erste Zeile erscheint Wort für Wort (aus der Unschärfe),
   die Akzent-Zeile gleitet danach als Ganzes herein.             */

export function HeroTitel({ titel, akzent }: { titel: string; akzent: string }) {
  const reduce = useReducedMotion();
  const woerter = titel.split(" ");

  if (reduce) {
    return (
      <>
        {titel}
        <br />
        <span className="grad-text">{akzent}</span>
      </>
    );
  }

  return (
    <>
      {woerter.map((w, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: "0.24em" }}
          initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, delay: 0.15 + i * 0.09, ease: [0.16, 1, 0.3, 1] }}
        >
          {w}
        </motion.span>
      ))}
      <br />
      <motion.span
        className="grad-text"
        style={{ display: "inline-block" }}
        initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.9, delay: 0.25 + woerter.length * 0.09, ease: [0.16, 1, 0.3, 1] }}
      >
        {akzent}
      </motion.span>
    </>
  );
}
