"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { flushSync } from "react-dom";
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
      chat1: "Guten Abend! Ich versuche schon den ganzen Tag anzurufen – habt ihr morgen noch einen Termin frei?",
      chat2: "Hallo! Kein Problem, ich bin rund um die Uhr für dich da. Morgen um 10:00 Uhr ist noch was frei – dein Termin ist gebucht. ✨",
      chatLabel: "LIVE DEMO CHAT",
    },
    demo: {
      label: "LIVE DEMO",
      headline: "Einfach ausprobieren.",
      subtext: "Passe den Assistenten auf deinen Betrieb an und teste ihn direkt live – so sieht deine Lösung aus.",
      greeting: "Hallo! Ich bin dein digitaler Assistent. Wie kann ich dir heute helfen? 🤖",
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
      chat1: "Good evening! I've been trying to call all day – do you have a slot free tomorrow?",
      chat2: "Hi! No problem, I'm here for you 24/7. Tomorrow at 10:00 AM still works – your appointment is booked. ✨",
      chatLabel: "LIVE DEMO CHAT",
    },
    demo: {
      label: "LIVE DEMO",
      headline: "Try it right now.",
      subtext: "Customise the assistant for your business and test it live – this is exactly what your solution looks like.",
      greeting: "Hello! I am your digital assistant. How can I help you today? 🤖",
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
      chat1: "¡Buenas tardes! He intentado llamar todo el día – ¿tenéis algún hueco mañana?",
      chat2: "¡Hola! Sin problema, estoy disponible las 24 horas. Mañana a las 10:00 h hay un hueco libre – tu cita está reservada. ✨",
      chatLabel: "DEMO EN VIVO",
    },
    demo: {
      label: "DEMO EN VIVO",
      headline: "Pruébalo ahora mismo.",
      subtext: "Personaliza el asistente para tu negocio y pruébalo en directo – así es exactamente tu solución.",
      greeting: "¡Hola! Soy tu asistente digital. ¿Cómo puedo ayudarte hoy? 🤖",
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
      chat1: "Bonsoir ! J'essaie d'appeler depuis ce matin – avez-vous encore un créneau demain ?",
      chat2: "Bonjour ! Pas de problème, je suis disponible 24h/24. Demain à 10h00 c'est libre – votre rendez-vous est confirmé. ✨",
      chatLabel: "DÉMO EN DIRECT",
    },
    demo: {
      label: "DÉMO EN DIRECT",
      headline: "Essayez-le maintenant.",
      subtext: "Personnalisez l'assistant pour votre entreprise et testez-le en direct – voilà à quoi ressemble votre solution.",
      greeting: "Bonjour ! Je suis votre assistant digital. Comment puis-je vous aider ? 🤖",
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
      chat1: "Buonasera! Ho provato a chiamare tutto il giorno – avete ancora un posto libero domani?",
      chat2: "Ciao! Nessun problema, sono disponibile 24 ore su 24. Domani alle 10:00 c'è ancora posto – il tuo appuntamento è prenotato. ✨",
      chatLabel: "DEMO DAL VIVO",
    },
    demo: {
      label: "DEMO DAL VIVO",
      headline: "Provalo subito.",
      subtext: "Personalizza l'assistente per la tua attività e testalo dal vivo – è esattamente così che appare la tua soluzione.",
      greeting: "Ciao! Sono il tuo assistente digitale. Come posso aiutarti oggi? 🤖",
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
    "Dein KI-Assistent antwortet auf Kundenanfragen – auch wenn du gerade auf der Baustelle bist.",
    "Gastronomie & Handel: Reservierungen, Bestellungen & Anfragen automatisch bearbeiten.",
    "Unternehmen & Teams: Smarte Automatisierung für jeden Betrieb – unabhängig der Branche.",
  ],
  en: [
    "Your AI assistant answers customer inquiries – even when you're busy on a job.",
    "Hospitality & retail: Handle reservations, orders & inquiries automatically.",
    "Companies & teams: Smart automation for any business – whatever the industry.",
  ],
  es: [
    "Tu asistente de IA responde consultas de clientes – aunque estés ocupado en el trabajo.",
    "Hostelería y comercio: Gestiona reservas, pedidos y consultas automáticamente.",
    "Empresas y equipos: Automatización inteligente para cualquier negocio.",
  ],
  fr: [
    "Votre assistant IA répond aux demandes clients – même quand vous êtes en intervention.",
    "Restauration & commerce : Gérez réservations, commandes et demandes automatiquement.",
    "Entreprises & équipes : Automatisation intelligente pour tout type de business.",
  ],
  it: [
    "Il tuo assistente IA risponde alle richieste dei clienti – anche quando sei impegnato sul lavoro.",
    "Ristorazione & commercio: Gestisci prenotazioni, ordini e richieste automaticamente.",
    "Aziende & team: Automazione intelligente per qualsiasi tipo di business.",
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
    {
      q: "Wie schnell ist die Einrichtung?",
      a: "Du gibst uns die Infos zu deinem Betrieb – wir erledigen den Rest. In der Regel ist dein Assistent innerhalb von 48 Stunden live und einsatzbereit. Kein technisches Vorwissen nötig, keine lange Einarbeitungsphase. Du startest sofort – und sparst ab Tag eins Zeit.",
    },
    {
      q: "Brauche ich IT-Kenntnisse?",
      a: "Überhaupt nicht. Du musst keine einzige Zeile Code verstehen. Wir übernehmen die komplette technische Einrichtung – von der KI-Konfiguration bis zur Integration in deine bestehenden Tools. Du bekommst eine fertige Lösung geliefert und kannst sofort loslegen. Einfach so.",
    },
    {
      q: "Welche Sprachen versteht der Assistent?",
      a: "Standardmäßig kommt dein Assistent mit Deutsch und Englisch – perfekt für den Alltag. Brauchst du weitere Sprachen für internationale Kunden? Kein Problem. Spanisch, Französisch, Italienisch und mehr sind auf Anfrage möglich. Wir richten es ein.",
    },
    {
      q: "Kann ich den Assistenten anpassen?",
      a: "Ja – und das ist genau der Unterschied zu einer Standardlösung. Dein Assistent bekommt deinen Ton, deine Persönlichkeit, dein Branchenwissen. Er kennt deine Preise, deine Öffnungszeiten, deine häufigsten Kundenfragen. Kein generischer Bot – sondern ein digitaler Mitarbeiter, der wirklich zu dir passt.",
    },
    {
      q: "Wie sicher sind meine Daten?",
      a: "Datenschutz ist für uns keine Nebensache. Alle Daten werden vollständig DSGVO-konform verarbeitet – kein dauerhaftes Speichern von Gesprächsinhalten, keine Weitergabe an Dritte. Deine Kundendaten bleiben deine Kundendaten. Punkt.",
    },
    {
      q: "Was passiert nach der Kündigung?",
      a: "Die Nutzung endet sauber zum Ende des Abrechnungszeitraums – keine Überraschungen, keine versteckten Gebühren, keine Mindestlaufzeit. Du kannst monatlich kündigen. Und dank unserer 30 Tage Geld-zurück-Garantie gehst du ohnehin kein Risiko ein.",
    },
  ],
  en: [
    {
      q: "How fast is the setup?",
      a: "You give us the details about your business — we handle everything else. Your assistant is usually live within 48 hours, ready to go. No technical knowledge needed, no lengthy onboarding. You start immediately — and save time from day one.",
    },
    {
      q: "Do I need IT knowledge?",
      a: "Not at all. You don't need to understand a single line of code. We handle the complete technical setup — from AI configuration to integration with your existing tools. You receive a ready-to-use solution and can get started right away. Just like that.",
    },
    {
      q: "What languages does the assistant understand?",
      a: "By default, your assistant comes with German and English — perfect for everyday use. Need more languages for international customers? No problem. Spanish, French, Italian and more are available on request. We'll set it up.",
    },
    {
      q: "Can I customize the assistant?",
      a: "Yes — and that's exactly what sets this apart from off-the-shelf solutions. Your assistant gets your tone, your personality, your industry knowledge. It knows your prices, your opening hours, your most common customer questions. Not a generic bot — a digital team member that truly fits your business.",
    },
    {
      q: "How secure is my data?",
      a: "Data protection is not an afterthought for us. All data is processed in full compliance with GDPR — no permanent storage of conversation content, no sharing with third parties. Your customer data stays your customer data. Period.",
    },
    {
      q: "What happens after cancellation?",
      a: "Usage ends cleanly at the end of the billing period — no surprises, no hidden fees, no minimum terms. You can cancel monthly. And with our 30-day money-back guarantee, you're not taking any risk anyway.",
    },
  ],
  es: [
    {
      q: "¿Qué tan rápida es la configuración?",
      a: "Tú nos das los detalles de tu negocio — nosotros nos encargamos del resto. Tu asistente suele estar en funcionamiento en 48 horas, listo para usar. Sin conocimientos técnicos, sin largas incorporaciones. Empiezas de inmediato y ahorras tiempo desde el primer día.",
    },
    {
      q: "¿Necesito conocimientos de IT?",
      a: "Para nada. No necesitas entender ni una línea de código. Nos encargamos de toda la configuración técnica — desde la configuración de la IA hasta la integración con tus herramientas existentes. Recibes una solución lista para usar. Así de simple.",
    },
    {
      q: "¿Qué idiomas entiende el asistente?",
      a: "Por defecto, tu asistente viene con alemán e inglés — perfecto para el día a día. ¿Necesitas más idiomas para clientes internacionales? Sin problema. Español, francés, italiano y más están disponibles bajo petición. Nosotros lo configuramos.",
    },
    {
      q: "¿Puedo personalizar el asistente?",
      a: "Sí — y eso es exactamente lo que lo diferencia de las soluciones estándar. Tu asistente recibe tu tono, tu personalidad, tu conocimiento del sector. Conoce tus precios, tus horarios, las preguntas más frecuentes de tus clientes. No un bot genérico — un empleado digital que realmente encaja con tu negocio.",
    },
    {
      q: "¿Qué tan seguros están mis datos?",
      a: "La protección de datos no es un detalle menor para nosotros. Todos los datos se procesan en total conformidad con el RGPD — sin almacenamiento permanente de conversaciones, sin compartir con terceros. Tus datos de clientes siguen siendo tuyos. Punto.",
    },
    {
      q: "¿Qué ocurre tras la cancelación?",
      a: "El uso termina al final del período de facturación — sin sorpresas, sin tarifas ocultas, sin permanencia mínima. Puedes cancelar mensualmente. Y con nuestra garantía de devolución de 30 días, de todos modos no corres ningún riesgo.",
    },
  ],
  fr: [
    {
      q: "Quelle est la rapidité de mise en place ?",
      a: "Vous nous donnez les informations sur votre activité — nous nous occupons du reste. Votre assistant est généralement opérationnel en 48 heures. Aucune compétence technique requise, aucune longue phase d'intégration. Vous démarrez immédiatement et gagnez du temps dès le premier jour.",
    },
    {
      q: "Ai-je besoin de compétences IT ?",
      a: "Pas du tout. Vous n'avez pas besoin de comprendre une seule ligne de code. Nous gérons la configuration technique complète — de la configuration de l'IA à l'intégration avec vos outils existants. Vous recevez une solution clé en main. Aussi simple que ça.",
    },
    {
      q: "Quelles langues l'assistant comprend-il ?",
      a: "Par défaut, votre assistant maîtrise l'allemand et l'anglais — parfait pour le quotidien. Besoin d'autres langues pour vos clients internationaux ? Pas de problème. L'espagnol, le français, l'italien et d'autres sont disponibles sur demande. Nous nous en chargeons.",
    },
    {
      q: "Puis-je personnaliser l'assistant ?",
      a: "Oui — et c'est exactement ce qui le différencie des solutions standard. Votre assistant reçoit votre ton, votre personnalité, vos connaissances sectorielles. Il connaît vos tarifs, vos horaires, les questions les plus fréquentes de vos clients. Pas un bot générique — un collaborateur digital qui vous ressemble vraiment.",
    },
    {
      q: "Mes données sont-elles sécurisées ?",
      a: "La protection des données n'est pas un détail pour nous. Toutes les données sont traitées en conformité totale avec le RGPD — aucun stockage permanent des conversations, aucun partage avec des tiers. Vos données clients restent les vôtres. Point.",
    },
    {
      q: "Que se passe-t-il après la résiliation ?",
      a: "L'utilisation prend fin proprement à la fin de la période de facturation — sans surprises, sans frais cachés, sans durée minimale. Vous pouvez résilier chaque mois. Et grâce à notre garantie satisfait ou remboursé de 30 jours, vous ne prenez de toute façon aucun risque.",
    },
  ],
  it: [
    {
      q: "Quanto tempo richiede la configurazione?",
      a: "Tu ci dai i dettagli della tua attività — noi pensiamo al resto. Il tuo assistente di solito è operativo entro 48 ore, pronto all'uso. Nessuna competenza tecnica richiesta, nessuna lunga fase di onboarding. Inizi subito e risparmi tempo dal primo giorno.",
    },
    {
      q: "Ho bisogno di competenze IT?",
      a: "Per niente. Non devi capire una sola riga di codice. Ci occupiamo di tutta la configurazione tecnica — dalla configurazione dell'IA all'integrazione con i tuoi strumenti esistenti. Ricevi una soluzione pronta all'uso. Semplice così.",
    },
    {
      q: "Quali lingue capisce l'assistente?",
      a: "Di default, il tuo assistente conosce il tedesco e l'inglese — perfetto per il quotidiano. Hai bisogno di altre lingue per clienti internazionali? Nessun problema. Spagnolo, francese, italiano e altro sono disponibili su richiesta. Ci pensiamo noi.",
    },
    {
      q: "Posso personalizzare l'assistente?",
      a: "Sì — ed è proprio questo che lo distingue dalle soluzioni standard. Il tuo assistente riceve il tuo tono, la tua personalità, la tua conoscenza del settore. Conosce i tuoi prezzi, i tuoi orari, le domande più frequenti dei tuoi clienti. Non un bot generico — un collaboratore digitale che si adatta davvero a te.",
    },
    {
      q: "I miei dati sono al sicuro?",
      a: "La protezione dei dati non è un dettaglio per noi. Tutti i dati vengono trattati in piena conformità con il GDPR — nessuna memorizzazione permanente delle conversazioni, nessuna condivisione con terzi. I tuoi dati dei clienti rimangono tuoi. Punto.",
    },
    {
      q: "Cosa succede dopo la disdetta?",
      a: "L'utilizzo termina correttamente alla fine del periodo di fatturazione — nessuna sorpresa, nessuna tariffa nascosta, nessun vincolo minimo. Puoi disdire mensilmente. E con la nostra garanzia soddisfatti o rimborsati di 30 giorni, non corri comunque nessun rischio.",
    },
  ],
};


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
        {/* single neon-tube line — chained drop-shadow creates smooth glow without visible rings */}
        <line x1="150" y1="14" x2="150" y2="86" stroke="#ffffff" strokeWidth="3"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 3px #ffffff) drop-shadow(0 0 8px #0ea5e9) drop-shadow(0 0 18px #0ea5e9) drop-shadow(0 0 32px #0284c7)" }} />
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
        {/* single neon-tube line — stronger glow for dark backgrounds */}
        <line x1="150" y1="14" x2="150" y2="86" stroke="#ffffff" strokeWidth="3"
          strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 3px #ffffff) drop-shadow(0 0 8px #0ea5e9) drop-shadow(0 0 18px #0ea5e9) drop-shadow(0 0 34px #0284c7)" }} />
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

