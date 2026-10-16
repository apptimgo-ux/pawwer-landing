'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { promocionVigente } from './promociones-anuales';
import type { Locale } from './site-content';
import estilos from './promocion-anual.module.css';

export const PROMOCION_RECLAMADA = 'pawwer:promocion-anual-reclamada';

export default function PromocionAnual({ locale }: { locale: Locale }) {
  const [codigo, setCodigo] = useState<string | null>(null);
  const cerrarRef = useRef<HTMLButtonElement>(null);
  const promocion = promocionVigente(codigo);

  useEffect(() => {
    const activa = promocionVigente();
    if (!activa) return;
    try {
      if (sessionStorage.getItem(`pawwer:promocion-oculta:${activa.codigo}`) === '1'
        || sessionStorage.getItem(PROMOCION_RECLAMADA) === activa.codigo) return;
    } catch { /* La oferta puede mostrarse aunque el almacenamiento esté deshabilitado. */ }
    setCodigo(activa.codigo);
  }, []);

  useEffect(() => {
    if (!promocion) return;
    const anterior = document.activeElement as HTMLElement | null;
    const cerrarConEscape = (evento: KeyboardEvent) => { if (evento.key === 'Escape') cerrar(); };
    document.addEventListener('keydown', cerrarConEscape);
    cerrarRef.current?.focus();
    return () => { document.removeEventListener('keydown', cerrarConEscape); anterior?.focus?.(); };
    // cerrar solo usa el código vigente de esta apertura.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codigo]);

  if (!promocion) return null;
  const en = locale === 'en';
  const halloween = promocion.campana === 'halloween';
  const imagen = `/promociones/anual-2026/${halloween ? 'halloween' : 'navidad'}-pawwer${en ? '-en' : ''}.webp`;
  const fecha = halloween
    ? en ? 'Through October 31, 2026 · Culiacán time' : 'Hasta el 31 de octubre de 2026 · hora de Culiacán'
    : en ? 'November 1–December 25, 2026 · Culiacán time' : 'Del 1 de noviembre al 25 de diciembre de 2026 · hora de Culiacán';

  function cerrar() {
    if (!promocion) return;
    try { sessionStorage.setItem(`pawwer:promocion-oculta:${promocion.codigo}`, '1'); } catch { /* sin almacenamiento */ }
    setCodigo(null);
  }

  function reclamar() {
    if (!promocion) return;
    try { sessionStorage.setItem(PROMOCION_RECLAMADA, promocion.codigo); } catch { /* El checkout volverá a validar la oferta. */ }
    setCodigo(null);
    window.dispatchEvent(new Event('pawwer:promocion-anual-reclamada'));
    document.getElementById('planes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className={estilos.fondo} onMouseDown={e => { if (e.target === e.currentTarget) cerrar(); }}>
      <section className={estilos.ventana} role="dialog" aria-modal="true" aria-labelledby="promocion-anual-titulo">
        <button ref={cerrarRef} type="button" className={estilos.cerrar} onClick={cerrar} aria-label={en ? 'Close offer' : 'Cerrar oferta'}><X size={20} /></button>
        <Image src={imagen} alt={en ? 'Pawwer seasonal annual offer' : 'Oferta anual de temporada Pawwer'} width={600} height={900} sizes="(max-width: 560px) 100vw, 480px" className={estilos.imagen} priority />
        <div className={estilos.contenido}>
          <p className={estilos.ceja}>{en ? 'Limited-time annual offer' : 'Oferta anual por tiempo limitado'}</p>
          <h2 id="promocion-anual-titulo">{halloween ? en ? 'Make the most of Halloween' : 'Aprovecha Halloween' : en ? 'A holiday gift for your business' : 'Un regalo de Navidad para tu negocio'}</h2>
          <p className={estilos.ahorro}>{en ? 'Save 25% versus monthly payments' : 'Ahorra 25% frente al pago mensual'}</p>
          <p className={estilos.detalle}>{en ? 'Pay for 9 months and enjoy 12 on your first annual payment. Choose a plan and create your account to see the discount in Dodo’s secure checkout.' : 'Paga 9 meses y disfruta 12 en tu primer pago anual. Elige un plan y crea tu cuenta para ver el descuento en el checkout seguro de Dodo.'}</p>
          <p className={estilos.fecha}>{fecha} · {en ? 'Code' : 'Código'} <strong>{promocion.codigo}</strong></p>
          <button type="button" className={estilos.accion} onClick={reclamar}>{en ? 'Choose an annual plan' : 'Elegir plan anual'}</button>
          <button type="button" className={estilos.despues} onClick={cerrar}>{en ? 'Maybe later' : 'Ahora no'}</button>
        </div>
      </section>
    </div>
  );
}
