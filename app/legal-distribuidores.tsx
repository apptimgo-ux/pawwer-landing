import { EMAIL } from './site-content';
import { EMPRESA } from './legal-docs';
import type { Documento } from './legal-view';

/**
 * TÉRMINOS PARA DISTRIBUIDORES (15 de octubre de 2026).
 *
 * Lo decidió la persona dueña: el distribuidor NO cobra a sus clientes —PAWWER
 * les cobra sus planes—, gana 15% recurrente de lo que paguen, se le paga el
 * último día de cada mes (un pago de ese día pasa al corte siguiente), paga
 * una membresía sin prueba (US$97 con Esencial o US$297 con Pro para su
 * propio negocio) y atiende a sus clientes con la opción de escalar a PAWWER.
 * La regla de siempre: se cancela, no se reembolsa.
 *
 * Lo que escribió Claude y la persona dueña puede ajustar: comisión sobre lo
 * cobrado SIN impuestos, 30 días de aviso antes de cambiar porcentaje o
 * precios, tipo de cambio del día del pago si se paga en pesos. La ligadura
 * solo para cuentas de 30 días o menos y «el primero gana» sí los hace el
 * código (crm: api/influencer/canjear).
 */
export const REVISION_DISTRIBUIDORES = { es: '15 de octubre de 2026', en: 'October 15, 2026' };

const Correo = ({ asunto }: { asunto: string }) => <a href={`mailto:${EMAIL}?subject=${encodeURIComponent(asunto)}`}>{EMAIL}</a>;

