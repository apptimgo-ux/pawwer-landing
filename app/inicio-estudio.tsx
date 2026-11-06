'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { MessageSquare, Bot, CalendarDays, Workflow, ChartNoAxesCombined, Compass, Check } from 'lucide-react';
import { AI_DISCLAIMER } from './aiDisclaimer';
import { content, type Locale } from './site-content';
import estilos from './inicio-estudio.module.css';

/**
 * El INICIO de la portada (15 de octubre de 2026, pedido de la persona dueña):
 *
 *   1. HÉROE: el mismo texto del héroe de siempre (sale del bloque `hero` de
 *      content/*.json, así que /admin lo sigue editando), pero con los estilos
 *      animados como visual: es lo que la gente reconoce como «agencia de
 *      marketing» y lo que más llama la atención.
 *   2. DETALLE: qué creas (anuncios, posts, historias, comerciales) y la
 *      captura del editor. A propósito NO dice «Crea tu post»: habla de lo que
 *      obtienes, no del nombre de la pantalla.
 *   3. «PAWWER ES TODAVÍA MÁS»: lo demás que hace la plataforma. Después sigue
 *      la página como estaba.
 *
 * Muestras sin marcas ni logotipos de terceros (regla de la persona dueña).
 * Los videos se cargan al entrar en pantalla y se pausan al salir; con
 * movimiento reducido solo se ve el póster.
 */
type MuestraCarrusel = { id: string; titulo: readonly [string, string]; image: string; imageEn?: string; video?: string };

const ESTILOS = [
  ['brandforge-aurora', 'Aurora'], ['brandforge-cyberpunk', 'Cyberpunk'],
  ['brandforge-pop-art', 'Pop art'], ['food_promo', 'Promo'],
  ['brandforge-y2k', 'Y2K'], ['brandforge-graffiti', 'Graffiti'],
  ['brandforge-maximalism', 'Maximalism'], ['brandforge-retro', 'Retro'],
  ['brandforge-victorian-style', 'Victorian'], ['brandforge-surreal-design', 'Surreal'],
] as const;

const MUESTRAS: MuestraCarrusel[] = [
  ...ESTILOS.map(([id, nombre]) => ({
    id,
    titulo: [nombre, nombre] as const,
    image: `/estilos/${id}.webp`,
    imageEn: `/estilos/en/${id}.webp`,
    video: `/estilos/${id}.mp4`,
  })),
  { id: 'real-estate', titulo: ['Bienes raíces', 'Real estate'], image: '/img/pawwer-generated-luna.png', video: '/summit-inmobiliario/assets/summit-real-estate-hero-16x9.mp4' },
  { id: 'producto', titulo: ['Productos', 'Products'], image: '/estilos/food_promo.webp', video: '/estilos/food_promo.mp4' },
  { id: 'avatar', titulo: ['AI Avatar', 'AI Avatar'], image: '/img/portrait-autos-cliente.png' },
  { id: 'ugc', titulo: ['UGC', 'UGC'], image: '/img/inmobiliaria-entrega-llaves-portrait.png' },
  { id: 'unboxing', titulo: ['Unboxing', 'Unboxing'], image: '/img/unboxing-demo.png' },
];

// Muestras propias, sin marcas de terceros. El fondo nunca solicita videos
// hasta que el héroe sea visible y respeta movimiento reducido/ahorro de datos.

