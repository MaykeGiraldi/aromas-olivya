document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector(".carousel-arrow.prev");
  const nextBtn = carousel.querySelector(".carousel-arrow.next");

  let index = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const update = () => {
    const width = carousel.querySelector(".carousel-viewport").offsetWidth;
    track.style.transform = `translateX(-${index * width}px)`;
  };

  nextBtn?.addEventListener("click", () => {
    if (index < slides.length - 1) {
      index++;
      update();
    }
  });

  prevBtn?.addEventListener("click", () => {
    if (index > 0) {
      index--;
      update();
    }
  });
  window.addEventListener("resize", update);
});
/* REVEAL DA LOGO (ISOLADO) */
const logo = document.querySelector('.reveal-logo');

if (logo) {
  const logoObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        logo.classList.add('active');
        logoObserver.unobserve(entry.target);
      }
    },
    { threshold: 0.1 }
  );

  logoObserver.observe(logo);
}




document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".reveal");
  if (!el) return;

  // prepara animação sem esconder conteúdo permanentemente
  el.classList.add("animate");

  const observer = new IntersectionObserver(
    ([entry], obs) => {
      if (entry.isIntersecting) {
        el.classList.add("is-visible");
        el.classList.remove("animate");
        obs.disconnect();
      }
    },
    { threshold: 0.2 }
  );

  observer.observe(el);
});

