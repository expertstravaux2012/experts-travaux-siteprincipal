---
name: Atelier Structural & Renovation
colors:
  surface: '#faf9f9'
  surface-dim: '#dadada'
  surface-bright: '#faf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e8'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4547'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f0f0'
  outline: '#7e7577'
  outline-variant: '#cfc4c6'
  surface-tint: '#605e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#868383'
  inverse-primary: '#cac5c5'
  secondary: '#615e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e7e1e1'
  on-secondary-container: '#676464'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#201a1e'
  on-tertiary-container: '#8b8186'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e6e1e1'
  primary-fixed-dim: '#cac5c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#484646'
  secondary-fixed: '#e7e1e1'
  secondary-fixed-dim: '#cac5c5'
  on-secondary-fixed: '#1d1b1b'
  on-secondary-fixed-variant: '#494646'
  tertiary-fixed: '#ebdfe5'
  tertiary-fixed-dim: '#cfc3c9'
  on-tertiary-fixed: '#201a1e'
  on-tertiary-fixed-variant: '#4c4549'
  background: '#faf9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e3e2e2'
typography:
  display-xl:
    fontFamily: Newsreader
    fontSize: 72px
    fontWeight: '400'
    lineHeight: 80px
    letterSpacing: -0.02em
  display-xl-mobile:
    fontFamily: Newsreader
    fontSize: 44px
    fontWeight: '400'
    lineHeight: 52px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '400'
    lineHeight: 56px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-md:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 22px
    fontWeight: '500'
    lineHeight: 30px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Hanken Grotesk
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.06em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.08em
spacing:
  gutter: 1.5rem
  gutter-desktop: 2.5rem
  margin: 1.5rem
  margin-desktop: 4rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 2rem
  space-xl: 4rem
---

## Brand & Style

This design system expresses the discipline of high-end architectural renovation, historic restructuring, and modern spatial engineering rooted in Toulouse. It caters to discerning property owners, heritage conservators, and commercial investors who demand structural perfection, material honesty, and refined taste.

The aesthetic philosophy is an exacting blend of **Minimalist Luxury** and **Architectural Precision**:
- **Monastic Clarity:** Generous white space, deliberate voids, and strict adherence to geometric rhythm reflect master masonry and structural blueprints.
- **Tonal Materiality:** The interface is anchored by basalt, dark slate, and warm limestone grays, translating physical building materials—such as raw steel, dressed stone, and polished screed—into digital form.
- **Curated Tension:** Crisp hairline dividers, balanced proportions, and monumental display typography evoke an editorial gallery standard rather than a standard commercial builder.

## Colors

The palette is derived directly from the architectural slate, granite, and warm limestone masonry of luxury French renovations. The default canvas operates in a light mode defined by off-white foundations (`#FBFBFB` and `#EBEAEA`) punctuated by deep obsidian and dark slate structures.

### Hierarchy & Functional Roles
- **Primary (`#191818`):** Deep charcoal obsidian. Used for primary headlines, focal interactive elements, structural borders, and prominent architectural glyphs.
- **Secondary (`#5D5A5A`):** Mid-tone slate. Governs secondary supporting titles, active technical tags, and structural metadata.
- **Tertiary (`#80777C`):** Muted stone with subtle mineral warmth. Employed for non-intrusive annotations, blueprint coordinates, and tertiary interactive indicators.
- **Neutral Surface Tier:**
  - Base Background: `#FAFAF9` (Pure limestone canvas)
  - Surface Raised / Card Interior: `#FFFFFF`
  - Subtle Surface Alt: `#EBEAEA` (Soft ash for section alternation and hover states)
  - Subtle Border Line: `#C5C3C3` and `#393737` (for dark mode or high-contrast structural accents)
- **Text Contrast:** Body copy uses `#191818` at full optical strength or `#393737` for long-form editorial paragraphs to prevent eye fatigue while preserving absolute legibility.

## Typography

The typographical framework strikes a balance between editorial distinction and technical rigor:
- **Headings (Newsreader):** Brings the intellectual authority, history, and elegance of classic French publishing and architectural monographs. High-display headlines are set with negative tracking to convey density and gravity.
- **Body & Interfaces (Hanken Grotesk):** A clean, unembellished grotesque with exceptional geometry that handles project details, narratives, and technical specifications with effortless clarity.
- **Technical Annotations (JetBrains Mono):** Provides drafting-room precision for plan tags, engineering dimensions, material codes, and architectural phase labels. Always rendered in uppercase with positive letter spacing.

## Layout & Spacing

Layouts adhere to an architectural modular grid reminiscent of drafting vellum and structural grids.

