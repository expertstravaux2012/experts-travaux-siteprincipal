// Textes SEO par page (title ≤ 60 caractères, description 145–157 caractères).
// Textes uniquement : le JSON-LD est construit ailleurs.
// Mots-clés principaux : registre de mots-clés du 15/10/2026 (docs/Experts Travaux - mon registre de mots-clés.pdf),
// référence de la stratégie de contenu. Un mot-clé principal par page, titres et descriptions uniques.

import { site } from './site';

const km = site.areaServed.radiusKm;

export interface PageSeo {
  title: string;
  description: string;
}

export interface SeoContent {
  home: PageSeo;
  particuliers: PageSeo;
  professionnels: PageSeo;
  mentionsLegales: PageSeo;
  cgu: PageSeo;
  constructionNeuve: PageSeo;
  /** Clé = `slug` d'une entrée de corps-metier.ts. */
  metiers: Record<string, PageSeo>;
}

export const seo: SeoContent = {
  constructionNeuve: {
    title: 'Maison sur mesure à Toulouse | Experts Travaux',
    description: `Maison sur mesure à Toulouse et dans un rayon de ${km} km : étude de faisabilité sur votre terrain, devis détaillé et chantier coordonné par un interlocuteur.`,
  },
  mentionsLegales: {
    title: 'Mentions légales | Experts Travaux',
    description:
      'Mentions légales du site Experts Travaux : éditeur, hébergeur, propriété intellectuelle, protection des données personnelles et gestion des cookies.',
  },
  cgu: {
    title: 'Conditions générales d’utilisation | Experts Travaux',
    description:
      'Conditions générales d’utilisation du site Experts Travaux : accès au site, propriété intellectuelle, responsabilité, données personnelles et droit applicable.',
  },
  home: {
    title: 'Entreprise de rénovation à Toulouse | Experts Travaux',
    description: `Entreprise de rénovation à Toulouse et dans un rayon de ${km} km : maître d’œuvre de vos travaux, pour particuliers et professionnels, du devis à la livraison.`,
  },
  particuliers: {
    title: 'Rénovation maison à Toulouse : travaux sur-mesure',
    description:
      'Rénovation de maison et d’appartement à Toulouse : extension, cuisine, salle de bain, construction neuve. Votre projet piloté du devis à la livraison.',
  },
  professionnels: {
    title: 'Rénovation locaux professionnels à Toulouse',
    description:
      'Rénovation de locaux professionnels à Toulouse : bureaux, commerces, hôtels, restaurants. Entreprise tous corps d’état, plannings tenus, normes ERP.',
  },
  metiers: {
    'toiture-couverture': {
      title: 'Travaux de toiture à Toulouse | Experts Travaux',
      description:
        'Réfection de toiture, couverture, zinguerie et étanchéité à Toulouse et alentours : diagnostic, devis détaillé et chantier coordonné jusqu’à la réception.',
    },
    charpente: {
      title: 'Charpente à Toulouse | Experts Travaux',
      description:
        'Charpente à Toulouse : charpente traditionnelle, fermettes, réparation et renforcement. Un seul interlocuteur, du diagnostic à la réception du chantier.',
    },
    'isolation-thermique': {
      title: 'Isolation thermique à Toulouse | Experts Travaux',
      description:
        'Isolation thermique à Toulouse : combles, murs et sols. Étude sur place, devis détaillé et chantier piloté par un seul interlocuteur, pour un vrai confort.',
    },
    'facade-ravalement': {
      title: 'Ravalement de façade à Toulouse | Experts Travaux',
      description:
        'Ravalement de façade à Toulouse : enduit, brique, isolation par l’extérieur. Étude sur place, devis détaillé et chantier mené par un seul interlocuteur.',
    },
    'maconnerie-gros-oeuvre': {
      title: 'Maçonnerie gros œuvre à Toulouse | Experts Travaux',
      description:
        'Maçonnerie et gros œuvre à Toulouse : fondations, ouverture de mur porteur, dalles et reprises en bâti ancien, coordonnés par un seul interlocuteur.',
    },
    'menuiseries-exterieures': {
      title: 'Changement de fenêtres à Toulouse | Experts Travaux',
      description:
        'Changement de fenêtres à Toulouse : fenêtres, baies vitrées, portes et volets. Fourniture et pose soignées, devis détaillé et réception avec vous sur place.',
    },
    'extension-surelevation': {
      title: 'Extension maison à Toulouse | Experts Travaux',
      description:
        'Extension de maison à Toulouse : étude de faisabilité, agrandissement et surélévation, du gros œuvre aux finitions, sous la conduite d’un seul interlocuteur.',
    },
    cuisine: {
      title: 'Rénovation de cuisine à Toulouse | Experts Travaux',
      description:
        'Rénovation de cuisine à Toulouse : conception, pose de cuisine, réseaux d’eau et d’électricité, finitions. Un devis détaillé, un seul interlocuteur.',
    },
    'salle-de-bain': {
      title: 'Rénovation salle de bain à Toulouse | Experts Travaux',
      description:
        'Rénovation de salle de bain à Toulouse : douche à l’italienne, étanchéité, carrelage et plomberie. Un devis détaillé, un seul interlocuteur de bout en bout.',
    },
    'chauffage-climatisation': {
      title: 'Installation climatisation à Toulouse | Experts Travaux',
      description:
        'Installation de climatisation à Toulouse : climatisation réversible, chauffage et ventilation. Étude sur place, devis détaillé et mise en service suivie.',
    },
    electricite: {
      title: 'Mise aux normes électriques à Toulouse | Experts Travaux',
      description:
        'Mise aux normes électriques à Toulouse : tableau électrique, rénovation du circuit et éclairage. Électricité en rénovation, devis détaillé et chantier suivi.',
    },
    'platrerie-peinture-carrelage': {
      title: 'Peinture et plâtrerie à Toulouse | Experts Travaux',
      description:
        'Peinture et plâtrerie à Toulouse : cloisons, faux plafonds, carrelage et finitions. Un chantier propre, coordonné et réceptionné avec vous sur place.',
    },
  },
};