const T = {
  es: {
    detalleCeja: 'Tu contenido, listo para publicar',
    detalleH2a: 'Tu anuncio, tu post y tu comercial,',
    detalleH2b: 'en la palma de tu mano.',
    detalleLead: 'Sube la foto de tu producto, escribe qué quieres decir y elige un estilo. PAWWER lo convierte en posts, historias y videos con tus colores, tu logo y tu tono.',
    puntos: ['Más de 30 estilos de anuncio, del minimalista al neón', 'Video vertical para Reels y TikTok, y horizontal para YouTube', 'Tres opciones con tu marca y te quedas con la que sirva'],
    pantalla: 'Así se ve por dentro',
    alt: 'Editor de PAWWER con formatos y estilos de anuncio',
    nota: 'Ejemplos generados con PAWWER usando productos genéricos.',
    pantallas: [
      ['crm-crear', 'Crea tu post', 'Posts, historias y videos con tu marca'],
      ['crm-mailers', 'Mailers', 'Correos con el ADN de tu marca'],
      ['crm-pawwer-studio', 'Pawwer Studio', 'Tus textos y tu logo sobre tu video'],
      ['crm-mapa-leads', 'Mapa de leads', 'De dónde llegan tus leads'],
    ],
    anterior: 'Pantalla anterior',
    siguiente: 'Pantalla siguiente',
    carrusel: 'Pantallas de PAWWER',
    masCeja: 'Y eso es solo el principio',
    masH2a: 'Pero PAWWER',
    masH2b: 'es todavía más.',
    masLead: 'Crear contenido es la parte que se ve. Lo que hace crecer tu negocio es lo que pasa después: cada mensaje contestado, cada lead con seguimiento y cada cita en tu agenda.',
    mas: [
      ['inbox', 'Todos tus mensajes en un lugar', 'WhatsApp, Messenger, Instagram y tus formularios llegan a una sola bandeja, con el historial de cada persona.'],
      ['bot', 'Un agente que contesta por ti', 'Responde a tus leads a cualquier hora, resuelve dudas y te pasa la conversación cuando hace falta una persona.'],
      ['calendar', 'Citas que se agendan solas', 'Tu agenda y Google Calendar conectados, con recordatorios para que nadie se olvide.'],
      ['pipeline', 'Cada lead, en qué paso va', 'Tu pipeline te dice quién está por cerrar, quién se enfrió y a quién le toca seguimiento hoy.'],
      ['huella', 'Campañas con método', 'HUELLA, la metodología construida con 25 años de experiencia, guía tus anuncios y tu posicionamiento.'],
      ['chart', 'Resultados que entiendes', 'Reportes de tu negocio y de tu equipo, de dónde llegan tus leads y cuánto te cuesta cada uno.'],
    ],
    masCta: 'Ver los planes',
  },
  en: {
    detalleCeja: 'Your content, ready to publish',
    detalleH2a: 'Your ad, your post and your commercial,',
    detalleH2b: 'in the palm of your hand.',
    detalleLead: 'Upload a photo of your product, say what you want to say and pick a style. PAWWER turns it into posts, stories and videos with your colors, your logo and your tone.',
    puntos: ['30+ ad styles, from minimal to neon', 'Vertical video for Reels and TikTok, horizontal for YouTube', 'Three on-brand options and you keep the one that works'],
    pantalla: 'What it looks like inside',
    alt: 'PAWWER editor with formats and ad styles',
    nota: 'Examples generated with PAWWER using generic products.',
    pantallas: [
      ['crm-crear', 'Create your post', 'Posts, stories and videos with your brand'],
      ['crm-mailers', 'Mailers', 'Emails with your brand DNA'],
      ['crm-pawwer-studio', 'Pawwer Studio', 'Your text and logo on your video'],
      ['crm-mapa-leads', 'Lead heat map', 'Where your leads come from'],
    ],
    anterior: 'Previous screen',
    siguiente: 'Next screen',
    carrusel: 'PAWWER screens',
    masCeja: 'And that is just the start',
    masH2a: 'But PAWWER',
    masH2b: 'is even more.',
    masLead: 'Creating content is the part people see. What grows your business is what happens next: every message answered, every lead followed up and every appointment on your calendar.',
    mas: [
      ['inbox', 'All your messages in one place', 'WhatsApp, Messenger, Instagram and your forms land in a single inbox, with each person’s history.'],
      ['bot', 'An agent that answers for you', 'It replies to your leads at any hour, answers questions and hands the conversation over when a person is needed.'],
      ['calendar', 'Appointments that book themselves', 'Your calendar and Google Calendar connected, with reminders so nobody forgets.'],
      ['pipeline', 'Every lead, and where it stands', 'Your pipeline tells you who is about to close, who went cold and who needs follow-up today.'],
      ['huella', 'Campaigns with a method', 'HUELLA, the methodology built on 25 years of experience, guides your ads and your positioning.'],
      ['chart', 'Results you understand', 'Reports for your business and your team, where your leads come from and what each one costs.'],
    ],
    masCta: 'See the plans',
  },
} as const;

