// ========================
// MOBILE MENU TOGGLE
// ========================
const menuToggle = document.getElementById('menuToggle');
const navMobile  = document.getElementById('navMobile');

if (menuToggle && navMobile) {
  menuToggle.addEventListener('click', () => {
    navMobile.classList.toggle('open');
    menuToggle.textContent = navMobile.classList.contains('open') ? '✕' : '☰';
  });
}

// ========================
// SCROLL ANIMATIONS (Intersection Observer)
// Nota: se expone como variable global "observer" para que
// home.js pueda observar las tarjetas que genera dinámicamente.
// ========================
const animItems = document.querySelectorAll('[data-animate]');

var observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const delay = entry.target.classList.contains('post-card')
        ? Array.from(document.querySelectorAll('[data-animate]')).indexOf(entry.target) * 80
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
const newsletterForm    = document.getElementById('newsletterForm');
const newsletterConfirm = document.getElementById('newsletterConfirm');

if (newsletterForm && newsletterConfirm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    newsletterForm.style.display = 'none';
    newsletterConfirm.classList.add('show');
  });
}
