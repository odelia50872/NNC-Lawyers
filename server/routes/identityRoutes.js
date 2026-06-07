const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { makeController } = require('../controllers/documentController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const { verifySelfOrAdmin } = require('../middleware/userMiddleware');

const { getByClient, create, remove } = makeController('identity_documents');

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => cb(null, 'identity-' + Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.get('/:clientId', verifyToken, verifySelfOrAdmin, getByClient);
router.post('/',         verifyToken, verifyAdmin, upload.single('file'), create);
router.delete('/:id',    verifyToken, verifyAdmin, remove);

module.exports = router;
