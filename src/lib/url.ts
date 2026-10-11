import { site } from '../data/site';

/** URL absolue de production, avec slash final (cohérent avec build.format "directory"). */
export const absoluteUrl = (path = '/'): string => {
  const clean = path.startsWith('/') ? path : `/${path}`;
  const hasFile = /\.[a-z0-9]+$/i.test(clean);
  return `${site.url}${hasFile || clean.endsWith('/') ? clean : `${clean}/`}`;
};

/** Variante 960 px d'une image `.webp` (convention de nommage `-960.webp`). */
export const smallVariant = (src: string): string => src.replace(/\.webp$/, '-960.webp');

/** `srcset` 960w / 1920w pour une image `.webp` du dossier assets. */
export const responsiveSrcset = (src: string): string => `${smallVariant(src)} 960w, ${src} 1920w`;

export const metierPath = (slug: string): string => `/metiers/${slug}/`;
