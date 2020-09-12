DROP DATABASE IF EXISTS employeetrackerDB;
CREATE DATABASE employeetrackerDB;
USE employeetrackerDB;

CREATE TABLE department (
  id INTEGER AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INTEGER AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INTEGER,
  PRIMARY KEY (id),
CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department (id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INTEGER AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INTEGER,
  manager_id INTEGER,
  INDEX rol_ind (role_id),
  INDEX man_ind (manager_id),
  PRIMARY KEY (id)
);


