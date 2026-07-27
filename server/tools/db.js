const mysql = require('mysql2');
require('dotenv').config();

// שימוש במחרוזת החיבור המלאה שמגיעה ממשתני הסביבה של ריילוי
const connectionString = process.env.MYSQL_PUBLIC_URL || process.env.MYSQL_URL;

const pool = mysql.createPool({
    uri: connectionString,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    ssl: { rejectUnauthorized: false }
});

module.exports = pool.promise();