'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * El contador propio de visitas, sin cookies (CRM, migración 104).
 *
 * Google Analytics solo ve a quien acepta «Analítica»; Meta reportaba 92
 * visitas y GA 30. Esto cuenta a todos porque NO identifica a nadie: no
 * guarda cookies ni nada en el navegador, no manda IP ni ids — solo la
 * página, el idioma, las UTMs de la campaña, si es teléfono y de qué sitio
 * venía. Por eso no necesita permiso (lo dice /privacidad).
 */
const DESTINO = 'https://crm.pawwerapp.com/api/landing/visita';
const UTMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const;

function mandar(datos: Record<string, unknown>) {
  try {
    const cuerpo = JSON.stringify(datos);
    // text/plain: así no hay preflight y sendBeacon sobrevive al cambio de página.
    if (navigator.sendBeacon?.(DESTINO, new Blob([cuerpo], { type: 'text/plain' }))) return;
    fetch(DESTINO, { method: 'POST', body: cuerpo, keepalive: true, mode: 'cors' }).catch(() => {});
  } catch { /* contar nunca rompe la página */ }
}

function base() {
  const url = new URL(location.href);
  const d: Record<string, unknown> = {
    pagina: url.pathname.slice(0, 120),
    idioma: url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'es',
    movil: window.matchMedia?.('(max-width: 760px)').matches || false,
  };
  for (const k of UTMS) { const v = url.searchParams.get(k); if (v) d[k] = v.slice(0, 120); }
  return d;
}

export default function ContadorVisitas() {
  const ruta = usePathname();

  useEffect(() => {
    if (location.hostname === 'localhost') return;
    mandar({ ...base(), tipo: 'visita', referencia: document.referrer || null });
  }, [ruta]);

  useEffect(() => {
    if (location.hostname === 'localhost') return;
    const alClic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null;
      if (a && /^https:\/\/crm\.pawwerapp\.com/.test(a.href)) mandar({ ...base(), tipo: 'clic_app' });
    };
    document.addEventListener('click', alClic, true);
    return () => document.removeEventListener('click', alClic, true);
  }, []);

  return null;
}
