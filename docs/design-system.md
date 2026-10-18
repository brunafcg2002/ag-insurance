# Design system

Visual foundations for A. Gonçalves - Seguros. The company name and original icon were verified on the existing company website on 18 October 2026.

## Foundations

| Token   | Value       | Use                                                                        |
| ------- | ----------- | -------------------------------------------------------------------------- |
| Primary | `#013781`   | Brand symbol, links, buttons, headline emphasis, icons, CTA pattern        |
| Surface | `#f5f9ff`   | Alternating sections, carousel panels, service cards, hero wash            |
| Dark    | `#011a3d`   | Headings, body copy, navigation, button and service-card hover backgrounds |
| White   | `#ffffff`   | Page background, inset panels, inverse text and logo                       |
| Muted   | `#011a3db3` | Secondary text, derived from dark at 70% opacity                           |
| Border  | `#01378124` | Grid dividers and separators, derived from primary at 14% opacity          |

PT Sans is self-hosted in its native regular (400) and bold (700) weights. Body copy is 18px. Display headings use weight 400. The hero is 75px below 1440px and 70px at 1440px and wider. Section headings are 52px. Navigation and buttons are 16px and weight 700. Carousel titles are 28px; desktop service titles are 34px. Synthetic font weights are disabled.

The approved brand palette is `#013781`, `#f5f9ff`, and `#011a3d`. Use white for inverse treatments and opacity variants of these brand colours for borders, overlays, and secondary text. Logo variants and the favicon use the same primary blue; the archived original JPG remains unchanged.

The container is 1170px wide, increasing to 1350px at 1440px, including 36px padding on each side. Standard section padding and grid gaps are 90px and 36px. Mobile uses 18px side padding, 54px section padding, and 24px gaps. These values are declared at the top of `styles.css`.

## Components

- **Header:** 70px high, sticky, with a solid white background, a subtle bottom border and shadow, and no fade-in animation. The current section has a pale-blue highlight, and the contact button is filled primary blue. At 991px and below, navigation becomes a full-screen menu.
- **Hero:** a full-width cover photograph with a layered left-hand white wash. Headline stays within 590px. Height is at least one viewport on desktop and 80% of a viewport on mobile.
- **Carousel:** overlaps the hero by 270px. Each desktop slide has a 270px text panel and 270px image. Three slides are visible on desktop, two below 992px, and one below 768px. Controls support click, keyboard arrows, and touch swipes. Offscreen slides are inert and hidden from the accessibility tree.
- **Service grid:** three columns on desktop and two on tablet. Below 768px, show all six options as a compact three-column, two-row grid: 32px icons, short 15px labels, and 108px minimum tile height. Mobile tiles use 10px gaps and corner radii. Longer descriptions are available in the existing detail dialogs. Desktop hover and keyboard focus reveal descriptions on a dark navy background; tablet descriptions remain visible.
- **Image captions:** rectangular captions overlap photographs and are inset from the left edge. Advice cards use a similar inset panel with a category and reading action.
- **About section:** a split introduction, owner-supplied family photograph, and three-step approach. The portrait is cropped to keep the family visible on desktop and mobile.
- **Contact section:** blue pattern masks frame a split headline and call to action.
- **Location map:** a light, desaturated street map with a white contact panel and a custom navy pin carrying the white company symbol. The `Mapa` / `Satélite` buttons use the primary blue for the selected state and expose `aria-pressed`. Satellite imagery retains its natural colours. Controls and map labels use PT Sans; provider attribution remains visible. On mobile the contact panel sits above the map, and the pin recentres as the layout changes.
- **Dialogs:** native modal dialogs with labelled headings, Escape dismissal, focus containment, and backdrop dismissal. User-provided message text is inserted with `textContent`.

## Motion and accessibility

Entrance animations use opacity and small vertical translations; the carousel uses a restrained horizontal transition. `prefers-reduced-motion` disables animations, transitions, and smooth scrolling. Content remains visible without IntersectionObserver support.

The page includes a skip link, semantic landmarks, one H1, visible focus indicators, labelled controls, and form labels. Navigation links point to homepage sections; no secondary pages are required.

## Content configuration

Homepage content and cards are edited directly in `index.html`. The `solutions` and `guides` arrays near the top of `script.js` contain the corresponding dialog content. Current text is draft European Portuguese. Review offering descriptions and configure the contact destination before enabling message submission.
