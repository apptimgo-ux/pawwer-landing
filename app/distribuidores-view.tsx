import { Check, Plus, Link2, Wallet, LifeBuoy, ShieldCheck, Building2, Users } from 'lucide-react';
import HeroMedia from './hero-media';
import { LandingImageCarousel, LandingImageZoom } from './ImageExperience';
import { Header, Footer } from './site-ui';
import { content } from './site-content';
import estilos from './distribuidores.module.css';
import EstudioCreativo from './estudio-creativo';

/**
 * La página de DISTRIBUIDORES: www.pawwerapp.com/distribuidores y
 * /en/distributors. Misma lógica y mismas piezas que la landing (héroe con
 * fotos, bandas, carrusel de pantallas reales del CRM, tarjetas de plan,
 * preguntas y pie), pero su propio contenido y su propio botón: no vende
 * los planes de negocio (solo los enlaza el pie, como en toda la landing).
 *
 * Modelo (persona dueña, 14–15 de octubre de 2026): dos membresías sin
 * prueba —US$97 con su negocio en Esencial, US$297 con su negocio en Pro—;
 * el distribuidor NO cobra a sus clientes, PAWWER les cobra sus paquetes y
 * él gana 15% recurrente, pagado el último día de cada mes. El botón lleva
 * a crm.pawwerapp.com con `?distribuidor=1`, que crea la cuenta como
 * distribuidor.
 */
type Locale = 'es' | 'en';

const CRM = 'https://crm.pawwerapp.com';
const COMISION = 15;
// Mismos números que comisionesDistribuidor.js y planes.config.js del CRM.
const MEMBRESIAS = [
  { id: 'inicial', precio: 97, valor: 99, recupera: 4 },
  { id: 'pro', precio: 297, valor: 349, recupera: 10 },
] as const;
const CRECIMIENTO = 199;

