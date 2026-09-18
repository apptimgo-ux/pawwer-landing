import { EMAIL, PHONE_HREF, PHONE_LABEL, ADDRESS_LINES, CRM_URL, siteSettings } from './site-content';
import type { Documento } from './legal-view';

/**
 * TÉRMINOS Y REEMBOLSOS, EN LOS DOS IDIOMAS
 *
 * ============================================================
 * QUÉ DECIDIÓ LA PERSONA DUEÑA (18 de septiembre de 2026)
 *
 * · Quien vende y responde es **PAWWER S.A.S. de C.V.**, con domicilio en
 *   Culiacán. Paddle es el revendedor autorizado que cobra (merchant of
 *   record): la tarjeta nunca toca a PAWWER.
 * · **No hay reembolsos discrecionales.** Se cancela cuando se quiera y el
 *   servicio sigue hasta que termina el periodo ya pagado. Lo que la ley
 *   obliga a devolver —o lo que Paddle devuelva por su cuenta como
 *   vendedor— no se puede quitar con una política, y aquí se dice.
 *
 * ============================================================
 * POR QUÉ ESTÁ ESCRITO ASÍ
 *
 * Estos textos los lee un cliente y los lee quien verifica la cuenta de
 * Paddle. Nada de «pendiente de confirmar»: lo que no se sabe no se
 * promete, y lo que se promete es lo que el producto hace hoy. Los precios
 * y el contacto salen de `content/settings.json`, para que cambiarlos en un
 * lugar los cambie en todas partes.
 * ============================================================
 */

export const EMPRESA = 'PAWWER S.A.S. de C.V.';
export const REVISION = { es: '18 de septiembre de 2026', en: 'September 18, 2026' };

const DIRECCION = `${ADDRESS_LINES[0]} ${ADDRESS_LINES[1]}`;
const PRECIOS = siteSettings.prices as Record<string, string>;
const correo = (asunto?: string) => (asunto ? `mailto:${EMAIL}?subject=${encodeURIComponent(asunto)}` : `mailto:${EMAIL}`);

const Correo = ({ asunto }: { asunto?: string }) => <a href={correo(asunto)}>{EMAIL}</a>;
const Telefono = () => <a href={PHONE_HREF}>{PHONE_LABEL}</a>;
const Crm = () => <a href={CRM_URL}>crm.pawwerapp.com</a>;

/* ------------------------------------------------------------------ */
/*  Términos y condiciones                                             */
/* ------------------------------------------------------------------ */

