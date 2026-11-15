/* ============================================================
   KLIVO — main.js v3
   Navbar · Parallax · Scroll reveal · Cotizador multi-paso · WhatsApp
   ============================================================ */

'use strict';

const BRAND       = 'KLIVO';
const WA          = '50493414288';
const QUOTE_EMAIL = 'gruposaneri@outlook.com'; // correo que recibe la copia de cada cotización

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const waLink = msg => `https://wa.me/${WA}?text=${encodeURIComponent(msg)}`;

/* ── Navbar ─────────────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ── Menú móvil ─────────────────────────────────────────── */
const burger  = document.getElementById('hamburger');
const mobMenu = document.getElementById('mob-menu');
function setMenu(open) {
  mobMenu.classList.toggle('open', open);
  navbar.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}
burger.addEventListener('click', () => setMenu(!mobMenu.classList.contains('open')));
mobMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ── Scroll suave con compensación del navbar fijo ──────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - 84;
    window.scrollTo({ top: id === '#hero' ? 0 : y, behavior: reduceMotion ? 'auto' : 'smooth' });
  });
});

/* ══════════════════════════════════════════════════
   PARALLAX — capas del hero (solo escritorio y sin
   "reducir movimiento")
══════════════════════════════════════════════════ */
const heroEl   = document.getElementById('hero');
const layers   = [['hl1', .12], ['hl2', .28], ['hl3', .45]]
  .map(([id, k]) => [document.getElementById(id), k]).filter(([el]) => el);
const heroText = document.querySelector('.hero-left');
const parallaxOn = !reduceMotion && window.matchMedia('(min-width: 1025px)').matches;
let ticking = false;

function parallaxTick() {
  ticking = false;
  const sy = window.scrollY;
  if (sy > heroEl.offsetHeight * 1.2) return;
  layers.forEach(([el, k]) => { el.style.transform = `translateY(${sy * k}px)`; });
  if (heroText) heroText.style.transform = `translateY(${sy * 0.18}px)`;
}
if (heroEl && parallaxOn) {
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(parallaxTick); }
  }, { passive: true });
}

/* ══════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════ */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); revealObs.unobserve(e.target); }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in'));
}

/* ══════════════════════════════════════════════════
   COTIZADOR MULTI-PASO
══════════════════════════════════════════════════ */
const steps   = document.querySelectorAll('.f-step');
const nodes   = document.querySelectorAll('.fp-node');
const btnBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');
const fNav    = document.querySelector('.f-nav');
const LAST    = steps.length - 2;          // último paso antes de la pantalla de éxito
const SUCCESS = steps.length - 1;
// Servicios que no usan el paso "Equipo" (no son de aire acondicionado)
const NO_EQUIP = [
  'Instalación Eléctrica Residencial', 'Instalación Eléctrica Comercial',
  'Estudio Eléctrico', 'Sistema Solar Residencial', 'Sistema Solar Comercial / Industrial'
];
const SOLAR = ['Sistema Solar Residencial', 'Sistema Solar Comercial / Industrial'];
const DESC_HINT = {
  ac:     'Ej: El aire ya no enfría, hace ruido extraño, quiero instalar un Mini Split de 12,000 BTU...',
  elec:   'Ej: Instalar tomacorrientes 220V, cambiar el centro de carga, iluminación para mi local...',
  study:  'Ej: Se disparan las protecciones, voy a agregar maquinaria, tengo cargos por factor de potencia...',
  solar:  'Ej: Pago unos L 4,000 de luz al mes, techo de lámina, quiero respaldo en apagones...',
};

let cur = 0;
let trail = [];      // pasos visitados, para que "Atrás" respete los saltos
let lastMsg = '';

const fd = {
  servicio: '', equipo: '', descripcion: '', ubicacion: '', cantidad: '',
  urgencia: '', fecha: '', hora: '', nombre: '', telefono: '', direccion: '', notas: ''
};

function goStep(n, push = true) {
  if (push && n > cur) trail.push(cur);
  steps[cur].classList.remove('active');
  cur = n;
  steps[cur].classList.add('active');

  nodes.forEach((node, i) => {
    node.classList.toggle('active', i === cur);
    node.classList.toggle('done', i < cur || cur === SUCCESS);
  });

  btnBack.disabled = cur === 0;
  btnNext.textContent = cur === LAST ? 'Enviar por WhatsApp' : 'Siguiente';
  fNav.style.display = cur === SUCCESS ? 'none' : 'flex';
}

