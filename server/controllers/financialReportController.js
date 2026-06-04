const { getReportsByClientId: getReports } = require('../services/financialReportService');

const getReportsByClientId = async (req, res) => {
    try {
        const rows = await getReports(req.params.clientId);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getReportsByClientId };
