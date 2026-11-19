/* ==========================================================
   Grupo Saneri · Marketing — main.js
   Navegación, animaciones, lista de cotización, catálogo,
   paquetes y cotizador por pasos.
   ========================================================== */
(function(){
  'use strict';
  var S = window.SANERI, ICONS = window.ICONS || {}, CAT = window.CATALOGO || [], CATS = window.CATEGORIAS || [], PKGS = window.PAQUETES || [];
  var KEY_ITEMS = 'saneri_mkt_items', KEY_FORM = 'saneri_mkt_form', KEY_ID = 'saneri_mkt_id';

  function $(s, c){ return (c||document).querySelector(s); }
  function $$(s, c){ return Array.prototype.slice.call((c||document).querySelectorAll(s)); }
  function icon(name, extra){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"'+(extra||'')+'>'+(ICONS[name]||ICONS.sparkles)+'</svg>'; }
  function cap(t){ t = String(t||''); return t.charAt(0).toUpperCase() + t.slice(1); }
  function esc(t){ return String(t==null?'':t).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function byId(id){ for(var i=0;i<CAT.length;i++) if(CAT[i].id===id) return CAT[i]; return null; }
  function load(k, d){ try{ var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; }catch(e){ return d; } }
  function save(k, v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} }

  /* ---------- Analítica: GA4 + GTM (dataLayer) + Microsoft Clarity ---------- */
  var PAGE = (document.body && document.body.getAttribute('data-page')) || 'marketing';
  function track(ev, params){
    params = params || {}; params.page_section = params.page_section || PAGE;
    try{ if(typeof window.gtag === 'function') window.gtag('event', ev, params); }catch(e){}
    try{ (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: 'saneri_' + ev }, params)); }catch(e){}
    try{ if(typeof window.clarity === 'function') window.clarity('event', ev); }catch(e){}
  }
  window.saneriTrack = track;
  try{ if(typeof window.clarity === 'function'){ window.clarity('set', 'seccion', 'marketing'); window.clarity('set', 'pagina', PAGE); } }catch(e){}
  document.addEventListener('click', function(e){
    var a = e.target.closest('a,button'); if(!a) return;
    var href = a.getAttribute('href') || '', where = a.getAttribute('data-track') || (a.closest('section,header,footer,nav') || {}).className || '';
    where = String(where).split(' ')[0];
    if(href.indexOf('wa.me') > -1) track('click_whatsapp', { link_location: where });
    else if(href.indexOf('tel:') === 0) track('click_call', { link_location: where });
    else if(href.indexOf('mailto:') === 0) track('click_email', { link_location: where });
    else if(href.indexOf('cotizar.html') > -1) track('cta_cotizar', { link_location: where, link_text: (a.textContent||'').trim().slice(0,40) });
  }, true);
  document.addEventListener('toggle', function(e){ var d = e.target; if(d.tagName === 'DETAILS' && d.open){ var q = d.querySelector('summary'); track('faq_open', { question: q ? q.textContent.trim().slice(0,90) : '' }); } }, true);

  /* ---------- Iconos declarativos: <span data-icon="x"> ---------- */
  $$('[data-icon]').forEach(function(el){ el.innerHTML = icon(el.getAttribute('data-icon')); });

  /* ---------- Año ---------- */
  $$('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

  /* ---------- Header ---------- */
  var header = $('.header');
  function onScroll(){ if(header) header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  var burger = $('.burger'), mnav = $('.mobile-nav');
  if(burger && mnav){
    burger.addEventListener('click', function(){
      var open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      mnav.classList.toggle('is-open', !open);
      document.body.style.overflow = open ? '' : 'hidden';
    });
    $$('a', mnav).forEach(function(a){ a.addEventListener('click', function(){ burger.click(); }); });
  }

  /* ---------- Reveal ---------- */
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('is-in'); io.unobserve(e.target); } }); }, {threshold:.12, rootMargin:'0px 0px -40px 0px'});
    $$('.reveal').forEach(function(el){ io.observe(el); });
  } else { $$('.reveal').forEach(function(el){ el.classList.add('is-in'); }); }

  /* ---------- Lista de cotización (store) ---------- */
  var items = load(KEY_ITEMS, {});
  function count(){ var n=0; for(var k in items) if(items[k]>0) n++; return n; }
  function setItem(id, q){ q = Math.max(0, Math.min(9999, parseInt(q,10)||0)); if(q>0) items[id]=q; else delete items[id]; save(KEY_ITEMS, items); refreshBadges(); document.dispatchEvent(new CustomEvent('items:change')); }
  function refreshBadges(){ var c = count(); $$('[data-quote-count]').forEach(function(b){ b.textContent = c; b.setAttribute('data-count', c); }); }
  refreshBadges();

  /* ---------- Toast ---------- */
  var toastEl, toastT;
  function toast(msg, withLink){
    if(!toastEl){ toastEl = document.createElement('div'); toastEl.className='toast'; toastEl.setAttribute('role','status'); document.body.appendChild(toastEl); }
    toastEl.innerHTML = '<span>'+msg+'</span>' + (withLink ? '<a href="cotizar.html#paso-3">Ver mi propuesta →</a>' : '');
    toastEl.classList.add('is-shown'); clearTimeout(toastT);
    toastT = setTimeout(function(){ toastEl.classList.remove('is-shown'); }, 3600);
  }

  /* ---------- Formulario rápido (hero) ---------- */
  var quick = $('#quick-form');
  if(quick){
    quick.addEventListener('submit', function(e){
      e.preventDefault();
      var f = load(KEY_FORM, {});
      ['tipo','objetivo','presupuesto'].forEach(function(n){ var el = quick.elements[n]; if(el && el.value) f[n] = el.value; });
      save(KEY_FORM, f);
      track('quick_quote_submit', { business_type: f.tipo || '', goal: f.objetivo || '' });
      location.href = 'cotizar.html';
    });
  }
  /* Rellenar selects de tipo de evento */
  $$('select[data-tipos]').forEach(function(sel){
    var html = '<option value="">Selecciona…</option>';
    Object.keys(window.TIPOS_EVENTO).forEach(function(g){
      html += '<optgroup label="'+g+'">' + window.TIPOS_EVENTO[g].map(function(t){ return '<option>'+t+'</option>'; }).join('') + '</optgroup>';
    });
    sel.innerHTML = html;
  });

  /* ---------- Catálogo (alquiler.html) ---------- */
  var catalogEl = $('#catalogo');
  if(catalogEl){
    var chipsEl = $('#chips'), searchEl = $('#search'), current = 'todos';
    var params = new URLSearchParams(location.search); if(params.get('cat')) current = params.get('cat');
    chipsEl.innerHTML = '<button class="chip" data-cat="todos" aria-pressed="false">Todo</button>' + CATS.map(function(c){ return '<button class="chip" data-cat="'+c.id+'" aria-pressed="false">'+esc(c.nombre)+'</button>'; }).join('');

    function card(it){
      var q = items[it.id] || 0;
      return '<article class="item'+(q?' is-added':'')+'" data-id="'+it.id+'">' +
        '<div class="item__media'+(it.img?' has-img':'')+'">'+(it.tag?'<span class="tag">'+esc(it.tag)+'</span>':'')+icon(it.icon)+(it.img?'<img src="'+window.IMG(it.img,520)+'" alt="'+esc(it.nombre)+'" loading="lazy" decoding="async" onerror="this.remove()">':'')+'</div>' +
        '<div class="item__body"><h3>'+esc(it.nombre)+'</h3><p>'+esc(it.desc)+'</p>' +
        '<div class="item__meta">'+esc(cap(it.unidad))+' · Precio según cotización</div>' +
        '<div class="item__actions"><div class="qty"><button type="button" data-step="-1" aria-label="Menos">−</button><input type="number" min="1" value="'+(q||1)+'" aria-label="Cantidad de '+esc(it.nombre)+'"><button type="button" data-step="1" aria-label="Más">+</button></div>' +
        '<button type="button" class="btn btn--navy" data-add>'+(q?'✓ En propuesta':'Agregar')+'</button></div></div></article>';
    }
    function render(){
      var term = (searchEl.value||'').trim().toLowerCase();
      $$('.chip', chipsEl).forEach(function(c){ c.setAttribute('aria-pressed', String(c.getAttribute('data-cat')===current)); });
      var html = '', total = 0;
      CATS.forEach(function(c){
        if(current!=='todos' && current!==c.id) return;
        var list = CAT.filter(function(it){ return it.cat===c.id && (!term || (it.nombre+' '+it.desc).toLowerCase().indexOf(term)>-1); });
        if(!list.length) return; total += list.length;
        html += '<section class="cat-block" id="'+c.id+'"><div class="cat-block__head"><div><span class="eyebrow">'+list.length+' servicios</span><h2>'+esc(c.nombre)+'</h2><p>'+esc(c.desc)+'</p></div></div><div class="grid g4">'+list.map(card).join('')+'</div></section>';
      });
      catalogEl.innerHTML = total ? html : '<div class="empty"><p><strong>No encontramos “'+esc(term)+'”.</strong></p><p>Escríbenos por WhatsApp y te asesoramos: armamos soluciones a la medida de tu negocio.</p></div>';
    }
    chipsEl.addEventListener('click', function(e){ var b = e.target.closest('.chip'); if(!b) return; current = b.getAttribute('data-cat'); track('filter_category', { category: current }); history.replaceState(null,'', current==='todos'?'alquiler.html':'alquiler.html?cat='+current); render(); });
    var sT; searchEl.addEventListener('input', function(){ render(); clearTimeout(sT); var v = searchEl.value.trim(); if(v.length > 2) sT = setTimeout(function(){ track('search', { search_term: v }); }, 1200); });
    catalogEl.addEventListener('click', function(e){
      var art = e.target.closest('.item'); if(!art) return;
      var inp = $('input', art), st = e.target.closest('[data-step]');
      if(st){ inp.value = Math.max(1, (parseInt(inp.value,10)||1) + parseInt(st.getAttribute('data-step'),10)); if(items[art.dataset.id]) setItem(art.dataset.id, inp.value); return; }
      if(e.target.closest('[data-add]')){
        var it = byId(art.dataset.id); setItem(it.id, inp.value);
        art.classList.add('is-added'); $('[data-add]', art).textContent = '✓ En propuesta';
        toast('<strong>'+esc(it.nombre)+'</strong> × '+inp.value+' agregado', true);
        track('add_to_quote', { item_id: it.id, item_name: it.nombre, item_category: it.cat, quantity: parseInt(inp.value,10)||1 });
      }
    });
    catalogEl.addEventListener('change', function(e){ var art = e.target.closest('.item'); if(art && items[art.dataset.id]) setItem(art.dataset.id, e.target.value); });
    render();
  }

  /* ---------- Paquetes ---------- */
  var pkgEl = $('#paquetes');
  if(pkgEl){
    var limit = parseInt(pkgEl.getAttribute('data-limit'),10) || PKGS.length;
    pkgEl.innerHTML = PKGS.slice(0, limit).map(function(p){
      return '<article class="pkg reveal is-in'+(p.destacado?' pkg--featured':'')+'">' + (p.destacado?'<span class="pkg__tag">Más solicitado</span>':'') + (p.img?'<div class="pkg__img"><img src="'+window.IMG(p.img,720)+'" alt="'+esc(p.nombre)+'" loading="lazy" decoding="async"></div>':'') +
        '<div class="pkg__for">'+esc(p.para)+'</div><h3>'+esc(p.nombre)+'</h3><p class="pkg__desc">'+esc(p.desc)+'</p>' +
        '<div class="pkg__price">Precio según cotización</div>' +
        '<ul class="checklist">'+p.incluye.map(function(i){ return '<li>'+esc(i)+'</li>'; }).join('')+'</ul>' +
        '<button type="button" class="btn '+(p.destacado?'btn--brass':'btn--navy')+' btn--block" data-pkg="'+p.id+'">Cotizar este plan</button></article>';
    }).join('');
    pkgEl.addEventListener('click', function(e){
      var b = e.target.closest('[data-pkg]'); if(!b) return;
      var p = PKGS.filter(function(x){ return x.id===b.getAttribute('data-pkg'); })[0];
      items = {}; for(var k in p.items) items[k] = p.items[k]; save(KEY_ITEMS, items);
      track('select_package', { package_id: p.id, package_name: p.nombre });
      var f = load(KEY_FORM, {}); f.paquete = p.nombre; if(!f.tipo) f.tipo = p.tipo; save(KEY_FORM, f);
      location.href = 'cotizar.html';
    });
  }

  /* ---------- Diagnóstico de marketing (diagnostico.html) ---------- */
  var diagEl = $('#diag');
  if(diagEl){
    var QS = window.DIAGNOSTICO || [], ans = [], started = false;
    var OPTS = [['Sí',10],['A medias',5],['No',0]];
    $('#diag-q').innerHTML = QS.map(function(q,i){
      return '<fieldset class="dq" data-i="'+i+'"><legend><span class="dq__n">'+(i+1)+'</span>'+esc(q.q)+'<small>'+esc(q.area)+'</small></legend><div class="dq__opts">' +
        OPTS.map(function(o){ return '<label><input type="radio" name="q'+i+'" value="'+o[1]+'"><span>'+o[0]+'</span></label>'; }).join('') + '</div></fieldset>';
    }).join('');
    function progress(){ var n = ans.filter(function(v){ return v!=null; }).length; $('#diag-bar').style.width = (n/QS.length*100)+'%'; $('#diag-count').textContent = n+' de '+QS.length; $('#diag-go').disabled = n < QS.length; }
    diagEl.addEventListener('change', function(e){
      var f = e.target.closest('.dq'); if(!f) return;
      if(!started){ started = true; track('diag_start', {}); }
      ans[+f.getAttribute('data-i')] = +e.target.value; f.classList.add('is-done'); progress();
      var next = f.nextElementSibling; if(next && window.innerWidth < 760) setTimeout(function(){ next.scrollIntoView({behavior:'smooth', block:'center'}); }, 150);
    });
    var recIds = [];
    $('#diag-go').addEventListener('click', function(){
      var score = ans.reduce(function(a,b){ return a+(b||0); }, 0);
      var lvl = score >= 80 ? ['Avanzado','Tu marketing tiene bases sólidas. El siguiente paso es optimizar con datos y escalar lo que ya funciona.'] :
                score >= 50 ? ['En crecimiento','Vas por buen camino, pero hay áreas clave que te están haciendo perder clientes y ventas.'] :
                              ['Inicial','Hay una gran oportunidad: con algunos pasos básicos tu negocio puede verse más profesional y atraer más clientes.'];
      var weak = []; recIds = [];
      QS.forEach(function(q,i){ if(ans[i] < 10){ weak.push(q.area + (ans[i]===0?' (pendiente)':' (por mejorar)')); q.rec.forEach(function(r){ if(recIds.indexOf(r) < 0 && (ans[i]===0 || recIds.length < 6)) recIds.push(r); }); } });
      recIds = recIds.slice(0, 6);
      $('#diag-score').textContent = score; $('#diag-level').textContent = lvl[0]; $('#diag-text').textContent = lvl[1];
      $('#diag-ring').style.setProperty('--p', score);
      $('#diag-weak').innerHTML = weak.length ? weak.map(function(w){ return '<li>'+esc(w)+'</li>'; }).join('') : '<li>¡Excelente! No encontramos áreas débiles.</li>';
      $('#diag-recs').innerHTML = recIds.map(function(id){ var it = byId(id); if(!it) return '';
        return '<div class="rec"><div class="rec__img">'+(it.img?'<img src="'+window.IMG(it.img,320)+'" alt="'+esc(it.nombre)+'" loading="lazy">':icon(it.icon))+'</div><div><strong>'+esc(it.nombre)+'</strong><small>'+esc(it.desc)+'</small></div></div>'; }).join('');
      var f = load(KEY_FORM, {}); f.diagnostico = score + '/100 · ' + lvl[0]; save(KEY_FORM, f);
      $('#diag-result').hidden = false; $('#diag-result').scrollIntoView({behavior:'smooth'});
      var wmsg = '*Resultado de mi diagnóstico de marketing*\nPuntaje: *'+score+'/100* ('+lvl[0]+')\n\n*Áreas por mejorar:*\n'+weak.map(function(w){ return '• '+w; }).join('\n')+'\n\nQuiero una propuesta de Grupo Saneri.';
      $('#diag-wa').href = 'https://wa.me/'+S.whatsapp+'?text='+encodeURIComponent(wmsg);
      track('diag_complete', { score: score, level: lvl[0] });
      try{ if(typeof window.clarity==='function'){ window.clarity('set','diagnostico', String(score)); } }catch(e){}
    });
    $('#diag-add').addEventListener('click', function(){ recIds.forEach(function(id){ if(!items[id]) setItem(id, 1); }); track('add_recommendations', { count: recIds.length }); location.href = 'cotizar.html'; });
    $('#diag-reset').addEventListener('click', function(){ ans = []; $$('input[type=radio]', diagEl).forEach(function(r){ r.checked = false; }); $$('.dq', diagEl).forEach(function(f){ f.classList.remove('is-done'); }); $('#diag-result').hidden = true; progress(); window.scrollTo({top: diagEl.offsetTop - 120, behavior:'smooth'}); });
    progress();
  }

  /* ---------- Cotizador ---------- */
  var wiz = $('#cotizador');
  if(wiz){
    var form = load(KEY_FORM, {}), qid = load(KEY_ID, null);
    if(!qid){ var d = new Date(); qid = 'GS-MK-' + String(d.getFullYear()).slice(2) + ('0'+(d.getMonth()+1)).slice(-2) + ('0'+d.getDate()).slice(-2) + '-' + Math.random().toString(36).slice(2,6).toUpperCase(); save(KEY_ID, qid); }
    $('#q-id').textContent = qid;
    var steps = $$('.fstep', wiz), tabs = $$('.stepper button'), cur = 0;

    /* restaurar campos */
    $$('input,select,textarea', wiz).forEach(function(el){
      if(!el.name) return;
      if(el.type==='checkbox'){ el.checked = (form[el.name]||[]).indexOf(el.value)>-1; }
      else if(form[el.name]!=null){ el.value = form[el.name]; }
    });
    if(form.paquete){ var pn = $('#pkg-note'); if(pn){ pn.hidden=false; $('strong', pn).textContent = form.paquete; } }
    var minDate = new Date(); minDate.setDate(minDate.getDate()+1); var fd = $('[name=fecha]', wiz); if(fd) fd.min = minDate.toISOString().slice(0,10);

    function collect(){
      $$('input,select,textarea', wiz).forEach(function(el){ if(el.name && el.type!=='checkbox') form[el.name] = el.value.trim(); });
      var groups = {}; $$('input[type=checkbox]', wiz).forEach(function(c){ groups[c.name] = groups[c.name] || []; if(c.checked) groups[c.name].push(c.value); }); for(var g in groups) form[g] = groups[g];
      save(KEY_FORM, form); summary();
    }
    wiz.addEventListener('input', collect); wiz.addEventListener('change', collect);

    function validate(i){
      var ok = true;
      $$('[required]', steps[i]).forEach(function(el){
        var f = el.closest('.field'), bad = !el.value.trim() || (el.type==='email' && el.value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value)) || (el.name==='telefono' && el.value.replace(/\D/g,'').length<8);
        if(f) f.classList.toggle('is-invalid', bad); if(bad && ok){ el.focus(); ok = false; }
      });
      return ok;
    }
    function go(i, force){
      if(i>cur && !force){ for(var k=cur;k<i;k++){ if(!validate(k)){ i=k; break; } } }
      cur = Math.max(0, Math.min(steps.length-1, i));
      steps.forEach(function(s,k){ s.classList.toggle('is-active', k===cur); });
      tabs.forEach(function(t,k){ if(k===cur) t.setAttribute('aria-current','step'); else t.removeAttribute('aria-current'); t.classList.toggle('is-done', k<cur); });
      $('#q-back').style.visibility = cur===0 ? 'hidden' : 'visible';
      $('#q-next').hidden = cur===steps.length-1;
      $$('.q-send').forEach(function(b){ b.hidden = cur!==steps.length-1; });
      if(history.replaceState) history.replaceState(null,'','#paso-'+(cur+1));
      if(!force) track('quote_step', { step: cur+1 });
      var top = $('.stepper'); if(top && !force && window.scrollY > top.getBoundingClientRect().top + window.scrollY) top.scrollIntoView({behavior:'smooth'});
    }
    tabs.forEach(function(t,k){ t.addEventListener('click', function(){ go(k); }); });
    $('#q-next').addEventListener('click', function(){ go(cur+1); });
    $('#q-back').addEventListener('click', function(){ go(cur-1); });

    /* tabla de artículos */
    var tbody = $('#cart-body'), addSel = $('#add-select');
    addSel.innerHTML = '<option value="">Agregar artículo del catálogo…</option>' + CATS.map(function(c){ return '<optgroup label="'+esc(c.nombre)+'">' + CAT.filter(function(it){ return it.cat===c.id; }).map(function(it){ return '<option value="'+it.id+'">'+esc(it.nombre)+'</option>'; }).join('') + '</optgroup>'; }).join('');
    function renderCart(){
      var ids = Object.keys(items);
      $('#cart-empty').hidden = !!ids.length; $('#cart-table').hidden = !ids.length;
      tbody.innerHTML = ids.map(function(id){ var it = byId(id); if(!it) return '';
        return '<tr data-id="'+id+'"><td><strong>'+esc(it.nombre)+'</strong><small>'+esc(cap(it.unidad))+'</small></td><td><div class="qty"><button type="button" data-step="-1" aria-label="Menos">−</button><input type="number" min="1" value="'+items[id]+'" aria-label="Cantidad"><button type="button" data-step="1" aria-label="Más">+</button></div></td><td style="text-align:right"><button type="button" class="link-btn" data-del>Quitar</button></td></tr>'; }).join('');
      summary();
    }
    tbody.addEventListener('click', function(e){
      var tr = e.target.closest('tr'); if(!tr) return; var id = tr.dataset.id, st = e.target.closest('[data-step]');
      if(st){ setItem(id, Math.max(1, (items[id]||1) + parseInt(st.getAttribute('data-step'),10))); renderCart(); }
      if(e.target.closest('[data-del]')){ setItem(id, 0); renderCart(); }
    });
    tbody.addEventListener('change', function(e){ var tr = e.target.closest('tr'); if(tr){ setItem(tr.dataset.id, Math.max(1, parseInt(e.target.value,10)||1)); renderCart(); } });
    $('#add-btn').addEventListener('click', function(){ if(!addSel.value) return; var q = parseInt($('#add-qty').value,10)||1; setItem(addSel.value, (items[addSel.value]||0)+q); addSel.value=''; $('#add-qty').value=1; renderCart(); });
    $('#clear-cart').addEventListener('click', function(){ if(!Object.keys(items).length) return; items = {}; save(KEY_ITEMS, items); refreshBadges(); renderCart(); });

    /* resumen lateral */
    function fmtDate(v){ if(!v) return ''; var p = v.split('-'); return p[2]+'/'+p[1]+'/'+p[0]; }
    function summary(){
      var dl = [['Negocio', form.negocio],['Rubro', form.tipo],['Tamaño', form.tamano],['Ubicación', form.ciudad],['Inicio', form.inicio],['Presupuesto', form.presupuesto],['Plan', form.paquete],['Diagnóstico', form.diagnostico]].filter(function(r){ return r[1]; });
      $('#sum-event').innerHTML = dl.length ? dl.map(function(r){ return '<dt>'+r[0]+'</dt><dd>'+esc(r[1])+'</dd>'; }).join('') : '<dt class="sum-empty" style="grid-column:1/-1">Completa los datos de tu negocio.</dt>';
      var sv = (form.objetivos||[]);
      $('#sum-serv').innerHTML = sv.length ? sv.map(function(s){ return '<li><span>'+esc(s)+'</span><span>✓</span></li>'; }).join('') : '<li class="sum-empty">Sin objetivos seleccionados</li>';
      var ids = Object.keys(items);
      $('#sum-items').innerHTML = ids.length ? ids.map(function(id){ var it = byId(id); return it ? '<li><span>'+esc(it.nombre)+'</span><span>× '+items[id]+'</span></li>' : ''; }).join('') : '<li class="sum-empty">Sin servicios en tu propuesta</li>';
    }

    /* mensaje */
    function message(rich){
      var b = rich ? function(t){ return '*'+t+'*'; } : function(t){ return t.toUpperCase(); };
      var L = [];
      L.push((rich?'📣 ':'') + b('SOLICITUD DE PROPUESTA · MARKETING'));
      L.push('Grupo Saneri · Ref. ' + qid); L.push('');
      L.push(b('Mi negocio'));
      [['Negocio',form.negocio],['Rubro',form.tipo],['Tamaño',form.tamano],['Ubicación',form.ciudad],['Etapa',form.etapa],['Web / redes',form.web],['Plan de interés',form.paquete],['Diagnóstico',form.diagnostico]].forEach(function(r){ if(r[1]) L.push('• '+r[0]+': '+r[1]); });
      if((form.objetivos||[]).length){ L.push(''); L.push(b('Objetivos')); form.objetivos.forEach(function(s){ L.push('• '+s); }); }
      if((form.canales||[]).length){ L.push(''); L.push(b('Canales que ya uso')); L.push(form.canales.join(', ')); }
      var ids = Object.keys(items);
      if(ids.length){ L.push(''); L.push(b('Servicios de interés')); ids.forEach(function(id){ var it = byId(id); if(it) L.push('• '+it.nombre+(items[id]>1?' × '+items[id]:'')+' ('+it.unidad+')'); }); }
      L.push(''); L.push(b('Contacto'));
      [['Nombre',form.nombre],['Cargo',form.cargo],['Teléfono',form.telefono],['Correo',form.correo],['Presupuesto mensual',form.presupuesto],['¿Cuándo empezar?',form.inicio],['Prefiere contacto por',form.preferencia],['Nos conoció por',form.origen]].forEach(function(r){ if(r[1]) L.push('• '+r[0]+': '+r[1]); });
      if(form.comentarios){ L.push(''); L.push(b('Comentarios')); L.push(form.comentarios); }
      return L.join('\n');
    }
    function leadParams(method){ return { method: method, lead_id: qid, business_type: form.tipo || '', budget: form.presupuesto || '', goals_count: (form.objetivos||[]).length, items_count: Object.keys(items).length, package_name: form.paquete || '' }; }
    function done(method){ $('#q-result').classList.add('is-shown'); track('generate_lead', leadParams(method)); try{ if(typeof window.clarity==='function'){ window.clarity('set','lead','si'); window.clarity('upgrade','lead'); } }catch(e){} }
    $('#send-wa').addEventListener('click', function(){ collect(); if(!validate(steps.length-1)) return; window.open('https://wa.me/'+S.whatsapp+'?text='+encodeURIComponent(message(true)), '_blank', 'noopener'); done('whatsapp'); });
    $('#send-mail').addEventListener('click', function(){ collect(); if(!validate(steps.length-1)) return; location.href = 'mailto:'+S.email+'?subject='+encodeURIComponent('Propuesta de marketing '+qid+(form.negocio?' · '+form.negocio:''))+'&body='+encodeURIComponent(message(false)); done('email'); });
    $('#print-q').addEventListener('click', function(){ collect(); track('print_quote', { lead_id: qid }); window.print(); });
    $('#new-q').addEventListener('click', function(){ try{ localStorage.removeItem(KEY_FORM); localStorage.removeItem(KEY_ITEMS); localStorage.removeItem(KEY_ID); }catch(e){} location.href = 'cotizar.html'; });

    renderCart(); summary();
    var m = location.hash.match(/paso-(\d)/); go(m ? parseInt(m[1],10)-1 : 0, true);
  }
})();
