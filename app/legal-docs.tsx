import { EMAIL, PHONE_HREF, PHONE_LABEL, ADDRESS_LINES, CRM_URL, siteSettings } from './site-content';
import type { Documento } from './legal-view';

/**
 * TÉRMINOS, REEMBOLSOS, ENCARGO DE DATOS Y BETA, EN LOS DOS IDIOMAS
 *
 * ============================================================
 * QUÉ DECIDIÓ LA PERSONA DUEÑA (18 de septiembre de 2026)
 *
 * · Quien vende y responde es **PAWWER S.A.S. de C.V.**, con domicilio en
 *   Culiacán. Dodo Payments es el revendedor autorizado que cobra
 *   (merchant of record): la tarjeta nunca toca a PAWWER.
 *
 *   ⚠️ Decía Paddle hasta el 19 de septiembre de 2026, cuando Paddle
 *   rechazó la cuenta y el cobro se rehízo sobre Dodo. Aquí va el nombre
 *   comercial y NO una razón social inventada: la entidad exacta que
 *   factura es la que aparece en el comprobante que Dodo emite, y ese
 *   dato se confirma con la primera factura real, no antes.
 * · **No hay reembolsos discrecionales.** Se cancela cuando se quiera y el
 *   servicio sigue hasta que termina el periodo ya pagado. Lo que la ley
 *   obliga a devolver —o lo que Dodo devuelva por su cuenta como
 *   vendedor— no se puede quitar con una política, y aquí se dice.
 *
 * ============================================================
 * POR QUÉ ESTÁ ESCRITO ASÍ
 *
 * Estos textos los lee un cliente y los lee quien verifica la cuenta de
 * Dodo. Nada de «pendiente de confirmar»: lo que no se sabe no se
 * promete, y lo que se promete es lo que el producto hace hoy. Los precios
 * y el contacto salen de `content/settings.json`, para que cambiarlos en un
 * lugar los cambie en todas partes.
 * ============================================================
 */

