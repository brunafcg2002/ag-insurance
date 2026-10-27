/**
 * Outbound port owned by the application. Implementations bind verification
 * to the expected hostname and contact action. False means a rejected challenge;
 * rejection means the verification service could not be reached or understood.
 *
 * @typedef {Object} SpamVerifier
 * @property {(challenge: { token: string, hostname: string }) => Promise<boolean>} verify
 */
export {};
