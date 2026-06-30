/**
 * Grupo Saneri S. de R.L. — Main JavaScript
 * Version: 1.0.0
 */

'use strict';

/* ==========================================================================
   Navigation
   ========================================================================== */
(function initNav() {
  const nav    = document.querySelector('.nav');
  const toggle = document.querySelector('.nav__toggle');
  const mobile = document.querySelector('.nav__mobile');
  const links  = document.querySelectorAll('.nav__link, .nav__mobile-link');

  if (!nav) return;

  // Scroll effect
  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (toggle && mobile) {
    toggle.addEventListener('click', function () {
      const isOpen = mobile.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobile.querySelectorAll('.nav__mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobile.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && mobile.classList.contains('open')) {
        mobile.classList.remove('open');
        toggle.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active link highlighting
  function setActiveLink() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  setActiveLink();
})();

/* ==========================================================================
   Smooth Scroll
   ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navHeight = parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-height')) || 72;

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - navHeight - 8,
      behavior: 'smooth'
    });
  });
});

/* ==========================================================================
   Scroll Reveal
   ========================================================================== */
(function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ==========================================================================
   Contact Form Handler
   ========================================================================== */
(function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn     = form.querySelector('[type="submit"]');
    const name    = form.querySelector('[name="name"]')?.value.trim();
    const email   = form.querySelector('[name="email"]')?.value.trim();
    const message = form.querySelector('[name="message"]')?.value.trim();

    if (!name || !email || !message) {
      showToast('Por favor completa todos los campos.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showToast('Por favor ingresa un correo electrónico válido.', 'error');
      return;
    }

    // Build WhatsApp message as fallback
    const waText = encodeURIComponent(
      `Hola Grupo Saneri! 👋\n\n` +
      `*Nombre:* ${name}\n` +
      `*Correo:* ${email}\n\n` +
      `*Mensaje:*\n${message}`
    );

    btn.disabled = true;
    btn.textContent = 'Enviando…';

    // Open WhatsApp with pre-filled message
    setTimeout(function () {
      window.open(`https://wa.me/50493414288?text=${waText}`, '_blank');
      form.reset();
      btn.disabled = false;
      btn.textContent = 'Enviar Mensaje';
      showToast('¡Redirigiendo a WhatsApp!', 'success');
    }, 600);
  });
})();

/* ==========================================================================
   Toast Notifications
   ========================================================================== */
function showToast(message, type) {
  const existing = document.querySelector('.gs-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'gs-toast gs-toast--' + (type || 'info');
  toast.setAttribute('role', 'alert');
  toast.setAttribute('aria-live', 'polite');
  toast.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()" aria-label="Cerrar">✕</button>
  `;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '2rem',
    left: '50%',
    transform: 'translateX(-50%)',
    background: type === 'error' ? '#EF4444' : type === 'success' ? '#10B981' : '#2B4A6F',
    color: '#fff',
    padding: '0.875rem 1.5rem',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    zIndex: '99999',
    boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    animation: 'slideUp 0.3s ease',
    maxWidth: '420px',
    width: 'calc(100vw - 2rem)'
  });

  document.body.appendChild(toast);
  setTimeout(function () { toast?.remove(); }, 5000);
}

/* Inject toast animation */
(function () {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from { opacity: 0; transform: translate(-50%, 20px); }
      to   { opacity: 1; transform: translate(-50%, 0); }
    }
  `;
  document.head.appendChild(style);
})();

/* ==========================================================================
   Helpers
   ========================================================================== */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ==========================================================================
   Counter Animation
   ========================================================================== */
(function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-count'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const duration = 1800;
      const startTime = performance.now();

      function update(now) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease     = 1 - Math.pow(1 - progress, 3);
        const current  = Math.round(ease * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) { observer.observe(el); });
})();
