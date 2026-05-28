"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

const appleEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ─── Übersetzungen ─────────────────────────────────────────── */
const translations = {
  de: {
    nav: { advantages: "Vorteile", services: "Services", demo: "Demo", contact: "Kontakt" },
    hero: {
      headline: "Mehr Zeit. Mehr Umsatz. Automatisch.",
      subtext: "Intelligente KI-Agenten und maßgeschneiderte Softwarelösungen. Wir machen die Abläufe für Entwickler, Salons und Gastronomie spürbar effizienter.",
      cta: "Jetzt anfragen",
    },
    showcase: {
      label: "PASSGENAU FÜR JEDE BRANCHE",
      headline: "24/7 erreichbar. Ohne Personalaufwand.",
      h3: "Kundenanfragen automatisch klären.",
      text: "Ob Tischreservierung im Café, Terminbuchung beim Friseur oder automatisierter Support für Tech-Unternehmen: Unsere Assistenten arbeiten unsichtbar auf deiner Plattform und entlasten dein Team vollständig.",
      chat1: "Hallo! Kann ich für morgen einen Haarschnitt und einen Tisch reservieren?",
      chat2: "Natürlich! Dein Termin steht für 14:00 Uhr und der Kaffeetisch ist ab 15:00 Uhr für dich gebucht. ✨",
      chatLabel: "LIVE DEMO CHAT",
    },
    demo: {
      label: "LIVE DEMO",
      headline: "Einfach ausprobieren.",
      subtext: "Schreib unserem KI-Salon-Assistenten live – genau so sieht die Lösung für deinen Betrieb aus.",
      greeting: "Hallo! Ich bin NIL, dein digitaler Salon-Assistent. Wie kann ich dir heute helfen? ✂️",
      placeholder: "Nachricht schreiben …",
    },
    contact: {
      headline: "Bereit für die Zukunft?",
      subtext: "Lass uns gemeinsam deine Prozesse intelligent automatisieren.",
      phoneLabel: "TELEFON",
      emailLabel: "E-MAIL",
    },
  },
  en: {
    nav: { advantages: "Benefits", services: "Services", demo: "Demo", contact: "Contact" },
    hero: {
      headline: "More time. More revenue. Automated.",
      subtext: "Smart AI agents and tailor-made software solutions. We make workflows for developers, salons and hospitality measurably more efficient.",
      cta: "Get in touch",
    },
    showcase: {
      label: "TAILORED FOR EVERY INDUSTRY",
      headline: "Available 24/7. Without staffing costs.",
      h3: "Resolve customer inquiries automatically.",
      text: "Whether table reservations at a café, appointments at a hair salon or automated support for tech companies: our assistants work invisibly on your platform and fully relieve your team.",
      chat1: "Hi! Can I book a haircut and a table for tomorrow?",
      chat2: "Of course! Your appointment is set for 2:00 PM and the café table is reserved from 3:00 PM. ✨",
      chatLabel: "LIVE DEMO CHAT",
    },
    demo: {
      label: "LIVE DEMO",
      headline: "Try it right now.",
      subtext: "Chat with our AI salon assistant live – this is exactly what the solution looks like for your business.",
      greeting: "Hallo! Ich bin NIL, dein digitaler Salon-Assistent. Wie kann ich dir heute helfen? ✂️",
      placeholder: "Write a message …",
    },
    contact: {
      headline: "Ready for the future?",
      subtext: "Let's intelligently automate your processes together.",
      phoneLabel: "PHONE",
      emailLabel: "EMAIL",
    },
  },
  es: {
    nav: { advantages: "Ventajas", services: "Servicios", demo: "Demo", contact: "Contacto" },
    hero: {
      headline: "Más tiempo. Más ingresos. Automatizado.",
      subtext: "Agentes de IA inteligentes y soluciones de software a medida. Hacemos los procesos para desarrolladores, salones y gastronomía notablemente más eficientes.",
      cta: "Solicitar ahora",
    },
    showcase: {
      label: "ADAPTADO A CADA SECTOR",
      headline: "Disponible 24/7. Sin costes de personal.",
      h3: "Resuelve consultas de clientes automáticamente.",
      text: "Ya sea una reserva de mesa en un café, una cita en una peluquería o soporte automatizado para empresas tecnológicas: nuestros asistentes trabajan invisiblemente en tu plataforma y liberan completamente a tu equipo.",
      chat1: "¡Hola! ¿Puedo reservar un corte de pelo y una mesa para mañana?",
      chat2: "¡Por supuesto! Tu cita está a las 14:00 h y la mesa del café está reservada desde las 15:00 h. ✨",
      chatLabel: "DEMO EN VIVO",
    },
    demo: {
      label: "DEMO EN VIVO",
      headline: "Pruébalo ahora mismo.",
      subtext: "Chatea con nuestro asistente de IA en vivo – así es exactamente como se ve la solución para tu negocio.",
      greeting: "Hallo! Ich bin NIL, dein digitaler Salon-Assistent. Wie kann ich dir heute helfen? ✂️",
      placeholder: "Escribe un mensaje …",
    },
    contact: {
      headline: "¿Listo para el futuro?",
      subtext: "Automaticemos juntos tus procesos de forma inteligente.",
      phoneLabel: "TELÉFONO",
      emailLabel: "CORREO",
    },
  },
  fr: {
    nav: { advantages: "Avantages", services: "Services", demo: "Démo", contact: "Contact" },
    hero: {
      headline: "Plus de temps. Plus de revenus. Automatisé.",
      subtext: "Agents IA intelligents et solutions logicielles sur mesure. Nous rendons les processus pour développeurs, salons et restauration bien plus efficaces.",
      cta: "Demander maintenant",
    },
    showcase: {
      label: "ADAPTÉ À CHAQUE SECTEUR",
      headline: "Disponible 24h/7j. Sans coûts de personnel.",
      h3: "Traiter automatiquement les demandes clients.",
      text: "Qu'il s'agisse d'une réservation de table dans un café, d'un rendez-vous chez le coiffeur ou d'un support automatisé pour des entreprises tech : nos assistants travaillent invisiblement sur votre plateforme.",
      chat1: "Bonjour ! Je peux réserver une coupe et une table pour demain ?",
      chat2: "Bien sûr ! Votre rendez-vous est fixé à 14h00 et la table du café est réservée à partir de 15h00. ✨",
      chatLabel: "DÉMO EN DIRECT",
    },
    demo: {
      label: "DÉMO EN DIRECT",
      headline: "Essayez-le maintenant.",
      subtext: "Chattez avec notre assistant IA en direct – c'est exactement à quoi ressemble la solution pour votre entreprise.",
      greeting: "Hallo! Ich bin NIL, dein digitaler Salon-Assistent. Wie kann ich dir heute helfen? ✂️",
      placeholder: "Écrire un message …",
    },
    contact: {
      headline: "Prêt pour l'avenir ?",
      subtext: "Automatisons ensemble vos processus de manière intelligente.",
      phoneLabel: "TÉLÉPHONE",
      emailLabel: "E-MAIL",
    },
  },
  it: {
    nav: { advantages: "Vantaggi", services: "Servizi", demo: "Demo", contact: "Contatti" },
    hero: {
      headline: "Più tempo. Più guadagni. Automatico.",
      subtext: "Agenti IA intelligenti e soluzioni software su misura. Rendiamo i processi per sviluppatori, salon e ristorazione notevolmente più efficienti.",
      cta: "Richiedi ora",
    },
    showcase: {
      label: "SU MISURA PER OGNI SETTORE",
      headline: "Disponibile 24/7. Senza costi di personale.",
      h3: "Gestisci automaticamente le richieste dei clienti.",
      text: "Che si tratti di prenotazione tavolo in un caffè, appuntamento dal parrucchiere o supporto automatizzato per aziende tech: i nostri assistenti lavorano invisibilmente sulla tua piattaforma.",
      chat1: "Ciao! Posso prenotare un taglio di capelli e un tavolo per domani?",
      chat2: "Certo! Il tuo appuntamento è fissato per le 14:00 e il tavolo del caffè è prenotato dalle 15:00. ✨",
      chatLabel: "DEMO DAL VIVO",
    },
    demo: {
      label: "DEMO DAL VIVO",
      headline: "Provalo subito.",
      subtext: "Chatta con il nostro assistente IA dal vivo – è esattamente così che appare la soluzione per la tua attività.",
      greeting: "Hallo! Ich bin NIL, dein digitaler Salon-Assistent. Wie kann ich dir heute helfen? ✂️",
      placeholder: "Scrivi un messaggio …",
    },
    contact: {
      headline: "Pronto per il futuro?",
      subtext: "Automatizziamo insieme i tuoi processi in modo intelligente.",
      phoneLabel: "TELEFONO",
      emailLabel: "E-MAIL",
    },
  },
};

type LangCode = keyof typeof translations;

/* ─── Sprach-abhängige Labels für neue Sektionen ────────────── */
const sl: Record<LangCode, {
  srvLabel: string; srvHl: string;
  faqLabel: string; faqHl: string;
  tstLabel: string; tstHl: string;
  calendly: string;
  nlHeading: string; nlPlaceholder: string; nlBtn: string; nlSuccess: string;
}> = {
  de: { srvLabel: "LEISTUNGEN", srvHl: "Smarte Lösungen für jede Branche.", faqLabel: "FAQ", faqHl: "Häufig gestellte Fragen.", tstLabel: "KUNDENSTIMMEN", tstHl: "Was unsere Kunden sagen.", calendly: "Termin buchen", nlHeading: "Updates & Insights", nlPlaceholder: "Deine E-Mail-Adresse", nlBtn: "Anmelden", nlSuccess: "Angemeldet! ✨" },
  en: { srvLabel: "SERVICES", srvHl: "The right solution for every industry.", faqLabel: "FAQ", faqHl: "Frequently asked questions.", tstLabel: "TESTIMONIALS", tstHl: "What our clients say.", calendly: "Book a meeting", nlHeading: "Stay updated", nlPlaceholder: "Your email address", nlBtn: "Subscribe", nlSuccess: "Subscribed! ✨" },
  es: { srvLabel: "SERVICIOS", srvHl: "La solución adecuada para cada sector.", faqLabel: "FAQ", faqHl: "Preguntas frecuentes.", tstLabel: "OPINIONES", tstHl: "Lo que dicen nuestros clientes.", calendly: "Reservar cita", nlHeading: "Mantenerse informado", nlPlaceholder: "Tu correo electrónico", nlBtn: "Suscribirse", nlSuccess: "¡Suscrito! ✨" },
  fr: { srvLabel: "SERVICES", srvHl: "La bonne solution pour chaque secteur.", faqLabel: "FAQ", faqHl: "Questions fréquentes.", tstLabel: "TÉMOIGNAGES", tstHl: "Ce que disent nos clients.", calendly: "Prendre RDV", nlHeading: "Restez informé", nlPlaceholder: "Votre adresse e-mail", nlBtn: "S'inscrire", nlSuccess: "Inscrit(e) ! ✨" },
  it: { srvLabel: "SERVIZI", srvHl: "La soluzione giusta per ogni settore.", faqLabel: "FAQ", faqHl: "Domande frequenti.", tstLabel: "TESTIMONIANZE", tstHl: "Cosa dicono i nostri clienti.", calendly: "Prenota un incontro", nlHeading: "Rimani aggiornato", nlPlaceholder: "Il tuo indirizzo e-mail", nlBtn: "Iscriviti", nlSuccess: "Iscritto! ✨" },
};