const T = {
  es: {
    nav: [['#como-funciona', 'Cómo funciona'], ['#plataforma', 'La plataforma'], ['#membresias', 'Membresías'], ['#preguntas', 'Preguntas']],
    kicker: 'Programa de distribuidores',
    h1: 'Recomienda PAWWER y gana cada mes.',
    sub: `Usa PAWWER en tu propio negocio y compártelo. Nosotros les cobramos y atendemos la plataforma; tú ganas el ${COMISION}% de lo que pague cada cliente, mientras siga pagando.`,
    cta: 'Quiero ser distribuidor',
    ctaSecundario: 'Ver membresías',
    ctaNota: `Membresías desde US$${MEMBRESIAS[0].precio} al mes · sin cobrar ni facturar a tus clientes · cancela cuando quieras`,
    metaIzq: 'Desliza para explorar',
    metaDer: 'Liga / Clientes / Comisiones',
    slides: [
      { image: '/img/inmobiliario-01.jpg', alt: 'Asesor presentando a una familia' },
      { image: '/img/autos-01.jpg', alt: 'Asesoría en una agencia de autos' },
      { image: '/img/recepcion-01.jpg', alt: 'Atención de clientes en recepción' },
    ],
    declaracionEtiqueta: 'Por qué funciona',
    declaracionH2: 'Tú traes la relación. Nosotros, todo lo demás.',
    declaracionP: 'Conoces negocios que necesitan marketing y seguimiento de clientes. Con PAWWER no tienes que montar una agencia, cobrar ni dar soporte técnico: compartes tu liga, el negocio elige su plan y PAWWER se encarga de la plataforma, los cobros y las facturas.',
    pasosEtiqueta: 'Cómo funciona',
    pasosH2: 'Tres pasos, sin hablar con nadie.',
    pasos: [
      ['Te das de alta', 'Creas tu cuenta, eliges tu membresía y pagas con tarjeta en la página segura de Dodo. Se abren tu panel de distribuidor y PAWWER para tu propio negocio.'],
      ['Compartes tu liga', 'Cada negocio que se registra con tu liga, o escribe tu código al crear su cuenta, queda ligado a ti.'],
      [`Ganas el ${COMISION}% cada mes`, 'PAWWER le cobra al cliente su plan de siempre. Tú recibes tu comisión el último día de cada mes.'],
    ],
    plataformaEtiqueta: 'La plataforma que vas a vender',
    plataformaH2: 'La agencia de marketing con IA, en manos de tus clientes.',
    plataformaP: 'Posts, imágenes y videos con IA, planner de publicaciones, seguimiento de cada lead y el agente que contesta por WhatsApp. Es lo mismo que usarás en tu propio negocio.',
    capturas: [
      ['/img/crm-inicio.webp', 'Inicio de PAWWER con información de demostración', 'Inicio · todo el negocio en una pantalla'],
      ['/img/crm-cms-es.webp', 'Pantalla del CMS de PAWWER con contenido de demostración', 'CMS · contenido con la marca del negocio'],
      ['/img/crm-crear-es.webp', 'Editor de Crea tu post con vista previa', 'Crea tu post · editor visual'],
      ['/img/crm-planner-es.webp', 'Planner mensual con publicaciones de demostración', 'Planner · agenda publicaciones'],
      ['/img/crm-customer-journey.webp', 'Customer Journey con información de demostración', 'Customer Journey · sigue cada oportunidad'],
    ],
    panelEtiqueta: 'Tu panel de distribuidor',
    panelH2: 'Tus clientes y tus comisiones, claros.',
    panelP: 'Ves a tus clientes, su plan y si están al corriente, y lo que te toca en cada corte. Sus leads y mensajes son solo suyos.',
    panelMock: {
      barra: 'Panel de distribuidor', ceja: 'Corte del 31 de octubre', titulo: 'Por pagarte: US$119.40',
      clientes: [['Inmobiliaria Norte', 'Crecimiento', 'Al corriente'], ['Autos del Valle', 'Crecimiento', 'Al corriente'], ['Spa Luna', 'Crecimiento', 'Al corriente'], ['Consultorio Ríos', 'Crecimiento', 'Al corriente']],
      nota: 'Datos de demostración', liga: 'crm.pawwerapp.com/?ref=TUCODIGO',
    },
    membresiasEtiqueta: 'Membresías',
    membresiasH2: 'Elige cómo empezar.',
    membresiasIntro: `Las dos incluyen ${COMISION}% recurrente, tu liga y tu código, tu panel y tu propia atención a clientes. Sin días de prueba; cancelas cuando quieras.`,
    alMes: '/mes + impuestos',
    masPopular: 'Para crecer',
    membresias: {
      inicial: { nombre: 'Distribuidor', resumen: 'Para empezar a recomendar PAWWER.', incluye: [`PAWWER Esencial para tu negocio, con sus límites (US$${MEMBRESIAS[0].valor}/mes por separado)`, `Se paga sola con ${MEMBRESIAS[0].recupera} clientes en Crecimiento`, `${COMISION}% recurrente de cada cliente`, 'Tu liga, tu código y tu panel', 'Atención a tus clientes con escalamiento a PAWWER'] },
      pro: { nombre: 'Distribuidor Pro', resumen: 'Para quien también usa PAWWER a fondo.', incluye: [`PAWWER Pro para tu negocio (US$${MEMBRESIAS[1].valor}/mes por separado)`, `Se paga sola con ${MEMBRESIAS[1].recupera} clientes en Crecimiento`, `${COMISION}% recurrente de cada cliente`, 'Tu liga, tu código y tu panel', 'Atención a tus clientes con escalamiento a PAWWER'] },
    },
    elegir: 'Empezar',
    gananciaH3: 'Cuánto ganas',
    ganancia: `Ejemplo: 4 clientes en Crecimiento (US$${CRECIMIENTO}/mes) son US$${(4 * CRECIMIENTO * COMISION / 100).toFixed(2)} al mes para ti; 10 clientes, US$${(10 * CRECIMIENTO * COMISION / 100).toFixed(2)}.`,
    corte: 'Te pagamos el último día de cada mes. Si un cliente paga justo el último día, ese pago entra en el corte del mes siguiente.',
    beneficiosEtiqueta: 'Qué incluye',
    beneficiosH2: 'Todo para recomendar sin complicarte.',
    beneficios: [
      ['building', 'Tu propio negocio en PAWWER', 'Esencial o Pro, según tu membresía, mientras esté activa.'],
      ['link', 'Tu liga y tu código', 'Listos para compartir por WhatsApp o correo.'],
      ['wallet', `${COMISION}% recurrente`, 'De cada pago de tus clientes, el último día de cada mes.'],
      ['users', 'Tus clientes a la vista', 'Plan y si están al corriente; nunca sus leads ni conversaciones.'],
      ['support', 'Tu atención a clientes', 'Sus tickets te llegan a ti y escalas a PAWWER lo que no resuelvas.'],
      ['shield', 'Sin cobrar ni facturar', 'PAWWER cobra los paquetes y da la plataforma.'],
    ],
    faqEtiqueta: 'Preguntas frecuentes',
    faqH2: 'Lo que más nos preguntan.',
    faq: [
      ['¿Quién le cobra al cliente?', 'PAWWER, con sus paquetes de siempre. Tú no manejas pagos ni facturas de tus clientes.'],
      ['¿Cuándo me pagan?', 'El último día de cada mes, por lo que pagaron tus clientes en ese corte. Un pago que entra justo el último día se suma al corte del mes siguiente.'],
      ['¿Qué membresía me conviene?', `La de US$${MEMBRESIAS[0].precio} se paga sola con ${MEMBRESIAS[0].recupera} clientes en Crecimiento e incluye Esencial para tu negocio. La de US$${MEMBRESIAS[1].precio} incluye Pro, con más usuarios, canales y créditos. Puedes cambiar después.`],
      ['¿Puedo ver los datos de mis clientes?', 'Ves su nombre, su plan y si están al corriente. Sus leads, mensajes y datos son solo suyos.'],
      ['¿Y si uno de mis clientes necesita ayuda?', 'Te llega su ticket a tu panel. Si no lo puedes resolver, lo escalas a PAWWER desde ahí mismo.'],
      ['¿Hay prueba gratis?', 'No. La membresía se paga desde el primer día y la cancelas cuando quieras desde tu panel.'],
      ['¿Qué pasa con mi negocio si cancelo?', 'Deja de tener el plan incluido. Puedes seguir con un plan normal de PAWWER y no pierdes tus datos.'],
      ['¿Necesito algo especial, como un dominio propio o muchas sucursales?', 'Escríbenos y lo vemos contigo. Lo estándar no requiere hablar con nadie.'],
    ],
    finalEtiqueta: 'Empieza hoy',
    finalH2: 'Tu liga puede estar lista en cinco minutos.',
    planes: '¿Buscas PAWWER solo para tu negocio? Ver planes',
    planesHref: '/#planes',
  },
  en: {
    nav: [['#como-funciona', 'How it works'], ['#plataforma', 'The platform'], ['#membresias', 'Memberships'], ['#preguntas', 'FAQ']],
    kicker: 'Distributor program',
    h1: 'Recommend PAWWER and earn every month.',
    sub: `Use PAWWER in your own business and share it. We bill them and run the platform; you earn ${COMISION}% of what each client pays, for as long as they keep paying.`,
    cta: 'Become a distributor',
    ctaSecundario: 'See memberships',
    ctaNota: `Memberships from US$${MEMBRESIAS[0].precio} per month · no billing or invoicing your clients · cancel anytime`,
    metaIzq: 'Scroll to explore',
    metaDer: 'Link / Clients / Commissions',
    slides: [
      { image: '/img/inmobiliario-01.jpg', alt: 'Advisor presenting to a family' },
      { image: '/img/autos-01.jpg', alt: 'Advice at a car dealership' },
      { image: '/img/recepcion-01.jpg', alt: 'Serving clients at the front desk' },
    ],
    declaracionEtiqueta: 'Why it works',
    declaracionH2: 'You bring the relationship. We handle the rest.',
    declaracionP: 'You know businesses that need marketing and client follow-up. With PAWWER you don’t have to build an agency, bill anyone or give technical support: you share your link, the business picks its plan, and PAWWER runs the platform, the billing and the invoices.',
    pasosEtiqueta: 'How it works',
    pasosH2: 'Three steps, no calls needed.',
    pasos: [
      ['Sign up', "Create your account, choose your membership and pay by card on Dodo's secure page. Your distributor panel and PAWWER for your own business open."],
      ['Share your link', 'Every business that signs up with your link, or types your code when creating its account, is linked to you.'],
      [`Earn ${COMISION}% every month`, 'PAWWER bills the client its regular plan. You get your commission on the last day of every month.'],
    ],
    plataformaEtiqueta: 'The platform you’ll offer',
    plataformaH2: 'The AI marketing agency, in your clients’ hands.',
    plataformaP: 'AI posts, images and videos, a content planner, follow-up on every lead and the agent that answers on WhatsApp. The same thing you’ll use in your own business.',
    capturas: [
      ['/img/crm-inicio-en.webp', 'PAWWER home with demonstration data', 'Home · the whole business on one screen'],
      ['/img/crm-cms-en.webp', 'PAWWER CMS screen with demonstration content', 'CMS · on-brand content'],
      ['/img/crm-crear-en.webp', 'Create your post editor with preview', 'Create your post · visual editor'],
      ['/img/crm-planner-en.webp', 'Monthly Planner with demonstration posts', 'Planner · schedule posts'],
      ['/img/crm-customer-journey-en.webp', 'Customer Journey with demonstration data', 'Customer Journey · track every opportunity'],
    ],
    panelEtiqueta: 'Your distributor panel',
    panelH2: 'Your clients and your commissions, clear.',
    panelP: 'See your clients, their plan and whether they are up to date, and what you’re owed in each cutoff. Their leads and messages belong to them.',
    panelMock: {
      barra: 'Distributor panel', ceja: 'October 31 cutoff', titulo: 'Owed to you: US$119.40',
      clientes: [['Northside Realty', 'Growth', 'Up to date'], ['Valley Motors', 'Growth', 'Up to date'], ['Luna Spa', 'Growth', 'Up to date'], ['Rios Clinic', 'Growth', 'Up to date']],
      nota: 'Demonstration data', liga: 'crm.pawwerapp.com/?ref=YOURCODE',
    },
    membresiasEtiqueta: 'Memberships',
    membresiasH2: 'Choose how to start.',
    membresiasIntro: `Both include ${COMISION}% recurring, your link and code, your panel and your own customer service. No trial; cancel anytime.`,
    alMes: '/mo + taxes',
    masPopular: 'To grow',
    membresias: {
      inicial: { nombre: 'Distributor', resumen: 'To start recommending PAWWER.', incluye: [`PAWWER Essential for your business, with its limits (US$${MEMBRESIAS[0].valor}/mo on its own)`, `Pays for itself with ${MEMBRESIAS[0].recupera} clients on Growth`, `${COMISION}% recurring from every client`, 'Your link, your code and your panel', 'Customer service for your clients, with escalation to PAWWER'] },
      pro: { nombre: 'Distributor Pro', resumen: 'For those who also use PAWWER in depth.', incluye: [`PAWWER Pro for your business (US$${MEMBRESIAS[1].valor}/mo on its own)`, `Pays for itself with ${MEMBRESIAS[1].recupera} clients on Growth`, `${COMISION}% recurring from every client`, 'Your link, your code and your panel', 'Customer service for your clients, with escalation to PAWWER'] },
    },
    elegir: 'Get started',
    gananciaH3: 'How much you earn',
    ganancia: `Example: 4 clients on Growth (US$${CRECIMIENTO}/mo) means US$${(4 * CRECIMIENTO * COMISION / 100).toFixed(2)} per month for you; 10 clients, US$${(10 * CRECIMIENTO * COMISION / 100).toFixed(2)}.`,
    corte: 'We pay you on the last day of every month. If a client pays exactly on the last day, that payment goes into the following month’s cutoff.',
    beneficiosEtiqueta: 'What’s included',
    beneficiosH2: 'Everything to recommend without hassle.',
    beneficios: [
      ['building', 'Your own business on PAWWER', 'Essential or Pro, depending on your membership, while it’s active.'],
      ['link', 'Your link and your code', 'Ready to share by WhatsApp or email.'],
      ['wallet', `${COMISION}% recurring`, 'From every payment by your clients, on the last day of every month.'],
      ['users', 'Your clients at a glance', 'Plan and whether they’re up to date; never their leads or conversations.'],
      ['support', 'Your own customer service', 'Their tickets come to you, and you escalate to PAWWER what you can’t solve.'],
      ['shield', 'No billing, no invoicing', 'PAWWER bills the plans and provides the platform.'],
    ],
    faqEtiqueta: 'Frequently asked questions',
    faqH2: 'What people ask us most.',
    faq: [
      ['Who bills the client?', 'PAWWER, with its regular plans. You never handle your clients’ payments or invoices.'],
      ['When do I get paid?', 'On the last day of every month, for what your clients paid in that cutoff. A payment made exactly on the last day goes into the following month’s cutoff.'],
      ['Which membership is right for me?', `The US$${MEMBRESIAS[0].precio} one pays for itself with ${MEMBRESIAS[0].recupera} clients on Growth and includes Essential for your business. The US$${MEMBRESIAS[1].precio} one includes Pro, with more users, channels and credits. You can switch later.`],
      ['Can I see my clients’ data?', 'You see their name, their plan and whether they are up to date. Their leads, messages and data belong to them.'],
      ['What if one of my clients needs help?', 'Their ticket arrives in your panel. If you can’t solve it, you escalate it to PAWWER right there.'],
      ['Is there a free trial?', 'No. The membership is paid from day one, and you can cancel anytime from your panel.'],
      ['What happens to my business if I cancel?', 'It loses the included plan. You can keep going on a regular PAWWER plan and you don’t lose your data.'],
      ['Do I need something special, like my own domain or many branches?', 'Write to us and we’ll work it out with you. The standard program doesn’t require talking to anyone.'],
    ],
    finalEtiqueta: 'Start today',
    finalH2: 'Your link can be ready in five minutes.',
    planes: 'Looking for PAWWER just for your business? See plans',
    planesHref: '/en#planes',
  },
} as const;

