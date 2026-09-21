import type { Metadata } from 'next';
import LegalView from '../../legal-view';
import { programaBeta } from '../../legal-docs';

export const metadata: Metadata = {
  title: 'Beta program | PAWWER',
  description: 'The rules of the PAWWER beta: you get in with a code, no card needed, and when it ends you choose your plan.',
  alternates: { canonical: '/en/beta-program', languages: { 'es-MX': '/programa-beta', en: '/en/beta-program' } },
};

export default function Page() {
  return <LegalView locale="en" doc={programaBeta.en} altHref="/programa-beta" />;
}
