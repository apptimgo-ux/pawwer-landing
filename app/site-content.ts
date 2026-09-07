// Contenido público editable / editable public content.
// Nunca agregar secretos ni configuración del CRM aquí.
// Never add secrets or CRM configuration here.

export type Locale = 'es' | 'en';

// --- Datos de contacto (compartidos entre idiomas) ---
export const EMAIL = 'cuentamelo@pawwerapp.com';
export const PHONE_HREF = 'tel:+526678002000';
export const PHONE_LABEL = '667 800 2000';
export const CRM_URL = 'https://crm.pawwerapp.com';
export const ADDRESS_LINES = ['Torre B, Blvd. Pedro Infante 2550-Piso 1,', 'Los Álamos, 80100 Culiacán Rosales, Sin.'];
// Fecha de revisión de la política de privacidad.
export const PRIVACY_REVIEW = { es: '6 de septiembre de 2026', en: 'September 6, 2026' };

// Precios mensuales en USD (definidos por el cliente).
const PRICES: Record<string, string> = { Esencial: '$99', Crecimiento: '$199', Escala: '$349' };

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

type Plan = {
  name: string;
  price: string;
  summary: string;
  inherits: string;
  features: string[];
  note: string;
};

type Content = {
  htmlLang: string;
  ogLocale: string;
  meta: { title: string; description: string };
  nav: { skip: string; links: { label: string; hash: string }[]; login: string; menuOpen: string; menuClose: string; langLabel: string; langAria: string };
  hero: {
    kicker: string; h1: [string, string]; sub: string;
    ctaPrimary: string; ctaSecondary: string; bottomLeft: string; bottomRight: string;
    motionPlay: string; motionPause: string; motionPlayAria: string; motionPauseAria: string;
  };
  chapter: { label: string; h2: [string, string]; p: string };
  solutions: {
    label: string; h2: [string, string]; phases: string[];
    items: { h3: string; p: string }[];
    mock: {
      bar: string; eyebrow: string; h3: string;
      stages: string[]; names: string[]; roles: string[];
      statusDefault: string; statusFeatured: string; context: string; caption: string;
    };
  };
  benefits: { label: string; h2: [string, string]; items: { h3: string; p: string }[] };
  pricing: {
    label: string; h2: [string, string]; intro: string; priceUnit: string;
    mostPopular: string; cta: string; activationLabel: string;
    plans: Plan[];
    agency: { label: string; h3: [string, string]; p: string; cta: string };
    notes: { lead?: string; body: string }[];
  };
  contact: { label: string; h2: [string, string]; cta: string; addressLabel: string };
  footer: { privacy: string; privacyHref: string; rights: string };
};

