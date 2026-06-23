---
name: Experts-travaux-design
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f4'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#46474a'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f0f1f1'
  outline: '#76777b'
  outline-variant: '#c7c6ca'
  surface-tint: '#5f5e5f'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1c'
  on-primary-container: '#858384'
  inverse-primary: '#c8c6c7'
  secondary: '#52606d'
  on-secondary: '#ffffff'
  secondary-container: '#d3e1f1'
  on-secondary-container: '#566472'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#2f1500'
  on-tertiary-container: '#c76c00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e3'
  primary-fixed-dim: '#c8c6c7'
  on-primary-fixed: '#1b1b1c'
  on-primary-fixed-variant: '#474647'
  secondary-fixed: '#d6e4f4'
  secondary-fixed-dim: '#bac8d8'
  on-secondary-fixed: '#0f1d28'
  on-secondary-fixed-variant: '#3b4855'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xxl:
    fontFamily: Montserrat
    fontSize: 64px
    fontWeight: '800'
    lineHeight: 72px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-md:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  headline-xl-mobile:
    fontFamily: Montserrat
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Montserrat
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style

The design system is engineered for a premium renovation specialist, evoking a sense of structural integrity, precision, and high-end craftsmanship. The brand personality is authoritative yet transparent, positioning the service as the "Architectural Authority" in home transformation.

The visual style is a sophisticated blend of **Minimalism** and **High-Contrast Boldness**. It utilizes a strict adherence to a grid to reflect the precision of construction, while generous whitespace ensures a luxury "gallery" feel for renovation portfolios. The aesthetic avoids decorative fluff in favor of structural clarity, using heavy line weights and crisp divisions to guide the user's journey through complex information.

**Key Principles:**
- **Precision:** Perfect alignment and consistent mathematical ratios in spacing.
- **Authority:** Bold, heavy typography and deep charcoal tones.
- **Transparency:** Clear information hierarchy and high-contrast accessibility.

## Colors

The palette is derived directly from the industrial nature of renovation. The core is built on **Onyx Black** and **Slate Grey**, providing a foundation of stability and professional experience. 

- **Primary (Onyx Black):** Used for typography and structural elements to maintain a grounded, premium feel.
- **Secondary (Steel Blue-Grey):** Used for secondary UI elements, borders, and subtle backgrounds to provide depth without compromising the monochrome aesthetic.
- **Accent (Industrial Ochre):** A purposeful construction-inspired orange-yellow used sparingly for high-priority calls to action and critical status indicators.
- **Background (Pure White):** Essential for maintaining the high-contrast ratio required for AA/AAA compliance and providing the "breathable" space associated with luxury brands.

## Typography

The typographic strategy balances strength with legibility. 

**Montserrat** is used for all headlines (H1-H4). Its geometric construction and wide stance convey architectural stability. Headlines should utilize tight letter-spacing and heavy weights to command attention and improve SEO hierarchy visibility.

**Inter** is the functional workhorse for body copy and UI labels. It was chosen for its exceptional legibility and neutral character, ensuring that technical renovation details are easily digestible.

**Formatting Rules:**
- **All-Caps:** Use exclusively for labels and small eyebrows to create a "blueprint" notation aesthetic.
- **Contrast:** Maintain a minimum 7:1 contrast ratio for all body text against backgrounds.

## Layout & Spacing

This design system utilizes a **12-column Fixed Grid** for desktop and a **4-column Fluid Grid** for mobile. The layout philosophy is "Architectural Framing," where elements are contained within clearly defined zones and separated by generous margins.

- **Desktop:** 1280px max-width container, centered with 64px side margins. 
- **Tablet:** 8-column grid with 32px side margins.
- **Mobile:** Single column flow with 16px side margins to maximize content width for imagery.

Vertical rhythm is strictly maintained using an **8px base unit**. Component spacing should always be a multiple of this unit (e.g., 16, 24, 32, 64) to ensure a mathematically harmonious layout that mirrors the precision of building plans.

## Elevation & Depth

To maintain the architectural aesthetic, the design system avoids heavy shadows or realistic skeuomorphism. Instead, it utilizes **Tonal Layers** and **Bold Outlines**.

