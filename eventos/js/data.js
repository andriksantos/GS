/* ==========================================================
   Grupo Saneri · Eventos — data.js
   Catálogo editable. Para agregar, quitar o cambiar artículos
   de alquiler, edita la lista CATALOGO (no requiere programar).
   Campos: id (único), cat (id de categoría), nombre, desc,
   unidad (texto), icon (nombre de icono en ICONS), tag (opcional)
   ========================================================== */

window.SANERI = {
  whatsapp: '50493414288',
  email: 'gruposaneri@outlook.com',
  facebook: 'https://www.facebook.com/GrupoSaneriHN',
  instagram: 'https://www.instagram.com/gruposaneri/'
};

/* Iconos de línea (24x24, stroke) */
/* Foto de Unsplash por id (licencia libre). Para usar fotos propias,
   cambia img por la ruta, ej. img:'assets/img/sillas.jpg' */
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
  palette:'<circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1.3"/><circle cx="12" cy="7" r="1.3"/><circle cx="16" cy="10" r="1.3"/><path d="M12 22a3 3 0 010-6h2a3 3 0 003-3"/>'
};

window.CATEGORIAS = [
  { id:'mobiliario',  nombre:'Mobiliario',                 icon:'chair',    desc:'Sillas, mesas, salas lounge y tarimas para cualquier tamaño de evento.' },
  { id:'decoracion',  nombre:'Mantelería y decoración',    icon:'flower',   desc:'Mantelería, forros, centros de mesa, backdrops y ambientación temática.' },
  { id:'estructuras', nombre:'Toldos y estructuras',       icon:'canopy',   desc:'Toldos, carpas, pista de baile y escenarios para eventos al aire libre.' },
  { id:'audiovisual', nombre:'Audio, video e iluminación', icon:'speaker',  desc:'Sonido, micrófonos, proyección, pantallas e iluminación ambiental.' },
  { id:'entretenimiento', nombre:'Juegos y entretenimiento', icon:'castle', desc:'Brincolines, inflables, máquinas de snacks, animación y DJ.' },
  { id:'apoyo',       nombre:'Equipo y servicio de apoyo', icon:'chafer',   desc:'Planta eléctrica, vajilla, calentadores, meseros, montaje y transporte.' }
];

