import type { Metadata } from 'next';
import { Bricolage_Grotesque } from 'next/font/google';
import './globals.css';
import { content } from './site-content';
import Reveal from './reveal';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pawwerapp.com'),
  title: content.es.meta.title,
  description: content.es.meta.description,
  applicationName: 'PAWWER',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-MX" className={display.variable}>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  );
}
