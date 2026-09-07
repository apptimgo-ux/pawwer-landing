import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Paso 1 del login del panel /admin: manda a GitHub a autorizar.
export function GET(req: NextRequest) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    return new NextResponse('Falta la variable OAUTH_CLIENT_ID en Vercel.', { status: 500 });
  }
  const origin = req.nextUrl.origin;
  const state = crypto.randomUUID();
  const authorize = new URL('https://github.com/login/oauth/authorize');
  authorize.searchParams.set('client_id', clientId);
  authorize.searchParams.set('redirect_uri', `${origin}/api/oauth/callback`);
  authorize.searchParams.set('scope', 'repo,user');
  authorize.searchParams.set('state', state);

  const res = NextResponse.redirect(authorize);
  res.cookies.set('oauth_state', state, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 600,
  });
  return res;
}
