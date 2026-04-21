-- Создание базы данных
CREATE DATABASE IF NOT EXISTS shelter_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shelter_db;

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Таблица животных (для будущего использования)
CREATE TABLE IF NOT EXISTS animals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    species VARCHAR(50),
    breed VARCHAR(100),
    age INT,
    description TEXT,
    status ENUM('available', 'reserved', 'adopted') DEFAULT 'available',
    category VARCHAR(50),
    photo VARCHAR(255)
) ENGINE=InnoDB;

-- Таблица бронирований
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    animal_id INT NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Добавление стандартного администратора (пароль: admin123)
-- Хеш сгенерирован с помощью password_hash('admin123', PASSWORD_DEFAULT)
INSERT INTO users (name, email, password, role) 
VALUES ('Администратор', 'admin@shelter.ru', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
ON DUPLICATE KEY UPDATE id=id;
