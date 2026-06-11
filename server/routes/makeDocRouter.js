const express = require('express');
const multer = require('multer');
const path = require('path');
const { makeController } = require('../controllers/documentController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const { verifySelfOrAdmin } = require('../middleware/userMiddleware');

const makeDocRouter = (table, filePrefix) => {
    const router = express.Router();
    const { getByClient, create, update, remove } = makeController(table);

    const storage = multer.diskStorage({
        destination: 'uploads/',
        filename: (req, file, cb) => cb(null, filePrefix + '-' + Date.now() + path.extname(file.originalname))
    });
    const upload = multer({ storage });

    router.get('/:clientId',  verifyToken, verifySelfOrAdmin, getByClient);
    router.post('/',          verifyToken, verifyAdmin, upload.single('file'), create);
    router.put('/doc/:id',    verifyToken, verifyAdmin, upload.single('file'), update);
    router.delete('/doc/:id', verifyToken, verifyAdmin, remove);

    return router;
};

module.exports = { makeDocRouter };
