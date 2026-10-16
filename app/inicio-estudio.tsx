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

function Muestra({ id, nombre, activa }: { id: string; nombre: string; activa: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!activa || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      video.pause();
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!video.src) video.src = `/estilos/${id}.mp4`;
        video.play().catch(() => { /* el navegador puede negarse; queda el póster */ });
      } else video.pause();
    }, { threshold: 0.35 });
    io.observe(video);
    return () => io.disconnect();
  }, [id, activa]);
  return (
    <figure className={estilos.muestra}>
      <video ref={ref} poster={`/estilos/${id}.webp`} muted loop playsInline preload="none" aria-label={nombre} />
      <figcaption>{nombre}</figcaption>
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
        {MUESTRAS.map(([id, nombre], indice) => {
          const distancia = (indice - actual + MUESTRAS.length + Math.floor(MUESTRAS.length / 2)) % MUESTRAS.length - Math.floor(MUESTRAS.length / 2);
          return (
            <div key={id} className={estilos.posicion} data-offset={Math.max(-3, Math.min(3, distancia))} aria-hidden={Math.abs(distancia) > 2}>
              <Muestra id={id} nombre={nombre} activa={Math.abs(distancia) <= 1} />
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
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const video = root.querySelector('video');
    if (!video) return;
    const dataSaver = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reducedMotion.matches || dataSaver) return;

    const pause = () => video.pause();
    const show = () => {
      if (document.hidden) return;
      if (!video.src) video.src = video.dataset.src || '';
      video.play().catch(() => { /* El fondo oscuro queda visible si el navegador bloquea autoplay. */ });
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) show();
      else pause();
    }, { threshold: 0.1 });
    observer.observe(root);
    const visibilityChanged = () => {
      if (document.hidden) pause();
      else if (root.getBoundingClientRect().bottom > 0) show();
    };
    document.addEventListener('visibilitychange', visibilityChanged);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', visibilityChanged);
      pause();
    };
  }, []);

  return (
    <div ref={fondo} className={estilos.heroeFondo} aria-hidden="true">
      <video
        className={estilos.fondoVideo}
        data-src="/videos/hero-pawwer-cliente.mp4"
        muted
        loop
        playsInline
        preload="none"
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
    </section>
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
        <figure className={estilos.pantalla} data-reveal>
          <img src={`/img/crm-crear-${locale}.webp`} alt={t.alt} loading="lazy" data-zoomable tabIndex={0} role="button" />
          <figcaption>{t.pantalla} · {t.nota} {AI_DISCLAIMER[locale].created}</figcaption>
        </figure>
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
