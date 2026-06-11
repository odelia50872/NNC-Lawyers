const { queryGet, queryPost, queryPut, queryDelete } = require('../services/SQLRequest');

const getAllArticles = async (req, res) => {
    try {
        const articles = await queryGet('legal_articles');
        res.json(articles);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createArticle = async (req, res) => {
    try {
        const { title_he, content_he, title_fr, content_fr } = req.body;
        const result = await queryPost('legal_articles', { title_he, content_he, title_fr, content_fr });
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateArticle = async (req, res) => {
    try {
        const { title_he, content_he, title_fr, content_fr } = req.body;
        await queryPut('legal_articles', req.params.id, { title_he, content_he, title_fr, content_fr });
        res.json({ message: 'Updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteArticle = async (req, res) => {
    try {
        await queryDelete('legal_articles', req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllArticles, createArticle, updateArticle, deleteArticle };
