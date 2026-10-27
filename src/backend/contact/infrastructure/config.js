import { isValidEmail } from '../domain/contact-enquiry.js';

export function readContactConfig(env) {
  const allowedOrigins = (env.CONTACT_ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter((origin) => {
    try {
      const url = new URL(origin);
      return url.origin === origin && (url.protocol === 'https:' ||
        (url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname)));
    } catch { return false; }
  });
  const sender = (env.CONTACT_FROM || '').trim();
  const senderAddress = sender.match(/<([^<>]+)>$/)?.[1] || sender;
  return {
    enabled: Boolean(env.CONTACT_ENABLED === 'true' && env.RESEND_API_KEY &&
      env.TURNSTILE_SECRET_KEY && env.TURNSTILE_SITE_KEY && isValidEmail(senderAddress) &&
      !/[\r\n]/.test(sender) && isValidEmail(env.CONTACT_TO) && allowedOrigins.length),
    allowedOrigins,
    sender,
    recipient: env.CONTACT_TO,
    resendApiKey: env.RESEND_API_KEY,
    siteKey: env.TURNSTILE_SITE_KEY,
    turnstileSecret: env.TURNSTILE_SECRET_KEY,
  };
}
