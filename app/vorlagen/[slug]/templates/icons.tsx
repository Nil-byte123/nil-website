/* Saubere Linien-Icons (stroke, currentColor) für die Demo-Vorlagen.
   Ersetzen die Emojis für einen professionellen Look.              */

type P = { size?: number; stroke?: number };
const base = (size: number, stroke: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: stroke,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export const IconWrench = ({ size = 28, stroke = 1.7 }: P) => (
  <svg {...base(size, stroke)}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L4 16.8V20h3.2l5.3-5.3a4 4 0 0 0 5.2-5.4l-2.5 2.5-2.3-.6-.6-2.3 2.4-2.6Z" /></svg>
);
export const IconFlame = ({ size = 28, stroke = 1.7 }: P) => (
  <svg {...base(size, stroke)}><path d="M12 3c1 3-2 4-2 7a2 2 0 1 0 4 0c0-1-.5-2-.5-2 2 1 3.5 3 3.5 6a5 5 0 1 1-10 0c0-4 3-6 5-11Z" /></svg>
);
export const IconDroplet = ({ size = 28, stroke = 1.7 }: P) => (
  <svg {...base(size, stroke)}><path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11Z" /></svg>
);
export const IconTooth = ({ size = 28, stroke = 1.7 }: P) => (
  <svg {...base(size, stroke)}><path d="M12 3C8 3 6 5 6 8c0 2 .5 3 .5 6S7 21 8.5 21s1-3 1.5-5 1-2 2-2 1.5 0 2 2 .5 5 1.5 5 2-3 2-7 .5-4 .5-6c0-3-2-5-6-5-1 0-1.5.6-2.5.6S13 3 12 3Z" /></svg>
);
export const IconSparkle = ({ size = 28, stroke = 1.7 }: P) => (
  <svg {...base(size, stroke)}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" /><path d="M18 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" /></svg>
);
export const IconShield = ({ size = 28, stroke = 1.7 }: P) => (
  <svg {...base(size, stroke)}><path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" /><path d="M9 12l2 2 4-4" /></svg>
);
export const IconHeart = ({ size = 28, stroke = 1.7 }: P) => (
  <svg {...base(size, stroke)}><path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9Z" /></svg>
);
export const IconHome = ({ size = 28, stroke = 1.7 }: P) => (
  <svg {...base(size, stroke)}><path d="M4 11l8-7 8 7" /><path d="M6 10v9h12v-9" /><path d="M10 19v-5h4v5" /></svg>
);
export const IconBuilding = ({ size = 28, stroke = 1.7 }: P) => (
  <svg {...base(size, stroke)}><rect x="6" y="3" width="12" height="18" rx="1" /><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2" /><path d="M10 21v-3h4v3" /></svg>
);
export const IconWaves = ({ size = 28, stroke = 1.7 }: P) => (
  <svg {...base(size, stroke)}><path d="M3 8c2-1.5 3-1.5 5 0s3 1.5 5 0 3-1.5 5 0M3 13c2-1.5 3-1.5 5 0s3 1.5 5 0 3-1.5 5 0M3 18c2-1.5 3-1.5 5 0s3 1.5 5 0 3-1.5 5 0" /></svg>
);
