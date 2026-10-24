# Project instructions

- Use plain HTML, CSS, and JavaScript. No frameworks, package dependencies, or build step.
- Keep homepage markup in `index.html`, styling in `styles.css`, and local assets in `assets/`.
- Follow `docs/design-system.md`: PT Sans with `#013781`, `#f5f9ff`, and `#011a3d`. Keep layouts responsive and controls keyboard accessible.
- Use European Portuguese as the default visitor language and British English for EN. Keep visitor-facing copy in the matching PT/EN catalogues in `translations.js`; see `docs/translations.md`. The company is A. Gonçalves - Seguros. Verify business facts; insurance descriptions remain draft copy.
- The contact form only prepares a message; actual sending requires separate configuration.
- The map uses local Leaflet files and external street/satellite tiles. Preserve provider attribution. The owner-confirmed location is `41.278481, -8.282931`; keep the pin and directions destination consistent.
- Verify changes with a static local server and check desktop/mobile layouts and affected interactions. Update documentation when setup changes.

- When changing `styles.css`, `script.js`, `i18n.js`, or `translations.js`, refresh its `?v=` query parameter in `index.html` with the first 12 characters of the file’s SHA-256 so deployed updates bypass stale asset caches.
