/**
 * Grupo Saneri S. de R.L. — main.js
 * Navegación, animaciones, horario dinámico, contadores, formulario de contacto y utilidades comunes.
 */
'use strict';

window.GS = window.GS || {};

/* ==========================================================================
   Constantes del negocio
   ========================================================================== */
GS.WHATSAPP_NUMBER = '50493414288';
GS.EMAIL = 'gruposaneri@outlook.com';

GS.waLink = function (message) {
  return 'https://wa.me/' + GS.WHATSAPP_NUMBER + (message ? '?text=' + encodeURIComponent(message) : '');
};

GS.formatCurrency = function (value) {
  if (value === null || value === undefined) return '';
  return 'L. ' + Number(value).toLocaleString('es-HN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
};

/* ==========================================================================
   Navegación
   ========================================================================== */
(function initNav() {
  const toggle = document.querySelector('.nav__toggle');
  const mobile = document.querySelector('.nav__mobile');
  const links = document.querySelectorAll('.nav__link, .nav__mobile-link');

  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      const isOpen = mobile.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobile.querySelectorAll('.nav__mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobile.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  const currentPath = (window.location.pathname.split('/').pop() || 'index.html');
  links.forEach(function (link) {
    const href = (link.getAttribute('href') || '').split('#')[0];
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('is-active');
      link.setAttribute('aria-current', 'page');
    }
  });
})();

/* ==========================================================================
   Scroll suave para anclas internas
   ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const id = this.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - navHeight - 12, behavior: 'smooth' });
  });
});

/* ==========================================================================
   Scroll reveal
   ========================================================================== */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if (!('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function (el) { observer.observe(el); });
})();

/* ==========================================================================
   Contador animado
   ========================================================================== */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-count'));
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1600;
      const start = performance.now();

      function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(ease * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }
      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
})();

/* ==========================================================================
   Horario dinámico
   Lun–Vie 8:00–18:00 · Sáb 8:00–15:00 · Dom 10:00–15:00
   ========================================================================== */
GS.SCHEDULE = [
  { day: 0, label: 'Domingo',   open: 10, close: 15 },
  { day: 1, label: 'Lunes',     open: 8,  close: 18 },
  { day: 2, label: 'Martes',    open: 8,  close: 18 },
  { day: 3, label: 'Miércoles', open: 8,  close: 18 },
  { day: 4, label: 'Jueves',    open: 8,  close: 18 },
  { day: 5, label: 'Viernes',   open: 8,  close: 18 },
  { day: 6, label: 'Sábado',    open: 8,  close: 15 }
];

GS.getHoursStatus = function (now) {
  now = now || new Date();
  const day = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;
  const today = GS.SCHEDULE[day];
  const isOpen = hour >= today.open && hour < today.close;

  function fmt(h) {
    const hh = Math.floor(h);
    const period = hh >= 12 ? 'PM' : 'AM';
    let h12 = hh % 12; if (h12 === 0) h12 = 12;
    return h12 + ':00 ' + period;
  }

  return {
    isOpen: isOpen,
    todayLabel: today.label,
    todayHours: fmt(today.open) + ' – ' + fmt(today.close),
    day: day
  };
};

(function initHoursBadges() {
  const badges = document.querySelectorAll('[data-hours-badge]');
  const rows = document.querySelectorAll('[data-hours-row]');
  if (!badges.length && !rows.length) return;

  const status = GS.getHoursStatus();

  badges.forEach(function (badge) {
    badge.classList.toggle('is-closed', !status.isOpen);
    const dot = badge.querySelector('.hours-badge__dot') ? '' : '<span class="hours-badge__dot" aria-hidden="true"></span>';
    const label = status.isOpen
      ? 'Abierto ahora · Cierra ' + status.todayHours.split('–')[1].trim()
      : 'Cerrado ahora · Hoy: ' + status.todayHours;
    badge.innerHTML = dot + label;
  });

  rows.forEach(function (row) {
    const rowDay = parseInt(row.getAttribute('data-hours-row'), 10);
    row.classList.toggle('is-today', rowDay === status.day);
  });
})();

/* ==========================================================================
   Toast de notificación
   ========================================================================== */
GS.showToast = function (message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(GS._toastTimer);
  GS._toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 3200);
};

/* ==========================================================================
   Formulario de contacto → WhatsApp
   ========================================================================== */
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.querySelector('[name="nombre"]')?.value.trim();
    const email = form.querySelector('[name="correo"]')?.value.trim();
    const phone = form.querySelector('[name="telefono"]')?.value.trim();
    const subject = form.querySelector('[name="asunto"]')?.value.trim();
    const message = form.querySelector('[name="mensaje"]')?.value.trim();

    if (!name || !message) {
      GS.showToast('Por favor completa tu nombre y mensaje.');
      return;
    }

    const text =
      'Hola Grupo Saneri! 👋\n\n' +
      '*Nombre:* ' + name + '\n' +
      (email ? '*Correo:* ' + email + '\n' : '') +
      (phone ? '*Teléfono:* ' + phone + '\n' : '') +
      (subject ? '*Asunto:* ' + subject + '\n' : '') +
      '\n*Mensaje:*\n' + message;

    const successBox = document.getElementById('contactSuccess');
    if (successBox) {
      form.style.display = 'none';
      successBox.classList.add('is-visible');
    }

    window.open(GS.waLink(text), '_blank');
    form.reset();
  });
})();

/* ==========================================================================
   Año en el footer
   ========================================================================== */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
