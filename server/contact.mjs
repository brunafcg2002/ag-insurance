const MAX_BYTES = 16384;
const EMAIL = /^[^\s<>@,;\r\n]+@[^\s<>@,;\r\n]+\.[^\s<>@,;\r\n]+$/;
const UUID = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
const SOLUTIONS = {
  auto: "Seguro Automóvel", saude: "Seguro de Saúde", casa: "Seguro Habitação",
  vida: "Seguro de Vida", trabalho: "Seguro de Acidentes de Trabalho",
  poupanca: "Poupança e Investimento", other: "Outra questão",
};

function settings(env) {
  const origins = (env.CONTACT_ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter((origin) => {
    try {
      const url = new URL(origin);
      return url.origin === origin && (url.protocol === "https:" || (url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname)));
    } catch { return false; }
  });
  const sender = (env.CONTACT_FROM || "").trim();
  const address = sender.match(/<([^<>]+)>$/)?.[1] || sender;
  const ready = Boolean(env.RESEND_API_KEY && env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY &&
    EMAIL.test(address) && !/[\r\n]/.test(sender) && EMAIL.test(env.CONTACT_TO || "") && origins.length);
  return { origins, sender, ready };
}

async function readJSON(request) {
  if (!request.body) throw new Error("invalid_input");
  const reader = request.body.getReader();
  const chunks = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BYTES) { await reader.cancel(); throw new Error("too_large"); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder().decode(bytes)); }
  catch { throw new Error("invalid_input"); }
}

function validate(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const limits = { name: 100, email: 200, message: 2500, solution: 20, language: 2, requestId: 36, token: 2048, website: 200 };
  const value = {};
  for (const [key, max] of Object.entries(limits)) {
    const raw = input[key] ?? (key === "website" ? "" : null);
    if (typeof raw !== "string" || raw.length > max) return null;
    value[key] = raw.trim();
  }
  if (!value.name || /[\x00-\x1f\x7f]/.test(value.name) || !EMAIL.test(value.email) ||
      !value.message || /[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(value.message) ||
      !Object.hasOwn(SOLUTIONS, value.solution) || !["pt", "en"].includes(value.language) ||
      !UUID.test(value.requestId) || !value.token) return null;
  return value;
}

// Injectable dependencies let tests exercise delivery without sending real email.
export function createContactHandler({ env = {}, fetchImpl = fetch } = {}) {
  return async function contact(request) {
    const config = settings(env);
    const origin = request.headers.get("origin");
    const allowed = Boolean(origin && config.origins.includes(origin));
    const headers = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "Vary": "Origin" };
    if (allowed) headers["Access-Control-Allow-Origin"] = origin;
    const json = (status, data) => new Response(JSON.stringify(data), { status, headers });

    if (origin && !allowed) return json(403, { error: "origin_denied" });
    if (request.method === "OPTIONS") {
      if (!allowed) return json(403, { error: "origin_denied" });
      return new Response(null, { status: 204, headers: { ...headers, "Access-Control-Allow-Methods": "GET, POST, OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Access-Control-Max-Age": "600" } });
    }
    if (request.method === "GET") return json(200, { enabled: config.ready, siteKey: config.ready ? env.TURNSTILE_SITE_KEY : null });
    if (request.method !== "POST") return new Response(null, { status: 405, headers: { ...headers, Allow: "GET, POST, OPTIONS" } });
    if (!allowed) return json(403, { error: "origin_denied" });
    if (!config.ready) return json(503, { error: "unavailable" });
    if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return json(415, { error: "invalid_input" });
    if (Number(request.headers.get("content-length")) > MAX_BYTES) return json(413, { error: "too_large" });
    let input;
    try { input = await readJSON(request); }
    catch (error) { return json(error.message === "too_large" ? 413 : 400, { error: error.message === "too_large" ? "too_large" : "invalid_input" }); }
    const value = validate(input);
    if (!value) return json(400, { error: "invalid_input" });
    // Silently discard the honeypot; never forward this request to Resend.
    if (value.website) return json(200, { accepted: true });

    let verification;
    try {
      const response = await fetchImpl("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret: env.TURNSTILE_SECRET_KEY, response: value.token }),
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) return json(503, { error: "verification_unavailable" });
      verification = await response.json();
    } catch { return json(503, { error: "verification_unavailable" }); }
    if (verification.success !== true || verification.hostname !== new URL(origin).hostname || verification.action !== "contact") {
      return json(403, { error: "verification_failed" });
    }

    const email = {
      from: config.sender, to: [env.CONTACT_TO], reply_to: value.email,
      subject: `Pedido de contacto — ${SOLUTIONS[value.solution]}`,
      text: `Novo pedido pelo site A. Gonçalves - Seguros\n\nNome: ${value.name}\nEmail: ${value.email}\nInteresse: ${SOLUTIONS[value.solution]}\nIdioma: ${value.language.toUpperCase()}\n\n${value.message}`,
    };
    const hash = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(email)));
    const digest = [...new Uint8Array(hash)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
    try {
      const response = await fetchImpl("https://api.resend.com/emails", {
        method: "POST", headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "Content-Type": "application/json", "Idempotency-Key": `contact/${value.requestId}/${digest}` },
        body: JSON.stringify(email), signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) return json(503, { error: "delivery_unavailable" });
      const data = await response.json();
      if (typeof data.id !== "string" || !data.id) return json(503, { error: "delivery_unavailable" });
      // Accepted by the provider is not a guarantee of inbox delivery.
      return json(200, { accepted: true });
    } catch { return json(503, { error: "delivery_unavailable" }); }
  };
}

