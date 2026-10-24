# A. Gonçalves - Seguros

A responsive insurance homepage with PT Sans, a blue and neutral palette, photographic hero, overlapping campaign carousel, service grid, and inset image captions.

The company name and icon come from [the existing company website](http://agoncalves.com.pt/index.html). Visitor-facing copy is available in **European Portuguese and British English**, with Portuguese as the default. It implements the homepage only; navigation stays within the page and cards open detail dialogs.

## Preview

Open `index.html` directly in your browser. No installation or build step is needed. Use an HTTP preview to view the interactive map; direct file opening retains the address and directions link.

For a local HTTP preview, run any static server. If Python 3 is installed:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open http://localhost:8000. If the layout differs from opening the file directly, reset browser zoom to 100% (`Cmd+0` on macOS) and reload. Browsers can save different zoom levels for `localhost`, `127.0.0.1`, and local files. Deploy by uploading `index.html`, `en.html`, `sitemap.xml`, `styles.css`, `translations.js`, `i18n.js`, `contact-config.js`, `script.js`, and `assets/` together to any static host. Relative asset paths also support hosting in a subdirectory.

## Editing

- `index.html`: Portuguese homepage markup, translation markers and static text.
- `en.html`: static English page, generated from the same structure and translation catalogue.
- `styles.css`: design tokens, typography, component styles, responsive layouts, and reduced-motion support.
- `script.js`: navigation, carousel, dialogs, contact validation and email handoff.
- `translations.js`: all PT/EN homepage, dialog, form, map and legal copy.
- `i18n.js`: language selection and catalogue rendering; see [translation editing](docs/translations.md).
- `contact-config.js`: public endpoint URL only.
- `worker.mjs`, `server/contact.mjs`, `wrangler.jsonc`: optional plain-JavaScript Cloudflare endpoint; see [delivery setup](docs/contact-delivery.md).
- `assets/`: local photographs, fonts, favicon, and vendored Leaflet 1.9.4 with its license. Map tiles are fetched externally only when the location section approaches the viewport.
- `AGENTS.md`: minimal instructions for future coding work.
- [Design system](docs/design-system.md): reference measurements and component conventions.
- [Asset sources](docs/assets.md): source URLs and font licensing.
- [Brand variants](docs/brand-assets.html): original icon and blue/white SVG variants.

The contact dialog requires a name, valid email, insurance option, and non-blank message. “Send message” is currently disabled through `contactConfig.enabled: false`. A Cloudflare Worker can send through Resend once delivery is explicitly enabled and its server-only credentials and security verification are configured. The former email-app/clipboard form flow has been removed. Direct telephone and email links remain available. See [delivery setup](docs/contact-delivery.md). Insurance descriptions remain draft content for company review.

## Verification

Preview with a static server and check the desktop/mobile layouts and affected interactions. With Node.js available, `node --check script.js` provides an optional JavaScript syntax check; Node.js is not required to run the site.

Migration checks covered direct file opening, subdirectory hosting, content with JavaScript disabled, local asset loading, responsive widths from 320 to 1920px, mobile navigation, carousel controls, dialogs, and contact-message preparation.

## Location map

The location section uses locally vendored Leaflet, OpenStreetMap street tiles, and Esri World Imagery satellite tiles. It needs internet access, with no npm install or build step. Visible attribution changes with the active layer. The custom pin uses the company symbol and the approved palette; controls support street/satellite switching, zoom, and recentering. Wheel zoom is disabled so the map does not interrupt page scrolling. The privacy dialog explains external map requests.

The address and contact details were verified against [the company website](http://agoncalves.com.pt/index.html) and [its Allianz listing](https://www.allianz.pt/mediador/agoncalves.html). The owner supplied the exact Google Maps place location: `41.278481, -8.282931`. `officeLocation` in `script.js`, the custom pin, recentering, and the directions link use that location. These are the place coordinates from the listing, rather than the map viewport centre in its URL.

## Client content update — October 2026

The homepage follows the client-supplied `WEBSITE A. GONÇALVES.pdf`: six insurance options (Automóvel, Saúde, Habitação, Vida, Acidentes de Trabalho, Poupança e Investimento), three risk scenarios, and three FAQs with answer dialogs. Insurance and scenario dialogs lead to the existing message-preparation form. The form’s send button remains disabled until direct delivery is enabled and configured.

The PDF is the owner-supplied source for the 40+ years claim, family history, four named insurers, and service information. Allianz contact details are corroborated by its [agency listing](https://www.allianz.pt/mediador/agoncalves.html). General statements about mandatory cover were checked against the ASF's [work accident insurance](https://www.asf.com.pt/web/site-pc/seguros/seguro-de-acidentes-de-trabalho) and [home insurance](https://www.asf.com.pt/pt/web/site-pc/seguros/seguro-de-habita%C3%A7%C3%A3o) information. Insurance descriptions remain draft copy for company review.

Selected owner-supplied photographs are optimised local JPEGs; see [asset sources](docs/assets.md) for the original-to-site mapping. Unused original uploads and the source PDF were removed during pre-commit cleanup; only assets referenced by site code or the brand reference page are retained. Navigation labels start with capital letters.

Footer call links distinguish the landline (`255 820 960`) from the owner-supplied mobile (`963 667 526`), with matching icons and `tel:` destinations. Both numbers and the company email also appear in the contact and message-preview dialogs. The map card contains only the address and directions.

## Campaign cards

The opening carousel now presents Zurich campaigns. The previous three company highlights are the numbered points in “Quem somos”. Cards show their expiry date and open a conditions dialog with the official source and a contact action that selects the matching insurance category.

The three offers were checked on 23 October 2026 and expire on 31 December 2026. Review or replace the static campaign copy before expiry; there is no automatic feed or date-based removal. Update images in `index.html`, card copy in each language’s `home` catalogue, and the `campaigns` arrays in `translations.js` for conditions, dates, source links, and contact categories. Keep both consistent. See [campaign research](docs/campaigns.md) for verified terms and source notes.

The insurer strip uses local vector SVGs and a transparent PNG, without SVG raster filters or external CSS mask requests. It works through both `file://` and HTTP and keeps moving after touch/click. Reduced-motion preferences show a static row.

## Asset cache versions

The language pages load `styles.css`, `script.js`, `i18n.js`, `translations.js` and `contact-config.js` with a `?v=` content hash (first 12 characters of the file's SHA-256). Update the matching query parameter whenever either file changes. This keeps GitHub Pages/browser caches from mixing new markup with old CSS or JavaScript; it needs no runtime dependencies or build step.

The privacy notice covers the current form, direct email contact, hosting, map providers, and visitor rights. See [privacy notes](docs/privacy.md) for verified data flows and the legal identity details still awaiting owner confirmation.

The desktop/mobile footer also provides terms of use, a legal notice, cookie information, complaints/dispute information, and direct access to the official Electronic Complaints Book. See [legal document notes](docs/legal.md) for company fields to confirm and source references. Social links open the owner-supplied Instagram and Facebook pages without embedded widgets.

PT and EN have static HTML content, titles and descriptions, with canonical/hreflang links and `sitemap.xml`. `node tools/render-pages.mjs` refreshes these outputs from the catalogue without an application build; pass the final `--site-url=` when hosting changes. The default remains the existing GitHub Pages URL.
