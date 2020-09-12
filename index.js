const db = require('./db/database')
const inquirer = require('inquirer');
const cTable = require('console.table');


// Staring the prompt user

const newPrompt = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'initialPrompt',
        message: 'What would you like to do?',
        choices: ['view all departments', 'view all roles', 'view all employees', 'add a department',
            'add a role', 'add an employee', 'Update an employee role'
        ]
    }])

    .then(answer => {
        if (answer.initialPrompt == "View all departments") {
            return viewDepartments();

        } else if (answer.initialPrompt == "View all roles") {
            return viewRoles();

        } else if (answer.initialPrompt == "View all employees") {
            return viewEmployees();

        } else if (answer.initialPrompt == "Add a department") {
            return addDepartment();

        } else if (answer.initialPrompt == "Add a role") {
            return addRole();

        } else if (answer.initialPrompt == "Add a employee") {
            return addEmployee();

        } else if (answer.initialPrompt == "Update an employee role") {
            return updateRole();
        }

    })
};

function viewDepartments() {
    db.getDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.table(departments);
        })
        .then(() => newPrompt());
};




newPrompt();