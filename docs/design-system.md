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

- **Header:** 70px high, sticky, with a solid white background, a subtle bottom border and shadow, and no fade-in animation. The current section has a pale-blue highlight, and the contact button is filled primary blue. At 1100px and below, navigation becomes a full-screen menu with a 260ms downward reveal and a subtle stagger of the links. Reduced-motion preferences disable the menu animation.
- **Hero:** a full-width cover photograph with a layered left-hand white wash. Headline stays within 590px. Height is at least one viewport on desktop and 80% of a viewport on mobile.
- **Carousel:** overlaps the hero by 270px. Three Zurich campaign cards open conditions dialogs with source links and contact actions. Cards display product, benefit, eligibility summary, and expiry date. Each desktop slide has a 270px text panel and 270px image. Three slides are visible on desktop, two below 992px, and one below 768px. Centred pagination dots replace arrow buttons: one dot per visible group (controls are hidden when all three cards fit), expanding smoothly into a navy pill when selected. Each dot has a 44px touch target and an accessible page label. Click, keyboard arrows, Home/End, and swipes change pages; the card track slides smoothly. Offscreen slides are inert and hidden from the accessibility tree. Reduced-motion preferences disable these animations.
- **Insurer strip:** unboxed monochrome blue logos below the insurance introduction, inspired by the moving certification rows in [FSM’s Responsible Production section](https://www.fsm.pt/). A continuous 36-second horizontal loop uses two identical groups and softly faded edges. Duplicate logos are inert and hidden from assistive technology. Touch, clicks, hover, and keyboard focus do not pause the loop; reduced-motion preferences and no-JavaScript viewing show all four logos statically in one row. Local vector SVGs and a transparent PNG work via HTTP and direct file opening.
- **Service grid:** three columns on desktop and two on tablet. Below 768px, show all six options as a compact three-column, two-row grid: 32px icons, short 15px labels, and 108px minimum tile height. Mobile tiles use 10px gaps and square corners. Longer descriptions are available in the existing detail dialogs. Desktop hover and keyboard focus reveal descriptions on a dark navy background; tablet descriptions remain visible.
- **Image captions:** rectangular captions overlap photographs and are inset from the left edge. FAQ cards use a similar inset panel with a category and answer action. Risk scenario cards show their category, headline, and supporting text and open a matching dialog.
- **About section:** a split introduction, owner-supplied family photograph, and three numbered company highlights (experience, family history, and personal support). The portrait is cropped to keep the family visible on desktop and mobile.
- **Location map:** a light, desaturated street map with a white contact panel and a custom navy pin carrying the white company symbol. The `Mapa` / `Satélite` buttons use the primary blue for the selected state and expose `aria-pressed`. Satellite imagery retains its natural colours. Controls and map labels use PT Sans; provider attribution remains visible. On mobile the map preview sits above a separate compact place card containing only the address and directions; contact links are in the footer and contact dialogs. The permanent company tooltip is hidden on mobile to keep the pin and map controls clear; the marker retains its accessible name and address popup. The pin recentres as the layout changes.
- **Dialogs:** native modal dialogs with labelled headings, Escape dismissal, focus containment, and backdrop dismissal. Opening uses a 180ms fade, 97–100% scale, and 6px upward settle, plus a 160ms backdrop fade. The entrance restarts when switching dialog views; the backdrop stays steady. Closing reverses the fade, scale, and vertical offset over 160ms, including the backdrop. The dialog stays modal until the animation finishes, then returns focus to its opener. Close button, Escape, and backdrop dismissal share this path. Reduced-motion preferences disable entrance and exit animations. User-provided message text is inserted with `textContent`.

## Motion and accessibility

Entrance animations use opacity and small vertical translations; the carousel uses a restrained horizontal transition. `prefers-reduced-motion` disables animations, transitions, and smooth scrolling. Content remains visible without IntersectionObserver support.

The page includes a skip link, semantic landmarks, one H1, visible focus indicators, labelled controls, and form labels. Navigation links point to homepage sections; no secondary pages are required.

## Content configuration

Homepage content and cards are edited directly in `index.html`. Navigation labels begin with a capital letter. The `campaigns`, `solutions`, `faqs`, and `scenarios` arrays near the top of `script.js` contain the corresponding dialog content. Text follows the client-supplied October 2026 PDF in European Portuguese; insurance descriptions remain draft copy. Review offering descriptions and configure the contact destination before enabling message submission.

Main navigation follows the page order: Campanhas, Os nossos seguros, A sua proteção, Quem somos, Perguntas frequentes, followed by the contact action. The campaign carousel has its own `#campanhas` anchor.

## Mobile carousels and footer

Below 768px, risk scenarios and FAQ cards use native horizontal scrolling with snap alignment and one card per view. Pagination supports clicks, arrow keys, Home/End, and scroll position changes; offscreen cards are inert and hidden from assistive technology. Desktop and tablet retain three-column grids. Risk-card captions are inset equally on both sides on every screen size.

The mobile footer presents the main contact action at full width, then a single unboxed column for landline, mobile, and email under “Contacte-nos”, Explore and insurance lists that can each be expanded with a labelled button. Each list expands and collapses with a 220ms height/opacity animation, supports interrupted toggles, and skips motion for reduced-motion preferences. Desktop keeps both sets of links visible. The logo and low-emphasis legal links sit at the bottom. Without JavaScript both lists stay expanded.

## Mobile refinements

Below 768px, section headings use balanced wrapping and 28–34px sizing; introductory text uses 16px/1.55. Campaign text panels are 250px with 20px padding, and campaign/scenario images use a 4:3 viewport. Risk captions retain equal side insets. FAQ cards omit the repeated “Perguntas frequentes” metadata on mobile.

About steps place each paragraph across the full available width, below the numbered heading. The mobile location layout shows the map first and a compact place card below, with the company name, address, and a full-width directions button. It hides the redundant “O nosso espaço” eyebrow. Telephone and email links are grouped in the footer and contact dialogs, with a 44px minimum touch area. The map is 300–360px high on mobile, with layer controls anchored inside its bounds. Mobile dialogs have a 44px close control and full-width primary actions of at least 48px height.

Directional and link-out icons use inline SVG with `currentColor`, rather than Unicode arrow characters, to avoid emoji rendering on iOS.

## Contact select and scrollbars

The contact form keeps its native select as the form-data source and enhances it with a select-only combobox, using PT Sans, pale-blue option focus, and primary-blue selection. It supports pointer selection, Arrow keys, Home/End, typeahead, Enter/Space to confirm, Tab to confirm and move on, and Escape to discard navigation without dismissing the modal. The popup chooses above or below the field based on available room inside the modal. Form submission and initial insurance selection remain tied to the native select.

Page, modal, and dropdown scrollbars use the primary blue and surface colour on desktop and mobile where browser styling is supported. WebKit scrollbar thumbs have square corners; standard scrollbar properties provide a fallback. OS-controlled overlay indicators, especially on iOS, can retain native styling. No custom scrolling behaviour replaces the browser's scrolling.

Mobile service cards and the location panel have square corners, consistent with the site’s rectangular panels. Pagination dots, the circular map pin, and numbered badges retain their intentional shapes.

## Legal footer

The bottom legal area keeps a compact wrapping list on desktop and a two-column list on mobile, with 44px minimum targets. Complaints information and the rectangular Electronic Complaints Book link each span the mobile row. Local policies use the existing animated native dialog; the official complaints platform opens directly. Social contacts use local inline SVG icons and ordinary external links.
