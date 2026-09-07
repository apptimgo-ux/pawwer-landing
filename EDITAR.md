# Editar la landing de PAWWER

La forma normal de editar es el **panel visual**:
**https://www.pawwerapp.com/admin** → *Login with GitHub*.

Cada "Publish" hace *commit* al repo y Vercel republica solo en 1–2 min.
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