export const terminosDistribuidores: Record<'es' | 'en', Documento> = {
  es: {
    back: '← Volver a PAWWER',
    label: 'Términos para distribuidores',
    h1: 'Las reglas del programa de distribuidores.',
    lead: `Términos del programa de distribuidores de PAWWER, que opera ${EMPRESA}. Vigentes desde el ${REVISION_DISTRIBUIDORES.es}.`,
    blocks: [
      {
        h2: 'Qué es el programa',
        ps: [
          'Como distribuidor recomiendas PAWWER a negocios. Cada negocio que se registra con tu liga o tu código queda ligado a ti, y ganas una comisión por lo que pague.',
          <>Eres independiente: no eres empleado, socio, agente ni representante legal de {EMPRESA}, y no puedes firmar ni prometer nada a su nombre. Tú decides cómo y cuándo recomiendas PAWWER y cubres tus propios gastos.</>,
        ],
      },
      {
        h2: 'Tu membresía',
        ps: [
          <>Para participar pagas una membresía mensual: <strong>Distribuidor, US$97</strong> al mes, o <strong>Distribuidor Pro, US$297</strong> al mes, más los impuestos que apliquen. No tiene días de prueba. La cobra Dodo Payments, que procesa el pago y emite tu comprobante.</>,
          'Mientras tu membresía esté vigente, tu propio negocio tiene PAWWER sin costo adicional: el plan Esencial con Distribuidor, o el plan Pro con Distribuidor Pro, con los límites de ese plan.',
          <><strong>No hay reembolsos.</strong> Cancelas cuando quieras desde tu panel; la membresía sigue hasta que termina el mes ya pagado y no se vuelve a cobrar. Al terminar, tu negocio deja de tener el plan incluido: tus datos se conservan y puedes seguir con un plan normal de PAWWER. Lo que la ley obligue a devolver no se quita con esta regla.</>,
          'Puedes cambiar de membresía desde tu panel; el plan incluido de tu negocio cambia con ella.',
        ],
      },
      {
        h2: 'Tus clientes',
        ps: [
          'Un negocio queda ligado a ti si se registra con tu liga o escribe tu código al crear su cuenta, mientras tu membresía esté vigente. Solo se liga una cuenta nueva (de 30 días o menos) que no esté ligada a otro distribuidor: el primer vínculo es el que cuenta y no se mueve después.',
          'Tu propio negocio no cuenta como cliente tuyo. Tampoco cuentan cuentas falsas, duplicadas o creadas para cobrar comisión sobre ti mismo.',
          <>Los clientes son clientes de {EMPRESA}: contratan con PAWWER, PAWWER les cobra sus planes a sus precios publicados y les presta el servicio. <strong>Tú no les cobras ni les facturas nada</strong> por PAWWER, no cambias sus precios y no prometes funciones, descuentos o resultados que PAWWER no ofrezca públicamente.</>,
        ],
      },
      {
        h2: 'Tu comisión',
        ps: [
          <>Ganas el <strong>15% de lo que cada cliente tuyo paga</strong> por su plan, sin impuestos, mientras siga pagando y tu membresía esté vigente. Cuentan los pagos confirmados que el cliente hace después de quedar ligado a ti.</>,
          'No generan comisión los pagos reembolsados, los contracargos ni los cobros que no se completan; si alguno ya se te pagó, se descuenta de tus comisiones siguientes. Tampoco generan comisión los periodos en que tu membresía no estuvo vigente.',
        ],
      },
      {
        h2: 'Cuándo y cómo te pagamos',
        ps: [
          <>Te pagamos <strong>el último día de cada mes</strong> lo que pagaron tus clientes en ese corte. Un pago que entra justo el último día del mes ya no alcanza ese corte: se suma al del mes siguiente. En tu panel ves cada corte y si ya se pagó.</>,
          'El pago va por transferencia a una cuenta a tu nombre. Las comisiones se calculan en dólares; si te pagamos en pesos, usamos el tipo de cambio del día del pago. Si hace falta, te pediremos tus datos fiscales y un comprobante fiscal por tus comisiones.',
          'Tú eres responsable de tus impuestos sobre lo que ganas.',
        ],
      },
      {
        h2: 'Atención a tus clientes',
        ps: [
          'Los tickets de soporte de tus clientes llegan a tu panel. Te comprometes a contestarlos con diligencia y buen trato. Lo que no puedas resolver lo escalas a PAWWER desde el mismo ticket; los problemas técnicos de la plataforma los resuelve PAWWER.',
        ],
      },
      {
        h2: 'Datos de tus clientes',
        ps: [
          <>Ves el nombre del negocio, su plan, si está al corriente y lo que pagó, para calcular tu comisión. <strong>No ves sus contactos, mensajes ni datos de su cuenta</strong>, y no puedes pedírselos a PAWWER. Lo que veas en tickets o en tu panel es confidencial y lo usas solo para atenderlos. Aplica el <a href="/privacidad">aviso de privacidad</a>.</>,
        ],
      },
      {
        h2: 'Cómo recomiendas PAWWER',
        ps: [
          'Puedes usar el nombre PAWWER, tu liga y los materiales que te demos para recomendarlo. No puedes hacerte pasar por PAWWER, usar publicidad engañosa, mandar mensajes masivos sin permiso de quien los recibe, ni anunciarte con la marca PAWWER como palabra clave en buscadores sin autorización por escrito.',
        ],
      },
      {
        h2: 'Suspensión y fin del programa',
        ps: [
          'Podemos suspender o terminar tu participación si no cumples estos términos, si hay fraude o abuso, o si dejas de pagar tu membresía. Mientras estés suspendido no se ligan clientes nuevos a tu código. Las comisiones obtenidas con fraude no se pagan.',
          'Si tu participación termina sin fraude de por medio, te pagamos las comisiones de los cortes ya cerrados. Tus clientes siguen siendo clientes de PAWWER.',
          'Podemos cambiar estos términos, el porcentaje de comisión o los precios de la membresía avisándote con al menos 30 días por correo o en tu panel. Si no estás de acuerdo, puedes cancelar.',
        ],
      },
      {
        h2: 'Todo lo demás',
        ps: [
          <>También aplican los <a href="/terminos">términos y condiciones</a> y el <a href="/privacidad">aviso de privacidad</a> de PAWWER. Si algo choca con ellos, para el programa de distribuidores manda este documento. Dudas: <Correo asunto="Programa de distribuidores" />.</>,
        ],
      },
    ],
  },
  en: {
    back: '← Back to PAWWER',
    label: 'Distributor terms',
    h1: 'The rules of the distributor program.',
    lead: `Terms of the PAWWER distributor program, operated by ${EMPRESA}. In force since ${REVISION_DISTRIBUIDORES.en}.`,
    blocks: [
      {
        h2: 'What the program is',
        ps: [
          'As a distributor you recommend PAWWER to businesses. Every business that signs up with your link or your code is linked to you, and you earn a commission on what it pays.',
          <>You are independent: you are not an employee, partner, agent or legal representative of {EMPRESA}, and you cannot sign or promise anything on its behalf. You decide how and when you recommend PAWWER and you cover your own expenses.</>,
        ],
      },
      {
        h2: 'Your membership',
        ps: [
          <>To take part you pay a monthly membership: <strong>Distributor, US$97</strong> per month, or <strong>Distributor Pro, US$297</strong> per month, plus applicable taxes. There are no trial days. It is charged by Dodo Payments, which processes the payment and issues your receipt.</>,
          'While your membership is active, your own business gets PAWWER at no extra cost: the Essential plan with Distributor, or the Pro plan with Distributor Pro, with that plan’s limits.',
          <><strong>There are no refunds.</strong> You cancel whenever you want from your panel; the membership runs until the end of the month already paid and is not charged again. When it ends, your business no longer has the included plan: your data is kept and you can continue on a regular PAWWER plan. Anything the law requires to be refunded is not removed by this rule.</>,
          'You can switch memberships from your panel; your business’s included plan changes with it.',
        ],
      },
      {
        h2: 'Your clients',
        ps: [
          'A business is linked to you if it signs up with your link or types your code when creating its account, while your membership is active. Only a new account (30 days old or less) that is not linked to another distributor can be linked: the first link is the one that counts and it does not move afterwards.',
          'Your own business does not count as your client. Neither do fake or duplicate accounts, or accounts created to earn commission on yourself.',
          <>Clients are clients of {EMPRESA}: they contract with PAWWER, PAWWER bills them its plans at its published prices and provides the service. <strong>You do not bill or invoice them anything</strong> for PAWWER, you do not change their prices and you do not promise features, discounts or results that PAWWER does not publicly offer.</>,
        ],
      },
      {
        h2: 'Your commission',
        ps: [
          <>You earn <strong>15% of what each of your clients pays</strong> for its plan, before taxes, for as long as it keeps paying and your membership is active. Confirmed payments the client makes after being linked to you count.</>,
          'Refunded payments, chargebacks and charges that are not completed do not earn commission; if one was already paid to you, it is deducted from your next commissions. Periods in which your membership was not active do not earn commission either.',
        ],
      },
      {
        h2: 'When and how we pay you',
        ps: [
          <>We pay you <strong>on the last day of every month</strong> for what your clients paid in that cutoff. A payment made exactly on the last day of the month misses that cutoff and goes into the following month’s. Your panel shows each cutoff and whether it has been paid.</>,
          'Payment is made by bank transfer to an account in your name. Commissions are calculated in US dollars; if we pay you in Mexican pesos, we use the exchange rate of the payment day. If needed, we will ask for your tax details and a tax receipt for your commissions.',
          'You are responsible for your own taxes on what you earn.',
        ],
      },
      {
        h2: 'Supporting your clients',
        ps: [
          'Support tickets from your clients arrive in your panel. You commit to answering them diligently and courteously. What you cannot solve you escalate to PAWWER from the same ticket; technical problems with the platform are solved by PAWWER.',
        ],
      },
      {
        h2: 'Your clients’ data',
        ps: [
          <>You see the business name, its plan, whether it is up to date and what it paid, to calculate your commission. <strong>You do not see its contacts, messages or account data</strong>, and you cannot request them from PAWWER. What you see in tickets or in your panel is confidential and you use it only to support them. The <a href="/en/privacy">privacy policy</a> applies.</>,
        ],
      },
      {
        h2: 'How you recommend PAWWER',
        ps: [
          'You may use the PAWWER name, your link and the materials we give you to recommend it. You may not pose as PAWWER, use misleading advertising, send mass messages without the recipient’s permission, or advertise using the PAWWER brand as a search keyword without written authorization.',
        ],
      },
      {
        h2: 'Suspension and end of the program',
        ps: [
          'We may suspend or end your participation if you do not comply with these terms, in case of fraud or abuse, or if you stop paying your membership. While suspended, no new clients are linked to your code. Commissions obtained through fraud are not paid.',
          'If your participation ends without fraud involved, we pay you the commissions of cutoffs already closed. Your clients remain PAWWER clients.',
          'We may change these terms, the commission percentage or the membership prices by giving you at least 30 days’ notice by email or in your panel. If you do not agree, you can cancel.',
        ],
      },
      {
        h2: 'Everything else',
        ps: [
          <>PAWWER’s <a href="/en/terms">terms and conditions</a> and <a href="/en/privacy">privacy policy</a> also apply. If anything conflicts with them, this document governs for the distributor program. Questions: <Correo asunto="Distributor program" />.</>,
        ],
      },
    ],
  },
};
