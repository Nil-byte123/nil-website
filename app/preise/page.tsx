"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NilLogo } from "../components/NilLogo";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Bubble = { id: number; x: number; y: number; size: number; color: string; dx: number; delay: number };
type Rect = { x: number; y: number; w: number; h: number };

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
  },
];

const BUBBLE_COLORS = ["#0EA5E9", "#38BDF8", "#7DD3FC", "#BAE6FD", "#0284C7"];

export default function Preise() {
  const [selected, setSelected] = useState("Pro");
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [slime, setSlime] = useState<Rect | null>(null);

  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  const measureCard = (name: string): Rect | null => {
    const card = cardRefs.current[name];
    const container = containerRef.current;
    if (!card || !container) return null;
    const cR = container.getBoundingClientRect();
    const kR = card.getBoundingClientRect();
    return { x: kR.left - cR.left, y: kR.top - cR.top, w: kR.width, h: kR.height };
  };

  // Set initial slime position before first paint
  useLayoutEffect(() => {
    const r = measureCard("Pro");
    if (r) setSlime(r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-measure on resize
  useEffect(() => {
    const onResize = () => {
      const r = measureCard(selected);
      if (r) setSlime(r);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const handleSelect = (planName: string) => {
    if (planName === selected) return;

    // Spawn bubbles at OLD card
    const oldCard = cardRefs.current[selected];
    if (oldCard) {
      const rect = oldCard.getBoundingClientRect();
      const newBubbles: Bubble[] = Array.from({ length: 16 }, (_, i) => ({
        id: Date.now() + i,
        x: rect.left + Math.random() * rect.width,
        y: rect.top + rect.height * 0.3 + Math.random() * rect.height * 0.5,
        size: Math.random() * 22 + 6,
        color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
        dx: (Math.random() - 0.5) * 60,
        delay: Math.random() * 0.18,
      }));
      setBubbles(prev => [...prev, ...newBubbles]);
      const ids = new Set(newBubbles.map(b => b.id));
      setTimeout(() => setBubbles(prev => prev.filter(b => !ids.has(b.id))), 1300);
    }

    // Slide slime to new card
    const r = measureCard(planName);
    if (r) setSlime(r);

    setSelected(planName);
  };

  return (
    <main style={{
      background: "#EEF2F7", color: "#0F172A", minHeight: "100vh",
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>

      {/* ── Bubble overlay ── */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
        <AnimatePresence>
          {bubbles.map(b => (
            <motion.div
              key={b.id}
              initial={{ opacity: 0.9, scale: 1, x: b.x, y: b.y }}
              animate={{ opacity: 0, scale: 0.15, x: b.x + b.dx, y: b.y - 90 - Math.random() * 50 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75 + Math.random() * 0.35, ease: "easeOut", delay: b.delay }}
              style={{
                position: "fixed", left: 0, top: 0,
                width: b.size, height: b.size, borderRadius: "50%",
                background: b.color,
                boxShadow: `0 0 ${b.size * 1.2}px ${b.color}99`,
                transform: `translate(${b.x}px, ${b.y}px)`,
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* ── Navbar ── */}
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
        <Link href="/" style={{ textDecoration: "none", color: "#0EA5E9", fontSize: "14px", fontWeight: 500 }}>
          ← Zurück zur Startseite
        </Link>
      </nav>

      {/* ── Hero ── */}
      <div style={{ textAlign: "center", padding: "80px 24px 56px" }}>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "12px" }}>
          TRANSPARENTE PREISE
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20, filter: "blur(6px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "16px" }}>
          Einfach. Fair. Transparent.
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          style={{ color: "#475569", fontSize: "16px", maxWidth: "520px", margin: "0 auto 28px", lineHeight: 1.65 }}>
          Kein verstecktes Kleingedrucktes. Monatlich kündbar. Keine Einrichtungsgebühr.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.35 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          {["✓ Monatlich kündbar", "✓ Setup inklusive", "✓ Kostenlose Erstberatung"].map(item => (
            <span key={item} style={{
              background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)",
              color: "#0EA5E9", fontSize: "13px", fontWeight: 600,
              padding: "6px 14px", borderRadius: "99px",
            }}>{item}</span>
          ))}
        </motion.div>
      </div>

      {/* ── Pricing Cards ── */}
      <div style={{ maxWidth: "1120px", margin: "0 auto", padding: "0 20px 100px" }}>

        {/* Relative container — slime lives here, cards float above */}
        <div ref={containerRef} style={{ position: "relative", isolation: "isolate" }}>

          {/* THE SLIME — single element that stretches between cards */}
          {slime && (
            <motion.div
              animate={{ x: slime.x, y: slime.y, width: slime.w, height: slime.h }}
              initial={{ x: slime.x, y: slime.y, width: slime.w, height: slime.h }}
              transition={{
                // position leads — pulls toward new card first
                x: { type: "spring", stiffness: 300, damping: 28, mass: 0.85 },
                y: { type: "spring", stiffness: 300, damping: 28, mass: 0.85 },
                // size lags — creates the organic stretch/slime look
                width:  { type: "spring", stiffness: 160, damping: 22, mass: 1.2 },
                height: { type: "spring", stiffness: 160, damping: 22, mass: 1.2 },
              }}
              style={{
                position: "absolute", top: 0, left: 0,
                background: "linear-gradient(145deg, #0D1F3C 0%, #08152A 100%)",
                borderRadius: "28px",
                zIndex: 0,
                pointerEvents: "none",
                boxShadow: [
                  "0 40px 100px rgba(8,21,42,0.45)",
                  "0 0 0 1.5px rgba(14,165,233,0.35)",
                  "0 0 80px rgba(14,165,233,0.1)",
                ].join(", "),
                overflow: "hidden",
              }}
            >
              {/* inner cyan glow */}
              <div style={{
                position: "absolute", top: "-80px", left: "50%",
                transform: "translateX(-50%)",
                width: "320px", height: "320px",
                background: "radial-gradient(ellipse, rgba(14,165,233,0.28) 0%, transparent 68%)",
                pointerEvents: "none",
              }} />
            </motion.div>
          )}

          {/* Cards — rendered above slime via z-index on the grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            alignItems: "stretch",
            position: "relative",
            zIndex: 1,
          }}>
            {plans.map((plan, i) => {
              const isSel = selected === plan.name;
              return (
                <motion.div
                  key={plan.name}
                  ref={el => { cardRefs.current[plan.name] = el; }}
                  onClick={() => handleSelect(plan.name)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: isSel ? 0 : -4 }}
                  transition={{ duration: 0.75, ease, delay: 0.2 + i * 0.12 }}
                  style={{
                    position: "relative",
                    borderRadius: "28px",
                    cursor: "pointer",
                    // transparent when selected — slime behind shows through
                    background: isSel ? "transparent" : "#FFFFFF",
                    border: isSel
                      ? "1.5px solid rgba(14,165,233,0.4)"
                      : "1px solid rgba(15,23,42,0.08)",
                    boxShadow: isSel ? "none" : "0 8px 30px rgba(15,23,42,0.06)",
                    transition: "background 0.3s, border 0.3s, box-shadow 0.3s",
                    userSelect: "none",
                  }}
                >
                  <div style={{
                    position: "relative", zIndex: 1,
                    padding: "40px 34px",
                    display: "flex", flexDirection: "column",
                    height: "100%", boxSizing: "border-box",
                  }}>

                    {plan.tag && (
                      <div style={{
                        position: "absolute", top: "20px", right: "20px",
                        background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                        color: "#FFFFFF", fontSize: "11px", fontWeight: 700,
                        padding: "5px 12px", borderRadius: "22px", letterSpacing: "0.4px",
                      }}>{plan.tag}</div>
                    )}

                    {/* Header */}
                    <div style={{ marginBottom: "8px" }}>
                      <span style={{ fontSize: "28px" }}>{plan.emoji}</span>
                      <h2 style={{
                        fontSize: "22px", fontWeight: 700, marginTop: "10px", marginBottom: 0,
                        color: isSel ? "#FFFFFF" : "#0F172A",
                        letterSpacing: "-0.02em",
                        transition: "color 0.3s",
                      }}>{plan.name}</h2>
                    </div>

                    {/* Price box */}
                    <div style={{
                      background: isSel ? "rgba(14,165,233,0.12)" : "rgba(14,165,233,0.05)",
                      border: `1px solid ${isSel ? "rgba(14,165,233,0.3)" : "rgba(14,165,233,0.15)"}`,
                      borderRadius: "20px", padding: "20px 24px",
                      margin: "20px 0",
                      transition: "background 0.3s, border 0.3s",
                    }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                        {plan.price !== "Individuell" && (
                          <span style={{ fontSize: "20px", fontWeight: 700, color: isSel ? "rgba(255,255,255,0.7)" : "#64748B", transition: "color 0.3s" }}>€</span>
                        )}
                        <span style={{
                          fontSize: plan.price === "Individuell" ? "28px" : "60px",
                          fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1,
                          color: isSel ? "#FFFFFF" : "#0F172A",
                          transition: "color 0.3s",
                        }}>{plan.price}</span>
                        {plan.price !== "Individuell" && (
                          <span style={{ fontSize: "15px", fontWeight: 500, color: isSel ? "rgba(255,255,255,0.5)" : "#94A3B8", transition: "color 0.3s" }}>
                            {plan.period}
                          </span>
                        )}
                      </div>
                      {plan.perDay && (
                        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                          <span style={{
                            background: isSel ? "rgba(14,165,233,0.3)" : "rgba(14,165,233,0.1)",
                            color: "#0EA5E9", fontSize: "12px", fontWeight: 700,
                            padding: "3px 10px", borderRadius: "99px",
                            transition: "background 0.3s",
                          }}>{plan.perDay}</span>
                          <span style={{ fontSize: "12px", color: isSel ? "rgba(255,255,255,0.4)" : "#94A3B8", transition: "color 0.3s" }}>
                            weniger als ein Kaffee ☕
                          </span>
                        </div>
                      )}
                    </div>

                    <p style={{
                      fontSize: "14px", lineHeight: 1.6, marginBottom: "24px",
                      color: isSel ? "rgba(255,255,255,0.65)" : "#475569",
                      transition: "color 0.3s",
                    }}>{plan.desc}</p>

                    {/* Features */}
                    <ul style={{ listStyle: "none", padding: 0, margin: "0 0 32px 0", flex: 1 }}>
                      {plan.features.map(f => (
                        <li key={f} style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          padding: "9px 0",
                          borderBottom: `1px solid ${isSel ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.06)"}`,
                          fontSize: "14px",
                          color: isSel ? "rgba(255,255,255,0.85)" : "#334155",
                          transition: "color 0.3s, border-color 0.3s",
                        }}>
                          <span style={{ color: "#0EA5E9", fontSize: "15px", flexShrink: 0, fontWeight: 700 }}>✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                      <Link href={plan.ctaHref} onClick={e => e.stopPropagation()} style={{
                        display: "block", textAlign: "center",
                        background: isSel ? "linear-gradient(135deg, #0EA5E9, #0284C7)" : "#0F172A",
                        color: "#FFFFFF", padding: "15px 24px",
                        borderRadius: "14px", fontWeight: 700, fontSize: "15px",
                        textDecoration: "none", letterSpacing: "0.2px",
                        boxShadow: isSel ? "0 8px 28px rgba(14,165,233,0.5)" : "0 6px 20px rgba(15,23,42,0.15)",
                        transition: "background 0.3s, box-shadow 0.3s",
                      }}>
                        {plan.cta} →
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
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
