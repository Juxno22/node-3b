const mysql2 = require('mysql2/promise');

const connection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'control_inventarios',
    port: 3306,
    password: '',
});


module.exports = connection;