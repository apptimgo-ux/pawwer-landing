import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Paso 2: GitHub vuelve aquí con un code. Lo cambiamos por un token y se lo
// pasamos a la ventana del panel (protocolo de Decap / Sveltia CMS).
function resultPage(status: 'success' | 'error', payload: Record<string, unknown>) {
  const data = JSON.stringify(payload).replace(/</g, '\\u003c');
  return `<!doctype html><html lang="es"><head><meta charset="utf-8"><title>PAWWER · Editor</title></head>
<body style="font:15px system-ui;padding:40px">
<p>Autenticación ${status === 'success' ? 'completada' : 'con error'}. Puedes cerrar esta ventana.</p>
<script>
(function () {
  function send(e) {
    if (!window.opener) return;
    window.opener.postMessage('authorization:github:${status}:' + ${JSON.stringify(data)}, e.origin);
    window.removeEventListener('message', send, false);
  }
  window.addEventListener('message', send, false);
  if (window.opener) window.opener.postMessage('authorizing:github', '*');
})();
</script>
</body></html>`;
}

export async function GET(req: NextRequest) {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const code = req.nextUrl.searchParams.get('code');
  const state = req.nextUrl.searchParams.get('state');
  const savedState = req.cookies.get('oauth_state')?.value;

  const html = (status: 'success' | 'error', payload: Record<string, unknown>) =>
    new NextResponse(resultPage(status, payload), {
      headers: { 'content-type': 'text/html; charset=utf-8' },
    });

  if (!clientId || !clientSecret) return html('error', { error: 'Faltan OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET.' });
  if (!code) return html('error', { error: 'missing_code' });
  if (!state || state !== savedState) return html('error', { error: 'bad_state' });

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
  });
  const token = (await tokenRes.json()) as { access_token?: string; error?: string };
  if (!token.access_token) return html('error', { error: token.error || 'no_token' });

  return html('success', { token: token.access_token, provider: 'github' });
}
