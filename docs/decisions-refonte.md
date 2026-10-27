# Refonte Experts Travaux — décisions et objectifs SEO

Document de référence : ce qui a été décidé pendant la refonte (octobre 2026), pourquoi, et quel objectif SEO (ou de conversion) chaque choix sert.

> **Lecture honnête de ce document.** Les effets SEO décrits sont des **effets attendus** fondés sur les bonnes pratiques et sur le cahier des charges client. Rien n'a été mesuré en conditions réelles : le site est en `noindex` et n'est pas encore en production. Les seules mesures disponibles sont techniques (build, Lighthouse en local, poids des pages), indiquées là où elles existent.

---

## 1. Contexte et objectifs

| Élément | Valeur |
|---|---|
| Entreprise | Experts Travaux — rénovation et bâtiment, Toulouse |
| Cibles | Particuliers (B2C) et professionnels (B2B) |
| Objectif principal | Leads qualifiés issus du trafic organique Google |
| Objectif chiffré (brief client) | 30 à 50 appels par mois, site + Instagram |
| Zone | Toulouse et environ **100 km** (étendue depuis les 50 km du brief, décision Hery) |
| Contrainte SEO majeure (cahier) | Un design épuré et haut de gamme **sans écran d'entrée vide** : le contenu sémantique doit être présent pour les robots |
| État | `noindex, nofollow` sur toutes les pages jusqu'à la décision de lancement |

Sources : `docs/brief-client-ugo.md`, `docs/cahier-des-charges-seo.md`, `DESIGN.md` (charte client).

---

## 2. Synthèse : décision → objectif

| # | Décision | Objectif principal |
|---|---|---|
| 1 | Arborescence en silos `/particuliers/`, `/professionnels/`, `/metiers/*` | Ranker sur des intentions distinctes sans cannibalisation |
| 2 | H1 unique par page, porteur du mot-clé principal | Pertinence thématique et lisibilité |
| 3 | Bloc de présentation de 300 à 400 mots sous le hero | Donner du texte indexable sans sacrifier le design |
| 4 | Double CTA hero + cartes d'aiguillage | Segmenter dès l'arrivée, faire circuler le jus vers les silos |
| 5 | 12 pages métier avec contenu propre | Longue traîne « métier + Toulouse » |
| 6 | Méga-menu des métiers + maison interactive | Maillage interne fort, 12 pages à un clic |
| 7 | FAQ par silo + données structurées FAQPage | Couvrir les questions, éligibilité aux résultats enrichis |
| 8 | JSON-LD `GeneralContractor` + `Service` + `BreadcrumbList` | SEO local, compréhension de l'entité par Google |
| 9 | Meta uniques, canonical, Open Graph, sitemap | Hygiène technique, éviter le contenu dupliqué |
| 10 | Interrupteur unique `site.indexable` | Lancer sans risque, ne pas indexer une maquette |
| 11 | Images en WebP, polices auto-hébergées, aucun domaine externe | Core Web Vitals, RGPD, rapidité |
| 12 | Hero : LCP préservé, slides 2 à 6 chargées après `load` | LCP stable malgré le carrousel |
| 13 | Charte monochrome + wordmark + signature « Maison de confiance » | Confiance, reconnaissance de marque, cohérence |
| 14 | Accessibilité (WCAG AA) | Qualité perçue, conformité, signaux d'expérience |
| 15 | Aucun chiffre, label ou avis inventé | Crédibilité, risque juridique, E-E-A-T |
| 16 | Pas de vidéo | Performance, authenticité, priorités (voir §9) |

---

## 3. Architecture de l'information

### 3.1 Trois niveaux de pages
```
/                         Vitrine + aiguillage (intention générique)
/particuliers/            Tunnel B2C (rénovation maison, extension, cuisine, salle de bain…)
/professionnels/          Tunnel B2B (contractant général, bureaux, commerces, ERP…)
/metiers/{slug}/          12 pages métier (toiture, charpente, isolation, façade, etc.)
```

