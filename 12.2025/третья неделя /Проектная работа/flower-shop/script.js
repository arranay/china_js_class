// Функция для добавления карточек на страницу
function renderProducts(filteredProducts) {
    const $productContainer = $('.product-container');
    $productContainer.empty(); // Очистить контейнер перед добавлением новых элементов
    filteredProducts.forEach(product => {
        const card = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-name">${product.name}</div>
                    <div class="product-price">${product.price}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="cart-actions">
                        <button class="add-to-cart">Добавить в корзину</button>
                        <div class="quantity-controls" style="display: none;">
                            <button class="decrement">-</button>
                            <span class="quantity">0</span>
                            <button class="increment">+</button>
                        </div>
                    </div>
                </div>
            `;
        $productContainer.append(card); // Добавить карточку в контейнер
    });
};

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

function getCart() {
    const cartStr = localStorage.getItem('cart');  
    const cart = JSON.parse(cartStr) || {};
    return cart;
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Добавляем все товары при загрузке страницы
$(document).ready(function() {
    updateAuthButton();
    renderProducts(products); // Отображаем все товары изначально
    // Фильтрация товаров по введённому в поле поиска тексту
    $('.search-box').on('input', function() {
        const searchQuery = $(this).val().toLowerCase(); // Получаем текст из поля поиска
        const filteredProducts = products.filter(product => {
            return product.name.toLowerCase().includes(searchQuery); // Фильтруем по имени товара
        });
        renderProducts(filteredProducts); // Отображаем отфильтрованные товары
    });

    $('#logout').click((event) => {
        event.preventDefault();
        sessionStorage.clear();
        updateAuthButton();
        alert('Вы успешно вышли из системы!')
    });

    // Обработчик для кнопки "Добавить в корзину"
    $('.add-to-cart').on('click', function () {
        const $parent = $(this).closest('.product-card');
        const productName = $parent.find('.product-name').text();

        const cart = getCart();

        // Добавить в корзину с начальным количеством 1
        cart[productName] = (cart[productName] || 0) + 1;

        // Обновить отображение кнопок
        $(this).hide(); // Скрыть кнопку "Добавить в корзину"
        $parent.find('.quantity-controls').show();
        $parent.find('.quantity').text(cart[productName]);

        saveCart(cart);
    });

    // Обработчик для кнопки "+"
    $('.increment').on('click', function () {
        const $parent = $(this).closest('.product-card');
        const productName = $parent.find('.product-name').text();

        const cart = getCart();

        // Увеличить количество в корзине
        cart[productName] = (cart[productName] || 0) + 1;

        // Обновить отображение количества
        $parent.find('.quantity').text(cart[productName]);

        saveCart(cart);
    });

    // Обработчик для кнопки "-"
    $('.decrement').on('click', function () {
        const $parent = $(this).closest('.product-card');
        const productName = $parent.find('.product-name').text();

        const cart = getCart();

        // Уменьшить количество в корзине
        if (cart[productName] > 1) {
            cart[productName] -= 1;
            $parent.find('.quantity').text(cart[productName]);
        } else {
            // Удалить из корзины, если количество равно 0
            delete cart[productName];
            $parent.find('.quantity-controls').hide();
            $parent.find('.add-to-cart').show();
        }

        saveCart(cart);
    });
});