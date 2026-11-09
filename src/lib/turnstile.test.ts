import { test } from 'node:test';
import assert from 'node:assert/strict';
import { turnstileTokenFrom, verifyTurnstile } from './turnstile.ts';

const reply = (body: unknown, ok = true) => (async () => ({ ok, json: async () => body })) as unknown as typeof fetch;

test('turnstileTokenFrom lit le jeton du corps, chaîne vide sinon', () => {
  assert.equal(turnstileTokenFrom({ 'cf-turnstile-response': 'abc' }), 'abc');
  assert.equal(turnstileTokenFrom({}), '');
  assert.equal(turnstileTokenFrom(null), '');
  assert.equal(turnstileTokenFrom({ 'cf-turnstile-response': 42 }), '');
});

test('verifyTurnstile accepte un jeton valide pour la bonne action', async () => {
  assert.equal(await verifyTurnstile('t', 's', '1.2.3.4', 'contact', reply({ success: true, action: 'contact' })), true);
});

test('verifyTurnstile rejette jeton vide, échec, mauvaise action, erreur réseau et réponse HTTP en erreur', async () => {
  assert.equal(await verifyTurnstile('', 's', undefined, 'contact', reply({ success: true, action: 'contact' })), false);
  assert.equal(await verifyTurnstile('t', 's', undefined, 'contact', reply({ success: false })), false);
  assert.equal(await verifyTurnstile('t', 's', undefined, 'contact', reply({ success: true, action: 'autre' })), false);
  assert.equal(await verifyTurnstile('t', 's', undefined, 'contact', reply({ success: true, action: 'contact' }, false)), false);
  assert.equal(await verifyTurnstile('t', 's', undefined, 'contact', (async () => { throw new Error('réseau'); }) as unknown as typeof fetch), false);
});

test('verifyTurnstile envoie secret, jeton et IP en formulaire', async () => {
  let sent: URLSearchParams | undefined;
  const spy = (async (_url: string, init: RequestInit) => {
    sent = init.body as URLSearchParams;
    return { ok: true, json: async () => ({ success: true, action: 'contact' }) };
  }) as unknown as typeof fetch;
  await verifyTurnstile('tok', 'sec', '1.2.3.4', 'contact', spy);
  assert.equal(sent?.get('secret'), 'sec');
  assert.equal(sent?.get('response'), 'tok');
  assert.equal(sent?.get('remoteip'), '1.2.3.4');
});
