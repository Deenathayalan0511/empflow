import db from "../config/db.js";

// Get All Employees
export const getEmployees = (callback) => {

    const sql = "SELECT * FROM employees ORDER BY id DESC";

    db.query(sql, callback);

};

// filter employees 
export const getFilteredEmployees = (

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

    const allowedColumns = [
        "id",
        "name",
        "email",
        "age",
        "gender",
        "department",
        "salary"
    ];

    if (!allowedColumns.includes(column)) {
        column = "name";
    }

    if (!allowedColumns.includes(sortBy)) {
        sortBy = "id";
    }

    order = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

    let where = "WHERE 1=1";

    const values = [];

    // Search
    if (search) {

        where += ` AND ${column} LIKE ?`;

        values.push(`%${search}%`);

    }

    // Department
    if (department) {

        where += " AND department = ?";

        values.push(department);

    }

    // Gender
    if (gender) {

        where += " AND gender = ?";

        values.push(gender);

    }

    const offset = (page - 1) * limit;

    const sql = `
        SELECT *
        FROM employees
        ${where}
        ORDER BY ${sortBy} ${order}
        LIMIT ? OFFSET ?
    `;

    const countSql = `
        SELECT COUNT(*) AS total
        FROM employees
        ${where}
    `;

    db.query(countSql, values, (err, countResult) => {

        if (err) {

            return callback(err);

        }

        const total = countResult[0].total;

        db.query(
            sql,
            [...values, limit, offset],
            (err, rows) => {

                if (err) {

                    return callback(err);

                }

                callback(null, {
                    success: true,
                    data: rows,
                    currentPage: page,
                    totalPages: Math.ceil(total / limit),
                    totalEmployees: total
                });

            }
        );

    });

};

// Add Employee
export const addEmployee = (employee, callback) => {

    const sql = `
        INSERT INTO employees
        (name, age, gender, email, department, salary, image)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            employee.name,
            employee.age,
            employee.gender,
            employee.email,
            employee.department,
            employee.salary,
            employee.image
        ],
        callback
    );

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
            salary=?,
            image=?
        WHERE id=?
    `;

    db.query(
        sql,
        [
            employee.name,
            employee.age,
            employee.gender,
            employee.email,
            employee.department,
            employee.salary,
            employee.image,
            id
        ],
        callback
    );

};

// Delete Employee
export const deleteEmployee = (id, callback) => {

    const sql = "DELETE FROM employees WHERE id=?";

    db.query(sql, [id], callback);

};