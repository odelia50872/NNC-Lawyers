const { getAgreementsByClientId, createAgreement, updateAgreement, deleteAgreement } = require('../services/rentalAgreementService');

const getByClient = async (req, res) => {
    try {
        const rows = await getAgreementsByClientId(req.params.clientId);
        res.json(rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

const create = async (req, res) => {
    try {
        const { client_id, title, year } = req.body;
        const file_url = `${process.env.SERVER_URL || 'http://localhost:3000'}/uploads/${req.file.filename}`;
        const result = await createAgreement({ client_id, title, year, file_url });
        res.status(201).json({ id: result.insertId });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

const update = async (req, res) => {
    try {
        const { title, year } = req.body;
        const data = { title, year };
        if (req.file) data.file_url = `${process.env.SERVER_URL || 'http://localhost:3000'}/uploads/${req.file.filename}`;
        await updateAgreement(req.params.id, data);
        res.json({ message: 'Updated' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

const remove = async (req, res) => {
    try {
        await deleteAgreement(req.params.id);
        res.json({ message: 'Deleted' });
    } catch (err) { res.status(500).json({ error: err.message }); }
};

module.exports = { getByClient, create, update, remove };
