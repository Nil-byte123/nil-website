"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TEXTE, type Sprache } from "../i18n/texte";
import { EINSTELLUNGEN_EVENT, EINWILLIGUNG_EVENT, EINWILLIGUNG_KEY } from "./einwilligung";

function abonnieren(neu: () => void) {
  window.addEventListener(EINWILLIGUNG_EVENT, neu);
  window.addEventListener("storage", neu);
  return () => {
    window.removeEventListener(EINWILLIGUNG_EVENT, neu);
    window.removeEventListener("storage", neu);
  };
}

/* Falls localStorage gesperrt ist, gilt die Wahl wenigstens für diese Sitzung */
let sitzungsWahl = false;

function hatGewaehlt(): boolean {
  if (sitzungsWahl) return true;
  try {
    return localStorage.getItem(EINWILLIGUNG_KEY) !== null;
  } catch {
    return false;
  }
}

export default function CookieBanner({ sprache = "de" }: { sprache?: Sprache }) {
  const t = TEXTE[sprache].cookie;
  // Auf dem Server „schon gewählt“ annehmen, damit der Banner nicht kurz aufblitzt
  const gewaehlt = useSyncExternalStore(abonnieren, hatGewaehlt, () => true);
  const [neuGeoeffnet, setNeuGeoeffnet] = useState(false);
  const visible = !gewaehlt || neuGeoeffnet;

  // „Cookie-Einstellungen“ im Footer öffnet den Banner erneut
  useEffect(() => {
    const oeffnen = () => setNeuGeoeffnet(true);
    window.addEventListener(EINSTELLUNGEN_EVENT, oeffnen);
    return () => window.removeEventListener(EINSTELLUNGEN_EVENT, oeffnen);
  }, []);

  function waehle(wert: "accepted" | "declined") {
    try {
      localStorage.setItem(EINWILLIGUNG_KEY, wert);
    } catch {
      sitzungsWahl = true;
    }
    setNeuGeoeffnet(false);
    window.dispatchEvent(new Event(EINWILLIGUNG_EVENT));
  }
  const accept = () => waehle("accepted");
  const decline = () => waehle("declined");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="glass"
          style={{
            position: "fixed",
            bottom: "calc(16px + env(safe-area-inset-bottom, 0px))",
            left: "16px",
            right: "16px",
            maxWidth: "760px",
            margin: "0 auto",
            padding: "22px 24px",
            background: "rgba(12, 17, 31, 0.98)",
            zIndex: 9999,
            fontFamily: "inherit",
          }}
        >
          <div>
            <div style={{ marginBottom: "18px" }}>
              <p
                style={{
                  color: "var(--fg)",
                  fontSize: "15px",
                  fontWeight: 700,
                  marginBottom: "6px",
                }}
              >
                {t.titel}
              </p>
              <p
                style={{
                  color: "var(--fg-muted)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                {t.textVor}
                <Link
                  href="/datenschutz"
                  style={{
                    color: "var(--fg)",
                    textDecoration: "underline",
                    fontWeight: 600,
                  }}
                >
                  {t.linkText}
                </Link>
                {t.textNach}
              </p>
            </div>

            <div
              style={{
                display: "flex",
                gap: "12px",
                justifyContent: "flex-start",
                flexWrap: "wrap",
              }}
            >
              <button onClick={decline} className="btn btn-glass btn-sm">
                {t.nurNotwendige}
              </button>
              <button onClick={accept} className="btn btn-primary btn-sm">
                {t.alleAkzeptieren}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
