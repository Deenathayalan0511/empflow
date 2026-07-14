import db from "../config/db.js";

export const getEmployees = (
    search,
    column,
    department,
    gender,
    sortBy,
    order,
    page,
    limit,
    callback
) => {

    let sql = "SELECT * FROM employees WHERE 1=1";
    let values = [];

    // Search
    if (search && column) {
        sql += ` AND ${column} LIKE ?`;
        values.push(`%${search}%`);
    }

    // Department Filter
    if (department) {
        sql += " AND department=?";
        values.push(department);
    }

    // Gender Filter
    if (gender) {
        sql += " AND gender=?";
        values.push(gender);
    }

    // Sorting
    sql += ` ORDER BY ${sortBy} ${order}`;

    // Pagination
    sql += " LIMIT ? OFFSET ?";

    values.push(Number(limit));
    values.push((page - 1) * limit);

    db.query(sql, values, callback);

};

// Get all employees
export const getEmployeeCount = (callback) => {

    const sql = `
    SELECT
    COUNT(*) AS total,
    SUM(gender='Male') AS male,
    SUM(gender='Female') AS female
    FROM employees`;

    db.query(sql, callback);

};

// Get employee by id
export const getEmployeeById = (id, callback) => {

    const sql = "SELECT * FROM employees WHERE id=?";

    db.query(sql, [id], callback);

};

// Add employee
export const createEmployee = (employee, callback) => {

    const sql = `
        INSERT INTO employees
        (name,email,salary,gender,department)
        VALUES (?,?,?,?,?)
    `;

    db.query(
        sql,
        [
            employee.name,
            employee.email,
            employee.salary,
            employee.gender,
            employee.department
        ],
        callback
    );

};

// Update employee
export const updateEmployee = (id, employee, callback) => {

    const sql = `
        UPDATE employees
        SET
        name=?,
        email=?,
        salary=?,
        gender=?,
        department=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            employee.name,
            employee.email,
            employee.salary,
            employee.gender,
            employee.department,
            id
        ],
        callback
    );

};

// Delete employee
export const deleteEmployee = (id, callback) => {

    const sql = "DELETE FROM employees WHERE id=?";

    db.query(sql, [id], callback);

};