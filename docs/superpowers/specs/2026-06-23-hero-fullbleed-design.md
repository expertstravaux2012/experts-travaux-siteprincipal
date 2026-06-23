# Hero full-bleed — Design

Date : 2026-06-23
Statut : validé (design), implémentation à venir

## Objectif

Transformer le Hero (actuellement split texte/photo sur fond clair) en un hero
**full-bleed percutant** : photo plein cadre en fond, dégradé sombre + léger flou,
contenu centré en blanc, header transparent qui se solidifie au scroll.

## Décisions validées

| Sujet | Choix |
|-------|-------|
| Composition | Header transparent sur le hero → devient blanc opaque au scroll |
| Contenu | Centré horizontalement, hero plein écran (100vh) |
| Logo (header transparent) | Blanchi en CSS (`brightness(0) invert(1)`), revient à l'original au scroll |

## Périmètre

Trois fichiers touchés, aucune régression ailleurs.

### 1. `components/layout/Header.astro` — prop `overHero`

- Nouveau prop booléen `overHero` (défaut `false`).
- Sur la home : `<Header overHero />`. Les autres pages (futures pages services)
  utilisent `<Header />` → comportement blanc actuel **inchangé**.
- Quand `overHero` :
  - Positionnement **`fixed`** (au lieu de `sticky`) pour que la photo passe sous le header
    et que le hero démarre à `y=0`.
  - **État initial** : fond transparent, liens nav + CTA en blanc, logo blanchi
    (filtre CSS). Le séparateur bas est masqué.
  - **État `.is-solid`** (ajouté par script au scroll > ~60px) : fond
    `surface-container-lowest`, bordure basse `outline-variant`, nav + logo à
    l'original. Transition `transition-colors`.
- Script : écoute `scroll`, bascule la classe `.is-solid` selon `window.scrollY`.
  Idempotent, passif (`{ passive: true }`).
- Drawer mobile : déjà opaque (`bg-surface-container-lowest`), aucun changement.

### 2. `components/sections/Hero.astro` — restructuration

- Conteneur : `relative min-h-screen flex items-center justify-center overflow-hidden`.
- **Image de fond** : `<img>` `absolute inset-0 h-full w-full object-cover`,
  **léger flou** `blur-[2px]` + `scale-105` (masque les bords du flou),
  `fetchpriority="high"`, `decoding="async"`. Source : `hero.image` (`home.ts`).
- **Scrim/dégradé** : calque `absolute inset-0`, dégradé sombre
  `bg-gradient-to-b from-black/75 via-black/45 to-black/65`. Assombrit le haut
  (lisibilité du header transparent) et le bas, garantit le contraste AA du texte blanc
  même si une photo claire est mise plus tard.
- **Contenu** centré, `relative z-10`, texte blanc :
  - eyebrow : carré ochre (`bg-tertiary`) + label majuscules blanc ;
  - `h1` Montserrat blanc (mêmes tailles responsive qu'aujourd'hui) ;
  - sous-titre `text-white/85` ;
  - CTA primaire `accent` (ochre, inchangé) + CTA `secondary-light` (voir §3).
- Toutes les chaînes restent dans `home.ts` (aucun texte en dur).

### 3. `components/ui/Button.astro` — variante `secondary-light`

- Le `secondary` actuel (bordure/texte `primary` noirs) est invisible sur photo sombre.
- Ajout de la variante `secondary-light` :
  `border-2 border-on-primary text-on-primary hover:bg-on-primary hover:text-primary`.
- L'accent ochre reste inchangé (contraste suffisant sur fond sombre).

## Contraintes design system (DESIGN.md)

- Angles 0px conservés (le `border-radius:0` global s'applique).
- Pas d'ombres : la profondeur vient du scrim et du contraste, pas de `shadow`.
- Couleurs via tokens : `tertiary` (ochre), `on-primary`/`primary`. Le blanc du texte
  hero et les opacités noires du scrim sont les seuls réglages visuels assumés
  (calque décoratif, hors tokens — justifié pour un overlay photo).

## Accessibilité

- Contraste : scrim sombre → texte blanc ≥ AA garanti.
- `prefers-reduced-motion` : la solidification est un simple changement de couleur,
  pas d'animation gênante ; rien à neutraliser.
- Focus clavier : règle `:focus-visible` globale conservée.
- L'image porte un `alt` descriptif (déjà présent dans `home.ts`).

## Hors périmètre

- Remplacement de la photo (Hery la fournira plus tard via `hero.image`).
- Toute autre section reste inchangée.
