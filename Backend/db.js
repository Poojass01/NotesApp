const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'pooja@123',
    database: process.env.DB_NAME || 'notes_app',
});

module.exports = db;
