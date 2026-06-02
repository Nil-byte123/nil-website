/**
 * Security utilities:
 * - In-memory rate limiter with progressive blocking
 * - IP extractor (supports Cloudflare, Vercel, reverse proxies)
 * - HTML escaper for email output
 * - Email validator + throwaway-domain blocker
 * - Text sanitizer (control chars + unicode spoofing chars)
 * - Prompt-injection detector
 * - Log sanitizer (CRLF injection prevention)
 * - Privacy-safe key fragment (FNV-1a hash for email-based rate limiting)
 * - Fetch with timeout (prevents hanging external calls)
 */

/* ---- Rate limiter --------------------------------------------- */

interface Entry { timestamps: number[]; blockedUntil: number; violations: number; }
const store = new Map<string, Entry>();

/**
 * Returns true if the request is allowed, false if rate-limited.
 * After 3 consecutive violations the key is hard-blocked for 10 minutes.
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  let entry = store.get(key);
  if (!entry) {
    entry = { timestamps: [], blockedUntil: 0, violations: 0 };
    store.set(key, entry);
  }

  if (entry.blockedUntil > now) return false;

  entry.timestamps = entry.timestamps.filter(t => now - t < windowMs);

  if (entry.timestamps.length >= limit) {
    entry.violations += 1;
    const penaltyMs = entry.violations >= 3 ? 10 * 60_000
                    : entry.violations === 2 ?  5 * 60_000
                    :                            1 * 60_000;
    entry.blockedUntil = now + penaltyMs;
    return false;
  }

  entry.timestamps.push(now);
  if (entry.timestamps.length === 1) entry.violations = 0;

  if (store.size > 5_000) {
    for (const [k, v] of store) {
      if (v.blockedUntil < now && !v.timestamps.some(t => now - t < windowMs)) {
        store.delete(k);
      }
    }
  }

  return true;
}

/* ---- IP extractor --------------------------------------------- */

export function getIP(req: Request): string {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const xri = req.headers.get("x-real-ip");
  if (xri) return xri.trim();
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return "unknown";
}

