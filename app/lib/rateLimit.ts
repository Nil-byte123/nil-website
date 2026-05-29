/**
 * Simple in-memory rate limiter.
 * Works per serverless instance – good enough to stop casual abuse.
 */

const store = new Map<string, number[]>();

/**
 * Returns true if the request is allowed, false if rate-limited.
 * @param key   Unique key (e.g. "chat:1.2.3.4")
 * @param limit Max requests allowed in the window
 * @param windowMs Time window in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const timestamps = (store.get(key) ?? []).filter(t => now - t < windowMs);

  if (timestamps.length >= limit) return false;

  timestamps.push(now);
  store.set(key, timestamps);

  // Prevent memory leak – prune stale entries when store grows large
  if (store.size > 2000) {
    for (const [k, v] of store) {
      if (!v.some(t => now - t < windowMs)) store.delete(k);
    }
  }

  return true;
}

/** Extract the real client IP from the request. */
export function getIP(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return "unknown";
}

/** Sanitize a string for safe insertion into HTML email bodies. */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\//g, "&#x2F;");
}

/** Validate an email address format. */
export function isValidEmail(email: string): boolean {
  return /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(email);
}

/** Strip control characters and trim a string. */
export function sanitizeText(str: unknown, maxLen: number): string {
  if (typeof str !== "string") return "";
  return str.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "").trim().slice(0, maxLen);
}
