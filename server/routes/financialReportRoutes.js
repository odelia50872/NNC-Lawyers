const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getReportsByClientId, create, remove } = require('../controllers/financialReportController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const { verifySelfOrAdmin } = require('../middleware/userMiddleware');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        const unique = Date.now() + '-' + Math.round(Math.random() * 1e6);
        cb(null, 'report-' + unique + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

router.get('/:clientId', verifyToken, verifySelfOrAdmin, getReportsByClientId);
router.post('/',         verifyToken, verifyAdmin, upload.single('file'), create);
router.delete('/:id',    verifyToken, verifyAdmin, remove);

module.exports = router;
