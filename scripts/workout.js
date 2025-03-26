const images = document.querySelectorAll(".carousel img");
let angle = 0;
let currentIndex = 0;

function updateCarousel() {
  const radius = 80;
  const total = images.length;

  images.forEach((img, index) => {
    const theta =
      ((index - currentIndex) * (360 / total) + angle) * (Math.PI / 180);
    const x = Math.cos(theta) * radius;
    const y = Math.sin(theta) * radius;

    img.style.transform = `translate(${x}px, ${y}px)`;
    img.classList.remove("active");
  });

  images[currentIndex].classList.add("active");
}

function rotateCarousel() {
  currentIndex = (currentIndex + 1) % images.length;
  updateCarousel();
}

images.forEach((img) => {
  img.addEventListener("click", rotateCarousel);
});

updateCarousel();
