import { ArrowUpRight, Check, CalendarDays, ChartNoAxesCombined, MessageSquare, Target } from 'lucide-react';
import { Header, Footer } from './site-ui';
import { content, mailFor, planHref, planSlug, type Locale, EMAIL, PHONE_HREF, PHONE_LABEL, ADDRESS_LINES } from './site-content';

const PILLAR_ICONS = [MessageSquare, CalendarDays, ChartNoAxesCombined];
const BENEFIT_ICONS = [Target, CalendarDays, ChartNoAxesCombined];
const LEAD_INITIALS = ['AC', 'LM', 'SR'];

function Cell({ value }: { value: string }) {
  if (value === '✓') return <Check size={17} className="yes" aria-label="Sí" />;
  if (value === '—') return <span className="no" aria-label="No">—</span>;
  return <>{value}</>;
}

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

        {/* Hero */}
        <section className="hero">
          <div className="wrap hero__inner">
            <p className="hero__kicker"><i /> {t.hero.kicker}</p>
            <h1>{t.hero.h1[0]} {t.hero.h1[1]}</h1>
            <div className="hero__body">
              <div className="hero__actions">
                <a className="btn btn--solid" href={contact.trial}>{t.hero.ctaPrimary} <ArrowUpRight size={17} /></a>
                <a className="textlink" href="#soluciones">{t.hero.ctaSecondary}</a>
              </div>
              <p className="hero__lead">{t.hero.sub}</p>
            </div>
            <div className="hero__meta">
              <span>{t.hero.bottomLeft}</span>
              <hr className="rule" />
              <span>{t.hero.bottomRight}</span>
            </div>
          </div>
        </section>

        {/* Statement */}
        <section className="band statement">
          <div className="wrap" data-reveal>
            <p className="eyebrow">{t.chapter.label}</p>
            <h2>{t.chapter.h2[0]} {t.chapter.h2[1]}</h2>
            <p>{t.chapter.p}</p>
          </div>
        </section>

        {/* Process / phases */}
        <section id="soluciones" className="band band--dark process">
          <div className="wrap">
            <div className="process__head" data-reveal>
              <p className="eyebrow">{t.solutions.label}</p>
              <h2>{t.solutions.h2[0]} {t.solutions.h2[1]}</h2>
            </div>
            {t.solutions.phases.map((phase, i) => (
              <div className="phase" key={phase.name} data-reveal>
                <div className="phase__num">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3 className="phase__name">{phase.name}</h3>
                  <p className="phase__line">{phase.line}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pillars */}
        <section className="band pillars">
          <div className="wrap">
            <div className="pillars__head" data-reveal>
              <p className="eyebrow">{t.solutions.pillarsEyebrow}</p>
              <h2>{t.solutions.pillarsTitle[0]} {t.solutions.pillarsTitle[1]}</h2>
            </div>
            <div className="pillars__grid">
              {t.solutions.items.map((item, i) => {
                const Icon = PILLAR_ICONS[i];
                return (
                  <article className="pillar" key={item.h3} data-reveal>
                    <Icon />
                    <h3>{item.h3}</h3>
                    <p>{item.p}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Showcase */}
        <section className="band band--dark showcase">
          <div className="wrap showcase__inner">
            <div className="showcase__copy" data-reveal>
              <p className="eyebrow">{t.solutions.showcaseEyebrow}</p>
              <h2>{m.h3}</h2>
              <p>{t.chapter.p}</p>
            </div>
            <div className="mock" data-reveal>
              <div className="mock__bar">
                <span className="mock__brand">pawwer<span>✳</span></span>
                <span>{m.bar}</span>
                <span className="mock__avatar">P</span>
              </div>
              <div className="mock__body">
                <p className="mock__eyebrow">{m.eyebrow}</p>
                <h3>{m.h3}</h3>
                <div className="pipeline">
                  {m.stages.map((stage, i) => (
                    <div key={stage}>
                      <span className={'stage s' + i}><i />{stage}</span>
                      <div className={'lead ' + (i === 1 ? 'featured' : '')}>
                        <span className="lead__icon">{LEAD_INITIALS[i]}</span>
                        <strong>{m.names[i]}</strong>
                        <small>{m.roles[i]}</small>
                        <p>{i === 1 ? m.statusFeatured : m.statusDefault}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mock__ctx"><Check size={15} /> {m.context}</div>
              </div>
              <p className="mock__cap">{m.caption}</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section id="beneficios" className="band band--cream2 benefits">
          <div className="wrap">
            <div className="benefits__head" data-reveal>
              <p className="eyebrow">{t.benefits.label}</p>
              <h2>{t.benefits.h2[0]} {t.benefits.h2[1]}</h2>
            </div>
            <div className="benefits__grid">
              {t.benefits.items.map((item, i) => {
                const Icon = BENEFIT_ICONS[i];
                return (
                  <article className="benefit" key={item.h3} data-reveal>
                    <Icon />
                    <h3>{item.h3}</h3>
                    <p>{item.p}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="planes" className="band pricing">
          <div className="wrap">
            <div className="pricing__head" data-reveal>
              <p className="eyebrow">{t.pricing.label}</p>
              <h2>{t.pricing.h2[0]} {t.pricing.h2[1]}</h2>
              <p>{t.pricing.intro}</p>
            </div>
            <div className="plans">
              {t.pricing.plans.map(plan => {
                const featured = plan.name === 'Crecimiento';
                const href = planHref(locale, planSlug(plan.name));
                return (
                  <article className={'plan' + (featured ? ' plan--featured' : '')} key={plan.name} data-reveal>
                    {featured && <span className="plan__banner">{t.pricing.mostPopular}</span>}
                    <h3>{plan.name}</h3>
                    <p className="plan__summary">{plan.summary}</p>
                    <a className="plan__price" href={href}>{plan.price}<span>{t.pricing.priceUnit}</span></a>
                    <a className={'btn' + (featured ? ' btn--solid' : '')} href={href}>{t.pricing.cta} <ArrowUpRight size={15} /></a>
                    <p className="plan__inherits">{plan.inherits}</p>
                    <ul className="plan__list">
                      {plan.features.map(f => <li key={f}><Check size={15} />{f}</li>)}
                    </ul>
                    {plan.note && <p className="plan__note"><b>{t.pricing.activationLabel}</b>{plan.note}</p>}
                  </article>
                );
              })}
            </div>

            <div className="compare" data-reveal>
              <h3>{t.pricing.compareTitle}</h3>
              <div className="compare__scroll">
                <table>
                  <thead>
                    <tr>
                      <th>{locale === 'es' ? 'Incluye' : 'Included'}</th>
                      {t.pricing.plans.map(p => <th key={p.name}>{p.name}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {t.pricing.comparison.map(row => (
                      <tr key={row.label}>
                        <th scope="row">{row.label}</th>
                        {row.values.map((v, i) => <td key={i}><Cell value={v} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Agency */}
        <section className="band band--cream2 agency">
          <div className="wrap agency__inner" data-reveal>
            <div>
              <p className="eyebrow">{t.pricing.agency.label}</p>
              <h2>{t.pricing.agency.h3[0]} {t.pricing.agency.h3[1]}</h2>
              <p>{t.pricing.agency.p}</p>
            </div>
            <a className="btn btn--solid" href={contact.agency}>{t.pricing.agency.cta} <ArrowUpRight size={16} /></a>
          </div>
        </section>

        {/* Pricing notes */}
        <section className="band pricing-notes-band">
          <div className="wrap" data-reveal>
            {t.pricing.notes.map((n, i) => (
              <p key={i} className="plan-detail__note" style={{ marginBottom: 12, maxWidth: '80ch' }}>
                {n.lead && <strong>{n.lead} </strong>}{n.body}
              </p>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section id="contacto" className="band band--dark cta">
          <div className="wrap cta__grid">
            <div data-reveal>
              <p className="eyebrow">{t.contact.label}</p>
              <h2>{t.contact.h2[0]} {t.contact.h2[1]}</h2>
              <div className="cta__actions">
                <a className="btn btn--solid" href={contact.trial}>{t.contact.cta} <ArrowUpRight size={17} /></a>
              </div>
            </div>
            <div className="contact-list" data-reveal>
              <a href={`mailto:${EMAIL}`}>{EMAIL} <ArrowUpRight size={16} /></a>
              <a href={PHONE_HREF}>{PHONE_LABEL} <ArrowUpRight size={16} /></a>
              <address>{ADDRESS_LINES[0]}<br />{ADDRESS_LINES[1]}</address>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} homeHref={homeHref} />
    </>
  );
}
