'use client';
import { AI_DISCLAIMER } from './aiDisclaimer';
import { useState } from 'react';
import { Menu, X, ArrowUpRight, PawPrint } from 'lucide-react';
import { content, type Content, type Locale, CRM_URL, planHref } from './site-content';
import { REDES_SOCIALES } from './redes-sociales';

export function Header({ locale, homeHref, altHref, draft, crmUrl = CRM_URL }: { locale: Locale; homeHref: string; altHref: string; draft?: Content; crmUrl?: string }) {
  const [open, setOpen] = useState(false);
  const t = (draft || content[locale]).nav;
  return (
    <>
      <a className="skip" href="#contenido">{t.skip}</a>
      <header className="site-header">
        <div className="wrap site-header__inner">
          <a className="brand" href={homeHref} aria-label="PAWWER">pawwer<PawPrint aria-hidden strokeWidth={2.25} /></a>
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
            <a className="login" href={crmUrl}>{t.login}</a>
          </nav>
        </div>
      </header>
    </>
  );
}

export function Footer({ locale, homeHref, draft, crmUrl = CRM_URL }: { locale: Locale; homeHref: string; draft?: Content; crmUrl?: string }) {
  const current = draft || content[locale];
  const t = current.footer;
  const notes = current.blocks.find(block => block.type === 'notes');
  const planes = current.plans;
  return (
      <footer className="site-footer">
        <div className="wrap site-footer__disclaimer"><p>{AI_DISCLAIMER[locale].landing} <a href={`https://crm.pawwerapp.com/legal/contenido-ia?lang=${locale}`}>{AI_DISCLAIMER[locale].more}</a></p></div>
      {/*
        Los enlaces a los planes viven en el PIE, no solo en la seccion de
        precios, y es a proposito. Hasta el 28 de septiembre de 2026 las
        cuatro paginas de plan —que son las paginas que venden— solo se
        alcanzaban desde el bloque de precios de la portada: cuatro clics
        de profundidad para un rastreador que entra por la politica de
        privacidad, y cero enlaces internos apuntandoles desde el resto del
        sitio. Un enlace en el pie las pone a UN clic desde cualquier
        pagina, que es lo que un buscador lee como «esto importa».
      */}
      <div className="wrap site-footer__map">
        <span className="site-footer__maplabel">{locale === 'es' ? 'Planes' : 'Plans'}</span>
        {planes.map(plan => (
          <a key={plan.slug} href={planHref(locale, plan.slug)}>{plan.name}</a>
        ))}
        <a href={locale === 'es' ? '/programa-beta' : '/en/beta-program'}>
          {locale === 'es' ? 'Programa beta' : 'Beta program'}
        </a>
      </div>
      <div className="wrap site-footer__inner">
        <a href={homeHref} className="brand" aria-label="PAWWER">pawwer<PawPrint aria-hidden strokeWidth={2.25} /></a>
        <a href={t.privacyHref}>{t.privacy}</a>
        {t.terms && t.termsHref && <a href={t.termsHref}>{t.terms}</a>}
        {t.refunds && t.refundsHref && <a href={t.refundsHref}>{t.refunds}</a>}
        {t.dataProcessing && t.dataProcessingHref && <a href={t.dataProcessingHref}>{t.dataProcessing}</a>}
        <a href={crmUrl}>{(draft || content[locale]).nav.login}</a>
        <div className="site-footer__redes" aria-label={locale === 'es' ? 'PAWWER en redes sociales' : 'PAWWER on social media'}>
          {REDES_SOCIALES.map(red => (
            <a key={red.id} href={red.url} target="_blank" rel="noopener noreferrer" aria-label={`PAWWER ${locale === 'es' ? 'en' : 'on'} ${red.nombre}`} title={red.nombre}>
              <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="currentColor"><path d={red.path} /></svg>
            </a>
          ))}
        </div>
        <p className="site-footer__spacer">© {new Date().getFullYear()} {t.rights}</p>
        {notes?.type === 'notes' && <div className="site-footer__disclaimer">{notes.items.map((note, i) => <p key={i}>{note.lead && <strong>{note.lead} </strong>}{note.body}</p>)}</div>}
      </div>
    </footer>
  );
}
