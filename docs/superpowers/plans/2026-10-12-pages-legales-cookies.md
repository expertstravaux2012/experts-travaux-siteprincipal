# Pages légales et gestionnaire de cookies — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter les pages Mentions légales et CGU, et un gestionnaire de cookies maison prêt à accueillir un outil de mesure d'audience.

**Architecture:** La logique de consentement est un module TS pur et testé (`src/lib/consent.ts`, stockage injecté). L'UI est un composant Astro monté dans `Layout.astro` (bandeau + `<dialog>`), piloté par des attributs `data-cookie-action`. Les textes légaux vivent dans `src/data/legal.ts`, rendus par un layout commun `LegalPage.astro`.

**Tech Stack:** Astro 7, Tailwind v4 (tokens `global.css`), TypeScript strict, `node:test` (Node ≥ 22.12) pour la logique pure.

Spec : `docs/superpowers/specs/2026-10-12-pages-legales-cookies-design.md`.

Répertoire de travail : `/Users/hery_mc_air/Documents/Claude/Projects/experts-travaux/experts-travaux-site`. Le projet n'est pas un dépôt git : pas d'étapes de commit, chaque tâche se clôt par une vérification de build.

## Global Constraints

- Contenu séparé du markup : tous les textes dans `src/data/`, jamais en dur dans les composants.
- Aucune valeur de style magique : tokens Tailwind du design system uniquement (pas de hex, pas de px en dur) ; angles 0px ; pas d'ombre hors `shadow-floating`.
- Aucune dépendance npm ajoutée ; aucun domaine externe.
- Valeur légale non fournie = `'À COMPLÉTER'` (jamais inventée).
- Choix de consentement : `localStorage`, clé `et-consent`, validité 182 jours (~6 mois).
- « Tout accepter » et « Tout refuser » ont le même poids visuel.
- Bandeau masqué par défaut : `site.consent.enabled = false` ; le bouton « Gérer mes cookies » reste actif.
- Un seul `<h1>` par page ; meta title ≤ 60 caractères, description 140–160 caractères.
- Navigation clavier complète, cibles ≥ 44 px (`min-h-11`) pour les liens, contraste AA.
- Surgical : ne toucher que les fichiers listés.

## File Structure

| Fichier | Action | Responsabilité |
|---|---|---|
| `src/data/cookies.ts` | Créer | Catégories, textes, clé et durée du consentement (sans import) |
| `src/lib/consent.ts` | Créer | Store pur testable + API navigateur (`getConsent`, `setConsent`, `setAllConsent`, `onConsent`) |
| `src/lib/consent.test.ts` | Créer | Tests `node:test` du store |
| `package.json` | Modifier | Script `test` |
| `src/data/site.ts` | Modifier | `consent: { enabled: false }` |
| `src/data/legal.ts` | Créer | Données éditeur/hébergeur, textes Mentions légales et CGU, liens footer |
| `src/data/seo.ts` | Modifier | Title/description des 2 pages |
| `src/components/layout/LegalPage.astro` | Créer | Gabarit des pages légales |
| `src/pages/mentions-legales.astro` | Créer | Page Mentions légales |
| `src/pages/cgu.astro` | Créer | Page CGU |
| `src/components/layout/CookieConsent.astro` | Créer | Bandeau + panneau + script |
| `src/layouts/Layout.astro` | Modifier | Monter `CookieConsent` |
| `src/components/layout/Footer.astro` | Modifier | Liens légaux + bouton « Gérer mes cookies » |

---

### Task 1: Logique de consentement (TDD)

**Files:**
- Create: `src/data/cookies.ts`
- Create: `src/lib/consent.ts`
- Create: `src/lib/consent.test.ts`
- Modify: `package.json` (scripts)
- Modify: `src/data/site.ts` (après `indexable: false,`)

**Interfaces:**
- Consumes: rien.
- Produces:
  - `cookies.ts` : `type ConsentCategory = 'mesure-audience'`, `interface CookieCategory { id: 'necessaires' | ConsentCategory; label: string; description: string; required: boolean }`, `consentStorageKey: string`, `consentTtlDays: number`, `consentCategories: CookieCategory[]`, `optionalCategoryIds: ConsentCategory[]`, `cookieTexts` (voir code).
  - `consent.ts` : `type ConsentChoice = Record<ConsentCategory, boolean>`, `interface StorageLike`, `createConsentStore(storage: StorageLike | null, now?: () => number): { read(): ConsentChoice | null; write(c: ConsentChoice): void }`, `getConsent(): ConsentChoice | null`, `setConsent(c: ConsentChoice): void`, `setAllConsent(granted: boolean): void`, `onConsent(category: ConsentCategory, cb: () => void): void`, `CONSENT_EVENT = 'consent:change'`.

- [ ] **Step 1: Créer `src/data/cookies.ts`**

