# NNC-Law — Law Firm Client Portal

A full-stack web application for **NNC Law**, a bilingual (Hebrew/French) law firm based in Jerusalem. The platform provides a secure client portal for document management, a powerful admin dashboard, and a public-facing website.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [API Reference](#api-reference)
- [Authentication Flow](#authentication-flow)
- [Roles & Permissions](#roles--permissions)

---

## Overview

NNC-Law is a full-stack application consisting of:

- A **public website** presenting the firm, its team, practice areas, and legal articles
- A **client dashboard** where clients can securely access their personal documents
- An **admin dashboard** for managing clients, uploading documents, and publishing legal articles

---

## Features

### Public
- Multilingual support — **Hebrew** and **French** with full RTL/LTR layout switching
- Team profiles with expandable bios
- Practice areas overview
- Contact form with email notification
- Legal articles with accordion display
- Accessibility statement page
- Fully **responsive** design (mobile, tablet, desktop)

### Client Portal
- Secure login with **JWT** (httpOnly cookie) or **Google OAuth**
- Personal dashboard with tabs:
  - Financial Reports
  - Rental Agreements
  - Insurance Policies
  - Identity Documents
- File download support (PDF, Excel)
- Automatic session refresh with activity tracking
- **Forced password change** on first login (temporary password flow)

### Admin Dashboard
- Add / delete clients with automatic welcome email (temporary password)
- Upload, update, and delete documents per client per category
- Manage legal articles (Hebrew + French content)
- Admin action confirmation with password re-verification
- Paginated and searchable client list

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 8 | Build tool |
| React Router DOM | 7 | Client-side routing |
| Axios | 1.17 | HTTP client |
| @react-oauth/google | 0.13 | Google OAuth |
| react-icons | 5 | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | — | Runtime |
| Express | 5 | Web framework |
| MySQL2 | 3 | Database driver |
| bcrypt | 6 | Password hashing |
| jsonwebtoken | 9 | JWT authentication |
| nodemailer | 8 | Email sending |
| multer | 2 | File uploads |
| helmet | 8 | Security headers |
| express-rate-limit | 8 | Rate limiting |
| google-auth-library | 10 | Google token verification |
| dotenv | 16 | Environment variables |

### Database
- **MySQL** — relational database with foreign key constraints

---

## Project Structure

```
NNC-Lawyers/
├── client/                        # React frontend (Vite)
│   ├── public/
│   └── src/
│       ├── API/                   # Axios API service
│       ├── assets/                # Images and logos
│       ├── components/
│       │   ├── adminPage/         # Admin UI components
│       │   ├── clientPage/        # Client dashboard components
│       │   ├── notifications/     # Toast notification system
│       │   ├── Header.jsx
│       │   ├── footer.jsx
│       │   ├── LanguageSwitcher.jsx
│       │   ├── ProtectedRoute.jsx
│       │   └── PublicLayout.jsx
│       ├── context/
│       │   ├── AuthContext.jsx    # Global auth state
│       │   ├── LanguageContext.jsx
│       │   └── translations.js   # All UI strings (he/fr)
│       ├── hooks/                 # Custom React hooks
│       ├── pages/
│       │   ├── admin/             # Admin dashboard
│       │   ├── auth/              # Login, ChangePassword
│       │   ├── client/            # Client dashboard
│       │   └── public/            # About, Team, Contact, etc.
│       └── styles/                # Per-component CSS files
│
├── server/                        # Express backend
│   ├── controllers/
│   │   ├── authController.js      # Login, Google, password flows
│   │   ├── userController.js      # CRUD for clients
│   │   ├── emailController.js     # Contact & welcome emails
│   │   ├── documentController.js  # Document upload/delete
│   │   └── legalArticleController.js
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification, admin guard
│   │   └── userMiddleware.js      # Self-or-admin guard
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── emailRoutes.js
│   │   ├── userRoutes.js (clientRoutes)
│   │   ├── legalArticleRoutes.js
│   │   └── makeDocRouter.js       # Dynamic document router factory
│   ├── services/
│   │   ├── userService.js         # DB queries for users
│   │   ├── documentService.js
│   │   ├── legalArticleService.js
│   │   └── SQLRequest.js          # Generic safe query helpers
│   ├── tools/
│   │   ├── db.js                  # MySQL connection pool
│   │   ├── mailer.js              # Nodemailer transporter
│   │   └── tokenUtils.js          # signToken, setTokenCookie
│   ├── config/
│   │   └── emailContent.js        # Email templates (he/fr)
│   ├── uploads/                   # Uploaded files (served statically)
│   └── app.js                     # Express app entry point
│
└── database/
    └── schema.sql                 # Full DB schema + seed data
```

---

## Getting Started

### Prerequisites
- Node.js >= 18
- MySQL >= 8

### 1. Clone the repository
```bash
git clone <repository-url>
cd NNC-Lawyers
```

### 2. Install dependencies
```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 3. Configure environment variables
See [Environment Variables](#environment-variables) below.

### 4. Set up the database
```bash
mysql -u root -p < database/schema.sql
```

### 5. Run the application
```bash
# Terminal 1 — Start the server
cd server
node app.js

# Terminal 2 — Start the client
cd client
npm run dev
```

The client runs on `http://localhost:5173`  
The server runs on `http://localhost:3000`

---

## Environment Variables

### `server/.env`
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=nnc_law
PORT=3000
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
GOOGLE_CLIENT_ID=your_google_client_id
```

### `client/.env`
```env
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

> **Note:** `EMAIL_PASS` must be a **Gmail App Password**, not your regular Gmail password.  
> Generate one at: Google Account → Security → 2-Step Verification → App Passwords

---

## Database Setup

The schema creates the following tables:

| Table | Description |
|---|---|
| `clients` | Users (clients and admins) with hashed passwords |
| `financial_reports` | Financial report files per client |
| `rental_agreements` | Rental agreement files per client |
| `identity_documents` | Identity document files per client |
| `insurance_policies` | Insurance policy files per client |
| `legal_articles` | Bilingual legal articles (Hebrew + French) |

To add the `must_change_password` column to an existing database:
```sql
ALTER TABLE clients ADD COLUMN IF NOT EXISTS must_change_password TINYINT(1) DEFAULT 0;
```

---

## API Reference

### Auth — `/api/auth`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/login` | — | Email/password login |
| POST | `/google` | — | Google OAuth login |
| POST | `/forgot-password` | — | Send password reset email |
| POST | `/change-password` | JWT | Change password (first login) |
| POST | `/verify-password` | JWT | Verify current password |
| POST | `/logout` | — | Clear session cookie |
| POST | `/refresh-token` | JWT | Refresh JWT token |
| GET | `/me` | — | Get current user from cookie |

### Clients — `/api/clients`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | Admin | Get all clients |
| GET | `/paginated` | Admin | Get clients paginated |
| GET | `/search?q=` | Admin | Search clients |
| GET | `/:id` | Self/Admin | Get client by ID |
| POST | `/` | Admin | Create client + send welcome email |
| PUT | `/:id` | Self/Admin | Update client |
| DELETE | `/:id` | Admin | Delete client |

### Documents — `/api/financial-reports`, `/api/rental-agreements`, `/api/insurance-policies`, `/api/identity-documents`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/:clientId` | Self/Admin | Get documents for client |
| POST | `/` | Admin | Upload document |
| PUT | `/:id` | Admin | Update document metadata |
| DELETE | `/:id` | Admin | Delete document + file |

### Legal Articles — `/api/legal-articles`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | — | Get all articles |
| POST | `/` | Admin | Create article |
| PUT | `/:id` | Admin | Update article |
| DELETE | `/:id` | Admin | Delete article |

### Email — `/api/contact`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/` | — | Send contact form email |
| POST | `/welcome` | Admin | Send welcome email to client |

---

## Authentication Flow

```
1. Client submits email + password
2. Server verifies credentials, signs JWT (30min expiry)
3. JWT stored in httpOnly cookie (not accessible via JS)
4. On each request, middleware verifies the cookie
5. Token auto-refreshes on user activity via useTokenManager hook
6. On logout, cookie is cleared server-side
```

### First Login Flow (Temporary Password)
```
1. Admin creates client → server generates temporary password
2. Welcome email sent with temporary password
3. Client logs in → server returns must_change_password: true
4. Client is redirected to /nnc/change-password
5. Client sets new password → must_change_password reset to 0
6. Client proceeds to dashboard
```

---

## Roles & Permissions

| Action | Client | Admin |
|---|---|---|
| View own documents | ✅ | ✅ |
| View other clients' documents | ❌ | ✅ |
| Upload / delete documents | ❌ | ✅ |
| Manage clients | ❌ | ✅ |
| Manage legal articles | ❌ | ✅ |
| Access admin dashboard | ❌ | ✅ |
| View public pages | ✅ | ✅ |
