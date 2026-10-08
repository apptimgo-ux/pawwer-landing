'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * El botón de empezar, siempre a la mano en el teléfono (8 de octubre de
 * 2026). Casi todo el tráfico de Meta es de celular, y quien bajaba a ver
 * la galería o la metodología perdía de vista cómo empezar.
 *
 * Aparece después del primer bloque (ahí ya está el botón del héroe) y se
 * esconde mientras los planes están en pantalla, para no tapar sus botones.
 */
export default function CtaFija() {
  const pathname = usePathname();
  const english = pathname.startsWith('/en');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let planesEnPantalla = false;
    const planes = document.getElementById('planes');
    const observador = planes ? new IntersectionObserver(([e]) => { planesEnPantalla = e.isIntersecting; revisar(); }, { threshold: 0.05 }) : null;
    if (planes && observador) observador.observe(planes);
    function revisar() { setVisible(window.scrollY > 650 && !planesEnPantalla); }
    window.addEventListener('scroll', revisar, { passive: true });
    revisar();
    return () => { window.removeEventListener('scroll', revisar); observador?.disconnect(); };
  }, [pathname]);

  // Solo en las páginas de la landing que tienen planes.
  if (!(pathname === '/' || pathname === '/en')) return null;

  return (
    <div className={`cta-fija${visible ? ' visible' : ''}`}>
      <a href="#planes">{english ? 'Start your 3-day trial' : 'Empieza tu prueba de 3 días'}</a>
    </div>
  );
}
