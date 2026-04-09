/**
 * home.js
 * ─────────────────────────────────────────────────────────────
 * Lee el array ARTICULOS (data/articulos.js) y construye
 * automáticamente las tarjetas del index.html.
 *
 * Muestra:
 *   • 1 tarjeta grande (la marcada destacado:true, o la más reciente)
 *   • Las 3 siguientes más recientes como tarjetas normales
 *
 * El botón "Ver más entradas" fue reemplazado en el HTML por
 * un link a articulos.html, así que este archivo ya no necesita
 * el "loadMore" anterior.
 * ─────────────────────────────────────────────────────────────
 */

(function () {

  if (typeof ARTICULOS === 'undefined') {
    console.warn('REDIM: no se encontró data/articulos.js');
    return;
  }

  const container = document.getElementById('homePostsContainer');
  const tagsCloud = document.getElementById('tagsCloud');
  if (!container) return;

  // ── Etiquetas legibles ─────────────────────────────────────
  const LABELS = {
    derechos: 'Derechos', mujeres: 'Mujeres', educacion: 'Educación',
    infancias: 'Infancias', comunidad: 'Comunidad', salud: 'Salud',
    recursos: 'Recursos', justicia: 'Justicia'
  };

  // ── Ordenar por fecha descendente ─────────────────────────
  const ordenados = [...ARTICULOS].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  // ── Elegir destacado y los 3 siguientes ───────────────────
  const destacado = ordenados.find(a => a.destacado) || ordenados[0];
  const recientes = ordenados.filter(a => a.id !== destacado.id).slice(0, 3);

  // ── Tarjeta destacada (igual al HTML original) ────────────
  const featuredEl = document.createElement('article');
  featuredEl.className = 'post-card featured';
  featuredEl.setAttribute('data-animate', '');
  featuredEl.innerHTML = `
    <div class="post-img-wrap">
      <img src="${destacado.imagen}" alt="${destacado.titulo}" onerror="this.style.display='none'; this.parentElement.classList.add('img-fallback');" />
      <span class="post-tag">Destacado</span>
    </div>
    <div class="post-content">
      <time class="post-date">${destacado.fechaTexto}</time>
      <h3 class="post-title">
        <a href="${destacado.url}">${destacado.titulo}</a>
      </h3>
      <p class="post-excerpt">${destacado.extracto}</p>
      <a href="${destacado.url}" class="read-more">Leer más <span>→</span></a>
    </div>
  `;
  container.appendChild(featuredEl);

  // ── Tarjetas normales (igual al HTML original) ────────────
  recientes.forEach(art => {
    const card = document.createElement('article');
    card.className = 'post-card';
    card.setAttribute('data-animate', '');
    card.innerHTML = `
      <div class="post-img-wrap">
        <img src="${art.imagen}" alt="${art.titulo}" loading="lazy" onerror="this.style.display='none'; this.parentElement.classList.add('img-fallback');" />
      </div>
      <div class="post-content">
        <time class="post-date">${art.fechaTexto}</time>
        <h3 class="post-title">
          <a href="${art.url}">${art.titulo}</a>
        </h3>
        <p class="post-excerpt">${art.extracto}</p>
        <a href="${art.url}" class="read-more">Leer más <span>→</span></a>
      </div>
    `;
    container.appendChild(card);
  });

  // ── Tags dinámicos en la sidebar ──────────────────────────
  if (tagsCloud) {
    tagsCloud.innerHTML = '';
    const cats = [...new Set(ARTICULOS.map(a => a.categoria))];
    cats.forEach(cat => {
      const a = document.createElement('a');
      a.href = `./articulos.html?categoria=${cat}`;
      a.className = 'tag';
      a.textContent = LABELS[cat] || cat;
      tagsCloud.appendChild(a);
    });
  }

  // ── Re-observar los nuevos elementos para la animación ────
  // El observer de script.js ya está corriendo; sólo hay que
  // pasarle los elementos recién creados.
  // Usamos un pequeño delay para asegurar que script.js
  // ya inicializó el observer.
  setTimeout(() => {
    const newCards = container.querySelectorAll('[data-animate]');
    if (typeof observer !== 'undefined') {
      newCards.forEach(el => {
        if (!el.classList.contains('visible')) observer.observe(el);
      });
    } else {
      newCards.forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 80);
      });
    }
  }, 200);

})();
