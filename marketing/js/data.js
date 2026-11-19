/* ==========================================================
   Grupo Saneri · Marketing — data.js
   Catálogo editable de servicios, planes y diagnóstico.
   Campos de cada servicio: id, img (foto Unsplash o ruta propia),
   cat, nombre, desc, unidad (pago único, mensual, por campaña...),
   icon (nombre en ICONS), tag (opcional)
   ========================================================== */

window.SANERI = {
  whatsapp: '50493414288',
  email: 'gruposaneri@outlook.com',
  facebook: 'https://www.facebook.com/GrupoSaneriHN',
  instagram: 'https://www.instagram.com/gruposaneri/'
};

/* Foto de Unsplash por id (licencia libre). Para fotos propias usa img:'assets/img/archivo.jpg' */
window.IMG = function(id, w){ if(!id) return ''; if(/[\/.]/.test(id)) return id; return 'https://images.unsplash.com/photo-'+id+'?auto=format&fit=crop&w='+(w||640)+'&q=70'; };

window.ICONS = {
  chair:'<path d="M7 3h10v8H7z"/><path d="M6 11h12v3H6z"/><path d="M7 14v7M17 14v7M7 18h10"/>',
  chairElegant:'<path d="M8 3c0 0 0 8 0 8h8V3"/><path d="M8 6h8M8 9h8"/><path d="M6 11h12l-1 3H7z"/><path d="M8 14l-1 7M16 14l1 7"/>',
  table:'<ellipse cx="12" cy="8" rx="9" ry="3"/><path d="M12 11v9M8 21h8"/>',
  tableRect:'<path d="M2 8h20v3H2z"/><path d="M4 11v9M20 11v9"/>',
  cocktail:'<ellipse cx="12" cy="5" rx="6" ry="2"/><path d="M12 7v13M8 21h8"/>',
  sofa:'<path d="M4 11V8a3 3 0 013-3h10a3 3 0 013 3v3"/><path d="M2 12a2 2 0 014 0v3h12v-3a2 2 0 014 0v6H2z"/><path d="M5 18v2M19 18v2"/>',
  stage:'<path d="M2 14h20v4H2z"/><path d="M5 18v3M19 18v3M6 14V6l6-3 6 3v8"/>',
  tent:'<path d="M2 20L12 4l10 16"/><path d="M12 4v16M7 20l5-8 5 8"/>',
  canopy:'<path d="M3 9l9-5 9 5z"/><path d="M4 9v12M20 9v12M3 9h18"/>',
  dance:'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
  cloth:'<path d="M4 6h16l-2 14H6z"/><path d="M4 6c2 3 14 3 16 0"/>',
  flower:'<circle cx="12" cy="9" r="2.5"/><path d="M12 6.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM14.5 9a2.5 2.5 0 105 0 2.5 2.5 0 00-5 0zM9.5 9a2.5 2.5 0 10-5 0 2.5 2.5 0 005 0zM12 11.5a2.5 2.5 0 100 5"/><path d="M12 14v8M12 18c-2-2-4-2-5-1M12 19c2-2 4-2 5-1"/>',
  balloon:'<ellipse cx="9" cy="8" rx="5" ry="6"/><ellipse cx="16" cy="10" rx="4" ry="5"/><path d="M9 14l-1 8M16 15l1 7"/>',
  backdrop:'<path d="M3 3h18v14H3z"/><path d="M3 3c3 4 3 10 0 14M21 3c-3 4-3 10 0 14"/><path d="M8 21h8M12 17v4"/>',
  cake:'<path d="M4 21h16M5 21v-8h14v8"/><path d="M5 16c2 1 3-1 4.5 0s3 1 4.5 0 3-1 5 0"/><path d="M12 13V9M12 6v.5"/>',
  speaker:'<rect x="6" y="2" width="12" height="20" rx="2"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="6.5" r="1.5"/>',
  mic:'<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v4M8 22h8"/>',
  projector:'<rect x="2" y="7" width="20" height="10" rx="2"/><circle cx="16" cy="12" r="3"/><path d="M6 11h4M5 17v2M19 17v2"/>',
  screen:'<rect x="2" y="3" width="20" height="13" rx="1"/><path d="M12 16v5M8 21h8"/>',
  light:'<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 00-4 12.7V18h8v-3.3A7 7 0 0012 2z"/>',
  string:'<path d="M2 5c5 6 15 6 20 0"/><circle cx="6" cy="9" r="1.5"/><circle cx="12" cy="10.5" r="1.5"/><circle cx="18" cy="9" r="1.5"/><path d="M6 10.5V13M12 12v2.5M18 10.5V13"/>',
  smoke:'<path d="M3 16h9v5H3z"/><path d="M12 18h2"/><path d="M15 15c2 0 2-2 4-2s2 2 3 2M15 19c2 0 2-2 4-2s2 2 3 2M16 11c1.5 0 1.5-2 3-2s1.5 2 3 2"/>',
  podium:'<path d="M7 9h10l-1 12H8z"/><path d="M5 9h14M12 9V5M10 3h4"/>',
  castle:'<path d="M3 21V9l3 2V7l3 2V5l3 3 3-3v4l3-2v4l3-2v12z"/><path d="M10 21v-5a2 2 0 014 0v5"/>',
  slide:'<path d="M4 21V5h4v16M4 9h4"/><path d="M8 5c4 0 6 5 8 9s3 7 6 7"/>',
  ball:'<rect x="3" y="9" width="18" height="12" rx="2"/><circle cx="8" cy="7" r="2"/><circle cx="14" cy="5" r="2"/><circle cx="17" cy="9" r="1.5"/><circle cx="10" cy="13" r="1.5"/><circle cx="15" cy="15" r="1.5"/>',
  candy:'<circle cx="12" cy="9" r="6"/><path d="M12 15v7M9 22h6"/><path d="M8 7c1-2 3-2 4 0s3 2 4 0"/>',
  popcorn:'<path d="M6 9l2 12h8l2-12z"/><path d="M10 9l.5 12M14 9l-.5 12"/><path d="M6 9a2 2 0 012-3 2.5 2.5 0 014-2 2.5 2.5 0 014 2 2 2 0 012 3"/>',
  mask:'<path d="M3 5c3 1 6 1 9 0 3 1 6 1 9 0v6a9 9 0 01-18 0z"/><path d="M8 10h.01M16 10h.01M9 14c2 2 4 2 6 0"/>',
  music:'<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  power:'<rect x="3" y="7" width="18" height="12" rx="2"/><path d="M7 7V5h10v2M13 10l-3 4h4l-3 4"/>',
  fan:'<circle cx="12" cy="10" r="1.5"/><path d="M12 8.5c0-3 1-5 3-5s2 3-1.5 5.5M13.5 10c3 0 5 1 5 3s-3 2-5.5-1.5M10.5 10c-3 0-5-1-5-3s3-2 5.5 1.5"/><circle cx="12" cy="10" r="8"/><path d="M12 18v4M8 22h8"/>',
  chafer:'<path d="M3 13h18M4 13a8 8 0 0116 0"/><path d="M12 5v0M11 5h2"/><path d="M5 13v4h14v-4M7 17l-1 3M17 17l1 3"/>',
  dish:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/>',
  glass:'<path d="M7 3h10l-1 8a4 4 0 01-8 0z"/><path d="M12 15v6M8 21h8"/>',
  cutlery:'<path d="M7 2v8a2 2 0 002 2v10M5 2v6M9 2v6"/><path d="M17 22V2c-2 1-3 4-3 8h3"/>',
  waiter:'<circle cx="12" cy="5" r="3"/><path d="M6 21v-6a6 6 0 0112 0v6"/><path d="M10 10l2 3 2-3"/>',
  truck:'<path d="M1 6h13v10H1zM14 10h4l3 3v3h-7z"/><circle cx="5" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  tools:'<path d="M14.7 6.3a4 4 0 00-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 005.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/>',
  calendar:'<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18M8 14h2M14 14h2M8 18h2"/>',
  clipboard:'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 2h6v4H9zM9 11h6M9 15h6M9 19h3"/>',
  sparkles:'<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
  users:'<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a5 5 0 015-5h4a5 5 0 015 5v2"/><path d="M16 3.1a4 4 0 010 7.8M22 21v-2a5 5 0 00-3.5-4.8"/>',
  ring:'<circle cx="12" cy="15" r="6"/><path d="M9 4h6l-1.5 4h-3z"/><path d="M10.5 8l1.5 1 1.5-1"/>',
  briefcase:'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M2 13h20"/>',
  cap:'<path d="M22 9L12 4 2 9l10 5z"/><path d="M6 11v5c3 3 9 3 12 0v-5M22 9v6"/>',
  check:'<path d="M5 12l5 5L20 7"/>',
  shield:'<path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z"/><path d="M9 12l2 2 4-4"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
  heart:'<path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 000-7.8z"/>',
  star:'<path d="M12 2l3 6.5 7 .8-5.2 4.8 1.5 7L12 17.6 5.7 21.1l1.5-7L2 9.3l7-.8z"/>',
  pin:'<path d="M12 22s-7-6.2-7-12a7 7 0 0114 0c0 5.8-7 12-7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  mail:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/>',
  phone:'<path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z"/>',
  chat:'<path d="M21 12a8 8 0 01-11.6 7.1L4 20.5l1.4-5A8 8 0 1121 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  list:'<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
  print:'<path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/>',
  wallet:'<path d="M20 7H5a2 2 0 010-4h13v4"/><path d="M3 5v14a2 2 0 002 2h15V7"/><circle cx="16" cy="14" r="1.5"/>',
  palette:'<circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1.3"/><circle cx="12" cy="7" r="1.3"/><circle cx="16" cy="10" r="1.3"/><path d="M12 22a3 3 0 010-6h2a3 3 0 003-3"/>',
  megaphone:'<path d="M3 11v2a1 1 0 001 1h2l5 4V6L6 10H4a1 1 0 00-1 1z"/><path d="M15 9a4 4 0 010 6M18 6a8 8 0 010 12"/>',
  target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5"/>',
  chart:'<path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/>',
  trend:'<path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18"/>',
  cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.6 12.4a2 2 0 002 1.6h8.8a2 2 0 002-1.6L22 7H6"/>',
  camera:'<path d="M3 8a2 2 0 012-2h2l2-2h6l2 2h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><circle cx="12" cy="13" r="4"/>',
  video:'<rect x="2" y="6" width="14" height="12" rx="2"/><path d="M16 10l6-3v10l-6-3"/>',
  pen:'<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4z"/>',
  layers:'<path d="M12 2l10 5-10 5L2 7z"/><path d="M2 12l10 5 10-5M2 17l10 5 10-5"/>',
  code:'<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
  store:'<path d="M3 9l1.5-5h15L21 9"/><path d="M3 9a3 3 0 006 0 3 3 0 006 0 3 3 0 006 0"/><path d="M5 12v9h14v-9M10 21v-5h4v5"/>',
  gift:'<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13M5 12v9h14v-9"/><path d="M12 8c-2-4-6-4-6-1s4 1 6 1zM12 8c2-4 6-4 6-1s-4 1-6 1z"/>',
  bot:'<rect x="4" y="8" width="16" height="12" rx="3"/><path d="M12 4v4M9 13h.01M15 13h.01M9 17h6"/><circle cx="12" cy="3" r="1"/>',
  rocket:'<path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2"/><path d="M9 15l-3-3c1-5 5-9 13-9 0 8-4 12-9 13z"/><circle cx="15" cy="9" r="1.5"/>',
  bulb:'<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 00-4 12.7V18h8v-3.3A7 7 0 0012 2z"/>',
  heartHand:'<path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 00-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 000-7.8z"/>',
  gauge:'<path d="M12 14l4-4"/><path d="M3.3 17a10 10 0 1117.4 0"/>',
  like:'<path d="M7 10v11H3V10z"/><path d="M7 10l4-8a3 3 0 013 3v4h6a2 2 0 012 2.3l-1.4 8A2 2 0 0118.6 21H7"/>',
};

