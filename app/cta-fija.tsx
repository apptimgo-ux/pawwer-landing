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
  // La página de distribuidores usa la misma lógica, con su sección y su texto.
  const distribuidores = pathname === '/distribuidores' || pathname === '/en/distributors';
  const seccion = distribuidores ? 'membresias' : 'planes';
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let planesEnPantalla = false;
    const planes = document.getElementById(seccion);
    const observador = planes ? new IntersectionObserver(([e]) => { planesEnPantalla = e.isIntersecting; revisar(); }, { threshold: 0.05 }) : null;
    if (planes && observador) observador.observe(planes);
    function revisar() { setVisible(window.scrollY > 650 && !planesEnPantalla); }
    window.addEventListener('scroll', revisar, { passive: true });
    revisar();
    return () => { window.removeEventListener('scroll', revisar); observador?.disconnect(); };
  }, [pathname, seccion]);

  // Solo en las páginas de la landing que tienen planes.
  if (!(pathname === '/' || pathname === '/en' || distribuidores)) return null;

  return (
    <div className={`cta-fija${visible ? ' visible' : ''}`}>
      <a href={`#${seccion}`}>{distribuidores ? (english ? 'Become a distributor' : 'Quiero ser distribuidor') : (english ? 'Start your 7-day trial' : 'Empieza tu prueba de 7 días')}</a>
    </div>
  );
}
