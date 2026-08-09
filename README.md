# Grupo Saneri S. de R.L. — Sitio Web Corporativo

Sitio web de **Grupo Saneri S. de R.L.**, empresa hondureña con tres líneas de negocio: organización de eventos, comercialización de productos (importación) y servicios de marketing. Incluye tienda en línea con carrito de compra, formulario de agenda de eventos y horario dinámico.

🌐 **[gruposaneri.com](https://gruposaneri.com)**

---

## Estructura del proyecto

```
GS/
├── assets/
│   ├── favicon/
│   │   ├── favicon-16.png / favicon-32.png / favicon-192.png / favicon-512.png
│   │   └── apple-touch-icon.png
│   └── images/
│       ├── logo.png / logo-white.png     # Logo oficial (transparente, color / blanco)
│       ├── icon.png / icon-white.png     # Marca (triángulo) sola, oficial
│       ├── og-image.jpg              # Imagen para redes sociales
│       └── productos/
│           └── automotriz/           # Fotos reales de producto (Topdon, Avapow, Konnwei, Goodyear)
├── favicon.ico                       # Favicon multi-tamaño (raíz, para navegadores antiguos)
├── css/
│   └── styles.css                    # Sistema de diseño (colores del logo, componentes, tienda, carrito, formularios)
├── data/
│   └── productos.json                # ★ CATÁLOGO EDITABLE — productos, servicios de evento y categorías
├── js/
│   ├── main.js                       # Navegación, animaciones, horario dinámico, formulario de contacto
│   ├── products.js                   # Carga y renderiza el catálogo (tienda, categorías, destacados)
│   ├── cart.js                       # Carrito de compra (localStorage) + checkout por WhatsApp
│   └── agenda.js                     # Formulario de agenda de eventos → WhatsApp
├── index.html                        # Inicio (landing de eventos + resumen de negocio + destacados)
├── servicios.html                    # Todos los servicios: eventos, comercial e importación, y marketing
├── productos.html                    # Categorías de producto
├── tienda.html                       # Tienda completa con filtros, buscador y carrito
├── agenda.html                       # Formulario para agendar un evento
├── nosotros.html                     # Misión, visión, valores, horario, mapa, redes
├── contacto.html                     # Formulario de contacto + mapa + horario
├── privacy.html                      # Política de privacidad
├── terms.html                        # Términos de uso
├── sitemap.xml                       # Mapa del sitio (SEO)
├── robots.txt                        # Directivas para buscadores
├── CNAME                             # Dominio personalizado (GitHub Pages)
└── README.md
```

---

## ★ Cómo agregar, editar o quitar productos y servicios

Todo el catálogo vive en **`data/productos.json`**. No requiere programar ni tocar HTML/CSS/JS:

1. Abre `data/productos.json` con cualquier editor de texto.
2. Cada producto/servicio es un objeto con: `id` (único), `grupo` (`producto` o `evento`), `categoria`, `subcategoria`, `nombre`, `descripcion`, `precio` (número en Lempiras, o `null` si aún no tienes precio fijo), `precioTexto` (solo si `precio` es `null`, ej. `"Cotización personalizada"`), `imagen` (ruta dentro de `assets/images/...` o `null`), `icono` (emoji de respaldo), `marca`, `destacado` (`true` para que aparezca en Inicio).
3. Copia un bloque existente, cámbiale el `id` y los datos, y agrégalo dentro del arreglo `"productos"` o `"eventos"`.
4. Guarda el archivo — la tienda, la página de productos y los destacados del inicio se actualizan solos.

> **Importante:** varios precios en el catálogo son de referencia y deben confirmarse/actualizarse con los precios reales del negocio antes de considerarlos definitivos (están marcados en el propio archivo).

Para agregar una imagen de producto: colócala en `assets/images/productos/<categoría>/` (formato JPG/WEBP, idealmente menor a 100 KB) y referencia esa ruta en el campo `imagen`.

---

## Cómo funciona el carrito y el checkout

El sitio **no tiene pasarela de pago ni base de datos en un servidor** (por diseño, para mantenerlo gratuito de hospedar y simple de mantener). En su lugar:

1. El cliente agrega productos/servicios al carrito (guardado en el navegador, `localStorage`).
2. Al presionar "Finalizar pedido", el sitio arma automáticamente un mensaje de WhatsApp con el detalle del pedido y el subtotal.
3. Se abre WhatsApp para que el cliente lo envíe y el equipo de Grupo Saneri coordine el pago (transferencia, link de pago BAC, tarjeta/Mipos) y la entrega.

El formulario de **Agendar evento** (`agenda.html`) funciona igual: arma un mensaje de WhatsApp con los detalles de la solicitud.

---

## Tecnologías

- **HTML5** semántico y accesible (ARIA)
- **CSS3** con Custom Properties (design tokens extraídos del logo), Grid y Flexbox
- **JavaScript** vanilla — sin frameworks ni dependencias, catálogo dirigido por JSON
- **Fuentes:** Plus Jakarta Sans + Fraunces (Google Fonts)
- **SEO/SEM:** Schema.org JSON-LD (Organization, Service), Open Graph, Twitter Cards, sitemap.xml, robots.txt
- **Hosting:** GitHub Pages con dominio personalizado

---

## Páginas

| Página | URL | Descripción |
|--------|-----|-------------|
| Inicio | `/` | Landing de eventos, resumen de las 3 líneas de negocio, destacados de tienda |
| Servicios | `/servicios.html` | Todos los servicios: eventos (sociales, empresariales, académicos), comercial e importación, y marketing digital |
| Productos | `/productos.html` | Categorías de producto (automotriz, domótica, belleza, tecnología, relojería, perfumería) |
| Tienda | `/tienda.html` | Catálogo completo con filtros, buscador y carrito |
| Agendar | `/agenda.html` | Formulario para agendar un evento |
| Nosotros | `/nosotros.html` | Misión, visión, valores, horario dinámico, mapa, redes |
| Contacto | `/contacto.html` | Formulario de contacto, horario, mapa |
| Privacidad | `/privacy.html` | Política de privacidad |
| Términos | `/terms.html` | Términos de uso |

---

## Horario de atención (dinámico)

El badge "Abierto/Cerrado ahora" se calcula en el navegador del visitante según la hora local:

- Lunes a viernes: 8:00 AM – 6:00 PM
- Sábados: 8:00 AM – 3:00 PM
- Domingos: 10:00 AM – 3:00 PM

Para cambiar el horario, edita el arreglo `GS.SCHEDULE` en `js/main.js`.

---

## Contacto

- 📱 WhatsApp: [+504 9341-4288](https://wa.me/50493414288)
- 📧 Email: [gruposaneri@outlook.com](mailto:gruposaneri@outlook.com)
- 📘 Facebook: [GrupoSaneriHN](https://www.facebook.com/GrupoSaneriHN)
- 📸 Instagram: [gruposaneri](https://www.instagram.com/gruposaneri/)
- 🔗 Linktree: [linktr.ee/gruposaneri](https://linktr.ee/gruposaneri)
- 📍 San Pedro Sula, Cortés, Honduras

---

## Deploy en GitHub Pages

1. Sube el contenido de esta carpeta `GS/` a un repositorio de GitHub.
2. Ve a **Settings → Pages** y selecciona la rama `main` (o `gh-pages`) como fuente.
3. El archivo `CNAME` configurará automáticamente el dominio `gruposaneri.com`.
4. Asegúrate de apuntar los DNS de tu dominio a los servidores de GitHub Pages:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

## Probar en local

```
python3 -m http.server 8000
```
y abre `http://localhost:8000` (también puedes usar `.claude/serve.py`).

---

© 2026 Grupo Saneri S. de R.L. — Todos los derechos reservados.
