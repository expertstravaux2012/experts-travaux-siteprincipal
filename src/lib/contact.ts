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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : '';

/** Valide le corps reçu par l'endpoint. Le champ piège `website` rempli = robot : ignoré sans erreur. */
export function parseContact(body: unknown): ContactParsing {
  if (typeof body !== 'object' || body === null) return { kind: 'invalid' };
  const data = body as Record<string, unknown>;
  if (text(data.website, 1) !== '') return { kind: 'spam' };

  const value: ContactRequest = {
    nom: text(data.nom, contactLimits.nom),
    email: text(data.email, contactLimits.email),
    tel: text(data.tel, contactLimits.tel),
    projet: text(data.projet, contactLimits.projet),
    page: text(data.page, contactLimits.page),
  };
  const valid = value.nom && value.projet && emailPattern.test(value.email);
  return valid ? { kind: 'ok', value } : { kind: 'invalid' };
}

const singleLine = (value: string) => value.replace(/\s+/g, ' ');

/** Corps de l'API Mailjet Send v3.1 : mail à l'entreprise, `Reply-To` = visiteur. */
export function buildMailjetPayload(request: ContactRequest, mailbox: string, senderName: string) {
  const { nom, email, tel, projet, page } = request;
  return {
    Messages: [
      {
        From: { Email: mailbox, Name: senderName },
        To: [{ Email: mailbox }],
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
    ],
  };
}
