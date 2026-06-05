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
    id          INT AUTO_INCREMENT PRIMARY KEY,
    full_name   VARCHAR(100)  NOT NULL,
    email       VARCHAR(100)  NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    phone       VARCHAR(20),
    role        ENUM('client', 'admin') DEFAULT 'client',
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================================
-- טבלת דוחות כספיים
-- ================================================

CREATE TABLE IF NOT EXISTS financial_reports (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    client_id       INT           NOT NULL,
    month           VARCHAR(20)   NOT NULL,
    report_year     INT           NOT NULL,
    credit          DECIMAL(10,2) NOT NULL,
    management_fees DECIMAL(10,2) DEFAULT 0,
    repairs         DECIMAL(10,2) DEFAULT 0,
    bank_charges    DECIMAL(10,2) DEFAULT 0,
    miscellaneous   DECIMAL(10,2) DEFAULT 0,
    taxes           DECIMAL(10,2) DEFAULT 0,
    total_expenses  DECIMAL(10,2) NOT NULL,
    balance         DECIMAL(10,2) NOT NULL,
    net_transfer    DECIMAL(10,2) NOT NULL,
    created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- ================================================
-- נתוני דוגמה - לקוח
-- ================================================

INSERT INTO clients (full_name, email, password_hash, phone, role) VALUES
('לקוח לדוגמה',  'client@nnc-law.co.il', '$2b$10$rB7eT9ddyRf7nv3XpdoBzuGv44QT2MM.JIE1udpDU1U/mq.JTUuvy', '050-0000000', 'client'),
('מנהל מערכת',   'admin@nnc-law.co.il',  '$2b$10$Pw4CRVET6i29KX.m8sNQte0dn5PPszRJf5USbAk0FGvB2SFgRodc6',  '050-1111111', 'admin');

-- ================================================
-- נתוני דוגמה - דוחות כספיים 2024
-- ================================================

INSERT INTO financial_reports
    (client_id, month, report_year, credit, management_fees, repairs, bank_charges, miscellaneous, taxes, total_expenses, balance, net_transfer)
VALUES
    (1, 'ינואר',  2024, 5200.00, 429.52, 450.00, 5.50,    0.00, 0, 885.02,  4314.98, 4320.48),
    (1, 'פברואר', 2024, 5200.00, 429.52,   0.00, 5.50,  413.00, 0, 848.02,  4351.98, 4357.48),
    (1, 'מרץ',    2024, 4800.00, 396.48,   0.00, 5.50,    0.00, 0, 401.98,  4398.02, 4403.52),
    (1, 'אפריל',  2024, 5200.00, 429.52,   0.00, 5.50, 1534.00, 0, 1969.02, 3230.98, 3236.48),
    (1, 'מאי',    2024, 5200.00, 429.52, 162.00, 5.50,    0.00, 0, 597.02,  4602.98, 4608.48),
    (1, 'יוני',   2024, 5200.00, 429.52,   0.00, 5.50,    0.00, 0, 435.02,  4764.98, 4770.48);