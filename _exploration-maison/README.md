# _exploration-maison

Explorations de la « maison interactive ». Dossier préfixé `_` → **ignoré par Astro**,
aucun impact sur le site en production. Contrat commun à toutes les variantes :
12 `data-id` = `corps-metier.ts` (source de vérité unique, DRY), liens `/metiers/{slug}`,
survol synchronisé légende ↔ zone, accessibilité.

## Variante A — HYBRIDE (recommandée) : photo réaliste + calque interactif
- `preview-photo.html` — **à ouvrir dans un navigateur** pour juger le rendu.
- `apercu-hybride.png` — aperçu statique.
- `MaisonInteractive.hybride.astro` — composant prêt à intégrer.
- `maison-coupe.webp` — photo optimisée (172 Ko) servant de fond.
- `Gemini_Generated_Image_*.png` — photo source haute résolution.
- `zones.py` — **coordonnées des 12 zones en %** (source unique du calque).
- `gen2.py` — générateur de l'overlay (HTML + .astro depuis `zones.py`).

Principe : la photo reste un raster (look photoréaliste), mais les **zones cliquables**
et les **libellés FR** sont du vectoriel/HTML par-dessus → lisibles, nets à toute taille,
et toujours liés au SEO. Pour réaligner une zone, éditer `zones.py` puis relancer `gen2.py`.
Pour un décalage **global** (toutes les rubriques), ajuster `OFFSET_X` / `OFFSET_Y` dans `gen2.py`.

### Promotion de la variante hybride
1. Copier `maison-coupe.webp` → `public/assets/maison-coupe.webp`.
2. Déplacer `MaisonInteractive.hybride.astro` → `src/components/sections/`
   et corriger les imports `../src/...` → `../../...`.
3. Remplacer l'usage de `MaisonInteractive.astro` par le nouveau composant dans `index.astro`.

## Variante B — SVG iso 3/4 (vectoriel, sans photo)
- `preview.html`, `apercu.png`, `MaisonInteractive.v2.astro`, `gen.py`.
Re-dessin vectoriel en perspective iso, dans la charte. Plus léger et 100 % éditable,
mais esthétique « schéma » et non photoréaliste.

## Rappel technique
« Photoréaliste + précis + SVG pur » est contradictoire : le photoréalisme est matriciel
(pixels), le SVG est vectoriel. La variante hybride est la façon correcte d'avoir le rendu
photo **et** l'interactivité/SEO.
