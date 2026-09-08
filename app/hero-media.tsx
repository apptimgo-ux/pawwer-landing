'use client';
import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function HeroMedia({
  type, image, video, poster, placement = 'below', focalX = 50, focalY = 50,
  overlay = 45, height, fit = 'cover', alt = '',
}: {
  type: 'none' | 'image' | 'video';
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

  if (type === 'image' && image) {
    return (
      <div className={background ? 'hero__backdrop' : 'wrap hero__media'}>
        <img src={image} alt={background ? '' : alt} style={mediaStyle} />
        {shade}
      </div>
    );
  }

  return null;
}
