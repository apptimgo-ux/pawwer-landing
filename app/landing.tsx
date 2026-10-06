import { Header, Footer } from './site-ui';
import { BlockList } from './blocks';
import { type Locale } from './site-content';
import { LandingImageZoom } from './ImageExperience';
import GeneratedGallery from './GeneratedGallery';
import PawrtnerExplorer from './PawrtnerExplorer';

export default function Landing({ locale }: { locale: Locale }) {
  const homeHref = locale === 'es' ? '/' : '/en';
  const altHref = locale === 'es' ? '/en' : '/';
  return (
    <>
      <Header locale={locale} homeHref={homeHref} altHref={altHref} />
      <LandingImageZoom locale={locale} />
      <main id="contenido" lang={locale === 'en' ? 'en' : undefined}>
        <BlockList locale={locale} afterHero={<GeneratedGallery locale={locale} videos={[1, 2, 3, 4, 5].map(index => ({ src: `/videos/pawwer-example-${String(index).padStart(2, '0')}.mp4`, title: locale === 'es' ? `Video ${index}` : `Video ${index}` }))} />} afterShowcase={<PawrtnerExplorer locale={locale} />} />
      </main>
      <Footer locale={locale} homeHref={homeHref} />
    </>
  );
}
