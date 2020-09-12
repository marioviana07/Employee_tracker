const connection = require('./database');

class employeeDB {
    constructor(connection) {
        this.connection = connection;
    }

    getDepartments() {
        return this.connection.promise().query(
            'SELECT * FROM department'
        );
    };
};

module.exports = new employeeDB(connection)