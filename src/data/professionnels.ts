// Contenu de la page /professionnels/ (tunnel B2B).
// Mot-clé principal : contractant général / aménagement de bureaux (Toulouse).
// Types partagés importés de home.ts.

import type { AvantApres } from './particuliers';
import type { FaqItem, Lien, PageCta, Prestation } from './home';

export interface Secteur {
  id: string;
  titre: string;
  description: string;
  /** Enjeux typiques du secteur, formulés sans chiffre. */
  enjeux: string[];
}

export interface Argument {
  titre: string;
  texte: string;
}

export interface AppelOffresBlock {
  eyebrow: string;
  title: string;
  text: string;
  /** Informations utiles pour cadrer une consultation. */
  elements: string[];
  ctaPrincipal: Lien;
  ctaSecondaire: Lien;
}

export interface ProfessionnelsContent {
  /** H1 unique de la page. */
  h1: string;
  eyebrow: string;
  intro: string;
  prestationsHeading: { eyebrow: string; title: string };
  prestations: Prestation[];
  secteursHeading: { eyebrow: string; title: string; intro: string };
  secteurs: Secteur[];
  avantApresHeading: { eyebrow: string; title: string; intro: string };
  avantApres: AvantApres[];
  argumentaireHeading: { eyebrow: string; title: string };
  argumentaire: Argument[];
  appelOffres: AppelOffresBlock;
  faqHeading: { eyebrow: string; title: string };
  faq: FaqItem[];
  cta: PageCta;
}

