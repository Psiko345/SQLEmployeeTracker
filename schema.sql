DROP DATABASE IF EXISTS company_db;

CREATE DATABASE company_db;

USE company_db;

CREATE TABLE employees (
    id INT AUTO_INCREMENT  Not NULL 
    first_name VARCHAR(30),
    last_name VARCHAR (30),
    role_id INT ,
    manager_id INT, 
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role_tb(id),
    FOREIGN KEY (manager_id) REFERENCES role_tb(id),
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL,
    dept_id INT,
    PRIMARY KEY (id), 
    FOREIGN KEY (dept_id) REFERENCES (dept_db)
);

CREATE TABLE departments (
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
)

