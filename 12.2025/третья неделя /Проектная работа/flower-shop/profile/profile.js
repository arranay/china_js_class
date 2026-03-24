    // Функция для обновления профиля на странице
    function updateProfile() {
        const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
        if (currentUser) {
            $("#usernameDisplay").text(currentUser.name);
            $("#emailDisplay").text(currentUser.email);
        } else {
            alert("Вы не авторизованы. Пожалуйста, войдите в систему.");
            window.location.href = "../auth/auth.html"; // Переадресация на страницу авторизации, если пользователь не авторизован
        }
    }

    $("#backPasswordBtn").click(() => {
        window.location.href = "../index.html"; // Переход на главную страницу
    })

    // Сохранение нового пароля
    $("#savePasswordBtn").click(function () {
        const currentPassword = $("#currentPassword").val();
        const newPassword = $("#newPassword").val();
        const confirmNewPassword = $("#confirmNewPassword").val();

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            alert("Пожалуйста, заполните все поля.");
            return;
        }

        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser || currentUser.password !== currentPassword) {
            alert("Текущий пароль неверный.");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            alert("Новые пароли не совпадают.");
            return;
        }

        // Регулярное выражение для проверки пароля (минимум 8 символов, хотя бы одна заглавная буква, цифра и специальный символ)
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            alert('Пароль должен содержать минимум 8 символов, включая заглавную букву, строчную букву, цифру и специальный символ (!@#$%^&*)');
            return;
        }

        // Обновляем пароль в данных пользователя
        currentUser.password = newPassword;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        alert("Пароль успешно изменён.");
        $("#currentPassword").val("");
        $("#newPassword").val("");
        $("#confirmNewPassword").val("");
    });

    // При загрузке страницы обновляем профиль
    $(document).ready(function () {
        updateProfile();
    });