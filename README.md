# Aura Creativa

Sitio tipo SPA hecho con HTML, CSS y JavaScript, sin dependencias de compilación. Cada módulo se muestra como una vista interna con rutas como `#servicios`, `#sobre`, `#blog`, `#testimonios` y `#contacto`; no recarga la página ni abre otra pestaña. El diseño adapta su navegación, columnas e imágenes a pantallas pequeñas. Se puede publicar directamente con GitHub Pages.

## Personalizar el carrusel

Cada lámina vive en `index.html` como un elemento `.carousel-slide`. El espacio verde es un marcador temporal: reemplaza el contenido de `.slide-image` por una imagen propia, por ejemplo:

```html
<div class="slide-image">
  <img src="assets/identidad-marca.jpg" alt="Sistema visual de una marca botánica">
  <span class="slide-number">A / C</span>
</div>
```

Guarda la imagen en `assets/` (crea la carpeta si hace falta) y reemplaza el bloque temporal `.slide-image` completo por este ejemplo. Cambia el título y texto de la diapositiva y actualiza el texto alternativo. Puedes duplicar o quitar diapositivas y botones `.carousel-dot` para ajustar la cantidad. En `script.js`, cambia `CAROUSEL_INTERVAL` para ajustar los milisegundos entre avances automáticos.

## Contacto

El formulario arma un mensaje y abre WhatsApp; la persona debe pulsar **Enviar** en WhatsApp para entregarlo. Cambia el número en `script.js`; cambia el correo y el enlace `mailto:` en `index.html`.

## Publicar en GitHub Pages

Sube `index.html`, `styles.css`, `script.js` y `README.md` a la rama principal del repositorio. En GitHub, abre **Settings → Pages**, elige **Deploy from a branch**, selecciona la rama principal y la carpeta raíz (`/`). GitHub Pages publicará `index.html`.

Las tipografías Playfair Display y DM Sans se cargan desde Google Fonts; si el sitio debe funcionar sin conexión a ese servicio, cambia el enlace de fuentes en `index.html` por fuentes locales o conserva las alternativas del sistema.

