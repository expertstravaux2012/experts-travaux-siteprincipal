import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { llmsDocument } from '../data/llms';
import { buildLlmsTxt } from '../lib/llms';

// Piloté par site.indexable (src/data/site.ts), comme robots.txt : 404 tant que le site est en construction
// (Lighthouse classe alors l'audit « llms.txt » en Non applicable), servi au lancement.
export const GET: APIRoute = () =>
  site.indexable
    ? new Response(buildLlmsTxt(llmsDocument), {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
      })
    : new Response(null, { status: 404 });