```ts
// Paramètres et textes du gestionnaire de cookies. Aucun import : utilisable hors Astro (tests Node).

export type ConsentCategory = 'mesure-audience';

export interface CookieCategory {
  id: 'necessaires' | ConsentCategory;
  label: string;
  description: string;
  required: boolean;
}

export const consentStorageKey = 'et-consent';
/** ~6 mois : durée maximale de validité du choix recommandée par la CNIL. */
export const consentTtlDays = 182;

export const consentCategories: CookieCategory[] = [
  {
    id: 'necessaires',
    label: 'Cookies nécessaires',
    description:
      'Indispensables au fonctionnement du site et à la mémorisation de votre choix. Ils ne peuvent pas être désactivés.',
    required: true,
  },
  {
    id: 'mesure-audience',
    label: 'Mesure d’audience',
    description:
      'Statistiques de fréquentation pour comprendre l’usage du site et l’améliorer.',
    required: false,
  },
];

export const optionalCategoryIds: ConsentCategory[] = consentCategories
  .filter((c): c is CookieCategory & { id: ConsentCategory } => !c.required)
  .map((c) => c.id);

export const cookieTexts = {
  banner: {
    ariaLabel: 'Gestion des cookies',
    title: 'Votre vie privée',
    text: 'Nous aimerions mesurer l’audience du site pour l’améliorer. Aucun cookie de mesure n’est déposé sans votre accord.',
    accept: 'Tout accepter',
    refuse: 'Tout refuser',
    customize: 'Personnaliser',
  },
  panel: {
    title: 'Gestion des cookies',
    intro:
      'Choisissez les catégories que vous autorisez. Vous pouvez modifier ce choix à tout moment depuis le pied de page.',
    alwaysActive: 'Toujours actif',
    save: 'Enregistrer mes choix',
    close: 'Fermer',
  },
  footerButton: 'Gérer mes cookies',
};
```

- [ ] **Step 2: Écrire le test qui échoue — `src/lib/consent.test.ts`**

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createConsentStore } from './consent.ts';
import type { StorageLike } from './consent.ts';
import { consentStorageKey, consentTtlDays } from '../data/cookies.ts';

const DAY_MS = 86_400_000;

const memoryStorage = (): StorageLike & { has(key: string): boolean } => {
  const data = new Map<string, string>();
  return {
    getItem: (key) => data.get(key) ?? null,
    setItem: (key, value) => void data.set(key, value),
    removeItem: (key) => void data.delete(key),
    has: (key) => data.has(key),
  };
};

test('read renvoie null sans choix enregistré', () => {
  const store = createConsentStore(memoryStorage());
  assert.equal(store.read(), null);
});

test('write puis read restitue le choix', () => {
  const store = createConsentStore(memoryStorage());
  store.write({ 'mesure-audience': true });
  assert.deepEqual(store.read(), { 'mesure-audience': true });
});

test('write est idempotent : le dernier choix remplace le précédent', () => {
  const store = createConsentStore(memoryStorage());
  store.write({ 'mesure-audience': true });
  store.write({ 'mesure-audience': false });
  store.write({ 'mesure-audience': false });
  assert.deepEqual(store.read(), { 'mesure-audience': false });
});

test('read renvoie null et purge le choix expiré', () => {
  const storage = memoryStorage();
  let now = 1_000_000;
  const store = createConsentStore(storage, () => now);
  store.write({ 'mesure-audience': true });

  now += consentTtlDays * DAY_MS - 1;
  assert.deepEqual(store.read(), { 'mesure-audience': true });

  now += 1;
  assert.equal(store.read(), null);
  assert.equal(storage.has(consentStorageKey), false);
});

test('read ignore un contenu corrompu ou incomplet', () => {
  const storage = memoryStorage();
  const store = createConsentStore(storage);

  storage.setItem(consentStorageKey, '{pas du json');
  assert.equal(store.read(), null);

  storage.setItem(consentStorageKey, JSON.stringify({ v: 1, categories: {}, expiresAt: Date.now() + DAY_MS }));
  assert.equal(store.read(), null);

  storage.setItem(consentStorageKey, JSON.stringify({ v: 99, categories: { 'mesure-audience': true }, expiresAt: Date.now() + DAY_MS }));
  assert.equal(store.read(), null);
});

test('sans stockage disponible, read renvoie null et write ne lève pas', () => {
  const store = createConsentStore(null);
  assert.doesNotThrow(() => store.write({ 'mesure-audience': true }));
  assert.equal(store.read(), null);
});

test('un stockage qui lève ne casse ni read ni write', () => {
  const failing: StorageLike = {
    getItem: () => {
      throw new Error('blocked');
    },
    setItem: () => {
      throw new Error('quota');
    },
    removeItem: () => {
      throw new Error('blocked');
    },
  };
  const store = createConsentStore(failing);
  assert.doesNotThrow(() => store.write({ 'mesure-audience': true }));
  assert.equal(store.read(), null);
});
```

- [ ] **Step 3: Ajouter le script `test` dans `package.json`**

Dans `scripts`, remplacer `"astro": "astro"` par :

```json
    "astro": "astro",
    "test": "node --experimental-strip-types --test \"src/**/*.test.ts\""
```

- [ ] **Step 4: Lancer le test, vérifier l'échec**

Run: `npm test`
Expected: FAIL — `Cannot find module '.../src/lib/consent.ts'` (ERR_MODULE_NOT_FOUND).

- [ ] **Step 5: Implémenter `src/lib/consent.ts`**

```ts
import { consentStorageKey, consentTtlDays, optionalCategoryIds } from '../data/cookies.ts';
import type { ConsentCategory } from '../data/cookies.ts';

