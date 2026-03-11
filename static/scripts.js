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

  function canScroll(dir) {
    var max = Math.max(0, vertical.scrollHeight - vertical.clientHeight);
    var top = vertical.scrollTop;
    if (dir > 0) { // down
      return top < max - 1; // allow tiny epsilon
    }
    if (dir < 0) { // up
      return top > 1;
    }
    return false;
  }

  function scrollByY(dir) {
    vertical.scrollBy({ top: dir * getStep(), behavior: 'smooth' });
  }

  function scrollPage(dir, isPageKey) {
    var amount = isPageKey ? Math.max(240, Math.floor(window.innerHeight * 0.9)) : 80;
    window.scrollBy({ top: dir * amount, behavior: 'smooth' });
  }

  vertical.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      if (canScroll(1)) { e.preventDefault(); scrollByY(1); }
      else { e.preventDefault(); scrollPage(1, e.key === 'PageDown'); }
      return;
    }
    if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      if (canScroll(-1)) { e.preventDefault(); scrollByY(-1); }
      else { e.preventDefault(); scrollPage(-1, e.key === 'PageUp'); }
      return;
    }
    if (e.key === 'Home') { e.preventDefault(); vertical.scrollTo({ top: 0, behavior: 'smooth' }); }
    if (e.key === 'End') { e.preventDefault(); vertical.scrollTo({ top: vertical.scrollHeight, behavior: 'smooth' }); }
  });

  // When at top/bottom of inner scroller, forward wheel to page
  vertical.addEventListener('wheel', function (e) {
    var dir = e.deltaY > 0 ? 1 : -1;
    if (canScroll(dir)) return; // let inner consume
    e.preventDefault();
    // Use raw delta for natural feel; fallback to viewport step if delta is tiny
    var dy = e.deltaY;
    if (Math.abs(dy) < 1) {
      dy = dir * Math.max(120, Math.floor(window.innerHeight * 0.6));
    }
    window.scrollBy({ top: dy, behavior: 'auto' });
  }, { passive: false });

  // Idle-aware auto-scroll: when visible and idle for 5s, advance one slide
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion) {
    var lastInteraction = Date.now();
    function markInteraction() { lastInteraction = Date.now(); }
    ['scroll', 'wheel', 'keydown', 'touchstart', 'pointerdown'].forEach(function (ev) {
      vertical.addEventListener(ev, markInteraction, { passive: true });
    });

    var inView = false;
    try {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          inView = !!entry.isIntersecting && entry.intersectionRatio >= 0.5;
        });
      }, { threshold: [0.5] });
      io.observe(vertical);
    } catch (_) {
      inView = true; // fallback if IO unsupported
    }

    setInterval(function () {
      if (!inView) return;
      if (Date.now() - lastInteraction < 5000) return;
      if (canScroll(1)) {
        scrollByY(1);
        lastInteraction = Date.now();
      }
    }, 500);
  }
})();

// Logo fallback: if a Simple Icons SVG fails to load, show the text label
(function () {
  var items = document.querySelectorAll('.logo-item img');
  if (!items || items.length === 0) return;
  items.forEach(function (img) {
    img.addEventListener('error', function () {
      var parent = img.closest('.logo-item');
      if (!parent) return;
      parent.classList.add('fallback');
      img.remove();
    }, { once: true });
  });
})();

