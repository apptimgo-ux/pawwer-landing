'use client';
import { useEffect, useRef, useState } from 'react';
import { Menu, X, ArrowUpRight, Pause, Play } from 'lucide-react';
import { content, type Locale, CRM_URL } from './site-content';

export function Header({ locale, homeHref, altHref }: { locale: Locale; homeHref: string; altHref: string }) {
  const [open, setOpen] = useState(false);
  const t = content[locale].nav;
  return (
    <>
      <a className="skip" href="#contenido">{t.skip}</a>
      <header className="header">
        <div className="wrap header-inner">
          <a className="brand" href={homeHref} aria-label="PAWWER">pawwer<span>✳</span></a>
          <button
            className="menu-button"
            aria-expanded={open}
            aria-controls="navigation"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav id="navigation" className={open ? 'nav open' : 'nav'} aria-label={content[locale].nav.links.map(l => l.label).join(', ')}>
            {t.links.map(l => (
              <a key={l.hash} onClick={() => setOpen(false)} href={`${homeHref}${l.hash}`}>{l.label}</a>
            ))}
            <a className="lang-switch" href={altHref} aria-label={t.langAria} hrefLang={locale === 'es' ? 'en' : 'es'}>{t.langLabel}</a>
            <a className="login" href={CRM_URL}>{t.login}<ArrowUpRight size={16} /></a>
          </nav>
        </div>
      </header>
    </>
  );
}

export function HeroMedia({ locale }: { locale: Locale }) {
  const video = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const t = content[locale].hero;
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const pref = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!pref.matches) el.play().catch(() => {});
    const change = () => { if (pref.matches) el.pause(); };
    pref.addEventListener('change', change);
    return () => pref.removeEventListener('change', change);
  }, []);
  return (
    <>
      <img className="hero-image" src="/hero.jpg" alt="" fetchPriority="high" />
      <video
        ref={video}
        className="hero-video"
        muted
        loop
        playsInline
        preload="none"
        poster="/hero.jpg"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setFailed(true)}
        aria-hidden="true"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>
      {!failed && (
        <button
          className="motion-button"
          onClick={() => {
            const el = video.current;
            if (!el) return;
            if (playing) el.pause();
            else el.play().catch(() => setFailed(true));
          }}
          aria-label={playing ? t.motionPauseAria : t.motionPlayAria}
        >
          {playing ? <Pause size={15} /> : <Play size={15} />}
          <span>{playing ? t.motionPause : t.motionPlay}</span>
        </button>
      )}
    </>
  );
}

export function Footer({ locale, homeHref }: { locale: Locale; homeHref: string }) {
  const t = content[locale].footer;
  return (
    <footer className="footer wrap">
      <a href={homeHref} className="brand" aria-label="PAWWER">pawwer<span>✳</span></a>
      <p>© {new Date().getFullYear()} {t.rights}</p>
      <a href={t.privacyHref}>{t.privacy}</a>
      <a href={CRM_URL}>{content[locale].nav.login} <ArrowUpRight size={14} /></a>
    </footer>
  );
}