### The Grid Framework
- **Desktop (1200px+):** 12-column fluid grid framed with `4rem` outer canvas padding and `2.5rem` gutters. Editorial hero arrangements favor asymmetric column spans (e.g., 5-column narrative paired with a 7-column media span).
- **Tablet (768px – 1199px):** 8-column grid with `2rem` margins and `1.5rem` gutters.
- **Mobile (< 768px):** 4-column layout with `1.5rem` margins and `1rem` gutters. Structural elevations condense into single-column vertical sequences.

### Spacing Rhythm
Vertical spacing relies on monumental pauses. Major architectural sections breathe with large rhythm breaks (`space-xl` and extended multiples up to `8rem`), allowing architectural photographs and 3D wireframes to command spatial dignity. Component padding uses exact multiples of the 4px baseline.

## Elevation & Depth

In alignment with minimalist architecture and physical construction drafts, visual hierarchy avoids faux drop shadows or artificial blur. Depth is established through **tonal planes** and **low-contrast architectural outlines**:

- **Hairline Framing:** Surface containers are bound by crisp 1px borders (`#C5C3C3` against bright surfaces, or `#393737` in inverse treatments).
- **Tonal Layering:** Depth is communicated by nesting surfaces. A secondary card sits as `#FFFFFF` on an `#EBEAEA` or `#FAFAF9` field, defined by razor-sharp geometry rather than blur radius.
- **Axonometric Overlay:** For interactive diagrams, cutaways, and modal overlays, elevation uses semi-translucent slate washes (`rgba(25, 24, 24, 0.6)`) layered with fine white vector coordinates.
- **Zero Heavy Shadows:** If a floating toolbar or inspector panel requires lift, it uses an ambient, almost imperceptible shadow (`0 10px 30px -10px rgba(25, 24, 24, 0.05)`) paired with a mandatory hairline border.

## Shapes

The design system enforces a strictly **Sharp (Level 0)** shape geometry. 

- **Right Angles (0px Radius):** Buttons, inspection panels, image frames, dialogs, and tags all maintain strict 90-degree corners. This evokes stone blocks, structural I-beams, floor-plan sections, and cutaway reveals.
- **Geometry & Dividers:** Visual rhythm is articulated through thin horizontal and vertical intersection lines that bleed to grid edges, mimicking drafting guidelines and floor-to-ceiling lines.

## Components

### Buttons
- **Primary:** Obsidian background (`#191818`), crisp off-white text (`#EBEAEA`), 0px border radius, 1px matching border. Generous horizontal padding (`space-lg`), compact vertical padding (`space-md`). Hover state transitions smoothly to `#393737`.
- **Secondary (Architectural Frame):** Transparent background, 1px border in `#191818`, dark charcoal text. Hover inverts the button to solid `#191818` with `#FFFFFF` text.
- **Ghost / Text Action:** JetBrains Mono uppercase text with an animated 1px underline that expands outward from origin on hover.

### Cards & Modules
- **Project & Service Cards:** Framed with a 1px border (`#C5C3C3`). High-contrast typography, strict grid alignment, and image containers displaying architectural work. Hover states do not lift cards; instead, they trigger a subtle border transition to `#191818` and a slow cross-fade or metadata reveal.

### Form Elements & Inputs
- **Text Inputs:** Sharp-edged rectangular fields with transparent or `#FFFFFF` backgrounds, bound by a 1px border (`#C5C3C3`). On focus, the border transitions directly to `#191818` with zero outer ring glow. Floating labels utilize JetBrains Mono (`label-sm`).
- **Checkboxes & Radios:** Sharp, custom square selectors with 1px border outlines. Selected state fills the square with solid `#191818` containing a precise geometric glyph.

### Status Indicators & Chips
- **Chips:** Monospaced label text framed within a rectangular hairline pill-alternative. Background in `#EBEAEA` or transparent, text in `#393737`. Used for phase markers (e.g., `[PHASE 01: DEMOLITION]`, `[STRUCTURAL CONCRETE]`).

### Interactive 3D Cutaway Building Viewer
- **Discipline Layers:** Floating structural inspector docks pinned to the canvas using hairline rules. Users toggle architectural trades (HVAC, load-bearing masonry, timber joinery, luxury finishings) through monospaced controls. Active sections highlight the 3D model with slate and obsidian cross-hatching, paired with drafting coordinates (`x`, `y`, `z` elevation benchmarks).
---

# Intégration projet — Experts Travaux

> Section ajoutée par l'équipe projet (2026-10-11). Tout ce qui précède est le `DESIGN.md` livré par le client (feedback/DESIGN.md), repris sans modification.

## Règles de résolution des écarts internes du fichier client

Le fichier client est incohérent entre son frontmatter et sa prose. Règle appliquée jusqu'à arbitrage :