// JS-driven infinite marquee for single-track rows (left and right)
(function () {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // respect reduce motion
  }
  var marquees = document.querySelectorAll('.logo-marquee');
  if (!marquees || marquees.length === 0) return;

  marquees.forEach(function (marquee) {
    var track = marquee.querySelector('.marquee-track');
    if (!track) return;
    var direction = marquee.classList.contains('dir-right') ? 1 : -1; // 1 => right, -1 => left
    var speed = parseFloat(getComputedStyle(marquee).getPropertyValue('--px-speed')) || 40;
    var gap = parseFloat(getComputedStyle(track).gap || '0') || 0;
    var offset = 0;
    var lastTime = null;
    var paused = false;

    function widthOf(el) {
      var rect = el.getBoundingClientRect();
      return rect.width;
    }

    // Initialize rightward track so we start with a negative offset containing the last item up front
    if (direction === 1 && track.children.length > 0) {
      var last = track.lastElementChild;
      var w = widthOf(last) + gap;
      track.insertBefore(last, track.firstChild);
      offset = -w;
      track.style.transform = 'translateX(' + offset + 'px)';
    }

    marquee.addEventListener('mouseenter', function () { paused = true; });
    marquee.addEventListener('mouseleave', function () { paused = false; });

    function tick(ts) {
      if (paused) { requestAnimationFrame(tick); return; }
      if (lastTime == null) lastTime = ts;
      var dt = (ts - lastTime) / 1000; // seconds
      lastTime = ts;

      offset += direction * speed * dt;

      if (direction === -1) {
        // moving left: recycle first item when fully off to the left
        var first = track.firstElementChild;
        if (first) {
          var need = widthOf(first) + gap;
          while (-offset >= need) {
            track.appendChild(first);
            offset += need;
            first = track.firstElementChild;
            if (!first) break;
            need = widthOf(first) + gap;
          }
        }
      } else {
        // moving right: when content drifts right, prepend last item to keep continuity
        while (offset >= 0 && track.lastElementChild) {
          var lastChild = track.lastElementChild;
          var lw = widthOf(lastChild) + gap;
          track.insertBefore(lastChild, track.firstChild);
          offset -= lw;
        }
      }

      track.style.transform = 'translateX(' + offset + 'px)';
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
})();

// Video modal: open Wistia iframe on click and close on backdrop/ESC
(function () {
  var triggers = document.querySelectorAll('.video-card[data-video]');
  var modal = document.getElementById('video-modal');
  if (!triggers || triggers.length === 0 || !modal) return;
  var iframe = document.getElementById('video-iframe');
  var closeEls = modal.querySelectorAll('[data-close]');

  function open(videoId) {
    if (!iframe) return;
    iframe.src = 'https://fast.wistia.net/embed/iframe/' + encodeURIComponent(videoId) + '?autoplay=1&seo=false';
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    if (!iframe) return;
    iframe.src = '';
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  triggers.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var id = btn.getAttribute('data-video');
      if (!id) return;
      // Inline playback if requested
      if (btn.hasAttribute('data-inline')) {
        if (btn.classList.contains('is-playing')) return;
        // Ensure Wistia API is loaded
        if (!document.querySelector('script[src*="fast.wistia.com/assets/external/E-v1.js"]')) {
          var s = document.createElement('script');
          s.src = 'https://fast.wistia.com/assets/external/E-v1.js';
          s.async = true;
          document.head.appendChild(s);
        }
        window._wq = window._wq || [];
        // Create container for responsive embed
        var embed = document.createElement('div');
        embed.className = 'wistia_embed wistia_async_' + id;
        embed.setAttribute('style', 'height:100%;width:100%');
        embed.setAttribute('videoFoam', 'true');
        // Clear existing children and mount embed container
        while (btn.firstChild) btn.removeChild(btn.firstChild);
        btn.appendChild(embed);
        // Click overlay to toggle play/pause
        var overlay = document.createElement('div');
        overlay.className = 'vc-overlay';
        btn.appendChild(overlay);
        btn.classList.add('is-playing');
        var isPlaying = false;
        window._wq.push({
          id: id,
          onReady: function (video) {
            try { video.play(); isPlaying = true; } catch (e) {}
            // Keep internal state in sync
            if (video.bind) {
              video.bind('play', function(){ isPlaying = true; });
              video.bind('pause', function(){ isPlaying = false; });
            }
            overlay.addEventListener('click', function (e) {
              e.preventDefault();
              try {
                if (isPlaying && video.pause) { video.pause(); }
                else if (video.play) { video.play(); }
              } catch (_) {}
            });
          }
        });
        return;
      }
      // Otherwise open modal
      open(id);
    });
  });

  closeEls.forEach(function (el) {
    el.addEventListener('click', close);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();

// Testimonials arrows - horizontal scroll
(function () {
  var wrap = document.querySelector('.testimonials .t-wrap');
  if (!wrap) return;
  var track = wrap.querySelector('.t-track');
  var prev = wrap.querySelector('.t-prev');
  var next = wrap.querySelector('.t-next');
  if (!track || !prev || !next) return;
  function cardWidth() {
    var first = track.querySelector('.t-card');
    return first ? first.getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || '16') : 320;
  }
  prev.addEventListener('click', function () { track.scrollBy({ left: -cardWidth(), behavior: 'smooth' }); });
  next.addEventListener('click', function () { track.scrollBy({ left: cardWidth(), behavior: 'smooth' }); });
})();

// Testimonials: seamless looping with head/tail clones
(function () {
  var wrap = document.querySelector('.testimonials .t-wrap');
  if (!wrap) return;
  var track = wrap.querySelector('.t-track');
  if (!track) return;

  var gapPx = function () { return parseFloat(getComputedStyle(track).gap || '16'); };
  var step = function () {
    var first = track.querySelector('.t-card');
    return first ? first.getBoundingClientRect().width + gapPx() : 320 + gapPx();
  };

  var originals = Array.prototype.slice.call(track.querySelectorAll('.t-card'));
  if (originals.length === 0) return;

  function visibleCount() {
    var s = step();
    return Math.max(1, Math.round((track.getBoundingClientRect().width + gapPx()) / s));
  }

  var clonesHead = [];
  var clonesTail = [];
  var clonesN = Math.min(originals.length, visibleCount());

  // Create clones
  for (var i = 0; i < clonesN; i++) {
    var tailClone = originals[i].cloneNode(true);
    clonesTail.push(tailClone);
    track.appendChild(tailClone);
  }
  for (var j = 0; j < clonesN; j++) {
    var headClone = originals[originals.length - 1 - j].cloneNode(true);
    clonesHead.push(headClone);
    track.insertBefore(headClone, track.firstChild);
  }

  function setToStart() {
    track.scrollLeft = clonesN * step();
  }
  // Initialize
  setTimeout(setToStart, 0);

  var debounce;
  function onScrollEnd() {
    var s = step();
    var index = Math.round(track.scrollLeft / s);
    var total = originals.length;
    if (index < clonesN) {
      // jumped into head clones → reposition to same item in originals
      track.scrollTo({ left: (index + total) * s, behavior: 'auto' });
    } else if (index >= clonesN + total) {
      // jumped into tail clones → reposition to same item in originals
      track.scrollTo({ left: (index - total) * s, behavior: 'auto' });
    }
  }
  track.addEventListener('scroll', function () {
    clearTimeout(debounce);
    debounce = setTimeout(onScrollEnd, 120);
  }, { passive: true });

  // Keep alignment on resize
  window.addEventListener('resize', function () {
    setToStart();
  });
})();

// Note: Vertical carousel looping removed to keep scroll limited to original slides

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

// Availability text rotator (fade every 3.5s)
(function () {
  var container = document.querySelector('.availability');
  if (!container) return;
  var textEl = container.querySelector('.availability-text');
  if (!textEl) return;

  var phrases = [
    'Available for new projects',
    'Hire Dedicated Developers',
    'CMS Development',
    'Full Stack Development',
    'Artificial Intelligence & ML'
  ];

  var index = 0;
  var duration = 3500; // ms between changes
  var fadeMs = 380; // should match CSS transition ~0.4s

  // Ensure first phrase is set
  textEl.textContent = phrases[index];

  function advance() {
    var nextIndex = (index + 1) % phrases.length;
    textEl.classList.add('fade-out');
    setTimeout(function () {
      textEl.textContent = phrases[nextIndex];
      textEl.classList.remove('fade-out');
      index = nextIndex;
    }, fadeMs);
  }

  // Respect reduced motion: still change text, but no class toggling delays
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    setInterval(function () {
      index = (index + 1) % phrases.length;
      textEl.textContent = phrases[index];
    }, duration);
    return;
  }

  setInterval(advance, duration);
})();
