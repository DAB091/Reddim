/* ========================
   ARTÍCULOS — lógica interactiva
======================== */

(function () {

  // ── Referencias ──────────────────────────────────────────
  const searchInput   = document.getElementById('searchInput');
  const searchClear   = document.getElementById('searchClear');
  const filterTags    = document.querySelectorAll('.filter-tag');
  const catBtns       = document.querySelectorAll('.cat-btn');
  const sortSelect    = document.getElementById('sortSelect');
  const artGrid       = document.getElementById('artGrid');
  const noResults     = document.getElementById('noResults');
  const resultsCount  = document.getElementById('resultsCount');
  const btnReset      = document.getElementById('btnReset');

  // Incluye la tarjeta destacada en el conjunto a filtrar
  const featuredCard  = document.querySelector('.art-featured');
  const smallCards    = Array.from(document.querySelectorAll('.art-small'));
  const allCards      = featuredCard ? [featuredCard, ...smallCards] : smallCards;

  let currentCat  = 'todos';
  let currentSort = 'reciente';
  let currentSearch = '';

  // ── Utilidades ────────────────────────────────────────────
  function normalize(str) {
    return str.toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  // ── Filtrar y mostrar ─────────────────────────────────────
  function applyFilters() {
    const query = normalize(currentSearch.trim());

    // Decidir qué cards pasan el filtro
    let visible = allCards.filter(card => {
      const cat   = card.dataset.cat || '';
      const title = normalize(card.dataset.title || '');
      const text  = normalize(card.querySelector('.art-excerpt')?.textContent || '');

      const catOk    = currentCat === 'todos' || cat === currentCat;
      const searchOk = !query || title.includes(query) || text.includes(query);
      return catOk && searchOk;
    });

    // Ordenar
    visible.sort((a, b) => {
      const da = new Date(a.dataset.date);
      const db = new Date(b.dataset.date);
      return currentSort === 'reciente' ? db - da : da - db;
    });

    // Aplicar visibilidad a TODAS las cards
    allCards.forEach(card => {
      card.style.display = 'none';
      card.classList.remove('visible');
    });

    visible.forEach((card, i) => {
      card.style.display = '';
      // Si es small, asegurarse de que esté en el grid
      setTimeout(() => card.classList.add('visible'), i * 60);
    });

    // Mostrar/ocultar mensaje vacío
    noResults.classList.toggle('visible', visible.length === 0);

    // Actualizar contador
    if (resultsCount) resultsCount.textContent = visible.length;
  }

  // ── Sincronizar filtros (tags barra + botones sidebar) ────
  function setCategory(cat) {
    currentCat = cat;

    filterTags.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });
    catBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.cat === cat);
    });

    applyFilters();
  }

  // ── Eventos barra de filtros ───────────────────────────────
  filterTags.forEach(btn => {
    btn.addEventListener('click', () => setCategory(btn.dataset.cat));
  });

  catBtns.forEach(btn => {
    btn.addEventListener('click', () => setCategory(btn.dataset.cat));
  });

  // ── Búsqueda ───────────────────────────────────────────────
  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value;
    searchClear.classList.toggle('visible', currentSearch.length > 0);
    applyFilters();
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    currentSearch = '';
    searchClear.classList.remove('visible');
    applyFilters();
  });

  // ── Ordenar ────────────────────────────────────────────────
  sortSelect.addEventListener('change', () => {
    currentSort = sortSelect.value;
    applyFilters();
  });

  // ── Reset (botón sin resultados) ───────────────────────────
  btnReset.addEventListener('click', () => {
    searchInput.value = '';
    currentSearch = '';
    searchClear.classList.remove('visible');
    setCategory('todos');
  });

  // ── Paginación (decorativa por ahora) ──────────────────────
  document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // ── Init ───────────────────────────────────────────────────
  applyFilters();

})();
