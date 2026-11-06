const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const submenus = {
  'portfolio.html': [
    ['Portraits & Creative', 'portfolio.html?category=portraits#portfolio-work'],
    ['Fashion & Events', 'portfolio.html?category=fashion#portfolio-work'],
    ['Professional & Groups', 'portfolio.html?category=professional#portfolio-work'],
  ],
  'videos.html': [
    ['Featured Music Video', 'videos.html#featured-video'],
    ['Plan a Music Video', 'videos.html#plan-a-video'],
  ],
  'music.html': [
    ['Beats', 'beats.html'],
    ['Music Videos', 'music.html#music-videos'],
    ['Artists', 'music.html#artists'],
  ],
  'about.html': [
    ['Meet Curtis', 'about.html#meet-curtis'],
    ['The 8B Story', 'about.html#our-story'],
    ['Explore 8B', 'about.html#explore-8b'],
  ],
  'services.html': [
    ['Portraits & Headshots', 'services.html#portraits'],
    ['Fashion & Brand', 'services.html#fashion'],
    ['Events & Groups', 'services.html#events'],
    ['FAQs', 'services.html#services-faq'],
  ],
  'client-galleries.html': [
    ['Find Your Gallery', 'client-galleries.html#gallery-access'],
    ['How Galleries Work', 'client-galleries.html#gallery-experience'],
  ],
  'contact.html': [
    ['Booking Form', 'contact.html#booking-form'],
    ['Email Booking', 'mailto:booking@8bproduction.com'],
  ],
};

const desktopMenu = matchMedia('(min-width: 1041px)');
let activeSubmenu;

function closeSubmenu() {
  if (!activeSubmenu) return;
  activeSubmenu.setOpen(false);
  activeSubmenu = undefined;
}

function addSubmenu(parentLink, items) {
  const group = document.createElement('div');
  group.className = 'nav-group';
  const label = document.createElement('div');
  label.className = 'nav-group-label';
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'nav-disclosure';
  button.setAttribute('aria-label', `${parentLink.textContent.trim()} options`);

  const submenu = document.createElement('div');
  submenu.className = 'nav-submenu';
  submenu.id = parentLink.getAttribute('href').replace('.html', '-options');
  button.setAttribute('aria-controls', submenu.id);

  for (const [text, href] of items) {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = href;
    const destination = new URL(link.href);
    if (destination.origin === location.origin && destination.pathname === location.pathname &&
        !destination.search && !destination.hash) {
      link.setAttribute('aria-current', 'page');
    }
    submenu.append(link);
  }

  parentLink.before(group);
  label.append(parentLink, button);
  group.append(label, submenu);

  const item = { setOpen };
  function setOpen(open) {
    submenu.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
  }
  function open() {
    if (activeSubmenu === item) return;
    closeSubmenu();
    activeSubmenu = item;
    setOpen(true);
  }
  function close() {
    if (activeSubmenu === item) closeSubmenu();
  }

  setOpen(false);
  group.addEventListener('pointerenter', event => {
    if (desktopMenu.matches && event.pointerType === 'mouse') open();
  });
  group.addEventListener('pointerleave', event => {
    if (desktopMenu.matches && event.pointerType === 'mouse' && !submenu.contains(document.activeElement)) close();
  });
  group.addEventListener('focusout', event => {
    if (desktopMenu.matches && !group.contains(event.relatedTarget)) close();
  });
  button.addEventListener('click', () => {
    if (submenu.hidden) open();
    else close();
  });
  group.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || submenu.hidden) return;
    event.preventDefault();
    event.stopPropagation();
    close();
    button.focus();
  });
}

for (const link of nav.querySelectorAll(':scope > a[href]')) {
  const items = submenus[link.getAttribute('href')];
  if (items) addSubmenu(link, items);
}

nav.addEventListener('focusout', event => {
  if (!nav.contains(event.relatedTarget)) closeSubmenu();
});
document.addEventListener('click', event => {
  if (!nav.contains(event.target)) closeSubmenu();
});
desktopMenu.addEventListener('change', closeSubmenu);

function closeMenu() {
  closeSubmenu();
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open menu');
}
window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 40), { passive: true });
header.classList.toggle('scrolled', window.scrollY > 40);
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); if (!open) closeSubmenu(); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu'); });
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
    let currentLink;
    let touchStart;
    const visibleLinks = () => items.filter(item => !item.hidden).map(item => item.querySelector('.photo-link'));
    function showPhoto(link) {
      currentLink = link;
      const links = visibleLinks();
      const image = link.querySelector('img');
      const enlarged = dialog.querySelector('.lightbox-stage img');
      enlarged.src = link.href;
      enlarged.alt = image.alt;
      dialog.querySelector('.lightbox-caption').textContent = image.alt;
      dialog.querySelector('.lightbox-counter').textContent = `${links.indexOf(link) + 1} / ${links.length}`;
    }
    function stepPhoto(offset) {
      const links = visibleLinks();
      if (!links.length) return;
      showPhoto(links[(links.indexOf(currentLink) + offset + links.length) % links.length]);
    }
    document.querySelectorAll('.photo-link').forEach(link => link.addEventListener('click', event => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      showPhoto(link);
      dialog.showModal();
      document.body.style.overflow = 'hidden';
    }));
    dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('.lightbox-prev').addEventListener('click', () => stepPhoto(-1));
    dialog.querySelector('.lightbox-next').addEventListener('click', () => stepPhoto(1));
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        stepPhoto(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
    dialog.addEventListener('close', () => { document.body.style.overflow = ''; });
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    const stage = dialog.querySelector('.lightbox-stage');
    stage.addEventListener('touchstart', event => { touchStart = event.touches.length === 1 ? [event.touches[0].clientX, event.touches[0].clientY] : null; }, { passive: true });
    stage.addEventListener('touchend', event => {
      if (!touchStart || !event.changedTouches.length) return;
      const dx = event.changedTouches[0].clientX - touchStart[0];
      const dy = event.changedTouches[0].clientY - touchStart[1];
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) stepPhoto(dx < 0 ? 1 : -1);
      touchStart = null;
    }, { passive: true });
  }
}
