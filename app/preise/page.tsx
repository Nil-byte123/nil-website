"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NilLogo } from "../components/NilLogo";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const plans = [
  {
    name: "Basic",
    emoji: "🌱",
    price: "89",
    perDay: "≈ 3€ / Tag",
    period: "/Monat",
    tag: null,
    desc: "Perfekt für Selbstständige und kleine Betriebe, die erste Prozesse automatisieren möchten.",
    features: [
      "1 KI-Assistent",
      "bis zu 500 Anfragen/Monat",
      "E-Mail-Integration",
      "Setup & Einrichtung inklusive",
      "E-Mail-Support",
    ],
    cta: "Jetzt starten",
    ctaHref: "/#kontakt",
    featured: false,
  },
  {
    name: "Pro",
    emoji: "⚡",
    price: "199",
    perDay: "≈ 7€ / Tag",
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
    featured: true,
  },
  {
    name: "Enterprise",
    emoji: "🏢",
    price: "Individuell",
    perDay: null,
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
    featured: false,
  },
];

export default function Preise() {
  return (
    <main style={{
      background: "#EEF2F7", color: "#0F172A", minHeight: "100vh",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      {/* Navbar */}
      <nav style={{
        position: "sticky", top: 0,
        background: "rgba(238,242,247,0.92)",
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
      <div style={{ textAlign: "center", padding: "80px 24px 56px" }}>
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
          style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "16px" }}
        >
          Einfach. Fair. Transparent.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          style={{ color: "#475569", fontSize: "16px", maxWidth: "520px", margin: "0 auto 28px", lineHeight: 1.65 }}
        >
          Kein verstecktes Kleingedrucktes. Monatlich kündbar. Keine Einrichtungsgebühr.
        </motion.p>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.35 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}
        >
          {["✓ Monatlich kündbar", "✓ Setup inklusive", "✓ Kostenlose Erstberatung"].map((item) => (
            <span key={item} style={{
              background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)",
              color: "#0EA5E9", fontSize: "13px", fontWeight: 600,
              padding: "6px 14px", borderRadius: "99px",
            }}>{item}</span>
          ))}
        </motion.div>
      </div>

      {/* Pricing Cards */}
      <div style={{
        maxWidth: "1120px", margin: "0 auto", padding: "0 20px 100px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "24px", alignItems: "center",
      }}>
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.75, ease, delay: 0.2 + i * 0.12 }}
            style={{
              background: plan.featured
                ? "linear-gradient(145deg, #0D1F3C 0%, #08152A 100%)"
                : "#FFFFFF",
              borderRadius: "28px",
              padding: plan.featured ? "44px 36px" : "36px 32px",
              border: plan.featured ? "1px solid rgba(14,165,233,0.2)" : "1px solid rgba(15,23,42,0.08)",
              boxShadow: plan.featured
                ? "0 40px 100px rgba(8,21,42,0.35), 0 0 0 1px rgba(14,165,233,0.1)"
                : "0 8px 30px rgba(15,23,42,0.06)",
              position: "relative", overflow: "hidden",
              display: "flex", flexDirection: "column",
              transform: plan.featured ? "scale(1.04)" : "none",
            }}
          >
            {/* Glow for featured */}
            {plan.featured && (
              <div style={{
                position: "absolute", top: "-40px", left: "50%", transform: "translateX(-50%)",
                width: "200px", height: "200px",
                background: "radial-gradient(ellipse, rgba(14,165,233,0.15) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
            )}

            {plan.tag && (
              <div style={{
                position: "absolute", top: "20px", right: "20px",
                background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                color: "#FFFFFF", fontSize: "11px", fontWeight: 700,
                padding: "5px 12px", borderRadius: "22px", letterSpacing: "0.4px",
              }}>
                {plan.tag}
              </div>
            )}

            {/* Plan header */}
            <div style={{ marginBottom: "8px" }}>
              <span style={{ fontSize: "28px" }}>{plan.emoji}</span>
              <h2 style={{
                fontSize: "22px", fontWeight: 700, marginTop: "10px", marginBottom: "0",
                color: plan.featured ? "#FFFFFF" : "#0F172A",
                letterSpacing: "-0.02em",
              }}>
                {plan.name}
              </h2>
            </div>

            {/* PRICE – big and prominent */}
            <div style={{
              background: plan.featured ? "rgba(14,165,233,0.1)" : "rgba(14,165,233,0.05)",
              border: `1px solid ${plan.featured ? "rgba(14,165,233,0.25)" : "rgba(14,165,233,0.15)"}`,
              borderRadius: "20px",
              padding: "20px 24px",
              margin: "20px 0",
              display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px",
            }}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                {plan.price !== "Individuell" && (
                  <span style={{
                    fontSize: "20px", fontWeight: 700,
                    color: plan.featured ? "rgba(255,255,255,0.7)" : "#64748B",
                  }}>€</span>
                )}
                <span style={{
                  fontSize: plan.price === "Individuell" ? "28px" : "56px",
                  fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1,
                  color: plan.featured ? "#FFFFFF" : "#0F172A",
                }}>
                  {plan.price}
                </span>
                {plan.price !== "Individuell" && (
                  <span style={{
                    fontSize: "15px", fontWeight: 500,
                    color: plan.featured ? "rgba(255,255,255,0.5)" : "#94A3B8",
                  }}>
                    {plan.period}
                  </span>
                )}
              </div>

              {plan.perDay && (
                <div style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  marginTop: "4px",
                }}>
                  <span style={{
                    background: plan.featured ? "rgba(14,165,233,0.25)" : "rgba(14,165,233,0.1)",
                    color: "#0EA5E9", fontSize: "12px", fontWeight: 700,
                    padding: "3px 10px", borderRadius: "99px",
                  }}>
                    {plan.perDay}
                  </span>
                  <span style={{
                    fontSize: "12px",
                    color: plan.featured ? "rgba(255,255,255,0.4)" : "#94A3B8",
                  }}>
                    weniger als ein Kaffee ☕
                  </span>
                </div>
              )}
            </div>

            <p style={{
              fontSize: "14px", lineHeight: 1.6, marginBottom: "24px",
              color: plan.featured ? "rgba(255,255,255,0.65)" : "#475569",
            }}>
              {plan.desc}
            </p>

            {/* Features */}
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", flex: 1 }}>
              {plan.features.map((f) => (
                <li key={f} style={{
                  display: "flex", alignItems: "center", gap: "10px",
                  padding: "9px 0",
                  borderBottom: `1px solid ${plan.featured ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.06)"}`,
                  fontSize: "14px",
                  color: plan.featured ? "rgba(255,255,255,0.85)" : "#334155",
                }}>
                  <span style={{ color: "#0EA5E9", fontSize: "15px", flexShrink: 0, fontWeight: 700 }}>✓</span>
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
                color: "#FFFFFF", padding: "15px 24px",
                borderRadius: "14px", fontWeight: 700, fontSize: "15px",
                textDecoration: "none", letterSpacing: "0.2px",
                boxShadow: plan.featured
                  ? "0 8px 28px rgba(14,165,233,0.5)"
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
        Alle Preise zzgl. MwSt. · Monatlich kündbar · Keine versteckten Kosten
        <div style={{ marginTop: "20px" }}>
          <Link href="/#kontakt" style={{ color: "#0EA5E9", textDecoration: "none", fontWeight: 600, fontSize: "15px" }}>
            Fragen zu den Preisen? Schreib uns →
          </Link>
        </div>
      </div>
    </main>
  );
}
