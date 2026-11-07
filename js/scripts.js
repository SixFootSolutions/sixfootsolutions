const menu = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) closeMenu();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menu.focus();
  }
});

const pointerLighting = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
const mouseGlow = document.createElement('div');
mouseGlow.className = 'mouse-glow';
mouseGlow.setAttribute('aria-hidden', 'true');
document.body.append(mouseGlow);
let pointerFrame = 0;
document.addEventListener('pointermove', event => {
  if (!pointerLighting.matches || event.pointerType === 'touch') return;
  cancelAnimationFrame(pointerFrame);
  pointerFrame = requestAnimationFrame(() => {
    mouseGlow.style.setProperty('--mouse-x', `${event.clientX}px`);
    mouseGlow.style.setProperty('--mouse-y', `${event.clientY}px`);
    mouseGlow.classList.add('is-active');
    const card = event.target.closest('.service-card, .customer-card');
    if (card) {
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--hover-x', `${event.clientX - bounds.left}px`);
      card.style.setProperty('--hover-y', `${event.clientY - bounds.top}px`);
    }
  });
}, { passive: true });
function hidePointerLighting() {
  cancelAnimationFrame(pointerFrame);
  mouseGlow.classList.remove('is-active');
}
document.documentElement.addEventListener('pointerleave', hidePointerLighting);
window.addEventListener('blur', hidePointerLighting);
pointerLighting.addEventListener('change', hidePointerLighting);
