const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { login } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/login', login);

router.post('/logout', (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
    });
    res.json({ message: 'Logged out' });
});

router.get('/me', verifyToken, (req, res) => {
    const newToken = jwt.sign(
        { id: req.user.id, email: req.user.email, role: req.user.role },
        process.env.JWT_SECRET,
        { expiresIn: '30m' }
    );
    res.cookie('token', newToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
        maxAge: 30 * 60 * 1000
    });
    res.json({ user: req.user });
});

module.exports = router;