export const terminos: Record<'es' | 'en', Documento> = {
  es: {
    back: '← Volver a PAWWER',
    label: 'Términos',
    h1: 'Las reglas del servicio, sin letras chiquitas.',
    lead: `Términos y condiciones de uso de PAWWER. Vigentes desde el ${REVISION.es}.`,
    blocks: [
      {
        h2: 'Quién presta el servicio',
        ps: [
          <>PAWWER es un servicio de {EMPRESA}, con domicilio en {DIRECCION} Puedes escribirnos a <Correo /> o llamar al <Telefono />.</>,
          <>El servicio se usa en <Crm />. Al crear una cuenta o usar PAWWER aceptas estos términos. Si los aceptas a nombre de una empresa, declaras que puedes obligarla.</>,
        ],
      },
      {
        h2: 'Qué es PAWWER',
        ps: [
          'PAWWER es un CRM con automatización de marketing para pequeñas y medianas empresas: concentra los mensajes de tus canales conectados, guarda a tus contactos y su conversación, agenda citas, arma cotizaciones y contratos, mide resultados y ofrece un asistente de inteligencia artificial que contesta y califica prospectos.',
          'Lo que cada plan incluye —integrantes del equipo, canales y créditos de IA— se muestra en la página de planes y dentro de tu cuenta. Algunas funciones se venden aparte como complementos y aparecen solo si están dados de alta.',
          'PAWWER es una herramienta: no garantiza ventas, resultados comerciales ni la aprobación de ninguna plataforma de terceros (Meta, Google, WhatsApp u otras), cuyas reglas y disponibilidad no controlamos.',
        ],
      },
      {
        h2: 'Tu cuenta y tu equipo',
        ps: [
          'Quien crea la cuenta la administra: da de alta a su equipo, define permisos y responde por el uso que se haga desde ella. Cada persona entra con su propio acceso y con verificación en dos pasos, que es obligatoria.',
          'Cuida tus credenciales y los equipos desde donde entras. Avísanos de inmediato si crees que alguien más entró a tu cuenta. PAWWER nunca te pedirá tu contraseña ni el código de tu aplicación de autenticación.',
        ],
      },
      {
        h2: 'Precios, impuestos y renovación',
        ps: [
          <>Los planes se cobran por mes en dólares estadounidenses: Esencial {PRECIOS.esencial}, Crecimiento {PRECIOS.crecimiento} y Escala {PRECIOS.escala}. <strong>Los precios no incluyen impuestos</strong>: en el checkout se suman los que apliquen a tu país —en México, el IVA— y los ves antes de pagar.</>,
          'La suscripción se renueva sola cada mes hasta que la canceles. Si cambiamos el precio de tu plan te avisamos con al menos 30 días de anticipación y el precio nuevo aplica hasta tu siguiente renovación.',
          'Si un cobro no pasa, Paddle lo reintenta durante unos días. Mientras tanto sigues entrando con un aviso en pantalla; si no se resuelve, la cuenta queda sin acceso al servicio de paga y tus datos se conservan según la política de privacidad.',
        ],
      },
      {
        h2: 'Quién cobra: Paddle',
        ps: [
          <>El pago lo procesa <strong>Paddle.com Market Limited</strong> como revendedor autorizado (<em>merchant of record</em>) de PAWWER. Paddle te vende la suscripción, emite el comprobante y trata los datos de tu tarjeta bajo sus propios términos; PAWWER nunca ve ni guarda el número de tu tarjeta.</>,
          <>Tus recibos y facturas viven en el portal de Paddle, al que entras desde Mi empresa → Tu plan y créditos. Si necesitas los datos fiscales de tu negocio en el comprobante, agrégalos en el checkout antes de pagar.</>,
        ],
      },
      {
        h2: 'La prueba de 3 días',
        ps: [
          'Una cuenta nueva puede empezar con una prueba de 3 días que requiere registrar una tarjeta. Durante la prueba no se cobra nada y usas las herramientas del plan más completo, con los créditos de IA del plan que contrataste.',
          'Al terminar la prueba se cobra automáticamente el primer mes, salvo que canceles antes desde tu cuenta. Es una prueba por negocio: quien ya tuvo la suya paga desde el primer día.',
        ],
      },
      {
        h2: 'Cancelación y reembolsos',
        ps: [
          <>Puedes cancelar cuando quieras desde Mi empresa → Tu plan y créditos, y sigues usando PAWWER hasta que termina el periodo que ya pagaste. <strong>No hacemos reembolsos por periodos ya cobrados</strong>, salvo lo que la ley te dé o lo que Paddle resuelva como vendedor. El detalle está en la <a href="/reembolsos">política de reembolso y cancelación</a>.</>,
        ],
      },
      {
        h2: 'Tus datos son tuyos',
        ps: [
          'Los contactos, conversaciones, archivos y demás información que entras a PAWWER son tuyos. Los tratamos para prestarte el servicio y para lo que nos pidas, conforme a la <a href="/privacidad">política de privacidad</a>. No los vendemos ni los usamos para publicidad de terceros.',
          'Puedes exportar tus contactos desde la propia aplicación mientras tu cuenta esté activa. Si cierras la cuenta, expórtalos antes: después se eliminan en los plazos de la política de privacidad.',
        ],
      },
      {
        h2: 'Uso aceptable',
        ps: [
          'Te comprometes a escribirle solo a quien te dio su consentimiento, a respetar las reglas de cada canal que conectes —en especial las de WhatsApp y Meta— y a no usar PAWWER para spam, engaños, cobranza abusiva, contenido ilegal ni para tratar datos sensibles (salud, datos financieros de terceros, biométricos) sin la base legal para hacerlo.',
          'Tampoco se permite revender el acceso, intentar entrar a cuentas ajenas, extraer datos de otros negocios, ni cargar al servicio más allá de los límites de tu plan de forma automatizada.',
        ],
      },
      {
        h2: 'El asistente de inteligencia artificial',
        ps: [
          'PAWWER puede contestar a tus prospectos con inteligencia artificial cuando tú lo enciendes. Tú defines el tono y los límites, y sigues siendo responsable de lo que se envía desde tus canales: revisa las conversaciones, sobre todo antes de prometer precios, disponibilidad o fechas.',
          'El asistente no cotiza ni cierra ventas por su cuenta y pasa la conversación a una persona cuando alguien la pide. Cada respuesta consume créditos del plan; si se acaban, el asistente se detiene y te lo dice.',
        ],
      },
      {
        h2: 'Disponibilidad, cambios y soporte',
        ps: [
          'Trabajamos para que PAWWER esté disponible siempre, pero no ofrecemos un nivel de servicio garantizado: puede haber mantenimientos, fallas de proveedores o interrupciones de las plataformas que conectas. Cuando dependamos de un tercero que falla, lo decimos en pantalla en vez de mostrar un cero.',
          <>El soporte se atiende por correo (<Correo asunto="Soporte PAWWER" />), por teléfono y desde el chat de ayuda dentro de la aplicación, en horario hábil de Sinaloa, México.</>,
          'Podemos agregar, cambiar o retirar funciones. Si un cambio reduce de forma importante lo que contrataste, te avisamos con anticipación razonable.',
        ],
      },
      {
        h2: 'Suspensión y terminación',
        ps: [
          'Podemos suspender o cerrar una cuenta que incumpla estos términos, que ponga en riesgo a otras personas o al servicio, o que deje de pagar. Cuando sea posible, avisamos antes y damos oportunidad de corregir.',
          'Tú puedes dejar de usar PAWWER cuando quieras cancelando tu suscripción.',
        ],
      },
      {
        h2: 'Responsabilidad',
        ps: [
          'PAWWER se ofrece tal como es. En la medida que la ley lo permita, nuestra responsabilidad total frente a ti se limita a lo que hayas pagado por el servicio en los 12 meses anteriores al hecho que la origine, y no respondemos por pérdidas indirectas, pérdida de ganancias o de oportunidades comerciales.',
          'Nada de lo anterior limita los derechos que la ley te reconoce como consumidor, ni nuestra responsabilidad por dolo o por daños que no se puedan limitar legalmente.',
        ],
      },
      {
        h2: 'Cambios a estos términos',
        ps: [
          'Si cambiamos estos términos, publicamos la versión nueva en esta página con su fecha y te avisamos dentro de la aplicación o por correo antes de que aplique. Seguir usando PAWWER después de esa fecha significa que aceptas la versión nueva.',
        ],
      },
      {
        h2: 'Ley aplicable',
        ps: [
          <>Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Para cualquier controversia, las partes se someten a los tribunales de Culiacán, Sinaloa, sin perjuicio de los derechos que la legislación de protección al consumidor reconozca en el lugar donde vivas. Antes de llegar ahí, escríbenos a <Correo asunto="Aclaración" />: casi todo se resuelve en un correo.</>,
        ],
      },
    ],
  },
  en: {
    back: '← Back to PAWWER',
    label: 'Terms',
    h1: 'The rules of the service, no fine print.',
    lead: `Terms and conditions for using PAWWER. In force since ${REVISION.en}.`,
    blocks: [
      {
        h2: 'Who provides the service',
        ps: [
          <>PAWWER is a service of {EMPRESA}, a Mexican company with address at {DIRECCION} You can write to <Correo /> or call <Telefono />.</>,
          <>The service runs at <Crm />. By creating an account or using PAWWER you accept these terms. If you accept on behalf of a company, you confirm you can bind it.</>,
        ],
      },
      {
        h2: 'What PAWWER is',
        ps: [
          'PAWWER is a CRM with marketing automation for small and medium businesses: it brings together the messages from your connected channels, keeps your contacts and their conversation, books appointments, builds quotes and contracts, measures results, and offers an AI assistant that replies to and qualifies prospects.',
          'What each plan includes — team members, channels and AI credits — is shown on the plans page and inside your account. Some features are sold separately as add-ons and only appear once they are enabled for your account.',
          'PAWWER is a tool: it does not guarantee sales, business results or approval by any third-party platform (Meta, Google, WhatsApp or others), whose rules and availability we do not control.',
        ],
      },
      {
        h2: 'Your account and your team',
        ps: [
          'Whoever creates the account administers it: they add their team, set permissions and are responsible for what is done from it. Each person signs in with their own access and two-step verification, which is mandatory.',
          'Take care of your credentials and the devices you sign in from. Tell us right away if you believe someone else accessed your account. PAWWER will never ask you for your password or your authenticator code.',
        ],
      },
      {
        h2: 'Prices, taxes and renewal',
        ps: [
          <>Plans are billed monthly in US dollars: Essential {PRECIOS.esencial}, Growth {PRECIOS.crecimiento} and Scale {PRECIOS.escala}. <strong>Prices exclude taxes</strong>: any taxes that apply in your country are added at checkout and shown before you pay.</>,
          'The subscription renews automatically every month until you cancel. If we change the price of your plan we will tell you at least 30 days in advance and the new price applies from your next renewal.',
          'If a charge fails, Paddle retries it over a few days. Meanwhile you keep signing in with a notice on screen; if it is not resolved, the account loses access to the paid service and your data is kept as described in the privacy policy.',
        ],
      },
      {
        h2: 'Who charges you: Paddle',
        ps: [
          <>Payments are processed by <strong>Paddle.com Market Limited</strong> as PAWWER&rsquo;s authorized reseller and merchant of record. Paddle sells you the subscription, issues the receipt and handles your card data under its own terms; PAWWER never sees or stores your card number.</>,
          'Your receipts and invoices live in Paddle&rsquo;s portal, which you open from My company → Your plan and credits. If you need your business tax details on the receipt, add them at checkout before paying.',
        ],
      },
      {
        h2: 'The 3-day trial',
        ps: [
          'A new account can start with a 3-day trial that requires registering a card. Nothing is charged during the trial and you use the tools of the most complete plan, with the AI credits of the plan you signed up for.',
          'When the trial ends, the first month is charged automatically unless you cancel before that. It is one trial per business: whoever already had theirs pays from day one.',
        ],
      },
      {
        h2: 'Cancellation and refunds',
        ps: [
          <>You can cancel any time from My company → Your plan and credits, and you keep using PAWWER until the period you already paid for ends. <strong>We do not refund periods already charged</strong>, except where the law gives you that right or Paddle decides otherwise as the seller. The detail is in the <a href="/en/refunds">refund and cancellation policy</a>.</>,
        ],
      },
      {
        h2: 'Your data is yours',
        ps: [
          'The contacts, conversations, files and other information you put into PAWWER are yours. We process them to provide the service and to do what you ask us, as described in the <a href="/en/privacy">privacy policy</a>. We do not sell them and do not use them for third-party advertising.',
          'You can export your contacts from the application while your account is active. If you close the account, export them first: afterwards they are deleted within the periods stated in the privacy policy.',
        ],
      },
      {
        h2: 'Acceptable use',
        ps: [
          'You agree to message only people who gave you their consent, to respect the rules of every channel you connect — especially WhatsApp and Meta — and not to use PAWWER for spam, deception, abusive collection practices, illegal content or to process sensitive data (health, third-party financial data, biometrics) without a legal basis to do so.',
          'You also may not resell access, attempt to reach other accounts, extract other businesses&rsquo; data, or load the service beyond your plan limits in an automated way.',
        ],
      },
      {
        h2: 'The AI assistant',
        ps: [
          'PAWWER can reply to your prospects with artificial intelligence when you turn it on. You set the tone and the limits, and you remain responsible for what is sent from your channels: review the conversations, especially before promising prices, availability or dates.',
          'The assistant does not quote or close sales on its own and hands the conversation to a person when someone asks for one. Each reply uses credits from your plan; when they run out, the assistant stops and says so.',
        ],
      },
      {
        h2: 'Availability, changes and support',
        ps: [
          'We work to keep PAWWER available at all times, but we do not offer a guaranteed service level: there may be maintenance, provider failures or outages of the platforms you connect. When we depend on a third party that fails, we say so on screen instead of showing a zero.',
          <>Support is handled by email (<Correo asunto="PAWWER support" />), by phone and from the help chat inside the application, during business hours in Sinaloa, Mexico.</>,
          'We may add, change or remove features. If a change materially reduces what you signed up for, we will tell you with reasonable notice.',
        ],
      },
      {
        h2: 'Suspension and termination',
        ps: [
          'We may suspend or close an account that breaches these terms, puts other people or the service at risk, or stops paying. Where possible, we give notice first and a chance to fix it.',
          'You can stop using PAWWER whenever you want by cancelling your subscription.',
        ],
      },
      {
        h2: 'Liability',
        ps: [
          'PAWWER is provided as is. To the extent permitted by law, our total liability to you is limited to what you paid for the service in the 12 months before the event giving rise to it, and we are not liable for indirect losses, loss of profits or of business opportunities.',
          'None of the above limits the rights the law gives you as a consumer, nor our liability for wilful misconduct or for damages that cannot be limited by law.',
        ],
      },
      {
        h2: 'Changes to these terms',
        ps: [
          'If we change these terms, we publish the new version on this page with its date and tell you inside the application or by email before it applies. Continuing to use PAWWER after that date means you accept the new version.',
        ],
      },
      {
        h2: 'Governing law',
        ps: [
          <>These terms are governed by the laws of Mexico. For any dispute, the parties submit to the courts of Culiacán, Sinaloa, without prejudice to the consumer-protection rights recognised where you live. Before it gets there, write to <Correo asunto="Question" />: almost everything is solved in one email.</>,
        ],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Política de reembolso y cancelación                                */
/* ------------------------------------------------------------------ */

export const reembolsos: Record<'es' | 'en', Documento> = {
  es: {
    back: '← Volver a PAWWER',
    label: 'Reembolsos',
    h1: 'Cancelas cuando quieras. Lo cobrado no se devuelve.',
    lead: `Política de reembolso y cancelación de PAWWER. Vigente desde el ${REVISION.es}.`,
    nota: (
      <><strong>En una línea:</strong> puedes cancelar en cualquier momento y seguir usando PAWWER hasta que termine el periodo que ya pagaste, pero los periodos ya cobrados no se reembolsan. Los cobros por error sí se corrigen, y los derechos que te da la ley siguen intactos.</>
    ),
    blocks: [
      {
        h2: 'Antes de que se cobre nada: la prueba',
        ps: [
          'Una cuenta nueva empieza con 3 días de prueba. Se pide una tarjeta para empezarla, pero no se cobra durante la prueba: el primer cargo ocurre al terminar. Si cancelas antes de que termine, no se cobra nada.',
          'Te recomendamos usar esos días para conectar tus canales y meter a tu equipo: es la forma de saber si PAWWER te sirve antes de pagar.',
        ],
      },
      {
        h2: 'Cómo cancelar',
        ps: [
          <>Dentro de PAWWER: Mi empresa → Tu plan y créditos → Cancelar suscripción. También puedes hacerlo desde el portal de Paddle, al que entras desde esa misma pantalla, o escribiéndonos a <Correo asunto="Cancelar suscripción" /> desde el correo con el que administras la cuenta.</>,
          'La cancelación surte efecto al final del periodo que ya pagaste. No hay penalización, ni permanencia, ni llamada de retención.',
        ],
      },
      {
        h2: 'Qué pasa cuando cancelas',
        ps: [
          'Sigues usando PAWWER con normalidad hasta el último día del periodo pagado. Después, la cuenta deja de tener acceso al servicio de paga y no se hacen más cobros.',
          'Antes de esa fecha exporta lo que quieras conservar: tus contactos se descargan en CSV desde la pantalla de Contactos. Los datos se conservan y se eliminan conforme a la política de privacidad.',
        ],
      },
      {
        h2: 'Reembolsos',
        ps: [
          <><strong>No devolvemos periodos ya cobrados</strong>, ni completos ni en proporción, incluyendo el caso de que no hayas usado el servicio durante ese mes. El modelo es mensual y sin permanencia: si algo no te sirve, cancelas y dejas de pagar el mes siguiente.</>,
          'Sí corregimos lo que salió mal: un cobro duplicado, un cargo después de haber cancelado, un cobro a una cuenta que no es tuya o un cobro por un monto distinto al del plan contratado. Escríbenos y lo resolvemos.',
          <>Paddle, como vendedor de la transacción, puede resolver una solicitud o una disputa conforme a sus propias condiciones, incluso cuando nuestra política diga otra cosa.</>,
        ],
      },
      {
        h2: 'Lo que la ley te da, no te lo quita esta política',
        ps: [
          'Si la legislación de tu país te reconoce un derecho de retracto, de cancelación o de reembolso —por ejemplo la Ley Federal de Protección al Consumidor en México o las normas de consumo de la Unión Europea y el Reino Unido—, ese derecho aplica por encima de esta política y puedes ejercerlo escribiéndonos.',
          'Tampoco limitamos lo que corresponda cuando el servicio no se prestó, se cobró sin tu autorización o hubo un error atribuible a nosotros.',
        ],
      },
      {
        h2: 'Cambios de plan',
        ps: [
          'Puedes subir o bajar de plan cuando quieras desde Mi empresa. Al subir se cobra hoy la diferencia proporcional por lo que queda del mes; al bajar, el saldo a favor se aplica a los siguientes cobros. El monto exacto lo calcula Paddle y se te muestra antes de confirmar.',
        ],
      },
      {
        h2: 'Cómo pedir ayuda',
        ps: [
          <>Escríbenos a <Correo asunto="Cobros y reembolsos" /> o llámanos al <Telefono />. Contestamos en horario hábil de Sinaloa, México, normalmente el mismo día. Incluye el correo con el que administras la cuenta y la fecha del cargo: con eso lo encontramos más rápido.</>,
        ],
      },
    ],
  },
  en: {
    back: '← Back to PAWWER',
    label: 'Refunds',
    h1: 'Cancel whenever you want. Charged periods are not refunded.',
    lead: `PAWWER refund and cancellation policy. In force since ${REVISION.en}.`,
    nota: (
      <><strong>In one line:</strong> you can cancel at any time and keep using PAWWER until the period you already paid for ends, but periods already charged are not refunded. Charges made in error are corrected, and the rights the law gives you remain intact.</>
    ),
    blocks: [
      {
        h2: 'Before anything is charged: the trial',
        ps: [
          'A new account starts with a 3-day trial. A card is required to start it, but nothing is charged during the trial: the first charge happens when it ends. If you cancel before then, nothing is charged.',
          'We recommend using those days to connect your channels and add your team: that is how you find out whether PAWWER works for you before paying.',
        ],
      },
      {
        h2: 'How to cancel',
        ps: [
          <>Inside PAWWER: My company → Your plan and credits → Cancel subscription. You can also do it from Paddle&rsquo;s portal, which you open from that same screen, or by writing to <Correo asunto="Cancel subscription" /> from the email that administers the account.</>,
          'Cancellation takes effect at the end of the period you already paid for. There is no penalty, no minimum term and no retention call.',
        ],
      },
      {
        h2: 'What happens when you cancel',
        ps: [
          'You keep using PAWWER normally until the last day of the paid period. After that, the account loses access to the paid service and no further charges are made.',
          'Export whatever you want to keep before that date: your contacts download as CSV from the Contacts screen. Data is retained and deleted as described in the privacy policy.',
        ],
      },
      {
        h2: 'Refunds',
        ps: [
          <><strong>We do not refund periods already charged</strong>, in full or pro rata, including where you did not use the service during that month. The model is monthly with no minimum term: if something does not work for you, cancel and you stop paying from the next month.</>,
          'We do fix what went wrong: a duplicate charge, a charge after you cancelled, a charge to an account that is not yours, or a charge for an amount different from your plan. Write to us and we will sort it out.',
          'Paddle, as the seller of record for the transaction, may resolve a request or a dispute under its own terms, even where our policy says otherwise.',
        ],
      },
      {
        h2: 'This policy does not remove your statutory rights',
        ps: [
          'If the law in your country gives you a right of withdrawal, cancellation or refund — for example Mexico&rsquo;s consumer protection law or EU and UK consumer rules — that right prevails over this policy and you can exercise it by writing to us.',
          'We also do not limit what is due when the service was not provided, was charged without your authorisation, or where there was an error on our side.',
        ],
      },
      {
        h2: 'Plan changes',
        ps: [
          'You can upgrade or downgrade at any time from My company. On an upgrade, the prorated difference for the rest of the month is charged today; on a downgrade, the credit is applied to your next charges. Paddle calculates the exact amount and shows it to you before you confirm.',
        ],
      },
      {
        h2: 'How to get help',
        ps: [
          <>Write to <Correo asunto="Billing and refunds" /> or call <Telefono />. We reply during business hours in Sinaloa, Mexico, usually the same day. Include the email that administers the account and the date of the charge: that is how we find it fastest.</>,
        ],
      },
    ],
  },
};
