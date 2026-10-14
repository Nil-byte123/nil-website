"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import { EINWILLIGUNG_EVENT, EINWILLIGUNG_KEY } from "./einwilligung";

interface Props {
  nonce: string;
}

/* Google Analytics wird NUR geladen, wenn der Besucher im Cookie-Banner
   „Alle akzeptieren“ gewählt hat (§ 25 TDDDG). Widerruft er später
   über „Cookie-Einstellungen“, wird das Tracking sofort abgeschaltet
   und die GA-Cookies werden gelöscht.                                */

function abonnieren(neu: () => void) {
  window.addEventListener(EINWILLIGUNG_EVENT, neu);
  window.addEventListener("storage", neu);
  return () => {
    window.removeEventListener(EINWILLIGUNG_EVENT, neu);
    window.removeEventListener("storage", neu);
  };
}

function hatEingewilligt(): boolean {
  try {
    return localStorage.getItem(EINWILLIGUNG_KEY) === "accepted";
  } catch {
    return false;
  }
}

export default function GoogleAnalytics({ nonce }: Props) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const erlaubt = useSyncExternalStore(abonnieren, hatEingewilligt, () => false);

  // Widerruf: Tracking abschalten und GA-Cookies entfernen
  useEffect(() => {
    if (!GA_ID) return;
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !erlaubt;
    if (!erlaubt) {
      const domain = window.location.hostname.replace(/^www\./, "");
      document.cookie.split(";").forEach((c) => {
        const name = c.split("=")[0].trim();
        if (name.startsWith("_ga")) {
          document.cookie = `${name}=; Max-Age=0; path=/`;
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
        }
      });
    }
  }, [GA_ID, erlaubt]);

  if (!GA_ID || !erlaubt) return null;

  return (
    <>
      {/* External GTM/GA loader — nonce allows execution under strict CSP */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
        nonce={nonce}
      />
      {/* Inline initialisation — nonce required when unsafe-inline is not present */}
      <Script id="google-analytics" strategy="afterInteractive" nonce={nonce}>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