window.CATEGORIAS = [
  { id:'estrategia', nombre:'Estrategia y consultoría',      icon:'target',    desc:'Planes de marketing, auditorías y capacitación para tomar mejores decisiones.' },
  { id:'branding',   nombre:'Branding y diseño gráfico',     icon:'pen',       desc:'Identidad de marca, logo, manual y piezas gráficas con estilo propio.' },
  { id:'web',        nombre:'Páginas web y tiendas en línea', icon:'globe',    desc:'Sitios rápidos, optimizados para Google y pensados para vender.' },
  { id:'redes',      nombre:'Redes sociales y contenido',    icon:'like',      desc:'Community manager, reels, fotografía y video para tus redes.' },
  { id:'publicidad', nombre:'Publicidad digital y SEO',      icon:'megaphone', desc:'Campañas en Meta y Google, SEO, GEO y perfil de Google Business.' },
  { id:'whatsapp',   nombre:'WhatsApp, email y CRM',         icon:'chat',      desc:'WhatsApp Business, campañas, respuestas automáticas y email marketing.' },
  { id:'trade',      nombre:'Trade marketing y fidelización', icon:'store',    desc:'Punto de venta, material POP, activaciones y programas de lealtad.' },
  { id:'medicion',   nombre:'Analítica y resultados',        icon:'chart',     desc:'Medición con GA4, Pixel y Clarity, y reportes claros cada mes.' }
];

