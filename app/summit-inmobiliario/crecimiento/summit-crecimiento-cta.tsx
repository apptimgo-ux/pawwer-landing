'use client';

import type { MouseEvent, ReactNode } from 'react';
import styles from './summit-crecimiento.module.css';

export default function SummitCrecimientoCta({ href, contenido, children }: { href: string; contenido: string; children: ReactNode }) {
  function registrarClic() {
    const params = new URLSearchParams(window.location.search);
    const body = {
      tipo: 'clic_app',
      pagina: '/summit-inmobiliario/crecimiento',
      idioma: 'es',
      movil: window.matchMedia('(max-width: 800px)').matches,
      utm_source: params.get('utm_source') || 'summit_inmobiliario_aisin',
      utm_medium: params.get('utm_medium') || 'landing_plan',
      utm_campaign: params.get('utm_campaign') || 'summit_2026_crecimiento_anual',
      utm_content: contenido,
      referencia: document.referrer || null,
    };
    try {
      navigator.sendBeacon('https://crm.pawwerapp.com/api/landing/visita', new Blob([JSON.stringify(body)], { type: 'text/plain;charset=UTF-8' }));
    } catch { /* El enlace al registro debe funcionar aunque falle la medición. */ }
  }

  function onClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) registrarClic();
  }

  return <a className={styles.primary} href={href} onClick={onClick}>{children}</a>;
}