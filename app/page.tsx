"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

const appleEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function FinalBrandingLogo({ width = 260, height = 100 }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 280 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      <path
        d="M15 82V18L75 82V18"
        stroke="#08152A"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.g
        animate={{ opacity: [1, 0.88, 1, 0.94, 1, 0.91, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 0.5, 0.65, 0.8, 1] }}
      >
        <line x1="140" y1="18" x2="140" y2="82"
          stroke="#38BDF8" strokeWidth="40" strokeLinecap="round"
          opacity="0.07" style={{ filter: "blur(14px)" }} />
        <line x1="140" y1="18" x2="140" y2="82"
          stroke="#0EA5E9" strokeWidth="22" strokeLinecap="round"
          opacity="0.22" style={{ filter: "blur(7px)" }} />
        <line x1="140" y1="18" x2="140" y2="82"
          stroke="#0EA5E9" strokeWidth="11" strokeLinecap="round"
          opacity="0.52" style={{ filter: "blur(2.5px)" }} />
        <line x1="140" y1="18" x2="140" y2="82"
          stroke="#BAE6FD" strokeWidth="5.5" strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 4px #0EA5E9) drop-shadow(0 0 10px #38BDF8)" }} />
        <line x1="140" y1="20" x2="140" y2="80"
          stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
      <path
        d="M205 18V82H265"
        stroke="#08152A"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const headline = "Automatisierung mit Verstand.";
const words = headline.split(" ");

export default function Home() {
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const rawLaptopY  = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rawDevicesY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const laptopY  = useSpring(rawLaptopY,  { stiffness: 80, damping: 25 });
  const devicesY = useSpring(rawDevicesY, { stiffness: 80, damping: 25 });

  return (
    <main
      style={{
        background: "#F8FAFC",
        color: "#0F172A",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      {/* NAVBAR — slides down on load */}
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: appleEase, delay: 0.1 }}
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: "68px",
          backgroundColor: "rgba(248, 250, 252, 0.78)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: "1px solid rgba(15, 23, 42, 0.06)",
          display: "flex",
          alignItems: "center",
          padding: "0 40px",
          zIndex: 1000,
        }}
      >
        <div style={{ maxWidth: "1150px", width: "100%", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <FinalBrandingLogo width={112} height={40} />
          <div style={{ display: "flex", gap: "36px", fontSize: "13px", color: "#475569", fontWeight: 500, letterSpacing: "0.3px" }}>
            {["Vorteile", "Services", "Kontakt"].map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: appleEase, delay: 0.35 + i * 0.07 }}
                whileHover={{ color: "#0EA5E9" }}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        style={{
          position: "relative",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "68px 20px 0",
          boxSizing: "border-box",
          overflow: "hidden",
          background: "radial-gradient(ellipse at 50% 40%, #FFFFFF 0%, #EFF4FB 100%)",
        }}
      >
        {/* LAPTOP — Parallax + float. Wrapper für CSS-Zentrierung, Motion für Parallax */}
        <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <motion.div
            style={{ y: laptopY, width: "300px", opacity: 0.18 }}
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 0.18, x: 0 }}
            transition={{ duration: 1.2, ease: appleEase, delay: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [-0.4, 0.4, -0.4] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg viewBox="0 0 300 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="296" height="185" rx="10" stroke="#0D1B2E" strokeWidth="2.5" fill="#F8FAFC"/>
                <circle cx="150" cy="10" r="3" fill="#64748B"/>
                <rect x="12" y="18" width="276" height="162" rx="5" fill="#E2E8F0"/>
                <rect x="18" y="24" width="264" height="16" rx="3" fill="#F1F5F9"/>
                <rect x="23" y="27" width="32" height="10" rx="2" fill="#0D1B2E" opacity="0.6"/>
                <rect x="190" y="28" width="22" height="7" rx="2" fill="#94A3B8"/>
                <rect x="217" y="28" width="22" height="7" rx="2" fill="#94A3B8"/>
                <rect x="244" y="27" width="32" height="9" rx="4" fill="#0D1B2E" opacity="0.5"/>
                <rect x="80" y="58" width="140" height="16" rx="4" fill="#0D1B2E" opacity="0.45"/>
                <rect x="95" y="81" width="110" height="9" rx="3" fill="#94A3B8"/>
                <rect x="100" y="96" width="100" height="9" rx="3" fill="#CBD5E1"/>
                <rect x="110" y="120" width="80" height="24" rx="12" fill="#0D1B2E" opacity="0.6"/>
                <path d="M0 188 L300 188 L292 206 L8 206 Z" stroke="#0D1B2E" strokeWidth="2" fill="#F1F5F9"/>
                <rect x="115" y="193" width="70" height="9" rx="4" stroke="#94A3B8" strokeWidth="1.5" fill="none"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* TABLET + SMARTPHONE — Parallax + float. Wrapper für CSS-Zentrierung */}
        <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}>
          <motion.div
            style={{ y: devicesY, opacity: 0.18 }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 0.18, x: 0 }}
            transition={{ duration: 1.2, ease: appleEase, delay: 0.7 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0.4, -0.4, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
            >
              <div style={{ width: "138px" }}>
                <svg viewBox="0 0 150 215" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="146" height="211" rx="16" stroke="#0D1B2E" strokeWidth="2.5" fill="#F8FAFC"/>
                  <circle cx="75" cy="12" r="3.5" fill="#64748B"/>
                  <rect x="10" y="24" width="130" height="170" rx="5" fill="#E2E8F0"/>
                  <rect x="52" y="202" width="46" height="5" rx="2.5" fill="#94A3B8"/>
                  <rect x="18" y="32" width="114" height="12" rx="3" fill="#CBD5E1"/>
                  <rect x="18" y="52" width="114" height="55" rx="6" fill="#CBD5E1" opacity="0.55"/>
                  <rect x="18" y="115" width="60" height="8" rx="3" fill="#0D1B2E" opacity="0.4"/>
                  <rect x="18" y="130" width="114" height="6" rx="3" fill="#CBD5E1"/>
                  <rect x="18" y="142" width="90" height="6" rx="3" fill="#CBD5E1"/>
                  <rect x="35" y="162" width="80" height="22" rx="11" fill="#0D1B2E" opacity="0.55"/>
                </svg>
              </div>
              <div style={{ width: "88px", marginTop: "28px" }}>
                <svg viewBox="0 0 100 205" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="96" height="201" rx="22" stroke="#0D1B2E" strokeWidth="2.5" fill="#F8FAFC"/>
                  <rect x="28" y="10" width="44" height="11" rx="5.5" fill="#0D1B2E"/>
                  <rect x="8" y="26" width="84" height="160" rx="7" fill="#E2E8F0"/>
                  <rect x="32" y="194" width="36" height="4" rx="2" fill="#94A3B8"/>
                  <rect x="96" y="68" width="4" height="28" rx="2" fill="#94A3B8"/>
                  <rect x="0" y="62" width="4" height="18" rx="2" fill="#94A3B8"/>
                  <rect x="0" y="86" width="4" height="18" rx="2" fill="#94A3B8"/>
                  <rect x="16" y="36" width="68" height="10" rx="3" fill="#CBD5E1"/>
                  <rect x="16" y="54" width="68" height="42" rx="5" fill="#CBD5E1" opacity="0.55"/>
                  <rect x="16" y="104" width="45" height="7" rx="3" fill="#0D1B2E" opacity="0.4"/>
                  <rect x="16" y="117" width="68" height="5" rx="2.5" fill="#CBD5E1"/>
                  <rect x="16" y="128" width="55" height="5" rx="2.5" fill="#CBD5E1"/>
                  <rect x="20" y="148" width="60" height="20" rx="10" fill="#0D1B2E" opacity="0.55"/>
                </svg>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* HERO CONTENT — scroll-fade-out + parallax */}
        <motion.div
          style={{ position: "relative", zIndex: 1, opacity: heroOpacity }}
        >
          {/* Logo mit Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: appleEase }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "36px", position: "relative" }}
          >
            <motion.div
              animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.12, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{
                position: "absolute",
                width: "70px", height: "180px",
                background: "radial-gradient(ellipse at center, rgba(14,165,233,0.28) 0%, rgba(56,189,248,0.10) 55%, transparent 80%)",
                borderRadius: "50%",
                filter: "blur(10px)",
                pointerEvents: "none",
              }}
            />
            <FinalBrandingLogo width={260} height={95} />
          </motion.div>

          {/* Headline — Wort für Wort */}
          <h1 style={{
            fontSize: "clamp(26px, 5vw, 45px)",
            color: "#0F172A",
            marginBottom: "20px",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
          }}>
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.8, ease: appleEase, delay: 0.25 + i * 0.09 }}
                style={{ display: "inline-block", marginRight: "0.28em" }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: appleEase, delay: 0.65 }}
            style={{
              fontSize: "16px",
              color: "#475569",
              maxWidth: "560px",
              margin: "0 auto 40px auto",
              lineHeight: 1.65,
              fontWeight: 400,
            }}
          >
            Intelligente KI-Agenten und maßgeschneiderte Softwarelösungen.{" "}
            Wir machen die Abläufe für Entwickler, Salons und Gastronomie spürbar effizienter.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: appleEase, delay: 0.85 }}
          >
            <motion.a
              href="#kontakt"
              style={{
                display: "inline-block",
                background: "#0F172A",
                color: "#FFFFFF",
                padding: "16px 40px",
                borderRadius: "9999px",
                fontWeight: 500,
                fontSize: "14px",
                textDecoration: "none",
                boxShadow: "0 10px 30px rgba(15,23,42,0.15)",
              }}
              whileHover={{ scale: 1.04, boxShadow: "0 16px 40px rgba(15,23,42,0.28)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            >
              Jetzt anfragen
            </motion.a>
          </motion.div>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{
            position: "absolute",
            bottom: "36px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            pointerEvents: "none",
          }}
        >
          <motion.span style={{ fontSize: "10px", color: "#94A3B8", letterSpacing: "2px", fontWeight: 600 }}>
            SCROLL
          </motion.span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: "1px", height: "32px", background: "linear-gradient(to bottom, #94A3B8, transparent)" }}
          />
        </motion.div>
      </section>

      {/* SHOWCASE SECTION */}
      <section
        id="vorteile"
        style={{
          padding: "120px 20px 120px",
          background: "linear-gradient(to bottom, #EFF4FB 0%, #FFFFFF 80px)",
        }}
      >
        <div style={{ maxWidth: "1050px", margin: "0 auto" }}>

          {/* Headline Block — staggered */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
            style={{ textAlign: "center", marginBottom: "80px" }}
          >
            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: appleEase } },
              }}
              style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "12px" }}
            >
              PASSGENAU FÜR JEDE BRANCHE
            </motion.p>
            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: appleEase } },
              }}
              style={{ fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.04em", color: "#0F172A" }}
            >
              24/7 erreichbar. Ohne Personalaufwand.
            </motion.h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px", alignItems: "center" }}>

            {/* Text — von links */}
            <motion.div
              initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: appleEase, delay: 0.1 }}
            >
              <h3 style={{ fontSize: "24px", marginBottom: "18px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                Kundenanfragen automatisch klären.
              </h3>
              <p style={{ color: "#475569", fontSize: "16px", lineHeight: 1.65, marginBottom: "32px" }}>
                Ob Tischreservierung im Café, Terminbuchung beim Friseur oder automatisierter Support für Tech-Unternehmen:{" "}
                Unsere Assistenten arbeiten unsichtbar auf deiner Plattform und entlasten dein Team vollständig.
              </p>
            </motion.div>

            {/* Chat-Card — von rechts, mit animierten Nachrichten */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: appleEase, delay: 0.2 }}
              style={{
                background: "#F8FAFC",
                border: "1px solid rgba(15, 23, 42, 0.06)",
                borderRadius: "24px",
                padding: "32px",
                boxShadow: "0 20px 60px rgba(15,23,42,0.06)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px", paddingBottom: "14px", borderBottom: "1px solid rgba(15, 23, 42, 0.06)" }}>
                <motion.div
                  animate={{ scale: [1, 1.4, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0EA5E9" }}
                />
                <span style={{ fontSize: "11px", color: "#64748B", fontWeight: 600, letterSpacing: "0.8px" }}>LIVE DEMO CHAT</span>
              </div>

              <motion.div
                initial={{ opacity: 0, x: -16, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: appleEase, delay: 0.5 }}
                style={{ background: "#EDF2F7", padding: "14px 18px", borderRadius: "14px", marginBottom: "14px", maxWidth: "85%" }}
              >
                <p style={{ color: "#1A202C", fontSize: "14px", margin: 0, lineHeight: 1.4 }}>
                  Hallo! Kann ich für morgen einen Haarschnitt und einen Tisch reservieren?
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 16, y: 8 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: appleEase, delay: 0.85 }}
                style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)", padding: "14px 18px", borderRadius: "14px", maxWidth: "85%", marginLeft: "auto" }}
              >
                <p style={{ color: "#0369A1", fontSize: "14px", margin: 0, lineHeight: 1.4 }}>
                  Natürlich! Dein Termin steht für 14:00 Uhr und der Kaffeetisch ist ab 15:00 Uhr für dich gebucht. ✨
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KONTAKT FOOTER */}
      <section
        id="kontakt"
        style={{ padding: "120px 20px 100px", textAlign: "center", background: "linear-gradient(to bottom, #FFFFFF 0%, #EFF4FB 100px, #E8EFF8 100%)" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.16 } } }}
          style={{ maxWidth: "550px", margin: "0 auto" }}
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, scale: 0.92, y: 24, filter: "blur(6px)" },
              visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: appleEase } },
            }}
            style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "18px", color: "#0F172A" }}
          >
            Bereit für die Zukunft?
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: appleEase } },
            }}
            style={{ color: "#475569", fontSize: "16px", marginBottom: "38px" }}
          >
            Lass uns gemeinsam deine Prozesse intelligent automatisieren.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.9, y: 20 },
              visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: appleEase } },
            }}
          >
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              {/* Telefon */}
              <motion.a
                href="tel:+4915129436338"
                whileHover={{ scale: 1.03, boxShadow: "0 20px 50px rgba(0,0,0,0.07)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  background: "#FFFFFF", border: "1px solid rgba(15, 23, 42, 0.06)",
                  padding: "20px 32px", borderRadius: "16px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)", textDecoration: "none",
                  minWidth: "180px",
                }}
              >
                <p style={{ color: "#64748B", fontSize: "11px", margin: "0 0 6px 0", letterSpacing: "1.2px", fontWeight: 600 }}>TELEFON</p>
                <span style={{ color: "#0F172A", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  0151 29436338
                </span>
              </motion.a>

              {/* E-Mail (Platzhalter bis du die Adresse gibst) */}
              <motion.a
                href="mailto:info@nilogik.com"
                whileHover={{ scale: 1.03, boxShadow: "0 20px 50px rgba(0,0,0,0.07)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  background: "#FFFFFF", border: "1px solid rgba(15, 23, 42, 0.06)",
                  padding: "20px 32px", borderRadius: "16px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)", textDecoration: "none",
                  minWidth: "180px",
                }}
              >
                <p style={{ color: "#64748B", fontSize: "11px", margin: "0 0 6px 0", letterSpacing: "1.2px", fontWeight: 600 }}>E-MAIL</p>
                <span style={{ color: "#0EA5E9", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  info@nilogik.com
                </span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}
