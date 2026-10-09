import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DEMOS, findeDemo } from "../demos";
import { RestaurantDemo } from "./templates/RestaurantDemo";
import { HandwerkDemo } from "./templates/HandwerkDemo";
import { SalonDemo } from "./templates/SalonDemo";
import { FitnessDemo } from "./templates/FitnessDemo";
import { ImmobilienDemo } from "./templates/ImmobilienDemo";
import { ZahnarztDemo } from "./templates/ZahnarztDemo";

export function generateStaticParams() {
  return DEMOS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const demo = findeDemo(slug);
  if (!demo) return {};
  return {
    title: `${demo.name} – Vorlage (${demo.branche})`,
    description: demo.beschreibung,
  };
}

const TEMPLATES: Record<string, () => React.ReactElement> = {
  restaurant: RestaurantDemo,
  handwerk: HandwerkDemo,
  salon: SalonDemo,
  fitness: FitnessDemo,
  immobilien: ImmobilienDemo,
  zahnarzt: ZahnarztDemo,
};

export default async function VorlagenDemo({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const demo = findeDemo(slug);
  const Template = TEMPLATES[slug];
  if (!demo || !Template) notFound();

  return (
    <div style={{ background: "#080B14" }}>
      {/* NIL-Vorschau-Leiste */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(8,11,20,0.9)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(120,170,255,0.2)",
          color: "#EEF4FF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          padding: "10px 20px",
          fontFamily: "system-ui, sans-serif",
          flexWrap: "wrap",
        }}
      >
        <Link href="/vorlagen" style={{ color: "#EEF4FF", textDecoration: "none", fontSize: "13px", fontWeight: 700 }}>
          ← Alle Vorlagen
        </Link>
        <span style={{ fontSize: "12px", color: "#A2B2CE", letterSpacing: "0.05em" }}>
          NIL-Vorschau · {demo.branche} · <strong style={{ color: "#5BB8FF" }}>Beispiel, kein echter Betrieb</strong>
        </span>
        <Link
          href="/kontakt"
          style={{
            background: "#1F6DFF",
            color: "#fff",
            textDecoration: "none",
            fontSize: "12px",
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            padding: "8px 16px",
          }}
        >
          So eine Seite anfragen
        </Link>
      </div>

      {/* Die eigentliche Demo-Website */}
      <Template />
    </div>
  );
}
