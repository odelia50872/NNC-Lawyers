const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const nodemailer = require('nodemailer');
const { login } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { getUserByEmail, updatePassword } = require('../services/userService');
const { resetPasswordEmailContent } = require('../config/emailContent');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

const signToken = (user) => jwt.sign(
    { id: user.id, email: user.email, role: user.role, full_name: user.full_name },
    process.env.JWT_SECRET,
    { expiresIn: '30m' }
);

const setTokenCookie = (res, token) => res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    maxAge: 30 * 60 * 1000,
});

router.post('/login', login);

router.post('/google', async (req, res) => {
    const { credential } = req.body;
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { email } = ticket.getPayload();
        const user = await getUserByEmail(email);
        if (!user) return res.status(403).json({ error: 'USER_NOT_FOUND' });
        const token = signToken(user);
        setTokenCookie(res, token);
        res.json({ user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(401).json({ error: 'GOOGLE_AUTH_FAILED' });
    }
});

router.post('/forgot-password', async (req, res) => {
    const { email, lang } = req.body;
    try {
        const user = await getUserByEmail(email);
        if (!user) return res.status(404).json({ error: 'USER_NOT_FOUND' });
        const newPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-4).toUpperCase();
        await updatePassword(email, newPassword);
        const { subject, html } = (resetPasswordEmailContent[lang] || resetPasswordEmailContent.he)(user.full_name, newPassword);
        await transporter.sendMail({
            from: `"NNC-Law" <${process.env.EMAIL_USER}>`,
            to: email,
            subject,
            html,
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'RESET_FAILED' });
    }
});

router.post('/verify-password', verifyToken, async (req, res) => {
    const { password } = req.body;
    try {
        const user = await getUserByEmail(req.user.email);
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ error: 'INVALID_PASSWORD' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Verification failed' });
    }
});

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
    res.json({ message: 'Logged out' });
});

router.post('/refresh-token', verifyToken, async (req, res) => {
    try {
        const token = signToken(req.user);
        setTokenCookie(res, token);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Token refresh failed' });
    }
});

router.get('/me', async (req, res) => {
    const token = req.cookies?.token;
    if (!token) return res.json({ user: null });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ user: { id: decoded.id, email: decoded.email, role: decoded.role, full_name: decoded.full_name } });
    } catch (err) {
        res.json({ user: null, error: err.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID' });
    }
});

module.exports = router;
