import type { MetadataRoute } from 'next';
import { SITE_URL } from './seo';

/**
 * ⚠️ La landing NO tenia `robots.txt`. Sin el, un buscador rastrea lo
 * que encuentra — incluida `/editor-preview`, que es la vista previa del
 * editor de contenido y no es una pagina del sitio.
 *
 * ⚠️ Los rastreadores de los modelos de lenguaje se dejan ENTRAR a
 * proposito (GPTBot, ClaudeBot, PerplexityBot y los demas no aparecen
 * bloqueados aqui, asi que el `*` los cubre). Hoy una parte de la gente
 * no busca el producto en Google: se lo pregunta a un modelo, y lo que
 * el modelo conteste sale de lo que pudo leer. Bloquearlos es
 * desaparecer de esa conversacion.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/editor-preview', '/api/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
