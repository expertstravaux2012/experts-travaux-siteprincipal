// Best-of portfolio affiché sur la home. Sélection provisoire — l'agent seo-perf
// repassera ces images en src/assets + composant Image optimisé.

export interface Realisation {
  image: string;
  alt: string;
  categorie: string;
}

export const realisations: Realisation[] = [
  { image: '/assets/portfolio/real-1.jpg', categorie: 'Cuisine', alt: 'Cuisine rénovée par Experts Travaux à Toulouse' },
  { image: '/assets/portfolio/real-2.jpg', categorie: 'Salle de bain', alt: 'Salle de bain rénovée par Experts Travaux' },
  { image: '/assets/portfolio/real-3.jpg', categorie: 'Escalier', alt: 'Escalier sur mesure réalisé par Experts Travaux' },
  { image: '/assets/portfolio/real-4.jpg', categorie: 'Façade', alt: 'Ravalement de façade par Experts Travaux' },
  { image: '/assets/portfolio/real-5.jpg', categorie: 'Surélévation', alt: 'Surélévation de maison par Experts Travaux' },
  { image: '/assets/portfolio/real-6.jpg', categorie: 'Agencement', alt: 'Agencement intérieur par Experts Travaux' },
];
