import type { Metadata } from 'next';
import LegalView from '../../legal-view';
import { tratamiento } from '../../legal-docs';

export const metadata: Metadata = {
  title: 'Data processing agreement | PAWWER',
  description: 'How PAWWER processes your contacts’ data on behalf of your business: with which providers, which security measures and what happens if something fails.',
  alternates: { canonical: '/en/data-processing', languages: { 'es-MX': '/tratamiento-de-datos', en: '/en/data-processing' } },
};

export default function Page() {
  return <LegalView locale="en" doc={tratamiento.en} altHref="/tratamiento-de-datos" />;
}
