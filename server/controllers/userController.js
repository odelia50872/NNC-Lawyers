

const { getUserByEmail, getAllUsers: getAllUsersService, getAllUsersPaginated: getAllUsersPaginatedService, searchUsers: searchUsersService, getUserById: getUserByIdService, createUser: createUserService, updateUser: updateUserService, deleteUser: deleteUserService } = require('../services/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) return res.status(401).json({ error: 'INVALID_CREDENTIALS' });

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({ error: 'INVALID_CREDENTIALS' });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, full_name: user.full_name },
            process.env.JWT_SECRET,
            { expiresIn: '30m' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 30 * 60 * 1000
        });
        res.json({ user: { id: user.id, full_name: user.full_name, email: user.email, role: user.role } });
    } catch (err) {
        res.status(500).json({ error: 'Login failed', details: err.message });
    }
};

const searchUsers = async (req, res) => {
    try {
        const rows = await searchUsersService(req.query.q || '');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to search users' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsersService();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const getAllUsersPaginated = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const { rows, total } = await getAllUsersPaginatedService(limit, offset);
        res.json({ clients: rows, total });
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

const createUser = async (req, res) => {
    try {
        const result = await createUserService(req.body);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        console.error('createUser error:', err.message, err.stack);
        res.status(500).json({ error: 'Failed to create user', details: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        await updateUserService(req.params.id, req.body);
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const deleteUser = async (req, res) => {
    try {
        await deleteUserService(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = { login, getAllUsers, getAllUsersPaginated, searchUsers, getUserById, createUser, updateUser, deleteUser };
