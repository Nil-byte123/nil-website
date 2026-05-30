"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NilLogo } from "./components/NilLogo";

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 50% 30%, #FFFFFF 0%, #EFF4FB 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      padding: "20px", textAlign: "center",
    }}>
      {/* Glow behind logo */}
      <div style={{
        position: "absolute", width: "260px", height: "260px",
        background: "radial-gradient(circle, rgba(14,165,233,0.14) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(20px)", pointerEvents: "none",
      }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ position: "relative" }}
      >
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
          <NilLogo width={160} height={58} />
        </div>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            fontSize: "clamp(72px, 15vw, 120px)", fontWeight: 800,
            letterSpacing: "-0.06em", lineHeight: 1,
            background: "linear-gradient(135deg, #0F172A 0%, #334155 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: "16px",
          }}>
            404
          </div>

          <h1 style={{
            fontSize: "clamp(18px, 3vw, 24px)", fontWeight: 600,
            color: "#0F172A", letterSpacing: "-0.02em", marginBottom: "12px",
          }}>
            Seite nicht gefunden
          </h1>

          <p style={{
            fontSize: "15px", color: "#475569", lineHeight: 1.65,
            maxWidth: "380px", margin: "0 auto 40px",
          }}>
            Diese Seite existiert nicht oder wurde verschoben. Zurück zur Startseite, dort findest du alles.
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/" style={{
                display: "inline-block",
                background: "#0F172A", color: "#FFFFFF",
                padding: "14px 32px", borderRadius: "9999px",
                fontWeight: 500, fontSize: "14px", textDecoration: "none",
                boxShadow: "0 8px 24px rgba(15,23,42,0.15)",
              }}>
                ← Zurück zur Startseite
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link href="/#kontakt" style={{
                display: "inline-block",
                background: "transparent", color: "#0EA5E9",
                padding: "14px 32px", borderRadius: "9999px",
                fontWeight: 500, fontSize: "14px", textDecoration: "none",
                border: "1.5px solid rgba(14,165,233,0.4)",
              }}>
                Kontakt aufnehmen
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating dots decoration */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -12, 0],
            opacity: [0.12, 0.3, 0.12],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            width: `${6 + i * 2}px`,
            height: `${6 + i * 2}px`,
            borderRadius: "50%",
            background: i % 2 === 0 ? "#0EA5E9" : "#38BDF8",
            opacity: 0.15,
            left: `${10 + i * 14}%`,
            top: `${15 + (i % 3) * 25}%`,
            pointerEvents: "none",
          }}
        />
      ))}
    </main>
  );
}
