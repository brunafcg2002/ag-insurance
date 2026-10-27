import { createSendContactEnquiry } from './application/send-contact-enquiry.js';
import { readContactConfig } from './infrastructure/config.js';
import { createResendEmailSender } from './infrastructure/resend-email-sender.js';
import { createTurnstileSpamVerifier } from './infrastructure/turnstile-spam-verifier.js';
import { createContactController } from './presentation/contact-controller.js';

// Composition root: the only place that chooses concrete outbound adapters.
export function createContactHandler({ env = {}, fetchImpl = fetch } = {}) {
  const config = readContactConfig(env);
  const emailSender = createResendEmailSender({
    apiKey: config.resendApiKey, sender: config.sender, recipient: config.recipient, fetchImpl,
  });
  const spamVerifier = createTurnstileSpamVerifier({ secret: config.turnstileSecret, fetchImpl });
  const sendContactEnquiry = createSendContactEnquiry({ emailSender, spamVerifier });
  return createContactController({
    sendContactEnquiry,
    // The HTTP layer receives only readiness/public settings, never credentials.
    config: { enabled: config.enabled, allowedOrigins: config.allowedOrigins, siteKey: config.siteKey },
  });
}
