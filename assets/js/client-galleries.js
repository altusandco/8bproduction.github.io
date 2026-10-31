(() => {
  'use strict';
  const form = document.querySelector('#gallery-code-form');
  const pending = document.querySelector('#gallery-access-pending');
  const field = document.querySelector('#gallery-code');
  const error = document.querySelector('#gallery-code-error');
  const config = window.EIGHTB_GALLERY_CONFIG;
  if (!form || !pending || !field || !error || !config?.serviceOrigin) return;

  let origin;
  try {
    const parsed = new URL(config.serviceOrigin);
    if (parsed.protocol !== 'https:' || parsed.username || parsed.password || parsed.search || parsed.hash || parsed.pathname !== '/') return;
    origin = parsed.origin;
  } catch { return; }
  const prefix = config.galleryPathPrefix || '/g/';
  if (!/^\/[A-Za-z0-9/_-]*\/$/.test(prefix)) return;

  const intro = document.querySelector('#gallery-code-intro');
  if (intro) intro.hidden = false;
  pending.hidden = true;
  form.hidden = false;
  form.addEventListener('submit', event => {
    event.preventDefault();
    const code = field.value.trim();
    if (!/^[A-Za-z0-9_-]{4,80}$/.test(code)) {
      error.textContent = 'Enter the gallery code from your delivery email, using letters, numbers, hyphens, or underscores.';
      field.setAttribute('aria-invalid', 'true');
      field.focus();
      return;
    }
    field.removeAttribute('aria-invalid');
    error.textContent = '';
    window.location.assign(origin + prefix + encodeURIComponent(code));
  });
  field.addEventListener('input', () => { field.removeAttribute('aria-invalid'); error.textContent = ''; });
})();
