// Source de vérité unique des corps de métier : maison interactive + pages /metiers/{slug}.
// `zoneId` découple la donnée de la géométrie SVG : il doit correspondre à
// l'attribut data-id d'un groupe <a class="zone"> dans MaisonInteractive.astro.
// `slug` = page dédiée SEO : /metiers/{slug}. `page` = contenu de cette page.
// Les balises <title>/<meta description> vivent dans seo.ts.

import type { Cible } from './home';
import { site } from './site';

export type { Cible };

export interface CorpsMetierPage {
  /** H1 unique de la page métier. */
  h1: string;
  /** 2 à 3 phrases d'introduction. */
  intro: string;
  /** 4 à 6 puces concrètes. */
  prestations: string[];
  /** Un paragraphe sur la méthode Experts Travaux (interlocuteur unique). */
  pourquoi: string;
  cibles: Cible;
}

export interface CorpsMetier {
  id: string;
  slug: string;
  nom: string;
  description: string;
  /** Doit correspondre au data-id d'une zone cliquable du SVG. */
  zoneId: string;
  page: CorpsMetierPage;
}

export const corpsMetier: CorpsMetier[] = [
  {
    id: 'toiture',
    slug: 'toiture-couverture',
    nom: 'Toiture & couverture',
    description: 'Couverture, zinguerie et étanchéité : la première barrière de votre maison contre les intempéries.',
    zoneId: 'toiture',
    page: {
      h1: 'Travaux de toiture à Toulouse : réfection et couverture',
      intro:
        `La toiture protège l’ensemble du bâtiment : son état conditionne la durabilité de la charpente, de l’isolation et des intérieurs. Experts Travaux réalise la réfection et l’entretien de couvertures pour les maisons comme pour les bâtiments professionnels, à Toulouse et dans un rayon de ${site.areaServed.radiusKm} km.`,
      prestations: [
        'Réfection et remplacement de couverture',
        'Zinguerie : gouttières, noues, rives et solins',
        'Étanchéité des toitures-terrasses',
        'Traitement des infiltrations après diagnostic',
        'Pose de fenêtres de toit et d’accessoires de couverture',
      ],
      pourquoi:
        'Une toiture mobilise rarement un seul métier : charpente, isolation, zinguerie et parfois échafaudage doivent s’enchaîner dans le bon ordre. Un seul interlocuteur Experts Travaux établit le diagnostic, chiffre l’ensemble et pilote les interventions, de la dépose à la réception. Le devis détaille chaque poste, pour que le budget reste lisible avant le démarrage du chantier.',
      cibles: 'les deux',
    },
  },
  {
    id: 'charpente',
    slug: 'charpente',
    nom: 'Charpente',
    description: 'Charpente traditionnelle ou fermettes : la structure qui porte votre toit, posée dans les règles de l’art.',
    zoneId: 'charpente',
    page: {
      h1: 'Charpente traditionnelle et fermettes à Toulouse',
      intro:
        'La charpente est l’ossature du toit : elle reprend les charges de la couverture et les transmet aux murs porteurs. Experts Travaux intervient en création, en renforcement et en réparation, sur du bâti ancien comme sur de la construction récente.',
      prestations: [
        'Charpente traditionnelle sur mesure',
        'Fermettes industrielles',
        'Renforcement et réparation de charpentes existantes',
        'Traitement du bois et remplacement de pièces dégradées',
        'Structures pour extension, surélévation ou aménagement de combles',
      ],
      pourquoi:
        'Une charpente se conçoit avec la couverture, l’isolation et la maçonnerie qui la reçoivent. Experts Travaux coordonne ces corps d’état sous un même planning et avec un seul interlocuteur : vous n’avez pas à arbitrer entre intervenants. Chaque étape est planifiée en amont, depuis la visite jusqu’à la réception de l’ouvrage, avec un devis détaillé.',
      cibles: 'les deux',
    },
  },
  {
    id: 'isolation',
    slug: 'isolation-thermique',
    nom: 'Isolation thermique',
    description: 'Isolation des combles, murs et sols pour un confort durable et des factures d’énergie maîtrisées.',
    zoneId: 'isolation',
    page: {
      h1: 'Isolation thermique des combles, murs et sols à Toulouse',
      intro:
        'Une isolation bien conçue améliore le confort d’hiver comme d’été et réduit les besoins de chauffage et de climatisation. Experts Travaux traite les parois du bâtiment de façon cohérente, en tenant compte de la ventilation et de l’humidité.',
      prestations: [
        'Isolation des combles perdus ou aménagés',
        'Isolation des murs par l’intérieur',
        'Isolation par l’extérieur, associée au ravalement',
        'Isolation des planchers et des sols',
        'Traitement des ponts thermiques à la jonction des parois',
      ],
      pourquoi:
        'L’isolation touche à la charpente, aux menuiseries, à la ventilation et aux finitions. Experts Travaux pilote ces interventions ensemble pour éviter les reprises : un seul interlocuteur, un seul planning, un résultat homogène. Le périmètre des travaux est précisé dans un devis détaillé, validé avant toute intervention.',
      cibles: 'les deux',
    },
  },
  {
    id: 'facade',
    slug: 'facade-ravalement',
    nom: 'Façade & ravalement',
    description: 'Ravalement, enduit et ITE : protéger les murs et valoriser durablement votre bien.',
    zoneId: 'facade',
    page: {
      h1: 'Ravalement de façade et enduits à Toulouse',
      intro:
        'La façade est à la fois une protection et la première image du bâtiment. Experts Travaux réalise le ravalement des maisons, immeubles et locaux professionnels, en respectant la nature des supports, notamment la brique et la pierre.',
      prestations: [
        'Nettoyage et préparation des supports',
        'Réparation de fissures et reprise de maçonnerie',
        'Enduits de façade et finitions',
        'Peinture de façade',
        'Isolation thermique par l’extérieur',
        'Traitement des soubassements et des abords',
      ],
      pourquoi:
        'Un ravalement implique souvent échafaudage, maçonnerie, menuiseries et parfois isolation. Experts Travaux réunit ces interventions sous un seul interlocuteur, afin que le chantier soit conduit d’une traite et que la façade soit traitée comme un ensemble. Un devis détaillé fixe le périmètre des travaux avant le démarrage du chantier.',
      cibles: 'les deux',
    },
  },
  {
    id: 'maconnerie',
    slug: 'maconnerie-gros-oeuvre',
    nom: 'Maçonnerie & gros œuvre',
    description: 'Fondations, murs porteurs et dalles : les bases solides de toute construction ou extension.',
    zoneId: 'maconnerie',
    page: {
      h1: 'Maçonnerie et gros œuvre à Toulouse',
      intro:
        'Le gros œuvre porte tout le reste du chantier : sa qualité détermine la solidité et la précision des finitions. Experts Travaux réalise des travaux de maçonnerie pour des projets de rénovation, d’extension et de restructuration, chez les particuliers comme chez les professionnels.',
      prestations: [
        'Fondations et soubassements',
        'Murs porteurs et élévations',
        'Dalles, planchers et chapes',
        'Ouverture de baies et création de passages dans les murs porteurs',
        'Reprise de maçonnerie en bâti ancien',
        'Terrassement et réseaux enterrés associés',
      ],
      pourquoi:
        'Le gros œuvre conditionne l’ordre des métiers qui suivent. Experts Travaux planifie l’ensemble du chantier en amont : un seul interlocuteur coordonne la maçonnerie et les corps d’état du second œuvre pour que chaque intervention trouve un support prêt. Le devis détaille chaque poste et le planning est partagé avant le démarrage.',
      cibles: 'les deux',
    },
  },
  {
    id: 'menuiseries',
    slug: 'menuiseries-exterieures',
    nom: 'Menuiseries extérieures',
    description: 'Fenêtres, portes et baies : performance thermique et apport de lumière au millimètre.',
    zoneId: 'menuiseries',
    page: {
      h1: 'Changement de fenêtres à Toulouse : menuiseries extérieures, portes et baies',
      intro:
        'Fenêtres, portes d’entrée et baies vitrées structurent les façades, la lumière et le confort thermique d’un bâtiment. Experts Travaux assure la fourniture et la pose, avec un soin particulier apporté aux joints, aux raccords et à l’étanchéité.',
      prestations: [
        'Remplacement de fenêtres et de portes-fenêtres',
        'Pose de baies vitrées et de grandes ouvertures',
        'Portes d’entrée',
        'Volets et fermetures',
        'Reprise des tableaux, appuis et finitions',
      ],
      pourquoi:
        'Une menuiserie n’est performante que si sa pose l’est aussi, en lien avec l’isolation, la maçonnerie et les finitions. Experts Travaux coordonne ces interventions avec un seul interlocuteur, pour des ouvertures posées au millimètre et raccordées proprement. Le devis précise chaque poste et la réception se fait avec vous, sur place, avant la levée des réserves.',
      cibles: 'les deux',
    },
  },
  {
    id: 'extension',
    slug: 'extension-surelevation',
    nom: 'Extension & surélévation',
    description: 'Gagnez des m² sans déménager, en accord avec le PLU de Toulouse et votre voisinage.',
    zoneId: 'extension',
    page: {
      h1: 'Extension de maison à Toulouse : agrandissement et surélévation',
      intro:
        'Étendre ou surélever une maison permet de gagner de la surface sans déménager. Experts Travaux étudie la faisabilité technique avec vous, puis conduit le chantier depuis le gros œuvre jusqu’aux finitions, en harmonie avec le bâti existant.',
      prestations: [
        'Étude de faisabilité technique sur place',
        'Extension de plain-pied en maçonnerie ou ossature',
        'Surélévation d’une maison existante',
        'Raccordement au bâti : ouvertures, réseaux et structure',
        'Finitions intérieures et extérieures coordonnées',
      ],
      pourquoi:
        'Une extension mêle gros œuvre, charpente, couverture, réseaux et second œuvre. Experts Travaux vous offre un seul interlocuteur du premier croquis à la remise des clés, ainsi qu’un devis détaillé qui permet de maîtriser le budget avant démarrage. Les démarches d’urbanisme applicables sont identifiées avec vous dès la phase d’étude.',
      cibles: 'particuliers',
    },
  },
  {
    id: 'cuisine',
    slug: 'cuisine',
    nom: 'Cuisine',
    description: 'Conception, réseaux d’eau et pose : une cuisine pensée pour durer, du plan 3D à la mise en service.',
    zoneId: 'cuisine',
    page: {
      h1: 'Rénovation de cuisine à Toulouse',
      intro:
        'Une cuisine réussie tient autant à son implantation qu’à la qualité de ses réseaux. Experts Travaux conçoit et réalise votre cuisine, des arrivées d’eau et d’électricité jusqu’à la pose du mobilier et des finitions.',
      prestations: [
        'Conception et implantation de la cuisine',
        'Reprise des réseaux d’eau, d’évacuation et d’électricité',
        'Dépose de l’ancienne cuisine',
        'Pose du mobilier, du plan de travail et de l’électroménager',
        'Sols, revêtements muraux, peinture et éclairage',
      ],
      pourquoi:
        'Plomberie, électricité, carrelage, peinture et menuiserie interviennent dans un ordre précis. Experts Travaux les coordonne avec un seul interlocuteur, afin de limiter la durée du chantier et de livrer une cuisine prête à l’usage. Le devis détaille chaque poste, de la dépose à la mise en service, pour que le budget soit connu avant le démarrage.',
      cibles: 'particuliers',
    },
  },
  {
    id: 'salle-de-bain',
    slug: 'salle-de-bain',
    nom: 'Salle de bain',
    description: 'Douches à l’italienne étanchéifiées dans les règles, carrelage et meubles posés au millimètre.',
    zoneId: 'salle-de-bain',
    page: {
      h1: 'Rénovation de salle de bain à Toulouse',
      intro:
        'La salle de bain est la pièce la plus exposée à l’eau : l’étanchéité et la plomberie y sont déterminantes. Experts Travaux la rénove entièrement ou partiellement, avec une exécution soignée des supports et des finitions.',
      prestations: [
        'Douche à l’italienne avec étanchéité sous carrelage',
        'Plomberie, évacuations et ventilation',
        'Carrelage des sols et des murs',
        'Pose de meubles vasques, sanitaires et robinetterie',
        'Électricité et éclairage de la pièce',
      ],
      pourquoi:
        'Un défaut d’étanchéité se révèle souvent après la livraison. Experts Travaux traite la salle de bain comme un ensemble : un seul interlocuteur supervise la préparation des supports, l’étanchéité, le carrelage et la plomberie, avec un contrôle à chaque étape. Le devis détaille chaque poste, pour que le budget soit connu avant le démarrage des travaux.',
      cibles: 'particuliers',
    },
  },
  {
    id: 'chauffage',
    slug: 'chauffage-climatisation',
    nom: 'Climatisation & chauffage',
    description: 'Climatisation, chauffage et ventilation : un confort thermique maîtrisé toute l’année.',
    zoneId: 'chauffage',
    page: {
      h1: 'Installation de climatisation et chauffage à Toulouse',
      intro:
        'Le choix d’un système de chauffage et de rafraîchissement dépend du bâtiment, de son isolation et de ses usages. Experts Travaux installe et remplace les équipements de chauffage et de climatisation, pour des logements comme pour des locaux professionnels.',
      prestations: [
        'Installation de climatisation réversible',
        'Radiateurs et réseau de distribution',
        'Remplacement de chaudière ou de générateur',
        'Ventilation associée aux équipements',
      ],
      pourquoi:
        'Un système de chauffage fonctionne avec l’isolation, la plomberie et l’électricité du bâtiment. Experts Travaux coordonne ces corps d’état : un seul interlocuteur vous conseille, chiffre l’ensemble et suit la mise en service. Le choix du système est discuté avec vous lors de la visite, au regard de l’état du bâtiment et de vos usages.',
      cibles: 'les deux',
    },
  },
  {
    id: 'electricite',
    slug: 'electricite',
    nom: 'Électricité',
    description: 'Mise aux normes électriques, tableau, réseaux et éclairage pour une installation sûre.',
    zoneId: 'electricite',
    page: {
      h1: 'Mise aux normes électriques à Toulouse : tableau et installation',
      intro:
        'Une installation électrique doit être sûre, lisible et adaptée à vos usages actuels. Experts Travaux réalise des installations neuves et des rénovations complètes, pour des logements comme pour des locaux professionnels.',
      prestations: [
        'Remplacement et mise en conformité du tableau électrique',
        'Reprise ou création de circuits et de prises',
        'Éclairage intérieur et extérieur',
        'Alimentation des équipements de cuisine, de chauffage et de climatisation',
      ],
      pourquoi:
        'L’électricité intervient à presque chaque étape d’un chantier, avant et après les cloisons et les finitions. Experts Travaux l’intègre au planning général : un seul interlocuteur évite les ouvertures de saignées inutiles et les reprises tardives. Le chiffrage est détaillé poste par poste et validé avant le démarrage, pour une installation lisible et documentée.',
      cibles: 'les deux',
    },
  },
  {
    id: 'finitions',
    slug: 'platrerie-peinture-carrelage',
    nom: 'Peinture, plâtrerie & carrelage',
    description: 'Cloisons, sols et finitions : le second œuvre qui donne à votre intérieur son aspect final.',
    zoneId: 'finitions',
    page: {
      h1: 'Peinture et plâtrerie à Toulouse : cloisons, plafonds et carrelage',
      intro:
        'Les finitions donnent à un intérieur son aspect définitif et révèlent la qualité du chantier. Experts Travaux réalise cloisons, plafonds, sols et peintures avec le soin du second œuvre, pour des logements et des locaux professionnels.',
      prestations: [
        'Cloisons et doublages en plâtrerie',
        'Faux plafonds et habillages',
        'Carrelage des sols et des murs',
        'Enduits, ponçage et peinture intérieure',
        'Revêtements de sol et plinthes',
      ],
      pourquoi:
        'Les finitions ne rattrapent pas un support mal préparé. Experts Travaux coordonne le second œuvre avec les corps d’état précédents : un seul interlocuteur planifie chaque métier au bon moment et contrôle la qualité avant la réception. Le devis détaille chaque poste et le chantier est remis propre, avec une réception réalisée avec vous.',
      cibles: 'les deux',
    },
  },
];
