import { content, EMAIL, PHONE_HREF, PHONE_LABEL, ADDRESS_LINES, CRM_URL, PLAN_SLUGS, siteSettings } from './site-content';
import { REDES_SOCIALES } from './redes-sociales';

/**
 * SEO: lo que se le da a Google y a los modelos de lenguaje.
 *
 * ============================================================
 * POR QUE ESTE ARCHIVO EXISTE
 *
 * La landing tenia canonical, hreflang, Open Graph y Twitter — la parte
 * que se escribe una vez y no se vuelve a tocar. Lo que no tenia era
 * nada de lo que de verdad mueve la aguja hoy: ni `robots.txt`, ni
 * sitemap, ni un solo dato estructurado. Google llevaba meses
 * adivinando que es PAWWER, cuanto cuesta y quien lo hace.
 *
 * ============================================================
 * ⚠️ TODO LO DE AQUI TIENE QUE SER VERDAD
 *
 * Un dato estructurado es una AFIRMACION sobre el negocio, hecha en un
 * formato que las maquinas creen sin discutir. Un precio que no
 * coincide con el checkout es una promesa incumplida en el resultado de
 * busqueda; una calificacion inventada es motivo de penalizacion
 * manual. Por eso:
 *
 *   · Los precios salen de `settings.json`, el MISMO archivo del que
 *     salen los botones de compra. Si cambia uno, cambia el otro.
 *   · NO hay `aggregateRating` ni `review`: PAWWER todavia no tiene
 *     resenas reales, y ese es justo el campo que Google audita.
 *   · Las respuestas del FAQ dicen lo que el producto HACE hoy, no lo
 *     que va a hacer. Donde algo esta a medias, se dice.
 * ============================================================
 */

export const SITE_URL = 'https://www.pawwerapp.com';

/** Toda ruta publica del sitio, con su gemela en el otro idioma. */
export const RUTAS: { es: string; en: string; prioridad: number }[] = [
  { es: '/', en: '/en', prioridad: 1 },
  ...PLAN_SLUGS.map(slug => ({ es: `/planes/${slug}`, en: `/en/plans/${slug}`, prioridad: 0.8 })),
  { es: '/programa-beta', en: '/en/beta-program', prioridad: 0.6 },
  { es: '/privacidad', en: '/en/privacy', prioridad: 0.3 },
  { es: '/terminos', en: '/en/terms', prioridad: 0.3 },
  { es: '/reembolsos', en: '/en/refunds', prioridad: 0.3 },
  { es: '/tratamiento-de-datos', en: '/en/data-processing', prioridad: 0.3 },
];

const abs = (ruta: string) => `${SITE_URL}${ruta === '/' ? '' : ruta}`;

/**
 * La organizacion. Lo que contesta «quien es PAWWER», y lo que un
 * modelo de lenguaje cita cuando alguien le pregunta por el producto.
 *
 * ⚠️ La direccion y el telefono salen de `settings.json`, que es lo que
 * tambien se pinta en el pie. Dos copias del domicilio fiscal de una
 * empresa terminan diciendo cosas distintas.
 */
export function organizacion() {
  return {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organizacion`,
    name: 'PAWWER',
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    sameAs: REDES_SOCIALES.map(red => red.url),
    email: EMAIL,
    telephone: PHONE_LABEL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: ADDRESS_LINES[0],
      addressLocality: 'Culiacán Rosales',
      addressRegion: 'Sinaloa',
      postalCode: '80100',
      addressCountry: 'MX',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: EMAIL,
      telephone: PHONE_HREF.replace('tel:', ''),
      availableLanguage: ['es-MX', 'en'],
    },
  };
}

/** Un plan, como oferta. El precio sale del mismo sitio que el boton. */
function oferta(slug: string, locale: 'es' | 'en') {
  const plan = content[locale].plans.find(p => p.slug === slug);
  const precio = (siteSettings.prices as Record<string, string>)[slug] || '';
  const numero = precio.replace(/[^0-9.]/g, '');
  return {
    '@type': 'Offer',
    name: plan?.name || slug,
    url: abs(locale === 'es' ? `/planes/${slug}` : `/en/plans/${slug}`),
    price: numero,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
    // ⚠️ `valueAddedTaxIncluded: false` porque los precios de PAWWER NO
    // llevan impuesto dentro (decision del 13 de septiembre de 2026, y
    // los tres productos de Dodo van con `tax_inclusive` apagado). Un
    // resultado de busqueda que ensena $89 con impuesto incluido es un
    // precio que no existe.
    priceSpecification: {
      '@type': 'UnitPriceSpecification',
      price: numero,
      priceCurrency: 'USD',
      valueAddedTaxIncluded: false,
      unitText: locale === 'es' ? 'mes' : 'month',
    },
  };
}

/**
 * El producto. `SoftwareApplication` y no `Product` a secas: es lo que
 * deja decir que corre en navegador, en que idiomas y en que categoria,
 * que es exactamente lo que un modelo necesita para contestar «que es
 * PAWWER» sin inventarlo.
 */
export function aplicacion(locale: 'es' | 'en') {
  const t = content[locale];
  return {
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#aplicacion`,
    name: 'PAWWER',
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'CRM',
    operatingSystem: 'Web',
    url: CRM_URL,
    description: t.meta.description,
    inLanguage: ['es-MX', 'en'],
    publisher: { '@id': `${SITE_URL}/#organizacion` },
    offers: PLAN_SLUGS.map(slug => oferta(slug, locale)),
    // ⚠️ Nada de `aggregateRating` ni `review` mientras no haya resenas
    // de verdad: es el campo que Google audita a mano, y una calificacion
    // inventada cuesta una penalizacion, no un puesto.
  };
}

/** Las migas de una pagina de plan. */
export function migas(locale: 'es' | 'en', slug: string) {
  const plan = content[locale].plans.find(p => p.slug === slug);
  const planes = locale === 'es' ? '/#planes' : '/en#planes';
  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'PAWWER', item: abs(locale === 'es' ? '/' : '/en') },
      { '@type': 'ListItem', position: 2, name: locale === 'es' ? 'Planes' : 'Plans', item: abs(planes) },
      { '@type': 'ListItem', position: 3, name: plan?.name || slug },
    ],
  };
}

/** Las preguntas de la landing, como `FAQPage`. */
export function preguntas(locale: 'es' | 'en') {
  const bloque = content[locale].blocks.find(b => b.type === 'faq');
  if (!bloque || bloque.type !== 'faq' || !bloque.items?.length) return null;
  return {
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#preguntas`,
    mainEntity: bloque.items.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Un grafo, no cinco bloques sueltos: así las piezas se referencian entre sí. */
export function grafoDeLanding(locale: 'es' | 'en') {
  const piezas: unknown[] = [organizacion(), aplicacion(locale)];
  const faq = preguntas(locale);
  if (faq) piezas.push(faq);
  return { '@context': 'https://schema.org', '@graph': piezas };
}

export function grafoDePlan(locale: 'es' | 'en', slug: string) {
  const plan = content[locale].plans.find(p => p.slug === slug);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizacion(),
      migas(locale, slug),
      {
        '@type': 'Product',
        name: `PAWWER ${plan?.name || slug}`,
        description: plan?.summary || '',
        brand: { '@id': `${SITE_URL}/#organizacion` },
        url: abs(locale === 'es' ? `/planes/${slug}` : `/en/plans/${slug}`),
        offers: oferta(slug, locale),
      },
    ],
  };
}
