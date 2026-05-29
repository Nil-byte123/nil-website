"use client";

import Script from "next/script";

interface Props {
  nonce: string;
}

export default function GoogleAnalytics({ nonce }: Props) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!GA_ID) return null;

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
