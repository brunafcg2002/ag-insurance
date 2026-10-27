# PT / EN content editing

Visitor-facing copy lives in the exported `translations` object in `src/frontend/i18n/translations.js`. Portuguese uses European Portuguese; English uses British English. Keep matching keys and runtime `{{tokens}}` in both languages. The short bilingual no-JavaScript contact notice is the only static text exception.

- `home`: server-rendered homepage text, metadata, image alternatives and accessible labels. `src/frontend/components/Homepage.jsx` reads these keys directly; no generated HTML needs editing.
- `ui`: interactive controls, validation, carousel announcements and map status.
- `solutions`, `faqs`, `scenarios`, `campaigns`: dialog content. Keep IDs, official source URLs, dates and conditions consistent. Review campaign cards and dialog conditions together.
- `legal` and `privacy`: legal documents. Preserve the owner-confirmation `[PlaceHolder]` fields until confirmed.
- `templates`: trusted local HTML for dialogs and the contact form. Preserve attributes, field names, IDs, `{{tokens}}` and validation. Never interpolate visitor input into trusted HTML.

Portuguese is served at `/`; English at `/en`. Both pages render their content, metadata and document language (`pt-PT` or `en-GB`) on the server. The native language selector preserves the current hash and unrelated query parameters, removes legacy `lang`, and navigates to the chosen page. No cookie or browser storage is used. Legacy `/index.html`, `/en.html` and supported language queries redirect through Next.js.

Use `npm run dev` during editing. Next.js bundles translations, CSS and interactive JavaScript and versions the output automatically. There is no `tools/render-pages.mjs` step or manual asset hash to refresh. Use `npm run build` for production and set `SITE_URL` before building when the production hostname changes.

Check both language URLs, desktop/mobile navigation, footer disclosures, legal dialogs, product preselection and contact validation after content changes. Legal and insurance translations remain drafts for company review.
