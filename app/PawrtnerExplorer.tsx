'use client';

import { useState } from 'react';
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

export default function PawrtnerExplorer({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const current = PAWRtners[selected];
  const en = locale === 'en';
  const move = (step: number) => setSelected(index => (index + step + PAWRtners.length) % PAWRtners.length);

  return (
    <section className="band band--dark pawrtner" aria-labelledby="pawrtner-title">
      <div className="wrap">
        <header className="pawrtner__head" data-reveal>
          <p className="eyebrow">{en ? 'The PAWrtner™ series' : 'La serie PAWrtner™'}</p>
          <h2 id="pawrtner-title">{en ? <>Choose your <span>PAWrtner in crime.</span></> : <>Escoge tu <span>PAWrtner de aventuras.</span></>}</h2>
          <p>{en ? 'Meet the visual brand companions you can choose to represent your business in PAWWER.' : 'Conoce a los acompañantes visuales que puedes elegir para representar tu negocio en PAWWER.'}</p>
        </header>

        <div className="pawrtner__feature" aria-live="polite">
          <div className="pawrtner__portrait">
            <img src={`/img/pawrtner/${current.image}`} alt={en ? `${current.name.en}, PAWWER brand companion` : `${current.name.es}, acompañante de marca de PAWWER`} />
          </div>
          <div className="pawrtner__details">
            <p className="pawrtner__tag">{en ? 'A brand companion' : 'Acompañante de marca'}</p>
            <h3>{current.name[locale]}</h3>
            <p className="pawrtner__description">{current.description[locale]}</p>
            <p className="pawrtner__note">{en
              ? "These mascots bring personality to PAWWER and your brand. They're visual companions—not a separate service, AI agent, or promise of results."
              : 'Estas mascotas dan personalidad a PAWWER y a tu marca. Son acompañantes visuales; no son un servicio aparte, un agente de IA ni una promesa de resultados.'}</p>
            <div className="pawrtner__arrows">
              <button type="button" onClick={() => move(-1)} aria-label={en ? 'Previous PAWrtner' : 'PAWrtner anterior'}><ArrowLeft size={18} /></button>
              <span>{String(selected + 1).padStart(2, '0')} / {String(PAWRtners.length).padStart(2, '0')}</span>
              <button type="button" onClick={() => move(1)} aria-label={en ? 'Next PAWrtner' : 'Siguiente PAWrtner'}><ArrowRight size={18} /></button>
            </div>
          </div>
        </div>

        <div className="pawrtner__rail" role="group" aria-label={en ? 'Choose a PAWrtner' : 'Escoge un PAWrtner'}>
          {PAWRtners.map((pawrtner, index) => (
            <button type="button" className={`pawrtner__choice${index === selected ? ' is-selected' : ''}`} key={pawrtner.id} aria-pressed={index === selected} onClick={() => setSelected(index)}>
              <span className="pawrtner__thumb"><img src={`/img/pawrtner/${pawrtner.image}`} alt="" loading="lazy" /></span>
              <span className="pawrtner__name">{pawrtner.name[locale]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
