// Navbar scroll state (glass effect on scroll or non-home pages)
(function () {
  var header = document.querySelector('.header');
  if (!header) return;
  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

// Mobile menu toggle
(function () {
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-links');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', function () {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
  });
})();

// Reveal on view (replicates basic framer-motion reveal)
(function () {
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window) || items.length === 0) {
    // Fallback: reveal immediately
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
  items.forEach(function (el) { io.observe(el); });
})();

// Footer year
(function () {
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();

