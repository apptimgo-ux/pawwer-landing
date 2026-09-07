import type { ReactNode } from 'react';
import { Header, Footer } from './site-ui';
import { content, type Locale, EMAIL, PHONE_HREF, PHONE_LABEL, ADDRESS_LINES, CRM_URL, PRIVACY_REVIEW } from './site-content';

const mailTo = (subject?: string) => (subject ? `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}` : `mailto:${EMAIL}`);

type Block = { h2: string; ps: ReactNode[] };

function esContent() {
  const address = `${ADDRESS_LINES[0]} ${ADDRESS_LINES[1]}`;
  return {
    back: '← Volver a PAWWER',
    label: 'Privacidad',
    h1: 'Tu información merece claridad.',
    lead: `Política de privacidad de la landing de PAWWER. Versión de revisión: ${PRIVACY_REVIEW.es}.`,
    legalNote: (
      <><strong>Documento preliminar.</strong> Antes de su publicación definitiva, PAWWER debe confirmar la identidad legal del responsable, sus proveedores y los plazos de conservación. Esta política describe el alcance de esta landing; no sustituye el aviso del CRM.</>
    ),
    blocks: [
      {
        h2: 'Contacto y responsable',
        ps: [
          'PAWWER es el nombre comercial presentado en este sitio. La razón social o nombre legal del responsable está pendiente de confirmación.',
          <>Domicilio de contacto proporcionado: {address} Puedes escribir a <a href={mailTo()}>{EMAIL}</a> o llamar al <a href={PHONE_HREF}>{PHONE_LABEL}</a>.</>,
        ],
      },
      {
        h2: 'Qué información se utiliza',
        ps: [
          'Esta landing no contiene formularios de registro ni solicita tarjetas. Si decides contactarnos por correo o teléfono, compartes los datos que incluyas en tu comunicación, por ejemplo tu nombre, correo, empresa y necesidades comerciales. Evita enviar contraseñas, tarjetas o información sensible.',
          'El servicio de alojamiento puede procesar datos técnicos, como dirección IP, fecha de acceso e información del navegador, para entregar el sitio y gestionar su seguridad. Los proveedores y condiciones definitivas de alojamiento deben confirmarse antes de la publicación pública.',
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
          <>El enlace Sign in / Login conduce a <a href={CRM_URL}>crm.pawwerapp.com</a>. El tratamiento de datos dentro del CRM debe detallarse en su propio aviso. Esta landing no accede a tus contactos ni a tus conversaciones del CRM.</>,
          'La prueba de 7 días se inicia desde el CRM (crm.pawwerapp.com) y requiere registrar una tarjeta de crédito, que se cobra automáticamente al terminar la prueba salvo que canceles antes. Esa captura de tarjeta y ese cobro ocurren en el CRM y en su proveedor de pagos (por ejemplo Stripe o Mercado Pago), no en esta landing, que no procesa pagos ni almacena tarjetas. El proveedor de pagos definitivo y sus condiciones deben informarse en el aviso del CRM antes de su activación.',
          'Los servicios de correo y alojamiento que intervengan en la atención de solicitudes deben identificarse en la versión definitiva. Cualquier transferencia que requiera consentimiento deberá informarse y gestionarse antes de realizarse.',
        ],
      },
      {
        h2: 'Tus derechos y solicitudes',
        ps: [
          <>Puedes solicitar acceso, rectificación, cancelación u oposición al tratamiento de tus datos, así como revocar tu consentimiento o limitar su uso, escribiendo a <a href={mailTo('Solicitud de privacidad')}>{EMAIL}</a> con el asunto «Solicitud de privacidad». Indica qué deseas solicitar y un medio para responderte. La verificación de identidad deberá realizarse por un canal adecuado; no adjuntes documentos sensibles a tu primer mensaje.</>,
          'El procedimiento operativo y los plazos aplicables deben validarse antes de utilizar este documento como aviso definitivo.',
        ],
      },
      {
        h2: 'Conservación y protección',
        ps: ['Los periodos de conservación, eliminación y las medidas aplicables a la atención de consultas deben documentarse según la operación real de PAWWER. Esta landing no acredita ni audita las medidas de seguridad del CRM.'],
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
    lead: `Privacy policy for the PAWWER landing page. Review version: ${PRIVACY_REVIEW.en}.`,
    legalNote: (
      <><strong>Preliminary document.</strong> Before its final publication, PAWWER must confirm the legal identity of the controller, its providers and the retention periods. This policy describes the scope of this landing page; it does not replace the CRM&rsquo;s own notice.</>
    ),
    blocks: [
      {
        h2: 'Contact and controller',
        ps: [
          'PAWWER is the commercial name shown on this site. The company or legal name of the controller is pending confirmation.',
          <>Contact address provided: {address} You can write to <a href={mailTo()}>{EMAIL}</a> or call <a href={PHONE_HREF}>{PHONE_LABEL}</a>.</>,
        ],
      },
      {
        h2: 'What information is used',
        ps: [
          'This landing page has no registration forms and does not request card details. If you choose to contact us by email or phone, you share the data you include in your message, such as your name, email, company and commercial needs. Avoid sending passwords, cards or sensitive information.',
          'The hosting provider may process technical data, such as IP address, access date and browser information, to deliver the site and manage its security. The final hosting providers and terms must be confirmed before public publication.',
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
          <>The Sign in / Login link leads to <a href={CRM_URL}>crm.pawwerapp.com</a>. Data processing inside the CRM must be detailed in its own notice. This landing page does not access your contacts or your CRM conversations.</>,
          'The 7-day trial is started from the CRM (crm.pawwerapp.com) and requires registering a credit card, which is charged automatically when the trial ends unless you cancel first. That card capture and charge happen in the CRM and its payment provider (for example Stripe or Mercado Pago), not on this landing page, which does not process payments or store cards. The final payment provider and its terms must be disclosed in the CRM notice before activation.',
          'The email and hosting services involved in handling requests must be identified in the final version. Any transfer requiring consent must be disclosed and managed before it takes place.',
        ],
      },
      {
        h2: 'Your rights and requests',
        ps: [
          <>You may request access, rectification, cancellation or objection to the processing of your data, as well as revoke your consent or limit its use, by writing to <a href={mailTo('Privacy request')}>{EMAIL}</a> with the subject &ldquo;Privacy request&rdquo;. State what you wish to request and a means to reply to you. Identity verification must be carried out through an appropriate channel; do not attach sensitive documents to your first message.</>,
          'The operational procedure and applicable timeframes must be validated before using this document as a final notice.',
        ],
      },
      {
        h2: 'Retention and protection',
        ps: ["Retention and deletion periods and the measures applicable to handling queries must be documented according to PAWWER's actual operation. This landing page does not certify or audit the CRM's security measures."],
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
