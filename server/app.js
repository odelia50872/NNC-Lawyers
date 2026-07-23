const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/emailRoutes');
const legalArticleRoutes = require('./routes/legalArticleRoutes');
const { makeDocRouter } = require('./routes/makeDocRouter');

const app = express();

app.set('trust proxy', 1);

// הגדרת CORS שמתאמת אוטומטית לכל דומיין של Vercel ולוקאל
app.use(cors({ 
    origin: function (origin, callback) {
        if (!origin || origin.includes('vercel.app') || origin.includes('localhost')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }, 
    credentials: true 
}));

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

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
app.use('/api/financial-reports',  makeDocRouter('financial_reports',   'report'));
app.use('/api/rental-agreements',  makeDocRouter('rental_agreements',   'agreement'));
app.use('/api/identity-documents', makeDocRouter('identity_documents',  'identity'));
app.use('/api/insurance-policies', makeDocRouter('insurance_policies',  'insurance'));
app.use('/api/legal-articles', legalArticleRoutes);

app.use((err, req, res, next) => {
    console.error('*** ACTUAL ERROR: ***', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));

module.exports = app;