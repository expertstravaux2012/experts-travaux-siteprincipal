// Best-of portfolio affiché sur la home. Sélection provisoire.
// Visuels illustratifs : les descriptions ne portent que sur ce qui est visible à l'image.
// lieu / surface / annee / duree : null tant que le client ne les fournit pas.

export interface Realisation {
  image: string;
  width: number;
  height: number;
  alt: string;
  categorie: string;
  /** Surtitre technique en MAJUSCULES (ex. matériaux / nature du travail), 2 à 5 mots */
  eyebrow: string;
  /** Titre éditorial, 3 à 7 mots, style monographie */
  titre: string;
  /** 1 à 2 phrases, factuelles, décrivant ce qu'on voit */
  description: string;
  /** Métadonnées facultatives : null tant que le client ne les fournit pas. Ne rien inventer. */
  lieu: string | null;
  surface: string | null;
  annee: string | null;
  duree: string | null;
}

export const realisations: Realisation[] = [
  {
    image: '/assets/portfolio/real-1.webp',
    width: 1200,
    height: 1600,
    categorie: 'Cuisine',
    alt: 'Cuisine rénovée par Experts Travaux à Toulouse',
    eyebrow: 'CUISINE BLANCHE, POUTRE APPARENTE',
    titre: 'Une cuisine blanche sous poutre apparente',
    description:
      'Plan de travail en L, rangements intégrés et étagères ouvertes, sous une poutre en bois conservée. Une fenêtre unique éclaire l’ensemble, complétée par des appliques sur le mur de crédence.',
    lieu: null,
    surface: null,
    annee: null,
    duree: null,
  },
  {
    image: '/assets/portfolio/real-2.webp',
    width: 1200,
    height: 1600,
    categorie: 'Salle de bain',
    alt: 'Salle de bain rénovée par Experts Travaux',
    eyebrow: 'FAÏENCE MURALE, MOTIFS GÉOMÉTRIQUES',
    titre: 'Une douche, deux calepinages de faïence',
    description:
      'Un mur de grands carreaux unis fait face à un pan de carreaux à motifs géométriques gris. Colonne de douche avec pomme de tête et douchette, robinetterie thermostatique.',
    lieu: null,
    surface: null,
    annee: null,
    duree: null,
  },
  {
    image: '/assets/portfolio/real-3.webp',
    width: 1200,
    height: 1600,
    categorie: 'Escalier',
    alt: 'Escalier sur mesure réalisé par Experts Travaux',
    eyebrow: 'ESCALIER QUART TOURNANT, PEINT BLANC',
    titre: 'Un escalier encadré de parois pleines',
    description:
      'Volée droite terminée par des marches tournantes, encadrée de deux parois pleines peintes en blanc. La lumière de l’étage découpe la cage d’escalier.',
    lieu: null,
    surface: null,
    annee: null,
    duree: null,
  },
  {
    image: '/assets/portfolio/real-4.webp',
    width: 1200,
    height: 1600,
    categorie: 'Façade',
    alt: 'Ravalement de façade par Experts Travaux',
    eyebrow: 'ENDUIT CLAIR, ARC EN BRIQUE',
    titre: 'Un arc de brique sur façade enduite',
    description:
      'Baie cintrée soulignée d’un arc en briques de terre cuite, entre un enduit clair et des appuis en pierre. Menuiseries bois peintes en vert foncé, appui de fenêtre en brique.',
    lieu: null,
    surface: null,
    annee: null,
    duree: null,
  },
  {
    image: '/assets/portfolio/real-5.webp',
    width: 1200,
    height: 1600,
    categorie: 'Surélévation',
    alt: 'Surélévation de maison par Experts Travaux',
    eyebrow: 'MAÇONNERIE BRIQUE, CHARPENTE BOIS',
    titre: 'Un étage monté sur le bâti ancien',
    description:
      'Murs en briques creuses élevés sur une façade en brique existante, avec linteau et étais en partie basse. La charpente en bois est posée, la couverture reste à venir.',
    lieu: null,
    surface: null,
    annee: null,
    duree: null,
  },
  {
    image: '/assets/portfolio/real-6.webp',
    width: 1200,
    height: 1600,
    categorie: 'Agencement',
    alt: 'Agencement intérieur par Experts Travaux',
    eyebrow: 'MENUISERIE SUR MESURE, ÉCLAIRAGE LED',
    titre: 'Une chambre rangée jusqu’au plafond',
    description:
      'Placards blancs ceinturant le lit et montant jusqu’au plafond, avec penderies à éclairage intégré. Parquet en lames de chêne clair au sol.',
    lieu: null,
    surface: null,
    annee: null,
    duree: null,
  },
  {
    image: '/assets/avant-apres/hangar-apres.webp',
    width: 1600,
    height: 893,
    categorie: 'Bâtiment d’activité',
    alt: 'Vue aérienne d’un bâtiment d’activité à bardage noir livré par Experts Travaux',
    eyebrow: 'BARDAGE NOIR, VOIRIE ENROBÉE',
    titre: 'Un bâtiment d’activité vu du ciel',
    description:
      'Volume à bardage noir et toiture grise, desservi par une voie d’accès et un parking enrobés. Le chantier est livré, clôture comprise.',
    lieu: null,
    surface: null,
    annee: null,
    duree: null,
  },
  {
    image: '/assets/realisations/piscine-chantier-poster.webp',
    width: 1280,
    height: 720,
    categorie: 'Piscine',
    alt: 'Piscine rectangulaire terminée devant son local annexe, réalisée par Experts Travaux',
    eyebrow: 'BASSIN RECTANGULAIRE, LOCAL ANNEXE',
    titre: 'Un bassin face à son local annexe',
    description:
      'Bassin rectangulaire à l’eau turquoise, bordé d’une margelle claire et d’un gazon synthétique. Au fond, un local en blocs sous toiture en tuiles.',
    lieu: null,
    surface: null,
    annee: null,
    duree: null,
  },
];
