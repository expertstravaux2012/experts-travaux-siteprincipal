import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildLlmsTxt } from './llms.ts';

const doc = {
  name: 'Entreprise',
  summary: 'Résumé court.',
  details: ['Détail un.'],
  sections: [
    {
      title: 'Pages',
      links: [
        { label: 'Accueil', url: 'https://exemple.fr/', description: 'Page d’accueil' },
        { label: 'Contact', url: 'https://exemple.fr/contact/' },
      ],
    },
    { title: 'Vide', links: [] },
  ],
};

test('commence par un H1 suivi du résumé en blockquote', () => {
  const lines = buildLlmsTxt(doc).split('\n');
  assert.equal(lines[0], '# Entreprise');
  assert.equal(lines[2], '> Résumé court.');
});

test('rend les liens en liste Markdown, description facultative', () => {
  const out = buildLlmsTxt(doc);
  assert.match(out, /^## Pages\n- \[Accueil\]\(https:\/\/exemple\.fr\/\): Page d’accueil\n- \[Contact\]\(https:\/\/exemple\.fr\/contact\/\)$/m);
});

test('omet les sections sans lien et finit par un saut de ligne', () => {
  const out = buildLlmsTxt(doc);
  assert.doesNotMatch(out, /## Vide/);
  assert.ok(out.endsWith(')\n'));
});
