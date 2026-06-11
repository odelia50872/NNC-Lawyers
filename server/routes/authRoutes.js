const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { login } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/login', login);

router.post('/verify-password', verifyToken, async (req, res) => {
    const { password } = req.body;
    const { getUserByEmail } = require('../services/userService');
    const bcrypt = require('bcrypt');
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
