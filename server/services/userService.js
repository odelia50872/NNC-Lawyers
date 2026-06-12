const { queryGet, queryGetPaginated, queryGetByField, querySearch, queryPost, queryPut, queryDelete } = require('./SQLRequest');
const bcrypt = require('bcrypt');

const getUserByEmail = async (email) => {
    const rows = await queryGetByField('clients', 'email', email);
    return rows[0] || null;
};

const getAllUsers = async () => {
    return await queryGet('clients');
};

const searchUsers = async (query) => {
    // חיפוש גם בשם וגם במייל, כולל תמיכה בעברית
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
    return await queryPost('clients', { full_name, email, password_hash, phone, role });
};

const updateUser = async (id, { full_name, email, phone }) => {
    return await queryPut('clients', id, { full_name, email, phone });
};

const updatePassword = async (email, newPassword) => {
    const password_hash = await bcrypt.hash(newPassword, 10);
    const db = require('../tools/db');
    const [result] = await db.query('UPDATE clients SET password_hash = ? WHERE email = ?', [password_hash, email]);
    return result;
};


const deleteUser = async (id) => {
    return await queryDelete('clients', id);
};

module.exports = { getUserByEmail, getAllUsers, getAllUsersPaginated, searchUsers, getUserById, createUser, updateUser, updatePassword, deleteUser };
