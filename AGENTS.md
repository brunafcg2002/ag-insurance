# Project instructions

- Use Next.js App Router with plain JavaScript, React and CSS. Frontend and backend live in this repository; avoid adding dependencies without a concrete need.
- Read the [project structure and architecture guide](docs/architecture.md) before adding modules or changing folder boundaries. Keep its project tree and responsibility descriptions updated when the structure changes.
- Keep Next.js entry points in `src/app/`, UI in `src/frontend/`, and backend features in `src/backend/`. Domain and application must stay independent of Next.js, HTTP, environment variables and provider SDKs. Inject outbound ports; choose concrete adapters only in the composition root. Frontend code must not import backend modules.
- Keep shared homepage markup in `src/frontend/components/Homepage.jsx`, styles in `src/frontend/styles/globals.css`, and local assets in `public/assets/`.
- Follow `docs/design-system.md`: PT Sans with `#013781`, `#f5f9ff`, and `#011a3d`. Keep layouts responsive and controls keyboard accessible.
- Use European Portuguese at `/` and British English at `/en`. Keep visitor-facing copy in matching catalogues in `src/frontend/i18n/translations.js`; see `docs/translations.md`. The company is A. Gonçalves - Seguros. Verify new business facts; insurance descriptions remain draft copy.
- Contact delivery uses the Next.js `/api/contact` route and Resend. Keep API keys and verification secrets server-side. Sending must stay disabled unless `CONTACT_ENABLED=true`, the endpoint is configured/available and verification succeeds. Do not introduce email-app/clipboard form fallbacks; see `docs/contact-delivery.md`.
- The map uses local Leaflet files and external street/satellite tiles. Preserve provider attribution. The owner-confirmed location is `41.278481, -8.282931`; keep the pin and directions destination consistent.
- Run `npm test` and `npm run build` for relevant changes. Preview with the Next.js local server and check desktop/mobile layouts and affected interactions. Tests must not send real emails.
- Next.js manages browser asset hashes. Do not restore manual `?v=` query versions or generated PT/EN HTML. Set `SITE_URL` before building when the production origin changes. Update documentation when setup changes.
- Language links use full document navigation because `src/frontend/interactions/site-interactions.js` progressively enhances the page DOM once per document. Keep React responsible for initial page rendering and avoid client-side route transitions that retain those DOM enhancements.
