import type { Metadata } from 'next';
import PrivacyView from '../privacy-view';

export const metadata: Metadata = {
  title: 'Política de privacidad | PAWWER',
  robots: { index: false, follow: true },
  alternates: { canonical: '/privacidad', languages: { 'es-MX': '/privacidad', en: '/en/privacy' } },
};

export default function Page() {
  return <PrivacyView locale="es" />;
}
