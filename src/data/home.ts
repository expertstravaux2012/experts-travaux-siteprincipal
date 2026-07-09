// Textes des sections éditoriales de la home (Hero, À propos).
// Contenu provisoire — rédaction définitive à venir (agent content-fr).

export const hero = {
  eyebrow: 'Rénovation & bâtiment · Toulouse',
  title: "Vos travaux, menés avec la précision d’un plan d’architecte.",
  subtitle:
    "Extension, rénovation complète, cuisine ou façade : un seul interlocuteur, un chantier maîtrisé, un résultat à la hauteur de vos exigences.",
  primaryCta: { label: 'Demander un devis', href: '#contact' },
  secondaryCta: { label: 'Voir nos réalisations', href: '#realisations' },
  slides: [
    {
      src: '/assets/maison-toulousaine.webp',
      alt: "Maison de maître en brique rose du XIXe rénovée avec extension cubique noire vitrée et jardin paysager éclairé, heure bleue, Toulouse",
      caption: 'La brique ancienne, réinventée',
    },
    {
      src: '/assets/bureaux-toulousains.webp',
      alt: 'Bâtiment tertiaire contemporain à façades vitrées double hauteur et bardage noir, parvis minéral éclairé, heure bleue, Toulouse',
      caption: "Quand l'architecture de bureau s'impose",
    },
    {
      src: '/assets/extension-maison-toulousaine.webp',
      alt: "Ancienne ferme en pierre et brique rose prolongée d'une extension cubique noire entièrement vitrée ouvrant sur le salon, jardin méditerranéen au crépuscule, Toulouse",
      caption: 'Bâti ancien, geste contemporain',
    },
    {
      src: '/assets/restaurant-toulousain.webp',
      alt: 'Intérieur de bar-restaurant intimiste avec comptoir en noyer, mur de briques rétroéclairé et suspensions cuivrées, Toulouse',
      caption: "Un lieu conçu pour l'expérience",
    },
    {
      src: '/assets/renovation-cuisine-toulousaine.webp',
      alt: 'Cuisine rénovée avec îlot en pierre et chêne, façades noires mates, poutres apparentes et grande fenêtre sur toits de tuiles au couchant, Toulouse',
      caption: 'Chaque détail, pensé pour durer',
    },
    {
      src: '/assets/amenagement-exterieur-toulouse.webp',
      alt: "Terrasse au crépuscule avec pergola bioclimatique noire à LED, salon d'extérieur en pierre et végétation éclairée avec vue sur la ville, Toulouse",
      caption: 'La terrasse devient pièce à vivre',
    },
  ],
};

export const apropos = {
  eyebrow: 'À propos',
  title: "Une équipe toulousaine, une exigence d’artisan.",
  paragraphs: [
    "Basés au cœur de Toulouse, nous accompagnons les particuliers et les professionnels de la métropole dans leurs projets de rénovation et de construction depuis plusieurs années.",
    "Notre force : une équipe pluridisciplinaire qui maîtrise l’ensemble des corps de métier, du gros œuvre aux finitions. Vous gardez un seul interlocuteur, de la première visite à la remise des clés.",
  ],
  stats: [
    { valeur: '15+', label: 'corps de métier' },
    { valeur: '100%', label: 'chantiers suivis' },
    { valeur: 'Toulouse', label: 'et sa métropole' },
  ],
};
