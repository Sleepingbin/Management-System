const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "haohaoxuexi999",
    database: "gpms1",
});

module.exports = db;
