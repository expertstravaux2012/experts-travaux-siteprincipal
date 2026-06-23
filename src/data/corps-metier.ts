// Source de vérité unique des corps de métier affichés sur la maison interactive.
// `zoneId` découple la donnée de la géométrie SVG : il doit correspondre à
// l'attribut data-id d'un groupe <a class="zone"> dans MaisonInteractive.astro.
// `slug` = future page dédiée SEO : /metiers/{slug}.
// Contenu provisoire — rédaction définitive à venir (agent content-fr).

export interface CorpsMetier {
  id: string;
  slug: string;
  nom: string;
  description: string;
  /** Doit correspondre au data-id d'une zone cliquable du SVG. */
  zoneId: string;
}

export const corpsMetier: CorpsMetier[] = [
  {
    id: 'toiture',
    slug: 'toiture-couverture',
    nom: 'Toiture & couverture',
    description: 'Couverture, zinguerie et étanchéité : la première barrière de votre maison contre les intempéries.',
    zoneId: 'toiture',
  },
  {
    id: 'charpente',
    slug: 'charpente',
    nom: 'Charpente',
    description: 'Charpente traditionnelle ou fermettes : la structure qui porte votre toit, posée dans les règles de l’art.',
    zoneId: 'charpente',
  },
  {
    id: 'isolation',
    slug: 'isolation-thermique',
    nom: 'Isolation thermique',
    description: 'Isolation des combles, murs et sols pour un confort durable et des factures d’énergie maîtrisées.',
    zoneId: 'isolation',
  },
  {
    id: 'facade',
    slug: 'facade-ravalement',
    nom: 'Façade & ravalement',
    description: 'Ravalement, enduit et ITE : protéger les murs et valoriser durablement votre bien.',
    zoneId: 'facade',
  },
  {
    id: 'maconnerie',
    slug: 'maconnerie-gros-oeuvre',
    nom: 'Maçonnerie & gros œuvre',
    description: 'Fondations, murs porteurs et dalles : les bases solides de toute construction ou extension.',
    zoneId: 'maconnerie',
  },
  {
    id: 'menuiseries',
    slug: 'menuiseries-exterieures',
    nom: 'Menuiseries extérieures',
    description: 'Fenêtres, portes et baies : performance thermique et apport de lumière au millimètre.',
    zoneId: 'menuiseries',
  },
  {
    id: 'extension',
    slug: 'extension-surelevation',
    nom: 'Extension & surélévation',
    description: 'Gagnez des m² sans déménager, en accord avec le PLU de Toulouse et votre voisinage.',
    zoneId: 'extension',
  },
  {
    id: 'cuisine',
    slug: 'cuisine',
    nom: 'Cuisine & plomberie',
    description: 'Conception, réseaux d’eau et pose : une cuisine pensée pour durer, du plan 3D à la mise en service.',
    zoneId: 'cuisine',
  },
  {
    id: 'salle-de-bain',
    slug: 'salle-de-bain',
    nom: 'Salle de bain & étanchéité',
    description: 'Douches à l’italienne étanchéifiées dans les règles, carrelage et meubles posés au millimètre.',
    zoneId: 'salle-de-bain',
  },
  {
    id: 'chauffage',
    slug: 'chauffage-climatisation',
    nom: 'Chauffage & climatisation',
    description: 'Pompe à chaleur, radiateurs et climatisation : un confort thermique maîtrisé toute l’année.',
    zoneId: 'chauffage',
  },
  {
    id: 'electricite',
    slug: 'electricite',
    nom: 'Électricité',
    description: 'Mise aux normes NF C 15-100, tableau, réseaux et domotique pour une installation sûre.',
    zoneId: 'electricite',
  },
  {
    id: 'finitions',
    slug: 'platrerie-peinture-carrelage',
    nom: 'Plâtrerie, carrelage & peinture',
    description: 'Cloisons, sols et finitions : le second œuvre qui donne à votre intérieur son aspect final.',
    zoneId: 'finitions',
  },
];
