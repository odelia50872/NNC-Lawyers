const { queryGet, queryGetByField, queryPost, queryPutByField, queryDelete } = require('./SQLRequest');

const getAll = (table) => async () => queryGet(table);
const getByClient = (table) => async (clientId) => queryGetByField(table, 'client_id', clientId);
const create = (table) => async (data) => queryPost(table, data);
const update = (table) => async (id, data) => queryPutByField(table, 'id', id, data);
const remove = (table) => async (id) => queryDelete(table, id);

module.exports = { getAll, getByClient, create, update, remove };
