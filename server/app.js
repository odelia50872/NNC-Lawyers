const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const db = require('./tools/db');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/emailRoutes');
const legalArticleRoutes = require('./routes/legalArticleRoutes');
const { makeDocRouter } = require('./routes/makeDocRouter');

const app = express();

app.set('trust proxy', 1);

const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://nnc-lawyers.vercel.app',
    'https://nnc-lawyers-production.up.railway.app',
    process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(helmet({ contentSecurityPolicy: false, crossOriginResourcePolicy: false }));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('/app/uploads'));

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Server is running smoothly' });
});

app.get('/', (req, res) => {
    res.send('NNC Lawyers Backend is running');
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: { error: 'TOO_MANY_REQUESTS' }
});
app.use('/api/auth/login', authLimiter);
app.use('/api/auth/forgot-password', authLimiter);

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/clients', userRoutes);
app.use('/api/financial-reports',  makeDocRouter('financial_reports',  'report'));
app.use('/api/rental-agreements',  makeDocRouter('rental_agreements',  'agreement'));
app.use('/api/identity-documents', makeDocRouter('identity_documents', 'identity'));
app.use('/api/insurance-policies', makeDocRouter('insurance_policies', 'insurance'));
app.use('/api/legal-articles', legalArticleRoutes);

const clientBuild = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientBuild)) {
    app.use(express.static(clientBuild));
    app.get('*', (req, res) => {
        res.sendFile(path.join(clientBuild, 'index.html'));
    });
}

app.use((err, req, res, next) => {
    console.error('Error:', err.stack || err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

async function initDatabase() {
    try {
        await db.query(`CREATE TABLE IF NOT EXISTS clients (
            id INT AUTO_INCREMENT PRIMARY KEY,
            full_name VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            role ENUM('client','admin') DEFAULT 'client',
            must_change_password TINYINT(1) DEFAULT 0
        )`);
        await db.query(`CREATE TABLE IF NOT EXISTS financial_reports (id INT AUTO_INCREMENT PRIMARY KEY, client_id INT, title VARCHAR(255), year INT, file_url TEXT, FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE)`);
        await db.query(`CREATE TABLE IF NOT EXISTS rental_agreements (id INT AUTO_INCREMENT PRIMARY KEY, client_id INT, title VARCHAR(255), year INT, file_url TEXT, FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE)`);
        await db.query(`CREATE TABLE IF NOT EXISTS identity_documents (id INT AUTO_INCREMENT PRIMARY KEY, client_id INT, title VARCHAR(255), year INT, file_url TEXT, FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE)`);
        await db.query(`CREATE TABLE IF NOT EXISTS insurance_policies (id INT AUTO_INCREMENT PRIMARY KEY, client_id INT, title VARCHAR(255), year INT, file_url TEXT, FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE)`);
        await db.query(`CREATE TABLE IF NOT EXISTS legal_articles (id INT AUTO_INCREMENT PRIMARY KEY, title_he TEXT, title_fr TEXT, content_he LONGTEXT, content_fr LONGTEXT)`);
        console.log('Database tables initialized successfully.');
    } catch (err) {
        console.error('Database init error:', err.message);
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server running on port ${PORT}`);
    await initDatabase();
});

module.exports = app;