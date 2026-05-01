/* ============================================================
   MULTIFUNCIONAL LEÓN — main.js
   Sin dependencias externas. Vanilla JS puro.
   ============================================================ */

'use strict';

/* ============================================================
   NAVBAR — opacidad y efecto blur al hacer scroll
   ============================================================ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });


/* ============================================================
   NAVBAR MOBILE — toggle hamburger
   ============================================================ */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
});

/* cierra el menú al hacer clic en cualquier enlace */
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menú');
  });
});

/* cierra menú al hacer clic fuera de él */
document.addEventListener('click', (e) => {
  if (navMenu.classList.contains('open') &&
      !navbar.contains(e.target)) {
    navMenu.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  }
});


/* ============================================================
   INTERSECTION OBSERVER — animaciones fade-up al hacer scroll
   ============================================================ */
const fadeElements = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target); /* anima solo una vez */
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -32px 0px'
});

fadeElements.forEach(el => fadeObserver.observe(el));


/* ============================================================
   ACTIVE NAV LINK — resalta el enlace de la sección visible
   ============================================================ */
const navLinks      = document.querySelectorAll('.nav-link');
const navSections   = document.querySelectorAll('section[id]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const id = entry.target.getAttribute('id');
    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${id}`
      );
    });
  });
}, { threshold: 0.35 });

navSections.forEach(sec => sectionObserver.observe(sec));


/* ============================================================
   PROJECT CARDS — botón "Ver detalles" (placeholder)
   Conectar cada botón a la URL real del proyecto cuando esté listo.
   ============================================================ */
document.querySelectorAll('.btn-outline-sm').forEach(btn => {
  btn.addEventListener('click', () => {
    /* TODO: reemplazar con modal o enlace al repositorio/demo */
    showToast('Detalles del proyecto próximamente.');
  });
});


/* ============================================================
   FORMULARIO DE CONTACTO — validación visual
   Para activar envío real conectar con Formspree, EmailJS, etc.
   Ver README.md para instrucciones.
   ============================================================ */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name    = document.getElementById('contactName').value.trim();
  const email   = document.getElementById('contactEmail').value.trim();
  const type    = document.getElementById('contactType').value;
  const message = document.getElementById('contactMessage').value.trim();

  /* validación básica */
  if (!name || !email || !type || !message) {
    showFormFeedback('Por favor, completa todos los campos requeridos.', 'error');
    return;
  }
  if (!isValidEmail(email)) {
    showFormFeedback('Ingresa un correo electrónico válido.', 'error');
    return;
  }

  /*
   * INTEGRACIÓN CON BACKEND
   * Opción A — Formspree (sin backend propio):
   *   1. Crea cuenta en formspree.io
   *   2. Crea un formulario y copia el endpoint
   *   3. Reemplaza el action del <form> con tu endpoint:
   *      <form action="https://formspree.io/f/TU_ID" method="POST">
   *   4. Elimina e.preventDefault() para que el form se envíe normalmente.
   *
   * Opción B — EmailJS:
   *   emailjs.sendForm('SERVICE_ID', 'TEMPLATE_ID', e.target, 'PUBLIC_KEY');
   *
   * Opción C — fetch a tu propio API:
   *   fetch('/api/contact', { method:'POST', body: new FormData(contactForm) })
   */

  /* estado de éxito placeholder */
  showFormFeedback('¡Gracias! Tu mensaje fue recibido. Te contactaré pronto.', 'success');
  contactForm.reset();
});

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormFeedback(msg, type) {
  /* elimina feedback anterior si existe */
  const prev = contactForm.querySelector('.form-feedback');
  if (prev) prev.remove();

  const el = document.createElement('p');
  el.className = `form-feedback ${type}`;
  el.textContent = msg;
  el.setAttribute('role', 'alert');
  contactForm.appendChild(el);

  setTimeout(() => el.remove(), 6000);
}


/* ============================================================
   TOAST GENERAL — notificación ligera sin librerías
   ============================================================ */
function showToast(msg) {
  const existing = document.getElementById('ml-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'ml-toast';
  toast.textContent = msg;
  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '5.5rem',
    right:        '1.75rem',
    background:   '#1E1E1E',
    color:        'rgba(255,255,255,0.7)',
    fontFamily:   "'Space Mono', monospace",
    fontSize:     '0.7rem',
    letterSpacing:'0.04em',
    padding:      '0.75rem 1.25rem',
    border:       '1px solid #2a2a2a',
    boxShadow:    '0 4px 24px rgba(0,0,0,0.5)',
    zIndex:       '9999',
    maxWidth:     '280px',
    lineHeight:   '1.5',
    opacity:      '0',
    transform:    'translateY(8px)',
    transition:   'opacity 0.25s ease, transform 0.25s ease',
  });
  document.body.appendChild(toast);

  /* trigger animation */
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity   = '1';
      toast.style.transform = 'translateY(0)';
    });
  });

  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(8px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}
