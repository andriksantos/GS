/* ============================================================
   KLIVO — main.js v4
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
   COTIZADOR — 3 pasos: Servicio → Detalles → Contacto
══════════════════════════════════════════════════ */
const SERVICES = {
  ac: {
    name: 'Aire acondicionado', icon: 'ico-ac',
    hint: 'Ej: el aire no enfría, gotea, hace ruido; o quiero instalar uno en el cuarto...',
    groups: [
      { key: 'tipo', q: '¿Qué necesitas?', req: true,
        opts: ['Instalación', 'Mantenimiento', 'Reparación (no enfría / falla)'] },
      { key: 'equipo', q: 'Tipo de equipo',
        opts: ['Mini Split', 'Piso techo', 'Cassette', 'Central / paquete', 'No sé'] },
      { key: 'cantidad', q: '¿Cuántos equipos?', opts: ['1', '2', '3', '4 o más'] },
    ],
  },
  elec: {
    name: 'Reparación eléctrica', icon: 'ico-bolt',
    hint: 'Ej: se dispara el breaker cuando enciendo la secadora...',
    groups: [
      { key: 'tipo', q: '¿Qué está pasando?', req: true,
        opts: ['Se disparan los breakers', 'Tomas sin energía', 'Cortocircuito / olor a quemado',
               'Cambiar centro de carga', 'Nuevo circuito 220V', 'Iluminación', 'Otro'] },
      { key: 'lugar', q: '¿Dónde?', opts: ['Casa', 'Negocio / oficina', 'Industria'] },
    ],
  },
  estudio: {
    name: 'Estudio eléctrico', icon: 'ico-chart',
    hint: 'Ej: voy a agregar maquinaria, tengo cargos por factor de potencia...',
    groups: [
      { key: 'tipo', q: '¿Qué estudio necesitas?', req: true,
        opts: ['Carga y demanda', 'Factor de potencia / calidad de energía', 'Termografía de tableros',
               'Puesta a tierra', 'Planos / diagrama unifilar', 'No estoy seguro'] },
      { key: 'lugar', q: 'Tipo de instalación', opts: ['Casa', 'Comercio', 'Industria'] },
    ],
  },
  solar: {
    name: 'Sistema solar para casa', icon: 'ico-sun',
    hint: 'Ej: casa de 2 plantas, se va mucho la luz en la tarde...',
    groups: [
      { key: 'objetivo', q: '¿Qué buscas?', req: true,
        opts: ['Bajar la factura', 'Respaldo en apagones', 'Las dos cosas'] },
      { key: 'factura', q: '¿Cuánto pagas de luz al mes?',
        opts: ['Menos de L 2,000', 'L 2,000 – 5,000', 'L 5,000 – 10,000', 'Más de L 10,000'] },
      { key: 'techo', q: 'Tipo de techo', opts: ['Lámina', 'Concreto', 'Teja', 'No sé'] },
    ],
  },
  respaldo: {
    name: 'Respaldo comercial / industrial', icon: 'ico-factory',
    hint: 'Ej: necesito mantener refrigeradores y cajas registradoras durante los apagones...',
    groups: [
      { key: 'respaldar', q: '¿Qué necesitas respaldar?', req: true,
        opts: ['Todo el negocio', 'Solo equipos críticos', 'Refrigeración', 'Servidores / cámaras', 'No estoy seguro'] },
      { key: 'negocio', q: 'Tipo de negocio',
        opts: ['Tienda / comercio', 'Oficina', 'Restaurante', 'Bodega / nave', 'Industria / planta'] },
      { key: 'solar', q: '¿Quieres sumar paneles solares?', opts: ['Sí', 'No', 'Quiero asesoría'] },
    ],
  },
  otro: {
    name: 'No estoy seguro', icon: 'ico-search',
    hint: 'Cuéntanos qué está pasando o qué quieres hacer...',
    descRequired: true,
    groups: [],
  },
};
const LABELS = {
  tipo: 'Necesidad', equipo: 'Equipo', cantidad: 'Cantidad', lugar: 'Lugar', objetivo: 'Objetivo',
  factura: 'Factura mensual', techo: 'Techo', respaldar: 'Respaldar', negocio: 'Negocio',
  solar: 'Paneles solares', urgencia: 'Urgencia',
};

const steps   = [...document.querySelectorAll('.f-step')];
const nodes   = document.querySelectorAll('.fp-node');
const btnBack = document.getElementById('btn-back');
const btnNext = document.getElementById('btn-next');
const fNav    = document.querySelector('.f-nav');
const chosen  = document.getElementById('q-chosen');
const dyn     = document.getElementById('q-dyn');
const desc    = document.getElementById('f-desc');
const descLbl = document.getElementById('f-desc-lbl');
const SUCCESS = steps.length - 1;   // pantalla de éxito
const LAST    = SUCCESS - 1;        // paso de contacto

