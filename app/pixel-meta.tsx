'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Meta Pixel de PAWWER (1915346279872727), SOLO con permiso de «Marketing».
 *
 * El script de Meta no se descarga hasta que la persona acepta Marketing en
 * el aviso de cookies; si después lo quita, `fbq('consent', 'revoke')`.
 * Manda `PageView` en cada página y `Lead` al dar clic hacia la app (el
 * paso antes de crear la cuenta). `StartTrial` y `Purchase` NO salen de
 * aquí: los manda el CRM por Conversions API cuando Dodo los confirma, así
 * que no hay nada que duplicar.
 *
 * El `_fbp` que crea el pixel lo pasa `pasar-utms.tsx` al CRM, para que el
 * evento del servidor se una con esta visita.
 */
const PIXEL = '1915346279872727';
const KEY = 'pawwer:cookie-consent:v1';

type Fbq = ((...a: unknown[]) => void) & { callMethod?: (...a: unknown[]) => void; queue?: unknown[]; loaded?: boolean; version?: string; push?: unknown };
type Ventana = Window & { fbq?: Fbq; _fbq?: Fbq };

function conPermiso() {
  try { return JSON.parse(localStorage.getItem(KEY) || 'null')?.marketing === true; } catch { return false; }
}

function cargar() {
  const w = window as Ventana;
  if (!w.fbq) {
    const fbq = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args); else fbq.queue!.push(args);
    } as Fbq;
    fbq.push = fbq; fbq.loaded = true; fbq.version = '2.0'; fbq.queue = [];
    w.fbq = fbq; w._fbq = fbq;
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    document.head.appendChild(s);
    w.fbq('init', PIXEL);
  }
  w.fbq('consent', 'grant');
}

function evento(nombre: string, datos?: Record<string, unknown>) {
  const w = window as Ventana;
  if (w.fbq && conPermiso()) w.fbq('track', nombre, datos);
}

export default function PixelMeta() {
  const pathname = usePathname();

  useEffect(() => {
    if (conPermiso()) cargar();
    const alCambiar = (e: Event) => {
      if ((e as CustomEvent).detail?.marketing === true) { cargar(); evento('PageView'); }
      else (window as Ventana).fbq?.('consent', 'revoke');
    };
    window.addEventListener('pawwer:cookie-consent', alCambiar);
    const alClic = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a');
      if (a && /crm\.pawwerapp\.com/.test(a.href)) {
        evento('Lead', { content_name: new URL(a.href).searchParams.get('plan') || 'general' });
      }
    };
    document.addEventListener('click', alClic);
    return () => { window.removeEventListener('pawwer:cookie-consent', alCambiar); document.removeEventListener('click', alClic); };
  }, []);

  useEffect(() => { evento('PageView'); }, [pathname]);

  return null;
}
