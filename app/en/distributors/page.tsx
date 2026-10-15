import type { Metadata } from 'next';
import DistribuidoresView from '../../distribuidores-view';

export const metadata: Metadata = {
  title: 'Distributors | PAWWER',
  description: 'Share PAWWER with the businesses you know and earn 15% of what they pay, every month. PAWWER bills them and runs the platform.',
  alternates: { canonical: '/en/distributors', languages: { 'es-MX': '/distribuidores', en: '/en/distributors' } },
};

export default function Page() {
  return <DistribuidoresView locale="en" />;
}
