const { queryGetByField, queryPost, queryPut, queryDelete } = require('./SQLRequest');

const getReportsByClientId = async (clientId) => queryGetByField('financial_reports', 'client_id', clientId);
const createReport = async (data) => queryPost('financial_reports', data);
const updateReport = async (id, data) => queryPut('financial_reports', id, data);
const deleteReport = async (id) => queryDelete('financial_reports', id);

module.exports = { getReportsByClientId, createReport, updateReport, deleteReport };