/* ─── Rotating Hero Taglines ────────────────────────────────── */
const rotatingTaglines: Record<LangCode, string[]> = {
  de: [
    "✂️  Dienstleister: Termine & Kundenkommunikation – vollautomatisch, rund um die Uhr.",
    "🍽️  Gastronomie & Handel: Reservierungen, Bestellungen & Anfragen automatisch bearbeiten.",
    "💻  Unternehmen & Teams: Smarte Automatisierung für jeden Betrieb – unabhängig der Branche.",
  ],
  en: [
    "✂️  Service businesses: Appointments & customer communication – fully automated, 24/7.",
    "🍽️  Hospitality & retail: Handle reservations, orders & inquiries automatically.",
    "💻  Companies & teams: Smart automation for any business – whatever the industry.",
  ],
  es: [
    "✂️  Negocios de servicios: Citas y comunicación con clientes – totalmente automatizados, 24/7.",
    "🍽️  Hostelería y comercio: Gestiona reservas, pedidos y consultas automáticamente.",
    "💻  Empresas y equipos: Automatización inteligente para cualquier negocio.",
  ],
  fr: [
    "✂️  Prestataires de services : Rendez-vous & relation client – entièrement automatisés, 24h/24.",
    "🍽️  Restauration & commerce : Gérez réservations, commandes et demandes automatiquement.",
    "💻  Entreprises & équipes : Automatisation intelligente pour tout type de business.",
  ],
  it: [
    "✂️  Servizi: Appuntamenti & comunicazione clienti – completamente automatizzati, 24/7.",
    "🍽️  Ristorazione & commercio: Gestisci prenotazioni, ordini e richieste automaticamente.",
    "💻  Aziende & team: Automazione intelligente per qualsiasi tipo di business.",
  ],
};

/* ─── Service Cards (statisch) ──────────────────────────────── */
const serviceCards = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/>
        <path d="M16 2v4M8 2v4M3 10h18"/>
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/>
      </svg>
    ),
    title: "Dienstleister & Beauty",
    text: { de: "Automatische Terminbuchung, Kundenkommunikation und Erinnerungen – damit du dich auf deine Arbeit konzentrierst, nicht auf Verwaltung.", en: "Automatic appointment booking, customer communication and reminders – so you focus on your craft, not admin.", es: "Reservas automáticas, comunicación con clientes y recordatorios – para que te centres en tu trabajo.", fr: "Réservations automatiques, communication client et rappels – pour vous concentrer sur votre métier.", it: "Prenotazioni automatiche, comunicazione clienti e promemoria – per concentrarti sul tuo lavoro." },
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
        <path d="M7 2v20M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3z"/>
        <path d="M21 15v7"/>
      </svg>
    ),
    title: "Gastronomie & Handel",
    text: { de: "Tischreservierungen, Bestellannahme, Anfragen und Gästekommunikation – vollautomatisch, rund um die Uhr.", en: "Table reservations, orders, inquiries and guest communication – fully automated, around the clock.", es: "Reservas, pedidos, consultas y comunicación con clientes – completamente automatizados.", fr: "Réservations, commandes, demandes et communication client – entièrement automatisés.", it: "Prenotazioni, ordini, richieste e comunicazione ospiti – completamente automatizzati." },
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="1"/>
        <path d="M9 22V12h6v10M8 6h.01M16 6h.01M8 10h.01M16 10h.01"/>
      </svg>
    ),
    title: "Unternehmen & Teams",
    text: { de: "Smarte Softwarelösungen und digitale Assistenten für jede Branche – individuell auf deinen Betrieb zugeschnitten.", en: "Smart software solutions and digital assistants for any industry – tailored to your business.", es: "Soluciones de software inteligentes y asistentes digitales para cualquier sector.", fr: "Solutions logicielles intelligentes et assistants numériques pour tout secteur.", it: "Soluzioni software intelligenti e assistenti digitali per qualsiasi settore." },
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    title: "Gesundheit & Beratung",
    text: { de: "Terminvergabe, Patientenkommunikation und Beratungsanfragen – zuverlässig automatisiert, damit du dich auf deine Klienten konzentrierst.", en: "Appointment scheduling, patient communication and consultation inquiries – reliably automated so you focus on your clients.", es: "Programación de citas, comunicación con pacientes y consultas – automatizados de forma fiable.", fr: "Prise de rendez-vous, communication patients et demandes de consultation – automatisés de manière fiable.", it: "Prenotazioni, comunicazione pazienti e richieste di consulenza – automatizzati in modo affidabile." },
  },
];

/* ─── FAQ Items ─────────────────────────────────────────────── */
const faqItems: Record<LangCode, { q: string; a: string }[]> = {
  de: [
    { q: "Wie schnell ist die Einrichtung?", a: "In der Regel ist dein Assistent innerhalb von 3–5 Werktagen live – ohne technisches Vorwissen deinerseits." },
    { q: "Brauche ich IT-Kenntnisse?", a: "Nein. Wir übernehmen die komplette technische Einrichtung. Du erhältst eine fertige, einsatzbereite Lösung." },
    { q: "Welche Sprachen versteht der Assistent?", a: "Standardmäßig Deutsch und Englisch. Weitere Sprachen sind auf Anfrage möglich." },
    { q: "Kann ich den Assistenten anpassen?", a: "Ja – Ton, Persönlichkeit, Wissen und Integrationen sind vollständig auf dein Unternehmen zugeschnitten." },
    { q: "Wie sicher sind meine Daten?", a: "Alle Daten werden DSGVO-konform verarbeitet. Keine dauerhafte Speicherung von Gesprächsinhalten." },
    { q: "Was passiert nach der Kündigung?", a: "Die Nutzung endet sofort. Es gibt keine versteckten Gebühren oder Bindungsfristen." },
  ],
  en: [
    { q: "How fast is the setup?", a: "Your assistant is usually live within 3–5 business days – no technical knowledge required from you." },
    { q: "Do I need IT knowledge?", a: "No. We handle the complete technical setup. You receive a ready-to-use solution." },
    { q: "What languages does the assistant understand?", a: "German and English by default. Additional languages available on request." },
    { q: "Can I customize the assistant?", a: "Yes – tone, personality, knowledge and integrations are fully tailored to your business." },
    { q: "How secure is my data?", a: "All data is processed in accordance with GDPR. No permanent storage of conversation content." },
    { q: "What happens after cancellation?", a: "Usage ends immediately. No hidden fees or lock-in periods." },
  ],
  es: [
    { q: "¿Qué tan rápida es la configuración?", a: "Tu asistente suele estar en funcionamiento en 3–5 días laborables." },
    { q: "¿Necesito conocimientos de IT?", a: "No. Nos encargamos de toda la configuración técnica. Recibes una solución lista para usar." },
    { q: "¿Qué idiomas entiende el asistente?", a: "Alemán e inglés por defecto. Otros idiomas disponibles bajo petición." },
    { q: "¿Puedo personalizar el asistente?", a: "Sí – el tono, la personalidad y las integraciones están totalmente adaptados a tu empresa." },
    { q: "¿Qué tan seguros están mis datos?", a: "Todos los datos se procesan conforme al RGPD. Sin almacenamiento permanente de conversaciones." },
    { q: "¿Qué ocurre tras la cancelación?", a: "El uso termina inmediatamente. Sin tarifas ocultas ni períodos de permanencia." },
  ],
  fr: [
    { q: "Quelle est la rapidité de mise en place ?", a: "Votre assistant est généralement opérationnel en 3 à 5 jours ouvrés." },
    { q: "Ai-je besoin de compétences IT ?", a: "Non. Nous gérons la configuration technique complète. Vous recevez une solution prête à l'emploi." },
    { q: "Quelles langues l'assistant comprend-il ?", a: "Allemand et anglais par défaut. D'autres langues sont disponibles sur demande." },
    { q: "Puis-je personnaliser l'assistant ?", a: "Oui – le ton, la personnalité et les intégrations sont entièrement adaptés à votre entreprise." },
    { q: "Mes données sont-elles sécurisées ?", a: "Toutes les données sont traitées conformément au RGPD. Pas de stockage permanent des conversations." },
    { q: "Que se passe-t-il après la résiliation ?", a: "L'utilisation prend fin immédiatement. Aucun frais caché ni période d'engagement." },
  ],
  it: [
    { q: "Quanto tempo richiede la configurazione?", a: "Il tuo assistente di solito è operativo entro 3–5 giorni lavorativi." },
    { q: "Ho bisogno di competenze IT?", a: "No. Ci occupiamo di tutta la configurazione tecnica. Ricevi una soluzione pronta all'uso." },
    { q: "Quali lingue capisce l'assistente?", a: "Tedesco e inglese di default. Altre lingue disponibili su richiesta." },
    { q: "Posso personalizzare l'assistente?", a: "Sì – tono, personalità e integrazioni sono completamente su misura per la tua azienda." },
    { q: "I miei dati sono al sicuro?", a: "Tutti i dati vengono trattati in conformità al GDPR. Nessuna memorizzazione permanente delle conversazioni." },
    { q: "Cosa succede dopo la disdetta?", a: "L'utilizzo termina immediatamente. Nessuna tariffa nascosta o vincolo." },
  ],
};

/* ─── Testimonials (statisch) ───────────────────────────────── */
const testimonials = [
  {
    name: "Thomas B.", role: "Inhaber · Café Central",
    text: "Die Tischreservierungen laufen jetzt komplett automatisch. Kein verpasster Anruf mehr, und die Gäste sind begeistert vom schnellen Feedback.",
    stars: 5, tag: "Gastronomie",
    avatarGrad: "linear-gradient(135deg, #D97706 0%, #92400E 100%)",
  },
  {
    name: "Petra W.", role: "Physiotherapeutin · Praxis am Park",
    text: "Die Terminverwaltung hat mich früher täglich eine Stunde gekostet. Heute läuft das vollautomatisch – ich bin begeistert, wie einfach das war.",
    stars: 5, tag: "Gesundheit",
    avatarGrad: "linear-gradient(135deg, #0D9488 0%, #065F46 100%)",
  },
  {
    name: "Markus L.", role: "Inhaber · Studio M. Hamburg",
    text: "Unsere Kunden buchen jetzt rund um die Uhr online. Keine Zettelwirtschaft mehr, keine verpassten Anfragen. Das Team kann sich endlich auf die Arbeit konzentrieren.",
    stars: 5, tag: "Beauty",
    avatarGrad: "linear-gradient(135deg, #7C3AED 0%, #2563EB 100%)",
  },
];

