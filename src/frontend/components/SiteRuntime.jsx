'use client';

import { useEffect } from 'react';
import { translations } from '../i18n/translations.js';
import { initializeSite } from '../interactions/site-interactions.js';

const initialisedDocuments = new WeakSet();

export default function SiteRuntime({ language }) {
  useEffect(() => {
    // Language links intentionally perform a full navigation: enhancements own
    // the carousel/dialog/map DOM for the lifetime of this document.
    if (initialisedDocuments.has(document)) return;
    initialisedDocuments.add(document);
    const locale = translations[language];
    const interpolate = (text, values = {}) => text.replace(/\{\{(\w+)\}\}/g, (_, key) => values[key] ?? '');
    initializeSite({
      language, locale,
      t: (key, values) => interpolate(locale.ui[key], values),
      renderText: (key, values) => interpolate(locale.templates[key], values),
      contactConfig: { enabled: true, endpoint: '/api/contact' },
    });
  }, [language]);
  return null;
}
