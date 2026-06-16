const express = require('express');
const router = express.Router();
const { login, googleAuth, forgotPassword, verifyPassword, changePassword, logout, refreshToken, getMe } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/login',           login);
router.post('/google',          googleAuth);
router.post('/forgot-password', forgotPassword);
router.post('/verify-password', verifyToken, verifyPassword);
router.post('/change-password', verifyToken, changePassword);
router.post('/logout',          logout);
router.post('/refresh-token',   verifyToken, refreshToken);
router.get('/me',               getMe);

module.exports = router;
