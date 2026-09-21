import type { ReactNode } from 'react';
import { Header, Footer } from './site-ui';
import { content, type Locale, EMAIL, PHONE_HREF, PHONE_LABEL, ADDRESS_LINES, CRM_URL, PRIVACY_REVIEW } from './site-content';
import { EMPRESA } from './legal-docs';

const mailTo = (subject?: string) => (subject ? `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}` : `mailto:${EMAIL}`);

type Block = { h2: string; ps: ReactNode[] };

function esContent() {
  const address = `${ADDRESS_LINES[0]} ${ADDRESS_LINES[1]}`;
  return {
    back: '← Volver a PAWWER',
    label: 'Privacidad',
    h1: 'Tu información merece claridad.',
    lead: `Política de privacidad de PAWWER. Vigente desde el ${PRIVACY_REVIEW.es}.`,
    legalNote: (
      <>Esta política cubre <strong>este sitio y el CRM</strong> de <a href={CRM_URL}>crm.pawwerapp.com</a>. Los datos de tus contactos y conversaciones dentro del CRM son tuyos: PAWWER los trata para prestarte el servicio y siguiendo tus instrucciones, como dice el <a href="/tratamiento-de-datos">contrato de encargo de tratamiento de datos</a>.</>
    ),
    blocks: [
      {
        h2: 'Contacto y responsable',
        ps: [
          <>El responsable del tratamiento es <strong>{EMPRESA}</strong>, que opera el servicio bajo la marca PAWWER.</>,
          <>Domicilio: {address} Puedes escribir a <a href={mailTo()}>{EMAIL}</a> o llamar al <a href={PHONE_HREF}>{PHONE_LABEL}</a>.</>,
        ],
      },
      {
        h2: 'Qué información se utiliza',
        ps: [
          'Esta landing no contiene formularios de registro ni solicita tarjetas. Si decides contactarnos por correo o teléfono, compartes los datos que incluyas en tu comunicación, por ejemplo tu nombre, correo, empresa y necesidades comerciales. Evita enviar contraseñas, tarjetas o información sensible.',
          'El alojamiento procesa datos técnicos —dirección IP, fecha de acceso e información del navegador— para entregar el sitio y cuidar su seguridad.',
          'Dentro del CRM se tratan además los datos de tu cuenta y de tu equipo (nombre, correo, teléfono, rol y los equipos desde los que entras) y la información que tú cargas sobre tus contactos: nombre, teléfono, correo, lo que contestaron en tus formularios y las conversaciones de los canales que conectes. Esa información es tuya; PAWWER la trata para prestarte el servicio.',
        ],
      },
      {
        h2: 'Para qué se utiliza',
        ps: ['La información que compartas se destinará a atender tu consulta, coordinar una demostración o prueba solicitada, preparar una propuesta y dar seguimiento a esa solicitud. Cualquier finalidad adicional de publicidad deberá informarse y contar con la base correspondiente antes de activarse.'],
      },
      {
        h2: 'Cookies y recursos del sitio',
        ps: [
          'El código de esta landing no incorpora analítica publicitaria ni píxeles de seguimiento. Las imágenes y el video se sirven desde el mismo sitio. Una vista privada puede requerir cookies del proveedor de acceso; ese acceso se rige por su propio aviso.',
          'Se guarda una cookie funcional llamada «locale» con tu preferencia de idioma (español o inglés): la que eliges con el selector o la que se deduce de tu país en la primera visita. No se usa para publicidad ni seguimiento y puedes borrarla desde tu navegador.',
        ],
      },
      {
        h2: 'CRM, pagos y servicios externos',
        ps: [
          <>El enlace Sign in / Login conduce a <a href={CRM_URL}>crm.pawwerapp.com</a>. Cómo tratamos por tu cuenta los datos de tus contactos dentro del CRM está en el <a href="/tratamiento-de-datos">contrato de encargo de tratamiento de datos</a>. Esta landing no accede a tus contactos ni a tus conversaciones del CRM.</>,
          'La prueba de 3 días se inicia desde el CRM (crm.pawwerapp.com) y requiere registrar una tarjeta de crédito, que se cobra automáticamente al terminar la prueba salvo que canceles antes. Esa captura de tarjeta y ese cobro ocurren en el checkout de Dodo Payments, que actúa como revendedor autorizado de PAWWER (merchant of record), no en esta landing, que no procesa pagos ni almacena tarjetas. Dodo trata los datos de pago conforme a su propio aviso de privacidad; PAWWER recibe el estado de la suscripción, no los datos de la tarjeta.',
          <>Los negocios invitados a la beta entran con un código y sin registrar tarjeta; si al terminar eligen un plan, lo pagan en ese mismo checkout. Las reglas están en los <a href="/programa-beta">términos del programa beta</a>.</>,
          'Los proveedores que hacen funcionar el servicio, cada uno con su propio contrato y aviso: Vercel (alojamiento, Estados Unidos), Supabase (base de datos y autenticación, Estados Unidos), Dodo Payments (cobro, India), Anthropic (el modelo de inteligencia artificial que redacta las respuestas y lee las imágenes de inspiración que subes, Estados Unidos), Zernio (puente con WhatsApp, Instagram y Messenger), Kie.ai (generación de imágenes con la instrucción y las fotos que tú eliges, solo si usas esa función), Resend (los correos del sistema, como autorizar un equipo nuevo, Estados Unidos) y OpenFreeMap (mosaicos del mapa, sin datos de tus leads).',
          'Al asistente de inteligencia artificial se le mandan los mensajes de la conversación que va a contestar; al asistente de estrategia, solo números agregados —cuántos leads y de qué canal—, nunca nombres ni teléfonos de tus prospectos. Ningún proveedor usa tus datos para entrenar modelos por cuenta de PAWWER.',
          'Estas transferencias son internacionales y necesarias para prestarte el servicio que contratas.',
        ],
      },
      {
        h2: 'Tus derechos y solicitudes',
        ps: [
          <>Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de tus datos, así como revocar tu consentimiento o limitar su uso, escribiendo a <a href={mailTo('Solicitud de privacidad')}>{EMAIL}</a> con el asunto «Solicitud de privacidad». Indica qué deseas solicitar y un medio para responderte. La verificación de identidad deberá realizarse por un canal adecuado; no adjuntes documentos sensibles a tu primer mensaje.</>,
          'Contestamos en un máximo de 20 días hábiles. Si eres cliente de PAWWER y la solicitud viene de uno de TUS contactos, la atiendes tú: esos datos son tuyos y nosotros solo los procesamos por encargo; podemos ayudarte a localizarlos o a eliminarlos.',
        ],
      },
      {
        h2: 'Conservación y protección',
        ps: [
          'Los datos de tu cuenta y de tus contactos se conservan mientras la cuenta esté activa. Al cerrarla se eliminan dentro de los 90 días siguientes, salvo lo que la ley obligue a conservar —los comprobantes de pago, que además emite Dodo Payments— y salvo que nos pidas borrarlos antes.',
          'El CRM exige verificación en dos pasos, cada equipo se aprueba antes de poder leer datos y la base separa la información de cada negocio con reglas a nivel de renglón. Quién abrió una ficha, exportó la lista o entró a tu panel queda registrado, y lo consultas en «Quién ha visto tus datos» dentro de tu cuenta.',
        ],
      },
      {
        h2: 'Cambios a esta política',
        ps: ['Las actualizaciones se publicarán en esta misma página con su fecha. Si cambian las finalidades o tratamientos, deberán informarse de acuerdo con la normativa aplicable.'],
      },
    ] as Block[],
  };
}