/* ─── Newsletter Form ───────────────────────────────────────── */
function NewsletterForm({ slang }: { slang: typeof sl["de"] }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  };

  if (status === "ok") {
    return (
      <motion.p
        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
        style={{ color: "#0EA5E9", fontSize: "14px", fontWeight: 500, padding: "10px 0" }}
      >
        {slang.nlSuccess}
      </motion.p>
    );
  }

  return (
    <form onSubmit={submit} style={{ display: "flex", gap: "8px", flexWrap: "wrap", justifyContent: "center", maxWidth: "420px" }}>
      <input
        type="email" value={email} onChange={e => setEmail(e.target.value)}
        placeholder={slang.nlPlaceholder} required
        style={{
          flex: 1, minWidth: "180px", padding: "11px 16px", borderRadius: "22px",
          border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.07)",
          color: "rgba(255,255,255,0.9)", fontSize: "14px", outline: "none",
          fontFamily: "inherit",
        }}
        onFocus={e => { e.target.style.borderColor = "#0EA5E9"; }}
        onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.15)"; }}
      />
      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
        style={{
          padding: "11px 22px", borderRadius: "22px",
          background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
          border: "none", color: "#FFFFFF", fontWeight: 600, fontSize: "14px",
          cursor: "pointer", fontFamily: "inherit",
          boxShadow: "0 4px 14px rgba(14,165,233,0.35)",
        }}
      >
        {status === "loading" ? "…" : slang.nlBtn}
      </motion.button>
    </form>
  );
}

const languages: { code: LangCode; flag: string; name: string }[] = [
  { code: "de", flag: "🇩🇪", name: "Deutsch" },
  { code: "en", flag: "🇬🇧", name: "English" },
  { code: "es", flag: "🇪🇸", name: "Español" },
  { code: "fr", flag: "🇫🇷", name: "Français" },
  { code: "it", flag: "🇮🇹", name: "Italiano" },
];

/* ─── Language Switcher ─────────────────────────────────────── */
function LangSwitcher({ lang, setLang }: { lang: LangCode; setLang: (l: LangCode) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = languages.find(l => l.code === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <motion.button
        onClick={() => setOpen(v => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{
          display: "flex", alignItems: "center", gap: "7px",
          background: open ? "rgba(14,165,233,0.08)" : "rgba(15,23,42,0.04)",
          border: `1px solid ${open ? "rgba(14,165,233,0.25)" : "rgba(15,23,42,0.08)"}`,
          borderRadius: "22px", padding: "7px 14px",
          cursor: "pointer", fontSize: "13px", fontWeight: 500,
          color: open ? "#0EA5E9" : "#475569",
          transition: "background 0.2s, border-color 0.2s, color 0.2s",
        }}
      >
        <span style={{ fontSize: "17px", lineHeight: 1 }}>{current.flag}</span>
        <span style={{ letterSpacing: "0.4px", fontSize: "13px" }}>{current.name}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.22, ease: appleEase }}
          style={{ fontSize: "9px", opacity: 0.55, marginTop: "1px" }}
        >▼</motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: appleEase }}
            style={{
              position: "absolute", top: "calc(100% + 10px)", right: 0,
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(15,23,42,0.08)",
              borderRadius: "16px", padding: "8px",
              boxShadow: "0 24px 60px rgba(0,0,0,0.13), 0 4px 16px rgba(0,0,0,0.06)",
              minWidth: "170px", zIndex: 2000,
            }}
          >
            {languages.map((l, i) => (
              <motion.button
                key={l.code}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.045, duration: 0.22, ease: appleEase }}
                onClick={() => { setLang(l.code); setOpen(false); }}
                whileHover={{ x: 4, background: "rgba(14,165,233,0.07)" }}
                style={{
                  display: "flex", alignItems: "center", gap: "11px",
                  width: "100%", padding: "10px 12px",
                  borderRadius: "10px", border: "none",
                  background: lang === l.code ? "rgba(14,165,233,0.09)" : "transparent",
                  cursor: "pointer", fontSize: "14px",
                  color: lang === l.code ? "#0EA5E9" : "#374151",
                  fontWeight: lang === l.code ? 600 : 400,
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "21px", lineHeight: 1 }}>{l.flag}</span>
                <span style={{ flex: 1 }}>{l.name}</span>
                <AnimatePresence>
                  {lang === l.code && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ color: "#0EA5E9", fontSize: "13px", fontWeight: 700 }}
                    >✓</motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── NIL Logo ──────────────────────────────────────────────── */
