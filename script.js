const carousels = document.querySelectorAll("[data-carousel]");

carousels.forEach((carousel) => {
  const track = carousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevButton = carousel.querySelector(".prev");
  const nextButton = carousel.querySelector(".next");
  let index = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  const updatePosition = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
  };

  const goToSlide = (direction) => {
    index = (index + direction + slides.length) % slides.length;
    updatePosition();
  };

  prevButton.addEventListener("click", () => goToSlide(-1));
  nextButton.addEventListener("click", () => goToSlide(1));

  const handleStart = (event) => {
    isDragging = true;
    startX = event.type.startsWith("touch")
      ? event.touches[0].clientX
      : event.clientX;
    currentX = startX;
  };

  const handleMove = (event) => {
    if (!isDragging) return;
    currentX = event.type.startsWith("touch")
      ? event.touches[0].clientX
      : event.clientX;
  };

  const handleEnd = () => {
    if (!isDragging) return;
    const delta = currentX - startX;
    if (Math.abs(delta) > 50) {
      goToSlide(delta > 0 ? -1 : 1);
    }
    isDragging = false;
  };

  track.addEventListener("touchstart", handleStart, { passive: true });
  track.addEventListener("touchmove", handleMove, { passive: true });
  track.addEventListener("touchend", handleEnd);

  track.addEventListener("mousedown", handleStart);
  track.addEventListener("mousemove", handleMove);
  track.addEventListener("mouseup", handleEnd);
  track.addEventListener("mouseleave", handleEnd);

  updatePosition();
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

