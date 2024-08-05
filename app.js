const sliderUl = document.querySelector(".sliderUl");
const prevBtn = document.querySelector(".btn.prev");
const nextBtn = document.querySelector(".btn.next");
const sliderDot = document.querySelector(".slider-dot");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;
const totalSlides = 4;

// 현재 슬라이드 이미지의 dot 활성화
function updateDots() {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

function moveSlide(direction, steps = 1) {
  if (direction === "next") {
    currentIndex = (currentIndex + steps) % totalSlides;
    sliderUl.style.transition = "transform 0.5s ease";
    sliderUl.style.transform = `translateX(-${steps * 100}%)`;

    setTimeout(() => {
      sliderUl.style.transition = "none";
      sliderUl.style.transform = "translateX(0)";

      // 클릭한 dot과의 차이만큼 dom 생성
      for (let i = 0; i < steps; i++) {
        sliderUl.appendChild(sliderUl.firstElementChild);
      }
    }, 500);
  } 
  else {
    currentIndex = (currentIndex - steps + totalSlides) % totalSlides;
    sliderUl.style.transition = "none";
    // 클릭한 dot과의 차이만큼 dom 생성
    for (let i = 0; i < steps; i++) {
      const lastSlide = sliderUl.lastElementChild;
      sliderUl.insertBefore(lastSlide, sliderUl.firstChild);
    }

    sliderUl.style.transform = `translateX(-${steps * 100}%)`;

    setTimeout(() => {
      sliderUl.style.transition = "transform 0.5s ease";
      sliderUl.style.transform = "translateX(0)";
    }, 50);
  }

  updateDots();
}

nextBtn.addEventListener("click", () => moveSlide("next"));
prevBtn.addEventListener("click", () => moveSlide("prev"));

// dot 클릭 시 슬라이드 이동
sliderDot.addEventListener("click", (e) => {
  const selectedDot = e.target.closest(".dot");
  if (!selectedDot) return;

  const selectedDotIndex = Array.from(dots).indexOf(selectedDot);

  if (selectedDotIndex === currentIndex) return;

  // 현재 dot과의 차이를 구함
  const step = Math.abs(selectedDotIndex - currentIndex);
  const direction = selectedDotIndex > currentIndex ? "next" : "prev";

  moveSlide(direction, step);
});