import type { NextConfig } from "next";

/**
 * Static security headers applied to every response (including static assets).
 * Content-Security-Policy is intentionally NOT here — it is generated
 * dynamically per request by middleware.ts (with a per-request nonce).
 */
const securityHeaders = [
  // Prevent browsers from DNS-prefetching across origins
  { key: "X-DNS-Prefetch-Control",            value: "on" },
  // Disallow loading by 3rd-party plugins (Flash, PDF readers, …)
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  // Prevent clickjacking
  { key: "X-Frame-Options",                   value: "SAMEORIGIN" },
  // Stop MIME-type sniffing
  { key: "X-Content-Type-Options",            value: "nosniff" },
  // Legacy XSS filter (still respected by IE / old Edge)
  { key: "X-XSS-Protection",                  value: "1; mode=block" },
  // Don't leak the full URL as Referer
  { key: "Referrer-Policy",                   value: "strict-origin-when-cross-origin" },
  // Disable every sensor / API that isn't needed
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "interest-cohort=()",
      "browsing-topics=()",
      "attribution-reporting=()",
      "identity-credentials-get=()",
      "private-state-token-issuance=()",
      "private-state-token-redemption=()",
    ].join(", "),
  },
  // Force HTTPS for 2 years, include subdomains, allow preload
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Prevent cross-origin window sharing
  { key: "Cross-Origin-Opener-Policy",   value: "same-origin" },
  // Prevent cross-origin resource loading without explicit CORS
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false, // removes "X-Powered-By: Next.js" from every response

  async redirects() {
    return [
      {
        source:      "/:path*",
        has:         [{ type: "host", value: "nilogik.com" }],
        destination: "https://www.nilogik.de/:path*",
        permanent:   true,
      },
      {
        source:      "/:path*",
        has:         [{ type: "host", value: "www.nilogik.com" }],
        destination: "https://www.nilogik.de/:path*",
        permanent:   true,
      },
    ];
  },

  async headers() {
    return [
      {
        source:  "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  images: {
    formats:     ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
};

export default nextConfig;
