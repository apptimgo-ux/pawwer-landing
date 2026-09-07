'use client';
import { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { content, type Locale, CRM_URL } from './site-content';

export function Header({ locale, homeHref, altHref }: { locale: Locale; homeHref: string; altHref: string }) {
  const [open, setOpen] = useState(false);
  const t = content[locale].nav;
  return (
    <>
      <a className="skip" href="#contenido">{t.skip}</a>
      <header className="site-header">
        <div className="wrap site-header__inner">
          <a className="brand" href={homeHref} aria-label="PAWWER">pawwer<span>✳</span></a>
          <button
            className="menu-btn"
            aria-expanded={open}
            aria-controls="navigation"
            aria-label={open ? t.menuClose : t.menuOpen}
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
          <nav id="navigation" className={open ? 'site-nav open' : 'site-nav'} aria-label={t.links.map(l => l.label).join(', ')}>
            {t.links.map(l => (
              <a key={l.hash} onClick={() => setOpen(false)} href={`${homeHref}${l.hash}`}>{l.label}</a>
            ))}
            <a className="lang-switch" href={altHref} aria-label={t.langAria} hrefLang={locale === 'es' ? 'en' : 'es'}>{t.langLabel}</a>
            <a className="login" href={CRM_URL}>{t.login}<ArrowUpRight size={15} /></a>
          </nav>
        </div>
      </header>
    </>
  );
}

export function Footer({ locale, homeHref }: { locale: Locale; homeHref: string }) {
  const t = content[locale].footer;
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__inner">
        <a href={homeHref} className="brand" aria-label="PAWWER">pawwer<span>✳</span></a>
        <a href={t.privacyHref}>{t.privacy}</a>
        <a href={CRM_URL}>{content[locale].nav.login} <ArrowUpRight size={13} /></a>
        <p className="site-footer__spacer">© {new Date().getFullYear()} {t.rights}</p>
      </div>
    </footer>
  );
}
