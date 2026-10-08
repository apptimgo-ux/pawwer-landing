'use client';

import { useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { planHref, type Locale, type Plan } from './site-content';

/**
 * LAS TARJETAS DE PLANES, CON EL SELECTOR DE MES O AÑO.
 *
 * Vive aparte de `blocks.tsx` porque aquél es componente de SERVIDOR y
 * esto necesita estado. Es lo único que se movió: las tarjetas se pintan
 * igual que antes, con las mismas clases.
 *
 * ⚠️ El periodo viaja al detalle del plan por la URL (`?periodo=anual`)
 * y de ahí al CRM. No se guarda en ningún lado: las páginas de detalle
 * son estáticas —`dynamicParams = false`— así que la URL es lo único que
 * cruza. Y el CRM lo trata como una PROPUESTA: preselecciona el periodo
 * y deja cambiarlo. Lo que se cobra nunca sale de aquí, sale del
 * producto de Dodo.
 */
export default function PlanesConPeriodo({
  plans, locale, mostPopular, cta, priceUnit, priceUnitAnual,
  labelMensual, labelAnual, descuento, ahorroTexto, activationLabel,
}: {
  plans: Plan[];
  locale: Locale;
  mostPopular: string;
  cta: string;
  priceUnit: string;
  priceUnitAnual: string;
  labelMensual: string;
  labelAnual: string;
  descuento: string;
  ahorroTexto: string;
  activationLabel: string;
}) {
  const [anual, setAnual] = useState(false);

  return (
    <>
      <div className="plans__switch" role="group" aria-label={`${labelMensual} / ${labelAnual}`}>
        <button type="button" className={anual ? '' : 'is-on'} aria-pressed={!anual} onClick={() => setAnual(false)}>
          {labelMensual}
        </button>
        <button type="button" className={anual ? 'is-on' : ''} aria-pressed={anual} onClick={() => setAnual(true)}>
          {labelAnual} <span className="plans__off">{descuento}</span>
        </button>
      </div>

      <div className="plans">
        {plans.map(plan => {
          const featured = plan.slug === 'content_creator';
          // El periodo se lleva en la dirección para que el detalle del
          // plan —y después el CRM— enseñen y cobren lo mismo que aquí.
          const href = planHref(locale, plan.slug) + (anual ? '?periodo=anual' : '');
          const precio = anual && plan.priceAnual ? plan.priceAnual : plan.price;
          const unidad = anual && plan.priceAnual ? priceUnitAnual : priceUnit;
          return (
            <article className={'plan' + (featured ? ' plan--featured' : '')} key={plan.slug} data-reveal>
              {featured && <span className="plan__banner">{mostPopular}</span>}
              <h3>{plan.name}</h3>
              <p className="plan__summary">{plan.summary}</p>
              <a className="plan__price" href={href}>{precio}<span>{unidad}</span></a>
              {/* Lo que se ahorra, en dinero. El porcentaje se compara;
                  los pesos se entienden. */}
              {anual && plan.ahorroAnual && (
                <p className="plan__ahorro">{ahorroTexto.replace('{0}', plan.ahorroAnual)}</p>
              )}
              <a className={'btn btn--coral'} href={href}>{cta}</a>
              <p className="plan__inherits">{plan.inherits}</p>
              <ul className="plan__list">
                {plan.features.map(f => <li key={f.text}><Check size={15} />{f.text}</li>)}
              </ul>
              {plan.note && <p className="plan__note"><b>{plan.slug === 'content_creator' ? (locale === 'es' ? 'Ten en cuenta: ' : 'Please note: ') : activationLabel}</b>{plan.note}</p>}
            </article>
          );
        })}
      </div>
    </>
  );
}
