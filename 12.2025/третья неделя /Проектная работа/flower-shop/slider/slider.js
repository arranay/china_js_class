$(document).ready(function () {
    const slider = $('.slider');
    const slides = $('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Обновление положения слайдера
    function updateSlider() {
        const offset = -currentIndex * 100; // Сдвиг в процентах
        slider.css('transform', `translateX(${offset}%)`);
    }

    // Обработчик кнопки "Следующий"
    $('.next').click(function () {
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
        } else {
            currentIndex = 0; // Вернуться к первому слайду
        }
        updateSlider();
    });

    // Обработчик кнопки "Предыдущий"
    $('.prev').click(function () {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = totalSlides - 1; // Перейти к последнему слайду
        }
        updateSlider();
    });
});