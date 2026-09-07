import { ArrowUpRight, Check } from 'lucide-react';
import { Header, Footer } from './site-ui';
import { content, mailFor, planSlug, planDetailCopy, CHECKOUT_URLS, CRM_URL, type Locale } from './site-content';

export default function PlanDetail({ locale, slug }: { locale: Locale; slug: string }) {
  const t = content[locale];
  const c = planDetailCopy[locale];
  const contact = mailFor(locale);
  const plan = t.pricing.plans.find(p => planSlug(p.name) === slug);
  const homeHref = locale === 'es' ? '/' : '/en';
  const altHref = locale === 'es' ? `/en/plans/${slug}` : `/planes/${slug}`;

  if (!plan) {
    return (
      <>
        <Header locale={locale} homeHref={homeHref} altHref={locale === 'es' ? '/en' : '/'} />
        <main id="contenido" className="plan-detail wrap" lang={locale === 'en' ? 'en' : undefined}>
          <a className="back" href={`${homeHref}#planes`}>{c.back}</a>
          <h1>404</h1>
        </main>
        <Footer locale={locale} homeHref={homeHref} />
      </>
    );
  }

  const checkout = CHECKOUT_URLS[plan.name];
  const primaryHref = checkout || CRM_URL;
  const primaryLabel = checkout ? c.ctaCheckout : c.ctaTrial;
  const cta = (
    <div className="plan-detail-actions">
      <a className="button primary" href={primaryHref}>{primaryLabel} <ArrowUpRight size={18} /></a>
      <a className="text-link" href={contact.plan(plan.name)}>{c.ctaSales}</a>
    </div>
  );

  return (
    <>
      <Header locale={locale} homeHref={homeHref} altHref={altHref} />
      <main id="contenido" className="plan-detail wrap" lang={locale === 'en' ? 'en' : undefined}>
        <a className="back" href={`${homeHref}#planes`}>{c.back}</a>
        <p className="section-label">{t.pricing.label}</p>
        <h1>{plan.name}</h1>
        <p className="plan-detail-summary">{plan.summary}</p>
        <div className="plan-detail-price">{plan.price}<span>{c.priceUnit}</span></div>
        {cta}

        <section className="plan-detail-block">
          <h2>{c.includesTitle}</h2>
          {plan.name !== 'Esencial' && <p className="plan-detail-inherits">{c.inheritsLabel}</p>}
          <ul className="plan-detail-list">
            {plan.features.map(f => <li key={f}><Check size={16} />{f}</li>)}
          </ul>
          {plan.note && <p className="activation"><span>{c.activationTitle}</span> {plan.note}</p>}
        </section>

        <section className="plan-detail-block">
          <h2>{c.trialTitle}</h2>
          <ul className="plan-detail-list plain">
            {c.trialLines.map((l, i) => <li key={i}>{l}</li>)}
          </ul>
        </section>

        <section className="plan-detail-block">
          <h2>{c.exclusionsTitle}</h2>
          {t.pricing.notes.map((n, i) => (
            <p key={i} className="plan-detail-note">{n.lead && <strong>{n.lead} </strong>}{n.body}</p>
          ))}
        </section>

        {cta}
      </main>
      <Footer locale={locale} homeHref={homeHref} />
    </>
  );
}
