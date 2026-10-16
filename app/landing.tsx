import { Header, Footer } from './site-ui';
import { BlockList } from './blocks';
import { type Locale } from './site-content';
import { LandingImageZoom } from './ImageExperience';
import GeneratedGallery from './GeneratedGallery';
import PawrtnerExplorer from './PawrtnerExplorer';
import { HeroeEstudio, DetalleEstudio, PawwerEsMas } from './inicio-estudio';
import PromocionAnual from './promocion-anual';

export default function Landing({ locale }: { locale: Locale }) {
  const homeHref = locale === 'es' ? '/' : '/en';
  const altHref = locale === 'es' ? '/en' : '/';
  return (
    <>
      <Header locale={locale} homeHref={homeHref} altHref={altHref} />
      <LandingImageZoom locale={locale} />
      <main id="contenido" lang={locale === 'en' ? 'en' : undefined}>
        {/* Inicio (15-oct-2026): héroe con estilos animados, el detalle de lo que creas y «PAWWER es todavía más». */}
        <HeroeEstudio locale={locale} />
        <DetalleEstudio locale={locale} />
        <PawwerEsMas locale={locale} />
        <BlockList locale={locale} omitirHero afterHero={<GeneratedGallery locale={locale} videos={[1, 2, 5].map((index, i) => ({ src: `/videos/pawwer-example-${String(index).padStart(2, '0')}.mp4`, title: `Video ${i + 1}` }))} />} afterShowcase={<PawrtnerExplorer locale={locale} />} />
      </main>
      <Footer locale={locale} homeHref={homeHref} />
      <PromocionAnual locale={locale} />
    </>
  );
}
