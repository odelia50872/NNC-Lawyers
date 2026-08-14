const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { makeController } = require('../controllers/documentController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');
const { verifySelfOrAdmin } = require('../middleware/userMiddleware');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const makeDocRouter = (table, filePrefix) => {
    const router = express.Router();
    const { getByClient, getAll, create, update, remove } = makeController(table);

    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'nnc-law',
            public_id: (req, file) => filePrefix + '-' + Date.now(),
            resource_type: 'raw',
            access_mode: 'public',
            format: async (req, file) => file.originalname.split('.').pop(),
        },
    });
    const upload = multer({ storage });

    router.get('/',          verifyToken, verifyAdmin, getAll);
    router.get('/:clientId',  verifyToken, verifySelfOrAdmin, getByClient);
    router.post('/',          verifyToken, verifyAdmin, upload.single('file'), create);
    router.put('/doc/:id',    verifyToken, verifyAdmin, upload.single('file'), update);
    router.delete('/doc/:id', verifyToken, verifyAdmin, remove);

    return router;
};

module.exports = { makeDocRouter };