window.CATALOGO = [
  /* Mobiliario */
  { id:'silla-plastica', img:'1559223669-d7bb31d71f26',  cat:'mobiliario', nombre:'Silla plástica',            desc:'Silla resistente y cómoda, ideal para eventos de cualquier tamaño.', unidad:'unidad', icon:'chair', tag:'Más pedido' },
  { id:'silla-tiffany', img:'1782026456568-b2aaa170487b',   cat:'mobiliario', nombre:'Silla Tiffany',             desc:'Silla elegante tipo chiavari, perfecta para bodas, 15 años y cenas.', unidad:'unidad', icon:'chairElegant', tag:'Elegante' },
  { id:'silla-madera', img:'1762216444265-a675abbb48dd',    cat:'mobiliario', nombre:'Silla de madera crossback', desc:'Estilo rústico‑campestre para eventos al aire libre y temáticos.', unidad:'unidad', icon:'chairElegant' },
  { id:'silla-infantil', img:'1767070805821-60c701885151',  cat:'mobiliario', nombre:'Silla infantil',            desc:'Tamaño ideal para los más pequeños en fiestas infantiles.', unidad:'unidad', icon:'chair' },
  { id:'mesa-redonda', img:'1519167758481-83f550bb49b3',    cat:'mobiliario', nombre:'Mesa redonda (8–10 personas)', desc:'Mesa redonda para banquetes y recepciones.', unidad:'unidad', icon:'table', tag:'Más pedido' },
  { id:'mesa-rectangular', img:'1676027647672-1230463791a9',cat:'mobiliario', nombre:'Mesa rectangular / tablón', desc:'Versátil para buffet, invitados, registro o mesa principal.', unidad:'unidad', icon:'tableRect' },
  { id:'mesa-imperial', img:'1677768061409-3d4fbd0250d1',   cat:'mobiliario', nombre:'Mesa imperial',             desc:'Mesa larga de gran presencia para cenas y mesas principales.', unidad:'unidad', icon:'tableRect' },
  { id:'mesa-infantil', img:'1767070805821-60c701885151',   cat:'mobiliario', nombre:'Mesa infantil',             desc:'Mesa baja para niños, ideal para fiestas y actividades.', unidad:'unidad', icon:'tableRect' },
  { id:'mesa-coctel', img:'1699730164892-d7c433524ff3',     cat:'mobiliario', nombre:'Mesa periquera / coctelera',desc:'Mesa alta para cócteles, lanzamientos y recepciones.', unidad:'unidad', icon:'cocktail' },
  { id:'banco-periquero', img:'1725268093455-061ff2ed6c08', cat:'mobiliario', nombre:'Banco periquero',           desc:'Banco alto para acompañar mesas cocteleras.', unidad:'unidad', icon:'chair' },
  { id:'sala-lounge', img:'1780337093196-edfff43e7211',     cat:'mobiliario', nombre:'Sala lounge',               desc:'Juego de sala con sofás y mesa de centro para zonas VIP.', unidad:'juego', icon:'sofa', tag:'Premium' },
  { id:'tarima', img:'1592758080692-b6a5dbe9c725',          cat:'mobiliario', nombre:'Tarima / plataforma',       desc:'Plataforma modular para mesa principal, presentaciones o ceremonias.', unidad:'módulo', icon:'stage' },

  /* Decoración */
  { id:'mantel-redondo', img:'1712764995305-75422fbe0ecc',  cat:'decoracion', nombre:'Mantel redondo',            desc:'Mantel para mesa redonda en varios colores.', unidad:'unidad', icon:'cloth' },
  { id:'mantel-rect', img:'1635341108990-9201f2f48625',     cat:'decoracion', nombre:'Mantel rectangular',        desc:'Mantel para mesa rectangular o tablón.', unidad:'unidad', icon:'cloth' },
  { id:'cubremantel', img:'1674965381554-955d6a573354',     cat:'decoracion', nombre:'Cubremantel / camino de mesa', desc:'Toque de color y textura sobre el mantel base.', unidad:'unidad', icon:'cloth' },
  { id:'forro-silla', img:'1782026456568-b2aaa170487b',     cat:'decoracion', nombre:'Forro de silla con lazo',   desc:'Forro elástico con lazo en el color de tu evento.', unidad:'unidad', icon:'chair' },
  { id:'centro-mesa', img:'1676734629381-ecad774073b7',     cat:'decoracion', nombre:'Centro de mesa',            desc:'Arreglos según la temática: flores, velas, cristal o rústico.', unidad:'unidad', icon:'flower' },
  { id:'arco-globos', img:'1769867627452-46a2f513e05a',     cat:'decoracion', nombre:'Arco / decoración con globos', desc:'Arcos, columnas y guirnaldas orgánicas de globos.', unidad:'montaje', icon:'balloon', tag:'Favorito' },
  { id:'backdrop', img:'1560128411-79892dd93bf8',        cat:'decoracion', nombre:'Backdrop / fondo decorativo', desc:'Fondo para fotos, mesa principal o escenario, con telas o paneles.', unidad:'montaje', icon:'backdrop' },
  { id:'mesa-postres', img:'1765946026563-4f9db06eb328',    cat:'decoracion', nombre:'Mesa de postres / candy bar', desc:'Montaje decorado con bases, bandejas y ambientación.', unidad:'montaje', icon:'cake' },
  { id:'arreglo-floral', img:'1662553824684-16a98bf8115e',  cat:'decoracion', nombre:'Arreglo floral',            desc:'Arreglos naturales o artificiales para entrada, altar o mesas.', unidad:'unidad', icon:'flower' },
  { id:'decoracion-tematica', img:'1741969494307-55394e3e4071', cat:'decoracion', nombre:'Decoración temática completa', desc:'Diseño y montaje integral según el tema y colores de tu evento.', unidad:'servicio', icon:'palette' },

  /* Estructuras */
  { id:'toldo-3x3', img:'1758426637769-a00c1edbbcf8',       cat:'estructuras', nombre:'Toldo 3×3 m',             desc:'Toldo plegable para registro, buffet o áreas pequeñas.', unidad:'unidad', icon:'canopy' },
  { id:'toldo-3x6', img:'1774557937666-74b54d3170cd',       cat:'estructuras', nombre:'Toldo 3×6 m',             desc:'Mayor cobertura para mesas de invitados o zonas de comida.', unidad:'unidad', icon:'canopy' },
  { id:'carpa-grande', img:'1768179123386-a86a85f1c35c',    cat:'estructuras', nombre:'Carpa grande (medida a cotizar)', desc:'Carpas para eventos de gran aforo; medida según tu espacio.', unidad:'servicio', icon:'tent' },
  { id:'pared-lateral', img:'1782025419777-09e493453d9f',   cat:'estructuras', nombre:'Paredes laterales para toldo', desc:'Protección contra viento y lluvia.', unidad:'unidad', icon:'canopy' },
  { id:'pista-baile', img:'1708569177086-2710ef4b1620',     cat:'estructuras', nombre:'Pista de baile',          desc:'Pista modular; el tamaño se ajusta a tus invitados.', unidad:'m²', icon:'dance', tag:'Favorito' },
  { id:'escenario', img:'1587825140708-dfaf72ae4b04',       cat:'estructuras', nombre:'Escenario',               desc:'Escenario modular para bandas, presentaciones y conferencias.', unidad:'servicio', icon:'stage' },

  /* Audiovisual */
  { id:'sonido', img:'1762952805560-130ccc74c3fa',          cat:'audiovisual', nombre:'Equipo de sonido',        desc:'Bocinas, consola y cableado según el tamaño del lugar.', unidad:'equipo', icon:'speaker', tag:'Más pedido' },
  { id:'microfono', img:'1516280440614-37939bbacd81',       cat:'audiovisual', nombre:'Micrófono inalámbrico',   desc:'Para discursos, brindis, conferencias y animación.', unidad:'unidad', icon:'mic' },
  { id:'proyector', img:'1505373877841-8d25f7d46678',       cat:'audiovisual', nombre:'Proyector + pantalla',    desc:'Proyección para presentaciones, videos y fotos.', unidad:'equipo', icon:'projector' },
  { id:'pantalla-tv', img:'1769798643655-e0f10f62c3fd',     cat:'audiovisual', nombre:'Pantalla TV con base',    desc:'Pantalla para presentaciones, señalización o transmisión.', unidad:'unidad', icon:'screen' },
  { id:'podio', img:'1762968274962-20c12e6e8ecd',           cat:'audiovisual', nombre:'Podio',                   desc:'Atril para expositores, graduaciones y ceremonias.', unidad:'unidad', icon:'podium' },
  { id:'luces-ambiente', img:'1723832348140-a2d9eb1753b1',  cat:'audiovisual', nombre:'Iluminación ambiental LED', desc:'Luces uplight de colores para transformar el espacio.', unidad:'unidad', icon:'light' },
  { id:'luces-guirnalda', img:'1511461744085-90a4d1c66be3', cat:'audiovisual', nombre:'Guirnaldas y cortinas de luces', desc:'Ambiente cálido para eventos al aire libre y fotos.', unidad:'montaje', icon:'string' },
  { id:'maquina-humo', img:'1784151100440-08722e9c0e5c',    cat:'audiovisual', nombre:'Máquina de humo',         desc:'Efecto especial para entradas, primer baile y pista.', unidad:'unidad', icon:'smoke' },

  /* Entretenimiento */
  { id:'brincolin', img:'1765947389722-2e96d8c0aad9',       cat:'entretenimiento', nombre:'Brincolín',           desc:'Inflable seguro y divertido para fiestas infantiles.', unidad:'unidad', icon:'castle', tag:'Más pedido' },
  { id:'inflable-resbaladero', img:'1740033135773-bf7c886ae45a', cat:'entretenimiento', nombre:'Inflable con resbaladero', desc:'Combo de brincolín con tobogán para más diversión.', unidad:'unidad', icon:'slide' },
  { id:'piscina-pelotas', img:'1768054193070-ec10b5583bc4', cat:'entretenimiento', nombre:'Piscina de pelotas',  desc:'Área de juego para los más pequeños.', unidad:'unidad', icon:'ball' },
  { id:'maquina-algodon', img:'1741347839098-802b3b49aa52', cat:'entretenimiento', nombre:'Máquina de algodón de azúcar', desc:'Con o sin operador e insumos.', unidad:'unidad', icon:'candy' },
  { id:'maquina-palomitas', img:'1695728167331-2dbcd4003602', cat:'entretenimiento', nombre:'Máquina de palomitas', desc:'Clásico infaltable en fiestas y eventos familiares.', unidad:'unidad', icon:'popcorn' },
  { id:'animacion', img:'1765947390303-a1eec15447f4',       cat:'entretenimiento', nombre:'Animación / show infantil', desc:'Animadores, payasos, juegos dirigidos y personajes.', unidad:'servicio', icon:'mask' },
  { id:'dj', img:'1541126274323-dbac58d14741',              cat:'entretenimiento', nombre:'DJ / música en vivo', desc:'Ambientación musical para cualquier tipo de evento.', unidad:'servicio', icon:'music' },

  /* Apoyo */
  { id:'planta-electrica',cat:'apoyo', nombre:'Planta eléctrica',              desc:'Energía de respaldo para eventos al aire libre.', unidad:'unidad', icon:'power' },
  { id:'ventilador',      cat:'apoyo', nombre:'Ventilador / nebulizador',      desc:'Confort para tus invitados en días calurosos.', unidad:'unidad', icon:'fan' },
  { id:'chafer', img:'1555244162-803834f70033',          cat:'apoyo', nombre:'Calentador de comida (chafer)', desc:'Mantiene la comida a temperatura durante el servicio.', unidad:'unidad', icon:'chafer' },
  { id:'vajilla', img:'1702564696255-658c17619a13',         cat:'apoyo', nombre:'Vajilla',                       desc:'Platos base, trinche y postre.', unidad:'juego/persona', icon:'dish' },
  { id:'cristaleria', img:'1620704033114-028772aa85ae',     cat:'apoyo', nombre:'Cristalería',                   desc:'Copas y vasos para agua, vino, brindis y cócteles.', unidad:'unidad', icon:'glass' },
  { id:'cubierteria', img:'1696271026754-2eb5a6cd08a2',     cat:'apoyo', nombre:'Cubertería',                    desc:'Juego de cubiertos por persona.', unidad:'juego/persona', icon:'cutlery' },
  { id:'meseros', img:'1773409414133-9c5d141cb4c5',         cat:'apoyo', nombre:'Personal de meseros',           desc:'Servicio de mesa y atención a invitados.', unidad:'persona', icon:'waiter' },
  { id:'montaje', img:'1723832348105-2e69f948135a',         cat:'apoyo', nombre:'Montaje y desmontaje',          desc:'Nuestro equipo instala y retira todo el mobiliario.', unidad:'servicio', icon:'tools' },
  { id:'transporte',      cat:'apoyo', nombre:'Transporte y entrega',          desc:'Entrega y recogida del equipo en el lugar del evento.', unidad:'servicio', icon:'truck' }
];

