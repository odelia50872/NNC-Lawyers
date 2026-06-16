const documentService = require('../services/documentService');

const makeController = (table) => ({
    getByClient: async (req, res) => {
        try {
            const rows = await documentService.getByClient(table)(req.params.clientId);
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    create: async (req, res) => {
        try {
            const { client_id, title, year } = req.body;
            const file_url = `${process.env.SERVER_URL || 'http://localhost:3000'}/uploads/${req.file.filename}`;
            const result = await documentService.create(table)({ client_id, title, year, file_url });
            res.status(201).json({ id: result.insertId });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    update: async (req, res) => {
        try {
            const { title, year } = req.body;
            const data = { title, year };
            if (req.file) data.file_url = `${process.env.SERVER_URL || 'http://localhost:3000'}/uploads/${req.file.filename}`;
            await documentService.update(table)(req.params.id, data);
            res.json({ message: 'Updated' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    remove: async (req, res) => {
        try {
            await documentService.remove(table)(req.params.id);
            res.json({ message: 'Deleted' });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
});

module.exports = { makeController };
