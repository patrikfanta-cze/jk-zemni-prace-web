// Galerie: year, mobile menu, lightbox with keyboard + swipe (no external libraries)
document.getElementById('y').textContent = new Date().getFullYear();
const burger = document.querySelector('.burger'), menu = document.querySelector('.menu');
burger.addEventListener('click', () => burger.setAttribute('aria-expanded', menu.classList.toggle('open')));

const lb = document.querySelector('.lightbox');
const lbImg = lb.querySelector('img'), lbCap = lb.querySelector('.lb-cap');
let list = [], idx = 0, opener = null;

function show(i) {
  idx = (i + list.length) % list.length;
  const b = list[idx], img = b.querySelector('img');
  lbImg.src = b.dataset.full;
  lbImg.alt = img.alt;
  lbCap.textContent = img.alt + '  (' + (idx + 1) + ' / ' + list.length + ')';
}

document.querySelectorAll('.gal-item').forEach(b => b.addEventListener('click', () => {
  list = [...b.closest('.gal-grid').querySelectorAll('.gal-item')];
  opener = b;
  show(list.indexOf(b));
  lb.showModal();
}));

lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
lb.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
lb.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
lb.addEventListener('close', () => { lbImg.removeAttribute('src'); if (opener) opener.focus(); });
document.addEventListener('keydown', e => {
  if (!lb.open) return;
  if (e.key === 'ArrowLeft') show(idx - 1);
  if (e.key === 'ArrowRight') show(idx + 1);
});

let x0 = null;
lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => {
  if (x0 === null) return;
  const dx = e.changedTouches[0].clientX - x0;
  if (Math.abs(dx) > 50) show(dx < 0 ? idx + 1 : idx - 1);
  x0 = null;
});
