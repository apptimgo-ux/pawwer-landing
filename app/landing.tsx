import { Header, Footer } from './site-ui';
import { BlockList } from './blocks';
import { type Locale } from './site-content';
import { AI_DISCLAIMER } from './aiDisclaimer';

export default function Landing({ locale }: { locale: Locale }) {
  const homeHref = locale === 'es' ? '/' : '/en';
  const altHref = locale === 'es' ? '/en' : '/';
  return (
    <>
      <Header locale={locale} homeHref={homeHref} altHref={altHref} />
      <main id="contenido" lang={locale === 'en' ? 'en' : undefined}>
        <BlockList locale={locale} afterHero={<section className="wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <h2>{AI_DISCLAIMER[locale].gallery}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {['cerritos', 'luna', 'kingdom', 'departamento'].map((name) => <figure key={name} style={{ margin: 0 }}><img src={`/img/pawwer-generated-${name}.png`} alt={locale === 'es' ? `Ejemplo publicitario generado con IA por Pawwer: ${name}` : `AI-generated advertising example by Pawwer: ${name}`} loading="lazy" style={{ width: '100%', height: 360, objectFit: 'contain' }} /><figcaption>{AI_DISCLAIMER[locale].created}</figcaption></figure>)}
          </div>
          <p><a className="btn btn--primary" href="https://crm.pawwerapp.com/">{AI_DISCLAIMER[locale].cta}</a></p>
        </section>} />
      </main>
      <Footer locale={locale} homeHref={homeHref} />
    </>
  );
}
