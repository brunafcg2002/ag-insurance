/**
 * Outbound port owned by the application. Implementations must fix the sender
 * and recipient in their own configuration and use the enquiry email as Reply-To.
 * Resolve only after provider acceptance; reject on failure.
 *
 * @typedef {Object} EmailSender
 * @property {(enquiry: import('../../domain/contact-enquiry.js').ContactEnquiry, options: { requestId: string }) => Promise<void>} send
 */
export {};
