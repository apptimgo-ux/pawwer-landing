'use client';
import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function HeroMedia({
  type, image, video, poster, placement = 'below', focalX = 50, focalY = 50,
  overlay = 45, height, fit = 'cover', alt = '', slides = [],
}: {
  type: 'none' | 'image' | 'video';
  slides?: { image: string; alt?: string }[];
  image?: string;
  video?: string;
  poster?: string;
  placement?: 'below' | 'background';
  focalX?: number;
  focalY?: number;
  overlay?: number;
  height?: number;
  fit?: 'cover' | 'contain';
  alt?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [active, setActive] = useState(0);
  const [cycling, setCycling] = useState(true);
  const photos = slides.filter(slide => slide.image);
  const count = photos.length;
  useEffect(() => { setActive(0); }, [count, type]);
  useEffect(() => {
    if (type !== 'image' || count < 2 || !cycling || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive(value => (value + 1) % count), 6000);
    return () => window.clearInterval(timer);
  }, [type, count, cycling]);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) v.play().catch(() => {});
  }, [type, video]);

  const background = placement === 'background';
  const mediaStyle = {
    objectPosition: `${Math.min(100, Math.max(0, focalX))}% ${Math.min(100, Math.max(0, focalY))}%`,
    objectFit: fit,
    ...(height && !background ? { height: `${Math.min(1000, Math.max(320, height))}px` } : {}),
  };
  const shade = background ? <div className="hero__media-shade" style={{ background: `rgba(0,0,0,${Math.min(85, Math.max(0, overlay)) / 100})` }} /> : null;

  if (type === 'video' && video) {
    return (
      <div className={background ? 'hero__backdrop' : 'wrap hero__media hero__media--video'}>
        <video
          ref={ref}
          src={video}
          poster={poster || undefined}
          muted
          loop
          playsInline
          preload="metadata"
          style={mediaStyle}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {shade}
        <button
          type="button"
          className="hero__playbtn"
          onClick={() => {
            const v = ref.current;
            if (!v) return;
            if (v.paused) v.play().catch(() => {});
            else v.pause();
          }}
          aria-label={playing ? 'Pausar video' : 'Reproducir video'}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
        </button>
      </div>
    );
  }

  if (type === 'image' && (image || count)) {
    const current = count ? photos[active % count] : { image: image!, alt };
    return (
      <div className={background ? 'hero__backdrop' : 'wrap hero__media'}>
        <img src={current.image} alt={current.alt || alt} style={mediaStyle} />
        {shade}
        {count > 1 && <div className="hero__carousel-controls" role="group" aria-label="Carrusel de portada">
          <button type="button" aria-label="Imagen anterior" onClick={() => {setCycling(false);setActive((active + count - 1) % count);}}>‹</button>
          {photos.map((slide, i) => <button type="button" key={i} aria-label={'Ver imagen ' + (i + 1)} aria-pressed={active % count === i} onClick={() => {setCycling(false);setActive(i);}}>{i + 1}</button>)}
          <button type="button" aria-label="Imagen siguiente" onClick={() => {setCycling(false);setActive((active + 1) % count);}}>›</button>
          <button type="button" onClick={() => setCycling(!cycling)} aria-label={cycling ? 'Pausar carrusel' : 'Reanudar carrusel'}>{cycling ? 'Ⅱ' : '▶'}</button>
        </div>}
      </div>
    );
  }

  return null;
}
