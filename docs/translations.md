# PT / EN content editing

All visitor-facing website copy lives in `translations.js`. There is no framework, package installation, translation API or build step. The only static text exception is the short bilingual `<noscript>` contact fallback.

## Edit text

Open `translations.js`, find the Portuguese wording, and edit the matching value under `pt` and `en`. Keep the keys unchanged. The English version uses British English. Company/product names, addresses, telephone numbers, registration numbers, official links and eligibility dates retain their original identity.

Each language has these groups:

- `home`: homepage text, page title, description, image alternatives and accessible labels. `index.html` contains `data-i18n` markers and generated Portuguese text; `en.html` contains generated English text. Edit the catalogue, then run `node tools/render-pages.mjs` to sync static HTML.
- `ui`: menu controls, validation, carousel announcements, map status and email draft wording. Values such as `{{name}}` are replaced at runtime; keep the same placeholders in both languages.
- `solutions`, `faqs`, `scenarios`, `campaigns`: dialog content. Keep IDs and source URLs consistent. Translate insurance descriptions without changing cover, eligibility or risk statements. Review campaign card copy in `home` and its dialog conditions in `campaigns` together.
- `legal`: terms, legal notice, cookies and complaints. `privacy` contains the privacy document. Both languages retain the owner-confirmation `[PlaceHolder]` fields. Keep those distinct from runtime `{{...}}` tokens.
- `templates`: trusted HTML for the contact and content dialogs. Edit wording while preserving attributes, form field names, IDs, `{{tokens}}`, and required-field behaviour. User-entered messages are not rendered as HTML.

## Language selector

Portuguese is the default at `index.html` (and the root URL); English is at `en.html`. The selector links to these static language pages, preserving the current hash and unrelated query parameters. Legacy `?lang=pt` and `?lang=en` remain supported through JavaScript. Unsupported values fall back to the page's own language. No language cookie or local/session storage is used.

`i18n.js` renders the chosen language before `script.js` initialises interactions. Marker spans are replaced with text nodes, preserving the original CSS structure. Dynamic content is read from the same selected catalogue. The document language is `pt-PT` or `en-GB`.

## Serving and verification

Deploy `translations.js`, `i18n.js`, `contact-config.js`, both HTML pages and `sitemap.xml` alongside `styles.css`, `script.js` and `assets/`. Script order is translations → i18n → Leaflet → interactions; all are local deferred classic scripts, so direct `file://` opening still works. The existing map limitation for file viewing is unchanged.

Page text and metadata are pre-rendered in the static HTML for visitors and crawlers, including when JavaScript is disabled. The optional dependency-free editing helper `node tools/render-pages.mjs` synchronises both language files, canonical/hreflang links, sitemap and cache hashes from the catalogue. This is a content-maintenance command, not a runtime application build. Use `--site-url=https://YOUR-PRODUCTION-SITE/` when the deployment domain changes. Never hand-edit translated values in `en.html`.

Refresh the `?v=` hash in `index.html` for each edited JS/CSS file, using the first 12 characters of SHA-256. Check both language URLs, desktop/mobile navigation, footer disclosures, policy dialogs, product preselection, required-field validation, and encoded email subject/body after a content change. Legal translations remain drafts for company review.
