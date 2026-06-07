const { queryGetByField, queryPost, queryDelete } = require('./SQLRequest');

const getReportsByClientId = async (clientId) => {
    return await queryGetByField('financial_reports', 'client_id', clientId);
};

const createReport = async (data) => {
    return await queryPost('financial_reports', data);
};

const deleteReport = async (id) => {
    return await queryDelete('financial_reports', id);
};

module.exports = { getReportsByClientId, createReport, deleteReport };