const ICONOS = { building: Building2, link: Link2, wallet: Wallet, users: Users, support: LifeBuoy, shield: ShieldCheck };

export default function DistribuidoresView({ locale }: { locale: Locale }) {
  const t = T[locale];
  const inicio = locale === 'es' ? '/distribuidores' : '/en/distributors';
  const otro = locale === 'es' ? '/en/distributors' : '/distribuidores';
  const alta = (membresia?: string) =>
    `${CRM}/?distribuidor=1${membresia ? `&membresia=${membresia}` : ''}&lang=${locale}&utm_source=pawwerapp&utm_medium=distribuidores&utm_campaign=alta_distribuidor`;
  // El encabezado de la landing, con los enlaces de ESTA página.
  const nav = {
    ...content[locale],
    nav: { ...content[locale].nav, links: t.nav.map(([hash, label]) => ({ hash, label })) },
  };

  return (
    <>
      <Header locale={locale} homeHref={inicio} altHref={otro} draft={nav} />
      <LandingImageZoom locale={locale} />
      <main id="contenido" lang={locale === 'en' ? 'en' : undefined}>
        <section className="hero hero--background hero--dark" style={{ minHeight: 640 }}>
          <div className="wrap hero__inner">
            <p className="hero__kicker"><i /> {t.kicker}</p>
            <h1>{t.h1}</h1>
            <div className="hero__body">
              <div className="hero__actions">
                <a className="btn btn--solid btn--coral" href={alta()}>{t.cta}</a>
                <a className="textlink" href="#membresias">{t.ctaSecundario}</a>
              </div>
              <p className="hero__lead">{t.sub}</p>
              <p className="hero__nota">{t.ctaNota}</p>
            </div>
            <div className="hero__meta">
              <span>{t.metaIzq}</span>
              <hr className="rule" />
              <span>{t.metaDer}</span>
            </div>
          </div>
          <HeroMedia type="image" placement="background" slides={[...t.slides]} height={640} />
        </section>

        <section className="band statement">
          <div className="wrap statement__layout">
            <div data-reveal>
              <p className="eyebrow">{t.declaracionEtiqueta}</p>
              <h2>{t.declaracionH2}</h2>
              <p>{t.declaracionP}</p>
            </div>
            <img className="statement__image" src="/img/inmobiliaria-videollamada-hero.png" alt="" loading="lazy" data-reveal />
          </div>
        </section>

        <section className="band band--dark process" id="como-funciona">
          <div className="wrap process__layout">
            <div className="process__head" data-reveal>
              <p className="eyebrow">{t.pasosEtiqueta}</p>
              <h2>{t.pasosH2}</h2>
            </div>
            <div className="process__list">
              {t.pasos.map(([nombre, linea], i) => (
                <div className="phase" key={nombre} data-reveal>
                  <div className="phase__num">{String(i + 1).padStart(2, '0')}</div>
                  <div>
                    <h3 className="phase__name">{nombre}</h3>
                    <p className="phase__line">{linea}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="band band--dark showcase" id="plataforma">
          <div className="wrap showcase__inner">
            <div className="showcase__copy" data-reveal>
              <p className="eyebrow">{t.plataformaEtiqueta}</p>
              <h2>{t.plataformaH2}</h2>
              <p>{t.plataformaP}</p>
            </div>
            <LandingImageCarousel locale={locale} images={t.capturas.map(([src, alt, label]) => ({ src, alt, label }))} />
          </div>
        </section>

        <EstudioCreativo locale={locale} href="#membresias" />

        <section className={`band band--cream2 showcase ${estilos.panelClaro}`} id="panel">
          <div className="wrap showcase__inner">
            <div className="showcase__copy" data-reveal>
              <p className="eyebrow">{t.panelEtiqueta}</p>
              <h2>{t.panelH2}</h2>
              <p>{t.panelP}</p>
            </div>
            <div className="mock" data-reveal>
              <div className="mock__bar">
                <span className="mock__brand">pawwer</span>
                <span>{t.panelMock.barra}</span>
                <span className="mock__avatar">D</span>
              </div>
              <div className="mock__body">
                <p className="mock__eyebrow">{t.panelMock.ceja}</p>
                <h3>{t.panelMock.titulo}</h3>
                <div className={estilos.mockClientes}>
                  {t.panelMock.clientes.map(([nombre, plan, estado]) => (
                    <div key={nombre} className={estilos.mockCliente}>
                      <span className="lead__icon">{nombre.split(' ').map(p => p[0]).join('').slice(0, 2)}</span>
                      <strong>{nombre}</strong>
                      <small>{plan}</small>
                      <em>{estado}</em>
                    </div>
                  ))}
                </div>
                <div className="mock__ctx"><Link2 size={15} /> {t.panelMock.liga}</div>
              </div>
              <p className="mock__cap">{t.panelMock.nota}</p>
            </div>
          </div>
        </section>

        <section className="band pricing" id="membresias">
          <div className="wrap">
            <div className="pricing__head" data-reveal>
              <p className="eyebrow">{t.membresiasEtiqueta}</p>
              <h2>{t.membresiasH2}</h2>
              <p>{t.membresiasIntro}</p>
            </div>
            <div className={`plans ${estilos.dosPlanes}`}>
              {MEMBRESIAS.map(m => {
                const d = t.membresias[m.id];
                const destacada = m.id === 'pro';
                return (
                  <article className={'plan' + (destacada ? ' plan--featured' : '')} key={m.id} data-reveal>
                    {destacada && <span className="plan__banner">{t.masPopular}</span>}
                    <h3>{d.nombre}</h3>
                    <p className="plan__summary">{d.resumen}</p>
                    <a className="plan__price" href={alta(m.id)}>US${m.precio}<span>{t.alMes}</span></a>
                    <a className="btn btn--coral" href={alta(m.id)}>{t.elegir}</a>
                    <ul className="plan__list">
                      {d.incluye.map(x => <li key={x}><Check size={15} />{x}</li>)}
                    </ul>
                  </article>
                );
              })}
            </div>
            <div className={estilos.ganancia} data-reveal>
              <p className={estilos.grande}>{COMISION}%</p>
              <div>
                <h3>{t.gananciaH3}</h3>
                <p>{t.ganancia}</p>
                <p className={estilos.nota}>{t.corte}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="band band--cream2 benefits">
          <div className="wrap benefits__layout">
            <div className="benefits__head" data-reveal>
              <p className="eyebrow">{t.beneficiosEtiqueta}</p>
              <h2>{t.beneficiosH2}</h2>
            </div>
            <div className="benefits__grid">
              {t.beneficios.map(([icono, titulo, texto]) => {
                const Icono = ICONOS[icono as keyof typeof ICONOS];
                return (
                  <article className="benefit" key={titulo} data-reveal>
                    <Icono />
                    <h3>{titulo}</h3>
                    <p>{texto}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="band faq" id="preguntas">
          <div className="wrap faq__layout">
            <div className="faq__head" data-reveal>
              <p className="eyebrow">{t.faqEtiqueta}</p>
              <h2>{t.faqH2}</h2>
            </div>
            <div className="faq__list" data-reveal>
              {t.faq.map(([q, a]) => (
                <details key={q} className="faq__item" name="faq">
                  <summary><span>{q}</span><Plus size={17} aria-hidden /></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="band band--dark cta">
          <div className="wrap cta__grid">
            <div data-reveal>
              <p className="eyebrow">{t.finalEtiqueta}</p>
              <h2>{t.finalH2}</h2>
              <div className="cta__actions">
                <a className="btn btn--solid" href={alta()}>{t.cta}</a>
              </div>
              <p className={estilos.notaClara}>{t.ctaNota}</p>
            </div>
            <div className="contact-list" data-reveal>
              <a href={t.planesHref}>{t.planes}</a>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} homeHref={locale === 'es' ? '/' : '/en'} />
    </>
  );
}
