const { queryGetByField } = require('../services/SQLRequest');

const getReportsByClientId = async (req, res) => {
    try {
        const rows = await queryGetByField('financial_reports', 'client_id', req.params.clientId);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getReportsByClientId };
