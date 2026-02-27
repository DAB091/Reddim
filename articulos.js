/**
 * articulos.js
 * ─────────────────────────────────────────────────────────────
 * Lee el array ARTICULOS (data/articulos.js) y construye
 * dinámicamente toda la página de artículos.
 *
 * Mantiene exactamente el mismo HTML/CSS que el original:
 *  • art-featured  →  tarjeta horizontal grande
 *  • art-small     →  grilla de 3 columnas
 *  • Buscador, filtros, orden y paginación funcionales
 * ─────────────────────────────────────────────────────────────
 */

(function () {

  if (typeof ARTICULOS === 'undefined') {
    console.warn('REDIM: no se encontró data/articulos.js');
    return;
  }

  // ── Config ────────────────────────────────────────────────
  const POR_PAGINA = 9;

  const LABELS = {
    derechos: 'Derechos', mujeres: 'Mujeres', educacion: 'Educación',
    infancias: 'Infancias', comunidad: 'Comunidad', salud: 'Salud',
    recursos: 'Recursos'
  };

  // ── Referencias DOM ───────────────────────────────────────
  const featuredContainer = document.getElementById('featuredContainer');
  const artGrid           = document.getElementById('artGrid');
  const filterTagsBar     = document.getElementById('filterTagsBar');
  const catList           = document.getElementById('catList');
  const popularList       = document.getElementById('popularList');
  const noResults         = document.getElementById('noResults');
  const resultsCount      = document.getElementById('resultsCount');
  const searchInput       = document.getElementById('searchInput');
  const searchClear       = document.getElementById('searchClear');
  const sortSelect        = document.getElementById('sortSelect');
  const btnReset          = document.getElementById('btnReset');
  const paginationEl      = document.getElementById('pagination');

  if (!artGrid) return;

  // ── Estado ────────────────────────────────────────────────
  let currentCat    = 'todos';
  let currentSort   = 'reciente';
  let currentSearch = '';
  let currentPage   = 1;

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('categoria')) currentCat = urlParams.get('categoria');

  // ── Helpers ───────────────────────────────────────────────
  function normalize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function catBadge(cat) {
    return `<span class="art-cat-badge ${cat}">${LABELS[cat] || cat}</span>`;
  }

  function htmlFeatured(art) {
    return `
      <article class="art-card art-featured" data-id="${art.id}">
        <div class="art-img-wrap">
          <img src="${art.imagen}" alt="${art.titulo}" />
          <span class="art-tag">Destacado</span>
        </div>
        <div class="art-content">
          <div class="art-meta">
            ${catBadge(art.categoria)}
            <time class="art-date">${art.fechaTexto}</time>
          </div>
          <h2 class="art-title"><a href="${art.url}">${art.titulo}</a></h2>
          <p class="art-excerpt">${art.extracto}</p>
          <div class="art-footer">
            <span class="art-read-time">${art.tiempo} de lectura</span>
            <a href="${art.url}" class="read-more">Leer artículo <span>→</span></a>
          </div>
        </div>
      </article>`;
  }

  function htmlSmall(art) {
    return `
      <article class="art-card art-small" data-id="${art.id}">
        <div class="art-img-wrap">
          <img src="${art.imagen}" alt="${art.titulo}" loading="lazy" />
        </div>
        <div class="art-content">
          <div class="art-meta">
            ${catBadge(art.categoria)}
            <time class="art-date">${art.fechaTexto}</time>
          </div>
          <h3 class="art-title"><a href="${art.url}">${art.titulo}</a></h3>
          <p class="art-excerpt">${art.extracto}</p>
          <div class="art-footer">
            <span class="art-read-time">${art.tiempo}</span>
            <a href="${art.url}" class="read-more">Leer <span>→</span></a>
          </div>
        </div>
      </article>`;
  }

  function getFiltered() {
    const q = normalize(currentSearch.trim());
    let list = ARTICULOS.filter(art => {
      const catOk = currentCat === 'todos' || art.categoria === currentCat;
      const srcOk = !q || normalize(art.titulo).includes(q) || normalize(art.extracto).includes(q);
      return catOk && srcOk;
    });
    list.sort((a, b) => {
      const diff = new Date(b.fecha) - new Date(a.fecha);
      return currentSort === 'reciente' ? diff : -diff;
    });
    return list;
  }

  function render() {
    const filtered = getFiltered();
    const total    = filtered.length;

    if (resultsCount) resultsCount.textContent = total;
    noResults.classList.toggle('visible', total === 0);
    featuredContainer.innerHTML = '';
    artGrid.innerHTML = '';

    if (total === 0) { renderPagination(0, 0); return; }

    const totalPages = Math.ceil(total / POR_PAGINA);
    if (currentPage > totalPages) currentPage = 1;

    const pagina = filtered.slice(
      (currentPage - 1) * POR_PAGINA,
      currentPage * POR_PAGINA
    );

    const destacadoGlobal = ARTICULOS.find(a => a.destacado);
    const mostrarDestacada =
      currentPage === 1 && currentCat === 'todos' &&
      !currentSearch.trim() && destacadoGlobal &&
      pagina[0]?.id === destacadoGlobal.id;

    if (mostrarDestacada) {
      featuredContainer.innerHTML = htmlFeatured(pagina[0]);
      pagina.slice(1).forEach(art => { artGrid.innerHTML += htmlSmall(art); });
    } else {
      pagina.forEach(art => { artGrid.innerHTML += htmlSmall(art); });
    }

    requestAnimationFrame(() => {
      document.querySelectorAll('.art-card').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 55);
      });
    });

    renderPagination(currentPage, totalPages);
  }

  function renderPagination(current, total) {
    if (!paginationEl) return;
    paginationEl.innerHTML = '';
    if (total <= 1) return;

    function btn(label, page, active, disabled) {
      const b = document.createElement('button');
      b.className = 'page-btn' + (active ? ' active' : '');
      b.textContent = label;
      b.disabled = !!disabled;
      if (!disabled) b.addEventListener('click', () => {
        currentPage = page;
        render();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      paginationEl.appendChild(b);
    }

    btn('←', current - 1, false, current === 1);
    for (let i = 1; i <= total; i++) {
      if (total > 5 && i > 2 && i < total - 1 && Math.abs(i - current) > 1) {
        if (i === 3 || i === total - 2) {
          const dots = document.createElement('span');
          dots.className = 'page-dots'; dots.textContent = '…';
          paginationEl.appendChild(dots);
        }
        continue;
      }
      btn(i, i, i === current, false);
    }
    btn('→', current + 1, false, current === total);
  }

  function buildFilters() {
    const counts = { todos: ARTICULOS.length };
    ARTICULOS.forEach(a => { counts[a.categoria] = (counts[a.categoria] || 0) + 1; });
    const cats = ['todos', ...Object.keys(LABELS).filter(c => counts[c])];

    if (filterTagsBar) {
      cats.forEach(cat => {
        const b = document.createElement('button');
        b.className = 'filter-tag' + (cat === currentCat ? ' active' : '');
        b.dataset.cat = cat;
        b.textContent = cat === 'todos' ? 'Todos' : LABELS[cat];
        b.addEventListener('click', () => setCategory(cat));
        filterTagsBar.appendChild(b);
      });
    }

    if (catList) {
      cats.forEach(cat => {
        const li = document.createElement('li');
        const b  = document.createElement('button');
        b.className = 'cat-btn' + (cat === currentCat ? ' active' : '');
        b.dataset.cat = cat;
        b.innerHTML = `${cat === 'todos' ? 'Todos los temas' : LABELS[cat]} <span class="cat-count">${counts[cat]}</span>`;
        b.addEventListener('click', () => setCategory(cat));
        li.appendChild(b); catList.appendChild(li);
      });
    }
  }

  function buildPopular() {
    if (!popularList) return;
    [...ARTICULOS]
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .slice(0, 4)
      .forEach((art, i) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <a href="${art.url}" class="popular-link">
            <span class="popular-num">0${i + 1}</span>
            <span class="popular-title">${art.titulo}</span>
          </a>`;
        popularList.appendChild(li);
      });
  }

  function setCategory(cat) {
    currentCat = cat; currentPage = 1;
    document.querySelectorAll('.filter-tag').forEach(b =>
      b.classList.toggle('active', b.dataset.cat === cat));
    document.querySelectorAll('.cat-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.cat === cat));
    render();
  }

  if (searchInput) searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value; currentPage = 1;
    if (searchClear) searchClear.classList.toggle('visible', currentSearch.length > 0);
    render();
  });
  if (searchClear) searchClear.addEventListener('click', () => {
    searchInput.value = ''; currentSearch = ''; currentPage = 1;
    searchClear.classList.remove('visible'); render();
  });
  if (sortSelect) sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value; currentPage = 1; render();
  });
  if (btnReset) btnReset.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.classList.remove('visible');
    currentSearch = ''; setCategory('todos');
  });

  buildFilters();
  buildPopular();
  render();

})();
