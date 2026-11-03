/** Accusé de réception envoyé au visiteur après sa demande de devis (identique particuliers / professionnels). */
export const autoReply = {
  subject: 'Nous avons bien reçu votre demande',
  greeting: (nom: string) => `Bonjour ${nom},`,
  body: [
    'Nous avons bien reçu votre demande et reviendrons vers vous rapidement.',
    'Pour compléter votre dossier, vous pouvez répondre directement à cet e-mail.',
  ],
  cta: { label: 'Voir nos réalisations', href: '/#realisations' },
  socialsLabel: 'Suivez-nous',
  signature: (siteName: string) => `L’équipe ${siteName}`,
} as const;
