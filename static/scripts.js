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

// Case studies carousel controls
(function () {
  var carousel = document.querySelector('.cs-carousel');
  if (!carousel) return;
  var prev = document.querySelector('.cs-prev');
  var next = document.querySelector('.cs-next');

  function getSlideWidth() {
    var first = carousel.querySelector('.cs-slide');
    return first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(carousel).columnGap || getComputedStyle(carousel).gap || 16) : carousel.clientWidth * 0.9;
  }

  function scrollByAmount(dir) {
    carousel.scrollBy({ left: dir * getSlideWidth(), behavior: 'smooth' });
  }

  if (prev) prev.addEventListener('click', function () { scrollByAmount(-1); });
  if (next) next.addEventListener('click', function () { scrollByAmount(1); });

  // Keyboard support when focused
  carousel.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { scrollByAmount(1); }
    if (e.key === 'ArrowLeft') { scrollByAmount(-1); }
  });
})();

// Vertical variant keyboard support (ArrowUp/ArrowDown)
(function () {
  var vertical = document.querySelector('.cs-carousel.cs-vertical');
  if (!vertical) return;

  function getStep() {
    return vertical.getBoundingClientRect().height + parseFloat(getComputedStyle(vertical).rowGap || getComputedStyle(vertical).gap || 12);
  }

  function scrollByY(dir) {
    vertical.scrollBy({ top: dir * getStep(), behavior: 'smooth' });
  }

  vertical.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); scrollByY(1); }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); scrollByY(-1); }
    if (e.key === 'Home') { e.preventDefault(); vertical.scrollTo({ top: 0, behavior: 'smooth' }); }
    if (e.key === 'End') { e.preventDefault(); vertical.scrollTo({ top: vertical.scrollHeight, behavior: 'smooth' }); }
  });
})();

// Vertical carousel: seamless looping using head/tail clones
(function () {
  var vertical = document.querySelector('.cs-carousel.cs-vertical');
  if (!vertical) return;
  var slides = Array.prototype.slice.call(vertical.querySelectorAll('.cs-slide'));
  if (slides.length < 2) return; // no need to loop if single slide

  // Clone last → head and first → tail
  var firstClone = slides[0].cloneNode(true);
  var lastClone = slides[slides.length - 1].cloneNode(true);
  vertical.insertBefore(lastClone, vertical.firstChild);
  vertical.appendChild(firstClone);

  var slideHeight = 0;
  function measure() {
    // Each slide fills the container, so height == container height
    slideHeight = vertical.getBoundingClientRect().height;
  }
  measure();
  window.addEventListener('resize', function () {
    var prevIndex = Math.round(vertical.scrollTop / (slideHeight || 1));
    measure();
    // Re-align to nearest snap after resize
    vertical.scrollTo({ top: prevIndex * slideHeight, behavior: 'auto' });
  });

  // Start at first real slide (index 1 due to prepended clone)
  requestAnimationFrame(function () {
    vertical.scrollTop = slideHeight;
  });

  var debounceTimer = null;
  function onScrollEnd() {
    var total = slides.length; // originals count
    var index = Math.round(vertical.scrollTop / (slideHeight || 1));
    if (index <= 0) {
      // Jump to last real slide (index = total)
      vertical.scrollTo({ top: total * slideHeight, behavior: 'auto' });
    } else if (index >= total + 1) {
      // Jump to first real slide (index = 1)
      vertical.scrollTo({ top: slideHeight, behavior: 'auto' });
    }
  }

  vertical.addEventListener('scroll', function () {
    // Debounce to approximate scrollend and maintain snap behavior
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(onScrollEnd, 120);
  }, { passive: true });
})();

// Count-up metrics (homepage)
(function () {
  var counters = document.querySelectorAll('.countup');
  if (!counters || counters.length === 0) return;

  function animate(el) {
    if (el.__counted) return;
    el.__counted = true;
    var endValue = parseFloat(el.getAttribute('data-target')) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = parseInt(el.getAttribute('data-duration') || '1500', 10);
    var startTime = null;

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var current = Math.floor(progress * endValue);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animate);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.2 });

  counters.forEach(function (el) { io.observe(el); });
})();
