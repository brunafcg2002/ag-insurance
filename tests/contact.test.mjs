import test from "node:test";
import assert from "node:assert/strict";
import { createContactHandler } from "../server/contact.mjs";
import worker from "../worker.mjs";

const origin = "https://example.com";
const env = {
  CONTACT_ALLOWED_ORIGINS: origin,
  RESEND_API_KEY: "test-key-not-a-real-credential",
  CONTACT_FROM: "A. Gonçalves <website@example.com>",
  CONTACT_TO: "office@example.com",
  TURNSTILE_SITE_KEY: "test-public-site-key",
  TURNSTILE_SECRET_KEY: "test-secret-not-a-real-credential",
};
const valid = {
  name: "João & Ana", email: "visitor@example.net", message: "A quote, please.\nObrigado!",
  solution: "casa", language: "en", token: "test-token", website: "",
  requestId: "12345678-1234-4234-8234-123456789012",
};
const request = (value = valid, extra = {}) => new Request("https://worker.example/api/contact", {
  method: "POST", headers: { origin, "content-type": "application/json" }, body: JSON.stringify(value), ...extra,
});
function setup(options = {}) {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, ...init });
    if (url.includes("siteverify")) return Response.json(options.verification || { success: true, hostname: "example.com", action: "contact" });
    return Response.json(options.delivery || { id: "provider-message-id" }, { status: options.deliveryStatus || 200 });
  };
  return { calls, handle: createContactHandler({ env: options.env || env, fetchImpl }) };
}

test("public settings contain no secrets or recipient details", async () => {
  const { handle } = setup();
  const response = await handle(new Request("https://worker.example/api/contact"));
  assert.deepEqual(await response.json(), { enabled: true, siteKey: env.TURNSTILE_SITE_KEY });
  assert.equal(response.headers.get("cache-control"), "no-store");
});
test("missing configuration disables delivery", async () => {
  const { handle, calls } = setup({ env: { CONTACT_ALLOWED_ORIGINS: origin } });
  assert.equal((await handle(request())).status, 503);
  assert.equal(calls.length, 0);
});
test("invalid configured origins do not activate delivery", async () => {
  const { handle } = setup({ env: { ...env, CONTACT_ALLOWED_ORIGINS: origin + "/path" } });
  const response = await handle(new Request("https://worker.example/api/contact"));
  assert.equal((await response.json()).enabled, false);
});
test("unapproved and missing POST origins cannot send", async () => {
  const { handle, calls } = setup();
  assert.equal((await handle(request(valid, { headers: { origin: "https://attacker.example", "content-type": "application/json" } }))).status, 403);
  assert.equal((await handle(request(valid, { headers: { "content-type": "application/json" } }))).status, 403);
  assert.equal(calls.length, 0);
});
test("CORS preflight permits only the configured origin", async () => {
  const { handle } = setup();
  const response = await handle(new Request("https://worker.example/api/contact", { method: "OPTIONS", headers: { origin } }));
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("access-control-allow-origin"), origin);
  assert.equal(response.headers.get("access-control-allow-credentials"), null);
});
test("invalid and oversized input never reaches an external service", async () => {
  const { handle, calls } = setup();
  for (const value of [null, [], { ...valid, name: " " }, { ...valid, email: "x@example.com\r\nBcc: other@example.com" }, { ...valid, solution: "__proto__" }, { ...valid, language: "fr" }, { ...valid, message: " " }, { ...valid, requestId: "not-a-uuid" }, { ...valid, token: "" }]) {
    assert.equal((await handle(request(value))).status, 400);
  }
  assert.equal((await handle(request({ ...valid, message: "x".repeat(17000) }))).status, 413);
  assert.equal((await handle(request(valid, { body: "{" }))).status, 400);
  assert.equal((await handle(request(valid, { headers: { origin, "content-type": "text/plain" } }))).status, 415);
  assert.equal(calls.length, 0);
});
test("honeypot requests are discarded without using email quota", async () => {
  const { handle, calls } = setup();
  assert.equal((await handle(request({ ...valid, website: "bot-filled-field" }))).status, 200);
  assert.equal(calls.length, 0);
});
test("failed or incorrectly bound challenges cannot send", async () => {
  for (const verification of [{ success: false }, { success: true, hostname: "attacker.example", action: "contact" }, { success: true, hostname: "example.com", action: "login" }]) {
    const { handle, calls } = setup({ verification });
    assert.equal((await handle(request())).status, 403);
    assert.equal(calls.length, 1);
  }
});
test("delivery uses a fixed sender and recipient with visitor Reply-To", async () => {
  const { handle, calls } = setup();
  const response = await handle(request({ ...valid, to: "attacker@example.com", from: "spoof@example.com", message: "<script>alert(1)</script>" }));
  assert.deepEqual(await response.json(), { accepted: true });
  assert.equal(calls.length, 2);
  const email = JSON.parse(calls[1].body);
  assert.equal(email.from, env.CONTACT_FROM);
  assert.deepEqual(email.to, [env.CONTACT_TO]);
  assert.equal(email.reply_to, valid.email);
  assert.equal(email.html, undefined);
  assert.ok(email.text.includes("<script>alert(1)</script>"));
  assert.equal(calls[1].headers.Authorization, `Bearer ${env.RESEND_API_KEY}`);
});
test("retries keep the idempotency key, edited content gets another key", async () => {
  const { handle, calls } = setup();
  await handle(request()); await handle(request()); await handle(request({ ...valid, message: "Changed message" }));
  const deliveries = calls.filter((call) => call.url.includes("resend"));
  assert.equal(deliveries[0].headers["Idempotency-Key"], deliveries[1].headers["Idempotency-Key"]);
  assert.notEqual(deliveries[0].headers["Idempotency-Key"], deliveries[2].headers["Idempotency-Key"]);
});
test("provider errors and malformed successes do not claim acceptance or leak details", async () => {
  for (const options of [{ deliveryStatus: 429, delivery: { message: "private provider detail" } }, { delivery: {} }]) {
    const { handle } = setup(options);
    const response = await handle(request());
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { error: "delivery_unavailable" });
  }
});
test("network failures return a recoverable response", async () => {
  const handle = createContactHandler({ env, fetchImpl: async () => { throw new Error("private failure"); } });
  assert.deepEqual(await (await handle(request())).json(), { error: "verification_unavailable" });
});
test("worker serves HTML assets separately from its API", async () => {
  let assetURL;
  const assets = { fetch: async (request) => { assetURL = request.url; return new Response("<h1>Static content</h1>"); } };
  assert.equal((await worker.fetch(new Request("https://example.com/"), { ASSETS: assets })).status, 200);
  assert.equal(assetURL, "https://example.com/index.html");
  assert.equal((await worker.fetch(new Request("https://example.com/api/unknown"), { ASSETS: assets })).status, 404);
  const response = await worker.fetch(new Request("https://example.com/api/contact"), {});
  assert.deepEqual(await response.json(), { enabled: false, siteKey: null });
});
