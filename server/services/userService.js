const { queryGet, queryGetByField, queryPost, queryPut, queryDelete } = require('./SQLRequest');
const bcrypt = require('bcrypt');

const getUserByEmail = async (email) => {
    const rows = await queryGetByField('clients', 'email', email);
    return rows[0] || null;
};

const getAllUsers = async () => {
    return await queryGet('clients');
};

const getUserById = async (id) => {
    const rows = await queryGet('clients', id);
    return rows[0] || null;
};

const createUser = async ({ full_name, email, password, phone, role = 'client' }) => {
    const password_hash = await bcrypt.hash(password, 10);
    return await queryPost('clients', { full_name, email, password_hash, phone, role });
};

const updateUser = async (id, { full_name, email, phone }) => {
    return await queryPut('clients', id, { full_name, email, phone });
};

const deleteUser = async (id) => {
    return await queryDelete('clients', id);
};

module.exports = { getUserByEmail, getAllUsers, getUserById, createUser, updateUser, deleteUser };
