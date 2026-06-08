const { queryGetByField, queryPost, queryDelete } = require('./SQLRequest');

const getByClientId = (table) => async (clientId) => queryGetByField(table, 'client_id', clientId);
const create = (table) => async (data) => queryPost(table, data);
const remove = (table) => async (id) => queryDelete(table, id);

module.exports = { getByClientId, create, remove };
