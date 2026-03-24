$(document).ready(function () {
    // Обработчик формы регистрации
    $("#register-form").submit(function (e) {
        e.preventDefault();

        // Получаем значения полей формы
        const name = $("#name").val();
        const email = $("#email").val();
        const password = $("#password").val();
        const confirmPassword = $("#confirm-password").val();

        // Проверка на совпадение паролей
        if (password !== confirmPassword) {
            alert("Пароли не совпадают. Пожалуйста, попробуйте снова.");
            return;
        }

        // Проверка на существующего пользователя
        const existingUser = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = existingUser.some(user => user.email === email);
        
        if (userExists) {
            alert("Пользователь с таким email уже существует.");
            return;
        }

        // Регулярное выражение для проверки email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Введите корректный email.');
            return;
        }

        // Регулярное выражение для проверки пароля:
        // - Минимум 8 символов
        // - Хотя бы одна заглавная буква
        // - Хотя бы одна строчная буква
        // - Хотя бы одна цифра
        // - Хотя бы один специальный символ (!@#$%^&*)
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(password)) {
            alert('Пароль должен содержать минимум 8 символов, включая заглавную букву, строчную букву, цифру и специальный символ (!@#$%^&*)');
            return;
        }

        // Сохраняем нового пользователя в LocalStorage
        const newUser = {
            name: name,
            email: email,
            password: password
        };

        existingUser.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUser));

        // Переход на страницу авторизации после успешной регистрации
        alert("Регистрация прошла успешно! Вы можете войти в систему.");
        window.location.href = "../auth/auth.html";
    });
});
