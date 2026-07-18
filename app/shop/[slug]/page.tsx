import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { PRODUKTE, findeProdukt } from "../produkte";
import { ProduktDetail } from "./ProduktDetail";

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
  return {
    title: `${produkt.name} – Vorschau`,
    description: produkt.beschreibung,
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

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <ProduktDetail produkt={produkt} />
      <Footer />
    </main>
  );
}
