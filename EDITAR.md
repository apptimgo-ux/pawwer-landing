# Editar la landing de PAWWER

La forma normal de editar es el **panel visual**:
**https://www.pawwerapp.com/admin** → *Login with GitHub*.

El panel muestra ahora el diseño real en la columna de **vista previa**.
Puedes alternar **Computadora**, **Tableta** y **Celular**. Los cambios se
ven mientras editas, incluidas imágenes y videos recién seleccionados.
Si la columna está cerrada, activa la vista previa desde la barra del editor.

**Guardar borrador** conserva tu trabajo sin cambiar la web pública.
Cuando esté listo, pasa el borrador a **Listo / Ready** y selecciona
**Publicar / Publish**. Esto actualiza `main` y Vercel vuelve a desplegar;
el cambio público aparece cuando termina ese despliegue.
Los borradores usan ramas/PR de GitHub y pueden producir despliegues de
vista previa según tu configuración de Vercel; no son secretos ni un almacén
para datos privados. Este repositorio es público.

La vista previa se actualiza solo con el documento abierto. Por ejemplo,
editar Español no modifica Inglés y usa los ajustes generales ya publicados.
También puedes editar los archivos a mano desde GitHub (botón lápiz); el
panel y los archivos son lo mismo.

---

## El panel por dentro

Tres secciones:

### Ajustes generales — `content/settings.json`
Correo, teléfono y dirección · **precios** de los 3 planes (con símbolo, ej.
`$99`) · enlaces de pago Stripe / Mercado Pago · imagen para compartir en
redes · fecha de la política de privacidad.

### Contenido · Español / Contenido · English — `content/es.json` / `content/en.json`
Cada uno tiene:
- **SEO**, **Menú**, **Pie**, **Planes**, **Tabla comparativa**, **Páginas
  de cada plan** (arriba, plegados).
- **Bloques de la página** — la lista que arma la portada. Arrastra para
  reordenar, botón `+` para añadir, papelera para quitar. Tipos:

  | Bloque | Para qué |
  |---|---|
  | Hero (portada) | Titular + botones + **imagen o video** opcional |
  | Frase destacada | Una frase grande con etiqueta |
  | Proceso (fases) | Lista numerada de fases |
  | Características (3 columnas) | Icono + título + texto ×3 |
  | Vista del producto | Screenshot real o la maqueta dibujada |
  | Beneficios (3 columnas) | Igual que Características |
  | Logos / Confían en nosotros | Fila de logos (vacío = no se muestra) |
  | Paquetes / precios | Las 3 tarjetas + tabla comparativa |
  | PAWWER Agencia | Bloque de agencia |
  | Letra chica de precios | Notas legales de precios |
  | Llamado final + contacto | CTA final + correo/teléfono/dirección |

  Edita el **mismo orden y textos en Español y en English** para que las dos
  versiones coincidan.

---

## Imágenes y video

Dentro de un bloque, los campos de imagen tienen botón para **subir archivo**
(va a `public/img/`). El Hero acepta imagen **o** video: pon *Medio* en
`image` o `video` y sube el archivo correspondiente (para video, un `.mp4`
+ una imagen de portada).

En **Hero**, elige **¿Dónde aparece? → De fondo, detrás del texto** para
superponer el título. Ajusta **Encuadre horizontal/vertical**, **Oscurecer
fondo**, **Altura**, **Ajuste** y **Color del texto** mirando la vista previa.
La opción **Debajo del texto** conserva el diseño anterior. En **Vista del
producto**, una imagen reemplaza la maqueta; en **Logos** puedes añadir y
reordenar imágenes. Los bloques también se pueden añadir y reordenar desde
su lista. Es edición por bloques con vista previa, no arrastre libre de
elementos sobre el lienzo.

Revisa ambos tamaños antes de publicar. Los enlaces de contacto/pago están
desactivados dentro de la vista previa para que no salgas de ella por error.
El video respeta la preferencia de movimiento reducido y tiene botón de pausa.
Usa MP4 comprimido (idealmente menos de 20 MB); GitHub no admite archivos de
más de 100 MB. El editor puede fallar antes por límites del navegador.

Si una vista queda incompleta al añadir un bloque, termina sus campos
obligatorios. No necesitas publicar para ver imágenes seleccionadas: se
resuelven temporalmente en tu navegador. El borrador no se envía a la ruta de
vista previa por una API ni se guarda en el almacenamiento del navegador.

---

## Ajustes que se tocan en el código (no en el panel)

- **Colores** — `app/globals.css`, bloque `:root`. Paleta del sistema PAWWER
  (coral `#FF5A3C`). Cambia un valor y se actualiza todo.
- **Tipografía** — `app/layout.tsx` → `Space_Grotesk`.
- **Logo** — la huella es `PawPrint` de lucide en `app/site-ui.tsx`. Para un
  logo en imagen, cámbialo por `<img src="/img/logo.svg" alt="PAWWER" />`.
- **Idioma automático** — `middleware.ts`: manda a `/en` a quien entra desde
  un país que no es de habla hispana; el selector ES/EN se recuerda y manda
  por encima. Lista de países en `SPANISH_COUNTRIES`.

---

## Configurar el panel (una sola vez)

1. **GitHub → https://github.com/settings/applications/new** (nueva OAuth App):
   - Application name: `PAWWER Editor`
   - Homepage URL: `https://www.pawwerapp.com`
   - Authorization callback URL: `https://www.pawwerapp.com/api/oauth/callback`
   - Desmarca *Expire user access tokens*.
   - Register → copia el **Client ID** → *Generate a new client secret*.
2. **Vercel → proyecto `pawwer-landing` → Settings → Environment Variables**:
   - `OAUTH_CLIENT_ID` = el Client ID
   - `OAUTH_CLIENT_SECRET` = el Client Secret
   - Redeploy.

Si cambia el dominio, actualiza esas dos URLs en la OAuth App y
`base_url` / `site_url` en `public/admin/config.yml`.