export type ConsentChoice = Record<ConsentCategory, boolean>;

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

export const CONSENT_EVENT = 'consent:change';

const DAY_MS = 86_400_000;
const STORAGE_VERSION = 1;

const isChoice = (value: unknown): value is ConsentChoice =>
  typeof value === 'object' &&
  value !== null &&
  optionalCategoryIds.every((id) => typeof (value as Record<string, unknown>)[id] === 'boolean');

const attempt = <T>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

/** Store pur : le stockage et l'horloge sont injectés (testable sans navigateur). */
export function createConsentStore(storage: StorageLike | null, now: () => number = Date.now) {
  return {
    read(): ConsentChoice | null {
      if (!storage) return null;
      return attempt<ConsentChoice | null>(() => {
        const raw = storage.getItem(consentStorageKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        const valid =
          parsed?.v === STORAGE_VERSION &&
          typeof parsed.expiresAt === 'number' &&
          parsed.expiresAt > now() &&
          isChoice(parsed.categories);
        if (!valid) {
          storage.removeItem(consentStorageKey);
          return null;
        }
        return parsed.categories;
      }, null);
    },
    write(categories: ConsentChoice): void {
      if (!storage) return;
      attempt(
        () =>
          storage.setItem(
            consentStorageKey,
            JSON.stringify({ v: STORAGE_VERSION, categories, expiresAt: now() + consentTtlDays * DAY_MS }),
          ),
        undefined,
      );
    },
  };
}

// --- API navigateur -------------------------------------------------------

let store: ReturnType<typeof createConsentStore> | undefined;
/** Dernier choix de la session : couvre un localStorage indisponible. */
let sessionChoice: ConsentChoice | null = null;

const getStore = () => {
  if (!store) {
    store = createConsentStore(attempt<StorageLike | null>(() => window.localStorage, null));
  }
  return store;
};

export const getConsent = (): ConsentChoice | null => sessionChoice ?? getStore().read();

export function setConsent(choice: ConsentChoice): void {
  sessionChoice = choice;
  getStore().write(choice);
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }));
}

export function setAllConsent(granted: boolean): void {
  setConsent(Object.fromEntries(optionalCategoryIds.map((id) => [id, granted])) as ConsentChoice);
}

/** Exécute `callback` une seule fois, dès que `category` est accordée (immédiatement si déjà le cas). */
export function onConsent(category: ConsentCategory, callback: () => void): void {
  let done = false;
  const run = () => {
    if (done || !getConsent()?.[category]) return;
    done = true;
    callback();
  };
  run();
  window.addEventListener(CONSENT_EVENT, run);
}
```

- [ ] **Step 6: Lancer les tests, vérifier le succès**

Run: `npm test`
Expected: `pass 7`, `fail 0`.

- [ ] **Step 7: Ajouter l'interrupteur dans `src/data/site.ts`**

Après la ligne `  indexable: false,` insérer :

```ts
  /**
   * Gestionnaire de cookies. enabled = false : le bandeau ne s'affiche pas (aucun traceur à consentir).
   * Passer à true au branchement d'un outil de mesure d'audience (via onConsent, src/lib/consent.ts).
   * Le bouton « Gérer mes cookies » du footer reste actif dans tous les cas.
   */
  consent: { enabled: false },
```

- [ ] **Step 8: Vérifier le build**

Run: `npm run build`
Expected: build OK, pages inchangées (16 pages), aucune erreur.

---

### Task 2: Pages Mentions légales et CGU

**Files:**
- Create: `src/data/legal.ts`
- Modify: `src/data/seo.ts` (interface `SeoContent` et objet `seo`)
- Create: `src/components/layout/LegalPage.astro`
- Create: `src/pages/mentions-legales.astro`
- Create: `src/pages/cgu.astro`

**Interfaces:**
- Consumes: `site` (`src/data/site.ts`), `cookieTexts.footerButton` (Task 1), `breadcrumbNode(path, [{name, path}])` (`src/lib/jsonld.ts`), `PageIntro` (props `eyebrow`, `title`, `intro` ; slot `breadcrumb`), `Breadcrumb` (prop `items`), `Section`, `Button`.
- Produces: `legal`, `legalPlaceholder`, `legalLabels`, `legalLinks`, `mentionsLegales: LegalDocument`, `cgu: LegalDocument`, types `LegalSection`, `LegalDocument` ; `seo.mentionsLegales`, `seo.cgu` ; boutons `data-cookie-action="open-settings"` (câblés en Task 3).

- [ ] **Step 1: Créer `src/data/legal.ts`**

```ts
// Données légales et textes des pages Mentions légales / CGU.
// Toute valeur non fournie par le client vaut `legalPlaceholder` (surlignée au rendu) : ne jamais l'inventer.
// Textes à faire relire juridiquement avant mise en ligne (site.indexable = true).
import { site } from './site';

export const legalPlaceholder = 'À COMPLÉTER';

