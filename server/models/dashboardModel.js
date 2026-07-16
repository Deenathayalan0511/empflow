import db from "../config/db.js";

export const getDashboardStats = (callback) => {
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
    `;

  db.query(sql, callback);
};

export const getDepartmentStats = (callback) => {
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

        GROUP BY department

        ORDER BY department

    `;

  db.query(sql, callback);
};
