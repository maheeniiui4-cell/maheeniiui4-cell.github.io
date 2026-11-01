/* =========================================================
   Maheen Arshad - Portfolio Scripts
   1 Mobile menu | 2 Navbar scroll + active link | 3 Scroll reveal
   4 Project filters | 5 Contact form | 6 Footer year
   ========================================================= */

/* ---------- 1. MOBILE MENU ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function closeMenu() {
  navLinks.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

// Close the menu after tapping any link
navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

/* ---------- 2. NAVBAR STYLE + ACTIVE LINK ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

const sections = document.querySelectorAll('main section[id]');
const links = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach((s) => sectionObserver.observe(s));

/* ---------- 3. SCROLL REVEAL ANIMATION ---------- */
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target); // animate only once
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms'; // small stagger
  revealObserver.observe(el);
});

/* ---------- 4. PROJECT FILTERS ---------- */
const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    projectCards.forEach((card) => {
      const categories = card.dataset.category.split(' ');
      const show = filter === 'all' || categories.includes(filter);
      card.classList.toggle('hide', !show);
    });
  });
});

/* ---------- 5. CONTACT FORM ---------- */
/* This site has no server, so the form opens the visitor's email app
   with the message pre-filled. To receive messages directly instead,
   see the README (Formspree option). */
const CONTACT_EMAIL = 'Maheenarshad4002@gmail.com';
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Mark invalid fields
  form.name.classList.toggle('invalid', !name);
  form.email.classList.toggle('invalid', !emailOk);
  form.message.classList.toggle('invalid', !message);

  if (!name || !emailOk || !message) {
    statusEl.textContent = 'Please fill in all fields with a valid email.';
    statusEl.className = 'form-status err';
    return;
  }

  const subject = encodeURIComponent('Portfolio message from ' + name);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;

  statusEl.textContent = 'Opening your email app...';
  statusEl.className = 'form-status ok';
  form.reset();
});

/* ---------- 6. FOOTER YEAR ---------- */
document.getElementById('year').textContent = new Date().getFullYear();
