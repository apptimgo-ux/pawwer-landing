import type { Metadata } from 'next';
import Landing from '../landing';
import { content, media } from '../site-content';

const t = content.en;
const ogImage = media.ogImage || '/hero.jpg';

export const metadata: Metadata = {
  title: t.meta.title,
  description: t.meta.description,
  alternates: { canonical: '/en', languages: { 'es-MX': '/', en: '/en', 'x-default': '/' } },
  openGraph: { type: 'website', locale: t.ogLocale, alternateLocale: 'es_MX', url: '/en', siteName: 'PAWWER', title: t.meta.title, description: t.meta.description, images: [ogImage] },
  twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.description, images: [ogImage] },
};

export default function Page() {
  return <Landing locale="en" />;
}
