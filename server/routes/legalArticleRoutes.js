const express = require('express');
const router = express.Router();
const { getAllArticles, createArticle, updateArticle, deleteArticle } = require('../controllers/legalArticleController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.get('/',      getAllArticles);
router.post('/',     verifyToken, verifyAdmin, createArticle);
router.put('/:id',   verifyToken, verifyAdmin, updateArticle);
router.delete('/:id',verifyToken, verifyAdmin, deleteArticle);

module.exports = router;
