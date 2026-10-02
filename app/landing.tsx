import { Header, Footer } from './site-ui';
import { BlockList } from './blocks';
import { type Locale } from './site-content';
import { AI_DISCLAIMER } from './aiDisclaimer';
import { LandingImageZoom } from './ImageExperience';

export default function Landing({ locale }: { locale: Locale }) {
  const homeHref = locale === 'es' ? '/' : '/en';
  const altHref = locale === 'es' ? '/en' : '/';
  return (
    <>
      <Header locale={locale} homeHref={homeHref} altHref={altHref} />
      <LandingImageZoom locale={locale} />
      <main id="contenido" lang={locale === 'en' ? 'en' : undefined}>
        <BlockList locale={locale} afterHero={<section className="wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
          <h2>{AI_DISCLAIMER[locale].gallery}</h2>
          <div className="pawwer-examples-grid">
            {[
              { name: 'cerritos', alt: locale === 'es' ? 'Anuncio ilustrativo generado con Pawwer para una marca residencial en Cerritos' : 'Illustrative Pawwer-generated ad for a residential brand in Cerritos' },
              { name: 'luna', alt: locale === 'es' ? 'Anuncio ilustrativo generado con Pawwer para villas en El Pescadero' : 'Illustrative Pawwer-generated ad for villas in El Pescadero' },
              { name: 'kingdom', alt: locale === 'es' ? 'Anuncio ilustrativo generado con Pawwer para un desarrollo residencial en Mangata' : 'Illustrative Pawwer-generated ad for a residential development in Mangata' },
              { name: 'departamento', alt: locale === 'es' ? 'Anuncio ilustrativo generado con Pawwer para un departamento en renta' : 'Illustrative Pawwer-generated ad for an apartment rental' },
            ].map(({ name, alt }) => <figure key={name} style={{ margin: 0 }}>
              <img src={`/img/pawwer-generated-${name}.png`} alt={alt} loading="lazy" data-zoomable tabIndex={0} role="button" aria-label={locale === 'es' ? `Ampliar imagen: ${alt}` : `Expand image: ${alt}`} />
              <figcaption>{AI_DISCLAIMER[locale].created}</figcaption>
            </figure>)}
          </div>
          <p><a className="btn btn--primary" href="https://crm.pawwerapp.com/">{AI_DISCLAIMER[locale].cta}</a></p>
        </section>} />
      </main>
      <Footer locale={locale} homeHref={homeHref} />
    </>
  );
}