/* Paquetes: "items" se cargan al cotizador como punto de partida (cantidades editables) */
window.PAQUETES = [
  { id:'pkg-infantil', img:'1765530950709-67e6af4ce3ad', nombre:'Fiesta Infantil', para:'Cumpleaños y celebraciones infantiles',
    desc:'Diversión garantizada para los niños y cero estrés para los papás.',
    incluye:['Brincolín o inflable','Mesas y sillas infantiles','Mesas y sillas para adultos con mantelería','Decoración temática con globos','Mesa de postres decorada','Máquina de algodón o palomitas','Equipo de sonido'],
    items:{ 'brincolin':1,'mesa-infantil':4,'silla-infantil':24,'mesa-redonda':4,'silla-plastica':40,'mantel-redondo':4,'arco-globos':1,'mesa-postres':1,'maquina-palomitas':1,'sonido':1 },
    tipo:'Evento infantil' },
  { id:'pkg-completo', img:'1740033135773-bf7c886ae45a', nombre:'Paquete Completo', para:'Juegos + Mobiliario + Animación', destacado:true,
    desc:'La forma más sencilla de organizar tu fiesta: todo coordinado por un solo equipo.',
    incluye:['Brincolines y juegos','Mobiliario completo con mantelería','Animación profesional','Decoración temática','Montaje y desmontaje','Coordinación el día del evento'],
    items:{ 'brincolin':1,'inflable-resbaladero':1,'mesa-redonda':6,'silla-plastica':60,'mantel-redondo':6,'animacion':1,'decoracion-tematica':1,'sonido':1,'montaje':1 },
    tipo:'Evento infantil' },
  { id:'pkg-social', img:'1758810743028-6b8e150ec98f', nombre:'Celebración Social', para:'Bodas, 15 años, bautizos y comuniones',
    desc:'Un ambiente elegante y cuidado en cada detalle para tu fecha especial.',
    incluye:['Sillas Tiffany y mesas redondas','Mantelería, forros y centros de mesa','Mesa principal con backdrop','Iluminación ambiental','Pista de baile','Sonido y micrófono','Coordinación del evento'],
    items:{ 'silla-tiffany':100,'mesa-redonda':10,'mantel-redondo':10,'cubremantel':10,'centro-mesa':10,'mesa-imperial':1,'backdrop':1,'luces-ambiente':8,'pista-baile':36,'sonido':1,'microfono':2 },
    tipo:'Boda' },
  { id:'pkg-corporativo', img:'1768508950719-4d76978fdf44', nombre:'Evento Corporativo', para:'Aniversarios, lanzamientos y cenas ejecutivas',
    desc:'Montajes profesionales que proyectan la imagen de tu empresa.',
    incluye:['Mesas cocteleras o banquete','Salas lounge','Escenario o tarima','Audio, micrófonos y pantalla','Iluminación ambiental','Backdrop de marca','Personal de apoyo'],
    items:{ 'mesa-coctel':10,'banco-periquero':20,'sala-lounge':2,'tarima':4,'sonido':1,'microfono':2,'pantalla-tv':2,'luces-ambiente':8,'backdrop':1,'meseros':4 },
    tipo:'Evento corporativo' },
  { id:'pkg-academico', img:'1541339907198-e08756dedf3f', nombre:'Evento Académico', para:'Graduaciones, congresos y conferencias',
    desc:'Logística completa para que tu evento fluya con orden y puntualidad.',
    incluye:['Sillas en auditorio','Mesa de honor con mantelería','Podio y escenario','Sonido y micrófonos','Proyector y pantalla','Toldos para registro','Montaje y desmontaje'],
    items:{ 'silla-plastica':200,'mesa-rectangular':4,'mantel-rect':4,'podio':1,'escenario':1,'sonido':1,'microfono':3,'proyector':1,'toldo-3x3':2,'montaje':1 },
    tipo:'Graduación' }
];

window.TIPOS_EVENTO = {
  'Sociales':['Boda','15 años','Bautizo','Primera comunión','Bautizo y primera comunión','Evento infantil','Cumpleaños','Baby shower','Aniversario','Fiesta familiar'],
  'Empresariales':['Evento corporativo','Aniversario corporativo','Almuerzo o cena ejecutiva','Feria empresarial','Lanzamiento de producto','Team building','Fiesta de fin de año'],
  'Académicos':['Graduación','Congreso','Conferencia','Seminario o taller','Acto cívico o escolar'],
  'Otro':['Otro']
};
