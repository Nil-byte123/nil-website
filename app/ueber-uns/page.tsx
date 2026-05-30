"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NilLogo } from "../components/NilLogo";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Value Icons ──────────────────────────────────────────── */
const IconChip = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="9" width="14" height="14" rx="2" stroke="#0EA5E9" strokeWidth="1.5"/>
    <rect x="12.5" y="12.5" width="7" height="7" rx="1" stroke="#0EA5E9" strokeWidth="1.5"/>
    <path d="M12 7.5V9M16 7.5V9M20 7.5V9" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 23V24.5M16 23V24.5M20 23V24.5" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M7.5 12H9M7.5 16H9M7.5 20H9" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M23 12H24.5M23 16H24.5M23 20H24.5" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const IconBolt = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 5L9.5 18H15.5L13 27L22.5 14H16.5L19 5Z" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconShield = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4L7 8.5V15.5C7 20.5 11 25 16 27C21 25 25 20.5 25 15.5V8.5L16 4Z" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.5 16L14.8 18.5L19.5 13" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconPeople = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11.5" cy="10" r="3.5" stroke="#0EA5E9" strokeWidth="1.5"/>
    <circle cx="20.5" cy="10" r="3.5" stroke="#0EA5E9" strokeWidth="1.5"/>
    <path d="M5 25C5 21.13 7.91 18 11.5 18" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M27 25C27 21.13 24.09 18 20.5 18" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M11.5 18C13 17.4 14.2 17 16 17C17.8 17 19 17.4 20.5 18" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 25C12 22.24 13.79 20 16 20C18.21 20 20 22.24 20 25" stroke="#0EA5E9" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const values = [
  { icon: <IconChip />,   title: "KI mit Verstand", text: "Wir setzen KI nur dort ein, wo sie wirklich Mehrwert schafft, nicht als Spielerei, sondern als echtes Werkzeug." },
  { icon: <IconBolt />,   title: "Geschwindigkeit",  text: "Schnelle Umsetzung, direkte Kommunikation, keine langen Warteschlangen." },
  { icon: <IconShield />, title: "Datenschutz",      text: "DSGVO-konform von Grund auf. Deine Daten bleiben bei dir." },
  { icon: <IconPeople />, title: "Partnerschaft",    text: "Wir denken langfristig. Keine Einmallösungen, sondern dauerhafte Zusammenarbeit." },
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
          NIL ist ein junges Technologieunternehmen aus Bayern, das Unternehmen dabei hilft, repetitive Prozesse durch intelligente KI-Lösungen zu automatisieren, damit du dich auf das Wesentliche konzentrieren kannst.
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
                KI zugänglich machen, für jeden.
              </h2>
              <p style={{ color: "#475569", fontSize: "16px", lineHeight: 1.7 }}>
                Große Konzerne haben längst KI-Systeme im Einsatz. Unser Ziel: diese Technologie auch für Friseure, Restaurants und kleine Unternehmen nutzbar zu machen, ohne IT-Abteilung, ohne Millionenbudget.
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
                <div style={{ marginBottom: "14px", display: "flex" }}>{v.icon}</div>
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
                {/* Avatar */}
                <div style={{
                  width: "120px", height: "120px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #0a1628 0%, #1a3a5c 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 20px",
                  fontSize: "48px", fontWeight: 300, color: "#00BFFF",
                  letterSpacing: "-2px",
                  border: "2px solid rgba(0,191,255,0.2)",
                  boxShadow: "0 0 28px rgba(0,191,255,0.12), 0 12px 40px rgba(8,21,42,0.25)",
                }}>
                  {member.avatar}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "4px" }}>
                  {member.name}
                </h3>
                <p style={{ color: "#0EA5E9", fontSize: "13px", fontWeight: 500, marginBottom: "14px" }}>
                  {member.role}
                </p>
                <p style={{ color: "#475569", fontSize: "14px", lineHeight: 1.65, marginBottom: "18px" }}>
                  {member.bio}
                </p>
                {/* Social links */}
                <div style={{ display: "flex", gap: "14px", justifyContent: "center" }}>
                  <a href="https://linkedin.com/in/nil-elian-quezada" target="_blank" rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    style={{ color: "#94A3B8", display: "flex", alignItems: "center", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#0EA5E9")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a href="https://github.com/Nil-byte123" target="_blank" rel="noopener noreferrer"
                    aria-label="GitHub"
                    style={{ color: "#94A3B8", display: "flex", alignItems: "center", transition: "color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#0EA5E9")}
                    onMouseLeave={e => (e.currentTarget.style.color = "#94A3B8")}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                    </svg>
                  </a>
                </div>
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
