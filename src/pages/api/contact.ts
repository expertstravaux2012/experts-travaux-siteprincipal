import type { APIRoute } from 'astro';
import { autoReply } from '../../data/contact';
import { site } from '../../data/site';
import { buildMailjetPayload, contactMaxBodyBytes, parseContact } from '../../lib/contact';
import { turnstileAction, turnstileTokenFrom, verifyTurnstile } from '../../lib/turnstile';

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

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (request.headers.get('origin') !== new URL(request.url).origin) return respond(403, false);
  if (Number(request.headers.get('content-length')) > contactMaxBodyBytes) return respond(413, false);

  const raw = await request.text();
  if (raw.length > contactMaxBodyBytes) return respond(413, false);
  const body = safeJson(raw);
  const parsed = parseContact(body);
  if (parsed.kind === 'spam') return respond(200, true);
  if (parsed.kind === 'invalid') return respond(400, false);

  const turnstileSecret = import.meta.env.TURNSTILE_SECRET_KEY;
  if (!turnstileSecret) {
    console.error('Turnstile : TURNSTILE_SECRET_KEY manquante');
    return respond(500, false);
  }
  if (!(await verifyTurnstile(turnstileTokenFrom(body), turnstileSecret, clientAddress, turnstileAction))) {
    return respond(403, false);
  }

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
    body: JSON.stringify(buildMailjetPayload(parsed.value, site.email, site.quoteEmail, site.name, autoReply)),
  }).catch(() => null);

  const result = (await response?.json().catch(() => null)) as { Messages?: { Status?: string }[] } | null;
  const [internal, ack] = result?.Messages ?? [];
  const requestSent = internal ? internal.Status === 'success' : Boolean(response?.ok);
  if (!requestSent) {
    console.error('Mailjet : échec de l’envoi', response?.status, JSON.stringify(result));
    return respond(502, false);
  }
  if (ack && ack.Status !== 'success') console.error('Mailjet : échec de l’accusé de réception', JSON.stringify(ack));
  return respond(200, true);
};

export const ALL: APIRoute = () =>
  new Response(JSON.stringify({ ok: false }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST' },
  });
