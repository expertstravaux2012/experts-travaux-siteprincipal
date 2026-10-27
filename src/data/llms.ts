// Contenu du fichier /llms.txt (résumé du site pour les agents IA), assemblé à partir des sources de vérité :
// site.ts (identité, contact), seo.ts (titres et descriptions), corps-metier.ts (pages métier).
// Servi uniquement si site.indexable = true (cf. src/pages/llms.txt.ts).

import type { LlmsDocument, LlmsLink } from '../lib/llms';
import { absoluteUrl, metierPath } from '../lib/url';
import { corpsMetier } from './corps-metier';
import { ctaContact } from './home';
import { seo, type PageSeo } from './seo';
import { site } from './site';

/** Libellé de lien = title SEO sans le suffixe de marque. */
const label = ({ title }: PageSeo): string => title.replace(/\s*\|\s*Experts Travaux$/, '');

const page = (path: string, pageSeo: PageSeo): LlmsLink => ({
  label: label(pageSeo),
  url: absoluteUrl(path),
  description: pageSeo.description,
});

const { city, radiusKm } = site.areaServed;

export const llmsDocument: LlmsDocument = {
  name: site.name,
  summary: site.description,
  details: [
    `Entreprise de rénovation et de bâtiment basée à ${city} depuis ${site.foundedYear}, intervenant dans un rayon de ${radiusKm} km, pour les particuliers et les professionnels. Un interlocuteur unique coordonne tous les corps de métier, du devis à la réception du chantier.`,
    `Contact : téléphone ${site.phone.display}, email ${site.email}, adresse ${site.address.street}, ${site.address.city}.`,
  ],
  sections: [
    {
      title: 'Présentation',
      links: [page('/', seo.home)],
    },
    {
      title: 'Particuliers',
      links: [
        page('/particuliers/', seo.particuliers),
        page('/particuliers/construction-neuve/', seo.constructionNeuve),
        page('/particuliers/piscine/', seo.piscine),
      ],
    },
    {
      title: 'Professionnels',
      links: [page('/professionnels/', seo.professionnels)],
    },
    {
      title: 'Métiers',
      links: corpsMetier
        .filter(({ slug }) => seo.metiers[slug])
        .map(({ slug }) => page(metierPath(slug), seo.metiers[slug])),
    },
    {
      title: 'Contact',
      links: [
        {
          label: ctaContact.label,
          // href = ancre '/#contact' : concaténée telle quelle (absoluteUrl ajouterait un slash final).
          url: `${site.url}${ctaContact.href}`,
          description: ctaContact.text,
        },
      ],
    },
    {
      title: 'Optional',
      links: [
        page('/mentions-legales/', seo.mentionsLegales),
        page('/cgu/', seo.cgu),
      ],
    },
  ],
};
