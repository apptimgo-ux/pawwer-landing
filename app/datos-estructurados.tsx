/**
 * El JSON-LD de una pagina.
 *
 * ⚠️ Va con `dangerouslySetInnerHTML` porque es la unica forma de meter
 * un `<script type="application/ld+json">` en React sin que escape las
 * comillas del JSON — y un JSON-LD con `&quot;` dentro no lo lee nadie.
 * No es texto de nadie de fuera: se arma en `app/seo.ts` a partir del
 * contenido del propio sitio.
 *
 * `</` se parte a proposito: un texto que trajera `</script>` cerraria
 * la etiqueta antes de tiempo y el resto del JSON quedaria suelto en el
 * HTML. Hoy ningun texto lo trae, pero el contenido lo edita gente
 * desde el editor y esto no puede depender de que nadie escriba eso.
 */
export default function DatosEstructurados({ grafo }: { grafo: unknown }) {
  const json = JSON.stringify(grafo).replace(/<\//g, '<\\/');
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
