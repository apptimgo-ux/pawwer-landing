'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const KEY = 'pawwer:cookie-consent:v1';
type Consent = { necessary: true; preferences: boolean; analytics: boolean; marketing: boolean; savedAt: string };

export default function CookiePreferences() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [values, setValues] = useState({ preferences: false, analytics: false, marketing: false });
  const pathname = usePathname();
  const english = pathname.startsWith('/en');
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || 'null') as Consent | null;
      if (!stored?.savedAt || !Number.isFinite(Date.parse(stored.savedAt)) || Date.parse(stored.savedAt) > Date.now() || Date.now() - Date.parse(stored.savedAt) > 180 * 86400000) setOpen(true);
      else setValues({ preferences: stored.preferences === true, analytics: stored.analytics === true, marketing: stored.marketing === true });
    } catch { setOpen(true); }
  }, []);
  function save(next: typeof values) {
    const consent: Consent = { necessary: true, ...next, savedAt: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(consent)); } catch { /* Memory-only in private browsers. */ }
    setValues(next); setOpen(false); setCustom(false);
    window.dispatchEvent(new CustomEvent('pawwer:cookie-consent', { detail: consent }));
  }
  return <>
    <button type="button" onClick={() => { setOpen(true); setCustom(true); }} style={{ position: 'fixed', bottom: 12, left: 12, zIndex: 70, padding: '8px 12px', borderRadius: 20, background: '#fff', color: '#17202a', border: '1px solid #d9d9d9', fontSize: 12 }}>{english ? 'Cookie settings' : 'Preferencias de cookies'}</button>
    {open && <section aria-label={english ? 'Cookie preferences' : 'Preferencias de cookies'} style={{ position: 'fixed', bottom: 16, left: 16, right: 16, maxWidth: 640, maxHeight: 'calc(100dvh - 32px)', overflowY: 'auto', margin: '0 auto', zIndex: 90, padding: 24, background: '#fff', color: '#17202a', border: '1px solid #d9d9d9', borderRadius: 20, boxShadow: '0 12px 50px #0003' }}>
      <h2 style={{ fontSize: 20, margin: '0 0 10px' }}>{english ? 'Your privacy, your choice' : 'Tu privacidad, tú decides'}</h2>
      <p style={{ fontSize: 14, lineHeight: 1.6 }}>{english ? 'Essential storage keeps the site working. Optional categories remain off until you choose them. You can reject all optional cookies and change your choice at any time.' : 'El almacenamiento necesario permite que el sitio funcione. Las categorías opcionales permanecen apagadas hasta que las elijas. Puedes rechazarlas todas y cambiar tu decisión cuando quieras.'}</p>
      {custom && <div style={{ display: 'grid', gap: 12, margin: '16px 0' }}>
        <label><input type="checkbox" checked disabled /> {english ? 'Necessary: security and storing your consent' : 'Necesarias: seguridad y guardar tu consentimiento'}</label>
        {(['preferences', 'analytics', 'marketing'] as const).map(category => <label key={category} style={{ display: 'flex', alignItems: 'start', gap: 8 }}><input type="checkbox" checked={values[category]} onChange={e => setValues(v => ({ ...v, [category]: e.target.checked }))} />{({ preferences: english ? 'Preferences: remember optional personalization' : 'Preferencias: recordar personalización opcional', analytics: english ? 'Analytics: understand visits and improve the site' : 'Analítica: conocer las visitas y mejorar el sitio', marketing: english ? 'Marketing: measure campaigns and personalize ads' : 'Marketing: medir campañas y personalizar anuncios' })[category]}</label>)}
        <small>{english ? 'This landing currently has no analytics or advertising trackers. Permission does not add new trackers.' : 'Esta landing actualmente no incluye rastreadores analíticos ni publicitarios. Dar permiso no agrega rastreadores nuevos.'}</small>
      </div>}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <button className="btn" type="button" onClick={() => save({ preferences: false, analytics: false, marketing: false })}>{english ? 'Reject optional' : 'Rechazar opcionales'}</button>
        <button className="btn" type="button" onClick={() => custom ? save(values) : setCustom(true)}>{custom ? (english ? 'Save selection' : 'Guardar selección') : (english ? 'Customize' : 'Personalizar')}</button>
        <button className="btn" type="button" onClick={() => save({ preferences: true, analytics: true, marketing: true })}>{english ? 'Accept all' : 'Aceptar todas'}</button>
      </div>
      <a href={english ? '/en/privacy' : '/privacidad'} style={{ display: 'inline-block', marginTop: 14, textDecoration: 'underline', fontSize: 13 }}>{english ? 'Privacy notice' : 'Aviso de privacidad'}</a>
    </section>}
  </>;
}