let cur = 0;
let svcKey = '';
let answers = {};
let lastMsg = '';

function goStep(n) {
  steps[cur].classList.remove('active');
  cur = n;
  steps[cur].classList.add('active');
  nodes.forEach((node, i) => {
    node.classList.toggle('active', i === cur);
    node.classList.toggle('done', i < cur || cur === SUCCESS);
  });
  btnBack.disabled = cur === 0;
  btnNext.textContent = cur === LAST ? 'Enviar por WhatsApp' : 'Siguiente';
  fNav.hidden = cur === 0 || cur === SUCCESS;   // el paso 1 avanza solo al tocar
  chosen.hidden = cur === 0 || cur === SUCCESS;
}

/* Paso 1: elegir servicio */
function chooseService(key, { scroll = false } = {}) {
  const svc = SERVICES[key];
  if (!svc) return;
  if (key !== svcKey) answers = { urgencia: 'Esta semana' };
  svcKey = key;
  document.querySelectorAll('.q-svc').forEach(b => {
    const on = b.dataset.svc === key;
    b.classList.toggle('sel', on);
    b.setAttribute('aria-pressed', String(on));
  });
  document.getElementById('q-chosen-name').textContent = svc.name;
  document.getElementById('q-chosen-use').setAttribute('href', '#' + svc.icon);
  buildDetails(svc);
  goStep(1);
  if (scroll) {
    const card = document.getElementById('cotizar');
    const y = card.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: reduceMotion ? 'auto' : 'smooth' });
  }
  if (typeof gtag === 'function') gtag('event', 'quote_service_select', { service: svc.name });
}

/* Paso 2: arma las preguntas según el servicio */
function buildDetails(svc) {
  dyn.innerHTML = '';
  svc.groups.forEach(g => {
    const wrap = document.createElement('div');
    wrap.className = 'q-group';
    const q = document.createElement('div');
    q.className = 'q-q';
    q.id = 'qq-' + g.key;
    q.innerHTML = g.q + (g.req ? ' *' : ' <span class="q-opt">(opcional)</span>');
    const chips = document.createElement('div');
    chips.className = 'q-chips';
    chips.dataset.key = g.key;
    if (g.req) chips.dataset.req = '1';
    chips.setAttribute('role', 'group');
    chips.setAttribute('aria-labelledby', q.id);
    g.opts.forEach(o => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'q-chip' + (answers[g.key] === o ? ' sel' : '');
      b.dataset.val = o;
      b.textContent = o;
      chips.appendChild(b);
    });
    wrap.append(q, chips);
    dyn.appendChild(wrap);
  });
  // urgencia (fija en el HTML)
  document.querySelectorAll('.q-chips[data-key="urgencia"] .q-chip').forEach(b =>
    b.classList.toggle('sel', b.dataset.val === answers.urgencia));
  syncPressed();
  desc.placeholder = svc.hint;
  descLbl.textContent = svc.descRequired ? 'Cuéntanos qué necesitas *' : 'Algún detalle extra (opcional)';
}

function syncPressed() {
  document.querySelectorAll('.q-chip').forEach(b => b.setAttribute('aria-pressed', String(b.classList.contains('sel'))));
}

/* Chips: un toque selecciona; otro toque en el mismo lo quita (si no es obligatorio) */
document.getElementById('step2').addEventListener('click', e => {
  const chip = e.target.closest('.q-chip');
  if (!chip) return;
  const group = chip.parentElement;
  const key = group.dataset.key;
  const was = chip.classList.contains('sel');
  group.querySelectorAll('.q-chip').forEach(c => c.classList.remove('sel'));
  if (was && !group.dataset.req && key !== 'urgencia') {
    delete answers[key];
  } else {
    chip.classList.add('sel');
    answers[key] = chip.dataset.val;
  }
  group.classList.remove('err');
  syncPressed();
});

document.querySelectorAll('.q-svc').forEach(b => {
  b.setAttribute('aria-pressed', 'false');
  b.addEventListener('click', () => chooseService(b.dataset.svc));
});
document.getElementById('q-change').addEventListener('click', () => goStep(0));

/* Botones "Cotizar ..." de las tarjetas de servicio */
document.querySelectorAll('[data-quote]').forEach(b =>
  b.addEventListener('click', () => chooseService(b.dataset.quote, { scroll: true })));

