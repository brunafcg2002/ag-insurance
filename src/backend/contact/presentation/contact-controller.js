import { MAX_BYTES, readJSON, readSubmissionMetadata } from './http-body.js';

const errorStatuses = {
  invalid_input: 400,
  verification_failed: 403,
  verification_unavailable: 503,
  delivery_unavailable: 503,
};

export function createContactController({ sendContactEnquiry, config }) {
  return async function contact(request) {
    const origin = request.headers.get('origin');
    const allowed = Boolean(origin && config.allowedOrigins.includes(origin));
    const headers = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', Vary: 'Origin' };
    if (allowed) headers['Access-Control-Allow-Origin'] = origin;
    const json = (status, data) => new Response(JSON.stringify(data), { status, headers });

    if (origin && !allowed) return json(403, { error: 'origin_denied' });
    if (request.method === 'OPTIONS') {
      if (!allowed) return json(403, { error: 'origin_denied' });
      return new Response(null, { status: 204, headers: {
        ...headers, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '600',
      } });
    }
    if (request.method === 'GET') return json(200, {
      enabled: config.enabled, siteKey: config.enabled ? config.siteKey : null,
    });
    if (request.method !== 'POST') return new Response(null, { status: 405, headers: { ...headers, Allow: 'GET, POST, OPTIONS' } });
    if (!allowed) return json(403, { error: 'origin_denied' });
    if (!config.enabled) return json(503, { error: 'unavailable' });
    if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') return json(415, { error: 'invalid_input' });
    if (Number(request.headers.get('content-length')) > MAX_BYTES) return json(413, { error: 'too_large' });

    let input;
    try { input = await readJSON(request); }
    catch (error) {
      return error.message === 'too_large' ? json(413, { error: 'too_large' }) : json(400, { error: 'invalid_input' });
    }
    const metadata = readSubmissionMetadata(input);
    if (!metadata) return json(400, { error: 'invalid_input' });
    const result = await sendContactEnquiry({ input, ...metadata, hostname: new URL(origin).hostname });
    return json(result.error ? errorStatuses[result.error] || 503 : 200, result);
  };
}
