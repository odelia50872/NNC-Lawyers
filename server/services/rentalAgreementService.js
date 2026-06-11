const { queryGetByField, queryPost, queryPut, queryDelete } = require('./SQLRequest');

const getAgreementsByClientId = async (clientId) => queryGetByField('rental_agreements', 'client_id', clientId);
const createAgreement = async (data) => queryPost('rental_agreements', data);
const updateAgreement = async (id, data) => queryPut('rental_agreements', id, data);
const deleteAgreement = async (id) => queryDelete('rental_agreements', id);

module.exports = { getAgreementsByClientId, createAgreement, updateAgreement, deleteAgreement };