const ICONOS = { inbox: MessageSquare, bot: Bot, calendar: CalendarDays, pipeline: Workflow, huella: Compass, chart: ChartNoAxesCombined };

function Muestra({ muestra, activa, locale }: { muestra: MuestraCarrusel; activa: boolean; locale: Locale }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    const videoSrc = muestra.video;
    if (!video || !videoSrc) return;
    if (!activa || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!video.src) video.src = videoSrc;
        video.play().catch(() => { /* el navegador puede negarse; queda el póster */ });
      } else video.pause();
    }, { threshold: 0.35 });
    io.observe(video);
    return () => io.disconnect();
  }, [muestra.video, activa]);
  return (
    <figure className={estilos.muestra} data-activa={activa}>
      {muestra.video && !(locale === 'en' && muestra.imageEn)
        ? <video ref={ref} poster={muestra.image} muted loop playsInline preload="none" aria-label={muestra.titulo[locale === 'en' ? 1 : 0]} />
        : <Image src={locale === 'en' && muestra.imageEn ? muestra.imageEn : muestra.image} alt={muestra.titulo[locale === 'en' ? 1 : 0]} width={600} height={600} sizes="(max-width: 600px) 70vw, 300px" />}
      <figcaption>{muestra.titulo[locale === 'en' ? 1 : 0]}</figcaption>
    </figure>
  );
}

type Heroe = Extract<(typeof content)['es']['blocks'][number], { type: 'hero' }>;

function CarruselEstilos({ locale }: { locale: Locale }) {
  const [actual, setActual] = useState(0);
  const inicio = useRef<{ x: number; y: number; ultimaX: number } | null>(null);
  const mover = (pasos: number) => setActual(valor => (valor + pasos + MUESTRAS.length) % MUESTRAS.length);

  return (
    <div className={estilos.carrusel} role="region" aria-roledescription={locale === 'en' ? 'carousel' : 'carrusel'} aria-label={locale === 'en' ? 'Ad styles created with PAWWER' : 'Estilos de anuncio creados con PAWWER'}>
      <button type="button" className={`${estilos.flecha} ${estilos.flechaIzquierda}`} onClick={() => mover(-1)} aria-label={locale === 'en' ? 'Previous style' : 'Estilo anterior'}>‹</button>
      <div
        className={estilos.riel}
        tabIndex={0}
        aria-label={locale === 'en' ? 'Drag or use arrow keys to explore styles' : 'Arrastra o usa las flechas para explorar estilos'}
        onPointerDown={event => {
          if (event.pointerType === 'mouse' && event.button !== 0) return;
          if (event.pointerType === 'mouse') event.preventDefault();
          inicio.current = { x: event.clientX, y: event.clientY, ultimaX: event.clientX };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={event => {
          if (!inicio.current) return;
          const gesto = inicio.current;
          if (Math.abs(event.clientY - gesto.y) > Math.abs(event.clientX - gesto.x)) return;
          const distancia = event.clientX - gesto.ultimaX;
          const pasos = Math.trunc(distancia / 70);
          if (!pasos) return;
          mover(-pasos);
          gesto.ultimaX += pasos * 70;
        }}
        onPointerUp={() => { inicio.current = null; }}
        onPointerCancel={() => { inicio.current = null; }}
        onLostPointerCapture={() => { inicio.current = null; }}
        onDragStart={event => event.preventDefault()}
        onKeyDown={event => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            mover(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }}
      >
        {MUESTRAS.map((muestra, indice) => {
          const distancia = (indice - actual + MUESTRAS.length + Math.floor(MUESTRAS.length / 2)) % MUESTRAS.length - Math.floor(MUESTRAS.length / 2);
          return (
            <div key={muestra.id} className={estilos.posicion} data-offset={Math.max(-3, Math.min(3, distancia))} aria-hidden={Math.abs(distancia) > 2}>
              <Muestra muestra={muestra} activa={Math.abs(distancia) <= 1} locale={locale} />
            </div>
          );
        })}
      </div>
      <button type="button" className={`${estilos.flecha} ${estilos.flechaDerecha}`} onClick={() => mover(1)} aria-label={locale === 'en' ? 'Next style' : 'Estilo siguiente'}>›</button>
    </div>
  );
}

function FondoCreativo() {
  const fondo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = fondo.current;
    if (!root) return;
    const video = root.querySelector('video');
    if (!video) return;
    video.play().catch(() => { /* El video es muted/autoplay; el navegador puede requerir su política local. */ });
    return () => video.pause();
  }, []);

  return (
    <div ref={fondo} className={estilos.heroeFondo} aria-hidden="true">
      <video
        className={estilos.fondoVideo}
        src="/videos/hero-pawwer-cliente.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        tabIndex={-1}
      />
    </div>
  );
}

