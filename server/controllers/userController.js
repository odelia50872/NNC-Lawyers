const { getUserByEmail, getAllUsers, getUserById, createUser, updateUser, deleteUser } = require('../services/userService');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);
        if (!user) return res.status(401).json({ error: 'אימייל או סיסמה שגויים' });

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

const getAllUsersCtrl = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve users' });
    }
};

const getUserByIdCtrl = async (req, res) => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve user' });
    }
};

const createUserCtrl = async (req, res) => {
    try {
        const result = await createUser(req.body);
        res.status(201).json({ id: result.insertId });
    } catch (err) {
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const updateUserCtrl = async (req, res) => {
    try {
        await updateUser(req.params.id, req.body);
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user' });
    }
};

const deleteUserCtrl = async (req, res) => {
    try {
        await deleteUser(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

module.exports = { login, getAllUsers: getAllUsersCtrl, getUserById: getUserByIdCtrl, createUser: createUserCtrl, updateUser: updateUserCtrl, deleteUser: deleteUserCtrl };
