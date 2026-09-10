'use strict';
const cover = document.getElementById('cover');
const letter = document.getElementById('letter');
const openButton = document.getElementById('open-letter');
const closeButton = document.getElementById('close-letter');
const surpriseButton = document.getElementById('surprise-button');
const surprise = document.getElementById('surprise');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let opening = false;

function hearts() {
  if (reducedMotion.matches) return;
  const layer = document.getElementById('hearts');
  layer.replaceChildren();
  for (let i = 0; i < 17; i++) {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = i % 3 === 0 ? '♥' : '♡';
    heart.style.setProperty('--x', `${Math.random() * 96}%`);
    heart.style.setProperty('--size', `${15 + Math.random() * 18}px`);
    heart.style.setProperty('--duration', `${3.2 + Math.random() * 1.9}s`);
    heart.style.setProperty('--delay', `${Math.random() * 0.9}s`);
    heart.style.setProperty('--drift', `${Math.random() * 120 - 60}px`);
    heart.addEventListener('animationend', () => heart.remove(), { once: true });
    layer.appendChild(heart);
  }
}

openButton.addEventListener('click', () => {
  if (opening) return;
  opening = true;
  cover.classList.add('leaving');
  openButton.disabled = true;
  window.setTimeout(() => {
    cover.hidden = true;
    letter.hidden = false;
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('letter-title').focus({ preventScroll: true });
    cover.classList.remove('leaving');
    opening = false;
    openButton.disabled = false;
    hearts();
  }, reducedMotion.matches ? 0 : 400);
});

closeButton.addEventListener('click', () => {
  letter.hidden = true;
  cover.hidden = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
  openButton.focus({ preventScroll: true });
});

surpriseButton.addEventListener('click', () => {
  const show = surprise.hidden;
  surprise.hidden = !show;
  surpriseButton.setAttribute('aria-expanded', String(show));
  if (show) {
    hearts();
    window.setTimeout(() => surprise.scrollIntoView({ behavior: reducedMotion.matches ? 'instant' : 'smooth', block: 'nearest' }), 80);
  }
});