function next() {
  if (!validate(cur)) return;
  if (cur === LAST) { submitForm(); return; }
  goStep(cur + 1);
  if (cur === LAST) setTimeout(() => document.getElementById('f-name').focus({ preventScroll: true }), 50);
}
btnNext.addEventListener('click', next);
btnBack.addEventListener('click', () => { if (cur > 0) goStep(cur - 1); });

document.getElementById('btn-restart').addEventListener('click', () => {
  svcKey = ''; answers = {};
  document.querySelectorAll('.f-step input, .f-step textarea').forEach(el => (el.value = ''));
  document.getElementById('f-dep').value = '';
  document.querySelectorAll('.q-svc').forEach(b => { b.classList.remove('sel'); b.setAttribute('aria-pressed', 'false'); });
  goStep(0);
});

/* Validación */
function validate(step) {
  if (step === 1) {
    const missing = [...dyn.querySelectorAll('.q-chips[data-req]')].find(g => !answers[g.dataset.key]);
    if (missing) {
      missing.classList.add('err');
      toast('Elige una opción en: ' + missing.previousElementSibling.textContent.replace(' *', ''));
      return false;
    }
    if (SERVICES[svcKey].descRequired && !desc.value.trim())
      return focusErr('f-desc', 'Cuéntanos brevemente qué necesitas.'), false;
  }
  if (step === LAST) {
    if (!document.getElementById('f-name').value.trim())
      return focusErr('f-name', 'Escribe tu nombre.'), false;
    const phone = document.getElementById('f-phone').value.replace(/\D/g, '');
    if (phone.length < 8)
      return focusErr('f-phone', 'Escribe un número de WhatsApp válido (8 dígitos).'), false;
  }
  return true;
}
function focusErr(id, msg) {
  toast(msg);
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('is-err');
  el.addEventListener('input', () => el.classList.remove('is-err'), { once: true });
  el.focus();
}

/* Construye el mensaje y abre WhatsApp.
   window.open se llama dentro del clic para que el navegador no lo bloquee. */
function submitForm() {
  if (document.getElementById('f-web').value) return; // honeypot anti-spam
  const val = id => document.getElementById(id).value.trim();
  const svc = SERVICES[svcKey];
  const data = {
    nombre: val('f-name'), telefono: val('f-phone'),
    departamento: val('f-dep'), direccion: val('f-addr'), detalle: val('f-desc'),
  };
  const detailLines = Object.keys(answers)
    .filter(k => k !== 'urgencia')
    .map(k => `• ${LABELS[k] || k}: ${answers[k]}`);

  const lines = [
    `*${BRAND} · SOLICITUD DE COTIZACIÓN*`,
    '━━━━━━━━━━━━━━━━━━━━',
    '',
    `*SERVICIO:* ${svc.name}`,
    ...detailLines,
    answers.urgencia ? `• Urgencia: ${answers.urgencia}` : null,
    data.detalle ? `• Detalle: ${data.detalle}` : null,
    '',
    '*CONTACTO*',
    `• Nombre: ${data.nombre}`,
    `• WhatsApp: ${data.telefono}`,
    data.departamento ? `• Departamento: ${data.departamento}` : null,
    data.direccion ? `• Colonia / referencia: ${data.direccion}` : null,
    '',
    '_Enviado desde el sitio web_',
  ];
  lastMsg = lines.filter(l => l !== null).join('\n');

  const url = waLink(lastMsg);
  document.getElementById('wa-resend').href = url;
  window.open(url, '_blank', 'noopener');

  sendQuoteEmail(svc, data);
  if (typeof gtag === 'function') gtag('event', 'generate_lead', { method: 'cotizador', service: svc.name });

  goStep(SUCCESS);
}

/* Copia por correo vía FormSubmit (no requiere servidor).
   La primera vez FormSubmit envía un correo de activación a QUOTE_EMAIL
   que hay que confirmar una sola vez. */
function sendQuoteEmail(svc, data) {
  const payload = {
    _subject: `Nueva cotización ${BRAND} · ${svc.name} · ${data.nombre || 'Sin nombre'}`,
    _template: 'table',
    _captcha: 'false',
    'Servicio': svc.name,
  };
  Object.keys(answers).forEach(k => { payload[LABELS[k] || k] = answers[k]; });
  Object.assign(payload, {
    'Detalle': data.detalle,
    'Nombre': data.nombre,
    'WhatsApp': data.telefono,
    'Departamento': data.departamento,
    'Colonia / referencia': data.direccion,
  });
  fetch(`https://formsubmit.co/ajax/${QUOTE_EMAIL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(err => console.warn('No se pudo enviar la copia por correo:', err));
}

goStep(0);

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

/* ── Año del pie de página ──────────────────────────────── */
const yr = document.getElementById('year');
if (yr) yr.textContent = new Date().getFullYear();
