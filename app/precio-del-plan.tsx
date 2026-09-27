'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

/**
 * EL PRECIO Y EL BOTÓN DEL DETALLE DE UN PLAN, SEGÚN MES O AÑO.
 *
 * Las páginas de detalle son ESTÁTICAS (`dynamicParams = false`), así que
 * el periodo no puede venir del servidor: llega en la dirección
 * (`?periodo=anual`) desde la tarjeta de precios y se lee aquí.
 *
 * ⚠️ Arranca en mensual y corrige después de montar, a propósito. El HTML
 * que se genera una sola vez es el mensual, y si se leyera la dirección
 * durante el render el servidor y el navegador pintarían cosas distintas
 * —error de hidratación—. Un parpadeo en el precio es mejor que una
 * página rota, y solo lo ve quien llegó pidiendo el anual.
 *
 * El periodo sigue viaje al CRM en el enlace. Allá es una PROPUESTA: se
 * preselecciona y se puede cambiar. Lo que se cobra sale del producto de
 * Dodo, nunca de esta URL.
 */
export default function PrecioDelPlan({
  precio, precioAnual, ahorro, unidad, unidadAnual, ahorroTexto,
  href, etiqueta, hrefVentas, etiquetaVentas, sinPrecio = false,
}: {
  precio: string;
  precioAnual: string;
  ahorro: string;
  unidad: string;
  unidadAnual: string;
  ahorroTexto: string;
  href: string;
  etiqueta: string;
  hrefVentas: string;
  etiquetaVentas: string;
  /** El CTA repetido al pie: los mismos botones, sin repetir el precio. */
  sinPrecio?: boolean;
}) {
  const [anual, setAnual] = useState(false);

  useEffect(() => {
    try {
      setAnual(new URLSearchParams(window.location.search).get('periodo') === 'anual');
    } catch {
      // Sin `location` legible se queda en mensual, que es lo que ya se pintó.
    }
  }, []);

  const conAnual = anual && Boolean(precioAnual);
  // El CRM lee `periodo` de la dirección y preselecciona ese periodo.
  const hrefFinal = conAnual ? `${href}${href.includes('?') ? '&' : '?'}periodo=anual` : href;

  return (
    <>
      {!sinPrecio && (
        <>
          <div className="plan-detail__price">
            {conAnual ? precioAnual : precio}
            <span>{conAnual ? unidadAnual : unidad}</span>
          </div>
          {conAnual && ahorro && (
            <p className="plan__ahorro">{ahorroTexto.replace('{0}', ahorro)}</p>
          )}
        </>
      )}
      <div className="plan-detail__actions">
        <a className="btn btn--solid" href={hrefFinal}>{etiqueta} <ArrowUpRight size={18} /></a>
        <a className="textlink" href={hrefVentas}>{etiquetaVentas}</a>
      </div>
    </>
  );
}
