import '../styles/globals.css';

export default function DocumentLayout({ children, language }) {
  return (
    <html lang={language === 'pt' ? 'pt-PT' : 'en-GB'}>
      <head>
        <link rel="stylesheet" href="/assets/vendor/leaflet/leaflet.css" />
        <link rel="preload" href="/assets/fonts/pt-sans-400.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
