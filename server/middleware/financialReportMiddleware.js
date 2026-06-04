const validateFinancialReportId = (req, res, next) => {
    const financialReportId = req.params.id || req.query.financialReportId || req.body.financialReportId;

    if (financialReportId) {
        req.financialReportId = financialReportId;
    }
    next();
};

const requireFinancialReportId = (req, res, next) => {
    if (!req.financialReportId) {
        return res.status(400).json({ error: 'Financial Report ID is required' });
    }
    next();
};



module.exports = {
    validateFinancialReportId,
    requireFinancialReportId,
};