# Multifuncional León — Landing Page

Landing page profesional de una sola página. HTML + CSS + JS vanilla. Sin dependencias externas salvo Google Fonts. Lista para abrir en el navegador o desplegar en Vercel.

---

## Estructura de archivos

```
/
├── index.html   ← estructura HTML completa
├── style.css    ← todos los estilos
├── main.js      ← comportamiento (navbar, animaciones, formulario)
└── README.md    ← este archivo
```

---

## Ver en local

1. Abre `index.html` directamente en el navegador — no necesita servidor.
2. Si prefieres un servidor local: `npx serve .` o `python -m http.server 8080`.

---

## Desplegar en Vercel

1. Sube la carpeta a GitHub.
2. En [vercel.com](https://vercel.com) → **New Project** → importa el repositorio.
3. Framework Preset: **Other**. Root Directory: `/`.
4. Clic en **Deploy**. Vercel detecta automáticamente archivos estáticos.

> Sin `vercel.json` ni configuración extra. Funciona tal cual.

---

## Personalización de placeholders

Busca y reemplaza los siguientes comentarios en `index.html`:

| Placeholder | Dónde | Valor a poner |
|---|---|---|
| `WHATSAPP_URL` | múltiples `href` | `https://wa.me/529982314778` |
| `GITHUB_URL` | enlace de contacto | `https://github.com/TU_USUARIO` |
| `LINKEDIN_URL` | enlace de contacto | `https://linkedin.com/in/TU_USUARIO` |
| `EMAIL` | enlace `mailto:` | `tu@correo.com` |

Ejemplo de búsqueda rápida en VS Code: `Ctrl+Shift+H` → buscar `TU_NUMERO` → reemplazar con tu número.

---

## Personalización de colores

Todas las variables de color están en `style.css` como valores literales. Para cambiarlas globalmente, agrega variables CSS en el `:root` de `style.css`:

```css
:root {
  --color-bg:          #0E0E0E;
  --color-bg-card:     #141414;
  --color-bg-light:    #F4F2EE;
  --color-border:      #1E1E1E;
  --color-border-light:#D8D4CC;
}
```

Luego reemplaza los valores hexadecimales con `var(--color-bg)`, etc.

---

## Activar el formulario de contacto

El formulario es visual por defecto. Para activar el envío real tienes 3 opciones:

### Opción A — Formspree (sin backend, gratis)
1. Crea cuenta en [formspree.io](https://formspree.io).
2. Crea un nuevo formulario y copia el endpoint (`https://formspree.io/f/XXXXXXXX`).
3. En `index.html`, agrega `action` al `<form>`:
   ```html
   <form ... action="https://formspree.io/f/XXXXXXXX" method="POST">
   ```
4. En `main.js`, elimina la línea `e.preventDefault()` en el listener del formulario.

### Opción B — EmailJS (sin backend, gratis con límite)
1. Crea cuenta en [emailjs.com](https://www.emailjs.com).
2. Instala el SDK en `index.html`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   ```
3. En `main.js`, reemplaza el bloque de éxito placeholder con:
   ```js
   emailjs.sendForm('TU_SERVICE_ID', 'TU_TEMPLATE_ID', contactForm, 'TU_PUBLIC_KEY')
     .then(() => showFormFeedback('¡Mensaje enviado!', 'success'))
     .catch(() => showFormFeedback('Error al enviar. Intenta de nuevo.', 'error'));
   ```

### Opción C — API propia
Reemplaza el bloque placeholder en `main.js` con un `fetch` a tu endpoint:
```js
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, type, message })
})
.then(res => res.json())
.then(() => showFormFeedback('¡Mensaje enviado!', 'success'))
.catch(() => showFormFeedback('Error al enviar.', 'error'));
```

---

## Agregar testimonios reales

En `index.html` busca la sección `id="testimonios"`. Reemplaza los bloques marcados con `<!-- PLACEHOLDER -->`:

```html
<blockquote class="testimonial-card fade-up">
  <div class="testimonial-quote-mark" aria-hidden="true">"</div>
  <p class="testimonial-text">Texto del testimonio real aquí.</p>
  <footer class="testimonial-author">
    <p class="testimonial-name">Nombre Real</p>
    <p class="testimonial-role">Cargo — Empresa</p>
  </footer>
</blockquote>
```

---

## Agregar proyectos o experiencia

- **Proyectos**: duplica un bloque `<article class="project-card">` en `#proyectos` y edita el contenido.
- **Experiencia**: duplica un bloque `<div class="timeline-item">` en `#experiencia`.
- Los badges disponibles son: `badge-live` (funcional), `badge-dev` (en desarrollo), `badge-proposal` (propuesta).

---

## Fuentes utilizadas

Importadas desde Google Fonts. Sin descarga local necesaria.

| Fuente | Uso |
|---|---|
| Bebas Neue | Títulos grandes, logo |
| Space Mono | Datos técnicos, labels, badges, teléfono |
| Rajdhani 400/600 | Cuerpo de texto, servicios, navegación |
| Cormorant Garamond italic | Citas y frases destacadas |

---

## Requisitos WCAG

- Contraste texto principal sobre fondo: cumple WCAG AA (≥ 4.5:1).
- Todos los elementos interactivos tienen `aria-label`.
- Imágenes y SVGs tienen `aria-hidden="true"` cuando son decorativos.
- El formulario usa `<label>` vinculados con `for`/`id`.

---

*Multifuncional León · Cancún, Q.Roo · 998 231 4778*
