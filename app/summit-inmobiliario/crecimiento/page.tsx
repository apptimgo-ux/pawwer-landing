import type { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Header, Footer } from '../../site-ui';
import { CHECKOUT_URLS, content, EMAIL, PHONE_HREF, PHONE_LABEL } from '../../site-content';
import SummitCrecimientoCta from './summit-crecimiento-cta';
import styles from './summit-crecimiento.module.css';

export const metadata: Metadata = {
  title: 'Plan Crecimiento para el Summit Inmobiliario | PAWWER',
  description: 'Conoce el plan Crecimiento de PAWWER, sus herramientas para equipos inmobiliarios y el beneficio anual Summit AISIN 2026.',
  alternates: { canonical: '/summit-inmobiliario/crecimiento' },
};

const plan = content.es.plans.find((item) => item.slug === 'crecimiento')!;
const precioAnual = Number(plan.priceAnual.replace(/[^\d.]/g, ''));
const precioConBeneficio = (precioAnual * 0.75).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const equivalenteMensual = (precioAnual * 0.75 / 12).toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const checkout = new URL(CHECKOUT_URLS.crecimiento);
checkout.searchParams.set('periodo', 'anual');
checkout.searchParams.set('promo', 'SUMMIT25');
checkout.searchParams.set('utm_source', 'summit_inmobiliario_aisin');
checkout.searchParams.set('utm_medium', 'landing_plan');
checkout.searchParams.set('utm_campaign', 'summit_2026_crecimiento_anual');
checkout.searchParams.set('utm_content', 'detalle_plan_crecimiento');

export default function SummitCrecimiento() {
  return (
    <>
      <Header locale="es" homeHref="/summit-inmobiliario" altHref="/summit-inmobiliario" />
      <main id="contenido" className={styles.page}>
        <a className={styles.back} href="/summit-inmobiliario"><ArrowLeft size={16} /> Volver a la página del Summit</a>
        <section className={styles.hero} aria-labelledby="summit-plan-title">
          <div className={styles.copy}>
            <p className={styles.eyebrow}>Beneficio para asistentes · Summit Inmobiliario AISIN Sinaloa 2026</p>
            <h1 id="summit-plan-title">Cada consulta inmobiliaria, con un siguiente paso claro.</h1>
            <p className={styles.intro}>Con Crecimiento, tu equipo reúne el contenido, los prospectos y el seguimiento de propiedades en un solo lugar.</p>
            <div className={styles.offer}>
              <span className={styles.discount}>25%</span>
              <div><strong>de descuento en tu primer pago anual</strong><span>Plan Crecimiento · código SUMMIT25 · vigente hasta el 30 de noviembre de 2026</span></div>
            </div>
            <div className={styles.price}>
              <strong>US${precioConBeneficio}</strong><span>por el primer año, antes de impuestos</span>
              <small>Equivale a US${equivalenteMensual} al mes · precio anual regular {plan.priceAnual} USD</small>
            </div>
            <div className={styles.actions}>
              <SummitCrecimientoCta href={checkout.toString()} contenido="cta_principal">Conocer y elegir Crecimiento <ArrowRight size={18} /></SummitCrecimientoCta>
              <a className={styles.secondary} href="#incluye">Ver qué incluye</a>
            </div>
            <p className={styles.note}>El descuento se valida en el checkout seguro de Dodo. Aplica al plan Crecimiento anual y al primer pago anual.</p>
            <p className={styles.contact}>¿Tienes preguntas? <a href={PHONE_HREF}>{PHONE_LABEL}</a><span aria-hidden="true"> · </span><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
          </div>
          <aside className={styles.planCard} aria-label="Resumen del plan Crecimiento">
            <span className={styles.planLabel}>PAWWER · PLAN CRECIMIENTO</span>
            <h2>Marketing y seguimiento para un equipo inmobiliario en movimiento.</h2>
            <p>{plan.summary}</p>
            <ul>{plan.features.map((feature) => <li key={feature.text}><Check size={17} />{feature.text}</li>)}</ul>
          </aside>
        </section>

        <section className={styles.details} id="incluye">
          <p className={styles.eyebrow}>Del interés a la visita</p>
          <h2>Un flujo conectado para cada propiedad.</h2>
          <div className={styles.steps}>
            <article><span>01</span><h3>Atrae</h3><p>Prepara contenido para presentar propiedades, oficinas, locales y desarrollos.</p></article>
            <article><span>02</span><h3>Organiza</h3><p>Reúne las consultas y conserva el contexto de cada prospecto y canal.</p></article>
            <article><span>03</span><h3>Da seguimiento</h3><p>Asigna responsables, agenda recorridos y revisa el avance de oportunidades.</p></article>
          </div>
          <div className={styles.finalCta}>
            <div><strong>¿Listo para revisar el plan?</strong><span>Primero verás la información y después continuarás al alta en PAWWER.</span></div>
            <SummitCrecimientoCta href={checkout.toString()} contenido="cta_final">Continuar con Crecimiento <ArrowRight size={18} /></SummitCrecimientoCta>
          </div>
        </section>
      </main>
      <Footer locale="es" homeHref="/summit-inmobiliario" />
    </>
  );
}