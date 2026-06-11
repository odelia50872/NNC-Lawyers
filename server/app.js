const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const contactRoutes = require('./routes/emailRoutes');
const legalArticleRoutes = require('./routes/legalArticleRoutes');
const { makeDocRouter } = require('./routes/makeDocRouter');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/financial-reports',  makeDocRouter('financial_reports',   'report'));
app.use('/api/rental-agreements',  makeDocRouter('rental_agreements',   'agreement'));
app.use('/api/identity-documents', makeDocRouter('identity_documents',  'identity'));
app.use('/api/insurance-policies', makeDocRouter('insurance_policies',  'insurance'));
app.use('/api/legal-articles', legalArticleRoutes);

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