export const content: Record<Locale, Content> = {
  es: {
    htmlLang: 'es-MX',
    ogLocale: 'es_MX',
    meta: {
      title: 'PAWWER | CRM comercial y de marketing',
      description: 'Organiza tus leads, centraliza la atención y convierte el seguimiento comercial en un sistema medible. Conoce los planes PAWWER desde $99 USD al mes.',
    },
    nav: {
      skip: 'Saltar al contenido',
      links: [
        { label: 'Soluciones', hash: '#soluciones' },
        { label: 'Beneficios', hash: '#beneficios' },
        { label: 'Planes', hash: '#planes' },
        { label: 'Contacto', hash: '#contacto' },
      ],
      login: 'Sign in / Login',
      menuOpen: 'Abrir menú',
      menuClose: 'Cerrar menú',
      langLabel: 'EN',
      langAria: 'View this page in English',
    },
    hero: {
      kicker: 'CRM comercial y de marketing',
      h1: ['Los datos', 'crean impulso.'],
      sub: 'Tus leads ya están hablando. PAWWER convierte cada conversación en contexto, y cada contexto en acción.',
      ctaPrimary: 'Construye tu sistema',
      ctaSecondary: 'Explorar el proceso',
      bottomLeft: 'Desliza para explorar',
      bottomRight: 'CRM / Marketing / Seguimiento',
      motionPlay: 'Ver movimiento',
      motionPause: 'Pausar movimiento',
      motionPlayAria: 'Reproducir fondo animado',
      motionPauseAria: 'Pausar fondo animado',
    },
    chapter: {
      label: 'PAWWER para equipos en movimiento',
      h2: ['Cuando todo lo que', 'importa está conectado.'],
      p: 'Una sola lectura de tu operación comercial: captas, atiendes, conviertes y mides sin perder el hilo.',
    },
    solutions: {
      label: 'Explora el proceso',
      h2: ['De la primera señal', 'al siguiente paso.'],
      phases: ['Captar', 'Entender', 'Atender', 'Convertir', 'Medir'],
      items: [
        { h3: 'Atiende con contexto', p: 'Leads, contactos y seguimiento en un mismo lugar para que cada conversación tenga continuidad.' },
        { h3: 'Convierte interés en acción', p: 'Relaciona tu calendario con el seguimiento y da a cada oportunidad un próximo paso.' },
        { h3: 'Mide lo que mueve al equipo', p: 'Origen, resultados y analítica operativa para decidir dónde invertir energía.' },
      ],
      mock: {
        bar: 'Sistema operativo comercial',
        eyebrow: 'Hoy · 09:42',
        h3: 'El siguiente paso es claro.',
        stages: ['Nuevo lead', 'En seguimiento', 'Propuesta'],
        names: ['Andrea C.', 'Luis M.', 'Sofía R.'],
        roles: ['Consulta de servicio', 'Propuesta en revisión', 'Proyecto comercial'],
        statusDefault: 'Próximo paso definido',
        statusFeatured: 'Cita agendada',
        context: 'Un historial para dar continuidad.',
        caption: 'Vista conceptual · datos ficticios',
      },
    },
    benefits: {
      label: 'La capa operativa',
      h2: ['Menos memoria.', 'Más impulso.'],
      items: [
        { h3: 'Un lugar para cada lead', p: 'Centraliza contactos y oportunidades para trabajar con una visión compartida.' },
        { h3: 'Un próximo paso claro', p: 'Conecta citas y seguimiento para mantener el ritmo comercial.' },
        { h3: 'Una lectura medible', p: 'Entiende qué funciona y qué necesita atención desde Crecimiento y Escala.' },
      ],
    },
    pricing: {
      label: 'Planes y precios',
      h2: ['Elige el ritmo', 'de tu crecimiento.'],
      intro: '7 días sin cargo con acceso temporal al nivel Escala. Precios en dólares estadounidenses (USD).',
      priceUnit: 'USD / mes',
      mostPopular: 'Más elegido',
      cta: 'Empezar',
      activationLabel: 'En activación',
      plans: [
        {
          name: 'Esencial', price: PRICES.Esencial,
          summary: 'Pon orden en tu operación comercial.',
          inherits: 'Lo esencial para comenzar',
          features: ['CRM de leads, contactos y seguimiento', 'Calendario de citas', 'Marca, biblioteca y preparación de contenidos', '3 integrantes', 'Hasta 2 canales con conexión oficial', '60 créditos operativos'],
          note: '',
        },
        {
          name: 'Crecimiento', price: PRICES.Crecimiento,
          summary: 'Conecta tus contenidos con tus oportunidades.',
          inherits: 'Todo Esencial, más',
          features: ['10 integrantes', 'Planner de contenidos', 'Mapa y origen de leads', 'Resultados, cotizaciones y contratos', 'Hasta 4 canales con conexión oficial', '180 créditos operativos'],
          note: '',
        },
        {
          name: 'Escala', price: PRICES.Escala,
          summary: 'Amplía el alcance de tu equipo.',
          inherits: 'Todo Crecimiento, más',
          features: ['25 integrantes', 'Automatización comercial', 'Atención prioritaria', 'Analítica operativa', 'Hasta 8 canales con conexión oficial', '400 créditos operativos'],
          note: 'Agente IA con traspaso humano y automatizaciones multicanal, sujetos a concluir pruebas de integración.',
        },
      ],
      agency: {
        label: 'PAWWER Agencia',
        h3: ['El sistema y el equipo', 'para hacerlo crecer.'],
        p: 'Todo Escala más estrategia, contenido, pauta, operación y acompañamiento de PAWWER / Creativo Coyote MKT. Siempre con propuesta y contrato, sin cobro automático.',
        cta: 'Solicitar propuesta',
      },
      notes: [
        { lead: 'La mensualidad cubre PAWWER.', body: 'No incluye inversión publicitaria, cargos de Meta, Google o TikTok, números, SMS, plantillas de WhatsApp, consumo de mensajería ni servicios de terceros.' },
        { body: 'No se capturan tarjetas dentro de PAWWER. El cobro se habilitará mediante checkout alojado. IVA, renovación de créditos y condiciones al término de la prueba: por confirmar con PAWWER.' },
      ],
    },
    contact: {
      label: 'Empecemos juntos',
      h2: ['Haz que cada', 'lead avance.'],
      cta: 'Solicitar prueba de 7 días',
      addressLabel: 'Oficina',
    },
    footer: { privacy: 'Política de privacidad', privacyHref: '/privacidad', rights: 'PAWWER' },
  },

  en: {
    htmlLang: 'en',
    ogLocale: 'en_US',
    meta: {
      title: 'PAWWER | Commercial & marketing CRM',
      description: 'Organize your leads, centralize attention and turn commercial follow-up into a measurable system. See the PAWWER plans from $99 USD per month.',
    },
    nav: {
      skip: 'Skip to content',
      links: [
        { label: 'Solutions', hash: '#soluciones' },
        { label: 'Benefits', hash: '#beneficios' },
        { label: 'Plans', hash: '#planes' },
        { label: 'Contact', hash: '#contacto' },
      ],
      login: 'Sign in / Login',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      langLabel: 'ES',
      langAria: 'Ver esta página en español',
    },
    hero: {
      kicker: 'Commercial & marketing CRM',
      h1: ['Data makes', 'momentum.'],
      sub: 'Your leads are already talking. PAWWER turns every conversation into context, and every context into action.',
      ctaPrimary: 'Build your system',
      ctaSecondary: 'Explore the process',
      bottomLeft: 'Scroll to explore',
      bottomRight: 'CRM / Marketing / Follow-up',
      motionPlay: 'Play motion',
      motionPause: 'Pause motion',
      motionPlayAria: 'Play animated background',
      motionPauseAria: 'Pause animated background',
    },
    chapter: {
      label: 'PAWWER for teams on the move',
      h2: ['When everything that', 'matters is connected.'],
      p: 'One read on your commercial operation: capture, engage, convert and measure without losing the thread.',
    },
    solutions: {
      label: 'Explore our process',
      h2: ['From the first signal', 'to the next step.'],
      phases: ['Capture', 'Understand', 'Engage', 'Convert', 'Measure'],
      items: [
        { h3: 'Engage with context', p: 'Leads, contacts and follow-up in one place so every conversation keeps its continuity.' },
        { h3: 'Turn interest into action', p: 'Connect your calendar with follow-up and give every opportunity a next step.' },
        { h3: 'Measure what moves the team', p: 'Source, results and operational analytics to decide where to invest energy.' },
      ],
      mock: {
        bar: 'Commercial operating system',
        eyebrow: 'Today · 09:42',
        h3: 'The next step is clear.',
        stages: ['New lead', 'Following up', 'Proposal'],
        names: ['Andrea C.', 'Luis M.', 'Sofía R.'],
        roles: ['Service inquiry', 'Proposal in review', 'Commercial project'],
        statusDefault: 'Next step defined',
        statusFeatured: 'Meeting booked',
        context: 'One history that keeps things moving.',
        caption: 'Conceptual view · fictional data',
      },
    },
    benefits: {
      label: 'The operating layer',
      h2: ['Less memory.', 'More momentum.'],
      items: [
        { h3: 'A place for every lead', p: 'Centralize contacts and opportunities to work from a shared view.' },
        { h3: 'A clear next step', p: 'Connect meetings and follow-up to keep the commercial rhythm.' },
        { h3: 'A measurable read', p: 'Understand what works and what needs attention from Crecimiento and Escala.' },
      ],
    },
    pricing: {
      label: 'Plans & pricing',
      h2: ['Choose the pace', 'of your growth.'],
      intro: '7 days free with temporary access to the Escala tier. Prices in US dollars (USD).',
      priceUnit: 'USD / mo',
      mostPopular: 'Most popular',
      cta: 'Get started',
      activationLabel: 'In activation',
      plans: [
        {
          name: 'Esencial', price: PRICES.Esencial,
          summary: 'Bring order to your commercial operation.',
          inherits: 'The essentials to get started',
          features: ['Leads, contacts and follow-up CRM', 'Appointment calendar', 'Brand, library and content preparation', '3 team members', 'Up to 2 channels with official connection', '60 operational credits'],
          note: '',
        },
        {
          name: 'Crecimiento', price: PRICES.Crecimiento,
          summary: 'Connect your content with your opportunities.',
          inherits: 'Everything in Esencial, plus',
          features: ['10 team members', 'Content planner', 'Lead map and source', 'Results, quotes and contracts', 'Up to 4 channels with official connection', '180 operational credits'],
          note: '',
        },
        {
          name: 'Escala', price: PRICES.Escala,
          summary: "Extend your team's reach.",
          inherits: 'Everything in Crecimiento, plus',
          features: ['25 team members', 'Commercial automation', 'Priority support', 'Operational analytics', 'Up to 8 channels with official connection', '400 operational credits'],
          note: 'AI agent with human handoff and multichannel automations, pending completion of integration testing.',
        },
      ],
      agency: {
        label: 'PAWWER Agencia',
        h3: ['The system and the team', 'to make it grow.'],
        p: 'Everything in Escala plus strategy, content, paid media, operations and support from PAWWER / Creativo Coyote MKT. Always by proposal and contract, never auto-charged.',
        cta: 'Request a proposal',
      },
      notes: [
        { lead: 'The monthly fee covers PAWWER.', body: 'It does not include ad spend, Meta, Google or TikTok charges, phone numbers, SMS, WhatsApp templates, messaging usage or third-party services.' },
        { body: 'No card details are captured inside PAWWER. Billing will be enabled through hosted checkout. Tax treatment, credit renewal and end-of-trial conditions: to be confirmed with PAWWER.' },
      ],
    },
    contact: {
      label: 'Start building with us',
      h2: ['Make every', 'lead move forward.'],
      cta: 'Request the 7-day trial',
      addressLabel: 'Office',
    },
    footer: { privacy: 'Privacy policy', privacyHref: '/en/privacy', rights: 'PAWWER' },
  },
};
