# Cahier des Charges Fonctionnel & SEO : Refonte de la Page d'Accueil et des Tunnels (B2C / B2B)

## 1. Contexte et Objectifs du Projet
* **Site concerné :** Experts Travaux (existant : `experts-travaux-site.vercel.app`)
* **Objectif principal :** Génération de leads qualifiés (conversion de trafic organique issu de Google).
* **Double Cible :** 
  * **B2C (Particuliers) :** Rénovation globale, aménagement intérieur, extension, etc.
  * **B2B (Professionnels / Entreprises) :** Aménagement de bureaux, rénovation de commerces, locaux professionnels, contractant général.
* **Contrainte SEO majeure :** Éviter un écran d'entrée minimaliste ("splash screen") vide de contenu. La page d'accueil doit conserver un design épuré et haut de gamme (inspiré des standards architecturaux) tout en garantissant une structure sémantique riche pour le référencement naturel.

---

## 2. Architecture de l'Information & Structure des URLs

Pour éviter la cannibalisation des mots-clés et répondre aux intentions de recherche distinctes de chaque cible, l'arborescence cible sera la suivante :

* `/` (Page d'accueil globale - Vitrine & Aiguillage SEO)
* `/particuliers/` (Landing page dédiée au tunnel B2C)
* `/professionnels/` (Landing page dédiée au tunnel B2B)

---

## 3. Spécifications Détaillées de la Page d'Accueil (`/`)

La page d'accueil doit concilier **esthétique épurée (DA type *Boundary Space*)** et **optimisation sémantique (SEO)**.

### Zone 1 : *Above the fold* (Premier écran visible)
* **Design :** Épuré, visuel de haute qualité en arrière-plan (ambiance chantier pro / rénovation soignée).
* **Balise H1 (Unique) :** Doit intégrer la proposition de valeur globale et les mots-clés cibles.
  * *Exemple :* `<h1>Votre partenaire expert en travaux de rénovation pour Particuliers et Professionnels</h1>`
* **Sous-titre (Paragraphe d'accroche) :** 2 lignes maximum explicitant le savoir-faire (maîtrise d'œuvre, respect des délais, qualité).
* **Double Appel à l'Action (CTA de segmentation immédiate) :**
  * Bouton 1 : **"Espace Particuliers"** (Lien vers `/particuliers/`)
  * Bouton 2 : **"Espace Professionnels"** (Lien vers `/professionnels/`)

### Zone 2 : Le Contenu Sémantique SEO (Crucial pour Google)
* *Placé juste sous le premier écran (scroll immédiat)* pour ne pas pénaliser le design tout en fournissant du texte aux robots.
* **Bloc de texte optimisé (300 à 400 mots) :**
  * Présentation de l'entreprise d'experts en travaux.
  * Utilisation du champ lexical : *coordination de travaux, artisans qualifiés, gestion de projet, sur-mesure, respect du budget, normes en vigueur*.
  * Intégration de liens contextuels internes vers les sous-dossiers `/particuliers/` et `/professionnels/`.

### Zone 3 : Preuves Sociales & Réassurance (Conversion)
* **Chiffres clés :** Nombre de chantiers réalisés, taux de satisfaction, garanties (décennale, etc.).
* **Logos de partenaires ou références B2B / Photos de réalisations B2C.**
* **CTA Global de contact rapide** (Formulaire simplifié ou prise de rendez-vous).

---

## 4. Spécifications des Pages de Destination (Silos)

### A. Le Tunnel Particulier (`/particuliers/`)
* **Balise H1 :** *Rénovation et Travaux pour Particuliers : Votre projet sur-mesure*
* **Objectif SEO :** Se positionner sur des requêtes locales et transactionnelles (ex: *rénovation maison*, *entreprise de rénovation intérieure*, *aménagement de combles*).
* **Éléments clés de la page :**
  * Présentation des prestations dédiées aux particuliers (cuisine, salle de bain, rénovation complète).
  * Formulaire de devis interactif / simulateur de budget (fort levier de conversion).
  * Galerie photos avant/après.

### B. Le Tunnel Professionnel (`/professionnels/`)
* **Balise H1 :** *Aménagement de Bureaux et Travaux pour Professionnels*
* **Objectif SEO :** Se positionner sur des requêtes B2B à fort retour sur investissement (ex: *contractant général btp*, *rénovation de locaux commerciaux*, *aménagement d'espaces de travail*).
* **Éléments clés de la page :**
  * Approche par métiers / secteurs (bureaux, commerces, hôtellerie).
  * Argumentaire axé sur la continuité d'activité, le respect des normes ERP et la maîtrise des plannings stricts.
  * Formulaire de contact B2B / Appel d'offres / Demande de cahier des charges.

---

## 5. Exigences Techniques & SEO On-Page
* **Vitesse de chargement (Core Web Vitals) :** Maintenir les excellentes performances (score Lighthouse 90+) malgré l'ajout de contenu textuel grâce à l'optimisation des images (formats WebP/AVIF) et un code léger.
* **Balisage Schema.org :** Intégrer les données structurées (`LocalBusiness` ou `GeneralContractor`) pour renforcer la visibilité dans les résultats de recherche locaux et enrichis.
* **Maillage interne :** S'assurer que chaque page renvoie un signal clair vers sa cible, avec des ancres de liens optimisées (ex: lien "découvrir nos solutions de rénovation" pointant vers `/particuliers/`).