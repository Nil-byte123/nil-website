"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NilLogo } from "../components/NilLogo";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];
type Bubble = { id: number; x: number; y: number; size: number; color: string; dx: number; dy: number; delay: number };
type Rect   = { x: number; y: number; w: number; h: number };
type Billing = "monthly" | "yearly";
type CellVal = string | boolean;

// ─── SVG Icons ──────────────────────────────────────────────────────
function IconRocket({ sel }: { sel: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke={sel ? "#7DD3FC" : "#00BFFF"} strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.5-2 5-2 5s3.5-.5 5-2 2.5-2.5 2.5-2.5l-5.5-2z" />
      <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}
function IconSprout({ sel }: { sel: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke={sel ? "#94A3B8" : "#64748B"} strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="22" x2="12" y2="11" />
      <path d="M12 11C12 7 8.5 4 4 4 4 8.5 7.5 11 12 11z" />
      <path d="M12 11C12 7 15.5 4 20 4 20 8.5 16.5 11 12 11z" />
    </svg>
  );
}
function IconBolt({ sel }: { sel: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke={sel ? "#38BDF8" : "#0EA5E9"} strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}
function IconBuilding({ sel }: { sel: boolean }) {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
      stroke={sel ? "#94A3B8" : "#64748B"} strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="2" width="18" height="20" rx="1" />
      <path d="M9 22v-9h6v9" />
      <rect x="7" y="6" width="2" height="2" />
      <rect x="11" y="6" width="2" height="2" />
      <rect x="15" y="6" width="2" height="2" />
      <rect x="7" y="11" width="2" height="2" />
      <rect x="11" y="11" width="2" height="2" />
      <rect x="15" y="11" width="2" height="2" />
    </svg>
  );
}

// ─── Plans ──────────────────────────────────────────────────────────
const plans = [
  {
    name: "Starter",
    price: 39,
    setup: 0,
    tag: null as string | null,
    desc: "Perfekt zum Ausprobieren. Teste NIL 14 Tage kostenlos – ohne Kreditkarte, ohne Risiko.",
    features: [
      "1 KI-Assistent",
      "bis zu 100 Anfragen/Monat",
      "Webchat-Integration",
      "Keine Einrichtungsgebühr",
      "14 Tage kostenlos testen",
      "E-Mail-Support",
    ],
    cta: "Kostenlos starten",
    ctaHref: "/#kontakt",
  },
  {
    name: "Basic",
    price: 89,
    setup: 149,
    tag: null as string | null,
    desc: "Für Betriebe die NIL dauerhaft nutzen wollen – mehr Anfragen, mehr Kanäle, volle Kontrolle.",
    features: [
      "1 KI-Assistent",
      "bis zu 500 Anfragen/Monat",
      "E-Mail-Integration",
      "Deutschsprachiger Support",
      "Monatliche Performance-Übersicht",
      "E-Mail-Support",
    ],
    cta: "Jetzt starten",
    ctaHref: "/#kontakt",
  },
  {
    name: "Pro",
    price: 199,
    setup: 249,
    tag: "Beliebteste Wahl" as string | null,
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
    price: null as number | null,
    setup: 399,
    tag: null as string | null,
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

// ─── Comparison table data ───────────────────────────────────────────
const compRows: { label: string; Basic: CellVal; Pro: CellVal; Enterprise: CellVal }[] = [
  { label: "KI-Assistenten",            Basic: "1",         Pro: "3",            Enterprise: "Unbegrenzt" },
  { label: "Anfragen / Monat",          Basic: "500",       Pro: "3.000",        Enterprise: "Unbegrenzt" },
  { label: "E-Mail-Integration",        Basic: true,        Pro: true,           Enterprise: true },
  { label: "WhatsApp & Instagram",      Basic: false,       Pro: true,           Enterprise: true },
  { label: "Terminbuchung & CRM",       Basic: false,       Pro: true,           Enterprise: true },
  { label: "Analytics",                 Basic: "Basis",     Pro: "Erweitert",    Enterprise: "Custom" },
  { label: "Performance-Übersicht",     Basic: "Monatlich", Pro: "Wöchentlich",  Enterprise: "Echtzeit" },
  { label: "Deutschsprachiger Support", Basic: true,        Pro: true,           Enterprise: true },
  { label: "On-Premise Option",         Basic: false,       Pro: false,          Enterprise: true },
  { label: "Custom API",                Basic: false,       Pro: false,          Enterprise: true },
  { label: "Account Manager",           Basic: false,       Pro: false,          Enterprise: true },
  { label: "Support-Level",             Basic: "E-Mail",    Pro: "Priorität",    Enterprise: "24/7 SLA" },
  { label: "Einrichtungsgebühr",         Basic: "€149",      Pro: "€249",         Enterprise: "€399" },
];

const BUBBLE_COLORS = ["#0EA5E9", "#38BDF8", "#7DD3FC", "#BAE6FD", "#0284C7"];

// ─── Helpers ─────────────────────────────────────────────────────────
function anfragenTip(f: string) {
  const m = f.match(/[\d.]+/);
  const n = m ? parseInt(m[0].replace(".", "")) : 0;
  return n
    ? `1 Anfrage = 1 Kundennachricht · ≈ ${Math.round(n / 30)} pro Tag`
    : "1 Anfrage = 1 Kundennachricht an den KI-Assistenten";
}
function monthlyAmt(price: number, billing: Billing) {
  return billing === "yearly" ? Math.round(price * 0.8) : price;
}
function savings(price: number) { return Math.round(price * 12 * 0.2); }
function perDayStr(monthly: number) { return `≈ ${Math.round(monthly / 30)}€ / Tag`; }

// ─── InfoTip ─────────────────────────────────────────────────────────
function InfoTip({ tip, dark }: { tip: string; dark: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-block", verticalAlign: "middle" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
    >
      <span style={{
        marginLeft: "5px",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        width: "15px", height: "15px",
        background: dark ? "rgba(255,255,255,0.12)" : "rgba(14,165,233,0.12)",
        color: dark ? "rgba(255,255,255,0.45)" : "#64748B",
        borderRadius: "50%", fontSize: "9px", fontWeight: 700, fontStyle: "italic",
        cursor: "help", userSelect: "none", flexShrink: 0,
      }}>i</span>

      <AnimatePresence>
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              left: "50%", transform: "translateX(-50%)",
              background: "#0F172A", color: "#CBD5E1",
              fontSize: "12px", lineHeight: 1.55,
              padding: "9px 13px", borderRadius: "10px",
              maxWidth: "210px", whiteSpace: "normal", textAlign: "center",
              zIndex: 9999,
              boxShadow: "0 10px 30px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)",
              pointerEvents: "none", display: "block",
            }}
          >
            {tip}
            <span style={{
              position: "absolute", top: "100%", left: "50%",
              transform: "translateX(-50%)", width: 0, height: 0,
              borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
              borderTop: "5px solid #0F172A",
            }} />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

// ─── Cell renderer for comparison table ─────────────────────────────
function Cell({ v, col }: { v: CellVal; col: string }) {
  if (v === true)  return <span style={{ color: "#0EA5E9", fontWeight: 700 }}>✓</span>;
  if (v === false) return <span style={{ color: "#94A3B8" }}>—</span>;
  return <span style={{ color: col === "Pro" ? "#38BDF8" : "#334155", fontSize: "13px", fontWeight: 500 }}>{v as string}</span>;
}

// ─── Main component ──────────────────────────────────────────────────
export default function Preise() {
  const [selected,       setSelected]       = useState("Pro");
  const [billing,        setBilling]        = useState<Billing>("monthly");
  const [tableOpen,      setTableOpen]      = useState(false);
  const [bubbles,        setBubbles]        = useState<Bubble[]>([]);
  const [slime,          setSlime]          = useState<Rect | null>(null);
  const [selEpoch,       setSelEpoch]       = useState(0);
  const [ctaHover,       setCtaHover]       = useState<string | null>(null);
  const [starterYearlyTip, setStarterYearlyTip] = useState(false);
  const [isMobile,       setIsMobile]       = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  const cardRefs    = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);
  const selectedRef  = useRef(selected);
  selectedRef.current = selected;

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mobile order: Starter → Pro → Basic → Enterprise
  // Desktop order: Starter → Basic → Pro → Enterprise
  const orderedPlans = isMobile
    ? [plans[0], plans[2], plans[1], plans[3]]
    : plans;

  const measureCard = (name: string): Rect | null => {
    const card = cardRefs.current[name];
    const cont = containerRef.current;
    if (!card || !cont) return null;
    const cR = cont.getBoundingClientRect();
    const kR = card.getBoundingClientRect();
    return { x: kR.left - cR.left, y: kR.top - cR.top, w: kR.width, h: kR.height };
  };

  // Initial slime position (before first paint)
  useLayoutEffect(() => {
    const r = measureCard("Pro");
    if (r) setSlime(r);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-measure on resize
  useEffect(() => {
    const onResize = () => {
      const r = measureCard(selectedRef.current);
      if (r) setSlime(r);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Re-measure when mobile layout changes (card order flips)
  useEffect(() => {
    const t = setTimeout(() => {
      const r = measureCard(selectedRef.current);
      if (r) setSlime(r);
    }, 30);
    return () => clearTimeout(t);
  }, [isMobile]);

  // Re-measure when billing changes (card heights may shift)
  useEffect(() => {
    const t = setTimeout(() => {
      const r = measureCard(selectedRef.current);
      if (r) setSlime(r);
    }, 60);
    return () => clearTimeout(t);
  }, [billing]);

  const handleSelect = (planName: string) => {
    if (planName === selected) return;

    const oldCard = cardRefs.current[selected];
    const newCard = cardRefs.current[planName];
    if (oldCard) {
      const rect = oldCard.getBoundingClientRect();
      let dirX = 0, dirY = 0;
      if (newCard) {
        const nr   = newCard.getBoundingClientRect();
        const vx   = (nr.left + nr.width  / 2) - (rect.left + rect.width  / 2);
        const vy   = (nr.top  + nr.height / 2) - (rect.top  + rect.height / 2);
        const dist = Math.sqrt(vx * vx + vy * vy) || 1;
        dirX = vx / dist; dirY = vy / dist;
      }
      const nb: Bubble[] = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        x: rect.left + rect.width  * 0.2 + Math.random() * rect.width  * 0.6,
        y: rect.top  + rect.height * 0.35 + Math.random() * rect.height * 0.3,
        size:  Math.random() * 10 + 3,
        color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
        dx: dirX * (40 + Math.random() * 30) + (Math.random() - 0.5) * 14,
        dy: dirY * (40 + Math.random() * 30) + (Math.random() - 0.5) * 14 - 20,
        delay: Math.random() * 0.14,
      }));
      setBubbles(prev => [...prev, ...nb]);
      const ids = new Set(nb.map(b => b.id));
      setTimeout(() => setBubbles(prev => prev.filter(b => !ids.has(b.id))), 1000);
    }

    const r = measureCard(planName);
    if (r) setSlime(r);
    setSelEpoch(e => e + 1);
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
            <motion.div key={b.id}
              initial={{ opacity: 0.65, scale: 1, x: b.x, y: b.y }}
              animate={{ opacity: 0, scale: 0.1, x: b.x + b.dx, y: b.y + b.dy }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55 + Math.random() * 0.2, ease: "easeOut", delay: b.delay }}
              style={{
                position: "fixed", left: 0, top: 0,
                width: b.size, height: b.size, borderRadius: "50%",
                background: b.color, boxShadow: `0 0 ${b.size * 1.2}px ${b.color}99`,
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
      <div style={{ textAlign: "center", padding: "80px 24px 48px" }}>
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
          Kein verstecktes Kleingedrucktes. Monatlich kündbar. Einmalige Einrichtung – danach nur die monatliche Rate.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.35 }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          {["✓ Monatlich kündbar", "✓ Transparente Preise", "✓ Kostenlose Erstberatung"].map(item => (
            <span key={item} style={{
              background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)",
              color: "#0EA5E9", fontSize: "13px", fontWeight: 600,
              padding: "6px 14px", borderRadius: "99px",
            }}>{item}</span>
          ))}
        </motion.div>
      </div>

      {/* ── Billing toggle ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.45 }}
        style={{ display: "flex", justifyContent: "center", marginBottom: "44px" }}
      >
        <div style={{
          display: "inline-flex", background: "#DDE3EC",
          borderRadius: "99px", padding: "4px", gap: "2px",
          boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
        }}>
          {(["monthly", "yearly"] as Billing[]).map(b => (
            <button key={b} onClick={() => setBilling(b)} style={{
              padding: "10px 22px", borderRadius: "99px", border: "none",
              cursor: "pointer", fontWeight: 600, fontSize: "14px",
              background: billing === b ? "#0F172A" : "transparent",
              color: billing === b ? "#FFFFFF" : "#64748B",
              transition: "all 0.25s ease",
              position: "relative",
            }}>
              {b === "monthly" ? "Monatlich" : "Jährlich"}
              {b === "yearly" && (
                <span style={{
                  marginLeft: "8px",
                  background: billing === "yearly" ? "rgba(34,197,94,0.2)" : "rgba(34,197,94,0.15)",
                  color: "#22C55E", fontSize: "11px", fontWeight: 700,
                  padding: "2px 7px", borderRadius: "99px",
                }}>−20%</span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* ── Pricing Cards ── */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 20px 0" }}>
        <div ref={containerRef} style={{ position: "relative", isolation: "isolate" }}>

          {/* THE SLIME */}
          {slime && (
            <motion.div
              animate={{ x: slime.x, y: slime.y, width: slime.w, height: slime.h }}
              initial={{ x: slime.x, y: slime.y, width: slime.w, height: slime.h }}
              transition={{
                x:      { type: "spring", stiffness: 300, damping: 28, mass: 0.85 },
                y:      { type: "spring", stiffness: 300, damping: 28, mass: 0.85 },
                width:  { type: "spring", stiffness: 160, damping: 22, mass: 1.2 },
                height: { type: "spring", stiffness: 160, damping: 22, mass: 1.2 },
              }}
              style={{
                position: "absolute", top: 0, left: 0,
                background: "linear-gradient(145deg, #0D1F3C 0%, #08152A 100%)",
                borderRadius: "28px", zIndex: 0, pointerEvents: "none",
                boxShadow: ["0 40px 100px rgba(8,21,42,0.45)", "0 0 0 1.5px rgba(14,165,233,0.35)", "0 0 80px rgba(14,165,233,0.1)"].join(", "),
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)",
                width: "320px", height: "320px",
                background: "radial-gradient(ellipse, rgba(14,165,233,0.28) 0%, transparent 68%)",
                pointerEvents: "none",
              }} />
            </motion.div>
          )}

          {/* Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(255px, 1fr))",
            gap: "20px", alignItems: "stretch",
            position: "relative", zIndex: 1,
          }}>
            {orderedPlans.map((plan, i) => {
              const isSel = selected === plan.name;
              const isStarter = plan.name === "Starter";
              const isYearlyDimmed = isStarter && billing === "yearly";

              // Starter never gets yearly discount
              const mp = plan.price !== null
                ? (isStarter ? plan.price : monthlyAmt(plan.price, billing))
                : null;
              const pd    = mp !== null ? perDayStr(mp) : null;
              const sv    = billing === "yearly" && plan.price !== null && !isStarter
                ? savings(plan.price)
                : null;

              return (
                <motion.div key={plan.name}
                  ref={el => { cardRefs.current[plan.name] = el; }}
                  onClick={() => handleSelect(plan.name)}
                  onMouseEnter={() => { if (isStarter && billing === "yearly") setStarterYearlyTip(true); }}
                  onMouseLeave={() => setStarterYearlyTip(false)}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: isYearlyDimmed ? 0.7 : 1, y: 0 }}
                  whileHover={{ y: isSel ? 0 : -4 }}
                  transition={{ duration: 0.75, ease, delay: 0.2 + i * 0.12 }}
                  style={{
                    position: "relative", borderRadius: "28px", cursor: "pointer",
                    background: isSel ? "transparent" : "#FFFFFF",
                    border: isStarter
                      ? `1px solid ${isSel ? "rgba(0,191,255,0.5)" : "rgba(0,191,255,0.2)"}`
                      : isSel
                      ? "1.5px solid rgba(14,165,233,0.4)"
                      : "1px solid rgba(15,23,42,0.08)",
                    boxShadow: isSel ? "none" : isStarter
                      ? "0 8px 30px rgba(0,191,255,0.06)"
                      : "0 8px 30px rgba(15,23,42,0.06)",
                    transition: isSel
                      ? "border 0.3s, box-shadow 0.3s"
                      : "background 0.35s, border 0.3s, box-shadow 0.3s",
                    userSelect: "none",
                  }}
                >
                  {/* Yearly tooltip for Starter */}
                  <AnimatePresence>
                    {isStarter && billing === "yearly" && starterYearlyTip && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.15 }}
                        style={{
                          position: "absolute", bottom: "calc(100% + 12px)", left: "50%",
                          transform: "translateX(-50%)",
                          background: "#0F172A", color: "#CBD5E1",
                          fontSize: "12px", lineHeight: 1.6,
                          padding: "10px 14px", borderRadius: "10px",
                          maxWidth: "240px", whiteSpace: "normal", textAlign: "center",
                          zIndex: 9999, pointerEvents: "none",
                          boxShadow: "0 10px 30px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.06)",
                          width: "max-content",
                        }}
                      >
                        Der Starter-Plan ist nur monatlich buchbar. Für Jahrespläne wähle Basic oder Pro.
                        <span style={{
                          position: "absolute", top: "100%", left: "50%",
                          transform: "translateX(-50%)", width: 0, height: 0,
                          borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
                          borderTop: "5px solid #0F172A",
                        }} />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    key={isSel ? `${plan.name}-${selEpoch}` : `${plan.name}-idle`}
                    initial={{ opacity: isSel ? 0 : 1, y: isSel ? 12 : 0, scale: isSel ? 0.97 : 1 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.36, ease, delay: isSel ? 0.07 : 0 }}
                    style={{
                      position: "relative", zIndex: 1,
                      padding: "36px 30px",
                      display: "flex", flexDirection: "column",
                      height: "100%", boxSizing: "border-box",
                    }}
                  >
                    {/* "Beliebteste Wahl" badge */}
                    {plan.tag && (
                      <div style={{
                        position: "absolute", top: "20px", right: "20px",
                        background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                        color: "#FFFFFF", fontSize: "11px", fontWeight: 700,
                        padding: "5px 12px", borderRadius: "22px", letterSpacing: "0.4px",
                      }}>{plan.tag}</div>
                    )}

                    {/* "Nur monatlich verfügbar" badge for Starter on yearly */}
                    {isStarter && billing === "yearly" && (
                      <div style={{
                        position: "absolute", top: "20px", right: "20px",
                        background: "rgba(100,116,139,0.12)",
                        color: "#94A3B8", fontSize: "11px", fontWeight: 600,
                        padding: "4px 10px", borderRadius: "99px", letterSpacing: "0.3px",
                        border: "1px solid rgba(100,116,139,0.2)",
                      }}>Nur monatlich</div>
                    )}

                    {/* Icon + Name */}
                    <div style={{ marginBottom: "20px" }}>
                      {plan.name === "Starter"    && <IconRocket   sel={isSel} />}
                      {plan.name === "Basic"       && <IconSprout   sel={isSel} />}
                      {plan.name === "Pro"         && <IconBolt     sel={isSel} />}
                      {plan.name === "Enterprise"  && <IconBuilding sel={isSel} />}
                      <h2 style={{
                        fontSize: "22px", fontWeight: 700, marginTop: "10px", marginBottom: 0,
                        color: isSel ? "#FFFFFF" : "#0F172A", letterSpacing: "-0.02em",
                        transition: "color 0.3s",
                      }}>{plan.name}</h2>
                    </div>

                    {/* Price box */}
                    <div style={{
                      background: isSel ? "rgba(14,165,233,0.12)" : isStarter ? "rgba(0,191,255,0.05)" : "rgba(14,165,233,0.05)",
                      border: `1px solid ${isSel ? "rgba(14,165,233,0.3)" : isStarter ? "rgba(0,191,255,0.15)" : "rgba(14,165,233,0.15)"}`,
                      borderRadius: "20px", padding: "20px 24px", margin: "0 0 8px",
                      transition: "background 0.3s, border 0.3s",
                    }}>
                      {mp !== null ? (
                        <>
                          <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                            <span style={{ fontSize: "20px", fontWeight: 700, color: isSel ? "rgba(255,255,255,0.7)" : "#64748B", transition: "color 0.3s" }}>€</span>
                            <span style={{ fontSize: "60px", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: isSel ? "#FFFFFF" : "#0F172A", transition: "color 0.3s" }}>{mp}</span>
                            <span style={{ fontSize: "15px", fontWeight: 500, color: isSel ? "rgba(255,255,255,0.5)" : "#94A3B8", transition: "color 0.3s" }}>/Monat</span>
                          </div>

                          {/* Yearly extra info (not for Starter) */}
                          {sv !== null && (
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px", flexWrap: "wrap" }}>
                              <span style={{
                                background: "rgba(34,197,94,0.15)", color: "#22C55E",
                                fontSize: "11px", fontWeight: 700, padding: "3px 9px", borderRadius: "99px",
                              }}>spare €{sv}/Jahr</span>
                              <span style={{ fontSize: "11px", color: isSel ? "rgba(255,255,255,0.4)" : "#94A3B8", transition: "color 0.3s" }}>
                                €{mp * 12} / Jahr
                              </span>
                            </div>
                          )}

                          {/* Per-day anchor */}
                          {pd && (
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                              <span style={{
                                background: isSel ? "rgba(14,165,233,0.3)" : isStarter ? "rgba(0,191,255,0.1)" : "rgba(14,165,233,0.1)",
                                color: isStarter ? "#00BFFF" : "#0EA5E9",
                                fontSize: "12px", fontWeight: 700,
                                padding: "3px 10px", borderRadius: "99px", transition: "background 0.3s",
                              }}>{pd}</span>
                              <span style={{ fontSize: "12px", color: isSel ? "rgba(255,255,255,0.4)" : "#94A3B8", transition: "color 0.3s" }}>
                                weniger als ein Kaffee ☕
                              </span>
                            </div>
                          )}

                          {/* Setup fee row */}
                          <div style={{
                            marginTop: "14px",
                            paddingTop: "12px",
                            borderTop: `1px solid ${isSel ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.08)"}`,
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                          }}>
                            <span style={{ fontSize: "12px", color: isSel ? "rgba(255,255,255,0.5)" : "#64748B", transition: "color 0.3s" }}>
                              Einrichtung (einmalig)
                            </span>
                            <span style={{
                              fontSize: "14px", fontWeight: 700, transition: "color 0.3s",
                              color: plan.setup === 0
                                ? "#22C55E"
                                : isSel ? "rgba(255,255,255,0.75)" : "#334155",
                            }}>
                              {plan.setup === 0 ? "Kostenlos" : `€${plan.setup}`}
                            </span>
                          </div>
                        </>
                      ) : (
                        /* Enterprise */
                        <>
                          <span style={{ fontSize: "28px", fontWeight: 900, letterSpacing: "-0.04em", color: isSel ? "#FFFFFF" : "#0F172A", transition: "color 0.3s" }}>
                            Individuell
                          </span>
                          <div style={{ marginTop: "6px", fontSize: "13px", color: isSel ? "rgba(255,255,255,0.45)" : "#94A3B8", transition: "color 0.3s" }}>
                            Preise ab €499 / Monat
                          </div>
                          <div style={{
                            marginTop: "14px",
                            paddingTop: "12px",
                            borderTop: `1px solid ${isSel ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.08)"}`,
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                          }}>
                            <span style={{ fontSize: "12px", color: isSel ? "rgba(255,255,255,0.5)" : "#64748B", transition: "color 0.3s" }}>
                              Einrichtung (einmalig)
                            </span>
                            <span style={{ fontSize: "14px", fontWeight: 700, color: isSel ? "rgba(255,255,255,0.75)" : "#334155", transition: "color 0.3s" }}>
                              €{plan.setup}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* "Ideal nach dem Starter-Test" hint for Basic */}
                    {plan.name === "Basic" && (
                      <p style={{
                        fontSize: "11px",
                        color: isSel ? "rgba(255,255,255,0.38)" : "#94A3B8",
                        fontStyle: "italic",
                        margin: "0 0 16px 2px",
                        lineHeight: 1.4,
                        transition: "color 0.3s",
                      }}>
                        Ideal nach dem Starter-Test
                      </p>
                    )}

                    <p style={{
                      fontSize: "14px", lineHeight: 1.6,
                      marginBottom: "24px",
                      marginTop: plan.name === "Basic" ? "0" : "8px",
                      color: isSel ? "rgba(255,255,255,0.65)" : "#475569", transition: "color 0.3s",
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
                          <span style={{
                            color: isStarter ? "#00BFFF" : "#0EA5E9",
                            fontSize: "15px", flexShrink: 0, fontWeight: 700,
                          }}>✓</span>
                          {f}
                          {/\d/.test(f) && f.includes("Anfragen") && (
                            <InfoTip tip={anfragenTip(f)} dark={isSel} />
                          )}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    {isStarter ? (
                      <div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Link
                            href={plan.ctaHref}
                            onClick={e => e.stopPropagation()}
                            onMouseEnter={() => setCtaHover(plan.name)}
                            onMouseLeave={() => setCtaHover(null)}
                            style={{
                              display: "block", textAlign: "center",
                              background: ctaHover === "Starter" ? "#00BFFF" : "transparent",
                              color: ctaHover === "Starter" ? "#FFFFFF" : "#00BFFF",
                              border: "1.5px solid #00BFFF",
                              padding: "15px 24px",
                              borderRadius: "14px", fontWeight: 700, fontSize: "15px",
                              textDecoration: "none", letterSpacing: "0.2px",
                              boxShadow: ctaHover === "Starter"
                                ? "0 0 16px rgba(0,191,255,0.3), 0 6px 20px rgba(0,191,255,0.2)"
                                : "none",
                              transition: "background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
                            }}
                          >
                            {plan.cta} →
                          </Link>
                        </motion.div>
                        <p style={{
                          textAlign: "center", fontSize: "11px",
                          color: isSel ? "rgba(255,255,255,0.38)" : "#94A3B8",
                          marginTop: "10px", marginBottom: 0, lineHeight: 1.4,
                          transition: "color 0.3s",
                        }}>
                          Keine Kreditkarte nötig · Endet automatisch
                        </p>
                      </div>
                    ) : (
                      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                        <Link
                          href={plan.ctaHref}
                          onClick={e => e.stopPropagation()}
                          onMouseEnter={() => setCtaHover(plan.name)}
                          onMouseLeave={() => setCtaHover(null)}
                          style={{
                            display: "block", textAlign: "center",
                            background: isSel ? "linear-gradient(135deg, #0EA5E9, #0284C7)" : "#0F172A",
                            color: "#FFFFFF", padding: "15px 24px",
                            borderRadius: "14px", fontWeight: 700, fontSize: "15px",
                            textDecoration: "none", letterSpacing: "0.2px",
                            boxShadow: isSel && ctaHover === plan.name
                              ? "0 8px 28px rgba(14,165,233,0.55), 0 0 16px rgba(0,191,255,0.4)"
                              : isSel
                              ? "0 8px 28px rgba(14,165,233,0.45)"
                              : "0 6px 20px rgba(15,23,42,0.15)",
                            transition: "background 0.2s ease, box-shadow 0.2s ease",
                          }}
                        >
                          {plan.cta} →
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Risk reversal ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.6 }}
        style={{ textAlign: "center", padding: "32px 24px 8px" }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
          {[
            { icon: "✓", text: "30 Tage Geld-zurück-Garantie" },
            { icon: "✓", text: "Keine Kreditkarte nötig" },
            { icon: "✓", text: "Monatlich kündbar" },
            { icon: "✓", text: "Starter endet automatisch – kein Abo-Fallstrick" },
          ].map(item => (
            <span key={item.text} style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#64748B" }}>
              <span style={{ color: "#0EA5E9", fontWeight: 700 }}>{item.icon}</span>
              {item.text}
            </span>
          ))}
        </div>
      </motion.div>

      {/* ── Comparison table ── */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px 20px" }}>
        <button
          onClick={() => setTableOpen(o => !o)}
          style={{
            width: "100%", background: "transparent",
            border: "1px solid rgba(15,23,42,0.1)", borderRadius: "14px",
            padding: "16px 24px", cursor: "pointer",
            color: "#475569", fontSize: "14px", fontWeight: 600,
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
            transition: "background 0.2s, border-color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(15,23,42,0.03)")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          Alle Features im Vergleich
          <span style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: "20px", height: "20px",
            background: "rgba(14,165,233,0.1)", borderRadius: "50%",
            color: "#0EA5E9", fontSize: "11px", fontWeight: 700,
            transition: "transform 0.3s",
            transform: tableOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}>↓</span>
        </button>

        <AnimatePresence>
          {tableOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ marginTop: "16px", borderRadius: "20px", overflow: "hidden", background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.07)", boxShadow: "0 4px 20px rgba(15,23,42,0.05)" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
                  <thead>
                    <tr style={{ background: "#0F172A" }}>
                      <th style={{ padding: "16px 20px", textAlign: "left", color: "#94A3B8", fontWeight: 600, fontSize: "12px", letterSpacing: "0.5px" }}>FEATURE</th>
                      {["Basic", "Pro", "Enterprise"].map((col, ci) => (
                        <th key={col} style={{
                          padding: "16px 20px", textAlign: "center",
                          color: ci === 1 ? "#38BDF8" : "#CBD5E1",
                          fontWeight: 700, fontSize: "13px",
                        }}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compRows.map((row, ri) => (
                      <tr key={row.label} style={{ background: ri % 2 === 0 ? "#FFFFFF" : "#F8FAFC" }}>
                        <td style={{ padding: "13px 20px", color: "#475569", borderBottom: "1px solid rgba(15,23,42,0.05)", fontWeight: 500 }}>{row.label}</td>
                        {(["Basic", "Pro", "Enterprise"] as const).map(col => (
                          <td key={col} style={{ padding: "13px 20px", textAlign: "center", borderBottom: "1px solid rgba(15,23,42,0.05)" }}>
                            <Cell v={row[col]} col={col} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Bottom note ── */}
      <div style={{ textAlign: "center", padding: "20px 24px 80px", color: "#94A3B8", fontSize: "14px" }}>
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
