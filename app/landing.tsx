import { ArrowUpRight, Check, CalendarDays, ChartNoAxesCombined, MessageSquare, Target } from 'lucide-react';
import { Header, HeroMedia, Footer } from './site-ui';
import { content, mailFor, type Locale, EMAIL, PHONE_HREF, PHONE_LABEL, ADDRESS_LINES } from './site-content';

const SOLUTION_ICONS = [MessageSquare, CalendarDays, ChartNoAxesCombined];
const BENEFIT_ICONS = [Target, CalendarDays, ChartNoAxesCombined];
const LEAD_INITIALS = ['AC', 'LM', 'SR'];

export default function Landing({ locale }: { locale: Locale }) {
  const t = content[locale];
  const contact = mailFor(locale);
  const homeHref = locale === 'es' ? '/' : '/en';
  const altHref = locale === 'es' ? '/en' : '/';
  const m = t.solutions.mock;

  return (
    <>
      <Header locale={locale} homeHref={homeHref} altHref={altHref} />
      <main id="contenido" lang={locale === 'en' ? 'en' : undefined}>
        <section className="hero">
          <HeroMedia locale={locale} />
          <div className="hero-shade" />
          <div className="hero-content wrap">
            <p className="hero-kicker"><span /> {t.hero.kicker}</p>
            <h1>{t.hero.h1[0]}<br />{t.hero.h1[1]}</h1>
            <p className="hero-es">{t.hero.sub}</p>
            <div className="actions">
              <a className="button primary" href={contact.trial}>{t.hero.ctaPrimary} <ArrowUpRight size={18} /></a>
              <a className="text-link light" href="#soluciones">{t.hero.ctaSecondary} <span>↓</span></a>
            </div>
          </div>
          <div className="hero-bottom wrap">
            <span>{t.hero.bottomLeft}</span>
            <span className="hero-rule" />
            <span>{t.hero.bottomRight}</span>
          </div>
        </section>

        <section className="chapter-intro">
          <div className="wrap">
            <p className="section-label">{t.chapter.label}</p>
            <h2>{t.chapter.h2[0]}<br />{t.chapter.h2[1]}</h2>
            <p>{t.chapter.p}</p>
          </div>
        </section>

        <section id="soluciones" className="section wrap solutions">
          <div className="section-heading">
            <p className="section-label">{t.solutions.label}</p>
            <h2>{t.solutions.h2[0]}<br />{t.solutions.h2[1]}</h2>
          </div>
          <div className="phase-strip">
            {t.solutions.phases.map((p, i) => (
              <span key={p}><b>{String(i + 1).padStart(2, '0')}</b> {p}</span>
            ))}
          </div>
          <div className="solution-layout">
            <div className="solution-copy">
              {t.solutions.items.map((item, i) => {
                const Icon = SOLUTION_ICONS[i];
                return (
                  <article key={item.h3}>
                    <Icon />
                    <div>
                      <h3>{item.h3}</h3>
                      <p>{item.p}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="product-window">
              <div className="window-bar">
                <span className="mini-brand">pawwer<span>✳</span></span>
                <span>{m.bar}</span>
                <span className="avatar">P</span>
              </div>
              <div className="window-body">
                <p className="window-eyebrow">{m.eyebrow}</p>
                <h3>{m.h3}</h3>
                <div className="pipeline">
                  {m.stages.map((stage, i) => (
                    <div key={stage}>
                      <span className={'stage s' + i}><i />{stage}</span>
                      <div className={'lead ' + (i === 1 ? 'featured' : '')}>
                        <span className="lead-icon">{LEAD_INITIALS[i]}</span>
                        <strong>{m.names[i]}</strong>
                        <small>{m.roles[i]}</small>
                        <p>{i === 1 ? m.statusFeatured : m.statusDefault}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="context-strip"><Check size={16} /> {m.context}</div>
              </div>
              <p className="mock-caption">{m.caption}</p>
            </div>
          </div>
        </section>

        <section id="beneficios" className="benefits">
          <div className="wrap">
            <p className="section-label">{t.benefits.label}</p>
            <h2>{t.benefits.h2[0]}<br />{t.benefits.h2[1]}</h2>
            <div className="benefit-grid">
              {t.benefits.items.map((item, i) => {
                const Icon = BENEFIT_ICONS[i];
                return (
                  <article key={item.h3}>
                    <Icon />
                    <h3>{item.h3}</h3>
                    <p>{item.p}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="planes" className="section wrap pricing">
          <div className="section-heading">
            <p className="section-label">{t.pricing.label}</p>
            <h2>{t.pricing.h2[0]}<br />{t.pricing.h2[1]}</h2>
            <p>{t.pricing.intro}</p>
          </div>
          <div className="plans">
            {t.pricing.plans.map(plan => {
              const highlight = plan.name === 'Crecimiento';
              return (
                <article className={'plan ' + (highlight ? 'highlight' : '')} key={plan.name}>
                  {highlight && <span className="plan-banner">{t.pricing.mostPopular}</span>}
                  <h3>{plan.name}</h3>
                  <p className="plan-summary">{plan.summary}</p>
                  <div className="price">{plan.price}<span>{t.pricing.priceUnit}</span></div>
                  <a href={contact.plan(plan.name)} className={'button ' + (highlight ? 'primary' : 'outline')}>{t.pricing.cta} <ArrowUpRight size={15} /></a>
                  <p className="includes">{plan.inherits}</p>
                  <ul>{plan.features.map(f => <li key={f}><Check size={15} />{f}</li>)}</ul>
                  {plan.note && <p className="activation"><span>{t.pricing.activationLabel}</span> {plan.note}</p>}
                </article>
              );
            })}
          </div>
          <div className="agency">
            <div>
              <p className="section-label">{t.pricing.agency.label}</p>
              <h3>{t.pricing.agency.h3[0]}<br />{t.pricing.agency.h3[1]}</h3>
              <p>{t.pricing.agency.p}</p>
            </div>
            <a className="button dark" href={contact.agency}>{t.pricing.agency.cta} <ArrowUpRight size={17} /></a>
          </div>
          <div className="pricing-notes">
            {t.pricing.notes.map((n, i) => (
              <p key={i}>{n.lead && <strong>{n.lead}</strong>}{n.lead ? ' ' : ''}{n.body}</p>
            ))}
          </div>
        </section>

        <section id="contacto" className="contact-section">
          <div className="wrap contact-grid">
            <div>
              <p className="section-label">{t.contact.label}</p>
              <h2>{t.contact.h2[0]}<br />{t.contact.h2[1]}</h2>
              <a href={contact.trial} className="button primary">{t.contact.cta} <ArrowUpRight size={18} /></a>
            </div>
            <div className="contact-details">
              <a href={`mailto:${EMAIL}`}>{EMAIL} <ArrowUpRight size={17} /></a>
              <a href={PHONE_HREF}>{PHONE_LABEL} <ArrowUpRight size={17} /></a>
              <address>{ADDRESS_LINES[0]}<br />{ADDRESS_LINES[1]}</address>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} homeHref={homeHref} />
    </>
  );
}
