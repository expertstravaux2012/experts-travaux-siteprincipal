# Pages légales et gestionnaire de cookies — design

Date : 2026-10-12 · Statut : validé (brainstorming), en attente de relecture du spec

## Objectif

Ajouter au site Astro statique :
1. une page **Mentions légales** (incluant l'information RGPD / confidentialité) ;
2. une page **CGU** (site vitrine, sans vente en ligne) ;
3. un **gestionnaire de cookies** (consentement) prêt à accueillir un outil de mesure d'audience.

## Contexte vérifié

- Site Astro 7 statique, Tailwind v4, aucune dépendance côté consentement.
- Aucun traceur, iframe ni domaine externe aujourd'hui (polices auto-hébergées, décision RGPD actée dans `docs/decisions-refonte.md`).
- Analytics prévu mais non branché (accès client non fourni).
- Un formulaire de contact collecte des données personnelles.
- Footer sans liens légaux. SIRET et autres données d'éditeur non fournis.

## Décisions validées

| # | Décision | Raison |
|---|---|---|
| 1 | Gestionnaire de cookies maison (composant Astro + module TS), pas de lib ni de CMP SaaS | 1 seule catégorie optionnelle ; 0 dépendance, 0 domaine externe |
| 2 | Données légales manquantes = placeholders `'À COMPLÉTER'` visibles | Règle du projet : non vérifié = non inventé |
| 3 | Bandeau masqué par défaut via `consent.enabled = false` dans `site.ts` | Inutile et dégradant tant qu'aucun traceur n'existe |
| 4 | Information RGPD en section des mentions légales, pas de 4e page | Périmètre demandé |

## Architecture

### Données
- `src/data/legal.ts` : éditeur (raison sociale, forme, capital, SIRET, RCS, TVA), directeur de publication, hébergeur, médiateur de la consommation. Reprend nom, adresse, email, téléphone depuis `site.ts`. Toute valeur absente = `'À COMPLÉTER'`.
- `src/data/cookies.ts` : catégories (`necessaires`, `mesure-audience`), libellés, durée de validité du choix (6 mois).
- `src/data/site.ts` : ajout de `consent: { enabled: false }`.

### Pages
- `src/pages/mentions-legales.astro` : éditeur, hébergeur, propriété intellectuelle, données personnelles (finalité, base légale, durée, droits, contact, CNIL), cookies (renvoi vers le panneau).
- `src/pages/cgu.astro` : objet, accès au site, propriété intellectuelle, responsabilité, liens externes, données personnelles, droit applicable.
- `src/components/layout/LegalPage.astro` : mise en page commune (titre, date de mise à jour, sommaire, prose).
- Rédaction des textes : agent `content-fr`. Pages incluses dans le sitemap, liées depuis le footer.

### Consentement
- `src/lib/consent.ts` : lecture/écriture du choix en `localStorage` (try/catch), expiration à 6 mois, événement `consent:change`, API `getConsent()`, `setConsent()`, `onConsent(category, cb)`.
- `src/components/layout/CookieConsent.astro` : bandeau (Tout accepter / Tout refuser, poids visuel égal / Personnaliser) et panneau de préférences en `<dialog>` (focus piégé, Échap, clavier). Monté dans `Layout.astro`.
- Footer : bouton « Gérer mes cookies » qui rouvre le panneau, actif même si le bandeau est masqué.
- Aucun script analytics livré. Branchement ultérieur : `onConsent('mesure-audience', load)`.

## Hors périmètre
- Choix et intégration de l'outil analytics.
- CGV, vente en ligne.
- Page de politique de confidentialité séparée.

## Vérification
- `astro build` sans erreur, pages générées.
- Bandeau absent si `consent.enabled = false`, présent sinon ; choix persistant au rechargement ; réouverture via le footer.
- Navigation clavier complète, contraste AA, rendu 375 / 768 / 1440 px.
- `qa-review` en fin de chantier ; `seo-perf` pour meta et sitemap.

## Points ouverts
- Valeurs réelles des mentions légales (éditeur, SIRET, hébergeur, etc.) à fournir par le client.
- Relecture juridique des textes recommandée avant mise en ligne (`indexable: true`).
