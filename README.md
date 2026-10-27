# A. Gonçalves - Seguros

Next.js App Router application with a Portuguese homepage at `/`, British English at `/en`, and a Resend email endpoint at `/api/contact`. Frontend and backend run in the same application. The existing PT Sans design, insurance and legal dialogs, campaigns, mobile navigation, carousels and local Leaflet map are preserved. Insurance descriptions remain draft copy for company review.

## Run locally

Use Node.js 20.9 or newer.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Email stays disabled until explicitly configured; direct contact links remain available.

```sh
npm test
npm run build
npm start
```

`npm start` serves the production build. Deploy to a host supporting Next.js and its Node.js route handlers. GitHub Pages and static-only hosting cannot run this backend. Set `SITE_URL` to the production origin before building so canonical links, language alternatives and `/sitemap.xml` point to the right domain. Configure server environment variables on the host, never in `public/` or `NEXT_PUBLIC_*` variables.

## Structure

```text
src/
  app/                   Next.js page, layout and API entry points
  frontend/
    components/          Shared homepage and document layout
    interactions/        Navigation, carousels, dialogs, form and map
    i18n/                Matching PT/EN catalogues
    styles/              Design tokens and responsive CSS
    seo/                 Language metadata
  backend/contact/
    domain/              Enquiry validation and insurance categories
    application/         Send-enquiry use case and outbound port contracts
    infrastructure/      Resend, Turnstile and environment configuration
    presentation/        HTTP controller, request parsing and status mapping
    composition.js       Wires the use case, adapters and controller
public/assets/           Images, fonts, brand artwork and local Leaflet
tests/                   Boundary, application and API integration tests
```

**Frontend:** `src/frontend/`. **Backend:** `src/backend/`. `src/app/` connects both to Next.js: PT/EN pages import frontend components, while `src/app/api/contact/route.js` calls the backend composition root. Both run in one deployment. See the [architecture guide](docs/architecture.md) for the request flow, dependency rules and where to make changes.

Language anchors perform full document navigation because the existing interactive enhancements own carousel/dialog/map DOM for the document lifetime. Street/satellite tiles load externally when the map approaches the viewport.

Next.js handles asset bundling and cache hashes. The old HTML generator, manual `?v=` versions and Cloudflare Worker deployment have been replaced. Legacy `/index.html` and `/en.html` redirect to the new routes, and legacy language query links remain supported. Page content is present without JavaScript; interactive controls require it.

## Email configuration

See [contact delivery](docs/contact-delivery.md) and `.env.example`. Configure a verified Resend sender, recipient, allowed website origins and Turnstile keys, then set `CONTACT_ENABLED=true`. The endpoint reports disabled until every setting is present. The browser disables “Send message” if the endpoint is disabled, unavailable or verification has not completed. No email-app or clipboard fallback is used.

Tests mock external services and send no real email. Success means Resend accepted the request, not guaranteed inbox delivery.

## Content and design

See [translation editing](docs/translations.md), [design system](docs/design-system.md), [asset sources](docs/assets.md), [campaign research](docs/campaigns.md), [privacy notes](docs/privacy.md) and [legal notes](docs/legal.md). Company identity, contact details and the owner-confirmed location `41.278481, -8.282931` are retained. Review campaigns before their stated expiry and keep PT/EN conditions consistent.

The frontend uses React server components for the page and existing JavaScript enhancements for the interactive surfaces. No database, login or separate backend service is required.
