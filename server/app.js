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
    process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.some(o => origin.startsWith(o)) || origin.includes('railway.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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

// Serve React build
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
    if (process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL || process.env.MYSQLDATABASE) {
        console.log('Cloud environment detected — skipping SQL import.');
        return;
    }
    try {
        const paths = ['./nnc_law_export.sql', './server/nnc_law_export.sql'];
        let sqlContent = null;
        for (let p of paths) {
            if (fs.existsSync(p)) { sqlContent = fs.readFileSync(p, 'utf8'); break; }
        }
        if (sqlContent) {
            const queries = sqlContent.split(';');
            for (let query of queries) {
                if (query.trim()) await db.query(query);
            }
            console.log('Database imported successfully.');
        }
    } catch (err) {
        console.error('Database import error:', err.message);
    }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', async () => {
    console.log(`Server running on port ${PORT}`);
    await initDatabase();
});

module.exports = app;