$(document).ready(function () {
    // Авторизация
    $("#auth-form").on("submit", function (event) {
        event.preventDefault();

        const email = $("#email").val();
        const password = $("#password").val();

        // Проверка на наличие данных в Local Storage
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users.find(u => u.email === email);
        if (user && user.password === password) {
            alert("Успешный вход!");
            sessionStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "../index.html"; // Переход на страницу товаров
        } else {
            alert("Неверный email или пароль!");
        }
    });

    // Регистрация
    $("#register-link").on("click", function (event) {
        event.preventDefault();
        window.location.href = "../register/register.html"; // Переход на страницу регистрации
    });
});


