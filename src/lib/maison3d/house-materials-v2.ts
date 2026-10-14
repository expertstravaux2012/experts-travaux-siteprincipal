// Matériaux de la maquette 3D v2 : couleurs « réelles » révélées au survol d'un métier.
// Exception assumée aux tokens du design system (la maison reste grisée au repos, cf. DESIGN.md).
export const MATERIAL_COLORS = {
  tuile: '#c4623a',
  brique: '#b25331',
  enduit: '#e2aa5e',
  platre: '#f2e8d3',
  peinture_orange: '#d8743d',
  bois_charpente: '#dcb56c',
  parquet: '#c08a50',
  laine: '#e9cf5f',
  beton: '#bab6ad',
  menuiserie: '#e9e5da',
  vitrage: '#667f8a',
  volet: '#4d5458',
  volet_fonce: '#3c4246',
  metal: '#aab0b4',
  carrelage: '#cac9c3',
  faience: '#b9bab6',
  verre: '#d6e9ee',
  meuble: '#eee1c2',
  plan_travail: '#c58f57',
  electromenager: '#2e3032',
  tube_chaud: '#d0443a',
  tube_froid: '#3f77c8',
  pvc: '#5a5e61',
  gaine_elec: '#4f9a54',
  tableau: '#f3f1eb',
  blanc: '#f6f4ef',
  sombre: '#2b2d2f',
  terre: '#9b7552',
  herbe: '#84a85c',
  pierre: '#bcae95',
  pierre_sombre: '#9e917a',
  mortier: '#d9cfbd',
  pare_pluie: '#8e99a0',
  zinc: '#9ea3a6',
  canape: '#7f8f93',
  tapis: '#b9a58a',
  spot: '#fff3c4',
  etancheite: '#4a4e52',
} as const;

export type MaterialKey = keyof typeof MATERIAL_COLORS;

/** Matériaux translucides : l'opacité reste constante, seule la teinte passe du gris à la couleur. */
export const GLASS_OPACITY: Partial<Record<MaterialKey, number>> = { verre: 0.28 };
