// Contenu de la page /particuliers/piscine/ (mot-clé validé par Hery : piscine, Toulouse).
// Contenu limité à ce que montre le chantier filmé (fouille, dalle, murs en blocs, local technique, bassin terminé) :
// aucune garantie, délai, prix ni label sans justificatif. « Assureur unique » conservé (argument de vente validé par Hery).
// À faire relire par le client avant lancement (étapes, FAQ).

import type { FaqItem, Lien, PageCta, Prestation } from './home';
import type { ChantierVideo } from './particuliers';
import { site } from './site';

export interface PiscineContent {
  /** Nom court du service (carte, fil d'Ariane, JSON-LD). */
  nom: string;
  /** H1 unique de la page. */
  h1: string;
  eyebrow: string;
  intro: string;
  video: ChantierVideo;
  etapesHeading: { eyebrow: string; title: string };
  etapes: Prestation[];
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

export const piscine: PiscineContent = {
  nom: 'Piscine',
  h1: 'Construction de piscine à Toulouse : un chantier suivi de la fouille au bassin',
  eyebrow: 'PISCINE',
  intro:
    `Experts Travaux conduit la construction de votre piscine à Toulouse et dans un rayon de ${site.areaServed.radiusKm} km : terrassement, structure du bassin, réseaux et local technique, finitions. Un seul interlocuteur et un assureur unique du chantier, de la première visite à la livraison.`,

  video: {
    eyebrow: 'CHANTIER EN IMAGES',
    title: 'Un chantier de piscine, de la fouille au bassin fini',
    legende:
      'Un chantier réel suivi du terrassement à la livraison : fouille, dalle, murs en blocs, local technique, puis bassin terminé.',
    label: 'Vidéo en accéléré d’un chantier de piscine, de la fouille au bassin terminé',
    src: 'https://sipbbsi1c6f8dcwa.public.blob.vercel-storage.com/chantier_piscine.mp4',
    poster: '/assets/realisations/piscine-chantier-poster.webp',
    width: 1280,
    height: 720,
  },

  etapesHeading: {
    eyebrow: 'LE CHANTIER',
    title: 'Les étapes de construction de votre piscine',
  },
  etapes: [
    {
      titre: 'Le terrassement',
      description:
        'Fouille aux dimensions du bassin et préparation du terrain, en tenant compte de l’accès au chantier et de l’environnement de la maison.',
    },
    {
      titre: 'La structure du bassin',
      description:
        'Dalle de fond et murs en blocs : la structure qui donne au bassin sa forme, ses marches et ses volumes.',
    },
    {
      titre: 'Les réseaux et le local technique',
      description:
        'Gaines, canalisations et local technique prévus dès la structure, pour que le fonctionnement de la piscine reste accessible et lisible.',
    },
    {
      titre: 'Les finitions',
      description:
        'Revêtement du bassin, margelles et abords : le bassin terminé, prêt à être mis en eau.',
    },
    {
      titre: 'Les abords',
      description:
        'Terrasse, local ou abri annexe selon votre projet, coordonnés avec le chantier du bassin plutôt qu’après lui.',
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
    text: 'Chaque projet de piscine suit le même fil conducteur, pour que vous sachiez toujours où en est le chantier.',
    etapes: [
      'Vous nous décrivez votre projet et votre terrain.',
      'Nous visitons les lieux, étudions la faisabilité et vous remettons un devis détaillé.',
      'Nous coordonnons les interventions et suivons le chantier étape par étape.',
      'Nous vous livrons la piscine terminée.',
    ],
    cta: { label: 'Parler de ma piscine', href: '#contact' },
  },

  faqHeading: {
    eyebrow: 'QUESTIONS FRÉQUENTES',
    title: 'Avant de construire une piscine',
  },
  faq: [
    {
      question: 'Faut-il une autorisation pour construire une piscine ?',
      reponse:
        'Selon ses dimensions et la situation du terrain, une démarche d’urbanisme peut être nécessaire. Nous identifions avec vous celle à prévoir ; l’instruction relève du service compétent.',
    },
    {
      question: 'Dans quelle zone construisez-vous des piscines ?',
      reponse:
        `Nous intervenons à Toulouse et dans un rayon d’environ ${site.areaServed.radiusKm} km autour de la ville. Pour un terrain en limite de zone, contactez-nous : nous étudions la demande au cas par cas.`,
    },
    {
      question: 'Comment est établi le budget d’une piscine ?',
      reponse:
        'Le coût dépend des dimensions du bassin, de la nature du terrain, des équipements et du niveau de finition. Nous le déterminons dans un devis détaillé poste par poste, après une visite sur place.',
    },
    {
      question: 'Un seul interlocuteur gère-t-il tout le chantier ?',
      reponse:
        'Oui. Un interlocuteur unique coordonne les interventions, planifie le chantier et suit l’exécution jusqu’à la livraison. Experts Travaux est aussi l’assureur unique du chantier.',
    },
  ],

  cta: {
    eyebrow: 'VOTRE PROJET',
    title: 'Parlons de votre piscine',
    text: 'Un devis détaillé après visite, un interlocuteur unique, un chantier suivi de bout en bout : décrivez-nous votre projet à Toulouse ou dans les environs.',
    label: 'Demander un devis',
    href: '#contact',
  },
};

export const piscinePath = '/particuliers/piscine/';
