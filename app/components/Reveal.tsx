"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Scroll-Reveal: Inhalt gleitet beim Scrollen ins Bild.
   direction: "up" (Standard), "left", "right", "scale"          */
export function Reveal({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const reduce = useReducedMotion();

  const from =
    direction === "left"
      ? { opacity: 0, x: -40 }
      : direction === "right"
        ? { opacity: 0, x: 40 }
        : direction === "scale"
          ? { opacity: 0, scale: 0.9 }
          : { opacity: 0, y: 36 };

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={from}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* Gestaffelte Kinder: jedes Kind erscheint nacheinander */
export function RevealStagger({
  children,
  gap = 0.12,
}: {
  children: React.ReactNode[];
  gap?: number;
}) {
  return (
    <>
      {children.map((child, i) => (
        <Reveal key={i} delay={i * gap}>
          {child}
        </Reveal>
      ))}
    </>
  );
}
