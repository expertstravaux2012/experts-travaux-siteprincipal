import type { APIRoute } from 'astro';
import { site } from '../../data/site';
import { buildMailjetPayload, contactMaxBodyBytes, parseContact } from '../../lib/contact';

export const prerender = false;

const MAILJET_SEND_URL = 'https://api.mailjet.com/v3.1/send';

const respond = (status: number, ok: boolean) =>
  new Response(JSON.stringify({ ok }), { status, headers: { 'Content-Type': 'application/json' } });

const safeJson = (raw: string): unknown => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get('origin') !== new URL(request.url).origin) return respond(403, false);
  if (Number(request.headers.get('content-length')) > contactMaxBodyBytes) return respond(413, false);

  const raw = await request.text();
  if (raw.length > contactMaxBodyBytes) return respond(413, false);
  const parsed = parseContact(safeJson(raw));
  if (parsed.kind === 'spam') return respond(200, true);
  if (parsed.kind === 'invalid') return respond(400, false);

  const apiKey = import.meta.env.MAILJET_API_KEY;
  const apiSecret = import.meta.env.MAILJET_API_SECRET;
  if (!apiKey || !apiSecret) {
    console.error('Mailjet : MAILJET_API_KEY / MAILJET_API_SECRET manquantes');
    return respond(500, false);
  }

  const response = await fetch(MAILJET_SEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${apiKey}:${apiSecret}`)}`,
    },
    body: JSON.stringify(buildMailjetPayload(parsed.value, site.email, site.name)),
  }).catch(() => null);

  if (!response?.ok) {
    console.error('Mailjet : échec de l’envoi', response?.status, await response?.text());
    return respond(502, false);
  }
  return respond(200, true);
};

export const ALL: APIRoute = () =>
  new Response(JSON.stringify({ ok: false }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });
