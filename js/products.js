/**
 * Grupo Saneri S. de R.L. — products.js
 * Carga el catálogo (data/productos.json) y renderiza productos/eventos
 * en la tienda, páginas de categoría, destacados del inicio y tipos de evento.
 */
'use strict';

window.GS = window.GS || {};

GS.Catalog = (function () {
  let dataPromise = null;

  function load() {
    if (!dataPromise) {
      dataPromise = fetch('data/productos.json')
        .then(function (res) {
          if (!res.ok) throw new Error('No se pudo cargar el catálogo');
          return res.json();
        })
        .catch(function (err) {
          console.error('[GS.Catalog]', err);
          return { categorias: [], productos: [], eventos: [] };
        });
    }
    return dataPromise;
  }

  return { load: load };
})();

/* ==========================================================================
   Helpers de render
   ========================================================================== */
function gsMediaHTML(item) {
  if (item.imagen) {
    return '<img src="' + item.imagen + '" alt="' + item.nombre + '" loading="lazy" width="400" height="400" />';
  }
  return '<span class="product-card__icon-fallback" aria-hidden="true">' + (item.icono || '🛒') + '</span>';
}

function gsPriceHTML(item) {
  if (item.precio === null || item.precio === undefined) {
    return '<span class="product-card__price">' + (item.precioTexto || 'Cotizar') + '<small>Precio a confirmar</small></span>';
  }
  return '<span class="product-card__price">' + GS.formatCurrency(item.precio) + '<small>' + (item.grupo === 'evento' ? 'Paquete' : 'IVI incluido') + '</small></span>';
}

function gsProductCardHTML(item, categoriaNombre) {
  return (
    '<article class="product-card" data-id="' + item.id + '" data-cat="' + item.categoria + '">' +
      '<div class="product-card__media">' +
        (item.destacado ? '<span class="product-card__badge">Destacado</span>' : '') +
        gsMediaHTML(item) +
      '</div>' +
      '<div class="product-card__body">' +
        '<span class="product-card__cat">' + (categoriaNombre || item.subcategoria || '') + '</span>' +
        '<h3 class="product-card__title">' + item.nombre + '</h3>' +
        '<p class="product-card__desc">' + item.descripcion + '</p>' +
        '<div class="product-card__footer">' +
          gsPriceHTML(item) +
          '<button class="btn-add-cart" type="button" data-add-id="' + item.id + '" aria-label="Agregar ' + item.nombre + ' al carrito">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>' +
          '</button>' +
        '</div>' +
      '</div>' +
    '</article>'
  );
}

function gsAllItems(data) {
  return (data.productos || []).concat(data.eventos || []);
}

function gsCategoryName(data, catId) {
  const cat = (data.categorias || []).find(function (c) { return c.id === catId; });
  return cat ? cat.nombre : catId;
}

/* Delegación global: clic en "agregar al carrito" dentro de cualquier grid */
document.addEventListener('click', function (e) {
  const btn = e.target.closest('[data-add-id]');
  if (!btn) return;
  const id = btn.getAttribute('data-add-id');
  GS.Catalog.load().then(function (data) {
    const item = gsAllItems(data).find(function (p) { return p.id === id; });
    if (!item) return;
    GS.cart.add(item);
    btn.classList.add('is-added');
    setTimeout(function () { btn.classList.remove('is-added'); }, 900);
  });
});

/* ==========================================================================
   Tienda completa (tienda.html)
   ========================================================================== */
