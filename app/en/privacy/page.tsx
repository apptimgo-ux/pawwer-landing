import type { Metadata } from 'next';
import PrivacyView from '../../privacy-view';

export const metadata: Metadata = {
  title: 'Privacy policy | PAWWER',
  robots: { index: false, follow: true },
  alternates: { canonical: '/en/privacy', languages: { 'es-MX': '/privacidad', en: '/en/privacy' } },
};

export default function Page() {
  return <PrivacyView locale="en" />;
}
