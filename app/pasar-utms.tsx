'use client';

import { useEffect } from 'react';

/**
 * Lleva la atribución de la visita hasta el alta en el CRM.
 *
 * Antes los botones mandaban a `crm.pawwerapp.com/?plan=starter` sin las
 * UTMs con las que llegó la visita, así que toda prueba de un anuncio salía
 * «sin atribución» en Panel PAWWER → Adquisición (bloqueo de la campaña de
 * octubre de 2026).
 *
 * - Las UTMs se guardan al llegar (primer toque, 30 días, `localStorage`):
 *   quien entra por un anuncio, lee el blog y vuelve al día siguiente sigue
 *   contando para ese anuncio.
 * - Los click ids (fbclid, gclid…) SOLO viajan con permiso de «Marketing»
 *   en el aviso de cookies, y entonces va `ad_consent=granted`, que es lo
 *   que el CRM exige para guardarlos (`marketingAttribution.js`).
 * - Se agregan al enlace en el momento del clic, así cubre también los
 *   botones que se pintan después.
 */
const UTMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];
const CLICS = ['fbclid', 'gclid', 'gbraid', 'wbraid'];
const LLAVE = 'pawwer:atribucion-landing:v1';
const CONSENTIMIENTO = 'pawwer:cookie-consent:v1';
const VIDA = 30 * 86400000;

type Guardado = { datos: Record<string, string>; guardado: number };

function leer(): Guardado | null {
  try {
    const g = JSON.parse(localStorage.getItem(LLAVE) || 'null') as Guardado | null;
    return g && Date.now() - g.guardado < VIDA ? g : null;
  } catch { return null; }
}

function conMarketing() {
  try { return JSON.parse(localStorage.getItem(CONSENTIMIENTO) || 'null')?.marketing === true; } catch { return false; }
}

function cookie(nombre: string) {
  const m = document.cookie.match(new RegExp(`(?:^|; )${nombre}=([^;]*)`));
  return m ? decodeURIComponent(m[1]) : '';
}

export default function PasarUtms() {
  useEffect(() => {
    const url = new URL(location.href);
    const nuevos: Record<string, string> = {};
    for (const k of [...UTMS, ...CLICS]) {
      const v = url.searchParams.get(k);
      if (v) nuevos[k] = v.slice(0, 200);
    }
    // Una visita con UTMs nuevas reemplaza a la anterior; sin UTMs no borra nada.
    if (Object.keys(nuevos).length) {
      try { localStorage.setItem(LLAVE, JSON.stringify({ datos: nuevos, guardado: Date.now() })); } catch { /* modo privado */ }
    }

    const alClic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a') as HTMLAnchorElement | null;
      if (!a || !/^https:\/\/crm\.pawwerapp\.com/.test(a.href)) return;
      const datos = { ...(leer()?.datos || {}), ...nuevos };
      const destino = new URL(a.href);
      for (const k of UTMS) if (datos[k] && !destino.searchParams.has(k)) destino.searchParams.set(k, datos[k]);
      if (conMarketing()) {
        for (const k of CLICS) if (datos[k]) destino.searchParams.set(k, datos[k]);
        const fbp = cookie('_fbp'); if (fbp) destino.searchParams.set('fbp', fbp);
        const fbc = cookie('_fbc'); if (fbc) destino.searchParams.set('fbc', fbc);
        destino.searchParams.set('ad_consent', 'granted');
      }
      a.href = destino.toString();
    };
    document.addEventListener('click', alClic, true);
    return () => document.removeEventListener('click', alClic, true);
  }, []);

  return null;
}
