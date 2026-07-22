const { queryGetPaginated, queryGetByField, querySearch, queryPost,queryPutByField, queryDelete } = require('./SQLRequest');
const bcrypt = require('bcrypt');

const getUserByEmail = async (email) => {
    const rows = await queryGetByField('clients', 'email', email);
    return rows[0] || null;
};

const searchUsers = async (query) => {
    const rows = await querySearch('clients', 'full_name', query);
    return rows.filter(r => r.role === 'client');
};

const getAllUsersPaginated = async (limit, offset) => {
    return await queryGetPaginated('clients', { limit, offset, where: 'role', whereValue: 'client' });
};

const getUserById = async (id) => {
    const rows = await queryGet('clients', id);
    return rows[0] || null;
};

const createUser = async ({ full_name, email, password, phone, role = 'client' }) => {
    const password_hash = await bcrypt.hash(password, 10);
    return await queryPost('clients', { full_name, email, password_hash, phone, role, must_change_password: 1 });
};

const updateUser = async (id, { full_name, email, phone }) => {
    return await queryPutByField('clients', 'id', id, { full_name, email, phone });
};

const updatePassword = async (email, newPassword) => {
    const password_hash = await bcrypt.hash(newPassword, 10);
    return await queryPutByField('clients', 'email', email, { password_hash, must_change_password: 0 });
};


const deleteUser = async (id) => {
    return await queryDelete('clients', id);
};

module.exports = { getUserByEmail, getAllUsersPaginated, searchUsers, getUserById, createUser, updateUser, updatePassword, deleteUser };
