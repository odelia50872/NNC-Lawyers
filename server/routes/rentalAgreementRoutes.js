const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getByClient, create, remove } = require('../controllers/rentalAgreementController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, 'agreement-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/:clientId',  verifyToken, getByClient);
router.post('/',          verifyToken, verifyAdmin, upload.single('file'), create);
router.delete('/:id',     verifyToken, verifyAdmin, remove);

module.exports = router;
