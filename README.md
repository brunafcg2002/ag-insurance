# A. Gonçalves - Seguros

A responsive insurance homepage with PT Sans, a blue and neutral palette, photographic hero, overlapping carousel, service grid, inset image captions, and patterned contact section.

The company name and icon come from [the existing company website](http://agoncalves.com.pt/index.html). Visitor-facing copy is in **European Portuguese**. It implements the homepage only; navigation stays within the page and cards open detail dialogs.

## Preview

Open `index.html` directly in your browser. No installation or build step is needed. Use an HTTP preview to view the interactive map; direct file opening retains the address and directions link.

For a local HTTP preview, run any static server. If Python 3 is installed:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Then open http://127.0.0.1:8000. Deploy by uploading `index.html`, `styles.css`, `script.js`, and `assets/` together to any static host. Relative asset paths also support hosting in a subdirectory.

## Editing

- `index.html`: homepage markup, insurance cards, and advice cards. Page content is available without JavaScript.
- `styles.css`: design tokens, typography, component styles, responsive layouts, and reduced-motion support.
- `script.js`: navigation, carousel, dialogs, and their supporting content.
- `assets/`: local photographs, fonts, favicon, and vendored Leaflet 1.9.4 with its license. Map tiles are fetched externally only when the location section approaches the viewport.
- `AGENTS.md`: minimal instructions for future coding work.
- [Design system](docs/design-system.md): reference measurements and component conventions.
- [Asset sources](docs/assets.md): source URLs and font licensing.
- [Brand variants](docs/brand-assets.html): original icon and blue/white SVG variants.

The contact dialog prepares a message and can copy it to the clipboard. It does **not** send or persist form data. An actual submission endpoint has not been configured. Copy and insurance categories are draft content for company review; no staff profiles, testimonials, business statistics, or insurer partnerships have been invented.

## Verification

Preview with a static server and check the desktop/mobile layouts and affected interactions. With Node.js available, `node --check script.js` provides an optional JavaScript syntax check; Node.js is not required to run the site.

Migration checks covered direct file opening, subdirectory hosting, content with JavaScript disabled, local asset loading, responsive widths from 320 to 1920px, mobile navigation, carousel controls, dialogs, and contact-message preparation.

## Location map

The location section uses locally vendored Leaflet, OpenStreetMap street tiles, and Esri World Imagery satellite tiles. It needs internet access, with no npm install or build step. Visible attribution changes with the active layer. The custom pin uses the company symbol and the approved palette; controls support street/satellite switching, zoom, and recentering. Wheel zoom is disabled so the map does not interrupt page scrolling. The privacy dialog explains external map requests.

The address and contact details were verified against [the company website](http://agoncalves.com.pt/index.html) and [its Allianz listing](https://www.allianz.pt/mediador/agoncalves.html). The owner supplied the exact Google Maps place location: `41.278481, -8.282931`. `officeLocation` in `script.js`, the custom pin, recentering, and the directions link use that location. These are the place coordinates from the listing, rather than the map viewport centre in its URL.
