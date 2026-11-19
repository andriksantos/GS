# Grupo Saneri · Marketing

Sitio del servicio de marketing de Grupo Saneri S. de R.L. Se publica en **https://gruposaneri.com/marketing/** (igual que /eventos/ y /klivo/).

## Páginas
- `index.html` — Inicio: propuesta rápida, áreas de servicio, método, planes, rubros y FAQ.
- `servicios.html` — Catálogo de 31 servicios en 8 áreas con buscador, filtros y botón "Agregar" a la propuesta.
- `planes.html` — 6 planes (Arranque, Crecimiento, 360°, Presencia Web, Marca Nueva, Vende en Línea). "Cotizar este plan" los carga en la propuesta.
- `diagnostico.html` — Diagnóstico gratis de 10 preguntas: puntaje 0–100, áreas débiles y servicios recomendados.
- `cotizar.html` — Propuesta en 4 pasos; envía por WhatsApp (+504 9341-4288) o correo y permite imprimir/guardar PDF.
- `nosotros.html`, `contacto.html` — Misión, visión, valores, cómo trabajamos y preguntas frecuentes.

## Editar contenido
Servicios, planes, rubros y preguntas del diagnóstico están en `js/data.js` (`CATALOGO`, `PAQUETES`, `TIPOS_EVENTO`, `DIAGNOSTICO`).
Fotos: Unsplash (licencia libre). Para fotos propias súbelas a `marketing/assets/img/` y cambia el `img` (ej. `img:'assets/img/logo-cliente.jpg'`).

## Medición
- GTM `GTM-5B3HBLJW`, GA4 `G-NS99JL93ZV` (content_group: marketing) y Microsoft Clarity `zfvhgxj5mr` en el `<head>` de todas las páginas.
- Eventos: `generate_lead`, `click_whatsapp`, `click_call`, `click_email`, `cta_cotizar`, `quick_quote_submit`, `quote_step`, `add_to_quote`, `select_package`, `diag_start`, `diag_complete`, `add_recommendations`, `filter_category`, `search`, `faq_open`, `print_quote`.
- En GA4 marca `generate_lead`, `click_whatsapp` y `diag_complete` como eventos clave.

## SEO / GEO / AEO
- Schema.org @graph (Organization, ProfessionalService/LocalBusiness, WebSite, WebPage, BreadcrumbList) + FAQPage e ItemList.
- `llms.txt` para buscadores con IA. Sitemap con imágenes, enlazado desde el `robots.txt` principal.

## Pendiente antes de publicar
- Revisar entregables de los planes y condiciones en "Cómo trabajamos".
- Agregar casos de éxito y testimonios reales cuando existan (no se incluyeron para no inventarlos).
