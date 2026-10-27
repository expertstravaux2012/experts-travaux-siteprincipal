// Avis Google affichés sur la home. Sélection manuelle, mise à jour ~ trimestrielle.
// Tant que `avis` est vide, la section n'est pas rendue.

export interface Avis {
  auteur: string;
  /** Date ISO (YYYY-MM-DD) de l'avis sur Google. */
  date: string;
  note: 1 | 2 | 3 | 4 | 5;
  texte: string;
  /** Intitulé du métier concerné, si connu. */
  metier?: string;
}

export interface NoteGoogle {
  note: number;
  nombre: number;
  /** Date ISO (YYYY-MM-DD) du relevé de la note et du compteur. */
  releveLe: string;
  /** URL de la fiche Google (Maps). */
  href: string;
}

export const avisSection = {
  eyebrow: 'AVIS CLIENTS',
  title: 'Ce que disent nos clients',
  source: 'AVIS GOOGLE',
  noteLabel: 'Note Google au',
  sur5: '/ 5',
  avisLabel: 'avis',
  ratingAria: 'Note : {note} sur 5',
  newTab: '(nouvel onglet)',
  cta: 'Voir tous nos avis sur Google',
};

export const noteGoogle: NoteGoogle | null = {
  note: 5,
  nombre: 7,
  releveLe: '2026-10-27',
  href: 'https://maps.app.goo.gl/8SJNdrDFFyxxibp3A',
};

/** À CONFIRMER (client) : 4 à 6 avis réels (auteur, date, note, texte intégral) et accord d'affichage. */
export const avis: Avis[] = [
  {
    auteur: 'Bils K.',
    date: '2026-10-26',
    note: 5,
    texte:
      'Très content du travail réalisé chez moi ! Toute l’installation électrique a été rénovée, avec un nouveau tableau électrique, une remise en sécurité du logement et la mise à la terre de l’installation. Travail propre et sérieux, avec de bons conseils et un résultat à la hauteur de mes attentes. Je recommande sans hésiter !',
    metier: 'Électricité',
  },
  {
    auteur: 'Amanda B.',
    date: '2026-10-26',
    note: 5,
    texte: 'Merci à Ugo et Jean-Michel pour leur réactivité et leur professionnalisme pour une rénovation sur mesure 👍',
  },
  {
    auteur: 'Kat&steff B.',
    date: '2026-10-26',
    note: 5,
    texte:
      'J’ai fait appel à expert travaux et j’en suis très satisfaite. Très bon travail, équipe professionnelle, très sympathique et réactive toujours à l’écoute avec de bons conseils. Un chantier propre à l’arrivée. Je recommande !',
  },
];
