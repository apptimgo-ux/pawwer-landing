import type { Metadata } from 'next';
import LegalView from '../../legal-view';
import { terminos } from '../../legal-docs';

export const metadata: Metadata = {
  title: 'Terms and conditions | PAWWER',
  description: 'The rules of the PAWWER service: what it includes, how it is billed, how to cancel and who is responsible.',
  alternates: { canonical: '/en/terms', languages: { 'es-MX': '/terminos', en: '/en/terms' } },
};

export default function Page() {
  return <LegalView locale="en" doc={terminos.en} altHref="/terminos" />;
}
