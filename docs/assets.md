# Asset sources

All page images and fonts are served locally. The company website was inspected on 18 October 2026.

| Local file                        | Source                                                                                                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets/images/bruno.jpg`         | Office and team photograph supplied by the owner; used in the homepage hero.                                                                               |
| `assets/images/quem_somos.jpg`    | Family photograph supplied by the owner; used in the Quem somos section.                                                                                   |
| `assets/images/home-modern.jpg`          | [Unsplash contemporary white house](https://images.unsplash.com/photo-1523217582562-09d0def993a6), downloaded at 1600px, JPEG quality 85; illustrative image for the home risk card.                                                                  |
| `assets/images/car.jpg`           | [Unsplash automobile photograph](https://images.unsplash.com/photo-1503376780353-7e6692767b70)                                                             |
| `assets/images/business.jpg`      | [Unsplash office photograph](https://images.unsplash.com/photo-1497366811353-6870744d04b2)                                                                 |
| `assets/fonts/pt-sans-*.woff2`    | Self-hosted PT Sans Latin subsets. [PT Sans family](https://fonts.google.com/specimen/PT+Sans), SIL Open Font License; included in `assets/fonts/OFL.txt`. |

The original company icon is preserved in `assets/brand/logo-original.jpg`, copied from [the existing company website](http://agoncalves.com.pt/assets/images/a-bruno-gincalves.jpg). The SVG variants reproduce its silhouette in site blue (`#013781`) and white. The favicon uses the same symbol. Insurance icons and arrow markup were authored for this project. Stock photography is illustrative and does not depict confirmed employees or customers of A. Gonçalves - Seguros.

Background-specific logo files are retained together: `assets/brand/logo-blue-on-light.svg` uses `#f5f9ff`, and `assets/brand/logo-blue-on-white.svg` uses pure white (`#ffffff`). Both use the approved `#013781` symbol.

## Map

- `assets/vendor/leaflet/`: [Leaflet 1.9.4](https://leafletjs.com/), distributed locally with its BSD 2-Clause license. No package installation is required.
- Street tiles: [OpenStreetMap](https://www.openstreetmap.org/copyright), styled in the browser. Requests follow the [tile usage policy](https://operations.osmfoundation.org/policies/tiles/); tiles are not archived or prefetched for offline use.
- Satellite tiles: [Esri World Imagery](https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer), with attribution to Esri, Vantor, Earthstar Geographics, and the GIS User Community.
- Pin: CSS geometry using the existing local white company symbol.
- Office address and contact details: [company website](http://agoncalves.com.pt/index.html), corroborated by the [Allianz agency listing](https://www.allianz.pt/mediador/agoncalves.html).
- Map coordinates: `41.278481, -8.282931`, confirmed by the owner via the [Google Maps place listing](https://www.google.com/maps/place/Allianz+Seguros+-+Bruno+Gon%C3%A7alves/@41.278485,-8.2855059,17z/data=!3m1!4b1!4m6!3m5!1s0xd2492eb8b8a94c1:0x7be9e2dfab6b34a8!8m2!3d41.278481!4d-8.282931!16s%2Fg%2F11hbv5my8m). The pin, recenter control, and directions link share this destination.

## Client photographs — October 2026 update

The owner supplied the following photographs alongside the website update PDF. Local website copies are resized to a maximum of 1600px and JPEG quality 78; unused original uploads were removed during pre-commit cleanup.

| Local file | Original upload | Placement |
| --- | --- | --- |
| `assets/images/quem_somos.jpg` | `quem_somos.jpg` | About section: four family members on the stairs; existing local copy retained. |
| `assets/images/analise-seguros.jpg` | `P1058668.jpg` | FAQ about reviewing existing insurance: documents being reviewed. |
| `assets/images/bruno_photo.jpg` | `bruno_photo.jpg` | FAQ about proposals from different insurers: Bruno on the telephone. Resized to 1600px, JPEG quality 82. |
| `assets/images/atendimento.jpg` | `antonio.jpg` | FAQ about remote service: colleague working at a computer. |

Only images referenced by the homepage or the brand reference page are retained in the project. The source PDF and unused/duplicate uploads were removed during pre-commit cleanup.

## Official Zurich campaign images

The opening cards use imagery taken directly from the corresponding promotion blocks on the official Zurich Portugal product pages, retrieved on 23 October 2026. They replace the generated placeholders, which have been removed from the project. Images are served locally at 1000 × 1000 pixels. Home and health PNGs were converted to JPEG quality 86 for the site; the Auto JPEG is unchanged. No recolouring or AI editing was applied.

| Local file | Official campaign image | Campaign page |
| --- | --- | --- |
| `assets/images/zurich-campanha-casa.jpg` | [Family moving home](https://edge.sitecorecloud.io/zurichinsurf8c0-zwpshared-prod-d824/media/project/zurich-headless/portugal/images/02-para-si/02-habitacao/lar-flex/stage-lar-promo.png?iar=0&w=1000) | [Zurich Lar Flex](https://www.zurich.com.pt/pt-pt/particulares/habitacao/lar-flex) |
| `assets/images/zurich-campanha-auto.jpg` | [Zurich Auto promotion](https://edge.sitecorecloud.io/zurichinsurf8c0-zwpshared-prod-d824/media/project/zurich-headless/portugal/images/02-para-si/01-automovel/zurich-auto/2026/zurich-auto-promo-2026-1.jpg?iar=0&w=1000) | [Zurich Auto](https://www.zurich.com.pt/pt-pt/particulares/automovel/automovel) |
| `assets/images/zurich-campanha-saude.jpg` | [WHOOP campaign creative](https://edge.sitecorecloud.io/zurichinsurf8c0-zwpshared-prod-d824/media/project/zurich-headless/portugal/images/02-para-si/06-saude/01-zurich-saude/hero-whoop.png?iar=0&w=1000) | [Zurich Saúde](https://www.zurich.com.pt/pt-pt/particulares/saude/zurich-saude) |

Campaign imagery belongs to Zurich and its respective rights holders. Local card crops are controlled by CSS; source attribution is retained here.

## Insurer logos

Downloaded from official insurer sites on 23 October 2026 and served locally in the moving logo strip below the insurance introduction. Allianz, Zurich, and Real Vida use direct vector paths recoloured to primary blue, without nested images or SVG raster filters, to improve Safari rendering. Lusitania uses its original 226 × 34 transparent PNG with pixels recoloured directly; its source resolution remains a limitation on high-density screens. These local images also work through `file://`. Logo URLs carry content hashes to refresh deployed caches. These marks identify the four insurers named by the owner.

| Local file | Official source |
| --- | --- |
| `assets/brand/insurers/allianz-blue.svg` | [Allianz Portugal header logo](https://www.allianz.pt/content/dam/onemarketing/system/allianz-logo.svg) |
| `assets/brand/insurers/zurich-blue.svg` | [Zurich corporate header logo](https://www.zurich.com/-/media-assets/project/zurich-headless/shared/corporate/zurich-logo-blue.svg?iar=0) |
| `assets/brand/insurers/lusitania-blue.png` | [Lusitania header logo](https://www.lusitania.pt/media/hjepeceq/logotipo.png) |
| `assets/brand/insurers/real-vida-blue.svg` | Inline SVG from the header of [Real Vida Seguros](https://www.realvidaseguros.pt/), recoloured in the local vector. |

Logos remain trademarks of their respective owners. No external logo requests are made by the homepage.

Language flags (`assets/flags/pt.svg`, `assets/flags/en.svg`) are locally authored SVG illustrations used decoratively alongside explicit PT/EN language labels. The English option uses the UK flag; accessible labels identify the language.
