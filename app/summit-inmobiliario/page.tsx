import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PAWWER para el Summit Inmobiliario AISIN Sinaloa 2026',
  description: 'Convierte cada consulta inmobiliaria en una oportunidad. Beneficio exclusivo para asistentes del Summit Inmobiliario AISIN Sinaloa 2026.',
  alternates: { canonical: '/summit-inmobiliario' },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    url: '/summit-inmobiliario',
    siteName: 'PAWWER',
    title: 'PAWWER para el Summit Inmobiliario AISIN Sinaloa 2026',
    description: 'Contenido, conversaciones y seguimiento inmobiliario en un solo lugar.',
  },
};

export default async function SummitInmobiliario({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) value.forEach((item) => query.append(key, item));
    else if (value !== undefined) query.set(key, value);
  }
  const suffix = query.size ? `?${query.toString()}` : '';

  return (
    <main style={{ position: 'fixed', inset: 0, zIndex: 2147483647, background: '#f8f7f4' }}>
      <iframe
        title="PAWWER en el Summit Inmobiliario AISIN Sinaloa 2026"
        src={`/summit-inmobiliario/index.html${suffix}`}
        style={{ display: 'block', width: '100%', height: '100%', border: 0 }}
        allow="autoplay; fullscreen"
      />
    </main>
  );
}