interface BizType { id: string; label: string; emoji: string; }
const BIZ_TYPES: BizType[] = [
  { id: "handwerk",       label: "Handwerk",        emoji: "🔧" },
  { id: "restaurant",     label: "Restaurant",      emoji: "🍽️" },
  { id: "friseur",        label: "Friseursalon",    emoji: "✂️" },
  { id: "kosmetik",       label: "Kosmetikstudio",  emoji: "💄" },
  { id: "physio",         label: "Physiotherapie",  emoji: "💪" },
  { id: "dienstleistung", label: "Dienstleistung",  emoji: "💼" },
];

interface ChatThemeObj { id: string; name: string; swatch: string; dark: string; mid: string; accent: string; }
const CHAT_THEMES: ChatThemeObj[] = [
  { id: "navy",   name: "Navy",    swatch: "#0F2647", dark: "#060E1E", mid: "#0D1F3C", accent: "#0EA5E9" },
  { id: "forest", name: "Grün",    swatch: "#15803D", dark: "#052E16", mid: "#166534", accent: "#22C55E" },
  { id: "violet", name: "Lila",    swatch: "#6D28D9", dark: "#2E1065", mid: "#5B21B6", accent: "#A78BFA" },
  { id: "rose",   name: "Rot",     swatch: "#9F1239", dark: "#500724", mid: "#881337", accent: "#FB7185" },
  { id: "amber",  name: "Orange",  swatch: "#9A3412", dark: "#431407", mid: "#7C2D12", accent: "#FB923C" },
  { id: "teal",   name: "Türkis",  swatch: "#0E7490", dark: "#083344", mid: "#155E75", accent: "#22D3EE" },
];

