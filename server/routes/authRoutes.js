const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { login } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');
const { getUserById } = require('../services/userService');

router.post('/login', login);

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
        let full_name = decoded.full_name;
        if (!full_name) {
            const dbUser = await getUserById(decoded.id);
            full_name = dbUser?.full_name || '';
        }
        const newToken = jwt.sign(
            { id: decoded.id, email: decoded.email, role: decoded.role, full_name },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );
        res.cookie('token', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 30 * 60 * 1000
        });
        res.json({ user: { id: decoded.id, email: decoded.email, role: decoded.role, full_name } });
    } catch {
        res.json({ user: null });
    }
});

module.exports = router;
