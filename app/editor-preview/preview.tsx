'use client';

import { Component, useEffect, useState, type ReactNode } from 'react';
import { BlockList } from '../blocks';
import { Header, Footer } from '../site-ui';
import { assemble, content, siteSettings, type Content, type Locale, type SiteSettings } from '../site-content';

class PreviewBoundary extends Component<{ children: ReactNode; revision: number }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidUpdate(previous: { revision: number }) {
    if (previous.revision !== this.props.revision && this.state.failed) this.setState({ failed: false });
  }
  render() {
    return this.state.failed ? <p className="editor-preview-error">Completa los campos del bloque que estás agregando para verlo aquí. Tus cambios siguen en el editor.</p> : this.props.children;
  }
}

// Drafts arrive only from this frame's same-origin parent. No draft API,
// credentials, remote writes or browser storage are used by this route.
export default function Preview() {
  const [draft, setDraft] = useState<Content | null>(null);
  const [settings, setSettings] = useState<SiteSettings>(siteSettings);
  const [locale, setLocale] = useState<Locale>('es');
  const [revision, setRevision] = useState(0);
  useEffect(() => {
    function receive(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.source !== window.parent || window.parent === window) return;
      if (event.data?.type !== 'pawwer:draft') return;
      const message = event.data;
      const lang: Locale = message.locale === 'en' ? 'en' : 'es';
      const updatedSettings = message.kind === 'settings' ? message.data : siteSettings;
      if (!updatedSettings?.prices || !updatedSettings?.contact) return;
      const data = message.kind === 'settings' ? content[lang] : message.data;
      if (!data || !Array.isArray(data.blocks) || !Array.isArray(data.plans)) return;
      setLocale(lang);
      setSettings(updatedSettings);
      setDraft(assemble(data, updatedSettings.prices));
      setRevision(value => value + 1);
    }
    window.addEventListener('message', receive);
    if (window.parent !== window) window.parent.postMessage({ type: 'pawwer:preview-ready' }, window.location.origin);
    return () => window.removeEventListener('message', receive);
  }, []);

  if (!draft) return <div className="editor-preview-empty">La vista previa aparecerá al abrir un contenido en el <a href="/admin">editor</a>.</div>;
  const homeHref = locale === 'es' ? '/' : '/en';
  return <div className="editor-preview" onClickCapture={event => {
    const link = (event.target as Element).closest('a');
    if (!link) return;
    event.preventDefault();
    const href = link.getAttribute('href') || '';
    const hash = href.includes('#') ? href.slice(href.indexOf('#') + 1) : '';
    if (hash) document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
  }}>
    <PreviewBoundary revision={revision}>
      <Header locale={locale} homeHref={homeHref} altHref={locale === 'es' ? '/en' : '/'} draft={draft} crmUrl={settings.contact.crmUrl} />
      <main id="contenido" lang={locale}><BlockList locale={locale} draft={draft} settings={settings} /></main>
      <Footer locale={locale} homeHref={homeHref} draft={draft} crmUrl={settings.contact.crmUrl} />
    </PreviewBoundary>
  </div>;
}
