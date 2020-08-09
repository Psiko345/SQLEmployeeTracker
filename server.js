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
  runApp();
});

function runApp() {
  prompt({
    type: "list",
    name: "Action",
    message: "What action do you wish to perfom?",
    choices: ["View", "Add", "Update", "Delete", "Exit"],
  }).then((answer) => {
    switch (answer.Action) {
      case "View":
        view();
        break;

      case "Add":
        add();
        break;

      case "Update":
        update();
        break;

      case "Delete":
        expunge();
        break;

      case "Exit":
        exit();
        break;
    }
  });
}

// 4 functions (view, add, update, delete) leading to sub-functions (employee, role, manager, department)
