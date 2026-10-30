// sticky header background
const header = document.querySelector('header');
const onScroll = () => header.classList.toggle('scrolled', scrollY > 40);
addEventListener('scroll', onScroll, {passive: true}); onScroll();

// logo scrolls back to the very top
document.querySelector('.logo').addEventListener('click', e => {
  e.preventDefault();
  scrollTo({top: 0, behavior: 'smooth'});
  history.replaceState(null, '', location.pathname);
});

// mobile menu
const burger = document.querySelector('.burger'), menu = document.querySelector('.menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// Google map loads only after the visitor asks for it (no data sent to Google before that)
document.getElementById('map-load').addEventListener('click', () => {
  const f = document.createElement('iframe');
  f.className = 'map contact-map';
  f.title = 'Mapa – JK zemní práce';
  f.src = 'https://maps.google.com/maps?q=' + encodeURIComponent('Klášterecká Jeseň 41, Klášterec nad Ohří') + '&z=14&output=embed&hl=cs';
  document.getElementById('map').replaceWith(f);
});

document.getElementById('y').textContent = new Date().getFullYear();
