import { test } from 'node:test';
import assert from 'node:assert/strict';
import { autoReply } from '../data/contact.ts';
import { buildMailjetPayload, parseContact } from './contact.ts';

const valid = { nom: ' Ugo ', email: 'ugo@exemple.fr', tel: '', projet: 'Extension', page: '/particuliers/' };

test('parseContact accepte une demande valide et nettoie les espaces', () => {
  const result = parseContact(valid);
  assert.equal(result.kind, 'ok');
  if (result.kind === 'ok') assert.equal(result.value.nom, 'Ugo');
});

test('parseContact rejette email invalide, champs requis vides et corps non objet', () => {
  assert.equal(parseContact({ ...valid, email: 'pas-un-mail' }).kind, 'invalid');
  assert.equal(parseContact({ ...valid, nom: '  ' }).kind, 'invalid');
  assert.equal(parseContact({ ...valid, projet: '' }).kind, 'invalid');
  assert.equal(parseContact(null).kind, 'invalid');
  assert.equal(parseContact('x').kind, 'invalid');
});

test('parseContact signale le champ piège rempli comme spam', () => {
  assert.equal(parseContact({ ...valid, website: 'http://spam' }).kind, 'spam');
});

test('parseContact tronque les champs trop longs', () => {
  const result = parseContact({ ...valid, projet: 'a'.repeat(6000) });
  assert.equal(result.kind === 'ok' && result.value.projet.length, 5000);
});

test('buildMailjetPayload envoie de l’expéditeur vers le destinataire, Reply-To = visiteur, sujet sur une ligne', () => {
  const parsed = parseContact({ ...valid, nom: 'Ugo\nBcc: x@y.z' });
  assert.equal(parsed.kind, 'ok');
  if (parsed.kind !== 'ok') return;
  const [message, ack] = buildMailjetPayload(parsed.value, 'contact@experts-travaux.fr', 'devis@experts-travaux.fr', 'Experts Travaux', autoReply).Messages;
  assert.equal(message.From.Email, 'contact@experts-travaux.fr');
  assert.equal(message.To[0].Email, 'devis@experts-travaux.fr');
  assert.equal(message.ReplyTo.Email, 'ugo@exemple.fr');
  assert.ok(!message.Subject.includes('\n'));
  assert.match(message.TextPart, /Téléphone : non renseigné/);
  assert.equal(ack.To[0].Email, 'ugo@exemple.fr');
  assert.equal(ack.ReplyTo.Email, 'devis@experts-travaux.fr');
  assert.ok(!ack.Subject.includes('\n'));
  assert.match(ack.TextPart, /^Bonjour Ugo Bcc: x@y\.z,/);
});

test('l’accusé de réception HTML échappe le nom et porte logo, bouton et coordonnées', () => {
  const parsed = parseContact({ ...valid, nom: '<b>Ugo</b>' });
  assert.equal(parsed.kind, 'ok');
  if (parsed.kind !== 'ok') return;
  const [, ack] = buildMailjetPayload(parsed.value, 'contact@experts-travaux.fr', 'devis@experts-travaux.fr', 'Experts Travaux', autoReply).Messages;
  assert.ok(ack.HTMLPart.includes('Bonjour &lt;b&gt;Ugo&lt;/b&gt;,'));
  assert.ok(!ack.HTMLPart.includes('<b>Ugo'));
  assert.match(ack.HTMLPart, /src="https:\/\/experts-travaux\.com\/assets\/rebranding\/logo-mark\.png"/);
  assert.match(ack.HTMLPart, /href="https:\/\/experts-travaux\.com\/#realisations"/);
  assert.match(ack.HTMLPart, /tel:\+33582951432/);
});
