/**
 * Grupo Saneri S. de R.L. — cart.js
 * Carrito de compra persistente (localStorage) con checkout automático vía WhatsApp.
 * No requiere backend ni pasarela de pago: arma el pedido y lo envía por WhatsApp
 * para coordinar el pago (transferencia, link de pago BAC, tarjeta/Mipos).
 */
'use strict';

window.GS = window.GS || {};

GS.cart = (function () {
  const STORAGE_KEY = 'gs_cart_v1';
  let items = [];

  function load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      items = raw ? JSON.parse(raw) : [];
    } catch (e) {
      items = [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    render();
  }

  function add(product) {
    const existing = items.find(function (i) { return i.id === product.id; });
    if (existing) {
      existing.cantidad += 1;
    } else {
      items.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        precioTexto: product.precioTexto || null,
        imagen: product.imagen || null,
        icono: product.icono || '🛒',
        grupo: product.grupo || 'producto',
        cantidad: 1
      });
    }
    save();
    GS.showToast(product.nombre + ' se agregó al carrito');
    openDrawer();
  }

  function setQty(id, delta) {
    const item = items.find(function (i) { return i.id === id; });
    if (!item) return;
    item.cantidad += delta;
    if (item.cantidad <= 0) {
      items = items.filter(function (i) { return i.id !== id; });
    }
    save();
  }

  function removeItem(id) {
    items = items.filter(function (i) { return i.id !== id; });
    save();
  }

  function clear() {
    items = [];
    save();
  }

  function count() {
    return items.reduce(function (sum, i) { return sum + i.cantidad; }, 0);
  }

  function total() {
    return items.reduce(function (sum, i) { return sum + (i.precio ? i.precio * i.cantidad : 0); }, 0);
  }

  function hasQuoteItems() {
    return items.some(function (i) { return i.precio === null || i.precio === undefined; });
  }

  /* ---------------------------------------------------------------------- */
  let drawerEl, overlayEl, bodyEl, fabEl;

  function injectMarkup() {
    if (document.getElementById('cartDrawer')) return;

    const wrap = document.createElement('div');
    wrap.innerHTML =
      '<div class="cart-overlay" id="cartOverlay"></div>' +
      '<aside class="cart-drawer" id="cartDrawer" role="dialog" aria-modal="true" aria-label="Carrito de compra">' +
        '<div class="cart-drawer__header">' +
          '<h3 style="margin:0;font-size:1.1rem;">Tu carrito</h3>' +
          '<button class="cart-drawer__close" id="cartCloseBtn" aria-label="Cerrar carrito">✕</button>' +
        '</div>' +
        '<div class="cart-drawer__body" id="cartBody"></div>' +
        '<div class="cart-drawer__footer" id="cartFooter"></div>' +
      '</aside>' +
      '<button class="cart-fab" id="cartFab" aria-label="Ver carrito">' +
        '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' +
        '<span class="cart-fab__count" id="cartFabCount" hidden>0</span>' +
      '</button>';

    document.body.appendChild(wrap);

    drawerEl = document.getElementById('cartDrawer');
    overlayEl = document.getElementById('cartOverlay');
    bodyEl = document.getElementById('cartBody');
    fabEl = document.getElementById('cartFab');

    overlayEl.addEventListener('click', closeDrawer);
    document.getElementById('cartCloseBtn').addEventListener('click', closeDrawer);
    fabEl.addEventListener('click', openDrawer);

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-cart-open]')) {
        e.preventDefault();
        openDrawer();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeDrawer();
    });

    bodyEl.addEventListener('click', function (e) {
      const incBtn = e.target.closest('[data-qty-plus]');
      const decBtn = e.target.closest('[data-qty-minus]');
      const rmBtn = e.target.closest('[data-remove]');
      if (incBtn) setQty(incBtn.getAttribute('data-qty-plus'), 1);
      if (decBtn) setQty(decBtn.getAttribute('data-qty-minus'), -1);
      if (rmBtn) removeItem(rmBtn.getAttribute('data-remove'));
    });
  }

  function openDrawer() {
    if (!drawerEl) return;
    drawerEl.classList.add('is-open');
    overlayEl.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawerEl) return;
    drawerEl.classList.remove('is-open');
    overlayEl.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function itemRowHTML(item) {
    const media = item.imagen
      ? '<img src="' + item.imagen + '" alt="' + item.nombre + '" />'
      : item.icono;
    const priceLabel = item.precio !== null ? GS.formatCurrency(item.precio) : (item.precioTexto || 'Cotizar');
    return (
      '<div class="cart-item">' +
        '<div class="cart-item__media">' + media + '</div>' +
        '<div class="cart-item__info">' +
          '<div class="cart-item__title">' + item.nombre + '</div>' +
          '<div class="cart-item__price">' + priceLabel + '</div>' +
          '<div class="cart-item__qty">' +
            '<button class="qty-btn" type="button" data-qty-minus="' + item.id + '" aria-label="Restar">–</button>' +
            '<span class="cart-item__qty-value">' + item.cantidad + '</span>' +
            '<button class="qty-btn" type="button" data-qty-plus="' + item.id + '" aria-label="Sumar">+</button>' +
            '<button class="cart-item__remove" type="button" data-remove="' + item.id + '">Quitar</button>' +
          '</div>' +
        '</div>' +
      '</div>'
    );
  }

  function buildWhatsAppMessage() {
    let lines = ['Hola Grupo Saneri! 👋 Quiero hacer el siguiente pedido:', ''];
    items.forEach(function (i) {
      const priceLabel = i.precio !== null ? GS.formatCurrency(i.precio) : (i.precioTexto || 'Cotizar');
      lines.push('• ' + i.cantidad + 'x ' + i.nombre + ' — ' + priceLabel);
    });
    lines.push('');
    if (total() > 0) lines.push('*Subtotal estimado:* ' + GS.formatCurrency(total()));
    if (hasQuoteItems()) lines.push('(Incluye artículos/servicios que requieren cotización personalizada)');
    lines.push('');
    lines.push('Quedo atento(a) para coordinar el pago y la entrega. ¡Gracias!');
    return lines.join('\n');
  }

  function checkout() {
    if (!items.length) {
      GS.showToast('Tu carrito está vacío.');
      return;
    }
    window.open(GS.waLink(buildWhatsAppMessage()), '_blank');
  }

  function render() {
    // Badges (nav + fab)
    const c = count();
    document.querySelectorAll('[data-cart-count]').forEach(function (el) {
      el.textContent = c;
      el.hidden = c === 0;
    });
    if (fabEl) fabEl.classList.toggle('is-visible', c > 0);

    if (!bodyEl) return;

    if (!items.length) {
      bodyEl.innerHTML = '<div class="empty-state"><div class="empty-state__icon">🛒</div><p>Tu carrito está vacío.<br>Agrega productos o servicios desde la tienda.</p></div>';
      document.getElementById('cartFooter').innerHTML = '<a href="tienda.html" class="btn btn--outline btn--block">Ir a la tienda</a>';
      return;
    }

    bodyEl.innerHTML = items.map(itemRowHTML).join('');

    const totalValue = total();
    document.getElementById('cartFooter').innerHTML =
      '<div class="cart-total"><span class="cart-total__label">Subtotal</span><span class="cart-total__value">' + (totalValue > 0 ? GS.formatCurrency(totalValue) : 'A cotizar') + '</span></div>' +
      '<button class="btn btn--whatsapp btn--block" id="cartCheckoutBtn">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>' +
        'Finalizar pedido por WhatsApp' +
      '</button>' +
      '<p class="cart-note">Al finalizar se abrirá WhatsApp con el detalle de tu pedido para coordinar pago y entrega.</p>';

    document.getElementById('cartCheckoutBtn').addEventListener('click', checkout);
  }

  function init() {
    load();
    injectMarkup();
    render();
  }

  document.addEventListener('DOMContentLoaded', init);

  return { add: add, remove: removeItem, setQty: setQty, clear: clear, count: count, total: total, checkout: checkout, open: openDrawer };
})();
