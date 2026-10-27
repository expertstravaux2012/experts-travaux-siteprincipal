// Contenu éditorial de la home (`/`) : Hero, bloc sémantique SEO, À propos, preuves, contact.
// Types partagés (TextSegment, Prestation, FaqItem, PageCta, Cible) exportés d'ici
// et réutilisés par particuliers.ts, professionnels.ts et corps-metier.ts.
import { communesLabel, site } from './site';

/** Segment de texte : simple si `href` absent, lien interne si `href` présent. */
export interface TextSegment {
  text: string;
  /** Chemin interne absolu (ex. '/particuliers/'). */
  href?: string;
}

/** Un paragraphe = une suite ordonnée de segments à concaténer (liens inclus). */
export type RichParagraph = TextSegment[];

export interface Lien {
  label: string;
  href: string;
}

/** Cible principale d'une page ou d'un métier. */
export type Cible = 'particuliers' | 'professionnels' | 'les deux';

export interface Prestation {
  titre: string;
  description: string;
  /** Slug d'une page /metiers/{slug} associée, si pertinent. */
  metierSlug?: string;
  /** Lien explicite vers une autre page (prioritaire sur `metierSlug`). */
  href?: string;
}

export interface FaqItem {
  question: string;
  reponse: string;
}

/** Bandeau d'appel à l'action de fin de page. */
export interface PageCta {
  eyebrow: string;
  title: string;
  text: string;
  label: string;
  href: string;
}

