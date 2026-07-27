const mysql = require('mysql2');
require('dotenv').config();

const connectionString = process.env.MYSQL_URL || process.env.MYSQL_PUBLIC_URL;

const pool = mysql.createPool(
    connectionString
        ? {
              uri: connectionString,
              waitForConnections: true,
              connectionLimit: 10,
              queueLimit: 0,
              ssl: { rejectUnauthorized: false }
          }
        : {
              host: process.env.DB_HOST || 'localhost',
              user: process.env.DB_USER || 'root',
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME || 'nnc_law',
              port: process.env.DB_PORT || 3306,
              waitForConnections: true,
              connectionLimit: 10,
              queueLimit: 0
          }
);

module.exports = pool.promise();