export const legal = {
  /** Date de dernière mise à jour des textes (ISO). */
  updatedAt: '2026-10-12',
  editeur: {
    raisonSociale: legalPlaceholder,
    formeJuridique: legalPlaceholder,
    capital: legalPlaceholder,
    siret: legalPlaceholder,
    rcs: legalPlaceholder,
    tvaIntracommunautaire: legalPlaceholder,
    directeurPublication: legalPlaceholder,
  },
  hebergeur: {
    nom: legalPlaceholder,
    adresse: legalPlaceholder,
    contact: legalPlaceholder,
  },
  mediateur: {
    nom: legalPlaceholder,
    siteWeb: legalPlaceholder,
  },
  /** Durée de conservation des données de contact après le dernier échange. */
  conservationDonnees: 'trois ans',
};

export const legalLabels = {
  toc: 'Sommaire',
  updated: 'Dernière mise à jour :',
};

export const legalLinks = [
  { label: 'Mentions légales', href: '/mentions-legales/' },
  { label: 'CGU', href: '/cgu/' },
] as const;

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  /** Affiche le bouton qui ouvre le panneau de préférences cookies. */
  cookieSettings?: boolean;
}

export interface LegalDocument {
  eyebrow: string;
  h1: string;
  intro: string;
  sections: LegalSection[];
}

