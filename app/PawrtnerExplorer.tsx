'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Locale } from './site-content';

const PAWRtners = [
  { id: 'pawwer', image: 'pawwer.png', name: { es: 'Pawwer', en: 'Pawwer' }, description: { es: 'Atención cercana, paciente y siempre lista para ayudarte.', en: "Warm, patient support that's always ready to help." } },
  { id: 'realtor-rabbit', image: 'realtor-rabbit.png', name: { es: 'Coneja inmobiliaria', en: 'Realtor Rabbit' }, description: { es: 'Tu aliada para presentar propiedades y acompañar a cada cliente.', en: 'Your partner for presenting properties and guiding every client.' } },
  { id: 'doctor-giraffe', image: 'doctor-giraffe.png', name: { es: 'Doctora jirafa', en: 'Doctor Giraffe' }, description: { es: 'Una presencia profesional para comunicar servicios de salud.', en: 'A professional presence for communicating healthcare services.' } },
  { id: 'doctor-wolf', image: 'doctor-wolf.png', name: { es: 'Doctor lobo', en: 'Doctor Wolf' }, description: { es: 'Confianza y claridad para conversaciones sobre salud.', en: 'A confident, clear voice for healthcare conversations.' } },
  { id: 'executive-bulldog', image: 'executive-bulldog.png', name: { es: 'Bulldog ejecutivo', en: 'Executive Bulldog' }, description: { es: 'Una imagen firme y accesible para tu negocio.', en: 'A confident, approachable face for your business.' } },
  { id: 'executive-wolf', image: 'executive-wolf.png', name: { es: 'Lobo ejecutivo', en: 'Executive Wolf' }, description: { es: 'Profesionalismo cercano para representar tu marca.', en: 'Approachable professionalism to represent your brand.' } },
  { id: 'zebra-strategist', image: 'zebra-strategist.png', name: { es: 'Cebra estratega', en: 'Zebra Strategist' }, description: { es: 'Ideas claras y una mirada estratégica para tu contenido.', en: 'Clear ideas and a strategic point of view for your content.' } },
];

// Personality labels describe the companions, not additional product services.
const personalities = [
  { es: 'Tu aliado paciente', en: 'The patient sidekick', line: { es: 'Calma, cercanía y una mano amiga. Siempre de tu lado.', en: 'Warm support, a calm presence. Always on your side.' } },
  { es: 'Tu cómplice de ventas', en: 'The sales sidekick', line: { es: 'Llaves en mano y atención en cada detalle. Cercana a cada cliente.', en: 'Keys in hand, an eye for every detail. Close to every client.' } },
  { es: 'La mirada atenta', en: 'The thoughtful companion', line: { es: 'Una presencia serena y profesional para tu marca de salud.', en: 'A calm, professional presence for your healthcare brand.' } },
  { es: 'La voz de confianza', en: 'The reassuring voice', line: { es: 'Claridad, confianza y trato humano en cada conversación.', en: 'Clarity, confidence and a human touch in every conversation.' } },
  { es: 'Tu socio firme', en: 'The dependable partner', line: { es: 'Firme cuando importa. Accesible cuando lo necesitas.', en: 'Confident when it matters. Approachable when you need it.' } },
  { es: 'El estratega', en: 'The strategist', line: { es: 'La mirada en grande. Las patas sobre la tierra.', en: 'Big-picture thinking. Paws on the ground.' } },
  { es: 'Las grandes ideas', en: 'The big-ideas companion', line: { es: 'Una mirada estratégica y personalidad para tu contenido.', en: 'A strategic perspective and personality for your content.' } },
];

export default function PawrtnerExplorer({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(5);
  const current = PAWRtners[selected];
  const rail = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const container = rail.current;
    const choice = container?.children[selected] as HTMLElement | undefined;
    if (container && choice) container.scrollLeft = choice.offsetLeft - container.offsetLeft - (container.clientWidth - choice.clientWidth) / 2;
  }, [selected]);
  const en = locale === 'en';
  const move = (step: number) => setSelected(index => (index + step + PAWRtners.length) % PAWRtners.length);

  return (
    <section className="band band--dark pawrtner" aria-labelledby="pawrtner-title">
      <div className="wrap pawrtner__layout">
        <header className="pawrtner__head" data-reveal>
          <p className="eyebrow">{en ? 'The PAWrtner™ series' : 'La serie PAWrtner™'}</p>
          <h2 id="pawrtner-title">{en ? <>Choose your <span>PAWrtner in crime.</span></> : <>Escoge tu <span>PAWrtner cómplice.</span></>}</h2>
          <p>{en ? 'Every great marketing team needs a sidekick. Pick the personality that feels like your brand—then put PAWWER to work.' : 'Todo gran equipo de marketing necesita un cómplice. Escoge la personalidad que va con tu marca y pon a PAWWER en acción.'}</p>
        </header>

        <div className="pawrtner__feature" aria-live="polite">
          <div className="pawrtner__portrait">
            <img key={current.id} src={`/img/pawrtner/${current.image}`} alt={en ? `${current.name.en}, PAWWER brand companion` : `${current.name.es}, acompañante de marca de PAWWER`} />
            <span className="pawrtner__seal">PAWrtner™<small>{en ? 'On your team' : 'En tu equipo'}</small></span>
          </div>
          <div className="pawrtner__details">
            <h3>{personalities[selected][locale]}</h3>
            <p className="pawrtner__description">{personalities[selected].line[locale]}</p>
            <p className="pawrtner__identity">{current.name[locale]}</p>
          </div>
        </div>

        <div ref={rail} className="pawrtner__rail" role="group" aria-label={en ? 'Choose a PAWrtner' : 'Escoge un PAWrtner'}>
          {PAWRtners.map((pawrtner, index) => (
            <button type="button" className={`pawrtner__choice${index === selected ? ' is-selected' : ''}`} key={pawrtner.id} aria-pressed={index === selected} onClick={() => setSelected(index)}>
              <span className="pawrtner__thumb"><img src={`/img/pawrtner/${pawrtner.image}`} alt="" loading="lazy" /></span>
              <span className="pawrtner__name">{personalities[index][locale]}</span>
            </button>
          ))}
        </div>
        <div className="pawrtner__footer">
          <p className="pawrtner__note">{en ? 'Brand companions with personality. Not separate AI agents or additional services.' : 'Acompañantes de marca con personalidad. No son agentes de IA ni servicios adicionales.'}</p>
          <div className="pawrtner__arrows">
            <button type="button" onClick={() => move(-1)} aria-label={en ? 'Previous PAWrtner' : 'PAWrtner anterior'}><ArrowLeft size={18} /></button>
            <span>{selected + 1} / {PAWRtners.length}</span>
            <button type="button" onClick={() => move(1)} aria-label={en ? 'Next PAWrtner' : 'Siguiente PAWrtner'}><ArrowRight size={18} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
