import db from "../config/db.js";

// =====================================
// Overall Dashboard Statistics
// =====================================
export const getDashboardStats = async (userId) => {
  const sql = `
        SELECT

            COUNT(*) AS totalEmployees,

            SUM(gender='Male') AS maleEmployees,

            SUM(gender='Female') AS femaleEmployees,

            SUM(gender='Other') AS otherEmployees,

            ROUND(AVG(age),2) AS averageAge,

            MIN(age) AS youngestEmployee,

            MAX(age) AS oldestEmployee,

            ROUND(AVG(salary),2) AS averageSalary,

            MAX(salary) AS highestSalary,

            MIN(salary) AS lowestSalary

        FROM employees

        WHERE user_id = ?
    `;

  const [rows] = await db.query(sql, [userId]);

  return rows[0];
};

// =====================================
// Department Wise Statistics
// =====================================
export const getDepartmentStats = async (userId) => {
  const sql = `
        SELECT

            department,

            COUNT(*) AS totalEmployees,

            SUM(gender='Male') AS maleEmployees,

            SUM(gender='Female') AS femaleEmployees,

            SUM(gender='Other') AS otherEmployees,

            ROUND(AVG(age),2) AS averageAge,

            MIN(age) AS youngestEmployee,

            MAX(age) AS oldestEmployee,

            ROUND(AVG(salary),2) AS averageSalary,

            MAX(salary) AS highestSalary,

            MIN(salary) AS lowestSalary


        FROM employees


        WHERE user_id = ?


        GROUP BY department


        ORDER BY department
    `;

  const [rows] = await db.query(sql, [userId]);

  return rows;
};