(function initShopPage() {
  const grid = document.getElementById('shopGrid');
  if (!grid) return;

  const searchInput = document.getElementById('shopSearch');
  const chipGroup = document.getElementById('shopChips');
  const resultsCount = document.getElementById('shopResultsCount');
  const params = new URLSearchParams(window.location.search);
  let activeCat = params.get('cat') || 'todos';
  let query = '';

  GS.Catalog.load().then(function (data) {
    const items = gsAllItems(data);
    const cats = data.categorias || [];

    if (chipGroup) {
      let chipsHTML = '<button class="chip' + (activeCat === 'todos' ? ' is-active' : '') + '" data-chip="todos">Todos</button>';
      cats.forEach(function (c) {
        chipsHTML += '<button class="chip' + (activeCat === c.id ? ' is-active' : '') + '" data-chip="' + c.id + '">' + c.icono + ' ' + c.nombre + '</button>';
      });
      chipGroup.innerHTML = chipsHTML;
    }

    function render() {
      let filtered = items.filter(function (item) {
        const matchesCat = activeCat === 'todos' || item.categoria === activeCat;
        const haystack = (item.nombre + ' ' + item.descripcion + ' ' + (item.subcategoria || '') + ' ' + (item.marca || '')).toLowerCase();
        const matchesQuery = !query || haystack.indexOf(query.toLowerCase()) !== -1;
        return matchesCat && matchesQuery;
      });

      if (resultsCount) {
        resultsCount.textContent = filtered.length + (filtered.length === 1 ? ' resultado' : ' resultados');
      }

      if (!filtered.length) {
        grid.innerHTML = '<div class="empty-state"><div class="empty-state__icon">🔍</div><p>No encontramos productos o servicios con esos filtros.<br>Escríbenos por WhatsApp y te ayudamos a encontrarlo.</p></div>';
        return;
      }

      grid.innerHTML = filtered.map(function (item) {
        return gsProductCardHTML(item, gsCategoryName(data, item.categoria));
      }).join('');
    }

    if (chipGroup) {
      chipGroup.addEventListener('click', function (e) {
        const chip = e.target.closest('[data-chip]');
        if (!chip) return;
        activeCat = chip.getAttribute('data-chip');
        chipGroup.querySelectorAll('.chip').forEach(function (c) { c.classList.toggle('is-active', c === chip); });
        render();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', function () {
        query = searchInput.value.trim();
        render();
      });
    }

    render();
  });
})();

/* ==========================================================================
   Categorías de productos (productos.html)
   ========================================================================== */
(function initCategoryLanding() {
  const grid = document.getElementById('categoryGrid');
  if (!grid) return;

  GS.Catalog.load().then(function (data) {
    const productCats = (data.categorias || []).filter(function (c) { return c.id.indexOf('eventos') !== 0; });
    grid.innerHTML = productCats.map(function (c) {
      const count = (data.productos || []).filter(function (p) { return p.categoria === c.id; }).length;
      return (
        '<a class="card reveal" href="tienda.html?cat=' + c.id + '">' +
          '<div class="card__icon" aria-hidden="true">' + c.icono + '</div>' +
          '<h3 class="card__title">' + c.nombre + '</h3>' +
          '<p class="card__text">' + c.descripcion + '</p>' +
          '<p class="badge badge--primary mt-md">' + count + ' productos</p>' +
        '</a>'
      );
    }).join('');

    // re-trigger reveal for injected nodes
    if (window.GSReRunReveal) window.GSReRunReveal();
  });
})();

/* ==========================================================================
   Destacados (index.html)
   ========================================================================== */
(function initFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  GS.Catalog.load().then(function (data) {
    const items = gsAllItems(data).filter(function (i) { return i.destacado; }).slice(0, 8);
    grid.innerHTML = items.map(function (item) {
      return gsProductCardHTML(item, gsCategoryName(data, item.categoria));
    }).join('');
  });
})();

/* ==========================================================================
   Tarjetas de tipo de evento (servicios.html)
   ========================================================================== */
(function initEventGrids() {
  const nodes = document.querySelectorAll('[data-event-category]');
  if (!nodes.length) return;

  GS.Catalog.load().then(function (data) {
    nodes.forEach(function (node) {
      const catId = node.getAttribute('data-event-category');
      const items = (data.eventos || []).filter(function (e) { return e.categoria === catId; });
      node.innerHTML = items.map(function (item) {
        return (
          '<div class="event-card">' +
            '<div class="event-card__icon" aria-hidden="true">' + item.icono + '</div>' +
            '<div class="event-card__title">' + item.nombre + '</div>' +
          '</div>'
        );
      }).join('');
    });
  });
})();
