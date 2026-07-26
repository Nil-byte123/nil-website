import { NextRequest, NextResponse } from "next/server";

/* ---- Config --------------------------------------------------- */
const ALLOWED_ORIGINS = [
  "https://www.nilogik.de",
  "https://nilogik.de",
];

const ALLOWED_HOSTS = [
  "www.nilogik.de",
  "nilogik.de",
];

const MAX_BODY_BYTES = 32_000;

// Known attack-tool User-Agent signatures
const BLOCKED_UA = [
  /sqlmap/i, /nikto/i, /nessus/i, /masscan/i, /zgrab/i,
  /nuclei/i, /dirbuster/i, /hydra/i, /nmap/i, /acunetix/i,
  /burpsuite/i, /metasploit/i, /w3af/i, /openvas/i, /zap/i,
];

/* ---- Nonce helpers (Edge-safe, no Buffer / Node crypto) ------- */

function generateNonce(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  // btoa + String.fromCharCode: pure Web API, works in Edge runtime
  return btoa(String.fromCharCode(...Array.from(bytes)));
}

/** Build a per-request CSP string that includes the nonce.
 *  Modern browsers (CSP3): unsafe-inline is ignored when a nonce is present.
 *  Legacy browsers: unsafe-inline still works as fallback. */
function buildPageCsp(nonce: string): string {
  return [
    "default-src 'self'",
    // nonce-based: modern browsers require the nonce; unsafe-inline is the legacy fallback.
    // Nur noch Google Analytics als externe Skriptquelle (Stripe/Calendly entfernt — nicht genutzt).
    `script-src 'self' 'nonce-${nonce}' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com`,
    `script-src-elem 'self' 'nonce-${nonce}' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com`,
    "style-src 'self' 'unsafe-inline'",
    "style-src-elem 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data: blob: https:",
    "media-src 'self'",
    "object-src 'none'",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    // Mailchimp wird serverseitig aufgerufen — der Browser verbindet sich nie dorthin, daher raus.
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
    // Nichts wird eingebettet — keine Fremd-Frames mehr erlaubt.
    "frame-src 'self'",
    "frame-ancestors 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");
}

/* ---- Helpers -------------------------------------------------- */
function jsonHeaders() {
  return { "Content-Type": "application/json" };
}

function json403() {
  return new NextResponse(
    JSON.stringify({ error: "Forbidden." }),
    { status: 403, headers: jsonHeaders() }
  );
}

/* ---- Middleware ----------------------------------------------- */
export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProd = process.env.NODE_ENV === "production";

  /* ===== Page routes: inject CSP nonce ========================= */
  if (!pathname.startsWith("/api/")) {
    const nonce = generateNonce();
    const csp   = buildPageCsp(nonce);

    // Pass nonce to Server Components via request header (NOT to browser)
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("x-nonce", nonce);

    const res = NextResponse.next({ request: { headers: requestHeaders } });
    // Set CSP on the response so browsers enforce it
    res.headers.set("Content-Security-Policy", csp);
    return res;
  }

  /* ===== API routes: security gate ============================= */

  // 1. Block known attack-tool User-Agents
  const ua = req.headers.get("user-agent") ?? "";
  if (BLOCKED_UA.some(p => p.test(ua))) {
    return json403();
  }

  // 2. Reject oversized payloads (Content-Length check — stops obvious abuse)
  const cl = req.headers.get("content-length");
  if (cl && parseInt(cl, 10) > MAX_BODY_BYTES) {
    return new NextResponse(
      JSON.stringify({ error: "Anfrage zu groß." }),
      { status: 413, headers: jsonHeaders() }
    );
  }

  // 3. Production-only checks
  if (isProd) {
    // 3a. Host-header validation — blocks DNS-rebinding attacks
    const hostname = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
    if (!ALLOWED_HOSTS.includes(hostname)) {
      return json403();
    }

    // 3b. Origin check — if present, must be our domain
    const origin = req.headers.get("origin");
    if (origin && !ALLOWED_ORIGINS.includes(origin)) {
      return json403();
    }
    // If no Origin header, fall back to Referer
    if (!origin) {
      const referer = req.headers.get("referer") ?? "";
      const ok = !referer || ALLOWED_ORIGINS.some(o => referer.startsWith(o));
      if (!ok) return json403();
    }

    // 3c. Fetch Metadata (CSP3 / Fetch Metadata spec)
    //     Only block explicit bad values; missing header = non-browser client = ok
    const site = req.headers.get("sec-fetch-site");
    if (site === "cross-site") return json403();

    const dest = req.headers.get("sec-fetch-dest");
    if (dest && dest !== "empty") return json403();

    const mode = req.headers.get("sec-fetch-mode");
    if (mode === "no-cors") return json403();
  }

  // 4. Only POST + OPTIONS allowed on API routes
  if (req.method !== "POST" && req.method !== "OPTIONS") {
    return new NextResponse(
      JSON.stringify({ error: "Method not allowed." }),
      { status: 405, headers: jsonHeaders() }
    );
  }

  // 5. POST must carry application/json
  if (req.method === "POST") {
    const ct = req.headers.get("content-type") ?? "";
    if (!ct.includes("application/json")) {
      return new NextResponse(
        JSON.stringify({ error: "Content-Type muss application/json sein." }),
        { status: 415, headers: jsonHeaders() }
      );
    }
  }

  // 6. Prevent CDN / proxy caching of API responses
  const res = NextResponse.next();
  res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.headers.set("Pragma", "no-cache");
  return res;
}

export const config = {
  matcher: [
    // API routes (security checks)
    "/api/:path*",
    // All page routes except Next.js internals and static assets
    "/((?!_next/static|_next/image|favicon\\.ico|manifest\\.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|eot|otf|css|js|map|json)$).*)",
  ],
};
