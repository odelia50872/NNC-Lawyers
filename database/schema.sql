-- ================================================
-- NNC Law - Database Schema
-- MySQL Compatible
-- ================================================

CREATE DATABASE IF NOT EXISTS nnc_law
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE nnc_law;

-- ================================================
-- מחיקת טבלאות קיימות (סדר חשוב - קודם תלויות)
-- ================================================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS financial_reports;
DROP TABLE IF EXISTS rental_agreements;
DROP TABLE IF EXISTS identity_documents;
DROP TABLE IF EXISTS insurance_policies;
DROP TABLE IF EXISTS legal_articles;
DROP TABLE IF EXISTS clients;

SET FOREIGN_KEY_CHECKS = 1;

-- ================================================
-- טבלת לקוחות
-- ================================================

CREATE TABLE clients (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    full_name     VARCHAR(100)  NOT NULL,
    email         VARCHAR(100)  NOT NULL UNIQUE,
    password_hash VARCHAR(255)  NOT NULL,
    phone         VARCHAR(20),
    role          ENUM('client', 'admin') DEFAULT 'client',
    created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- טבלת דוחות כספיים
-- ================================================

CREATE TABLE financial_reports (
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

CREATE TABLE rental_agreements (
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

CREATE TABLE identity_documents (
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

CREATE TABLE legal_articles (
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

CREATE TABLE insurance_policies (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    client_id   INT          NOT NULL,
    title       VARCHAR(255) NOT NULL,
    year        INT          NOT NULL,
    file_url    VARCHAR(500) NOT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- ================================================
-- נתוני לקוחות
-- סיסמה של כולם: 123456
-- ================================================

INSERT INTO clients (full_name, email, password_hash, phone, role) VALUES
('מנהל מערכת',             'admin@nnc-law.co.il',   '$2b$10$LNAeyyn6lf.T9PSqhhqAKeqNv2w8mpIRyYSiM6kcUlpCwhX3xaN12', '050-1111111', 'admin'),
("חג'ג' רבקה ואהרון שרה", 'chajaj@nnc-law.co.il',  '$2b$10$f.WT2IjVWyrEJt.ns7xd1..EikcdSAZ.Q1TNJvbMmx7fEUY0QeYUy', '050-2222222', 'client');

-- ================================================
-- נתוני הסכמי שכירות
-- ================================================

INSERT INTO rental_agreements (client_id, title, year, file_url) VALUES
(2, 'הסכם שכירות חתום',   2024, 'http://localhost:3000/uploads/agreement-1.pdf'),
(2, 'הסכם שכירות חתום 1', 2024, 'http://localhost:3000/uploads/agreement-2.pdf');

-- ================================================
-- נתוני דוחות כספיים
-- ================================================

INSERT INTO financial_reports (client_id, title, year, file_url) VALUES
(2, "דו''ח חצי שנה ראשונה 2024", 2024, 'http://localhost:3000/uploads/report-3-2024-h1.xlsx'),
(2, "דו''ח חצי שנה שנייה 2024",  2024, 'http://localhost:3000/uploads/report-3-2024-h2.xlsx');

-- ================================================
-- נתוני תעודות זהות
-- ================================================

INSERT INTO identity_documents (client_id, title, year, file_url) VALUES
(2, 'תעודת זהות שוכר', 2024, 'http://localhost:3000/uploads/identity-3.pdf');

-- ================================================
-- נתוני פוליסות ביטוח
-- ================================================

INSERT INTO insurance_policies (client_id, title, year, file_url) VALUES
(2, 'פוליסת ביטוח 2025-2026', 2025, 'http://localhost:3000/uploads/insurance-2-2025-2026.pdf'),
(2, 'פוליסת ביטוח 2026-2027', 2026, 'http://localhost:3000/uploads/insurance-2-2026-2027.pdf');


