// Optional content-editing helper, not a runtime build step. No dependencies.
import { readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { runInNewContext } from "node:vm";

const root = new URL("../", import.meta.url);
const read = (name) => readFileSync(new URL(name, root), "utf8");
const write = (name, value) => writeFileSync(new URL(name, root), value);
const escape = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const context = { window: {} };
runInNewContext(read("translations.js"), context);
const locales = context.window.siteTranslations;
const siteArgument = process.argv.find((arg) => arg.startsWith("--site-url="));
const site = new URL(siteArgument ? siteArgument.slice(11) : "https://brunafcg2002.github.io/ag-insurance/");
if (!site.pathname.endsWith("/")) site.pathname += "/";
if (!/^https?:$/.test(site.protocol)) throw new Error("Use an HTTP(S) production site URL.");
site.search = "";
site.hash = "";
const urls = { pt: site.href, en: new URL("en.html", site).href };
let source = read("index.html").replace(/\n?\s*<!-- language SEO -->[\s\S]*?<!-- end language SEO -->/g, "");
for (const file of ["styles.css", "script.js", "translations.js", "i18n.js", "contact-config.js"]) {
  const hash = createHash("sha256").update(read(file)).digest("hex").slice(0, 12);
  source = source.replace(new RegExp(file.replaceAll(".", "\\.") + '(?:\\?v=[a-f0-9]+)?(?=")', "g"), `${file}?v=${hash}`);
}
for (const [language, locale] of Object.entries(locales)) {
  const text = (key) => {
    if (!(key in locale.home)) throw new Error(`Missing ${language}.home.${key}`);
    return escape(locale.home[key]);
  };
  let html = source.replace(/<html lang="[^"]*">/, `<html lang="${language === "pt" ? "pt-PT" : "en-GB"}">`);
  html = html.replace(/<span data-i18n="([^"]+)">[\s\S]*?<\/span>/g, (_, key) => `<span data-i18n="${key}">${text(key)}</span>`);
  html = html.replace(/<title data-i18n="([^"]+)">[\s\S]*?<\/title>/, (_, key) => `<title data-i18n="${key}">${text(key)}</title>`);
  html = html.replace(/<span data-i18n-ui="([^"]+)">[\s\S]*?<\/span>/g, (_, key) => `<span data-i18n-ui="${key}">${escape(locale.ui[key])}</span>`);
  html = html.replace(/<[a-z][^>]*>/gi, (tag) => {
    for (const [, attribute, key] of tag.matchAll(/\sdata-i18n-(aria-label|alt|title|placeholder|content)="([^"]+)"/g)) {
      tag = tag.replace(new RegExp(`(?<![-\\w])${attribute}="[^"]*"`), `${attribute}="${text(key)}"`);
    }
    if (tag.includes('data-language="')) {
      const target = tag.match(/data-language="(pt|en)"/)[1];
      tag = tag.replace(/href="[^"]*"/, `href="${target === "pt" ? "index.html" : "en.html"}"`);
    }
    return tag;
  });
  html = html.replace(/class="language-current-flag" src="[^"]*"/, `class="language-current-flag" src="assets/flags/${language}.svg"`);
  html = html.replace(/<span class="language-current-code">[^<]*<\/span>/, `<span class="language-current-code">${language.toUpperCase()}</span>`);
  html = html.replace("  </head>", `    <!-- language SEO -->\n    <link rel="canonical" href="${escape(urls[language])}" />\n    <link rel="alternate" hreflang="pt-PT" href="${escape(urls.pt)}" />\n    <link rel="alternate" hreflang="en" href="${escape(urls.en)}" />\n    <link rel="alternate" hreflang="x-default" href="${escape(urls.pt)}" />\n    <!-- end language SEO -->\n  </head>`);
  write(language === "pt" ? "index.html" : "en.html", html);
}
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.values(urls).map((url) => `  <url><loc>${escape(url)}</loc></url>`).join("\n")}\n</urlset>\n`);
console.log("Updated PT/EN HTML, SEO links, sitemap and asset hashes from translations.js.");
