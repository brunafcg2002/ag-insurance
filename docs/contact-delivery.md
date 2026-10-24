# Resend delivery with plain JavaScript

The website remains static HTML/CSS/JavaScript. `worker.mjs` routes `/api/contact` to `server/contact.mjs` on Cloudflare Workers. No React, Next.js, package dependencies or application build step is required. Cloudflare's deployment tool bundles the function when deploying.

**Status:** implemented locally, not deployed or activated. `contact-config.js` has `enabled: false` and an empty endpoint, so “Send message” stays disabled. The email-app/clipboard form fallback has been removed; direct contact links remain available. No real API keys have been added and tests do not send real emails.

## Two hosting options

1. **Cloudflare hosts everything:** deploy static assets and the Worker using `wrangler.jsonc`, then set the public endpoint in `contact-config.js` to `/api/contact`.
2. **GitHub Pages hosts the website:** deploy the Worker on Cloudflare, then set the public endpoint to `https://YOUR-WORKER.workers.dev/api/contact`. Add `https://brunafcg2002.github.io` to `CONTACT_ALLOWED_ORIGINS` (an origin contains no path). GitHub Pages cannot execute the server function itself.

Use Cloudflare **Workers with Static Assets** for the supplied configuration. A static-only upload does not activate the API. The Worker endpoint returns public configuration on GET, accepts submissions on POST, and handles CORS preflight. An unconfigured endpoint never sends messages.

## Activate delivery

1. Create a Resend account and verify a sending domain using the DNS records Resend provides. Use an address on that domain as `CONTACT_FROM`. Do not replace existing mailbox MX records casually; use a sending subdomain if appropriate.
2. Create a Cloudflare Turnstile widget for the exact website hostnames (the page's hostname, including the GitHub Pages hostname if retained). The public site key and server secret are different values.
3. In the Worker settings, configure:

| Setting | Where it belongs |
| --- | --- |
| `RESEND_API_KEY` | Worker secret; a sending-only key for the intended domain. |
| `TURNSTILE_SECRET_KEY` | Worker secret. |
| `TURNSTILE_SITE_KEY` | Worker environment variable; returned publicly to render verification. |
| `CONTACT_FROM` | Server environment variable, e.g. `A. Gonçalves <website@YOUR-VERIFIED-DOMAIN>`. |
| `CONTACT_TO` | Server environment variable: the company's actual recipient, currently `seguros@agoncalves.com.pt`. |
| `CONTACT_ALLOWED_ORIGINS` | Comma-separated exact website origins, e.g. `https://www.YOUR-DOMAIN.pt,https://brunafcg2002.github.io`. No paths or trailing slashes. |

`.env.example` lists names only. Do not put secrets in `contact-config.js`, HTML, translation files, Git, chat, or an uploaded static directory. Prefer Cloudflare dashboard secret settings. The `wrangler secret put` command also accepts secret values interactively. `.env*`, `.dev.vars*`, and Wrangler local files are ignored by Git; `.assetsignore` excludes all dotfiles, server code, tests, tools and private/development documents from static asset uploads.

4. Set `enabled: true` and the public endpoint URL in `contact-config.js` and run `node tools/render-pages.mjs --site-url=https://YOUR-PRODUCTION-SITE/`. This refreshes static language content, SEO URLs, sitemap and JS/CSS cache hashes. Do not point canonicals at a preview hostname. The default generator URL is the existing GitHub Pages URL until the production domain is known.
5. Review the privacy/cookies/terms content with the company, including Resend and Cloudflare data handling, retention and remaining `[PlaceHolder]` fields.
6. Deploy when authorised. With the Cloudflare CLI available, `npx wrangler deploy` deploys the supplied configuration. There is no site compilation step. Perform an explicitly authorised real test message to confirm Resend accepts the domain and that the message reaches the recipient. Until then, local acceptance tests are not proof of inbox delivery.

## Behaviour

- The form permits server delivery only when explicitly enabled in the public config and the endpoint reports enabled settings. Otherwise “Send message” is disabled and visitors can use the direct contact details.
- Required fields, email format and blank-only input are checked in the browser and independently on the server. The server accepts stable insurance IDs, not arbitrary email headers or recipients.
- Turnstile loads only in an active direct-send form. Its token is verified server-side and bound to the expected page hostname and `contact` action. A hidden honeypot discards automated entries without using email quota.
- The sender and sole recipient come from server configuration. The visitor email is `Reply-To`. No visitor-account login or message in the visitor's Sent folder is involved in direct delivery.
- There is one outgoing notification per accepted enquiry; no automatic visitor confirmation email. Success means accepted by Resend, not guaranteed delivery to an inbox.
- Loading disables repeat submissions. Errors keep form entries. Retrying unchanged content reuses the request ID and provider idempotency key; changing content gets a fresh ID. A security token is renewed on retry. Provider idempotency lasts according to Resend's documented window, currently 24 hours.
- Request size is bounded at 16 KiB, fields have length limits, and timeouts constrain external calls. Responses contain generic error codes and no raw provider responses or API keys. The handler does not log enquiry contents or write a customer database. Provider infrastructure and email services may keep logs/content under their terms.
- Origin checks are a browser boundary, not authentication. Turnstile and the honeypot reduce automated abuse but do not guarantee that every request is legitimate. Configure host rate-limiting if traffic/abuse warrants it; no unreliable per-process global limiter is presented as durable protection.

## Verify locally

- `node --test tests/contact.test.mjs` checks the actual handler using mocked external calls, without sending email.
- `npx wrangler deploy --dry-run --outdir /tmp/ag-insurance-worker-preview` validates local Worker/asset packaging without deploying.
- `npx wrangler dev` can run the Worker locally; no real configuration is needed to test the disabled state. Real sending requires explicit local/host secret configuration. Cloudflare's documented Turnstile test keys may be used for development only.
- A normal Python static server still previews the website with “Send message” disabled. It does not run the Worker endpoint.
- Browser checks cover PT/EN, required fields, sending, failure/retained input, retry, success, mobile widths and the inactive button state. Challenge/provider responses were mocked; no real messages were sent.

## Primary references

- [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email)
- [Resend API key handling](https://resend.com/docs/knowledge-base/how-to-handle-api-keys)
- [Resend verified domains](https://resend.com/docs/dashboard/domains/introduction)
- [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys)
- [Cloudflare Worker static assets](https://developers.cloudflare.com/workers/static-assets/)
- [Cloudflare static asset configuration and exclusions](https://developers.cloudflare.com/workers/static-assets/binding/)
- [Cloudflare secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Turnstile server-side validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
