// Функция для получения корзины
function getCart() {
    const cartStr = localStorage.getItem('cart');
    return JSON.parse(cartStr) || {};
}

// Функция для обновления состояния кнопки
function updateAuthButton() {
    const user = sessionStorage.getItem('currentUser'); // Получаем данные пользователя из localStorage
    if (user) {
        $('#logout').show();
        $('#login').hide();
    } else {
        $('#logout').hide();
        $('#login').show();
    }
}

// Функция для рендеринга товаров в корзине
function renderCart() {
    updateAuthButton();

    const cart = getCart();
    const $cartItems = document.querySelector('.cart-items');
    const $totalPrice = document.querySelector('.total-price');

    $cartItems.innerHTML = ''; // Очистить список перед добавлением

    let totalPrice = 0;

    Object.keys(cart).forEach(productName => {
        const product = products.find(p => p.name === productName);
        const quantity = cart[productName];
        const itemTotal = product.price * quantity;

        totalPrice += itemTotal;

        const cartItem = `
            <div class="cart-item">
                <div class="item-info">
                    <img src="../${product.image}" alt="${product.name}">
                    <span>${product.name} x ${quantity}</span>
                </div>
                <span>${itemTotal} ₽</span>
            </div>
        `;
        $cartItems.innerHTML += cartItem;
    });

    $totalPrice.textContent = `${totalPrice} ₽`;

    $('#logout').click((event) => {
        event.preventDefault();
        sessionStorage.clear();
        updateAuthButton();
        alert('Вы успешно вышли из системы!')
    });
}

// Запуск при загрузке страницы
$(document).ready(function () {
    renderCart();
})