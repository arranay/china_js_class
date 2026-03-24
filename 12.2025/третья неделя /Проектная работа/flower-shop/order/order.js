// Получение корзины из localStorage
function getCart() {
    const cartStr = localStorage.getItem('cart');
    const cart = JSON.parse(cartStr) || {};
    return cart;
}

$(document).ready(function() {
    const cart = getCart();

    const $cartItemsContainer = $("#cart-items");
    const $totalPriceElement = $("#total-price span");

    // Отображение товаров в корзине
    function displayCart() {
        $cartItemsContainer.empty(); // Очистка контейнера
        let totalPrice = 0;

        $.each(cart, function(productName, quantity) {
            const product = products.find(p => p.name === productName);
            if (product) {
                const itemPrice = product.price * quantity;
                totalPrice += itemPrice;

                const $itemElement = $("<div>").text(`${productName} x${quantity} — ${itemPrice} ₽`);
                $cartItemsContainer.append($itemElement);
            }
        });

        $totalPriceElement.text(`${totalPrice} ₽`);
    }

    const $orderForm = $("#order-form");
    const $orderConfirmation = $("#order-confirmation");
    const $orderDetails = $("#order-details");
    const $printOrderButton = $("#print-order");

    // Обработчик оформления заказа
    $orderForm.submit(function(event) {
        event.preventDefault();

        const fullName = $("#full-name").val();
        const address = $("#address").val();
        const email = $("#email").val();

        // Проверка полей
        if (!fullName || !address) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        // Скрыть форму, показать подтверждение
        $orderForm.hide();
        $orderConfirmation.show();

        // Отобразить детали заказа
        $orderDetails.html(`
            <p><strong>Имя:</strong> ${fullName}</p>
            <p><strong>Адрес:</strong> ${address}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Товары:</strong></p>
        `);

        $.each(cart, function(productName, quantity) {
            const product = products.find(p => p.name === productName);
            if (product) {
                const itemPrice = product.price * quantity;
                const $itemElement = $("<div>").text(`${productName} x${quantity} — ${itemPrice} ₽`);
                $orderDetails.append($itemElement);
            }
        });

        $orderDetails.append(`<p><strong>Итоговая сумма:</strong> ${$totalPriceElement.text()}</p>`);
    });

    // Распечатать заказ
    $printOrderButton.click(function() {
        window.print();
    });

    // Инициализация
    displayCart();
});
