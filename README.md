# NNC-Law - Law Firm Client Portal

A full-stack web application for **NNC Law**, a bilingual (Hebrew/French) law firm based in Jerusalem. The platform provides a secure client portal for document management, a powerful admin dashboard, and a public-facing website.

> **Live Production Project:** This platform is fully deployed and actively used in production by the law firm and its clients. You can visit the live application here: [https://www.nnc-law.com](https://www.nnc-law.com)

---

## 📸 Preview
<div align="center">
  <img src="<img width="1882" height="872" alt="צילום מסך 2026-10-23 125539" src="https://github.com/user-attachments/assets/c55f68ed-17b3-42bf-aa7f-24837a65888a" />
" alt="NNC-Law Public Website" width="800px" />
  <p><em>האתר הציבורי - אודות המשרד</em></p>
</div>

<div align="center">
  <img src="<img width="1852" height="867" alt="צילום מסך 2026-10-23 125911" src="https://github.com/user-attachments/assets/99cce098-ca6d-4dfd-9609-e0ec46e60252" />
" alt="Admin Dashboard" width="800px" />
  <p><em>לוח בקרה ניהולי - ניהול לקוחות ומסמכים</em></p>
</div>

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
  - Power of Attorney
  - Photos
  - Miscellaneous
- File download support (PDF, Excel, images)
- Automatic session refresh with activity tracking
- **Forced password change** on first login (temporary password flow)

### Admin Dashboard
- Add / delete clients with automatic welcome email (temporary password)
- Upload, update, and delete documents per client per category (7 categories)
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
- **Production:** hosted on Railway (with persistent volume for uploads)
- **Local:** MySQL running on localhost

---

## Project Structure

```
NNC-Lawyers/
├── client/                        # React frontend (Vite)
│   ├── public/
│   │   ├── sitemap.xml            # SEO sitemap
│   │   └── robots.txt
│   └── src/
│       ├── API/                   # Axios API service
│       ├── assets/                # Images and logos
│       ├── components/
│       │   ├── adminPage/         # Admin UI components
│       │   ├── clientPage/        # Client dashboard components
│       │   │   └── DocumentList.jsx  # Shared document list component
│       │   ├── notifications/     # Toast notification system (with local CSS)
│       │   ├── Header.jsx
│       │   ├── Footer.jsx
│       │   ├── LanguageSwitcher.jsx
│       │   ├── LegalArticles.jsx
│       │   ├── ProtectedRoute.jsx
│       │   ├── PublicLayout.jsx
│       │   └── ScrollToTop.jsx
│       ├── context/
│       │   ├── AuthContext.jsx    # Global auth state
│       │   ├── LanguageContext.jsx
│       │   └── translations.js   # All UI strings (he/fr)
│       ├── hooks/                 # Custom React hooks
│       │   ├── useAdminAuth.jsx
│       │   ├── useClientSearch.js
│       │   ├── useDocuments.js
│       │   ├── useSlug.js
│       │   ├── useTabsNav.js
│       │   └── useTokenManager.js
│       ├── pages/
│       │   ├── admin/             # Admin dashboard
│       │   ├── auth/              # Login, ChangePassword
│       │   ├── client/            # Client dashboard
│       │   └── public/            # About, Team, Contact, PracticeAreas, etc.
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
│   │   ├── userRoutes.js
│   │   ├── legalArticleRoutes.js
│   │   └── makeDocRouter.js       # Dynamic document router factory
│   ├── services/
│   │   ├── userService.js         # DB queries for users
│   │   ├── documentService.js
│   │   ├── legalArticleService.js
│   │   └── SQLRequest.js          # Generic safe query helpers
│   ├── templates/
│   │   └── emailTemplates.js      # Email templates (he/fr)
│   ├── tools/
│   │   ├── db.js                  # MySQL connection pool (Railway or local)
│   │   ├── mailer.js              # Nodemailer transporter
│   │   └── tokenUtils.js          # signToken, setTokenCookie
│   ├── uploads/                   # Uploaded files (served statically)
│   │   └── .gitkeep               # Keeps folder in git without files
│   └── app.js                     # Express app entry point
│
└── database/
    ├── schema.sql                 # DB schema — safe to run (CREATE IF NOT EXISTS)
    └── import-db.js               # One-time script to initialize DB on new environment
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

Or use the import script:
```bash
cd database
node import-db.js
```

> **Note:** `schema.sql` uses `CREATE TABLE IF NOT EXISTS` — safe to run on existing databases without data loss.

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
DATABASE_URL=mysql://user:password@host:port/dbname
PORT=3000
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
GOOGLE_CLIENT_ID=your_google_client_id
SERVER_URL=http://localhost:3000
```

### `client/.env`
```env
VITE_API_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

> **Notes:**
> - `EMAIL_PASS` must be a **Gmail App Password** - generate at: Google Account → Security → 2-Step Verification → App Passwords
> - In production (Railway), `MYSQL_URL` or `MYSQL_PUBLIC_URL` are injected automatically — no manual DB config needed
> - `DATABASE_URL` is used only by `database/import-db.js`

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
| `power_of_attorney` | Power of attorney files per client |
| `photos` | Photo files per client |
| `miscellaneous` | Miscellaneous files per client |
| `legal_articles` | Bilingual legal articles (Hebrew + French) |

### File Storage
- **Local:** files saved to `server/uploads/`
- **Production:** files saved to `/app/uploads/` on Railway persistent volume
- Uploaded files are **not committed to git** (see `.gitignore`)

---

## API Reference

### Auth - `/api/auth`
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

### Clients - `/api/clients`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | Admin | Get all clients |
| GET | `/paginated` | Admin | Get clients paginated |
| GET | `/search?q=` | Admin | Search clients |
| GET | `/:id` | Self/Admin | Get client by ID |
| POST | `/` | Admin | Create client + send welcome email |
| PUT | `/:id` | Self/Admin | Update client |
| DELETE | `/:id` | Admin | Delete client |

### Documents - `/api/financial-reports`, `/api/rental-agreements`, `/api/insurance-policies`, `/api/identity-documents`, `/api/power-of-attorney`, `/api/photos`, `/api/miscellaneous`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/:clientId` | Self/Admin | Get documents for client |
| POST | `/` | Admin | Upload document |
| PUT | `/:id` | Admin | Update document metadata |
| DELETE | `/:id` | Admin | Delete document + file |

### Legal Articles - `/api/legal-articles`
| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/` | — | Get all articles |
| POST | `/` | Admin | Create article |
| PUT | `/:id` | Admin | Update article |
| DELETE | `/:id` | Admin | Delete article |

### Email - `/api/contact`
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

---

## Accessibility

The site is built to **WCAG 2.1 AA** standards:
- Full keyboard navigation
- ARIA attributes on all interactive elements
- RTL/LTR support per language
- Color contrast compliant
- Screen reader compatible
- Responsive for all screen sizes

See the live [Accessibility Statement](https://www.nnc-law.com/accessibility) for full details.
