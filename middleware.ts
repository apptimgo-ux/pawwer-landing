import { NextRequest, NextResponse } from 'next/server';

// Idioma por geolocalización. En la primera visita a la raíz ("/"), si el
// visitante NO está en un país de habla hispana, se le envía a /en.
// La elección manual con el selector ES/EN se guarda en una cookie y manda
// siempre por encima de la geolocalización.
//
// Nota: la geolocalización (cabecera x-vercel-ip-country) solo existe en
// Vercel. En local se usa Accept-Language como respaldo.

const SPANISH_COUNTRIES = new Set([
  'MX', 'ES', 'AR', 'CO', 'CL', 'PE', 'VE', 'EC', 'GT', 'CU',
  'BO', 'DO', 'HN', 'PY', 'SV', 'NI', 'CR', 'PA', 'UY', 'GQ', 'PR',
]);

const YEAR = 60 * 60 * 24 * 365;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const onEnglish = pathname === '/en' || pathname.startsWith('/en/');
  const pathLocale = onEnglish ? 'en' : 'es';
  const cookieLocale = req.cookies.get('locale')?.value;

  const withCookie = (res: NextResponse) => {
    if (cookieLocale !== pathLocale) {
      res.cookies.set('locale', pathLocale, { path: '/', maxAge: YEAR, sameSite: 'lax' });
    }
    return res;
  };

  // Solo auto-redirige en la raíz en español y solo si aún no hay preferencia.
  if (pathname === '/' && !cookieLocale) {
    const country = (req.headers.get('x-vercel-ip-country') || '').toUpperCase();
    const accept = (req.headers.get('accept-language') || '').toLowerCase();
    const wantsEnglish = country
      ? !SPANISH_COUNTRIES.has(country)
      : accept
        ? !accept.startsWith('es') && !/[,;\s]es[-;,]/.test(accept)
        : false;
    if (wantsEnglish) {
      const url = req.nextUrl.clone();
      url.pathname = '/en';
      return withCookie(NextResponse.redirect(url, 307));
    }
  }

  return withCookie(NextResponse.next());
}

export const config = {
  matcher: ['/', '/en', '/en/:path*', '/planes/:path*'],
};
