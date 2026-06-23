# Experts Travaux — Site vitrine

Site vitrine pour **Experts Travaux**, entreprise de rénovation et bâtiment positionnée premium ("autorité architecturale"). Stack : **Astro 7 + Tailwind v4**. Source de vérité design : `DESIGN.md`.

## Principes de travail (non négociables)

- **SOLID & DRY** avant tout. Un composant = une responsabilité. Tout élément répété 2+ fois devient un composant `ui/` réutilisable.
- **Contenu séparé du markup** : tous les textes/données vivent dans `src/data/`, jamais codés en dur dans les composants.
- **Aucune valeur de style magique** : couleurs, tailles, espacements viennent exclusivement des tokens du design system. Pas de hex/px en dur.
- **Incrémental** : on avance par étapes validées. On ne dévie pas de l'architecture figée ci-dessous sans validation explicite de Hery.

## Architecture figée

```
src/
  styles/global.css        tokens Tailwind v4 (@theme) issus de DESIGN.md
  data/                    site.ts (contact + logos), navigation.ts, expertises.ts, projets.ts, temoignages.ts
  components/
    ui/                    Button.astro, Icon.astro, Card.astro
    layout/                Header.astro, Footer.astro
    sections/              Hero, Expertises, Pourquoi, Realisations, Temoignages
  layouts/Layout.astro     head, fonts, SEO, <slot/>
  pages/index.astro        assemble les sections
```

Images réelles du portfolio dans `../assets/` (15 catégories, ~90 photos) — à utiliser pour les Réalisations via le composant Image d'Astro.

## Design system (résumé — détails dans DESIGN.md)

- **Couleurs** par token : `primary` #000, `on-primary` #fff, accent ochre via famille `tertiary`, surfaces via `surface-container-*`.
- **Typo** : Montserrat (titres `headline-*`), Inter (corps `body-*`, labels). Labels/eyebrows en MAJUSCULES.
- **Espacement** : base 8px (multiples : 16/24/32/64). Gutter 24px, marge desktop 64px, mobile 16px, container 1280px.
- **Formes** : angles **0px** partout (sauf icônes sociales rondes). **Pas d'ombres** — profondeur par couches tonales + bordures 1px/2px.
- **Contraste** : viser 7:1 corps de texte, minimum AA partout.
- **Logos** : Header — pictogramme blanc (`invert`) sans cadre ; Hero — lockup dans `LogoPlate` ; Footer — pictogramme blanc sur fond sombre.

## Sous-agents (.claude/agents/)

- **design-system** — porte DESIGN.md en tokens Tailwind, garde la charte (couleurs, typo, 8px, 0px).
- **astro-builder** — crée les composants .astro atomiques (SOLID/DRY).
- **content-fr** — copywriting français BTP/rénovation, centralisé dans src/data/.
- **seo-perf** — meta, JSON-LD LocalBusiness, optimisation images, Lighthouse.
- **qa-review** — vérification finale : build, contraste AA/AAA, responsive, conformité maquette.

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
