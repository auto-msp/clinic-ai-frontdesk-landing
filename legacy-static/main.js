// mobile menu
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// dashboard counters
const counters = document.querySelectorAll('[data-n]');
const cio = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, target = +el.dataset.n, suffix = el.dataset.s || '';
    let cur = 0;
    const tick = () => {
      cur = Math.min(target, cur + Math.max(1, Math.ceil(target / 30)));
      el.textContent = cur + suffix;
      if (cur < target) requestAnimationFrame(tick);
    };
    tick();
    cio.unobserve(el);
  });
}, { threshold: 0.6 });
counters.forEach(c => cio.observe(c));

// demo button scrolls to the form
document.getElementById('demoBtn').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.getElementById('waitlistForm').scrollIntoView({ behavior: 'smooth' });
});

// waitlist form: front-end only. Wire to your backend/CRM before launch.
document.getElementById('wl').addEventListener('submit', (ev) => {
  ev.preventDefault();
  document.getElementById('thanks').textContent = "Thanks, you're on the list.";
  ev.target.reset();
});

document.getElementById('yr').textContent = new Date().getFullYear();
