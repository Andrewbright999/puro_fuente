document.addEventListener("DOMContentLoaded", () => {
    const titleEl = document.getElementById("plot-title");
    const descriptionEl = document.getElementById("plot-description");
    const priceEl = document.getElementById("plot-price");
    const detailLink = document.getElementById("plot-details-link");

    const circles = document.querySelectorAll(".terra-map-circle");
    const nextPlotBtn = document.getElementById("next-plot");
    const prevPlotBtn = document.getElementById("prev-plot");

    // КНОПКИ ДЛЯ ПЕРЕКЛЮЧЕНИЯ КАРТИНОК
    const nextImgBtn = document.getElementById("next-plot-img");
    const prevImgBtn = document.getElementById("prev-plot-img");

    let plotData = {};
    let currentId = "1";
    
    // Индекс текущего изображения в галерее
    let currentImgIndex = 0;
    // Интервал автопрокрутки
    let imageRotationInterval = null;

    // Загружаем JSON с участками
    fetch("data/plots.json")
        .then(res => res.json())
        .then(data => {
            plotData = data;

            // Показываем первый участок
            showPlot(currentId);

            // Обработка кликов по кружочкам на карте
            circles.forEach(circle => {
                circle.addEventListener("click", () => {
                    currentId = circle.getAttribute("data-id");
                    showPlot(currentId);
                });
            });

            // Обработка hover по кружочкам (подсветка)
            circles.forEach(circle => {
                circle.addEventListener("mouseenter", () => {
                    circle.classList.add("hover");
                });
                circle.addEventListener("mouseleave", () => {
                    circle.classList.remove("hover");
                });
            });

            // Кнопки "Следующий участок"/"Предыдущий участок"
            nextPlotBtn.addEventListener("click", () => {
                currentId = getNextId(currentId);
                showPlot(currentId);
            });
            prevPlotBtn.addEventListener("click", () => {
                currentId = getPrevId(currentId);
                showPlot(currentId);
            });

            // Кнопки "Следующая картинка"/"Предыдущая картинка"
            nextImgBtn.addEventListener("click", showNextImage);
            prevImgBtn.addEventListener("click", showPrevImage);
        });


    // Функция показывает участок (по ID)
    function showPlot(id) {
        const data = plotData[id];
        if (!data) return;
    
        // Обновляем активный кружок
        circles.forEach(circle => {
            if (circle.getAttribute("data-id") === id) {
                circle.classList.add("active");
            } else {
                circle.classList.remove("active");
            }
        });
    
        // Заголовок, описание, цена
        titleEl.textContent = data.title;
        descriptionEl.textContent = data.description;
        priceEl.textContent = `Цена: ${data.price}`;
        detailLink.href = `plot.html?id=${id}`;
    
        // Сбрасываем индекс картинки на первую
        currentImgIndex = 0;
    
        // Рендерим картинки
        renderGalleryImages(data.images);
    
        // Запускаем автопереключение
        startImageAutoScroll();
    }
    

    // Создаёт/обновляет DOM-элементы <img> в галерее
    function renderGalleryImages(images) {
        const gallery = document.querySelector(".gallery");
        // Очищаем галерею
        gallery.innerHTML = "";

        if (!images || images.length === 0) {
            return;
        }

        // Создаём теги <img> для каждой картинки
        images.forEach((src, index) => {
            const img = document.createElement("img");
            img.src = src;
            img.classList.add("round-border");
            // Добавляем класс active только для первой картинки
            if (index === 0) {
                img.classList.add("active");
            }
            gallery.appendChild(img);
        });
    }

    // Показывает нужную картинку по индексу, остальные скрывает
    function updateGalleryImage(indexToShow) {
        const gallery = document.querySelector(".gallery");
        const imgs = gallery.querySelectorAll("img");
        if (!imgs.length) return;

        imgs.forEach((img, idx) => {
            img.classList.remove("active");
            if (idx === indexToShow) {
                img.classList.add("active");
            }
        });
    }

    // Следующая/предыдущая картинка
    function showNextImage() {
        const images = plotData[currentId].images;
        if (!images || !images.length) return;

        currentImgIndex = (currentImgIndex + 1) % images.length;
        updateGalleryImage(currentImgIndex);

        // сбрасываем автопрокрутку, чтобы заново запустить
        restartImageAutoScroll();
    }

    function showPrevImage() {
        const images = plotData[currentId].images;
        if (!images || !images.length) return;

        currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
        updateGalleryImage(currentImgIndex);

        // сбрасываем автопрокрутку, чтобы заново запустить
        restartImageAutoScroll();
    }

    // Запустить автопрокрутку слайдов
    function startImageAutoScroll() {
        stopImageAutoScroll(); // на всякий случай остановим предыдущий интервал

        const images = plotData[currentId].images;
        if (!images || images.length <= 1) return; // 1 картинку не крутим

        imageRotationInterval = setInterval(() => {
            showNextImage();
        }, 2200); // смена каждые 3 секунды
    }

    // Остановить автопрокрутку
    function stopImageAutoScroll() {
        if (imageRotationInterval) {
            clearInterval(imageRotationInterval);
            imageRotationInterval = null;
        }
    }

    // Перезапустить автопрокрутку
    function restartImageAutoScroll() {
        stopImageAutoScroll();
        startImageAutoScroll();
    }

    // Функции для поиска следующего/предыдущего участка
    function getNextId(id) {
        const keys = Object.keys(plotData).sort((a, b) => Number(a) - Number(b));
        const idx = keys.indexOf(id);
        return keys[(idx + 1) % keys.length];
    }
    function getPrevId(id) {
        const keys = Object.keys(plotData).sort((a, b) => Number(a) - Number(b));
        const idx = keys.indexOf(id);
        return keys[(idx - 1 + keys.length) % keys.length];
    }
});