/* Botones de opción (accesibles con aria-pressed) */
document.querySelectorAll('.opts').forEach(group => {
  const opts = group.querySelectorAll('.opt');
  opts.forEach(btn => {
    btn.setAttribute('aria-pressed', btn.classList.contains('sel') ? 'true' : 'false');
    btn.addEventListener('click', () => {
      opts.forEach(b => { b.classList.remove('sel'); b.setAttribute('aria-pressed', 'false'); });
      btn.classList.add('sel');
      btn.setAttribute('aria-pressed', 'true');

      // Avance automático en los pasos de una sola elección (1 y 2)
      const stepIdx = [...steps].indexOf(btn.closest('.f-step'));
      if (stepIdx === 0 || stepIdx === 1) setTimeout(next, 220);
    });
  });
});

function next() {
  if (!validate(cur)) return;
  collect(cur);
  if (cur === LAST) { submitForm(); return; }

  if (cur === 0) adaptStep3();

  // Servicios eléctricos, estudios y solar: el paso "Equipo" no aplica, se salta
  if (cur === 0 && NO_EQUIP.includes(fd.servicio)) {
    const na = document.querySelector('#step2 .opt[data-val^="No aplica"]');
    document.querySelectorAll('#step2 .opt').forEach(b => { b.classList.remove('sel'); b.setAttribute('aria-pressed', 'false'); });
    if (na) { na.classList.add('sel'); na.setAttribute('aria-pressed', 'true'); }
    fd.equipo = 'No aplica (servicio eléctrico / solar)';
    trail.push(0);
    goStep(2, false);
    return;
  }
  goStep(cur + 1);
}

/* Ajusta el paso 3 según el servicio elegido */
function adaptStep3() {
  const svc   = fd.servicio;
  const units = document.getElementById('units-block');
  const desc  = document.getElementById('f-desc');
  const isAC  = !NO_EQUIP.includes(svc);
  if (units) {
    units.hidden = !isAC;
    if (!isAC) units.querySelectorAll('.opt').forEach(b => { b.classList.remove('sel'); b.setAttribute('aria-pressed', 'false'); });
  }
  desc.placeholder = SOLAR.includes(svc) ? DESC_HINT.solar
    : svc === 'Estudio Eléctrico' ? DESC_HINT.study
    : svc.startsWith('Instalación Eléctrica') ? DESC_HINT.elec
    : DESC_HINT.ac;
}

btnNext.addEventListener('click', next);
btnBack.addEventListener('click', () => {
  if (cur > 0) goStep(trail.length ? trail.pop() : cur - 1, false);
});

document.getElementById('btn-restart').addEventListener('click', () => {
  trail = [];
  document.querySelectorAll('.f-step input, .f-step textarea').forEach(el => (el.value = ''));
  document.getElementById('f-time').value = '';
  goStep(0, false);
});

/* Validación */
function validate(step) {
  if (step === 0 && !document.querySelector('#step1 .opt.sel'))
    return toast('Selecciona el tipo de servicio.'), false;
  if (step === 1 && !document.querySelector('#step2 .opt.sel'))
    return toast('Selecciona el tipo de equipo.'), false;
  if (step === 2 && !document.getElementById('f-desc').value.trim())
    return focusErr('f-desc', 'Describe el problema o lo que necesitas.'), false;
  if (step === 3 && !document.getElementById('f-date').value)
    return focusErr('f-date', 'Selecciona una fecha preferida.'), false;
  if (step === 4) {
    if (!document.getElementById('f-name').value.trim())
      return focusErr('f-name', 'Escribe tu nombre.'), false;
    const phone = document.getElementById('f-phone').value.replace(/\D/g, '');
    if (phone.length < 8)
      return focusErr('f-phone', 'Escribe un teléfono válido (8 dígitos).'), false;
  }
  return true;
}
function focusErr(id, msg) {
  toast(msg);
  const el = document.getElementById(id);
  if (el) el.focus();
}

/* Recolección de datos por paso */
function collect(step) {
  const sel = g => {
    const el = document.querySelector(`${g} .opt.sel`);
    return el ? el.dataset.val : '';
  };
  const val = id => document.getElementById(id).value.trim();

  if (step === 0) fd.servicio = sel('#step1');
  if (step === 1) fd.equipo   = sel('#step2');
  if (step === 2) { fd.descripcion = val('f-desc'); fd.ubicacion = val('f-loc'); fd.cantidad = sel('#step3'); }
  if (step === 3) { fd.fecha = val('f-date'); fd.hora = val('f-time'); fd.urgencia = sel('#step4'); }
  if (step === 4) { fd.nombre = val('f-name'); fd.telefono = val('f-phone'); fd.direccion = val('f-addr'); fd.notas = val('f-notes'); }
}