const e = legal.editeur;
const h = legal.hebergeur;
const m = legal.mediateur;
const host = site.url.replace(/^https?:\/\//, '');

export const mentionsLegales: LegalDocument = {
  eyebrow: 'Informations légales',
  h1: 'Mentions légales',
  intro: `Informations relatives à l’éditeur, à l’hébergement et à l’utilisation des données du site ${site.name}.`,
  sections: [
    {
      id: 'editeur',
      title: 'Éditeur du site',
      paragraphs: [
        `Le site ${host} est édité par ${e.raisonSociale}, ${e.formeJuridique} au capital de ${e.capital}.`,
        `Siège social : ${site.address.street}, ${site.address.city}.`,
        `SIRET : ${e.siret} · RCS : ${e.rcs} · TVA intracommunautaire : ${e.tvaIntracommunautaire}.`,
        `Contact : ${site.email} · ${site.phone.display}.`,
        `Directeur de la publication : ${e.directeurPublication}.`,
      ],
    },
    {
      id: 'hebergement',
      title: 'Hébergement',
      paragraphs: [`Le site est hébergé par ${h.nom}, ${h.adresse}. Contact : ${h.contact}.`],
    },
    {
      id: 'propriete-intellectuelle',
      title: 'Propriété intellectuelle',
      paragraphs: [
        `L’ensemble des contenus du site (textes, photographies, visuels, logo, structure) est la propriété exclusive de ${site.name} ou de ses partenaires et est protégé par le droit de la propriété intellectuelle.`,
        'Toute reproduction, représentation ou adaptation, totale ou partielle, sans autorisation écrite préalable est interdite.',
      ],
    },
    {
      id: 'donnees-personnelles',
      title: 'Données personnelles',
      paragraphs: [
        `Le responsable du traitement est ${e.raisonSociale}, dont les coordonnées figurent ci-dessus.`,
        'Les données saisies dans le formulaire de contact (nom, adresse e-mail, téléphone, description du projet) sont utilisées uniquement pour répondre à votre demande et, le cas échéant, établir un devis. La base légale est l’exécution de mesures précontractuelles prises à votre demande.',
        `Elles sont conservées le temps nécessaire au traitement de votre demande, puis au plus ${legal.conservationDonnees} à compter du dernier échange. Elles ne sont ni vendues ni cédées à des tiers ; seuls ${site.name} et ses prestataires techniques y ont accès.`,
        `Conformément au RGPD et à la loi Informatique et Libertés, vous disposez d’un droit d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données. Pour l’exercer, écrivez à ${site.email}. Vous pouvez aussi introduire une réclamation auprès de la CNIL (www.cnil.fr).`,
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies et traceurs',
      paragraphs: [
        'Le site ne dépose aucun cookie de mesure d’audience ou de publicité sans votre consentement préalable. Les seuls éléments enregistrés par défaut sont strictement nécessaires au fonctionnement du site, dont la mémorisation de votre choix.',
        'Votre choix est conservé six mois ; vous pouvez le modifier à tout moment.',
      ],
      cookieSettings: true,
    },
    {
      id: 'mediation',
      title: 'Médiation de la consommation',
      paragraphs: [
        `Conformément aux articles L.611-1 et suivants du Code de la consommation, tout consommateur peut recourir gratuitement à un médiateur de la consommation pour la résolution amiable d’un litige. Médiateur : ${m.nom} — ${m.siteWeb}.`,
      ],
    },
  ],
};

export const cgu: LegalDocument = {
  eyebrow: 'Conditions d’utilisation',
  h1: 'Conditions générales d’utilisation',
  intro: `Règles d’accès et d’utilisation du site ${site.name}. En naviguant sur le site, vous les acceptez.`,
  sections: [
    {
      id: 'objet',
      title: 'Objet',
      paragraphs: [
        `Les présentes conditions générales d’utilisation (CGU) encadrent l’accès et l’utilisation du site ${host}, édité par ${e.raisonSociale} (voir les mentions légales).`,
        `Le site présente l’activité de ${site.name} (rénovation et bâtiment à Toulouse et dans sa région) et permet de la contacter pour une demande de renseignement ou de devis.`,
      ],
    },
    {
      id: 'acces',
      title: 'Accès au site',
      paragraphs: [
        'Le site est accessible gratuitement à tout utilisateur disposant d’un accès à Internet. Les frais d’accès (matériel, connexion) restent à sa charge.',
        `${site.name} s’efforce d’assurer la disponibilité du site mais peut l’interrompre à tout moment, notamment pour maintenance, sans préavis ni indemnité.`,
      ],
    },
    {
      id: 'contenus',
      title: 'Contenus et informations',
      paragraphs: [
        'Les informations publiées sur le site (descriptions de prestations, réalisations, délais, zone d’intervention) ont une valeur indicative et ne constituent pas une offre contractuelle. Seul un devis établi puis accepté par écrit engage les parties.',
      ],
    },
    {
      id: 'usage',
      title: 'Utilisation du site',
      paragraphs: [
        'L’utilisateur s’engage à utiliser le site de manière loyale, sans porter atteinte à son fonctionnement ni à sa sécurité (intrusion, extraction automatisée de contenus, transmission de code malveillant), et à ne transmettre par le formulaire que des informations exactes le concernant.',
      ],
    },
    {
      id: 'propriete-intellectuelle',
      title: 'Propriété intellectuelle',
      paragraphs: [
        'Le site et ses contenus sont protégés par le droit de la propriété intellectuelle (voir les mentions légales). Toute reproduction ou réutilisation sans autorisation écrite préalable est interdite.',
      ],
    },
    {
      id: 'responsabilite',
      title: 'Responsabilité',
      paragraphs: [
        `${site.name} ne saurait être tenu responsable des dommages directs ou indirects résultant de l’accès au site, de son indisponibilité ou de l’utilisation des informations qu’il contient, sauf faute lourde ou dol.`,
        'L’utilisateur reste responsable de la protection de son matériel et de ses données.',
      ],
    },
    {
      id: 'liens',
      title: 'Liens hypertextes',
      paragraphs: [
        `Le site peut renvoyer vers des sites tiers (réseaux sociaux, cartographie). ${site.name} n’exerce aucun contrôle sur leur contenu et décline toute responsabilité à leur égard.`,
      ],
    },
    {
      id: 'donnees-personnelles',
      title: 'Données personnelles',
      paragraphs: [
        'Le traitement des données personnelles collectées via le site est décrit dans les mentions légales (section « Données personnelles »), qui précisent vos droits et les modalités pour les exercer.',
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies',
      paragraphs: [
        'Le site ne dépose aucun cookie de mesure d’audience ou de publicité sans votre consentement. Vous pouvez gérer vos choix à tout moment.',
      ],
      cookieSettings: true,
    },
    {
      id: 'modification',
      title: 'Modification des CGU',
      paragraphs: [
        `${site.name} peut modifier les présentes CGU à tout moment. La version applicable est celle publiée sur le site à la date de la visite ; la date de dernière mise à jour figure en tête de page.`,
      ],
    },
    {
      id: 'droit-applicable',
      title: 'Droit applicable',
      paragraphs: [
        'Les présentes CGU sont régies par le droit français. Tout litige relatif à leur interprétation ou à leur exécution relève des tribunaux compétents, après tentative de résolution amiable.',
      ],
    },
  ],
};
```

- [ ] **Step 2: Étendre `src/data/seo.ts`**

Dans l'interface, remplacer :

```ts
  /** Clé = `slug` d'une entrée de corps-metier.ts. */
  metiers: Record<string, PageSeo>;
}
```

par :

```ts
  mentionsLegales: PageSeo;
  cgu: PageSeo;
  /** Clé = `slug` d'une entrée de corps-metier.ts. */
  metiers: Record<string, PageSeo>;
}
```

Puis remplacer :

```ts
export const seo: SeoContent = {
  home: {
```

par :

```ts
export const seo: SeoContent = {
  mentionsLegales: {
    title: 'Mentions légales | Experts Travaux',
    description:
      'Mentions légales du site Experts Travaux : éditeur, hébergeur, propriété intellectuelle, protection des données personnelles et gestion des cookies.',
  },
  cgu: {
    title: 'Conditions générales d’utilisation | Experts Travaux',
    description:
      'Conditions générales d’utilisation du site Experts Travaux : accès au site, propriété intellectuelle, responsabilité, données personnelles et droit applicable.',
  },
  home: {
```

- [ ] **Step 3: Créer `src/components/layout/LegalPage.astro`**

```astro
---
// Gabarit des pages légales : en-tête, sommaire ancré, sections de texte.
import Layout from '../../layouts/Layout.astro';
import Header from './Header.astro';
import Footer from './Footer.astro';
import PageIntro from '../sections/page/PageIntro.astro';
import Breadcrumb from '../ui/Breadcrumb.astro';
import Section from '../ui/Section.astro';
import Button from '../ui/Button.astro';
import { breadcrumbNode } from '../../lib/jsonld';
import { cookieTexts } from '../../data/cookies';
import { legal, legalLabels, legalPlaceholder, type LegalDocument } from '../../data/legal';

interface Props {
  path: string;
  title: string;
  description: string;
  doc: LegalDocument;
}

const { path, title, description, doc } = Astro.props;

const updated = new Date(legal.updatedAt).toLocaleDateString('fr-FR', {
  dateStyle: 'long',
  timeZone: 'UTC',
});
const chunks = (text: string) => text.split(legalPlaceholder);
---

<Layout
  title={title}
  description={description}
  path={path}
  jsonLd={[breadcrumbNode(path, [{ name: doc.h1, path }])]}
>
  <Header />
  <main id="main">
    <PageIntro eyebrow={doc.eyebrow} title={doc.h1} intro={doc.intro}>
      <Breadcrumb slot="breadcrumb" items={[{ label: doc.h1 }]} />
    </PageIntro>
    <Section>
      <div class="grid grid-cols-1 gap-space-lg desktop:grid-cols-12 desktop:gap-gutter">
        <nav aria-label={legalLabels.toc} class="desktop:col-span-4">
          <div class="flex flex-col gap-space-sm desktop:sticky desktop:top-space-2xl">
            <span class="label-md text-on-surface">{legalLabels.toc}</span>
            <ol class="flex flex-col border-l border-hairline">
              {
                doc.sections.map((section, i) => (
                  <li>
                    <a
                      href={`#${section.id}`}
                      class="inline-flex min-h-11 items-center pl-space-md text-body-md text-on-surface underline-offset-4 hover:underline"
                    >
                      {i + 1}. {section.title}
                    </a>
                  </li>
                ))
              }
            </ol>
          </div>
        </nav>
        <div class="flex flex-col gap-space-xl desktop:col-span-8">
          <p class="label-md text-on-surface-variant">{legalLabels.updated} {updated}</p>
          {
            doc.sections.map((section) => (
              <section
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                class="flex flex-col gap-space-md"
              >
                <h2 id={`${section.id}-title`} class="font-display text-headline-md text-on-surface">
                  {section.title}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p class="text-body-lg text-on-surface-editorial">
                    {chunks(paragraph).map((chunk, i) => (
                      <>
                        {i > 0 && (
                          <mark class="bg-error-container px-space-xs text-on-error-container">
                            {legalPlaceholder}
                          </mark>
                        )}
                        {chunk}
                      </>
                    ))}
                  </p>
                ))}
                {section.cookieSettings && (
                  <div>
                    <Button variant="secondary" data-cookie-action="open-settings">
                      {cookieTexts.footerButton}
                    </Button>
                  </div>
                )}
              </section>
            ))
          }
        </div>
      </div>
    </Section>
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 4: Créer `src/pages/mentions-legales.astro`**

```astro
---
import LegalPage from '../components/layout/LegalPage.astro';
import { mentionsLegales } from '../data/legal';
import { seo } from '../data/seo';
---

<LegalPage
  path="/mentions-legales/"
  title={seo.mentionsLegales.title}
  description={seo.mentionsLegales.description}
  doc={mentionsLegales}
/>
```

- [ ] **Step 5: Créer `src/pages/cgu.astro`**

```astro
---
import LegalPage from '../components/layout/LegalPage.astro';
import { cgu } from '../data/legal';
import { seo } from '../data/seo';
---

<LegalPage path="/cgu/" title={seo.cgu.title} description={seo.cgu.description} doc={cgu} />
```

- [ ] **Step 6: Build et vérification**

Run: `npm run build`
Expected: 18 pages construites, aucune erreur ; `dist/mentions-legales/index.html` et `dist/cgu/index.html` existent.

Run: `grep -c "À COMPLÉTER" dist/mentions-legales/index.html dist/cgu/index.html`
Expected: nombres > 0 (placeholders visibles, à compléter par le client).

Run: `grep -o '<h1[^>]*>' dist/cgu/index.html | wc -l`
Expected: `1`.

Run: `grep -c "sitemap" dist/robots.txt; grep -o "mentions-legales\|/cgu/" dist/sitemap-0.xml | sort -u`
Expected: les deux URLs présentes dans le sitemap.

---

### Task 3: Interface du gestionnaire de cookies

**Files:**
- Create: `src/components/layout/CookieConsent.astro`
- Modify: `src/layouts/Layout.astro` (import + montage)
- Modify: `src/components/layout/Footer.astro` (imports + bloc du bas)

**Interfaces:**
- Consumes: `getConsent`, `setConsent`, `setAllConsent`, type `ConsentChoice` (`src/lib/consent.ts`) ; `consentCategories`, `cookieTexts`, type `ConsentCategory` (`src/data/cookies.ts`) ; `site.consent.enabled` ; `legalLinks` (`src/data/legal.ts`) ; `Button` (rest props transmises à l'élément).
- Produces: tout élément portant `data-cookie-action="open-settings"` ouvre le panneau (déjà utilisé par `LegalPage.astro`) ; actions `accept`, `refuse`, `customize`, `close`.

- [ ] **Step 1: Créer `src/components/layout/CookieConsent.astro`**

```astro
---
// Bandeau de consentement + panneau de préférences (<dialog>). Piloté par data-cookie-action.
import Button from '../ui/Button.astro';
import { site } from '../../data/site';
import { consentCategories, cookieTexts as t } from '../../data/cookies';
---

<div data-cookie-root data-auto-banner={String(site.consent.enabled)}>
  <div
    data-cookie-banner
    hidden
    role="region"
    aria-label={t.banner.ariaLabel}
    class="fixed inset-x-0 bottom-0 z-[90] border-t border-hairline bg-surface-container-lowest"
  >
    <div
      class="mx-auto flex max-w-site flex-col gap-space-md px-margin py-space-lg desktop:flex-row desktop:items-center desktop:justify-between desktop:gap-gutter"
    >
      <div class="flex max-w-3xl flex-col gap-space-xs">
        <p class="text-title-md text-on-surface">{t.banner.title}</p>
        <p class="text-body-md text-on-surface-editorial">{t.banner.text}</p>
      </div>
      <div class="flex flex-col gap-space-sm sm:flex-row">
        <Button variant="primary" data-cookie-action="accept">{t.banner.accept}</Button>
        <Button variant="primary" data-cookie-action="refuse">{t.banner.refuse}</Button>
        <Button variant="secondary" data-cookie-action="customize">{t.banner.customize}</Button>
      </div>
    </div>
  </div>

  <dialog
    data-cookie-panel
    aria-labelledby="cookie-panel-title"
    class="m-auto w-[calc(100%-2*var(--spacing-margin))] max-w-lg border border-hairline bg-surface-container-lowest p-0 text-on-surface shadow-floating backdrop:bg-obsidian/60"
  >
    <form class="flex flex-col gap-space-lg p-space-lg">
      <div class="flex flex-col gap-space-sm">
        <h2 id="cookie-panel-title" class="font-display text-headline-md text-on-surface">
          {t.panel.title}
        </h2>
        <p class="text-body-md text-on-surface-editorial">{t.panel.intro}</p>
      </div>
      <ul class="flex flex-col border-t border-hairline">
        {
          consentCategories.map((category) => {
            const Row = category.required ? 'div' : 'label';
            return (
              <li class="border-b border-hairline">
                <Row class="flex items-start justify-between gap-space-md py-space-md">
                  <span class="flex flex-col gap-space-xs">
                    <span class="text-title-md text-on-surface">{category.label}</span>
                    <span class="text-body-sm text-on-surface-variant">{category.description}</span>
                  </span>
                  {category.required ? (
                    <span class="label-md shrink-0 text-on-surface">{t.panel.alwaysActive}</span>
                  ) : (
                    <input
                      type="checkbox"
                      data-category={category.id}
                      class="mt-space-xs h-6 w-6 shrink-0 accent-obsidian"
                    />
                  )}
                </Row>
              </li>
            );
          })
        }
      </ul>
      <div class="flex flex-col gap-space-sm sm:flex-row">
        <Button type="submit" variant="primary">{t.panel.save}</Button>
        <Button variant="secondary" data-cookie-action="close">{t.panel.close}</Button>
      </div>
    </form>
  </dialog>
</div>

<script>
  import { getConsent, setAllConsent, setConsent } from '../../lib/consent';
  import type { ConsentChoice } from '../../lib/consent';
  import type { ConsentCategory } from '../../data/cookies';

  const root = document.querySelector<HTMLElement>('[data-cookie-root]');
  const banner = root?.querySelector<HTMLElement>('[data-cookie-banner]');
  const panel = root?.querySelector<HTMLDialogElement>('[data-cookie-panel]');
  const form = panel?.querySelector<HTMLFormElement>('form');

  if (root && banner && panel && form) {
    const autoBanner = root.dataset.autoBanner === 'true';
    const checkboxes = () => form.querySelectorAll<HTMLInputElement>('input[data-category]');

    const refreshBanner = () => {
      banner.hidden = !(autoBanner && getConsent() === null);
    };
    const closePanel = () => {
      if (panel.open) panel.close();
    };
    const openPanel = () => {
      const current = getConsent();
      checkboxes().forEach((input) => {
        input.checked = current?.[input.dataset.category as ConsentCategory] ?? false;
      });
      banner.hidden = true;
      if (!panel.open) panel.showModal();
    };
    const decide = (granted: boolean) => {
      setAllConsent(granted);
      closePanel();
      refreshBanner();
    };

    const actions: Record<string, () => void> = {
      accept: () => decide(true),
      refuse: () => decide(false),
      customize: openPanel,
      'open-settings': openPanel,
      close: closePanel,
    };

    document.addEventListener('click', (event) => {
      const trigger = (event.target as Element).closest<HTMLElement>('[data-cookie-action]');
      actions[trigger?.dataset.cookieAction ?? '']?.();
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const choice = {} as ConsentChoice;
      checkboxes().forEach((input) => {
        choice[input.dataset.category as ConsentCategory] = input.checked;
      });
      setConsent(choice);
      closePanel();
      refreshBanner();
    });

    // Échap ou « Fermer » sans choix : le bandeau réapparaît.
    panel.addEventListener('close', refreshBanner);

    refreshBanner();
  }
</script>
```

- [ ] **Step 2: Monter le composant dans `src/layouts/Layout.astro`**

Après la ligne `import { site } from '../data/site';`, ajouter :

```astro
import CookieConsent from '../components/layout/CookieConsent.astro';
```

Puis remplacer :

```astro
    <slot />
  </body>
```

par :

```astro
    <CookieConsent />
    <slot />
  </body>
```

(Le composant est placé juste après le lien d'évitement : un utilisateur clavier atteint le bandeau en premier.)

- [ ] **Step 3: Modifier `src/components/layout/Footer.astro`**

Ajouter les imports après `import Logo from '../ui/Logo.astro';` :

```astro
import { legalLinks } from '../../data/legal';
import { cookieTexts } from '../../data/cookies';
```

Remplacer le bloc final :

```astro
    <p class="mt-12 border-t border-hairline-inverse pt-8 text-body-sm text-inverse-on-surface/80">
      © {year} {site.name} - {site.legalLine}
    </p>
```

par :

```astro
    <div
      class="mt-12 flex flex-col gap-space-md border-t border-hairline-inverse pt-8 md:flex-row md:items-center md:justify-between"
    >
      <p class="text-body-sm text-inverse-on-surface/80">
        © {year} {site.name} - {site.legalLine}
      </p>
      <ul class="flex flex-wrap gap-x-space-lg">
        {
          legalLinks.map((link) => (
            <li>
              <a href={link.href} class={linkClass}>
                {link.label}
              </a>
            </li>
          ))
        }
        <li>
          <button type="button" data-cookie-action="open-settings" class={linkClass}>
            {cookieTexts.footerButton}
          </button>
        </li>
      </ul>
    </div>
```

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: build OK, aucune erreur ni avertissement TypeScript/Vite lié aux nouveaux fichiers.

- [ ] **Step 5: Vérifier le HTML généré**

Run: `grep -c 'data-cookie-root' dist/index.html dist/cgu/index.html dist/maintenance/index.html`
Expected: `1` pour chaque fichier.

Run: `grep -o 'data-auto-banner="[a-z]*"' dist/index.html`
Expected: `data-auto-banner="false"`.

Run: `grep -c 'data-cookie-action="open-settings"' dist/index.html dist/cgu/index.html`
Expected: `1` (footer) pour la home, `2` (footer + section cookies) pour `/cgu/`.

- [ ] **Step 6: Vérifier le comportement dans le navigateur**

Run: `npx astro dev --background` puis `npx astro dev status` (noter l'URL). Ne jamais utiliser `pkill -f` : arrêter avec `npx astro dev stop`.

Avec Chrome DevTools MCP (`navigate_page`, `take_snapshot`, `click`, `evaluate_script`, `resize_page`), sur la home :

1. `enabled: false` : aucun bandeau visible. Clic sur « Gérer mes cookies » (footer) : le panneau s'ouvre, Échap le ferme, le focus revient au bouton.
2. Passer `site.consent.enabled` à `true` dans `src/data/site.ts`, recharger : le bandeau apparaît, premier arrêt de tabulation après le lien d'évitement.
3. « Tout refuser » : bandeau masqué ; `localStorage['et-consent']` contient `{"v":1,"categories":{"mesure-audience":false},"expiresAt":…}` ; rechargement : bandeau absent.
4. Footer → « Gérer mes cookies » → cocher « Mesure d'audience » → « Enregistrer mes choix » : `categories.mesure-audience === true`.
5. Vider `localStorage`, recharger, ouvrir « Personnaliser » puis Échap : le bandeau réapparaît.
6. Tailles 375 / 768 / 1440 px : bandeau et panneau sans débordement horizontal, boutons empilés en mobile.

Remettre `site.consent.enabled` à `false` après les essais, puis `npx astro dev stop`.

---

### Task 4: Qualité et clôture

**Files:** aucun nouveau fichier.

- [ ] **Step 1: Build propre + tests**

Run: `npm test && npm run build`
Expected: `pass 7 / fail 0`, puis build OK.

- [ ] **Step 2: Contrôle des valeurs de style**

Run: `grep -nE "#[0-9a-fA-F]{3,8}\b|[0-9]+px" src/components/layout/CookieConsent.astro src/components/layout/LegalPage.astro src/components/layout/Footer.astro`
Expected: aucune ligne (tokens uniquement).

- [ ] **Step 3: Passe `qa-review`**

Lancer l'agent `qa-review` sur `/mentions-legales/`, `/cgu/`, le bandeau et le panneau : build, contraste AA, navigation clavier (focus piégé dans le `<dialog>`, Échap), responsive 375/768/1440, conformité à `DESIGN.md`.

- [ ] **Step 4: Passe `seo-perf`**

Lancer l'agent `seo-perf` : title/description des 2 pages (longueurs), canonical, présence au sitemap, JSON-LD `BreadcrumbList`, absence d'impact Lighthouse (script ~1 Ko, aucune requête externe).

- [ ] **Step 5: Inventaire des valeurs à compléter**

Run: `grep -o "legalPlaceholder" src/data/legal.ts | wc -l` puis lister les champs concernés dans `legal` (éditeur ×7, hébergeur ×3, médiateur ×2).
Remettre cette liste à Hery pour transmission au client.

---

## Notes d'exécution

- Le formulaire de `Contact.astro` n'a ni `action` ni gestionnaire d'envoi : il ne transmet rien aujourd'hui. Le texte RGPD décrit l'usage prévu ; à vérifier au branchement du formulaire (destinataires, prestataire d'envoi).
- Durée de conservation (« trois ans »), médiation, clause de responsabilité et juridiction sont des choix rédactionnels par défaut : relecture juridique avant `indexable: true`.
- Brancher plus tard un outil analytics : `onConsent('mesure-audience', () => { /* charger le script */ })` depuis un script de `Layout.astro`, puis `site.consent.enabled = true`.
