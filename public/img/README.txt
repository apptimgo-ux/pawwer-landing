Carpeta de imágenes del sitio.

Sube aquí tus archivos (jpg, png, webp, svg) y luego escribe la ruta en
app/site-content.ts, en el objeto `media`. Ejemplos:

  media.heroImage    = '/img/hero.jpg'      -> franja bajo el titular del hero
  media.showcaseImage = '/img/producto.png' -> reemplaza la maqueta dibujada
  media.ogImage      = '/img/compartir.jpg' -> imagen al compartir en redes

La ruta SIEMPRE empieza con /img/ (sin "public"). Deja '' para no mostrar.

Tamaños sugeridos:
  hero      2400 x 1200 px
  showcase  1600 x 1100 px
  og        1200 x 630 px
