// Contenu de la page /particuliers/ (tunnel B2C).
// Mot-clé principal : rénovation maison Toulouse (registre de mots-clés du 15/10/2026). Types partagés importés de home.ts.

import type { FaqItem, Lien, PageCta, Prestation } from './home';
import { communesLabel, site } from './site';

export interface AvantApresImage {
  /** Chemin de l'image ; absent tant que la paire réelle n'est pas fournie. */
  src?: string;
  alt: string;
}

export interface AvantApres {
  id: string;
  titre: string;
  /** Légende descriptive, sans chiffre. */
  legende: string;
  avant: AvantApresImage;
  apres: AvantApresImage;
  /** Ratio CSS du comparateur (`largeur / hauteur`) ; 16 / 9 par défaut. */
  ratio?: string;
}

export interface ChantierVideo {
  eyebrow: string;
  title: string;
  legende: string;
  /** Libellé accessible du lecteur. */
  label: string;
  src: string;
  poster: string;
  width: number;
  height: number;
}

export interface DevisBlock {
  eyebrow: string;
  title: string;
  text: string;
  /** Étapes affichables sous forme de liste ordonnée. */
  etapes: string[];
  cta: Lien;
}

export interface ParticuliersContent {
  /** H1 unique de la page. */
  h1: string;
  eyebrow: string;
  intro: string;
  prestationsHeading: { eyebrow: string; title: string };
  prestations: Prestation[];
  avantApresHeading: { eyebrow: string; title: string; intro: string };
  avantApres: AvantApres[];
  devis: DevisBlock;
  faqHeading: { eyebrow: string; title: string };
  faq: FaqItem[];
  cta: PageCta;
}

