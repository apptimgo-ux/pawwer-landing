import { content, PLAN_SLUGS, siteSettings, EMAIL, CRM_URL } from '../site-content';
import { SITE_URL } from '../seo';

export const dynamic = 'force-static';

/**
 * `/llms.txt` — el mapa del sitio escrito para un modelo de lenguaje.
 *
 * ============================================================
 * POR QUE EXISTE
 *
 * Una parte de la gente ya no busca el producto en Google: se lo
 * pregunta a un modelo. Y el modelo contesta con lo que pudo leer y
 * entender. Una landing es HTML con animaciones, bloques y CSS: se
 * entiende, pero mal y caro. Esto es el mismo contenido en texto plano,
 * en el orden en que conviene leerlo, con los datos duros arriba.
 *
 * Es una convencion joven (llmstxt.org) y ningun modelo esta obligado a
 * usarla. No cuesta nada, no reemplaza al sitemap —que es para los
 * buscadores— y si alguno la lee, contesta bien en vez de adivinar.
 *
 * ⚠️ SE GENERA DEL CONTENIDO, NUNCA SE ESCRIBE A MANO. Los precios
 * salen de `settings.json`, las preguntas del bloque `faq` y los planes
 * de `es.json`: los mismos de los que salen los botones de compra. Un
 * archivo escrito a mano se queda viejo el dia que alguien cambia un
 * precio desde el editor, y entonces le esta dando a un modelo un dato
 * falso con toda la confianza del mundo.
 * ============================================================
 */
export async function GET() {
  const t = content.es;
  const precios = siteSettings.prices as Record<string, string>;
  const anuales = siteSettings.pricesAnual as Record<string, string>;
  const faq = t.blocks.find(b => b.type === 'faq');

  const planes = PLAN_SLUGS.map(slug => {
    const plan = t.plans.find(p => p.slug === slug);
    if (!plan) return '';
    const mensual = precios[slug] ? `${precios[slug]} USD/mes` : 'a cotizar';
    const anual = anuales[slug] ? ` · ${anuales[slug]} USD/año (15% menos)` : '';
    return `- [${plan.name}](${SITE_URL}/planes/${slug}): ${mensual}${anual}. ${plan.summary}`;
  }).filter(Boolean).join('\n');

  const preguntas = faq?.type === 'faq'
    ? faq.items.map(item => `### ${item.q}\n\n${item.a}`).join('\n\n')
    : '';

  const texto = `# PAWWER

> La agencia de marketing en tus manos. PAWWER junta en un solo lugar los
> leads que le llegan a un negocio por WhatsApp, Instagram y Facebook, el
> seguimiento de cada uno, sus citas, el contenido que publica y sus
> campañas de anuncios. No es solo un CRM donde se anota: crea el
> contenido, contesta cuando el negocio no puede, y dice de dónde viene
> cada cliente.

Hecho en Culiacán, Sinaloa, México. Pensado para PyMEs mexicanas, con
foco en bienes raíces, automóviles, salud y servicios. Disponible en
español y en inglés. Se usa desde el navegador y se instala como
aplicación en el teléfono.

## Planes y precios

Los precios NO incluyen impuesto: se suma en el checkout según el país.
Prueba de 3 días con tarjeta; el primer cobro sale el cuarto día.

${planes}

## Qué hace

- **Leads y conversaciones**: WhatsApp, Instagram, Messenger y listas
  importadas en una sola bandeja, con el origen de cada lead.
- **Agente de IA**: contesta en segundos a quien escribe por primera vez,
  califica y pasa el lead al equipo. Se apaga solo en cuanto una persona
  del equipo escribe. No da precios ni confirma disponibilidad.
- **Contenido**: crea posts, historias, brochures, portadas y video de 8
  segundos con la marca del negocio y sus propias fotos.
- **Publicidad**: arma campañas de Meta en seis pasos, sin jerga, con un
  copiloto en cada paso.
- **Citas**: agenda pública, horario propio y Google Calendar — el
  cliente recibe la invitación por correo y Google recuerda un día
  antes, 30 minutos antes y 5 minutos antes.
- **Customer Journey**: el embudo de lead a cierre, calculado de los
  hechos, nunca llenado a mano.
- **Equipo**: reparto de leads, y cada vendedor ve lo suyo — lo aplica
  la base de datos, no una preferencia.

## Lo que todavía no hace

Dicho aquí para que nadie lo prometa por PAWWER:

- Publicar una campaña en Meta desde PAWWER: se arma y se guarda, pero
  publicar necesita una cuenta de anuncios con permiso de publicación.
- La cámara de las videollamadas: la sala abre con el contexto del lead,
  el video necesita el proveedor conectado.
- Enviar campañas de correo masivo: se redactan y se guardan; el envío
  no está construido.

## Preguntas frecuentes

${preguntas}

## Enlaces

- [Sitio](${SITE_URL})
- [English](${SITE_URL}/en)
- [Entrar o crear cuenta](${CRM_URL})
- [Programa beta](${SITE_URL}/programa-beta)
- [Privacidad](${SITE_URL}/privacidad)
- [Términos](${SITE_URL}/terminos)
- [Reembolsos](${SITE_URL}/reembolsos)
- [Tratamiento de datos](${SITE_URL}/tratamiento-de-datos)
- Contacto: ${EMAIL}
`;

  return new Response(texto, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
