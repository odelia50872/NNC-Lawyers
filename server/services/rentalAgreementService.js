const { queryGetByField, queryPost, queryDelete } = require('./SQLRequest');

const getAgreementsByClientId = async (clientId) => {
    return await queryGetByField('rental_agreements', 'client_id', clientId);
};

const createAgreement = async (data) => {
    return await queryPost('rental_agreements', data);
};

const deleteAgreement = async (id) => {
    return await queryDelete('rental_agreements', id);
};

module.exports = { getAgreementsByClientId, createAgreement, deleteAgreement };
