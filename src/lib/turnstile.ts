const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export const turnstileAction = 'contact';

export function turnstileTokenFrom(body: unknown): string {
  const token = (body as Record<string, unknown> | null)?.['cf-turnstile-response'];
  return typeof token === 'string' ? token : '';
}

/** Vérifie le jeton Turnstile auprès de Cloudflare. Toute erreur (réseau, HTTP, réponse) = refus. */
export async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string | undefined,
  action: string,
  fetchImpl: typeof fetch = fetch,
): Promise<boolean> {
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set('remoteip', ip);
  try {
    const response = await fetchImpl(SITEVERIFY_URL, {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return false;
    const result = (await response.json()) as { success?: boolean; action?: string };
    return result.success === true && result.action === action;
  } catch {
    return false;
  }
}
