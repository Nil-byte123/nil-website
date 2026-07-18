"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CookieBanner() {
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
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            width: "100%",
            background: "var(--bg-soft)",
            borderTop: "1px solid var(--line)",
            borderRadius: "0",
            padding: "24px",
            paddingBottom: "calc(24px + env(safe-area-inset-bottom, 8px))",
            boxShadow: "0 -8px 32px rgba(0,0,0,0.4)",
            zIndex: 9999,
            fontFamily: "inherit",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <div style={{ marginBottom: "20px" }}>
              <p
                style={{
                  color: "var(--fg)",
                  fontSize: "14px",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}
              >
                Datenschutz
              </p>
              <p
                style={{
                  color: "var(--fg-muted)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                Diese Website verwendet technisch notwendige Cookies sowie Google Analytics für anonyme Reichweitenmessung. Mehr dazu in unserer{" "}
                <Link
                  href="/datenschutz"
                  style={{
                    color: "var(--fg)",
                    textDecoration: "underline",
                    fontWeight: 600,
                  }}
                >
                  Datenschutzerklärung
                </Link>
                .
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
              <motion.button
                onClick={decline}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "transparent",
                  border: "1px solid var(--line-strong)",
                  color: "var(--fg)",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "12px 24px",
                  borderRadius: "0",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                }}
              >
                Nur notwendige
              </motion.button>
              <motion.button
                onClick={accept}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: "#FAFAFA",
                  border: "1px solid #FAFAFA",
                  color: "#0A0A0A",
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "12px 24px",
                  borderRadius: "0",
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                }}
              >
                Alle akzeptieren
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
