const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    //MySQL username va aqui
    user: 'root',
    //My password from mysql
    password: 'Antonio7',
    //DataBase name:
    database: 'employeeTrackerDB'
});


connection.connect(err => {
    if (err) throw err;
})


module.exports = connection;