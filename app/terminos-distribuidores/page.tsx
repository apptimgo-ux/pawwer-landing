import type { Metadata } from 'next';
import LegalView from '../legal-view';
import { terminosDistribuidores } from '../legal-distribuidores';

export const metadata: Metadata = {
  title: 'Términos para distribuidores | PAWWER',
  description: 'Las reglas del programa de distribuidores de PAWWER: membresía, clientes, comisión del 15% y cuándo se paga.',
  alternates: { canonical: '/terminos-distribuidores', languages: { 'es-MX': '/terminos-distribuidores', en: '/en/distributor-terms' } },
};

export default function Page() {
  return <LegalView locale="es" doc={terminosDistribuidores.es} altHref="/en/distributor-terms" />;
}
