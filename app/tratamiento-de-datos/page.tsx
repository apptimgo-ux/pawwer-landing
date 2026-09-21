import type { Metadata } from 'next';
import LegalView from '../legal-view';
import { tratamiento } from '../legal-docs';

export const metadata: Metadata = {
  title: 'Contrato de encargo de datos | PAWWER',
  description: 'Cómo trata PAWWER, por cuenta de tu negocio, los datos de tus contactos: con qué proveedores, qué medidas de seguridad y qué pasa si algo falla.',
  alternates: { canonical: '/tratamiento-de-datos', languages: { 'es-MX': '/tratamiento-de-datos', en: '/en/data-processing' } },
};

export default function Page() {
  return <LegalView locale="es" doc={tratamiento.es} altHref="/en/data-processing" />;
}
