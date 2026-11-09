import type { autoReply as AutoReplyContent } from '../data/contact.ts';
import { buildAutoReplyHtml } from './email-template.ts';

export interface ContactRequest {
  nom: string;
  email: string;
  tel: string;
  projet: string;
  page: string;
}

export type ContactParsing =
  | { kind: 'ok'; value: ContactRequest }
  | { kind: 'spam' }
  | { kind: 'invalid' };

export const contactLimits = { nom: 100, email: 254, tel: 30, projet: 5000, page: 200 } as const;

/** Taille maximale du corps de la requête, en octets. */
export const contactMaxBodyBytes = 20_000;

/** Durée minimale (ms) entre l'affichage du formulaire et son envoi ; en deçà, c'est un robot. */
export const contactMinFillMs = 3000;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^(?:\+|00)?\d{9,15}$/;
const frenchLocalPhone = /^0[1-9]\d{8}$/;
const randomCaseSwitches = 3;

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

export const isValidPhone = (tel: string) => {
  const digits = tel.replace(/[\s.\-()]/g, '');
  return frenchLocalPhone.test(digits) || (/^(?:\+|00)/.test(digits) && phonePattern.test(digits));
};

/** Mot aux majuscules/minuscules alternées (« sYJvrRUyQkEBgatcbL ») : signature de texte généré au hasard. */
const looksRandom = (value: string) =>
  value.split(/[\s-]+/).some((word) => (word.match(/\p{Ll}\p{Lu}/gu) ?? []).length >= randomCaseSwitches);

/**
 * Valide le corps reçu par l'endpoint. Robot détecté (champ piège `website` rempli, envoi trop rapide,
 * texte aléatoire) : `spam`, ignoré sans erreur.
 */
export function parseContact(body: unknown): ContactParsing {
  if (typeof body !== 'object' || body === null) return { kind: 'invalid' };
  const data = body as Record<string, unknown>;
  if (text(data.website, 1) !== '') return { kind: 'spam' };
  if (!(Number(data.elapsed) >= contactMinFillMs)) return { kind: 'spam' };

  const value: ContactRequest = {
    nom: text(data.nom, contactLimits.nom),
    email: text(data.email, contactLimits.email),
    tel: text(data.tel, contactLimits.tel),
    projet: text(data.projet, contactLimits.projet),
    page: text(data.page, contactLimits.page),
  };
  if (looksRandom(value.nom) || looksRandom(value.projet)) return { kind: 'spam' };
  const valid = value.nom && value.projet && emailPattern.test(value.email) && (!value.tel || isValidPhone(value.tel));
  return valid ? { kind: 'ok', value } : { kind: 'invalid' };
}

const singleLine = (value: string) => value.replace(/\s+/g, ' ');

/**
 * Corps de l'API Mailjet Send v3.1 : deux messages envoyés depuis `sender`.
 * 1. à `recipient`, `Reply-To` = visiteur ; 2. accusé de réception au visiteur, `Reply-To` = `recipient`.
 */
export function buildMailjetPayload(
  request: ContactRequest,
  sender: string,
  recipient: string,
  senderName: string,
  reply: typeof AutoReplyContent,
) {
  const { nom, email, tel, projet, page } = request;
  return {
    Messages: [
      {
        From: { Email: sender, Name: senderName },
        To: [{ Email: recipient }],
        ReplyTo: { Email: email, Name: singleLine(nom) },
        Subject: `Demande de devis — ${singleLine(nom)}`,
        TextPart: [
          `Nom : ${nom}`,
          `Email : ${email}`,
          `Téléphone : ${tel || 'non renseigné'}`,
          `Page : ${page || 'non renseignée'}`,
          '',
          'Projet :',
          projet,
        ].join('\n'),
      },
      {
        From: { Email: sender, Name: senderName },
        To: [{ Email: email, Name: singleLine(nom) }],
        ReplyTo: { Email: recipient, Name: senderName },
        Subject: reply.subject,
        TextPart: [reply.greeting(singleLine(nom)), '', ...reply.body, '', reply.signature(senderName)].join('\n'),
        HTMLPart: buildAutoReplyHtml(singleLine(nom), reply),
      },
    ],
  };
}