function enContent() {
  const address = `${ADDRESS_LINES[0]} ${ADDRESS_LINES[1]}`;
  return {
    back: '← Back to PAWWER',
    label: 'Privacy',
    h1: 'Your information deserves clarity.',
    lead: `PAWWER privacy policy. In force since ${PRIVACY_REVIEW.en}.`,
    legalNote: (
      <>This policy covers <strong>this site and the CRM</strong> at <a href={CRM_URL}>crm.pawwerapp.com</a>. The data of your contacts and conversations inside the CRM is yours: PAWWER processes it to provide the service and on your instructions, as set out in the <a href="/en/data-processing">data processing agreement</a>.</>
    ),
    blocks: [
      {
        h2: 'Contact and controller',
        ps: [
          <>The data controller is <strong>{EMPRESA}</strong>, a Mexican company that operates the service under the PAWWER brand.</>,
          <>Address: {address} You can write to <a href={mailTo()}>{EMAIL}</a> or call <a href={PHONE_HREF}>{PHONE_LABEL}</a>.</>,
        ],
      },
      {
        h2: 'What information is used',
        ps: [
          'This landing page has no registration forms and does not request card details. If you choose to contact us by email or phone, you share the data you include in your message, such as your name, email, company and commercial needs. Avoid sending passwords, cards or sensitive information.',
          'The hosting provider processes technical data —IP address, access date and browser information— to deliver the site and keep it secure.',
          'Inside the CRM we also process your account and team data (name, email, phone, role and the devices you sign in from) and the information you upload about your contacts: name, phone, email, what they answered in your forms and the conversations from the channels you connect. That information is yours; PAWWER processes it to provide the service.',
        ],
      },
      {
        h2: 'What it is used for',
        ps: ['The information you share will be used to handle your query, coordinate a requested demo or trial, prepare a proposal and follow up on that request. Any additional advertising purpose must be disclosed and have the corresponding legal basis before being activated.'],
      },
      {
        h2: 'Cookies and site resources',
        ps: [
          "This landing page's code does not include advertising analytics or tracking pixels. Images and video are served from the same site. A private view may require cookies from the access provider; that access is governed by its own notice.",
          'A functional cookie named "locale" stores your language preference (Spanish or English): the one you pick with the switcher or the one inferred from your country on the first visit. It is not used for advertising or tracking and you can clear it from your browser.',
        ],
      },
      {
        h2: 'CRM, payments and external services',
        ps: [
          <>The Sign in / Login link leads to <a href={CRM_URL}>crm.pawwerapp.com</a>. How we process your contacts’ data inside the CRM on your behalf is in the <a href="/en/data-processing">data processing agreement</a>. This landing page does not access your contacts or your CRM conversations.</>,
          'The 3-day trial is started from the CRM (crm.pawwerapp.com) and requires registering a credit card, which is charged automatically when the trial ends unless you cancel first. That card capture and charge happen in Dodo Payments’ checkout, which acts as PAWWER’s authorized reseller and merchant of record, not on this landing page, which does not process payments or store cards. Dodo handles payment data under its own privacy notice; PAWWER receives the subscription status, not the card details.',
          <>Businesses invited to the beta get in with a code and without registering a card; if they choose a plan when it ends, they pay for it in that same checkout. The rules are in the <a href="/en/beta-program">beta program terms</a>.</>,
          'The providers that make the service work, each under its own contract and notice: Vercel (hosting, United States), Supabase (database and authentication, United States), Dodo Payments (billing, India), Anthropic (the AI model that drafts replies and reads the inspiration images you upload, United States), Zernio (bridge with WhatsApp, Instagram and Messenger), Kie.ai (image generation from the instruction and the photos you choose, only if you use that feature), Resend (system emails, such as authorizing a new device, United States) and OpenFreeMap (map tiles, with no lead data).',
          'The AI assistant receives the messages of the conversation it is about to answer; the strategy assistant only gets aggregated numbers —how many leads and from which channel—, never your prospects\u2019 names or phone numbers. No provider uses your data to train models on PAWWER\u2019s behalf.',
          'These transfers are international and necessary to provide the service you purchase.',
        ],
      },
      {
        h2: 'Your rights and requests',
        ps: [
          <>You may request access, rectification, cancellation or objection to the processing of your data, as well as revoke your consent or limit its use, by writing to <a href={mailTo('Privacy request')}>{EMAIL}</a> with the subject &ldquo;Privacy request&rdquo;. State what you wish to request and a means to reply to you. Identity verification must be carried out through an appropriate channel; do not attach sensitive documents to your first message.</>,
          'We reply within 20 business days at most. If you are a PAWWER customer and the request comes from one of YOUR contacts, you handle it: that data is yours and we only process it on your behalf; we can help you find or delete it.',
        ],
      },
      {
        h2: 'Retention and protection',
        ps: [
          'Your account and contact data is kept while the account is active. When you close it, the data is deleted within the following 90 days, except for what the law requires us to keep —payment records, which Dodo Payments also issues— and unless you ask us to delete it sooner.',
          'The CRM requires two-step verification, every device is approved before it can read data, and the database separates each business information with row-level rules. Who opened a contact, exported the list or entered your panel is recorded, and you can review it under \u201cWho has seen your data\u201d inside your account.',
        ],
      },
      {
        h2: 'Changes to this policy',
        ps: ['Updates will be published on this same page with their date. If purposes or processing change, they will be disclosed in accordance with applicable regulations.'],
      },
    ] as Block[],
  };
}

export default function PrivacyView({ locale }: { locale: Locale }) {
  const homeHref = locale === 'es' ? '/' : '/en';
  const altHref = locale === 'es' ? '/en/privacy' : '/privacidad';
  const c = locale === 'es' ? esContent() : enContent();
  return (
    <>
      <Header locale={locale} homeHref={homeHref} altHref={altHref} />
      <main id="contenido" className="prose-page" lang={locale === 'en' ? 'en' : undefined}>
        <a href={homeHref} className="back">{c.back}</a>
        <p className="section-label">{c.label}</p>
        <h1>{c.h1}</h1>
        <p>{c.lead}</p>
        <p className="legal-note">{c.legalNote}</p>
        {c.blocks.map(b => (
          <section key={b.h2}>
            <h2>{b.h2}</h2>
            {b.ps.map((p, i) => <p key={i}>{p}</p>)}
          </section>
        ))}
      </main>
      <Footer locale={locale} homeHref={homeHref} />
    </>
  );
}