/* Construye el mensaje y abre WhatsApp.
   window.open se llama dentro del clic para que el navegador no lo bloquee. */
function submitForm() {
  if (document.getElementById('f-web').value) return; // honeypot anti-spam

  let fechaStr = 'No especificada';
  if (fd.fecha) {
    const d = new Date(fd.fecha + 'T12:00:00');
    fechaStr = d.toLocaleDateString('es-HN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    fechaStr = fechaStr.charAt(0).toUpperCase() + fechaStr.slice(1);
  }

  const lines = [
    `*${BRAND} · SOLICITUD DE COTIZACIÓN*`,
    '━━━━━━━━━━━━━━━━━━━━',
    '',
    '*SERVICIO*',
    `• Servicio: ${fd.servicio}`,
    `• Equipo: ${fd.equipo}`,
    fd.cantidad ? `• Cantidad: ${fd.cantidad}` : null,
    '',
    '*DETALLE DEL TRABAJO*',
    fd.descripcion,
    fd.ubicacion ? `• Área: ${fd.ubicacion}` : null,
    '',
    '*FECHA*',
    `• Fecha preferida: ${fechaStr}`,
    fd.hora     ? `• Hora: ${fd.hora}` : null,
    fd.urgencia ? `• Urgencia: ${fd.urgencia}` : null,
    '',
    '*CONTACTO*',
    `• Nombre: ${fd.nombre}`,
    `• Teléfono: ${fd.telefono}`,
    fd.direccion ? `• Dirección: ${fd.direccion}` : null,
    fd.notas     ? `• Notas: ${fd.notas}` : null,
    '',
    '_Enviado desde el sitio web_',
  ];
  lastMsg = lines.filter(l => l !== null).join('\n');

  const url = waLink(lastMsg);
  document.getElementById('wa-resend').href = url;
  window.open(url, '_blank', 'noopener');

  sendQuoteEmail(fechaStr);
  if (typeof gtag === 'function') gtag('event', 'generate_lead', { method: 'cotizador', service: fd.servicio });

  goStep(SUCCESS);
}

/* Copia por correo vía FormSubmit (no requiere servidor).
   La primera vez FormSubmit envía un correo de activación a QUOTE_EMAIL
   que hay que confirmar una sola vez. */
function sendQuoteEmail(fechaStr) {
  const payload = {
    _subject: `Nueva cotización ${BRAND} · ${fd.nombre || 'Sin nombre'}`,
    _template: 'table',
    _captcha: 'false',
    'Servicio solicitado': fd.servicio,
    'Tipo de equipo': fd.equipo,
    'Cantidad de unidades': fd.cantidad,
    'Descripción del trabajo': fd.descripcion,
    'Área / zona': fd.ubicacion,
    'Fecha preferida': fechaStr,
    'Hora preferida': fd.hora,
    'Urgencia': fd.urgencia,
    'Nombre': fd.nombre,
    'Teléfono / WhatsApp': fd.telefono,
    'Dirección': fd.direccion,
    'Notas adicionales': fd.notas,
  };
  fetch(`https://formsubmit.co/ajax/${QUOTE_EMAIL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(err => console.warn('No se pudo enviar la copia por correo:', err));
}

/* Aviso de error */
function toast(msg) {
  let t = document.getElementById('_toast');
  if (!t) {
    t = document.createElement('div');
    t.id = '_toast';
    t.setAttribute('role', 'alert');
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._t);
  t._t = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ── Botones directos de WhatsApp ───────────────────────── */
document.querySelectorAll('[data-wa]').forEach(el => {
  el.addEventListener('click', () => {
    const m = el.dataset.waMsg || '¡Hola! Quiero información sobre sus servicios.';
    window.open(waLink(m), '_blank', 'noopener');
    if (typeof gtag === 'function') gtag('event', 'whatsapp_click', { location: el.closest('section, div[id]')?.id || 'web' });
  });
});

/* ── Fecha mínima = hoy (hora local de Honduras, no UTC) ── */
(() => {
  const di = document.getElementById('f-date');
  if (!di) return;
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  di.min = local.toISOString().split('T')[0];
})();

/* ── Año del pie de página ──────────────────────────────── */
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
