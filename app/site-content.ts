// Cargador de contenido. El contenido editable vive en /content/*.json
// (lo que edita el panel /admin). Aquí solo se ensambla y se le pone tipo.
import esData from '../content/es.json';
import enData from '../content/en.json';
import settings from '../content/settings.json';

export type Locale = 'es' | 'en';

type TwoLine = { a: string; b: string };
type Item = { h3: string; p: string };
type Plan = {
  name: string;
  price: string;
  summary: string;
  inherits: string;
  features: { text: string }[];
  note: string;
};
type CompareRow = { label: string; esencial: string; crecimiento: string; escala: string };

export type Content = {
  htmlLang: string;
  ogLocale: string;
  meta: { title: string; description: string };
  nav: {
    skip: string; links: { label: string; hash: string }[]; login: string;
    menuOpen: string; menuClose: string; langLabel: string; langAria: string;
  };
  hero: {
    kicker: string; h1: TwoLine; sub: string;
    ctaPrimary: string; ctaSecondary: string; bottomLeft: string; bottomRight: string;
  };
  chapter: { label: string; h2: TwoLine; p: string };
  solutions: {
    label: string; h2: TwoLine; phases: { name: string; line: string }[];
    pillarsEyebrow: string; pillarsTitle: TwoLine; showcaseEyebrow: string;
    items: Item[];
    mock: {
      bar: string; eyebrow: string; h3: string;
      leads: { stage: string; initials: string; name: string; role: string; status: string }[];
      context: string; caption: string;
    };
  };
  benefits: { label: string; h2: TwoLine; items: Item[] };
  pricing: {
    label: string; h2: TwoLine; intro: string; priceUnit: string;
    mostPopular: string; cta: string; activationLabel: string; compareFeatureCol: string;
    plans: Plan[];
    compareTitle: string;
    comparison: CompareRow[];
    agency: { label: string; h3: TwoLine; p: string; cta: string };
    notes: { lead: string; body: string }[];
  };
  contact: { label: string; h2: TwoLine; cta: string; addressLabel: string };
  footer: { privacy: string; privacyHref: string; rights: string };
};

export type PlanDetailCopy = {
  back: string; includesTitle: string; inheritsLabel: string; trialTitle: string;
  trialLines: { text: string }[];
  activationTitle: string; exclusionsTitle: string;
  ctaTrial: string; ctaCheckout: string; ctaSales: string; priceUnit: string;
};

// --- Contacto y ajustes ---
export const EMAIL = settings.contact.email;
export const PHONE_HREF = settings.contact.phoneHref;
export const PHONE_LABEL = settings.contact.phoneLabel;
export const CRM_URL = settings.contact.crmUrl;
export const ADDRESS_LINES = [settings.contact.addressLine1, settings.contact.addressLine2];
export const PRIVACY_REVIEW = settings.privacyReview as { es: string; en: string };
export const media = settings.media as { heroImage: string; showcaseImage: string; ogImage: string };

export const PLAN_SLUGS = ['esencial', 'crecimiento', 'escala'];

export const planSlug = (name: string): string => {
  const map: Record<string, string> = { Esencial: 'esencial', Crecimiento: 'crecimiento', Escala: 'escala' };
  return map[name] ?? name.toLowerCase();
};

export const planHref = (locale: Locale, slug: string) =>
  locale === 'es' ? `/planes/${slug}` : `/en/plans/${slug}`;

// Enlaces de checkout alojado (Stripe / Mercado Pago). Vacío = el botón inicia
// la prueba en el CRM. Se editan en /admin → Ajustes.
export const CHECKOUT_URLS: Record<string, string> = {
  Esencial: settings.checkout.esencial,
  Crecimiento: settings.checkout.crecimiento,
  Escala: settings.checkout.escala,
};

const PRICE_BY_SLUG: Record<string, string> = settings.prices;

function assemble(data: unknown): Content {
  const d = data as Content;
  return {
    ...d,
    pricing: {
      ...d.pricing,
      plans: d.pricing.plans.map(p => ({ ...p, price: PRICE_BY_SLUG[planSlug(p.name)] ?? '' })),
    },
  };
}

export const content: Record<Locale, Content> = {
  es: assemble(esData),
  en: assemble(enData),
};

export const planDetailCopy: Record<Locale, PlanDetailCopy> = {
  es: (esData as unknown as { planDetail: PlanDetailCopy }).planDetail,
  en: (enData as unknown as { planDetail: PlanDetailCopy }).planDetail,
};

// --- Correos ---
const MAIL_SUBJECTS = {
  es: {
    trial: 'Quiero solicitar la prueba de 7 días de PAWWER',
    agency: 'Quiero una propuesta de PAWWER Agencia',
    plan: (name: string) => `Me interesa el plan ${name} de PAWWER`,
  },
  en: {
    trial: 'I would like to request the PAWWER 7-day trial',
    agency: 'I would like a PAWWER Agencia proposal',
    plan: (name: string) => `I'm interested in the PAWWER ${name} plan`,
  },
};
const mail = (subject: string) => `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;
export function mailFor(locale: Locale) {
  const s = MAIL_SUBJECTS[locale];
  return { trial: mail(s.trial), agency: mail(s.agency), plan: (name: string) => mail(s.plan(name)) };
}