function FinalBrandingLogo({ width = 260, height = 100 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 300 100"
      fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      {/* N – three separate strokes for clean letterform */}
      <path d="M16 14V86 M16 14L84 86 M84 14V86" stroke="#08152A" strokeWidth="9"
        strokeLinecap="round" strokeLinejoin="round" />
      <motion.g
        animate={{ opacity: [1, 0.88, 1, 0.94, 1, 0.91, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 0.5, 0.65, 0.8, 1] }}
      >
        <line x1="150" y1="14" x2="150" y2="86" stroke="#38BDF8" strokeWidth="40"
          strokeLinecap="round" opacity="0.07" style={{ filter: "blur(14px)" }} />
        <line x1="150" y1="14" x2="150" y2="86" stroke="#0EA5E9" strokeWidth="22"
          strokeLinecap="round" opacity="0.22" style={{ filter: "blur(7px)" }} />
        <line x1="150" y1="14" x2="150" y2="86" stroke="#0EA5E9" strokeWidth="11"
          strokeLinecap="round" opacity="0.52" style={{ filter: "blur(2.5px)" }} />
        <line x1="150" y1="14" x2="150" y2="86" stroke="#BAE6FD" strokeWidth="5.5"
          strokeLinecap="round" style={{ filter: "drop-shadow(0 0 4px #0EA5E9) drop-shadow(0 0 10px #38BDF8)" }} />
        <line x1="150" y1="16" x2="150" y2="84" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
      {/* L – two separate strokes */}
      <path d="M216 14V86 M216 86H284" stroke="#08152A" strokeWidth="9"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Logo (white variant for dark backgrounds) ─────────────── */
function FinalBrandingLogoWhite({ width = 260, height = 100 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox="0 0 300 100"
      fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
      {/* N – three separate strokes */}
      <path d="M16 14V86 M16 14L84 86 M84 14V86" stroke="rgba(255,255,255,0.9)" strokeWidth="9"
        strokeLinecap="round" strokeLinejoin="round" />
      <motion.g
        animate={{ opacity: [1, 0.88, 1, 0.94, 1, 0.91, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.15, 0.3, 0.5, 0.65, 0.8, 1] }}
      >
        <line x1="150" y1="14" x2="150" y2="86" stroke="#38BDF8" strokeWidth="40"
          strokeLinecap="round" opacity="0.15" style={{ filter: "blur(14px)" }} />
        <line x1="150" y1="14" x2="150" y2="86" stroke="#0EA5E9" strokeWidth="22"
          strokeLinecap="round" opacity="0.4" style={{ filter: "blur(7px)" }} />
        <line x1="150" y1="14" x2="150" y2="86" stroke="#0EA5E9" strokeWidth="11"
          strokeLinecap="round" opacity="0.7" style={{ filter: "blur(2.5px)" }} />
        <line x1="150" y1="14" x2="150" y2="86" stroke="#BAE6FD" strokeWidth="5.5"
          strokeLinecap="round" style={{ filter: "drop-shadow(0 0 6px #0EA5E9) drop-shadow(0 0 14px #38BDF8)" }} />
        <line x1="150" y1="16" x2="150" y2="84" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </motion.g>
      {/* L – two separate strokes */}
      <path d="M216 14V86 M216 86H284" stroke="rgba(255,255,255,0.9)" strokeWidth="9"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─── Hilfsfunktion: animierter Text ────────────────────────── */
function AnimText({ children, langKey, style }: { children: React.ReactNode; langKey: string; style?: React.CSSProperties }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={langKey}
        initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
        transition={{ duration: 0.28, ease: appleEase }}
        style={{ display: "block", ...style }}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}

/* ─── Demo Chat Widget ──────────────────────────────────────── */
type ChatMessage = { role: "user" | "bot"; content: string };

function DemoChat({ t }: { t: typeof translations["de"] }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", content: t.demo.greeting },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  /* auto-scroll to bottom on new message */
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
  }, [messages, loading]);

  /* prevent chat from blocking page scroll on desktop + mobile */
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    let startY = 0;

    const onWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const cantScroll = scrollHeight <= clientHeight;
      const atTop    = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
      if (cantScroll || atTop || atBottom) return; // let page scroll
      e.stopPropagation();
    };
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const dy = startY - e.touches[0].clientY; // + = finger moving up = scroll down
      const cantScroll = scrollHeight <= clientHeight;
      const atTop    = scrollTop <= 0 && dy < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && dy > 0;
      if (cantScroll || atTop || atBottom) return;
      e.stopPropagation();
    };

    el.addEventListener("wheel",       onWheel,       { passive: true });
    el.addEventListener("touchstart",  onTouchStart,  { passive: true });
    el.addEventListener("touchmove",   onTouchMove,   { passive: true });
    return () => {
      el.removeEventListener("wheel",       onWheel);
      el.removeEventListener("touchstart",  onTouchStart);
      el.removeEventListener("touchmove",   onTouchMove);
    };
  }, []);

  const send = async () => {
    if (!input.trim() || loading) return;
    const text = input.trim();
    setInput("");
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const history = messages.map(m => ({
        role: m.role === "bot" ? "assistant" : "user",
        content: m.content,
      }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", content: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", content: "Verbindungsfehler. Bitte erneut versuchen. ✂️" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 44, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.05, ease: appleEase, delay: 0.3 }}
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        borderRadius: "28px",
        overflow: "hidden",
        boxShadow: "0 48px 110px rgba(8,21,42,0.24), 0 16px 40px rgba(8,21,42,0.12)",
        border: "1px solid rgba(8,21,42,0.14)",
      }}
    >
      {/* ── Header ── */}
      <div style={{
        background: "linear-gradient(135deg, #060E1E 0%, #0D1F3C 100%)",
        padding: "18px 22px",
        display: "flex", alignItems: "center", gap: "14px",
      }}>
        <FinalBrandingLogoWhite width={64} height={24} />
        <div style={{ flex: 1 }}>
          <div style={{ color: "rgba(255,255,255,0.92)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.2px" }}>
            Salon-Assistent
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "3px" }}>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.55, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E",
                boxShadow: "0 0 6px rgba(34,197,94,0.7)" }}
            />
            <span style={{ color: "#64748B", fontSize: "11px", letterSpacing: "0.3px" }}>Online</span>
          </div>
        </div>
        <span style={{ fontSize: "22px", opacity: 0.65 }}>✂️</span>
      </div>

      {/* ── Messages ── */}
      <div ref={messagesContainerRef}
        style={{
          background: "#F1F5F9",
          height: "330px",
          maxHeight: "330px",
          overflowY: "auto",
          overscrollBehavior: "contain",
          padding: "18px 16px 12px",
          display: "flex", flexDirection: "column", gap: "10px",
          scrollbarWidth: "none",
          pointerEvents: "none",   /* let scroll events fall through to page */
        }}>
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.32, ease: appleEase }}
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              }}
            >
              {msg.role === "bot" && (
                <div style={{
                  width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                  background: "linear-gradient(135deg, #060E1E, #0D1F3C)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginRight: "8px", marginTop: "2px", fontSize: "12px",
                }}>✂️</div>
              )}
              <div style={{
                maxWidth: "75%",
                padding: "11px 15px",
                borderRadius: msg.role === "user"
                  ? "18px 18px 4px 18px"
                  : "18px 18px 18px 4px",
                background: msg.role === "user"
                  ? "linear-gradient(135deg, #0D1F3C 0%, #08152A 100%)"
                  : "#FFFFFF",
                border: msg.role === "bot" ? "1px solid rgba(15,23,42,0.07)" : "none",
                boxShadow: msg.role === "user"
                  ? "0 4px 14px rgba(8,21,42,0.28)"
                  : "0 2px 8px rgba(0,0,0,0.06)",
                color: msg.role === "user" ? "#FFFFFF" : "#0F172A",
                fontSize: "14px", lineHeight: 1.55,
              }}>
                {msg.content}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end" }}
            >
              <div style={{
                width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #060E1E, #0D1F3C)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginRight: "8px", fontSize: "12px",
              }}>✂️</div>
              <div style={{
                background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.07)",
                borderRadius: "18px 18px 18px 4px",
                padding: "13px 18px",
                display: "flex", alignItems: "center", gap: "5px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              }}>
                {[0, 1, 2].map(d => (
                  <motion.div
                    key={d}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: d * 0.18, ease: "easeInOut" }}
                    style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#94A3B8" }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Input ── */}
      <div style={{
        background: "#FFFFFF",
        borderTop: "1px solid rgba(15,23,42,0.07)",
        padding: "14px 16px",
        display: "flex", gap: "10px", alignItems: "center",
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder={t.demo.placeholder}
          disabled={loading}
          style={{
            flex: 1, border: "1.5px solid rgba(15,23,42,0.1)", borderRadius: "22px",
            padding: "10px 18px", fontSize: "14px", outline: "none",
            background: "#F8FAFC", color: "#0F172A",
            transition: "border-color 0.2s, box-shadow 0.2s",
            fontFamily: "inherit",
          }}
          onFocus={e => {
            e.target.style.borderColor = "rgba(14,165,233,0.5)";
            e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)";
          }}
          onBlur={e => {
            e.target.style.borderColor = "rgba(15,23,42,0.1)";
            e.target.style.boxShadow = "none";
          }}
        />
        <motion.button
          onClick={send}
          disabled={!input.trim() || loading}
          whileHover={input.trim() && !loading ? { scale: 1.08 } : {}}
          whileTap={input.trim() && !loading ? { scale: 0.93 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{
            width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
            background: input.trim() && !loading
              ? "linear-gradient(135deg, #0EA5E9, #0284C7)"
              : "#E2E8F0",
            border: "none",
            cursor: input.trim() && !loading ? "pointer" : "default",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.22s",
            boxShadow: input.trim() && !loading ? "0 4px 14px rgba(14,165,233,0.4)" : "none",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M16 9H2M9 2l7 7-7 7"
              stroke={input.trim() && !loading ? "#FFFFFF" : "#94A3B8"}
              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}

/* ─── Contact Form ──────────────────────────────────────────── */
function ContactForm({ lang }: { lang: LangCode }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const labels = {
    de: { name: "Name", email: "E-Mail", message: "Nachricht", send: "Nachricht senden", success: "Nachricht gesendet! Wir melden uns bald. ✨", error: "Fehler beim Senden. Bitte versuche es erneut.", placeholder_name: "Dein Name", placeholder_email: "deine@email.de", placeholder_msg: "Wie können wir dir helfen?" },
    en: { name: "Name", email: "Email", message: "Message", send: "Send message", success: "Message sent! We'll be in touch soon. ✨", error: "Error sending. Please try again.", placeholder_name: "Your name", placeholder_email: "your@email.com", placeholder_msg: "How can we help you?" },
    es: { name: "Nombre", email: "Correo", message: "Mensaje", send: "Enviar mensaje", success: "¡Mensaje enviado! Nos pondremos en contacto pronto. ✨", error: "Error al enviar. Por favor, inténtalo de nuevo.", placeholder_name: "Tu nombre", placeholder_email: "tu@email.com", placeholder_msg: "¿Cómo podemos ayudarte?" },
    fr: { name: "Nom", email: "E-mail", message: "Message", send: "Envoyer le message", success: "Message envoyé ! Nous vous contacterons bientôt. ✨", error: "Erreur lors de l'envoi. Veuillez réessayer.", placeholder_name: "Votre nom", placeholder_email: "votre@email.fr", placeholder_msg: "Comment pouvons-nous vous aider ?" },
    it: { name: "Nome", email: "E-mail", message: "Messaggio", send: "Invia messaggio", success: "Messaggio inviato! Ti contatteremo presto. ✨", error: "Errore nell'invio. Per favore riprova.", placeholder_name: "Il tuo nome", placeholder_email: "tua@email.it", placeholder_msg: "Come possiamo aiutarti?" },
  };
  const l = labels[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: "12px",
    border: "1.5px solid rgba(15,23,42,0.1)", fontSize: "14px",
    background: "#FFFFFF", color: "#0F172A", outline: "none",
    fontFamily: "inherit", boxSizing: "border-box",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748B", letterSpacing: "1px", marginBottom: "6px" }}>{l.name.toUpperCase()}</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder={l.placeholder_name} required
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
            onBlur={e => { e.target.style.borderColor = "rgba(15,23,42,0.1)"; e.target.style.boxShadow = "none"; }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748B", letterSpacing: "1px", marginBottom: "6px" }}>{l.email.toUpperCase()}</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={l.placeholder_email} required
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
            onBlur={e => { e.target.style.borderColor = "rgba(15,23,42,0.1)"; e.target.style.boxShadow = "none"; }}
          />
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#64748B", letterSpacing: "1px", marginBottom: "6px" }}>{l.message.toUpperCase()}</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder={l.placeholder_msg} required rows={4}
          style={{ ...inputStyle, resize: "vertical", minHeight: "110px" }}
          onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
          onBlur={e => { e.target.style.borderColor = "rgba(15,23,42,0.1)"; e.target.style.boxShadow = "none"; }}
        />
      </div>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.p key="success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ color: "#22C55E", fontSize: "14px", fontWeight: 500, textAlign: "center", padding: "12px" }}>
            {l.success}
          </motion.p>
        ) : status === "error" ? (
          <motion.p key="error" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ color: "#EF4444", fontSize: "14px", textAlign: "center", padding: "12px" }}>
            {l.error}
          </motion.p>
        ) : (
          <motion.button key="btn" type="submit" disabled={status === "sending"}
            whileHover={{ scale: 1.02, boxShadow: "0 12px 30px rgba(15,23,42,0.2)" }}
            whileTap={{ scale: 0.98 }}
            style={{
              background: status === "sending" ? "#94A3B8" : "#0F172A",
              color: "#FFFFFF", border: "none", borderRadius: "12px",
              padding: "14px 32px", fontSize: "14px", fontWeight: 500,
              cursor: status === "sending" ? "default" : "pointer",
              transition: "background 0.2s", fontFamily: "inherit",
              boxShadow: "0 6px 20px rgba(15,23,42,0.12)",
            }}>
            {status === "sending" ? "..." : l.send}
          </motion.button>
        )}
      </AnimatePresence>
    </form>
  );
}

/* ─── FAQ Accordion ─────────────────────────────────────────── */
function FAQList({ items, isDark }: { items: { q: string; a: string }[]; isDark: boolean }) {
  const [open, setOpen] = useState<number | null>(null);
  const border = isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.08)";
  const card   = isDark ? "#0d1f3c" : "#FFFFFF";
  const text   = isDark ? "#F1F5F9" : "#0F172A";
  const text2  = isDark ? "#94A3B8" : "#475569";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {items.map((item, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.16,1,0.3,1], delay: i * 0.07 }}
          style={{
            background: card, border: `1px solid ${border}`,
            borderRadius: "16px", overflow: "hidden",
            boxShadow: open === i ? "0 8px 28px rgba(14,165,233,0.1)" : "0 2px 10px rgba(0,0,0,0.04)",
            transition: "box-shadow 0.25s, background 0.3s",
          }}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              width: "100%", padding: "20px 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px",
              background: "none", border: "none", cursor: "pointer",
              textAlign: "left", fontFamily: "inherit",
            }}
          >
            <span style={{ fontWeight: 600, fontSize: "15px", color: text, flex: 1 }}>{item.q}</span>
            <motion.span
              animate={{ rotate: open === i ? 45 : 0 }}
              transition={{ duration: 0.22, ease: [0.16,1,0.3,1] }}
              style={{ color: "#0EA5E9", fontSize: "22px", lineHeight: 1, flexShrink: 0, fontWeight: 300 }}
            >+</motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                key="body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16,1,0.3,1] }}
                style={{ overflow: "hidden" }}
              >
                <p style={{ padding: "0 24px 20px", color: text2, fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                  {item.a}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────── */
export default function Home() {
  const [lang, setLang] = useState<LangCode>("de");
  const t = translations[lang];
  const s = sl[lang];
  const heroRef = useRef<HTMLElement>(null);

  /* ── Mobile menu ── */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(1200);
  useEffect(() => {
    const handler = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  const isMobile = windowWidth < 860;

  /* ── Dark Mode ── */
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("nil-dark") === "true") setIsDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("nil-dark", String(isDark));
    document.documentElement.setAttribute("data-dark", String(isDark));
  }, [isDark]);

  /* ── Rotating tagline ── */
  const [taglineIndex, setTaglineIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTaglineIndex(i => (i + 1) % 3), 3400);
    return () => clearInterval(timer);
  }, []);

  /* ── Testimonials slideshow ── */
  const [tstIndex, setTstIndex] = useState(0);
  const [tstDir, setTstDir] = useState(1);
  useEffect(() => {
    const timer = setInterval(() => {
      setTstDir(1);
      setTstIndex(i => (i + 1) % testimonials.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);
  const prevTst = () => { setTstDir(-1); setTstIndex(i => (i - 1 + testimonials.length) % testimonials.length); };
  const nextTst = () => { setTstDir(1);  setTstIndex(i => (i + 1) % testimonials.length); };

  /* ── Theme color map ── */
  const c = {
    bg:          isDark ? "#07101e" : "#EEF2F7",
    card:        isDark ? "#0d1f3c" : "#FFFFFF",
    card2:       isDark ? "#091520" : "#F4F7FB",
    card3:       isDark ? "#0a1728" : "#EAF0F8",
    text:        isDark ? "#F1F5F9" : "#0F172A",
    text2:       isDark ? "#94A3B8" : "#475569",
    text3:       isDark ? "#64748B" : "#64748B",
    border:      isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.07)",
    border2:     isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)",
    nav:         isDark ? "rgba(7,16,30,0.92)" : "rgba(248,250,252,0.78)",
    navBorder:   isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.06)",
    heroGrad:    isDark
      ? "radial-gradient(ellipse at 50% 30%, #0d2444 0%, #0a1830 60%, #07101e 100%)"
      : "radial-gradient(ellipse at 50% 30%, #DCEEFF 0%, #E8F2FF 40%, #EEF2F7 100%)",
    sec1:        isDark ? "#07101e" : "linear-gradient(to bottom, #EEF2F7 0%, #F0F5FB 60%, #F4F7FB 100%)",
    sec2:        isDark ? "#07101e" : "#F4F7FB",
    demoBg:      isDark ? "#07101e" : "linear-gradient(to bottom, #EEF2F7 0%, #E8F0F9 60%, #E2EBF5 100%)",
    contactBg:   isDark ? "#07101e" : "linear-gradient(to bottom, #E2EBF5 0%, #EAF0F8 60px, #EEF2F7 100%)",
    chatBg:      isDark ? "#111f35" : "#F1F5F9",
    inputBg:     isDark ? "#0a1628" : "#F8FAFC",
    inputBorder: isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.1)",
  };

  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const rawLaptopY  = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const rawDevicesY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const laptopY  = useSpring(rawLaptopY,  { stiffness: 80, damping: 25 });
  const devicesY = useSpring(rawDevicesY, { stiffness: 80, damping: 25 });

  return (
    <main style={{
      background: c.bg, color: c.text,
      fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      minHeight: "100vh", overflowX: "hidden", position: "relative",
      transition: "background 0.3s ease, color 0.3s ease",
    }}>

      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.85, ease: appleEase, delay: 0.1 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, height: "68px",
          backgroundColor: c.nav,
          backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
          borderBottom: `1px solid ${c.navBorder}`,
          display: "flex", alignItems: "center", padding: "0 40px", zIndex: 1000,
          transition: "background-color 0.3s ease",
        }}
      >
        <div style={{ maxWidth: "1150px", width: "100%", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {isDark
            ? <FinalBrandingLogoWhite width={112} height={40} />
            : <FinalBrandingLogo width={112} height={40} />
          }

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {/* ── DESKTOP NAV ── */}
            {!isMobile && <>
              <div style={{ display: "flex", gap: "28px", fontSize: "13px", color: c.text2, fontWeight: 500, letterSpacing: "0.3px" }}>
                {([
                  { href: "#vorteile", label: t.nav.advantages },
                  { href: "#services", label: t.nav.services },
                  { href: "#demo",     label: t.nav.demo },
                  { href: "#kontakt",  label: t.nav.contact  },
                ] as { href: string; label: string }[]).map(({ href, label }, i) => (
                  <motion.a key={href} href={href}
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: appleEase, delay: 0.35 + i * 0.07 }}
                    whileHover={{ color: "#0EA5E9" }}
                    style={{ color: "inherit", textDecoration: "none", transition: "color 0.2s" }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span key={`${lang}-nav-${i}`}
                        initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.2 }}
                      >{label}</motion.span>
                    </AnimatePresence>
                  </motion.a>
                ))}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {[
                  { href: "https://instagram.com", label: "Instagram", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
                  { href: "https://linkedin.com/company/nilogik", label: "LinkedIn", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                  { href: "https://youtube.com/@nilogik", label: "YouTube", svg: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg> },
                ].map(({ href, label, svg }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    whileHover={{ scale: 1.18, color: "#0EA5E9" }}
                    style={{ color: c.text3, display: "flex", alignItems: "center" }}
                  >{svg}</motion.a>
                ))}
              </div>
              <motion.button onClick={() => setIsDark(v => !v)}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                aria-label="Dark/Light Mode"
                style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.05)", border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.1)"}`, borderRadius: "50%", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "15px", transition: "background 0.2s" }}
              >{isDark ? "☀️" : "🌙"}</motion.button>
              <LangSwitcher lang={lang} setLang={setLang} />
            </>}

            {/* ── MOBILE: Dark Toggle + Hamburger ── */}
            {isMobile && <>
              <motion.button onClick={() => setIsDark(v => !v)}
                whileTap={{ scale: 0.9 }}
                aria-label="Dark/Light Mode"
                style={{ background: "none", border: "none", fontSize: "18px", cursor: "pointer", padding: "4px", display: "flex", alignItems: "center" }}
              >{isDark ? "☀️" : "🌙"}</motion.button>

              <motion.button
                onClick={() => setMobileMenuOpen(v => !v)}
                whileTap={{ scale: 0.92 }}
                aria-label="Menü"
                style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.06)", border: `1px solid ${c.border}`, borderRadius: "10px", width: "40px", height: "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "5px", cursor: "pointer", padding: "0" }}
              >
                {[0,1,2].map(i => (
                  <motion.span key={i}
                    animate={mobileMenuOpen ? (i === 1 ? { opacity: 0, scaleX: 0 } : i === 0 ? { rotate: 45, y: 10 } : { rotate: -45, y: -10 }) : { rotate: 0, y: 0, opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.25 }}
                    style={{ display: "block", width: "18px", height: "2px", background: c.text, borderRadius: "2px", transformOrigin: "center" }}
                  />
                ))}
              </motion.button>
            </>}
          </div>
        </div>
      </motion.nav>

      {/* ── MOBILE MENU ── */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: appleEase }}
            style={{
              position: "fixed", top: "68px", left: 0, right: 0, zIndex: 999,
              background: isDark ? "rgba(7,16,30,0.98)" : "rgba(248,250,252,0.98)",
              backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
              borderBottom: `1px solid ${c.navBorder}`,
              padding: "20px 24px 28px",
            }}
          >
            {/* Nav Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginBottom: "20px" }}>
              {([
                { href: "#vorteile", label: t.nav.advantages },
                { href: "#services", label: t.nav.services },
                { href: "#demo",     label: t.nav.demo },
                { href: "#kontakt",  label: t.nav.contact },
                { href: "/preise",   label: "Preise" },
                { href: "/ueber-uns", label: "Über uns" },
              ] as { href: string; label: string }[]).map(({ href, label }, i) => (
                <motion.a key={href} href={href}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.22 }}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{ display: "block", padding: "12px 4px", fontSize: "17px", fontWeight: 500, color: c.text, textDecoration: "none", borderBottom: `1px solid ${c.border}` }}
                >
                  {label}
                </motion.a>
              ))}
            </div>

            {/* Trust badge */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "20px", padding: "12px 0", borderTop: `1px solid ${c.border}`, borderBottom: `1px solid ${c.border}`, flexWrap: "wrap" }}>
              {[
                { icon: "✓", text: "Kostenlose Erstberatung", color: "#22C55E" },
                { icon: "⚡", text: "Live in 48h", color: "#0EA5E9" },
              ].map(({ icon, text, color }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ color, fontSize: "13px", fontWeight: 700 }}>{icon}</span>
                  <span style={{ color: c.text2, fontSize: "13px", fontWeight: 500 }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Social + LangSwitcher */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ display: "flex", gap: "16px" }}>
                {[
                  { href: "https://instagram.com", label: "Instagram", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
                  { href: "https://linkedin.com/company/nilogik", label: "LinkedIn", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                  { href: "https://youtube.com/@nilogik", label: "YouTube", svg: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg> },
                ].map(({ href, label, svg }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    style={{ color: c.text2, display: "flex", alignItems: "center" }}>
                    {svg}
                  </a>
                ))}
              </div>
              <LangSwitcher lang={lang} setLang={setLang} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{
        position: "relative",
        minHeight: "100svh",
        height: isMobile ? "auto" : "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: isMobile ? "80px 24px 20px" : "68px 20px 0",
        boxSizing: "border-box",
        overflow: "hidden",
        background: c.heroGrad,
        transition: "background 0.4s ease",
      }}>

        {/* Laptop – AI Chat Interface Mockup */}
        <div style={{ position: "absolute", left: "2%", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", display: isMobile ? "none" : "block" }}>
          <motion.div style={{ y: laptopY, width: "310px", opacity: 0 }}
            initial={{ opacity: 0, x: -60 }} animate={{ opacity: 0.28, x: 0 }}
            transition={{ duration: 1.2, ease: appleEase, delay: 0.6 }}>
            <motion.div animate={{ y: [0, -8, 0], rotate: [-0.3, 0.3, -0.3] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
              <svg viewBox="0 0 310 218" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Laptop screen body */}
                <rect x="2" y="2" width="306" height="192" rx="10" stroke="#0D1B2E" strokeWidth="2" fill="#0D1B2E"/>
                <circle cx="155" cy="9" r="2.5" fill="#475569"/>
                {/* Screen area */}
                <rect x="10" y="16" width="290" height="172" rx="4" fill="#F1F5F9"/>
                {/* Browser chrome */}
                <rect x="10" y="16" width="290" height="22" rx="4" fill="#E2E8F0"/>
                {/* Traffic lights */}
                <circle cx="24" cy="27" r="4" fill="#FC5858"/>
                <circle cx="36" cy="27" r="4" fill="#FBB040"/>
                <circle cx="48" cy="27" r="4" fill="#29C941"/>
                {/* URL bar */}
                <rect x="62" y="21" width="170" height="12" rx="6" fill="#F8FAFC"/>
                <circle cx="71" cy="27" r="3" fill="#94A3B8"/>
                <rect x="78" y="25" width="80" height="4" rx="2" fill="#94A3B8"/>
                {/* Chat sidebar */}
                <rect x="10" y="38" width="68" height="150" fill="#E8EDF4"/>
                {/* Sidebar items */}
                <rect x="16" y="46" width="56" height="8" rx="4" fill="#0EA5E9" opacity="0.8"/>
                <rect x="16" y="61" width="44" height="6" rx="3" fill="#CBD5E1"/>
                <rect x="16" y="73" width="50" height="6" rx="3" fill="#CBD5E1"/>
                <rect x="16" y="85" width="40" height="6" rx="3" fill="#CBD5E1"/>
                {/* Chat area header */}
                <rect x="78" y="38" width="222" height="20" fill="#FFFFFF"/>
                <circle cx="91" cy="48" r="6" fill="#0EA5E9" opacity="0.7"/>
                <rect x="102" y="44" width="60" height="5" rx="2.5" fill="#0D1B2E" opacity="0.7"/>
                <rect x="102" y="52" width="40" height="4" rx="2" fill="#22C55E"/>
                {/* Chat messages */}
                {/* Bot message 1 */}
                <rect x="84" y="66" width="120" height="18" rx="9" fill="#E2E8F0"/>
                <rect x="90" y="71" width="96" height="5" rx="2.5" fill="#64748B"/>
                <rect x="90" y="79" width="72" height="4" rx="2" fill="#94A3B8"/>
                {/* User message 1 */}
                <rect x="164" y="92" width="110" height="14" rx="7" fill="#0EA5E9" opacity="0.85"/>
                <rect x="170" y="97" width="78" height="4" rx="2" fill="white" opacity="0.9"/>
                {/* Bot message 2 */}
                <rect x="84" y="114" width="140" height="22" rx="9" fill="#E2E8F0"/>
                <rect x="90" y="119" width="112" height="4" rx="2" fill="#64748B"/>
                <rect x="90" y="127" width="88" height="4" rx="2" fill="#94A3B8"/>
                {/* User message 2 */}
                <rect x="204" y="144" width="70" height="14" rx="7" fill="#0EA5E9" opacity="0.85"/>
                <rect x="210" y="149" width="52" height="4" rx="2" fill="white" opacity="0.9"/>
                {/* Typing indicator */}
                <rect x="84" y="166" width="52" height="14" rx="7" fill="#E2E8F0"/>
                <circle cx="96" cy="173" r="2.5" fill="#94A3B8"/>
                <circle cx="104" cy="173" r="2.5" fill="#94A3B8"/>
                <circle cx="112" cy="173" r="2.5" fill="#94A3B8"/>
                {/* Input bar */}
                <rect x="78" y="183" width="222" height="17" fill="#FFFFFF"/>
                <rect x="84" y="187" width="170" height="9" rx="4.5" fill="#E2E8F0"/>
                <rect x="284" y="186" width="12" height="11" rx="5.5" fill="#0EA5E9" opacity="0.8"/>
                {/* Laptop base */}
                <path d="M0 195 L310 195 L302 216 L8 216 Z" fill="#CBD5E1"/>
                <rect x="120" y="200" width="70" height="8" rx="4" fill="#B0BEC5"/>
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Tablet – Analytics Dashboard + Smartphone – Booking UI */}
        <div style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", display: isMobile ? "none" : "block" }}>
          <motion.div style={{ y: devicesY, opacity: 0 }}
            initial={{ opacity: 0, x: 60 }} animate={{ opacity: 0.28, x: 0 }}
            transition={{ duration: 1.2, ease: appleEase, delay: 0.7 }}>
            <motion.div animate={{ y: [0, 10, 0], rotate: [0.4, -0.4, 0.4] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>

              {/* Tablet – Dashboard */}
              <div style={{ width: "150px" }}>
                <svg viewBox="0 0 160 226" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Body */}
                  <rect x="2" y="2" width="156" height="222" rx="16" stroke="#0D1B2E" strokeWidth="2" fill="#0D1B2E"/>
                  <circle cx="80" cy="12" r="3" fill="#475569"/>
                  {/* Screen */}
                  <rect x="8" y="22" width="144" height="188" rx="4" fill="#F1F5F9"/>
                  {/* Header bar */}
                  <rect x="8" y="22" width="144" height="26" fill="#0D1B2E" rx="4"/>
                  <rect x="14" y="29" width="40" height="6" rx="3" fill="#0EA5E9" opacity="0.9"/>
                  <circle cx="140" cy="32" r="5" fill="#0EA5E9" opacity="0.5"/>
                  {/* Stat cards row */}
                  <rect x="12" y="54" width="40" height="30" rx="6" fill="#FFFFFF"/>
                  <rect x="14" y="58" width="20" height="4" rx="2" fill="#94A3B8"/>
                  <rect x="14" y="66" width="30" height="7" rx="3" fill="#0EA5E9" opacity="0.85"/>
                  <rect x="58" y="54" width="40" height="30" rx="6" fill="#FFFFFF"/>
                  <rect x="60" y="58" width="16" height="4" rx="2" fill="#94A3B8"/>
                  <rect x="60" y="66" width="28" height="7" rx="3" fill="#22C55E" opacity="0.85"/>
                  <rect x="104" y="54" width="40" height="30" rx="6" fill="#FFFFFF"/>
                  <rect x="106" y="58" width="22" height="4" rx="2" fill="#94A3B8"/>
                  <rect x="106" y="66" width="26" height="7" rx="3" fill="#F59E0B" opacity="0.85"/>
                  {/* Chart area */}
                  <rect x="12" y="90" width="132" height="58" rx="6" fill="#FFFFFF"/>
                  <rect x="16" y="94" width="50" height="5" rx="2.5" fill="#0D1B2E" opacity="0.5"/>
                  {/* Bar chart */}
                  <rect x="18" y="128" width="12" height="14" rx="2" fill="#0EA5E9" opacity="0.6"/>
                  <rect x="34" y="120" width="12" height="22" rx="2" fill="#0EA5E9" opacity="0.7"/>
                  <rect x="50" y="114" width="12" height="28" rx="2" fill="#0EA5E9" opacity="0.8"/>
                  <rect x="66" y="118" width="12" height="24" rx="2" fill="#0EA5E9" opacity="0.7"/>
                  <rect x="82" y="108" width="12" height="34" rx="2" fill="#0EA5E9" opacity="0.9"/>
                  <rect x="98" y="112" width="12" height="30" rx="2" fill="#0EA5E9" opacity="0.8"/>
                  <rect x="114" y="104" width="12" height="38" rx="2" fill="#0EA5E9"/>
                  <rect x="130" y="110" width="10" height="32" rx="2" fill="#0EA5E9" opacity="0.75"/>
                  {/* Status rows */}
                  <rect x="12" y="154" width="132" height="14" rx="6" fill="#FFFFFF"/>
                  <circle cx="22" cy="161" r="4" fill="#22C55E"/>
                  <rect x="30" y="158" width="60" height="4" rx="2" fill="#0D1B2E" opacity="0.5"/>
                  <rect x="118" y="158" width="22" height="4" rx="2" fill="#22C55E" opacity="0.7"/>
                  <rect x="12" y="173" width="132" height="14" rx="6" fill="#FFFFFF"/>
                  <circle cx="22" cy="180" r="4" fill="#0EA5E9"/>
                  <rect x="30" y="177" width="48" height="4" rx="2" fill="#0D1B2E" opacity="0.5"/>
                  <rect x="118" y="177" width="22" height="4" rx="2" fill="#0EA5E9" opacity="0.7"/>
                  <rect x="12" y="192" width="132" height="14" rx="6" fill="#FFFFFF"/>
                  <circle cx="22" cy="199" r="4" fill="#F59E0B"/>
                  <rect x="30" y="196" width="54" height="4" rx="2" fill="#0D1B2E" opacity="0.5"/>
                  <rect x="118" y="196" width="22" height="4" rx="2" fill="#F59E0B" opacity="0.7"/>
                  {/* Home indicator */}
                  <rect x="60" y="214" width="40" height="4" rx="2" fill="#475569"/>
                </svg>
              </div>

              {/* Smartphone – Booking UI */}
              <div style={{ width: "90px", marginTop: "24px" }}>
                <svg viewBox="0 0 100 210" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Body */}
                  <rect x="2" y="2" width="96" height="206" rx="22" stroke="#0D1B2E" strokeWidth="2" fill="#0D1B2E"/>
                  <rect x="28" y="9" width="44" height="10" rx="5" fill="#1E2D42"/>
                  {/* Screen */}
                  <rect x="8" y="22" width="84" height="170" rx="6" fill="#F8FAFC"/>
                  {/* Status bar */}
                  <rect x="10" y="24" width="80" height="8" fill="#F8FAFC"/>
                  <rect x="12" y="26" width="20" height="4" rx="2" fill="#0D1B2E" opacity="0.3"/>
                  <rect x="72" y="26" width="14" height="4" rx="2" fill="#0D1B2E" opacity="0.3"/>
                  {/* Header */}
                  <rect x="8" y="32" width="84" height="18" fill="#0D1B2E"/>
                  <rect x="14" y="37" width="36" height="5" rx="2.5" fill="#0EA5E9" opacity="0.9"/>
                  {/* Month label */}
                  <rect x="20" y="56" width="30" height="5" rx="2.5" fill="#0D1B2E" opacity="0.5"/>
                  <rect x="70" y="56" width="10" height="5" rx="2.5" fill="#0D1B2E" opacity="0.3"/>
                  {/* Day headers */}
                  {[0,1,2,3,4,5,6].map(d => (
                    <rect key={d} x={12 + d*12} y="66" width="8" height="4" rx="2" fill="#94A3B8" opacity="0.6"/>
                  ))}
                  {/* Calendar grid */}
                  {[0,1,2,3,4].map(row =>
                    [0,1,2,3,4,5,6].map(col => (
                      <rect key={`${row}-${col}`} x={12 + col*12} y={76 + row*11} width="8" height="8" rx="2"
                        fill={row === 2 && col === 3 ? "#0EA5E9" : "#E2E8F0"} opacity={row === 2 && col === 3 ? 1 : 0.7}/>
                    ))
                  )}
                  {/* Time slots */}
                  <rect x="12" y="136" width="36" height="10" rx="5" fill="#0EA5E9" opacity="0.85"/>
                  <rect x="52" y="136" width="36" height="10" rx="5" fill="#E2E8F0"/>
                  <rect x="12" y="151" width="36" height="10" rx="5" fill="#E2E8F0"/>
                  <rect x="52" y="151" width="36" height="10" rx="5" fill="#E2E8F0"/>
                  {/* Book button */}
                  <rect x="14" y="168" width="72" height="18" rx="9" fill="#0D1B2E"/>
                  <rect x="28" y="173" width="44" height="5" rx="2.5" fill="#0EA5E9" opacity="0.9"/>
                  {/* Home bar */}
                  <rect x="32" y="197" width="36" height="4" rx="2" fill="#475569"/>
                  {/* Volume buttons */}
                  <rect x="0" y="62" width="3" height="16" rx="1.5" fill="#475569"/>
                  <rect x="0" y="84" width="3" height="16" rx="1.5" fill="#475569"/>
                  <rect x="97" y="68" width="3" height="24" rx="1.5" fill="#475569"/>
                </svg>
              </div>

            </motion.div>
          </motion.div>
        </div>

        {/* Hero Content */}
        <motion.div style={{ position: "relative", zIndex: 1, opacity: heroOpacity }}>

          {/* Logo */}
          <motion.div initial={{ opacity: 0, scale: 0.85, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: appleEase }}
            style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: isMobile ? "20px" : "32px", position: "relative" }}>
            <motion.div
              animate={{ opacity: [0.5, 0.9, 0.5], scale: [1, 1.12, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: "absolute", width: "70px", height: "180px",
                background: "radial-gradient(ellipse at center, rgba(14,165,233,0.28) 0%, rgba(56,189,248,0.10) 55%, transparent 80%)",
                borderRadius: "50%", filter: "blur(10px)", pointerEvents: "none" }} />
            {isDark
              ? <FinalBrandingLogoWhite width={260} height={95} />
              : <FinalBrandingLogo width={260} height={95} />
            }
          </motion.div>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.h1 key={`headline-${lang}`}
              exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.18 } }}
              style={{ fontSize: isMobile ? "clamp(28px, 8vw, 38px)" : "clamp(34px, 5vw, 52px)",
                color: c.text, marginBottom: "16px",
                fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1.1 }}>
              {t.hero.headline.split(" ").map((word, i) => (
                <motion.span key={i}
                  initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.8, ease: appleEase, delay: 0.15 + i * 0.09 }}
                  style={{ display: "inline-block", marginRight: "0.25em" }}>
                  {word}
                </motion.span>
              ))}
            </motion.h1>
          </AnimatePresence>

          {/* Rotating Tagline */}
          <div style={{ height: "52px", display: "flex", alignItems: "center", justifyContent: "center",
            maxWidth: "600px", margin: "0 auto 36px auto" }}>
            <AnimatePresence mode="wait">
              <motion.p
                key={`tagline-${lang}-${taglineIndex}`}
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.55, ease: appleEase }}
                style={{
                  fontSize: isMobile ? "14px" : "15.5px",
                  color: c.text2,
                  lineHeight: 1.6,
                  fontWeight: 400,
                  margin: 0,
                  textAlign: "center",
                }}
              >
                {rotatingTaglines[lang][taglineIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Tagline dots indicator */}
          <div style={{ display: "flex", gap: "6px", justifyContent: "center", marginBottom: "32px", marginTop: "-20px" }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i}
                animate={{ scale: i === taglineIndex ? 1 : 0.7, opacity: i === taglineIndex ? 1 : 0.35 }}
                transition={{ duration: 0.3, ease: appleEase }}
                style={{ width: i === taglineIndex ? "20px" : "6px", height: "6px",
                  borderRadius: "99px",
                  background: i === taglineIndex ? "#0EA5E9" : c.text2,
                  transition: "width 0.3s ease",
                }}
              />
            ))}
          </div>

          {/* CTA Buttons */}
          <motion.div initial={{ opacity: 0, scale: 0.88, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: appleEase, delay: 0.85 }}
            style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.a href="#kontakt"
              whileHover={{ scale: 1.05, boxShadow: "0 18px 44px rgba(14,165,233,0.35), 0 6px 20px rgba(15,23,42,0.2)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              style={{ display: "inline-block",
                background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
                color: "#FFFFFF",
                padding: "16px 40px", borderRadius: "9999px", fontWeight: 600, fontSize: "14px",
                textDecoration: "none", boxShadow: "0 10px 30px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
                letterSpacing: "0.2px" }}>
              <AnimatePresence mode="wait">
                <motion.span key={`cta-${lang}`}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                  {t.hero.cta}
                </motion.span>
              </AnimatePresence>
            </motion.a>

            {/* Calendly Termin-Button */}
            <motion.a
              href={(() => {
                const raw = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
                if (!raw) return "#kontakt";
                return raw.startsWith("http") ? raw : `https://${raw}`;
              })()}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 14px 36px rgba(14,165,233,0.32)", background: "rgba(14,165,233,0.08)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              style={{ display: "inline-flex", alignItems: "center", gap: "7px",
                background: "rgba(14,165,233,0.04)",
                border: "1.5px solid rgba(14,165,233,0.5)",
                color: "#0EA5E9",
                padding: "15px 32px", borderRadius: "9999px", fontWeight: 600, fontSize: "14px",
                textDecoration: "none",
                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                letterSpacing: "0.2px" }}>
              📅{" "}
              <AnimatePresence mode="wait">
                <motion.span key={`calendly-${lang}`}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                  {s.calendly}
                </motion.span>
              </AnimatePresence>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator – modern animated arrow */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.0, duration: 0.8, ease: appleEase }}
            style={{ position: "absolute", bottom: "32px", left: 0, right: 0,
              display: "flex", flexDirection: "column", alignItems: "center", gap: "0px", pointerEvents: "none" }}
          >
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
            >
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="17" stroke="rgba(14,165,233,0.22)" strokeWidth="1.5"/>
                <path d="M12 15.5L18 21.5L24 15.5"
                  stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  style={{ filter: "drop-shadow(0 0 5px rgba(14,165,233,0.6))" }}
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* ── SOCIAL PROOF BAR ── */}
      <div style={{
        background: isDark ? "#0a1628" : "#E2ECF8",
        borderTop: `1px solid ${c.border}`,
        borderBottom: `1px solid ${c.border}`,
        padding: "14px 24px",
      }}>
        <div style={{ maxWidth: "1050px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ color: "#FBBF24", fontSize: "13px", letterSpacing: "2px" }}>★★★★★</span>
          <span style={{ color: c.text2, fontSize: "13px", fontWeight: 600 }}>5.0</span>
          <span style={{ color: isDark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.2)", fontSize: "18px", lineHeight: 1, fontWeight: 300 }}>·</span>
          <span style={{ color: c.text2, fontSize: "13px" }}>Bereits <strong style={{ color: c.text, fontWeight: 700 }}>20+</strong> Betriebe automatisiert</span>
          <span style={{ color: isDark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.2)", fontSize: "18px", lineHeight: 1, fontWeight: 300 }}>·</span>
          <span style={{ color: "#0EA5E9", fontSize: "13px", fontWeight: 600 }}>⚡ Einrichtung in 48h</span>
        </div>
      </div>

      {/* ── SHOWCASE ── */}
      <section id="vorteile" style={{ padding: "120px 20px",
        background: c.sec1,
        transition: "background 0.3s ease" }}>
        <div style={{ maxWidth: "1050px", margin: "0 auto" }}>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
            style={{ textAlign: "center", marginBottom: "80px" }}>
            <motion.p variants={{ hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: appleEase } } }}
              style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "12px" }}>
              <AnimText langKey={`label-${lang}`}>{t.showcase.label}</AnimText>
            </motion.p>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: appleEase } } }}
              style={{ fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 700, letterSpacing: "-0.04em", color: c.text }}>
              <AnimText langKey={`sh2-${lang}`}>{t.showcase.headline}</AnimText>
            </motion.h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px", alignItems: "center" }}>
            <motion.div initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: appleEase, delay: 0.1 }}>
              <h3 style={{ fontSize: "24px", marginBottom: "18px", fontWeight: 600, letterSpacing: "-0.02em" }}>
                <AnimText langKey={`sh3-${lang}`}>{t.showcase.h3}</AnimText>
              </h3>
              <p style={{ color: c.text2, fontSize: "16px", lineHeight: 1.65, marginBottom: "32px" }}>
                <AnimText langKey={`stext-${lang}`}>{t.showcase.text}</AnimText>
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: appleEase, delay: 0.2 }}
              style={{ background: c.card, border: `1px solid ${c.border}`,
                borderRadius: "24px", padding: "32px", boxShadow: "0 20px 60px rgba(15,23,42,0.06)",
                transition: "background 0.3s ease" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px",
                paddingBottom: "14px", borderBottom: `1px solid ${c.border}` }}>
                <motion.div animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#0EA5E9" }} />
                <AnimatePresence mode="wait">
                  <motion.span key={`chatLabel-${lang}`}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: "11px", color: "#64748B", fontWeight: 600, letterSpacing: "0.8px" }}>
                    {t.showcase.chatLabel}
                  </motion.span>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={`chat1-${lang}`}
                  initial={{ opacity: 0, x: -16, y: 8 }} animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.5, ease: appleEase, delay: 0.3 }}
                  style={{ background: "#EDF2F7", padding: "14px 18px", borderRadius: "14px", marginBottom: "14px", maxWidth: "85%" }}>
                  <p style={{ color: "#1A202C", fontSize: "14px", margin: 0, lineHeight: 1.4 }}>{t.showcase.chat1}</p>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div key={`chat2-${lang}`}
                  initial={{ opacity: 0, x: 16, y: 8 }} animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  transition={{ duration: 0.5, ease: appleEase, delay: 0.55 }}
                  style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.15)",
                    padding: "14px 18px", borderRadius: "14px", maxWidth: "85%", marginLeft: "auto" }}>
                  <p style={{ color: "#0369A1", fontSize: "14px", margin: 0, lineHeight: 1.4 }}>{t.showcase.chat2}</p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: "100px 20px", background: c.sec2, transition: "background 0.3s ease" }}>
        <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            style={{ textAlign: "center", marginBottom: "70px" }}>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: appleEase } } }}
              style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "12px" }}>
              <AnimText langKey={`srv-label-${lang}`}>{s.srvLabel}</AnimText>
            </motion.p>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 24, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: appleEase } } }}
              style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, letterSpacing: "-0.04em", color: c.text }}>
              <AnimText langKey={`srv-hl-${lang}`}>{s.srvHl}</AnimText>
            </motion.h2>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {serviceCards.map((card, i) => (
              <motion.div key={card.title}
                initial={{ opacity: 0, y: 32, scale: 0.97 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: appleEase, delay: i * 0.12 }}
                whileHover={{ y: -6, boxShadow: "0 24px 60px rgba(14,165,233,0.12)" }}
                style={{
                  background: c.card, border: `1px solid ${c.border}`,
                  borderRadius: "24px", padding: "36px 30px",
                  boxShadow: "0 4px 20px rgba(15,23,42,0.05)",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease, background 0.3s ease",
                }}>
                <div style={{ marginBottom: "18px", display: "flex", alignItems: "center", justifyContent: "flex-start" }}>{card.icon}</div>
                <h3 style={{ fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em", color: c.text, marginBottom: "12px" }}>
                  {card.title}
                </h3>
                <p style={{ color: c.text2, fontSize: "15px", lineHeight: 1.65 }}>
                  {card.text[lang] ?? card.text["de"]}
                </p>
                <div style={{ marginTop: "24px" }}>
                  <motion.a href="#kontakt"
                    whileHover={{ color: "#0EA5E9" }}
                    style={{ color: "#0EA5E9", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <AnimText langKey={`srv-cta-${lang}`}>{s.calendly}</AnimText> →
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "100px 20px", background: isDark ? "#07101e" : "linear-gradient(to bottom,#F4F7FB 0%,#EEF2F7 100%)", transition: "background 0.3s ease" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            style={{ textAlign: "center", marginBottom: "64px" }}>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: appleEase } } }}
              style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "12px" }}>
              <AnimText langKey={`faq-label-${lang}`}>{s.faqLabel}</AnimText>
            </motion.p>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 24, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: appleEase } } }}
              style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, letterSpacing: "-0.04em", color: c.text }}>
              <AnimText langKey={`faq-hl-${lang}`}>{s.faqHl}</AnimText>
            </motion.h2>
          </motion.div>

          <FAQList items={faqItems[lang] ?? faqItems["de"]} isDark={isDark} />
        </div>
      </section>

      {/* ── DEMO ── */}
      <section id="demo" style={{
        padding: "120px 20px",
        background: c.demoBg,
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>

          {/* Section Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
            style={{ textAlign: "center", marginBottom: "64px" }}>

            <motion.p variants={{ hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: appleEase } } }}
              style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "12px" }}>
              <AnimText langKey={`demo-label-${lang}`}>{t.demo.label}</AnimText>
            </motion.p>

            <motion.h2 variants={{ hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: appleEase } } }}
              style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, letterSpacing: "-0.04em",
                color: c.text, marginBottom: "18px", margin: "0 0 18px 0" }}>
              <AnimText langKey={`demo-h2-${lang}`}>{t.demo.headline}</AnimText>
            </motion.h2>

            <motion.p variants={{ hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: appleEase } } }}
              style={{ color: c.text2, fontSize: "16px", lineHeight: 1.65,
                maxWidth: "480px", margin: "0 auto" }}>
              <AnimText langKey={`demo-sub-${lang}`}>{t.demo.subtext}</AnimText>
            </motion.p>
          </motion.div>

          {/* Chat Widget */}
          <DemoChat t={t} />
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ padding: "100px 20px", background: isDark ? "#07101e" : "linear-gradient(to bottom,#E2EBF5 0%,#E8F0F8 100%)", transition: "background 0.3s ease" }}>
        <div style={{ maxWidth: "1050px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            style={{ textAlign: "center", marginBottom: "36px" }}>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: appleEase } } }}
              style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 600, letterSpacing: "2px", marginBottom: "12px" }}>
              <AnimText langKey={`tst-label-${lang}`}>{s.tstLabel}</AnimText>
            </motion.p>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 24, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: appleEase } } }}
              style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 700, letterSpacing: "-0.04em", color: c.text }}>
              <AnimText langKey={`tst-hl-${lang}`}>{s.tstHl}</AnimText>
            </motion.h2>
          </motion.div>

          {/* Slideshow */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <AnimatePresence mode="wait" custom={tstDir}>
              <motion.div
                key={tstIndex}
                custom={tstDir}
                variants={{
                  enter:  (d: number) => ({ x: d * 120, opacity: 0, filter: "blur(6px)" }),
                  center: { x: 0, opacity: 1, filter: "blur(0px)" },
                  exit:   (d: number) => ({ x: d * -120, opacity: 0, filter: "blur(4px)" }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.52, ease: appleEase }}
                style={{
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
                  gap: "24px",
                }}
              >
                {[tstIndex, (tstIndex + 1) % testimonials.length].map((idx, pos) => {
                  const item = testimonials[idx];
                  if (isMobile && pos === 1) return null;
                  return (
                    <div key={idx} style={{
                      background: c.card,
                      border: `1px solid ${c.border}`,
                      borderRadius: "20px", padding: "28px",
                      boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
                      transition: "background 0.3s",
                      position: "relative",
                    }}>
                      {/* Industry tag */}
                      {"tag" in item && (
                        <div style={{
                          position: "absolute", top: "20px", right: "20px",
                          background: "rgba(14,165,233,0.1)",
                          border: "1px solid rgba(14,165,233,0.2)",
                          color: "#0EA5E9", fontSize: "11px", fontWeight: 600,
                          padding: "3px 10px", borderRadius: "99px", letterSpacing: "0.3px",
                        }}>{(item as typeof testimonials[0]).tag}</div>
                      )}
                      {/* Stars */}
                      <div style={{ display: "flex", gap: "2px", marginBottom: "14px" }}>
                        {Array.from({ length: item.stars }).map((_, si) => (
                          <span key={si} style={{ color: "#FBBF24", fontSize: "14px" }}>★</span>
                        ))}
                      </div>
                      {/* Quote */}
                      <p style={{ color: c.text2, fontSize: "15px", lineHeight: 1.65, marginBottom: "20px", fontStyle: "italic" }}>
                        &ldquo;{item.text}&rdquo;
                      </p>
                      {/* Person row */}
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: "48px", height: "48px", borderRadius: "50%", flexShrink: 0,
                          background: "avatarGrad" in item ? (item as typeof testimonials[0]).avatarGrad : "linear-gradient(135deg, #0D1F3C, #0EA5E9)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "17px", fontWeight: 700, color: "#FFFFFF",
                          boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
                        }}>
                          {item.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "15px", color: c.text }}>{item.name}</div>
                          <div style={{ fontSize: "12px", color: c.text2, marginTop: "2px" }}>{item.role}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginTop: "36px" }}>
              <motion.button onClick={prevTst} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
                style={{ width: "40px", height: "40px", borderRadius: "50%", border: `1px solid ${c.border}`,
                  background: c.card, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  color: c.text2, transition: "background 0.2s" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.button>

              <div style={{ display: "flex", gap: "7px" }}>
                {testimonials.map((_, i) => (
                  <motion.button key={i} onClick={() => { setTstDir(i > tstIndex ? 1 : -1); setTstIndex(i); }}
                    animate={{ scale: i === tstIndex ? 1 : 0.7, opacity: i === tstIndex ? 1 : 0.4 }}
                    transition={{ duration: 0.25 }}
                    style={{ width: i === tstIndex ? "22px" : "7px", height: "7px",
                      borderRadius: "99px", border: "none", cursor: "pointer",
                      background: i === tstIndex ? "#0EA5E9" : c.text2,
                      padding: 0, transition: "width 0.3s ease" }}
                  />
                ))}
              </div>

              <motion.button onClick={nextTst} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.93 }}
                style={{ width: "40px", height: "40px", borderRadius: "50%", border: `1px solid ${c.border}`,
                  background: c.card, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  color: c.text2, transition: "background 0.2s" }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </motion.button>
            </div>

            {/* Credibility line */}
            <p style={{ textAlign: "center", color: c.text3, fontSize: "12px", marginTop: "20px", letterSpacing: "0.3px" }}>
              Echte Erfahrungen unserer Kunden.
            </p>
          </div>
        </div>
      </section>

      {/* ── KONTAKT ── */}
      <section id="kontakt" style={{ padding: "120px 20px 80px", textAlign: "center",
        background: c.contactBg, transition: "background 0.3s ease" }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.16 } } }}
          style={{ maxWidth: "550px", margin: "0 auto" }}>

          <motion.h2 variants={{ hidden: { opacity: 0, scale: 0.92, y: 24, filter: "blur(6px)" },
            visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: appleEase } } }}
            style={{ fontSize: "clamp(28px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: "18px", color: c.text }}>
            <AnimText langKey={`ch2-${lang}`}>{t.contact.headline}</AnimText>
          </motion.h2>

          <motion.p variants={{ hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
            visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: appleEase } } }}
            style={{ color: c.text2, fontSize: "16px", marginBottom: "38px" }}>
            <AnimText langKey={`csub-${lang}`}>{t.contact.subtext}</AnimText>
          </motion.p>

          <motion.div variants={{ hidden: { opacity: 0, scale: 0.9, y: 20 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: appleEase } } }}>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              {/* Telefon */}
              <motion.a href="tel:+4915129436338"
                whileHover={{ scale: 1.03, boxShadow: "0 20px 50px rgba(0,0,0,0.07)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center",
                  background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.06)",
                  padding: "20px 32px", borderRadius: "16px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)", textDecoration: "none", minWidth: "180px" }}>
                <AnimatePresence mode="wait">
                  <motion.p key={`phone-label-${lang}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: "#64748B", fontSize: "11px", margin: "0 0 6px 0", letterSpacing: "1.2px", fontWeight: 600 }}>
                    {t.contact.phoneLabel}
                  </motion.p>
                </AnimatePresence>
                <span style={{ color: "#0EA5E9", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  0151 29436338
                </span>
              </motion.a>

              {/* E-Mail */}
              <motion.a href="mailto:info@nilogik.com"
                whileHover={{ scale: 1.03, boxShadow: "0 20px 50px rgba(0,0,0,0.07)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center",
                  background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.06)",
                  padding: "20px 32px", borderRadius: "16px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.02)", textDecoration: "none", minWidth: "180px" }}>
                <AnimatePresence mode="wait">
                  <motion.p key={`email-label-${lang}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: "#64748B", fontSize: "11px", margin: "0 0 6px 0", letterSpacing: "1.2px", fontWeight: 600 }}>
                    {t.contact.emailLabel}
                  </motion.p>
                </AnimatePresence>
                <span style={{ color: "#0EA5E9", fontSize: "18px", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  info@nilogik.com
                </span>
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: appleEase, delay: 0.2 }}
            style={{ marginTop: "56px", maxWidth: "520px", margin: "56px auto 0" }}
          >
            <ContactForm lang={lang} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "#08152A", color: "rgba(255,255,255,0.55)",
        padding: "56px 24px 32px", fontSize: "13px", letterSpacing: "0.2px",
      }}>
        <div style={{ maxWidth: "1050px", margin: "0 auto" }}>

          {/* Top row: Logo + Newsletter + Social */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "40px", marginBottom: "48px" }}>
            {/* Brand */}
            <div>
              <FinalBrandingLogoWhite width={88} height={32} />
              <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "13px", lineHeight: 1.65, marginTop: "14px", maxWidth: "240px" }}>
                Smarte Softwarelösungen und digitale Automatisierung für Unternehmen jeder Branche.
              </p>
              {/* Social Icons */}
              <div style={{ display: "flex", gap: "14px", marginTop: "20px" }}>
                {[
                  { href: "https://instagram.com", label: "Instagram", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg> },
                  { href: "https://linkedin.com/company/nilogik", label: "LinkedIn", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg> },
                  { href: "https://youtube.com/@nilogik", label: "YouTube", svg: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg> },
                ].map(({ href, label, svg }) => (
                  <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                    whileHover={{ scale: 1.2, color: "#0EA5E9" }}
                    style={{ color: "rgba(255,255,255,0.45)", display: "flex", alignItems: "center" }}>
                    {svg}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "1.5px", fontWeight: 600, marginBottom: "16px" }}>SEITEN</p>
              {[
                { href: "/preise", label: "Preise" },
                { href: "/ueber-uns", label: "Über uns" },
                { href: "/#demo", label: "Demo" },
                { href: "/#kontakt", label: "Kontakt" },
                { href: "/impressum", label: "Impressum" },
                { href: "/datenschutz", label: "Datenschutz" },
              ].map(({ href, label }) => (
                <Link key={href} href={href}
                  style={{ display: "block", color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "14px", marginBottom: "10px", transition: "color 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#0EA5E9")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                  {label}
                </Link>
              ))}
            </div>

            {/* Newsletter */}
            <div>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", letterSpacing: "1.5px", fontWeight: 600, marginBottom: "8px" }}>
                {s.nlHeading.toUpperCase()}
              </p>
              <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "13px", lineHeight: 1.6, marginBottom: "16px" }}>
                KI-Tipps, Updates & Neuigkeiten direkt in dein Postfach.
              </p>
              <NewsletterForm slang={s} />
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "24px", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>
              © {new Date().getFullYear()} NIL – nilogik.de · Aschauerstraße 17, 82445 Schwaigen
            </span>
            <a href="mailto:info@nilogik.de" style={{ color: "rgba(255,255,255,0.4)", textDecoration: "none", fontSize: "12px", transition: "color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0EA5E9")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}>
              info@nilogik.de
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
