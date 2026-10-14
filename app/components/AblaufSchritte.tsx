"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

/* ─── Ablauf als Zeitstrahl ──────────────────────────────────────
   Eine Linie zeichnet sich von links nach rechts, die Schritt-
   Nummern ploppen nacheinander auf, sobald die Linie sie erreicht.
   Gesteuert über den ganzen Block (Varianten), damit die Nummern
   nicht selbst „sichtbar“ sein müssen, solange sie noch Größe 0 haben. */

const LINIE_DAUER = 1.4;

const linie: Variants = {
  aus: { scaleX: 0 },
  an: { scaleX: 1, transition: { duration: LINIE_DAUER, ease: [0.65, 0, 0.35, 1] } },
};
const karte: Variants = {
  aus: { opacity: 0, y: 30 },
  an: (t: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: t * 0.8, ease: [0.16, 1, 0.3, 1] } }),
};
const nummer: Variants = {
  aus: { scale: 0 },
  an: (t: number) => ({ scale: 1, transition: { type: "spring", stiffness: 380, damping: 16, delay: t } }),
};

export function AblaufSchritte({ schritte }: { schritte: { titel: string; text: string }[] }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="schritte"
      initial={reduce ? false : "aus"}
      whileInView="an"
      viewport={{ once: true, margin: "-80px" }}
    >
      <motion.span className="schritte-linie" aria-hidden="true" variants={linie} />
      {schritte.map((s, i) => {
        const zeitpunkt = (i / Math.max(1, schritte.length - 1)) * LINIE_DAUER;
        return (
          <motion.div key={s.titel} className="glass karte" variants={karte} custom={zeitpunkt}>
            <motion.span className="schritt-nr" variants={nummer} custom={zeitpunkt}>
              {i + 1}
            </motion.span>
            <h3 className="h-karte" style={{ marginBottom: "10px" }}>{s.titel}</h3>
            <p className="text-karte">{s.text}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
