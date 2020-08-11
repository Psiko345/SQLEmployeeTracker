const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "CuambaNiassa1",
  database: "company_db",
});

// connection.connect(function (err) {
//   if (err) throw err;
//   runApp();
// });

async function runApp() {
  console.log("connecting to db...");
  connection.connect();
  console.log("connected to db");
  while (true) {
    let answer = await inquirer.prompt({
      type: "list",
      name: "Action",
      message: "What action do you wish to perfom?",
      choices: ["View", "Add", "Update", "Delete", "Exit"],
    });
    switch (answer.Action) {
      case "View":
        await view();
        continue;

      case "Add":
        await add();
        continue;

      case "Update":
        await update();
        continue;

      case "Delete":
        await remove();
        continue;

      case "Exit":
        await exit();
        break;
    }
  }
}

// 4 functions (view, add, update, delete)-
// -leading to sub-functions (employee, role, manager, department)

async function add() {
  let answer = await inquirer.prompt({
    type: "list",
    name: "Add",
    message: "What would you like to add?",
    choices: ["Employee", "Role", "Department"],
  });
  switch (answer.Add) {
    case "Employee":
      await addEmployee();
      break;

    case "Role":
      await addRole();
      break;

    case "Department":
      await addDepartment();
      break;
  }
}

function remove() {
  inquirer
    .prompt({
      type: "list",
      name: "Remove",
      message: "What would you like to Delete?",
      choices: ["Employee", "Role", "Department"],
    })
    .then((answer) => {
      switch (answer.Remove) {
        case "Employee":
          removeEmployee();
          break;

        case "Role":
          removeRole();
          break;

        case "Department":
          removeDepartment();
          break;
      }
    });
}

function update() {
  inquirer
    .prompt({
      type: "list",
      name: "Update",
      message: "What would you like to Update?",
      choices: ["Employee Role", "Employee Manager"],
    })
    .then((answer) => {
      switch (answer.Update) {
        case "Employee":
          updateEmployeeRole();
          break;

        case "Role":
          updateEmployeeManager();
          break;
      }
    });
}

function view() {
  inquirer
    .prompt({
      type: "list",
      name: "View",
      message: "What do you wish to view?",
      choices: [
        "All Employees",
        "All Employees by Department",
        "All Employees by Manager",
        "All Departments",
        "All Roles",
      ],
    })
    .then((answer) => {
      switch (answer.View) {
        case "All Employees":
          viewAllEmployees();
          break;
        case "All Employees by Department":
          viewEmplByDept();
          break;
        case "All Employees by Manager":
          viewEmplByMgr();
          break;
        case "All Departments":
          viewAllDepartments();
          break;
        case "All Roles":
          viewAllRoles();
          break;
      }
    });
}

async function addEmployee() {
  let answer = await inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "Employees first name:",
    },
    {
      type: "input",
      name: "lastName",
      message: "Employees last name:",
    },
    {
      type: "list",
      name: "roleID",
      message: "Employee role ID:",
      choices: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    },
    {
      type: "list",
      name: "managerID",
      message:
        "Employees manager ID (1 = Sales, 2 = Engineering, 3 = Accounting):",
      choices: ["1", "2", "3"],
    },
  ]);

  const query = `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
  connection.query(
    query,
    [answer.firstName, answer.lastName, answer.roleID, answer.managerID],
    (err, res) => {
      if (err) throw err;
      console.log("");
      console.table(res);
      console.log("Employee added succesfully.");
    }
  );
}

async function addRole() {
  let answer = await inquirer.prompt([
    {
      type: "number",
      name: "roleID",
      message: "What is the ID of the new role? (Numbers 1-9 already in use): ",
    },
    {
      type: "input",
      name: "roleTitle",
      message: "What is the title of the new role: ",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary of the new role: ",
    },
    {
      type: "number",
      name: "departmentID",
      message:
        "Which department is this role in? (1 = Sales, 2 = Engineering, 3 = Accounting): ",
    },
  ]);

  const query = `INSERT INTO roles (id, title, salary, dept_id) VALUES (?,?,?,?);`;
  connection.query(
    query,
    [answer.roleID, answer.roleTitle, answer.salary, answer.departmentID],
    (err, res) => {
      if (err) throw err;
      console.log("");
      console.table(res);
      console.log("Role added succesfully.");
    }
  );
}

async function addDepartment() {
  let answer = await inquirer.prompt([
    {
      type: "number",
      name: "departmentID",
      message: "New department ID (1=Sales, 2=Engineering, 3=Accounting): ",
    },
    {
      type: "input",
      name: "name",
      message: "New department name: ",
    },
  ]);

  const query = `INSERT INTO departments (id, name) VALUES (?,?);`;
  connection.query(query, [answer.departmentID, answer.name], (err, res) => {
    if (err) throw err;
    console.log("");
    console.table(res);
    console.log("Department added succesfully.");
  });
}

async function removeEmployee() {
  let answer = await inquirer.prompt([
    {
      type: "input",
      name: "employeeID",
      message: "ID of the Employee you want to delete: ",
    },
  ]);

  const query = `DELETE FROM employees WHERE id = ?`;
  connection.query(query, [answer.employeeID], (err, res) => {
    if (err) throw err;
    console.log("");
    console.log("Employee succesfully deleted.");
  });
}

async function removeRole() {
  let answer = await inquirer.prompt([
    {
      type: "input",
      name: "roleID",
      message: "ID of the Role you want to delete: ",
    },
  ]);

  const query = `DELETE FROM roles WHERE id = ?`;
  connection.query(query, [answer.roleID], (err, res) => {
    if (err) throw err;
    console.log("");
    console.log("Role succesfully deleted.");
  });
}

async function removeDepartment() {
  let answer = await inquirer.prompt([
    {
      type: "input",
      name: "deptID",
      message: "ID of the Department you want to delete: ",
    },
  ]);

  const query = `DELETE FROM departments WHERE id = ?`;
  connection.query(query, [answer.deptID], (err, res) => {
    if (err) throw err;
    console.log("");
    console.log("Department succesfully deleted.");
  });
}

runApp();
