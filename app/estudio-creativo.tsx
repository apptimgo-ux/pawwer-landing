'use client';

import { useEffect, useRef } from 'react';
import { AI_DISCLAIMER } from './aiDisclaimer';
import estilos from './estudio-creativo.module.css';

/**
 * «Tu comercial en la palma de tu mano» (15 de octubre de 2026): la vitrina de
 * Crea tu post y BrandForge en la landing. Muestras REALES generadas con
 * PAWWER, con productos genéricos y SIN logotipos ni marcas de terceros
 * (decisión de la persona dueña: nada con logo en la landing). Se copian de
 * `coyote-hub-deploy/public/muestras/completas` a `public/estilos/`.
 *
 * Los videos no se descargan hasta que la tarjeta entra en pantalla, se
 * reproducen sin sonido mientras se ven y se pausan al salir. Con movimiento
 * reducido solo se ve el póster.
 */
type Locale = 'es' | 'en';

const MUESTRAS = [
  ['brandforge-aurora', 'Aurora'],
  ['brandforge-cyberpunk', 'Cyberpunk'],
  ['brandforge-pop-art', 'Pop art'],
  ['food_promo', 'Promo'],
  ['brandforge-y2k', 'Y2K'],
  ['brandforge-graffiti', 'Graffiti'],
  ['brandforge-maximalism', 'Maximalism'],
  ['brandforge-retro', 'Retro'],
  ['brandforge-victorian-style', 'Victorian'],
  ['brandforge-surreal-design', 'Surreal'],
] as const;

const T = {
  es: {
    ceja: 'Crea tu post · BrandForge',
    h2a: 'Tu anuncio, tu post y tu comercial,',
    h2b: 'en la palma de tu mano.',
    lead: 'Sube la foto de tu producto, escribe qué quieres decir y elige un estilo. PAWWER lo convierte en posts, historias y videos con tus colores, tu logo y tu tono. Listos para publicar.',
    puntos: ['Más de 30 estilos de anuncio, del minimalista al neón', 'Video vertical para Reels y TikTok, y horizontal para YouTube', 'BrandForge te da 3 opciones y te quedas con la que sirva'],
    cta: 'Crea tu primer anuncio',
    pantalla: 'Así se ve Crea tu post por dentro',
    alt: 'Pantalla de Crea tu post en PAWWER con formatos y estilos de anuncio',
    nota: 'Ejemplos generados con PAWWER usando productos genéricos.',
  },
  en: {
    ceja: 'Create your post · BrandForge',
    h2a: 'Your ad, your post and your commercial,',
    h2b: 'in the palm of your hand.',
    lead: 'Upload a photo of your product, say what you want to say and pick a style. PAWWER turns it into posts, stories and videos with your colors, your logo and your tone. Ready to publish.',
    puntos: ['30+ ad styles, from minimal to neon', 'Vertical video for Reels and TikTok, horizontal for YouTube', 'BrandForge gives you 3 options and you keep the one that works'],
    cta: 'Create your first ad',
    pantalla: 'What Create your post looks like inside',
    alt: 'PAWWER Create your post screen with formats and ad styles',
    nota: 'Examples generated with PAWWER using generic products.',
  },
} as const;

function Muestra({ id, nombre, locale }: { id: string; nombre: string; locale: Locale }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video || locale === 'en' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!video.src) video.src = `/estilos/${id}.mp4`;
        video.play().catch(() => { /* el navegador puede negarse; queda el póster */ });
      } else video.pause();
    }, { threshold: 0.35 });
    io.observe(video);
    return () => io.disconnect();
  }, [id, locale]);
  return (
    <figure className={estilos.muestra}>
      {locale === 'en'
        ? <img src={`/estilos/en/${id}.webp`} alt={nombre} loading="lazy" />
        : <video ref={ref} poster={`/estilos/${id}.webp`} muted loop playsInline preload="none" aria-label={nombre} />}
      <figcaption>{nombre}</figcaption>
    </figure>
  );
}

export default function EstudioCreativo({ locale, href = '#planes' }: { locale: Locale; href?: string }) {
  const t = T[locale];
  return (
    <section className={`band band--dark ${estilos.estudio}`} id="estudio">
      <div className={`wrap ${estilos.cabeza}`} data-reveal>
        <p className="eyebrow">{t.ceja}</p>
        <h2>{t.h2a} <span className={estilos.acento}>{t.h2b}</span></h2>
        <p className={estilos.lead}>{t.lead}</p>
        <ul className={estilos.puntos}>{t.puntos.map(p => <li key={p}>{p}</li>)}</ul>
        <a className="btn btn--solid btn--coral" href={href}>{t.cta}</a>
      </div>

      <div className={estilos.riel} aria-label={t.ceja}>
        {MUESTRAS.map(([id, nombre]) => <Muestra key={id} id={id} nombre={nombre} locale={locale} />)}
      </div>

      <div className={`wrap ${estilos.pantalla}`} data-reveal>
        <p className={estilos.pantallaTitulo}>{t.pantalla}</p>
        <img src={`/img/crm-crear-${locale}.webp`} alt={t.alt} loading="lazy" data-zoomable tabIndex={0} role="button" />
        <p className={estilos.nota}>{t.nota} {AI_DISCLAIMER[locale].created}</p>
      </div>
    </section>
  );
}
