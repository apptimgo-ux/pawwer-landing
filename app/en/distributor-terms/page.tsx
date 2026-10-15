import type { Metadata } from 'next';
import LegalView from '../../legal-view';
import { terminosDistribuidores } from '../../legal-distribuidores';

export const metadata: Metadata = {
  title: 'Distributor terms | PAWWER',
  description: 'The rules of the PAWWER distributor program: membership, clients, 15% commission and when it is paid.',
  alternates: { canonical: '/en/distributor-terms', languages: { 'es-MX': '/terminos-distribuidores', en: '/en/distributor-terms' } },
};

export default function Page() {
  return <LegalView locale="en" doc={terminosDistribuidores.en} altHref="/terminos-distribuidores" />;
}
