const track = document.getElementById("slider-track");
const container = document.getElementById("slider");

let scrollDistance = 0;

function calculateScrollDistance() {
  const firstImg = track.querySelector("img");
  const style = window.getComputedStyle(firstImg);
  const imgWidth = firstImg.offsetWidth;
  const marginRight = parseInt(style.marginRight) || 0;
  scrollDistance = imgWidth + marginRight;
}

// Прокрутка на одно изображение
function scrollOnce() {
  calculateScrollDistance(); // пересчитываем при каждом скролле
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${scrollDistance}px)`;

  setTimeout(() => {
    track.appendChild(track.firstElementChild);
    track.style.transition = "none";
    track.style.transform = `translateX(0)`;
  }, 500);
}

// Запуск автоскролла
let interval = setInterval(scrollOnce, 2200);

// Клик вручную
track.addEventListener("click", () => {
  clearInterval(interval);
  scrollOnce();
  interval = setInterval(scrollOnce, 2200);
});

// Перерасчёт при изменении размера окна
window.addEventListener("resize", calculateScrollDistance);

// Начальный расчёт
calculateScrollDistance();


const languageSelect = document.getElementById("language-select");

languageSelect.addEventListener("change", function () {
  const selectedUrl = this.value;
  if (selectedUrl) {
    window.location.href = selectedUrl;
  }
});
