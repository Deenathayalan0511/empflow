import db from "../config/db.js";

// ===========================================
// Get All Employees
// ===========================================
export const getEmployees = async (userId) => {
  const sql = `
        SELECT *
        FROM employees
        WHERE user_id = ?
        ORDER BY id DESC
    `;

  const [rows] = await db.query(sql, [userId]);

  return rows;
};

// ===========================================
// Get Employee By ID
// ===========================================
export const getEmployeeById = async (id, userId) => {
  const sql = `
        SELECT *
        FROM employees
        WHERE id = ?
        AND user_id = ?
    `;

  const [rows] = await db.query(sql, [id, userId]);

  return rows;
};

// ===========================================
// Add Employee
// ===========================================
export const addEmployee = async (employee) => {
  const sql = `
        INSERT INTO employees
        (
            name,
            age,
            gender,
            email,
            department,
            salary,
            image,
            user_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

  const [result] = await db.query(sql, [
    employee.name,
    employee.age,
    employee.gender,
    employee.email,
    employee.department,
    employee.salary,
    employee.image,
    employee.user_id,
  ]);

  return result;
};
// ===========================================
// Update Employee
// ===========================================
export const updateEmployee = async (id, userId, employee) => {
  const sql = `
        UPDATE employees
        SET
            name = ?,
            age = ?,
            gender = ?,
            email = ?,
            department = ?,
            salary = ?,
            image = ?
        WHERE id = ?
        AND user_id = ?
    `;

  const [result] = await db.query(sql, [
    employee.name,
    employee.age,
    employee.gender,
    employee.email,
    employee.department,
    employee.salary,
    employee.image,
    id,
    userId,
  ]);

  return result;
};

// ===========================================
// Delete Employee
// ===========================================
export const deleteEmployee = async (id, userId) => {
  const sql = `
        DELETE FROM employees
        WHERE id = ?
        AND user_id = ?
    `;

  const [result] = await db.query(sql, [id, userId]);

  return result;
};

// ===========================================
// Filter Employees
// ===========================================
export const getFilteredEmployees = async (
  userId,
  search,
  column,
  department,
  gender,
  sortBy,
  order,
  page,
  limit,
) => {
  const allowedColumns = [
    "id",
    "name",
    "email",
    "age",
    "gender",
    "department",
    "salary",
  ];

  if (!allowedColumns.includes(column)) {
    column = "name";
  }

  if (!allowedColumns.includes(sortBy)) {
    sortBy = "id";
  }

  order = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

  let where = "WHERE user_id = ?";

  const values = [userId];

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

  // Total Count
  const [countRows] = await db.query(countSql, values);

  const total = countRows[0].total;

  // Employee Data
  const [rows] = await db.query(sql, [...values, limit, offset]);

  return {
    success: true,
    data: rows,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalEmployees: total,
  };
};