/* ---- HTML escaper --------------------------------------------- */

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g,  "&amp;")
    .replace(/</g,  "&lt;")
    .replace(/>/g,  "&gt;")
    .replace(/"/g,  "&quot;")
    .replace(/'/g,  "&#39;")
    .replace(/\//g, "&#x2F;");
}

/**
 * Strips CR (0x0D), LF (0x0A) and NUL (0x00) from strings used in email
 * header fields (Subject:, From:, Reply-To:, etc.).
 *
 * Attack prevented — SMTP Header Injection:
 *   name = "Bob\r\nBcc: attacker@evil.com"
 *   → without this fix: Subject: Neue Anfrage von Bob
 *                        Bcc: attacker@evil.com      ← injected!
 *   → with this fix:    Subject: Neue Anfrage von Bob  Bcc: attacker@evil.com
 *                        (the CRLF is gone, the Bcc never becomes a real header)
 */
export function sanitizeForEmailHeader(str: string): string {
  return str.replace(/[\r\n\0]/g, " ").trim();
}

/* ---- Validators ----------------------------------------------- */

export function isValidEmail(email: string): boolean {
  if (typeof email !== "string") return false;
  if (email.length > 254) return false;
  return /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/.test(email);
}

/**
 * Returns true when the email domain belongs to a known throwaway / temp-mail
 * provider. Keeps the list in-module to avoid an external fetch.
 */
const TEMP_DOMAINS = new Set([
  "mailinator.com", "guerrillamail.com", "guerrillamail.info", "guerrillamail.biz",
  "guerrillamail.de", "guerrillamail.net", "guerrillamail.org", "guerrillamailblock.com",
  "sharklasers.com", "spam4.me", "grr.la",
  "10minutemail.com", "10minutemail.net", "10minutemail.org",
  "tempmail.com", "tempmail.net", "tempmail.org", "tempr.email",
  "throwaway.email", "throwam.com",
  "yopmail.com", "yopmail.fr",
  "maildrop.cc", "mailnull.com", "mailsac.com", "mailzilla.com",
  "trashmail.com", "trashmail.me", "trashmail.net", "trashmail.io",
  "trashmail.at", "trashmail.live", "trashmail.xyz",
  "fakeinbox.com", "dispostable.com", "discard.email",
  "spamgourmet.com", "spamgourmet.net", "spamgourmet.org",
  "spamspot.com", "spamex.com", "spam.la",
  "wegwerfmail.de", "wegwerfmail.net", "wegwerfmail.org",
  "anonymbox.com", "antispam.de", "despam.it", "spamtroll.net",
  "tmpmail.org", "tmpmail.net",
  "bobmail.info", "cheatmail.de",
  "jetable.fr.nf", "nomail.xl.cx", "nospam.ze.tc",
  "cool.fr.nf", "moncourrier.fr.nf", "monemail.fr.nf", "monmail.fr.nf",
  "courriel.fr.nf", "mega.zik.dj", "speed.1s.fr",
  "trbvm.com", "mailexpire.com", "uggsrock.com",
  "spamfree24.org", "spamwc.de", "spamwc.ga", "spamwc.gq",
  "spamwc.cf", "spamwc.ml", "spamwc.net",
  "spam.su", "tempinbox.com", "tempinbox.org",
]);

export function isTempEmail(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase();
  return domain ? TEMP_DOMAINS.has(domain) : false;
}

/* ---- Text sanitizer ------------------------------------------- */

// Build the Unicode-spoofing strip regex using code point arithmetic so the
// source file stays pure ASCII -- no invisible chars embedded in string literals.
function cp(n: number): string {
  return String.fromCodePoint(n);
}
// Ranges stripped (explicit code points):
//   U+0000-U+0008, U+000B-U+000C, U+000E-U+001F, U+007F  -- ASCII control
//   U+200B-U+200F  -- zero-width space / ZWNJ / ZWJ / directional marks
//   U+202A-U+202E  -- LTR/RTL embedding & override (BiDi spoofing)
//   U+2060-U+2064  -- word joiner, invisible operators
//   U+2066-U+206F  -- BiDi isolation controls + deprecated format chars
//   U+FEFF         -- BOM / zero-width no-break space
//   U+061C         -- Arabic letter mark
const SANITIZE_RE = new RegExp(
  "[" +
  cp(0x0000) + "-" + cp(0x0008) +
  cp(0x000B) + "-" + cp(0x000C) +
  cp(0x000E) + "-" + cp(0x001F) +
  cp(0x007F) +
  cp(0x200B) + "-" + cp(0x200F) +
  cp(0x202A) + "-" + cp(0x202E) +
  cp(0x2060) + "-" + cp(0x2064) +
  cp(0x2066) + "-" + cp(0x206F) +
  cp(0xFEFF) +
  cp(0x061C) +
  "]",
  "g"
);

/**
 * Strips ASCII control characters, Unicode direction-override / zero-width
 * spoofing characters, and BOM; then trims whitespace and enforces max length.
 */
export function sanitizeText(str: unknown, maxLen: number): string {
  if (typeof str !== "string") return "";
  return str
    .replace(SANITIZE_RE, "")
    .trim()
    .slice(0, maxLen);
}

/* ---- Name validator ------------------------------------------- */

/**
 * Returns true when the string looks like a plain human name.
 * Rejects values that contain HTML tags, script patterns, or are suspiciously
 * long runs of punctuation.
 */
export function isValidName(name: string): boolean {
  if (name.length < 2 || name.length > 100) return false;
  // Reject if it contains angle brackets, script markers, or template syntax
  if (/<[^>]*>/.test(name))       return false; // HTML tags
  if (/[{}\[\]\\]/.test(name))    return false; // template / code chars
  if (/javascript:/i.test(name))  return false; // JS URI
  if (/on\w+\s*=/i.test(name))    return false; // event handler attrs
  // Reject strings that are mostly punctuation / symbols (> 50 % non-letter)
  const letters = (name.match(/\p{L}/gu) ?? []).length;
  if (letters / name.length < 0.4) return false;
  return true;
}

/* ---- Prompt-injection detector -------------------------------- */

/**
 * Returns true when the text appears to contain a prompt-injection attempt.
 *
 * Covers:
 *  - Classic English instruction overrides
 *  - German instruction overrides
 *  - Role-hijacking / persona replacement
 *  - Roleplay / indirect injection ("imagine you are…")
 *  - Raw LLM template markers ([INST], <<SYS>>, …)
 *  - DAN and common named jailbreaks
 *  - Fake conversation-turn injection
 *  - System-prompt extraction requests (EN + DE)
 */
const INJECTION_PATTERNS: RegExp[] = [

  // ══ ENGLISH — Instruction overrides ════════════════════════════
  // Broad verb × target matrix.
  // Verbs: ignore/forget/bypass/cancel/delete/clear/reset/erase/drop/remove/
  //        dismiss/neutralize/nullify/suppress/deactivate/abandon/disable.
  // Targets: instructions/rules/guidelines/directives/constraints/limitations/
  //          context/programming/configuration/prompt/restrictions.
  // Optional modifiers: all/previous/prior/your/the/alle/vorherigen/früheren.
  /(?:ignore|forget|disregard|override|bypass|dismiss|cancel|delete|remove|drop|clear|reset|erase|neutralize|nullify|suppress|deactivate|abandon|disable)\s+(?:alle?\s+)?(?:(?:previous|prior|your|the|all|alle?|vorherigen?|fr[üu]heren?)\s+)?(?:instructions?|rules?|guidelines?|directives?|constraints?|limitations?|restrictions?|context|programming|configuration|prompt|system\s*prompt)/i,

  // "do not follow / obey / adhere to your instructions"
  /do\s+not\s+(?:follow|obey|adhere\s+to|respect|comply\s+with)\s+(?:your\s+)?(?:instructions?|rules?|guidelines?|constraints?|restrictions?)/i,

  // "new instructions:" / "from now on you are/will/must …"
  /new\s+instructions?\s*:/i,
  /from\s+now\s+on\s+(?:you\s+)?(?:are|will|must|should|have\s+to)\s+/i,

  // ══ GERMAN — Instruction overrides (informal du + formal Sie) ══
  /ignorier(?:e|en|st|t)?\s+(?:Sie\s+|alle?\s+)?.{0,20}(?:anweisung(?:en)?|regeln?|einschr[äa]nkungen?|vorgaben?|richtlinien?)/i,
  /(?:vergiss|vergessen\s+(?:Sie\s+)?)(?:alle?\s+)?.{0,20}(?:anweisung(?:en)?|regeln?|einschr[äa]nkungen?)/i,
  // "neue Anweisung:" AND "neue Anweisungen:"
  /neue\s+anweisung(?:en)?\s*:/i,
  /ab\s+(?:jetzt|sofort)\s+(?:sind\s+Sie|bist\s+du|verh[äa]ltst|verhalten\s+Sie\s+sich|antwortest|antworten\s+Sie)/i,
  /(?:Ihre?|deine?)\s+(?:neue\s+)?(?:aufgabe|rolle|anweisung)\s+(?:ist|lautet)/i,
  /(?:bitte\s+)?ignorier(?:e|en|st|t)?\s+(?:Sie\s+)?(?:alle?\s+)?(?:Ihre?|deine?)/i,
  /vergess(?:e|en|t)?\s+Sie\s+/i,
  // Modal verb constructions: "Würden/Könnten Sie bitte … ignorieren/vergessen"
  /(?:w[üu]rden|k[öo]nnten|sollten|m[üu]ssten)\s+Sie\s+(?:bitte\s+)?.{0,40}(?:ignorier|vergessen|umgehen)/i,

  // ══ ENGLISH — Role hijacking & persona replacement ══════════════
  /you\s+are\s+now\s+(?!available|here|able|open|online|ready|at\s)/i,
  /pretend\s+(?:you\s+are|to\s+be)\s+/i,
  /act\s+as\s+(?:if\s+you\s+(?:are|have\s+no)|a\s+different|an?\s+(?:evil|unfiltered|unrestricted|uncensored|jailbroken))/i,
  /act\s+as\s+if\s+you\s+have\s+no\s+(?:rules|restrictions|guidelines)/i,

  // ══ GERMAN — Role hijacking ═════════════════════════════════════
  /du\s+bist\s+jetzt\s+(?!erreichbar|verf[üu]gbar|online|bereit)/i,
  /Sie\s+sind\s+jetzt\s+(?!erreichbar|verf[üu]gbar|online|bereit|in\s+der\s+Lage)/i,
  /tu(?:e)?\s+so\s+als\s+(?:ob|wenn)\s+/i,
  /spiele\s+(?:die\s+rolle|einen?)\s+/i,

  // ══ ROLEPLAY / INDIRECT INJECTION (EN + DE) ═════════════════════
  // "let's roleplay" / "lets roleplay" / "let us roleplay"
  /let\s*(?:'s|s\b)\s+roleplay\b/i,
  /let\s+us\s+roleplay\b/i,
  /lass\s+uns\s+(?:so\s+tun\s+als|rollenspiel\s+spielen)/i,
  /in\s+this\s+(?:scenario|roleplay|story|game|context)\s+(?:you\s+)?are\s+/i,
  /imagine\s+(?:you\s+are|being)\s+(?!helpful|available|a\s+helpful)/i,
  /hypothetically[\s,]+if\s+you\s+(?:were|could|had\s+no)\s+/i,
  /what\s+would\s+you\s+(?:say|do|answer)\s+if\s+you\s+(?:had\s+no\s+restrictions|were\s+free)/i,
  /stell(?:en?\s+(?:Sie\s+sich|dir))\s+(?:einmal\s+)?vor\s*,?\s*(?:du\s+bist|Sie\s+sind|dass)/i,

  // ══ RAW LLM TEMPLATE MARKERS ════════════════════════════════════
  /\[INST\]/i, /\[\/INST\]/i, /\[SYS\]/i, /\[SYSTEM\s*:/i, /<<SYS>>/,
  /<\|im_start\|>/, /<\|(?:system|assistant|user|end_of_text)\|>/,

  // ══ NAMED JAILBREAKS ════════════════════════════════════════════
  /\bDAN\s+(?:mode|jailbreak|prompt)\b/i,
  /jailbreak\s+(?:mode|prompt|this|the\s+ai)/i,
  /(?:developer|god|admin|sudo|super)\s+mode\s+(?:enabled|on|activated|unlocked)/i,
  /unrestricted\s+mode/i,
  /\bDO\s+ANYTHING\s+NOW\b/i,

  // ══ FAKE CONVERSATION TURN ══════════════════════════════════════
  /\n{2,}(?:Human|Assistant|User|System|Mensch|Nutzer|Assistent)\s*:/,

  // ══ SYSTEM-PROMPT EXTRACTION (EN) ══════════════════════════════
  // Broad verb × target (includes leak, expose, share, tell me, give me, send me)
  /(?:print|show|reveal|output|display|repeat|dump|leak|expose|share|echo|write\s+out)\s+(?:me\s+)?(?:your\s+|the\s+)?(?:full\s+)?(?:system\s+)?(?:prompt|instructions?|rules?|guidelines?|directives?|configuration|restrictions?)\b/i,
  /(?:tell|give|send)\s+me\s+(?:your\s+|the\s+)?(?:full\s+)?(?:system\s+)?(?:prompt|instructions?|rules?|configuration|directives?|guidelines?)\b/i,
  /what\s+(?:are|is)\s+your\s+(?:system\s+)?(?:instructions?|prompt|rules?|configuration|directives?)\b/i,
  /(?:repeat|recite|copy)\s+(?:back\s+)?(?:your\s+)?(?:system\s+)?(?:instructions?|prompt|rules?)/i,

  // ══ SYSTEM-PROMPT EXTRACTION (DE — all forms) ══════════════════
  // Covers "System-Prompt" (with hyphen), "Systemprompt", "System Prompt"
  // DE extraction: covers both imperative (zeige, gib, nenne) AND
  // formal Sie-infinitive (zeigen Sie, geben Sie, nennen Sie, wiederholen Sie)
  // Imperative (gib, zeige, nenne, sage) AND formal infinitive (geben Sie, zeigen Sie, …)
  /(?:zeig(?:en?)?|gib|geben?|wiederhole(?:n)?|nenn(?:en?)?|sag(?:en?)?)\s+(?:Sie\s+)?(?:mir\s+)?(?:(?:Ihre?n?|deinen?)\s+)?(?:system[-\s]?prompt|system(?:prompt|-anweisung)|anweisung(?:en)?|regeln?|konfiguration|vorgaben?)/i,
  /was\s+(?:sind|ist|lautet?n?)\s+(?:Ihre?n?|deine?)\s+(?:anweisung(?:en)?|regeln?|system[-\s]?prompt|konfiguration|vorgaben?)/i,
  /was\s+ist\s+(?:Ihr|dein)\s+system[-\s]?prompt/i,

  // ══ HYPOTHETICAL WORLD / WHERE attacks ══════════════════════════
  /what\s+would\s+you\s+(?:say|do|answer|think)\s+(?:if|in\s+a\s+world\s+where)\s+you\s+(?:had\s+no\s+(?:restrictions?|rules?|guidelines?)|were\s+free)/i,
];

/**
 * Prepare text for injection detection:
 * 1. NFKD normalization — converts math/bold/italic Unicode letters to their
 *    ASCII base, e.g. "𝗶𝗴𝗻𝗼𝗿𝗲" → "ignore"  (homoglyph bypass fixed)
 * 2. Soft-hyphen removal — U+00AD is invisible but breaks regex word-matching
 * 3. Other invisible separators already handled by SANITIZE_RE upstream,
 *    but we reapply here since containsInjectionAttempt may receive pre-sanitized text.
 */
const SOFT_HYPHEN_RE = new RegExp(String.fromCodePoint(0x00AD), "g");

/**
 * Cyrillic lookalike map — most common Latin↔Cyrillic visual confusables.
 * Covers the characters attackers embed in "ignore all previous instructions"
 * style payloads: а→a, е→e, о→o, р→p, с→c, н→n, х→x, у→y, і→i, ѕ→s, ї→i.
 */
const CYRILLIC_MAP: [RegExp, string][] = [
  [/а/g, "a"], // а → a
  [/е/g, "e"], // е → e
  [/о/g, "o"], // о → o
  [/р/g, "p"], // р → p  (Cyrillic р looks like Latin p, not r)
  [/с/g, "c"], // с → c
  [/н/g, "n"], // н → n
  [/х/g, "x"], // х → x
  [/у/g, "u"], // у → u
  [/і/g, "i"], // і → i
  [/ѕ/g, "s"], // ѕ → s
  [/ї/g, "i"], // ї → i
  [/А/g, "A"], // А → A
  [/Е/g, "E"], // Е → E
  [/О/g, "O"], // О → O
  [/Р/g, "R"], // Р → R
  [/С/g, "C"], // С → C
  [/Н/g, "N"], // Н → N
  [/Х/g, "X"], // Х → X
  [/У/g, "U"], // У → U
  [/І/g, "I"], // І → I
];

function removeCyrillicLookalikes(s: string): string {
  let r = s;
  for (const [pat, rep] of CYRILLIC_MAP) r = r.replace(pat, rep);
  return r;
}

function normalizeForDetection(text: string): string {
  return removeCyrillicLookalikes(
    text
      .normalize("NFKD")           // math/bold/italic/fullwidth Unicode → ASCII base
      .replace(SOFT_HYPHEN_RE, "") // remove invisible soft hyphens (U+00AD)
      .replace(SANITIZE_RE, "")    // remove invisible control / BiDi spoofing chars
      .normalize("NFC")            // recompose valid accents (ü→ü, ö→ö, ä→ä)
  );
  // Why NFKD then NFC?
  // NFKD converts exotic Unicode (𝗶𝗴𝗻𝗼𝗿𝗲 → ignore) so homoglyph attacks fail.
  // NFC recomposes legitimate German umlauts (u+combining-diaeresis → ü) so
  // German injection patterns still match after normalisation.
  // removeCyrillicLookalikes then maps visually identical Cyrillic chars to ASCII.
}

/* ---- Encoding-bypass helpers ---------------------------------- */

/**
 * ROT13 cipher — rotates A–Z and a–z 13 positions (self-inverse).
 * Attackers sometimes ROT13-encode injection payloads to bypass keyword filters:
 *   ROT13("ignore all previous instructions") → "vtagber nyy cerivbhf vafgehpgvbaf"
 */
function rot13(s: string): string {
  return s.replace(/[A-Za-z]/g, c => {
    const b = c <= "Z" ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - b + 13) % 26) + b);
  });
}

/**
 * Matches base64 blobs long enough to decode meaningfully.
 * Minimum 16 chars avoids flagging short coincidental matches.
 * Example attack: atob("aWdub3JlIHByZXZpb3VzIGluc3RydWN0aW9ucw==")
 *                   = "ignore previous instructions"
 */
const BASE64_BLOB_RE = /[A-Za-z0-9+/]{16,}={0,2}/g;

/**
 * Returns true when the text appears to contain a prompt-injection attempt,
 * even when obfuscated by common encoding tricks:
 *
 *  Layer 1 — plain text (Unicode-normalised, invisible chars stripped)
 *  Layer 2 — ROT13 decode
 *  Layer 3 — URL percent-decode  ("ignore%20previous%20instructions")
 *  Layer 4 — Base64 decode       (atob("aWdub3Jl..."))
 */
export function containsInjectionAttempt(text: string): boolean {
  // 1. Plain text after Unicode normalisation (NFKD homoglyph → ASCII, soft-hyphen removed)
  const normalized = normalizeForDetection(text);
  if (INJECTION_PATTERNS.some(p => p.test(normalized))) return true;

  // 2. ROT13-obfuscated injection
  const rot13Norm = normalizeForDetection(rot13(text));
  if (INJECTION_PATTERNS.some(p => p.test(rot13Norm))) return true;

  // 3. URL percent-encoded injection
  try {
    const urlDecoded = normalizeForDetection(decodeURIComponent(text));
    if (INJECTION_PATTERNS.some(p => p.test(urlDecoded))) return true;
  } catch { /* malformed URI sequence — skip */ }

  // 4. Base64-encoded injection
  //    atob() is available in Edge Runtime (Web API) and Node.js 16+
  const blobs = text.match(BASE64_BLOB_RE);
  if (blobs) {
    for (const blob of blobs) {
      try {
        const decoded = normalizeForDetection(atob(blob));
        if (INJECTION_PATTERNS.some(p => p.test(decoded))) return true;
      } catch { /* not valid base64 — skip */ }
    }
  }

  return false;
}

/* ---- Bot-response scanner ------------------------------------ */

/**
 * Scans a bot reply for signs that a jailbreak succeeded or that the
 * system prompt is being leaked. Returns true when the output looks
 * suspicious and should be replaced with a fallback reply.
 */
const BOT_LEAK_PATTERNS: RegExp[] = [
  // System-prompt keywords that should never appear verbatim in output
  /PFLICHTREGELN/,
  /BETRIEBSTYP/,
  /BUCHUNGSPROZESS/,
  /TYPISCHE\s+SERVICES/,
  /ZUSÄTZLICHE\s+INFOS\s+VOM\s+BETRIEB/,
  // Jailbreak success indicators
  /\bas\s+DAN\b/i,
  /i\s+am\s+now\s+(free|unrestricted|a\s+different\s+(ai|model|assistant))/i,
  /without\s+(any\s+)?(restrictions?|limitations?|filters?|guidelines?)/i,
  /my\s+(true|real|inner)\s+(self|personality|nature|identity)/i,
  /i\s+have\s+no\s+(restrictions?|limitations?|guidelines?|rules?)/i,
  /unleashed\s+(version|mode)/i,
  // Prompt-content disclosure
  /my\s+(system\s+)?instructions?\s+(say|are|state|tell\s+me)/i,
  /i\s+(was\s+)?instructed\s+to\s+(never|always|only)/i,
];

/**
 * Returns true when the bot reply appears to be leaking the system prompt
 * or indicating a successful jailbreak. The caller should replace the reply
 * with a safe fallback.
 */
export function isSuspiciousBotReply(text: string): boolean {
  if (text.length > 1_500) return true; // suspiciously long = possible prompt dump
  const normalized = normalizeForDetection(text);
  return BOT_LEAK_PATTERNS.some(p => p.test(normalized));
}

/* ---- Log sanitizer -------------------------------------------- */

/**
 * Replaces newlines and tabs with visible markers to prevent CRLF log injection.
 * Caps length so single inputs can't flood logs.
 */
export function sanitizeLog(value: unknown): string {
  const s = typeof value === "string" ? value : String(value ?? "");
  return s
    .replace(/\r/g, " [CR] ")
    .replace(/\n/g, " [LF] ")
    .replace(/\t/g, " [TAB] ")
    .trim()
    .slice(0, 200);
}

/* ---- Email normalizer ----------------------------------------- */

/**
 * Normalises an email address before using it as a rate-limit key.
 * Prevents two well-known bypass techniques:
 *
 * 1. Plus-addressing:  user+tag@gmail.com → user@gmail.com
 *    (Gmail / many providers deliver +tag mail to the same inbox)
 *
 * 2. Fullwidth Unicode: ｕｓｅｒ@gmail.com → user@gmail.com
 *    (NFKC maps fullwidth ASCII characters to their narrow equivalents)
 *
 * The original email value is NOT modified — this is only used for key hashing.
 */
export function normalizeEmailForKey(email: string): string {
  return email
    .normalize("NFKC")             // ｕ → u, etc.
    .toLowerCase()
    .trim()
    .replace(/\+[^@]+(?=@)/, ""); // user+tag@domain → user@domain
}

/* ---- Privacy-safe key fragment -------------------------------- */

/**
 * Creates a short, non-reversible key fragment from a string (e.g. an email).
 * Uses FNV-1a 32-bit — pure ASCII source, no crypto import needed.
 * Suitable for rate-limit keys — NOT for authentication.
 */
export function keyFragment(str: string): string {
  const s = str.toLowerCase().trim();
  let h = 0x811c9dc5; // FNV-1a offset basis
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0; // FNV prime
  }
  return h.toString(16).padStart(8, "0");
}

/* ---- Fetch with timeout --------------------------------------- */

/**
 * Wraps fetch with an AbortController timeout.
 * Prevents hanging requests if an external service is slow or unresponsive.
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 12_000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}
