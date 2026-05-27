"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Metadata } from "next";
import { NilLogo } from "../components/NilLogo";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const plans = [
  {
    name: "Basic",
    emoji: "🌱",
    price: "299",
    period: "/Monat",
    tag: null,
    desc: "Perfekt für Selbstständige und kleine Betriebe, die erste Prozesse automatisieren möchten.",
    features: [
      "1 KI-Assistent",
      "bis zu 500 Anfragen/Monat",
      "E-Mail-Integration",
      "Setup & Einrichtung",
      "E-Mail-Support",
    ],
    cta: "Jetzt starten",
    ctaHref: "/#kontakt",
    accent: "#0EA5E9",
    bg: "#FFFFFF",
    featured: false,
  },
  {
    name: "Pro",
    emoji: "⚡",
    price: "699",
    period: "/Monat",
    tag: "Beliebteste Wahl",
    desc: "Für wachsende Unternehmen mit mehreren Kanälen und höherem Automatisierungsgrad.",
    features: [
      "3 KI-Assistenten",
      "bis zu 3.000 Anfragen/Monat",
      "Multi-Kanal (Web, WhatsApp, Instagram)",
      "Terminbuchung & CRM-Anbindung",
      "Erweiterte Analytics",
      "Prioritäts-Support",
    ],
    cta: "Pro wählen",
    ctaHref: "/#kontakt",
    accent: "#FFFFFF",
    bg: "linear-gradient(135deg, #0D1F3C 0%, #08152A 100%)",
    featured: true,
  },
  {
    name: "Enterprise",
    emoji: "🏢",
    price: "Individuell",
    period: "",
    tag: null,
    desc: "Maßgeschneiderte Lösungen für größere Unternehmen mit komplexen Anforderungen.",
    features: [
      "Unbegrenzte KI-Assistenten",
      "Unbegrenzte Anfragen",
      "On-Premise oder Cloud",
      "Custom Integrationen & API",
      "Dedicated Account Manager",
      "SLA & 24/7 Support",
    ],
    cta: "Angebot anfragen",
    ctaHref: "/#kontakt",
    accent: "#0EA5E9",
    bg: "#FFFFFF",
    featured: false,
  },
];

export default function Preise() {
  return (
    <main style={{
      background: "#F8FAFC", color: "#0F172A", minHeight: "100vh",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0,
        background: "rgba(248,250,252,0.92)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(15,23,42,0.07)",
        padding: "0 24px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        zIndex: 100,
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
          <NilLogo width={90} height={32} />
        </Link>
        <Link href="/" style={{
          textDecoration: "none", color: "#0EA5E9", fontSize: "14px", fontWeight: 500,
          display: "flex", alignItems: "center", gap: "6px",
        }}>
          ← Zurück zur Startseite
        </Link>
      </nav>

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "80px 24px 60px" }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "12px" }}
        >
          TRANSPARENTE PREISE
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, letterSpacing: "-0.04em", marginBottom: "16px" }}
        >
          Einfach. Fair. Transparent.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          style={{ color: "#475569", fontSize: "16px", maxWidth: "500px", margin: "0 auto", lineHeight: 1.65 }}
        >
          Kein verstecktes Kleingedrucktes. Monatlich kündbar.
        </motion.p>
      </div>

      {/* Pricing Cards */}
      <div style={{
        maxWidth: "1100px", margin: "0 auto", padding: "0 24px 100px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px", alignItems: "stretch",
      }}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease, delay: 0.15 + i * 0.12 }}
            style={{
              background: plan.bg,
              borderRadius: "24px",
              padding: "36px 32px",
              border: plan.featured ? "none" : "1px solid rgba(15,23,42,0.08)",
              boxShadow: plan.featured
                ? "0 32px 80px rgba(8,21,42,0.28), 0 8px 28px rgba(8,21,42,0.14)"
                : "0 8px 30px rgba(15,23,42,0.06)",
              position: "relative", overflow: "hidden",
              display: "flex", flexDirection: "column",
              transform: plan.featured ? "scale(1.03)" : "none",
            }}
          >
            {plan.tag && (
              <div style={{
                position: "absolute", top: "18px", right: "18px",
                background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                color: "#FFFFFF", fontSize: "11px", fontWeight: 700,
                padding: "5px 12px", borderRadius: "22px", letterSpacing: "0.4px",
              }}>
                {plan.tag}
              </div>
            )}

            <div style={{ marginBottom: "28px" }}>
              <span style={{ fontSize: "28px" }}>{plan.emoji}</span>
              <h2 style={{
                fontSize: "22px", fontWeight: 700, marginTop: "12px",
                color: plan.featured ? "#FFFFFF" : "#0F172A",
                letterSpacing: "-0.02em",
              }}>
                {plan.name}
              </h2>
              <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginTop: "16px" }}>
                {plan.price !== "Individuell" && (
                  <span style={{ fontSize: "14px", color: plan.featured ? "rgba(255,255,255,0.6)" : "#64748B" }}>€</span>
                )}
                <span style={{
                  fontSize: plan.price === "Individuell" ? "24px" : "40px",
                  fontWeight: 800, letterSpacing: "-0.04em",
                  color: plan.featured ? "#FFFFFF" : "#0F172A",
                }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: "14px", color: plan.featured ? "rgba(255,255,255,0.5)" : "#94A3B8" }}>
                  {plan.period}
                </span>
              </div>
              <p style={{
                fontSize: "14px", lineHeight: 1.6, marginTop: "12px",
                color: plan.featured ? "rgba(255,255,255,0.65)" : "#475569",
              }}>
                {plan.desc}
              </p>
            </div>

            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", flex: 1 }}>
              {plan.features.map((f) => (
                <li key={f} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "8px 0",
                  borderBottom: `1px solid ${plan.featured ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.06)"}`,
                  fontSize: "14px",
                  color: plan.featured ? "rgba(255,255,255,0.85)" : "#334155",
                }}>
                  <span style={{ color: "#0EA5E9", fontSize: "16px", flexShrink: 0 }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href={plan.ctaHref} style={{
                display: "block", textAlign: "center",
                background: plan.featured
                  ? "linear-gradient(135deg, #0EA5E9, #0284C7)"
                  : "#0F172A",
                color: "#FFFFFF", padding: "14px 24px",
                borderRadius: "12px", fontWeight: 600, fontSize: "15px",
                textDecoration: "none",
                boxShadow: plan.featured
                  ? "0 8px 24px rgba(14,165,233,0.45)"
                  : "0 6px 20px rgba(15,23,42,0.15)",
              }}>
                {plan.cta} →
              </Link>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Bottom note */}
      <div style={{ textAlign: "center", padding: "0 24px 80px", color: "#94A3B8", fontSize: "14px" }}>
        Alle Preise zzgl. MwSt. · Monatlich kündbar · Keine Einrichtungsgebühr bei Pro & Enterprise
        <div style={{ marginTop: "24px" }}>
          <Link href="/#kontakt" style={{ color: "#0EA5E9", textDecoration: "none", fontWeight: 500 }}>
            Fragen? Schreib uns →
          </Link>
        </div>
      </div>
    </main>
  );
}
