const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
const { getUserByEmail, updatePassword } = require('../services/userService');
const { resetPasswordEmailContent } = require('../config/emailContent');
const { signToken, setTokenCookie } = require('../tools/tokenUtils');
const transporter = require('../tools/mailer');
const db = require('../tools/db');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) return res.status(401).json({ error: 'INVALID_CREDENTIALS' });

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ error: 'INVALID_CREDENTIALS' });

        const token = signToken(user);
        setTokenCookie(res, token);
        res.json({
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role,
                must_change_password: !!user.must_change_password,
            }
        });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
};

const googleAuth = async (req, res) => {
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
};

const forgotPassword = async (req, res) => {
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
};

const verifyPassword = async (req, res) => {
    const { password } = req.body;
    try {
        const user = await getUserByEmail(req.user.email);
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ error: 'INVALID_PASSWORD' });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Verification failed' });
    }
};

const changePassword = async (req, res) => {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6)
        return res.status(400).json({ error: 'PASSWORD_TOO_SHORT' });
    try {
        await updatePassword(req.user.email, newPassword);
        await db.query('UPDATE clients SET must_change_password = 0 WHERE email = ?', [req.user.email]);
        const user = await getUserByEmail(req.user.email);
        const token = signToken(user);
        setTokenCookie(res, token);
        res.json({ success: true, user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role, must_change_password: false } });
    } catch (err) {
        res.status(500).json({ error: 'CHANGE_FAILED' });
    }
};

const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
    res.json({ message: 'Logged out' });
};

const refreshToken = async (req, res) => {
    try {
        const token = signToken(req.user);
        setTokenCookie(res, token);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Token refresh failed' });
    }
};

const getMe = async (req, res) => {
    const token = req.cookies?.token;
    if (!token) return res.json({ user: null });
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ user: { id: decoded.id, email: decoded.email, role: decoded.role, full_name: decoded.full_name } });
    } catch (err) {
        res.json({ user: null, error: err.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'TOKEN_INVALID' });
    }
};

module.exports = { login, googleAuth, forgotPassword, verifyPassword, changePassword, logout, refreshToken, getMe };