window.CATALOGO = [
  /* Estrategia */
  { id:'consultoria', img:'1758873272540-439a105db676', cat:'estrategia', nombre:'Plan de marketing digital', desc:'Diagnóstico, cliente ideal, objetivos, canales, calendario y presupuesto recomendado.', unidad:'pago único', icon:'target', tag:'Recomendado' },
  { id:'auditoria', img:'1783115259399-3a5a3e0e4592', cat:'estrategia', nombre:'Auditoría de marketing digital', desc:'Revisión de redes, web, Google y anuncios con un plan de mejoras priorizado.', unidad:'pago único', icon:'search' },
  { id:'investigacion', img:'1758873268695-1b55590e507a', cat:'estrategia', nombre:'Investigación de clientes y competencia', desc:'Buyer persona con enfoque en Honduras, análisis de competidores y oportunidades.', unidad:'pago único', icon:'users' },
  { id:'capacitacion', img:'1557804506-669a67965ba0', cat:'estrategia', nombre:'Capacitación para tu equipo', desc:'Talleres prácticos de redes sociales, ventas por WhatsApp y atención al cliente.', unidad:'por sesión', icon:'bulb' },

  /* Branding */
  { id:'logo', img:'1748326650737-33500fdfda30', cat:'branding', nombre:'Diseño de logo', desc:'Propuestas de logotipo, ajustes y archivos finales para impresión y digital.', unidad:'pago único', icon:'pen', tag:'Más pedido' },
  { id:'manual-marca', img:'1658863025658-4a259cc68fc9', cat:'branding', nombre:'Manual de marca', desc:'Colores, tipografías, usos correctos del logo y estilo visual para tu marca.', unidad:'pago único', icon:'layers' },
  { id:'papeleria', img:'1716471330463-f475b00f0506', cat:'branding', nombre:'Papelería corporativa', desc:'Tarjetas de presentación, hojas membretadas, sellos, facturas y firmas de correo.', unidad:'pago único', icon:'clipboard' },
  { id:'artes-redes', img:'1611532736597-de2d4265fba3', cat:'branding', nombre:'Paquete de artes para redes', desc:'Plantillas y diseños para publicaciones, historias y portadas con tu identidad.', unidad:'por paquete', icon:'palette' },
  { id:'diseno-publicitario', img:'1572044162444-ad60f128bdea', cat:'branding', nombre:'Diseño publicitario', desc:'Flyers, banners, rótulos, menús, catálogos y piezas para impresión.', unidad:'por pieza', icon:'pen' },

  /* Web */
  { id:'landing', img:'1781606989061-420b8dda8a17', cat:'web', nombre:'Landing page', desc:'Página de una sola sección enfocada en una oferta, con botón de WhatsApp y medición.', unidad:'pago único', icon:'rocket', tag:'Rápido' },
  { id:'sitio-web', img:'1499951360447-b19be8fe80f5', cat:'web', nombre:'Sitio web corporativo', desc:'Sitio de varias páginas, adaptable a celular, con SEO técnico y formularios.', unidad:'pago único', icon:'globe', tag:'Más pedido' },
  { id:'tienda-online', img:'1768987439370-bd60d3d0b28b', cat:'web', nombre:'Tienda en línea', desc:'Catálogo de productos, carrito y pedidos por WhatsApp o pago en línea.', unidad:'pago único', icon:'cart' },
  { id:'mantenimiento-web', img:'1498050108023-c5249f4df085', cat:'web', nombre:'Mantenimiento web', desc:'Actualizaciones, respaldos, cambios de contenido y soporte técnico.', unidad:'mensual', icon:'code' },

  /* Redes */
  { id:'cm-plan', img:'1759215524500-8834e4935603', cat:'redes', nombre:'Community manager', desc:'Estrategia de contenido, diseño, publicación y gestión de comentarios y mensajes.', unidad:'mensual', icon:'like', tag:'Más pedido' },
  { id:'reels', img:'1519587307163-d68d8b5aa895', cat:'redes', nombre:'Producción de reels y videos cortos', desc:'Guion, grabación y edición de videos para Instagram, Facebook y TikTok.', unidad:'por paquete', icon:'video', tag:'Tendencia' },
  { id:'edicion-video', img:'1627244714766-94dab62ed964', cat:'redes', nombre:'Edición de video', desc:'Edición profesional de tu material con subtítulos, música y formato para redes.', unidad:'por video', icon:'video' },
  { id:'foto-producto', img:'1611930022073-b7a4ba5fcccd', cat:'redes', nombre:'Fotografía de producto', desc:'Fotos de catálogo con fondo limpio para web, redes y WhatsApp.', unidad:'por sesión', icon:'camera' },
  { id:'sesion-foto', img:'1630797160666-38e8c5ba44c1', cat:'redes', nombre:'Sesión de fotos para redes', desc:'Fotos de tu negocio, equipo y servicios para contenido auténtico.', unidad:'por sesión', icon:'camera' },

  /* Publicidad */
  { id:'meta-ads', img:'1724862936518-ae7fcfc052c1', cat:'publicidad', nombre:'Campañas en Facebook e Instagram', desc:'Configuración, segmentación, anuncios y optimización de campañas en Meta Ads.', unidad:'mensual', icon:'megaphone', tag:'Más pedido' },
  { id:'google-ads', img:'1460925895917-afdab827c52f', cat:'publicidad', nombre:'Campañas en Google Ads', desc:'Anuncios en búsquedas, Maps y YouTube para clientes que ya te están buscando.', unidad:'mensual', icon:'search' },
  { id:'seo', img:'1504868584819-f8e8b4b6d7e3', cat:'publicidad', nombre:'SEO, GEO y AEO', desc:'Posicionamiento en Google y en buscadores con IA como ChatGPT y Gemini.', unidad:'mensual', icon:'trend' },
  { id:'google-negocio', img:'1764173039192-2bbd508d5211', cat:'publicidad', nombre:'Perfil de Google Business', desc:'Creación u optimización de tu ficha en Google Maps con fotos, horarios y reseñas.', unidad:'pago único', icon:'pin' },

  /* WhatsApp */
  { id:'wa-catalogo', img:'1587573578181-f3342274f4c7', cat:'whatsapp', nombre:'WhatsApp Business: perfil y catálogo', desc:'Perfil profesional, catálogo de productos, etiquetas y respuestas rápidas.', unidad:'pago único', icon:'chat', tag:'Esencial' },
  { id:'wa-campanas', img:'1646766677899-9c1750e28b0f', cat:'whatsapp', nombre:'Campañas de WhatsApp marketing', desc:'Mensajes masivos segmentados a tu lista de clientes con contenido que vende.', unidad:'por campaña', icon:'megaphone' },
  { id:'wa-bot', img:'1661082567779-4fd2e1cb7662', cat:'whatsapp', nombre:'Respuestas automáticas y chatbot', desc:'Mensajes de bienvenida, menú de opciones y atención automática 24/7.', unidad:'pago único', icon:'bot' },
  { id:'email', img:'1563986768494-4dee2763ff3f', cat:'whatsapp', nombre:'Email marketing', desc:'Boletines, promociones y secuencias automáticas para tu base de clientes.', unidad:'mensual', icon:'mail' },

  /* Trade */
  { id:'material-pop', img:'1757800945999-ed0fa905d0f5', cat:'trade', nombre:'Material POP y exhibición', desc:'Diseño de material para punto de venta, exhibidores y visibilidad de marca.', unidad:'por proyecto', icon:'store' },
  { id:'fidelizacion', img:'1556740772-1a741367b93e', cat:'trade', nombre:'Programa de fidelización', desc:'Planes de lealtad para clientes y distribuidores: puntos, beneficios y comunicación.', unidad:'por proyecto', icon:'gift' },
  { id:'activaciones', img:'1556745753-b2904692b3cd', cat:'trade', nombre:'Activaciones y promociones', desc:'Promociones, degustaciones y dinámicas en tienda para impulsar ventas.', unidad:'por campaña', icon:'sparkles' },

  /* Medición */
  { id:'analitica', img:'1784729553968-07da5d7b7c99', cat:'medicion', nombre:'Instalación de analítica', desc:'Google Analytics 4, Tag Manager, Pixel de Meta y Microsoft Clarity configurados.', unidad:'pago único', icon:'gauge' },
  { id:'reportes', img:'1781246435700-afec19012b45', cat:'medicion', nombre:'Reporte mensual de resultados', desc:'Tablero con alcance, mensajes, ventas y recomendaciones explicadas en simple.', unidad:'mensual', icon:'chart' }
];