| Sujet | Frontmatter | Prose | Décision provisoire |
|-------|-------------|-------|---------------------|
| Primary | `#000000` | `#191818` | Token `primary` = frontmatter (`#000000`). `#191818` = token `obsidian` (boutons, bordures actives) |
| Tertiary | `#000000` | `#80777C` (pierre minérale) | Token `tertiary` = `#80777C` (la prose décrit un rôle distinct de primary ; `#000000` est un artefact d'export) |
| Fond | `#faf9f9` | `#FAFAF9` / `#FBFBFB` | `background` = frontmatter `#faf9f9` |
| Hairlines | `outline-variant` `#cfc4c6` | `#C5C3C3`, `#393737` | `#C5C3C3` → token `hairline`, `#393737` → token `hairline-inverse` / texte long-form |
| Container max | absent | grille 12 col dès 1200px | `container-max` 1280px conservé (existant) |

Contraste : `tertiary` `#80777C` sur `#faf9f9` ≈ 4.1:1 → **sous AA pour du texte courant**. Réservé aux annotations ≥ 18px/14px gras, filets, marqueurs graphiques (3:1). Jamais en texte de corps.

## Changements vs version précédente (juin 2026)

- **Ochre supprimé** : plus d'accent orange. Le CTA principal est obsidian plein ; plus de variante `accent`. Le focus clavier reste un outline `on-surface` 2px.
- **Typo** : Montserrat/Inter → **Newsreader** (titres, graisse 400), **Hanken Grotesk** (corps/UI), **JetBrains Mono** (labels, uppercase, espacement positif). Les titres ne sont plus en gras 700/800.
- **Grille** : base 4px (composants) ; sections en multiples de `space-xl` (jusqu'à 8rem). Marges mobile 1.5rem (et non 16px), tablette 2rem, desktop 4rem ; gutters 1rem / 1.5rem / 2.5rem.
- **Profondeur** : hairlines 1px, couches tonales. Ombre uniquement pour panneaux flottants (`0 10px 30px -10px rgba(25,24,24,.05)` + hairline). L'ancien `LogoPlate featured` (rounded-lg, ombre 40px, liseret ochre) est **supprimé**.
- **Interactions** : hover carte = bordure → `#191818`, pas de `hover-lift`.
- **Nouveau composant** : visionneuse « Interactive 3D Cutaway Building Viewer » — correspond à `MaisonInteractiveHybride` ; les contrôles passent en JetBrains Mono, les zones actives en hachures slate/obsidian (plus d'ochre).

## Logos

Logo définitif (octobre 2026) : pictogramme cube, **sans texte** ; le nom est composé en texte avec la police officielle du wordmark.

| Clé (`site.ts`) | Fichier | Usage |
|-----------------|---------|-------|
| `site.logo.mark` | `public/assets/rebranding/logo-mark.png` | Fonds clairs — 3 tons d'origine, PNG transparent 512px |
| `site.logo.markDark` | `public/assets/rebranding/logo-mark-dark.png` | Fonds sombres/photo — blanc sur transparent, dérivé de `logo_expert_dark_mode.png` (fond cuit retiré) |

- **Composant** `ui/Logo.astro` : pictogramme + nom. `variant` : `on-light` | `on-dark` | `adaptive` (Header sur hero : blanc → couleurs au scroll). Taille pilotée par la `font-size` du parent (unités em), couleur du nom = `currentColor`.
- **Wordmark** : police **Anton** (`font-wordmark`), MAJUSCULES, tracking large ; « EXPERTS » sur la 1ʳᵉ ligne, « TRAVAUX » en italique, atténué (opacité 70 %), aligné à droite. Seule police hors DESIGN.md client, réservée au nom de marque. Le nom vient de `site.name`.
- Le dark mode dérivé aplatit les 3 tons en blanc (volume lisible via les filets entre faces). Une variante 3 tons reste possible si le client la fournit.
- Pas de plaque logo : le pictogramme blanc se pose directement sur le scrim photo (`LogoPlate` supprimé).
- Favicon / apple-touch-icon régénérés (pictogramme couleurs sur fond blanc). Source vectorielle (SVG) toujours souhaitable.

## Header / Hero / Footer (cible)

- **Header** : barre `h-20`, pictogramme `h-12` sans cadre, navigation `label-md` (JetBrains Mono, uppercase), CTA `Devis gratuit` primaire. Liens vers `/particuliers/` et `/professionnels/`.
- **Hero** : H1 unique `display-xl` Newsreader (`display-xl-mobile` < 768px), sous-titre 2 lignes max `body-lg`, double CTA **« Espace Particuliers »** (primaire) / **« Espace Professionnels »** (secondaire cadre). Composition éditoriale asymétrique 5/7 colonnes autorisée. Voir `docs/cahier-des-charges-seo.md` §3.
- **Footer** : `inverse-surface` / `inverse-on-surface`, hairline `#393737`, 3 colonnes (marque, navigation, contact), icônes sociales rondes (seule exception 0px), barre légale.
