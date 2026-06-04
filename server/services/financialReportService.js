const { queryGetByField } = require('./SQLRequest');

const getReportsByClientId = async (clientId) => {
    return await queryGetByField('financial_reports', 'client_id', clientId);
};

module.exports = { getReportsByClientId };
