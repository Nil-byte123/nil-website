import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { PRODUKTE, findeProdukt } from "../produkte";
import { ProduktDetail } from "./ProduktDetail";
import { ermittleSprache } from "../../i18n/sprache";

export function generateStaticParams() {
  return PRODUKTE.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const produkt = findeProdukt(slug);
  if (!produkt) return {};
  const sprache = await ermittleSprache();
  return {
    title: `${produkt.name} – Vorschau`,
    description: produkt.beschreibung[sprache],
  };
}

export default async function ProduktSeite({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const produkt = findeProdukt(slug);
  if (!produkt) notFound();
  const sprache = await ermittleSprache();

  return (
    <main style={{ minHeight: "100vh", position: "relative" }}>
      <div className="page-grid" aria-hidden="true" />
      <Navbar sprache={sprache} />
      <ProduktDetail produkt={produkt} sprache={sprache} />
      <Footer sprache={sprache} />
    </main>
  );
}
