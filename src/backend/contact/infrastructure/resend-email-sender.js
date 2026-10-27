import { createHash } from 'node:crypto';
import { solutionNames } from '../domain/contact-enquiry.js';

/** @returns {import('../application/ports/email-sender.js').EmailSender} */
export function createResendEmailSender({ apiKey, sender, recipient, fetchImpl = fetch }) {
  return {
    async send(enquiry, { requestId }) {
      const email = {
        from: sender,
        to: [recipient],
        reply_to: enquiry.email,
        subject: `Pedido de contacto — ${solutionNames[enquiry.solution]}`,
        text: `Novo pedido pelo site A. Gonçalves - Seguros\n\nNome: ${enquiry.name}\nEmail: ${enquiry.email}\nInteresse: ${solutionNames[enquiry.solution]}\nIdioma: ${enquiry.language.toUpperCase()}\n\n${enquiry.message}`,
      };
      const body = JSON.stringify(email);
      const digest = createHash('sha256').update(body).digest('hex');
      const response = await fetchImpl('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'Idempotency-Key': `contact/${requestId}/${digest}`,
        },
        body,
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error('delivery_unavailable');
      const data = await response.json();
      if (typeof data.id !== 'string' || !data.id) throw new Error('delivery_unavailable');
    },
  };
}
