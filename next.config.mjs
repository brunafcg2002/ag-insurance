export default {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/en.html', destination: '/en', permanent: true },
      { source: '/', has: [{ type: 'query', key: 'lang', value: 'en' }], destination: '/en', permanent: false },
      { source: '/en', has: [{ type: 'query', key: 'lang', value: 'pt' }], destination: '/', permanent: false },
    ];
  },
};
