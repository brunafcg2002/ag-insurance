# Asset sources

All page images and fonts are served locally. The company website was inspected on 18 October 2026.

| Local file                        | Source                                                                                                                                                     |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `assets/images/bruno.jpg`         | Office and team photograph supplied by the owner; used in the homepage hero.                                                                               |
| `assets/images/quem_somos.jpg`    | Family photograph supplied by the owner; used in the Quem somos section.                                                                                   |
| `assets/images/CTA-Bg-Top.svg`    | Upper contact-section pattern                                                                                                                              |
| `assets/images/CTA-Bg-Bottom.svg` | Lower contact-section pattern                                                                                                                              |
| `assets/images/family.jpg`        | [Unsplash family photograph](https://images.unsplash.com/photo-1511895426328-dc8714191300)                                                                 |
| `assets/images/home.jpg`          | [Unsplash cabin photograph](https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8)                                                                  |
| `assets/images/car.jpg`           | [Unsplash automobile photograph](https://images.unsplash.com/photo-1503376780353-7e6692767b70)                                                             |
| `assets/images/health.jpg`        | [Unsplash healthcare photograph](https://images.unsplash.com/photo-1576091160399-112ba8d25d1d)                                                             |
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
