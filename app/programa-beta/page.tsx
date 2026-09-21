import type { Metadata } from 'next';
import LegalView from '../legal-view';
import { programaBeta } from '../legal-docs';

export const metadata: Metadata = {
  title: 'Programa beta | PAWWER',
  description: 'Las reglas de la beta de PAWWER: entras con un código, sin tarjeta, y al terminar eliges tu plan.',
  alternates: { canonical: '/programa-beta', languages: { 'es-MX': '/programa-beta', en: '/en/beta-program' } },
};

export default function Page() {
  return <LegalView locale="es" doc={programaBeta.es} altHref="/en/beta-program" />;
}
