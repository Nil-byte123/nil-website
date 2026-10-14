"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icon } from "./Icons";
import { LeistungsVorschau } from "./LeistungsVorschau";

/* ─── Falt-Karte ─────────────────────────────────────────────────
   Klappt beim Scrollen von oben auf wie ein Blatt Papier.
   Per Klick faltet sich unten ein Detail-Bereich aus.            */

export function FaltKarte({
  icon,
  tag,
  titel,
  text,
  details,
  vorschau,
  mehr,
  weniger,
  index = 0,
}: {
  icon: string;
  tag: string;
  titel: string;
  text: string;
  details: string[];
  vorschau: string[];
  mehr: string;
  weniger: string;
  index?: number;
}) {
  const [offen, setOffen] = useState(false);
  const reduce = useReducedMotion();
  const detailId = useId();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, rotateX: -75, y: 30 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformOrigin: "top center", transformPerspective: 1000, height: "100%" }}
    >
      <div className={`glass glass-hover karte falt-karte${offen ? " ist-offen" : ""}`}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
          <span className="icon-badge">
            <Icon name={icon} />
          </span>
          <span className="tag">{tag}</span>
        </div>
        <h3 className="h-karte" style={{ marginBottom: "10px" }}>{titel}</h3>
        <p className="text-karte" style={{ flex: 1 }}>{text}</p>

        <AnimatePresence initial={false}>
          {offen && (
            <motion.div
              id={detailId}
              key="details"
              className="falt-details"
              initial={{ height: 0, opacity: 0, rotateX: -60 }}
              animate={{ height: "auto", opacity: 1, rotateX: 0 }}
              exit={{ height: 0, opacity: 0, rotateX: -60 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: "top center", transformPerspective: 800 }}
            >
              <LeistungsVorschau art={icon} labels={vorschau} />
              <ul>
              {details.map((d, i) => (
                <motion.li
                  key={d}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.35 }}
                >
                  <Icon name="check" size={15} strich={2.2} />
                  {d}
                </motion.li>
              ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="button"
          className="falt-knopf"
          onClick={() => setOffen((o) => !o)}
          aria-expanded={offen}
          aria-controls={detailId}
        >
          {offen ? weniger : mehr}
          <span className="falt-plus" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}
