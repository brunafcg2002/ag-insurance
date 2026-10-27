# Frontend, backend and hexagonal architecture

This repository contains one Next.js application and one deployment. Source code is separated by responsibility:

## Project structure

```text
ag-insurance/
├── src/
│   ├── app/                              # Next.js entry points
│   │   ├── (pt)/                         # Portuguese page and layout: /
│   │   ├── (en)/en/                      # English page and layout: /en
│   │   ├── api/contact/route.js          # Backend HTTP entry point: /api/contact
│   │   └── sitemap.js                    # /sitemap.xml
│   ├── frontend/                         # Frontend source code
│   │   ├── components/                   # Homepage, document layout and runtime
│   │   ├── interactions/                 # Menus, carousels, dialogs, form and map
│   │   ├── i18n/translations.js          # Matching PT/EN visitor-facing copy
│   │   ├── styles/globals.css            # Design tokens and responsive styles
│   │   └── seo/metadata.js               # Page titles, descriptions and language URLs
│   └── backend/                          # Backend source code, grouped by feature
│       └── contact/
│           ├── domain/
│           │   └── contact-enquiry.js    # Enquiry rules and insurance categories
│           ├── application/
│           │   ├── send-contact-enquiry.js
│           │   └── ports/                # EmailSender and SpamVerifier contracts
│           ├── infrastructure/           # Provider adapters and configuration
│           │   ├── config.js
│           │   ├── resend-email-sender.js
│           │   └── turnstile-spam-verifier.js
│           ├── presentation/             # HTTP parsing and response mapping
│           │   ├── contact-controller.js
│           │   └── http-body.js
│           └── composition.js            # Creates and connects the dependencies
├── public/assets/                        # Public images, fonts, logos and Leaflet
├── tests/                                # Application, endpoint and boundary tests
├── docs/                                 # Architecture, setup, design and content guides
├── AGENTS.md                             # Instructions for coding agents
├── .env.example                          # Configuration template; no credentials
├── next.config.mjs                       # Next.js configuration and redirects
├── package.json                          # Dependencies and development commands
└── package-lock.json                     # Locked dependency versions
```

**Frontend code lives in `src/frontend/`; backend code lives in `src/backend/`.**
`src/app/` contains the framework entry points for both. Keep pages and API routes
thin: they connect Next.js to the relevant frontend component or backend composition root.
Folders in parentheses group routes without adding a URL segment.

`public/` contains files served directly to visitors: `public/assets/favicon.svg`
is available at `/assets/favicon.svg`. It is not the frontend source directory and
must never contain credentials or backend source. Local secrets belong in the ignored
`.env.local`; production secrets belong in the hosting environment.

The previous root-level `server/contact.mjs` has been replaced by the contact feature
under `src/backend/`. Do not put new backend code in a separate root-level `server/`
folder. Add future backend features beside `contact/`, with the layers they need.

## Directory responsibilities

| Directory | Responsibility |
| --- | --- |
| `src/app/` | Next.js entry points: page routes, layouts, sitemap and API routes. |
| `src/frontend/` | UI components, browser interactions, translations, styling and page metadata. |
| `src/backend/contact/` | The contact backend, organised as a hexagonal feature. |
| `public/assets/` | Public static files. Never put secrets or backend source here. |
| `tests/` | Domain/application behaviour, HTTP integration and dependency boundaries. |

Frontend components can render on the server as part of Next.js page rendering. They still belong to the UI; backend business behaviour lives separately under `src/backend/`.

## Contact request flow

```text
Browser contact form
  → src/app/api/contact/route.js
  → presentation/contact-controller.js
  → application/send-contact-enquiry.js
      → domain/contact-enquiry.js
      → SpamVerifier port → infrastructure/turnstile-spam-verifier.js
      → EmailSender port  → infrastructure/resend-email-sender.js
  ← HTTP status and JSON result
```

`composition.js` creates the adapters, injects them into the use case, and passes the use case to the controller. The Next.js route supplies `process.env` to this composition root. Provider credentials stay in configuration/adapters; the controller receives only readiness, allowed origins and the public widget key.

## Backend layers

**Domain** constructs a normalised contact enquiry and validates the business fields: name, email, message, insurance category and language. It knows nothing about HTTP, Next.js, environment variables, Resend or Turnstile.

**Application** coordinates sending an enquiry. It validates through the domain, silently discards honeypots, asks the verification port to check the challenge, then asks the email port to send. It returns acceptance or a stable error code. It does not choose providers or HTTP status codes.

`application/ports/` owns plain-JavaScript contracts documented with JSDoc:

- `SpamVerifier.verify({ token, hostname })` resolves to `true` or `false`; it rejects if verification is unavailable. Implementations must bind challenges to the hostname and `contact` action.
- `EmailSender.send(enquiry, { requestId })` resolves after provider acceptance and rejects on failure. Implementations fix sender/recipient in configuration and use the visitor email as Reply-To.

**Infrastructure** implements those ports. The Turnstile adapter makes the verification request and checks hostname/action. The Resend adapter formats the email, adds a content-derived idempotency key, calls the provider and checks acceptance. Both enforce external-call timeouts. `config.js` reads and validates supplied environment settings.

**Presentation** handles the inbound HTTP adapter: allowed origins, CORS, methods, readiness, content type, streamed body limits, JSON parsing, and request ID/challenge/honeypot metadata. It invokes the use case and maps its result to HTTP statuses and public JSON responses. It never imports a concrete provider adapter.

## Dependency rules

- Domain imports only domain code.
- Application imports domain/application code and relies on injected outbound ports.
- Infrastructure may import application contracts and domain types/rules.
- Presentation may import application/domain code and presentation helpers.
- The composition root imports and wires all backend layers.
- Frontend code cannot import backend modules. Browser requests cross the boundary through `/api/contact`.
- Next.js page entry points import frontend code; the API entry point imports the backend composition root.

This keeps dependency direction inward even though requests flow outward to providers. There is no DI container, database, repository abstraction or separate backend process.

## Where to make changes

| Change | Location |
| --- | --- |
| Homepage layout/components | `src/frontend/components/` |
| Visitor copy | `src/frontend/i18n/translations.js` |
| Browser interactions | `src/frontend/interactions/` |
| Valid enquiry rules/categories | `src/backend/contact/domain/` |
| Enquiry workflow | `src/backend/contact/application/` |
| Replace Resend or verification provider | Implement the relevant port in infrastructure and wire it in `composition.js`. |
| HTTP payload/status behaviour | `src/backend/contact/presentation/` |
| Environment configuration | `src/backend/contact/infrastructure/config.js` and `.env.example` |

`npm test` runs application tests with fake ports, composed endpoint tests with mocked provider calls, and an architecture check that guards dependency boundaries. Tests send no real email. `npm run build` checks the Next.js page and API integration; preview desktop/mobile layouts and affected interactions after UI or routing changes.
