document.addEventListener("DOMContentLoaded", () => {
  fetch("data/plots.json")
    .then((res) => res.json())
    .then((data) => {
      const params = new URLSearchParams(window.location.search);
      let currentId = params.get("id") || "1";

      function renderPlot(id) {
        const plot = data[id];
        if (!plot) return;

        document.title = "PURO FUENTE | " + plot.title;
        document.getElementById("detail-title").textContent = plot.title;
        document.getElementById("detail-description").textContent = plot.description;
        document.getElementById("detail-price").textContent = `${plot.price}`;

        initSlider(plot.images);
      }

      // Инициализируем "большую картинку" + миниатюры + кнопки
      function initSlider(images) {
        const mainImgEl = document.getElementById("detail-main-img");
        const thumbsTrack = document.getElementById("thumbs-track");
        const prevBtn = document.getElementById("prev-thumb");
        const nextBtn = document.getElementById("next-thumb");

        // Очистим трек
        thumbsTrack.innerHTML = "";

        // Если нет изображений или массив пуст
        if (!images || !images.length) {
          mainImgEl.src = "";
          prevBtn.style.display = "none";
          nextBtn.style.display = "none";
          return;
        }

        // Если только 1 изображение
        if (images.length === 1) {
          prevBtn.style.display = "none";
          nextBtn.style.display = "none";
        } else {
          prevBtn.style.display = "inline-block";
          nextBtn.style.display = "inline-block";
        }

        // Создадим миниатюры
        images.forEach((src) => {
          const thumb = document.createElement("img");
          thumb.src = src;
          thumb.classList.add("thumb-item");
          thumbsTrack.appendChild(thumb);
        });

        // Храним индекс текущего изображения
        let currentIndex = 0;
        const thumbEls = [...thumbsTrack.querySelectorAll(".thumb-item")];

        // Показать картинку по индексу
        function showImageAtIndex(idx) {
          // Ограничим диапазон
          if (idx < 0) idx = 0;
          if (idx > images.length - 1) idx = images.length - 1;
          currentIndex = idx;

          // Установить большое изображение
          mainImgEl.src = images[currentIndex];

          // Подсветить миниатюру
          thumbEls.forEach((el, i) => {
            el.classList.toggle("selected", i === currentIndex);
          });

          // Прокрутить трек, чтобы миниатюра currentIndex была видна
          scrollToThumb(currentIndex);
        }

        // При клике на миниатюру
        thumbEls.forEach((el, i) => {
          el.addEventListener("click", () => {
            showImageAtIndex(i);
          });
        });

        // Клики на кнопки ← и →
        prevBtn.onclick = () => {
          showImageAtIndex(currentIndex - 1);
        };
        nextBtn.onclick = () => {
          showImageAtIndex(currentIndex + 1);
        };

        // Зададим первую картинку
        showImageAtIndex(0);

        // Функция сдвига ленты к нужной миниатюре
        function scrollToThumb(index) {
          const thumbWidth = 80; // ширина миниатюры (см. CSS)
          const gap = 8;         // промежуток
          const visibleCount = 4; // сколько миниатюр примерно умещается (можно менять)

          // Считаем, сколько пикселей нужно сдвинуть, чтобы миниатюра index была «слева»
          let offset = (thumbWidth + gap) * index;

          // Максимальный сдвиг:
          const maxOffset = (images.length - visibleCount) * (thumbWidth + gap);
          if (maxOffset < 0) {
            // Если миниатюр меньше видимых, не двигаем
            offset = 0;
          } else {
            // Ограничим offset
            if (offset < 0) offset = 0;
            if (offset > maxOffset) offset = maxOffset;
          }

          thumbsTrack.style.transform = `translateX(-${offset}px)`;
        }
      }

      // Другие участки
      function renderOtherPlots() {
        const container = document.getElementById("other-plots");
        container.innerHTML = "";

        for (const key in data) {
          if (key === currentId) continue;

          const plot = data[key];
          const plotItem = document.createElement("div");
          plotItem.classList.add("other-plot-item");

          // Превью
          if (plot.images && plot.images.length) {
            const previewImg = document.createElement("img");
            previewImg.src = plot.images[0];
            previewImg.alt = plot.title;
            previewImg.addEventListener("click", () => {
              currentId = key;
              renderPlot(currentId);
              renderOtherPlots();
            });
            plotItem.appendChild(previewImg);
          }

          // Кнопка
          const btn = document.createElement("button");
          btn.textContent = plot.title;
          btn.addEventListener("click", () => {
            currentId = key;
            renderPlot(currentId);
            renderOtherPlots();
          });

          plotItem.appendChild(btn);
          container.appendChild(plotItem);
        }
      }

      // Инициализация
      renderPlot(currentId);
      renderOtherPlots();
    })
    .catch((err) => {
      console.error("Ошибка при загрузке участков:", err);
    });
});
