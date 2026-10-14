"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Icon } from "./Icons";

/* ─── Mini-Vorführung pro Leistung ───────────────────────────────
   Kleine, sich wiederholende Animation, die zeigt, was die Lösung
   tut (z.B. Mails sortieren sich selbst). Läuft in Runden: alle
   paar Sekunden wird die Szene neu aufgebaut.                     */

const RUNDE_MS = 5200;
const weich = [0.16, 1, 0.3, 1] as const;

export function LeistungsVorschau({ art, labels }: { art: string; labels: string[] }) {
  const reduce = useReducedMotion();
  const [runde, setRunde] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setRunde((r) => r + 1), RUNDE_MS);
    return () => clearInterval(id);
  }, [reduce]);

  // Bei reduzierter Bewegung: Endzustand sofort zeigen
  const start = reduce ? false : undefined;
  const Szene = SZENEN[art] ?? SzeneMail;

  return (
    <div className="vorschau" aria-hidden="true">
      <Szene key={runde} labels={labels} start={start} />
    </div>
  );
}

type SzeneProps = { labels: string[]; start: false | undefined };

/* E-Mails rutschen rein und bekommen ihr Etikett */
function SzeneMail({ labels, start }: SzeneProps) {
  const farben = ["#5BB8FF", "#7CE0A3", "#FF8A8A"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
      {labels.map((l, i) => (
        <motion.div
          key={l}
          className="vs-zeile"
          initial={start ?? { opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + i * 0.55, duration: 0.5, ease: weich }}
        >
          <span style={{ color: "var(--fg-muted)", display: "flex" }}><Icon name="mail" size={15} /></span>
          <span className="vs-balken" style={{ width: `${55 - i * 8}%` }} />
          <motion.span
            className="vs-etikett"
            style={{ color: farben[i], borderColor: farben[i] }}
            initial={start ?? { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.75 + i * 0.55, type: "spring", stiffness: 400, damping: 18 }}
          >
            {l}
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

/* Frage → Tipp-Punkte → Antwort */
function SzeneChat({ labels, start }: SzeneProps) {
  const [phase, setPhase] = useState(start === false ? 2 : 0);
  useEffect(() => {
    if (start === false) return;
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [start]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <motion.div
        className="vs-blase vs-blase-ich"
        initial={start ?? { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {labels[0]}
      </motion.div>
      {phase === 1 && (
        <motion.div
          className="vs-blase"
          style={{ display: "flex", gap: "4px", width: "fit-content" }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {[0, 1, 2].map((i) => <span key={i} className="tipp-punkt" style={{ animationDelay: `${i * 0.15}s` }} />)}
        </motion.div>
      )}
      {phase === 2 && (
        <motion.div
          className="vs-blase"
          initial={start ?? { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {labels[1]}
        </motion.div>
      )}
    </div>
  );
}

/* Dokument wird gescannt, Felder werden ausgelesen */
function SzeneDokument({ labels, start }: SzeneProps) {
  const werte = ["249,00 €", "14.10.", "Müller GmbH"];
  return (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", height: "100%" }}>
      <div className="vs-dokument">
        {[80, 60, 70, 45, 65].map((b, i) => <span key={i} className="vs-balken" style={{ width: `${b}%` }} />)}
        {start === undefined && (
          <motion.span
            className="vs-scanner"
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "92%", "0%"] }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "7px", flex: 1 }}>
        {labels.map((l, i) => (
          <motion.div
            key={l}
            className="vs-feld"
            initial={start ?? { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.4, duration: 0.4, ease: weich }}
          >
            <span style={{ color: "var(--fg-faint)" }}>{l}</span>
            <strong>{werte[i]}</strong>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* Angebot füllt sich, dann kommt der PDF-Stempel */
function SzeneRechnung({ labels, start }: SzeneProps) {
  return (
    <div style={{ position: "relative", height: "100%" }}>
      <div className="vs-dokument" style={{ width: "100%", height: "100%", padding: "12px 14px" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "var(--fg)", marginBottom: "4px" }}>{labels[0]}</span>
        {[70, 50, 62].map((b, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
            <motion.span
              className="vs-balken"
              initial={start ?? { width: 0 }}
              animate={{ width: `${b}%` }}
              transition={{ delay: 0.3 + i * 0.35, duration: 0.6, ease: weich }}
            />
            <motion.span
              className="vs-balken"
              style={{ width: "14%", background: "rgba(91,184,255,0.45)" }}
              initial={start ?? { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + i * 0.35 }}
            />
          </div>
        ))}
      </div>
      <motion.span
        className="vs-stempel"
        initial={start ?? { opacity: 0, scale: 2.2, rotate: -20 }}
        animate={{ opacity: 1, scale: 1, rotate: -8 }}
        transition={{ delay: 1.8, type: "spring", stiffness: 300, damping: 15 }}
      >
        <Icon name="check" size={13} strich={2.6} /> {labels[1]}
      </motion.span>
    </div>
  );
}

/* Mini-Dashboard: Balken wachsen */
function SzeneWerkzeug({ labels, start }: SzeneProps) {
  const hoehen = [40, 65, 50, 85, 70, 95];
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--fg-muted)", marginBottom: "8px" }}>{labels[0]}</span>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", flex: 1 }}>
        {hoehen.map((h, i) => (
          <motion.span
            key={i}
            className="vs-saeule"
            initial={start ?? { height: "0%" }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.7, ease: weich }}
          />
        ))}
      </div>
    </div>
  );
}

/* Tablet: Antippen → Bestätigung */
function SzeneTablet({ labels, start }: SzeneProps) {
  return (
    <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
      <div className="vs-tablet">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="vs-kachel"
            animate={i === 1 && start === undefined ? { scale: [1, 0.88, 1], backgroundColor: ["rgba(120,170,255,0.12)", "rgba(31,109,255,0.7)", "rgba(31,109,255,0.45)"] } : undefined}
            transition={{ delay: 0.9, duration: 0.5 }}
          />
        ))}
        {start === undefined && (
          <motion.span
            className="vs-finger"
            initial={{ opacity: 0, x: 40, y: 40 }}
            animate={{ opacity: [0, 1, 1, 0], x: [40, 0, 0, 0], y: [40, 0, 0, 0] }}
            transition={{ duration: 1.6, times: [0, 0.45, 0.7, 1] }}
          />
        )}
        <motion.span
          className="vs-toast"
          initial={start ?? { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4, ease: weich }}
        >
          <Icon name="check" size={12} strich={2.6} /> {labels[0]}
        </motion.span>
      </div>
    </div>
  );
}

const SZENEN: Record<string, (p: SzeneProps) => React.ReactElement> = {
  mail: SzeneMail,
  chat: SzeneChat,
  dokument: SzeneDokument,
  rechnung: SzeneRechnung,
  werkzeug: SzeneWerkzeug,
  tablet: SzeneTablet,
};
