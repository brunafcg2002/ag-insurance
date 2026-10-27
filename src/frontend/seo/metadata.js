import { translations } from '../i18n/translations.js';

// Set SITE_URL to the final deployment URL; previews default to localhost.
export const siteURL = new URL(process.env.SITE_URL || 'http://localhost:3000');

export function pageMetadata(language) {
  const { home } = translations[language];
  return {
    metadataBase: siteURL,
    title: home.page_title,
    description: home.a_goncalves_seguros_o_nosso_legado_e_proteger_o_seu_conheca_as_no,
    icons: { icon: '/assets/favicon.svg' },
    alternates: {
      canonical: language === 'pt' ? '/' : '/en',
      languages: { 'pt-PT': '/', 'en-GB': '/en', 'x-default': '/' },
    },
  };
}