export interface HeroSlide {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface HeroCarouselLabels {
  groupLabel: string;
  /** Préfixe du libellé accessible d'un bouton de slide (suivi du numéro puis de la légende). */
  slideLabel: string;
  pause: string;
  resume: string;
  pauseAriaLabel: string;
  resumeAriaLabel: string;
}

export interface HeroContent {
  eyebrow: string;
  /** H1 unique de la home. */
  title: string;
  /** 2 lignes maximum. */
  subtitle: string;
  ctas: {
    particuliers: Lien;
    professionnels: Lien;
  };
  slides: HeroSlide[];
  carousel: HeroCarouselLabels;
}

export const hero: HeroContent = {
  eyebrow: 'RÉNOVATION & BÂTIMENT · TOULOUSE',
  title:
    'Entreprise de rénovation à Toulouse, maître d’œuvre de vos travaux de la conception à la livraison',
  subtitle:
    `Entreprise tous corps d’état pour particuliers et professionnels : un seul interlocuteur et assureur unique du chantier, à Toulouse et dans un rayon de ${site.areaServed.radiusKm} km.`,
  ctas: {
    particuliers: { label: 'Espace Particuliers', href: '/particuliers/' },
    professionnels: { label: 'Espace Professionnels', href: '/professionnels/' },
  },
  slides: [
    {
      src: '/assets/maison-toulousaine.webp',
      alt: "Maison de maître en brique rose du XIXe rénovée avec extension cubique noire vitrée et jardin paysager éclairé, heure bleue, Toulouse",
      caption: 'La brique ancienne, réinventée',
      width: 1920,
      height: 815,
    },
    {
      src: '/assets/bureaux-toulousains.webp',
      alt: 'Bâtiment tertiaire contemporain à façades vitrées double hauteur et bardage noir, parvis minéral éclairé, heure bleue, Toulouse',
      caption: "Quand l'architecture de bureau s'impose",
      width: 1920,
      height: 815,
    },
    {
      src: '/assets/extension-maison-toulousaine.webp',
      alt: "Ancienne ferme en pierre et brique rose prolongée d'une extension cubique noire entièrement vitrée ouvrant sur le salon, jardin méditerranéen au crépuscule, Toulouse",
      caption: 'Bâti ancien, geste contemporain',
      width: 1920,
      height: 815,
    },
    {
      src: '/assets/restaurant-toulousain.webp',
      alt: 'Intérieur de bar-restaurant intimiste avec comptoir en noyer, mur de briques rétroéclairé et suspensions cuivrées, Toulouse',
      caption: "Un lieu conçu pour l'expérience",
      width: 1920,
      height: 1072,
    },
    {
      src: '/assets/renovation-cuisine-toulousaine.webp',
      alt: 'Cuisine rénovée avec îlot en pierre et chêne, façades noires mates, poutres apparentes et grande fenêtre sur toits de tuiles au couchant, Toulouse',
      caption: 'Chaque détail, pensé pour durer',
      width: 1920,
      height: 815,
    },
    {
      src: '/assets/amenagement-exterieur-toulouse.webp',
      alt: "Terrasse au crépuscule avec pergola bioclimatique noire à LED, salon d'extérieur en pierre et végétation éclairée avec vue sur la ville, Toulouse",
      caption: 'La terrasse devient pièce à vivre',
      width: 1920,
      height: 1072,
    },
  ],
  carousel: {
    groupLabel: 'Réalisations en arrière-plan',
    slideLabel: 'Réalisation',
    pause: 'Pause',
    resume: 'Reprendre',
    pauseAriaLabel: 'Mettre en pause le carrousel',
    resumeAriaLabel: 'Reprendre le carrousel',
  },
};

/** Slogan et baseline validés par le client (à afficher en signature, pas en H1). */
export const signature = {
  slogan: 'Maison de confiance',
  baseline: 'Un seul interlocuteur, de la conception à la livraison',
} as const;

export interface PresentationContent {
  eyebrow: string;
  /** Titre de section (H2). */
  title: string;
  /** Chaque paragraphe est une liste de segments ; concaténer `text`, lier si `href`. */
  paragraphs: RichParagraph[];
  /** Champ lexical affiché en puces sous le titre (décoratif, sans interaction). */
  keywords: string[];
  /** Préfixe de planche des cartes d'aiguillage (ex. « PL. »). */
  plate: string;
  /** Aiguillage de fin de section : libellé = `hero.ctas[cible].label`, accroche = `navigation.menus[cible].tagline`. */
  segments: PresentationSegment[];
}

export interface PresentationSegment {
  cible: 'particuliers' | 'professionnels';
  image: HeroSlide;
}

const slideBySrc = (src: string): HeroSlide => {
  const slide = hero.slides.find((s) => s.src === src);
  if (!slide) throw new Error(`Slide introuvable : ${src}`);
  return slide;
};

/** Bloc sémantique SEO de la home : 300 à 400 mots, juste sous le premier écran. */
export const presentation: PresentationContent = {
  eyebrow: 'PRÉSENTATION',
  title: 'Experts Travaux, entreprise de rénovation et de bâtiment à Toulouse',
  paragraphs: [
    [
      {
        text: `Experts Travaux est une entreprise de rénovation et de bâtiment basée à Toulouse, qui intervient dans un rayon de ${site.areaServed.radiusKm} km autour de la ville, notamment à ${communesLabel}. Entreprise de travaux tous corps d’état et maître d’œuvre, notre métier est de coordonner l’ensemble des corps de métier d’un chantier, du gros œuvre aux finitions, pour que vous n’ayez qu’un seul interlocuteur, de la conception à la livraison.`,
      },
    ],
    [
      {
        text: 'Chaque projet commence par une visite sur place et une étude de faisabilité. Nous établissons ensuite un devis détaillé, un planning et une organisation de chantier. La coordination de travaux repose sur une gestion de projet rigoureuse : sélection d’artisans qualifiés, enchaînement des interventions, contrôle de l’exécution. Cette discipline limite les aléas, protège le calendrier et permet le respect du budget annoncé, du premier devis à la réception des travaux.',
      },
    ],
    [
      {
        text: 'Pour les particuliers, nous concevons des projets sur-mesure : rénovation complète, extension, cuisine, salle de bain, aménagement de combles, décoration ou ',
      },
      { text: 'construction neuve', href: '/particuliers/construction-neuve/' },
      { text: '. Vous pouvez ' },
      { text: 'découvrir nos solutions de rénovation', href: '/particuliers/' },
      {
        text: ' pour votre maison ou votre appartement, puis demander un devis. Chaque intervention est menée dans le respect des normes en vigueur et des règles d’urbanisme qui s’appliquent à votre bien.',
      },
    ],
    [
      {
        text: 'Pour les entreprises, nous intervenons en tant qu’entreprise tous corps d’état et maître d’œuvre, sur des bureaux, commerces, hôtels et restaurants. Les chantiers sont phasés pour préserver la continuité d’activité et tenus dans des plannings stricts. Notre offre de ',
      },
      {
        text: 'rénovation de locaux professionnels à Toulouse',
        href: '/professionnels/',
      },
      {
        text: ' détaille cette approche, y compris pour les établissements recevant du public.',
      },
    ],
    [
      { text: 'Notre savoir-faire couvre le gros œuvre comme le second œuvre : ' },
      { text: 'maçonnerie et gros œuvre', href: '/metiers/maconnerie-gros-oeuvre/' },
      { text: ', ' },
      { text: 'charpente', href: '/metiers/charpente/' },
      { text: ', ' },
      { text: 'toiture et couverture', href: '/metiers/toiture-couverture/' },
      { text: ', menuiseries extérieures, plomberie, électricité, plâtrerie, carrelage et peinture. Lorsqu’un chantier mobilise plusieurs métiers, la responsabilité d’ensemble reste entre les mêmes mains.' },
    ],
    [
      {
        text: 'Qu’il s’agisse d’une maison toulousaine à transformer ou d’un site professionnel à aménager, la méthode reste la même : un cahier des charges clair, des matériaux choisis avec soin, un chantier propre et une réception sans zone d’ombre. Parlez-nous de votre projet.',
      },
    ],
  ],
  keywords: [
    'Coordination de travaux',
    'Artisans qualifiés',
    'Assureur unique du chantier',
    'Gestion de projet',
    'Sur-mesure',
    'Respect du budget',
    'Normes en vigueur',
  ],
  plate: 'PL.',
  segments: [
    { cible: 'particuliers', image: slideBySrc('/assets/extension-maison-toulousaine.webp') },
    { cible: 'professionnels', image: slideBySrc('/assets/bureaux-toulousains.webp') },
  ],
};

export interface AproposContent {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  stats: { valeur: string; label: string }[];
}

export const apropos: AproposContent = {
  eyebrow: 'À propos',
  title: "Une équipe toulousaine, une exigence d’artisan.",
  paragraphs: [
    "Basés au cœur de Toulouse, nous accompagnons les particuliers et les professionnels de la métropole dans leurs projets de rénovation et de construction depuis plusieurs années.",
    "Notre force : une équipe pluridisciplinaire qui maîtrise l’ensemble des corps de métier, du gros œuvre aux finitions. Vous gardez un seul interlocuteur, de la première visite à la remise des clés.",
  ],
  stats: [
    { valeur: '12', label: 'corps de métier' },
    { valeur: 'Toulouse', label: 'et sa métropole' },
  ],
};

export interface ChiffreCle {
  /** `null` tant que la valeur n'est pas fournie : ne pas afficher le chiffre. */
  valeur: string | null;
  label: string;
  /** Consigne interne (non affichée) : ce que le client doit fournir. */
  placeholder: string;
}

/** « Chiffres clés » du cahier (Zone 3). Valeurs à fournir par Hery / Ugo. */
export const chiffresCles: ChiffreCle[] = [
  {
    valeur: null,
    label: 'CHANTIERS RÉALISÉS',
    placeholder: 'À CONFIRMER : nombre de chantiers réalisés (valeur et date de référence).',
  },
  {
    valeur: null,
    label: 'CLIENTS SATISFAITS',
    placeholder: 'À CONFIRMER : taux de satisfaction et méthode de mesure (avis vérifiables).',
  },
  {
    valeur: null,
    label: 'ASSURANCE DÉCENNALE',
    placeholder: 'À CONFIRMER : attestation de décennale en cours de validité (assureur, n° de contrat).',
  },
];

/** Champ du formulaire de devis. `agentHint` = toolparamdescription WebMCP (consigne lue par les agents IA). */
export interface ContactField {
  label: string;
  placeholder: string;
  agentHint: string;
}

/** Déclaration WebMCP du formulaire (attributs toolname / tooldescription), lue par les agents IA. */
export interface ContactFormTool {
  /** Nom court, orienté action, en snake_case. */
  name: string;
  /** Description selon la cible de la page ; `defaut` = home. */
  description: { defaut: string; particuliers: string; professionnels: string };
}

export interface ContactFormContent {
  fields: {
    nom: ContactField;
    email: ContactField;
    tel: ContactField;
    projet: ContactField;
  };
  submit: string;
  tool: ContactFormTool;
}

export interface ContactIntro {
  eyebrow: string;
  title: string;
  text: string;
}

export interface CtaContactContent {
  eyebrow: string;
  title: string;
  text: string;
  label: string;
  href: string;
  /** Variantes d'en-tête de la section Contact selon la cible de la page. */
  cibles: { particuliers: ContactIntro; professionnels: ContactIntro };
  form: ContactFormContent;
}

export const ctaContact: CtaContactContent = {
  eyebrow: 'CONTACT',
  title: 'Parlons de votre projet',
  text: 'Décrivez-nous votre chantier : nous revenons vers vous pour une première visite et un devis détaillé, sans engagement.',
  label: 'Demander un devis',
  href: '/#contact',
  cibles: {
    particuliers: {
      eyebrow: 'CONTACT PARTICULIERS',
      title: 'Décrivez-nous votre projet de rénovation',
      text: 'Nature des travaux, localisation, attentes : nous revenons vers vous pour une première visite et un devis détaillé, sans engagement.',
    },
    professionnels: {
      eyebrow: 'CONTACT PROFESSIONNELS',
      title: 'Présentez-nous vos locaux et votre calendrier',
      text: 'Nature du site, programme de travaux, contraintes d’exploitation : nous revenons vers vous avec une proposition structurée et un interlocuteur dédié.',
    },
  },
  form: {
    fields: {
      nom: {
        label: 'Nom',
        placeholder: 'Votre nom',
        agentHint: 'Nom et prénom de la personne à recontacter.',
      },
      email: {
        label: 'Email',
        placeholder: 'vous@exemple.fr',
        agentHint: 'Adresse email à laquelle envoyer la réponse et le devis.',
      },
      tel: {
        label: 'Téléphone',
        placeholder: '06 12 34 56 78',
        agentHint: 'Numéro de téléphone pour être rappelé (facultatif).',
      },
      projet: {
        label: 'Votre projet',
        placeholder: 'Extension, rénovation, cuisine…',
        agentHint:
          'Nature des travaux, commune du chantier, surface approximative et délai souhaité.',
      },
    },
    submit: 'Envoyer ma demande',
    tool: {
      name: 'demande_devis',
      description: {
        defaut: `Envoie une demande de devis à Experts Travaux, entreprise de rénovation et de bâtiment à ${site.areaServed.city} et dans un rayon de ${site.areaServed.radiusKm} km, pour particuliers et professionnels.`,
        particuliers: `Envoie une demande de devis à Experts Travaux pour un projet de particulier (rénovation de maison ou d’appartement, extension, cuisine, salle de bain, maison sur mesure, piscine) à ${site.areaServed.city} et dans un rayon de ${site.areaServed.radiusKm} km.`,
        professionnels: `Envoie une demande de devis à Experts Travaux pour la rénovation de locaux professionnels (bureaux, commerces, hôtels, restaurants) à ${site.areaServed.city} et dans un rayon de ${site.areaServed.radiusKm} km.`,
      },
    },
  },
};

export interface SectionIntro {
  eyebrow: string;
  title: string;
}

export interface RealisationsLabels {
  plate: string;
  restitution: string;
  lieu: string;
  duree: string;
  voir: string;
}

export const realisationsSection: SectionIntro & { cta: Lien; labels: RealisationsLabels } = {
  eyebrow: 'Réalisations',
  title: 'Du gros œuvre aux finitions, des ouvrages à regarder de près.',
  cta: { label: 'Discuter de mon projet', href: '/#contact' },
  labels: {
    plate: 'PL.',
    restitution: 'RESTITUTION',
    lieu: 'LIEU',
    duree: 'DURÉE',
    voir: 'Voir la réalisation',
  },
};

export const methodeSection: SectionIntro = {
  eyebrow: 'Méthode',
  title: 'Un cadre clair, du premier échange à la remise des clés.',
};

export const maisonInteractiveSection = {
  eyebrow: 'Expertises',
  title: 'Un savoir-faire complet, du gros œuvre aux finitions.',
  intro:
    'Tous les corps de métier de votre chantier, maîtrisés en interne et coordonnés par un seul interlocuteur, du devis à la remise des clés.',
  prompt: 'Cliquez sur un métier pour découvrir notre approche, nos garanties et nos réalisations.',
  coupeLabel: "Coupe d'une maison illustrant les corps de métier ; la liste des métiers ci-dessous offre les mêmes liens.",
  viewerLabel:
    "Maquette 3D d'une maison, orientable, illustrant les corps de métier ; la liste des métiers ci-dessous offre les mêmes liens.",
  hint: 'Faites glisser pour pivoter la maison',
  cta: 'Découvrir ce métier',
  close: 'Fermer',
};
