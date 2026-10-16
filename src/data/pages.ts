// Libellés structurels des pages secondaires (fil d'Ariane, titres de sections métier, CTA de silo).
// Les contenus propres à chaque page vivent dans particuliers.ts, professionnels.ts, corps-metier.ts.

import type { Cible, Lien } from './home';

export const breadcrumb = {
  ariaLabel: 'Fil d’Ariane',
  home: { label: 'Accueil', href: '/' },
};

export const metierPage = {
  eyebrow: 'CORPS DE MÉTIER',
  prestationsHeading: { eyebrow: 'PRESTATIONS', title: 'Ce que comprend cette intervention' },
  pourquoiHeading: { eyebrow: 'NOTRE MÉTHODE', title: 'Un seul interlocuteur pour tout le chantier' },
  cibleHeading: { eyebrow: 'POUR QUI', title: 'Pour quels projets' },
  faqHeading: { eyebrow: 'QUESTIONS FRÉQUENTES', title: 'Avant de lancer vos travaux' },
  autresHeading: { eyebrow: 'AUTRES MÉTIERS', title: 'Découvrir d’autres corps de métier' },
  cta: {
    eyebrow: 'VOTRE PROJET',
    title: 'Parlons de votre chantier',
    text: 'Choisissez l’espace qui correspond à votre projet : nous revenons vers vous pour une visite et un devis détaillé.',
  },
};

export const silos: Record<'particuliers' | 'professionnels', Lien> = {
  particuliers: { label: 'Espace Particuliers', href: '/particuliers/' },
  professionnels: { label: 'Espace Professionnels', href: '/professionnels/' },
};

/** Clés de silo concernées par une cible de page métier. */
export const ciblesDe = (cible: Cible): ('particuliers' | 'professionnels')[] =>
  cible === 'les deux' ? ['particuliers', 'professionnels'] : [cible];

export const cibleLabels: Record<'particuliers' | 'professionnels', string> = {
  particuliers: 'Particuliers',
  professionnels: 'Professionnels',
};
