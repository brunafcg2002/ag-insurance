import { siteURL } from '../frontend/seo/metadata.js';

export default function sitemap() {
  return ['/', '/en'].map((path) => ({ url: new URL(path, siteURL).href }));
}
