const connection = require('./database');

class EmployeeDB {
    constructor(connection) {
        this.connection = connection;
    }

    getDepartments() {
        console.log('Hi')
        return this.connection.promise().query(
            `SELECT * FROM department`
        );
    };

    getRoles() {
        return this.connection.promise().query(
            `SELECT role.id, role.title, department.name AS department, role.salary
            FROM role
            LEFT JOIN department ON role.department_id = department.id`
        );
    };

    getEmployees() {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary,
            CONCAT(manager.first_name,'', manager.last_name) AS manager
            FROM employee
            LEFT JOIN role ON employee.role_id = role.id
            LEFT JOIN department ON role.department_id = department.id
            LEFT JOIN employee manager ON manager.id = employee.manager_id`
        );
    };

    getManager() {
        return this.connection.promise().query(
            `SELECT * FROM employee`
        );
    };

    addDepartment(name) {
        return this.connection.promise().query(
            `INSERT INTO department(name) 
        VALUES(?)`, name)
    };

    addRole(title, salary, department_id) {
        return this.connection.promise().query(
            `INSERT INTO role(title, salary, department_id)
        VALUES(?,?,?)`, [title, salary, department_id]
        )
    };

    addEmployee(first_name, last_name, role_id, manager_id) {
        return this.connection.promise().query(
            `INSERT INTO employee(first_name, last_name, role_id, manager_id)
        VALUES(?,?,?,?)`, [first_name, last_name, role_id, manager_id]
        )
    };

    updateRole(employee_id, role_id) {
        return this.connection.promise().query(
            `UPDATE employee SET role_id = ? WHERE id = ?`, [role_id, employee_id]
        )
    };

    updateManager(employee_id, manager_id) {
        return this.connection.promise().query(
            `UPDATE employee SET manager_id = ? WHERE id = ?`,
            //This is to replace the "?"
            [employee_id, manager_id]
        )
    };

    viewByManager(manager_id) {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title
            FROM employee
            LEFT JOIN role ON role.id = employee.role_id
            LEFT JOIN department ON department.id = role.department_id
            WHERE manager_id = ?`,
            manager_id)
    };

    viewByDepartment(department_id) {
        return this.connection.promise().query(
            `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary
            FROM employee
            LEFT JOIN role ON role.id = employee.role_id
            LEFT JOIN department ON department.id = role.department_id
            WHERE department_id = ?`,
            department_id)
    };

    deleteDepartment(id) {
        return this.connection.promise().query(
            `DELETE FROM department WHERE id = ?`,
            id
        )
    };

    deleteRole(id) {
        return this.connection.promise().query(
            `DELETE FROM role WHERE id = ?`,
            id
        )
    };

    deleteEmployee(id) {
        return this.connection.promise().query(
            `DELETE FROM employee WHERE id = ?`,
            id
        )
    };

};



module.exports = new EmployeeDB(connection)