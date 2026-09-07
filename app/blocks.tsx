import {
  ArrowUpRight, Check, CalendarDays, ChartNoAxesCombined, MessageSquare, Target,
  Users, Sparkles, Zap, Compass, Layers, ShieldCheck, PawPrint, type LucideIcon,
} from 'lucide-react';
import HeroMedia from './hero-media';
import {
  content, mailFor, planHref, type Block, type Content, type Locale,
  EMAIL, PHONE_HREF, PHONE_LABEL, ADDRESS_LINES,
} from './site-content';

const ICONS: Record<string, LucideIcon> = {
  chat: MessageSquare, calendar: CalendarDays, chart: ChartNoAxesCombined, target: Target,
  users: Users, spark: Sparkles, zap: Zap, compass: Compass, layers: Layers, shield: ShieldCheck,
  paw: PawPrint,
};
const Icon = ({ name }: { name?: string }) => {
  const C = ICONS[name || ''] || MessageSquare;
  return <C />;
};

const DEFAULT_ANCHOR: Record<string, string> = {
  process: 'soluciones', benefits: 'beneficios', pricing: 'planes', cta: 'contacto',
};
const anchorOf = (b: Block) => b.anchor || DEFAULT_ANCHOR[b.type] || undefined;

function Cell({ value }: { value: string }) {
  if (value === '✓') return <Check size={17} className="yes" aria-label="Sí" />;
  if (value === '—') return <span className="no" aria-label="No">—</span>;
  return <>{value}</>;
}

export function BlockList({ locale }: { locale: Locale }) {
  const t = content[locale];
  return <>{t.blocks.map((b, i) => <BlockView key={i} block={b} locale={locale} t={t} />)}</>;
}

