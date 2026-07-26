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
            position: "fixed", bottom: 0, left: 0, right: 0,
            width: "100%",
            background: "rgba(8,21,42,0.98)",
            backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(14,165,233,0.18)",
            borderRadius: "0",
            padding: "16px 20px",
            paddingBottom: "calc(16px + env(safe-area-inset-bottom, 8px))",
            boxShadow: "0 -8px 32px rgba(0,0,0,0.3)",
            zIndex: 9999,
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", marginBottom: "16px" }}>
            <span style={{ fontSize: "22px", flexShrink: 0, marginTop: "1px" }}>🍪</span>
            <div>
              <p style={{
                color: "rgba(255,255,255,0.92)", fontSize: "14px", fontWeight: 600,
                marginBottom: "6px",
              }}>
                Wir verwenden Cookies
              </p>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>
                Diese Website verwendet technisch notwendige Cookies sowie Google Analytics für anonyme Reichweitenmessung. Mehr dazu in unserer{" "}
                <Link href="/datenschutz" style={{ color: "#0EA5E9", textDecoration: "none" }}>
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", flexWrap: "wrap" }}>
            <motion.button
              onClick={decline}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.65)", fontSize: "13px", fontWeight: 500,
                padding: "9px 20px", borderRadius: "22px", cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Nur notwendige
            </motion.button>
            <motion.button
              onClick={accept}
              whileHover={{ scale: 1.03, boxShadow: "0 8px 22px rgba(14,165,233,0.4)" }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                border: "none", color: "#FFFFFF", fontSize: "13px", fontWeight: 600,
                padding: "9px 24px", borderRadius: "22px", cursor: "pointer",
                fontFamily: "inherit",
                boxShadow: "0 4px 14px rgba(14,165,233,0.3)",
              }}
            >
              Alle akzeptieren ✓
            </motion.button>
          </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
