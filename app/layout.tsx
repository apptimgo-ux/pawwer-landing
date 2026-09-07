import type { Metadata } from 'next';
import './globals.css';
import { content } from './site-content';

export const metadata: Metadata = {
  metadataBase: new URL('https://pawwerapp.com'),
  title: content.es.meta.title,
  description: content.es.meta.description,
  applicationName: 'PAWWER',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX">
      <body>{children}</body>
    </html>
  );
}
