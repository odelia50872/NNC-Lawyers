const express = require('express');
const router = express.Router();
const { sendContactEmail, sendWelcomeEmail } = require('../controllers/emailController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/',        sendContactEmail);
router.post('/welcome', verifyToken, verifyAdmin, sendWelcomeEmail);

module.exports = router;
