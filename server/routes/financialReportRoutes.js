const express = require('express');
const router = express.Router();
const { getReportsByClientId } = require('../controllers/financialReportController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifySelfOrAdmin } = require('../middleware/userMiddleware');

router.get('/:clientId', verifyToken, verifySelfOrAdmin, getReportsByClientId);

module.exports = router;
