const db = require('./db');
const inquirer = require('inquirer');
const cTable = require('console.table');
const { promise } = require('./db/database');


// Staring the prompt user

const newPrompt = () => {
    inquirer.prompt([{
        type: 'list',
        name: 'initialPrompt',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department',
            'Add a role', 'Add an employee', 'Update an employee role', 'Update an employee manager',
            'View employees by manager', 'View employees by department', 'Delete a department',
            'Delete a role', 'Delete an employee', 'EXIT'
        ],
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

        } else if (answer.initialPrompt == "Update an employee manager") {
            return updateManager();

        } else if (answer.initialPrompt == "View employees by manager") {
            return viewByManager();

        } else if (answer.initialPrompt == "View employees by department") {
            return viewByDepartment();

        } else if (answer.initialPrompt == "Delete a department") {
            return deleteDepartment();

        } else if (answer.initialPrompt == "Delete a role") {
            return deleteRole();

        } else if (answer.initialPrompt == "Delete a employee") {
            return deleteEmployee();

        } else if (answer.initialPrompt == "EXIT") {
            return endProgram();
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
}

function viewRoles() {
    db.getRoles()
        .then(([rows]) => {
            let roles = rows;
            console.table(roles);
        })
        .then(() => newPrompt());
}

function viewEmployees() {
    db.getEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.table(employees);
        })
        .then(() => newPrompt());
}

function addDepartment() {
    inquirer.prompt([{
        name: 'name',
        message: "What is the name of the department?"
    }, ]).then(res => {
        db.addDepartment = (res.name)
        console.log("New department has been created")
        newPrompt()
    })

}

function addRole() {
    db.getDepartments()
        .then(([departments]) => {
            return inquirer.prompt([{
                    name: "title",
                    message: "What is the name of the role?"
                },
                {
                    name: "salary",
                    message: "What is the salary amount?"
                },
                {
                    type: "list",
                    name: "departmentPrompt",
                    message: "What is the role's department?",
                    choices: departments.map(department => ({ name: department.name, value: department.id })),
                },
            ])

        }, ).then(({ title, salary, departmentPrompt }) => {
            db.addRole(title, salary, departmentPrompt)
            console.log("New role has been created")
            newPrompt()
        })
}

function addEmployee() {
    promise.all([db.getRoles(), db.getManager()])
        .then(([
            [roles],
            [managers]
        ]) => {
            return inquirer.prompt([{
                    name: "first_name",
                    message: "What is the employee's first name?"
                },
                {
                    name: "last_name",
                    message: "What is the employee's last name?"
                },
                {
                    type: "list",
                    name: "rolePrompt",
                    message: "What is the employee's role?",
                    choices: roles.map(role => ({ name: role.title, value: role.id })),
                },
                {
                    type: "list",
                    name: "managerPrompt",
                    message: "What is the employee's manager?",
                    choices: managers.map(manager => ({ name: `${manager.first_name} ${manager.last_name}`, value: manager.id })),
                }

            ])
        })
        .then(({ first_name, last_name, rolePrompt, managerPrompt }) => {
            db.addEmployee(first_name, last_name, rolePrompt, managerPrompt)
            console.log("New employee has been created")
            newPrompt()
        })
}

function updateRole() {
    db.getEmployees()
        .then(([employees]) => {
            inquirer.prompt([{
                    type: "list",
                    name: "employeePrompt",
                    message: "Which employee do you want to update?",
                    choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
                }])
                .then(res => {
                    let employee_id = res.employeePrompt;
                    db.getRoles()
                        .then(([roles]) => {
                            inquirer.prompt([{
                                    type: "list",
                                    name: "rolePrompt",
                                    message: "Which employee role do you want to update?",
                                    choices: roles.map(role => ({ name: role.title, value: role_id })),
                                }])
                                .then(res => db.updateRole(employee_id, res.rolePrompt))
                                .then(() => console.log("Role has been update!!!"))
                                .then(() => newPrompt())
                        });
                });
        });
}

function updateManager() {
    db.getEmployees()
        .then(([employees]) => {
            inquirer.prompt([{
                    type: "list",
                    name: "employeePrompt",
                    message: "Which employee do you want to update?",
                    choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name}`, value: employee.id })),
                }])
                .then(employeeres => {
                    let employee_id = employeeres.employeePrompt;
                    db.getEmployees()
                        .then(([employees]) => {
                            inquirer.prompt([{
                                    type: "list",
                                    name: "managerPrompt",
                                    message: "Which manger do you want to update? (By employee)",
                                    choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.first_name}`, value: employee.id })),
                                }])
                                .then(manageres => db.updateManager(employee_id, manageres.managerPrompt))
                                .then(() => console.log("The employee's manager has been update!"))
                                .then(() => newPrompt())
                        });
                });
        });
};

function viewByDepartment() {
    db.getDepartments()
        .then(([departments]) => {
            return inquirer.prompt([{
                type: 'list',
                name: 'departmentPrompt',
                message: "Which department do you want to view? (By employees)",
                choices: departments.map(department => ({ name: department.name, value: department.id })),
            }, ])
        }, ).then(departmentres => {
            db.viewByDepartment(departmentres.departmentPrompt)
                .then(([rows]) => {
                    let departments = rows;
                    console.table(departments);
                })
                .then(() => newPrompt());

        })
};

function viewByManager() {
    db.getEmployees()
        .then(([employees]) => {
            return inquirer.prompt([{
                type: 'list',
                name: 'managerPrompt',
                message: "Which manager do you want to view? (By employees)",
                choices: employees.map(employee => ({ name: `${employee.first_name} ${employee.first_name}`, value: employee.id })),
            }, ])
        }, ).then(manageres => {
            db.viewByManager(manageres.managerPrompt)
                .then(([rows]) => {
                    let employees = rows;
                    console.table(employees);
                }).then(() => newPrompt());
        })
};

function endProgram() {
    console.log("Press the keywords Control 'C' to finish the program");

}


newPrompt();