- **Z-Axis Hierarchy:** Depth is conveyed through stacking surfaces. A secondary background color (#F8F9FA) is used for "sunken" content areas, while the primary white background represents the main "floor" of the UI.
- **Structural Borders:** 1px or 2px solid borders in Slate Grey (#707E8C) are used to define card boundaries and input fields, mimicking technical drawings.
- **Focus States:** High-contrast Industrial Ochre (#F28C28) outlines are used for keyboard navigation and active states, ensuring clarity and accessibility.

## Shapes

The shape language is strictly **Sharp (0px roundedness)**. 

Sharp corners reinforce the themes of precision, stone-cutting, and structural engineering. This applies to all primary UI components including buttons, cards, images, and input fields. The only exception to this rule is the use of circular icons where necessary for standard recognition (e.g., social media icons). 

By removing rounded corners, the interface gains a more professional, "no-nonsense" industrial feel that differentiates the brand from softer, consumer-grade competitors.

## Components

### Buttons
Buttons are high-impact, rectangular blocks.
- **Primary:** Solid Onyx Black background with white uppercase Montserrat text. 0px border-radius.
- **Secondary:** Transparent background with a 2px Onyx Black border.
- **Accent:** Industrial Ochre background for "Get a Quote" or "Book Consultation."

### Cards
Cards are defined by a 1px Slate Grey border. They should never use shadows. Imagery inside cards should be flush to the top and sides, emphasizing the grid.

### Input Fields
Fields use a 1px border on all sides. On focus, the bottom border increases to 3px in Industrial Ochre to provide a clear, tactile response during form completion.

### Chips & Tags
Used for project categories (e.g., "Kitchen," "Extension"). These are small, all-caps labels with a light grey background and dark grey text, maintaining a "label-maker" aesthetic.

### LogoPlate
Plaque claire pour afficher un logo **en couleurs d'origine** sur photo (`components/ui/LogoPlate.astro`).

- **`default`** : fond `surface-container-lowest/92`, bordure légère, angles 0px.
- **`featured`** (hero) : `rounded-lg` (8px), fond plus opaque, `backdrop-blur-md`, liseret bas **3px ochre** (`border-b-tertiary`), ombre portée légère sur la photo, fin `ring` tonale. Exception volontaire à la règle 0px pour le lockup mis en avant.

### Lists
Lists should be separated by 1px horizontal dividers. Bullet points are replaced with small, solid black squares to maintain the geometric theme.

### Footer
Pied de page sombre (`inverse-surface` / `inverse-on-surface`), bordure haute `outline-variant`.

- **Grille** : 3 colonnes desktop (`md:grid-cols-3`), empilées mobile. Container 1280px, padding vertical 64px (`py-16`).
- **Colonne Marque** : pictogramme `logo_nu.svg` (`site.logo.mark`, `/assets/rebranding/logo_nu.svg`) en lien vers `#top`, rendu blanc via `brightness-0 invert` sur fond sombre ; accroche courte ; icônes sociales rondes (exception 0px).
- **Colonne Navigation** : label uppercase `label-lg`, liens ancres + CTA.
- **Colonne Contact** : email, téléphone, adresse avec icônes Material.
- **Barre légale** : séparateur `inverse-on-surface/20`, copyright + mention Toulouse.

### Logos (rebranding)
Assets dans `public/assets/rebranding/` ; chemins centralisés dans `src/data/site.ts` :

| Clé | Fichier | Usage |
|-----|---------|--------|
| `site.logo.full` | `logo.svg` | Hero (lockup mis en avant), page maintenance |
| `site.logo.mark` | `logo_nu.svg` | Header, drawer mobile, footer |

**Header** : barre `h-20`, pictogramme `h-12`, sans cadre. Sur hero transparent : filtre blanc (`brightness-0 invert` via `.header-logo`).

**Hero** : lockup complet dans **`LogoPlate` variant `featured`** — coins `rounded-lg`, liseret ochre en bas de plaque, ombre légère, couleurs SVG d'origine.

**Footer** : pictogramme seul, blanc sur `inverse-surface` (filtre `invert` conservé). Ancres : `scroll-padding-top: 5rem`.