// Textes SEO par page (title ≤ 60 caractères, description 140–160 caractères).
// Textes uniquement : le JSON-LD est construit ailleurs.

export interface PageSeo {
  title: string;
  description: string;
}

export interface SeoContent {
  home: PageSeo;
  particuliers: PageSeo;
  professionnels: PageSeo;
  /** Clé = `slug` d'une entrée de corps-metier.ts. */
  metiers: Record<string, PageSeo>;
}

export const seo: SeoContent = {
  home: {
    title: 'Experts Travaux | Rénovation et bâtiment à Toulouse',
    description:
      'Entreprise de rénovation à Toulouse et dans un rayon de 100 km : particuliers et professionnels, un seul interlocuteur de la conception à la livraison.',
  },
  particuliers: {
    title: 'Rénovation maison à Toulouse : travaux sur-mesure',
    description:
      'Rénovation de maison, extension, cuisine, salle de bain : Experts Travaux conçoit et pilote votre projet à Toulouse, du devis gratuit à la livraison.',
  },
  professionnels: {
    title: 'Contractant général et aménagement de bureaux | Toulouse',
    description:
      'Contractant général à Toulouse : bureaux, locaux commerciaux, restaurants, entrepôts. Continuité d’activité, plannings tenus et respect des normes ERP.',
  },
  metiers: {
    'toiture-couverture': {
      title: 'Toiture et couverture à Toulouse | Experts Travaux',
      description:
        'Couverture, zinguerie, étanchéité et réfection de toiture à Toulouse et alentours : conception, coordination des artisans et suivi jusqu’à la réception.',
    },
    charpente: {
      title: 'Charpente à Toulouse | Experts Travaux',
      description:
        'Charpente traditionnelle, fermettes, renforcement et réparation à Toulouse et alentours : un seul interlocuteur, un chantier mené jusqu’à la livraison.',
    },
    'isolation-thermique': {
      title: 'Isolation thermique à Toulouse | Experts Travaux',
      description:
        'Isolation thermique des combles, murs et sols à Toulouse et alentours : étude sur place, devis détaillé et chantier piloté par un seul interlocuteur.',
    },
    'facade-ravalement': {
      title: 'Façade et ravalement à Toulouse | Experts Travaux',
      description:
        'Ravalement, enduit de façade et isolation thermique par l’extérieur à Toulouse et alentours : un seul interlocuteur, un chantier mené jusqu’à la livraison.',
    },
    'maconnerie-gros-oeuvre': {
      title: 'Maçonnerie et gros œuvre à Toulouse | Experts Travaux',
      description:
        'Fondations, murs porteurs, dalles et ouvertures dans le bâti à Toulouse et alentours : conception, coordination des artisans et suivi jusqu’à la réception.',
    },
    'menuiseries-exterieures': {
      title: 'Menuiseries extérieures à Toulouse | Experts Travaux',
      description:
        'Pose et remplacement de fenêtres, portes, baies vitrées et volets à Toulouse et alentours : un seul interlocuteur, un chantier mené jusqu’à la livraison.',
    },
    'extension-surelevation': {
      title: 'Extension et surélévation à Toulouse | Experts Travaux',
      description:
        'Extension et surélévation de maison, étude de faisabilité incluse, à Toulouse et alentours : un seul interlocuteur, un chantier mené jusqu’à la livraison.',
    },
    cuisine: {
      title: 'Cuisine et plomberie à Toulouse | Experts Travaux',
      description:
        'Conception, plomberie, électricité et pose de cuisine à Toulouse et alentours : étude sur place, devis détaillé et chantier piloté par un seul interlocuteur.',
    },
    'salle-de-bain': {
      title: 'Salle de bain et étanchéité à Toulouse | Experts Travaux',
      description:
        'Douche à l’italienne, étanchéité, carrelage et plomberie à Toulouse et alentours : conception, coordination des artisans et suivi jusqu’à la réception.',
    },
    'chauffage-climatisation': {
      title: 'Chauffage et climatisation à Toulouse | Experts Travaux',
      description:
        'Pompe à chaleur, radiateurs et climatisation à Toulouse et alentours : étude sur place, devis détaillé et chantier piloté par un seul interlocuteur.',
    },
    electricite: {
      title: 'Électricité à Toulouse | Experts Travaux',
      description:
        'Installation, mise en conformité, tableau électrique et domotique à Toulouse et alentours : un seul interlocuteur, un chantier mené jusqu’à la livraison.',
    },
    'platrerie-peinture-carrelage': {
      title: 'Plâtrerie, carrelage, peinture à Toulouse | Experts Travaux',
      description:
        'Cloisons, faux plafonds, carrelage, peinture et finitions à Toulouse et alentours : un seul interlocuteur, un chantier mené jusqu’à la livraison.',
    },
  },
};
