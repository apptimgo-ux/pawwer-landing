import type { NextConfig } from 'next';

/**
 * Cabeceras de seguridad de la landing (15 de octubre de 2026, auditoría).
 * Antes solo salía HSTS (la pone Vercel). La CSP es MÍNIMA a propósito: solo
 * cierra lo que no se usa (iframes ajenos, <object>, <base> y formularios a
 * otros dominios). Una CSP de scripts completa rompería Google Analytics y el
 * pixel de Meta, que cargan solo con permiso; eso va en otra pasada.
 * `frame-ancestors 'self'` y no 'none': el editor /admin pinta la vista previa
 * de la landing en un iframe del mismo dominio.
 */
const SEGURIDAD = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()' },
  { key: 'Content-Security-Policy', value: "frame-ancestors 'self'; object-src 'none'; base-uri 'self'; form-action 'self' https://crm.pawwerapp.com" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: SEGURIDAD }];
  },
  async rewrites() {
    // El panel del editor vive en public/admin/index.html
    return [{ source: '/admin', destination: '/admin/index.html' }];
  },
};

export default nextConfig;
