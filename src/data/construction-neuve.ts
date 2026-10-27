// Contenu de la page /particuliers/construction-neuve/.
// Registre de mots-clés (décision 1, option par défaut) : page reformulée autour de « maison sur mesure Toulouse »,
// sans promesse de construction complète « de l’achat du terrain à la livraison ». « Assureur unique » conservé (argument de vente validé par Hery).
// À faire relire par le client avant lancement (étapes, engagements, FAQ).

import type { FaqItem, Lien, PageCta, Prestation } from './home';
import { site } from './site';

export interface ConstructionNeuveContent {
  /** Nom court du service (carte, fil d'Ariane, JSON-LD). */
  nom: string;
  /** H1 unique de la page. */
  h1: string;
  eyebrow: string;
  intro: string;
  accompagnementHeading: { eyebrow: string; title: string };
  accompagnement: Prestation[];
  parcours: {
    eyebrow: string;
    title: string;
    text: string;
    etapes: string[];
    cta: Lien;
  };
  faqHeading: { eyebrow: string; title: string };
  faq: FaqItem[];
  cta: PageCta;
}

export const constructionNeuve: ConstructionNeuveContent = {
  nom: 'Construction neuve',
  h1: 'Maison sur mesure à Toulouse : votre projet de construction neuve',
  eyebrow: 'CONSTRUCTION NEUVE',
  intro:
    `Experts Travaux étudie et conduit votre projet de construction neuve à Toulouse et dans un rayon de ${site.areaServed.radiusKm} km : faisabilité sur votre terrain, devis détaillé, chantier coordonné jusqu’à la remise des clés, avec un seul interlocuteur et assureur unique du chantier.`,

  accompagnementHeading: {
    eyebrow: 'ACCOMPAGNEMENT',
    title: 'De l’étude du projet à la remise des clés',
  },
  accompagnement: [
    {
      titre: 'Le terrain',
      description:
        'Avant l’achat, vérifier que le terrain peut accueillir votre projet : implantation, règles d’urbanisme applicables et faisabilité technique, étudiées avec vous.',
    },
    {
      titre: 'Le projet',
      description:
        'Définir la maison qui correspond à votre usage et à votre budget, avec un cahier des charges clair et un devis détaillé poste par poste.',
    },
    {
      titre: 'Les démarches',
      description:
        'Identifier avec vous les démarches d’urbanisme à prévoir ; l’instruction relève du service compétent.',
    },
    {
      titre: 'Le chantier',
      description:
        'Gros œuvre, second œuvre et finitions coordonnés sur un seul planning, avec un contrôle de l’exécution à chaque étape.',
    },
    {
      titre: 'La livraison',
      description:
        'Une réception sans zone d’ombre, puis la remise des clés de votre maison.',
    },
    {
      titre: 'Un seul responsable',
      description:
        'Un seul interlocuteur et assureur unique du chantier, de la première visite à la livraison.',
    },
  ],

  parcours: {
    eyebrow: 'LE PARCOURS',
    title: 'Quatre étapes, un seul interlocuteur',
    text: 'Chaque projet de construction suit le même fil conducteur, pour que vous sachiez toujours où en est votre maison.',
    etapes: [
      'Vous nous décrivez votre projet et le terrain envisagé ou déjà acquis.',
      'Nous étudions la faisabilité et vous remettons un devis détaillé et un planning.',
      'Nous coordonnons les corps de métier et suivons le chantier.',
      'Nous vous livrons la maison et vous remettons les clés.',
    ],
    cta: { label: 'Parler de mon projet', href: '#contact' },
  },

  faqHeading: {
    eyebrow: 'QUESTIONS FRÉQUENTES',
    title: 'Avant de construire',
  },
  faq: [
    {
      question: 'Pouvez-vous m’accompagner avant l’achat du terrain ?',
      reponse:
        'Oui, c’est l’objet de cet accompagnement : nous étudions avec vous la faisabilité de votre projet sur le terrain envisagé avant son acquisition.',
    },
    {
      question: 'Dans quelle zone construisez-vous ?',
      reponse:
        `Nous intervenons à Toulouse et dans un rayon d’environ ${site.areaServed.radiusKm} km autour de la ville. Pour un terrain en limite de zone, contactez-nous : nous étudions la demande au cas par cas.`,
    },
    {
      question: 'Comment est établi le budget d’une construction ?',
      reponse:
        'Le coût dépend de la surface, du terrain, des matériaux et du niveau de finition. Nous le déterminons dans un devis détaillé poste par poste, validé avant tout démarrage.',
    },
    {
      question: 'Un seul interlocuteur gère-t-il tout le chantier ?',
      reponse:
        'Oui. Un interlocuteur unique coordonne les corps de métier, planifie les interventions et suit l’exécution jusqu’à la livraison. Experts Travaux est aussi l’assureur unique du chantier.',
    },
  ],

  cta: {
    eyebrow: 'VOTRE PROJET',
    title: 'Parlons de votre construction',
    text: 'Un devis détaillé, un interlocuteur unique, un chantier suivi de bout en bout : décrivez-nous votre projet à Toulouse ou dans les environs.',
    label: 'Demander un devis',
    href: '#contact',
  },
};

export const constructionNeuvePath = '/particuliers/construction-neuve/';
