USE employee;

INSERT INTO department (id, name)
VALUES
(1, 'Sales'),
(2, 'Engineering'),
(3, 'Finance'),
(4, 'Legal');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);

INSERT INTO employee  (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 2, 1),
  ('Piers', 'Gaveston', 3, 0),
  ('Charles', 'LeRoi', 4, 2),
  ('Katherine', 'Mansfield', 5, 2),
  ('Dora', 'Carrington', 6, 0),
  ('Edward', 'Bellamy', 7, 3),
  ('Montague', 'Summers', 8, 3),
  ('Octavia', 'Butler', 9, 0),
  ('Unica', 'Zurn', 10, 4);