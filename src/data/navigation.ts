import type { Cible } from './home';
import { corpsMetier } from './corps-metier';
import { particuliers } from './particuliers';
import { professionnels } from './professionnels';

export type MenuId = 'particuliers' | 'professionnels';

export interface NavLink {
  label: string;
  href: string;
  /** Présent : le lien possède un panneau de métiers (méga-menu / accordéon). */
  menu?: MenuId;
}

export interface MenuMetier {
  slug: string;
  nom: string;
  description: string;
}

export interface MegaMenuContent {
  eyebrow: string;
  tagline: string;
  cta: { label: string; href: string };
  metiers: MenuMetier[];
}

const metiersFor = (cible: Exclude<Cible, 'les deux'>): MenuMetier[] =>
  corpsMetier
    .filter(({ page }) => page.cibles === cible || page.cibles === 'les deux')
    .map(({ slug, nom, description }) => ({ slug, nom, description }));

const links: NavLink[] = [
  { label: 'Particuliers', href: '/particuliers/', menu: 'particuliers' },
  { label: 'Professionnels', href: '/professionnels/', menu: 'professionnels' },
  { label: 'Réalisations', href: '/#realisations' },
  { label: 'Méthode', href: '/#methode' },
  { label: 'À propos', href: '/#apropos' },
];

const menus: Record<MenuId, MegaMenuContent> = {
  particuliers: {
    eyebrow: particuliers.eyebrow,
    tagline: 'Un seul interlocuteur, un devis détaillé, un chantier suivi jusqu’à la livraison.',
    cta: { label: 'Découvrir l’espace Particuliers', href: '/particuliers/' },
    metiers: metiersFor('particuliers'),
  },
  professionnels: {
    eyebrow: professionnels.eyebrow,
    tagline: 'Un interlocuteur unique, des plannings tenus, une exploitation préservée.',
    cta: { label: 'Découvrir l’espace Professionnels', href: '/professionnels/' },
    metiers: metiersFor('professionnels'),
  },
};

export const navigation = {
  links,
  menus,
  cta: { label: 'Devis gratuit', href: '/#contact' },
} as const;
