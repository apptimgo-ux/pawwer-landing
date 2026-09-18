import type { Metadata } from 'next';
import LegalView from '../legal-view';
import { reembolsos } from '../legal-docs';

export const metadata: Metadata = {
  title: 'Política de reembolso y cancelación | PAWWER',
  description: 'Cómo se cancela PAWWER, qué pasa con el periodo ya pagado y en qué casos se corrige un cobro.',
  alternates: { canonical: '/reembolsos', languages: { 'es-MX': '/reembolsos', en: '/en/refunds' } },
};

export default function Page() {
  return <LegalView locale="es" doc={reembolsos.es} altHref="/en/refunds" />;
}
