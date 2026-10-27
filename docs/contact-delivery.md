# Next.js contact delivery with Resend

`src/app/api/contact/route.js` exposes GET, POST and OPTIONS at `/api/contact` using the Node.js runtime. It delegates to `src/backend/contact/composition.js`, which wires the HTTP controller, send-enquiry use case and outbound Resend/Turnstile adapters. The frontend uses this same-origin endpoint; no separate Worker or backend deployment is required. See [architecture](architecture.md) for the layer responsibilities and dependency rules.

Delivery defaults to disabled. Local tests mock external services and do not send email. To run the entire application, use `npm run dev`, or `npm run build` followed by `npm start`.

## Configuration

Copy `.env.example` to `.env.local` for development. In production, set variables in your Next.js host's environment settings. Never put secrets in `public/`, translation files, Git or `NEXT_PUBLIC_*` variables.

| Variable | Value |
| --- | --- |
| `CONTACT_ENABLED` | Exactly `true` to explicitly activate delivery; defaults to disabled. |
| `RESEND_API_KEY` | Server-only sending key for your verified Resend domain. |
| `CONTACT_FROM` | Fixed sender on that domain, e.g. `A. Gonçalves <website@example.com>`. |
| `CONTACT_TO` | Fixed company recipient, currently `seguros@agoncalves.com.pt`. |
| `CONTACT_ALLOWED_ORIGINS` | Comma-separated exact website origins without paths or trailing slashes. Local default: `http://localhost:3000`. |
| `TURNSTILE_SITE_KEY` | Public widget key, returned by GET only when delivery is configured. |
| `TURNSTILE_SECRET_KEY` | Server-only verification secret. |
| `SITE_URL` | Production origin for canonical links and the sitemap, set before building. |

Verify a sending domain in Resend, create a Turnstile widget for the actual website hostname(s), configure these values, and set `CONTACT_ENABLED=true`. Restart the local server after environment changes; rebuild/redeploy when changing production configuration as required by the host. Turnstile remains the existing spam protection and does not require a Cloudflare Worker. Use Cloudflare's documented test keys for local development only.

GET returns `{ "enabled": false, "siteKey": null }` until activation and all required settings are present. It never returns credentials, recipient or sender. The frontend's local `contactConfig` points at `/api/contact`; it permits a readiness check, while the server activation flag controls availability. Failed readiness checks keep sending disabled. Turnstile loads only in a configured contact form.

Deploy to a host supporting Next.js Node.js route handlers, such as Vercel or a Node server. Static export and GitHub Pages cannot run the endpoint. Review privacy/legal placeholders and provider processing terms with the company before launch. No real message has been sent as part of this migration.

## API behaviour

POST expects JSON containing `name`, `email`, `solution`, `message`, `language` (`pt` or `en`), a UUID v4 `requestId`, a Turnstile `token`, and an optional `website` honeypot. Stable solution IDs are `auto`, `saude`, `casa`, `vida`, `trabalho`, `poupanca` and `other`.

The handler validates content type, a streamed 16 KiB body limit, field lengths and values, exact allowed origin and Turnstile's hostname/action binding (`contact`). Honeypot submissions are silently discarded. The server fixes the sender and recipient and uses the visitor email only as `Reply-To`. Incoming `to`/`from` fields cannot override configuration. Timeouts constrain external calls and errors expose generic codes, without provider details or enquiry logging.

Success returns `{ "accepted": true }` when Resend accepts the notification. It does not guarantee inbox delivery or send an automatic visitor confirmation. Unconfigured delivery returns 503; invalid submissions return 400/413/415; forbidden origins or failed challenges return 403; provider failures return 503.

The form disables duplicate submissions, retains fields after errors and renews verification before retrying. An unchanged retry reuses its request ID and provider idempotency key; edited content changes the key. Direct telephone/email links remain available and there is no email-app/clipboard form fallback. Origin checks are a browser boundary; Turnstile and the honeypot provide spam protection. Apply host rate limits if needed rather than relying on an in-memory limiter across server instances.

## Verification

`npm test` exercises dependency boundaries, the domain/application with fake ports, and the composed HTTP endpoint with mocked external services. It covers validation, configuration, origin checks, verification, sender/recipient isolation, provider errors and idempotency. `npm run build` validates Next.js integration. Preview both languages and mobile/desktop layouts, and check the inactive form without credentials. A real delivery test requires configured credentials and a separately authorised message; mocked acceptance cannot prove inbox delivery.

References: [Next.js route handlers](https://nextjs.org/docs/app/getting-started/route-handlers), [Resend email API](https://resend.com/docs/api-reference/emails/send-email), [Resend domains](https://resend.com/docs/dashboard/domains/introduction), [idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys), [Turnstile validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).
