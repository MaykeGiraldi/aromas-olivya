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

  /* ===== TOUCH (MOBILE) ===== */

  track.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
  });

  track.addEventListener("touchend", () => {
    if (!isDragging) return;

    const diff = startX - currentX;

    if (diff > 50 && index < slides.length - 1) {
      index++;
    } else if (diff < -50 && index > 0) {
      index--;
    }

    update();
    isDragging = false;
  });

  window.addEventListener("resize", update);
});



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

