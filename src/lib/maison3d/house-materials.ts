// Palette de matériaux de la maquette 3D : couleurs « réelles » révélées au survol d'un métier.
// Exception assumée aux tokens du design system (la maison reste grisée au repos, cf. DESIGN.md).
export const MATERIAL_COLORS = {
  tuile: '#c4643a',
  tuileFonce: '#9e4a2a',
  tuilePatine: '#d8a070',
  cuivre: '#b87333',
  zinc: '#9aa0a6',
  brique: '#b4593a',
  enduit: '#e2b36e',
  pierre: '#b3a590',
  beton: '#b9b6b1',
  bois: '#c8934f',
  boisClair: '#d8b47a',
  isolant: '#ecc84f',
  volet: '#4b4f55',
  cadre: '#34383d',
  verre: '#b9d4e4',
  carrelage: '#cfd4d8',
  meuble: '#e7dcb9',
  blanc: '#eceef0',
  metal: '#767b80',
  rouge: '#d23f36',
  bleu: '#3f6fd2',
  vert: '#3d9b5c',
} as const;

export type MaterialKey = keyof typeof MATERIAL_COLORS;

/** Matériau par défaut de chaque corps de métier (id = corps-metier.ts). */
export const DEFAULT_TONE: Record<string, MaterialKey> = {
  toiture: 'tuile',
  charpente: 'bois',
  isolation: 'isolant',
  facade: 'enduit',
  menuiseries: 'cadre',
  maconnerie: 'beton',
  extension: 'enduit',
  'salle-de-bain': 'carrelage',
  cuisine: 'meuble',
  electricite: 'vert',
  chauffage: 'rouge',
  finitions: 'boisClair',
};
