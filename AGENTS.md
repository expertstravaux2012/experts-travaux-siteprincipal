# Experts Travaux — Site vitrine

Site vitrine pour **Experts Travaux**, entreprise de rénovation et bâtiment positionnée premium ("autorité architecturale"). Stack : **Astro 7 + Tailwind v4**. Source de vérité design : `DESIGN.md`.

## Principes de travail (non négociables)

- **SOLID & DRY** avant tout. Un composant = une responsabilité. Tout élément répété 2+ fois devient un composant `ui/` réutilisable.
- **Contenu séparé du markup** : tous les textes/données vivent dans `src/data/`, jamais codés en dur dans les composants.
- **Aucune valeur de style magique** : couleurs, tailles, espacements viennent exclusivement des tokens du design system. Pas de hex/px en dur.
- **Incrémental** : on avance par étapes validées. On ne dévie pas de l'architecture figée ci-dessous sans validation explicite de Hery.

## Retours client (2026-10-11) — sources de vérité

- `DESIGN.md` : design system **client** (Newsreader / Hanken Grotesk / JetBrains Mono, palette monochrome pierre, sans ochre) + section « Intégration projet ».
- `docs/cahier-des-charges-seo.md` : stratégie SEO / arborescence `/`, `/particuliers/`, `/professionnels/`.
- `docs/brief-client-ugo.md` : brief initial (mots-clés, zone Toulouse + 50 km au brief, étendue à 100 km depuis, objectif 30–50 appels/mois).
- Logo définitif : `../feedback/logo_expert.jpeg` (pictogramme cube, sans wordmark) — à vectoriser avant intégration.

## Architecture

État actuel (2026-10-11, implémenté) :

```
src/
  styles/global.css        tokens Tailwind v4 (@theme) issus de DESIGN.md
  data/                    site, navigation, home, particuliers, professionnels, corps-metier, seo, pages, methode, realisations
  lib/                     url (absoluteUrl, metierPath), jsonld, faq-jsonld
  components/
    ui/                    Button, Icon, Logo, SectionHeading, Section, Card, Chip, SquareList, Breadcrumb, RichParagraph
    layout/                Header, Footer
    sections/              Hero, Presentation, MaisonInteractiveHybride, Realisations, Methode, APropos, Contact
    sections/page/         PageIntro, PrestationsGrid, ActionPanel(s), AvantApres, Secteurs, Argumentaire, Faq, CtaBand, MetierContent
  layouts/Layout.astro     head, polices @fontsource, SEO (canonical, OG, JSON-LD), <slot/>
  pages/                   index, particuliers/, professionnels/, metiers/[slug], maintenance, robots.txt.ts
```

Mise en ligne : `indexable: false` dans `src/data/site.ts` (noindex + robots Disallow). Passer à `true` au lancement après confirmation du domaine (`site.url`) et du rayon « 100 km » (étendu depuis le brief). Écart assumé : H1 du Hero en `headline-lg` (96 caractères). `sections/MaisonInteractive.astro` = legacy volontairement conservé, non importé.

Images réelles du portfolio dans `../assets/` (15 catégories, ~90 photos) — à utiliser via le composant Image d'Astro (AVIF/WebP).

## Design system (résumé — détails dans DESIGN.md)

- **Couleurs** par token : `primary` #000, `on-primary` #fff, surfaces `surface*` / `surface-container-*`, `tertiary` = pierre `#80777C` (annotations, jamais texte de corps : < AA). **Plus d'ochre.**
- **Typo** : Newsreader (titres `display-*`/`headline-lg|md`, graisse 400), Hanken Grotesk (`headline-sm`, `title-md`, `body-*`), JetBrains Mono (`label-*`, MAJUSCULES, espacement positif).
- **Espacement** : base 4px composants, sections en `space-xl`+ (≤ 8rem). Marges 1.5rem mobile / 2rem tablette / 4rem desktop ; gutters 1 / 1.5 / 2.5rem ; container 1280px.
- **Formes** : angles **0px** partout (sauf icônes sociales rondes). Pas d'ombre sauf panneau flottant (ombre ambiante + hairline). Profondeur = couches tonales + hairlines 1px.
- **Contraste** : viser 7:1 corps de texte, minimum AA partout.
- **Logos** : `ui/Logo.astro` (pictogramme cube `mark`/`markDark` + nom en Anton, `font-wordmark`) ; pas de plaque logo (cf. DESIGN.md § Logos).

## SEO (cahier client)

- Un seul `<h1>` par page ; H1 home : proposition de valeur globale Particuliers + Professionnels.
- Home : sous-titre ≤ 2 lignes, CTA « Espace Particuliers » / « Espace Professionnels », bloc texte 300–400 mots sous le fold avec liens internes vers les deux silos.
- Silos : `/particuliers/` (rénovation maison, aménagement combles…) et `/professionnels/` (contractant général, locaux commerciaux, bureaux, ERP) — pas de cannibalisation de mots-clés.
- JSON-LD `GeneralContractor`/`LocalBusiness`, Lighthouse 90+, ancres de maillage optimisées.
- `robots` reste `noindex` par défaut jusqu'à décision de mise en ligne.

## Sous-agents (.claude/agents/)

- **design-system** — porte DESIGN.md en tokens Tailwind, garde la charte (palette, typo, 4px, 0px).
- **astro-builder** — crée les composants .astro atomiques et les pages (SOLID/DRY).
- **content-fr** — copywriting français BTP/rénovation B2C/B2B, centralisé dans src/data/.
- **seo-perf** — meta, JSON-LD, arborescence/maillage, optimisation images, Lighthouse.
- **qa-review** — vérification finale : build, contraste AA/AAA, responsive, conformité DESIGN.md + cahier SEO.

Termine toute tâche non triviale par une passe **qa-review**.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