export const particuliers: ParticuliersContent = {
  h1: 'Rénovation maison à Toulouse : votre projet sur-mesure',
  eyebrow: 'ESPACE PARTICULIERS',
  intro:
    `Rénovation de maison ou d’appartement, extension, cuisine, salle de bain, aménagement de combles ou construction neuve : Experts Travaux conçoit et coordonne votre projet à Toulouse et dans un rayon de ${site.areaServed.radiusKm} km, de la maison toulousaine en brique rose à la construction récente. Un seul interlocuteur et assureur unique du chantier, un devis de rénovation détaillé, un chantier suivi jusqu’à la livraison.`,

  prestationsHeading: {
    eyebrow: 'PRESTATIONS',
    title: 'Les travaux que nous menons pour votre maison',
  },
  prestations: [
    {
      titre: 'Rénovation complète',
      description:
        'Reprise d’une maison ou d’un appartement de la structure aux finitions : distribution des pièces, réseaux, isolation, sols, menuiseries et décoration, coordonnés sur un seul planning.',
      metierSlug: 'maconnerie-gros-oeuvre',
    },
    {
      titre: 'Cuisine',
      description:
        'Implantation, réseaux d’eau et d’électricité, pose et finitions : une cuisine pensée pour votre usage, livrée prête à vivre.',
      metierSlug: 'cuisine',
    },
    {
      titre: 'Salle de bain',
      description:
        'Douche à l’italienne, étanchéité, carrelage et plomberie : une salle de bain exécutée dans les règles de l’art.',
      metierSlug: 'salle-de-bain',
    },
    {
      titre: 'Aménagement de combles',
      description:
        'Transformer des combles en pièce de vie : charpente, isolation, ouvertures et finitions, avec une vérification de faisabilité en amont.',
      metierSlug: 'isolation-thermique',
    },
    {
      titre: 'Extension & surélévation',
      description:
        'Gagner de la surface habitable sans déménager, en cohérence avec le bâti existant et les règles d’urbanisme applicables.',
      metierSlug: 'extension-surelevation',
    },
    {
      titre: 'Façade & ravalement',
      description:
        'Ravalement, enduit et isolation par l’extérieur : protéger les murs et redonner à la maison son caractère.',
      metierSlug: 'facade-ravalement',
    },
    {
      titre: 'Décoration',
      description:
        'Peinture, tapisserie et finitions décoratives : l’ambiance de chaque pièce, exécutée proprement et coordonnée avec le reste du chantier.',
      metierSlug: 'platrerie-peinture-carrelage',
    },
    {
      titre: 'Construction neuve',
      description:
        'Un projet de maison sur mesure, de l’étude de faisabilité à la remise des clés, avec un seul interlocuteur à chaque étape.',
      href: '/particuliers/construction-neuve/',
    },
    {
      titre: 'Piscine',
      description:
        'Le chantier de votre piscine, de la fouille au bassin terminé, coordonné par un seul interlocuteur.',
      href: '/particuliers/piscine/',
    },
  ],

  avantApresHeading: {
    eyebrow: 'AVANT / APRÈS',
    title: 'La transformation, vue de l’intérieur',
    intro:
      'Trois exemples de transformation, avant et après intervention.',
  },
  avantApres: [
    {
      id: 'cuisine',
      titre: 'Cuisine',
      legende: 'D’une pièce mise à nu à une cuisine ouverte avec îlot central, sous les poutres d’origine.',
      avant: { src: '/assets/avant-apres/cuisine-avant.webp', alt: 'Pièce en chantier avec cloisons ouvertes, câbles apparents et poutres au plafond, fenêtre sur les toits de Toulouse' },
      apres: { src: '/assets/avant-apres/cuisine-apres.webp', alt: 'Cuisine rénovée avec îlot en bois et pierre, façades noires, poutres apparentes et vue sur les toits de Toulouse' },
    },
    {
      id: 'sejour',
      titre: 'Séjour',
      legende: 'D’une pièce dépouillée jusqu’aux solives à un séjour fini : plafond refait, éclairage encastré et parquet.',
      ratio: '4 / 3',
      avant: { src: '/assets/avant-apres/sejour-avant.webp', alt: 'Pièce en chantier aux solives apparentes, câbles pendants, rouleaux d’isolant et échafaudage sur un sol brut' },
      apres: { src: '/assets/avant-apres/sejour-apres.webp', alt: 'Même pièce rénovée : cheminée en marbre noir, grand miroir doré, spots au plafond, parquet clair et canapé vert' },
    },
    {
      id: 'extension',
      titre: 'Extension de maison',
      legende: 'Une maison de pierre et de brique prolongée d’une extension vitrée qui ouvre le séjour sur le jardin.',
      avant: { src: '/assets/avant-apres/extension-avant.webp', alt: 'Maison ancienne en pierre et brique rose avec jardin, avant extension' },
      apres: { src: '/assets/avant-apres/extension-apres.webp', alt: 'Même maison prolongée d’une extension cubique noire entièrement vitrée ouvrant sur le salon' },
    },
  ],

  devis: {
    eyebrow: 'DEVIS DÉTAILLÉ',
    title: 'Un devis détaillé, ligne par ligne',
    text: 'Après une visite sur place, nous chiffrons chaque poste de votre projet pour que le budget soit lisible avant tout démarrage.',
    etapes: [
      'Décrivez votre projet et vos contraintes.',
      'Nous visitons le bien et évaluons la faisabilité technique.',
      'Vous recevez un devis détaillé et un planning de chantier.',
    ],
    cta: { label: 'Demander un devis', href: '#contact' },
  },

  faqHeading: {
    eyebrow: 'QUESTIONS FRÉQUENTES',
    title: 'Avant de lancer vos travaux',
  },
  faq: [
    {
      question: 'Dans quelle zone intervenez-vous pour une rénovation de maison ?',
      reponse:
        `Nous intervenons à Toulouse et dans un rayon d’environ ${site.areaServed.radiusKm} km autour de la ville, notamment à ${communesLabel}. Pour un projet situé en limite de zone, contactez-nous : nous étudions la demande au cas par cas.`,
    },
    {
      question: 'Comment est établi le budget d’une rénovation ?',
      reponse:
        'Le coût dépend de la surface, de l’état du bâti, des matériaux et du niveau de finition. Nous le déterminons après une visite sur place, dans un devis détaillé poste par poste, validé avant tout démarrage.',
    },
    {
      question: 'Faut-il une autorisation pour une extension ou un aménagement de combles ?',
      reponse:
        'Cela dépend de la nature du projet et des règles d’urbanisme de votre commune. Nous identifions avec vous les démarches à prévoir lors de la visite ; l’instruction relève du service d’urbanisme compétent.',
    },
    {
      question: 'Un seul interlocuteur gère-t-il tous les corps de métier ?',
      reponse:
        'Oui. Maçonnerie, plomberie, électricité, carrelage ou peinture sont coordonnés par un interlocuteur unique, qui planifie les interventions et suit la qualité d’exécution jusqu’à la livraison.',
    },
    {
      question: 'Puis-je rester dans mon logement pendant les travaux ?',
      reponse:
        'Selon l’ampleur du chantier, c’est parfois possible. Nous l’évaluons avec vous pendant la visite et organisons le phasage pour limiter les nuisances.',
    },
  ],

  cta: {
    eyebrow: 'VOTRE PROJET',
    title: 'Parlons de votre rénovation',
    text: 'Une visite sur place, un devis détaillé, un interlocuteur unique : décrivez-nous votre projet à Toulouse ou dans les environs.',
    label: 'Demander un devis',
    href: '#contact',
  },
};
