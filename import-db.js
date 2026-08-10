const fs = require('fs');
const mysql = require('mysql2');

// אנחנו משתמשים בדיוק בכתובת ה-MYSQL_PUBLIC_URL שמופיעה אצלך ב-Railway
const dbUrl = 'mysql://root:210028221@sakura.proxy.rlwy.net:56831/railway?multipleStatements=true';

const connection = mysql.createConnection(dbUrl);

connection.connect((err) => {
  if (err) {
    console.error('Connection failed:', err);
    return;
  }
  console.log('Connected to Railway MySQL successfully!');

  try {
    const sql = fs.readFileSync('./nnc_law_export.sql', 'utf8');
    
    connection.query(sql, (err, results) => {
      if (err) {
        console.error('Import failed:', err);
      } else {
        console.log('Database imported successfully! The NNC-Lawyers DB is ready.');
      }
      connection.end();
    });
  } catch (fileErr) {
    console.error('Error reading the SQL file:', fileErr.message);
    connection.end();
  }
});