/* Planes: "items" se cargan a la propuesta como punto de partida (editable) */
window.PAQUETES = [
  { id:'pkg-arranque', img:'1759215524472-1b0686fdbd87', nombre:'Plan Arranque', para:'Para negocios que empiezan en redes',
    desc:'Presencia profesional y constante en redes sociales sin complicarte.',
    incluye:['Community manager en 2 redes','Diseño de publicaciones e historias','Calendario mensual de contenido','WhatsApp Business configurado','Perfil de Google Business optimizado'],
    items:{ 'cm-plan':1,'artes-redes':1,'wa-catalogo':1,'google-negocio':1 }, tipo:'' },
  { id:'pkg-crecimiento', img:'1724862936518-ae7fcfc052c1', nombre:'Plan Crecimiento', para:'Redes + anuncios para vender más', destacado:true,
    desc:'Contenido que conecta y publicidad que trae mensajes y clientes nuevos.',
    incluye:['Todo el Plan Arranque','Reels y videos cortos','Campañas en Facebook e Instagram','Analítica instalada (GA4, Pixel, Clarity)','Reporte mensual de resultados'],
    items:{ 'cm-plan':1,'artes-redes':1,'reels':1,'meta-ads':1,'analitica':1,'reportes':1 }, tipo:'' },
  { id:'pkg-360', img:'1551288049-bebda4e38f71', nombre:'Plan 360°', para:'Marketing completo para empresas',
    desc:'Estrategia, contenido, publicidad, SEO y medición con un solo equipo.',
    incluye:['Plan de marketing digital','Community manager y reels','Meta Ads y Google Ads','SEO, GEO y AEO','Fotografía para redes','Reporte y reunión mensual'],
    items:{ 'consultoria':1,'cm-plan':1,'reels':1,'meta-ads':1,'google-ads':1,'seo':1,'sesion-foto':1,'reportes':1 }, tipo:'' },
  { id:'pkg-web', img:'1499951360447-b19be8fe80f5', nombre:'Presencia Web', para:'Tu negocio visible en Google',
    desc:'Un sitio rápido y medible que convierte visitas en mensajes.',
    incluye:['Sitio web corporativo','SEO técnico y datos estructurados','Perfil de Google Business','Botón y enlaces de WhatsApp','Analítica instalada'],
    items:{ 'sitio-web':1,'seo':1,'google-negocio':1,'analitica':1 }, tipo:'' },
  { id:'pkg-marca', img:'1748326650737-33500fdfda30', nombre:'Marca Nueva', para:'Para lanzar o renovar tu marca',
    desc:'Una identidad sólida y lista para usarse en todos tus canales.',
    incluye:['Diseño de logo','Manual de marca','Papelería corporativa','Paquete de artes para redes','WhatsApp Business con tu imagen'],
    items:{ 'logo':1,'manual-marca':1,'papeleria':1,'artes-redes':1,'wa-catalogo':1 }, tipo:'' },
  { id:'pkg-tienda', img:'1768987439370-bd60d3d0b28b', nombre:'Vende en Línea', para:'Tienda en línea lista para vender',
    desc:'Catálogo, fotos y anuncios para empezar a vender por internet y WhatsApp.',
    incluye:['Tienda en línea','Fotografía de producto','Catálogo de WhatsApp','Campañas en Facebook e Instagram','Analítica de ventas'],
    items:{ 'tienda-online':1,'foto-producto':1,'wa-catalogo':1,'meta-ads':1,'analitica':1 }, tipo:'' }
];