export const EMPRESA = 'PAWWER S.A.S. de C.V.';
export const REVISION = { es: '21 de septiembre de 2026', en: 'September 21, 2026' };

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
          'Si un cobro no pasa, Dodo lo reintenta durante unos días. Mientras tanto sigues entrando con un aviso en pantalla; si no se resuelve, la cuenta queda sin acceso al servicio de paga y tus datos se conservan según la política de privacidad.',
        ],
      },
      {
        h2: 'Quién cobra: Dodo Payments',
        ps: [
          <>El pago lo procesa <strong>Dodo Payments</strong> como revendedor autorizado (<em>merchant of record</em>) de PAWWER. Dodo te vende la suscripción, emite el comprobante y trata los datos de tu tarjeta bajo sus propios términos; PAWWER nunca ve ni guarda el número de tu tarjeta. La entidad que factura y sus datos fiscales son los que aparecen en ese comprobante.</>,
          <>Tus recibos y facturas viven en el portal de Dodo, al que entras desde Mi empresa → Tu plan y créditos. Si la factura va a nombre de tu empresa, marca <em>«Purchasing as a business»</em> en el checkout y escribe tu RFC y tu razón social <strong>antes de pagar</strong>: después del cobro ya no se pueden cambiar en esa factura.</>,
        ],
      },
      {
        h2: 'La prueba de 3 días',
        ps: [
          'Una cuenta nueva puede empezar con una prueba de 3 días que requiere registrar una tarjeta. Durante la prueba no se cobra nada y usas las herramientas del plan más completo, con los créditos de IA del plan que contrataste.',
          'Al terminar la prueba se cobra automáticamente el primer mes, salvo que canceles antes desde tu cuenta. Es una prueba por negocio: quien ya tuvo la suya paga desde el primer día.',
          <>Los negocios invitados a la beta entran con un código, <strong>sin tarjeta</strong>, por el tiempo que diga el código. Al terminar eligen su plan y lo pagan; la beta cuenta como su prueba. Las reglas completas están en los <a href="/programa-beta">términos del programa beta</a>.</>,
        ],
      },
      {
        h2: 'Cancelación y reembolsos',
        ps: [
          <>Puedes cancelar cuando quieras desde Mi empresa → Tu plan y créditos, y sigues usando PAWWER hasta que termina el periodo que ya pagaste. <strong>No hacemos reembolsos por periodos ya cobrados</strong>, salvo lo que la ley te dé o lo que Dodo resuelva como vendedor. El detalle está en la <a href="/reembolsos">política de reembolso y cancelación</a>.</>,
        ],
      },
      {
        h2: 'Tus datos son tuyos',
        ps: [
          <>Los contactos, conversaciones, archivos y demás información que entras a PAWWER son tuyos. Los tratamos para prestarte el servicio y para lo que nos pidas, conforme a la <a href="/privacidad">política de privacidad</a>. No los vendemos ni los usamos para publicidad de terceros.</>,
          <>Sobre los datos de <strong>tus</strong> contactos, tú eres el responsable y PAWWER el encargado que los trata por tu cuenta. Cómo lo hacemos —con qué proveedores, qué medidas de seguridad y qué pasa si algo falla— está en el <a href="/tratamiento-de-datos">contrato de encargo de tratamiento de datos</a>, que forma parte de estos términos.</>,
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
          'If a charge fails, Dodo retries it over a few days. Meanwhile you keep signing in with a notice on screen; if it is not resolved, the account loses access to the paid service and your data is kept as described in the privacy policy.',
        ],
      },
      {
        h2: 'Who charges you: Dodo Payments',
        ps: [
          <>Payments are processed by <strong>Dodo Payments</strong> as PAWWER&rsquo;s authorized reseller and merchant of record. Dodo sells you the subscription, issues the receipt and handles your card data under its own terms; PAWWER never sees or stores your card number. The invoicing entity and its tax details are the ones shown on that receipt.</>,
          'Your receipts and invoices live in Dodo’s portal, which you open from My company → Your plan and credits. If the invoice has to be in your company’s name, tick “Purchasing as a business” at checkout and enter your tax ID and legal name before paying: once the charge goes through they cannot be changed on that invoice.',
        ],
      },
      {
        h2: 'The 3-day trial',
        ps: [
          'A new account can start with a 3-day trial that requires registering a card. Nothing is charged during the trial and you use the tools of the most complete plan, with the AI credits of the plan you signed up for.',
          'When the trial ends, the first month is charged automatically unless you cancel before that. It is one trial per business: whoever already had theirs pays from day one.',
          <>Businesses invited to the beta get in with a code, <strong>without a card</strong>, for the time the code states. When it ends they choose their plan and pay for it; the beta counts as their trial. The full rules are in the <a href="/en/beta-program">beta program terms</a>.</>,
        ],
      },
      {
        h2: 'Cancellation and refunds',
        ps: [
          <>You can cancel any time from My company → Your plan and credits, and you keep using PAWWER until the period you already paid for ends. <strong>We do not refund periods already charged</strong>, except where the law gives you that right or Dodo decides otherwise as the seller. The detail is in the <a href="/en/refunds">refund and cancellation policy</a>.</>,
        ],
      },
      {
        h2: 'Your data is yours',
        ps: [
          <>The contacts, conversations, files and other information you put into PAWWER are yours. We process them to provide the service and to do what you ask us, as described in the <a href="/en/privacy">privacy policy</a>. We do not sell them and do not use them for third-party advertising.</>,
          <>For <strong>your</strong> contacts' data, you are the controller and PAWWER is the processor that handles it on your behalf. How we do it —with which providers, which security measures and what happens if something fails— is in the <a href="/en/data-processing">data processing agreement</a>, which is part of these terms.</>,
          'You can export your contacts from the application while your account is active. If you close the account, export them first: afterwards they are deleted within the periods stated in the privacy policy.',
        ],
      },
      {
        h2: 'Acceptable use',
        ps: [
          'You agree to message only people who gave you their consent, to respect the rules of every channel you connect — especially WhatsApp and Meta — and not to use PAWWER for spam, deception, abusive collection practices, illegal content or to process sensitive data (health, third-party financial data, biometrics) without a legal basis to do so.',
          'You also may not resell access, attempt to reach other accounts, extract other businesses’ data, or load the service beyond your plan limits in an automated way.',
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
          <>Dentro de PAWWER: Mi empresa → Tu plan y créditos → Cancelar suscripción. También puedes hacerlo desde el portal de Dodo, al que entras desde esa misma pantalla, o escribiéndonos a <Correo asunto="Cancelar suscripción" /> desde el correo con el que administras la cuenta.</>,
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
          <>Dodo Payments, como vendedor de la transacción, puede resolver una solicitud o una disputa conforme a sus propias condiciones, incluso cuando nuestra política diga otra cosa.</>,
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
          'Puedes subir o bajar de plan cuando quieras desde Mi empresa. Al subir se cobra hoy la diferencia proporcional por lo que queda del mes; al bajar, el saldo a favor se aplica a los siguientes cobros. El monto exacto lo calcula Dodo y se te muestra antes de confirmar.',
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
          <>Inside PAWWER: My company → Your plan and credits → Cancel subscription. You can also do it from Dodo&rsquo;s portal, which you open from that same screen, or by writing to <Correo asunto="Cancel subscription" /> from the email that administers the account.</>,
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
          'Dodo Payments, as the seller of record for the transaction, may resolve a request or a dispute under its own terms, even where our policy says otherwise.',
        ],
      },
      {
        h2: 'This policy does not remove your statutory rights',
        ps: [
          'If the law in your country gives you a right of withdrawal, cancellation or refund — for example Mexico’s consumer protection law or EU and UK consumer rules — that right prevails over this policy and you can exercise it by writing to us.',
          'We also do not limit what is due when the service was not provided, was charged without your authorisation, or where there was an error on our side.',
        ],
      },
      {
        h2: 'Plan changes',
        ps: [
          'You can upgrade or downgrade at any time from My company. On an upgrade, the prorated difference for the rest of the month is charged today; on a downgrade, the credit is applied to your next charges. Dodo calculates the exact amount and shows it to you before you confirm.',
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

/* ------------------------------------------------------------------ */
/*  Contrato de encargo de tratamiento de datos (21 sep 2026)           */
/* ------------------------------------------------------------------ */

/*
 * POR QUÉ EXISTE: cada negocio mete a PAWWER los datos de SUS prospectos y
 * clientes. Frente a ellos, el negocio es el responsable y PAWWER el
 * encargado (Ley Federal de Protección de Datos Personales en Posesión de
 * los Particulares). Un negocio serio —un despacho, una clínica— pide este
 * documento antes de cargar su cartera, y con razón.
 *
 * Lo que dice aquí es lo que el producto hace HOY: aislamiento por negocio,
 * segundo factor obligatorio, equipos autorizados, bitácora de accesos. Si
 * algo de eso cambia, cambia este texto.
 */
export const REVISION_TRATAMIENTO = { es: '21 de septiembre de 2026', en: 'September 21, 2026' };

export const tratamiento: Record<'es' | 'en', Documento> = {
  es: {
    back: '← Volver a PAWWER',
    label: 'Encargo de datos',
    h1: 'Tus contactos, cuidados como si fueran nuestros.',
    lead: `Contrato de encargo de tratamiento de datos personales entre tu negocio y ${EMPRESA}. Vigente desde el ${REVISION_TRATAMIENTO.es}.`,
    blocks: [
      {
        h2: 'Quién es quién',
        ps: [
          <>Cuando cargas a PAWWER los datos de tus prospectos y clientes —o llegan por los canales que conectas—, <strong>tu negocio es el responsable</strong> de esos datos y <strong>{EMPRESA} es el encargado</strong>: los trata por tu cuenta, siguiendo tus instrucciones y solo para prestarte el servicio, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares y su normativa.</>,
          <>Este contrato forma parte de los <a href="/terminos">términos y condiciones</a> y lo aceptas al crear tu cuenta. Los datos de tu propia cuenta —tu nombre, tu correo, tu plan— los trata PAWWER como responsable, según el <a href="/privacidad">aviso de privacidad</a>.</>,
        ],
      },
      {
        h2: 'Qué datos y para qué',
        ps: [
          'Los datos de tus contactos que entran a PAWWER: nombre, teléfono, correo, ubicación aproximada, respuestas de formularios, mensajes y conversaciones de tus canales, notas de tu equipo, citas, visitas, cotizaciones, contratos y los archivos que subas.',
          'Los tratamos para: recibir y contestar los mensajes de tus canales conectados, organizarlos en tu CRM, agendar citas, preparar cotizaciones y contratos, medir tus resultados y —solo si tú lo enciendes— que el asistente de inteligencia artificial conteste y califique a tus prospectos.',
          'PAWWER no usa los datos de tus contactos para fines propios: no los vende, no los comparte para publicidad, no los usa para escribirles por su cuenta ni para entrenar modelos de inteligencia artificial.',
        ],
      },
      {
        h2: 'Tus instrucciones',
        ps: [
          'Tú decides qué canales conectas, qué contactos cargas, qué automatizaciones enciendes y quién de tu equipo ve qué. Esas decisiones, hechas desde la aplicación, son tus instrucciones.',
          'Si una instrucción nos parece contraria a la ley, te lo decimos antes de seguirla. Tú respondes de tener el consentimiento o la base legal para tratar los datos de tus contactos y para escribirles por cada canal.',
        ],
      },
      {
        h2: 'Confidencialidad y quién puede entrar',
        ps: [
          'Solo el personal de PAWWER que opera el servicio puede entrar a una cuenta, y lo hace para dar soporte, corregir fallas o cumplir la ley. El personal de servicio a clientes entra únicamente mientras atiende un ticket tuyo que tú verificaste con un código.',
          'Toda persona de PAWWER con acceso está obligada a guardar confidencialidad, también después de dejar de trabajar con nosotros. Cada entrada a tu cuenta queda registrada, y la puedes consultar en «Quién ha visto tus datos».',
        ],
      },
      {
        h2: 'Cómo los protegemos',
        ps: [
          'Verificación en dos pasos obligatoria para cada persona; solo entran los equipos que la cuenta autorizó; cada negocio está aislado de los demás en la base de datos, de modo que ninguna cuenta puede leer los datos de otra; los archivos viven en almacenamiento privado y se comparten con enlaces que caducan; la conexión va cifrada y los datos se guardan cifrados por nuestro proveedor de base de datos.',
          'Revisamos estas medidas cuando cambia el producto o aparece un riesgo nuevo. Ninguna medida es infalible: por eso existe la sección de vulneraciones, más abajo.',
        ],
      },
      {
        h2: 'Proveedores que tratan datos por nosotros (subencargados)',
        ps: [
          'Supabase — base de datos, inicio de sesión y archivos (Estados Unidos).',
          'Vercel — alojamiento de la aplicación (Estados Unidos).',
          'Anthropic — el modelo de inteligencia artificial que redacta las respuestas del asistente y lee las imágenes de inspiración, solo cuando usas esas funciones (Estados Unidos). Conforme a sus términos comerciales, no usa lo que le mandamos para entrenar sus modelos.',
          'Zernio — el puente con WhatsApp, Instagram, Messenger y las demás redes que conectes: los mensajes de esos canales pasan por su servicio.',
          'Kie.ai — la generación de imágenes con IA: recibe la instrucción del diseño y las fotos que tú eliges, no los datos de tus contactos.',
          'Resend — los correos del sistema, como autorizar un equipo nuevo; se mandan a las personas de tu equipo, no a tus contactos (Estados Unidos).',
          'OpenFreeMap — los mosaicos del mapa; no recibe datos de tus contactos.',
          'Dodo Payments — cobra tu suscripción como revendedor autorizado; no recibe datos de tus contactos.',
          'Las plataformas que conectas (Meta, WhatsApp, Google, TikTok y otras) no son subencargados de PAWWER: son servicios tuyos, con sus propios términos y su propia responsabilidad sobre lo que tratan.',
          <>Si agregamos o cambiamos un subencargado, lo publicamos en esta página con su fecha al menos 15 días antes de que empiece a tratar datos. Si tienes una objeción razonable, escríbenos a <Correo asunto="Subencargados" />: lo resolvemos contigo o puedes cancelar sin penalización.</>,
        ],
      },
      {
        h2: 'Transferencias fuera de México',
        ps: [
          'Varios subencargados están fuera de México, principalmente en Estados Unidos. Esas transferencias son necesarias para prestarte el servicio que contratas, y a cada proveedor le exigimos por contrato un nivel de protección equivalente al de este documento.',
        ],
      },
      {
        h2: 'Derechos de tus contactos',
        ps: [
          'Si alguno de tus contactos ejerce sus derechos de acceso, rectificación, cancelación u oposición, o revoca su consentimiento, eres tú quien le responde. Desde PAWWER puedes consultar, corregir, exportar y eliminar sus datos.',
          <>Si la solicitud nos llega a nosotros, te la pasamos sin contestarla por nuestra cuenta. Y si necesitas ayuda para atenderla, escríbenos a <Correo asunto="Derechos ARCO" />: respondemos dentro de 20 días hábiles.</>,
        ],
      },
      {
        h2: 'Si algo falla: vulneraciones de seguridad',
        ps: [
          'Si confirmamos una vulneración que afecte los datos de tus contactos, te avisamos sin demora y a más tardar 72 horas después de confirmarla: qué pasó, qué datos se afectaron, qué hicimos y qué te recomendamos. Así puedes avisar a tus contactos cuando la ley te lo pida.',
          'Documentamos cada incidente y lo que cambiamos para que no se repita.',
        ],
      },
      {
        h2: 'Cuánto tiempo los guardamos',
        ps: [
          'Mientras tu cuenta esté activa. Si la cierras, los datos de tus contactos se eliminan dentro de los 90 días siguientes, salvo lo que la ley obligue a conservar. Antes de cerrarla puedes exportarlos desde la aplicación.',
          'Si nos pides borrar algo antes, lo hacemos, salvo que la ley nos obligue a conservarlo.',
        ],
      },
      {
        h2: 'Revisiones y rendición de cuentas',
        ps: [
          <>Te damos la información razonable que necesites para comprobar que cumplimos este contrato: una vez al año, o cuando lo pida una autoridad, sin afectar la operación ni la confidencialidad de otros negocios. Escríbenos a <Correo asunto="Revisión de tratamiento de datos" />.</>,
        ],
      },
      {
        h2: 'Vigencia',
        ps: [
          'Este contrato dura lo que dure tu uso de PAWWER. Las obligaciones de confidencialidad y de borrado siguen vigentes después de que termine.',
        ],
      },
    ],
  },
  en: {
    back: '← Back to PAWWER',
    label: 'Data processing',
    h1: 'Your contacts, protected as if they were ours.',
    lead: `Data processing agreement between your business and ${EMPRESA}. In force since ${REVISION_TRATAMIENTO.en}.`,
    blocks: [
      {
        h2: 'Who is who',
        ps: [
          <>When you load your prospects’ and customers’ data into PAWWER —or it arrives through the channels you connect—, <strong>your business is the controller</strong> of that data and <strong>{EMPRESA} is the processor</strong>: it handles the data on your behalf, following your instructions and only to provide the service, under Mexico’s Federal Law on the Protection of Personal Data Held by Private Parties and its regulations.</>,
          <>This agreement is part of the <a href="/en/terms">terms and conditions</a> and you accept it when you create your account. The data of your own account —your name, your email, your plan— is handled by PAWWER as controller, as described in the <a href="/en/privacy">privacy policy</a>.</>,
        ],
      },
      {
        h2: 'Which data and what for',
        ps: [
          'The data of your contacts that enters PAWWER: name, phone, email, approximate location, form answers, messages and conversations from your channels, your team’s notes, appointments, visits, quotes, contracts and the files you upload.',
          'We process it to: receive and reply to messages from your connected channels, organize them in your CRM, schedule appointments, prepare quotes and contracts, measure your results and —only if you turn it on— let the AI assistant reply to and qualify your prospects.',
          'PAWWER does not use your contacts’ data for its own purposes: it does not sell it, does not share it for advertising, does not use it to write to them on its own and does not use it to train artificial intelligence models.',
        ],
      },
      {
        h2: 'Your instructions',
        ps: [
          'You decide which channels you connect, which contacts you load, which automations you turn on and who on your team sees what. Those decisions, made in the application, are your instructions.',
          'If an instruction seems unlawful to us, we tell you before following it. You are responsible for having the consent or legal basis to process your contacts’ data and to write to them on each channel.',
        ],
      },
      {
        h2: 'Confidentiality and who can get in',
        ps: [
          'Only the PAWWER staff who operate the service can enter an account, and they do so to give support, fix failures or comply with the law. Customer service staff enter only while handling a ticket of yours that you verified with a code.',
          'Everyone at PAWWER with access is bound by confidentiality, also after they stop working with us. Every entry into your account is logged, and you can check it in “Who has seen your data”.',
        ],
      },
      {
        h2: 'How we protect it',
        ps: [
          'Mandatory two-step verification for every person; only the devices the account authorized can get in; each business is isolated from the others in the database, so no account can read another’s data; files live in private storage and are shared through links that expire; connections are encrypted and the data is stored encrypted by our database provider.',
          'We review these measures when the product changes or a new risk appears. No measure is infallible: that is why the security breach section below exists.',
        ],
      },
      {
        h2: 'Providers that process data for us (sub-processors)',
        ps: [
          'Supabase — database, sign-in and files (United States).',
          'Vercel — application hosting (United States).',
          'Anthropic — the artificial intelligence model that drafts the assistant’s replies and reads inspiration images, only when you use those features (United States). Under its commercial terms, it does not use what we send it to train its models.',
          'Zernio — the bridge with WhatsApp, Instagram, Messenger and the other networks you connect: messages from those channels go through its service.',
          'Kie.ai — AI image generation: it receives the design instruction and the photos you choose, not your contacts’ data.',
          'Resend — system emails, such as authorizing a new device; they go to the people on your team, not to your contacts (United States).',
          'OpenFreeMap — map tiles; it receives no data about your contacts.',
          'Dodo Payments — bills your subscription as authorized reseller; it receives no data about your contacts.',
          'The platforms you connect (Meta, WhatsApp, Google, TikTok and others) are not PAWWER sub-processors: they are your services, with their own terms and their own responsibility for what they process.',
          <>If we add or change a sub-processor, we publish it on this page with its date at least 15 days before it starts processing data. If you have a reasonable objection, write to <Correo asunto="Sub-processors" />: we work it out with you or you can cancel without penalty.</>,
        ],
      },
      {
        h2: 'Transfers outside Mexico',
        ps: [
          'Several sub-processors are outside Mexico, mainly in the United States. Those transfers are necessary to provide the service you purchase, and we contractually require each provider to offer a level of protection equivalent to this agreement.',
        ],
      },
      {
        h2: 'Your contacts’ rights',
        ps: [
          'If one of your contacts exercises their rights of access, rectification, cancellation or objection, or withdraws consent, you are the one who answers them. From PAWWER you can look up, correct, export and delete their data.',
          <>If the request reaches us, we pass it on to you without answering it on our own. And if you need help handling it, write to <Correo asunto="Data subject rights" />: we reply within 20 business days.</>,
        ],
      },
      {
        h2: 'If something fails: security breaches',
        ps: [
          'If we confirm a breach affecting your contacts’ data, we notify you without delay and no later than 72 hours after confirming it: what happened, which data was affected, what we did and what we recommend. That way you can notify your contacts when the law requires it.',
          'We document every incident and what we changed so it does not happen again.',
        ],
      },
      {
        h2: 'How long we keep it',
        ps: [
          'While your account is active. If you close it, your contacts’ data is deleted within the following 90 days, except what the law requires us to keep. Before closing it you can export it from the application.',
          'If you ask us to delete something sooner, we do it, unless the law requires us to keep it.',
        ],
      },
      {
        h2: 'Reviews and accountability',
        ps: [
          <>We give you the reasonable information you need to verify that we comply with this agreement: once a year, or when an authority requires it, without affecting operations or the confidentiality of other businesses. Write to <Correo asunto="Data processing review" />.</>,
        ],
      },
      {
        h2: 'Term',
        ps: [
          'This agreement lasts as long as you use PAWWER. The confidentiality and deletion obligations remain in force after it ends.',
        ],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  Términos del programa beta (21 sep 2026)                            */
/* ------------------------------------------------------------------ */

/*
 * La beta: un código abre la cuenta SIN tarjeta por 15 días, con todo lo
 * de Escala y los créditos de IA a cuenta de PAWWER (decisión de la
 * persona dueña). Al terminar se elige plan y se paga en Dodo. Lo que dice
 * aquí es lo que hace `canjear_codigo_beta()` en el CRM (migración 65).
 */
export const REVISION_BETA = { es: '21 de septiembre de 2026', en: 'September 21, 2026' };

export const programaBeta: Record<'es' | 'en', Documento> = {
  es: {
    back: '← Volver a PAWWER',
    label: 'Programa beta',
    h1: 'Entra antes que nadie, sin tarjeta.',
    lead: `Términos del programa beta de PAWWER. Vigentes desde el ${REVISION_BETA.es}.`,
    blocks: [
      {
        h2: 'Qué es la beta',
        ps: [
          <>Es acceso anticipado a PAWWER para negocios invitados. Entras con un código de beta que te da {EMPRESA} y lo escribes en la pantalla de planes de <Crm />, en «¿Tienes un código de beta?».</>,
          'Cada negocio puede activar la beta una sola vez. El código es para quien lo recibió: no se vende ni se cambia por dinero.',
        ],
      },
      {
        h2: 'Qué incluye',
        ps: [
          <><strong>Sin tarjeta</strong> y sin ningún cargo, por los días que diga tu código —normalmente 15, contados desde que lo activas—, con las herramientas del plan que incluye tu código, normalmente Escala.</>,
          'Los créditos de inteligencia artificial de la beta los paga PAWWER: tienes los del plan Escala, con los mismos límites de uso que cualquier cuenta. Las funciones que se venden aparte aparecen solo si tu código las incluye.',
        ],
      },
      {
        h2: 'Cuando termina',
        ps: [
          'Dentro de la aplicación ves cuántos días te quedan y qué día termina. Para seguir usando PAWWER después, eliges tu plan y lo pagas con tarjeta en el checkout de Dodo Payments. La beta cuenta como tu prueba: el cobro empieza el día que activas tu plan, también si lo activas antes de que la beta termine.',
          <><strong>No hay cobro automático al terminar la beta</strong>: como no registraste tarjeta, nada se cobra si no eliges un plan. Tu cuenta queda en pausa y tus contactos, conversaciones y ajustes se conservan para cuando elijas uno. Si no lo eliges en 90 días podemos cerrarla, y sus datos se borran en los plazos del <a href="/privacidad">aviso de privacidad</a>; si prefieres que la cerremos antes, escríbenos a <Correo asunto="Cerrar mi cuenta" />.</>,
        ],
      },
      {
        h2: 'Es una beta',
        ps: [
          'Algunas funciones pueden cambiar, tardar o fallar mientras las afinamos. Lo que todavía no está conectado lo decimos en pantalla en vez de simularlo. Durante la beta no ofrecemos un nivel de servicio garantizado.',
          'Puede que te pidamos tu opinión. Si nos compartes ideas o comentarios, podemos usarlos para mejorar PAWWER sin que eso nos obligue a nada contigo.',
        ],
      },
      {
        h2: 'Cambios y cierre de la beta',
        ps: [
          'Podemos revocar códigos que no se hayan usado, cambiar lo que incluye la beta para quienes todavía no la activan, o terminarla antes con un aviso razonable. Si terminamos tu beta antes de tiempo, te avisamos y conservas tus datos.',
        ],
      },
      {
        h2: 'Todo lo demás',
        ps: [
          <>Durante la beta aplican los <a href="/terminos">términos y condiciones</a>, el <a href="/privacidad">aviso de privacidad</a> y el <a href="/tratamiento-de-datos">contrato de encargo de tratamiento de datos</a>. Si algo de este documento choca con ellos, para la beta manda este documento. Dudas: <Correo asunto="Beta de PAWWER" />.</>,
        ],
      },
    ],
  },
  en: {
    back: '← Back to PAWWER',
    label: 'Beta program',
    h1: 'Get in before anyone else, no card needed.',
    lead: `PAWWER beta program terms. In force since ${REVISION_BETA.en}.`,
    blocks: [
      {
        h2: 'What the beta is',
        ps: [
          <>It is early access to PAWWER for invited businesses. You get in with a beta code that {EMPRESA} gives you, and you type it on the plans screen at <Crm />, under “Do you have a beta code?”.</>,
          'Each business can activate the beta only once. The code is for whoever received it: it cannot be sold or exchanged for money.',
        ],
      },
      {
        h2: 'What it includes',
        ps: [
          <><strong>No card</strong> and no charge at all, for the days your code states —usually 15, counted from when you activate it—, with the tools of the plan your code includes, usually Scale.</>,
          'The beta’s artificial intelligence credits are paid by PAWWER: you get the Scale plan’s credits, with the same usage limits as any account. Features sold separately appear only if your code includes them.',
        ],
      },
      {
        h2: 'When it ends',
        ps: [
          'Inside the application you see how many days you have left and the day it ends. To keep using PAWWER afterwards, you choose your plan and pay for it by card in the Dodo Payments checkout. The beta counts as your trial: billing starts the day you activate your plan, also if you activate it before the beta ends.',
          <><strong>There is no automatic charge when the beta ends</strong>: since you did not register a card, nothing is charged if you do not choose a plan. Your account is paused and your contacts, conversations and settings are kept for when you choose one. If you do not choose one within 90 days we may close it, and its data is deleted within the periods of the <a href="/en/privacy">privacy policy</a>; if you would rather have us close it sooner, write to <Correo asunto="Close my account" />.</>,
        ],
      },
      {
        h2: 'It is a beta',
        ps: [
          'Some features may change, be slow or fail while we fine-tune them. What is not connected yet we say on screen instead of faking it. During the beta we do not offer a guaranteed service level.',
          'We may ask for your opinion. If you share ideas or feedback, we may use them to improve PAWWER without that creating any obligation to you.',
        ],
      },
      {
        h2: 'Changes and end of the beta',
        ps: [
          'We may revoke codes that have not been used, change what the beta includes for those who have not activated it yet, or end it early with reasonable notice. If we end your beta early, we let you know and you keep your data.',
        ],
      },
      {
        h2: 'Everything else',
        ps: [
          <>During the beta, the <a href="/en/terms">terms and conditions</a>, the <a href="/en/privacy">privacy policy</a> and the <a href="/en/data-processing">data processing agreement</a> apply. If anything in this document conflicts with them, this document governs for the beta. Questions: <Correo asunto="PAWWER beta" />.</>,
        ],
      },
    ],
  },
};