export const professionnels: ProfessionnelsContent = {
  h1: 'Aménagement de Bureaux et Travaux pour Professionnels',
  eyebrow: 'ESPACE PROFESSIONNELS',
  intro:
    'Experts Travaux intervient comme contractant général sur vos locaux professionnels à Toulouse et dans un rayon de 100 km : aménagement de bureaux, rénovation de locaux commerciaux, hôtellerie, restauration et entrepôts. Un interlocuteur unique, un assureur unique du chantier, des plannings tenus, une exploitation préservée.',

  prestationsHeading: {
    eyebrow: 'PRESTATIONS',
    title: 'Les travaux que nous menons pour votre activité',
  },
  prestations: [
    {
      titre: 'Aménagement d’espaces de travail',
      description:
        'Cloisonnement, plafonds, sols, éclairage et réseaux : des espaces de travail organisés selon vos usages et vos effectifs.',
      metierSlug: 'platrerie-peinture-carrelage',
    },
    {
      titre: 'Rénovation de locaux commerciaux',
      description:
        'Façade, vitrine, agencement intérieur et finitions : un point de vente remis en état dans des délais compatibles avec votre ouverture.',
      metierSlug: 'facade-ravalement',
    },
    {
      titre: 'Gros œuvre & restructuration',
      description:
        'Ouvertures, reprises en sous-œuvre, dalles et extensions de bâtiments tertiaires ou logistiques.',
      metierSlug: 'maconnerie-gros-oeuvre',
    },
    {
      titre: 'Électricité',
      description:
        'Distribution, tableaux, éclairage et réseaux, pour des installations fiables et évolutives.',
      metierSlug: 'electricite',
    },
    {
      titre: 'Chauffage & climatisation',
      description:
        'Production de chaleur, ventilation et climatisation des locaux, dimensionnées pour votre usage.',
      metierSlug: 'chauffage-climatisation',
    },
    {
      titre: 'Toiture & couverture',
      description:
        'Réfection de couverture et d’étanchéité de bâtiments tertiaires, commerciaux ou d’entrepôts.',
      metierSlug: 'toiture-couverture',
    },
  ],

  secteursHeading: {
    eyebrow: 'SECTEURS',
    title: 'Une approche par typologie de locaux',
    intro:
      'Chaque secteur impose ses contraintes d’exploitation, de sécurité et de calendrier. Nous organisons le chantier en conséquence.',
  },
  secteurs: [
    {
      id: 'bureaux',
      titre: 'Bureaux',
      description:
        'Plateaux, salles de réunion, accueil : des espaces de travail aménagés autour de vos usages et de l’image de votre entreprise.',
      enjeux: ['Confort des occupants', 'Acoustique et éclairage', 'Chantier en site occupé'],
    },
    {
      id: 'commerces',
      titre: 'Commerces',
      description:
        'Boutiques, showrooms, agences : une rénovation pensée pour l’accueil du public et l’identité de l’enseigne.',
      enjeux: ['Date d’ouverture', 'Accessibilité du public', 'Agencement sur-mesure'],
    },
    {
      id: 'hotellerie',
      titre: 'Hôtellerie',
      description:
        'Chambres, parties communes, accueil : des chantiers phasés pour maintenir l’activité de l’établissement.',
      enjeux: ['Phasage par étages ou zones', 'Nuisances limitées', 'Sécurité des occupants'],
    },
    {
      id: 'restaurants',
      titre: 'Restaurants',
      description:
        'Salle, comptoir, cuisine professionnelle et réseaux : des lieux conçus pour le service et l’expérience des clients.',
      enjeux: ['Fermeture la plus courte possible', 'Réseaux techniques', 'Exigences d’hygiène'],
    },
    {
      id: 'entrepots',
      titre: 'Entrepôts',
      description:
        'Aménagement, mise en conformité des locaux, réfection de toiture et de sols : des bâtiments fonctionnels et durables.',
      enjeux: ['Flux logistiques', 'Sols et structures', 'Couverture et étanchéité'],
    },
  ],

  avantApresHeading: {
    eyebrow: 'AVANT / APRÈS',
    title: 'Des locaux transformés',
    intro: 'Deux exemples de transformation de locaux professionnels, avant et après intervention.',
  },
  avantApres: [
    {
      id: 'bureaux',
      titre: 'Bureaux',
      legende: 'Un ancien corps de bâtiment en brique reconverti en bâtiment tertiaire à façades vitrées.',
      avant: { src: '/assets/avant-apres/bureaux-avant.webp', alt: 'Ancien bâtiment en brique rose à arcades, avant transformation' },
      apres: { src: '/assets/avant-apres/bureaux-apres.webp', alt: 'Bâtiment tertiaire contemporain à façades vitrées et bardage noir, parvis minéral éclairé' },
    },
    {
      id: 'restaurant',
      titre: 'Restaurant & bar',
      legende: 'Une salle de bar-restaurant repensée : comptoir, éclairage et ambiance retravaillés.',
      avant: { src: '/assets/avant-apres/restaurant-avant.webp', alt: 'Salle de bar-restaurant avant rénovation, murs verts, comptoir en bois et tabourets' },
      apres: { src: '/assets/avant-apres/restaurant-apres.webp', alt: 'Même salle rénovée avec comptoir éclairé, suspensions cuivrées et mur de briques rétroéclairé' },
    },
  ],

  argumentaireHeading: {
    eyebrow: 'NOTRE APPROCHE',
    title: 'Ce que nous mettons en œuvre pour votre exploitation',
  },
  argumentaire: [
    {
      titre: 'Continuité d’activité',
      texte:
        'Le chantier est phasé et sécurisé pour que vos équipes ou vos clients continuent d’occuper les lieux autant que possible. Les interventions bruyantes ou sensibles sont planifiées avec vous.',
    },
    {
      titre: 'Normes ERP',
      texte:
        'Pour les établissements recevant du public, les exigences de sécurité et d’accessibilité sont intégrées dès la préparation du chantier, en lien avec votre bureau de contrôle ou votre maître d’œuvre.',
    },
    {
      titre: 'Plannings maîtrisés',
      texte:
        'Un calendrier d’exécution partagé, un suivi régulier et un point d’avancement clair : vous savez où en est le chantier et ce qui reste à livrer.',
    },
    {
      titre: 'Interlocuteur unique',
      texte:
        'En tant que contractant général, nous coordonnons les corps d’état et restons votre point d’entrée unique sur l’ensemble des travaux, de la conception à la livraison.',
    },
  ],

  appelOffres: {
    eyebrow: 'APPEL D’OFFRES',
    title: 'Consultation, cahier des charges, devis',
    text: 'Vous lancez une consultation ou préparez un cahier des charges ? Transmettez-nous votre dossier : nous revenons vers vous avec une proposition structurée et un interlocuteur dédié.',
    elements: [
      'Nature et localisation du site',
      'Programme de travaux ou cahier des charges',
      'Calendrier souhaité et contraintes d’exploitation',
      'Plans et diagnostics disponibles',
    ],
    ctaPrincipal: { label: 'Déposer un appel d’offres', href: '#contact' },
    ctaSecondaire: { label: 'Demander un devis professionnel', href: '#contact' },
  },

  faqHeading: {
    eyebrow: 'QUESTIONS FRÉQUENTES',
    title: 'Avant de consulter une entreprise',
  },
  faq: [
    {
      question: 'Que signifie intervenir en tant que contractant général ?',
      reponse:
        'Nous prenons en charge l’ensemble des travaux auprès du maître d’ouvrage : coordination des corps d’état, planning, suivi de chantier et livraison, avec un seul interlocuteur et une responsabilité d’ensemble.',
    },
    {
      question: 'Peut-on rester en activité pendant les travaux ?',
      reponse:
        'Dans de nombreux cas, oui : le chantier est phasé par zones et les interventions les plus gênantes sont planifiées en concertation avec vous. La faisabilité est étudiée lors de la visite.',
    },
    {
      question: 'Comment sont prises en compte les normes ERP ?',
      reponse:
        'Les exigences applicables à votre établissement sont identifiées en amont avec vous et, le cas échéant, avec votre bureau de contrôle. Elles sont intégrées à la conception et au planning du chantier.',
    },
    {
      question: 'Quels types de locaux professionnels rénovez-vous à Toulouse ?',
      reponse:
        'Bureaux, commerces, hôtels, restaurants et entrepôts, à Toulouse et dans un rayon de 100 km. Pour une typologie particulière, contactez-nous afin d’étudier votre demande.',
    },
    {
      question: 'Comment répondre à un appel d’offres avec Experts Travaux ?',
      reponse:
        'Transmettez-nous votre dossier de consultation ou votre cahier des charges. Nous l’étudions, organisons une visite si nécessaire et vous remettons une proposition chiffrée détaillée.',
    },
  ],

  cta: {
    eyebrow: 'VOTRE PROJET',
    title: 'Parlons de vos locaux',
    text: 'Bureaux, commerce, hôtel, restaurant ou entrepôt : présentez-nous votre besoin et votre calendrier, nous vous proposons une organisation de chantier adaptée.',
    label: 'Contacter l’équipe',
    href: '#contact',
  },
};
