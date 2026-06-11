const { queryGetByField, queryPost, queryPut, queryDelete } = require('./SQLRequest');

const getByClientId = (table) => async (clientId) => queryGetByField(table, 'client_id', clientId);
const create = (table) => async (data) => queryPost(table, data);
const update = (table) => async (id, data) => queryPut(table, id, data);
const remove = (table) => async (id) => queryDelete(table, id);

module.exports = { getByClientId, create, update, remove };
