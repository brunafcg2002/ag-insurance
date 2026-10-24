"use strict";

(() => {
  const supported = ["pt", "en"];
  const requested = new URLSearchParams(location.search).get("lang");
  const defaultLanguage = document.documentElement.lang.startsWith("en") ? "en" : "pt";
  const language = supported.includes(requested) ? requested : defaultLanguage;
  const locale = window.siteTranslations[language];
  function interpolate(text, values = {}) {
    return text.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? "");
  }
  const t = (key, values) => interpolate(locale.ui[key], values);
  const renderText = (key, values) => interpolate(locale.templates[key], values);
  window.siteI18n = { language, locale, t, renderText };

  document.documentElement.lang = language === "pt" ? "pt-PT" : "en-GB";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const text = locale.home[element.dataset.i18n];
    if (element.tagName === "SPAN") element.replaceWith(document.createTextNode(text));
    else element.textContent = text;
  });
  ["aria-label", "alt", "title", "placeholder", "content"].forEach((attribute) => {
    document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((element) => {
      element.setAttribute(attribute, locale.home[element.getAttribute(`data-i18n-${attribute}`)]);
    });
  });
  document.querySelectorAll("[data-i18n-ui]").forEach((element) => {
    element.textContent = t(element.dataset.i18nUi);
  });

  const picker = document.querySelector(".language-picker");
  const summary = picker.querySelector("summary");
  summary.setAttribute("aria-label", t("chooseLanguage"));
  picker.querySelector(".language-current-code").textContent = language.toUpperCase();
  picker.querySelector(".language-current-flag").src = `assets/flags/${language}.svg`;
  picker.querySelectorAll("[data-language]").forEach((link) => {
    function updateURL() {
      const url = new URL(location.href);
      url.searchParams.delete("lang");
      const directory = url.pathname.endsWith("/") ? url.pathname : url.pathname.slice(0, url.pathname.lastIndexOf("/") + 1);
      url.pathname = `${directory}${link.dataset.language === "pt" ? "index.html" : "en.html"}`;
      link.href = url.href;
    }
    updateURL();
    link.addEventListener("pointerdown", updateURL);
    window.addEventListener("hashchange", updateURL);
    if (link.dataset.language === language) link.setAttribute("aria-current", "true");
  });
  document.addEventListener("click", (event) => {
    if (!picker.contains(event.target)) picker.open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && picker.open) {
      picker.open = false;
      summary.focus();
    }
  });
})();
