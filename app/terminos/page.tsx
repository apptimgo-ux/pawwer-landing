import type { Metadata } from 'next';
import LegalView from '../legal-view';
import { terminos } from '../legal-docs';

export const metadata: Metadata = {
  title: 'Términos y condiciones | PAWWER',
  description: 'Las reglas del servicio de PAWWER: qué incluye, cómo se cobra, cómo se cancela y quién responde.',
  alternates: { canonical: '/terminos', languages: { 'es-MX': '/terminos', en: '/en/terms' } },
};

export default function Page() {
  return <LegalView locale="es" doc={terminos.es} altHref="/en/terms" />;
}
