require('dotenv').config({ path: '../server/.env' });
const fs = require('fs');
const mysql = require('mysql2');

const dbUrl = process.env.DATABASE_URL + '?multipleStatements=true';
const connection = mysql.createConnection(dbUrl);

connection.connect((err) => {
    if (err) { console.error('Connection failed:', err); return; }
    console.log('Connected to Railway MySQL successfully!');

    try {
        const sql = fs.readFileSync('./schema.sql', 'utf8');
        connection.query(sql, (err) => {
            if (err) console.error('Import failed:', err);
            else console.log('Database imported successfully!');
            connection.end();
        });
    } catch (fileErr) {
        console.error('Error reading SQL file:', fileErr.message);
        connection.end();
    }
});
