export const site = {
  name: 'Experts Travaux',
  /** Domaine de production (sans slash final). À CONFIRMER : déduit de l'email. */
  url: 'https://experts-travaux.fr',
  /**
   * Interrupteur unique d'indexation. false = noindex, nofollow sur toutes les pages,
   * robots.txt en `Disallow: /`, sitemap non référencé. Passer à true au lancement.
   */
  indexable: false,
  /**
   * Gestionnaire de cookies. enabled = false : le bandeau ne s'affiche pas (aucun traceur à consentir).
   * Passer à true au branchement d'un outil de mesure d'audience (via onConsent, src/lib/consent.ts).
   * Le bouton « Gérer mes cookies » du footer reste actif dans tous les cas.
   */
  consent: { enabled: false },
  /** Zone d'intervention : Toulouse + rayon en km (valeur du brief client, à confirmer). */
  areaServed: { city: 'Toulouse', radiusKm: 100 },
  /** Image Open Graph par défaut (1200×630, tirée du visuel Hero maison-toulousaine). */
  ogImage: {
    src: '/assets/og-default.jpg',
    width: 1200,
    height: 630,
    alt: 'Maison de maître en brique rose rénovée avec extension cubique noire vitrée, Toulouse',
  },
  logo: {
    mark: '/assets/rebranding/logo-mark.png',
    markDark: '/assets/rebranding/logo-mark-dark.png',
    /** Variantes 144 px WebP servies dans l'en-tête (le PNG 192 px reste la référence JSON-LD). */
    markWebp: '/assets/rebranding/logo-mark.webp',
    markDarkWebp: '/assets/rebranding/logo-mark-dark.webp',
  },
  description:
    'Rénovation & bâtiment à Toulouse. Un seul interlocuteur, du devis à la remise des clés.',
  legalLine: 'Rénovation & Bâtiment · Toulouse',
  /** Année de fondation (affichée discrètement dans le logo d'en-tête). */
  foundedYear: 2012,
  labels: {
    since: 'Depuis',
    trade: 'Neuf & rénovation',
    skipToContent: 'Aller au contenu',
    homeAria: 'Experts Travaux — accueil',
    mainNav: 'Navigation principale',
    mobileNav: 'Navigation principale mobile',
    menu: 'Menu',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    submenuToggle: 'afficher les métiers',
    metiersMenu: 'Nos métiers',
    contactTitle: 'Nous contacter',
    footerNav: 'Plan du site',
    footerNavTitle: 'Navigation',
    footerContactTitle: 'Contact',
  },
  email: 'contact@experts-travaux.fr',
  phone: {
    display: '05 82 95 14 32',
    href: 'tel:+33582951432',
  },
  address: {
    street: '31 Rue du Rempart Matabiau',
    city: '31000 Toulouse',
    mapsUrl:
      'https://www.google.com/maps/search/?api=1&query=31+Rue+du+Rempart+Matabiau+31000+Toulouse',
  },
  socials: [
    {
      name: 'LinkedIn',
      icon: 'linkedin',
      url: 'https://www.linkedin.com/company/experts-travaux/about/',
    },
    {
      name: 'Instagram',
      icon: 'instagram',
      url: 'https://www.instagram.com/expertstravaux/',
    },
  ],
} as const;
