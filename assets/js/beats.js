'use strict';

const apiBase = new URL(document.querySelector('meta[name=beats-api]').content, location.origin);
const grid = document.querySelector('#beat-grid');
const status = document.querySelector('#beat-status');
const retry = document.querySelector('#beat-retry');
const dialog = document.querySelector('#beat-dialog');
const signup = document.querySelector('#beat-signup');
const signupStatus = document.querySelector('#beat-signup-status');
const download = document.querySelector('#beat-download');
let selectedBeat;
let signupRequest;

const endpoint = path => new URL('/api/beats/' + path, apiBase).href;

async function request(path, options) {
  const response = await fetch(endpoint(path), { credentials: 'omit', ...options });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Please try again.');
  return data;
}

function openSignup(beat) {
  selectedBeat = beat;
  signup.reset();
  signup.hidden = false;
  signup.querySelector('button').disabled = false;
  signupStatus.textContent = '';
  download.hidden = true;
  download.removeAttribute('href');
  document.querySelector('#beat-dialog-title').textContent = beat.title;
  const terms = document.querySelector('#beat-terms');
  terms.textContent = beat.terms;
  terms.hidden = !beat.terms;
  dialog.showModal();
}

function renderBeat(beat, index) {
  const card = document.createElement('article');
  card.className = 'beat-card';
  const title = document.createElement('h3');
  title.textContent = beat.title;
  const number = document.createElement('p');
  number.className = 'eyebrow';
  number.textContent = `8B / ${String(index + 1).padStart(2, '0')}`;
  const meta = document.createElement('p');
  meta.className = 'beat-meta';
  meta.textContent = `${beat.producer} · ${beat.bpm} BPM · ${beat.genre}`;
  const audio = document.createElement('audio');
  audio.controls = true;
  audio.preload = 'none';
  audio.src = endpoint('preview/' + encodeURIComponent(beat.id));
  audio.setAttribute('aria-label', `Preview ${beat.title}`);
  audio.addEventListener('play', () => {
    for (const other of grid.querySelectorAll('audio')) if (other !== audio) other.pause();
  });
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'btn btn-light';
  button.textContent = 'Get this beat ↓';
  button.setAttribute('aria-label', `Get ${beat.title}`);
  button.addEventListener('click', () => openSignup(beat));
  card.append(number, title, meta, audio, button);
  return card;
}

async function loadBeats() {
  retry.hidden = true;
  status.textContent = 'Loading the beat catalog…';
  try {
    const { beats } = await request('catalog');
    grid.replaceChildren(...beats.map(renderBeat));
    document.querySelector('#beat-count').textContent = beats.length ? `${beats.length} BEAT${beats.length === 1 ? '' : 'S'}` : '8B PRODUCTION';
    status.textContent = beats.length ? '' : 'Beats are coming soon.';
  } catch {
    status.textContent = 'The catalog couldn’t load. Please try again.';
    retry.hidden = false;
  }
}

signup.addEventListener('submit', async event => {
  event.preventDefault();
  if (!selectedBeat || signupRequest) return;
  const controller = new AbortController();
  signupRequest = controller;
  const button = signup.querySelector('button');
  button.disabled = true;
  signupStatus.textContent = 'Preparing your download…';
  try {
    const data = await request('unlock/' + encodeURIComponent(selectedBeat.id), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signup.elements.email.value }),
      signal: controller.signal,
    });
    if (controller.signal.aborted) return;
    const link = new URL(data.downloadPath, apiBase);
    if (link.origin !== apiBase.origin || !link.pathname.startsWith('/api/beats/download/')) {
      throw new Error('The download link couldn’t load. Please try again.');
    }
    download.href = link.href;
    download.hidden = false;
    signup.hidden = true;
    signupStatus.textContent = `Your download is ready. This link works for ${data.expiresInMinutes} minutes.`;
    download.focus();
  } catch (error) {
    if (!controller.signal.aborted) signupStatus.textContent = error.message;
  } finally {
    if (signupRequest === controller) {
      signupRequest = undefined;
      button.disabled = false;
    }
  }
});

dialog.querySelector('.beat-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  signupRequest?.abort();
  signupRequest = undefined;
  selectedBeat = undefined;
});
retry.addEventListener('click', loadBeats);
loadBeats();
