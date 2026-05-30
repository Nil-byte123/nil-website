"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { NilLogo } from "../components/NilLogo";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Stripe publishable key, set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in .env.local
// const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

const plans = [
  { id: "basic", name: "Basic", price: "299 €/Monat", desc: "1 KI-Assistent, 500 Anfragen/Monat" },
  { id: "pro", name: "Pro", price: "699 €/Monat", desc: "3 KI-Assistenten, 3.000 Anfragen/Monat", featured: true },
  { id: "enterprise", name: "Enterprise", price: "Individuell", desc: "Unbegrenzt · Custom" },
];

export default function CheckoutPage() {
  const [selected, setSelected] = useState<string>("pro");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (selected === "enterprise") {
      window.location.href = "/#kontakt";
      return;
    }
    setLoading(true);
    // Stripe integration: create a checkout session via /api/stripe/create-session
    // Example:
    // const res = await fetch("/api/stripe/create-session", {
    //   method: "POST",
    //   headers: { "content-type": "application/json" },
    //   body: JSON.stringify({ plan: selected }),
    // });
    // const { url } = await res.json();
    // window.location.href = url;
    //
    // For now, redirect to contact form:
    setTimeout(() => {
      window.location.href = "/#kontakt";
    }, 800);
  };

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
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#64748B", fontSize: "13px" }}>
          <span style={{ color: "#0EA5E9" }}>🔒</span> Sichere Verbindung
        </div>
      </nav>

      <div style={{ maxWidth: "560px", margin: "0 auto", padding: "60px 24px 100px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <h1 style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "8px" }}>
            Paket auswählen
          </h1>
          <p style={{ color: "#64748B", fontSize: "15px", marginBottom: "40px" }}>
            Monatlich kündbar · Keine Einrichtungsgebühr
          </p>

          {/* Plan selector */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "36px" }}>
            {plans.map((plan) => (
              <motion.button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  padding: "18px 20px", borderRadius: "14px",
                  border: selected === plan.id
                    ? "2px solid #0EA5E9"
                    : "1.5px solid rgba(15,23,42,0.1)",
                  background: selected === plan.id
                    ? "rgba(14,165,233,0.04)"
                    : "#FFFFFF",
                  cursor: "pointer", textAlign: "left",
                  boxShadow: selected === plan.id
                    ? "0 0 0 3px rgba(14,165,233,0.12)"
                    : "none",
                  fontFamily: "inherit",
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
              >
                <div style={{
                  width: "20px", height: "20px", borderRadius: "50%", flexShrink: 0,
                  border: selected === plan.id ? "none" : "2px solid #CBD5E1",
                  background: selected === plan.id
                    ? "linear-gradient(135deg, #0EA5E9, #0284C7)"
                    : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {selected === plan.id && <span style={{ color: "#FFFFFF", fontSize: "11px" }}>✓</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontWeight: 600, fontSize: "15px", color: "#0F172A" }}>{plan.name}</span>
                    {plan.featured && (
                      <span style={{
                        background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                        color: "#FFFFFF", fontSize: "10px", fontWeight: 700,
                        padding: "3px 8px", borderRadius: "22px",
                      }}>BELIEBT</span>
                    )}
                  </div>
                  <div style={{ color: "#64748B", fontSize: "13px", marginTop: "2px" }}>{plan.desc}</div>
                </div>
                <span style={{ fontWeight: 700, fontSize: "15px", color: "#0F172A", flexShrink: 0 }}>
                  {plan.price}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Info box */}
          <div style={{
            background: "#F1F5F9", borderRadius: "12px", padding: "16px 18px",
            marginBottom: "28px", fontSize: "13px", color: "#475569", lineHeight: 1.6,
          }}>
            💡 <strong>Hinweis:</strong> Die Online-Zahlung per Stripe wird in Kürze verfügbar sein.
            Du wirst nach dem Klick zum Kontaktformular weitergeleitet, wo wir uns persönlich um dein Anliegen kümmern.
          </div>

          {/* CTA */}
          <motion.button
            onClick={handleCheckout}
            disabled={loading}
            whileHover={{ scale: 1.02, boxShadow: "0 12px 32px rgba(15,23,42,0.2)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: "100%", padding: "16px",
              background: loading ? "#94A3B8" : "#0F172A",
              color: "#FFFFFF", border: "none", borderRadius: "12px",
              fontWeight: 600, fontSize: "16px", cursor: loading ? "default" : "pointer",
              fontFamily: "inherit",
              boxShadow: "0 6px 20px rgba(15,23,42,0.15)",
            }}
          >
            {loading ? "Wird bearbeitet …" : selected === "enterprise" ? "Angebot anfragen →" : "Weiter →"}
          </motion.button>

          <p style={{ textAlign: "center", color: "#94A3B8", fontSize: "12px", marginTop: "16px" }}>
            🔒 SSL-verschlüsselt · DSGVO-konform
          </p>
        </motion.div>
      </div>
    </main>
  );
}