function BlockView({ block, locale, t }: { block: Block; locale: Locale; t: Content }) {
  const contact = mailFor(locale);
  const id = anchorOf(block);

  switch (block.type) {
    case 'hero':
      return (
        <section className="hero" id={id}>
          <div className="wrap hero__inner">
            <p className="hero__kicker"><i /> {block.kicker}</p>
            <h1>{block.h1a} {block.h1b}</h1>
            <div className="hero__body">
              <div className="hero__actions">
                <a className="btn btn--solid" href={contact.trial}>{block.ctaPrimary} <ArrowUpRight size={17} /></a>
                {block.ctaSecondary && <a className="textlink" href="#soluciones">{block.ctaSecondary}</a>}
              </div>
              <p className="hero__lead">{block.sub}</p>
            </div>
            <div className="hero__meta">
              <span>{block.metaLeft}</span>
              <hr className="rule" />
              <span>{block.metaRight}</span>
            </div>
          </div>
          <HeroMedia type={block.mediaType} image={block.image} video={block.video} poster={block.poster} />
        </section>
      );

    case 'statement':
      return (
        <section className="band statement" id={id}>
          <div className="wrap" data-reveal>
            <p className="eyebrow">{block.label}</p>
            <h2>{block.h2a} {block.h2b}</h2>
            <p>{block.body}</p>
          </div>
        </section>
      );

    case 'process':
      return (
        <section className="band band--dark process" id={id}>
          <div className="wrap">
            <div className="process__head" data-reveal>
              <p className="eyebrow">{block.label}</p>
              <h2>{block.h2a} {block.h2b}</h2>
            </div>
            {block.phases.map((phase, i) => (
              <div className="phase" key={phase.name + i} data-reveal>
                <div className="phase__num">{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3 className="phase__name">{phase.name}</h3>
                  <p className="phase__line">{phase.line}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );

    case 'pillars':
      return (
        <section className="band pillars" id={id}>
          <div className="wrap">
            <div className="pillars__head" data-reveal>
              <p className="eyebrow">{block.eyebrow}</p>
              <h2>{block.h2a} {block.h2b}</h2>
            </div>
            <div className="pillars__grid">
              {block.items.map((item, i) => (
                <article className="pillar" key={item.h3 + i} data-reveal>
                  <Icon name={item.icon} />
                  <h3>{item.h3}</h3>
                  <p>{item.p}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case 'showcase':
      return (
        <section className="band band--dark showcase" id={id}>
          <div className="wrap showcase__inner">
            <div className="showcase__copy" data-reveal>
              <p className="eyebrow">{block.eyebrow}</p>
              <h2>{block.h2}</h2>
              <p>{block.body}</p>
            </div>
            {block.image ? (
              <img className="mock mock--img" src={block.image} alt="" data-reveal />
            ) : (
              <div className="mock" data-reveal>
                <div className="mock__bar">
                  <span className="mock__brand">pawwer<Icon name="paw" /></span>
                  <span>{block.mock.bar}</span>
                  <span className="mock__avatar">P</span>
                </div>
                <div className="mock__body">
                  <p className="mock__eyebrow">{block.mock.eyebrow}</p>
                  <h3>{block.mock.h3}</h3>
                  <div className="pipeline">
                    {block.mock.leads.map((lead, i) => (
                      <div key={lead.name + i}>
                        <span className={'stage s' + i}><i />{lead.stage}</span>
                        <div className={'lead ' + (i === 1 ? 'featured' : '')}>
                          <span className="lead__icon">{lead.initials}</span>
                          <strong>{lead.name}</strong>
                          <small>{lead.role}</small>
                          <p>{lead.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mock__ctx"><Check size={15} /> {block.mock.context}</div>
                </div>
                <p className="mock__cap">{block.mock.caption}</p>
              </div>
            )}
          </div>
        </section>
      );

    case 'benefits':
      return (
        <section className="band band--cream2 benefits" id={id}>
          <div className="wrap">
            <div className="benefits__head" data-reveal>
              <p className="eyebrow">{block.eyebrow}</p>
              <h2>{block.h2a} {block.h2b}</h2>
            </div>
            <div className="benefits__grid">
              {block.items.map((item, i) => (
                <article className="benefit" key={item.h3 + i} data-reveal>
                  <Icon name={item.icon} />
                  <h3>{item.h3}</h3>
                  <p>{item.p}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      );

    case 'logos': {
      if (!block.items || block.items.length === 0) return null;
      return (
        <section className="band logos" id={id}>
          <div className="wrap" data-reveal>
            {block.eyebrow && <p className="eyebrow">{block.eyebrow}</p>}
            {block.title && <h2 className="logos__title">{block.title}</h2>}
            <div className="logos__row">
              {block.items.map((logo, i) => {
                const img = <img key={i} src={logo.image} alt={logo.alt || ''} />;
                return logo.url ? (
                  <a key={i} href={logo.url} target="_blank" rel="noopener noreferrer">{img}</a>
                ) : img;
              })}
            </div>
          </div>
        </section>
      );
    }

    case 'pricing':
      return (
        <section className="band pricing" id={id}>
          <div className="wrap">
            <div className="pricing__head" data-reveal>
              <p className="eyebrow">{block.eyebrow}</p>
              <h2>{block.h2a} {block.h2b}</h2>
              <p>{block.intro}</p>
            </div>
            <div className="plans">
              {t.plans.map(plan => {
                const featured = plan.slug === 'crecimiento';
                const href = planHref(locale, plan.slug);
                return (
                  <article className={'plan' + (featured ? ' plan--featured' : '')} key={plan.slug} data-reveal>
                    {featured && <span className="plan__banner">{block.mostPopular}</span>}
                    <h3>{plan.name}</h3>
                    <p className="plan__summary">{plan.summary}</p>
                    <a className="plan__price" href={href}>{plan.price}<span>{block.priceUnit}</span></a>
                    <a className={'btn' + (featured ? ' btn--solid' : '')} href={href}>{block.cta} <ArrowUpRight size={15} /></a>
                    <p className="plan__inherits">{plan.inherits}</p>
                    <ul className="plan__list">
                      {plan.features.map(f => <li key={f.text}><Check size={15} />{f.text}</li>)}
                    </ul>
                    {plan.note && <p className="plan__note"><b>{block.activationLabel}</b>{plan.note}</p>}
                  </article>
                );
              })}
            </div>

            {block.showComparison && (
              <div className="compare" data-reveal>
                <h3>{block.compareTitle}</h3>
                <div className="compare__scroll">
                  <table>
                    <thead>
                      <tr>
                        <th>{block.compareFeatureCol}</th>
                        {t.plans.map(p => <th key={p.name}>{p.name}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {t.comparison.map(row => (
                        <tr key={row.label}>
                          <th scope="row">{row.label}</th>
                          {[row.esencial, row.crecimiento, row.escala].map((v, i) => (
                            <td key={i}><Cell value={v} /></td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>
      );

    case 'agency':
      return (
        <section className="band band--cream2 agency" id={id}>
          <div className="wrap agency__inner" data-reveal>
            <div>
              <p className="eyebrow">{block.eyebrow}</p>
              <h2>{block.h2a} {block.h2b}</h2>
              <p>{block.body}</p>
            </div>
            <a className="btn btn--solid" href={contact.agency}>{block.cta} <ArrowUpRight size={16} /></a>
          </div>
        </section>
      );

    case 'notes':
      return (
        <section className="band pricing-notes-band" id={id}>
          <div className="wrap" data-reveal>
            {block.items.map((n, i) => (
              <p key={i} className="plan-detail__note" style={{ marginBottom: 12, maxWidth: '80ch' }}>
                {n.lead && <strong>{n.lead} </strong>}{n.body}
              </p>
            ))}
          </div>
        </section>
      );

    case 'cta':
      return (
        <section className="band band--dark cta" id={id}>
          <div className="wrap cta__grid">
            <div data-reveal>
              <p className="eyebrow">{block.eyebrow}</p>
              <h2>{block.h2a} {block.h2b}</h2>
              <div className="cta__actions">
                <a className="btn btn--solid" href={contact.trial}>{block.buttonLabel} <ArrowUpRight size={17} /></a>
              </div>
            </div>
            <div className="contact-list" data-reveal>
              <a href={`mailto:${EMAIL}`}>{EMAIL} <ArrowUpRight size={16} /></a>
              <a href={PHONE_HREF}>{PHONE_LABEL} <ArrowUpRight size={16} /></a>
              <address>{ADDRESS_LINES[0]}<br />{ADDRESS_LINES[1]}</address>
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}
