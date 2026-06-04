const { queryGet, queryGetByField, queryPost, queryPut, queryDelete } = require('../services/SQLRequest');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const rows = await queryGetByField('clients', 'email', email);
        if (!rows.length) return res.status(401).json({ error: 'אימייל או סיסמה שגויים' });

        const user = rows[0];
        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ error: 'אימייל או סיסמה שגויים' });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );

        res.json({ token, user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await queryGet('clients');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const rows = await queryGet('clients', req.params.id);
        if (!rows.length) return res.status(404).json({ error: 'User not found' });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

const createUser = async (req, res) => {
    try {
        const { full_name, email, password, phone, role = 'client' } = req.body;
        const password_hash = await bcrypt.hash(password, 10);
        const result = await queryPost('clients', { full_name, email, password_hash, phone, role });
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const updateUser = async (req, res) => {
    try {
        const { full_name, email, phone } = req.body;
        await queryPut('clients', req.params.id, { full_name, email, phone });
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await queryDelete('clients', req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = { login, getAllUsers, getUserById, createUser, updateUser, deleteUser };
