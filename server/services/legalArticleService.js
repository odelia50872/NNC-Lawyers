const { queryPost, queryPut, queryDelete } = require('./SQLRequest');

const createArticle = async (data) => queryPost('legal_articles', data);
const updateArticle = async (id, data) => queryPut('legal_articles', id, data);
const deleteArticle = async (id) => queryDelete('legal_articles', id);

module.exports = { createArticle, updateArticle, deleteArticle };