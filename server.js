const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "CuambaNiassa1",
  database: "company_db",
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function whatWouldYouLikeToDo() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all roles",
        "View all departments",
        "View employees by deparment",
        "View employees by role",
        "Add an employee",
        "Add a role",
        "Add a department",
        "Remove an employee",
        "Remove a role",
        "Remove a department",
        "Update employee role",
        "Update employee manager",
        "Update employee department",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View all employees":
          viewAllEmployees();
          break;

        case "View all Roles":
          viewAllRoles();
          break;

        case "View all departments":
          viewAllDepartments();
          break;

        case "View employees by deparment":
          viewAllEmployeesByDepartment();
          break;

        case "View employees by role":
          viewAllEmployeesByRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "Add a role":
          addARole();
          break;

        case "Add a Department":
          addADepartment();
          break;

        case "Remove an employee":
          removeAnEmployee();
          break;

        case "Remove a Role":
          removeARole();
          break;

        case "Remove a Department":
          removeADepartment();
          break;

        case "Update employee role":
          updateEmployeeRole();
          break;

        case "Update employee manager":
          updateEmployeeManager();
          break;

        case "Update employee Department":
          updateEmployeeDepartment();
          break;
      }
    });
}

whatWouldYouLikeToDo();
