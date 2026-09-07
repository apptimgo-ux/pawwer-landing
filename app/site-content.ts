// Cargador de contenido. Lo editable vive en /content/*.json (lo que escribe
// el panel /admin). Aquí solo se ensambla y se le pone tipo.
import esData from '../content/es.json';
import enData from '../content/en.json';
import settings from '../content/settings.json';

export type Locale = 'es' | 'en';

type Item = { icon?: string; h3: string; p: string };
type Phase = { name: string; line: string };
type Lead = { stage: string; initials: string; name: string; role: string; status: string };
type Note = { lead: string; body: string };

export type Block =
  | { type: 'hero'; anchor?: string; kicker: string; h1a: string; h1b: string; sub: string; ctaPrimary: string; ctaSecondary: string; metaLeft: string; metaRight: string; mediaType: 'none' | 'image' | 'video'; image: string; video: string; poster: string }
  | { type: 'statement'; anchor?: string; label: string; h2a: string; h2b: string; body: string }
  | { type: 'process'; anchor?: string; label: string; h2a: string; h2b: string; phases: Phase[] }
  | { type: 'pillars'; anchor?: string; eyebrow: string; h2a: string; h2b: string; items: Item[] }
  | { type: 'showcase'; anchor?: string; eyebrow: string; h2: string; body: string; image: string; mock: { bar: string; eyebrow: string; h3: string; leads: Lead[]; context: string; caption: string } }
  | { type: 'benefits'; anchor?: string; eyebrow: string; h2a: string; h2b: string; items: Item[] }
  | { type: 'logos'; anchor?: string; eyebrow: string; title: string; items: { image: string; alt: string; url?: string }[] }
  | { type: 'pricing'; anchor?: string; eyebrow: string; h2a: string; h2b: string; intro: string; priceUnit: string; mostPopular: string; cta: string; activationLabel: string; compareTitle: string; compareFeatureCol: string; showComparison: boolean }
  | { type: 'agency'; anchor?: string; eyebrow: string; h2a: string; h2b: string; body: string; cta: string }
  | { type: 'notes'; anchor?: string; items: Note[] }
  | { type: 'cta'; anchor?: string; eyebrow: string; h2a: string; h2b: string; buttonLabel: string };

export type Plan = {
  slug: string;
  name: string;
  price: string;
  summary: string;
  inherits: string;
  features: { text: string }[];
  note: string;
};
export type CompareRow = { label: string; esencial: string; crecimiento: string; escala: string };

export type PlanDetailCopy = {
  back: string; includesTitle: string; inheritsLabel: string; trialTitle: string;
  trialLines: { text: string }[];
  activationTitle: string; exclusionsTitle: string;
  ctaTrial: string; ctaCheckout: string; ctaSales: string; priceUnit: string;
};

export type Content = {
  htmlLang: string;
  ogLocale: string;
  meta: { title: string; description: string };
  nav: {
    skip: string; links: { label: string; hash: string }[]; login: string;
    menuOpen: string; menuClose: string; langLabel: string; langAria: string;
  };
  footer: { privacy: string; privacyHref: string; rights: string };
  plans: Plan[];
  comparison: CompareRow[];
  planDetail: PlanDetailCopy;
  blocks: Block[];
};

// --- Contacto y ajustes ---
export const EMAIL = settings.contact.email;
export const PHONE_HREF = settings.contact.phoneHref;
export const PHONE_LABEL = settings.contact.phoneLabel;
export const CRM_URL = settings.contact.crmUrl;
export const ADDRESS_LINES = [settings.contact.addressLine1, settings.contact.addressLine2];
export const PRIVACY_REVIEW = settings.privacyReview as { es: string; en: string };
export const OG_IMAGE = settings.media.ogImage || '/hero.jpg';

export const PLAN_SLUGS = ['esencial', 'crecimiento', 'escala'];

// El plan se identifica por `slug` (estable en los dos idiomas). El `name`
// es texto localizado — en inglés es Essential / Growth / Scale.
export const planHref = (locale: Locale, slug: string) =>
  locale === 'es' ? `/planes/${slug}` : `/en/plans/${slug}`;

export const CHECKOUT_URLS: Record<string, string> = {
  esencial: settings.checkout.esencial,
  crecimiento: settings.checkout.crecimiento,
  escala: settings.checkout.escala,
};

const PRICE_BY_SLUG: Record<string, string> = settings.prices;

function assemble(data: unknown): Content {
  const d = data as Content;
  return {
    ...d,
    plans: d.plans.map(p => ({ ...p, price: PRICE_BY_SLUG[p.slug] ?? '' })),
  };
}

export const content: Record<Locale, Content> = {
  es: assemble(esData),
  en: assemble(enData),
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
