"use strict";

// Public configuration only. Sending stays disabled until explicitly enabled.
// Cloudflare (whole site): "/api/contact"
// GitHub Pages + separate endpoint: "https://YOUR-WORKER.workers.dev/api/contact"
// Never put a Resend API key or Turnstile secret in this file.
window.contactConfig = { enabled: false, endpoint: "" };
