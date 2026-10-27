import test from 'node:test';
import assert from 'node:assert/strict';
import { createContactEnquiry } from '../src/backend/contact/domain/contact-enquiry.js';
import { createSendContactEnquiry } from '../src/backend/contact/application/send-contact-enquiry.js';

const input = {
  name: '  João  ', email: 'visitor@example.net', message: '  A quote, please.  ',
  solution: 'casa', language: 'pt', to: 'attacker@example.com',
};
const submission = { input, token: 'challenge-token', hostname: 'example.com', requestId: 'request-id' };

test('domain constructs only valid enquiry fields without modifying the input', () => {
  assert.deepEqual(createContactEnquiry(input), {
    name: 'João', email: input.email, message: 'A quote, please.', solution: 'casa', language: 'pt',
  });
  assert.equal(input.name, '  João  ');
  for (const changed of [{ email: 'invalid' }, { message: ' ' }, { solution: '__proto__' }, { language: 'fr' }]) {
    assert.equal(createContactEnquiry({ ...input, ...changed }), null);
  }
});

test('application verifies before sending and passes only the domain enquiry to the email port', async () => {
  const calls = [];
  const send = createSendContactEnquiry({
    spamVerifier: { verify: async (challenge) => { calls.push(['verify', challenge]); return true; } },
    emailSender: { send: async (enquiry, options) => { calls.push(['send', enquiry, options]); } },
  });
  assert.deepEqual(await send(submission), { accepted: true });
  assert.deepEqual(calls, [
    ['verify', { token: submission.token, hostname: submission.hostname }],
    ['send', createContactEnquiry(input), { requestId: submission.requestId }],
  ]);
});

test('invalid enquiries and honeypots never invoke outbound ports', async () => {
  const unexpectedCall = async () => assert.fail('An outbound port must not be called');
  const send = createSendContactEnquiry({
    spamVerifier: { verify: unexpectedCall }, emailSender: { send: unexpectedCall },
  });
  assert.deepEqual(await send({ ...submission, input: { ...input, name: ' ' } }), { error: 'invalid_input' });
  assert.deepEqual(await send({ ...submission, website: 'bot-filled-field' }), { accepted: true });
});

test('verification failures stop delivery and conceal adapter errors', async () => {
  for (const [verify, expected] of [
    [async () => false, 'verification_failed'],
    [async () => { throw new Error('private provider detail'); }, 'verification_unavailable'],
  ]) {
    const send = createSendContactEnquiry({
      spamVerifier: { verify },
      emailSender: { send: async () => assert.fail('Unverified enquiries must not send') },
    });
    assert.deepEqual(await send(submission), { error: expected });
  }
});

test('email port failures never claim acceptance or expose provider details', async () => {
  const send = createSendContactEnquiry({
    spamVerifier: { verify: async () => true },
    emailSender: { send: async () => { throw new Error('private credentials or provider detail'); } },
  });
  assert.deepEqual(await send(submission), { error: 'delivery_unavailable' });
});
