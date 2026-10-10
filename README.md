# Aura Creativa

Sitio de portafolio para Aura Creativa, hecho con HTML, CSS y JavaScript sin dependencias de compilación. Incluye vistas SPA, diseño adaptable, carrusel accesible, servicios con paquetes de referencia, blog de presentación, testimonios reservados y contacto por WhatsApp/correo.

## Editar el carrusel

Guarda las imágenes en una carpeta `assets/` y, dentro del `.slide-image` correspondiente en `index.html`, reemplaza el contenido temporal por una imagen:

```html
<img src="assets/identidad-marca.jpg" alt="Sistema visual de una marca botánica">
```

Cambia también el texto de cada lámina y el atributo `alt`. El tiempo entre láminas se ajusta con `CAROUSEL_INTERVAL` en `script.js` (milisegundos). La persona visitante puede pausarlo, usar las flechas o elegir una lámina; con la preferencia de movimiento reducido del sistema, el carrusel inicia pausado.

## Contacto y funciones pendientes

El formulario prepara un mensaje y abre WhatsApp; la persona visitante lo revisa y confirma su envío desde WhatsApp. El enlace de correo abre el programa de correo configurado en el dispositivo. No hay cuentas, base de datos ni envío de correo automático en esta demo.

El registro de clientes, comprobación de contratos, moderación de testimonios y envío automático de formularios quedan para una fase posterior, cuando Aura decida configurar un backend y un proveedor de correo.

Actualiza los enlaces `wa.me` y `mailto:` de `index.html` cuando cambien los datos de contacto. Los paquetes de servicios y artículos actuales son contenido de muestra; los paquetes no muestran precios.

## Publicar en GitHub Pages

En GitHub, abre **Settings → Pages**, elige **Deploy from a branch**, selecciona `main` y la carpeta raíz (`/`). Las fuentes Playfair Display y DM Sans se cargan desde Google Fonts y tienen alternativas del sistema en CSS.

