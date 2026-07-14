import db from "../config/db.js";

// Get All Employees
export const getEmployees = (callback) => {

    const sql = "SELECT * FROM employees ORDER BY id DESC";

    db.query(sql, callback);

};

// Add Employee
export const addEmployee = (employee, callback) => {

    const sql = `
        INSERT INTO employees
        (name, age, gender, email, department, salary)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [
        employee.name,
        employee.age,
        employee.gender,
        employee.email,
        employee.department,
        employee.salary
    ], callback);

};

// Update Employee
export const updateEmployee = (id, employee, callback) => {

    const sql = `
        UPDATE employees
        SET
            name=?,
            age=?,
            gender=?,
            email=?,
            department=?,
            salary=?
        WHERE id=?
    `;

    db.query(sql, [
        employee.name,
        employee.age,
        employee.gender,
        employee.email,
        employee.department,
        employee.salary,
        id
    ], callback);

};

// Delete Employee
export const deleteEmployee = (id, callback) => {

    const sql = "DELETE FROM employees WHERE id=?";

    db.query(sql, [id], callback);

};