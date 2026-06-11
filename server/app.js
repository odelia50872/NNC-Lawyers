const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');
const financialReportRoutes = require('./routes/financialReportRoutes');
const contactRoutes = require('./routes/emailRoutes');
const legalArticleRoutes = require('./routes/legalArticleRoutes');

const rentalAgreementRoutes = require('./routes/rentalAgreementRoutes');
const identityRoutes = require('./routes/identityRoutes');
const insuranceRoutes = require('./routes/insuranceRoutes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/financial-reports', financialReportRoutes);
app.use('/api/rental-agreements', rentalAgreementRoutes);
app.use('/api/identity-documents', identityRoutes);
app.use('/api/insurance-policies', insuranceRoutes);
app.use('/api/legal-articles', legalArticleRoutes);

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error', details: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
