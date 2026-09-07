# Editar la landing de PAWWER

Todo el contenido visible vive en **`app/site-content.ts`**. No hace falta
tocar el diseño para cambiar textos, precios o imágenes.

Flujo: editas un archivo → *commit* → *push* a `main` → Vercel publica solo
en 1–2 minutos. Puedes editar desde GitHub en el navegador (botón lápiz en
cada archivo) sin instalar nada.

---

## Textos

`app/site-content.ts` → objeto `content`, con dos bloques: `es` (español) y
`en` (inglés). Cambia el mismo texto en los dos para mantener las versiones
al día. Dentro de cada idioma:

| Clave | Qué es |
|---|---|
| `meta` | Título y descripción para Google y redes |
| `nav` | Menú, botón de idioma, "Sign in" |
| `hero` | Titular grande, frase de apoyo, botones |
| `chapter` | Bloque "Cuando todo lo que importa está conectado" |
| `solutions.phases` | Las 5 fases (Captar…Medir): `name` + `line` |
| `solutions.items` | Los 3 pilares (icono + título + texto) |
| `solutions.mock` | Textos de la maqueta del producto |
| `benefits` | Bloque "Menos memoria. Más impulso." |
| `pricing.plans` | Los 3 planes: precio, resumen, lista de features |
| `pricing.comparison` | Tabla comparativa (`'✓'`, `'—'` o texto) |
| `pricing.agency` | Bloque PAWWER Agencia |
| `pricing.notes` | Letra chica de precios |
| `contact` | Bloque final y CTA |
| `footer` | Enlaces del pie |

Las páginas de cada plan (`/planes/esencial`, etc.) toman su texto de
`pricing.plans` + el bloque `planDetailCopy` del mismo archivo.

---

## Imágenes

1. Sube el archivo a **`public/img/`**.
2. En `app/site-content.ts`, objeto **`media`**, escribe la ruta:

```ts
export const media = {
  heroImage: '/img/hero.jpg',       // franja de imagen bajo el titular
  showcaseImage: '/img/producto.png', // screenshot real; reemplaza la maqueta
  ogImage: '/img/compartir.jpg',    // imagen al compartir en redes (1200×630)
};
```

Deja `''` para no mostrar esa imagen. La ruta empieza en `/img/`.

---

## Colores

`app/globals.css`, bloque `:root` al inicio. Es la paleta del sistema PAWWER
(coral `#FF5A3C`). Cambia un valor y se actualiza todo el sitio:

- `--accent` coral de la marca · `--accent-soft` / `--accent-border` tintes
- `--paper` fondo · `--paper-2` fondo hundido · `--surface` blanco
- `--ink` títulos · `--ink-2` texto · `--muted` texto tenue
- `--dark` bandas oscuras · `--on-dark` texto sobre oscuro

## Tipografía

`app/layout.tsx` → `Space_Grotesk` (la del CRM). Para otra fuente, cámbiala
por cualquier familia de `next/font/google`.

## Logo

La huella del logo es el icono `PawPrint` de lucide, en `app/site-ui.tsx`
(header y footer). Para usar una imagen propia, sustituye `<PawPrint … />`
por `<img src="/img/logo.svg" alt="PAWWER" />`.

---

## Precios y pago

- Montos y features: `pricing.plans` y `pricing.comparison` en `site-content.ts`.
- Cuando exista la cuenta de Stripe / Mercado Pago, pega el enlace de pago en
  **`CHECKOUT_URLS`** (mismo archivo). El botón de cada plan pasa solo de
  "Iniciar prueba" a "Continuar al pago".

## Idioma automático

`middleware.ts` manda a `/en` a quien entra desde un país que no es de habla
hispana. La elección con el selector ES/EN se recuerda y manda por encima.
Para cambiar la lista de países, edita `SPANISH_COUNTRIES` en ese archivo.

---

## Edición visual tipo WordPress (opcional, pendiente)

Si quieres un panel `/admin` con formularios y subida de imágenes que
escriba en el repo, se puede añadir **Decap CMS** o **Sveltia CMS**. Necesita
una app OAuth de GitHub. Pídelo y se configura.
