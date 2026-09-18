import type { Metadata } from 'next';
import LegalView from '../../legal-view';
import { reembolsos } from '../../legal-docs';

export const metadata: Metadata = {
  title: 'Refund and cancellation policy | PAWWER',
  description: 'How to cancel PAWWER, what happens with the period already paid, and when a charge is corrected.',
  alternates: { canonical: '/en/refunds', languages: { 'es-MX': '/reembolsos', en: '/en/refunds' } },
};

export default function Page() {
  return <LegalView locale="en" doc={reembolsos.en} altHref="/reembolsos" />;
}
