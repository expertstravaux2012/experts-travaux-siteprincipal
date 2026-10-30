import { gaMeasurementId } from '../data/analytics';
import { onConsent } from './consent';

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const loadGoogleAnalytics = (id: string) => {
  window.dataLayer = window.dataLayer || [];
  // gtag.js attend l'objet `arguments`, pas un tableau.
  function gtag(..._args: unknown[]) {
    window.dataLayer!.push(arguments);
  }
  gtag('js', new Date());
  gtag('config', id);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(script);
};

const whenIdle = (fn: () => void) =>
  'requestIdleCallback' in window ? window.requestIdleCallback(fn, { timeout: 4000 }) : setTimeout(fn, 2000);

/** Charge GA4 uniquement après consentement « mesure d'audience », hors chemin critique. */
export function initAnalytics(): void {
  onConsent('mesure-audience', () => whenIdle(() => loadGoogleAnalytics(gaMeasurementId)));
}