/* Rubros para el cotizador (se usan en <select data-tipos>) */
window.TIPOS_EVENTO = {
  'Comercio':['Tienda / retail','Distribuidora / mayorista','Ferretería / construcción','Automotriz','Tienda en línea'],
  'Servicios':['Restaurante / cafetería','Salón / belleza / spa','Salud / clínica','Educación','Servicios profesionales','Inmobiliaria','Tecnología','Turismo / hotel','Eventos'],
  'Otros':['Industria / manufactura','ONG / fundación','Emprendimiento nuevo','Otro']
};

/* Diagnóstico de marketing: cada pregunta suma puntos y recomienda servicios si la respuesta es débil */
window.DIAGNOSTICO = [
  { q:'¿Tienes un logo y colores definidos que usas en todos tus canales?', area:'Marca', rec:['logo','manual-marca'] },
  { q:'¿Publicas en redes sociales al menos 3 veces por semana?', area:'Redes sociales', rec:['cm-plan','artes-redes'] },
  { q:'¿Publicas videos cortos (reels) de forma regular?', area:'Contenido', rec:['reels','edicion-video'] },
  { q:'¿Tienes una página web propia, rápida y que se ve bien en celular?', area:'Web', rec:['sitio-web','landing'] },
  { q:'¿Tu negocio aparece en Google Maps con fotos, horario y reseñas?', area:'Google', rec:['google-negocio','seo'] },
  { q:'¿Inviertes en anuncios con objetivos y un presupuesto definido?', area:'Publicidad', rec:['meta-ads','google-ads'] },
  { q:'¿Usas WhatsApp Business con catálogo y respuestas rápidas?', area:'WhatsApp', rec:['wa-catalogo','wa-bot'] },
  { q:'¿Guardas los datos de tus clientes y les vuelves a escribir con ofertas?', area:'Clientes', rec:['wa-campanas','email','fidelizacion'] },
  { q:'¿Mides cuántos mensajes, cotizaciones o ventas te generan tus campañas?', area:'Medición', rec:['analitica','reportes'] },
  { q:'¿Tienes un plan de marketing con metas para los próximos meses?', area:'Estrategia', rec:['consultoria','auditoria'] }
];