function DemoChat({ t }: { t: typeof translations["de"] }) {
  const [configured, setConfigured] = useState(false);
  const [bizName, setBizName]       = useState("");
  const [bizType, setBizType]       = useState("");
  const [bizServices, setBizServices] = useState("");
  const [themeId, setThemeId]       = useState("navy");
  const [messages, setMessages]     = useState<ChatMessage[]>([]);
  const [input, setInput]           = useState("");
  const [loading, setLoading]       = useState(false);
  const messagesContainerRef        = useRef<HTMLDivElement>(null);

  const selectedType = BIZ_TYPES.find(b => b.id === bizType);
  const theme        = CHAT_THEMES.find(th => th.id === themeId) ?? CHAT_THEMES[0];
  const canStart     = bizName.trim().length > 0 && bizType.length > 0;

  const startDemo = () => {
    if (!canStart) return;
    const emoji = selectedType?.emoji ?? "🤖";
    setMessages([{
      role: "bot",
      content: `Hallo! Ich bin der digitale Assistent von ${bizName.trim()}. Wie kann ich dir heute helfen? ${emoji}`,
    }]);
    setConfigured(true);
  };

  const goBack = () => {
    setConfigured(false);
    setMessages([]);
    setInput("");
  };

  /* auto-scroll to bottom on new message */
  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
  }, [messages, loading]);

  /* prevent chat from blocking page scroll on desktop + mobile */
  useEffect(() => {
    if (!configured) return;
    const el = messagesContainerRef.current;
    if (!el) return;
    let startY = 0;

    const onWheel = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const cantScroll = scrollHeight <= clientHeight;
      const atTop    = scrollTop <= 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && e.deltaY > 0;
      if (cantScroll || atTop || atBottom) return;
      e.stopPropagation();
    };
    const onTouchStart = (e: TouchEvent) => { startY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const dy = startY - e.touches[0].clientY;
      const cantScroll = scrollHeight <= clientHeight;
      const atTop    = scrollTop <= 0 && dy < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 1 && dy > 0;
      if (cantScroll || atTop || atBottom) return;
      e.stopPropagation();
    };

    el.addEventListener("wheel",      onWheel,      { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove",  onTouchMove,  { passive: true });
    return () => {
      el.removeEventListener("wheel",      onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove",  onTouchMove);
    };
  }, [configured]);

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
        body: JSON.stringify({
          message: text,
          history,
          businessContext: { name: bizName.trim(), type: bizType, services: bizServices },
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "bot", content: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: "bot", content: "Verbindungsfehler. Bitte erneut versuchen. 🤖" }]);
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
        background: `linear-gradient(135deg, ${theme.dark} 0%, ${theme.mid} 100%)`,
        padding: "18px 22px",
        display: "flex", alignItems: "center", gap: "12px",
        transition: "background 0.4s ease",
      }}>
        {/* Back button – only in chat mode */}
        {configured && (
          <motion.button
            onClick={goBack}
            title="Zurück zur Konfiguration"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.22 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
              background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              transition: "background 0.18s",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 2L4 7l5 5" stroke="rgba(255,255,255,0.85)" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.button>
        )}
        <FinalBrandingLogoWhite width={64} height={24} />
        <div style={{ flex: 1 }}>
          <div style={{ color: "rgba(255,255,255,0.92)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.2px" }}>
            {configured && bizName ? bizName : "Demo-Assistent"}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginTop: "3px" }}>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.55, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22C55E",
                boxShadow: "0 0 6px rgba(34,197,94,0.7)" }}
            />
            <span style={{ color: "rgba(255,255,255,0.38)", fontSize: "11px", letterSpacing: "0.3px" }}>Online</span>
          </div>
        </div>
        <span style={{ fontSize: "22px", opacity: 0.65 }}>
          {configured && selectedType ? selectedType.emoji : "🤖"}
        </span>
      </div>

      {/* ── Config Panel → Chat (animated swap) ── */}
      <AnimatePresence mode="wait">
        {!configured ? (

          /* ── KONFIGURATION ── */
          <motion.div
            key="config"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.26, ease: appleEase }}
            style={{ background: "#F1F5F9", padding: "22px 18px 18px", display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Betriebsname */}
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748B",
                letterSpacing: "1px", textTransform: "uppercase", marginBottom: "7px" }}>
                Betriebsname
              </label>
              <input
                value={bizName}
                onChange={e => setBizName(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && canStart) startDemo(); }}
                placeholder="z.B. Salon Müller, Elektro Bauer …"
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "10px 14px", borderRadius: "12px",
                  border: "1.5px solid rgba(15,23,42,0.12)", fontSize: "14px",
                  background: "#FFFFFF", color: "#0F172A", outline: "none",
                  fontFamily: "inherit", transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(15,23,42,0.12)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {/* Betriebstyp */}
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748B",
                letterSpacing: "1px", textTransform: "uppercase", marginBottom: "7px" }}>
                Betriebstyp
              </label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px" }}>
                {BIZ_TYPES.map(bt => (
                  <button
                    key={bt.id}
                    onClick={() => setBizType(bt.id)}
                    style={{
                      padding: "9px 4px", borderRadius: "10px", fontSize: "11px", fontWeight: 700,
                      cursor: "pointer", transition: "all 0.18s", fontFamily: "inherit",
                      border: bizType === bt.id ? `1.5px solid ${theme.accent}` : "1.5px solid rgba(15,23,42,0.1)",
                      background: bizType === bt.id ? `linear-gradient(135deg, ${theme.mid}, ${theme.dark})` : "#FFFFFF",
                      color: bizType === bt.id ? "#FFFFFF" : "#475569",
                      display: "flex", flexDirection: "column", alignItems: "center", gap: "4px",
                      boxShadow: bizType === bt.id ? `0 4px 12px ${theme.dark}44` : "0 1px 3px rgba(0,0,0,0.06)",
                    }}
                  >
                    <span style={{ fontSize: "20px", lineHeight: 1 }}>{bt.emoji}</span>
                    <span style={{ lineHeight: 1.2 }}>{bt.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat-Farbe */}
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748B",
                letterSpacing: "1px", textTransform: "uppercase", marginBottom: "9px" }}>
                Chat-Farbe
              </label>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                {CHAT_THEMES.map(th => (
                  <motion.button
                    key={th.id}
                    onClick={() => setThemeId(th.id)}
                    title={th.name}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    style={{
                      width: "30px", height: "30px", borderRadius: "50%", flexShrink: 0,
                      background: th.swatch, cursor: "pointer",
                      border: themeId === th.id ? `3px solid ${th.accent}` : "3px solid transparent",
                      outline: themeId === th.id ? `2px solid ${th.accent}` : "2px solid transparent",
                      outlineOffset: "2px",
                      boxShadow: themeId === th.id
                        ? `0 0 0 2px white, 0 4px 12px rgba(0,0,0,0.18)`
                        : "0 2px 6px rgba(0,0,0,0.15)",
                      transition: "box-shadow 0.18s, outline 0.18s",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Besondere Infos optional */}
            <div>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, color: "#64748B",
                letterSpacing: "1px", textTransform: "uppercase", marginBottom: "7px" }}>
                Besondere Infos{" "}
                <span style={{ fontWeight: 400, textTransform: "none", fontSize: "11px", color: "#94A3B8" }}>
                  (optional)
                </span>
              </label>
              <textarea
                value={bizServices}
                onChange={e => setBizServices(e.target.value)}
                placeholder="z.B. Öffnungszeiten Mo–Fr 8–18 Uhr, Spezialität: Elektroanlagen …"
                rows={2}
                style={{
                  width: "100%", boxSizing: "border-box",
                  padding: "10px 14px", borderRadius: "12px",
                  border: "1.5px solid rgba(15,23,42,0.12)", fontSize: "13px",
                  background: "#FFFFFF", color: "#0F172A", outline: "none",
                  fontFamily: "inherit", resize: "none", lineHeight: 1.5,
                  transition: "border-color 0.2s, box-shadow 0.2s",
                }}
                onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(15,23,42,0.12)"; e.target.style.boxShadow = "none"; }}
              />
            </div>

            {/* Start Button */}
            <motion.button
              onClick={startDemo}
              disabled={!canStart}
              whileHover={canStart ? { scale: 1.02, y: -1 } : {}}
              whileTap={canStart ? { scale: 0.97 } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              style={{
                width: "100%", padding: "14px", borderRadius: "14px", fontSize: "15px", fontWeight: 700,
                border: "none", cursor: canStart ? "pointer" : "not-allowed", fontFamily: "inherit",
                background: canStart ? `linear-gradient(135deg, ${theme.accent} 0%, ${theme.mid} 100%)` : "rgba(15,23,42,0.08)",
                color: canStart ? "#FFFFFF" : "#94A3B8",
                transition: "background 0.22s, color 0.22s",
                boxShadow: canStart ? `0 6px 20px ${theme.accent}55` : "none",
                letterSpacing: "-0.01em",
              }}
            >
              Demo starten →
            </motion.button>
          </motion.div>

        ) : (

          /* ── CHAT ── */
          <motion.div
            key="chat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.28, ease: appleEase }}
          >
            {/* Messages */}
            <div ref={messagesContainerRef}
              style={{
                background: "#F1F5F9", height: "330px", maxHeight: "330px",
                overflowY: "auto", overscrollBehavior: "contain",
                padding: "18px 16px 12px",
                display: "flex", flexDirection: "column", gap: "10px",
                scrollbarWidth: "none", pointerEvents: "none",
              }}>
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.32, ease: appleEase }}
                    style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
                  >
                    {msg.role === "bot" && (
                      <div style={{
                        width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                        background: `linear-gradient(135deg, ${theme.dark}, ${theme.mid})`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginRight: "8px", marginTop: "2px", fontSize: "12px",
                      }}>{selectedType?.emoji ?? "🤖"}</div>
                    )}
                    <div style={{
                      maxWidth: "75%", padding: "11px 15px",
                      borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: msg.role === "user" ? `linear-gradient(135deg, ${theme.mid} 0%, ${theme.dark} 100%)` : "#FFFFFF",
                      border: msg.role === "bot" ? "1px solid rgba(15,23,42,0.07)" : "none",
                      boxShadow: msg.role === "user" ? "0 4px 14px rgba(8,21,42,0.28)" : "0 2px 8px rgba(0,0,0,0.06)",
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
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.25 }}
                    style={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-end" }}
                  >
                    <div style={{
                      width: "26px", height: "26px", borderRadius: "50%", flexShrink: 0,
                      background: `linear-gradient(135deg, ${theme.dark}, ${theme.mid})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginRight: "8px", fontSize: "12px",
                    }}>{selectedType?.emoji ?? "🤖"}</div>
                    <div style={{
                      background: "#FFFFFF", border: "1px solid rgba(15,23,42,0.07)",
                      borderRadius: "18px 18px 18px 4px", padding: "13px 18px",
                      display: "flex", alignItems: "center", gap: "5px",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    }}>
                      {[0, 1, 2].map(d => (
                        <motion.div key={d}
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

            {/* Input */}
            <div style={{
              background: "#FFFFFF", borderTop: "1px solid rgba(15,23,42,0.07)",
              padding: "14px 16px", display: "flex", gap: "10px", alignItems: "center",
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
                  transition: "border-color 0.2s, box-shadow 0.2s", fontFamily: "inherit",
                }}
                onFocus={e => { e.target.style.borderColor = "rgba(14,165,233,0.5)"; e.target.style.boxShadow = "0 0 0 3px rgba(14,165,233,0.1)"; }}
                onBlur={e => { e.target.style.borderColor = "rgba(15,23,42,0.1)"; e.target.style.boxShadow = "none"; }}
              />
              <motion.button
                onClick={send}
                disabled={!input.trim() || loading}
                whileHover={input.trim() && !loading ? { scale: 1.08 } : {}}
                whileTap={input.trim() && !loading ? { scale: 0.93 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                style={{
                  width: "44px", height: "44px", borderRadius: "50%", flexShrink: 0,
                  background: input.trim() && !loading ? `linear-gradient(135deg, ${theme.accent}, ${theme.mid})` : "#E2E8F0",
                  border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "background 0.22s",
                  boxShadow: input.trim() && !loading ? `0 4px 14px ${theme.accent}66` : "none",
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

        )}
      </AnimatePresence>
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
  const [open, setOpen] = useState<number | null>(0);
  const divider = isDark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.08)";
  const text    = isDark ? "#F1F5F9" : "#0F172A";
  const text2   = isDark ? "#94A3B8" : "#475569";

  return (
    <div style={{ borderTop: `1px solid ${divider}` }}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <motion.div key={i}
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.55, ease: [0.16,1,0.3,1], delay: i * 0.06 }}
            style={{ borderBottom: `1px solid ${divider}`, position: "relative" }}
          >
            {/* Background glow sweeps in from left */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="glow"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16, transition: { duration: 0.22 } }}
                  transition={{ duration: 0.35, ease: [0.16,1,0.3,1] }}
                  style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: isDark
                      ? "linear-gradient(90deg, rgba(14,165,233,0.08) 0%, rgba(14,165,233,0.02) 45%, transparent 75%)"
                      : "linear-gradient(90deg, rgba(14,165,233,0.06) 0%, rgba(14,165,233,0.02) 45%, transparent 75%)",
                  }}
                />
              )}
            </AnimatePresence>

            {/* Left accent bar – scales down from top */}
            <motion.div
              animate={{ scaleY: isOpen ? 1 : 0, opacity: isOpen ? 1 : 0 }}
              initial={{ scaleY: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.16,1,0.3,1] }}
              style={{
                position: "absolute", left: 0, top: "12px", bottom: "12px",
                width: "3px", borderRadius: "2px", transformOrigin: "top",
                background: "linear-gradient(to bottom, #38BDF8, #0EA5E9, #0284C7)",
                boxShadow: "0 0 10px rgba(14,165,233,0.55)",
              }}
            />

            <button
              onClick={() => setOpen(isOpen ? null : i)}
              style={{
                width: "100%", padding: "22px 0 22px 16px",
                display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px",
                background: "none", border: "none", cursor: "pointer",
                textAlign: "left", fontFamily: "inherit", position: "relative", zIndex: 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                {/* Number badge – bounces on open */}
                <motion.span
                  animate={{
                    scale: isOpen ? [1, 1.28, 0.92, 1] : 1,
                    backgroundColor: isOpen ? "rgba(14,165,233,0.14)" : isDark ? "rgba(255,255,255,0.05)" : "rgba(15,23,42,0.05)",
                  }}
                  transition={{ duration: 0.42, ease: [0.16,1,0.3,1] }}
                  style={{
                    width: "30px", height: "30px", borderRadius: "8px", flexShrink: 0,
                    border: isOpen ? "1px solid rgba(14,165,233,0.3)" : "1px solid transparent",
                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.3px",
                    color: isOpen ? "#0EA5E9" : text2,
                    transition: "color 0.25s, border 0.25s",
                    fontFamily: "inherit",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>

                {/* Question text nudges right */}
                <motion.span
                  animate={{ x: isOpen ? 5 : 0 }}
                  transition={{ duration: 0.32, ease: [0.16,1,0.3,1] }}
                  style={{
                    fontWeight: 600, fontSize: "15.5px", lineHeight: 1.4,
                    color: isOpen ? "#0EA5E9" : text,
                    transition: "color 0.25s", display: "block",
                  }}
                >
                  {item.q}
                </motion.span>
              </div>

              {/* Chevron with spring bounce */}
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                style={{
                  flexShrink: 0, display: "flex",
                  color: isOpen ? "#0EA5E9" : text2,
                  transition: "color 0.25s",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M4.5 6.75L9 11.25L13.5 6.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.36, ease: [0.16,1,0.3,1] }}
                  style={{ overflow: "hidden", position: "relative", zIndex: 1 }}
                >
                  {/* Answer fades in with blur dissolve */}
                  <motion.p
                    initial={{ y: 14, opacity: 0, filter: "blur(5px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 0.42, ease: [0.16,1,0.3,1], delay: 0.09 }}
                    style={{
                      padding: "0 0 24px 62px",
                      color: text2, fontSize: "14.5px", lineHeight: 1.75, margin: 0,
                    }}
                  >
                    {item.a}
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ─── Plan Configurator ─────────────────────────────────────── */
type CColors = { card: string; border: string; text: string; text2: string; text3: string; [k: string]: string };
type ConfigAnswers = Record<string, string[]>;

const CONFIG_STEPS = [
  {
    id: "anfragen",
    q: "Wie viele Kundenanfragen bekommt dein Betrieb ca. pro Monat?",
    hint: "Eine grobe Schätzung reicht völlig",
    multi: false,
    cols: 2,
    options: [
      { id: "lt100",  label: "Weniger als 100",  emoji: "🌱", detail: "ideal zum Testen" },
      { id: "lt500",  label: "100 – 500",         emoji: "📈", detail: "solides Wachstum" },
      { id: "lt3000", label: "500 – 3.000",        emoji: "🚀", detail: "aktiver Betrieb" },
      { id: "gt3000", label: "Über 3.000",         emoji: "🏢", detail: "Enterprise-Niveau" },
    ],
  },
  {
    id: "kanaele",
    q: "Über welche Kanäle sollen Kunden den Assistenten erreichen?",
    hint: "Mehrere Antworten möglich — bestätige unten",
    multi: true,
    cols: 2,
    options: [
      { id: "web",       label: "Website-Chat", emoji: "💬", detail: "immer inklusive" },
      { id: "email",     label: "E-Mail",        emoji: "📧", detail: "ab Basic" },
      { id: "whatsapp",  label: "WhatsApp",      emoji: "📱", detail: "ab Pro" },
      { id: "instagram", label: "Instagram",     emoji: "📸", detail: "ab Pro" },
    ],
  },
  {
    id: "features",
    q: "Welche Funktionen brauchst du?",
    hint: "Alles was du benötigst — Mehrfachauswahl möglich",
    multi: true,
    cols: 3,
    options: [
      { id: "faq",       label: "FAQ / Support",      emoji: "❓", detail: "alle Pläne" },
      { id: "termine",   label: "Terminbuchung",      emoji: "📅", detail: "ab Basic" },
      { id: "analytics", label: "Analytics",          emoji: "📊", detail: "ab Pro" },
      { id: "multibot",  label: "Mehr. Assistenten",  emoji: "🤖", detail: "ab Pro" },
      { id: "crm",       label: "CRM-Anbindung",      emoji: "🔗", detail: "ab Pro" },
      { id: "custom",    label: "Custom / API",       emoji: "⚙️", detail: "Enterprise" },
    ],
  },
  {
    id: "assistenten",
    q: "Wie viele KI-Assistenten brauchst du?",
    hint: "Z.B. je einen für Terminbuchung und Support",
    multi: false,
    cols: 3,
    options: [
      { id: "one",  label: "1 Assistent",       emoji: "🤖", detail: "Starter & Basic" },
      { id: "few",  label: "2 – 3 Assistenten", emoji: "🤝", detail: "ab Pro" },
      { id: "many", label: "Mehr als 3",         emoji: "🏭", detail: "Enterprise" },
    ],
  },
] as const;

const PLAN_RESULTS = {
  Starter:    { emoji: "🌱", price: "ab €39 / Monat",  cta: "Kostenlos starten →",  desc: "Perfekt zum Einstieg. 14 Tage kostenlos testen – keine Kreditkarte, kein Risiko. Für kleinere Betriebe die NIL kennenlernen wollen." },
  Basic:      { emoji: "📈", price: "ab €89 / Monat",  cta: "Basic starten →",       desc: "Genau richtig für deinen Betrieb. 500 Anfragen/Monat, E-Mail-Integration und vollständiger deutschsprachiger Support." },
  Pro:        { emoji: "⚡", price: "ab €199 / Monat", cta: "Pro wählen →",          desc: "Du brauchst Power. Pro gibt dir 3 Assistenten, bis zu 3.000 Anfragen, WhatsApp & Instagram und erweiterte Analytics." },
  Enterprise: { emoji: "🏢", price: "ab €499 / Monat", cta: "Angebot anfragen →",   desc: "Deine Anforderungen sind komplex – genau dafür gibt es Enterprise. Unbegrenzte Assistenten, Custom API und 24/7 SLA." },
} as const;

type PlanKey = keyof typeof PLAN_RESULTS;

function calcRecommendation(answers: ConfigAnswers): { plan: PlanKey; reasons: string[] } {
  const anfragen    = answers["anfragen"]?.[0] ?? "lt100";
  const kanaele     = answers["kanaele"]     ?? [];
  const features    = answers["features"]    ?? [];
  const assistenten = answers["assistenten"]?.[0] ?? "one";
  const reasons: string[] = [];
  let score = 0;

  if      (anfragen === "gt3000") { score = Math.max(score, 3); reasons.push("Über 3.000 Anfragen/Monat benötigt Enterprise"); }
  else if (anfragen === "lt3000") { score = Math.max(score, 2); reasons.push("Bis zu 3.000 Anfragen/Monat → Pro empfohlen"); }
  else if (anfragen === "lt500")  { score = Math.max(score, 1); reasons.push("Bis zu 500 Anfragen/Monat → Basic ausreichend"); }

  if (kanaele.includes("whatsapp") || kanaele.includes("instagram")) {
    score = Math.max(score, 2);
    reasons.push("WhatsApp / Instagram ist ab Pro verfügbar");
  } else if (kanaele.includes("email")) {
    score = Math.max(score, 1);
    reasons.push("E-Mail-Integration ist ab Basic verfügbar");
  }

  if (features.includes("custom"))    { score = Math.max(score, 3); reasons.push("Custom API / On-Premise → Enterprise"); }
  if (features.includes("crm"))       { score = Math.max(score, 2); reasons.push("CRM-Anbindung ist ab Pro verfügbar"); }
  if (features.includes("analytics")) { score = Math.max(score, 2); reasons.push("Erweiterte Analytics sind ab Pro verfügbar"); }
  if (features.includes("multibot"))  { score = Math.max(score, 2); reasons.push("Mehrere Assistenten sind ab Pro verfügbar"); }
  if (features.includes("termine") && score < 1) { score = 1; reasons.push("Terminbuchung-Integration ist ab Basic verfügbar"); }

  if (assistenten === "many") { score = Math.max(score, 3); reasons.push("Mehr als 3 Assistenten → Enterprise"); }
  else if (assistenten === "few") { score = Math.max(score, 2); reasons.push("2–3 Assistenten sind im Pro-Plan enthalten"); }

  const plan = (["Starter", "Basic", "Pro", "Enterprise"] as PlanKey[])[score];
  return { plan, reasons: reasons.slice(0, 4) };
}

function PlanFinder({ isDark, c, onOpenModal }: { isDark: boolean; c: CColors; onOpenModal: () => void }) {
  const [step,    setStep]    = useState(0);
  const [answers, setAnswers] = useState<ConfigAnswers>({});
  const [result,  setResult]  = useState<{ plan: PlanKey; reasons: string[] } | null>(null);

  const q        = CONFIG_STEPS[step];
  const selected = answers[q?.id] ?? [];
  const total    = CONFIG_STEPS.length;

  const toggleOption = (optId: string) => {
    const cur = answers[q.id] ?? [];
    if (q.multi) {
      const next = cur.includes(optId) ? cur.filter(x => x !== optId) : [...cur, optId];
      setAnswers({ ...answers, [q.id]: next });
    } else {
      const newA = { ...answers, [q.id]: [optId] };
      setAnswers(newA);
      if (step < total - 1) {
        setTimeout(() => setStep(s => s + 1), 180);
      } else {
        setResult(calcRecommendation(newA));
      }
    }
  };

  const advance = () => {
    if (step < total - 1) {
      setStep(s => s + 1);
    } else {
      setResult(calcRecommendation(answers));
    }
  };

  const goBack  = () => { setStep(s => Math.max(0, s - 1)); };
  const reset   = () => { setStep(0); setAnswers({}); setResult(null); };
  const res     = result ? PLAN_RESULTS[result.plan] : null;

  return (
    <section style={{ padding: "80px 20px", background: isDark ? "#0A1628" : "#E8F0FA", transition: "background 0.3s" }}>
      <div style={{ maxWidth: "660px", margin: "0 auto", textAlign: "center" }}>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease: appleEase }}>
          <p style={{ color: "#0EA5E9", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", marginBottom: "10px" }}>PLAN FINDER</p>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "10px", color: c.text }}>
            Welcher Plan passt zu dir?
          </h2>
          <p style={{ color: c.text2, fontSize: "15px", marginBottom: "32px", lineHeight: 1.6 }}>
            Beantworte {total} kurze Fragen — wir ermitteln deinen perfekten Plan.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, delay: 0.1, ease: appleEase }}
          style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: "24px",
            padding: "36px 28px", boxShadow: "0 8px 40px rgba(15,23,42,0.08)", textAlign: "left" }}
        >
          {!result ? (
            <>
              {/* Progress bar */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "28px" }}>
                <div style={{ flex: 1, height: "6px", background: c.border, borderRadius: "3px", overflow: "hidden" }}>
                  <motion.div
                    animate={{ width: `${((step + 1) / total) * 100}%` }}
                    transition={{ duration: 0.4, ease: appleEase }}
                    style={{ height: "100%", background: "linear-gradient(90deg, #0EA5E9, #0284C7)", borderRadius: "3px" }}
                  />
                </div>
                <span style={{ fontSize: "12px", fontWeight: 600, color: c.text3, whiteSpace: "nowrap" }}>
                  {step + 1} / {total}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div key={step}
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.25, ease: appleEase }}
                >
                  {/* Badge: single vs multi */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <span style={{
                      fontSize: "10px", fontWeight: 700, letterSpacing: "1px", padding: "3px 9px",
                      borderRadius: "99px", background: q.multi ? "rgba(14,165,233,0.12)" : "rgba(34,197,94,0.1)",
                      color: q.multi ? "#0EA5E9" : "#22C55E",
                    }}>
                      {q.multi ? "MEHRFACHAUSWAHL" : "EINZELAUSWAHL"}
                    </span>
                  </div>

                  <h3 style={{ fontSize: "18px", fontWeight: 700, color: c.text, marginBottom: "6px", lineHeight: 1.4, letterSpacing: "-0.02em" }}>
                    {q.q}
                  </h3>
                  <p style={{ fontSize: "13px", color: c.text3, marginBottom: "20px" }}>{q.hint}</p>

                  <div style={{ display: "grid", gridTemplateColumns: `repeat(${q.cols}, 1fr)`, gap: "10px", marginBottom: "20px" }}>
                    {q.options.map(opt => {
                      const isSelected = selected.includes(opt.id);
                      return (
                        <motion.button key={opt.id} onClick={() => toggleOption(opt.id)}
                          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}
                          style={{
                            padding: "14px 10px", borderRadius: "14px", cursor: "pointer",
                            background: isSelected
                              ? (isDark ? "rgba(14,165,233,0.18)" : "rgba(14,165,233,0.08)")
                              : (isDark ? "rgba(255,255,255,0.04)" : "#F8FAFC"),
                            border: `1.5px solid ${isSelected ? "#0EA5E9" : c.border}`,
                            display: "flex", flexDirection: "column", alignItems: "center", gap: "6px",
                            fontFamily: "inherit", textAlign: "center",
                            transition: "border-color 0.18s, background 0.18s",
                            position: "relative",
                          }}
                        >
                          {isSelected && (
                            <div style={{
                              position: "absolute", top: "7px", right: "8px",
                              width: "16px", height: "16px", borderRadius: "50%",
                              background: "#0EA5E9",
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "9px", color: "#fff", fontWeight: 800,
                            }}>✓</div>
                          )}
                          <span style={{ fontSize: "22px", lineHeight: 1 }}>{opt.emoji}</span>
                          <span style={{ fontSize: "12px", fontWeight: 600, color: c.text, lineHeight: 1.3 }}>{opt.label}</span>
                          <span style={{ fontSize: "10px", color: "#0EA5E9", fontWeight: 500 }}>{opt.detail}</span>
                        </motion.button>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div style={{ display: "flex", gap: "10px", justifyContent: "space-between", alignItems: "center" }}>
                    {step > 0 ? (
                      <motion.button onClick={goBack} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        style={{ padding: "11px 20px", borderRadius: "10px", background: "transparent",
                          border: `1.5px solid ${c.border}`, color: c.text2, fontWeight: 600, fontSize: "14px",
                          cursor: "pointer", fontFamily: "inherit" }}>
                        ← Zurück
                      </motion.button>
                    ) : <div />}

                    {q.multi && (
                      <motion.button onClick={advance} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                        disabled={selected.length === 0}
                        style={{
                          padding: "11px 28px", borderRadius: "10px", border: "none",
                          background: selected.length > 0 ? "linear-gradient(135deg, #0EA5E9, #0284C7)" : c.border,
                          color: selected.length > 0 ? "#fff" : c.text3,
                          fontWeight: 700, fontSize: "14px", cursor: selected.length > 0 ? "pointer" : "default",
                          fontFamily: "inherit", boxShadow: selected.length > 0 ? "0 6px 18px rgba(14,165,233,0.3)" : "none",
                          transition: "background 0.2s",
                        }}>
                        {step === total - 1 ? "Plan ermitteln →" : "Weiter →"}
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div key="result" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: appleEase }} style={{ textAlign: "center" }}
              >
                <div style={{ fontSize: "52px", marginBottom: "12px" }}>{res!.emoji}</div>
                <p style={{ color: "#0EA5E9", fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", marginBottom: "6px" }}>
                  UNSERE EMPFEHLUNG FÜR DICH
                </p>
                <h3 style={{ fontSize: "36px", fontWeight: 900, letterSpacing: "-0.04em", color: c.text, marginBottom: "4px" }}>
                  {result!.plan}
                </h3>
                <div style={{ fontSize: "18px", fontWeight: 700, color: "#0EA5E9", marginBottom: "16px" }}>{res!.price}</div>
                <p style={{ fontSize: "15px", color: c.text2, lineHeight: 1.65, marginBottom: "22px", maxWidth: "420px", margin: "0 auto 22px" }}>
                  {res!.desc}
                </p>

                {/* Reasons */}
                {result!.reasons.length > 0 && (
                  <div style={{ background: isDark ? "rgba(14,165,233,0.08)" : "rgba(14,165,233,0.06)",
                    border: `1px solid rgba(14,165,233,0.2)`, borderRadius: "14px",
                    padding: "16px 18px", marginBottom: "24px", textAlign: "left" }}>
                    <p style={{ fontSize: "11px", fontWeight: 700, color: "#0EA5E9", letterSpacing: "1px", marginBottom: "10px" }}>
                      WARUM DIESER PLAN
                    </p>
                    {result!.reasons.map((r, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: i < result!.reasons.length - 1 ? "7px" : 0 }}>
                        <span style={{ color: "#0EA5E9", fontWeight: 700, flexShrink: 0 }}>✓</span>
                        <span style={{ fontSize: "13px", color: c.text2 }}>{r}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                  <motion.button onClick={onOpenModal} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    style={{ padding: "14px 30px", borderRadius: "12px", border: "none",
                      background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                      color: "#fff", fontWeight: 700, fontSize: "15px",
                      cursor: "pointer", fontFamily: "inherit",
                      boxShadow: "0 8px 24px rgba(14,165,233,0.35)" }}>
                    {res!.cta}
                  </motion.button>
                  <motion.button onClick={reset} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                    style={{ padding: "14px 22px", borderRadius: "12px", background: "transparent",
                      border: `1.5px solid ${c.border}`, color: c.text2, fontWeight: 600, fontSize: "14px",
                      cursor: "pointer", fontFamily: "inherit" }}>
                    ↺ Nochmal
                  </motion.button>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </motion.div>
      </div>
    </section>
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

  /* ── Kontakt Modal ── */
  const [showCtaModal, setShowCtaModal] = useState(false);
  const [priceBilling, setPriceBilling] = useState<"monthly" | "yearly">("monthly");
  useEffect(() => {
    document.body.style.overflow = showCtaModal ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showCtaModal]);

  /* ── Dark Mode ── */
  const [isDark, setIsDark] = useState(false);
  const [themeOverlay, setThemeOverlay] = useState<{ x: number; y: number; toDark: boolean; id: number } | null>(null);

  useEffect(() => {
    if (localStorage.getItem("nil-dark") === "true") setIsDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("nil-dark", String(isDark));
    document.documentElement.setAttribute("data-dark", String(isDark));
  }, [isDark]);

  const handleThemeToggle = (e: React.MouseEvent) => {
    if (themeOverlay) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const toDark = !isDark;

    // ── View Transitions API: real content revealed piece by piece ──
    const vtDoc = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void> };
    };

    if (vtDoc.startViewTransition) {
      const endR = Math.hypot(
        Math.max(x, window.innerWidth  - x),
        Math.max(y, window.innerHeight - y),
      );
      const vt = vtDoc.startViewTransition(() => {
        flushSync(() => setIsDark(toDark));
      });
      vt.ready.then(() => {
        // Animate the NEW snapshot as an expanding circle from the button
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endR}px at ${x}px ${y}px)`] },
          { duration: 700, easing: "cubic-bezier(0.4,0,0.2,1)", pseudoElement: "::view-transition-new(root)" },
        );
      });
    } else {
      // ── Fallback for browsers without View Transitions API ──
      document.documentElement.classList.add("theme-switching");
      setIsDark(toDark);
      setThemeOverlay({ x, y, toDark, id: Date.now() });
      setTimeout(() => {
        document.documentElement.classList.remove("theme-switching");
        setThemeOverlay(null);
      }, 750);
    }
  };

  /* ── Rotating tagline ── */
  const [taglineIndex, setTaglineIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setTaglineIndex(i => (i + 1) % 3), 3400);
    return () => clearInterval(timer);
  }, []);


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
                    onClick={href === "#kontakt" ? (e: React.MouseEvent) => { e.preventDefault(); setShowCtaModal(true); } : undefined}
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
              <motion.button onClick={handleThemeToggle}
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                aria-label="Dark/Light Mode"
                style={{ background: isDark ? "rgba(255,255,255,0.08)" : "rgba(15,23,42,0.05)", border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.1)"}`, borderRadius: "50%", width: "34px", height: "34px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "15px", transition: "background 0.2s" }}
              >{isDark ? "☀️" : "🌙"}</motion.button>
              <LangSwitcher lang={lang} setLang={setLang} />
            </>}

            {/* ── MOBILE: Dark Toggle + Hamburger ── */}
            {isMobile && <>
              <motion.button onClick={handleThemeToggle}
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
                  onClick={href === "#kontakt"
                    ? (e: React.MouseEvent) => { e.preventDefault(); setMobileMenuOpen(false); setShowCtaModal(true); }
                    : () => setMobileMenuOpen(false)}
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
        minHeight: isMobile ? "auto" : "100svh",
        height: isMobile ? "auto" : "100vh",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        textAlign: "center",
        padding: isMobile ? "96px 24px 48px" : "68px 20px 0",
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
                fontWeight: 800, letterSpacing: "-0.055em", lineHeight: 1.08 }}>
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
                  fontSize: isMobile ? "14px" : "16px",
                  color: c.text2,
                  lineHeight: 1.65,
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
            <motion.button onClick={() => setShowCtaModal(true)}
              whileHover={{ scale: 1.05, boxShadow: "0 18px 44px rgba(14,165,233,0.35), 0 6px 20px rgba(15,23,42,0.2)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              style={{ display: "inline-block",
                background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
                color: "#FFFFFF",
                padding: "16px 40px", borderRadius: "9999px", fontWeight: 600, fontSize: "14px",
                border: "none", cursor: "pointer", fontFamily: "inherit",
                boxShadow: "0 10px 30px rgba(15,23,42,0.18), inset 0 1px 0 rgba(255,255,255,0.08)",
                letterSpacing: "0.2px" }}>
              <AnimatePresence mode="wait">
                <motion.span key={`cta-${lang}`}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                  {t.hero.cta}
                </motion.span>
              </AnimatePresence>
            </motion.button>

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

      {/* ── TRUST BAR ── */}
      <div style={{
        background: isDark ? "#0a1628" : "#E2ECF8",
        borderTop: `1px solid ${c.border}`,
        borderBottom: `1px solid ${c.border}`,
        padding: "14px 24px",
      }}>
        <div style={{ maxWidth: "1050px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
          <span style={{ color: "#22C55E", fontSize: "13px", fontWeight: 600 }}>✓ Kostenlose Erstberatung</span>
          <span style={{ color: isDark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.2)", fontSize: "18px", lineHeight: 1, fontWeight: 300 }}>·</span>
          <span style={{ color: "#0EA5E9", fontSize: "13px", fontWeight: 600 }}>⚡ Live-Einrichtung in 48h</span>
          <span style={{ color: isDark ? "rgba(255,255,255,0.15)" : "rgba(15,23,42,0.2)", fontSize: "18px", lineHeight: 1, fontWeight: 300 }}>·</span>
          <span style={{ color: c.text2, fontSize: "13px", fontWeight: 600 }}>🔒 30 Tage Geld-zurück-Garantie</span>
        </div>
      </div>

      {/* ── PILOTPROGRAMM BANNER ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7, ease: appleEase }}
        style={{
          background: "linear-gradient(135deg, #0A1628 0%, #0D2444 50%, #0A1E38 100%)",
          borderTop: "1px solid rgba(14,165,233,0.2)",
          borderBottom: "1px solid rgba(14,165,233,0.2)",
          padding: "28px 24px",
        }}
      >
        <div style={{
          maxWidth: "900px", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "20px", flexWrap: "wrap",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "10px", flexShrink: 0,
              background: "rgba(14,165,233,0.15)", border: "1px solid rgba(14,165,233,0.3)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.5s-5 3-5 9v1.5L5 16h14l-2-3V11.5C17 5.5 12 2.5 12 2.5z"/>
                <path d="M10 16v3.5h4V16"/>
              </svg>
            </div>
            <div>
              <p style={{ color: "#FFFFFF", fontSize: "15px", fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.01em" }}>
                Wir suchen 3 Pilotbetriebe in Bayern
              </p>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", margin: 0, lineHeight: 1.5 }}>
                Kostenlose Einrichtung gegen ehrliches Feedback – begrenzte Plätze, jetzt bewerben.
              </p>
            </div>
          </div>
          <motion.a
            href="#kontakt"
            onClick={(e: React.MouseEvent) => { e.preventDefault(); setShowCtaModal(true); }}
            whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(14,165,233,0.4)" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
              color: "#FFFFFF", padding: "11px 24px", borderRadius: "9999px",
              fontWeight: 700, fontSize: "14px", textDecoration: "none",
              boxShadow: "0 6px 20px rgba(14,165,233,0.3)",
              whiteSpace: "nowrap", flexShrink: 0,
            }}
          >
            Jetzt Platz sichern →
          </motion.a>
        </div>
      </motion.div>

      {/* ── WIE ES FUNKTIONIERT ── */}
      <section style={{
        padding: "96px 24px 88px",
        background: isDark
          ? "linear-gradient(to bottom, #07101e 0%, #07101e 100%)"
          : "linear-gradient(to bottom, #F8FAFC 0%, #F1F5F9 100%)",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>

          {/* Header */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            style={{ textAlign: "center", marginBottom: "68px" }}
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 14, filter: "blur(5px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: appleEase } } }}
              style={{ color: "#0EA5E9", fontSize: "12px", fontWeight: 700, letterSpacing: "2px", marginBottom: "14px" }}
            >
              WIE ES FUNKTIONIERT
            </motion.p>
            <motion.h2
              variants={{ hidden: { opacity: 0, y: 22, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: appleEase } } }}
              style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.04em",
                color: c.text, margin: "0 0 16px" }}
            >
              In 3 Schritten live.
            </motion.h2>
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16, filter: "blur(4px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: appleEase } } }}
              style={{ color: c.text2, fontSize: "16px", lineHeight: 1.65, maxWidth: "480px", margin: "0 auto" }}
            >
              Von unserem ersten Gespräch bis dein Assistent läuft – meistens in unter 48 Stunden.
            </motion.p>
          </motion.div>

          {/* Steps */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.18 } } }}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(268px, 1fr))", gap: "22px" }}
          >
            {([
              {
                num: "01",
                color: "#0EA5E9",
                sub: "15 Min · kostenlos",
                title: "Kurzes Gespräch",
                desc: "Wir schauen gemeinsam, welche Anfragen dich täglich Zeit kosten. Kein Vortrag – nur ein ehrliches Gespräch.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                ),
              },
              {
                num: "02",
                color: "#8B5CF6",
                sub: "Wir kümmern uns · du musst nichts tun",
                title: "Wir richten alles ein",
                desc: "Dein Assistent wird auf deinen Betrieb angepasst und eingerichtet. In der Regel fertig in unter 48 Stunden.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                ),
              },
              {
                num: "03",
                color: "#22C55E",
                sub: "24 / 7 · rund um die Uhr",
                title: "Ab sofort automatisch",
                desc: "Dein Assistent beantwortet Kundenanfragen rund um die Uhr. Jede Konversation siehst du live mit.",
                icon: (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
                  </svg>
                ),
              },
            ] as { num: string; color: string; sub: string; title: string; desc: string; icon: React.ReactNode }[]).map((step, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 36, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: appleEase } } }}
                whileHover={{ y: -4, boxShadow: isDark ? "0 20px 48px rgba(0,0,0,0.35)" : "0 20px 48px rgba(15,23,42,0.1)" }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                style={{
                  position: "relative", overflow: "hidden",
                  borderRadius: "22px", padding: "32px 28px 28px",
                  background: isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF",
                  border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.07)",
                  boxShadow: isDark ? "none" : "0 4px 24px rgba(15,23,42,0.05)",
                  borderTop: `3px solid ${step.color}`,
                  cursor: "default",
                }}
              >
                {/* Step number watermark */}
                <div style={{
                  position: "absolute", top: "-8px", right: "20px",
                  fontSize: "88px", fontWeight: 900, lineHeight: 1, letterSpacing: "-4px",
                  userSelect: "none", pointerEvents: "none",
                  color: isDark ? "rgba(255,255,255,0.03)" : "rgba(15,23,42,0.045)",
                }}>{step.num}</div>

                {/* Icon */}
                <div style={{
                  width: "48px", height: "48px", borderRadius: "14px",
                  background: `${step.color}18`, border: `1px solid ${step.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: "20px",
                }}>
                  {step.icon}
                </div>

                {/* Sub-label */}
                <p style={{ color: step.color, fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.8px", textTransform: "uppercase", margin: "0 0 8px" }}>
                  {step.sub}
                </p>

                {/* Title */}
                <h3 style={{ color: c.text, fontSize: "19px", fontWeight: 800,
                  margin: "0 0 12px", letterSpacing: "-0.03em" }}>
                  {step.title}
                </h3>

                {/* Description */}
                <p style={{ color: c.text2, fontSize: "14px", lineHeight: 1.68, margin: 0 }}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: appleEase, delay: 0.3 }}
            style={{ textAlign: "center", marginTop: "52px" }}
          >
            <motion.a
              href={(() => { const raw = process.env.NEXT_PUBLIC_CALENDLY_URL ?? ""; if (!raw) return "mailto:info@nilogik.de"; return raw.startsWith("http") ? raw : `https://${raw}`; })()}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2, boxShadow: "0 16px 36px rgba(14,165,233,0.38)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)",
                color: "#FFFFFF", padding: "14px 34px", borderRadius: "9999px",
                fontWeight: 700, fontSize: "15px", textDecoration: "none",
                boxShadow: "0 8px 24px rgba(14,165,233,0.28)",
                letterSpacing: "-0.01em",
              }}
            >
              Kostenloses Gespräch buchen →
            </motion.a>
          </motion.div>

        </div>
      </section>

      {/* ── STATS BLOCK ── */}
      <section style={{
        padding: "72px 24px 64px",
        background: isDark
          ? "linear-gradient(to bottom, #07101e 0%, #0A1628 100%)"
          : "linear-gradient(to bottom, #E8F2FF 0%, #EEF2F7 100%)",
        transition: "background 0.3s ease",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, ease: appleEase }}
            style={{ textAlign: "center", color: "#0EA5E9", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", marginBottom: "40px" }}
          >
            ERGEBNISSE DIE ZÄHLEN
          </motion.p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
          }}>
            {[
              {
                value: "45–90",
                unit: "Min/Tag",
                label: "Zeitersparnis",
                detail: "Weniger Verwaltung, mehr Zeit für dein eigentliches Handwerk",
                color: "#0EA5E9",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0EA5E9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                ),
              },
              {
                value: "< 48",
                unit: "Stunden",
                label: "Bis du startklar bist",
                detail: "Von unserem ersten Gespräch bis dein Assistent läuft",
                color: "#38BDF8",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                  </svg>
                ),
              },
              {
                value: "30",
                unit: "Tage",
                label: "Geld-zurück-Garantie",
                detail: "Kein Risiko. Wenn du nicht zufrieden bist, bekommst du jeden Cent zurück",
                color: "#22C55E",
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
              },
            ].map((stat, i) => (
              <motion.div key={stat.label}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: appleEase, delay: i * 0.1 }}
                style={{
                  background: isDark ? "rgba(255,255,255,0.04)" : "#FFFFFF",
                  border: isDark
                    ? `1px solid rgba(255,255,255,0.10)`
                    : `1px solid rgba(15,23,42,0.08)`,
                  borderTop: isDark
                    ? `2px solid ${stat.color}55`
                    : `3px solid ${stat.color}`,
                  borderRadius: "16px", padding: "28px 26px",
                  boxShadow: isDark
                    ? `0 0 0 0 transparent, 0 8px 32px rgba(0,0,0,0.25)`
                    : "0 4px 24px rgba(15,23,42,0.07)",
                  transition: "background 0.3s, border 0.3s",
                }}
              >
                {/* Icon + Label row */}
                <div style={{ display: "flex", alignItems: "center", gap: "9px", marginBottom: "18px" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "8px",
                    background: isDark ? "rgba(255,255,255,0.06)" : `${stat.color}14`,
                    border: `1px solid ${stat.color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}>{stat.icon}</div>
                  <span style={{
                    fontSize: "11px", fontWeight: 700,
                    color: stat.color,
                    letterSpacing: "0.8px",
                  }}>
                    {stat.label.toUpperCase()}
                  </span>
                </div>

                {/* Big number */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "12px" }}>
                  <span style={{
                    fontSize: "50px", fontWeight: 700, letterSpacing: "-0.04em", lineHeight: 1,
                    color: stat.color,
                  }}>
                    {stat.value}
                  </span>
                  <span style={{ fontSize: "14px", fontWeight: 600, color: stat.color, letterSpacing: "0.02em", opacity: 0.8 }}>
                    {stat.unit}
                  </span>
                </div>

                {/* Divider */}
                <div style={{
                  height: "1px",
                  background: isDark ? "rgba(255,255,255,0.07)" : "rgba(15,23,42,0.07)",
                  marginBottom: "12px",
                }} />

                <p style={{
                  fontSize: "13px",
                  color: isDark ? "rgba(255,255,255,0.55)" : "#64748B",
                  lineHeight: 1.65, margin: 0,
                }}>{stat.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              style={{ color: "#0EA5E9", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", marginBottom: "12px" }}>
              <AnimText langKey={`label-${lang}`}>{t.showcase.label}</AnimText>
            </motion.p>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: appleEase } } }}
              style={{ fontSize: "clamp(30px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.045em", color: c.text }}>
              <AnimText langKey={`sh2-${lang}`}>{t.showcase.headline}</AnimText>
            </motion.h2>
            {lang === "de" && (
              <motion.h2 variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: appleEase, delay: 0.1 } } }}
                style={{ fontSize: "clamp(14px, 2vw, 17px)", fontWeight: 500, letterSpacing: "-0.01em", color: c.text2, marginTop: "14px" }}>
                KI-Automatisierung für Betriebe in München, Augsburg und ganz Bayern
              </motion.h2>
            )}
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px", alignItems: "center" }}>
            <motion.div initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 1, ease: appleEase, delay: 0.1 }}>
              <h3 style={{ fontSize: "24px", marginBottom: "18px", fontWeight: 700, letterSpacing: "-0.03em" }}>
                <AnimText langKey={`sh3-${lang}`}>{t.showcase.h3}</AnimText>
              </h3>
              <p style={{ color: c.text2, fontSize: "16px", lineHeight: 1.72, marginBottom: "32px" }}>
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
              style={{ color: "#0EA5E9", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", marginBottom: "12px" }}>
              <AnimText langKey={`srv-label-${lang}`}>{s.srvLabel}</AnimText>
            </motion.p>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 24, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: appleEase } } }}
              style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, letterSpacing: "-0.045em", color: c.text }}>
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
                <h3 style={{ fontSize: "20px", fontWeight: 800, letterSpacing: "-0.03em", color: c.text, marginBottom: "12px" }}>
                  {card.title}
                </h3>
                <p style={{ color: c.text2, fontSize: "15px", lineHeight: 1.72 }}>
                  {card.text[lang] ?? card.text["de"]}
                </p>
                <div style={{ marginTop: "24px" }}>
                  <motion.a
                    href={(() => { const raw = process.env.NEXT_PUBLIC_CALENDLY_URL ?? ""; if (!raw) return "mailto:info@nilogik.de"; return raw.startsWith("http") ? raw : `https://${raw}`; })()}
                    target="_blank" rel="noopener noreferrer"
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
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            style={{ textAlign: "center", marginBottom: "64px" }}>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: appleEase } } }}
              style={{ color: "#0EA5E9", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", marginBottom: "12px" }}>
              <AnimText langKey={`faq-label-${lang}`}>{s.faqLabel}</AnimText>
            </motion.p>
            <motion.h2 variants={{ hidden: { opacity: 0, y: 24, filter: "blur(6px)" }, visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: appleEase } } }}
              style={{ fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 800, letterSpacing: "-0.045em", color: c.text }}>
              <AnimText langKey={`faq-hl-${lang}`}>{s.faqHl}</AnimText>
            </motion.h2>
          </motion.div>

          <FAQList items={faqItems[lang] ?? faqItems["de"]} isDark={isDark} />
        </div>
      </section>

      {/* ── PREISE ── */}
      <section id="preise" style={{ padding: "100px 20px", background: isDark ? "#07101e" : "#EEF2F7", transition: "background 0.3s ease" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
            style={{ textAlign: "center", marginBottom: "44px" }}>
            <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: appleEase } } }}
              style={{ color: "#0EA5E9", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", marginBottom: "12px" }}>
              PREISE
            </motion.p>
            <motion.h2 variants={{ hidden: { opacity: 0, scale: 0.94, y: 24 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease: appleEase } } }}
              style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.04em", marginBottom: "14px", color: c.text }}>
              Einfach. Fair. Transparent.
            </motion.h2>
            <motion.p variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: appleEase } } }}
              style={{ color: c.text2, fontSize: "15px", maxWidth: "460px", margin: "0 auto", lineHeight: 1.65 }}>
              Monatlich kündbar. Keine versteckten Kosten. 30 Tage Geld-zurück-Garantie.
            </motion.p>
          </motion.div>

          {/* Billing Toggle */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "40px" }}>
            <div style={{ display: "inline-flex", background: isDark ? "rgba(255,255,255,0.07)" : "#DDE3EC", borderRadius: "99px", padding: "4px", gap: "2px" }}>
              {(["monthly", "yearly"] as const).map(b => (
                <button key={b} onClick={() => setPriceBilling(b)} style={{
                  padding: "10px 22px", borderRadius: "99px", border: "none",
                  cursor: "pointer", fontWeight: 600, fontSize: "14px", fontFamily: "inherit",
                  background: priceBilling === b ? (isDark ? "#0EA5E9" : "#0F172A") : "transparent",
                  color: priceBilling === b ? "#FFFFFF" : c.text2,
                  transition: "all 0.25s ease",
                }}>
                  {b === "monthly" ? "Monatlich" : "Jährlich"}
                  {b === "yearly" && (
                    <span style={{ marginLeft: "7px", background: "rgba(34,197,94,0.15)", color: "#22C55E", fontSize: "11px", fontWeight: 700, padding: "2px 7px", borderRadius: "99px" }}>
                      −20%
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Cards */}
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: "16px", alignItems: "stretch" }}>
            {([
              { name: "Starter",    price: 39   as number | null, setup: 0,   tag: null,               features: ["1 KI-Assistent", "bis zu 100 Anfragen/Monat", "14 Tage kostenlos testen"] },
              { name: "Basic",      price: 89   as number | null, setup: 149, tag: null,               features: ["1 KI-Assistent", "bis zu 500 Anfragen/Monat", "E-Mail-Integration"] },
              { name: "Pro",        price: 199  as number | null, setup: 249, tag: "Beliebteste Wahl", features: ["3 KI-Assistenten", "bis zu 3.000 Anfragen/Monat", "WhatsApp, Web & Instagram"] },
              { name: "Enterprise", price: null as number | null, setup: 399, tag: null,               features: ["Unbegrenzte KI-Assistenten", "Unbegrenzte Anfragen", "Custom API & Integrationen"] },
            ]).map((plan, i) => {
              const isPro = plan.name === "Pro";
              const mp = plan.price !== null
                ? (plan.name === "Starter" ? plan.price : (priceBilling === "yearly" ? Math.round(plan.price * 0.8) : plan.price))
                : null;

              return (
                <motion.div key={plan.name}
                  initial={{ opacity: 0, y: 36 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.75, ease: appleEase, delay: i * 0.1 }}
                  style={{
                    background: isPro ? "linear-gradient(145deg, #0D1F3C 0%, #08152A 100%)" : c.card,
                    border: `1.5px solid ${isPro ? "rgba(14,165,233,0.4)" : c.border}`,
                    borderRadius: "24px", padding: "30px 24px",
                    display: "flex", flexDirection: "column", position: "relative",
                    boxShadow: isPro
                      ? "0 32px 80px rgba(8,21,42,0.35), 0 0 0 1px rgba(14,165,233,0.3)"
                      : "0 4px 20px rgba(15,23,42,0.06)",
                  }}
                >
                  {plan.tag && (
                    <div style={{
                      position: "absolute", top: "16px", right: "16px",
                      background: "linear-gradient(135deg, #0EA5E9, #0284C7)",
                      color: "#fff", fontSize: "11px", fontWeight: 700,
                      padding: "4px 11px", borderRadius: "22px",
                    }}>{plan.tag}</div>
                  )}

                  <div style={{ fontSize: "18px", fontWeight: 700, marginBottom: "18px", color: isPro ? "#fff" : c.text }}>
                    {plan.name}
                  </div>

                  {/* Price */}
                  {mp !== null ? (
                    <div style={{ display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "6px" }}>
                      <span style={{ fontSize: "16px", fontWeight: 700, color: isPro ? "rgba(255,255,255,0.6)" : c.text2 }}>€</span>
                      <span style={{ fontSize: "50px", fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1, color: isPro ? "#fff" : c.text }}>{mp}</span>
                      <span style={{ fontSize: "14px", color: isPro ? "rgba(255,255,255,0.5)" : c.text3 }}>/Mo.</span>
                    </div>
                  ) : (
                    <div style={{ fontSize: "28px", fontWeight: 900, color: isPro ? "#fff" : c.text, marginBottom: "6px" }}>Individuell</div>
                  )}
                  <div style={{ fontSize: "12px", color: isPro ? "rgba(255,255,255,0.4)" : c.text3, marginBottom: "22px" }}>
                    {plan.setup === 0 ? "✓ Keine Einrichtungsgebühr" : `+ einmalig €${plan.setup} Einrichtung`}
                  </div>

                  {/* Features */}
                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 26px 0", flex: 1 }}>
                    {plan.features.map(f => (
                      <li key={f} style={{
                        display: "flex", alignItems: "flex-start", gap: "8px",
                        padding: "8px 0",
                        borderBottom: `1px solid ${isPro ? "rgba(255,255,255,0.07)" : c.border}`,
                        fontSize: "13px", color: isPro ? "rgba(255,255,255,0.82)" : c.text,
                      }}>
                        <span style={{ color: "#0EA5E9", fontWeight: 700, flexShrink: 0, marginTop: "1px" }}>✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <motion.button
                    onClick={() => setShowCtaModal(true)}
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    style={{
                      width: "100%", padding: "13px 20px", borderRadius: "12px",
                      background: isPro
                        ? "linear-gradient(135deg, #0EA5E9, #0284C7)"
                        : isDark ? "rgba(14,165,233,0.12)" : "#0F172A",
                      color: isPro ? "#fff" : isDark ? "#0EA5E9" : "#fff",
                      border: isPro ? "none" : isDark ? "1px solid rgba(14,165,233,0.3)" : "none",
                      fontWeight: 700, fontSize: "14px", cursor: "pointer", fontFamily: "inherit",
                      boxShadow: isPro ? "0 8px 24px rgba(14,165,233,0.4)" : "none",
                    }}
                  >
                    {plan.name === "Enterprise" ? "Angebot anfragen" : plan.name === "Starter" ? "Kostenlos starten" : "Jetzt starten"} →
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

          {/* Link to full pricing page */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ textAlign: "center", marginTop: "32px" }}>
            <a href="/preise" style={{ color: "#0EA5E9", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
              Alle Details & Feature-Vergleich ansehen →
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── PLAN FINDER ── */}
      <PlanFinder isDark={isDark} c={c} onOpenModal={() => setShowCtaModal(true)} />

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
              style={{ color: "#0EA5E9", fontSize: "11px", fontWeight: 700, letterSpacing: "2.5px", marginBottom: "12px" }}>
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

      {/* ── KONTAKT MODAL ── */}
      <div id="kontakt" />

      {/* Backdrop */}
      <AnimatePresence>
        {showCtaModal && (
          <motion.div
            key="cta-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowCtaModal(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 800,
              background: "rgba(8,21,42,0.72)",
              backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Modal sheet — slides up from bottom */}
      <motion.section
        initial={{ y: "100%" }}
        animate={{ y: showCtaModal ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 280, damping: 32 }}
        style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          height: "92vh", overflowY: "auto", overscrollBehavior: "contain",
          zIndex: 900, borderRadius: "28px 28px 0 0",
          background: c.contactBg, textAlign: "center",
          pointerEvents: showCtaModal ? "auto" : "none",
          transition: "background 0.3s ease",
        }}
      >
        {/* Sticky header with close button */}
        <div style={{
          position: "sticky", top: 0, zIndex: 10,
          background: c.contactBg, transition: "background 0.3s ease",
          padding: "14px 20px 10px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          borderBottom: `1px solid ${c.border}`,
          borderRadius: "28px 28px 0 0",
        }}>
          <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "2px", color: "#0EA5E9" }}>
            ERSTE SCHRITTE
          </span>
          <motion.button
            onClick={() => setShowCtaModal(false)}
            whileHover={{ scale: 1.1, background: "rgba(15,23,42,0.12)" }}
            whileTap={{ scale: 0.92 }}
            style={{
              width: "32px", height: "32px", borderRadius: "50%",
              background: "rgba(15,23,42,0.07)", border: "none",
              cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "15px", color: c.text2, fontFamily: "inherit",
            }}
          >✕</motion.button>
        </div>

        <div style={{ maxWidth: "620px", margin: "0 auto", padding: "60px 20px 80px" }}>

          {/* Header */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
            style={{ marginBottom: "48px" }}>
            <motion.h2 variants={{ hidden: { opacity: 0, scale: 0.92, y: 24, filter: "blur(6px)" },
              visible: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: appleEase } } }}
              style={{ fontSize: "clamp(28px, 4vw, 38px)", fontWeight: 700, letterSpacing: "-0.04em", marginBottom: "18px", color: c.text }}>
              Bereit loszulegen?
            </motion.h2>
            <motion.p variants={{ hidden: { opacity: 0, y: 18, filter: "blur(4px)" },
              visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: appleEase } } }}
              style={{ color: c.text2, fontSize: "16px", lineHeight: 1.65, maxWidth: "480px", margin: "0 auto" }}>
              Buche ein kostenloses 20-Minuten-Gespräch. Wir schauen uns gemeinsam an, was für dein Unternehmen automatisiert werden kann.
            </motion.p>
          </motion.div>

          {/* PRIMARY CTA: Calendly */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: appleEase }}
            style={{ marginBottom: "56px" }}
          >
            <motion.a
              href={(() => {
                const raw = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
                if (!raw) return "mailto:info@nilogik.de";
                return raw.startsWith("http") ? raw : `https://${raw}`;
              })()}
              target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: "0 24px 60px rgba(14,165,233,0.38), 0 8px 24px rgba(15,23,42,0.18)" }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
              style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                background: "linear-gradient(135deg, #0F172A 0%, #1E3A5F 100%)",
                color: "#FFFFFF",
                padding: "18px 44px", borderRadius: "9999px",
                fontWeight: 700, fontSize: "16px",
                textDecoration: "none",
                boxShadow: "0 12px 36px rgba(15,23,42,0.22), inset 0 1px 0 rgba(255,255,255,0.1)",
                letterSpacing: "0.2px",
              }}
            >
              <span style={{ fontSize: "20px" }}>📅</span>
              Kostenloses Erstgespräch buchen
            </motion.a>
            <p style={{ color: c.text3, fontSize: "12px", marginTop: "14px", letterSpacing: "0.3px" }}>
              Kein Risiko · Kostenlos · Nur 20 Minuten
            </p>
          </motion.div>

          {/* Process steps */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: appleEase, delay: 0.1 }}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: "20px",
              marginBottom: "60px",
            }}
          >
            {[
              { step: "1", emoji: "💬", title: "Gespräch", text: "Wir lernen dein Unternehmen kennen und analysieren Automatisierungspotenziale." },
              { step: "2", emoji: "📋", title: "Konzept", text: "Du erhältst einen konkreten Plan mit klarem Zeitrahmen und transparenten Kosten." },
              { step: "3", emoji: "🚀", title: "Live in 48h", text: "Wir richten alles ein. Du sparst sofort Zeit und kannst dich aufs Wesentliche konzentrieren." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: appleEase, delay: i * 0.1 }}
                style={{
                  background: c.card,
                  border: `1px solid ${c.border}`,
                  borderRadius: "20px", padding: "28px 22px",
                  boxShadow: "0 4px 20px rgba(15,23,42,0.05)",
                  transition: "background 0.3s",
                  position: "relative",
                }}
              >
                <div style={{
                  position: "absolute", top: "-14px", left: "50%", transform: "translateX(-50%)",
                  width: "28px", height: "28px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #0EA5E9 0%, #0D1F3C 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "12px", fontWeight: 800, color: "#FFFFFF",
                  boxShadow: "0 4px 12px rgba(14,165,233,0.35)",
                }}>{item.step}</div>
                <div style={{ fontSize: "28px", marginBottom: "12px", marginTop: "8px" }}>{item.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: "15px", color: c.text, marginBottom: "8px" }}>{item.title}</div>
                <div style={{ fontSize: "13px", color: c.text2, lineHeight: 1.6 }}>{item.text}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Secondary contact options */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: appleEase, delay: 0.15 }}
          >
            <p style={{ color: c.text3, fontSize: "13px", marginBottom: "20px", letterSpacing: "0.3px" }}>
              Oder direkt melden:
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
              {/* Telefon */}
              <motion.a href="tel:+4915129436338"
                whileHover={{ scale: 1.03, boxShadow: "0 20px 50px rgba(0,0,0,0.07)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center",
                  background: c.card, border: `1px solid ${c.border}`,
                  padding: "18px 28px", borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(15,23,42,0.04)", textDecoration: "none", minWidth: "160px",
                  transition: "background 0.3s" }}>
                <span style={{ color: c.text3, fontSize: "11px", marginBottom: "6px", letterSpacing: "1.2px", fontWeight: 600 }}>
                  {t.contact.phoneLabel}
                </span>
                <span style={{ color: "#0EA5E9", fontSize: "17px", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  0151 29436338
                </span>
              </motion.a>

              {/* E-Mail */}
              <motion.a href="mailto:info@nilogik.de"
                whileHover={{ scale: 1.03, boxShadow: "0 20px 50px rgba(0,0,0,0.07)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center",
                  background: c.card, border: `1px solid ${c.border}`,
                  padding: "18px 28px", borderRadius: "16px",
                  boxShadow: "0 4px 20px rgba(15,23,42,0.04)", textDecoration: "none", minWidth: "160px",
                  transition: "background 0.3s" }}>
                <span style={{ color: c.text3, fontSize: "11px", marginBottom: "6px", letterSpacing: "1.2px", fontWeight: 600 }}>
                  {t.contact.emailLabel}
                </span>
                <span style={{ color: "#0EA5E9", fontSize: "17px", fontWeight: 700, letterSpacing: "-0.02em" }}>
                  info@nilogik.de
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
        </div>
      </motion.section>

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

      {/* ── THEME TRANSITION RIPPLE ── */}
      <AnimatePresence>
        {themeOverlay && (
          <motion.div
            key={themeOverlay.id}
            initial={{
              clipPath: `circle(0px at ${themeOverlay.x}px ${themeOverlay.y}px)`,
              opacity: 1,
            }}
            animate={{
              clipPath: `circle(250vmax at ${themeOverlay.x}px ${themeOverlay.y}px)`,
              opacity: 0,
            }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 9999,
              pointerEvents: "none",
              // dark→light = weißer Strahl, light→dark = blauer Strahl
              background: themeOverlay.toDark
                ? `radial-gradient(circle at ${themeOverlay.x}px ${themeOverlay.y}px, rgba(56,189,248,0.95) 0%, rgba(14,165,233,0.55) 12%, rgba(14,165,233,0.2) 32%, transparent 62%)`
                : `radial-gradient(circle at ${themeOverlay.x}px ${themeOverlay.y}px, rgba(255,255,255,0.98) 0%, rgba(220,240,255,0.6) 12%, rgba(200,225,255,0.2) 32%, transparent 62%)`,
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
