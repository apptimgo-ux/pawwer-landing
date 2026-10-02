'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play, X } from 'lucide-react';

export type LandingImage = { src: string; alt: string; label: string };

function ImageLightbox({ image, locale, onClose, onPrevious, onNext }: {
  image: LandingImage | null;
  locale: 'es' | 'en';
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const open = Boolean(image);

  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) {
      const previousOverflow = document.body.style.overflow;
      node.showModal();
      document.body.style.overflow = 'hidden';
      closeButton.current?.focus();
      return () => {
        if (node.open) node.close();
        document.body.style.overflow = previousOverflow;
      };
    }
    if (!open && node.open) node.close();
  }, [open]);

  useEffect(() => {
    if (!open || (!onPrevious && !onNext)) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && onPrevious) { event.preventDefault(); onPrevious(); }
      if (event.key === 'ArrowRight' && onNext) { event.preventDefault(); onNext(); }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onPrevious, onNext]);

  return (
    <dialog ref={dialog} className="image-lightbox" aria-label={locale === 'es' ? 'Vista ampliada de imagen' : 'Expanded image view'}
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === dialog.current) onClose(); }}>
      {image && <div className="image-lightbox__panel">
        <button ref={closeButton} type="button" className="image-lightbox__close" onClick={onClose} aria-label={locale === 'es' ? 'Cerrar imagen' : 'Close image'}><X /></button>
        {onPrevious && <button type="button" className="image-lightbox__nav image-lightbox__nav--previous" onClick={onPrevious} aria-label={locale === 'es' ? 'Imagen anterior' : 'Previous image'}><ChevronLeft /></button>}
        <img src={image.src} alt={image.alt} className="image-lightbox__image" />
        {onNext && <button type="button" className="image-lightbox__nav image-lightbox__nav--next" onClick={onNext} aria-label={locale === 'es' ? 'Imagen siguiente' : 'Next image'}><ChevronRight /></button>}
        <p className="image-lightbox__caption">{image.label}</p>
      </div>}
    </dialog>
  );
}

export function LandingImageCarousel({ images, locale, format = 'wide' }: {
  images: LandingImage[];
  locale: 'es' | 'en';
  format?: 'wide' | 'portrait';
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const current = images[index];
  const step = (delta: number) => setIndex(value => (value + delta + images.length) % images.length);

  useEffect(() => {
    if (!playing || hovered || expanded || images.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setIndex(value => (value + 1) % images.length), 5600);
    return () => window.clearInterval(timer);
  }, [playing, hovered, expanded, images.length]);

  if (!current) return null;
  return <>
    <section className={`landing-carousel landing-carousel--${format}`} aria-roledescription={locale === 'es' ? 'carrusel' : 'carousel'}
      aria-label={locale === 'es' ? 'Muestras visuales de PAWWER' : 'PAWWER visual examples'}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="landing-carousel__stage" aria-live="polite">
        <button type="button" className="landing-carousel__open" onClick={() => setExpanded(true)} aria-label={`${locale === 'es' ? 'Ampliar' : 'Expand'}: ${current.label}`}>
          <img key={current.src} src={current.src} alt={current.alt} className="landing-carousel__image" />
          <span className="landing-carousel__zoom"><Maximize2 size={16} />{locale === 'es' ? 'Ver en grande' : 'View larger'}</span>
        </button>
        <div className="landing-carousel__caption"><span>{current.label}</span><span>{String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}</span></div>
        {images.length > 1 && <>
          <button type="button" className="landing-carousel__arrow landing-carousel__arrow--previous" onClick={() => step(-1)} aria-label={locale === 'es' ? 'Anterior' : 'Previous'}><ChevronLeft /></button>
          <button type="button" className="landing-carousel__arrow landing-carousel__arrow--next" onClick={() => step(1)} aria-label={locale === 'es' ? 'Siguiente' : 'Next'}><ChevronRight /></button>
        </>}
      </div>
      <div className="landing-carousel__toolbar">
        <div className="landing-carousel__choices" role="group" aria-label={locale === 'es' ? 'Elegir muestra' : 'Choose example'}>
          {images.map((item, i) => <button type="button" key={item.src} className="landing-carousel__choice" aria-pressed={i === index} onClick={() => setIndex(i)}>
            <img src={item.src} alt="" aria-hidden="true" loading="lazy" />
            <span>{item.label}</span>
          </button>)}
        </div>
        {images.length > 1 && <button type="button" className="landing-carousel__play" onClick={() => setPlaying(value => !value)} aria-label={playing ? (locale === 'es' ? 'Pausar carrusel' : 'Pause carousel') : (locale === 'es' ? 'Reanudar carrusel' : 'Resume carousel')}>
          {playing ? <Pause size={16} /> : <Play size={16} />}
        </button>}
      </div>
    </section>
    <ImageLightbox image={expanded ? current : null} locale={locale} onClose={() => setExpanded(false)} onPrevious={() => step(-1)} onNext={() => step(1)} />
  </>;
}

/** Shared viewer for the remaining editorial photography and hero stills. */
export function LandingImageZoom({ locale }: { locale: 'es' | 'en' }) {
  const [image, setImage] = useState<LandingImage | null>(null);
  useEffect(() => {
    const openImage = (target: HTMLImageElement) => setImage({ src: target.currentSrc || target.src, alt: target.alt, label: target.alt });
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement) || !target.matches('[data-zoomable]') || target.closest('a,button')) return;
      openImage(target);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement) || !target.matches('[data-zoomable]')) return;
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openImage(target); }
    };
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKeyDown); };
  }, []);
  return <ImageLightbox image={image} locale={locale} onClose={() => setImage(null)} />;
}
