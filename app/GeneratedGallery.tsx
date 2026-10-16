'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { AI_DISCLAIMER } from './aiDisclaimer';
import type { Locale } from './site-content';
import estilos from './generated-gallery.module.css';

/**
 * «Generados por Pawwer» (rehecho el 15 de octubre de 2026, pedido de la
 * persona dueña): los VIDEOS primero, grandes, sobre fondo oscuro y
 * reproduciéndose solos como carrusel; los DISEÑOS en otra pestaña, en un
 * carrusel 3D que gira solo y se arrastra con mouse o dedo.
 *
 * ⚠️ Arrancan SIN sonido: los navegadores bloquean la reproducción automática
 * con sonido. El botón de bocina lo activa. Solo se descarga el video que se
 * ve (preload del actual); con movimiento reducido no arranca solo ni gira.
 * Las piezas extra del carrusel son las muestras sin marca de /estilos.
 */
export type ExampleVideo = { src: string; title: string; poster?: string; aspect?: '9:16' | '16:9' };

// Los videos VERTICALES viven en el carrusel 3D (pedido de la persona dueña):
// en el escenario horizontal quedaban con franjas negras.
const VIDEOS_VERTICALES = ['/videos/pawwer-example-03.mp4', '/videos/pawwer-example-04.mp4'];
const DISENOS: { src: string; nombre: string; video?: boolean }[] = [
  { src: VIDEOS_VERTICALES[0], nombre: 'video', video: true },
  ...['cerritos', 'luna', 'kingdom', 'departamento'].map(n => ({ src: `/img/pawwer-generated-${n}.png`, nombre: n })),
  ...['brandforge-aurora', 'brandforge-cyberpunk', 'brandforge-pop-art', 'food_promo', 'brandforge-y2k', 'brandforge-graffiti', 'brandforge-maximalism', 'brandforge-retro', 'brandforge-victorian-style', 'brandforge-surreal-design']
    .map(n => ({ src: `/estilos/${n}.webp`, nombre: n.replace('brandforge-', '').replace(/[-_]/g, ' ') })),
];
DISENOS.splice(8, 0, { src: VIDEOS_VERTICALES[1], nombre: 'video', video: true });

const quieto = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Videos({ locale, videos }: { locale: Locale; videos: ExampleVideo[] }) {
  const t = (es: string, en: string) => (locale === 'es' ? es : en);
  const [activo, setActivo] = useState(0);
  const [sonido, setSonido] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [fallo, setFallo] = useState(false);
  const [vertical, setVertical] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);
  const caja = useRef<HTMLDivElement>(null);
  const visible = useRef(false);

  // Solo reproduce mientras la sección está en pantalla.
  useEffect(() => {
    const el = caja.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      visible.current = e.isIntersecting;
      const v = ref.current;
      if (!v) return;
      if (e.isIntersecting && !pausado && !quieto()) v.play().catch(() => setPausado(true));
      else v.pause();
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [pausado]);

  // Al cambiar de video, arranca el nuevo si la sección se ve.
  useEffect(() => {
    const v = ref.current;
    if (v && visible.current && !pausado && !quieto()) v.play().catch(() => setPausado(true));
  }, [activo, pausado]);

  const ir = (i: number) => { setFallo(false); setActivo((i + videos.length) % videos.length); };
  const alternar = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPausado(false); } else { v.pause(); setPausado(true); }
  };
  const video = videos[activo];
  if (!video) return <p>{t('Pronto podrás ver aquí nuestros videos creados con Pawwer.', 'Our videos created with Pawwer will be available here soon.')}</p>;

  return (
    <div ref={caja} className={estilos.escenario}>
      <video
        ref={ref}
        key={video.src}
        className={estilos.video}
        src={video.src}
        poster={video.poster}
        muted={!sonido}
        playsInline
        preload="auto"
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        onContextMenu={e => e.preventDefault()}
        onLoadedMetadata={e => setVertical(e.currentTarget.videoHeight > e.currentTarget.videoWidth)}
        style={{ objectFit: vertical ? 'contain' : 'cover' }}
        onEnded={() => ir(activo + 1)}
        onError={() => setFallo(true)}
        aria-label={video.title}
      />
      <div className={estilos.controles}>
        <button type="button" onClick={alternar} aria-label={pausado ? t('Reproducir', 'Play') : t('Pausar', 'Pause')}>
          {pausado ? <Play size={18} /> : <Pause size={18} />}
        </button>
        <button type="button" onClick={() => setSonido(s => !s)} aria-label={sonido ? t('Quitar sonido', 'Mute') : t('Activar sonido', 'Unmute')}>
          {sonido ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
        <span className={estilos.titulo}>{video.title}</span>
      </div>
      <div className={estilos.puntos} role="tablist" aria-label="Playlist">
        {videos.map((v, i) => (
          <button key={v.src} type="button" role="tab" aria-selected={i === activo} aria-label={v.title} onClick={() => ir(i)}
            className={i === activo ? estilos.puntoActivo : estilos.punto} />
        ))}
      </div>
      {fallo && <p role="alert" className={estilos.fallo}>{t('No se pudo cargar este video. Prueba con otro.', 'This video could not load. Try another one.')}</p>}
    </div>
  );
}

