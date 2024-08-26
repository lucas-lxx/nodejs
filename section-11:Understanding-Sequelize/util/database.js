const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'lucas',
    database: 'node_complete',
    password: 'Ognms1011##'
})

module.exports = pool.promise();