export function HeroeEstudio({ locale }: { locale: Locale }) {
  const h = content[locale].blocks.find(b => b.type === 'hero') as Heroe | undefined;
  if (!h) return null;
  return (
    <section className={`band band--dark ${estilos.heroe}`}>
      <FondoCreativo />
      <div className={`wrap ${estilos.heroeTexto}`}>
        {h.kicker && <p className={estilos.kicker}><i /> {h.kicker}</p>}
        <h1>{h.h1a} <span className={estilos.acento}>{h.h1b}</span></h1>
        <p className={estilos.lead}>{h.sub}</p>
        <div className={estilos.acciones}>
          <a className="btn btn--solid btn--coral" href="#planes">{h.ctaPrimary}</a>
          <a className={estilos.sello} href="#planes" aria-label={locale === 'en' ? 'Explore plans with a 7-day free trial' : 'Ver planes con 7 días de prueba gratis'}>
            <Image src={`/promociones/sello-prueba-7-dias-${locale}.png`} alt={locale === 'en' ? '7 day free trial' : '7 días de prueba gratis'} width={96} height={96} sizes="96px" />
          </a>
          {h.ctaSecondary && <a className={estilos.secundario} href="#soluciones">{h.ctaSecondary}</a>}
        </div>
        {h.ctaNote && <p className={estilos.nota}>{h.ctaNote}</p>}
      </div>
      <CarruselEstilos locale={locale} />
      <span className={estilos.creditoVideo}>{locale === 'en' ? 'Video generated with Pawwer' : 'Video generado con Pawwer'}</span>
    </section>
  );
}

/**
 * Las pantallas de PAWWER en carrusel (17 de octubre de 2026, pedido de la
 * persona dueña): Crea tu post, Mailers, Pawwer Studio y el mapa de leads.
 * Capturas del panel en modo demo, con datos ficticios. Pasa sola cada 5 s
 * mientras se ve y nadie la toca; se cambia con las pestañas, las flechas,
 * el teclado o deslizando el dedo.
 */
