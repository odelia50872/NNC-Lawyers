const db = require('../tools/db');

const ALLOWED_TABLES = ['financial_reports', 'clients', 'rental_agreements', 'identity_documents', 'insurance_policies', 'legal_articles'];
const ALLOWED_FIELDS = ['email', 'role', 'client_id', 'id', 'full_name'];

const validateTable = (source) => {
    if (!ALLOWED_TABLES.includes(source)) throw new Error(`Invalid table: ${source}`);
};

const validateField = (field) => {
    if (!ALLOWED_FIELDS.includes(field)) throw new Error(`Invalid field: ${field}`);
};

const queryGet = async (source, id = null) => {
    validateTable(source);
    const sql = id ? `SELECT * FROM ${source} WHERE id = ?` : `SELECT * FROM ${source}`;
    const [rows] = await db.query(sql, id ? [id] : []);
    return rows;
};

const queryGetByField = async (source, field, value) => {
    validateTable(source);
    validateField(field);
    const [rows] = await db.query(`SELECT * FROM ${source} WHERE ${field} = ?`, [value]);
    return rows;
};

const queryGetPaginated = async (source, { limit = 5, offset = 0, where = null, whereValue = null } = {}) => {
    validateTable(source);
    if (where) validateField(where);
    const whereSql = where ? `WHERE ${where} = ?` : '';
    const params = where ? [whereValue, limit, offset] : [limit, offset];
    const [rows] = await db.query(`SELECT * FROM ${source} ${whereSql} LIMIT ? OFFSET ?`, params);
    const [[{ total }]] = await db.query(`SELECT COUNT(*) as total FROM ${source} ${whereSql}`, where ? [whereValue] : []);
    return { rows, total };
};

const querySearch = async (source, field, search) => {
    validateTable(source);
    validateField(field);
    const [rows] = await db.query(`SELECT * FROM ${source} WHERE ${field} LIKE ?`, [`%${search}%`]);
    return rows;
};

const queryPost = async (source, data) => {
    validateTable(source);
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    const [result] = await db.query(`INSERT INTO ${source} (${columns}) VALUES (${placeholders})`, values);
    return result;
};

const queryPut = async (source, id, data) => {
    validateTable(source);
    const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    const [result] = await db.query(`UPDATE ${source} SET ${setClause} WHERE id = ?`, values);
    return result;
};

const queryDelete = async (source, id) => {
    validateTable(source);
    const [result] = await db.query(`DELETE FROM ${source} WHERE id = ?`, [id]);
    return result;
};

module.exports = { queryGet, queryGetPaginated, queryGetByField, querySearch, queryPost, queryPut, queryDelete };
