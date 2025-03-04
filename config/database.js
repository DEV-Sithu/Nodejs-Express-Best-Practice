const {createPool} = require('mysql2/promise');
require('dotenv').config();

const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10,
    waitForConnections: true,
    queueLimit: 0
});

module.exports = pool;