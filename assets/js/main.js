const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Open menu'); }
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
header.classList.toggle('scrolled', window.scrollY > 40);
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); toggle.focus(); } });
document.querySelector('#year').textContent = new Date().getFullYear();
const filters = document.querySelector('.filters');
if (filters) {
  filters.hidden = false;
  const items = [...document.querySelectorAll('.portfolio-item')];
  function filter(category) {
    if (!['all', 'portraits', 'fashion', 'professional'].includes(category)) category = 'all';
    filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
    items.forEach(item => { item.hidden = category !== 'all' && item.dataset.category !== category; });
    document.querySelector('#photo-count').textContent = `${items.filter(item => !item.hidden).length} photographs`;
  }
  filters.addEventListener('click', event => { const button = event.target.closest('button'); if (!button) return; filter(button.dataset.filter); const url = new URL(location.href); url.searchParams.set('category', button.dataset.filter); history.replaceState(null, '', url); });
  filter(new URLSearchParams(location.search).get('category') || 'all');
  const dialog = document.querySelector('.lightbox');
  if (dialog && typeof dialog.showModal === 'function') {
    document.querySelectorAll('.photo-link').forEach(link => link.addEventListener('click', event => { if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); const image = link.querySelector('img'); dialog.querySelector('img').src = link.href; dialog.querySelector('img').alt = image.alt; dialog.querySelector('p').textContent = image.alt; dialog.showModal(); }));
    dialog.querySelector('button').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  }
}
