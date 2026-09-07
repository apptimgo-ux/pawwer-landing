import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'PAWWER | CRM comercial y marketing', description: 'Organiza tus leads, centraliza la atención y convierte el seguimiento comercial en un sistema medible. Conoce los planes PAWWER desde $1,490 MXN al mes.' };
export default function RootLayout({children}: Readonly<{children:React.ReactNode}>){return <html lang="es-MX"><body>{children}</body></html>}
