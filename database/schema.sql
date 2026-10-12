-- ================================================
-- NNC Law - Database Schema
-- MySQL Compatible
-- ================================================

CREATE DATABASE IF NOT EXISTS nnc_law
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE nnc_law;

-- ================================================
-- טבלת לקוחות
-- ================================================

CREATE TABLE IF NOT EXISTS clients (
    id                   INT AUTO_INCREMENT PRIMARY KEY,
    full_name            VARCHAR(100)  NOT NULL,
    email                VARCHAR(100)  NOT NULL UNIQUE,
    password_hash        VARCHAR(255)  NOT NULL,
    phone                VARCHAR(20),
    role                 ENUM('client', 'admin') DEFAULT 'client',
    must_change_password TINYINT(1)    DEFAULT 0,
    created_at           TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- טבלת דוחות כספיים
-- ================================================

CREATE TABLE IF NOT EXISTS financial_reports (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    client_id   INT          NOT NULL,
    title       VARCHAR(255) NOT NULL,
    year        INT          NOT NULL,
    file_url    VARCHAR(500) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- ================================================
-- טבלת הסכמי שכירות
-- ================================================

CREATE TABLE IF NOT EXISTS rental_agreements (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    client_id   INT          NOT NULL,
    title       VARCHAR(255) NOT NULL,
    year        INT          NOT NULL,
    file_url    VARCHAR(500) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- ================================================
-- טבלת תעודות זהות
-- ================================================

CREATE TABLE IF NOT EXISTS identity_documents (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    client_id   INT          NOT NULL,
    title       VARCHAR(255) NOT NULL,
    year        INT          NOT NULL,
    file_url    VARCHAR(500) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- ================================================
-- טבלת מאמרים משפטיים
-- ================================================

CREATE TABLE IF NOT EXISTS legal_articles (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    title_he   VARCHAR(255) NOT NULL,
    content_he TEXT         NOT NULL,
    title_fr   VARCHAR(255) NOT NULL,
    content_fr TEXT         NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- טבלת פוליסות ביטוח
-- ================================================

CREATE TABLE IF NOT EXISTS insurance_policies (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    client_id   INT          NOT NULL,
    title       VARCHAR(255) NOT NULL,
    year        INT          NOT NULL,
    file_url    VARCHAR(500) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS power_of_attorney (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    title     VARCHAR(255),
    year      INT,
    file_url  TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS photos (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    title     VARCHAR(255),
    year      INT,
    file_url  TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS miscellaneous (
    id        INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT,
    title     VARCHAR(255),
    year      INT,
    file_url  TEXT,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- ================================================
-- נתוני ברירת מחדל — מנהל מערכת
-- סיסמה: 123456
-- ================================================

INSERT IGNORE INTO clients (full_name, email, password_hash, phone, role) VALUES
('מנהל מערכת', 'nnc@nnc-law.co.il', '$2b$10$LNAeyyn6lf.T9PSqhhqAKeqNv2w8mpIRyYSiM6kcUlpCwhX3xaN12', '02-6437311', 'admin');
