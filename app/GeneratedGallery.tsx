'use client';

import { useState } from 'react';
import { AI_DISCLAIMER } from './aiDisclaimer';
import type { Locale } from './site-content';

export type ExampleVideo = { src: string; title: string; poster?: string; aspect?: '9:16' | '16:9' };

export default function GeneratedGallery({ locale, videos = [] }: { locale: Locale; videos?: ExampleVideo[] }) {
  const [tab, setTab] = useState<'designs' | 'videos'>('designs');
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState(false);
  const [started, setStarted] = useState(false);
  const [ratio, setRatio] = useState(9 / 16);
  const selected = videos[active];
  const t = (es: string, en: string) => locale === 'es' ? es : en;
  const select = (index: number) => { setFailed(false); setActive(index); setRatio(videos[index]?.aspect === '16:9' ? 16 / 9 : 9 / 16); };
  return <section className="wrap" style={{ paddingTop: 48, paddingBottom: 48 }}>
    <h2>{AI_DISCLAIMER[locale].gallery}</h2>
    <div role="tablist" aria-label={t('Ejemplos de Pawwer', 'Pawwer examples')} style={{ display: 'flex', gap: 12, margin: '20px 0' }}>
      {(['designs', 'videos'] as const).map(value => <button key={value} type="button" role="tab" id={`generated-${value}-tab`} aria-controls={`generated-${value}`} aria-selected={tab === value} className={`btn ${tab === value ? 'btn--primary' : ''}`} onClick={() => setTab(value)}>{value === 'designs' ? t('Diseños', 'Designs') : 'Videos'}</button>)}
    </div>
    <div id="generated-designs" role="tabpanel" aria-labelledby="generated-designs-tab" hidden={tab !== 'designs'}>
      <div className="pawwer-examples-grid">{['cerritos', 'luna', 'kingdom', 'departamento'].map(name => <figure key={name} style={{ margin: 0 }}>
        <img src={`/img/pawwer-generated-${name}.png`} alt={t(`Diseño ilustrativo creado con Pawwer: ${name}`, `Illustrative design created with Pawwer: ${name}`)} loading="lazy" data-zoomable tabIndex={0} role="button" aria-label={t(`Ampliar diseño: ${name}`, `Expand design: ${name}`)} />
        <figcaption>{AI_DISCLAIMER[locale].created}</figcaption>
      </figure>)}</div>
    </div>
    <div id="generated-videos" role="tabpanel" aria-labelledby="generated-videos-tab" hidden={tab !== 'videos'}>
      {tab === 'videos' && selected ? <>
        <div style={{ display: 'flex', justifyContent: 'center', background: '#101218', borderRadius: 16, overflow: 'hidden' }}>
          <video key={selected.src} src={selected.src} poster={selected.poster} controls controlsList="nodownload noremoteplayback" disablePictureInPicture playsInline autoPlay={started} onPlay={() => setStarted(true)} onLoadedMetadata={event => { const video = event.currentTarget; if (video.videoWidth && video.videoHeight) setRatio(video.videoWidth / video.videoHeight); }} preload="metadata" aria-label={selected.title} onContextMenu={event => event.preventDefault()} onError={() => setFailed(true)} onEnded={() => select((active + 1) % videos.length)} style={{ width: '100%', maxWidth: ratio < 1 ? 360 : 960, maxHeight: '70vh', aspectRatio: String(ratio), objectFit: 'contain', display: 'block' }} />
        </div>
        {failed && <p role="alert">{t('No se pudo cargar este video. Prueba otra pieza de la playlist.', 'This video could not load. Try another item in the playlist.')}</p>}
        <p>{selected.title} · {ratio < 1 ? t('Vertical', 'Portrait') : t('Horizontal', 'Landscape')}</p>
        <div aria-label="Playlist" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>{videos.map((video, index) => <button key={video.src} type="button" className={`btn ${active === index ? 'btn--primary' : ''}`} aria-pressed={active === index} onClick={() => select(index)}>{video.title}</button>)}</div>
      </> : <p>{t('Pronto podrás ver aquí nuestros videos creados con Pawwer.', 'Our videos created with Pawwer will be available here soon.')}</p>}
      <p>{AI_DISCLAIMER[locale].created}</p>
    </div>
    <p><a className="btn btn--primary" href="https://crm.pawwerapp.com/">{AI_DISCLAIMER[locale].cta}</a></p>
  </section>;
}
