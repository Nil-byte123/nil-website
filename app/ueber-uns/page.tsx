"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NilLogo } from "../components/NilLogo";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const values = [
  { icon: "🧠", title: "KI mit Verstand", text: "Wir setzen KI nur dort ein, wo sie wirklich Mehrwert schafft – nicht als Spielerei, sondern als echtes Werkzeug." },
  { icon: "⚡", title: "Geschwindigkeit", text: "Schnelle Umsetzung, direkte Kommunikation, keine langen Warteschlangen." },
  { icon: "🔒", title: "Datenschutz", text: "DSGVO-konform von Grund auf. Ihre Daten bleiben bei Ihnen." },
  { icon: "🤝", title: "Partnerschaft", text: "Wir denken langfristig. Keine Einmallösungen, sondern dauerhafte Zusammenarbeit." },
];

const team = [
  {
    name: "Nil Elian Quezada Capa",
    role: "Gründer & KI-Architekt",
    bio: "Leidenschaftlicher Entwickler und KI-Enthusiast aus Schwaigen. Spezialisiert auf die Verbindung von moderner KI-Technologie mit praktischen Geschäftslösungen.",
    avatar: "N",
  },
];

export default function UeberUns() {
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
        }}>
          ← Zurück zur Startseite
        </Link>
      </nav>

      {/* Hero */}
      <section style={{
        padding: "80px 24px 80px",
        background: "radial-gradient(ellipse at 50% 0%, #EFF4FB 0%, #F8FAFC 60%)",
        textAlign: "center",
      }}>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "12px" }}
        >
          ÜBER UNS
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease, delay: 0.1 }}
          style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, letterSpacing: "-0.04em", marginBottom: "20px" }}
        >
          Automatisierung mit Verstand.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          style={{ color: "#475569", fontSize: "17px", maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}
        >
          NIL ist ein junges Technologieunternehmen aus Bayern, das Unternehmen dabei hilft, repetitive Prozesse durch intelligente KI-Lösungen zu automatisieren – damit du dich auf das Wesentliche konzentrieren kannst.
        </motion.p>
      </section>

      {/* Mission */}
      <section style={{ padding: "80px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "40px", alignItems: "center" }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease }}
            >
              <p style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "12px" }}>
                UNSERE MISSION
              </p>
              <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "18px" }}>
                KI zugänglich machen – für jeden.
              </h2>
              <p style={{ color: "#475569", fontSize: "16px", lineHeight: 1.7 }}>
                Große Konzerne haben längst KI-Systeme im Einsatz. Unser Ziel: diese Technologie auch für Friseure, Restaurants und kleine Unternehmen nutzbar zu machen – ohne IT-Abteilung, ohne Millionenbudget.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: 0.15 }}
              style={{
                background: "linear-gradient(135deg, #060E1E 0%, #0D1F3C 100%)",
                borderRadius: "24px", padding: "40px",
                color: "#FFFFFF", textAlign: "center",
                boxShadow: "0 24px 60px rgba(8,21,42,0.2)",
              }}
            >
              {[
                { value: "100%", label: "DSGVO-konform" },
                { value: "24/7", label: "Verfügbarkeit" },
                { value: "< 2s", label: "Antwortzeit" },
              ].map((stat) => (
                <div key={stat.label} style={{ marginBottom: "28px", lastChild: { marginBottom: 0 } } as React.CSSProperties}>
                  <div style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-0.04em", color: "#0EA5E9" }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", letterSpacing: "1.5px", marginTop: "4px" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "80px 24px", background: "#F8FAFC" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "12px" }}>
              UNSERE WERTE
            </p>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.03em" }}>
              Was uns antreibt
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(15,23,42,0.07)",
                  borderRadius: "18px", padding: "28px 24px",
                  boxShadow: "0 4px 16px rgba(15,23,42,0.04)",
                }}
              >
                <div style={{ fontSize: "28px", marginBottom: "12px" }}>{v.icon}</div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px", letterSpacing: "-0.01em" }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748B", lineHeight: 1.6 }}>{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 24px", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <p style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "12px" }}>
              DAS TEAM
            </p>
            <h2 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, letterSpacing: "-0.03em" }}>
              Die Menschen hinter NIL
            </h2>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "32px", flexWrap: "wrap" }}>
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: i * 0.12 }}
                style={{ textAlign: "center", maxWidth: "320px" }}
              >
                {/* Avatar placeholder */}
                <div style={{
                  width: "96px", height: "96px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #0D1F3C, #08152A)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 16px",
                  fontSize: "32px", fontWeight: 800, color: "#0EA5E9",
                  boxShadow: "0 12px 32px rgba(8,21,42,0.2)",
                }}>
                  {member.avatar}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                  {member.name}
                </h3>
                <p style={{ color: "#0EA5E9", fontSize: "13px", fontWeight: 500, marginBottom: "12px" }}>
                  {member.role}
                </p>
                <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.65 }}>
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "80px 24px 100px", textAlign: "center",
        background: "linear-gradient(135deg, #060E1E 0%, #0D1F3C 100%)",
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease }}
          style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 700, color: "#FFFFFF", letterSpacing: "-0.03em", marginBottom: "16px" }}
        >
          Bereit, zusammenzuarbeiten?
        </motion.h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", marginBottom: "32px" }}>
          Lass uns gemeinsam die passende Lösung für dein Unternehmen entwickeln.
        </p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
          <Link href="/#kontakt" style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
            color: "#FFFFFF", padding: "16px 40px", borderRadius: "9999px",
            fontWeight: 600, fontSize: "15px", textDecoration: "none",
            boxShadow: "0 10px 28px rgba(14,165,233,0.4)",
          }}>
            Jetzt Kontakt aufnehmen →
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
