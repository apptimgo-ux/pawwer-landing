import { Header, Footer } from './site-ui';
import { BlockList } from './blocks';
import { type Locale } from './site-content';

export default function Landing({ locale }: { locale: Locale }) {
  const homeHref = locale === 'es' ? '/' : '/en';
  const altHref = locale === 'es' ? '/en' : '/';
  return (
    <>
      <Header locale={locale} homeHref={homeHref} altHref={altHref} />
      <main id="contenido" lang={locale === 'en' ? 'en' : undefined}>
        <BlockList locale={locale} />
      </main>
      <Footer locale={locale} homeHref={homeHref} />
    </>
  );
}