**Pourquoi** : le cahier demande de séparer les intentions pour éviter la cannibalisation. Un particulier qui cherche « rénovation maison Toulouse » et un gérant qui cherche « contractant général bureaux Toulouse » n'ont pas les mêmes attentes ni le même vocabulaire.

**Objectif SEO** :
- chaque page porte **un mot-clé principal distinct** (B2C : rénovation maison, extension, devis ; B2B : contractant général, aménagement de bureaux, locaux commerciaux, ERP ; métiers : « métier + Toulouse ») ;
- les pages métier captent la **longue traîne** (requêtes précises et locales, plus faciles à ranker et plus proches de l'achat) ;
- la home reste la page d'autorité générale et distribue vers les silos.

### 3.2 Maillage interne
- **Navigation principale** : liens vers Particuliers, Professionnels, Réalisations, Méthode, À propos sur chaque page.
- **Méga-menu** : au survol de Particuliers / Professionnels, la liste des métiers concernés (liens vers `/metiers/*`). Chaque page métier reçoit donc un lien depuis **toutes** les pages du site.
- **Maison interactive** (home) : les 12 zones et la légende pointent vers les pages métier.
- **Pages métier** : fil d'Ariane, lien vers le(s) silo(s) concerné(s), 3 autres métiers liés.
- **Ancres descriptives** (« découvrir nos solutions de rénovation », « aménagement de bureaux et de travaux pour professionnels »), jamais « cliquez ici ».

**Objectif SEO** : répartir l'autorité interne, rendre toutes les pages atteignables en un ou deux clics, donner à Google le contexte thématique via les ancres.

---

## 4. Home

| Élément | Décision | Objectif |
|---|---|---|
| H1 | « Votre partenaire expert en travaux de rénovation à Toulouse, pour Particuliers et Professionnels » | Proposition de valeur + localisation + double cible dans un titre unique |
| Sous-titre | 2 lignes : maîtrise d'œuvre, délais, un seul interlocuteur, rayon 100 km | Contexte sémantique sans surcharger le premier écran |
| Double CTA | « Espace Particuliers » / « Espace Professionnels » | Segmentation immédiate (cahier §3), liens internes forts |
| Bloc de présentation | ≈ 323 mots, visibles, juste sous le hero, 5 liens internes | Texte indexable (cahier : 300 à 400 mots) avec le champ lexical : coordination de travaux, artisans qualifiés, gestion de projet, sur-mesure, respect du budget, normes en vigueur |
| Cartes d'aiguillage (fin de présentation) | Deux grandes cartes vers les silos | Conversion et circulation du lien vers les silos |
| Carrousel hero | Conservé (6 visuels) | Impact visuel ; ne pénalise pas le LCP (voir §7) |

**Choix de forme du bloc de texte** : le texte a été mis en forme de façon éditoriale (chapeau, colonnes numérotées, puces du champ lexical) **sans rien retirer** : pas d'accordéon, pas de troncature, mêmes mots, mêmes liens. C'est la contrainte SEO non négociable : tout le texte reste visible dans le HTML.

**Écart assumé** : le H1 est rendu en 48 px (`headline-lg`) et non 72 px (`display-xl`) comme dans le DESIGN.md client, car il compte 96 caractères et prendrait 4 à 5 lignes. Validé par Hery. Le gain est la lisibilité ; le contenu du H1 (mot-clé + Toulouse + cibles) n'a pas été réduit.

---

## 5. Pages silos et métiers

### 5.1 `/particuliers/` et `/professionnels/`
- **H1** repris du cahier : « Rénovation et Travaux pour Particuliers : Votre projet sur-mesure » et « Aménagement de Bureaux et Travaux pour Professionnels ».
- **Prestations** : cartes qui renvoient vers les pages métier concernées.
- **B2B** : secteurs (bureaux, commerces, hôtels, restaurants, entrepôts), argumentaire (continuité d'activité, normes ERP, plannings), bloc appel d'offres.
- **FAQ** : 4 à 6 questions par silo, en `<details>` accessibles, avec balisage `FAQPage`.
- **Avant/après** : comparateur à curseur (voir §8).
- **CTA et formulaire** : section contact propre à chaque silo.

**Objectif SEO** : couvrir l'intention transactionnelle (devis, entreprise de rénovation), les questions que se pose le prospect (FAQ = longue traîne + éligibilité résultats enrichis), et fournir un contenu distinct par silo.

### 5.2 Pages `/metiers/{slug}/`
- Contenu par métier (120 à 250 mots) : intro, prestations, « pourquoi Experts Travaux », cible (B2C / B2B / les deux).
- Fil d'Ariane, 3 métiers liés, CTA vers le silo.
- Données structurées `Service` rattachées à l'entreprise.

**Objectif SEO** : une page par requête « métier + Toulouse », avec un titre et une description uniques.

---

## 6. SEO technique

### 6.1 Balises par page
- Un seul `<title>` (38 à 59 caractères, ≤ 60) et une seule meta description (145 à 157 caractères) **uniques** sur les 15 pages de contenu.
- **Canonical absolu** avec slash final cohérent avec le build.
- **Open Graph** et **Twitter Card** (image par défaut 1200×630).
- `lang="fr"`, `viewport`, favicon, apple-touch-icon.

**Objectif** : éviter le contenu dupliqué, contrôler l'affichage dans les résultats et les partages.

### 6.2 Données structurées (JSON-LD, un `@graph` par page)
| Type | Où | Intérêt |
|---|---|---|
| `GeneralContractor` | Toutes les pages (sauf maintenance) | Entité locale : nom, adresse, téléphone, e-mail, zone, réseaux |
| `BreadcrumbList` | Silos et métiers | Fil d'Ariane dans les résultats |
| `FAQPage` | `/particuliers/`, `/professionnels/` | Éligibilité aux résultats enrichis |
| `Service` | Pages métier | Associer chaque service à l'entreprise |

**Volontairement omis, parce que non fournis ou non vérifiés** : horaires d'ouverture, `aggregateRating` / avis, fourchette de prix, coordonnées géographiques précises, SIRET. Mieux vaut un balisage plus court que du balisage inexact (risque d'action manuelle de Google et de perte de confiance).

**Zone desservie** : `GeoCircle` de 100 km centré sur Toulouse (centre-ville ; à affiner si besoin).

### 6.3 Crawl et indexation
- **`robots.txt` dynamique** et **sitemap** (`@astrojs/sitemap`), `/maintenance` exclu.
- **Interrupteur unique** `site.indexable` (`src/data/site.ts`) : tant que `false`, `noindex, nofollow` partout, `robots.txt` en `Disallow: /`, sitemap non référencé. Passer à `true` au lancement fait basculer tout cohérent en un seul changement.
- **Slash final** harmonisé sur les liens métier (helper `metierPath`) pour éviter les doublons d'URL.

**Objectif** : ne pas indexer une maquette, puis lancer proprement sans oublier de balise.

---

## 7. Performance et Core Web Vitals

| Action | Effet attendu |
|---|---|
| Images du portfolio converties en WebP (14,2 Mo → 0,78 Mo) | Moins d'octets, meilleur LCP/mobile |
| Orphelins supprimés (anciens JPG, anciens logos, composants non utilisés) | `dist/` passé de 44 Mo à environ 2,9 Mo |
| Polices auto-hébergées (`@fontsource`, latin, 1 à 2 préchargées) | Aucune requête externe, RGPD, pas de flash bloquant |
| `width` / `height` sur les images | CLS ≈ 0 |
| Hero : slide 1 en `fetchpriority="high"`, slides 2 à 6 chargées après `load` | LCP non dégradé par le carrousel |
| Logo allégé (157 Ko → 31 Ko) | Moins de poids sur chaque page |
| Effets (monochrome, spotlight, volet) en CSS, GPU | Pas d'impact notable sur le LCP |

**Mesures disponibles** (home, mobile, en local) : Lighthouse **Accessibilité 100**, **Bonnes pratiques 100**, **SEO 69** (le 69 vient du `noindex` volontaire ; il remonte au lancement). Le score **Performance** n'a pas pu être mesuré avec l'outil utilisé : à passer sur PageSpeed Insights / Lighthouse CLI après déploiement.

---

## 8. Design et contenu : choix de marque et de confiance

Ces choix visent surtout la **conversion et la confiance**, indirectement le SEO (engagement, retours en arrière moins nombreux).

| Choix | Pourquoi |
|---|---|
| **Charte client** (Newsreader, Hanken Grotesk, JetBrains Mono ; palette pierre ; angles 0 px ; sans ochre) | Demandé par le client ; image « autorité architecturale », positionnement premium non low-cost |
| **Logo définitif + wordmark Anton** | Reconnaissance de marque ; la police officielle du nom est conservée |
| **Signature d'en-tête** « NEUF & RÉNOVATION / MAISON DE CONFIANCE / DEPUIS 2012 » | Slogan et ancienneté fournis par le client, en place discrète sur le logo : signal de confiance locale, sans surcharger |
| **Hero monochrome + spotlight couleur** | Les visuels étaient trop colorés pour la charte ; l'effet crée un « wow » sans toucher à la structure ni au LCP |
| **Méga-menu des métiers** | Usage réel (12 métiers à un geste) et maillage interne depuis toutes les pages |
| **Maison interactive** (monochrome, couleur au survol) | Différenciation visuelle ; les zones renvoient vers les pages métier. La légende est le chemin clavier principal |
| **Réalisations en bento** | Présentation éditoriale moins conventionnelle ; métadonnées (lieu, surface, année) affichées seulement quand fournies |
| **Avant/après en comparateur** | Effet démonstratif, accessible (`input range` natif), sans dépendance externe |
| **Présentation en colonnes + puces** | Rendre le bloc SEO lisible sans le raccourcir |

---

## 9. Pourquoi il n'y a pas de vidéo

Une vidéo de time-lapse de transformation (10 s, 1280×720, 7,9 Mo) a été proposée. **Elle n'a pas été intégrée**, pour ces raisons :

1. **Authenticité.** La vidéo est générée par IA (comme plusieurs visuels de la maquette) : ce n'est pas un vrai chantier. Pour une entreprise qui vend du travail réel, présenter une « transformation » fabriquée fragilise la confiance et peut être assimilé à une pratique commerciale trompeuse. Pour une maquette, c'est tolérable ; en production, c'est un risque.
2. **Gain SEO quasi nul.** Une vidéo décorative en boucle sur la home n'est pas éligible aux résultats vidéo de Google (qui demandent un contenu vidéo principal sur une page dédiée). Aucun bonus de classement direct.
3. **Coût performance réel.** 7,9 Mo, soit près de 3 fois le poids de tout le site, avec risque sur LCP, INP et data mobile. Même ré-encodée (≈ 1 à 1,8 Mo), elle ajoute du CPU et du transfert pour un bénéfice faible.
4. **Gain business faible.** L'objectif est 30 à 50 appels par mois : ce qui fait appeler, ce sont de vraies photos, des avis, des références, un formulaire qui marche et une fiche Google, pas une animation décorative.
5. **Le site est déjà riche en effets** : carrousel avec spotlight, comparateurs, bento, maison interactive, méga-menu. Une animation de plus dilue les autres.
6. **Accessibilité.** Une vidéo qui se lance seule et dure plus de 5 s impose un contrôle de pause (WCAG 2.2.2), du support `prefers-reduced-motion` et de la gestion de `Save-Data` : du travail pour peu de valeur.

**Quand la reconsidérer** : avec **une vraie séquence tournée sur un chantier du client** (téléphone sur trépied, cadrage fixe). Spécifications si cela se fait :
- H.264 540p sans piste audio, ≈ 1 Mo (essai réalisé : 1,0 Mo en 540p, 1,8 Mo en 720p), `faststart` ;
- poster WebP léger, `preload="none"`, lecture déclenchée à l'entrée dans le viewport ;
- bouton Pause, repli sur le poster en `prefers-reduced-motion` ;
- placement sous le premier écran (jamais dans le hero), éventuellement sur `/professionnels/` ;
- `VideoObject` en JSON-LD seulement si la vidéo devient un vrai contenu.

---

## 10. Règles de contenu

| Règle | Raison |
|---|---|
| Aucun chiffre, label, certification ou avis **inventé** | Crédibilité, risque juridique, E-E-A-T |
| `chiffresCles`, `lieu`, `surface`, `annee`, `duree` à `null` tant que non fournis, et jamais affichés | Pas de faux chiffres |
| « 15+ corps de métier » remplacé par **12** | Cohérence avec les 12 pages métier publiées |
| Bloc « simulateur de budget » retiré | L'outil n'existe pas : ne pas promettre une fonction absente |
| Galerie avant/après sans photos : section masquée | Pas d'images factices dans un état « vide » |
| Accroches du menu reprises mot pour mot des intros | Aucun fait nouveau |

**Provisoirement conservés (décision Hery) à valider avant lancement** : « 100 % chantiers suivis », garanties de la section Méthode (décennale, artisans RGE, délais tenus), « devis gratuit », mention « NF C 15-100 » sur la page électricité.

---

## 11. Accessibilité (qualité perçue et signal d'expérience)

- Un seul `<h1>` par page, hiérarchie h2/h3 logique, landmarks uniques, lien d'évitement.
- Contrastes : corps ≥ 7:1 visé, AA minimum ; `tertiary` (4,1:1) interdit en texte courant.
- Clavier complet (menu, méga-menu, drawer, carrousel avec pause, FAQ, comparateurs).
- `prefers-reduced-motion` respecté (carrousel, volets, spotlight, zooms).
- Cibles tactiles ≥ 44 px, focus visibles sur fonds clair et sombre.

---

## 12. Avant la mise en ligne (checklist)

| À faire | Responsable |
|---|---|
| Brancher le backend du formulaire (aujourd'hui sans `action` : l'envoi fait un GET avec les données dans l'URL) | Hery |
| Remplacer les visuels générés par de **vraies photos** (hero, avant/après, réalisations) et vérifier les droits (enseigne et marque visibles sur `real-4` / `real-5`) | Client / Hery |
| Fournir SVG du logo | Client |
| Chiffres clés réels, avis clients (≥ 30 au brief), logos partenaires | Client |
| Confirmer services (domotique, PAC, climatisation, entrepôts, cuisines pro) et statut « contractant général » | Client |
| Confirmer garanties affichées (décennale, RGE, délais) | Client |
| Confirmer le domaine (`experts-travaux.fr`) et le rayon 100 km | Hery (domaine validé) |
| Passer `indexable: true` dans `src/data/site.ts` | Hery |
| Soumettre le sitemap dans la Search Console ; fiche Google Business ; Analytics | Hery / Client |
| Mesurer Lighthouse Performance (PageSpeed) et CWV réels après déploiement | Hery |
| Cache long (immutable) sur `/_astro/` à l'hébergement | Hery |

---

## 13. Limites connues

- **Aucune mesure de classement** : le site n'est pas indexé.
- **Contraste dans le halo du spotlight** du hero : plus faible, transitoire, non mesuré ; remonter le masque du scrim de 55 % à 70–75 % si nécessaire.
- **Safari / Firefox** non testés (masques CSS, `@property`).
- **Polygones de la maison interactive** tracés à la main : de légers débordements possibles sur les tuyaux fins ; la zone « finitions » est approximative.
- **Signature du logo** masquée entre 1200 et 1439 px (largeur insuffisante) ; la ligne « Maison de confiance » reste visible partout.
- **Éléments legacy conservés** : `sections/MaisonInteractive.astro` (non importé) et `_exploration-maison/`.
- **Images** servies depuis `public/` en `<img>` (WebP) : pas de `srcset` ni d'AVIF ; suffisant pour la maquette.