function CarruselPantallas({ locale }: { locale: Locale }) {
  const t = T[locale];
  const total = t.pantallas.length;
  const [actual, setActual] = useState(0);
  const [quieto, setQuieto] = useState(false);
  const caja = useRef<HTMLElement>(null);
  const toque = useRef<number | null>(null);
  const ir = (i: number) => setActual((i + total) % total);

  useEffect(() => {
    const el = caja.current;
    if (!el || quieto || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.4 });
    io.observe(el);
    const id = window.setInterval(() => { if (visible && !document.hidden) setActual(a => (a + 1) % total); }, 5000);
    return () => { io.disconnect(); window.clearInterval(id); };
  }, [quieto, total]);

  const [id, nombre, desc] = t.pantallas[actual];
  return (
    <figure
      ref={caja}
      className={estilos.pantalla}
      data-reveal
      role="region"
      aria-roledescription={locale === 'en' ? 'carousel' : 'carrusel'}
      aria-label={t.carrusel}
      onMouseEnter={() => setQuieto(true)}
      onMouseLeave={() => setQuieto(false)}
      onFocus={() => setQuieto(true)}
      onKeyDown={e => { if (e.key === 'ArrowLeft') ir(actual - 1); if (e.key === 'ArrowRight') ir(actual + 1); }}
    >
      <div className={estilos.pestanas} role="tablist">
        {t.pantallas.map(([pid, pnombre], i) => (
          <button key={pid} type="button" role="tab" aria-selected={i === actual} className={i === actual ? estilos.pestanaActiva : estilos.pestana} onClick={() => { ir(i); setQuieto(true); }}>{pnombre}</button>
        ))}
      </div>
      <div
        className={estilos.marcoPantalla}
        onTouchStart={e => { toque.current = e.touches[0].clientX; }}
        onTouchEnd={e => {
          if (toque.current == null) return;
          const dx = e.changedTouches[0].clientX - toque.current;
          toque.current = null;
          if (Math.abs(dx) > 40) { ir(actual + (dx < 0 ? 1 : -1)); setQuieto(true); }
        }}
      >
        {t.pantallas.map(([pid, pnombre], i) => (
          <img key={pid} src={`/img/${pid}-${locale}.webp`} alt={pnombre} loading="lazy" data-zoomable tabIndex={i === actual ? 0 : -1} role="button" aria-hidden={i !== actual} className={i === actual ? estilos.diapoActiva : estilos.diapo} />
        ))}
        <button type="button" className={`${estilos.flechaPantalla} ${estilos.flechaPantallaIzq}`} onClick={() => { ir(actual - 1); setQuieto(true); }} aria-label={t.anterior}>‹</button>
        <button type="button" className={`${estilos.flechaPantalla} ${estilos.flechaPantallaDer}`} onClick={() => { ir(actual + 1); setQuieto(true); }} aria-label={t.siguiente}>›</button>
      </div>
      <figcaption><b>{nombre}</b> · {desc}. {t.pantalla} · {t.nota} {AI_DISCLAIMER[locale].created}</figcaption>
      <span className={estilos.oculto} aria-live="polite">{nombre}</span>
    </figure>
  );
}

export function DetalleEstudio({ locale }: { locale: Locale }) {
  const t = T[locale];
  return (
    <section className={`band ${estilos.detalle}`} id="estudio">
      <div className={`wrap ${estilos.detalleGrid}`}>
        <div data-reveal>
          <p className="eyebrow">{t.detalleCeja}</p>
          <h2>{t.detalleH2a} <span className={estilos.acento}>{t.detalleH2b}</span></h2>
          <p className={estilos.detalleLead}>{t.detalleLead}</p>
          <ul className={estilos.puntos}>{t.puntos.map(p => <li key={p}><Check size={16} aria-hidden /> {p}</li>)}</ul>
        </div>
        <CarruselPantallas locale={locale} />
      </div>
    </section>
  );
}

export function PawwerEsMas({ locale }: { locale: Locale }) {
  const t = T[locale];
  return (
    <section className={`band band--cream2 ${estilos.mas}`}>
      <div className="wrap">
        <div className={estilos.masCabeza} data-reveal>
          <p className="eyebrow">{t.masCeja}</p>
          <h2>{t.masH2a} <span className={estilos.acento}>{t.masH2b}</span></h2>
          <p>{t.masLead}</p>
        </div>
        <div className={estilos.masGrid}>
          {t.mas.map(([icono, titulo, texto]) => {
            const Icono = ICONOS[icono as keyof typeof ICONOS];
            return (
              <article key={titulo} className={estilos.masItem} data-reveal>
                <span className={estilos.masIcono}><Icono size={20} aria-hidden /></span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </article>
            );
          })}
        </div>
        <div className={estilos.masCta}><a className="btn btn--solid btn--coral" href="#planes">{t.masCta}</a></div>
      </div>
    </section>
  );
}
