// Cœur SEO + orientation. `slug` = future page dédiée (/extension, /renovation-complete…).
// Contenu provisoire — rédaction définitive à venir (agent content-fr).

export interface Expertise {
  slug: string;
  title: string;
  accroche: string;
  image: string;
  alt: string;
}

export const expertises: Expertise[] = [
  {
    slug: 'extension-surelevation',
    title: 'Extension & surélévation',
    accroche: "Gagnez des m² sans déménager : extension de plain-pied ou surélévation, étudiées avec votre voisinage et le PLU de Toulouse.",
    image: '/assets/portfolio/exp-extension.jpg',
    alt: 'Surélévation de maison réalisée par Experts Travaux à Toulouse',
  },
  {
    slug: 'renovation-complete',
    title: 'Rénovation complète',
    accroche: "Rénovation clé en main, du gros œuvre aux finitions. Un seul interlocuteur, un planning maîtrisé, un résultat livré prêt à vivre.",
    image: '/assets/portfolio/exp-renovation.jpg',
    alt: 'Rénovation complète de maison à Toulouse par Experts Travaux',
  },
  {
    slug: 'cuisine',
    title: 'Cuisine sur mesure',
    accroche: "Conception, plomberie, électricité et pose : votre cuisine pensée pour durer, du plan 3D à la mise en service.",
    image: '/assets/portfolio/exp-cuisine.jpg',
    alt: 'Cuisine sur mesure rénovée par Experts Travaux',
  },
  {
    slug: 'salle-de-bain',
    title: 'Salle de bain',
    accroche: "Salles de bain et douches à l'italienne étanchéifiées dans les règles, carrelage et meubles posés au millimètre.",
    image: '/assets/portfolio/exp-sdb.jpg',
    alt: 'Salle de bain rénovée par Experts Travaux',
  },
  {
    slug: 'facade-ravalement',
    title: 'Façade & ravalement',
    accroche: "Ravalement, enduit et isolation thermique par l'extérieur pour protéger et valoriser votre bien.",
    image: '/assets/portfolio/exp-facade.jpg',
    alt: 'Ravalement de façade réalisé par Experts Travaux',
  },
  {
    slug: 'charpente-toiture',
    title: 'Charpente & toiture',
    accroche: "Charpente traditionnelle, couverture et zinguerie : la structure de votre maison entre des mains expertes.",
    image: '/assets/portfolio/exp-charpente.jpg',
    alt: 'Charpente traditionnelle réalisée par Experts Travaux',
  },
];
