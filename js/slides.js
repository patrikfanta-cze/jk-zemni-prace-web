// Service cards: cross-fade through extra photos listed in data-slides.
// Extra photos load only once the card is on screen; nothing runs with reduced motion.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var cards = document.querySelectorAll('[data-slides]');
  if (!cards.length || !('IntersectionObserver' in window)) return;
  var INTERVAL = 4500;

  function start(card, offset) {
    var first = card.querySelector('img');
    var srcs = card.dataset.slides.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
    var stack = [first];
    srcs.forEach(function (src) {
      var im = document.createElement('img');
      im.src = src; im.alt = ''; im.className = 'slide'; im.decoding = 'async';
      im.style.objectPosition = getComputedStyle(first).objectPosition;
      stack[stack.length - 1].after(im);
      stack.push(im);
    });
    first.classList.add('slide-base');
    var i = 0;
    setTimeout(function tick() {
      if (!document.hidden) {
        var next = (i + 1) % stack.length;
        if (stack[next].complete && stack[next].naturalWidth) {
          stack.forEach(function (im, k) { if (k) im.classList.toggle('on', k === next); });
          i = next;
        }
      }
      setTimeout(tick, INTERVAL);
    }, INTERVAL + offset);
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      io.unobserve(e.target);
      start(e.target, (Array.prototype.indexOf.call(cards, e.target) % 3) * 900);
    });
  }, { rootMargin: '200px' });
  cards.forEach(function (c) { io.observe(c); });
})();
