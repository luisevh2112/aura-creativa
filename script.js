const CAROUSEL_INTERVAL = 6500;
const WHATSAPP_NUMBER = "573011626926";

const slides = [...document.querySelectorAll(".carousel-slide")];
const dots = [...document.querySelectorAll(".carousel-dot")];
const carousel = document.querySelector(".carousel");
const pauseButton = document.querySelector(".carousel-pause");
let activeSlide = 0;
let timer;
let userPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => {
    const active = i === activeSlide;
    slide.hidden = !active;
    slide.classList.toggle("is-active", active);
    slide.setAttribute("aria-label", `${i + 1} de ${slides.length}`);
  });
  dots.forEach((dot, i) => {
    const active = i === activeSlide;
    dot.classList.toggle("is-active", active);
    if (active) dot.setAttribute("aria-current", "true");
    else dot.removeAttribute("aria-current");
  });
}

function stopCarousel() {
  window.clearInterval(timer);
}

function startCarousel() {
  stopCarousel();
  if (!userPaused && !document.hidden) {
    timer = window.setInterval(() => showSlide(activeSlide + 1), CAROUSEL_INTERVAL);
  }
}

dots.forEach((dot, index) => dot.addEventListener("click", () => {
  showSlide(index);
  startCarousel();
}));

document.querySelectorAll(".carousel-arrow").forEach((button) => button.addEventListener("click", () => {
  showSlide(activeSlide + (button.dataset.direction === "next" ? 1 : -1));
  startCarousel();
}));

if (userPaused) {
  pauseButton.textContent = "Reanudar";
  pauseButton.setAttribute("aria-label", "Reanudar carrusel");
  pauseButton.setAttribute("aria-pressed", "true");
}

pauseButton.addEventListener("click", () => {
  userPaused = !userPaused;
  pauseButton.setAttribute("aria-pressed", String(userPaused));
  pauseButton.setAttribute("aria-label", userPaused ? "Reanudar carrusel" : "Pausar carrusel");
  pauseButton.textContent = userPaused ? "Reanudar" : "Pausar";
  startCarousel();
});

carousel.addEventListener("mouseenter", stopCarousel);
carousel.addEventListener("mouseleave", startCarousel);
carousel.addEventListener("focusin", stopCarousel);
carousel.addEventListener("focusout", (event) => {
  if (!carousel.contains(event.relatedTarget)) startCarousel();
});
document.addEventListener("visibilitychange", startCarousel);
startCarousel();

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  mainNav.classList.toggle("is-open", !expanded);
});

mainNav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  mainNav.classList.remove("is-open");
}));

// Navegación entre vistas sin recargar ni abrir nuevas pestañas.
const viewSections = [...document.querySelectorAll("main [data-view]")];
const viewNames = new Set(viewSections.map((section) => section.dataset.view));
const pageTitle = {
  inicio: "Aura Creativa — Ideas que toman forma",
  servicios: "Servicios — Aura Creativa",
  sobre: "Sobre Aura — Aura Creativa",
  blog: "Blog — Aura Creativa",
  testimonios: "Testimonios — Aura Creativa",
  contacto: "Contacto — Aura Creativa",
};

function renderView(hash = window.location.hash.slice(1), { scroll = true } = {}) {
  const destination = document.getElementById(hash);
  const requestedView = destination?.dataset.view || hash;
  const currentView = viewNames.has(requestedView) ? requestedView : "inicio";

  viewSections.forEach((section) => {
    section.hidden = section.dataset.view !== currentView;
  });
  document.title = pageTitle[currentView];
  mainNav.querySelectorAll("a").forEach((link) => {
    if (link.hash === `#${currentView}`) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });

  if (scroll) requestAnimationFrame(() => {
    const visibleTarget = destination && !destination.hidden
      ? destination
      : viewSections.find((section) => section.dataset.view === currentView);
    if (hash === "contenido") document.querySelector("#contenido").focus({ preventScroll: true });
    else visibleTarget?.focus({ preventScroll: true });
    (hash === "carrusel" ? destination : visibleTarget)?.scrollIntoView({ block: "start" });
  });
}

document.addEventListener("click", (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const hash = link.hash.slice(1);
  if (!hash) return;
  event.preventDefault();
  if (window.location.hash !== `#${hash}`) window.history.pushState(null, "", `#${hash}`);
  renderView(hash);
});

window.addEventListener("popstate", () => renderView());
renderView(window.location.hash.slice(1) || "inicio", { scroll: false });

document.querySelector("#year").textContent = new Date().getFullYear();

// El formulario abre WhatsApp con el texto rellenado; el visitante confirma el envío.
document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = [
    `Hola Jess, soy ${form.get("name")}.`,
    `Mi correo es ${form.get("email")}.`,
    `Me interesa: ${form.get("service")}.`,
    `Mi idea es: ${form.get("message")}`,
  ].join("\n");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  document.querySelector("#form-status").textContent = "WhatsApp se abrió con tu mensaje. Revísalo y presiona Enviar para compartirlo con Aura Creativa.";
});

