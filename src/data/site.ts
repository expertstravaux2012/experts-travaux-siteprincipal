export const site = {
  name: 'Experts Travaux',
  logo: {
    full: '/assets/rebranding/logo.svg',
    mark: '/assets/rebranding/logo_nu.svg',
  },
  email: 'contact@experts-travaux.fr',
  phone: {
    display: '09 83 61 05 66',
    href: 'tel:+33983610566',
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
