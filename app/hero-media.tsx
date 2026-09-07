'use client';
import { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

export default function HeroMedia({
  type, image, video, poster,
}: {
  type: 'none' | 'image' | 'video';
  image?: string;
  video?: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduce) v.play().catch(() => {});
  }, []);

  if (type === 'video' && video) {
    return (
      <div className="wrap hero__media hero__media--video" data-reveal>
        <video
          ref={ref}
          src={video}
          poster={poster || undefined}
          muted
          loop
          playsInline
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
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
      <div className="wrap hero__media" data-reveal>
        <img src={image} alt="" />
      </div>
    );
  }

  return null;
}
