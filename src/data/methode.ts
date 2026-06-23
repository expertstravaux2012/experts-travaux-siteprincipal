// Section Méthode — rassurer : devis, délais, garanties, RGE.
// Contenu provisoire — rédaction définitive à venir (agent content-fr).

export interface Etape {
  numero: string;
  titre: string;
  description: string;
}

export const etapes: Etape[] = [
  { numero: '01', titre: 'Échange & visite', description: "On comprend votre projet sur place, gratuitement, et on évalue la faisabilité technique." },
  { numero: '02', titre: 'Devis détaillé', description: "Un chiffrage clair, ligne par ligne, sans surprise ni coût caché. Validé avant tout démarrage." },
  { numero: '03', titre: 'Chantier piloté', description: "Un planning tenu, un interlocuteur unique, un chantier propre et sécurisé du début à la fin." },
  { numero: '04', titre: 'Livraison & garanties', description: "Réception avec vous, levée des réserves, et garanties activées dès la remise des clés." },
];

export interface Garantie {
  titre: string;
  description: string;
}

export const garanties: Garantie[] = [
  { titre: 'Devis gratuit', description: 'Étude et chiffrage sans engagement.' },
  { titre: 'Délais tenus', description: 'Planning contractuel respecté.' },
  { titre: 'Décennale', description: 'Assurance et garanties légales sur tous nos ouvrages.' },
  { titre: 'Artisans RGE', description: 'Travaux éligibles aux aides à la rénovation énergétique.' },
];
