const mysql = require("mysql2/promise");

const con = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'issues_management'
});

module.exports = con;