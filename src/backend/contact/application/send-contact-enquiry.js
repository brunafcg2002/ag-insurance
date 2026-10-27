import { createContactEnquiry } from '../domain/contact-enquiry.js';

/**
 * @param {Object} dependencies
 * @param {import('./ports/email-sender.js').EmailSender} dependencies.emailSender
 * @param {import('./ports/spam-verifier.js').SpamVerifier} dependencies.spamVerifier
 */
export function createSendContactEnquiry({ emailSender, spamVerifier }) {
  return async function sendContactEnquiry({ input, token, hostname, requestId, website = '' }) {
    const enquiry = createContactEnquiry(input);
    if (!enquiry) return { error: 'invalid_input' };
    // Silently discard the honeypot without consuming verification/email quota.
    if (website) return { accepted: true };

    let verified;
    try {
      verified = await spamVerifier.verify({ token, hostname });
    } catch {
      return { error: 'verification_unavailable' };
    }
    if (verified !== true) return { error: 'verification_failed' };

    try {
      await emailSender.send(enquiry, { requestId });
      return { accepted: true };
    } catch {
      return { error: 'delivery_unavailable' };
    }
  };
}
