import type { Metadata } from 'next';
import DistribuidoresView from '../distribuidores-view';

export const metadata: Metadata = {
  title: 'Distribuidores | PAWWER',
  description: 'Comparte PAWWER con los negocios que conoces y gana 15% de lo que paguen, cada mes. PAWWER les cobra y da la plataforma.',
  alternates: { canonical: '/distribuidores', languages: { 'es-MX': '/distribuidores', en: '/en/distributors' } },
};

export default function Page() {
  return <DistribuidoresView locale="es" />;
}
