/** @returns {import('../application/ports/spam-verifier.js').SpamVerifier} */
export function createTurnstileSpamVerifier({ secret, fetchImpl = fetch }) {
  return {
    async verify({ token, hostname }) {
      const response = await fetchImpl('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret, response: token }),
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error('verification_unavailable');
      const data = await response.json();
      return data.success === true && data.hostname === hostname && data.action === 'contact';
    },
  };
}
