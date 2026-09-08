import type { Metadata } from 'next';
import Preview from './preview';

export const metadata: Metadata = {
  title: 'Vista previa de borrador | PAWWER',
  robots: { index: false, follow: false },
};

export default function Page() { return <Preview />; }
