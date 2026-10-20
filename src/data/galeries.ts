// Photos de chantiers réels : galeries des pages métier et visuels isolés. Fichiers dans public/assets/realisations/.

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface Galerie {
  eyebrow: string;
  title: string;
  photos: Photo[];
}

const dossier = '/assets/realisations';

/** Galeries par slug de métier ; les métiers absents n'affichent pas de galerie. */
export const galeriesMetier: Partial<Record<string, Galerie>> = {
  cuisine: {
    eyebrow: 'RÉALISATIONS',
    title: 'Des cuisines livrées',
    photos: [
      {
        src: `${dossier}/cuisine-bois-brique.webp`,
        alt: 'Cuisine ouverte en U aux façades blanches, niche en bois et mur de briques, sur parquet clair',
        width: 1200,
        height: 900,
      },
      {
        src: `${dossier}/cuisine-blanche-pendentifs.webp`,
        alt: 'Cuisine blanche sous deux suspensions, avec péninsule à plan de travail en marbre et parquet clair',
        width: 1200,
        height: 1600,
      },
      {
        src: `${dossier}/cuisine-ilot-central.webp`,
        alt: 'Cuisine aux façades blanches avec îlot central noir, réfrigérateur américain et hotte intégrée au plafond',
        width: 1200,
        height: 900,
      },
      {
        src: `${dossier}/cuisine-blanche-eclairee.webp`,
        alt: 'Cuisine aux façades blanches laquées, plan de travail gris, four encastré et spots au plafond',
        width: 1200,
        height: 1600,
      },
      {
        src: `${dossier}/cuisine-facades-bois.webp`,
        alt: 'Cuisine en L aux façades en bois clair, plan de travail noir et hotte inox',
        width: 1200,
        height: 900,
      },
    ],
  },
  'salle-de-bain': {
    eyebrow: 'RÉALISATIONS',
    title: 'Des salles de bain livrées',
    photos: [
      {
        src: `${dossier}/salle-de-bain-grise-vasque-pierre.webp`,
        alt: 'Salle de bain aux murs gris, meuble gris à tiroirs avec vasque en pierre et douche à l’italienne',
        width: 1200,
        height: 1600,
      },
      {
        src: `${dossier}/salle-de-bain-ardoise-douche.webp`,
        alt: 'Douche à l’italienne avec paroi en ardoise multicolore, WC suspendu et sol en ardoise',
        width: 1200,
        height: 1600,
      },
      {
        src: `${dossier}/salle-de-bain-carreaux-gris.webp`,
        alt: 'Douche à l’italienne habillée de carreaux irréguliers gris-bleu, avec douchette murale',
        width: 1200,
        height: 1600,
      },
      {
        src: `${dossier}/salle-de-bain-douche-vitree-bois.webp`,
        alt: 'Salle de bain aux murs blancs avec douche vitrée à profilés noirs, carrelage effet bois et vasque suspendue',
        width: 1080,
        height: 1350,
      },
      {
        src: `${dossier}/salle-de-bain-baignoire-bois.webp`,
        alt: 'Salle de bain avec baignoire et douche vitrée, sol et bandeau en carrelage effet bois, fenêtre et tapis',
        width: 735,
        height: 980,
      },
      {
        src: `${dossier}/salle-de-bain-bois-vasque-suspendue.webp`,
        alt: 'Salle de bain habillée de panneaux bois et de carreaux gris, miroir rond et meuble vasque blanc suspendu',
        width: 1080,
        height: 1350,
      },
    ],
  },
};
