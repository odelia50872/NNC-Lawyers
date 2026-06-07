const db = require('../tools/db');

const ALLOWED_TABLES = ['financial_reports', 'clients', 'rental_agreements', 'identity_documents', 'insurance_policies'];

const validateTable = (source) => {
    if (!ALLOWED_TABLES.includes(source)) throw new Error(`Invalid table: ${source}`);
};

const queryGet = async (source, id = null) => {
    validateTable(source);
    const sql = id ? `SELECT * FROM ${source} WHERE id = ?` : `SELECT * FROM ${source}`;
    const [rows] = await db.query(sql, id ? [id] : []);
    return rows;
};

const queryGetByField = async (source, field, value) => {
    validateTable(source);
    const [rows] = await db.query(`SELECT * FROM ${source} WHERE ${field} = ?`, [value]);
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

module.exports = { queryGet, queryGetByField, queryPost, queryPut, queryDelete };
