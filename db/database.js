const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    //MySQL username va aqui
    user: 'root',
    //My password from mysql
    password: 'Antonio7',
    //DataBase name:
    database: 'employeeTrackerDB'
});


connection.connect(err => {
    console.log('connect')
    if (err) throw err;
})


module.exports = connection;