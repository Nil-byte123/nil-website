"use client";

import { motion } from "framer-motion";

/* ─── NIL Logo (dark variant – for light backgrounds) ───────── */
export function NilLogo({ width = 260, height = 100 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      {/* N – three separate strokes for clean letterform */}
      <path
        d="M16 14V86 M16 14L84 86 M84 14V86"
        stroke="#08152A"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* I – layered neon glow */}
      <motion.g
        animate={{ opacity: [1, 0.88, 1, 0.94, 1, 0.91, 1] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.15, 0.3, 0.5, 0.65, 0.8, 1],
        }}
      >
        <line x1="150" y1="14" x2="150" y2="86" stroke="#38BDF8" strokeWidth="40"
          strokeLinecap="round" opacity="0.07" style={{ filter: "blur(14px)" }} />
        <line x1="150" y1="14" x2="150" y2="86" stroke="#0EA5E9" strokeWidth="22"
          strokeLinecap="round" opacity="0.22" style={{ filter: "blur(7px)" }} />
        <line x1="150" y1="14" x2="150" y2="86" stroke="#0EA5E9" strokeWidth="11"
          strokeLinecap="round" opacity="0.52" style={{ filter: "blur(2.5px)" }} />
        <line x1="150" y1="14" x2="150" y2="86" stroke="#BAE6FD" strokeWidth="5.5"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 4px #0EA5E9) drop-shadow(0 0 10px #38BDF8)" }} />
        <line x1="150" y1="16" x2="150" y2="84" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </motion.g>

      {/* L – two separate strokes */}
      <path
        d="M216 14V86 M216 86H284"
        stroke="#08152A"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ─── NIL Logo (white variant – for dark backgrounds) ──────── */
export function NilLogoWhite({ width = 260, height = 100 }: { width?: number; height?: number }) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 300 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: "visible" }}
    >
      {/* N */}
      <path
        d="M16 14V86 M16 14L84 86 M84 14V86"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* I – brighter glow for dark background */}
      <motion.g
        animate={{ opacity: [1, 0.88, 1, 0.94, 1, 0.91, 1] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.15, 0.3, 0.5, 0.65, 0.8, 1],
        }}
      >
        <line x1="150" y1="14" x2="150" y2="86" stroke="#38BDF8" strokeWidth="40"
          strokeLinecap="round" opacity="0.15" style={{ filter: "blur(14px)" }} />
        <line x1="150" y1="14" x2="150" y2="86" stroke="#0EA5E9" strokeWidth="22"
          strokeLinecap="round" opacity="0.4" style={{ filter: "blur(7px)" }} />
        <line x1="150" y1="14" x2="150" y2="86" stroke="#0EA5E9" strokeWidth="11"
          strokeLinecap="round" opacity="0.7" style={{ filter: "blur(2.5px)" }} />
        <line x1="150" y1="14" x2="150" y2="86" stroke="#BAE6FD" strokeWidth="5.5"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 6px #0EA5E9) drop-shadow(0 0 14px #38BDF8)" }} />
        <line x1="150" y1="16" x2="150" y2="84" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </motion.g>

      {/* L */}
      <path
        d="M216 14V86 M216 86H284"
        stroke="rgba(255,255,255,0.9)"
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
