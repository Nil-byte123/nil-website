"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { TEXTE, type Sprache } from "../i18n/texte";

export default function CookieBanner({ sprache = "de" }: { sprache?: Sprache }) {
  const t = TEXTE[sprache].cookie;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("nil-cookie-consent");
    if (!consent) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("nil-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("nil-cookie-consent", "declined");
    setVisible(false);
  };

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
