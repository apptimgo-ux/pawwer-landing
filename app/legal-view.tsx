import type { ReactNode } from 'react';
import { Header, Footer } from './site-ui';
import type { Locale } from './site-content';

/**
 * La página de un documento legal: términos, reembolsos, encargo de datos
 * y programa beta.
 *
 * Es la misma cáscara que `privacy-view.tsx` (encabezado, prosa y pie), sacada
 * aparte para que todos los documentos se lean igual y no haya una maqueta
 * por documento que mantener. El contenido vive en `legal-docs.tsx`.
 */

export type Bloque = { h2: string; ps: ReactNode[] };

export type Documento = {
  back: string;
  label: string;
  h1: string;
  lead: string;
  nota?: ReactNode;
  blocks: Bloque[];
};

export default function LegalView({
  locale, doc, altHref,
}: { locale: Locale; doc: Documento; altHref: string }) {
  const homeHref = locale === 'es' ? '/' : '/en';
  return (
    <>
      <Header locale={locale} homeHref={homeHref} altHref={altHref} />
      <main id="contenido" className="prose-page" lang={locale === 'en' ? 'en' : undefined}>
        <a href={homeHref} className="back">{doc.back}</a>
        <p className="section-label">{doc.label}</p>
        <h1>{doc.h1}</h1>
        <p>{doc.lead}</p>
        {doc.nota && <p className="legal-note">{doc.nota}</p>}
        {doc.blocks.map(b => (
          <section key={b.h2}>
            <h2>{b.h2}</h2>
            {b.ps.map((p, i) => <p key={i}>{p}</p>)}
          </section>
        ))}
      </main>
      <Footer locale={locale} homeHref={homeHref} />
    </>
  );
}
