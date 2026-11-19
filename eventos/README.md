# Grupo Saneri · Eventos

Sitio web del servicio de eventos de Grupo Saneri S. de R.L. Se publica en **https://gruposaneri.com/eventos/** (igual que /klivo/).

## Páginas
- `index.html` — Inicio: tipos de evento, servicios, proceso, paquetes, FAQ y cotización rápida.
- `organizacion.html` — Organización integral, coordinación del día, decoración, eventos sociales/empresariales/académicos.
- `alquiler.html` — Catálogo de mobiliario y equipo con buscador, filtros y botón "Agregar" a la cotización.
- `paquetes.html` — Paquetes (infantil, completo, social, corporativo, académico). "Cotizar este paquete" carga la lista sugerida.
- `cotizar.html` — Cotizador en 4 pasos; envía por WhatsApp (+504 9341-4288) o correo, e imprime/guarda PDF.
- `nosotros.html`, `contacto.html` — Misión, visión, valores, contacto, condiciones de alquiler y preguntas frecuentes.

## Editar el catálogo
Todo el catálogo, paquetes y tipos de evento están en `js/data.js` (listas `CATALOGO`, `PAQUETES`, `TIPOS_EVENTO`).
Agrega o quita artículos copiando una línea existente; el `icon` debe ser uno de los nombres de `ICONS`.

## Pendiente antes de publicar
- Revisar condiciones de alquiler (contacto.html) y cantidades de los paquetes.
- Las fotos son de Unsplash (licencia libre, se cargan desde images.unsplash.com). Cuando tengas fotos propias de tus eventos, súbelas a `eventos/assets/img/` y cambia el `img` en `js/data.js` (ej. `img:'assets/img/sillas.jpg'`) o las claves en las páginas.
- Ya enlazado desde el `robots.txt` principal. Envía `https://gruposaneri.com/eventos/sitemap.xml` en Google Search Console y Bing Webmaster Tools.

## Medición
- GTM `GTM-5B3HBLJW`, GA4 `G-NS99JL93ZV` y Microsoft Clarity `zfvhgxj5mr` en el `<head>` de todas las páginas.
- Eventos enviados a GA4, al dataLayer (prefijo `saneri_`) y a Clarity: `generate_lead` (method whatsapp/email), `click_whatsapp`, `click_call`, `click_email`, `cta_cotizar`, `quick_quote_submit`, `quote_step`, `add_to_quote`, `select_package`, `filter_category`, `search`, `faq_open`, `print_quote`.
- En GA4 marca `generate_lead` y `click_whatsapp` como eventos clave (conversiones).
- Si el contenedor de GTM también dispara GA4 con el mismo ID, elimina una de las dos instalaciones para no duplicar páginas vistas.

## SEO / GEO / AEO
- Schema.org en @graph (Organization, EventPlanner/LocalBusiness, WebSite, WebPage, BreadcrumbList) + FAQPage e ItemList por página.
- `llms.txt` con el resumen del negocio para buscadores con IA.
- Sitemap con imágenes y hreflang es-HN.
