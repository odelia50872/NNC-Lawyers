const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool(
    process.env.MYSQL_PUBLIC_URL || process.env.DATABASE_URL || {
        host: process.env.MYSQLHOST || 'localhost',
        port: process.env.MYSQLPORT || 3306,
        user: process.env.MYSQLUSER || 'root',
        password: process.env.MYSQLPASSWORD,
        database: process.env.MYSQLDATABASE || 'railway',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    }
);

module.exports = pool.promise();