import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PlanDetail from '../../../plan-detail';
import { content, planSlug, PLAN_SLUGS } from '../../../site-content';

export const dynamicParams = false;

export function generateStaticParams() {
  return PLAN_SLUGS.map(slug => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const plan = content.en.pricing.plans.find(p => planSlug(p.name) === slug);
  if (!plan) return {};
  const title = `${plan.name} plan | PAWWER`;
  return {
    title,
    description: plan.summary,
    alternates: {
      canonical: `/en/plans/${slug}`,
      languages: { 'es-MX': `/planes/${slug}`, en: `/en/plans/${slug}` },
    },
    openGraph: { type: 'website', locale: 'en_US', url: `/en/plans/${slug}`, siteName: 'PAWWER', title, description: plan.summary, images: ['/hero.jpg'] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!content.en.pricing.plans.some(p => planSlug(p.name) === slug)) notFound();
  return <PlanDetail locale="en" slug={slug} />;
}
