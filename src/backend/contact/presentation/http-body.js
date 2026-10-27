export const MAX_BYTES = 16384;

export async function readJSON(request) {
  if (!request.body) throw new Error('invalid_input');
  const reader = request.body.getReader();
  const chunks = [];
  let length = 0;
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    length += value.byteLength;
    if (length > MAX_BYTES) { await reader.cancel(); throw new Error('too_large'); }
    chunks.push(value);
  }
  const bytes = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  try { return JSON.parse(new TextDecoder().decode(bytes)); }
  catch { throw new Error('invalid_input'); }
}

// Transport/security fields are separate from the business enquiry.
export function readSubmissionMetadata(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) return null;
  const metadata = {};
  for (const [key, max] of Object.entries({ requestId: 36, token: 2048, website: 200 })) {
    const raw = input[key] ?? (key === 'website' ? '' : null);
    if (typeof raw !== 'string' || raw.length > max) return null;
    metadata[key] = raw.trim();
  }
  const uuid = /^[\da-f]{8}-[\da-f]{4}-4[\da-f]{3}-[89ab][\da-f]{3}-[\da-f]{12}$/i;
  return uuid.test(metadata.requestId) && metadata.token ? metadata : null;
}
