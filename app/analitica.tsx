'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Google Analytics 4 de la landing, SOLO con permiso.
 *
 * El script de Google no se descarga hasta que la persona acepta
 * «Analítica» en el aviso de cookies (llave `pawwer:cookie-consent:v1`).
 * Si después la quita, se marca `analytics_storage: denied` y deja de medir.
 * Los datos los lee el Panel PAWWER (crm) para decidir anuncios.
 */
const ID = 'G-410VQLYB5L';
const KEY = 'pawwer:cookie-consent:v1';

type Ventana = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };

function conPermiso() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null')?.analytics === true; } catch { return false; }
}

function cargar() {
  const w = window as Ventana;
  if (!w.gtag) {
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() { w.dataLayer!.push(arguments); };
    w.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    w.gtag('js', new Date());
    w.gtag('config', ID, { send_page_view: false });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
    document.head.appendChild(s);
  }
  w.gtag('consent', 'update', { analytics_storage: 'granted' });
}

export function medir(evento: string, datos: Record<string, unknown> = {}) {
  const w = window as Ventana;
  if (w.gtag && conPermiso()) w.gtag('event', evento, datos);
}

export default function Analitica() {
  const pathname = usePathname();

  useEffect(() => {
    if (conPermiso()) cargar();
    const alCambiar = (e: Event) => {
      const ok = (e as CustomEvent).detail?.analytics === true;
      if (ok) { cargar(); medir('page_view', { page_path: location.pathname + location.search }); }
      else (window as Ventana).gtag?.('consent', 'update', { analytics_storage: 'denied' });
    };
    window.addEventListener('pawwer:cookie-consent', alCambiar);
    // Clics a la app (crear cuenta, elegir plan): la conversión que importa.
    const alClic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a');
      if (a && /crm\.pawwerapp\.com/.test(a.href)) {
        const plan = new URL(a.href).searchParams.get('plan') || '';
        medir('ir_a_la_app', { plan, texto: (a.textContent || '').trim().slice(0, 60) });
      }
    };
    document.addEventListener('click', alClic);
    return () => { window.removeEventListener('pawwer:cookie-consent', alCambiar); document.removeEventListener('click', alClic); };
  }, []);

  useEffect(() => {
    medir('page_view', { page_path: location.pathname + location.search });
  }, [pathname]);

  return null;
}
