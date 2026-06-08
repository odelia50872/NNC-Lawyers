const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getReportsByClientId, create, update, remove } = require('../controllers/financialReportController');
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

router.put('/doc/:id',        verifyToken, verifyAdmin, upload.single('file'), update);
router.delete('/doc/:id',     verifyToken, verifyAdmin, remove);
router.get('/:clientId',      verifyToken, verifySelfOrAdmin, getReportsByClientId);
router.post('/',              verifyToken, verifyAdmin, upload.single('file'), create);

module.exports = router;
