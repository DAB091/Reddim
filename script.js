// ========================
// MOBILE MENU TOGGLE
// ========================
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');

menuToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
  menuToggle.textContent = navMobile.classList.contains('open') ? '✕' : '☰';
});

// ========================
// SCROLL ANIMATIONS (Intersection Observer)
// ========================
const animItems = document.querySelectorAll('[data-animate]');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay based on position in list
      const delay = entry.target.classList.contains('post-card')
        ? Array.from(animItems).indexOf(entry.target) * 80
        : 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animItems.forEach(el => observer.observe(el));

// ========================
// NEWSLETTER FORM
// ========================
const newsletterForm = document.getElementById('newsletterForm');
const newsletterConfirm = document.getElementById('newsletterConfirm');

newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  newsletterForm.style.display = 'none';
  newsletterConfirm.classList.add('show');
});

// ========================
// LOAD MORE (simulado)
// ========================
const loadMoreBtn = document.getElementById('loadMore');
const postsColumn = document.querySelector('.posts-column');

const extraPosts = [
  {
    date: '3 de febrero de 2026',
    title: 'Redes de apoyo: la fuerza de lo colectivo',
    excerpt: 'Las comunidades organizadas son el motor de los cambios más profundos. Conocé historias inspiradoras de mujeres que encontraron su fuerza juntas.',
    img: 'https://images.unsplash.com/photo-1556484687-30636164638b?w=600&q=80',
  },
  {
    date: '28 de enero de 2026',
    title: 'Cómo hablar con niños sobre sus derechos',
    excerpt: 'Un lenguaje claro, cercano y empoderador puede marcar la diferencia. Aquí compartimos recursos y consejos prácticos para familias.',
    img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80',
  }
];

let loaded = false;

loadMoreBtn.addEventListener('click', () => {
  if (loaded) return;
  loaded = true;

  extraPosts.forEach((post) => {
    const card = document.createElement('article');
    card.className = 'post-card';
    card.setAttribute('data-animate', '');
    card.innerHTML = `
      <div class="post-img-wrap">
        <img src="${post.img}" alt="${post.title}" loading="lazy"/>
      </div>
      <div class="post-content">
        <time class="post-date">${post.date}</time>
        <h3 class="post-title"><a href="#">${post.title}</a></h3>
        <p class="post-excerpt">${post.excerpt}</p>
        <a href="#" class="read-more">Leer más <span>→</span></a>
      </div>
    `;

    // Insert before the load-more button wrapper
    postsColumn.insertBefore(card, document.querySelector('.load-more-wrap'));
    
    // Trigger animation
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        card.classList.add('visible');
      });
    });

    observer.observe(card);
  });

  loadMoreBtn.textContent = '¡Al día! ✓';
  loadMoreBtn.disabled = true;
  loadMoreBtn.style.opacity = '0.5';
  loadMoreBtn.style.cursor = 'default';
});
