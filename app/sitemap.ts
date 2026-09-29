import type { MetadataRoute } from 'next';
import { RUTAS, SITE_URL } from './seo';

/**
 * El sitemap, con las dos versiones de cada pagina.
 *
 * ⚠️ Cada entrada lleva sus `alternates.languages`, que es lo que le dice
 * a Google que `/planes/escala` y `/en/plans/escala` son LA MISMA pagina
 * en dos idiomas y no contenido duplicado. Sin eso, las dos compiten
 * entre si y gana la que el buscador decida — muchas veces la que no es.
 *
 * ⚠️ `lastModified` sale de la fecha del build, no de una fecha escrita
 * a mano: una fecha fija que nunca cambia le ensena al rastreador que la
 * pagina esta muerta, y una inventada mas reciente que el contenido
 * hace que deje de creerle al resto del sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  const abs = (ruta: string) => `${SITE_URL}${ruta === '/' ? '' : ruta}`;

  return RUTAS.flatMap(({ es, en, prioridad }) => {
    const languages = { 'es-MX': abs(es), en: abs(en), 'x-default': abs(es) };
    const cambio = prioridad >= 0.8 ? ('weekly' as const) : ('monthly' as const);
    return [
      { url: abs(es), lastModified: ahora, changeFrequency: cambio, priority: prioridad, alternates: { languages } },
      { url: abs(en), lastModified: ahora, changeFrequency: cambio, priority: prioridad, alternates: { languages } },
    ];
  });
}