function Carrusel3D({ locale }: { locale: Locale }) {
  // Las muestras originales llevan copy español incrustado. En inglés se
  // muestran las versiones localizadas, nunca el fotograma español.
  const disenos = locale === 'en'
    ? DISENOS.filter(d => d.src.startsWith('/estilos/')).map(d => ({ ...d, src: d.src.replace('/estilos/', '/estilos/en/') }))
    : DISENOS;
  const n = disenos.length;
  const paso = 360 / n;
  const [angulo, setAngulo] = useState(0);
  const arrastre = useRef<{ x: number; a: number } | null>(null);
  const tocando = useRef(false);

  // Gira solo, despacio; se detiene mientras alguien lo arrastra o pasa el mouse.
  useEffect(() => {
    if (quieto()) return;
    let raf = 0;
    let antes = performance.now();
    const giro = (ahora: number) => {
      if (!tocando.current) setAngulo(a => a - (ahora - antes) * 0.012);
      antes = ahora;
      raf = requestAnimationFrame(giro);
    };
    raf = requestAnimationFrame(giro);
    return () => cancelAnimationFrame(raf);
  }, []);

  const bajar = useCallback((e: React.PointerEvent) => {
    tocando.current = true;
    arrastre.current = { x: e.clientX, a: angulo };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, [angulo]);
  const mover = (e: React.PointerEvent) => {
    if (!arrastre.current) return;
    setAngulo(arrastre.current.a + (e.clientX - arrastre.current.x) * 0.35);
  };
  const soltar = () => { arrastre.current = null; tocando.current = false; };
  const radio = `calc(${(Math.round(1000 / (2 * Math.tan(Math.PI / n))) / 1000).toFixed(3)} * var(--ancho-tarjeta) + 40px)`;

  return (
    <div className={estilos.carrusel}
      onPointerDown={bajar} onPointerMove={mover} onPointerUp={soltar} onPointerCancel={soltar}
      onMouseEnter={() => { tocando.current = true; }} onMouseLeave={() => { if (!arrastre.current) tocando.current = false; }}
      aria-label={locale === 'es' ? 'Diseños creados con Pawwer. Arrastra para girar.' : 'Designs created with Pawwer. Drag to rotate.'}>
      <div className={estilos.anillo} style={{ transform: `translateZ(calc(-1 * ${radio})) rotateY(${angulo}deg)` }}>
        {disenos.map((d, i) => (
          <figure key={d.src} className={estilos.tarjeta} style={{ transform: `rotateY(${i * paso}deg) translateZ(${radio})` }}>
            {d.video
              ? <video src={d.src} muted loop playsInline autoPlay={!quieto()} preload="metadata" aria-label={locale === 'es' ? 'Video vertical creado con Pawwer' : 'Vertical video created with Pawwer'} />
              : <img src={d.src} alt={locale === 'es' ? `Diseño ilustrativo creado con Pawwer: ${d.nombre}` : `Illustrative design created with Pawwer: ${d.nombre}`} loading="lazy" draggable={false} />}
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function GeneratedGallery({ locale, videos = [] }: { locale: Locale; videos?: ExampleVideo[] }) {
  const [tab, setTab] = useState<'videos' | 'designs'>('videos');
  const t = (es: string, en: string) => (locale === 'es' ? es : en);
  return (
    <section className={`band band--dark ${estilos.seccion}`}>
      <div className="wrap">
        <div className={estilos.cabeza}>
          <h2>{AI_DISCLAIMER[locale].gallery}</h2>
          <div role="tablist" aria-label={t('Ejemplos de Pawwer', 'Pawwer examples')} className={estilos.pestanas}>
            {(['videos', 'designs'] as const).map(value => (
              <button key={value} type="button" role="tab" id={`generated-${value}-tab`} aria-controls={`generated-${value}`} aria-selected={tab === value}
                className={tab === value ? estilos.pestanaActiva : estilos.pestana} onClick={() => setTab(value)}>
                {value === 'designs' ? t('Diseños', 'Designs') : 'Videos'}
              </button>
            ))}
          </div>
        </div>
        <div id="generated-videos" role="tabpanel" aria-labelledby="generated-videos-tab" hidden={tab !== 'videos'}>
          {tab === 'videos' && <Videos locale={locale} videos={videos} />}
        </div>
        <div id="generated-designs" role="tabpanel" aria-labelledby="generated-designs-tab" hidden={tab !== 'designs'}>
          {tab === 'designs' && <><Carrusel3D locale={locale} /><p className={estilos.ayuda}>{t('Arrastra para girar', 'Drag to rotate')}</p></>}
        </div>
        <div className={estilos.pie}>
          <p>{AI_DISCLAIMER[locale].created}</p>
          <a className="btn btn--solid btn--coral" href="https://crm.pawwerapp.com/">{AI_DISCLAIMER[locale].cta}</a>
        </div>
      </div>
    </section>
  );
}
