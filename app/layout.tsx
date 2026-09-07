import type { Metadata } from 'next';
import './globals.css';
const title = 'PAWWER | CRM comercial y marketing';
const description = 'Organiza tus leads, centraliza la atención y convierte el seguimiento comercial en un sistema medible. Conoce los planes PAWWER desde $1,490 MXN al mes.';
export const metadata: Metadata = {
  metadataBase: new URL('https://pawwerapp.com'),
  title,
  description,
  applicationName: 'PAWWER',
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
  openGraph: { type: 'website', locale: 'es_MX', url: '/', siteName: 'PAWWER', title, description, images: ['/hero.jpg'] },
  twitter: { card: 'summary_large_image', title, description, images: ['/hero.jpg'] },
};
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>){return <html lang="es-MX"><body>{children}</body></html>}
