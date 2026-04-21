/**
 * Основной файл скриптов для сайта приюта
 */

// Функция регистрации
async function register(event) {
    // Предотвращаем перезагрузку страницы
    if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
    }

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        // Отправляем данные на сервер
        const response = await fetch('./auth.php?action=register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        // Проверяем, что ответ пришел в формате JSON
        const text = await response.text();
        let result;
        try {
            result = JSON.parse(text);
        } catch (e) {
            console.error('Server returned non-JSON:', text);
            throw new Error('Сервер вернул некорректный ответ. Проверьте auth.php');
        }

        if (result.success) {
            alert('Регистрация прошла успешно!');
            window.location.href = 'login.html';
        } else {
            alert('Ошибка: ' + result.message);
        }
    } catch (error) {
        console.error('Register error:', error);
        alert('Произошла ошибка при регистрации: ' + error.message);
    }
}

// Функция входа
async function login(event) {
    if (event && typeof event.preventDefault === 'function') {
        event.preventDefault();
    }

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('./auth.php?action=login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert('Вы успешно вошли!');
            window.location.href = 'index.html';
        } else {
            alert('Ошибка: ' + result.message);
        }
    } catch (error) {
        console.error('Login error:', error);
        alert('Ошибка при входе. Проверьте соединение с сервером.');
    }
}

// Проверка статуса сессии
async function checkSession() {
    try {
        const response = await fetch('./auth.php?action=check');
        const result = await response.json();
        
        const authLinks = document.querySelector('.nav-links');
        if (authLinks && result.isLoggedIn) {
            // Если пользователь вошел, можно изменить меню (например, скрыть "Войти")
            console.log('Пользователь авторизован');
        }
    } catch (error) {
        console.log('Пользователь не авторизован или ошибка сессии');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Находим формы по ID
    const regForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');

    // Привязываем обработчики, если формы найдены на странице
    if (regForm) {
        regForm.addEventListener('submit', register);
    }

    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }

    // Проверяем сессию
    checkSession();
});
