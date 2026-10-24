# PT / EN content editing

All visitor-facing website copy lives in `translations.js`. There is no framework, package installation, translation API or build step. The only static text exception is the short bilingual `<noscript>` contact fallback.

## Edit text

Open `translations.js`, find the Portuguese wording, and edit the matching value under `pt` and `en`. Keep the keys unchanged. The English version uses British English. Company/product names, addresses, telephone numbers, registration numbers, official links and eligibility dates retain their original identity.

Each language has these groups:

- `home`: homepage text, page title, description, image alternatives and accessible labels. `index.html` contains `data-i18n` markers rather than the text itself.
- `ui`: menu controls, validation, carousel announcements, map status and email draft wording. Values such as `{{name}}` are replaced at runtime; keep the same placeholders in both languages.
- `solutions`, `faqs`, `scenarios`, `campaigns`: dialog content. Keep IDs and source URLs consistent. Translate insurance descriptions without changing cover, eligibility or risk statements. Review campaign card copy in `home` and its dialog conditions in `campaigns` together.
- `legal`: terms, legal notice, cookies and complaints. `privacy` contains the privacy document. Both languages retain the owner-confirmation `[PlaceHolder]` fields. Keep those distinct from runtime `{{...}}` tokens.
- `templates`: trusted HTML for the contact and content dialogs. Edit wording while preserving attributes, form field names, IDs, `{{tokens}}`, and required-field behaviour. User-entered messages are not rendered as HTML.

## Language selector

Portuguese is the default. Only `?lang=pt` and `?lang=en` are supported; an unsupported value falls back to Portuguese. The native header disclosure presents decorative local flags and explicit language labels, works with keyboard input, and closes on Escape or an outside click. Choosing a language reloads the page with that parameter, preserving the current hash and other query parameters. Reloading the same URL retains the language. No language cookie or local/session storage is used.

`i18n.js` renders the chosen language before `script.js` initialises interactions. Marker spans are replaced with text nodes, preserving the original CSS structure. Dynamic content is read from the same selected catalogue. The document language is `pt-PT` or `en-GB`.

## Serving and verification

Deploy `translations.js` and `i18n.js` alongside `index.html`, `styles.css`, `script.js` and `assets/`. Script order is translations → i18n → Leaflet → interactions; all are local deferred classic scripts, so direct `file://` opening still works. The existing map limitation for file viewing is unchanged.

Page text now requires JavaScript to render from the catalogue. A short bilingual notice with direct email/telephone links is available without JavaScript. There is no server-rendered or pre-rendered language page in this build-free setup.

Refresh the `?v=` hash in `index.html` for each edited JS/CSS file, using the first 12 characters of SHA-256. Check both language URLs, desktop/mobile navigation, footer disclosures, policy dialogs, product preselection, required-field validation, and encoded email subject/body after a content change. Legal translations remain drafts for company review.
