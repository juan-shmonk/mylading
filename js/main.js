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


/* ============================================================
   MAPAS INTERACTIVOS — D3.js + TopoJSON
   GeoJSON fuente: world-atlas@2 (mundial) + deldersveld (México estados)
   ============================================================ */
(function () {
  if (typeof d3 === 'undefined' || typeof topojson === 'undefined') return;

  /* --- Tooltip compartido --- */
  const tip = document.createElement('div');
  tip.id = 'map-tooltip';
  document.body.appendChild(tip);

  function showTip(event, text) {
    tip.textContent = text;
    tip.classList.add('visible');
    moveTip(event);
  }
  function moveTip(event) {
    tip.style.left = (event.clientX + 14) + 'px';
    tip.style.top  = (event.clientY - 42) + 'px';
  }
  function hideTip() { tip.classList.remove('visible'); }

  /* --- Utilidades --- */
  function debounce(fn, ms) {
    let t;
    return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
  }

  function showSkeleton(el) {
    el.innerHTML = '<div class="map-skeleton" aria-hidden="true"></div>';
  }

  function showError(el) {
    el.innerHTML = '<p class="map-error">Mapa no disponible</p>';
  }

  /* --- Render genérico de mapa --- */
  function drawMap(container, features, projFn, points) {
    container.innerHTML = '';

    const W = container.clientWidth  || 400;
    const H = container.clientHeight || 300;

    const svg = d3.select(container)
      .append('svg')
      .attr('viewBox', `0 0 ${W} ${H}`)
      .attr('width',  '100%')
      .attr('height', H)
      .attr('aria-hidden', 'true');

    const projection = projFn(W, H);
    const geoPath    = d3.geoPath().projection(projection);

    /* polígonos de países / estados */
    svg.append('g')
      .selectAll('path')
      .data(features.features || [])
      .join('path')
        .attr('d', geoPath)
        .attr('fill', '#1A1A1A')
        .attr('stroke', '#2E2E2E')
        .attr('stroke-width', 0.5)
        .on('mouseenter', function () { d3.select(this).attr('fill', '#252525'); })
        .on('mouseleave', function () { d3.select(this).attr('fill', '#1A1A1A'); });

    /* puntos de ubicación */
    points.forEach(pt => {
      const proj = projection(pt.coords);
      if (!proj) return;
      const [px, py] = proj;
      /* descartar puntos fuera del viewport */
      if (px < -10 || py < -10 || px > W + 10 || py > H + 10) return;

      const g = svg.append('g')
        .attr('transform', `translate(${px},${py})`);

      /* anillo extra para sede */
      if (pt.isSede) {
        g.append('circle')
          .attr('r', 14)
          .attr('fill', 'none')
          .attr('stroke', 'rgba(255,255,255,0.22)')
          .attr('stroke-width', 0.75)
          .attr('class', 'map-pulse-outer');
      }

      /* anillo exterior pulsante */
      g.append('circle')
        .attr('r', 8)
        .attr('fill', 'rgba(255,255,255,0.08)')
        .attr('stroke', '#FFFFFF')
        .attr('stroke-width', 0.75)
        .attr('class', 'map-pulse');

      /* punto sólido interior */
      g.append('circle')
        .attr('r', 3)
        .attr('fill', '#FFFFFF');

      /* área de hit transparente para tooltip */
      g.append('circle')
        .attr('r', 18)
        .attr('fill', 'transparent')
        .attr('cursor', 'pointer')
        .on('mouseenter', (evt) => showTip(evt, pt.label))
        .on('mousemove',  (evt) => moveTip(evt))
        .on('mouseleave', hideTip);
    });
  }

  /* -------------------------------------------------------
     MAPA 1 — MÉXICO / YUCATÁN
     Fuente: world-atlas@2 (jsdelivr) — misma que Latam,
     proyección recortada a la Península de Yucatán.
  ------------------------------------------------------- */
  async function initMexicoMap() {
    const el = document.getElementById('map-mexico');
    if (!el) return;
    showSkeleton(el);

    const points = [
      { coords: [-86.8515, 21.1619], label: 'Cancún, Q.Roo / Sede Principal', isSede: true },
      { coords: [-89.6230, 20.9674], label: 'Mérida, Yucatán / Presencial y remoto' },
      { coords: [-90.5349, 19.8301], label: 'Campeche / Presencial y remoto' }
    ];

    /* bounding box que muestra México casi completo:
       se reconoce la silueta del país y la Península de Yucatán
       queda visible al sureste con los tres puntos */
    const bounds = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-118, 33], [-85, 33],
          [-85,  14], [-118, 14],
          [-118, 33]
        ]]
      }
    };

    try {
      const res  = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
      if (!res.ok) throw new Error('fetch');
      const data = await res.json();
      const geo  = topojson.feature(data, data.objects.countries);

      /* proyección ajustada al bounding box de Yucatán */
      const projFn = (W, H) => d3.geoMercator().fitSize([W, H], bounds);

      const draw = () => drawMap(el, geo, projFn, points);
      draw();
      new ResizeObserver(debounce(draw, 100)).observe(el);

    } catch (_) {
      showError(el);
    }
  }

  /* -------------------------------------------------------
     MAPA 2 — LATINOAMÉRICA (mundial recortado)
  ------------------------------------------------------- */
  async function initLatamMap() {
    const el = document.getElementById('map-latam');
    if (!el) return;
    showSkeleton(el);

    const points = [
      { coords: [-77.0428, -12.0464], label: 'Perú / Servicios remotos' },
      { coords: [-70.6693, -33.4489], label: 'Chile / Servicios remotos' }
    ];

    /* bounding box: desde México hasta el sur de Chile */
    const bounds = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-87, 23], [-33, 23], [-33, -56], [-87, -56], [-87, 23]
        ]]
      }
    };

    try {
      const res  = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
      if (!res.ok) throw new Error('fetch');
      const data = await res.json();
      const geo  = topojson.feature(data, data.objects.countries);

      /* proyección ajustada al bounding box de América Latina */
      const projFn = (W, H) => d3.geoMercator().fitSize([W, H], bounds);

      const draw = () => drawMap(el, geo, projFn, points);
      draw();
      new ResizeObserver(debounce(draw, 100)).observe(el);

    } catch (_) {
      showError(el);
    }
  }

  /* inicializar ambos */
  initMexicoMap();
  initLatamMap();
})();
